import { applyTheme, initDevBar } from './devbar';
import { canShare, decodeShare, encodeShare, SHARE_PREFIX } from './share';
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
import { renderHandler, FEATURES } from '@core/templates';
import { simulate, sessionSummary, groupIgnored } from '@core/sim';
import { buildPrompt, pageTools, diffLines, hunks, counts, newProblems } from './aifix';
import { fixAll } from '@core/fix';
import { zipStore } from './zipstore';
import { initLines } from './lines-ui';
import { initTips } from './tips-ui';
import { initSettings } from './settings-ui';
import { initNews } from './news';
import { initPanels } from './panels-ui';
import { initTouchTitles } from './touch-titles';

declare const PROBES: { name: string; source: string; jint: string; detail: string }[];
applyTheme();
declare const BUILD: { bench?: string; core: string; nucleus: string | null; jint: string | null };
interface HubExample { id: string; title: string; game: string; owner: string; version: number; downloads: number; maxPlayers: number | null; multiKbm: boolean; updated: string | null; url: string; source?: string; lint?: { errors: number; warnings: number } }
/** base: where hub/<id>.js are fetched from when the sources aren't in the page (GitHub Pages). */
declare const HUB_EXAMPLES: { takenAt: string | null; handlers: HubExample[]; base: string | null };
declare const BOT_TEMPLATES: { commit: string | null; templates: { id: string; name: string; source: string }[] };

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


const BUGGY = `// A handler with common mistakes. See what Check finds, then fix them.
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


// ---------------------------------------------------------------------------
// Editor

/** Plain-language explanations for the Simple view. */
const PLAIN: Record<string, { title: string; why: string }> = {
  'syntax-error': { title: "Nucleus can't read this file", why: 'Something is missing or extra here, often a bracket, a quote or a comma. Nothing else can be checked until this is fixed.' },
  'es5-only': { title: 'Newer JavaScript than Nucleus understands', why: 'Nucleus only reads an older form of JavaScript, so it stops loading the handler here.' },
  'let-const-semantics': { title: 'Written in a newer style', why: 'Nucleus treats this like a plain "var". Usually harmless.' },
  'unknown-member': { title: "A setting Nucleus doesn't know", why: "Nucleus skips it, so it does nothing. It's usually a typo." },
  'readonly-member': { title: 'A value Nucleus sets by itself', why: 'Changing it here has no effect.' },
  'type-mismatch': { title: 'The value has the wrong form', why: 'Nucleus expects a different kind of value here, for example a list in [ ] brackets, or true / false.' },
  'wrong-arguments': { title: 'A function gets the wrong number of values', why: 'Nucleus stops with an error when it reaches this line.' },
  'missing-required': { title: 'Required information is missing', why: "Every handler needs the game's name, a GUID and the game's .exe file name." },
  'callback-only-global': { title: 'Code in the wrong place', why: 'This code needs the game to be starting, so it belongs inside Game.Play. Here it stops Nucleus from loading the handler.' },
  'duplicate-assignment': { title: 'The same setting is set twice', why: 'Only the last value counts, so this one does nothing.' },
  'hub-install-parse': { title: 'Would break installing this handler', why: 'When installing, Nucleus reads the game name and .exe from these lines in a strict way.' },
  'guid-characters': { title: 'Special characters in the GUID', why: 'The GUID becomes a folder name. Letters, digits and spaces are safest.' },
  'protoinput-legacy-hooks': { title: 'Old input settings are still on', why: 'With Proto Input they should be turned off, or two input systems run at once.' },
  'missing-builtin': { title: "A JavaScript function Nucleus doesn't have", why: "Nucleus uses an older JavaScript engine that lacks this function, so the handler stops with an error when it reaches this line." },
  deprecated: { title: 'An outdated setting', why: 'It still works, but it has been replaced.' },
};

/** Plain-language text for a problem; some messages are more specific than their rule. */
function plainFor(d: Diagnostic): { title: string; why: string } {
  if (d.rule === 'unknown-member' && /four controllers/.test(d.message)) {
    return { title: "A controller slot Nucleus doesn't have", why: 'Nucleus and Proto Input take at most four controllers per instance (ProtoController1 to 4), so this line does nothing. Removing it is safe.' };
  }
  return PLAIN[d.rule] ?? { title: d.rule, why: '' };
}

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

// Advanced mode (off by default) only ADDS detail to the same screens: exact positions, rule ids,
// severity filters and suggestions, technical messages expanded, recorded calls, engine probes.
type Mode = 'simple' | 'dev';
const MODE_KEY = 'nucleus-workbench-advanced';
let mode: Mode = 'simple';
try {
  mode = localStorage.getItem(MODE_KEY) === '1' ? 'dev' : 'simple';
} catch {
  /* storage unavailable */
}
document.documentElement.dataset.mode = mode;

// Lint in a Web Worker so typing never waits; fall back to the main thread if workers are unavailable.
type Analysis = { diagnostics: Diagnostic[]; fixable: number };
let worker: Worker | null = null;
let reqId = 0;
const pending = new Map<number, { text: string; resolve: (a: Analysis) => void }>();
const analyzeHere = (text: string): Analysis => ({ diagnostics: lint(text), fixable: fixAll(text).applied.length });
try {
  worker = new Worker((globalThis as any).__WORKER_URL);
  worker.onmessage = (e: MessageEvent<Analysis & { id: number }>) => {
    const p = pending.get(e.data.id);
    pending.delete(e.data.id);
    p?.resolve(e.data);
  };
  worker.onerror = () => {
    worker = null;
    for (const [id, p] of pending) {
      pending.delete(id);
      p.resolve(analyzeHere(p.text));
    }
  };
} catch {
  worker = null;
}
function analyze(text: string): Promise<Analysis> {
  if (!worker) return Promise.resolve(analyzeHere(text));
  const id = ++reqId;
  return new Promise((resolve) => {
    pending.set(id, { text, resolve });
    worker!.postMessage({ id, text });
  });
}
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
    getAnnotations: (text: string) =>
      analyze(text).then((r) => {
        current = r.diagnostics;
        setFixCount(r.fixable);
        renderProblems(text);
        return current
          .filter((d) => d.severity !== 'hint' || (mode === 'dev' && filter === 'hint'))
          .map((d) => ({
            from: posAt(text, d.start),
            to: posAt(text, Math.max(d.end, d.start + 1)),
            message: `${plainFor(d).title}. ${d.message.replace(/`/g, '')}${mode === 'dev' ? ` [${d.rule}]` : ''}`,
            severity: d.severity === 'error' ? 'error' : d.severity === 'warning' ? 'warning' : 'info',
          }));
      }),
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
const coarse = matchMedia('(pointer: coarse)');
function showSignature() {
  const text = editor.getValue();
  const c = callContextAt(text, editor.indexFromPos(editor.getCursor()));
  if (!c || (c.callee.kind !== 'member' && c.callee.kind !== 'nucleusClass')) {
    // Touch screens have no hover: show the docs for whatever is under the cursor instead.
    if (coarse.matches) {
      const r = resolveAt(text, editor.indexFromPos(editor.getCursor()));
      if (r && r.resolved.kind === 'member') {
        const m = r.resolved.member;
        sig.innerHTML = `<div><strong>${esc(ownerLabel(r.resolved.owner))}.${esc(r.resolved.name)}</strong>: ${esc(m.kind === 'method' ? 'method' : m.ts ?? '')}${m.doc ? ` · ${esc(m.doc.split('\n')[0].slice(0, 140))}` : ''}</div>`;
        sig.hidden = false;
        return;
      }
    }
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
  const simple = mode === 'simple';
  const rank = { error: 0, warning: 1, info: 2, hint: 3 } as Record<string, number>;
  // Errors first (they stop Nucleus), then in line order.
  const list = (simple ? current.filter((d) => d.severity === 'error' || d.severity === 'warning') : current.filter((d) => (filter === 'all' ? d.severity !== 'hint' : d.severity === filter)))
    .slice()
    .sort((a, b) => rank[a.severity] - rank[b.severity] || a.start - b.start);
  shownProblems = list;
  problemIndex = -1;
  queueMicrotask(renderStrip);
  const serious = counts.error + counts.warning;
  $('#count-problems').textContent = String(serious);
  $('#count-switch').textContent = String(serious);
  $('#f-all').textContent = String(counts.error + counts.warning + counts.info);
  for (const k of ['error', 'warning', 'info', 'hint']) $(`#f-${k}`).textContent = String(counts[k]);
  const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;
  const tally = simple ? '' : ` <span class="muted">(${plural(counts.error, 'error')}, ${plural(counts.warning, 'warning')}, ${counts.info} info)</span>`;
  $('#status').innerHTML = counts.error
    ? `<span class="pill error">Nucleus can't use this handler yet</span><span>${plural(serious, 'thing')} to fix${tally}</span>`
    : counts.warning
      ? `<span class="pill ok">Nucleus can use this handler</span><span>but ${plural(counts.warning, 'setting')} may not work as intended${tally}</span>`
      : `<span class="pill ok">Ready for Nucleus</span><span>Next: <button class="link" type="button" id="v-try">try it</button>${tally}</span>`;
  $('#status').querySelector('#v-try')?.addEventListener('click', () => selectTab('simulate'));
  const el = $('#problems');
  if (!list.length) {
    el.innerHTML =
      simple || filter === 'all'
        ? `<li class="empty">Nothing to fix. <button class="link" type="button" id="go-sim">Try it</button> to see what each player gets.${
            simple ? '' : counts.hint ? ` There ${counts.hint === 1 ? 'is' : 'are'} also <button class="link" type="button" id="go-hints">${plural(counts.hint, 'hint')}</button> about outdated options.` : ''
          }</li>`
        : `<li class="empty">No ${filter === 'info' ? 'info' : filter + 's'}.</li>`;
    el.querySelector('#go-sim')?.addEventListener('click', () => selectTab('simulate'));
    el.querySelector('#go-hints')?.addEventListener('click', () => setFilter('hint'));
    return;
  }
  el.innerHTML = list
    .map((d, i) => {
      const line = lineOf(text, d.start) + 1;
      const col = d.start - (text.lastIndexOf('\n', d.start - 1) + 1) + 1;
      const plain = plainFor(d);
      const about = d.message.match(/`([^`]+)`/)?.[1];
      const fixes = (d.fixes ?? [])
        .map((f, j) => `<button class="fix${f.preferred ? ' primary' : ''}" data-d="${i}" data-f="${j}" type="button" title="${esc(f.title.replace(/`/g, ''))}">${f.preferred ? 'Fix this' : esc(f.title.replace(/`/g, ''))}</button>`)
        .join('');
      // Advanced adds (never replaces): the column, severity, rule id and the technical message expanded.
      const extra = simple ? '' : `<span class="chip ${sevClass[d.severity]}">${d.severity}</span><span class="rule" title="${esc(RULES[d.rule].description)}">${d.rule}</span>`;
      return `<li class="problem ${sevClass[d.severity]}" data-i="${i}">
        <button class="loc" data-jump="${d.start}" type="button" title="Show this line">Line ${line}${simple ? '' : `:${col}`}</button>
        <div class="body"><div class="plain-title">${esc(plain.title)}${about ? `: <code>${esc(about)}</code>` : ''}</div>
        <p class="plain-why">${esc(plain.why)}</p>
        <div class="meta">${fixes}<button class="link" type="button" data-jump="${d.start}">Show me</button>${extra}</div>
        <details class="tech"${simple ? '' : ' open'}><summary>Technical details</summary>${md(d.message).replace(/^<p>|<\/p>$/g, '')}</details></div></li>`;
    })
    .join('');
  el.querySelectorAll<HTMLButtonElement>('.fix').forEach((b) =>
    b.addEventListener('click', () => {
      const fix = list[Number(b.dataset.d)].fixes![Number(b.dataset.f)];
      editor.operation(() => {
        for (const e of [...fix.edits].sort((a, z) => z.start - a.start)) editor.replaceRange(e.text, editor.posFromIndex(e.start), editor.posFromIndex(e.end));
      });
      toast(`Fixed: ${fix.title.replace(/`/g, '')}. Ctrl+Z undoes it.`);
    }),
  );
  el.querySelectorAll<HTMLButtonElement>('[data-jump]').forEach((b) => b.addEventListener('click', () => jumpTo(Number(b.dataset.jump))));
}

// ---------------------------------------------------------------------------
// Problems on one line: tap (or click) a marker next to the code. On phones, a strip under the
// code steps through the problems, so writing code doesn't mean switching to Results.

const linePop = $('#line-pop');
function lineProblems(line: number, all = false): Diagnostic[] {
  const text = editor.getValue();
  const simple = mode === 'simple' && !all;
  return current.filter((d) => lineOf(text, d.start) === line && (simple ? d.severity === 'error' || d.severity === 'warning' : d.severity !== 'hint'));
}
/** The problems on a line, or with `at`, only those covering that spot plus the docs of the name
 *  there (touch screens: tap a marked word, or hold any name). */
function showLineProblems(line: number, at?: number) {
  const list = lineProblems(line, at !== undefined).filter((d) => at === undefined || (d.start <= at && at <= Math.max(d.end, d.start + 1)));
  let doc = '';
  if (at !== undefined) {
    const text = editor.getValue();
    const r = resolveAt(text, at);
    doc = r ? describeResolved(r.resolved, text.slice(r.start, r.end)) : '';
  }
  if (!list.length && !doc) return hideLinePop();
  linePop.innerHTML =
    `<button class="btn icon lp-close" type="button" aria-label="Close">×</button>` +
    (doc ? `<div class="lp-doc">${doc}</div>` : '') +
    list
      .map((d, i) => {
        const plain = plainFor(d);
        const about = d.message.match(/`([^`]+)`/)?.[1];
        const fix = (d.fixes ?? []).find((f) => f.preferred) ?? d.fixes?.[0];
        return `<div class="lp-item ${sevClass[d.severity]}"><div class="lp-title">Line ${line + 1}: ${esc(plain.title)}${about ? `: <code>${esc(about)}</code>` : ''}</div><div class="lp-why">${esc(plain.why)}</div><div class="lp-actions">${fix ? `<button class="btn primary" type="button" data-lp-fix="${i}">${fix.preferred ? 'Fix this' : esc(fix.title.replace(/`/g, ''))}</button>` : ''}<button class="link" type="button" data-lp-more>More in Check</button></div></div>`;
      })
      .join('');
  // Under the line, or above it near the bottom of the editor.
  const top = editor.charCoords({ line, ch: 0 }, 'local').bottom - editor.getScrollInfo().top;
  const h = $('#editor').clientHeight;
  linePop.style.top = top + 8 < h * 0.55 ? `${top + 8}px` : '';
  linePop.style.bottom = top + 8 < h * 0.55 ? '' : `${Math.max(8, h - top + 28)}px`;
  linePop.hidden = false;
  linePop.querySelector('.lp-close')!.addEventListener('click', hideLinePop);
  linePop.querySelectorAll<HTMLButtonElement>('[data-lp-fix]').forEach((b) =>
    b.addEventListener('click', () => {
      const d = list[Number(b.dataset.lpFix)];
      const fix = (d.fixes ?? []).find((f) => f.preferred) ?? d.fixes![0];
      editor.operation(() => {
        for (const e of [...fix.edits].sort((a, z) => z.start - a.start)) editor.replaceRange(e.text, editor.posFromIndex(e.start), editor.posFromIndex(e.end));
      });
      hideLinePop();
      toast(`Fixed: ${fix.title.replace(/`/g, '')}. Ctrl+Z undoes it.`);
    }),
  );
  linePop.querySelectorAll('[data-lp-more]').forEach((b) =>
    b.addEventListener('click', () => {
      hideLinePop();
      if (narrow()) setView('results');
      selectTab('problems');
    }),
  );
}
function hideLinePop() {
  linePop.hidden = true;
}
editor.on('gutterClick', (_cm: any, line: number) => showLineProblems(line));

// Touch screens have no hover: the mouse events a tap fakes would open the hover docs and the
// problem tooltips and leave them stuck. Instead, a tap on an underlined word shows its problems
// (and docs), and holding any name shows its docs. The keyboard and native selection still work.
{
  const wrap = editor.getWrapperElement();
  let touchAt = 0;
  let start: { x: number; y: number; t: number } | undefined;
  let hold: number | undefined;
  const indexAt = (x: number, y: number) => editor.indexFromPos(editor.coordsChar({ left: x, top: y }, 'window'));
  const popAt = (x: number, y: number) => {
    const i = indexAt(x, y);
    showLineProblems(editor.posFromIndex(i).line, i);
  };
  for (const type of ['mouseover', 'mousemove', 'mouseout']) wrap.addEventListener(type, (e: Event) => Date.now() - touchAt < 1000 && e.stopPropagation(), true);
  wrap.addEventListener('pointerdown', (e: PointerEvent) => {
    if (e.pointerType !== 'touch') return;
    touchAt = Date.now();
    tip.hidden = true;
    if ((e.target as HTMLElement).closest('.CodeMirror-gutters, #line-pop')) return (start = undefined);
    start = { x: e.clientX, y: e.clientY, t: Date.now() };
    clearTimeout(hold);
    hold = window.setTimeout(() => start && (popAt(start.x, start.y), (start = undefined)), 500);
  }, true);
  wrap.addEventListener('pointermove', (e: PointerEvent) => {
    if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > 10) (clearTimeout(hold), (start = undefined));
  }, true);
  const end = (e: PointerEvent) => {
    if (e.pointerType !== 'touch') return;
    touchAt = Date.now();
    clearTimeout(hold);
    const s = start;
    start = undefined;
    if (!s || e.type === 'pointercancel') return;
    // A short tap: only on an underlined (marked) word, so tapping to type stays quiet.
    const el = document.elementFromPoint(s.x, s.y);
    if (el?.closest('.CodeMirror-lint-mark')) requestAnimationFrame(() => popAt(s.x, s.y));
  };
  wrap.addEventListener('pointerup', end, true);
  wrap.addEventListener('pointercancel', end, true);
}
editor.on('change', hideLinePop);
editor.on('scroll', hideLinePop);

let stripIndex = 0;
function renderStrip() {
  const strip = $('#probstrip');
  const list = shownProblems;
  strip.hidden = !list.length;
  if (!list.length) return;
  stripIndex = Math.min(stripIndex, list.length - 1);
  const d = list[stripIndex];
  const errors = list.filter((x) => x.severity === 'error').length;
  const line = lineOf(editor.getValue(), d.start) + 1;
  $('#ps-text').innerHTML = `<span class="ps-count">${errors ? `<span class="e">✖ ${errors}</span>` : ''}${list.length - errors ? `<span class="w">⚠ ${list.length - errors}</span>` : ''}</span><span class="ps-msg">Line ${line}: ${esc(plainFor(d).title)}</span>`;
}
function stripStep(dir: number) {
  if (!shownProblems.length) return;
  stripIndex = (stripIndex + dir + shownProblems.length) % shownProblems.length;
  renderStrip();
  const d = shownProblems[stripIndex];
  const p = editor.posFromIndex(d.start);
  editor.scrollIntoView(p, 80);
  editor.setCursor(p);
  showLineProblems(p.line);
}
$('#ps-prev').addEventListener('click', () => stripStep(-1));
$('#ps-next').addEventListener('click', () => stripStep(1));
$('#ps-text').addEventListener('click', () => stripStep(0));

function jumpTo(offset: number) {
  if (narrow()) setView('code');
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

// "Fix problems" shows how many it can fix (counted in the worker along with the lint).
function setFixCount(n: number) {
  const btn = $('#fix-all') as HTMLButtonElement;
  btn.disabled = n === 0;
  btn.textContent = n ? `Fix ${n} problem${n === 1 ? '' : 's'} automatically` : 'Nothing to fix automatically';
}

// ---------------------------------------------------------------------------
// Simulate

function runSim() {
  const players = Number(($('#sim-players') as HTMLSelectElement).value);
  const [width, height] = ($('#sim-res') as HTMLSelectElement).value.split('x').map(Number);
  const kb = Number(($('#sim-kb') as HTMLSelectElement).value);
  const r = simulate(editor.getValue(), { players, width, height, keyboardPlayer: kb });
  const out: string[] = [];
  const simple = mode === 'simple';
  if (!r.loaded) {
    out.push(
      `<div class="banner error"><strong>${esc(sessionSummary(r))}</strong> Fix the problems first.<div class="mono small">${esc(r.loadError ?? '')}</div><div class="banner-actions">${($('#fix-all') as HTMLButtonElement).disabled ? '' : `<button class="btn primary" type="button" id="sim-fix">${esc(($('#fix-all') as HTMLButtonElement).textContent ?? 'Fix problems')}</button>`}<button class="btn" type="button" id="sim-check">Show the problems</button></div></div>`,
    );
  } else {
    out.push(`<div class="banner ${r.sessionEnded ? 'error' : 'ok'}"><strong>${esc(sessionSummary(r))}</strong></div>`);
    if (r.inputNote) out.push(`<p class="note">${esc(r.inputNote)}</p>`);
  }
  if (r.ignored.length) {
    const uniq = groupIgnored(r.ignored);
    out.push(`<h3>Settings Nucleus skips <span class="count">${uniq.length}</span></h3><ul class="mono-list warn">${uniq.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>`);
  }
  for (const p of r.players) {
    const ownKb = p.index === kb || kb === -2; // -2: each player their own keyboard and mouse
    const role = ownKb ? 'keyboard & mouse' : 'controller';
    out.push(`<section class="player p${(p.index % 8) + 1}"><h3>Player ${p.index + 1} <span class="chip ${ownKb ? 'info' : ''}">${role}</span></h3>
      ${p.error ? `<div class="banner error">Setting up this player fails here, and Nucleus ends the session.<div class="mono small">${esc(p.error)}</div></div>` : ''}
      ${p.note ? `<p class="muted">${esc(p.note)}</p>` : ''}
      <dl><dt>Window</dt><dd>${esc(p.window)}</dd>
      <dt>Starts the game with</dt><dd class="mono">${p.startArguments ? esc(p.startArguments) : '<span class="muted">(nothing extra)</span>'}</dd></dl>
      ${p.effects.length ? `<dl><dt>Changes before the game starts</dt><dd><ul class="effects">${p.effects.map((e) => `<li>${esc(e)}</li>`).join('')}</ul></dd></dl>` : '<p class="muted">Changes no files before the game starts.</p>'}
      ${!simple ? (p.calls.length ? `<details ${r.players.length <= 2 ? 'open' : ''}><summary>${p.calls.length} recorded call${p.calls.length > 1 ? 's' : ''}</summary><ul class="mono-list">${p.calls.map((c) => `<li>${esc(c)}</li>`).join('')}</ul></details>` : '<p class="muted">No Context or System calls.</p>') : ''}
    </section>`);
  }
  for (const c of r.callbacks) {
    out.push(`<section class="player"><h3>${esc(c.name)}</h3>${c.error ? `<div class="banner error">${esc(c.note ?? '')}<div class="mono small">${esc(c.error)}</div></div>` : ''}
      ${simple ? '' : `<details><summary>${c.calls.length} recorded call${c.calls.length === 1 ? '' : 's'}</summary><ul class="mono-list">${c.calls.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></details>`}</section>`);
  }
  if (r.options.length) {
    out.push(`<details><summary>${r.options.length} option${r.options.length > 1 ? 's' : ''} set (different from Nucleus' defaults)</summary><table class="opts"><tbody>${r.options.map((o) => `<tr><td class="mono">${esc(o.path)}</td><td class="mono">${esc(o.value.length > 120 ? o.value.slice(0, 117) + '…' : o.value)}</td></tr>`).join('')}</tbody></table></details>`);
  }
  $('#sim-out').innerHTML = out.join('');
  $('#sim-out').querySelector('#sim-check')?.addEventListener('click', () => selectTab('problems'));
  $('#sim-out').querySelector('#sim-fix')?.addEventListener('click', () => {
    selectTab('problems');
    ($('#fix-all') as HTMLButtonElement).click();
  });
}
$('#sim-run').addEventListener('click', runSim);

// ---------------------------------------------------------------------------
// Test all combinations: every player count (up to Game.MaxPlayers, at most 8), input setup and
// monitor size, a few runs at a time so the page stays responsive; one cell per players × input.

const MX_RES: [number, number][] = [[1920, 1080], [2560, 1440], [3840, 2160], [2560, 1080], [1366, 768]];
let mxRun = 0;
function testAll() {
  const run = ++mxRun;
  const code = editor.getValue();
  const box = $('#sim-matrix');
  box.hidden = false;
  const first = simulate(code, { players: 1, width: 1920, height: 1080, keyboardPlayer: -1 });
  if (!first.loaded) {
    box.innerHTML = `<div class="mx-head"><strong>Can't test combinations yet</strong><span class="muted">Nucleus can't load this handler. Fix the problems first.</span></div>`;
    return;
  }
  const opt = (path: string) => first.options.find((o) => o.path === path)?.value;
  const max = Math.min(8, Math.max(1, Number(opt('Game.MaxPlayers')) || 4));
  const multi = opt('Game.SupportsMultipleKeyboardsAndMice') === 'true';
  const modes: { kb: number; label: string; offered: boolean }[] = [
    { kb: -1, label: 'Controllers only', offered: true },
    { kb: 0, label: 'Keyboard for player 1', offered: true },
    { kb: -2, label: 'Keyboard for each player', offered: multi },
  ];
  type Cell = { ok: number; fail: { res: string; why: string }[] };
  const cells = new Map<string, Cell>();
  const jobs: [number, number, [number, number]][] = [];
  for (let p = 1; p <= max; p++) for (const m of modes) if (m.offered) for (const r of MX_RES) jobs.push([p, m.kb, r]);
  let done = 0;
  const t0 = performance.now();
  const draw = (finished: boolean) => {
    const failed = [...cells.values()].reduce((n, c) => n + c.fail.length, 0);
    const rows = Array.from({ length: max }, (_, i) => i + 1)
      .map((p) => `<tr><th>${p} player${p === 1 ? '' : 's'}</th>${modes
        .map((m) => {
          if (!m.offered) return `<td><button class="na" type="button" disabled title="The handler doesn't set Game.SupportsMultipleKeyboardsAndMice = true">not offered</button></td>`;
          const c = cells.get(`${p}|${m.kb}`);
          if (!c) return '<td><button type="button" disabled>…</button></td>';
          return `<td><button class="${c.fail.length ? 'fail' : 'ok'}" type="button" data-p="${p}" data-kb="${m.kb}" data-res="${c.fail[0]?.res ?? '1920x1080'}">${c.fail.length ? `${c.fail.length} of ${MX_RES.length} screens` : 'all screens'}</button></td>`;
        })
        .join('')}</tr>`)
      .join('');
    const fails = [...cells.entries()].flatMap(([k, c]) => c.fail.map((f) => ({ k, ...f })));
    box.innerHTML = `<div class="mx-head"><strong>${finished ? (failed ? `${failed} of ${jobs.length} combinations fail` : `All ${jobs.length} combinations work`) : `Testing ${done} of ${jobs.length}…`}</strong><span class="muted">${max} player${max === 1 ? '' : 's'} max · ${MX_RES.map(([w, h]) => `${w}×${h}`).join(', ')}${finished ? ` · ${Math.round(performance.now() - t0)} ms` : ''}</span>${finished ? '' : '<button class="btn" type="button" id="mx-stop">Stop</button>'}<button class="btn" type="button" id="mx-close" aria-label="Close">×</button></div>
      <div class="mx-wrap"><table><thead><tr><th></th>${modes.map((m) => `<th>${m.label}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>
      ${fails.length ? `<ul class="mx-fails">${fails.slice(0, 8).map((f) => { const [p, kb] = f.k.split('|'); return `<li>${p} player${p === '1' ? '' : 's'}, ${modes.find((m) => String(m.kb) === kb)!.label.toLowerCase()}, ${f.res.replace('x', '×')}: ${esc(f.why)}</li>`; }).join('')}${fails.length > 8 ? `<li>…and ${fails.length - 8} more</li>` : ''}</ul>` : ''}
      <p class="muted small" style="margin:6px 0 0">Pick a cell to see that run below.</p>`;
    box.querySelector('#mx-stop')?.addEventListener('click', () => (mxRun++, draw(true)));
    box.querySelector('#mx-close')?.addEventListener('click', () => ((mxRun++, (box.hidden = true))));
    box.querySelectorAll<HTMLButtonElement>('button[data-p]').forEach((b) =>
      b.addEventListener('click', () => {
        const players = $('#sim-players') as HTMLSelectElement;
        if (![...players.options].some((o) => o.value === b.dataset.p)) players.append(new Option(b.dataset.p!, b.dataset.p!));
        players.value = b.dataset.p!;
        ($('#sim-kb') as HTMLSelectElement).value = b.dataset.kb!;
        const res = $('#sim-res') as HTMLSelectElement;
        if (![...res.options].some((o) => o.value === b.dataset.res)) res.append(new Option(b.dataset.res!.replace('x', '×'), b.dataset.res!));
        res.value = b.dataset.res!;
        runSim();
        $('#sim-out').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }),
    );
  };
  const step = () => {
    if (run !== mxRun) return;
    const until = performance.now() + 12; // a few runs per frame
    while (done < jobs.length && performance.now() < until) {
      const [p, kb, [w, h]] = jobs[done++];
      const r = simulate(code, { players: p, width: w, height: h, keyboardPlayer: kb });
      const key = `${p}|${kb}`;
      const c = cells.get(key) ?? { ok: 0, fail: [] };
      const bad = r.sessionEnded ? r.sessionEnded.reason : r.players.find((x) => x.error)?.error ?? r.callbacks.find((x) => x.error)?.error;
      if (!r.loaded || bad) c.fail.push({ res: `${w}x${h}`, why: (bad ?? r.loadError ?? 'fails').split('\n')[0].slice(0, 140) });
      else c.ok++;
      cells.set(key, c);
    }
    draw(done >= jobs.length);
    if (done < jobs.length) setTimeout(step, 0);
  };
  draw(false);
  setTimeout(step, 0);
}
$('#sim-all').addEventListener('click', testAll);

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

/** The outcome the browser simulation predicts, in the testbench's terms (OK, LOADED, LOAD-FAIL, PLAY-FAIL). */
function simOutcome(src: string): string {
  // The same setup as the testbench harness: 2 players, player 1 on keyboard and mouse.
  const r = simulate(src, { players: 2, width: 1920, height: 1080, keyboardPlayer: 0 });
  return !r.loaded ? 'LOAD-FAIL' : !r.hasPlay ? 'LOADED' : r.players.some((x) => x.error) ? 'PLAY-FAIL' : 'OK';
}

function renderProbes() {
  let agree = 0;
  let simAgree = 0;
  const rows = PROBES.map((p, i) => {
    const errs = lint(p.source).filter((d) => d.severity === 'error');
    const fails = p.jint === 'LOAD-FAIL' || p.jint === 'PLAY-FAIL';
    const ok = fails ? errs.length > 0 : errs.length === 0;
    if (ok) agree++;
    const sim = simOutcome(p.source);
    const simOk = sim === p.jint;
    if (simOk) simAgree++;
    const jintLabel: Record<string, string> = { OK: 'runs', LOADED: 'loads', 'LOAD-FAIL': "doesn't load", 'PLAY-FAIL': 'Game.Play throws' };
    return `<tr class="${ok ? '' : 'disagree'}">
      <td><button class="link" data-probe="${i}">${esc(p.name.replace(/\.js$/, '').replace(/^\d+-/, '').replace(/-/g, ' '))}</button></td>
      <td><span class="chip ${fails ? 'error' : 'ok'}">${jintLabel[p.jint] ?? p.jint}</span>${p.detail ? `<div class="detail">${esc(p.detail)}</div>` : ''}</td>
      <td>${errs.length ? `<span class="chip error">${errs.length} error${errs.length > 1 ? 's' : ''}</span> <span class="detail">${esc([...new Set(errs.map((e) => e.rule))].join(', '))}</span>` : '<span class="chip ok">no errors</span>'}</td>
      <td class="center">${ok ? '<span class="agree">✓</span>' : '<span class="disagree-mark">✗</span>'}</td>
      <td><span class="chip ${sim === 'LOAD-FAIL' || sim === 'PLAY-FAIL' ? 'error' : 'ok'}">${jintLabel[sim]}</span> ${simOk ? '<span class="agree">✓</span>' : '<span class="disagree-mark">✗</span>'}</td></tr>`;
  });
  $('#probes').innerHTML = `<p class="lede">Each probe isolates one engine behaviour. The <strong>Jint 2.11.58</strong> column is what happened when the testbench ran it with Nucleus' engine setup; the <strong>Linter</strong> and <strong>Try it</strong> columns are computed live in this page. The linter agrees on <strong>${agree} of ${PROBES.length}</strong> (an error exactly when Jint fails); Try it predicts the same outcome on <strong>${simAgree} of ${PROBES.length}</strong>.</p>
    <div class="table-wrap"><table class="probes"><thead><tr><th>Probe</th><th>Jint 2.11.58</th><th>Linter</th><th>Agree</th><th>Try it</th></tr></thead><tbody>${rows.join('')}</tbody></table></div>`;
  $('#count-probes').textContent = `${agree}/${PROBES.length}`;
  $('#count-probes').title = `Linter agrees with Jint on ${agree} of ${PROBES.length} probes; Try it on ${simAgree}`;
  $('#probes').querySelectorAll<HTMLButtonElement>('[data-probe]').forEach((b) =>
    b.addEventListener('click', () => openProbe(Number(b.dataset.probe))),
  );
}
let probesRendered = false;
$('#count-probes').textContent = String(PROBES.length); // becomes "agree/total" once the tab is opened

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
  else if (doc.kind === 'template') parts.push(`<span>Engine template from the <a href="https://github.com/SplitScreen-Me/splitscreenme-discordbot/tree/main/src/handler_templates" target="_blank" rel="noopener">Discord bot</a></span>`);
  if (doc.hash || canShare()) parts.push(`<button class="link" type="button" id="copy-link" title="Copy a link that opens this handler (or just the selected lines)">Copy link</button>`);
  $('#doc-meta').innerHTML = parts.join('');
  $('#doc-meta').querySelector('#copy-link')?.addEventListener('click', copyLink);
}

/**
 * Copy link: an unchanged example links by name (#hub-…); anything else is packed into the link
 * (#share-…). With text selected, only the selection is shared.
 */
const DISCORD_LIMIT = 2000;
async function copyLink() {
  const selection = editor.getSelection();
  const edited = editor.getValue() !== loadedText;
  let id = doc.hash && !edited && !selection ? doc.hash : '';
  if (!id) {
    try {
      id = await encodeShare(selection || editor.getValue());
    } catch {
      toast("This browser can't make share links. Use Copy instead.");
      return;
    }
  }
  const what = selection ? 'the selected lines' : doc.hash && !edited ? 'this example' : 'this handler';
  if ((window as any).claude) {
    // Inside a Claude artifact the page's own address isn't the artifact's link: put the id in the
    // hash, which the artifact's address and Share > Copy link follow.
    history.replaceState(null, '', '#' + id);
    toast(`The page link now opens ${what}. Copy it from the address bar or Share > Copy link.`);
    return;
  }
  const url = location.href.replace(/#.*$/, '') + '#' + id;
  const long = url.length > DISCORD_LIMIT ? ` It is ${url.length.toLocaleString()} characters, too long for a Discord message (${DISCORD_LIMIT.toLocaleString()}): ${selection ? 'share the file instead' : 'select just the lines that matter and copy again, or share the file'}.` : '';
  try {
    await navigator.clipboard.writeText(url);
    toast(`Link copied. It opens ${what} for anyone.${long}`);
  } catch {
    toast(`Couldn't copy. The link is in the address bar.${long}`);
    history.replaceState(null, '', '#' + id);
  }
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

async function openHub(i: number) {
  const h = HUB_EXAMPLES.handlers[i];
  if (h.source === undefined) {
    try {
      const r = await fetch(`${HUB_EXAMPLES.base ?? 'hub/'}${h.id}.js`);
      if (!r.ok) throw new Error(String(r.status));
      h.source = await r.text();
    } catch {
      toast(`Couldn't load ${h.title}. Check your connection and try again.`);
      return;
    }
  }
  loadSource(h.source, { name: h.title, kind: 'hub', hubIndex: i, hash: `hub-${h.id}` });
  toast(`Opened ${h.title} v${h.version} from the Hub.`);
}
function openTemplate(id: string) {
  const t = BOT_TEMPLATES.templates.find((x) => x.id === id);
  if (!t) return;
  loadSource(t.source, { name: `${t.name} template`, kind: 'template', hash: `template-${slug(t.id)}` });
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
    const h = HUB_EXAMPLES.handlers[i];
    const d = h.lint ? undefined : lint(h.source ?? '');
    const e = h.lint ? h.lint.errors : d!.filter((x) => x.severity === 'error').length;
    const w = h.lint ? h.lint.warnings : d!.filter((x) => x.severity === 'warning').length;
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
    ...BOT_TEMPLATES.templates.map((t) => ({
      group: 'Engine templates',
      title: t.name,
      sub: t.id === 'generic' ? 'A starting point for any game.' : `A starting point for ${t.name} games.`,
      keywords: `template engine ${t.id}`,
      run: () => openTemplate(t.id),
    })),
    { group: 'Actions', title: 'Fix problems automatically', sub: 'Alt+Shift+F', keywords: 'fix all repair', run: () => ($('#fix-all') as HTMLButtonElement).click() },
    { group: 'Actions', title: 'Simulate the handler', sub: 'Ctrl+Enter: launch arguments and file edits per player', keywords: 'run play simulate', run: () => selectTab('simulate') },
    { group: 'Actions', title: 'Show or hide the dev bar', sub: 'Ctrl+Alt+D: colour mode, contrast check and other developer tools', keywords: 'dev theme colour color dark light contrast', run: () => devBar.toggle() },
    { group: 'Actions', title: 'Search the handler API', sub: 'Options, Context methods and Nucleus enums with docs', keywords: 'api docs reference', run: () => { selectTab('api'); ($('#api-q') as HTMLInputElement).focus(); } },
    { group: 'Actions', title: 'Show or hide the list of names', sub: 'Ctrl+Shift+L: every option, Context member and enum, click to insert', keywords: 'lines list names insert pawno functions', run: () => lines.toggle() },
    { group: 'Actions', title: 'Reset panel sizes', sub: 'The code, results and Lines panels back to their default sizes', keywords: 'layout resize panels reset width', run: () => panels.reset() },
    { group: 'Actions', title: "What's new", sub: 'Recent changes to the workbench', keywords: 'changelog changes news updates release notes', run: () => news.open() },
    { group: 'Actions', title: 'Settings', sub: 'Theme, editor, tips and the Lines list', keywords: 'settings preferences options theme dark light font size wrap', run: () => settings.open() },
    { group: 'Actions', title: 'Turn tips on or off', sub: 'Tips and heads-ups under the code', keywords: 'tips hints help clippy', run: () => tips.toggle() },
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
    ...(mode === 'dev' ? PROBES : []).map((p, i) => ({ p, i }))
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
    'Engine templates': 'The same templates the SplitScreen.Me Discord bot sends with /create',
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
$('#doc-switch').addEventListener('click', showOpen);
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
const devBar = initDevBar({
  build: `core ${BUILD.core} · Nucleus ${String(BUILD.nucleus ?? '?').slice(0, 7)} · Jint ${BUILD.jint ?? '?'}`,
  toast: (t) => toast(t),
});

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
  if (id === 'probes' && !probesRendered) {
    probesRendered = true;
    renderProbes();
  }
  if (narrow()) setView('results');
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

// ---------------------------------------------------------------------------
// Lines: every name a handler can use, beside the code (like Pawno's function list)

const lines = initLines({
  editor,
  openReference: (path) => {
    selectTab('api');
    if (window.matchMedia('(max-width: 860px)').matches) ($('.switch button[data-view=results]') as HTMLButtonElement)?.click();
    ($('#api-q') as HTMLInputElement).value = path;
    renderApi(path);
  },
});

const tips = initTips({
  editor,
  toast,
  actions: {
    lines: () => lines.show(),
    new: () => ($('#new-open') as HTMLButtonElement).click(),
    examples: () => showOpen(),
    tryit: () => {
      if (window.matchMedia('(max-width: 860px)').matches) ($('.switch button[data-view=results]') as HTMLButtonElement)?.click();
      selectTab('simulate');
    },
    share: () => copyLink(),
  },
});
$('#tips-reset').addEventListener('click', () => tips.reset());

const settings = initSettings({
  editor,
  hint: () => editor.showHint({ hint: hinter, completeSingle: false }),
  lines,
  tips,
  advanced: $('#advanced') as HTMLInputElement,
  devBar,
  toast,
});
const news = initNews();
const panels = initPanels({ refresh: () => editor.refresh(), toast });
$('#set-reset-sizes').addEventListener('click', () => panels.reset());
const moreDialog = $('#more-dialog') as HTMLDialogElement;
$('#more-open').addEventListener('click', () => {
  ($('#more-save') as HTMLButtonElement).hidden = ($('#save') as HTMLButtonElement).hidden;
  moreDialog.showModal();
});
$('#more-close').addEventListener('click', () => moreDialog.close());
moreDialog.querySelectorAll<HTMLButtonElement>('[data-proxy]').forEach((b) =>
  b.addEventListener('click', () => {
    moreDialog.close();
    ($(b.dataset.proxy!) as HTMLButtonElement).click();
  }),
);

document.addEventListener('keydown', (e: KeyboardEvent) => {
  const mod = e.ctrlKey || e.metaKey;
  if (mod && e.shiftKey && e.code === 'KeyL') {
    e.preventDefault();
    lines.toggle();
    return;
  }
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

$('#set-build').textContent = `Build ${BUILD.bench ?? '?'}`;
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
// Advanced mode switch

function setMode(m: Mode) {
  mode = m;
  document.documentElement.dataset.mode = m;
  advanced.checked = m === 'dev';
  try {
    localStorage.setItem(MODE_KEY, m === 'dev' ? '1' : '0');
  } catch {
    /* ignore */
  }
  const active = document.querySelector<HTMLElement>('[role=tab][aria-selected=true]')?.dataset.tab;
  if (m === 'simple' && active === 'probes') selectTab('problems');
  (editor as any).performLint();
  if (active === 'simulate') runSim();
}
const advanced = $('#advanced') as HTMLInputElement;
advanced.checked = mode === 'dev';
advanced.addEventListener('change', () => {
  setMode(advanced.checked ? 'dev' : 'simple');
  toast(advanced.checked ? 'Advanced mode on: rule ids, filters, suggestions, recorded calls and engine probes.' : 'Advanced mode off: the same screens, without the extra detail.');
});

// ---------------------------------------------------------------------------
// Small screens: show the handler or the results, with a switch

const narrowQuery = matchMedia('(max-width: 860px)');
function narrow() {
  return narrowQuery.matches;
}
function setView(v: 'code' | 'results') {
  $('#main').dataset.view = v;
  document.querySelectorAll<HTMLButtonElement>('.switch button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.view === v)));
  if (v === 'code') editor.refresh();
}
document.querySelectorAll<HTMLButtonElement>('.switch button').forEach((b) => b.addEventListener('click', () => setView(b.dataset.view as 'code' | 'results')));
narrowQuery.addEventListener('change', () => editor.refresh());

// ---------------------------------------------------------------------------
// Open a file from the computer (picker or drag & drop): .js, or a .zip/.nc package

async function readZipHandler(buf: ArrayBuffer): Promise<string | null> {
  const v = new DataView(buf);
  let eocd = -1;
  for (let i = buf.byteLength - 22; i >= Math.max(0, buf.byteLength - 66000); i--) {
    if (v.getUint32(i, true) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) return null;
  const count = v.getUint16(eocd + 10, true);
  let p = v.getUint32(eocd + 16, true);
  const dec = new TextDecoder();
  let pick: { method: number; start: number; size: number; name: string } | null = null;
  for (let i = 0; i < count; i++) {
    const method = v.getUint16(p + 10, true);
    const csize = v.getUint32(p + 20, true);
    const nlen = v.getUint16(p + 28, true);
    const xlen = v.getUint16(p + 30, true);
    const clen = v.getUint16(p + 32, true);
    const local = v.getUint32(p + 42, true);
    const name = dec.decode(new Uint8Array(buf, p + 46, nlen));
    p += 46 + nlen + xlen + clen;
    const isRootJs = !name.includes('/') && /\.js$/i.test(name);
    if (isRootJs && (!pick || name.toLowerCase() === 'handler.js')) {
      const start = local + 30 + v.getUint16(local + 26, true) + v.getUint16(local + 28, true);
      pick = { method, start, size: csize, name };
    }
  }
  if (!pick) return null;
  const data = new Uint8Array(buf, pick.start, pick.size);
  if (pick.method === 0) return dec.decode(data);
  if (pick.method === 8 && 'DecompressionStream' in window) {
    const stream = new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw' as CompressionFormat));
    return await new Response(stream).text();
  }
  return null;
}

async function openFile(file: File) {
  try {
    let text: string | null;
    if (/\.(zip|nc)$/i.test(file.name)) {
      text = await readZipHandler(await file.arrayBuffer());
      if (text === null) {
        toast(`${file.name} doesn't contain a handler.js this page can read.`);
        return;
      }
    } else {
      text = await file.text();
    }
    loadSource(text.replace(/^﻿/, '').replace(/\r\n/g, '\n'), { name: file.name.replace(/\.(zip|nc)$/i, '.js'), kind: 'draft' });
    toast(`Opened ${file.name}.`);
  } catch {
    toast(`Couldn't read ${file.name}.`);
  }
}
const fileInput = $('#file-input') as HTMLInputElement;
$('#file-open').addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', () => {
  const f = fileInput.files?.[0];
  if (f) openFile(f);
  fileInput.value = '';
});
const dropHint = $('#drop-hint');
let dragDepth = 0;
const hasFiles = (e: DragEvent) => !!e.dataTransfer && Array.from(e.dataTransfer.types).includes('Files');
document.addEventListener('dragenter', (e) => {
  if (!hasFiles(e)) return;
  dragDepth++;
  dropHint.hidden = false;
});
document.addEventListener('dragleave', (e) => {
  if (!hasFiles(e)) return;
  dragDepth = Math.max(0, dragDepth - 1);
  if (!dragDepth) dropHint.hidden = true;
});
document.addEventListener('dragover', (e) => {
  if (hasFiles(e)) e.preventDefault();
});
document.addEventListener(
  'drop',
  (e) => {
    if (!hasFiles(e)) return;
    e.preventDefault();
    e.stopPropagation();
    dragDepth = 0;
    dropHint.hidden = true;
    const f = e.dataTransfer!.files[0];
    if (f) openFile(f);
  },
  true,
);

// ---------------------------------------------------------------------------
// Save for Nucleus: a .zip with handler.js that Nucleus' "Extract handler" installs

let downloads: any = null;
(async () => {
  try {
    downloads = await (window as any).claude?.use?.('downloads');
  } catch {
    downloads = null;
  }
  if (!downloads && !(window as any).claude) {
    // A normal web page (GitHub Pages): an ordinary browser download.
    downloads = {
      save: async ({ filename, data }: { filename: string; data: Uint8Array }) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([data as BlobPart], { type: "application/zip" }));
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 10000);
      },
    };
  }
  if (downloads) $('#save').hidden = false;
})();
const saveDialog = $('#save-dialog') as HTMLDialogElement;
const handlerFileName = () => {
  const m = editor.getValue().match(/^Game\.GameName\s*=\s*"([^"]*)"/m);
  const name = (m?.[1] || doc.name.replace(/\.js$/i, '') || 'handler').replace(/[\\/:*?"<>|]/g, '').trim() || 'handler';
  return name;
};
$('#save').addEventListener('click', () => {
  const name = handlerFileName();
  $('#save-name').textContent = `${name}.zip`;
  $('#save-js').textContent = `${name}.js`;
  saveDialog.showModal();
});
$('#save-cancel').addEventListener('click', () => saveDialog.close());
$('#save-go').addEventListener('click', async () => {
  const name = handlerFileName();
  const errorsLeft = current.filter((d) => d.severity === 'error').length;
  try {
    const zip = zipStore([{ name: 'handler.js', data: new TextEncoder().encode(editor.getValue()) }]);
    await downloads.save({ filename: `${name}.zip`, data: zip });
    saveDialog.close();
    toast(errorsLeft ? `Saved ${name}.zip. It still has ${errorsLeft} error${errorsLeft === 1 ? '' : 's'}, so Nucleus may not load it.` : `Saved ${name}.zip. Drag it onto "Extract handler" in Nucleus Co-op.`);
  } catch (e: any) {
    saveDialog.close();
    if (e?.code === 'declined') return;
    if (['unavailable', 'not_granted', 'capability_disabled', 'capability_removed'].includes(e?.code)) $('#save').hidden = true;
    toast("Couldn't save the file here. Use Copy instead and paste it into a .js file.");
  }
});

// ---------------------------------------------------------------------------
// Start-up: #links, first-visit welcome, last tab

function openFromHash(): boolean {
  const h = decodeURIComponent(location.hash.slice(1));
  if (!h) return false;
  if (h.startsWith(SHARE_PREFIX)) {
    decodeShare(h)
      .then((src) => loadSource(src, { name: 'Shared handler', kind: 'example', hash: h }))
      .catch(() => toast('This share link is damaged or incomplete. Ask for it again, or for the file.'));
    return true;
  }
  if (h === 'dev') {
    // #dev shows the dev bar for this page load (like ?env=dev in lonnsinnplassering) and opens nothing.
    devBar.show();
    try {
      history.replaceState(null, '', location.pathname + location.search);
    } catch {
      /* ignore */
    }
    return false;
  }
  if (h.startsWith('hub-')) {
    const i = HUB_EXAMPLES.handlers.findIndex((x) => x.id === h.slice(4));
    if (i >= 0) return void openHub(i), true;
  } else if (h.startsWith('probe-')) {
    const i = PROBES.findIndex((p) => p.name.startsWith(h.slice(6).padStart(2, '0') + '-'));
    if (i >= 0) return openProbe(i), true;
  } else if (h === 'example-mistakes') {
    return loadSource(BUGGY, { name: 'Handler with common mistakes', kind: 'example', hash: h }), true;
  } else if (h.startsWith('template-')) {
    const t = BOT_TEMPLATES.templates.find((x) => slug(x.id) === slug(h.slice('template-'.length)));
    if (t) return openTemplate(t.id), true;
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
  w.innerHTML = `<div class="w-head"><span><strong>New here?</strong> A handler is the file that tells Nucleus Co-op how to run a game split-screen (in its <code>handlers</code> folder).</span><button class="btn icon" type="button" data-w="close" aria-label="Dismiss" title="Dismiss">×</button></div>
    <div class="w-steps"><span><b>1</b> <button class="link" type="button" data-w="file">Open yours</button> or <button class="link" type="button" data-w="open">an example</button></span><span><b>2</b> Fix what Nucleus would reject</span><span><b>3</b> <button class="link" type="button" data-w="sim">Try it</button> per player</span><span><b>4</b> Save it for Nucleus</span></div>`;
  w.hidden = false;
  w.querySelector('[data-w=open]')!.addEventListener('click', showOpen);
  w.querySelector('[data-w=file]')!.addEventListener('click', () => fileInput.click());
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
initTouchTitles();
