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
interface HubExample { id: string; title: string; game: string; owner: string; version: number; downloads: number; maxPlayers: number | null; multiKbm: boolean; updated: string | null; url: string; source: string }
declare const HUB_EXAMPLES: { takenAt: string | null; handlers: HubExample[] };

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
  if (id.startsWith('hub:')) return HUB_EXAMPLES.handlers[Number(id.slice(4))].source;
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
// Problems-panel state; declared before the editor because it lints as soon as it is created.
let filter: 'all' | 'error' | 'warning' | 'info' | 'hint' = 'all';
let problemIndex = -1;
let shownProblems: Diagnostic[] = [];
let fixCountTimer: number | undefined;
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
        .filter((d) => d.severity !== 'hint' || filter === 'hint')
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
  const counts = { error: 0, warning: 0, info: 0, hint: 0 } as Record<string, number>;
  for (const d of current) counts[d.severity]++;
  const list = current.filter((d) => (filter === 'all' ? d.severity !== 'hint' : d.severity === filter));
  shownProblems = list;
  problemIndex = -1;
  $('#count-problems').textContent = String(counts.error + counts.warning);
  $('#f-all').textContent = String(counts.error + counts.warning + counts.info);
  for (const k of ['error', 'warning', 'info', 'hint']) $(`#f-${k}`).textContent = String(counts[k]);
  const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;
  $('#status').innerHTML = counts.error
    ? `<span class="pill error">Nucleus won't load or run this</span><span>${plural(counts.error, 'error')}, ${plural(counts.warning, 'warning')}</span>`
    : counts.warning
      ? `<span class="pill ok">Loads in Nucleus</span><span>${plural(counts.warning, 'warning')}: options Nucleus may ignore or misread</span>`
      : `<span class="pill ok">Loads in Nucleus</span><span>No errors or warnings.</span>`;
  scheduleFixCount();
  const el = $('#problems');
  if (!list.length) {
    el.innerHTML =
      filter === 'all'
        ? `<li class="empty">Nothing to fix. Next: <button class="link" type="button" id="go-sim">simulate it</button> to see each player's launch arguments and file edits${counts.hint ? `, or check the <button class="link" type="button" id="go-hints">${plural(counts.hint, 'hint')}</button> about deprecated options` : ''}.</li>`
        : `<li class="empty">No ${filter === 'info' ? 'info' : filter + 's'}.</li>`;
    el.querySelector('#go-sim')?.addEventListener('click', () => selectTab('simulate'));
    el.querySelector('#go-hints')?.addEventListener('click', () => setFilter('hint'));
    return;
  }
  el.innerHTML = list
    .map((d, i) => {
      const line = lineOf(text, d.start) + 1;
      const col = d.start - (text.lastIndexOf('\n', d.start - 1) + 1) + 1;
      const fixes = (d.fixes ?? []).map((f, j) => `<button class="fix" data-d="${i}" data-f="${j}" type="button">${esc(f.title.replace(/`/g, ''))}</button>`).join('');
      const auto = d.fixes?.some((f) => f.preferred) ? '<span class="fixable" title="Fixed by Fix problems">auto-fixable</span>' : '';
      return `<li class="problem ${sevClass[d.severity]}" data-i="${i}">
        <button class="loc" data-jump="${d.start}" type="button" title="Go to line ${line}">${line}:${col}</button>
        <div class="body"><div class="msg">${md(d.message).replace(/^<p>|<\/p>$/g, '')}</div>
        <div class="meta"><span class="chip ${sevClass[d.severity]}">${d.severity}</span><span class="rule" title="${esc(RULES[d.rule].description)}">${d.rule}</span>${auto}${fixes}</div></div></li>`;
    })
    .join('');
  el.querySelectorAll<HTMLButtonElement>('.fix').forEach((b) =>
    b.addEventListener('click', () => {
      const fix = list[Number(b.dataset.d)].fixes![Number(b.dataset.f)];
      editor.operation(() => {
        for (const e of [...fix.edits].sort((a, z) => z.start - a.start)) editor.replaceRange(e.text, editor.posFromIndex(e.start), editor.posFromIndex(e.end));
      });
      toast(`Applied: ${fix.title.replace(/`/g, '')}. Ctrl+Z undoes it.`);
      editor.focus();
    }),
  );
  el.querySelectorAll<HTMLButtonElement>('.loc').forEach((b) => b.addEventListener('click', () => jumpTo(Number(b.dataset.jump))));
}

function jumpTo(offset: number) {
  const p = editor.posFromIndex(offset);
  editor.setCursor(p);
  editor.scrollIntoView(p, 80);
  editor.focus();
}

/** F8 / Shift+F8: move through the problems shown in the list. */
function stepProblem(dir: 1 | -1) {
  if (!shownProblems.length) {
    toast('No problems to go to.');
    return;
  }
  selectTab('problems');
  problemIndex = (problemIndex + dir + shownProblems.length) % shownProblems.length;
  document.querySelectorAll('.problem.current').forEach((e) => e.classList.remove('current'));
  const li = document.querySelector(`.problem[data-i="${problemIndex}"]`);
  li?.classList.add('current');
  li?.scrollIntoView({ block: 'nearest' });
  jumpTo(shownProblems[problemIndex].start);
}

function setFilter(f: typeof filter) {
  filter = f;
  document.querySelectorAll<HTMLButtonElement>('.filter').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === f)));
  (editor as any).performLint();
}
document.querySelectorAll<HTMLButtonElement>('.filter').forEach((b) => b.addEventListener('click', () => setFilter(b.dataset.filter as typeof filter)));

// "Fix problems" shows how many it can fix; computing it lints a few times, so debounce.
function scheduleFixCount() {
  clearTimeout(fixCountTimer);
  fixCountTimer = window.setTimeout(() => {
    const n = fixAll(editor.getValue()).applied.length;
    const btn = $('#fix-all') as HTMLButtonElement;
    btn.disabled = n === 0;
    btn.textContent = n ? `Fix ${n} problem${n === 1 ? '' : 's'}` : 'Nothing to fix automatically';
  }, 300);
}

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
    b.addEventListener('click', () => openProbe(Number(b.dataset.probe))),
  );
}
renderProbes();

// ---------------------------------------------------------------------------
// Documents: what's in the editor, where it came from, shareable #links

interface DocMeta { name: string; kind: 'draft' | 'example' | 'template' | 'hub' | 'probe' | 'new'; hash?: string; hubIndex?: number }
const META_KEY = 'nucleus-workbench-doc';
let doc: DocMeta = { name: 'Untitled handler', kind: 'draft' };
let loadedText = editor.getValue();
try {
  const saved = JSON.parse(localStorage.getItem(META_KEY) || 'null');
  if (saved?.name) doc = saved;
  else if (initial === BUGGY) doc = { name: 'Handler with common mistakes', kind: 'example', hash: 'example-mistakes' };
  loadedText = localStorage.getItem(META_KEY + '-base') ?? (initial === BUGGY ? BUGGY : editor.getValue());
} catch {
  /* storage unavailable */
}

function renderDocHead() {
  $('#doc-name').textContent = doc.name;
  $('#doc-edited').hidden = editor.getValue() === loadedText || doc.kind === 'draft' || doc.kind === 'new';
  const h = doc.kind === 'hub' && doc.hubIndex !== undefined ? HUB_EXAMPLES.handlers[doc.hubIndex] : undefined;
  const parts: string[] = [];
  if (h) parts.push(`<span>v${h.version} by ${esc(h.owner)}</span><span class="chip ok">verified on the Hub</span><a href="${esc(h.url)}" target="_blank" rel="noopener">Hub page</a>`);
  else if (doc.kind === 'probe') parts.push('<span>Engine probe</span>');
  else if (doc.kind === 'template') parts.push('<span>Template</span>');
  if (doc.hash) parts.push(`<button class="link" type="button" id="copy-link" title="Copy a link that opens this example">Copy link</button>`);
  $('#doc-meta').innerHTML = parts.join('');
  $('#doc-meta').querySelector('#copy-link')?.addEventListener('click', async () => {
    const url = location.href.replace(/#.*$/, '') + '#' + doc.hash;
    try {
      await navigator.clipboard.writeText(url);
      toast('Link copied. It opens this example for anyone who can open this page.');
    } catch {
      toast(url);
    }
  });
}

function loadSource(src: string, meta: DocMeta) {
  editor.setValue(src);
  editor.clearHistory();
  loadedText = src;
  doc = meta;
  try {
    localStorage.setItem(META_KEY, JSON.stringify(doc));
    localStorage.setItem(META_KEY + '-base', src);
  } catch {
    /* ignore */
  }
  if (meta.hash) history.replaceState(null, '', '#' + meta.hash);
  else if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  renderDocHead();
  aiBox.hidden = true;
  selectTab('problems');
  editor.focus();
}
editor.on('change', () => renderDocHead());

function openHub(i: number) {
  const h = HUB_EXAMPLES.handlers[i];
  loadSource(h.source, { name: h.title, kind: 'hub', hubIndex: i, hash: `hub-${h.id}` });
  toast(`Opened ${h.title} v${h.version} from the Hub.`);
}
function openProbe(i: number) {
  const p = PROBES[i];
  loadSource(p.source, { name: `Probe: ${probeTitle(p.name)}`, kind: 'probe', hash: `probe-${p.name.slice(0, 2)}` });
}
const probeTitle = (name: string) => name.replace(/\.js$/, '').replace(/^\d+-/, '').replace(/-/g, ' ');
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// ---------------------------------------------------------------------------
// Open dialog (Ctrl+K): starters, Hub handlers, probes and actions in one searchable list

interface OpenEntry { group: string; title: string; sub?: string; badges?: string; keywords?: string; run: () => void; lint?: () => string }
const hubLint = new Map<number, string>();
function hubLintBadges(i: number): string {
  let html = hubLint.get(i);
  if (html === undefined) {
    const d = lint(HUB_EXAMPLES.handlers[i].source);
    const e = d.filter((x) => x.severity === 'error').length;
    const w = d.filter((x) => x.severity === 'warning').length;
    html = e ? `<span class="chip error">${e} error${e === 1 ? '' : 's'}</span>` : w ? `<span class="chip warning">${w} warning${w === 1 ? '' : 's'}</span>` : '<span class="chip ok">clean</span>';
    hubLint.set(i, html);
  }
  return html;
}

const outcomeRank = (j: string) => (j === 'LOAD-FAIL' ? 0 : j === 'PLAY-FAIL' ? 1 : 2);
function entries(): OpenEntry[] {
  const jintLabel: Record<string, string> = { OK: 'runs', LOADED: 'loads', 'LOAD-FAIL': "doesn't load", 'PLAY-FAIL': 'Game.Play throws' };
  const list: OpenEntry[] = [
    { group: 'Start', title: 'New handler…', sub: 'Game name, executable and features; generates a handler that passes the linter.', keywords: 'create template', run: () => newDialog.showModal() },
    { group: 'Start', title: 'Handler with common mistakes', sub: 'The mistakes Nucleus trips over most; most fix themselves in one click.', keywords: 'example buggy sample', run: () => loadSource(BUGGY, { name: 'Handler with common mistakes', kind: 'example', hash: 'example-mistakes' }) },
    ...TEMPLATE_SAMPLES.map((t, i) => ({
      group: 'Start',
      title: `Template: ${t.label.replace('Template: ', '')}`,
      sub: t.features.length ? FEATURES.filter((f) => t.features.includes(f.id)).map((f) => f.label).join(' + ') : 'The minimal starting point.',
      keywords: 'template',
      run: () => loadSource(sampleSource(`tpl:${i}`), { name: t.label, kind: 'template', hash: `template-${slug(t.label.replace('Template: ', ''))}` }),
    })),
    { group: 'Actions', title: 'Fix problems automatically', sub: 'Alt+Shift+F', keywords: 'fix all repair', run: () => ($('#fix-all') as HTMLButtonElement).click() },
    { group: 'Actions', title: 'Simulate the handler', sub: 'Ctrl+Enter: launch arguments and file edits per player', keywords: 'run play simulate', run: () => selectTab('simulate') },
    { group: 'Actions', title: 'Search the handler API', sub: 'Options, Context methods and Nucleus enums with docs', keywords: 'api docs reference', run: () => { selectTab('api'); ($('#api-q') as HTMLInputElement).focus(); } },
    { group: 'Actions', title: 'Copy the handler', keywords: 'clipboard', run: () => ($('#copy') as HTMLButtonElement).click() },
    { group: 'Actions', title: 'Keyboard shortcuts', keywords: 'help keys', run: () => helpDialog.showModal() },
    ...HUB_EXAMPLES.handlers.map((h, i) => ({
      group: 'Hub handlers',
      title: h.title,
      sub: `${h.game && !h.title.toLowerCase().startsWith(h.game.toLowerCase().slice(0, 12)) ? `${h.game} · ` : ''}by ${h.owner} · v${h.version} · ${h.downloads.toLocaleString()} downloads${h.maxPlayers ? ` · up to ${h.maxPlayers} players` : ''}${h.multiKbm ? ' · multiple keyboards & mice' : ''}`,
      keywords: `${h.game} ${h.owner} hub`,
      lint: () => hubLintBadges(i),
      run: () => openHub(i),
    })),
    ...PROBES.map((p, i) => ({ p, i }))
      .sort((a, b) => outcomeRank(a.p.jint) - outcomeRank(b.p.jint) || a.i - b.i)
      .map(({ p, i }) => ({
      group: `Engine probes: ${p.jint === 'LOAD-FAIL' ? "doesn't load" : p.jint === 'PLAY-FAIL' ? 'Game.Play throws' : 'works'}`,
      title: probeTitle(p.name),
      sub: p.detail || undefined,
      badges: `<span class="chip ${p.jint === 'LOAD-FAIL' || p.jint === 'PLAY-FAIL' ? 'error' : 'ok'}">Jint: ${jintLabel[p.jint] ?? p.jint}</span>`,
      keywords: `probe ${p.name}`,
      run: () => openProbe(i),
    })),
  ];
  return list;
}

const openDialog = $('#open-dialog') as HTMLDialogElement;
const helpDialog = $('#help-dialog') as HTMLDialogElement;
const newDialog = $('#new-dialog') as HTMLDialogElement;
let shownEntries: OpenEntry[] = [];
let activeEntry = 0;

function renderOpen() {
  const q = ($('#open-q') as HTMLInputElement).value.trim().toLowerCase();
  const all = entries();
  let shown: OpenEntry[];
  if (q) {
    const words = q.split(/\s+/);
    shown = all
      .map((e) => {
        const title = e.title.toLowerCase();
        const hay = `${title} ${(e.sub ?? '').toLowerCase()} ${(e.keywords ?? '').toLowerCase()} ${e.group.toLowerCase()}`;
        if (!words.every((w) => hay.includes(w))) return null;
        const score = words.reduce((n, w) => n + (title.startsWith(w) ? 4 : title.includes(w) ? 2 : 1), 0);
        return { e, score };
      })
      .filter((x): x is { e: OpenEntry; score: number } => !!x)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.e)
      .slice(0, 60);
  } else {
    shown = all.filter((e) => e.group !== 'Actions');
  }
  shownEntries = shown;
  activeEntry = Math.min(activeEntry, Math.max(0, shown.length - 1));
  const body = $('#open-body');
  if (!shown.length) {
    body.innerHTML = `<p class="empty">Nothing matches "${esc(q)}". Try a game name, an author, or words like "template", "mutex" or "arrow".</p>`;
    return;
  }
  const taken = HUB_EXAMPLES.takenAt ? new Date(HUB_EXAMPLES.takenAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';
  const groupNote: Record<string, string> = {
    'Hub handlers': `${HUB_EXAMPLES.handlers.length} most-downloaded, current version verified, as of ${esc(taken)}`,
  };
  let html = '';
  let lastGroup = '';
  shown.forEach((e, i) => {
    const group = q ? 'Results' : e.group;
    if (group !== lastGroup) {
      if (lastGroup) html += '</div>';
      html += `<div class="group-title">${esc(group)}${groupNote[group] ? ` <small>${groupNote[group]}</small>` : ''}</div><div class="entries${q ? ' rows' : ''}">`;
      lastGroup = group;
    }
    html += `<button class="entry${i === activeEntry ? ' active' : ''}" type="button" role="option" data-e="${i}" aria-selected="${i === activeEntry}">
      ${q ? `<span class="kind">${esc(e.group)}</span>` : ''}<span class="t">${esc(e.title)}</span>${e.sub ? `<span class="s">${esc(e.sub)}</span>` : ''}
      ${e.badges || e.lint ? `<span class="b">${e.badges ?? ''}<span data-lint="${i}"></span></span>` : ''}</button>`;
  });
  html += '</div>';
  body.innerHTML = html;
  body.querySelectorAll<HTMLButtonElement>('.entry').forEach((b) => b.addEventListener('click', () => runEntry(Number(b.dataset.e))));
  // Lint results for Hub cards fill in progressively, without blocking typing.
  const pending = shown.map((e, i) => ({ e, i })).filter(({ e }) => e.lint);
  const fill = () => {
    const batch = pending.splice(0, 6);
    for (const { e, i } of batch) {
      const slot = body.querySelector(`[data-lint="${i}"]`);
      if (slot && shownEntries[i] === e) slot.innerHTML = e.lint!();
    }
    if (pending.length && openDialog.open) setTimeout(fill, 0);
  };
  setTimeout(fill, 0);
}

function runEntry(i: number) {
  const e = shownEntries[i];
  if (!e) return;
  openDialog.close();
  e.run();
}
function moveActive(d: number) {
  if (!shownEntries.length) return;
  activeEntry = (activeEntry + d + shownEntries.length) % shownEntries.length;
  document.querySelectorAll('#open-body .entry').forEach((el, i) => {
    el.classList.toggle('active', i === activeEntry);
    el.setAttribute('aria-selected', String(i === activeEntry));
  });
  document.querySelector('#open-body .entry.active')?.scrollIntoView({ block: 'nearest' });
}
function showOpen() {
  ($('#open-q') as HTMLInputElement).value = '';
  activeEntry = 0;
  renderOpen();
  openDialog.showModal();
  ($('#open-q') as HTMLInputElement).focus();
}
$('#open-open').addEventListener('click', showOpen);
$('#open-close').addEventListener('click', () => openDialog.close());
$('#open-q').addEventListener('input', () => {
  activeEntry = 0;
  renderOpen();
});
$('#open-q').addEventListener('keydown', (e: KeyboardEvent) => {
  const cols = ($('#open-q') as HTMLInputElement).value.trim() ? 1 : Math.max(1, Math.floor(($('#open-body').clientWidth || 1) / 246));
  if (e.key === 'ArrowDown') { e.preventDefault(); moveActive(cols); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); moveActive(-cols); }
  else if (e.key === 'ArrowRight' && cols > 1) { e.preventDefault(); moveActive(1); }
  else if (e.key === 'ArrowLeft' && cols > 1) { e.preventDefault(); moveActive(-1); }
  else if (e.key === 'Enter') { e.preventDefault(); runEntry(activeEntry); }
});
openDialog.addEventListener('click', (e) => {
  if (e.target === openDialog) openDialog.close(); // click on the backdrop
});

// ---------------------------------------------------------------------------
// New handler

$('#feature-list').innerHTML = FEATURES.map(
  (f) => `<label class="check"><input type="checkbox" id="feat-${f.id}" value="${f.id}"><span><strong>${esc(f.label)}</strong><small>${esc(f.detail)}</small></span></label>`,
).join('');
$('#new-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = ($('#new-name') as HTMLInputElement).value.trim();
  const exe = ($('#new-exe') as HTMLInputElement).value.trim();
  const steam = ($('#new-steam') as HTMLInputElement).value.trim();
  const features = FEATURES.filter((f) => ($(`#feat-${f.id}`) as HTMLInputElement).checked).map((f) => f.id);
  newDialog.close();
  loadSource(renderHandler({ gameName: name, executableName: exe, steamId: steam || undefined, features }), { name: `${name}.js`, kind: 'new' });
  toast('Created. It passes the linter; next, simulate it or adjust the options.');
});
$('#new-open').addEventListener('click', () => newDialog.showModal());
$('#new-cancel').addEventListener('click', () => newDialog.close());

// ---------------------------------------------------------------------------
// Copy, toast, help, tabs, shortcuts

$('#copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(editor.getValue());
    toast(`Copied ${editor.lineCount()} lines.`);
  } catch {
    editor.execCommand('selectAll');
    editor.focus();
    toast('Selected the handler. Press Ctrl+C to copy.');
  }
});

let toastTimer: number | undefined;
function toast(text: string) {
  const el = $('#toast');
  el.textContent = text;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => (el.hidden = true), 3200);
}

$('#help-open').addEventListener('click', () => helpDialog.showModal());
$('#help-open-2').addEventListener('click', () => helpDialog.showModal());
$('#help-close').addEventListener('click', () => helpDialog.close());

const TAB_KEY = 'nucleus-workbench-tab';
function selectTab(id: string) {
  document.querySelectorAll<HTMLButtonElement>('[role=tab]').forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === id)));
  document.querySelectorAll<HTMLElement>('[role=tabpanel]').forEach((p) => (p.hidden = p.id !== `panel-${id}`));
  if (id === 'simulate') runSim();
  try {
    localStorage.setItem(TAB_KEY, id);
  } catch {
    /* ignore */
  }
}
document.querySelectorAll<HTMLButtonElement>('[role=tab]').forEach((t) => t.addEventListener('click', () => selectTab(t.dataset.tab!)));

const SIM_KEY = 'nucleus-workbench-sim';
const simIds = ['sim-players', 'sim-res', 'sim-kb'];
try {
  const saved = JSON.parse(localStorage.getItem(SIM_KEY) || '{}');
  for (const id of simIds) if (saved[id] !== undefined) ($(`#${id}`) as HTMLSelectElement).value = saved[id];
} catch {
  /* ignore */
}
simIds.forEach((id) =>
  $(`#${id}`).addEventListener('change', () => {
    try {
      localStorage.setItem(SIM_KEY, JSON.stringify(Object.fromEntries(simIds.map((x) => [x, ($(`#${x}`) as HTMLSelectElement).value]))));
    } catch {
      /* ignore */
    }
    runSim();
  }),
);

document.addEventListener('keydown', (e: KeyboardEvent) => {
  const mod = e.ctrlKey || e.metaKey;
  if (mod && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    if (openDialog.open) openDialog.close();
    else showOpen();
  } else if (mod && e.key === 'Enter') {
    e.preventDefault();
    selectTab('simulate');
  } else if (e.altKey && e.shiftKey && e.code === 'KeyF') {
    e.preventDefault();
    ($('#fix-all') as HTMLButtonElement).click();
  } else if (e.key === 'F8') {
    e.preventDefault();
    stepProblem(e.shiftKey ? -1 : 1);
  } else if (e.key === '?' && !(e.target as HTMLElement).closest('.CodeMirror, input, textarea, select')) {
    e.preventDefault();
    helpDialog.showModal();
  }
});

$('#build-info').textContent = `Linter and API from splitscreenme-vscode @ ${BUILD.core} · Nucleus @ ${BUILD.nucleus ?? '?'} · Jint ${BUILD.jint ?? '2.11.58'}`;

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

// ---------------------------------------------------------------------------
// Start-up: #links, first-visit welcome, last tab

function openFromHash(): boolean {
  const h = decodeURIComponent(location.hash.slice(1));
  if (!h) return false;
  if (h.startsWith('hub-')) {
    const i = HUB_EXAMPLES.handlers.findIndex((x) => x.id === h.slice(4));
    if (i >= 0) return openHub(i), true;
  } else if (h.startsWith('probe-')) {
    const i = PROBES.findIndex((p) => p.name.startsWith(h.slice(6).padStart(2, '0') + '-'));
    if (i >= 0) return openProbe(i), true;
  } else if (h === 'example-mistakes') {
    return loadSource(BUGGY, { name: 'Handler with common mistakes', kind: 'example', hash: h }), true;
  } else if (h.startsWith('template-')) {
    const i = TEMPLATE_SAMPLES.findIndex((t) => `template-${slug(t.label.replace('Template: ', ''))}` === h);
    if (i >= 0) return loadSource(sampleSource(`tpl:${i}`), { name: TEMPLATE_SAMPLES[i].label, kind: 'template', hash: h }), true;
  }
  toast(`The link "#${h}" doesn't match an example in this build.`);
  return false;
}
window.addEventListener('hashchange', () => {
  if (location.hash.slice(1) !== doc.hash) openFromHash();
});

const WELCOME_KEY = 'nucleus-workbench-welcomed';
let welcomed = false;
try {
  welcomed = localStorage.getItem(WELCOME_KEY) === '1';
} catch {
  /* ignore */
}
if (!welcomed) {
  const w = $('#welcome');
  w.innerHTML = `<h3>Test a Nucleus Co-op handler before you open Nucleus</h3>
    <ol><li>Paste a handler, or open one of 40 verified Hub handlers with <button class="link" type="button" data-w="open">Open (Ctrl K)</button>.</li>
    <li>Fix what Nucleus would reject: most problems fix themselves with one click.</li>
    <li><button class="link" type="button" data-w="sim">Simulate</button> it to see each player's launch arguments and file edits.</li></ol>
    <button class="btn" type="button" data-w="close">Got it</button>`;
  w.hidden = false;
  w.querySelector('[data-w=open]')!.addEventListener('click', showOpen);
  w.querySelector('[data-w=sim]')!.addEventListener('click', () => selectTab('simulate'));
  w.querySelector('[data-w=close]')!.addEventListener('click', () => {
    w.hidden = true;
    try {
      localStorage.setItem(WELCOME_KEY, '1');
    } catch {
      /* ignore */
    }
  });
}

let startTab = 'problems';
try {
  startTab = localStorage.getItem(TAB_KEY) || 'problems';
} catch {
  /* ignore */
}
if (!openFromHash()) {
  renderDocHead();
  selectTab(['problems', 'simulate', 'api', 'probes'].includes(startTab) ? startTab : 'problems');
}
