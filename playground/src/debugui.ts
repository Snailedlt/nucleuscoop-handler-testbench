// The debugger in Try it: breakpoints in the code's gutter (conditional ones in Advanced mode),
// Continue / Step over / into / out / Back through a recorded run, the current line in the code,
// the variables, watches, the call stack and what Nucleus would have done so far.
//
// The engine (core/debug.ts) records the whole run first (every statement, for every player and
// callback), so stepping, stepping back and dragging the timeline only move through that record:
// nothing runs again. The recording runs in a Web Worker of its own (worker.ts), so the page stays
// responsive and a run that takes too long can be cut off; without workers it runs here.
import { hlCode } from './codehl';
import { traceHandler, nextStop, evaluateWatch, describeStep, describePhase, callsBefore, unpackTrace } from '@core/debug';
import type { Trace, Step, ValueView, Breakpoint, StepMode, Stop, TraceOptions, Phase } from '@core/debug';
import { sessionSummary } from '@core/sim';

export interface DebugHost {
  /** The CodeMirror 5 editor */
  editor: any;
  /** Where the debugger draws (#dbg, inside Try it) */
  root: HTMLElement;
  /** The Try it panel */
  panel: HTMLElement;
  /** Players, monitor, keyboard and plugins, as Try it uses them */
  options: () => TraceOptions;
  /** Show the Try it tab */
  showTryIt: () => void;
  /** Show the code (not Form or Blocks) */
  showCode: () => void;
  /** Redraw Try it's normal results (after Stop) */
  rerun: () => void;
  /** Counted as used (feedback.ts) */
  used?: () => void;
}
export interface Debugger {
  start: () => void;
  stop: () => void;
  active: () => boolean;
  /** Toggles a breakpoint on a 0-based line (default: the cursor's) */
  toggleBreakpoint: (line?: number) => void;
}

const GUTTER = 'nc-bp';
const WATCH_KEY = 'nucleus-workbench-watches';
const ERR_KEY = 'nucleus-workbench-dbg-errors';
const TIMEOUT_MS = 15000;
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const isDev = () => document.documentElement.dataset.mode === 'dev';
const samePhase = (a?: Phase, b?: Phase) => !!a && !!b && (a === b || (a.kind === b.kind && a.name === b.name && a.player === b.player));
/** "Loading", "Player 2", "Game.OnStop" */
const phaseShort = (p: Phase) => (p.kind === 'top' ? 'Loading' : p.kind === 'play' ? `Player ${(p.player ?? 0) + 1}` : p.name);
const phaseClass = (p: Phase) => (p.kind === 'play' ? `p${((p.player ?? 0) % 8) + 1}` : p.kind === 'top' ? 'ph-top' : 'ph-cb');

// ---------------------------------------------------------------------------------------------
// Recording, in a worker

let tw: Worker | null | undefined;
let req = 0;
let timer: number | undefined;
function record(src: string, opts: TraceOptions): Promise<Trace> {
  if (tw === undefined) {
    try {
      tw = new Worker((globalThis as any).__WORKER_URL);
    } catch {
      tw = null;
    }
  }
  if (!tw) return Promise.resolve().then(() => traceHandler(src, opts));
  const w = tw;
  const id = ++req;
  clearTimeout(timer);
  return new Promise((resolve, reject) => {
    timer = window.setTimeout(() => {
      w.terminate();
      tw = undefined;
      reject(new Error('Recording the run took more than 15 seconds, so it was stopped. Is there a loop that never ends?'));
    }, TIMEOUT_MS);
    w.onmessage = (e: MessageEvent<{ id: number; packed?: string; error?: string }>) => {
      if (e.data.id !== id) return;
      clearTimeout(timer);
      if (e.data.error) reject(new Error(e.data.error));
      else resolve(unpackTrace(e.data.packed!));
    };
    w.onerror = (ev: ErrorEvent) => {
      ev.preventDefault();
      clearTimeout(timer);
      w.terminate();
      tw = null; // workers don't work here: record on this page from now on
      try {
        resolve(traceHandler(src, opts));
      } catch (err) {
        reject(err);
      }
    };
    w.postMessage({ kind: 'trace', id, src, opts });
  });
}

// ---------------------------------------------------------------------------------------------
// Plain words for what the line is about to do

/** "It's about to set Context.StartArguments." from the statement's text (best effort). */
export function aboutTo(text: string): string {
  const t = text.trim();
  let m: RegExpMatchArray | null;
  if ((m = t.match(/^(?:var|let|const)\s+([A-Za-z_$][\w$]*)\s*=/))) return `It's about to set ${m[1]}.`;
  if (/^(?:var|let|const)\s/.test(t)) return "It's about to declare a variable.";
  if ((m = t.match(/^([A-Za-z_$][\w$]*(?:\s*(?:\.\s*[A-Za-z_$][\w$]*|\[[^\]]*\]))*)\s*([+\-*/%]?=)(?!=)/))) return `It's about to ${m[2] === '=' ? 'set' : 'change'} ${m[1].replace(/\s+/g, '')}.`;
  if ((m = t.match(/^([A-Za-z_$][\w$]*)\s*(\+\+|--)/)) || (m = t.match(/^(\+\+|--)\s*([A-Za-z_$][\w$]*)/))) return `It's about to change ${/\w/.test(m[1]) ? m[1] : m[2]}.`;
  if (/^if\b/.test(t)) return "It's about to check a condition.";
  if (/^(?:for|while|do)\b/.test(t)) return "It's about to run a loop.";
  if (/^switch\b/.test(t)) return "It's about to pick a case.";
  if (/^return\b/.test(t)) return "It's about to return from the function.";
  if (/^throw\b/.test(t)) return "It's about to throw an error.";
  if (/^try\b/.test(t)) return "It's about to try something that may fail.";
  if ((m = t.match(/^(?:new\s+)?([A-Za-z_$][\w$]*(?:\s*\.\s*[A-Za-z_$][\w$]*)*)\s*\(/))) return `It's about to call ${m[1].replace(/\s+/g, '')}().`;
  return '';
}

// ---------------------------------------------------------------------------------------------

export function mountDebugger(host: DebugHost): Debugger {
  const { editor, root, panel } = host;
  editor.setOption('gutters', [GUTTER, ...(editor.getOption('gutters') as string[]).filter((g) => g !== GUTTER)]);

  // Breakpoints live on line handles, so they move with the code, one set per open handler (CodeMirror doc).
  const bpsByDoc = new WeakMap<object, Map<any, { condition: string }>>();
  const bpMap = () => {
    const d = editor.getDoc();
    let m = bpsByDoc.get(d);
    if (!m) bpsByDoc.set(d, (m = new Map()));
    return m;
  };
  const breakpoints = (): (Breakpoint & { handle: any })[] => {
    const out: (Breakpoint & { handle: any })[] = [];
    for (const [h, v] of bpMap()) {
      const n = editor.getLineNumber(h);
      if (n === null || n === undefined) bpMap().delete(h);
      else out.push({ line: n + 1, ...(v.condition.trim() ? { condition: v.condition.trim() } : {}), handle: h });
    }
    return out.sort((a, b) => a.line - b.line);
  };
  const bpAt = (line0: number) => bpMap().get(editor.getLineHandle(line0));

  let watches: string[] = [];
  try {
    watches = JSON.parse(localStorage.getItem(WATCH_KEY) || '[]').filter((w: unknown) => typeof w === 'string');
  } catch {
    watches = [];
  }
  const saveWatches = () => {
    try {
      localStorage.setItem(WATCH_KEY, JSON.stringify(watches));
    } catch {
      /* storage unavailable */
    }
  };
  let stopOnErrors = true;
  try {
    stopOnErrors = localStorage.getItem(ERR_KEY) !== '0';
  } catch {
    /* storage unavailable */
  }

  interface Session {
    trace: Trace;
    src: string[];
    /** Index into trace.steps; trace.steps.length: the run is over */
    pos: number;
    stop: Stop | null;
    errors: number[];
  }
  let s: Session | null = null;
  let busy = false;
  /** Why the session ended or couldn't start (shown instead of the panel) */
  let note: { kind: 'stale' | 'error'; text: string } | null = null;
  const open = new Set(['g:locals', 'g:globals', 'g:context']);
  let current: { handle: any; cls: string } | null = null;

  // --- The panel's frame (drawn once, so focus stays on the buttons while stepping)
  const B = (id: string, icon: string, label: string, simpleLabel: string, title: string, cls = '') =>
    `<button class="btn dbg-b ${cls}" type="button" id="${id}" title="${esc(title)}"><span class="dbg-i" aria-hidden="true">${icon}</span><span class="dev-only">${label}</span><span class="simple-only">${simpleLabel}</span></button>`;
  root.innerHTML = `
    <div class="dbg-bar" role="group" aria-label="Debugger controls">
      ${B('dbg-go', '▶', 'Continue', 'Continue', 'Continue (F5): run to the next breakpoint', 'primary')}
      ${B('dbg-over', '↷', 'Step over', 'Next line', 'Step over (F10): run this line, and any function it calls, then pause')}
      ${B('dbg-into', '↓', 'Step into', 'Step into', 'Step into (F11): go into the function this line calls', 'dev-only')}
      ${B('dbg-out', '↑', 'Step out', 'Step out', 'Step out (Shift+F11): finish this function and pause in the code that called it', 'dev-only')}
      ${B('dbg-back', '↶', 'Step back', 'Back', 'Step back (Alt+F10): one statement back. The whole run is recorded, so you can go back as far as you like')}
      ${B('dbg-rev', '«', 'Back to breakpoint', 'Back to breakpoint', 'Back to the previous breakpoint (Alt+F5)', 'dev-only')}
      <span class="dbg-sp"></span>
      ${B('dbg-restart', '↻', 'Restart', 'Restart', 'Restart (Ctrl+Shift+F5): record the run again from the code as it is now')}
      ${B('dbg-stop', '■', 'Stop', 'Stop', 'Stop (Shift+F5): close the debugger and show Try it\'s results')}
    </div>
    <div class="dbg-banner" id="dbg-banner" role="status" aria-live="polite"></div>
    <div class="dbg-body" id="dbg-body">
      <pre class="dbg-peek hl cm-s-default" id="dbg-peek" aria-label="The line it's paused on"></pre>
      <div class="dbg-scrub">
        <label for="dbg-range" class="dbg-scrub-l">Timeline</label>
        <div class="dbg-scrub-w">
          <div class="dbg-track" id="dbg-track" aria-hidden="true"></div>
          <input type="range" id="dbg-range" min="0" max="0" value="0" step="1">
        </div>
        <span class="dbg-pos muted" id="dbg-pos"></span>
      </div>
      <div class="dbg-errs" id="dbg-errs"></div>
      <div class="dbg-grid">
        <section class="dbg-sec dbg-vars" aria-labelledby="dbg-h-vars"><h3 id="dbg-h-vars">Variables</h3><div id="dbg-vars"></div></section>
        <section class="dbg-sec dbg-watch dev-only" aria-labelledby="dbg-h-watch"><h3 id="dbg-h-watch">Watch</h3>
          <form id="dbg-watch-form" class="dbg-watch-form"><input id="dbg-watch-in" type="text" placeholder="An expression, e.g. Context.PlayerID" aria-label="Expression to watch" autocomplete="off" spellcheck="false" data-1p-ignore data-lpignore="true" data-form-type="other"><button class="btn" type="submit">Add</button></form>
          <ul id="dbg-watches" class="dbg-list"></ul></section>
        <section class="dbg-sec dbg-stack dev-only" aria-labelledby="dbg-h-stack"><h3 id="dbg-h-stack">Call stack</h3><ol id="dbg-stack" class="dbg-list"></ol></section>
        <section class="dbg-sec dbg-done" aria-labelledby="dbg-h-done"><h3 id="dbg-h-done">Done so far <span class="count" id="dbg-done-n"></span></h3><p class="muted dbg-help simple-only">What Nucleus would have done up to this point: files changed, settings made.</p><ul id="dbg-done" class="dbg-list dbg-calls"></ul></section>
        <section class="dbg-sec dbg-bps dev-only" aria-labelledby="dbg-h-bps"><h3 id="dbg-h-bps">Breakpoints</h3><ul id="dbg-bps" class="dbg-list"></ul>
          <label class="dbg-check"><input type="checkbox" id="dbg-onerr"> Stop on errors</label></section>
      </div>
    </div>`;
  const $ = <T extends HTMLElement = HTMLElement>(id: string) => root.querySelector(`#${id}`) as T;
  const range = $<HTMLInputElement>('dbg-range');
  const banner = $('dbg-banner');
  ($('dbg-onerr') as HTMLInputElement).checked = stopOnErrors;
  $('dbg-onerr').addEventListener('change', () => {
    stopOnErrors = ($('dbg-onerr') as HTMLInputElement).checked;
    try {
      localStorage.setItem(ERR_KEY, stopOnErrors ? '1' : '0');
    } catch {
      /* storage unavailable */
    }
  });

  // --- The gutter: breakpoints and the current-line arrow
  function paintMarker(line0: number) {
    if (line0 < 0 || line0 >= editor.lineCount()) return;
    const bp = bpAt(line0);
    const here = current && editor.getLineNumber(current.handle) === line0;
    if (!bp && !here) return editor.setGutterMarker(line0, GUTTER, null);
    const el = document.createElement('div');
    el.className = `dbg-gm${bp ? ' bp' : ''}${bp?.condition.trim() ? ' cond' : ''}${here ? ' here' : ''}`;
    el.title = bp
      ? `Breakpoint: stops before line ${line0 + 1}${bp.condition.trim() ? ` when ${bp.condition.trim()}` : ''}. Click to remove${isDev() ? ', right-click for a condition' : ''}.`
      : 'Paused here';
    editor.setGutterMarker(line0, GUTTER, el);
  }
  function toggleBreakpoint(line0 = editor.getCursor().line) {
    const h = editor.getLineHandle(line0);
    if (!h) return;
    if (bpMap().has(h)) bpMap().delete(h);
    else bpMap().set(h, { condition: '' });
    paintMarker(line0);
    renderBps();
  }
  function setCondition(line0: number, condition: string | null) {
    const h = editor.getLineHandle(line0);
    if (!h) return;
    if (condition === null) bpMap().delete(h);
    else bpMap().set(h, { condition });
    paintMarker(line0);
    renderBps();
  }
  editor.on('gutterClick', (_cm: any, line: number, gutter: string) => {
    if (gutter === GUTTER) toggleBreakpoint(line);
  });

  // Conditional breakpoints (Advanced mode): right-click the gutter, Shift+F9, or Edit in the list.
  const pop = document.createElement('div');
  pop.id = 'dbg-pop';
  pop.setAttribute('role', 'dialog');
  pop.setAttribute('aria-labelledby', 'dbg-pop-l');
  pop.hidden = true;
  document.body.appendChild(pop);
  let popLine = -1;
  let popReturn: HTMLElement | null = null;
  function openCondition(line0: number, at?: { x: number; y: number }) {
    popLine = line0;
    popReturn = document.activeElement as HTMLElement | null;
    const bp = bpAt(line0);
    pop.innerHTML = `<label id="dbg-pop-l" for="dbg-cond">Stop on line ${line0 + 1} only when…</label>
      <input id="dbg-cond" type="text" value="${esc(bp?.condition ?? '')}" placeholder="Context.PlayerID == 1" autocomplete="off" spellcheck="false" data-1p-ignore data-lpignore="true" data-form-type="other">
      <p class="muted">A check on the values there, e.g. <code>Context.PlayerID == 1</code> or <code>i &gt; 2</code>. Leave it empty to always stop.</p>
      <div class="dbg-pop-acts"><button class="btn primary" type="button" data-a="save">Save</button>${bp ? '<button class="btn" type="button" data-a="remove">Remove breakpoint</button>' : ''}<button class="btn" type="button" data-a="cancel">Cancel</button></div>`;
    pop.hidden = false;
    const c = at ?? (() => {
      const r = editor.charCoords({ line: line0, ch: 0 }, 'window');
      return { x: editor.getGutterElement().getBoundingClientRect().left + 4, y: r.bottom + 4 };
    })();
    const w = pop.offsetWidth;
    const hgt = pop.offsetHeight;
    pop.style.left = `${Math.max(8, Math.min(c.x, innerWidth - w - 8))}px`;
    pop.style.top = `${Math.max(8, Math.min(c.y, innerHeight - hgt - 8))}px`;
    (pop.querySelector('#dbg-cond') as HTMLInputElement).focus();
  }
  function closeCondition(save: boolean | 'remove') {
    if (pop.hidden) return;
    if (save === 'remove') setCondition(popLine, null);
    else if (save) setCondition(popLine, (pop.querySelector('#dbg-cond') as HTMLInputElement).value);
    pop.hidden = true;
    (popReturn && document.contains(popReturn) ? popReturn : editor).focus();
  }
  pop.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLElement>('[data-a]')?.dataset.a;
    if (a) closeCondition(a === 'save' ? true : a === 'remove' ? 'remove' : false);
  });
  pop.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') (e.preventDefault(), e.stopPropagation(), closeCondition(false));
    else if (e.key === 'Enter' && (e.target as HTMLElement).id === 'dbg-cond') (e.preventDefault(), closeCondition(true));
  });
  document.addEventListener('pointerdown', (e) => {
    if (!pop.hidden && !pop.contains(e.target as Node)) closeCondition(false);
  }, true);
  editor.getWrapperElement().addEventListener('contextmenu', (e: MouseEvent) => {
    if (!isDev() || !(e.target as HTMLElement).closest('.CodeMirror-gutters, .CodeMirror-gutter-wrapper')) return;
    e.preventDefault();
    openCondition(editor.lineAtHeight(e.clientY, 'window'), { x: e.clientX, y: e.clientY });
  });

  // --- The current line in the code
  function clearCurrent() {
    if (current) {
      editor.removeLineClass(current.handle, 'background', current.cls);
      const n = editor.getLineNumber(current.handle);
      current = null;
      if (n !== null && n !== undefined) paintMarker(n);
    }
  }
  function showCurrent(step: Step | undefined) {
    clearCurrent();
    if (!step || step.line < 1 || step.line > editor.lineCount()) return;
    const cls = step.error ? 'dbg-line-err' : 'dbg-line';
    const handle = editor.addLineClass(step.line - 1, 'background', cls);
    current = { handle, cls };
    paintMarker(step.line - 1);
    if (editor.getWrapperElement().offsetParent) editor.scrollIntoView({ line: step.line - 1, ch: 0 }, 80);
  }

  // --- Moving
  const opts = (mode: StepMode) => ({ mode, breakpoints: breakpoints().map(({ line, condition }) => ({ line, ...(condition ? { condition } : {}) })), stopOnErrors });
  function go(i: number, stop: Stop | null, quiet = false) {
    if (!s) return;
    s.pos = Math.max(0, Math.min(i, s.trace.steps.length));
    s.stop = stop;
    banner.setAttribute('aria-live', quiet ? 'off' : 'polite');
    render();
  }
  async function start(first: 'breakpoint' | 'step' = 'breakpoint') {
    if (busy) return;
    if (panel.hidden) host.showTryIt();
    host.showCode();
    host.used?.();
    busy = true;
    note = null;
    clearCurrent();
    s = null;
    render();
    const src = editor.getValue();
    let trace: Trace;
    try {
      trace = await record(src, host.options());
    } catch (e: any) {
      busy = false;
      note = { kind: 'error', text: String(e?.message ?? e) };
      render();
      return;
    }
    busy = false;
    if (editor.getValue() !== src) return void start(first); // edited while it recorded
    s = { trace, src: src.split('\n'), pos: 0, stop: null, errors: trace.steps.flatMap((st, i) => (st.error ? [i] : [])) };
    const steps = trace.steps;
    if (!steps.length) return go(0, null);
    if (first === 'step' || !breakpoints().length) return go(0, { index: 0, reason: steps[0].error ? 'error' : 'step' });
    const st = nextStop(trace, -1, opts('continue'));
    go(st ? st.index : steps.length, st);
  }
  function move(mode: StepMode) {
    if (busy) return;
    if (!s) return void start(mode === 'continue' ? 'breakpoint' : 'step');
    const n = s.trace.steps.length;
    if (mode === 'back' || mode === 'reverse') {
      if (s.pos === 0) return void say('This is the first step: nothing ran before it.');
      const st = nextStop(s.trace, s.pos, opts(mode));
      return go(st ? st.index : 0, st ?? { index: 0, reason: 'step' });
    }
    if (s.pos >= n) return void say('The run is over. Restart to record it again, or go back.');
    const st = nextStop(s.trace, s.pos, opts(mode));
    go(st ? st.index : n, st);
  }
  function stop() {
    const was = !!s || !!note;
    s = null;
    note = null;
    busy = false;
    clearCurrent();
    render();
    if (was) host.rerun();
  }
  function say(text: string) {
    banner.setAttribute('aria-live', 'polite');
    const el = banner.querySelector('.dbg-say') ?? banner.appendChild(Object.assign(document.createElement('p'), { className: 'dbg-say muted' }));
    el.textContent = text;
  }

  // --- Drawing
  const valueCls = (v: ValueView) => `t-${v.type.replace(/\W/g, '').toLowerCase() || 'net'}`;
  function tree(name: string, v: ValueView, path: string, prev: ValueView | undefined, compare: boolean): string {
    const changed = compare && (!prev || prev.text !== v.text);
    const head = `<span class="dv-n">${esc(name)}</span><span class="dv-v ${valueCls(v)}">${esc(v.text)}</span>${changed ? '<span class="dv-ch" title="Changed by the last step">changed</span>' : ''}`;
    const kids = v.children ? Object.entries(v.children) : [];
    if (!kids.length) return `<li class="dv-row${changed ? ' is-ch' : ''}">${head}</li>`;
    const inner = kids.map(([k, c]) => tree(k, c, `${path}.${k}`, prev?.children?.[k], compare)).join('') + (v.more ? `<li class="dv-row muted">… ${v.more} more</li>` : '');
    return `<li class="dv-row${changed ? ' is-ch' : ''}"><details data-path="${esc(path)}"${open.has(path) ? ' open' : ''}><summary>${head}</summary><ul class="dv-kids">${inner}</ul></details></li>`;
  }
  function group(id: string, title: string, vals: Record<string, ValueView> | undefined, prev: Record<string, ValueView> | undefined, compare: boolean, empty?: string): string {
    const entries = Object.entries(vals ?? {});
    if (!entries.length && !empty) return '';
    const path = `g:${id}`;
    const body = entries.length ? `<ul class="dv-tree">${entries.map(([k, v]) => tree(k, v, `${id}.${k}`, prev?.[k], compare)).join('')}</ul>` : `<p class="muted dbg-empty">${empty}</p>`;
    const nch = compare ? entries.filter(([k, v]) => !prev?.[k] || prev[k].text !== v.text).length : 0;
    return `<details class="dv-group" data-path="${path}"${open.has(path) ? ' open' : ''}><summary><span>${title}</span> <span class="count">${entries.length}</span>${nch ? ` <span class="dv-ch">${nch} changed</span>` : ''}</summary>${body}</details>`;
  }
  function renderVars(step: Step | undefined, prev: Step | undefined) {
    if (!step) return void ($('dbg-vars').innerHTML = '<p class="muted dbg-empty">The run is over. Go back, or drag the timeline, to see the values at any step.</p>');
    const cmp = !!prev && samePhase(prev.phase, step.phase);
    const fn = step.depth > 0 ? step.stack[0]?.name : '';
    $('dbg-vars').innerHTML = [
      step.depth > 0 ? group('locals', `In ${esc(fn ?? 'this function')}`, step.locals, cmp ? prev!.locals : undefined, cmp && prev!.depth === step.depth, 'No variables of its own.') : '',
      group('globals', 'Handler variables', step.globals, cmp ? prev!.globals : undefined, cmp),
      step.context
        ? group('context', 'Context', step.context, cmp ? prev!.context : undefined, cmp)
        : `<p class="muted dbg-empty">Context and Player aren't set yet: Nucleus sets them for each player's Game.Play.</p>`,
      step.player ? group('player', 'Player', step.player, cmp ? prev!.player : undefined, cmp) : '',
      group('options', 'Game options set', step.options, cmp ? prev!.options : undefined, cmp, "None yet: every option still has Nucleus' default."),
    ].join('');
  }
  function renderWatches(i: number) {
    const list = $('dbg-watches');
    if (!watches.length) return void (list.innerHTML = '<li class="muted dbg-empty">Add a name or check to see its value at every step.</li>');
    list.innerHTML = watches
      .map((w, k) => {
        const r = s && s.trace.steps.length ? evaluateWatch(s.trace, i, w) : { error: 'Not running.' };
        return `<li class="dbg-w"><code class="dbg-w-e hl cm-s-default">${hlCode(w)}</code><span class="dbg-w-v ${r.error ? 'err' : valueCls(r.value!)}">${esc(r.error ?? r.value!.text)}</span><button class="btn icon" type="button" data-unwatch="${k}" aria-label="Remove watch ${esc(w)}" title="Remove">✕</button></li>`;
      })
      .join('');
  }
  function renderStack(step: Step | undefined) {
    $('dbg-stack').innerHTML = step
      ? step.stack.map((f, k) => `<li><button class="link" type="button" data-line="${f.line}"${k === 0 ? ' aria-current="step"' : ''}>${esc(f.name)}${f.name === 'top of the file' ? '' : '()'} <span class="muted">line ${f.line}</span></button></li>`).join('') +
        `<li class="muted dbg-stack-ph">Called by Nucleus ${esc(describePhase(step.phase))}</li>`
      : '<li class="muted dbg-empty">The run is over.</li>';
  }
  function renderDone(trace: Trace, pos: number) {
    const calls = callsBefore(trace, pos);
    $('dbg-done-n').textContent = String(calls.length);
    if (!calls.length) return void ($('dbg-done').innerHTML = '<li class="muted dbg-empty">Nothing yet: the handler hasn\'t asked Nucleus to do anything.</li>');
    const dev = isDev();
    let last = '';
    const out: string[] = [];
    for (const c of calls) {
      const ph = trace.steps[Math.max(0, c.step)]?.phase;
      const label = ph ? phaseShort(ph) : 'Loading';
      if (label !== last) out.push(`<li class="dbg-ph ${ph ? phaseClass(ph) : ''}">${esc(label)}</li>`), (last = label);
      const now = c.step === pos - 1 && pos > 0;
      out.push(
        `<li class="dbg-call${now ? ' now' : ''}">${dev || !c.effect ? `<code class="hl cm-s-default">${hlCode(c.call)}</code>` : ''}${c.effect ? `<span class="dbg-eff">${esc(c.effect)}</span>` : ''}${now ? '<span class="dv-ch">just now</span>' : ''}</li>`,
      );
    }
    const el = $('dbg-done');
    el.innerHTML = out.join('');
    el.scrollTop = el.scrollHeight;
  }
  function renderBps() {
    const list = root.querySelector('#dbg-bps');
    if (!list) return;
    const bps = breakpoints();
    list.innerHTML = bps.length
      ? bps
          .map(
            (b) =>
              `<li class="dbg-bp"><button class="link" type="button" data-line="${b.line}">Line ${b.line}</button><span class="muted">${b.condition ? `when <code class="hl cm-s-default">${hlCode(b.condition)}</code>` : 'always'}</span><button class="btn small" type="button" data-cond="${b.line}">Condition…</button><button class="btn icon" type="button" data-unbp="${b.line}" aria-label="Remove the breakpoint on line ${b.line}" title="Remove">✕</button></li>`,
          )
          .join('')
      : '<li class="muted dbg-empty">None. Click beside a line number (or press F9 on a line) to stop there.</li>';
  }
  function renderTrack(trace: Trace) {
    const steps = trace.steps;
    const n = Math.max(1, steps.length);
    const segs: string[] = [];
    let from = 0;
    for (let i = 1; i <= steps.length; i++) {
      if (i < steps.length && samePhase(steps[i].phase, steps[from].phase)) continue;
      const p = steps[from].phase;
      segs.push(`<span class="dbg-seg ${phaseClass(p)}" style="flex:${i - from}" title="${esc(phaseShort(p))}"></span>`);
      from = i;
    }
    const errs = s!.errors.map((i) => `<span class="dbg-tick" style="left:${(i / n) * 100}%"></span>`).join('');
    $('dbg-track').innerHTML = `<span class="dbg-segs">${segs.join('')}</span>${errs}`;
  }

  let drawnTrace: Trace | null = null;
  function render() {
    const visible = !!s || busy || !!note;
    root.hidden = !visible;
    panel.classList.toggle('debugging', visible);
    const body = $('dbg-body');
    const btn = (id: string) => $<HTMLButtonElement>(id);
    const all = ['dbg-go', 'dbg-over', 'dbg-into', 'dbg-out', 'dbg-back', 'dbg-rev', 'dbg-restart', 'dbg-stop'];
    const hadFocus = root.contains(document.activeElement) ? (document.activeElement as HTMLElement) : null;
    if (!s) {
      body.hidden = true;
      drawnTrace = null;
      for (const id of all) btn(id).disabled = id !== 'dbg-stop' && (busy || id !== 'dbg-restart');
      banner.className = `dbg-banner${note?.kind === 'error' ? ' error' : note ? ' stale' : ''}`;
      banner.innerHTML = busy
        ? '<p><strong>Recording the run…</strong> Every statement, for every player.</p>'
        : note
          ? `<p>${note.kind === 'stale' ? '<strong>Code changed.</strong> ' : '<strong>The debugger couldn\'t record this run.</strong> '}${esc(note.text)}</p>`
          : '';
      fixFocus(hadFocus);
      return;
    }
    const { trace, pos } = s;
    const steps = trace.steps;
    const n = steps.length;
    const step = steps[pos];
    const prev = pos > 0 ? steps[pos - 1] : undefined;
    body.hidden = !n;
    btn('dbg-go').disabled = pos >= n;
    btn('dbg-over').disabled = btn('dbg-into').disabled = btn('dbg-out').disabled = pos >= n;
    btn('dbg-back').disabled = btn('dbg-rev').disabled = pos === 0;
    btn('dbg-restart').disabled = btn('dbg-stop').disabled = false;
    // The banner
    let text: string;
    let cls = '';
    if (!n) {
      cls = ' error';
      text = `<p><strong>${esc(sessionSummary(trace.result))}</strong> ${esc(trace.error ?? '')} Fix the problems in Check first, then start again.</p>`;
    } else if (!step) {
      cls = trace.result.sessionEnded || !trace.result.loaded ? ' error' : ' done';
      text = `<p><strong>The run is over.</strong> ${esc(sessionSummary(trace.result))}${trace.truncated ? ` Only the first steps were recorded ${esc(trace.truncatedPhases.join('; '))}.` : ''}</p>`;
    } else {
      cls = step.error ? ' error' : s.stop?.reason === 'breakpoint' ? ' bp' : '';
      const reason = s.stop?.reason === 'breakpoint' && !step.error ? '<span class="dbg-reason">Breakpoint.</span> ' : '';
      const lineText = s.src[step.line - 1] ?? '';
      const about = step.error ? '' : aboutTo(lineText.slice(Math.max(0, step.column - 1)));
      text =
        `<p><span class="chip dbg-chip ${phaseClass(step.phase)}">${esc(phaseShort(step.phase))}</span> ${reason}<strong>${esc(describeStep(step))}</strong>${about ? ` ${esc(about)}` : ''}</p>` +
        (s.stop?.conditionError ? `<p class="dbg-cond-err">The breakpoint's condition couldn't be checked, so it stopped: ${esc(s.stop.conditionError)}</p>` : '');
    }
    banner.className = `dbg-banner${cls}`;
    banner.innerHTML = text;
    if (!n) return void fixFocus(hadFocus);
    // The line, the timeline, the panels
    const peekLine = step ?? steps[n - 1];
    const lt = s.src[peekLine.line - 1] ?? '';
    $('dbg-peek').innerHTML = step ? `<span class="dbg-peek-n">${peekLine.line}</span>${hlCode(lt) || ' '}` : '<span class="muted">The handler is done.</span>';
    if (drawnTrace !== trace) {
      renderTrack(trace);
      range.max = String(n);
      $('dbg-errs').innerHTML = s.errors.length
        ? `<span class="muted">Errors:</span> ${s.errors.map((i) => `<button class="btn small dbg-err-b" type="button" data-step="${i}">Line ${steps[i].line}, ${esc(phaseShort(steps[i].phase))}</button>`).join('')}`
        : '';
      drawnTrace = trace;
    }
    range.value = String(pos);
    const where = step ? `Step ${pos + 1} of ${n}: line ${step.line}, ${phaseShort(step.phase)}${step.error ? ', error' : ''}` : `The end (after step ${n})`;
    range.setAttribute('aria-valuetext', where);
    $('dbg-pos').textContent = step ? `${pos + 1} / ${n}` : `end / ${n}`;
    renderVars(step, prev);
    renderWatches(step ? pos : n - 1);
    renderStack(step);
    renderDone(trace, pos);
    renderBps();
    showCurrent(step);
    fixFocus(hadFocus);
  }
  /** A button that just got disabled (Continue at the end) would drop the focus to the page. */
  function fixFocus(had: HTMLElement | null) {
    if (!had || !(had as HTMLButtonElement).disabled) return;
    root.querySelector<HTMLButtonElement>('.dbg-bar button:not(:disabled):not([hidden])')?.focus();
  }

  // --- Events
  const on = (id: string, f: () => void) => $(id).addEventListener('click', f);
  on('dbg-go', () => move('continue'));
  on('dbg-over', () => move('over'));
  on('dbg-into', () => move('into'));
  on('dbg-out', () => move('out'));
  on('dbg-back', () => move('back'));
  on('dbg-rev', () => move('reverse'));
  on('dbg-restart', () => void start());
  on('dbg-stop', stop);
  range.addEventListener('input', () => {
    if (!s) return;
    const i = Number(range.value);
    const st = s.trace.steps[i];
    go(i, st ? { index: i, reason: st.error ? 'error' : 'step' } : null, true);
  });
  range.addEventListener('change', () => {
    banner.setAttribute('aria-live', 'polite');
  });
  root.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    const b = t.closest<HTMLElement>('[data-line], [data-step], [data-unwatch], [data-unbp], [data-cond]');
    if (!b) return;
    if (b.dataset.step && s) {
      const i = Number(b.dataset.step);
      go(i, { index: i, reason: 'error' });
    } else if (b.dataset.unwatch) {
      watches.splice(Number(b.dataset.unwatch), 1);
      saveWatches();
      renderWatches(s ? Math.min(s.pos, s.trace.steps.length - 1) : 0);
      $('dbg-watch-in').focus();
    } else if (b.dataset.unbp) {
      toggleBreakpoint(Number(b.dataset.unbp) - 1);
      (root.querySelector<HTMLElement>('#dbg-bps button') ?? $('dbg-onerr')).focus();
    } else if (b.dataset.cond) {
      openCondition(Number(b.dataset.cond) - 1, (() => {
        const r = b.getBoundingClientRect();
        return { x: r.left, y: r.bottom + 4 };
      })());
    } else if (b.dataset.line) {
      const line0 = Number(b.dataset.line) - 1;
      host.showCode();
      editor.setCursor({ line: line0, ch: 0 });
      editor.scrollIntoView({ line: line0, ch: 0 }, 80);
    }
  });
  root.addEventListener('toggle', (e) => {
    const d = e.target as HTMLDetailsElement;
    const p = d.dataset?.path;
    if (!p) return;
    if (d.open) open.add(p);
    else open.delete(p);
  }, true);
  $('dbg-watch-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $<HTMLInputElement>('dbg-watch-in');
    const v = input.value.trim();
    if (!v) return;
    watches.push(v);
    saveWatches();
    input.value = '';
    renderWatches(s ? Math.min(s.pos, s.trace.steps.length - 1) : 0);
  });
  // Editing the code ends the session: the record is of the code as it was.
  editor.on('change', () => {
    if (!s && !busy) return;
    s = null;
    busy = false;
    note = { kind: 'stale', text: 'The record is of the code as it was, so this run is over. Restart (Ctrl+Shift+F5) to record it again.' };
    clearCurrent();
    render();
  });
  // Players, monitor or keyboard changed: record again with them.
  for (const id of ['sim-players', 'sim-res', 'sim-kb']) document.getElementById(id)?.addEventListener('change', () => s && void start());
  // Guided and Advanced mode show different panels and labels.
  new MutationObserver(() => {
    if (s) render();
    else renderBps();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-mode'] });

  // Keys (VS Code's): F5 start/continue, F10 over, F11 into, Shift+F11 out, Alt+F10 back, Alt+F5 back to the
  // previous breakpoint, Shift+F5 stop, Ctrl+Shift+F5 restart, F9 breakpoint (Shift+F9: condition). Without a
  // session only in the code or in Try it, so F5 still reloads the page elsewhere.
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (!/^F(5|9|10|11)$/.test(e.key) || e.metaKey) return;
    const inEditor = editor.hasFocus();
    const here = inEditor || !panel.hidden || panel.contains(document.activeElement);
    const mod = e.ctrlKey;
    let act: (() => void) | null = null;
    if (e.key === 'F9') {
      if (!inEditor || mod || e.altKey) return;
      act = e.shiftKey ? () => isDev() && openCondition(editor.getCursor().line) : () => toggleBreakpoint();
    } else if (!s && !here && !busy) return;
    else if (e.key === 'F5') act = mod && e.shiftKey ? () => void start() : e.shiftKey ? stop : e.altKey ? () => move('reverse') : mod ? null : () => move('continue');
    else if (e.key === 'F10') act = mod || e.shiftKey ? null : e.altKey ? () => move('back') : () => move('over');
    else if (e.key === 'F11') act = mod || e.altKey ? null : e.shiftKey ? () => move('out') : () => move('into');
    if (!act) return;
    e.preventDefault();
    e.stopPropagation();
    act();
  }, true);

  render();
  return { start: () => void start(), stop, active: () => !!s, toggleBreakpoint };
}
