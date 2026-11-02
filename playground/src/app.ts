import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import { lint, Diagnostic, RULES, lineOf } from '@core/lint';
import { api, membersOf, memberMarkdown, ownerLabel, Resolved } from '@core/api';
import { memberContextAt, resolveAt, callContextAt } from '@core/complete';
import { search, lookup, Entry } from '@core/lookup';
import { renderHandler, FEATURES, Feature } from '@core/templates';
import { simulate } from './sim';
import { buildPrompt, pageTools, diffLines, hunks, counts, newProblems } from './aifix';
import { fixAll } from '@core/fix';

declare const PROBES: { name: string; source: string; jint: string; detail: string }[];
declare const BUILD: { core: string; nucleus: string | null; jint: string | null };

const $ = <T extends HTMLElement = HTMLElement>(sel: string) => document.querySelector(sel) as T;
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

/** Tiny Markdown for API docs: fenced code, inline code, bold, links, paragraphs. */
function md(src: string): string {
  const out: string[] = [];
  const parts = src.split(/```(\w*)\n?([\s\S]*?)```/g);
  for (let i = 0; i < parts.length; i++) {
    if (i % 3 === 0) {
      for (const para of parts[i].split(/\n{2,}/)) {
        if (!para.trim()) continue;
        let h = esc(para.trim());
        h = h.replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        h = h.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
        h = h.replace(/(^|\s)(https?:\/\/[^\s<]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>');
        out.push(`<p>${h.replace(/\n/g, '<br>')}</p>`);
      }
    } else if (i % 3 === 2) out.push(`<pre class="doc-code">${esc(parts[i].trim())}</pre>`);
  }
  return out.join('');
}

// ---------------------------------------------------------------------------
// Samples

const TEMPLATE_SAMPLES: { label: string; features: Feature[] }[] = [
  { label: 'Template: basic', features: [] },
  { label: 'Template: Proto Input (multiple keyboards & mice)', features: ['protoinput'] },
  { label: 'Template: Goldberg + INI resolution', features: ['goldberg', 'resolution-ini'] },
  { label: 'Template: everything', features: FEATURES.map((f) => f.id) },
];

const BUGGY = `// A handler with common mistakes. Try the quick fixes in Problems.
Game.GameName = "Buggy Game";
Game.GUID = "Buggy: Game!";
Game.ExecutableName = "buggy.exe";
Game.MaxPlayers = 4;
Game.KillMutex = "BuggyMutex";
Game.IgnoreWindowBordercheck = true;
Game.SymlinkGame = "true";
Game.DPIHandling = true;
Game.MaxPlayers = 8;

var width = Context.Width;

Game.Play = function () {
  const args = \`-windowed -w \${Context.Width}\`;
  Context.StartArguments = args + " -id " + Context.PLayerID;
  var ini = Context.GetFolder();
  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];
    player.ProtoController5 = Context.GamepadId;
  }
};
`;

function sampleSource(id: string): string {
  if (id === 'buggy') return BUGGY;
  if (id.startsWith('tpl:')) {
    const t = TEMPLATE_SAMPLES[Number(id.slice(4))];
    return renderHandler({ gameName: 'Example Game', executableName: 'ExampleGame.exe', steamId: '123450', features: t.features });
  }
  if (id.startsWith('probe:')) return PROBES[Number(id.slice(6))].source;
  return '';
}

// ---------------------------------------------------------------------------
// Editor

const STORE_KEY = 'nucleus-workbench-draft';
let initial = BUGGY;
try {
  initial = localStorage.getItem(STORE_KEY) || BUGGY;
} catch {
  /* storage unavailable */
}

let current: Diagnostic[] = [];
const sevClass: Record<string, string> = { error: 'error', warning: 'warning', info: 'info', hint: 'hint' };

const editor = CodeMirror($('#editor'), {
  value: initial,
  mode: 'javascript',
  lineNumbers: true,
  indentUnit: 2,
  tabSize: 2,
  matchBrackets: true,
  autoCloseBrackets: true,
  gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers'],
  lint: {
    getAnnotations: (text: string) => {
      current = lint(text);
      renderProblems(text);
      return current
        .filter((d) => d.severity !== 'hint' || showHints())
        .map((d) => ({
          from: posAt(text, d.start),
          to: posAt(text, Math.max(d.end, d.start + 1)),
          message: `${d.message} [${d.rule}]`,
          severity: d.severity === 'error' ? 'error' : d.severity === 'warning' ? 'warning' : 'info',
        }));
    },
    delay: 250,
  },
  extraKeys: {
    'Ctrl-Space': (cm: any) => cm.showHint({ hint: hinter, completeSingle: false }),
    Tab: (cm: any) => cm.execCommand('insertSoftTab'),
  },
} as any);

function posAt(text: string, offset: number) {
  const line = lineOf(text, offset);
  return CodeMirror.Pos(line, offset - (text.lastIndexOf('\n', offset - 1) + 1));
}
const showHints = () => ($('#show-hints') as HTMLInputElement).checked;

editor.on('change', () => {
  try {
    localStorage.setItem(STORE_KEY, editor.getValue());
  } catch {
    /* ignore */
  }
});

// Completion
function hinter(cm: any) {
  const text = cm.getValue();
  const cur = cm.getCursor();
  const offset = cm.indexFromPos(cur);
  const ctx = memberContextAt(text, offset);
  if (!ctx) return null;
  const partial = ctx.partial.toLowerCase();
  const list = membersOf(ctx.base)
    .filter((m) => m.name.toLowerCase().startsWith(partial))
    .sort((a, b) => rank(a.member) - rank(b.member) || a.name.localeCompare(b.name))
    .map((m) => ({
      text: m.name,
      displayText: m.name,
      render(el: HTMLElement) {
        const t = m.member ? (m.member.kind === 'method' ? 'method' : m.member.ts ?? m.member.ref ?? '') : m.detail ?? '';
        el.innerHTML = `<span class="hint-name${m.member?.deprecated ? ' dep' : ''}">${esc(m.name)}</span><span class="hint-type">${esc(String(t))}</span>`;
      },
    }));
  return { list, from: cm.posFromIndex(ctx.partialStart), to: cur };
}
const rank = (m?: { required?: boolean; deprecated?: string; doc?: string }) => (!m ? 1 : m.required ? 0 : m.deprecated ? 3 : m.doc ? 1 : 2);

editor.on('inputRead', (cm: any, change: any) => {
  if (change.text[0] === '.' || /^[\w$]$/.test(change.text[0])) {
    if (!cm.state.completionActive) cm.showHint({ hint: hinter, completeSingle: false });
  }
  if (change.text[0] === '(' || change.text[0] === ',') showSignature();
});
editor.on('cursorActivity', () => showSignature());

// Hover docs
const tip = $('#tip');
let tipTimer: number | undefined;
editor.getWrapperElement().addEventListener('mousemove', (e: MouseEvent) => {
  clearTimeout(tipTimer);
  tipTimer = window.setTimeout(() => {
    const pos = editor.coordsChar({ left: e.clientX, top: e.clientY }, 'window');
    const text = editor.getValue();
    const r = resolveAt(text, editor.indexFromPos(pos));
    const html = r ? describeResolved(r.resolved, text.slice(r.start, r.end)) : '';
    if (!html) {
      tip.hidden = true;
      return;
    }
    tip.innerHTML = html;
    tip.hidden = false;
    const x = Math.min(e.clientX + 12, window.innerWidth - tip.offsetWidth - 12);
    const y = e.clientY + 18 + tip.offsetHeight > window.innerHeight ? e.clientY - tip.offsetHeight - 10 : e.clientY + 18;
    tip.style.left = `${Math.max(8, x)}px`;
    tip.style.top = `${Math.max(8, y)}px`;
  }, 280);
});
editor.getWrapperElement().addEventListener('mouseleave', () => {
  clearTimeout(tipTimer);
  tip.hidden = true;
});

function describeResolved(res: Resolved, word: string): string {
  switch (res.kind) {
    case 'member':
      return md(memberMarkdown(res.owner, res.name, res.member).replace(/\n\n\[Handler API docs\]\([^)]+\)$/, ''));
    case 'enum': {
      const e = api.enums[res.name];
      return md('```\nenum Nucleus.' + res.name + '\n```\n\n' + (e.doc ?? '') + '\n\n' + Object.entries(e.values).map(([k, v]) => `\`${k}\` = ${v}`).join(', '));
    }
    case 'enumValue':
      return md('```\nNucleus.' + res.enumName + '.' + res.value + ' = ' + api.enums[res.enumName].values[res.value] + '\n```');
    case 'nucleusClass':
      return md('```\nnew Nucleus.' + res.name + '(' + api.nucleusClasses[res.name].params.join(', ') + ')\n```\n\n' + api.nucleusClasses[res.name].doc);
    default: {
      const g = api.globals[word];
      return g ? md('```\n' + `${word}: ${g.type}` + '\n```\n\n' + g.doc) : '';
    }
  }
}

// Signature help
const sig = $('#sig');
function showSignature() {
  const text = editor.getValue();
  const c = callContextAt(text, editor.indexFromPos(editor.getCursor()));
  if (!c || (c.callee.kind !== 'member' && c.callee.kind !== 'nucleusClass')) {
    sig.hidden = true;
    return;
  }
  let lines: string[] = [];
  if (c.callee.kind === 'member' && c.callee.member.kind === 'method') {
    const { owner, name, member } = c.callee;
    lines = (member.overloads ?? []).map(
      (o) =>
        `${esc(ownerLabel(owner))}.${esc(name)}(` +
        o.params.map((p, i) => `<span class="${i === c.activeParameter || (p.rest && c.activeParameter >= i) ? 'active' : ''}">${esc(`${p.rest ? '...' : ''}${p.name}: ${p.type}`)}</span>`).join(', ') +
        `): ${esc(o.returns)}`,
    );
  } else if (c.callee.kind === 'nucleusClass') {
    const cls = api.nucleusClasses[c.callee.name];
    lines = [`new Nucleus.${esc(c.callee.name)}(` + cls.params.map((p, i) => `<span class="${i === c.activeParameter ? 'active' : ''}">${esc(p)}</span>`).join(', ') + ')'];
  }
  if (!lines.length) {
    sig.hidden = true;
    return;
  }
  sig.innerHTML = lines.map((l) => `<div>${l}</div>`).join('');
  sig.hidden = false;
}

// ---------------------------------------------------------------------------
// Problems

function renderProblems(text: string) {
  const list = current.filter((d) => d.severity !== 'hint' || showHints());
  const counts = { error: 0, warning: 0, info: 0, hint: 0 } as Record<string, number>;
  for (const d of current) counts[d.severity]++;
  $('#count-problems').textContent = String(list.length);
  $('#status').innerHTML =
    `<span class="pill ${counts.error ? 'error' : 'ok'}">${counts.error ? `${counts.error} error${counts.error > 1 ? 's' : ''}: Nucleus won't load or run this` : 'Loads in Nucleus'}</span>` +
    `<span class="muted">${counts.warning} warning${counts.warning === 1 ? '' : 's'} · ${counts.info} info · ${counts.hint} hint${counts.hint === 1 ? '' : 's'}</span>`;
  const el = $('#problems');
  if (!list.length) {
    el.innerHTML = `<p class="empty">No problems. ${counts.hint ? 'Tick "Show hints" to see deprecated options.' : ''}</p>`;
    return;
  }
  el.innerHTML = list
    .map((d, i) => {
      const line = lineOf(text, d.start) + 1;
      const col = d.start - (text.lastIndexOf('\n', d.start - 1) + 1) + 1;
      const fixes = (d.fixes ?? []).map((f, j) => `<button class="fix" data-d="${i}" data-f="${j}">${esc(f.title.replace(/`/g, ''))}</button>`).join('');
      return `<li class="problem ${sevClass[d.severity]}">
        <button class="loc" data-jump="${d.start}">${line}:${col}</button>
        <div class="body"><div class="msg">${md(d.message).replace(/^<p>|<\/p>$/g, '')}</div>
        <div class="meta"><span class="chip ${sevClass[d.severity]}">${d.severity}</span><span class="rule" title="${esc(RULES[d.rule].description)}">${d.rule}</span>${fixes}</div></div></li>`;
    })
    .join('');
  el.querySelectorAll<HTMLButtonElement>('.fix').forEach((b) =>
    b.addEventListener('click', () => {
      const fix = list[Number(b.dataset.d)].fixes![Number(b.dataset.f)];
      editor.operation(() => {
        for (const e of [...fix.edits].sort((a, z) => z.start - a.start)) editor.replaceRange(e.text, editor.posFromIndex(e.start), editor.posFromIndex(e.end));
      });
      editor.focus();
    }),
  );
  el.querySelectorAll<HTMLButtonElement>('.loc').forEach((b) =>
    b.addEventListener('click', () => {
      const p = editor.posFromIndex(Number(b.dataset.jump));
      editor.setCursor(p);
      editor.scrollIntoView(p, 80);
      editor.focus();
    }),
  );
}
$('#show-hints').addEventListener('change', () => (editor as any).performLint());

// ---------------------------------------------------------------------------
// Simulate

function runSim() {
  const players = Number(($('#sim-players') as HTMLSelectElement).value);
  const [width, height] = ($('#sim-res') as HTMLSelectElement).value.split('x').map(Number);
  const kb = Number(($('#sim-kb') as HTMLSelectElement).value);
  const r = simulate(editor.getValue(), { players, width, height, keyboardPlayer: kb });
  const out: string[] = [];
  if (!r.loaded) {
    out.push(`<div class="banner error"><strong>Doesn't load.</strong> ${esc(r.loadError ?? '')}</div>`);
  } else {
    const failed = r.players.filter((p) => p.error);
    out.push(
      failed.length
        ? `<div class="banner error"><strong>Game.Play fails for ${failed.length} of ${r.players.length} players.</strong> Those instances won't be set up.</div>`
        : `<div class="banner ok"><strong>Loads${r.hasPlay ? ` and Game.Play ran for all ${r.players.length} players` : ' (no Game.Play)'}.</strong></div>`,
    );
  }
  if (r.ignored.length) {
    const uniq = [...new Set(r.ignored)];
    out.push(`<h3>Ignored by Nucleus <span class="count">${uniq.length}</span></h3><ul class="mono-list warn">${uniq.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>`);
  }
  for (const p of r.players) {
    out.push(`<section class="player"><h3>Player ${p.index + 1}${p.index === kb ? ' <span class="chip info">keyboard & mouse</span>' : ' <span class="chip">controller</span>'}</h3>
      ${p.error ? `<div class="banner error">${esc(p.error)}</div>` : ''}
      <dl><dt>Launch arguments</dt><dd class="mono">${p.startArguments ? esc(p.startArguments) : '<span class="muted">(none)</span>'}</dd></dl>
      ${p.calls.length ? `<details ${r.players.length <= 2 ? 'open' : ''}><summary>${p.calls.length} recorded call${p.calls.length > 1 ? 's' : ''}</summary><ul class="mono-list">${p.calls.map((c) => `<li>${esc(c)}</li>`).join('')}</ul></details>` : '<p class="muted">No Context or System calls.</p>'}
    </section>`);
  }
  for (const c of r.callbacks) {
    out.push(`<section class="player"><h3>${esc(c.name)}</h3>${c.error ? `<div class="banner error">${esc(c.error)}</div>` : ''}
      <details><summary>${c.calls.length} recorded call${c.calls.length === 1 ? '' : 's'}</summary><ul class="mono-list">${c.calls.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></details></section>`);
  }
  if (r.options.length) {
    out.push(`<details><summary>${r.options.length} option${r.options.length > 1 ? 's' : ''} set (different from Nucleus' defaults)</summary><table class="opts"><tbody>${r.options.map((o) => `<tr><td class="mono">${esc(o.path)}</td><td class="mono">${esc(o.value.length > 120 ? o.value.slice(0, 117) + '…' : o.value)}</td></tr>`).join('')}</tbody></table></details>`);
  }
  $('#sim-out').innerHTML = out.join('');
}
$('#sim-run').addEventListener('click', runSim);

// ---------------------------------------------------------------------------
// API search

function renderApi(q: string) {
  const el = $('#api-results');
  if (!q.trim()) {
    el.innerHTML = '<p class="empty">Search option names and docs, e.g. <button class="link" data-q="mutex">mutex</button>, <button class="link" data-q="window title">window title</button>, <button class="link" data-q="Context.ModifySaveFile">Context.ModifySaveFile</button>, <button class="link" data-q="Nucleus.Folder">Nucleus.Folder</button>.</p>';
  } else {
    const exact = lookup(q);
    let entries: Entry[] = exact.kind === 'entries' ? exact.entries : [];
    for (const e of search(q, 30)) if (!entries.some((x) => x.path === e.path)) entries.push(e);
    let head = '';
    if (exact.kind === 'enum') head = `<article class="api"><h4>enum Nucleus.${esc(exact.name)}</h4>${md(exact.doc ?? '')}<p class="mono">${Object.entries(exact.values).map(([k, v]) => `${esc(k)} = ${v}`).join(' · ')}</p></article>`;
    if (exact.kind === 'class') head = `<article class="api"><h4>new Nucleus.${esc(exact.name)}(${exact.params.join(', ')})</h4>${md(exact.doc)}</article>`;
    if (exact.kind === 'none' && exact.didYouMean) head = `<p class="muted">"${esc(q)}" isn't part of the handler API. Did you mean <button class="link" data-q="${esc(exact.didYouMean)}">${esc(exact.didYouMean)}</button>?</p>`;
    entries = entries.slice(0, 30);
    el.innerHTML =
      head +
      (entries.length || head
        ? entries.map((e) => `<article class="api"><h4>${esc(e.path)}${e.member.deprecated ? ' <span class="chip hint">deprecated</span>' : ''}${e.member.required ? ' <span class="chip error">required</span>' : ''}</h4>${md(memberMarkdown(e.owner, e.name, e.member).replace(/\n\n\[Handler API docs\]\([^)]+\)$/, ''))}</article>`).join('')
        : `<p class="empty">Nothing matches "${esc(q)}".</p>`);
  }
  el.querySelectorAll<HTMLButtonElement>('[data-q]').forEach((b) =>
    b.addEventListener('click', () => {
      ($('#api-q') as HTMLInputElement).value = b.dataset.q!;
      renderApi(b.dataset.q!);
    }),
  );
}
$('#api-q').addEventListener('input', (e) => renderApi((e.target as HTMLInputElement).value));
renderApi('');

// ---------------------------------------------------------------------------
// Probes: real Jint results vs the linter

function renderProbes() {
  let agree = 0;
  const rows = PROBES.map((p, i) => {
    const errs = lint(p.source).filter((d) => d.severity === 'error');
    const fails = p.jint === 'LOAD-FAIL' || p.jint === 'PLAY-FAIL';
    const ok = fails ? errs.length > 0 : errs.length === 0;
    if (ok) agree++;
    const jintLabel: Record<string, string> = { OK: 'runs', LOADED: 'loads', 'LOAD-FAIL': "doesn't load", 'PLAY-FAIL': 'Game.Play throws' };
    return `<tr class="${ok ? '' : 'disagree'}">
      <td><button class="link" data-probe="${i}">${esc(p.name.replace(/\.js$/, '').replace(/^\d+-/, '').replace(/-/g, ' '))}</button></td>
      <td><span class="chip ${fails ? 'error' : 'ok'}">${jintLabel[p.jint] ?? p.jint}</span>${p.detail ? `<div class="detail">${esc(p.detail)}</div>` : ''}</td>
      <td>${errs.length ? `<span class="chip error">${errs.length} error${errs.length > 1 ? 's' : ''}</span> <span class="detail">${esc([...new Set(errs.map((e) => e.rule))].join(', '))}</span>` : '<span class="chip ok">no errors</span>'}</td>
      <td class="center">${ok ? '<span class="agree">✓</span>' : '<span class="disagree-mark">✗</span>'}</td></tr>`;
  });
  $('#probes').innerHTML = `<p class="lede">Each probe isolates one engine behaviour. The <strong>Jint 2.11.58</strong> column is what happened when the testbench ran it with Nucleus' engine setup; the <strong>Linter</strong> column is computed live in this page. They agree on <strong>${agree} of ${PROBES.length}</strong>.</p>
    <div class="table-wrap"><table class="probes"><thead><tr><th>Probe</th><th>Jint 2.11.58</th><th>Linter</th><th>Agree</th></tr></thead><tbody>${rows.join('')}</tbody></table></div>`;
  $('#count-probes').textContent = `${agree}/${PROBES.length}`;
  $('#probes').querySelectorAll<HTMLButtonElement>('[data-probe]').forEach((b) =>
    b.addEventListener('click', () => {
      loadSource(PROBES[Number(b.dataset.probe)].source);
      selectTab('problems');
    }),
  );
}
renderProbes();

// ---------------------------------------------------------------------------
// Samples, new handler, tabs

const samples = $('#samples') as HTMLSelectElement;
samples.innerHTML =
  `<option value="">Load an example…</option><option value="buggy">Handler with common mistakes</option>` +
  `<optgroup label="Templates">${TEMPLATE_SAMPLES.map((t, i) => `<option value="tpl:${i}">${esc(t.label.replace('Template: ', ''))}</option>`).join('')}</optgroup>` +
  `<optgroup label="Engine probes">${PROBES.map((p, i) => `<option value="probe:${i}">${esc(p.name)}</option>`).join('')}</optgroup>`;
samples.addEventListener('change', () => {
  if (samples.value) loadSource(sampleSource(samples.value));
  samples.value = '';
});

function loadSource(src: string) {
  editor.setValue(src);
  editor.clearHistory();
  editor.focus();
}

$('#feature-list').innerHTML = FEATURES.map(
  (f) => `<label class="check"><input type="checkbox" id="feat-${f.id}" value="${f.id}"><span><strong>${esc(f.label)}</strong><small>${esc(f.detail)}</small></span></label>`,
).join('');
$('#new-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = ($('#new-name') as HTMLInputElement).value.trim();
  const exe = ($('#new-exe') as HTMLInputElement).value.trim();
  const steam = ($('#new-steam') as HTMLInputElement).value.trim();
  const features = FEATURES.filter((f) => ($(`#feat-${f.id}`) as HTMLInputElement).checked).map((f) => f.id);
  loadSource(renderHandler({ gameName: name, executableName: exe, steamId: steam || undefined, features }));
  ($('#new-dialog') as HTMLDialogElement).close();
  selectTab('problems');
});
$('#new-open').addEventListener('click', () => ($('#new-dialog') as HTMLDialogElement).showModal());
$('#new-cancel').addEventListener('click', () => ($('#new-dialog') as HTMLDialogElement).close());

$('#copy').addEventListener('click', async () => {
  const btn = $('#copy');
  try {
    await navigator.clipboard.writeText(editor.getValue());
    btn.textContent = 'Copied';
  } catch {
    editor.execCommand('selectAll');
    editor.focus();
    btn.textContent = 'Press Ctrl+C';
  }
  setTimeout(() => (btn.textContent = 'Copy handler'), 1600);
});

function selectTab(id: string) {
  document.querySelectorAll<HTMLButtonElement>('[role=tab]').forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === id)));
  document.querySelectorAll<HTMLElement>('[role=tabpanel]').forEach((p) => (p.hidden = p.id !== `panel-${id}`));
  if (id === 'simulate') runSim();
}
document.querySelectorAll<HTMLButtonElement>('[role=tab]').forEach((t) => t.addEventListener('click', () => selectTab(t.dataset.tab!)));
['sim-players', 'sim-res', 'sim-kb'].forEach((id) => $(`#${id}`).addEventListener('change', runSim));

$('#build-info').textContent = `Linter and API from splitscreenme-vscode @ ${BUILD.core} · Nucleus @ ${BUILD.nucleus ?? '?'} · Jint ${BUILD.jint ?? '2.11.58'}`;
selectTab('problems');

// ---------------------------------------------------------------------------
// Fix with AI (artifact `sample` capability: Claude, on the viewer's own account)

const AUTO_KEY = 'nucleus-workbench-ai-auto';
const aiBox = $('#ai-box');
const aiBtn = $('#ai-fix') as HTMLButtonElement;
const aiAuto = $('#ai-auto') as HTMLInputElement;
try {
  aiAuto.checked = localStorage.getItem(AUTO_KEY) === '1';
} catch {
  /* ignore */
}
aiAuto.addEventListener('change', () => {
  try {
    localStorage.setItem(AUTO_KEY, aiAuto.checked ? '1' : '0');
  } catch {
    /* ignore */
  }
});

let sample: any = null;
let aiCtl: AbortController | null = null;
(async () => {
  try {
    sample = await (window as any).claude?.use?.('sample');
  } catch {
    sample = null;
  }
  // Fix with AI only exists inside a Claude artifact viewer.
  if (sample) {
    aiBtn.hidden = false;
    ($('#ai-note') as HTMLInputElement).hidden = false;
  }
})();

const AI_ERRORS: Record<string, string> = {
  rate_limited: 'Too many requests right now. Try again in a minute.',
  session_expired: 'Your Claude session expired. Sign in again, then retry.',
  refused: 'Claude declined to change this handler.',
  empty_completion: 'Claude returned nothing. Try again, or ask for less in the note.',
  invalid_json: "Claude's answer wasn't in the expected format. Try again.",
  prompt_too_large: 'This handler is too large to send in one request.',
};
const AI_UNAVAILABLE = new Set(['not_granted', 'sampling_disabled', 'not_declared', 'capability_disabled', 'capability_removed']);

function aiStatus(text: string) {
  const el = aiBox.querySelector('.ai-status-text');
  if (el) el.textContent = text;
}

async function runAiFix() {
  if (!sample) return;
  const base = editor.getValue();
  const before = counts(base);
  aiCtl = new AbortController();
  aiBtn.disabled = true;
  aiBox.hidden = false;
  aiBox.innerHTML = `<div class="ai-status"><span class="spinner" aria-hidden="true"></span><span class="ai-status-text">Asking Claude…</span><button class="btn" id="ai-stop" type="button">Stop</button></div>`;
  $('#ai-stop').addEventListener('click', () => aiCtl?.abort());

  const limits = await sample.limits().catch(() => null);
  const tools = limits?.tools
    ? pageTools().map((t) => ({
        ...t,
        execute: (input: { [k: string]: unknown }) => {
          aiStatus(t.name === 'lint_handler' ? 'Claude is checking its fix with the linter…' : `Claude is looking up ${String(input.query ?? '').slice(0, 40)}…`);
          return t.execute(input);
        },
      }))
    : undefined;
  try {
    const r: any = await sample.json(buildPrompt(base, ($('#ai-note') as HTMLInputElement).value), {
      signal: aiCtl.signal,
      ...(tools ? { tools } : { cache: false }),
      onText: () => aiStatus('Claude is writing the fix…'),
    });
    const code = typeof r?.code === 'string' ? r.code.replace(/\r\n/g, '\n') : '';
    const changes = Array.isArray(r?.changes) ? r.changes.map(String).slice(0, 20) : [];
    if (!code.trim()) {
      aiBox.innerHTML = `<p>Claude's answer had no handler code. Try again.</p>`;
    } else if (code === base) {
      aiBox.innerHTML = `<p>Claude found nothing to change.</p>${changes.length ? `<ul class="ai-changes">${changes.map((c: string) => `<li>${esc(c)}</li>`).join('')}</ul>` : ''}`;
    } else {
      showProposal(base, code, changes, before);
    }
  } catch (e: any) {
    if (e?.code === 'cancelled') {
      aiBox.hidden = true;
    } else if (AI_UNAVAILABLE.has(e?.code)) {
      aiBtn.hidden = true;
      ($('#ai-note') as HTMLInputElement).hidden = true;
      aiBox.innerHTML = `<p>Claude isn't available on this page for your account, so Fix with AI is turned off. Fix all problems still works.</p>`;
    } else {
      aiBox.innerHTML = `<p>${esc(AI_ERRORS[e?.code] ?? 'Something went wrong reaching Claude. Try again.')}</p>`;
    }
  } finally {
    aiBtn.disabled = false;
    aiCtl = null;
  }
}
aiBtn.addEventListener('click', runAiFix);

// Fix all: the deterministic, offline fixes (the same as `nucleus lint --fix` and the extension).
$('#fix-all').addEventListener('click', () => {
  const base = editor.getValue();
  const before = counts(base);
  const r = fixAll(base);
  aiBox.hidden = false;
  if (r.code === base) {
    aiBox.innerHTML = `<p>Nothing can be fixed automatically. ${before.errors + before.warnings ? 'The remaining problems need your decision; see their quick fixes below' + (sample ? ', or try Fix with AI' : '') + '.' : ''}</p>`;
    return;
  }
  const changes = [...new Set(r.applied.map((a) => `${a.title} (line ${a.line})`))];
  showProposal(base, r.code, changes, before, 'Fix all');
});

function applyCode(code: string) {
  const doc = editor.getDoc();
  doc.replaceRange(code, doc.posFromIndex(0), doc.posFromIndex(doc.getValue().length), '+ai-fix');
}

function showProposal(base: string, code: string, changes: string[], before: { errors: number; warnings: number }, source: 'AI' | 'Fix all' = 'AI') {
  const after = counts(code);
  const edited = editor.getValue() !== base;
  const better = after.errors < before.errors || (after.errors === before.errors && after.warnings < before.warnings);
  const notWorse = after.errors <= before.errors;
  const lines = hunks(diffLines(base, code));
  const rows = lines
    .map((l) =>
      l === null
        ? '<tr class="gap"><td colspan="4">⋯</td></tr>'
        : `<tr class="${l.kind === '+' ? 'add' : l.kind === '-' ? 'del' : ''}"><td class="n">${l.a ?? ''}</td><td class="n">${l.b ?? ''}</td><td class="sign">${l.kind === ' ' ? '' : l.kind}</td><td class="code">${esc(l.text) || ' '}</td></tr>`,
    )
    .join('');
  const added = lines.filter((l) => l?.kind === '+').length;
  const removed = lines.filter((l) => l?.kind === '-').length;
  const chip = (n: number, kind: string) => `<span class="chip ${n ? kind : 'ok'}">${n} ${kind === 'error' ? 'error' : 'warning'}${n === 1 ? '' : 's'}</span>`;
  const delta = `<div class="ai-delta">Before ${chip(before.errors, 'error')} ${chip(before.warnings, 'warning')} → after ${chip(after.errors, 'error')} ${chip(after.warnings, 'warning')} <span class="muted">· +${added} −${removed} lines</span></div>`;

  const introduced = newProblems(base, code);
  const baseLines = base.split('\n').length;
  const bigRewrite = removed > Math.max(20, baseLines * 0.5);
  let reason = '';
  if (edited) reason = 'You edited the handler while Claude was working, so this was not applied automatically. Accepting replaces your latest edits.';
  else if (introduced.length) reason = `This version adds ${introduced.length} new problem${introduced.length > 1 ? 's' : ''} (${introduced.slice(0, 2).join('; ')}${introduced.length > 2 ? '; …' : ''}), so it was not applied automatically.`;
  else if (bigRewrite) reason = `This rewrites a large part of the handler (${removed} of ${baseLines} lines removed), so it was not applied automatically.`;
  else if (!notWorse) reason = 'This version has more errors than yours, so it was not applied automatically.';
  else if (!better) reason = 'This version does not reduce the problem count, so it was not applied automatically.';
  const auto = aiAuto.checked && !reason;

  const body = (state: 'review' | 'applied') => `
    <h3>${source === 'Fix all' ? (state === 'applied' ? 'Applied automatic fixes' : 'Automatic fixes') : state === 'applied' ? 'Applied Claude\'s fix' : "Claude's proposed fix"}</h3>
    ${source === 'Fix all' && after.errors + after.warnings ? `<p class="muted">${after.errors + after.warnings} problem${after.errors + after.warnings === 1 ? '' : 's'} need${after.errors + after.warnings === 1 ? 's' : ''} your decision and stay${after.errors + after.warnings === 1 ? 's' : ''} listed below.</p>` : ''}
    ${changes.length ? `<ul class="ai-changes">${changes.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>` : ''}
    ${delta}
    ${reason && (aiAuto.checked || introduced.length || bigRewrite || edited) ? `<p class="note">${esc(aiAuto.checked ? reason : reason.replace(/, so it was not applied automatically/, '').replace(/ so this was not applied automatically\./, ''))}</p>` : ''}
    <div class="diff-wrap"><table class="diff"><tbody>${rows}</tbody></table></div>
    <div class="ai-actions">${
      state === 'applied'
        ? '<button class="btn" id="ai-undo" type="button">Undo</button><button class="btn" id="ai-close" type="button">Close</button>'
        : '<button class="btn primary" id="ai-accept" type="button">Accept</button><button class="btn" id="ai-reject" type="button">Reject</button>'
    }</div>`;

  const showApplied = () => {
    aiBox.innerHTML = body('applied');
    $('#ai-undo').addEventListener('click', () => {
      if (editor.getValue() === code) {
        editor.undo();
        aiBox.innerHTML = '<p>Undone. Your handler is back to how it was.</p>';
      } else {
        aiBox.innerHTML = '<p>The handler changed after the fix was applied, so Undo is no longer safe. Use Ctrl+Z in the editor instead.</p>';
      }
    });
    $('#ai-close').addEventListener('click', () => (aiBox.hidden = true));
  };
  if (auto) {
    applyCode(code);
    showApplied();
    return;
  }
  aiBox.innerHTML = body('review');
  $('#ai-accept').addEventListener('click', () => {
    applyCode(code);
    showApplied();
  });
  $('#ai-reject').addEventListener('click', () => (aiBox.hidden = true));
}
