import { applyTheme, initDevBar } from './devbar';
import { applyCodeTheme, applyCustomTheme } from './customtheme';
import { watchPictures } from './themed';
import { clearNotice, confirmOn, initToasts, notice, toast as showToast, type ToastOptions } from './toast';
import { canShare, decodeShare, encodeShare, SHARE_PREFIX } from './share';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import { vscodeKeys, vscodeMouse } from './keys';
import { MATRIX_RESOLUTIONS, planMatrix, failureOf, jobOptions } from '@core/matrix';
import { lint, Diagnostic, RULES, lineOf, pluginGlobals } from '@core/lint';
import { api, membersOf, ownerLabel, Resolved } from '@core/api';
import { memberContextAt, resolveAt, callContextAt, valueContextAt } from '@core/complete';
import { search, lookup, allEntries, Entry } from '@core/lookup';
import USAGE from './usage.json';
import { renderHandler, FEATURES } from '@core/templates';
import { simulate, sessionSummary, groupIgnored, parsePluginsInfo } from '@core/sim';
import { buildPrompt, pageTools, diffLines, hunks, counts, newProblems } from './aifix';
import { fixAll } from '@core/fix';
import { formatHandler } from '@core/format';
import { readPackage, buildPackage, storeFiles, storedFiles, fileSize, PackageFile } from './package';
import { initLines } from './lines-ui';
import { initTips } from './tips-ui';
import { initSettings } from './settings-ui';
import { initNews } from './news';
import { initPanels } from './panels-ui';
import { initTouchTitles } from './touch-titles';
import { mascot, mascotsOn } from './mascots';
import { fixWithNucli, applyEditsToText } from './fixfx';
import { codeNote } from './codenote';
import { initMessageHints } from './wmhints';
import { memberCard } from './doccard';
import { initKeyHints } from './keyhints';
import { blockedItemAt, messageMarkdown } from '@core/wm';
import { initSheetDrag } from './sheets';
import { initWakaTime } from './wakatime';

declare const PROBES: { name: string; source: string; jint: string; detail: string }[];
applyTheme();
applyCustomTheme();
applyCodeTheme();
watchPictures();
declare const BUILD: { bench?: string; core: string; nucleus: string | null; jint: string | null };
interface HubExample { id: string; title: string; game: string; owner: string; version: number; downloads: number; maxPlayers: number | null; multiKbm: boolean; updated: string | null; url: string; source?: string; /** The game's cover: a file beside the page, or a data: URL. */ cover?: string; /** Its current version isn't verified on the Hub. */ unverified?: boolean; lint?: { errors: number; warnings: number } }
/** base: where hub/<id>.js are fetched from when the sources aren't in the page (GitHub Pages). */
declare const HUB_EXAMPLES: { takenAt: string | null; handlers: HubExample[]; base: string | null; /** every handler on the Hub (our mirror), not only the most downloaded */ all?: boolean };
declare const EXAMPLE_PACKAGES: { id: string; title: string; sub: string; name: string; hubId: string; handler: string; files: { name: string; b64: string }[] }[];
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
  'syntax-error': { title: "Nucleus can't read this file", why: 'Something is missing or extra here, often a bracket, a quote or a comma. The rest is still checked, but Nucleus won\'t load the file until this is fixed.' },
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
  'protoinput-inactive': { title: "Proto Input never starts", why: "None of its start options (InjectStartup or an InjectRuntime method) is on, so Nucleus ignores every Proto Input setting here." },
  'protoinput-needs-hook': { title: 'Blocked messages and filters do nothing yet', why: "They only work inside Proto Input's message filter hook, which isn't turned on." },
  'needs-option': { title: 'A setting that needs another one turned on', why: "Nucleus only reads it when the other setting is on, so on its own it does nothing." },
  'blocked-message': { title: "A window message Proto Input can't block as written", why: "It isn't in Proto Input's message list (it blocks something else, or nothing), or it's in the list twice." },
  'missing-builtin': { title: "A JavaScript function Nucleus doesn't have", why: "Nucleus uses an older JavaScript engine that lacks this function, so the handler stops with an error when it reaches this line." },
  deprecated: { title: 'An outdated setting', why: 'It still works, but it has been replaced.' },
};

/** Plain-language text for a problem; some messages are more specific than their rule. */
function plainFor(d: Diagnostic): { title: string; why: string } {
  if (d.rule === 'unknown-member' && /four controllers/.test(d.message)) {
    return { title: "A controller slot Nucleus doesn't have", why: 'Nucleus and Proto Input take at most four controllers per instance (ProtoController1 to 4), so this line does nothing. Removing it is safe.' };
  }
  if (d.rule === 'guid-changed') return { title: 'A different GUID than on the Hub', why: 'Nucleus files each player\'s game and profiles under the GUID: after this update their game disappears from the list. Keep the Hub version\'s GUID.' };
  if (d.rule === 'file-encoding') return { title: 'Not saved as UTF-8', why: 'Nucleus reads handlers as UTF-8, so accented letters arrive broken. Save the file as UTF-8 and retype them.' };
  if (d.rule === 'type-mismatch' && /saved profile/.test(d.message)) return { title: 'Option values a profile turns into text', why: 'After players save a profile, true comes back as "True" and 2 as "2", so comparisons stop matching. Use text values.' };
  if (d.rule === 'hub-install-parse' && /backslash/.test(d.message)) return { title: 'A backslash in the game name', why: 'The Hub install names the handler file after the game name, and a backslash makes it fail. Leave it out.' };
  if (d.rule === 'undefined-name') {
    return /unless it's a plugin/.test(d.message)
      ? { title: 'A name Nucleus may not know', why: "Nothing in the handler defines it. That's fine if it's one of the handler's plugins (listed in pluginsInfo.txt); otherwise Nucleus stops with an error here." }
      : { title: "A name that doesn't exist", why: /fails to load/.test(d.message) ? 'Nothing defines it, so Nucleus stops loading the handler here. A stray word or a typo?' : 'Nothing defines it, so Nucleus stops with an error when this line runs. A stray word or a typo?' };
  }
  if (d.rule === 'unknown-member' && /from the original Nucleus Coop/.test(d.message)) {
    return { title: 'An option from an older Nucleus', why: "The original Nucleus Coop had it; today's Nucleus doesn't read it and already does this itself. Remove the line." };
  }
  if (d.rule === 'unknown-member' && /calling it throws/.test(d.message)) {
    return { title: "A function that doesn't exist", why: "Calling it is an error, so Nucleus stops here. It's usually a typo." };
  }
  return PLAIN[d.rule] ?? { title: d.rule, why: '' };
}

const STORE_KEY = 'nucleus-workbench-draft';
let initial = BUGGY;
// Files that came with the opened package (besides handler.js); saved with it, and kept over a reload.
let packageFiles: PackageFile[] = storedFiles();
// A package's pluginsInfo.txt (in its handler folder, Game.Folder): Nucleus adds each plugin as a
// global. Without a package the linter can't see it, and only warns on unknown `Name.Member`.
const pluginsText = (): string | undefined => {
  const f = packageFiles.find((x) => /(^|\/)pluginsInfo\.txt$/i.test(x.name) && x.name.split('/').length <= 2);
  return f ? new TextDecoder().decode(f.data) : undefined;
};
const lintPlugins = (): string[] | undefined => {
  if (!packageFiles.length) return undefined;
  const t = pluginsText();
  return t ? pluginGlobals(t) : [];
};
const simPlugins = () => {
  const t = pluginsText();
  return t ? parsePluginsInfo(t) : undefined;
};
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
type Ctx = { plugins?: string[]; published?: { version?: number; guid?: string } };
/** What the linter needs besides the code: the package's plugins and the Hub version's GUID. */
function lintCtx(): Ctx {
  let published: Ctx['published'];
  try {
    published = doc.published; // `doc` is set further down; an early lint has none yet
  } catch {
    published = undefined;
  }
  return { plugins: lintPlugins(), published };
}
const pending = new Map<number, { text: string; ctx: Ctx; resolve: (a: Analysis) => void }>();
const analyzeHere = (text: string, ctx: Ctx): Analysis => ({ diagnostics: lint(text, ctx), fixable: fixAll(text, ctx).applied.length });
/** Game.GUID's string value in a handler source. */
const guidOf = (src: string): string | undefined => {
  const m = src.match(/^\s*Game\.GUID\s*=\s*("(?:[^"\\\r\n]|\\.)*")/m);
  try {
    return m ? JSON.parse(m[1]) : undefined;
  } catch {
    return undefined;
  }
};
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
      p.resolve(analyzeHere(p.text, p.ctx));
    }
  };
} catch {
  worker = null;
}
function analyze(text: string): Promise<Analysis> {
  const ctx = lintCtx();
  if (!worker) return Promise.resolve(analyzeHere(text, ctx));
  const id = ++reqId;
  return new Promise((resolve) => {
    pending.set(id, { text, ctx, resolve });
    worker!.postMessage({ id, text, ...ctx });
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
  // Touch screens edit through the page's own text selection, which only reaches lines that are
  // drawn: draw them all (handlers are small), so the phone's Select all, copy and delete see every line.
  viewportMargin: window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0 ? Infinity : 10,
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
    tooltips: false, // our own hover card (showHoverCard)
  },
  configureMouse: vscodeMouse,
  extraKeys: {
    // Ctrl+.: the problems (and fixes) at the cursor, else on its line.
    ...vscodeKeys((cm: any) => {
      const c = cm.getCursor();
      showLineProblems(c.line, cm.indexFromPos(c));
      if (linePop.hidden) showLineProblems(c.line);
      // From the keyboard: straight to its first button (Fix this), Esc goes back to the code.
      if (!linePop.hidden) linePop.querySelector<HTMLElement>('[data-lp-fix], [data-lp-more]')?.focus();
    }),
    'Ctrl-Space': (cm: any) => cm.showHint({ hint: hinter, completeSingle: false }),
    // Tab indents; Esc then Tab (or Shift+Tab) leaves the editor, so the rest of the page is reachable by keyboard.
    Tab: (cm: any) => cm.execCommand('insertSoftTab'),
    'Shift-Tab': (cm: any) => cm.execCommand('indentLess'),
  },
} as any);
let escThenTab = false;
editor.on('keydown', (_cm: any, e: KeyboardEvent) => {
  if (e.key === 'Escape') escThenTab = true;
  else if (e.key === 'Tab' && escThenTab) {
    // Leave the editor: focus the next (Shift: previous) control on the page.
    (e as any).codemirrorIgnore = true;
    e.preventDefault();
    const wrap = editor.getWrapperElement();
    const all = [...document.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
      .filter((x) => !wrap.contains(x) && !x.closest('[hidden], dialog:not([open])') && x.offsetParent !== null && !(x as HTMLButtonElement).disabled);
    const after = (x: HTMLElement) => !!(wrap.compareDocumentPosition(x) & Node.DOCUMENT_POSITION_FOLLOWING);
    const next = e.shiftKey ? all.filter((x) => !after(x)).pop() : all.find(after);
    next?.focus();
    escThenTab = false;
  }
  else if (e.key !== 'Shift') escThenTab = false;
});
editor.on('blur', () => (escThenTab = false));

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
// The hidden textarea CodeMirror types into is what screen readers see: name it.
editor.getInputField().setAttribute("aria-label", "Handler code");
// CodeMirror scrolls the code in a div of its own, which keyboard users reach through the editor: one
// tab stop (the scroller) that hands focus to the editor, instead of two (WCAG 2.1.1).
{
  const scroller = editor.getScrollerElement();
  scroller.tabIndex = 0;
  scroller.setAttribute('role', 'region');
  scroller.setAttribute('aria-label', 'Handler code');
  editor.getInputField().tabIndex = -1;
  scroller.addEventListener('focus', (e) => {
    if (e.target === scroller) editor.focus();
  });
}

// Completion
function hinter(cm: any) {
  const text = cm.getValue();
  const cur = cm.getCursor();
  const offset = cm.indexFromPos(cur);
  const ctx = memberContextAt(text, offset);
  // `Game.DPIHandling = |`: the values the option takes (enum values, true/false, a callback function, the usual
  // window messages for BlockedMessages).
  const val = !ctx ? valueContextAt(text, offset) : undefined;
  if (val && !val.partial.includes('.')) {
    const p = val.partial.toLowerCase();
    const indent = (cm.getLine(cur.line).match(/^\s*/) ?? [''])[0];
    const list = val.values.filter((v) => v.value.toLowerCase().startsWith(p)).map((v) => ({
      text: v.value,
      displayText: v.value,
      render(el: HTMLElement) {
        el.innerHTML = `<span class="hint-name">${esc(v.value.replace(/\s+/g, ' '))}</span><span class="hint-type">${esc(v.detail ?? '')}</span>`;
      },
      // A callback: the function on its own lines, the cursor inside it.
      hint: v.snippet ? (c: any, data: any) => {
        c.replaceRange(`function () {\n${indent}  \n${indent}};`, data.from, data.to);
        c.setCursor({ line: data.from.line + 1, ch: indent.length + 2 });
      } : undefined,
    }));
    return list.length ? { list, from: cm.posFromIndex(val.partialStart), to: cur } : null;
  }
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
  const afterEquals = change.text[0] === ' ' && /[\w\]]\s*=\s$/.test(cm.getLine(change.from.line).slice(0, change.from.ch + 1));
  if (change.text[0] === '.' || /^[\w$]$/.test(change.text[0]) || afterEquals) {
    if (!cm.state.completionActive) cm.showHint({ hint: hinter, completeSingle: false });
  }
  if (change.text[0] === '(' || change.text[0] === ',') showSignature();
});
editor.on('cursorActivity', () => showSignature());

initMessageHints(editor);

// Hover docs
const tip = $('#tip');
let tipTimer: number | undefined;
let tipHideTimer: number | undefined;
// The hover card: the problems under the pointer (what, why, a fix you can click) and the docs of the name there.
// Anchored under the code it's about (above it near the bottom), so it never covers that code; it stays open while
// the pointer moves onto it. Replaces CodeMirror's own plain-text lint tooltip (lint.tooltips: false).
const SEV_ICON: Record<string, string> = { error: '✖', warning: '!', info: 'i', hint: '·' };
const codeIn = (s: string) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>');
function problemCard(list: Diagnostic[]): string {
  return list.map((d, i) => {
    const plain = plainFor(d);
    const fix = (d.fixes ?? []).find((f) => f.preferred) ?? d.fixes?.[0];
    return `<div class="hc-item ${sevClass[d.severity]}"><span class="hc-ico" aria-hidden="true">${SEV_ICON[d.severity]}</span><div class="hc-body">`
      + `<div class="hc-title">${esc(plain.title)}<span class="sr-only"> (${d.severity})</span></div><div class="hc-msg">${codeIn(d.message)}</div>`
      + (fix ? `<div class="hc-actions"><button class="btn primary" type="button" data-hc-fix="${i}">${fix.preferred ? 'Fix: ' : ''}${codeIn(fix.title)}</button>${mode === 'dev' ? `<span class="hc-rule">${d.rule}</span>` : ''}</div>` : mode === 'dev' ? `<div class="hc-actions"><span class="hc-rule">${d.rule}</span></div>` : '')
      + `</div></div>`;
  }).join('');
}
function placeTip(from: { left: number; top: number; bottom: number }) {
  const w = tip.offsetWidth, h = tip.offsetHeight;
  const x = Math.min(Math.max(8, from.left - 12), window.innerWidth - w - 8);
  const below = from.bottom + 6 + h <= window.innerHeight - 8 || from.top - 6 - h < 8;
  tip.style.left = `${x}px`;
  tip.style.top = `${below ? from.bottom + 6 : from.top - 6 - h}px`;
}
function showHoverCard(text: string, at: number, list: Diagnostic[], doc: string, anchorFrom: number) {
  if (!list.length && !doc) return void (tip.hidden = true);
  tip.innerHTML = problemCard(list) + (doc ? `<div class="hc-doc">${doc}</div>` : '');
  tip.classList.toggle('has-problems', list.length > 0);
  tip.hidden = false;
  tip.querySelectorAll<HTMLButtonElement>('[data-hc-fix]').forEach((b) => b.addEventListener('click', () => {
    const d = list[Number(b.dataset.hcFix)];
    const fix = (d.fixes ?? []).find((f) => f.preferred) ?? d.fixes![0];
    tip.hidden = true;
    fixWithNucli(editor, applyEditsToText(editor.getValue(), fix.edits), () =>
      editor.operation(() => {
        for (const e of [...fix.edits].sort((a, z) => z.start - a.start)) editor.replaceRange(e.text, editor.posFromIndex(e.start), editor.posFromIndex(e.end));
      }),
    );
    codeNote(editor, editor.posFromIndex(Math.min(...fix.edits.map((e) => e.start))).line, `Fixed: ${fix.title.replace(/`/g, '')}.`, { action: undoAction });
  }));
  placeTip(editor.charCoords(editor.posFromIndex(anchorFrom), 'window'));
}
const problemsAt = (at: number) => current.filter((d) => d.severity !== 'hint' && d.start <= at && at <= Math.max(d.end, d.start + 1));
editor.getWrapperElement().addEventListener('mousemove', (e: MouseEvent) => {
  if (tip.contains(e.target as Node)) return;
  clearTimeout(tipTimer);
  tipTimer = window.setTimeout(() => {
    // Not over the "+" or while its menu is open: the menu says it already.
    if ((e.target as HTMLElement).closest?.('.wm-add') || document.querySelector('.wm-menu')) { tip.hidden = true; return; }
    const text = editor.getValue();
    // A marker in the gutter: every problem on that line.
    const marker = (e.target as HTMLElement).closest?.('.CodeMirror-lint-marker');
    if (marker) {
      const line = editor.lineAtHeight(e.clientY, 'window');
      const list = lineProblems(line, mode === 'dev');
      if (!list.length) return void (tip.hidden = true);
      return showHoverCard(text, 0, list, '', Math.min(...list.map((d) => d.start)));
    }
    if ((e.target as HTMLElement).closest?.('.CodeMirror-gutters')) return void (tip.hidden = true);
    const pos = editor.coordsChar({ left: e.clientX, top: e.clientY }, 'window');
    const at = editor.indexFromPos(pos);
    // Past the end of the line: nothing there.
    const end = editor.charCoords({ line: pos.line, ch: editor.getLine(pos.line).length }, 'window');
    if (e.clientX > end.right + 4) return void (tip.hidden = true);
    const list = problemsAt(at);
    // A number in Game.ProtoInput.BlockedMessages: the window message and what blocking it does.
    const msg = blockedItemAt(text, at);
    const r = msg ? undefined : resolveAt(text, at);
    const doc = msg ? md(messageMarkdown(msg.id)) : r ? describeResolved(r.resolved, text.slice(r.start, r.end)) : '';
    const from = list.length ? Math.min(...list.map((d) => d.start)) : msg ? msg.start : r ? r.start : at;
    showHoverCard(text, at, list, doc, from);
  }, 280);
});
const hideTipSoon = () => { clearTimeout(tipHideTimer); tipHideTimer = window.setTimeout(() => (tip.hidden = true), 250); };
editor.getWrapperElement().addEventListener('mouseleave', (e: MouseEvent) => {
  clearTimeout(tipTimer);
  if (!tip.contains(e.relatedTarget as Node)) hideTipSoon();
});
editor.getWrapperElement().addEventListener('mouseenter', () => clearTimeout(tipHideTimer));
tip.addEventListener('mouseenter', () => { clearTimeout(tipHideTimer); clearTimeout(tipTimer); });
tip.addEventListener('mouseleave', (e: MouseEvent) => { if (!editor.getWrapperElement().contains(e.relatedTarget as Node)) hideTipSoon(); });
editor.on('change', () => (tip.hidden = true));
editor.on('scroll', () => (tip.hidden = true));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !tip.hidden) tip.hidden = true; });

function describeResolved(res: Resolved, word: string): string {
  switch (res.kind) {
    case 'member':
      return memberCard(res.owner, res.name, res.member);
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
  // While text is selected, stay out of the way of the selection handles and the copy menu.
  if (editor.somethingSelected()) return void (sig.hidden = true);
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
  $('#status').innerHTML = !editor.getValue().trim()
    ? `<span class="pill">No code yet</span>`
    : counts.error
    ? `<span class="pill error">Nucleus can't use this handler yet</span><span>${plural(serious, 'thing')} to fix${tally}</span>`
    : counts.warning
      ? `<span class="pill ok">Nucleus can use this handler</span><span>but ${plural(counts.warning, 'setting')} may not work as intended${tally}</span>`
      : `<span class="pill ok">Ready for Nucleus</span><span>Next: <button class="link" type="button" id="v-try">try it</button>${tally}</span>`;
  $('#status').querySelector('#v-try')?.addEventListener('click', () => selectTab('simulate'));
  const el = $('#problems');
  if (!list.length) {
    // Nucli: dozing while there's no code, pleased when there's nothing to fix.
    if (!editor.getValue().trim()) {
      el.innerHTML = `<li class="empty masc-empty">${mascot('n-sleep', { size: 72, zoom: 1.2 })}<span><strong>Waiting for code.</strong> Type or paste a handler, or <button class="link" type="button" id="go-open">open one</button> (Ctrl+K).</span></li>`;
      el.querySelector('#go-open')?.addEventListener('click', () => showOpen());
      return;
    }
    el.innerHTML =
      simple || filter === 'all'
        ? `<li class="empty masc-empty">${mascot('n-ok', { size: 72, zoom: 1.2 })}<span>Nothing to fix. <button class="link" type="button" id="go-sim">Try it</button> to see what each player gets.${
            simple ? '' : counts.hint ? ` There ${counts.hint === 1 ? 'is' : 'are'} also <button class="link" type="button" id="go-hints">${plural(counts.hint, 'hint')}</button> about outdated options.` : ''
          }</span></li>`
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
      fixWithNucli(editor, applyEditsToText(editor.getValue(), fix.edits), () =>
        editor.operation(() => {
          for (const e of [...fix.edits].sort((a, z) => z.start - a.start)) editor.replaceRange(e.text, editor.posFromIndex(e.start), editor.posFromIndex(e.end));
        }),
      );
      codeNote(editor, editor.posFromIndex(Math.min(...fix.edits.map((e) => e.start))).line, `Fixed: ${fix.title.replace(/`/g, '')}.`, { action: undoAction });
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
      fixWithNucli(editor, applyEditsToText(editor.getValue(), fix.edits), () =>
        editor.operation(() => {
          for (const e of [...fix.edits].sort((a, z) => z.start - a.start)) editor.replaceRange(e.text, editor.posFromIndex(e.start), editor.posFromIndex(e.end));
        }),
      );
      hideLinePop();
      codeNote(editor, editor.posFromIndex(Math.min(...fix.edits.map((e) => e.start))).line, `Fixed: ${fix.title.replace(/`/g, '')}.`, { action: undoAction });
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
  const had = linePop.contains(document.activeElement);
  linePop.hidden = true;
  if (had) editor.focus();
}
editor.on('gutterClick', (_cm: any, line: number) => ((tip.hidden = true), showLineProblems(line)));
linePop.addEventListener('keydown', (e: KeyboardEvent) => e.key === 'Escape' && (e.preventDefault(), hideLinePop()));
editor.on('keydown', (_cm: any, e: KeyboardEvent) => e.key === 'Escape' && !linePop.hidden && hideLinePop());

// Touch screens have no hover: the mouse events a tap fakes would open the hover docs and the
// problem tooltips and leave them stuck. Instead, a tap on an underlined word shows its problems
// (and docs); the docs of the name under the cursor show in the strip under the code. Holding is
// left alone: on a phone it selects text and opens the copy menu.
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
    hold = window.setTimeout(() => (start = undefined), 450); // a hold: the browser selects text
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
    if (el?.closest('.CodeMirror-lint-mark')) requestAnimationFrame(() => !editor.somethingSelected() && popAt(s.x, s.y));
  };
  wrap.addEventListener('pointerup', end, true);
  wrap.addEventListener('pointercancel', end, true);
}
editor.on('change', hideLinePop);
editor.on('scroll', hideLinePop);
editor.on('cursorActivity', () => editor.somethingSelected() && hideLinePop());

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
    codeNote(editor, editor.getCursor().line, 'No problems to go to.', { mood: 'info' });
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
  // Nothing to fix: no button (the bar goes too unless Fix with AI is there; CSS :has).
  btn.hidden = n === 0;
  btn.textContent = `Fix ${n} problem${n === 1 ? '' : 's'} automatically`;
}

// ---------------------------------------------------------------------------
// Simulate

// Players to try: 1 up to the handler's Game.MaxPlayers (at least 4, at most Nucleus' 32).
function syncPlayerChoices() {
  const sel = $('#sim-players') as HTMLSelectElement;
  const m = editor.getValue().match(/^\s*Game\.MaxPlayers\s*=\s*(\d+)/m);
  const max = Math.min(32, Math.max(4, m ? Number(m[1]) : 4, Number(sel.value) || 0));
  if (sel.options.length === max) return;
  const v = sel.value;
  sel.replaceChildren(...Array.from({ length: max }, (_, i) => new Option(String(i + 1), String(i + 1))));
  sel.value = Number(v) <= max ? v : String(max);
}
function runSim() {
  syncPlayerChoices();
  const players = Number(($('#sim-players') as HTMLSelectElement).value);
  const [width, height] = ($('#sim-res') as HTMLSelectElement).value.split('x').map(Number);
  const kb = Number(($('#sim-kb') as HTMLSelectElement).value);
  const r = simulate(editor.getValue(), { players, width, height, keyboardPlayer: kb, plugins: simPlugins() });
  const out: string[] = [];
  const simple = mode === 'simple';
  // Test all needs a handler that loads: until then the banner below says what to fix.
  const all = $('#sim-all') as HTMLButtonElement;
  all.disabled = !r.loaded;
  all.title = r.loaded ? 'Every player count, input setup and monitor size' : 'Fix the problems first: the handler has to load before it can be tried';
  if (!r.loaded) {
    out.push(
      `<div class="banner error masc-banner">${mascot('n-bad', { size: 44 })}<div><strong>${esc(sessionSummary(r))}</strong> Fix the problems first.${r.loadError ? `<details class="small"><summary>Technical details</summary><div class="mono">${esc(r.loadError)}</div></details>` : ''}<div class="banner-actions">${($('#fix-all') as HTMLButtonElement).hidden ? '' : `<button class="btn primary" type="button" id="sim-fix">${esc(($('#fix-all') as HTMLButtonElement).textContent ?? 'Fix problems')}</button>`}<button class="btn" type="button" id="sim-check">Show the problems</button></div></div>`,
    );
  } else {
    // Nucli, pleased when every player starts; worried when the session ends.
    out.push(`<div class="banner ${r.sessionEnded ? 'error' : 'ok'} masc-banner">${mascot(r.sessionEnded ? 'n-bad' : 'n-ok', { size: 44 })}<div><strong>${esc(sessionSummary(r))}</strong></div></div>`);
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

// The combinations and what counts as failing come from the core, shared with the VS Code panel.
const MX_RES = MATRIX_RESOLUTIONS;
let mxRun = 0;
function testAll() {
  document.dispatchEvent(new CustomEvent('wakatime-activity', { detail: 'running tests' }));
  const run = ++mxRun;
  const code = editor.getValue();
  const box = $('#sim-matrix');
  box.hidden = false;
  const first = simulate(code, { players: 1, width: 1920, height: 1080, keyboardPlayer: -1, plugins: simPlugins() });
  if (!first.loaded) {
    box.innerHTML = `<div class="mx-head"><strong>Can't test combinations yet</strong><span class="muted">Nucleus can't load this handler. Fix the problems first.</span></div>`;
    return;
  }
  const { max, modes, jobs } = planMatrix(first)!;
  type Cell = { ok: number; fail: { res: string; why: string }[] };
  const cells = new Map<string, Cell>();
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
    // Nucli runs the relay while it tests, then shows how it went.
    const nuc = mascot(finished ? (failed ? 'n-bad' : 'n-ok') : 'n-ring', { size: 44, className: 'mx-masc', busy: !finished });
    box.innerHTML = `<div class="mx-head">${nuc}<strong>${finished ? (failed ? `${failed} of ${jobs.length} combinations fail` : `All ${jobs.length} combinations work`) : `Testing ${done} of ${jobs.length}…`}</strong><span class="muted">${max} player${max === 1 ? '' : 's'} max · ${MX_RES.map(([w, h]) => `${w}×${h}`).join(', ')}${finished ? ` · ${Math.round(performance.now() - t0)} ms` : ''}</span>${finished ? '' : '<button class="btn" type="button" id="mx-stop">Stop</button>'}<button class="btn" type="button" id="mx-close" aria-label="Close">×</button></div>
      ${finished ? '' : `<div class="mx-bar" role="progressbar" aria-label="Combinations tested" aria-valuemin="0" aria-valuemax="${jobs.length}" aria-valuenow="${done}"><i style="width:${Math.round((done / Math.max(1, jobs.length)) * 100)}%"></i></div>`}
      <div class="mx-wrap"><table><thead><tr><th></th>${modes.map((m) => `<th>${m.label}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>
      ${fails.length ? `<ul class="mx-fails">${fails.slice(0, 8).map((f) => { const [p, kb] = f.k.split('|'); return `<li>${p} player${p === '1' ? '' : 's'}, ${modes.find((m) => String(m.kb) === kb)!.label.toLowerCase()}, ${f.res.replace('x', '×')}: ${esc(f.why)}</li>`; }).join('')}${fails.length > 8 ? `<li>…and ${fails.length - 8} more</li>` : ''}</ul>` : ''}
      <p class="muted small" style="margin:6px 0 0">Pick a cell to see that run below.</p>`;
    document.documentElement.classList.toggle('busy', !finished); // the logo beats while it runs
    box.querySelector('#mx-stop')?.addEventListener('click', () => (mxRun++, draw(true)));
    box.querySelector('#mx-close')?.addEventListener('click', () => ((mxRun++, (box.hidden = true), document.documentElement.classList.remove('busy'))));
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
      const j = jobs[done++];
      const key = `${j.players}|${j.kb}`;
      const c = cells.get(key) ?? { ok: 0, fail: [] };
      const why = failureOf(simulate(code, { ...jobOptions(j), plugins: simPlugins() }));
      if (why) c.fail.push({ res: `${j.width}x${j.height}`, why });
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

// Reference with nothing typed: what's in it, so it's clear what can be found there.
const API_GROUPS: { key: string; title: string; doc: string; match: (path: string) => boolean }[] = [
  { key: 'Game', title: 'Game', doc: 'The handler\'s options: the game, its executable, players, mutexes, files and callbacks.', match: (p) => /^Game\.[^.]+$/.test(p) },
  { key: 'Game.Hook', title: 'Game.Hook', doc: 'Focus and input hooks injected into each instance.', match: (p) => p.startsWith('Game.Hook.') },
  { key: 'Game.ProtoInput', title: 'Game.ProtoInput', doc: 'Proto Input settings for the whole session.', match: (p) => p.startsWith('Game.ProtoInput.') },
  { key: 'Context', title: 'Context', doc: 'One player\'s instance, inside Game.Play: launch arguments, folders and files to edit.', match: (p) => p.startsWith('Context.') },
  { key: 'Player', title: 'Player', doc: 'The player Game.Play runs for (also PlayerList[i]): screen, controller, nickname.', match: (p) => p.startsWith('Player.') },
  { key: 'ProtoInput', title: 'ProtoInput', doc: 'Proto Input calls at runtime, inside Game.Play and other callbacks.', match: (p) => p.startsWith('ProtoInput.') },
  { key: 'System', title: '.NET (System.*)', doc: 'Files, folders, paths and the environment, through .NET.', match: (p) => p.startsWith('System.') },
];
const typeOf = (e: Entry) => (e.member.kind === 'method' ? 'fn' : ((e.member as { type?: string }).type ?? ''));
function renderApiHome(el: HTMLElement) {
  const all = allEntries();
  const usage = USAGE.counts as Record<string, number>;
  const top = Object.entries(usage)
    .filter(([p]) => !/^Game\.(GUID|GameName|ExecutableName|Play|Hub)$/.test(p) && all.some((e) => e.path === p && e.member.kind !== 'object'))
    .slice(0, 14);
  const enums = Object.keys(api.enums).sort();
  el.innerHTML = `<div class="api-home">
    <p class="muted">Every option, Context member, enum and .NET call a handler can use, with what Nucleus does with it. Type above, or start here.</p>
    <h3 class="api-h">Browse</h3>
    <div class="api-groups">${API_GROUPS.map((g) => `<button type="button" class="api-group" data-group="${g.key}"><span class="t">${esc(g.title)} <span class="count">${all.filter((e) => g.match(e.path)).length}</span></span><span class="s">${esc(g.doc)}</span></button>`).join('')}</div>
    <h3 class="api-h">Most used in Hub handlers</h3>
    <div class="api-chips">${top.map(([p, n]) => `<button type="button" class="api-chip" data-q="${esc(p)}" title="In ${n} of ${USAGE.handlers} Hub handlers">${esc(p)}</button>`).join('')}</div>
    <h3 class="api-h">Nucleus values (enums)</h3>
    <div class="api-chips">${enums.map((n) => `<button type="button" class="api-chip" data-q="Nucleus.${esc(n)}">Nucleus.${esc(n)}</button>`).join('')}</div>
    <h3 class="api-h">Try a search</h3>
    <p class="muted">${['mutex', 'window title', 'save file', 'keyboard', 'steam'].map((q) => `<button class="link" data-q="${q}">${q}</button>`).join(' · ')}</p>
  </div>`;
  el.querySelectorAll<HTMLButtonElement>('[data-group]').forEach((b) => b.addEventListener('click', () => renderApiGroup(el, b.dataset.group!)));
  wireApiLinks(el);
}
/** One object's members, as a compact list: click one for its docs. */
function renderApiGroup(el: HTMLElement, key: string) {
  const g = API_GROUPS.find((x) => x.key === key)!;
  const list = allEntries().filter((e) => g.match(e.path)).sort((a, b) => a.path.localeCompare(b.path));
  el.innerHTML = `<div class="api-home"><p class="api-crumbs"><button type="button" class="link" data-home>Reference</button> › <strong>${esc(g.title)}</strong> <span class="muted">· ${list.length}</span></p><p class="muted">${esc(g.doc)}</p>
    <ul class="api-list">${list.map((e) => `<li><button type="button" data-q="${esc(e.path)}"><span class="n">${esc(e.path)}</span><span class="ty">${esc(typeOf(e))}</span><span class="d">${e.member.docBy === 'claude' ? '<span class="ai-mark" title="Written by Claude (AI), not from the official docs" aria-label="Written by Claude (AI)">✦</span> ' : ''}${esc((e.member.doc || '').split('\n')[0].replace(/[`*\\]/g, ''))}</span></button></li>`).join('')}</ul></div>`;
  el.querySelector('[data-home]')!.addEventListener('click', () => renderApiHome(el));
  wireApiLinks(el);
  el.scrollTop = 0;
}
function wireApiLinks(el: HTMLElement) {
  el.querySelectorAll<HTMLButtonElement>('[data-q]').forEach((b) =>
    b.addEventListener('click', () => {
      ($('#api-q') as HTMLInputElement).value = b.dataset.q!;
      renderApi(b.dataset.q!);
    }),
  );
}

function renderApi(q: string) {
  const el = $('#api-results');
  if (!q.trim()) return renderApiHome(el);
  {
    const exact = lookup(q);
    let entries: Entry[] = exact.kind === 'entries' ? exact.entries : [];
    for (const e of search(q, 30)) if (!entries.some((x) => x.path === e.path)) entries.push(e);
    let head = '';
    if (exact.kind === 'enum') head = `<article class="api"><h3>enum Nucleus.${esc(exact.name)}</h3>${md(exact.doc ?? '')}<p class="mono">${Object.entries(exact.values).map(([k, v]) => `${esc(k)} = ${v}`).join(' · ')}</p></article>`;
    if (exact.kind === 'class') head = `<article class="api"><h3>new Nucleus.${esc(exact.name)}(${exact.params.join(', ')})</h3>${md(exact.doc)}</article>`;
    if (exact.kind === 'none' && exact.didYouMean) head = `<p class="muted">"${esc(q)}" isn't part of the handler API. Did you mean <button class="link" data-q="${esc(exact.didYouMean)}">${esc(exact.didYouMean)}</button>?</p>`;
    entries = entries.slice(0, 30);
    el.innerHTML =
      head +
      (entries.length || head
        ? entries.map((e) => `<article class="api"><h3>${esc(e.path)}${e.member.deprecated ? ' <span class="chip hint">deprecated</span>' : ''}${e.member.required ? ' <span class="chip error">required</span>' : ''}</h3>${memberCard(e.owner, e.name, e.member)}</article>`).join('')
        : `<p class="empty masc-empty">${mascot('n-calc', { size: 64, zoom: 1.2 })}<span>Nothing matches "${esc(q)}".</span></p>`);
  }
  wireApiLinks(el);
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

interface DocMeta { name: string; kind: 'draft' | 'example' | 'template' | 'hub' | 'probe' | 'new'; hash?: string; hubIndex?: number; /** The Hub version's GUID, for guid-changed. */ published?: { version?: number; guid?: string } }
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
  if (packageFiles.length) {
    const list = packageFiles.map((f) => `${f.name} (${fileSize(f.data.length)})`).join('\n');
    parts.push(`<button type="button" class="chip chip-btn" id="files-open" aria-haspopup="dialog" title="${esc('Saved with the handler:\n' + list)}">+ ${packageFiles.length} file${packageFiles.length === 1 ? '' : 's'}</button>`);
  }
  $('#doc-meta').innerHTML = parts.join('');
}

/**
 * Copy link: an unchanged example links by name (#hub-…); anything else is packed into the link
 * (#share-…). With text selected, only the selection is shared.
 */
const DISCORD_LIMIT = 2000;
async function copyLink(trigger?: HTMLElement | null) {
  const selection = editor.getSelection();
  const edited = editor.getValue() !== loadedText;
  let id = doc.hash && !edited && !selection ? doc.hash : '';
  if (!id) {
    try {
      id = await encodeShare(selection || editor.getValue());
    } catch {
      notice("This browser can't make share links. Use Copy instead.", { kind: 'error' });
      return;
    }
  }
  const what = selection ? 'the selected lines' : doc.hash && !edited ? 'this example' : 'this handler';
  if ((window as any).claude) {
    // Inside a Claude artifact the page's own address isn't the artifact's link: put the id in the
    // hash, which the artifact's address and Share > Copy link follow.
    history.replaceState(null, '', '#' + id);
    notice(`The page link now opens ${what}. Copy it from the address bar or Share > Copy link.`, { kind: 'info' });
    return;
  }
  const url = location.href.replace(/#.*$/, '') + '#' + id;
  const long = url.length > DISCORD_LIMIT ? ` It is ${url.length.toLocaleString()} characters, too long for a Discord message (${DISCORD_LIMIT.toLocaleString()}): ${selection ? 'share the file instead' : 'select just the lines that matter and copy again, or share the file'}.` : '';
  try {
    await navigator.clipboard.writeText(url);
    confirmOn(trigger, 'Link copied ✓', `Link copied. It opens ${what} for anyone.`);
    if (long) notice(`The link copied, but it's long.${long}`, { kind: 'warning' });
  } catch {
    notice(`Couldn't copy. The link is in the address bar.${long}`, { kind: 'warning' });
    history.replaceState(null, '', '#' + id);
  }
}

function setPackageFiles(files: PackageFile[]) {
  packageFiles = files;
  renderDocHead();
}
function loadSource(src: string, meta: DocMeta) {
  clearNotice(); // it was about the handler before
  document.documentElement.classList.remove('busy'); // a Test all of the last handler no longer runs
  packageFiles = [];
  storeFiles([]);
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

function openExamplePackage(id: string) {
  const e = EXAMPLE_PACKAGES.find((x) => x.id === id);
  if (!e) return;
  const files: PackageFile[] = e.files.map((f) => ({ name: f.name, data: Uint8Array.from(atob(f.b64), (c) => c.charCodeAt(0)) }));
  loadSource(e.handler, { name: e.name, kind: 'example', hash: `package-${id}`, published: { guid: guidOf(e.handler) } });
  setPackageFiles(files);
  storeFiles(files);
}

// The package's other files, and where the Hub install puts them: the contents of each top-level
// folder go into handlers\<GameName>\ (DownloadPrompt.ExtractHandler), which is Game.Folder.
const filesDialog = $('#files-dialog') as HTMLDialogElement;
function previewOf(data: Uint8Array): string | null {
  if (data.length > 64 * 1024) return null;
  const le = data[0] === 0xff && data[1] === 0xfe;
  const be = data[0] === 0xfe && data[1] === 0xff;
  try {
    if (le || be) return new TextDecoder(le ? 'utf-16le' : 'utf-16be').decode(data.subarray(2));
    if (data.includes(0)) return null;
    return new TextDecoder('utf-8', { fatal: true }).decode(data).replace(/^\uFEFF/, '');
  } catch {
    return null;
  }
}
function openFilesDialog() {
  const m = editor.getValue().match(/^\s*Game\.GameName\s*=\s*"([^"\r\n]*)"/m);
  const folder = m ? m[1].replace(/[\/:*?"<>|]/g, '') : '<GameName>';
  const dest = (name: string) => `handlers\\${folder}\\${name.split('/').slice(1).join('\\')}`;
  const rows = packageFiles
    .map((f) => {
      const text = previewOf(f.data);
      const top = f.name.includes('/');
      return `<details class="pkg-file"><summary><code>${esc(f.name)}</code> <span class="muted">${fileSize(f.data.length)}</span></summary>
        <p class="muted small">${top ? `Installed as <code>${esc(dest(f.name))}</code>` : "At the package's top level: the Hub install keeps only handler.js there, so this file is dropped."}</p>
        ${text !== null ? `<pre class="pkg-text">${esc(text.slice(0, 20000))}${text.length > 20000 ? '\n…' : ''}</pre>` : '<p class="muted small">Not a text file (or too big to show).</p>'}</details>`;
    })
    .join('');
  $('#files-body').innerHTML = `<p class="muted">A package (.zip or .nc) is <code>handler.js</code> plus folders. Nucleus installs the folders' contents in the handler's folder, <code>handlers\\${esc(folder)}\\</code>, which is <code>Game.Folder</code>. They're saved with the handler.</p>
    <div class="pkg-file pkg-js"><code>handler.js</code> <span class="muted">the code in the editor</span></div>${rows}`;
  filesDialog.showModal();
}
document.addEventListener('click', (e) => {
  if ((e.target as HTMLElement).closest?.('#files-open')) openFilesDialog();
});
$('#files-close').addEventListener('click', () => filesDialog.close());

async function openHub(i: number) {
  const h = HUB_EXAMPLES.handlers[i];
  if (h.source === undefined) {
    // On a slow connection, Nucli spins while the handler downloads.
    const slow = setTimeout(() => notice(`Getting ${h.title}…`, { kind: 'info', mascot: 'n-spin' }), 300);
    try {
      const r = await fetch(`${HUB_EXAMPLES.base ?? 'hub/'}${h.id}.js`);
      if (!r.ok) throw new Error(String(r.status));
      h.source = await r.text();
      clearTimeout(slow); clearNotice();
    } catch {
      clearTimeout(slow);
      notice(`Couldn't load ${h.title} from this site. Check your connection.`, { kind: 'error', action: { label: 'Try again', run: () => void openHub(i) } });
      return;
    }
  }
  loadSource(h.source, { name: h.title, kind: 'hub', hubIndex: i, hash: `hub-${h.id}`, published: { version: h.version, guid: guidOf(h.source) } });
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

interface OpenEntry {
  group: string; title: string; sub?: string; badges?: string; keywords?: string; run: () => void; lint?: () => string;
  /** A command's shortcut, shown like VS Code's palette. */ keys?: string;
  /** An inline SVG icon (the inside of a 24×24 viewBox), or a monogram's source text. */ icon?: string; mono?: string;
  /** The game's cover, over the monogram (which stays if the image can't load). */ cover?: string;
  /** Small facts on the right of a row (players, downloads), as HTML. */ meta?: string;
}

// Icons for the Open dialog: inline SVG, drawn with the text colour (no icon font).
const OI = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  folder: '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2.2h7.5A2.5 2.5 0 0 1 21 9.7v7.8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z"/>',
  plus: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M12 11.5v6M9 14.5h6"/>',
  box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
  bug: '<path d="M12 4 2.8 19.5h18.4L12 4z"/><path d="M12 10v4M12 17h.01"/>',
  command: '<path d="m5 8 4 4-4 4M12 16h7"/>',
  flask: '<path d="M9 3h6M10 3v6l-5.2 9.1A2 2 0 0 0 6.5 21h11a2 2 0 0 0 1.7-2.9L14 9V3M7.5 15h9"/>',
  players: '<circle cx="9" cy="8" r="3.2"/><path d="M3 19.5a6 6 0 0 1 12 0M16 5a3.2 3.2 0 0 1 0 6.2M18 19.5a6 6 0 0 0-2.6-5"/>',
  downloads: '<path d="M12 4v11m-4.5-4.5L12 15l4.5-4.5M5 20h14"/>',
  keyboard: '<rect x="2.5" y="6" width="19" height="12" rx="2"/><path d="M6.5 10h.01M10 10h.01M14 10h.01M17.5 10h.01M7 14h10"/>',
  ok: '<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.8 2.8L16 10"/>',
  warning: '<path d="M12 4 2.8 19.5h18.4L12 4z"/><path d="M12 10v4M12 17h.01"/>',
  error: '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/>',
};
const svgIcon = (d: string, cls = 'oi') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
/** Two letters and a stable hue for a name: a stand-in for game art. */
function monogram(name: string, cover?: string): string {
  const words = name.replace(/\(.*?\)/g, ' ').split(/[^\p{L}\p{N}]+/u).filter((w) => w && !/^(of|the|a|an|and|for|to|in|on)$/i.test(w));
  const num = words.slice(1).find((w) => /^\d+$/.test(w));
  const letters = ((words[0]?.[0] ?? '?') + (num ?? words[1]?.[0] ?? '')).toUpperCase();
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) % 360;
  const img = cover ? `<img class="cv" src="${esc(cover)}" alt="" loading="lazy" decoding="async">` : '';
  return `<span class="mono${cover ? ' has-cover' : ''}" style="--h:${h}" aria-hidden="true">${esc(letters)}${img}</span>`;
}
const compact = new Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 });
/** The text with every searched word marked (both already lower-cased words; the text is escaped). */
function highlight(text: string, words: string[]): string {
  const ws = words.filter(Boolean).map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (!ws.length) return esc(text);
  return text.split(new RegExp(`(${ws.join('|')})`, 'gi')).map((part, i) => (i % 2 ? `<mark>${esc(part)}</mark>` : esc(part))).join('');
}
const click = (sel: string) => () => ($(sel) as HTMLElement).click();
function commandList(): OpenEntry[] {
  const c = (title: string, keys: string, keywords: string, run: () => void, sub?: string): OpenEntry => ({ group: 'Actions', title, keys, keywords, run, sub, icon: OI.command });
  const list: OpenEntry[] = [
    c('Format document', 'Shift+Alt+F', 'format indent pretty beautify prettier whitespace tidy', formatDocument, 'Indentation and spacing only: no line moves, no code changes'),
    c('Fix problems automatically', '', 'fix all repair autofix', click('#fix-all'), 'Every safe automatic fix, with a before/after to review'),
    c('Try it: simulate the handler', 'Ctrl+Enter', 'run play simulate try', () => selectTab('simulate')),
    c('Test all combinations', '', 'matrix players monitors keyboards test all', () => { selectTab('simulate'); click('#sim-all')(); }),
    c('Check: show the problems', '', 'problems lint errors warnings check', () => selectTab('problems')),
    c('Go to the next problem', 'F8', 'next problem error warning', () => stepProblem(1)),
    c('Go to the previous problem', 'Shift+F8', 'previous problem error warning', () => stepProblem(-1)),
    c('Go to line…', 'Ctrl+G', 'line jump goto', () => { editor.focus(); editor.execCommand('jumpToLine'); }),
    c('Show or hide Lines', 'Ctrl+B', 'lines list names insert sidebar', () => lines.toggle(), 'Every option, Context member and enum, click to insert'),
    c('Search the handler API', '', 'api docs reference search', () => { selectTab('api'); ($('#api-q') as HTMLInputElement).focus(); }),
    c('Open examples and Hub handlers', 'Ctrl+P', 'open examples hub templates switch', () => setTimeout(() => showOpen(), 0)),
    c('Open a file…', '', 'open upload import file zip nc', click('#file-open')),
    c('New handler…', '', 'new create template', () => newDialog.showModal()),
    c('Copy the handler', '', 'copy clipboard code', () => copyCode()),
    c('Copy a link to this handler', '', 'share link url copy', click('[data-code=link]')),
    c('Download for Nucleus (.zip)', 'Ctrl+S', 'save download zip nc package nucleus', click('[data-code=zip]')),
    c('Download the code (.js)', '', 'save download js file', click('[data-code=js]')),
    c('Theme: light', '', 'theme light colour color appearance', () => setThemeMode('light')),
    c('Theme: dark', '', 'theme dark colour color appearance', () => setThemeMode('dark')),
    c('Theme: follow the system', '', 'theme auto system colour color appearance', () => setThemeMode('auto')),
    c('Settings', 'Ctrl+,', 'settings preferences options font size wrap', () => settings.open()),
    c('Theme: pick a look or code colours', '', 'theme look style colours colors code syntax mac alpha v3 custom', () => settings.open('theme')),
    c('Turn Advanced mode on or off', '', 'advanced mode rule details probes', click('#advanced')),
    c('Turn tips on or off', '', 'tips hints help', () => tips.toggle()),
    c('Reset panel sizes', '', 'layout resize panels reset width', () => panels.reset()),
    c("What's new", '', 'changelog changes news updates release notes', () => news.open()),
    c('Keyboard shortcuts', '?', 'help keys shortcuts keybindings', () => helpDialog.showModal()),
    c('About these tools (start page)', '', 'start page about install vscode extension download home site', () => ((document.querySelector('a.start-link') as HTMLAnchorElement).click())),
    c('Show or hide the dev bar', 'Ctrl+Alt+D', 'dev developer contrast colour', () => devBar.toggle()),
  ];
  if (packageFiles.length) list.splice(16, 0, c("Show the package's files", '', 'package files folder zip nc', openFilesDialog));
  if (!aiBtn.hidden) list.splice(2, 0, c('Fix with AI', '', 'ai claude fix', click('#ai-fix')));
  return list;
}
// Settings › Theme, from the palette.
function setThemeMode(m: 'light' | 'dark' | 'auto') {
  try {
    if (m === 'auto') localStorage.removeItem('nucleus-workbench-dev-mode');
    else localStorage.setItem('nucleus-workbench-dev-mode', m);
  } catch {}
  applyTheme();
}

/** Format document: indentation and spacing (core/format.ts guarantees the tokens don't change). */
function formatDocument() {
  const text = editor.getValue();
  const r = formatHandler(text);
  if (!r.ok) return notice(r.reason, { kind: 'error' });
  if (!r.changed) return codeNote(editor, editor.getCursor().line, 'Already formatted.');
  const cur = editor.getCursor();
  const top = editor.getScrollInfo().top;
  const d = editor.getDoc();
  d.replaceRange(r.code, d.posFromIndex(0), d.posFromIndex(text.length), '+format');
  editor.setCursor({ line: Math.min(cur.line, editor.lineCount() - 1), ch: cur.ch });
  editor.scrollTo(null, top);
  codeNote(editor, editor.getCursor().line, 'Formatted: indentation and spacing.', { action: undoAction });
}

const hubLint = new Map<number, string>();
function hubLintBadges(i: number): string {
  let html = hubLint.get(i);
  if (html === undefined) {
    const h = HUB_EXAMPLES.handlers[i];
    const d = h.lint ? undefined : lint(h.source ?? '');
    const e = h.lint ? h.lint.errors : d!.filter((x) => x.severity === 'error').length;
    const w = h.lint ? h.lint.warnings : d!.filter((x) => x.severity === 'warning').length;
    const pill = (kind: 'error' | 'warning' | 'ok', text: string, tip: string) => `<span class="chip ${kind}" title="${tip}">${svgIcon(OI[kind], 'ci')}${text}</span>`;
    html = e
      ? pill('error', `${e} error${e === 1 ? '' : 's'}`, `Check finds ${e} error${e === 1 ? '' : 's'} in this handler: Nucleus may stop on ${e === 1 ? 'it' : 'them'}.`)
      : w
        ? pill('warning', `${w} warning${w === 1 ? '' : 's'}`, `Check finds no errors, and ${w} warning${w === 1 ? '' : 's'} worth a look.`)
        : pill('ok', 'clean', 'Check finds no errors or warnings in this handler.');
    hubLint.set(i, html);
  }
  return html;
}

const outcomeRank = (j: string) => (j === 'LOAD-FAIL' ? 0 : j === 'PLAY-FAIL' ? 1 : 2);
function entries(): OpenEntry[] {
  const jintLabel: Record<string, string> = { OK: 'runs', LOADED: 'loads', 'LOAD-FAIL': "doesn't load", 'PLAY-FAIL': 'Game.Play throws' };
  const list: OpenEntry[] = [
    { group: 'Start', icon: OI.folder, title: 'Open a file…', sub: 'A handler .js, .zip or .nc from your device.', keywords: 'upload import file computer phone device', run: () => ($('#file-input') as HTMLInputElement).click() },
    { group: 'Start', icon: OI.plus, title: 'New handler…', sub: 'Game name, executable and features; generates a handler that passes the linter.', keywords: 'create template', run: () => newDialog.showModal() },
    ...EXAMPLE_PACKAGES.map((e) => ({ group: 'Start', icon: OI.box, title: e.title, sub: e.sub, keywords: 'example package zip nc files folder', run: () => openExamplePackage(e.id) })),
    { group: 'Start', icon: OI.bug, title: 'Handler with common mistakes', sub: 'The mistakes Nucleus trips over most; most fix themselves in one click.', keywords: 'example buggy sample', run: () => loadSource(BUGGY, { name: 'Handler with common mistakes', kind: 'example', hash: 'example-mistakes' }) },
    ...BOT_TEMPLATES.templates.map((t) => ({
      group: 'Engine templates',
      title: t.name,
      mono: t.name,
      sub: t.id === 'generic' ? 'A starting point for any game.' : `A starting point for ${t.name} games.`,
      keywords: `template engine ${t.id}`,
      run: () => openTemplate(t.id),
    })),
    // Commands: Ctrl+Shift+P or F1 (or ">" in the search), as in VS Code.
    ...commandList(),
    ...HUB_EXAMPLES.handlers.map((h, i) => ({
      group: 'Hub handlers',
      title: h.title,
      mono: h.game || h.title,
      cover: h.cover,
      sub: `${h.game && !h.title.toLowerCase().startsWith(h.game.toLowerCase().slice(0, 12)) ? `${h.game} · ` : ''}by ${h.owner} · v${h.version}`,
      meta: `${h.maxPlayers ? `<span class="m" title="Up to ${h.maxPlayers} players">${svgIcon(OI.players, 'mi')}${h.maxPlayers}<span class="sr-only"> players</span></span>` : ''}${h.multiKbm ? `<span class="m" title="Multiple keyboards and mice">${svgIcon(OI.keyboard, 'mi')}<span class="sr-only">multiple keyboards and mice</span></span>` : ''}<span class="m" title="${h.downloads.toLocaleString()} downloads">${svgIcon(OI.downloads, 'mi')}${compact.format(h.downloads)}<span class="sr-only"> downloads</span></span>`,
      keywords: `${h.game} ${h.owner} hub${h.unverified ? ' unverified' : ''}`,
      badges: h.unverified ? '<span class="chip warning" title="The Hub hasn\'t verified this version yet">not verified</span>' : undefined,
      lint: () => hubLintBadges(i),
      run: () => openHub(i),
    })),
    ...(mode === 'dev' ? PROBES : []).map((p, i) => ({ p, i }))
      .sort((a, b) => outcomeRank(a.p.jint) - outcomeRank(b.p.jint) || a.i - b.i)
      .map(({ p, i }) => ({
      group: `Engine probes: ${p.jint === 'LOAD-FAIL' ? "doesn't load" : p.jint === 'PLAY-FAIL' ? 'Game.Play throws' : 'works'}`,
      title: probeTitle(p.name),
      icon: OI.flask,
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
  const raw = ($('#open-q') as HTMLInputElement).value;
  // ">" first: commands only, as in VS Code's Ctrl+Shift+P.
  const commandMode = raw.trimStart().startsWith('>');
  const q = (commandMode ? raw.trimStart().slice(1) : raw).trim().toLowerCase();
  const all = commandMode ? commandList() : entries();
  ($('#open-q') as HTMLInputElement).placeholder = commandMode ? 'Type a command: format, fix, try it, theme…' : 'Search examples, Hub handlers, engine probes and actions (> for commands)';
  let shown: OpenEntry[];
  if (commandMode && !q) shown = all;
  else if (q) {
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
    body.innerHTML = `<p class="empty masc-empty">${mascot('n-scan', { size: 72 })}<span>Nothing matches "${esc(q)}". Try a game name, an author, or words like "template", "mutex" or "arrow".</span></p>`;
    return;
  }
  const taken = HUB_EXAMPLES.takenAt ? new Date(HUB_EXAMPLES.takenAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';
  const groupNote: Record<string, string> = {
    'Hub handlers': HUB_EXAMPLES.all ? `Every handler on the Hub, most downloaded first, as of ${esc(taken)}` : `The most downloaded, current version verified, as of ${esc(taken)}`,
    'Engine templates': 'The same templates the SplitScreen.Me Discord bot sends with /create',
  };
  // Searching: results grouped by kind (the best match's group first), each group with a count.
  if (q && !commandMode) {
    const order: string[] = [];
    for (const e of shown) if (!order.includes(e.group)) order.push(e.group);
    shown = order.flatMap((g) => shown.filter((e) => e.group === g));
    shownEntries = shown;
  }
  const words = q.split(/\s+/).filter(Boolean);
  const label = (g: string) => (g === 'Actions' ? 'Commands' : g);
  const counts = new Map<string, number>();
  for (const e of shown) counts.set(e.group, (counts.get(e.group) ?? 0) + 1);
  // Browsing: Start as tiles, templates as chips, the rest as rows. Searching: rows only.
  const layout = (g: string) => (q || commandMode ? 'rows' : g === 'Start' ? 'tiles' : g === 'Engine templates' ? 'chips' : 'rows');
  let html = '';
  let lastGroup = '';
  shown.forEach((e, i) => {
    const group = commandMode ? 'Commands' : label(e.group);
    if (group !== lastGroup) {
      if (lastGroup) html += '</div></section>';
      const n = commandMode ? shown.length : counts.get(e.group)!;
      const note = q || commandMode ? '' : groupNote[group] ?? '';
      html += `<section class="group"><div class="group-title"><span>${esc(group)}</span>${q || commandMode || n > 6 ? `<span class="count">${n}</span>` : ''}${note ? `<small>${note}</small>` : ''}</div><div class="entries ${layout(e.group)}${e.group.startsWith('Hub') && !q ? ' two' : ''}" role="group" aria-label="${esc(group)}">`;
      lastGroup = group;
    }
    const lay = layout(e.group);
    const art = e.mono ? monogram(e.mono, e.cover) : e.icon ? `<span class="ic" aria-hidden="true">${svgIcon(e.icon)}</span>` : '';
    const keys = e.keys ? `<span class="keys">${e.keys.split('+').map((k) => `<kbd>${esc(k)}</kbd>`).join('')}</span>` : '';
    const sub = e.sub ? (lay === 'chips' ? `<span class="sr-only">${esc(e.sub)}</span>` : `<span class="s">${highlight(e.sub, words)}</span>`) : '';
    // Rows get an "Open" (or "Run") that slides in under the pointer, as in BSManager's lists.
    const go = lay === 'rows' ? `<span class="go" aria-hidden="true">${e.group === 'Actions' || commandMode ? 'Run' : 'Open'}<svg viewBox="0 0 24 24"><path d="M5 12h13m-5-5 5 5-5 5"/></svg></span>` : '';
    const side = e.meta || e.badges || e.lint || keys || go ? `<span class="meta">${e.meta ?? ''}${e.badges ?? ''}${e.lint ? `<span data-lint="${i}"></span>` : ''}${keys}${go}</span>` : '';
    html += `<button class="entry${i === activeEntry ? ' active' : ''}" type="button" role="option" data-e="${i}"${i < 24 ? ` style="--i:${i}"` : ''} aria-selected="${i === activeEntry}"${lay === 'chips' && e.sub ? ` title="${esc(e.sub)}"` : ''}>${art}<span class="main"><span class="t">${highlight(e.title, words)}</span>${sub}</span>${side}</button>`;
  });
  html += '</div></section>';
  body.innerHTML = html;
  body.querySelectorAll<HTMLButtonElement>('.entry').forEach((b) => b.addEventListener('click', () => runEntry(Number(b.dataset.e))));
  // A cover that doesn't load leaves the initials under it.
  body.querySelectorAll<HTMLImageElement>('img.cv').forEach((img) => img.addEventListener('error', () => (img.parentElement?.classList.remove('has-cover'), img.remove())));
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
function setActive(i: number) {
  if (!shownEntries.length) return;
  activeEntry = (i + shownEntries.length) % shownEntries.length;
  document.querySelectorAll('#open-body .entry').forEach((el, i) => {
    el.classList.toggle('active', i === activeEntry);
    el.setAttribute('aria-selected', String(i === activeEntry));
  });
  document.querySelector('#open-body .entry.active')?.scrollIntoView({ block: 'nearest' });
}
/** ↑ ↓ move to the nearest entry in the row above or below, whatever the layout (tiles, chips, two columns). */
function moveVertical(dir: 1 | -1) {
  const els = [...document.querySelectorAll<HTMLElement>('#open-body .entry')];
  const cur = els[activeEntry];
  if (!cur) return;
  const r = cur.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cands = els.map((el, i) => ({ i, b: el.getBoundingClientRect() })).filter(({ b }) => (dir > 0 ? b.top >= r.bottom - 1 : b.bottom <= r.top + 1));
  if (!cands.length) return setActive(dir > 0 ? 0 : els.length - 1);
  const rowTop = dir > 0 ? Math.min(...cands.map((c) => c.b.top)) : Math.max(...cands.map((c) => c.b.top));
  const row = cands.filter((c) => Math.abs(c.b.top - rowTop) < 4);
  row.sort((a, b) => Math.abs(a.b.left + a.b.width / 2 - cx) - Math.abs(b.b.left + b.b.width / 2 - cx));
  setActive(row[0].i);
}
function showOpen(mode: 'open' | 'commands' = 'open') {
  ($('#open-q') as HTMLInputElement).value = mode === 'commands' ? '>' : '';
  activeEntry = 0;
  renderOpen();
  // The first rows arrive one after another, only as the dialog opens (not while typing).
  const body = $('#open-body');
  body.classList.add('stagger');
  setTimeout(() => body.classList.remove('stagger'), 800);
  openDialog.showModal();
  // On touch screens, don't pop up the keyboard: most people browse the list. Tap the search to type.
  if (!(window.matchMedia('(pointer: coarse)').matches || (navigator.maxTouchPoints > 0 && narrow()))) ($('#open-q') as HTMLInputElement).focus();
  else (openDialog.querySelector('#open-body') as HTMLElement).scrollTop = 0;
}
$('#doc-switch').addEventListener('click', () => showOpen());
$('#open-close').addEventListener('click', () => openDialog.close());
$('#open-q').addEventListener('input', () => {
  activeEntry = 0;
  renderOpen();
});
$('#open-q').addEventListener('keydown', (e: KeyboardEvent) => {
  const browsing = !($('#open-q') as HTMLInputElement).value.trim(); // ← → move the caret while typing
  if (e.key === 'ArrowDown') { e.preventDefault(); moveVertical(1); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); moveVertical(-1); }
  else if (e.key === 'ArrowRight' && browsing) { e.preventDefault(); setActive(activeEntry + 1); }
  else if (e.key === 'ArrowLeft' && browsing) { e.preventDefault(); setActive(activeEntry - 1); }
  else if (e.key === 'Home' && browsing) { e.preventDefault(); setActive(0); }
  else if (e.key === 'End' && browsing) { e.preventDefault(); setActive(shownEntries.length - 1); }
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
  notice('Created. It passes Check; next, try it per player or adjust the options.', { kind: 'success', mascot: 'n-ok', action: { label: 'Try it', run: () => selectTab('simulate') } });
});
$('#new-open').addEventListener('click', () => newDialog.showModal());
$('#new-cancel').addEventListener('click', () => newDialog.close());

// ---------------------------------------------------------------------------
// Copy, toast, help, tabs, shortcuts

// Copy the code (from Save or copy, or the command palette): confirmed on the button next to the code.
async function copyCode() {
  try {
    await navigator.clipboard.writeText(editor.getValue());
    confirmOn($('#code-menu-open'), 'Copied ✓', `Copied ${editor.lineCount()} lines.`);
  } catch {
    editor.execCommand('selectAll');
    editor.focus();
    notice('The browser didn\'t let this page copy. The whole handler is selected: press Ctrl+C.', { kind: 'info' });
  }
}

const devBar = initDevBar({
  build: `core ${BUILD.core} · Nucleus ${String(BUILD.nucleus ?? '?').slice(0, 7)} · Jint ${BUILD.jint ?? '?'}`,
  toast: (t) => toast(t),
});

// Toasts: src/toast.ts (stacked, closeable, Undo where it helps).
const toast = (text: string, opts?: ToastOptions) => showToast(text, opts);
initToasts();
const undoAction = { label: 'Undo', run: () => editor.undo() };

$('#help-open').addEventListener('click', () => helpDialog.showModal());
$('#help-open-2').addEventListener('click', () => helpDialog.showModal());
$('#help-close').addEventListener('click', () => helpDialog.close());

const TAB_KEY = 'nucleus-workbench-tab';
function selectTab(id: string) {
  document.querySelectorAll<HTMLButtonElement>('.pane-head [role=tab]').forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === id)));
  requestAnimationFrame(placeInk);
  document.querySelectorAll<HTMLElement>('[role=tabpanel][id^=panel-]').forEach((p) => (p.hidden = p.id !== `panel-${id}`));
  if (id === 'simulate') runSim();
  if (id === 'simulate' || id === 'api') document.dispatchEvent(new CustomEvent('wakatime-activity', { detail: id === 'simulate' ? 'running tests' : 'researching' }));
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
document.querySelectorAll<HTMLButtonElement>('.pane-head [role=tab]').forEach((t) => t.addEventListener('click', () => selectTab(t.dataset.tab!)));

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
  // Hovering a name in Lines while Reference is the open tab (and its search is empty) shows the
  // name's docs there. Suggested by messenils.
  previewReference: (path) => {
    if (window.matchMedia('(max-width: 860px)').matches || ($('#panel-api') as HTMLElement).hidden) return false;
    if (($('#api-q') as HTMLInputElement).value.trim()) return false;
    renderApi(path);
    return true;
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
  targets: {
    lines: () => $('#lines-toggle'),
    new: () => $('#new-open'),
    examples: () => $('#doc-switch'),
    tryit: () => document.querySelector<HTMLElement>('[role=tab][data-tab=simulate]'),
    share: () => $('#code-menu-open'),
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
$('#set-reset-sizes').addEventListener('click', () => (panels.reset(), confirmOn($('#set-reset-sizes'), 'Back to defaults ✓', 'Panel sizes are back to their defaults.')));
const moreDialog = $('#more-dialog') as HTMLDialogElement;
$('#more-open').addEventListener('click', () => moreDialog.showModal());
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
  // As in VS Code: Ctrl+Shift+P and F1 open the command palette (">"), Ctrl+P (and Ctrl+K here) the
  // examples and Hub handlers. Pressed again, the same key closes it.
  const commands = (mod && e.shiftKey && e.key.toLowerCase() === 'p') || e.key === 'F1';
  if (commands || (mod && !e.shiftKey && (e.key.toLowerCase() === 'k' || e.key.toLowerCase() === 'p'))) {
    e.preventDefault();
    const inCommands = ($('#open-q') as HTMLInputElement).value.trimStart().startsWith('>');
    if (openDialog.open && inCommands === commands) openDialog.close();
    else showOpen(commands ? 'commands' : 'open');
  } else if (mod && e.key.toLowerCase() === 's') {
    e.preventDefault(); // instead of the browser saving the page
    const save = $('#save') as HTMLButtonElement;
    if (save.hidden) ($('#code-menu-open') as HTMLButtonElement).click();
    else save.click();
  } else if (mod && !e.shiftKey && e.key.toLowerCase() === 'b') {
    e.preventDefault(); // VS Code: toggle the side bar; here, the Lines list
    lines.toggle();
  } else if (mod && e.key === ',') {
    e.preventDefault();
    settings.open();
  } else if (mod && !e.shiftKey && e.key === 'Enter') {
    e.preventDefault();
    selectTab('simulate');
  } else if (e.altKey && e.shiftKey && e.code === 'KeyF') {
    e.preventDefault(); // VS Code: Format Document
    formatDocument();
  } else if (e.key === 'F8') {
    e.preventDefault();
    stepProblem(e.shiftKey ? -1 : 1);
  } else if (e.key === '?' && !(e.target as HTMLElement).closest('.CodeMirror, input, textarea, select')) {
    e.preventDefault();
    helpDialog.showModal();
  }
});

// The common shortcuts, on hover or keyboard focus of the buttons they belong to (both modes).
initKeyHints([
  { el: document.getElementById('doc-switch'), what: 'Open an example or a Hub handler', keys: 'Ctrl K' },
  { el: document.getElementById('lines-toggle'), what: 'Show or hide Lines', keys: 'Ctrl B' },
  { el: document.getElementById('code-menu-open'), what: 'Save or copy', keys: 'Ctrl S' },
  { el: document.getElementById('save'), what: 'Save or copy', keys: 'Ctrl S' },
  { el: document.querySelector<HTMLElement>('[role=tab][data-tab=simulate]'), what: 'Try it', keys: 'Ctrl Enter' },
  { el: document.getElementById('settings-open'), what: 'Settings', keys: 'Ctrl ,' },
  { el: document.getElementById('help-open'), what: 'All keyboard shortcuts', keys: '?' },
]);

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
  const before = counts(base, lintCtx());
  aiCtl = new AbortController();
  aiBtn.disabled = true;
  aiBox.hidden = false;
  // Nucli reads the code while Claude works on it (a spinner when mascots are off).
  aiBox.innerHTML = `<div class="ai-status">${mascotsOn() ? mascot('n-scan', { size: 56, busy: true, className: 'ai-masc' }) : '<span class="spinner" aria-hidden="true"></span>'}<span class="ai-status-text">Asking Claude…</span><button class="btn" id="ai-stop" type="button">Stop</button></div>`;
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
  const before = counts(base, lintCtx());
  const r = fixAll(base, lintCtx());
  aiBox.hidden = false;
  boxShows = null;
  if (r.code === base) {
    aiBox.innerHTML = `<p>Nothing can be fixed automatically. ${before.errors + before.warnings ? 'The remaining problems need your decision; see their quick fixes below' + (sample ? ', or try Fix with AI' : '') + '.' : ''}</p>`;
    return;
  }
  const changes = [...new Set(r.applied.map((a) => `${a.title} (line ${a.line})`))];
  showProposal(base, r.code, changes, before, 'Fix all');
});

// The fix box shows a before/after of one version of the handler: once the code moves on (you keep
// typing), it would be stale, so it closes and the list below is what counts.
let boxShows: string | null = null;
editor.on('change', (_cm: unknown, ch: { origin?: string }) => {
  if (boxShows === null || ch.origin === '+ai-fix' || ch.origin === 'undo') return;
  if (!aiBox.hidden && editor.getValue() !== boxShows) aiBox.hidden = true;
  boxShows = null;
});

function applyCode(code: string) {
  const doc = editor.getDoc();
  fixWithNucli(editor, code, () => doc.replaceRange(code, doc.posFromIndex(0), doc.posFromIndex(doc.getValue().length), '+ai-fix'));
}

function showProposal(base: string, code: string, changes: string[], before: { errors: number; warnings: number }, source: 'AI' | 'Fix all' = 'AI') {
  const after = counts(code, lintCtx());
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

  const introduced = newProblems(base, code, lintCtx());
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
    <div class="ai-actions">${
      state === 'applied'
        ? '<button class="btn" id="ai-undo" type="button">Undo</button><button class="btn" id="ai-close" type="button">Close</button>'
        : '<button class="btn primary" id="ai-accept" type="button">Accept</button><button class="btn" id="ai-reject" type="button">Reject</button>'
    }</div>
    <div class="diff-wrap" tabindex="0" role="region" aria-label="The changes, line by line"><table class="diff"><tbody>${rows}</tbody></table></div>`;

  const showApplied = () => {
    aiBox.innerHTML = body('applied');
    boxShows = code;
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
  boxShows = editor.getValue();
  aiBox.scrollIntoView({ block: 'nearest' });
  $('#ai-accept').addEventListener('click', () => {
    applyCode(code);
    showApplied();
    $('#ai-undo').focus(); // keep the keyboard where the result is
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

async function openFile(file: File) {
  try {
    if (/\.(zip|nc)$/i.test(file.name)) {
      const pkg = await readPackage(await file.arrayBuffer());
      if (!pkg) {
        notice(`${file.name} doesn't contain a handler.js this page can read.`, { kind: 'error' });
        return;
      }
      loadSource(pkg.handler.replace(/^﻿/, '').replace(/\r\n/g, '\n'), { name: file.name.replace(/\.(zip|nc)$/i, '.js'), kind: 'draft' });
      // The package's other files: kept, and saved with the handler.
      setPackageFiles(pkg.files);
      const kept = storeFiles(pkg.files);
      const n = pkg.files.length;
      const lost = pkg.unreadable.length ? ` This browser couldn't unpack ${pkg.unreadable.join(', ')}, so saving won't include ${pkg.unreadable.length === 1 ? 'it' : 'them'}.` : '';
      // The "+ N files" chip shows the files; only what needs saying goes in a notice.
      if (!kept || lost) notice(`${kept ? '' : `The ${n} other file${n === 1 ? '' : 's'} are too big to keep after a reload: save before closing the page.`}${lost}`.trim(), { kind: 'warning' });
      return;
    }
    const text = await file.text();
    loadSource(text.replace(/^﻿/, '').replace(/\r\n/g, '\n'), { name: file.name, kind: 'draft' });
  } catch {
    notice(`Couldn't read ${file.name}.`, { kind: 'error' });
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
        a.href = URL.createObjectURL(new Blob([data as BlobPart], { type: filename.endsWith('.js') ? 'text/javascript' : 'application/zip' }));
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
const handlerFileName = () => {
  const m = editor.getValue().match(/^Game\.GameName\s*=\s*"([^"]*)"/m);
  const name = (m?.[1] || doc.name.replace(/\.js$/i, '') || 'handler').replace(/[\\/:*?"<>|]/g, '').trim() || 'handler';
  return name;
};
// "Save for Nucleus" in the header opens the same Save or copy dialog as the button next to the code.
$('#save').addEventListener('click', () => openCodeDialog());

// ---------------------------------------------------------------------------
// Start-up: #links, first-visit welcome, last tab

function openFromHash(): boolean {
  const h = decodeURIComponent(location.hash.slice(1));
  if (!h) return false;
  if (h.startsWith(SHARE_PREFIX)) {
    decodeShare(h)
      .then((src) => {
        loadSource(src, { name: 'Shared handler', kind: 'example', hash: h });
        if (narrow()) setView('code'); // after the async load, which shows the results
      })
      .catch(() => notice('This share link is damaged or incomplete. Ask for it again, or for the file.', { kind: 'error' }));
    return true;
  }
  if (h === 'whats-new') {
    // The link in the Discord update post: the workbench, with What's new open.
    news.open();
    try {
      history.replaceState(null, '', location.pathname + location.search);
    } catch {
      /* ignore */
    }
    return false;
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
  } else if (h.startsWith('package-') && EXAMPLE_PACKAGES.some((e) => e.id === h.slice(8))) {
    return openExamplePackage(h.slice(8)), true;
  } else if (h === 'example-mistakes') {
    return loadSource(BUGGY, { name: 'Handler with common mistakes', kind: 'example', hash: h }), true;
  } else if (h.startsWith('template-')) {
    const t = BOT_TEMPLATES.templates.find((x) => slug(x.id) === slug(h.slice('template-'.length)));
    if (t) return openTemplate(t.id), true;
  }
  notice(`The link "#${h}" doesn't match an example or Hub handler in this version of the workbench.`, { kind: 'error' });
  return false;
}
// A link shares code: on phones, show the handler, not the results.
window.addEventListener('hashchange', () => {
  clearNotice(); // a notice about the previous link no longer applies
  if (location.hash.slice(1) !== doc.hash && openFromHash() && narrow()) setView('code');
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
  w.querySelector('[data-w=open]')!.addEventListener('click', () => showOpen());
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
} else if (narrow()) setView('code');
initTouchTitles();

// The phone's own "Select all" selects the whole editable area. CodeMirror then redraws that same
// selection in its own form, and the phone takes the redraw as a new selection by the page and
// closes its Copy / Cut / Select all menu. When everything is selected already, leave the
// phone's selection alone.
{
  const input: any = (editor as any).display?.input;
  if (input?.showPrimarySelection) {
    const draw = input.showPrimarySelection.bind(input);
    input.showPrimarySelection = () => {
      const dom = window.getSelection();
      const lines = (editor as any).display.lineDiv as HTMLElement;
      const r = editor.listSelections();
      const all = r.length === 1 && editor.indexFromPos(r[0].from()) === 0 && editor.indexFromPos(r[0].to()) === editor.getValue().length && editor.getValue().length > 0;
      if (all && dom && !dom.isCollapsed && lines.contains(dom.anchorNode) && lines.contains(dom.focusNode)) return;
      return draw();
    };
  }
}
// Any dialog: a tap or click outside it (on the dimmed backdrop) closes it.
document.querySelectorAll('dialog').forEach((dl) =>
  dl.addEventListener('click', (e: MouseEvent) => {
    if (e.target !== dl || !e.clientX) return;
    const r = dl.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dl.close();
  }),
);

// Copy or download, next to the code: copy, a link, and the handler as .zip (with the install
// steps), .js or .nc.
const codeDialog = $('#code-dialog') as HTMLDialogElement;
function openCodeDialog() {
  const name = handlerFileName();
  $('#code-main').hidden = false;
  $('#code-done').hidden = true;
  codeDialog.querySelectorAll<HTMLButtonElement>('.dl').forEach((b) => (b.hidden = !downloads));
  (codeDialog.querySelector('[data-code=link]') as HTMLButtonElement).hidden = !(doc.hash || canShare());
  const withFiles = packageFiles.length ? `, with ${packageFiles.length} other file${packageFiles.length === 1 ? '' : 's'}` : '';
  $('#code-zip-sub').textContent = `${name}.zip${withFiles}: drag it onto Extract handler`;
  $('#code-js-sub').textContent = packageFiles.length ? 'The code only, without the other files' : 'For the handlers folder or your editor';
  codeDialog.showModal();
}
$('#code-menu-open').addEventListener('click', openCodeDialog);
$('#code-close').addEventListener('click', () => codeDialog.close());
codeDialog.querySelectorAll<HTMLButtonElement>('[data-code]').forEach((b) =>
  b.addEventListener('click', async () => {
    const kind = b.dataset.code;
    if (kind === 'copy') return (codeDialog.close(), copyCode());
    if (kind === 'link') return (codeDialog.close(), copyLink($('#code-menu-open')));
    const name = handlerFileName();
    const filename = `${name}.${kind}`;
    try {
      const data = kind === 'js' ? new TextEncoder().encode(editor.getValue()) : buildPackage(editor.getValue(), packageFiles);
      await downloads.save({ filename, data });
      waka.saved();
      if (kind !== 'zip') return (codeDialog.close(), confirmOn($('#code-menu-open'), 'Saved ✓', `Saved ${filename}.`));
      // The .zip: what to do next, in the same dialog.
      const errorsLeft = current.filter((d) => d.severity === 'error').length;
      $('#code-saved').textContent = `Saved ${filename}`;
      $('#code-warn').hidden = !errorsLeft;
      $('#code-warn').textContent = errorsLeft ? `It still has ${errorsLeft} error${errorsLeft === 1 ? '' : 's'}, so Nucleus may not load it. Check lists them.` : '';
      $('#code-js-name').textContent = `${name}.js`;
      $('#code-main').hidden = true;
      $('#code-done').hidden = false;
      $('#code-close').focus();
    } catch (e: any) {
      codeDialog.close();
      if (e?.code === 'declined') return;
      if (['unavailable', 'not_granted', 'capability_disabled', 'capability_removed'].includes(e?.code)) $('#save').hidden = true;
      notice("Couldn't save the file here. Use Copy the code instead and paste it into a .js file.", { kind: 'error' });
    }
  }),
);
initSheetDrag();

// Optional WakaTime (Settings › Advanced): off until an API key is added.
const waka = initWakaTime({
  editor,
  fileName: () => (/\.js$/i.test(doc.name) ? doc.name : `${handlerFileName()}.js`),
  project: () => editor.getValue().match(/^\s*Game\.GameName\s*=\s*"([^"]*)"/m)?.[1] || 'Nucleus handler',
  version: BUILD.bench ?? 'dev',
});
{
  const on = $('#set-waka') as HTMLInputElement;
  const key = $('#set-waka-key') as HTMLInputElement;
  const url = $('#set-waka-url') as HTMLInputElement;
  const machine = $('#set-waka-machine') as HTMLInputElement;
  const fields = $('#set-waka-fields');
  const status = $('#set-waka-status');
  const sync = () => {
    const c = waka.get();
    on.checked = c.on;
    key.value = c.key;
    url.value = c.url;
    machine.value = c.machine;
    machine.placeholder = waka.defaultMachine();
    fields.hidden = !c.on;
    status.textContent = waka.status();
  };
  sync();
  on.addEventListener('change', () => (waka.set({ on: on.checked }), sync()));
  key.addEventListener('change', () => waka.set({ key: key.value.trim() }));
  url.addEventListener('change', () => waka.set({ url: url.value.trim() }));
  machine.addEventListener('change', () => waka.set({ machine: machine.value.trim() }));
  $('#set-waka-test').addEventListener('click', async () => {
    waka.set({ key: key.value.trim(), url: url.value.trim(), machine: machine.value.trim() });
    status.innerHTML = `${mascot('n-spin', { size: 22, busy: true })} Sending…`;
    status.textContent = await waka.test();
  });
  document.addEventListener('open-settings', sync);
  document.addEventListener('wakatime-activity', (e) => waka.activity((e as CustomEvent).detail));
  $('#settings-open').addEventListener('click', sync);
}

// The tab marker that glides between the results tabs (BSManager's nav bar does the same).
function placeInk() {
  const list = document.querySelector<HTMLElement>('.pane-head[role=tablist]');
  const tab = list?.querySelector<HTMLElement>('[role=tab][aria-selected=true]');
  if (!list || !tab) return;
  let ink = list.querySelector<HTMLElement>('.tab-ink');
  if (!ink) {
    ink = document.createElement('span');
    ink.className = 'tab-ink';
    ink.setAttribute('aria-hidden', 'true');
    list.append(ink);
    list.classList.add('has-ink');
  }
  const a = tab.getBoundingClientRect();
  const b = list.getBoundingClientRect();
  ink.style.width = `${a.width}px`;
  ink.style.transform = `translateX(${a.left - b.left}px)`;
}
window.addEventListener('resize', () => requestAnimationFrame(placeInk));
requestAnimationFrame(placeInk);
// The logo is home: the start of the Open dialog (new handler, open a file, examples). A middle click
// or Ctrl+click still opens the workbench fresh in a new tab.
document.querySelector<HTMLAnchorElement>('a.brand')?.addEventListener('click', (e) => {
  if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  showOpen();
});
// "About these tools" opens the start page. The single file (a release download, the Claude artifact)
// links to the live site's; where a start page is served next to it (the artifact, a copy of the
// site), it opens that one, so a preview stays a preview.
{
  const start = document.querySelector<HTMLAnchorElement>('a.start-link');
  if (start && /^https?:/.test(location.protocol) && /^https:/.test(start.getAttribute('href') ?? '')) {
    fetch('start/', { method: 'HEAD', cache: 'no-store' })
      .then((r) => {
        if (r.ok && (r.headers.get('content-type') ?? '').includes('html')) start.href = 'start/';
      })
      .catch(() => {});
  }
}
