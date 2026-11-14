import { RULE_DOCS, ruleUrl } from '@core/ruledocs';
import { inProblemList } from './checklist';
import { initKeySettings } from './kbsettings';
import { openFind } from './findwidget';
import { hasCredit, withCredit, withoutCredit } from './credit';
import { definitionAt } from '@core/definition';
import { JS_RULES } from '@core/jsrules';
import { applyTheme, initDevBar } from './devbar';
import { applyCodeTheme, applyCustomTheme } from './customtheme';
import { watchPictures } from './themed';
import { announce, clearNotice, confirmOn, initToasts, notice, toast as showToast, type ToastOptions } from './toast';
import { decodeShare, DISCORD_LIMIT, encodeShare, isNamedLink, shareAdvice, shareFileMessage } from './share';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import { semanticMarks } from './semmarks';
import { codeHandlers, fixedCodeKeys, foldRange, keysByPosition, lineCommentFold, selectReferences, vscodeMouse } from './keys';
import { ACTIONS, appActionFor, codeKeyMap, keyLabel, labelOf, binding, onBindingsChange, type Group } from './keybindings';
import { lint, Diagnostic, RULES, lineOf, pluginGlobals, type TextEdit } from '@core/lint';
import { api, ownerLabel, Resolved } from '@core/api';
import { resolveAt } from '@core/complete';
import { completionsAt, explainLine, hoverAt, signatureHelpAt, type CompletionKind, type CompletionEntry } from '@core/features';
import { currentRunner } from './aiproviders';
import { insertSnippet } from './snippet';
import { renderHandler, FEATURES } from '@core/templates';
import { simulate, parsePluginsInfo } from '@core/sim';
import { counts } from './aifix';
import { fixAll } from '@core/fix';
import { formatHandler } from '@core/format';
import { canSaveIntoFolder, rememberedName, saveIntoNucleus } from './nucleussave';
import { buildPackage, storeFiles, storedFiles, fileSize, sizeOf, PackageFile } from './package';
import { initLines } from './lines-ui';
import { initTips } from './tips-ui';
import { initSettings } from './settings-ui';
import { announceLine, hoverDelay, initA11y } from './a11y';
import { initNews } from './news';
import { initPanels } from './panels-ui';
import { initTouchTitles } from './touch-titles';
import { mascot } from './mascots';
import { fixWithNucli, applyEditsToText } from './fixfx';
import { codeNote } from './codenote';
import { initMessageHints } from './wmhints';
import { initValuePicker } from './valuepick';
import { memberCard } from './doccard';
import { initKeyHints } from './keyhints';
import { mountFormView, type FormView } from './formview';
import { mountBlocksView, type BlocksView } from './blocksview';
import { initPackageUI, fileIcon } from './packageui';
import type { PkgProblem } from './pkgcheck';
import { pickGameFolder, checkAgainstFolder, initFolderPickers, folderSummaryHtml, type GameFolder, type FolderProblem } from './gamefolder';
import { openMenu, type MenuItem } from './menus';
import { initTestGuide } from './testguide';
import { initTestPins } from './testpins';
import { exportSettings, importSettings } from './settingsio';
import { BETA } from './testplan';
import { feedbackUrl, openReport, setReportState } from './report';
import { firstRunDone, initFirstRun } from './firstrun';
import { countVisit, feedbackAvailable, feedbackBlockedByBrowser, feedbackOn, setFeedback, totalsUrl, use, wireVotes } from './feedback';
import { blockedItemAt, messageMarkdown } from '@core/wm';
import { initSheetDrag } from './sheets';
import { initWakaTime } from './wakatime';
import { mountDebugger } from './debugui';
import { hlCode, hlHtml, modeFor } from './codehl';
import { setCodeFieldSupport } from './codefield';
import { $, esc, md, narrow, onNarrowChange } from './dom';
import { initDocs, linkApiNames, wireApiLinkClicks } from './docs-ui';
import { initTryIt } from './tryit-ui';
import { initFixes } from './aifix-ui';
import { initFileOpen } from './fileopen-ui';
import { pageDownloads, saveFileName, type Downloads } from './savefile';
import { followMoved as followMovedLink, movedNote, probeHash, routeLink, slug, unknownNote, type LinkCatalog } from './links';

declare const PROBES: { name: string; source: string; jint: string; detail: string }[];
applyTheme();
applyCustomTheme();
applyCodeTheme();
watchPictures();
declare const BUILD: { bench?: string; core: string; nucleus: string | null; jint: string | null; feedback?: string | null };
interface HubExample { id: string; title: string; game: string; owner: string; version: number; downloads: number; maxPlayers: number | null; multiKbm: boolean; updated: string | null; url: string; source?: string; /** The game's cover: a file beside the page, or a data: URL. */ cover?: string; /** Its current version isn't verified on the Hub. */ unverified?: boolean; lint?: { errors: number; warnings: number }; /** How many other files its package has (hub/<id>.files.json). */ files?: number; /** Those files, in the page (single-file build) or once fetched; no b64: too big to bring along. */ filesData?: { name: string; size: number; b64?: string }[] }
/** base: where hub/<id>.js are fetched from when the sources aren't in the page (GitHub Pages). */
declare const HUB_EXAMPLES: { takenAt: string | null; handlers: HubExample[]; base: string | null; /** every handler on the Hub (our mirror), not only the most downloaded */ all?: boolean };
declare const EXAMPLE_PACKAGES: { id: string; title: string; sub: string; name: string; hubId: string; handler: string; files: { name: string; b64: string }[] }[];
declare const BOT_TEMPLATES: { commit: string | null; templates: { id: string; name: string; source: string }[] };

// The address as the page was opened (start-up loads the last draft, which can rewrite it): a #docs-… link from an
// editor's hover opens Docs there, over whatever handler is open.
const INITIAL_HASH = location.hash;

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
  // General JavaScript mistakes (ESLint's rules, core/jsrules.ts) carry their own plain title and why.
  const js = (JS_RULES as Record<string, { title: string; why: string }>)[d.rule];
  return PLAIN[d.rule] ?? (js ? { title: js.title, why: js.why } : { title: d.rule, why: '' });
}

const STORE_KEY = 'nucleus-workbench-draft';
// New handler… starts from this template: short, commented, and a starting point for anyone. The common-mistakes
// handler is in Examples (#example-mistakes).
const STARTER = '// New to handlers? Menu › Learn makes one with you, step by step.\n' + renderHandler({ gameName: 'My Game', executableName: 'MyGame.exe', features: [] });
let initial = STARTER;
// Files that came with the opened package (besides handler.js); saved with it, and kept over a reload.
let packageFiles: PackageFile[] = storedFiles();
// A package's pluginsInfo.txt (in its handler folder, Game.Folder): Nucleus adds each plugin as a
// global. Without a package the linter can't see it, and only warns on unknown `Name.Member`.
const pluginsText = (): string | undefined => {
  const f = packageFiles.find((x) => /(^|\/)pluginsInfo\.txt$/i.test(x.name) && x.name.split('/').length <= 2 && !x.remote);
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
// A first visit (nothing kept in this browser, no link to a handler) starts on the home page: what a handler is, and
// the ways on (New, Open, Learn). The template is one click away (New handler…).
let firstVisit = false;
try {
  firstVisit = !localStorage.getItem(STORE_KEY) && !localStorage.getItem('nucleus-workbench-tabs') && !location.hash;
  initial = firstVisit ? '' : localStorage.getItem(STORE_KEY) || STARTER;
} catch {
  /* storage unavailable */
}

let current: Diagnostic[] = [];
let currentText = '';
// The game's folder, if the author picked one for this tab (gamefolder.ts): only names and sizes, kept in this page.
let gameFolder: GameFolder | null = null;
let folderProblems: FolderProblem[] = [];
// The package's own problems (pkgcheck.ts) and its UI (packageui.ts).
let pkgProblems: PkgProblem[] = [];
let pkgUI: ReturnType<typeof initPackageUI> | null = null;
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
  gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
  // Folding, as in VS Code: arrows next to the line numbers (shown on hover), the keys in keys.ts.
  foldGutter: { rangeFinder: foldRange, minFoldSize: 1 },
  foldOptions: { rangeFinder: foldRange, widget: '⋯', minFoldSize: 1 },
  // Touch screens edit through the page's own text selection, which only reaches lines that are
  // drawn: draw them all (handlers are small), so the phone's Select all, copy and delete see every line.
  viewportMargin: window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0 ? Infinity : 10,
  lint: {
    getAnnotations: (text: string) =>
      analyze(text).then((r) => {
        current = r.diagnostics;
        currentText = text;
        folderProblems = gameFolder ? checkAgainstFolder(text, gameFolder) : [];
        pkgProblems = pkgUI ? pkgUI.problems() : [];
        setFixCount(r.fixable);
        renderProblems(text);
        if (formView && viewMode === 'form') formView.refresh();
        if (blocksView && viewMode === 'blocks') blocksView.refresh();
        return [
          ...current
            .filter((d) => d.severity !== 'hint' || (mode === 'dev' && filter === 'hint'))
            .map((d) => ({
              from: posAt(text, d.start),
              to: posAt(text, Math.max(d.end, d.start + 1)),
              message: `${plainFor(d).title}. ${d.message.replace(/`/g, '')}${mode === 'dev' ? ` [${d.rule}]` : ''}`,
              severity: d.severity === 'error' ? 'error' : d.severity === 'warning' ? 'warning' : 'info',
            })),
          ...folderProblems.map((f) => ({ from: posAt(text, f.start), to: posAt(text, Math.max(f.end, f.start + 1)), message: `${f.title}. ${f.why}`, severity: f.severity })),
          ...pkgProblems.filter((f) => f.start !== undefined).map((f) => ({ from: posAt(text, f.start!), to: posAt(text, Math.max(f.end!, f.start! + 1)), message: `${f.title}. ${f.why}`, severity: f.severity })),
        ];
      }),
    delay: 250,
    tooltips: false, // our own hover card (showHoverCard)
  },
  configureMouse: vscodeMouse,
  // Keys: keybindings.ts (VS Code's, changeable in Settings › Keyboard shortcuts), set just below.
} as any);
// The code editor's keys from keybindings.ts; again whenever they're changed in Settings.
const editorHandlers: Record<string, (cm: any) => void> = {
  ...codeHandlers,
  // The problems (and fixes) at the cursor, else on its line; from the keyboard straight to its first button.
  quickFix: (cm: any) => {
    const c = cm.getCursor();
    const at = cm.indexFromPos(c);
    // The problem at the cursor (with the name's docs); else every problem on the line; only then the name's docs.
    const here = lineProblems(c.line, true).some((d) => d.start <= at && at <= Math.max(d.end, d.start + 1));
    if (here || !lineProblems(c.line, false).length) showLineProblems(c.line, at);
    else showLineProblems(c.line);
    if (linePop.hidden) showLineProblems(c.line);
    if (!linePop.hidden) linePop.querySelector<HTMLElement>('[data-lp-fix], [data-lp-more]')?.focus();
  },
  explainLine: () => explainAtCursor(),
  suggest: (cm: any) => cm.showHint({ hint: hinter, completeSingle: false, explicit: true }),
  goToLine: () => showOpen('line'),
  definition: () => goToDefinition(),
  rename: () => renameSymbol(),
  references: () => renameSymbol(true),
};
const applyKeys = () => editor.setOption('extraKeys', codeKeyMap(editorHandlers, fixedCodeKeys));
applyKeys();
onBindingsChange(() => (applyKeys(), renderHelpKeys()));
keysByPosition(editor);
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
  scroller.addEventListener('focus', (e: FocusEvent) => {
    if (e.target === scroller) editor.focus();
  });
}

// API names in hovers, parameter hints and suggestion docs are links (docs-ui.ts): a click (or Enter) opens that name
// in Docs, as VS Code's hovers link to the docs.
function openReferenceAt(path: string) {
  tip.hidden = true;
  selectTab('api');
  if (narrow()) ($('.switch button[data-view=results]') as HTMLButtonElement)?.click();
  docs.go(`q:${path}`);
}

// Completion: the same suggestions as VS Code and other editors (core/features.ts completionsAt): API members, the
// option's values, the handler's own functions and variables, Context.Options keys and their values, snippets, the
// whole template in an empty file. The docs of the highlighted one show beside the list.
const HINT_ICON: Partial<Record<CompletionKind, string>> = { method: 'ƒ', function: 'ƒ', snippet: '⧉', keyword: 'k', enumMember: '▪', value: '▪', constant: '#', property: '·', field: '·', variable: 'x', module: '{}', class: 'C', enum: 'E' };
function hinter(cm: any, options?: { explicit?: boolean }) {
  const text = cm.getValue();
  const cur = cm.getCursor();
  const offset = cm.indexFromPos(cur);
  const items = completionsAt(text, offset, { own: true, explicit: !!options?.explicit });
  if (!items?.length) return null;
  // The word the editor would replace when an item has no range of its own.
  let ws = offset;
  while (ws > 0 && /[\w$]/.test(text[ws - 1])) ws--;
  // What's typed, matched with its case first (`hand` → handler before Handler), as VS Code ranks them.
  const exact = (it: CompletionEntry) => {
    const typed = text.slice(it.range?.start ?? ws, offset).replace(/^["']/, '');
    return typed && it.label.startsWith(typed) ? 1 : 0;
  };
  const list = items
    .filter((it) => {
      const start = it.range?.start ?? ws;
      const typed = text.slice(start, offset).replace(/^["']/, '').toLowerCase();
      if (!typed) return true;
      return [it.label, ...(it.filterText ?? '').split(/\s+/)].some((w) => w.toLowerCase().startsWith(typed));
    })
    .sort((a, z) => exact(z) - exact(a) || (a.sortText ?? a.label).localeCompare(z.sortText ?? z.label))
    .map((it) => {
      const from = cm.posFromIndex(it.range?.start ?? ws);
      const to = cm.posFromIndex(Math.max(it.range?.end ?? offset, offset));
      const right = it.labelDetail ?? (it.kind === 'method' ? 'method' : (it.detail ?? '').replace(/^.*?\):\s*/, '').slice(0, 40));
      const typed = text.slice(it.range?.start ?? ws, offset).replace(/^["']/, '');
      const hit = typed && it.label.toLowerCase().startsWith(typed.toLowerCase()) ? typed.length : 0;
      const doc = it.documentation && !/^\s*```/.test(it.documentation) && it.detail && !it.labelDetail ? '```js\n' + it.detail + '\n```\n\n' + it.documentation : it.documentation;
      return {
        text: it.insertText ?? it.label,
        displayText: it.label,
        from,
        to,
        doc,
        render(el: HTMLElement) {
          el.innerHTML = `<span class="hint-ico k-${it.kind}" aria-hidden="true">${HINT_ICON[it.kind] ?? ''}</span><span class="hint-name${it.deprecated ? ' dep' : ''}">${hit ? `<b class="hint-hit">${esc(it.label.slice(0, hit))}</b>` : ''}${esc(it.label.slice(hit))}</span><span class="hint-type">${esc(right)}</span>`;
        },
        hint(c: any, _data: any, self: any) {
          if (it.snippet) insertSnippet(c, self.from, self.to, it.insertText ?? it.label);
          else c.replaceRange(self.text, self.from, self.to, 'complete');
          if (it.signatureHelp) showSignature();
        },
      };
    });
  if (!list.length) return null;
  const pre = items.findIndex((it) => it.preselect);
  const data = { list, from: list[0].from, to: cur, selectedHint: Math.max(0, list.findIndex((h) => h.displayText === items[pre]?.label)) };
  // The highlighted suggestion's docs, next to the list.
  CodeMirror.on(data, 'select', (c: any, el: HTMLElement) => showHintDoc(c.doc, el));
  CodeMirror.on(data, 'close', () => showHintDoc(undefined));
  return data;
}
const hintDoc = document.createElement('div');
hintDoc.className = 'hint-doc';
hintDoc.hidden = true;
document.body.appendChild(hintDoc);
// The list closes when the editor loses focus, so the docs beside it act on mousedown.
wireApiLinkClicks(hintDoc, openReferenceAt, 'mousedown');
function showHintDoc(doc: string | undefined, el?: HTMLElement) {
  const box = el?.closest('.CodeMirror-hints') as HTMLElement | null;
  if (!doc || !box) return void (hintDoc.hidden = true);
  hintDoc.innerHTML = md(doc);
  linkApiNames(hintDoc);
  hintDoc.hidden = false;
  const r = box.getBoundingClientRect();
  const w = Math.min(420, window.innerWidth - 16);
  hintDoc.style.width = `${w}px`;
  const right = r.right + 6 + w <= window.innerWidth - 8;
  hintDoc.style.left = `${right ? r.right + 6 : Math.max(8, r.left - 6 - w)}px`;
  hintDoc.style.top = `${r.top}px`;
  // No room on either side (a phone): under the list.
  if (!right && r.left - 6 - w < 8) { hintDoc.style.left = `${Math.max(8, r.left)}px`; hintDoc.style.top = `${r.bottom + 6}px`; }
}

editor.on('inputRead', (cm: any, change: any) => {
  const afterEquals = change.text[0] === ' ' && /[\w\]]\s*=\s$/.test(cm.getLine(change.from.line).slice(0, change.from.ch + 1));
  if (change.text[0] === '.' || /^[\w$"'\[,]$/.test(change.text[0]) || afterEquals) {
    if (!cm.state.completionActive) cm.showHint({ hint: hinter, completeSingle: false });
  }
  if (change.text[0] === '(' || change.text[0] === ',') showSignature();
});
// A quote or `[` typed where brackets close themselves (closebrackets' keys insert `""`, `[]` with no inputRead):
// `Context.Options["` still opens the keys.
editor.on('keyHandled', (cm: any, name: string) => {
  if (/^'["'[]'$/.test(name) && !cm.state.completionActive) cm.showHint({ hint: hinter, completeSingle: false });
});
editor.on('cursorActivity', () => showSignature());
// Settings › Accessibility: read out the problems on the line the cursor moves to (once per line).
let spokenLine = -1;
editor.on('cursorActivity', () => {
  if (!announceLine()) return;
  const line = editor.getCursor().line;
  if (line === spokenLine) return;
  spokenLine = line;
  const from = editor.indexFromPos({ line, ch: 0 }), to = editor.indexFromPos({ line, ch: editor.getLine(line).length });
  const here = current.filter((d) => d.start <= to && d.end >= from);
  if (here.length) announce(`Line ${line + 1}: ${here.map((d) => `${d.severity === 'error' ? 'error' : d.severity === 'warning' ? 'warning' : 'note'}, ${d.message.split('\n')[0]}`).join('; ')}`);
});

initMessageHints(editor);
initValuePicker(editor);
const folderPickers = initFolderPickers(editor, () => gameFolder, () => void pickFolder());
async function pickFolder() {
  const f = await pickGameFolder(editor.getValue());
  if (!f) return;
  gameFolder = f;
  if (tabsReady) activeT().folder = f;
  afterFolderChange();
  use('game-folder');
}
function afterFolderChange() {
  folderPickers.refresh();
  $('#files-game').hidden = !gameFolder;
  pkgUI?.render();
  (editor as any).performLint();
}
// "Your game on this PC" (the game's install folder, read on this device only): a section of the Files panel, since
// it is about files too: which ones the handler's paths point at, and file pickers for the symlink options.
function gameSection(): string {
  return `<section class="fp-game" aria-label="Your game on this PC"><div class="fp-head">Your game on this PC</div>${gameFolder
    ? `<div class="fp-gname"><span class="fi-badge fi-dir" aria-hidden="true">▸</span>${esc(gameFolder.name)}</div><p>Check compares the handler's paths and file names with this folder, and the symlink options get a file picker. Nothing is uploaded.</p><div class="fp-gacts"><button class="btn" type="button" data-gf="show">What's in it</button><button class="btn" type="button" data-gf="pick">Pick another</button><button class="btn" type="button" data-gf="forget">Unlink</button></div>`
    : `<p>Link the folder your game is installed in, and Check tells you when <code>ExecutableName</code>, <code>BinariesFolder</code> or a symlink option names a file that isn't there. Only names and sizes are read, on this device.</p><div class="fp-gacts"><button class="btn" type="button" data-gf="pick">Link the game's folder…</button></div>`}</section>`;
}
async function onGameAction(act: string) {
  if (act === 'pick') return void (await pickFolder());
  if (act === 'forget') { gameFolder = null; if (tabsReady) activeT().folder = null; afterFolderChange(); announce('Unlinked the game folder.'); return; }
  if (act === 'show' && gameFolder) showGameFolder();
}
function showGameFolder() {
  const dlg = $('#gf-dialog') as HTMLDialogElement;
  const draw = () => { $('#gf-body').innerHTML = gameFolder ? folderSummaryHtml(gameFolder, editor.getValue()) : '<p>No folder picked.</p>'; };
  draw();
  dlg.showModal();
  $('#gf-body').onclick = async (e) => {
    const act = (e.target as HTMLElement).closest<HTMLElement>('[data-gf]')?.dataset.gf;
    if (act === 'forget') { gameFolder = null; if (tabsReady) activeT().folder = null; afterFolderChange(); dlg.close(); }
    else if (act === 'pick') { dlg.close(); await pickFolder(); }
  };
}
$('#gf-close').addEventListener('click', () => ($('#gf-dialog') as HTMLDialogElement).close());

// Hover docs
const tip = $('#tip');
wireApiLinkClicks(tip, openReferenceAt);
let tipTimer: number | undefined;
let tipHideTimer: number | undefined;
// The hover card: the problems under the pointer (what, why, a fix you can click) and the docs of the name there.
// Anchored under the code it's about (above it near the bottom), so it never covers that code; it stays open while
// the pointer moves onto it. Replaces CodeMirror's own plain-text lint tooltip (lint.tooltips: false).
const SEV_ICON: Record<string, string> = { error: '✖', warning: '!', info: 'i', hint: '·' };
const codeIn = (s: string) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>');
// The hover, as VS Code shows it: one flat box; each problem a short line (what, then why), the docs under a thin
// divider, and the fixes as links in a bar at the bottom (Ctrl+. from the keyboard).
// Each check's own page (core/ruledocs.ts): next to the site's own pages when served with them, else the live site.
const ruleHref = (id: string) => (/^start\//.test(document.querySelector('a.start-link')?.getAttribute('href') ?? '') ? `rules/${encodeURIComponent(id)}/` : ruleUrl(id));
function problemCard(list: Diagnostic[]): string {
  return `<div class="hv-sec hv-probs">${list.map((d) => {
    const plain = plainFor(d);
    return `<div class="hv-prob ${sevClass[d.severity]}"><span class="hv-ico" aria-hidden="true">${SEV_ICON[d.severity]}</span><div><strong>${esc(plain.title)}</strong><span class="sr-only"> (${d.severity})</span><div class="hv-msg">${hlHtml(codeIn(d.message))}${mode === 'dev' ? ` <span class="hv-rule">${d.rule}</span>` : ''}</div></div></div>`;
  }).join('')}</div>`;
}
function fixBar(list: Diagnostic[]): string {
  const links = list.flatMap((d, i) => [...(d.fixes ?? [])].sort((a, z) => Number(!!z.preferred) - Number(!!a.preferred))
    .map((f) => `<button class="hv-link" type="button" data-hc-fix="${i}:${d.fixes!.indexOf(f)}">${codeIn(f.title)}</button>`));
  return links.length ? `<div class="hv-bar">${links.slice(0, 3).join('')}<span class="hv-key" title="Fixes from the keyboard">Ctrl+.</span></div>` : '';
}
function placeTip(from: { left: number; top: number; bottom: number }) {
  const w = tip.offsetWidth, h = tip.offsetHeight;
  const x = Math.min(Math.max(8, from.left - 12), window.innerWidth - w - 8);
  // Above the line, as VS Code (the code under it stays readable); below when there's no room above.
  const above = from.top - 4 - h >= 8;
  tip.style.left = `${x}px`;
  tip.style.top = `${above ? from.top - 4 - h : from.bottom + 4}px`;
}
function showHoverCard(text: string, at: number, list: Diagnostic[], doc: string, anchorFrom: number) {
  if (!list.length && !doc) return void (tip.hidden = true);
  // Explain this line: on request, a link at the bottom of the card (as in VS Code); not on a gutter marker (at -1).
  tip.classList.remove('explain');
  const explain = at >= 0 ? `<div class="hv-bar"><button class="hv-link" type="button" data-hc-explain="${at}">Explain this line</button><span class="hv-key">${esc(labelOf('explainLine'))}</span></div>` : '';
  tip.innerHTML = (list.length ? problemCard(list) : '') + (doc ? `<div class="hv-sec hv-doc">${doc}</div>` : '') + fixBar(list) + explain;
  tip.querySelector<HTMLButtonElement>('[data-hc-explain]')?.addEventListener('click', () => showExplanation(at));
  tip.classList.toggle('has-problems', list.length > 0);
  linkApiNames(tip);
  tip.hidden = false;
  tip.querySelectorAll<HTMLButtonElement>('[data-hc-fix]').forEach((b) => b.addEventListener('click', () => {
    const [di, fi] = b.dataset.hcFix!.split(':').map(Number);
    const fix = list[di].fixes![fi];
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
/** Explain this line (core/explain.ts): what the line does in plain words, the docs of its names, what Check says.
 * With AI set up (Settings › AI), "Explain with AI" asks it for a longer answer, labelled AI-written. */
let explainSample: any;
async function explainRunner() {
  if (explainSample === undefined) explainSample = await (window as any).claude?.use?.('sample')?.catch?.(() => null) ?? null;
  return currentRunner(explainSample).runner;
}
function explainAtCursor() {
  const c = editor.getCursor();
  const line = editor.getLine(c.line);
  if (!line.trim()) return codeNote(editor, c.line, 'An empty line: nothing to explain.', { mood: 'info' });
  showExplanation(editor.indexFromPos({ line: c.line, ch: Math.max(c.ch, line.search(/\S/)) }));
}
function showExplanation(at: number) {
  use('explain-line');
  const text = editor.getValue();
  const e = explainLine(text, at);
  if (!e) return void (tip.hidden = true);
  tip.innerHTML = `<div class="hv-sec hv-doc">${md(e.markdown)}</div><div class="hv-bar" hidden><button class="hv-link" type="button" data-hc-ai>Explain with AI</button></div>`;
  tip.classList.remove('has-problems');
  tip.classList.add('explain');
  linkApiNames(tip);
  tip.hidden = false;
  // Asked for from the keyboard, so read it out too (the hover card itself isn't a live region).
  announce(tip.innerText.replace(/\s+/g, ' ').slice(0, 600));
  const lineStart = editor.indexFromPos({ line: e.line, ch: 0 });
  placeTip(editor.charCoords(editor.posFromIndex(lineStart + Math.max(0, e.text.search(/\S/))), 'window'));
  const bar = tip.querySelector<HTMLElement>('.hv-bar')!;
  void explainRunner().then((runner) => {
    if (!runner || !tip.contains(bar)) return;
    bar.hidden = false;
    placeTip(editor.charCoords(editor.posFromIndex(lineStart + Math.max(0, e.text.search(/\S/))), 'window'));
    const btn = bar.querySelector<HTMLButtonElement>('[data-hc-ai]')!;
    btn.addEventListener('click', async () => {
      use('explain-line-ai');
      btn.disabled = true;
      btn.textContent = `Asking ${runner.label}…`;
      try {
        const r = await runner.json(e.aiPrompt, {});
        const answer = String(r?.explanation ?? '').trim();
        if (!answer) throw new Error('No answer.');
        bar.outerHTML = `<div class="hv-sec hv-doc"><p class="small">AI-written by ${esc(runner.label)}; check it against the docs.</p>${md(answer)}</div>`;
        linkApiNames(tip);
      } catch (err) {
        btn.disabled = false;
        btn.textContent = 'Explain with AI';
        notice(`${runner.label} couldn't explain it: ${(err as Error).message}`, { kind: 'error' });
      }
    });
  });
}
const problemsAt = (at: number) => current.filter((d) => d.severity !== 'hint' && d.start <= at && at <= Math.max(d.end, d.start + 1));
editor.getWrapperElement().addEventListener('mousemove', (e: MouseEvent) => {
  // An explanation (Explain this line) stays until Esc, a click elsewhere, typing or scrolling.
  if (tip.contains(e.target as Node) || (!tip.hidden && tip.classList.contains('explain'))) return;
  clearTimeout(tipTimer);
  tipTimer = window.setTimeout(() => {
    // Not over the "+" or while its menu is open: the menu says it already.
    if ((e.target as HTMLElement).closest?.('.wm-add, .gf-add') || document.querySelector('.wm-menu, .gf-menu')) { tip.hidden = true; return; }
    const text = editor.getValue();
    // A marker in the gutter: every problem on that line.
    const marker = (e.target as HTMLElement).closest?.('.CodeMirror-lint-marker');
    if (marker) {
      const line = editor.lineAtHeight(e.clientY, 'window');
      const list = lineProblems(line, mode === 'dev');
      if (!list.length) return void (tip.hidden = true);
      return showHoverCard(text, -1, list, '', Math.min(...list.map((d) => d.start)));
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
    let doc = msg ? md(messageMarkdown(msg.id)) : r ? describeResolved(r.resolved, text.slice(r.start, r.end)) : '';
    // Not an API name: the handler's own functions and variables, Context.Options keys, JavaScript's own (as in VS Code).
    const own = !doc && !msg ? hoverAt(text, at, { own: true }) : undefined;
    if (own) doc = md(own.markdown);
    const from = list.length ? Math.min(...list.map((d) => d.start)) : msg ? msg.start : r ? r.start : own ? own.range.start : at;
    showHoverCard(text, at, list, doc, from);
  }, hoverDelay(280));
});
document.addEventListener('pointerdown', (e) => { if (!tip.hidden && tip.classList.contains('explain') && !tip.contains(e.target as Node)) tip.hidden = true; }, true);
const hideTipSoon = () => { if (tip.classList.contains('explain')) return; clearTimeout(tipHideTimer); tipHideTimer = window.setTimeout(() => (tip.hidden = true), 250); };
editor.getWrapperElement().addEventListener('mouseleave', (e: MouseEvent) => {
  clearTimeout(tipTimer);
  if (!tip.contains(e.relatedTarget as Node)) hideTipSoon();
});
editor.getWrapperElement().addEventListener('mouseenter', () => clearTimeout(tipHideTimer));
tip.addEventListener('mouseenter', () => { clearTimeout(tipHideTimer); clearTimeout(tipTimer); });
tip.addEventListener('mouseleave', (e: MouseEvent) => { if (!editor.getWrapperElement().contains(e.relatedTarget as Node)) hideTipSoon(); });
editor.on('change', () => (tip.hidden = true));
semanticMarks(editor); // Game, Context and the rest in their own colours, as in VS Code (semmarks.ts)
editor.on('scroll', () => (tip.hidden = true));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !tip.hidden) tip.hidden = true; });

// The small code editors in Form and Blocks (codefield.ts): the same suggestions, hover docs and announcements.
setCodeFieldSupport({
  hint: hinter,
  say: (msg) => announce(msg),
  hover(cm: any, e: MouseEvent, problems) {
    if (tip.contains(e.target as Node)) return;
    clearTimeout(tipTimer);
    clearTimeout(tipHideTimer);
    tipTimer = window.setTimeout(() => {
      const text = cm.getValue();
      const pos = cm.coordsChar({ left: e.clientX, top: e.clientY }, 'window');
      const at = cm.indexFromPos(pos);
      const end = cm.charCoords({ line: pos.line, ch: cm.getLine(pos.line).length }, 'window');
      if (e.clientX > end.right + 4) return void (tip.hidden = true);
      const r = resolveAt(text, at);
      let doc = r ? describeResolved(r.resolved, text.slice(r.start, r.end)) : '';
      const own = doc ? undefined : hoverAt(text, at, { own: true });
      if (own) doc = md(own.markdown);
      if (!doc && !problems.length) return void (tip.hidden = true);
      tip.innerHTML = (problems.length ? `<div class="hv-sec hv-probs">${problems.map((d) => `<div class="hv-prob ${sevClass[d.severity] ?? 'info'}"><span class="hv-ico" aria-hidden="true">${SEV_ICON[d.severity] ?? 'i'}</span><div class="hv-msg">${hlHtml(codeIn(d.message))}</div></div>`).join('')}</div>` : '')
        + (doc ? `<div class="hv-sec hv-doc">${doc}</div>` : '');
      tip.classList.toggle('has-problems', problems.length > 0);
      linkApiNames(tip);
  tip.hidden = false;
      placeTip(cm.charCoords(cm.posFromIndex(problems.length ? problems[0].start : r ? r.start : at), 'window'));
    }, hoverDelay(280));
  },
  hoverEnd() {
    clearTimeout(tipTimer);
    hideTipSoon();
  },
});

function describeResolved(res: Resolved, word: string): string {
  switch (res.kind) {
    case 'member':
      // The handler's own function (its return type, resolved): core's own hover says it better.
      return res.member.own ? '' : memberCard(res.owner, res.name, res.member, { compact: true });
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
  // Every overload, the parameter being typed highlighted, and what to pass for it (core's signature help, as in VS
  // Code): Nucleus' methods and classes, JavaScript's own, the handler's own functions.
  const h = signatureHelpAt(text, editor.indexFromPos(editor.getCursor()), { own: true });
  if (!h?.signatures.length) {
    // Touch screens have no hover: show the docs for whatever is under the cursor instead.
    if (coarse.matches) {
      const r = resolveAt(text, editor.indexFromPos(editor.getCursor()));
      if (r && r.resolved.kind === 'member') {
        const m = r.resolved.member;
        sig.innerHTML = `<div class="sig-body"><div class="sig-label"><strong>${esc(ownerLabel(r.resolved.owner))}.${esc(r.resolved.name)}</strong>: ${esc(m.kind === 'method' ? 'method' : m.ts ?? '')}</div>${m.doc ? `<div class="sig-docs">${esc(m.doc.split('\n')[0].slice(0, 140))}</div>` : ''}</div>`;
        sig.classList.remove('multi');
        linkApiNames(sig);
        sig.hidden = false;
        placeSig();
        return;
      }
    }
    sig.hidden = true;
    return;
  }
  // One overload at a time, as VS Code: "1/2" with arrows (Alt+Up / Alt+Down) when there are more.
  const key = h.signatures.map((x) => x.label).join('\n');
  if (sigPick.key !== key) sigPick = { key, index: h.activeSignature };
  const n = h.signatures.length;
  const si = ((sigPick.index % n) + n) % n;
  const s = h.signatures[si];
  const k = h.activeParameter;
  let at = s.label.indexOf('(') + 1;
  let html = '';
  let activeIdx = -1;
  s.parameters.forEach((p, i) => {
    const pos = s.label.indexOf(p, at);
    if (pos < 0) return;
    const active = i === k || (i === s.parameters.length - 1 && k > i && p.startsWith('...'));
    if (active) activeIdx = i;
    html += esc(s.label.slice(at, pos)) + (active ? `<span class="active">${esc(p)}</span>` : esc(p));
    at = pos + p.length;
  });
  html = esc(s.label.slice(0, s.label.indexOf('(') + 1)) + html + esc(s.label.slice(at));
  const pdoc = activeIdx >= 0 ? s.parameterDocs?.[activeIdx] : undefined;
  const fdoc = s.documentation?.split(/\n{2,}/)[0];
  sig.innerHTML = (n > 1 ? `<div class="sig-nav"><button type="button" data-sig="-1" aria-label="Previous overload (Alt+Up)">▲</button><span>${si + 1}/${n}</span><button type="button" data-sig="1" aria-label="Next overload (Alt+Down)">▼</button></div>` : '')
    + `<div class="sig-body"><div class="sig-label">${html}</div>`
    + (pdoc || fdoc ? `<div class="sig-docs">${pdoc ? `<div class="sig-pdoc">${md(pdoc)}</div>` : ''}${fdoc ? `<div class="sig-fdoc">${md(fdoc)}</div>` : ''}</div>` : '')
    + '</div>';
  sig.classList.toggle('multi', n > 1);
  linkApiNames(sig);
  sig.hidden = false;
  placeSig();
}
let sigPick = { key: '', index: 0 };
// Just above the cursor's line (below it near the top), like VS Code; never over the line being typed.
function placeSig() {
  const c = editor.cursorCoords(null, 'window');
  const box = editor.getWrapperElement().getBoundingClientRect();
  const w = sig.offsetWidth, h = sig.offsetHeight;
  sig.style.left = `${Math.max(box.left + 4, Math.min(c.left - 24, window.innerWidth - w - 8))}px`;
  sig.style.top = `${c.top - h - 4 >= box.top ? c.top - h - 4 : c.bottom + 4}px`;
}
sig.addEventListener('mousedown', (e) => { if (!(e.target as HTMLElement).closest('[data-api]')) e.preventDefault(); }); // keep the editor's focus
wireApiLinkClicks(sig, openReferenceAt);
sig.addEventListener('click', (e) => {
  const b = (e.target as HTMLElement).closest<HTMLElement>('[data-sig]');
  if (b) { sigPick.index += Number(b.dataset.sig); showSignature(); }
});
editor.addKeyMap({
  'Alt-Up': () => { if (sig.hidden || !sig.classList.contains('multi')) return CodeMirror.Pass; sigPick.index--; showSignature(); },
  'Alt-Down': () => { if (sig.hidden || !sig.classList.contains('multi')) return CodeMirror.Pass; sigPick.index++; showSignature(); },
  Esc: () => { if (sig.hidden) return CodeMirror.Pass; sig.hidden = true; },
});
editor.on('blur', () => (sig.hidden = true));
editor.on('scroll', () => { if (!sig.hidden) placeSig(); });

// ---------------------------------------------------------------------------
// Problems


// Problems that aren't the linter's: the code against the picked game folder (and the package's files).
function renderExtraProblems(text: string) {
  const box = $('#extra-problems');
  const list = folderProblems;
  const pk = pkgProblems;
  box.hidden = !list.length && !pk.length;
  if (!list.length && !pk.length) return void (box.innerHTML = '');
  const pkHtml = pk.length ? `<li class="xp-h" role="presentation">In the package <span class="muted">· ${packageFiles.length} file${packageFiles.length === 1 ? '' : 's'} besides handler.js</span></li>` + pk.map((f, i) => {
    const where = f.file ? `<button class="loc" type="button" data-xopen="${esc(f.file)}"${f.line ? ` data-xline="${f.line}"` : ''}>${fileIcon(f.file)}${esc(f.file.split('/').pop()!)}${f.line ? `:${f.line}` : ''}</button>` : f.start !== undefined ? `<button class="loc" type="button" data-xjump="${f.start}">Line ${lineOf(text, f.start) + 1}</button>` : '';
    return `<li class="xp ${f.severity}"><span class="sev-ico" aria-hidden="true">${SEV_ICON[f.severity]}</span><div class="xp-b">${where} <strong>${esc(f.title)}</strong><p class="xp-why">${esc(f.why)}</p>${f.fix ? `<div class="xp-act"><button class="fix primary" type="button" data-pfix="${i}">${esc(f.fix.title)}</button></div>` : ''}</div></li>`;
  }).join('') : '';
  box.innerHTML = pkHtml + (!list.length ? '' : `<li class="xp-h" role="presentation">Against your game <span class="muted">· ${esc(gameFolder?.name ?? '')}</span></li>` + list.map((f, i) => {
    const line = lineOf(text, f.start) + 1;
    return `<li class="xp ${f.severity}"><span class="sev-ico" aria-hidden="true">${SEV_ICON[f.severity]}</span><div class="xp-b"><button class="loc" type="button" data-xjump="${f.start}">Line ${line}</button> <strong>${esc(f.title)}</strong><p class="xp-why">${esc(f.why)}</p>${f.fix ? `<div class="xp-act"><button class="fix primary" type="button" data-xfix="${i}">${esc(f.fix.title)}</button></div>` : ''}</div></li>`;
  }).join(''));
  box.querySelectorAll<HTMLButtonElement>('[data-xjump]').forEach((b) => b.addEventListener('click', () => jumpTo(Number(b.dataset.xjump))));
  box.querySelectorAll<HTMLButtonElement>('[data-xopen]').forEach((b) => b.addEventListener('click', () => pkgUI?.openFile(b.dataset.xopen!, b.dataset.xline ? Number(b.dataset.xline) : undefined)));
  box.querySelectorAll<HTMLButtonElement>('[data-pfix]').forEach((b) => b.addEventListener('click', () => {
    const fx = pk[Number(b.dataset.pfix)].fix!;
    if (fx.kind === 'move') pkgUI?.moveFile(fx.from, fx.to);
  }));
  box.querySelectorAll<HTMLButtonElement>('[data-xfix]').forEach((b) => b.addEventListener('click', () => {
    const fx = list[Number(b.dataset.xfix)].fix!;
    editor.replaceRange(fx.text, editor.posFromIndex(fx.start), editor.posFromIndex(fx.end));
  }));
}
function renderProblems(text: string) {
  renderExtraProblems(text);
  const counts = { error: 0, warning: 0, info: 0, hint: 0 } as Record<string, number>;
  for (const d of current) counts[d.severity]++;
  const simple = mode === 'simple';
  const rank = { error: 0, warning: 1, info: 2, hint: 3 } as Record<string, number>;
  // Errors first (they stop Nucleus), then in line order.
  const list = (simple ? current.filter(inProblemList) : current.filter((d) => (filter === 'all' ? d.severity !== 'hint' : d.severity === filter)))
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
      el.innerHTML = `<li class="empty masc-empty">${mascot('n-sleep', { size: 72, zoom: 1.2 })}<span><strong>Waiting for code.</strong> Type or paste a handler, or <button class="link" type="button" id="go-open">open one</button> (Ctrl+P).</span></li>`;
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
  // Settings › General › Check: compact (one row each, open for more), comfortable, detailed (everything open).
  const density = checkDensity();
  el.dataset.density = density;
  el.innerHTML = list
    .map((d, i) => {
      const line = lineOf(text, d.start) + 1;
      const col = d.start - (text.lastIndexOf('\n', d.start - 1) + 1) + 1;
      const plain = plainFor(d);
      const about = d.message.match(/`([^`]+)`/)?.[1];
      const ordered = (d.fixes ?? []).map((f, j) => ({ f, j })).sort((a, z) => Number(!!z.f.preferred) - Number(!!a.f.preferred));
      const fixBtn = ({ f, j }: { f: NonNullable<Diagnostic['fixes']>[number]; j: number }, main: boolean) =>
        `<button class="fix${main ? ' primary' : ''}" data-d="${i}" data-f="${j}" type="button" title="${esc(f.title.replace(/`/g, ''))}">${main && f.preferred ? 'Fix this' : esc(f.title.replace(/`/g, ''))}</button>`;
      const key = `${d.rule}:${line}:${about ?? ''}`;
      const open = density !== 'compact' || openProblems.has(key);
      // Advanced adds (never replaces): the column, severity, rule id and the technical message expanded.
      const extra = simple ? '' : `<span class="chip ${sevClass[d.severity]}">${d.severity}</span><span class="rule" title="${esc(RULES[d.rule].description)}">${d.rule}</span>`;
      const bodyId = `pb-${i}`;
      return `<li class="problem ${sevClass[d.severity]}" data-i="${i}"><div class="pcard${open ? ' open' : ''}" data-key="${esc(key)}">
        <div class="prow"><span class="sev-ico" aria-hidden="true">${SEV_ICON[d.severity]}</span><button class="loc" data-jump="${d.start}" type="button" title="Show this line">Line ${line}${simple ? '' : `:${col}`}</button>
          <span class="plain-title">${esc(plain.title)}${about ? `: <code>${esc(about)}</code>` : ''}</span>
          <span class="row-fix">${ordered[0] ? fixBtn(ordered[0], true) : ''}</span>
          <button class="ptoggle" type="button" aria-expanded="${open}" aria-controls="${bodyId}" aria-label="More about line ${line}: ${esc(plain.title)}"></button></div>
        <div class="body" id="${bodyId}"${open ? '' : ' hidden'}><p class="plain-why">${esc(plain.why)}</p>
        <div class="meta">${ordered.slice(1).map((o) => fixBtn(o, false)).join('')}<button class="link" type="button" data-jump="${d.start}">Show me</button>${RULE_DOCS[d.rule] ? `<a class="link" href="${esc(ruleHref(d.rule))}" target="_blank" rel="noopener">About this check</a>` : ''}${extra}</div>
        <details class="tech"${density === 'detailed' ? ' open' : ''}><summary>Technical details</summary>${md(d.message).replace(/^<p>|<\/p>$/g, '')}</details></div></div></li>`;
    })
    .join('');
  // Open or close a card: its toggle button, or a click anywhere on its row that isn't another button.
  el.querySelectorAll<HTMLElement>('.pcard').forEach((card) => {
    const toggle = card.querySelector<HTMLButtonElement>('.ptoggle')!, body = card.querySelector<HTMLElement>('.body')!;
    const set = (o: boolean) => {
      card.classList.toggle('open', o);
      body.hidden = !o;
      toggle.setAttribute('aria-expanded', String(o));
      o ? openProblems.add(card.dataset.key!) : openProblems.delete(card.dataset.key!);
    };
    toggle.addEventListener('click', () => set(body.hidden === true));
    card.querySelector('.prow')!.addEventListener('click', (e) => { if (!(e.target as HTMLElement).closest('button')) set(body.hidden === true); });
  });
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
const openProblems = new Set<string>();
type Density = 'compact' | 'comfortable' | 'detailed';
const DENSITY_KEY = 'nucleus-workbench-check-density';
function checkDensity(): Density {
  try { const v = localStorage.getItem(DENSITY_KEY); if (v === 'comfortable' || v === 'detailed') return v; } catch { /* private mode */ }
  return 'compact';
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
        const fixes = [...(d.fixes ?? [])].sort((a, z) => Number(!!z.preferred) - Number(!!a.preferred));
        return `<div class="lp-item ${sevClass[d.severity]}"><div class="lp-title">Line ${line + 1}: ${esc(plain.title)}${about ? `: <code>${esc(about)}</code>` : ''}</div><div class="lp-why">${esc(plain.why)}</div><div class="lp-actions">${fixes.map((f, k) => `<button class="btn${k === 0 ? ' primary' : ''}" type="button" data-lp-fix="${i}:${d.fixes!.indexOf(f)}">${f.preferred && fixes.length === 1 ? 'Fix this' : esc(f.title.replace(/`/g, ''))}</button>`).join('')}<button class="link" type="button" data-lp-more>More in Check</button></div></div>`;
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
      const [di, fi] = b.dataset.lpFix!.split(':').map(Number);
      const fix = list[di].fixes![fi];
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
editor.on('gutterClick', (_cm: any, line: number, gutter: string) => gutter !== 'nc-bp' && ((tip.hidden = true), showLineProblems(line)));
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
  if (pkgUI?.active()) pkgUI.showHandler();
  const p = editor.posFromIndex(offset);
  editor.setCursor(p);
  editor.scrollIntoView(p, 80);
  editor.focus();
}

/** F8 / Shift+F8: move through the problems shown in the list. */
function renameSymbol(justFind = false) {
  const at = editor.getCursor();
  const n = selectReferences(editor);
  if (!n) codeNote(editor, at.line, 'Not a variable or function of this handler. (Nucleus\'s own names can\'t be renamed.)', { mood: 'info' });
  else codeNote(editor, at.line, justFind ? `${n} use${n === 1 ? '' : 's'}, all selected.` : `${n} use${n === 1 ? '' : 's'} selected: type the new name, Esc when done.`, { mood: 'info' });
  editor.focus();
}

/** F12: the handler's own function or variable, `Game.X` where it's set, `Context.Options["key"]` its AddOption. */
function goToDefinition() {
  const text = editor.getValue();
  const at = editor.getCursor();
  const d = definitionAt(text, editor.indexFromPos(at));
  if (!d) {
    codeNote(editor, at.line, 'Nothing in this handler defines this. For Nucleus\'s own names, hover for the docs.', { mood: 'info' });
    return;
  }
  editor.setSelection(editor.posFromIndex(d.start), editor.posFromIndex(d.end));
  editor.scrollIntoView({ from: editor.posFromIndex(d.start), to: editor.posFromIndex(d.end) }, 120);
  editor.focus();
}

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
// Try it and Test all (tryit-ui.ts)

const tryIt = initTryIt({
  editor,
  plugins: simPlugins,
  packageFiles: () => packageFiles,
  simple: () => mode === 'simple',
  selectTab,
  used: use,
  tried: (t) => {
    doc.tried = { of: versionOf(withoutCredit(editor.getValue())), ...t };
    saveDocMeta();
  },
});
const runSim = tryIt.run;
const simOptions = tryIt.options;

// Debug: step through the run (debugui.ts), in Try it.
const debug = mountDebugger({
  editor,
  root: $('#dbg'),
  panel: $('#panel-simulate'),
  options: simOptions,
  showTryIt: () => selectTab('simulate'),
  showCode: () => {
    if (viewMode !== 'code') setViewMode('code');
  },
  rerun: runSim,
  used: () => use('debugger'),
});
$('#sim-debug').addEventListener('click', () => debug.start());

// ---------------------------------------------------------------------------
// Docs (docs-ui.ts)

const docs = initDocs({ selectTab, handlerHash: () => doc.hash, used: use, pageUrl: (p) => siteUrl(`docs/${p}/`) });

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
  $('#probes').innerHTML = `<div class="probe-intro">
      <p><strong>What this is.</strong> Nucleus Co-op runs handlers with an old JavaScript engine, Jint 2.11.58. It understands less than a modern browser, and some things work differently there (<code>let</code> and <code>const</code>, arrow functions, how .NET calls like <code>Path.Combine</code> take their arguments). Each probe is a tiny handler that tests one of those things, and we ran every one in that real engine, set up the way Nucleus sets it up.</p>
      <p><strong>Why it matters.</strong> Check and Try it are built on these results. When Check says "Nucleus can't load this", or Try it shows what a line does, a probe here is the proof. Right now Check agrees with the real engine on <strong>${agree} of ${PROBES.length}</strong> probes, and Try it on <strong>${simAgree} of ${PROBES.length}</strong>.</p>
      <p><strong>What you can use it for.</strong> Not sure whether Nucleus accepts some JavaScript? Find the probe for it below (or type its name in Open, Ctrl+P), open it to see the exact code, and the Jint column says what the real engine did. Missing one you need? <button class="link" type="button" id="probe-ask">Ask for a probe</button>.</p>
    </div>
    <details class="probe-cols"><summary>What the columns mean</summary><p class="small"><strong>Jint 2.11.58</strong>: what the real engine did (runs, loads, doesn't load, or Game.Play throws). <strong>Linter</strong>: what Check finds in it, live in this page. <strong>Agree</strong>: ✓ when Check reports an error exactly when the engine fails. <strong>Try it</strong>: what Try it predicts, with ✓ when it matches the engine.</p></details>
    <div class="table-wrap"><table class="probes"><thead><tr><th>Probe</th><th>Jint 2.11.58</th><th>Linter</th><th>Agree</th><th>Try it</th></tr></thead><tbody>${rows.join('')}</tbody></table></div>`;
  $('#count-probes').textContent = `${agree}/${PROBES.length}`;
  $('#count-probes').title = `Linter agrees with Jint on ${agree} of ${PROBES.length} probes; Try it on ${simAgree}`;
  $('#probe-ask')?.addEventListener('click', () => openReport(feedbackUrl({ title: 'Probe request: ' })));
  $('#probes').querySelectorAll<HTMLButtonElement>('[data-probe]').forEach((b) =>
    b.addEventListener('click', () => openProbe(Number(b.dataset.probe))),
  );
}
let probesRendered = false;
$('#count-probes').textContent = String(PROBES.length); // becomes "agree/total" once the tab is opened

// ---------------------------------------------------------------------------
// Documents: what's in the editor, where it came from, shareable #links

interface DocMeta {
  name: string;
  kind: 'draft' | 'example' | 'template' | 'hub' | 'probe' | 'new';
  hash?: string;
  hubIndex?: number;
  /** The Hub version's GUID, for guid-changed. */
  published?: { version?: number; guid?: string };
  /** For the credit lines (credit.ts): Fix with AI changes kept, and the last Try it (of which version). */
  ai?: { direct: number; reviewed: number };
  tried?: { of: string; players: number; loaded: boolean };
  /** A file in its package was added, changed, renamed or removed here: its name link would open the original files. */
  filesEdited?: boolean;
}
const META_KEY = 'nucleus-workbench-doc';
let doc: DocMeta = { name: 'Untitled handler', kind: 'draft' };
let loadedText = editor.getValue();
try {
  const saved = JSON.parse(localStorage.getItem(META_KEY) || 'null');
  if (saved?.name) doc = saved;
  else if (initial === STARTER) doc = { name: 'My Game.js', kind: 'new' };
  loadedText = localStorage.getItem(META_KEY + '-base') ?? editor.getValue();
} catch {
  /* storage unavailable */
}

function renderDocHead() {
  $('#doc-name').textContent = doc.name;
  $('#doc-edited').hidden = editor.getValue() === loadedText || doc.kind === 'draft' || doc.kind === 'new';
  const h = doc.kind === 'hub' && doc.hubIndex !== undefined ? HUB_EXAMPLES.handlers[doc.hubIndex] : undefined;
  const parts: string[] = [];
  if (h) {
    // Our copy of the Hub is a day old at most (the daily sync): say from when, and where a newer one would be.
    const copied = HUB_EXAMPLES.takenAt ? new Date(HUB_EXAMPLES.takenAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '';
    const asOf = copied ? `<span title="${esc(`The workbench's copy of the Hub, from ${copied}. A newer version may be on the Hub page.`)}">as of ${esc(copied)}</span>` : '';
    parts.push(`<span>v${h.version} by ${esc(h.owner)}</span>${asOf}${h.unverified ? '<span class="chip warning" title="The Hub hasn\'t verified this version yet">not verified</span>' : '<span class="chip ok">verified on the Hub</span>'}<a href="${esc(h.url)}" target="_blank" rel="noopener">Hub page</a>`);
  }
  else if (doc.kind === 'probe') parts.push('<span>Engine probe</span>');
  else if (doc.kind === 'template') parts.push(`<span>Engine template from the <a href="https://github.com/SplitScreen-Me/splitscreenme-discordbot/tree/main/src/handler_templates" target="_blank" rel="noopener">Discord bot</a></span>`);
  if (packageFiles.length) {
    const list = packageFiles.map((f) => `${f.name} (${fileSize(sizeOf(f))}${f.remote ? ', in the Hub package' : ''})`).join('\n');
    parts.push(`<button type="button" class="chip chip-btn" id="files-open" aria-haspopup="dialog" title="${esc('Saved with the handler:\n' + list)}">+ ${packageFiles.length} file${packageFiles.length === 1 ? '' : 's'}</button>`);
  }
  $('#doc-meta').innerHTML = parts.join('');
}

/**
 * Copy link: an unchanged example links by name (#hub-…); anything else is packed into the link
 * (#share-…). With text selected, only the selection is shared.
 */
async function copyLink(trigger?: HTMLElement | null) {
  const selection = editor.getSelection();
  const edited = editor.getValue() !== loadedText || !!doc.filesEdited;
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
    // A link carries the code only: say so when the handler has package files, so nobody expects them.
    const n = packageFiles.length;
    if (n && !selection) notice(`The link has the code only: its ${n} package file${n === 1 ? '' : 's'} ${n === 1 ? "isn't" : "aren't"} in it. To share those too, Save ▾ › .zip and send the file.`, { kind: 'info' });
  } catch {
    notice(`Couldn't copy. The link is in the address bar.${long}`, { kind: 'warning' });
    history.replaceState(null, '', '#' + id);
  }
}

function setPackageFiles(files: PackageFile[]) {
  packageFiles = files;
  renderDocHead();
  pkgUI?.render(); // the Files panel and its count, if it's open
}
/** A handler saved from here starts with the credit lines: folded away when it's opened again. */
function foldCredit() {
  if (hasCredit(editor.getValue())) editor.foldCode(CodeMirror.Pos(0, 0), { rangeFinder: lineCommentFold, widget: '⋯ made with the workbench' });
}
const saveDocMeta = () => { try { localStorage.setItem(META_KEY, JSON.stringify(doc)); } catch { /* not kept */ } };
/** A short fingerprint of a version (credit lines: was Try it run on this one?). */
function versionOf(text: string): string {
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) | 0;
  return `${text.length}:${(h >>> 0).toString(36)}`;
}
const CREDIT_OFF = 'nucleus-workbench-credit-off';
const creditOn = () => { try { return localStorage.getItem(CREDIT_OFF) !== '1'; } catch { return true; } };
/** The handler as it leaves the workbench: with the credit lines when it was made or changed here (credit.ts). */
function exportText(): string {
  const text = editor.getValue();
  const base = withoutCredit(text);
  const c = counts(base, lintCtx());
  const tried = doc.tried && doc.tried.of === versionOf(base) ? { players: doc.tried.players, loaded: doc.tried.loaded } : undefined;
  const out = withCredit(text, { errors: c.errors, warnings: c.warnings, tried, ai: doc.ai ?? { direct: 0, reviewed: 0 } }, { created: doc.kind === 'new', edited: base !== withoutCredit(loadedText), on: creditOn() });
  if (out !== text) {
    let told = false;
    try { told = localStorage.getItem('nucleus-workbench-credit-told') === '1'; localStorage.setItem('nucleus-workbench-credit-told', '1'); } catch { /* ignore */ }
    // The switch is an Advanced-mode setting: outside it, say so and open the tab with Advanced mode.
    const adv = mode === 'dev';
    if (!told) notice(`Added a few comment lines at the top: made with the workbench (with a link), and what was checked, simulated and done with AI here. ${adv ? 'Turn this off in Settings › Feedback and privacy.' : 'In Advanced mode, Settings › Feedback and privacy can turn this off.'}`, { kind: 'info', action: { label: 'Settings', run: () => settings.open(adv ? 'feedback' : 'advanced') } });
  }
  return out;
}

function loadSource(src: string, meta: DocMeta, opts: { fresh?: boolean } = {}) {
  // One handler per tab: an example, Hub handler or link that's already open switches to its tab; anything else opens
  // in a new tab, unless this one is empty (nothing typed in a new handler).
  if (tabsReady) {
    const same = meta.hash && !opts.fresh ? tabs.find((x) => (x.id === activeTab ? doc.hash : x.meta.hash) === meta.hash) : undefined;
    if (same) {
      if (same.id !== activeTab) switchTab(same.id);
      // Changed since it was opened: offer the original too, in its own tab.
      if (editor.getValue() !== loadedText) notice(`${meta.name} is already open, with your changes.`, { kind: 'info', action: { label: 'Open a fresh copy', run: () => loadSource(src, meta, { fresh: true }) } });
      else announce(`${meta.name} is already open: switched to its tab.`);
      return;
    }
    if (editor.getValue().trim()) openTab();
  }
  clearNotice(); // it was about the handler before
  document.documentElement.classList.remove('busy'); // a Test all of the last handler no longer runs
  setNoneOpen(false);
  packageFiles = [];
  storeFiles([]);
  pkgUI?.reset();
  editor.setValue(src);
  editor.clearHistory();
  foldCredit();
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
  $('#ai-box').hidden = true; // the fix box (aifix-ui.ts) shows an older version
  selectTab('problems');
  editor.focus();
  if (tabsReady) (saveTabs(), renderTabs());
}
editor.on('change', () => renderDocHead());

// ---------------------------------------------------------------------------
// Open handlers: tabs above the code. Each keeps its own code (and undo history), where it came from and its
// package's other files. The open one lives in the usual draft keys; the others in their own keys.
interface Tab { id: string; meta: DocMeta; base: string; text: string; files: PackageFile[]; cm?: any; counts?: { e: number; w: number }; folder?: GameFolder | null }
const TABS_KEY = 'nucleus-workbench-tabs';
const textKey = (id: string) => `${STORE_KEY}:${id}`;
const filesKey = (id: string) => `nucleus-workbench-files:${id}`;
let tabs: Tab[] = [];
let activeTab = '';
let tabsReady = false;
let lastClosed: { tab: Tab; index: number } | null = null;
// Every handler closed: the tab strip is empty and the work area says so, with ways on (New, Open, Learn, Undo).
// Underneath there is still one blank tab, which the next handler opened fills (loadSource reuses an empty tab).
const NONE_KEY = 'nucleus-workbench-none-open';
let noneOpen = false;
// Getting started shows the home page over open handlers too (they stay in their tabs): Esc, a tab or any of its
// buttons goes back.
let homeOver = false;
function showHome(v: boolean) {
  if (homeOver === v || (v && noneOpen)) return;
  homeOver = v;
  document.documentElement.classList.toggle('no-handler', v || noneOpen);
  const box = document.getElementById('no-handler')!;
  box.hidden = !(v || noneOpen);
  box.querySelector<HTMLElement>('[data-nh=back]')!.hidden = !v;
  $('#nh-title').textContent = v ? 'Getting started' : 'No handler open';
  if (v) box.querySelector<HTMLElement>('[data-nh=new]')?.focus();
  else editor.refresh();
}
function setNoneOpen(v: boolean) {
  if (noneOpen === v) return;
  if (homeOver) showHome(false);
  noneOpen = v;
  document.documentElement.classList.toggle('no-handler', v);
  $('#nh-title').textContent = firstVisit ? 'Welcome to the workbench' : 'No handler open';
  try { if (v) localStorage.setItem(NONE_KEY, '1'); else localStorage.removeItem(NONE_KEY); } catch { /* ignore */ }
  const box = document.getElementById('no-handler');
  if (box) {
    box.hidden = !v;
    const undo = box.querySelector<HTMLElement>('[data-nh=undo]');
    if (undo) { undo.hidden = !lastClosed; undo.textContent = lastClosed ? `Reopen ${lastClosed.tab.meta.name}` : 'Reopen'; }
    // The Open key as it is now (Settings › Keyboard can change it).
    const kbd = box.querySelector<HTMLElement>('[data-nh=open] kbd');
    if (kbd) kbd.textContent = labelOf('open');
  }
  if (tabsReady) renderTabs();
  if (v) box?.querySelector<HTMLElement>('[data-nh=new]')?.focus();
}
const newTabId = () => Math.random().toString(36).slice(2, 9);
const activeT = () => tabs.find((x) => x.id === activeTab)!;
const countsOf = (list: Diagnostic[]) => ({ e: list.filter((d) => d.severity === 'error').length, w: list.filter((d) => d.severity === 'warning').length });
function saveTabs() {
  try {
    localStorage.setItem(TABS_KEY, JSON.stringify({ active: activeTab, tabs: tabs.map((x) => ({ id: x.id, meta: x.id === activeTab ? doc : x.meta, base: x.id === activeTab ? loadedText : x.base, counts: x.counts })) }));
  } catch { /* storage full or off: the tabs live for this visit */ }
}
/** Puts the open handler's state into its tab (before switching away). */
function stashTab() {
  const x = activeT();
  Object.assign(x, { meta: doc, base: loadedText, text: editor.getValue(), files: packageFiles, cm: editor.getDoc(), counts: countsOf(current), folder: gameFolder });
  try { localStorage.setItem(textKey(x.id), x.text); } catch { /* ignore */ }
  storeFiles(x.files, filesKey(x.id));
}
function switchTab(id: string) {
  if (id === activeTab || !tabs.some((x) => x.id === id)) return;
  stashTab();
  activeTab = id;
  const x = activeT();
  doc = x.meta;
  loadedText = x.base;
  packageFiles = x.files;
  storeFiles(packageFiles);
  try {
    localStorage.setItem(META_KEY, JSON.stringify(doc));
    localStorage.setItem(META_KEY + '-base', loadedText);
    localStorage.setItem(STORE_KEY, x.text);
  } catch { /* ignore */ }
  editor.swapDoc(x.cm ?? CodeMirror.Doc(x.text, 'javascript'));
  x.cm = editor.getDoc();
  gameFolder = x.folder ?? null;
  afterFolderChange();
  pkgUI?.reset();
  if (doc.hash) history.replaceState(null, '', '#' + doc.hash);
  else if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  clearNotice();
  $('#ai-box').hidden = true; // the fix box (aifix-ui.ts) shows an older version
  (CodeMirror as any).signal(editor, 'change', editor, { origin: '+swap', from: { line: 0, ch: 0 }, to: { line: 0, ch: 0 }, text: [''], removed: [''] });
  (editor as any).performLint();
  renderDocHead();
  saveTabs();
  renderTabs();
  if (!$('#panel-simulate').hidden) runSim();
  editor.focus();
}
/** A new, empty tab (the caller fills it, e.g. loadSource). */
function openTab() {
  if (noneOpen) { setNoneOpen(false); return; }
  stashTab();
  const x: Tab = { id: newTabId(), meta: { name: 'Untitled handler', kind: 'new' }, base: '', text: '', files: [] };
  tabs.splice(tabs.findIndex((y) => y.id === activeTab) + 1, 0, x);
  switchTab(x.id);
}
function closeTab(id: string) {
  if (noneOpen) return;
  // The last handler: a blank tab takes its place underneath, and the work area shows that nothing is open.
  const last = tabs.length < 2;
  if (last) openTab();
  const i = tabs.findIndex((x) => x.id === id);
  if (id === activeTab) {
    stashTab();
    switchTab(tabs[i + 1]?.id ?? tabs[i - 1].id);
  }
  const [gone] = tabs.splice(i, 1);
  lastClosed = { tab: gone, index: i };
  try { localStorage.removeItem(textKey(gone.id)); localStorage.removeItem(filesKey(gone.id)); } catch { /* ignore */ }
  saveTabs();
  renderTabs();
  if (last) { setNoneOpen(true); return; }
  notice(`Closed ${gone.meta.name}.`, { kind: 'info', action: { label: 'Undo', run: reopenClosed } });
}
function reopenClosed() {
  if (!lastClosed) return;
  const { tab, index } = lastClosed;
  lastClosed = null;
  // From "nothing open": the blank tab underneath goes.
  const blank = noneOpen ? activeTab : null;
  if (blank) setNoneOpen(false);
  tabs.splice(Math.min(index, tabs.length), 0, tab);
  try { localStorage.setItem(textKey(tab.id), tab.text); } catch { /* ignore */ }
  storeFiles(tab.files, filesKey(tab.id));
  switchTab(tab.id);
  if (blank) {
    tabs = tabs.filter((x) => x.id !== blank);
    try { localStorage.removeItem(textKey(blank)); localStorage.removeItem(filesKey(blank)); } catch { /* ignore */ }
    saveTabs();
    renderTabs();
  }
  clearNotice();
}
function renderTabs() {
  const live = countsOf(current);
  const allBtn = document.getElementById('tab-all');
  if (allBtn) allBtn.hidden = tabs.length < 2; // the list of open handlers: there as soon as there's more than one
  requestAnimationFrame(() => document.querySelector(`#tab-${activeTab}`)?.scrollIntoView({ block: 'nearest', inline: 'nearest' }));
  const dot = (c?: { e: number; w: number }) => (!c ? '' : c.e ? ' e' : c.w ? ' w' : ' ok');
  const state = (c?: { e: number; w: number }) => (!c ? '' : c.e ? `, ${c.e} error${c.e === 1 ? '' : 's'}` : c.w ? `, ${c.w} warning${c.w === 1 ? '' : 's'}` : ', ready for Nucleus');
  $('#htabs').innerHTML = noneOpen ? '' : tabs.map((x) => {
    const on = x.id === activeTab, c = on ? live : x.counts, name = on ? doc.name : x.meta.name, files = on ? packageFiles.length : x.files.length;
    // Changed since it was opened (as VS Code shows it: a dot where the close button is, the × on hover).
    const meta = on ? doc : x.meta;
    const edited = meta.kind !== 'draft' && meta.kind !== 'new' && (on ? editor.getValue() !== loadedText : x.text !== x.base);
    return `<span class="htab-w${on ? ' on' : ''}${edited ? ' edited' : ''}" role="presentation"><button type="button" class="htab" role="tab" id="tab-${x.id}" data-tab-id="${x.id}" aria-selected="${on}" tabindex="${on ? 0 : -1}" title="${esc(name)}${files ? ` (with ${files} other file${files === 1 ? '' : 's'})` : ''}"><span class="ht-dot${dot(c)}" aria-hidden="true"></span><span class="ht-name">${esc(name)}</span>${files ? '<span class="ht-pk" aria-hidden="true">pkg</span>' : ''}<span class="sr-only">${esc(state(c))}${edited ? ', edited' : ''}. Delete closes it</span>${edited ? '<span class="ht-ed" aria-hidden="true" title="Edited">●</span>' : ''}<span class="ht-x" data-close="${x.id}" aria-hidden="true" title="Close">×</span></button></span>`;
  }).join('');
}
function initTabs() {
  try {
    const s = JSON.parse(localStorage.getItem(TABS_KEY) || 'null');
    if (s?.tabs?.length) {
      tabs = s.tabs.map((x: { id: string; meta: DocMeta; base: string; counts?: Tab['counts'] }) => ({ id: x.id, meta: x.meta, base: x.base ?? '', counts: x.counts, text: x.id === s.active ? '' : localStorage.getItem(textKey(x.id)) ?? '', files: x.id === s.active ? [] : storedFiles(filesKey(x.id)) }));
      activeTab = tabs.some((x) => x.id === s.active) ? s.active : tabs[0].id;
    }
  } catch { /* ignore */ }
  if (!tabs.length) {
    activeTab = newTabId();
    tabs = [{ id: activeTab, meta: doc, base: loadedText, text: '', files: [] }];
  }
  Object.assign(activeT(), { meta: doc, base: loadedText, files: packageFiles, cm: editor.getDoc() });
  tabsReady = true;
  saveTabs();
  // Nothing was open last time (and nothing is asked for now): keep it that way.
  try { if ((firstVisit || localStorage.getItem(NONE_KEY)) && tabs.length === 1 && !editor.getValue().trim() && !INITIAL_HASH) setNoneOpen(true); else localStorage.removeItem(NONE_KEY); } catch { /* ignore */ }
  document.getElementById('no-handler')?.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLElement>('[data-nh]');
    if (!b) return;
    const what = b.dataset.nh;
    showHome(false);
    if (what === 'new') ($('#new-open') as HTMLButtonElement).click();
    else if (what === 'open') showOpen();
    else if (what === 'learn') openLearn();
    else if (what === 'undo') reopenClosed();
  });
  const strip = $('#htabs');
  strip.addEventListener('click', () => showHome(false), true);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && homeOver && !document.querySelector('dialog[open]')) { e.preventDefault(); showHome(false); editor.focus(); } });
  const all = document.createElement('button');
  all.type = 'button';
  all.id = 'tab-all';
  all.className = 'htab-add htab-all';
  all.setAttribute('aria-haspopup', 'menu');
  all.setAttribute('aria-label', 'All open handlers');
  all.title = 'All open handlers';
  all.innerHTML = '<svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  $('#tab-add').before(all);
  renderTabs(); // after the ▾ exists, so it's shown or hidden from the start
  all.addEventListener('click', () => openMenu(all, 'Open handlers', tabs.map((x) => {
    const on = x.id === activeTab;
    return { label: on ? doc.name : x.meta.name, checked: on, run: () => switchTab(x.id) };
  })));
  // No scroll bar on the tabs: a mouse wheel scrolls them sideways (trackpads already do).
  strip.addEventListener('wheel', (e) => {
    if (strip.scrollWidth <= strip.clientWidth || Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;
    strip.scrollLeft += e.deltaY;
    e.preventDefault();
  }, { passive: false });
  strip.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    const close = t.closest<HTMLElement>('[data-close]');
    if (close) return closeTab(close.dataset.close!);
    const tab = t.closest<HTMLElement>('[data-tab-id]');
    if (tab) switchTab(tab.dataset.tabId!);
  });
  strip.addEventListener('auxclick', (e) => {
    const tab = (e.target as HTMLElement).closest<HTMLElement>('[data-tab-id]');
    if (e.button === 1 && tab) (e.preventDefault(), closeTab(tab.dataset.tabId!));
  });
  strip.addEventListener('keydown', (e) => {
    const i = tabs.findIndex((x) => x.id === activeTab);
    const go = (j: number) => { switchTab(tabs[(j + tabs.length) % tabs.length].id); document.getElementById(`tab-${activeTab}`)?.focus(); };
    if (e.key === 'ArrowRight') (e.preventDefault(), go(i + 1));
    else if (e.key === 'ArrowLeft') (e.preventDefault(), go(i - 1));
    else if (e.key === 'Delete') (e.preventDefault(), closeTab(activeTab));
  });
  // The dot follows Check.
  editor.on('change', () => {
    // The edited dot at once (as VS Code); the counts and saving a moment later.
    if (doc.kind !== 'draft' && doc.kind !== 'new' && !document.querySelector('.htab-w.on.edited')) renderTabs();
    clearTimeout(tabDotTimer); tabDotTimer = window.setTimeout(() => (renderTabs(), saveTabs()), 800); });
}
let tabDotTimer = 0;

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
      const text = f.remote ? null : previewOf(f.data);
      const top = f.name.includes('/');
      return `<details class="pkg-file"><summary><code>${esc(f.name)}</code> <span class="muted">${fileSize(sizeOf(f))}${f.remote ? ' · in the Hub package, not downloaded here' : ''}</span></summary>
        <p class="muted small">${top ? `Installed as <code>${esc(dest(f.name))}</code>` : "At the package's top level: the Hub install keeps only handler.js there, so this file is dropped."}</p>
        ${text !== null ? (() => {
          // Coloured like code when it is code (INI, JSON, XML, JavaScript); plain text stays plain.
          const shown = text.slice(0, 20000), mode = modeFor(f.name);
          return `<pre class="pkg-text${mode ? ' hl cm-s-default' : ''}">${mode ? hlCode(shown, mode) : esc(shown)}${text.length > 20000 ? '\n…' : ''}</pre>`;
        })() : '<p class="muted small">Not a text file (or too big to show).</p>'}</details>`;
    })
    .join('');
  $('#files-body').innerHTML = `<p class="muted">A package (.zip or .nc) is <code>handler.js</code> plus folders. Nucleus installs the folders' contents in the handler's folder, <code>handlers\\${esc(folder)}\\</code>, which is <code>Game.Folder</code>. They're saved with the handler.</p>
    <div class="pkg-file pkg-js"><code>handler.js</code> <span class="muted">the code in the editor</span></div>${rows}`;
  filesDialog.showModal();
}
document.addEventListener('click', (e) => {
  if ((e.target as HTMLElement).closest?.('#files-open')) { if ($('#files-panel').hidden) ($('#files-toggle') as HTMLButtonElement).click(); }
});
$('#files-close').addEventListener('click', () => filesDialog.close());

// A Hub handler's other package files (build.mjs, tools/hub-files.mjs): small ones with their content, big
// ones as placeholders (name and size, and the Hub page with the original package).
async function hubPackageFiles(h: HubExample): Promise<PackageFile[] | null> {
  if (!h.files) return [];
  if (!h.filesData) {
    try {
      const r = await fetch(`${HUB_EXAMPLES.base ?? 'hub/'}${h.id}.files.json`);
      if (!r.ok) throw new Error(String(r.status));
      h.filesData = (await r.json()).files;
    } catch {
      return null;
    }
  }
  return h.filesData!.map((f) => (f.b64 !== undefined ? { name: f.name, data: Uint8Array.from(atob(f.b64), (c) => c.charCodeAt(0)) } : { name: f.name, data: new Uint8Array(0), remote: { size: f.size, url: h.url } }));
}
async function openHub(i: number) {
  const h = HUB_EXAMPLES.handlers[i];
  let files: PackageFile[] | null = [];
  if (h.source === undefined || (h.files && !h.filesData)) {
    // On a slow connection, Nucli spins while the handler downloads.
    const slow = setTimeout(() => notice(`Getting ${h.title}…`, { kind: 'info', mascot: 'n-spin' }), 300);
    try {
      const [src, fl] = await Promise.all([
        h.source !== undefined ? h.source : fetch(`${HUB_EXAMPLES.base ?? 'hub/'}${h.id}.js`).then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.text(); }),
        hubPackageFiles(h),
      ]);
      h.source = src;
      files = fl;
      clearTimeout(slow); clearNotice();
    } catch {
      clearTimeout(slow);
      notice(`Couldn't load ${h.title} from this site. Check your connection.`, { kind: 'error', action: { label: 'Try again', run: () => void openHub(i) } });
      return;
    }
  } else files = await hubPackageFiles(h);
  loadSource(h.source!, { name: h.title, kind: 'hub', hubIndex: i, hash: `hub-${h.id}`, published: { version: h.version, guid: guidOf(h.source!) } });
  // The package's other files, in Files (as an opened .nc): the handler opens either way.
  if (files === null) return notice(`Opened ${h.title}, but its package's other files didn't load. Open it again to retry.`, { kind: 'warning' });
  if (!files.length) return;
  setPackageFiles(files);
  if (!storeFiles(files)) notice(`The ${files.length} other files of the package are too big to keep after a reload: open it from the Hub list again then.`, { kind: 'info' });
}
function openTemplate(id: string) {
  const t = BOT_TEMPLATES.templates.find((x) => x.id === id);
  if (!t) return;
  loadSource(t.source, { name: `${t.name} template`, kind: 'template', hash: `template-${slug(t.id)}` });
}
function openProbe(i: number) {
  const p = PROBES[i];
  loadSource(p.source, { name: `Probe: ${probeTitle(p.name)}`, kind: 'probe', hash: probeHash(p.name) });
}
const probeTitle = (name: string) => name.replace(/\.js$/, '').replace(/^\d+-/, '').replace(/-/g, ' ');

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
    c('Format document', labelOf('format'), 'format indent pretty beautify prettier whitespace tidy', formatDocument, 'Indentation and spacing only: no line moves, no code changes'),
    c('Explain this line', labelOf('explainLine'), 'explain line what does this do help understand', () => setTimeout(() => (editor.focus(), explainAtCursor()), 0), 'What the line at the cursor does, in plain words'),
    c('Fix problems automatically', '', 'fix all repair autofix', click('#fix-all'), 'Every safe automatic fix, with a before/after to review'),
    c('Try it: simulate the handler', labelOf('tryIt'), 'run play simulate try', () => selectTab('simulate')),
    c('Go to line', labelOf('goToLine'), 'go to line number jump column', () => setTimeout(() => showOpen('line'), 0)),
    c('Find', labelOf('find'), 'find search', () => openFind(editor)),
    c('Find and replace', labelOf('replace'), 'replace find search', () => openFind(editor, true)),
    c('Test all combinations', labelOf('testAll'), 'matrix players monitors keyboards test all', () => { selectTab('simulate'); click('#sim-all')(); }),
    c('Debug: step through the handler', 'F5', 'debug debugger step breakpoint trace pause', () => debug.start(), 'Pause on breakpoints, step line by line (and back), see every variable'),
    c('Debug: toggle a breakpoint on this line', 'F9', 'debug breakpoint toggle stop line', () => debug.toggleBreakpoint()),
    c('Check: show the problems', '', 'problems lint errors warnings check', () => selectTab('problems')),
    c('Fold the block at the cursor', labelOf('fold'), 'fold collapse hide block function region', () => (editor.focus(), editor.execCommand('fold'))),
    c('Unfold the block at the cursor', labelOf('unfold'), 'unfold expand show block', () => (editor.focus(), editor.execCommand('unfold'))),
    c('Fold all', labelOf('foldAll'), 'fold all collapse everything', () => (editor.focus(), editor.execCommand('foldAll'))),
    c('Unfold all', labelOf('unfoldAll'), 'unfold all expand everything', () => (editor.focus(), editor.execCommand('unfoldAll'))),
    c('Rename symbol', labelOf('rename'), 'rename variable function refactor all uses', () => renameSymbol(), 'Every use of the variable or function at the cursor selected: type the new name'),
    c('Find all references', labelOf('references'), 'references uses usages find all occurrences', () => renameSymbol(true)),
    c('Select all occurrences', labelOf('selectAll'), 'select all occurrences multi cursor', () => (editor.focus(), editor.execCommand('selectAllOccurrences'))),
    c('Go to definition', labelOf('definition'), 'definition declaration where defined jump go to function variable', () => goToDefinition(), 'Where the function or variable under the cursor is declared, or the option set'),
    c('Go to the next problem', labelOf('nextProblem'), 'next problem error warning', () => stepProblem(1)),
    c('Go to the previous problem', labelOf('prevProblem'), 'previous problem error warning', () => stepProblem(-1)),
    c('Go to line…', 'Ctrl+G', 'line jump goto', () => { editor.focus(); editor.execCommand('jumpToLine'); }),
    c('Show or hide Lines', 'Ctrl+B', 'lines list names insert sidebar', () => lines.toggle(), 'Every option, Context member and enum, click to insert'),
    c('Search the handler API', '', 'api docs reference search', () => { selectTab('api'); ($('#api-q') as HTMLInputElement).focus(); }),
    c('Open examples and Hub handlers', labelOf('open'), 'open examples hub templates switch', () => setTimeout(() => showOpen(), 0)),
    c('Open a file…', '', 'open upload import file zip nc', click('#file-open')),
    c('New handler…', '', 'new create template', () => newDialog.showModal()),
    c('Copy the handler', '', 'copy clipboard code', () => copyCode()),
    c('Copy a link to this handler', '', 'share link url copy', click('[data-code=link]')),
    c('Share the file (.zip and a message to post)', '', 'share file zip attach discord send package', click('[data-code=file]')),
    c('Download for Nucleus (.zip)', 'Ctrl+S', 'save download zip nc package nucleus', click('[data-code=zip]')),
    c('Download the code (.js)', '', 'save download js file', click('[data-code=js]')),
    c('Theme: light', '', 'theme light colour color appearance', () => setThemeMode('light')),
    c('Theme: dark', '', 'theme dark colour color appearance', () => setThemeMode('dark')),
    c('Theme: follow the system', '', 'theme auto system colour color appearance', () => setThemeMode('auto')),
    c('Keyboard shortcuts: see and change them', '', 'keyboard shortcuts keybindings keys rebind remap change hotkeys', () => settings.open('keys')),
    c('Settings', labelOf('settings'), 'settings preferences options font size wrap', () => settings.open()),
    c('Toggle word wrap', labelOf('wordWrap'), 'word wrap long lines wrapping scroll sideways view', () => settings.toggleWrap()),
    c('Theme: pick a look or code colours', '', 'theme look style colours colors code syntax mac alpha v3 custom', () => settings.open('theme')),
    c('Turn Advanced mode on or off', '', 'advanced mode rule details probes', click('#advanced')),
    c('Turn tips on or off', '', 'tips hints help', () => tips.toggle()),
    c('Reset panel sizes', '', 'layout resize panels reset width', () => panels.reset()),
    c("What's new", '', 'changelog changes news updates release notes', () => news.open()),
    c('Keyboard shortcuts', '?', 'help keys shortcuts keybindings', () => helpDialog.showModal()),
    c('Getting started', '', 'new help start intro welcome first', () => ($('#welcome-open') as HTMLButtonElement).click()),
    c('Learn: making your first handler', '', 'tutorial learn lesson course beginner how to start guide teach', () => openLearn()),
    c('Start-up questions: guided or developer, and the layout', '', 'first run beginner developer advanced guided layout rail bar nucli', () => document.dispatchEvent(new CustomEvent('open-firstrun'))),
    c('Help test this beta', '', 'test testing beta feedback checklist tester', () => testGuide.open()),
    c('Move Files to the other side of the code', '', 'files panel left right side move swap', () => announce(`Files is now ${panels.flip('files')} of the code.`)),
    c('Move Lines to the other side of the code', '', 'lines list left right side move swap', () => announce(`Lines is now ${panels.flip('lines')} of the code.`)),
    c('Compare: open this handler in the previous version', '', 'previous old version compare before beta', () => void hasPrevious().then((ok) => (ok ? openInPrevious() : notice('The previous version is only on the published site (GitHub Pages).', { kind: 'info' })))),
    c('Save into Nucleus Co-op (its handlers folder)', 'Ctrl+Alt+S', 'save install nucleus handlers folder copy into', () => void saveToNucleus()),
    c("Link your game's folder (check paths against it)", '', 'game folder install directory exe path link pick', () => void pickFolder()),
    c('Send feedback or report a problem', '', 'feedback bug report issue github wrong problem', () => openReport(feedbackUrl())),
    c('About these tools (start page)', '', 'start page about install vscode extension download home site', () => ((document.querySelector('a.start-link') as HTMLAnchorElement).click())),
    c('Show or hide the dev bar', 'Ctrl+Alt+D', 'dev developer contrast colour', () => devBar.toggle()),
  ];
  if (packageFiles.length) list.splice(16, 0, c("Show the package's files", '', 'package files folder zip nc', openFilesDialog));
  if (!$('#ai-fix').hidden) list.splice(2, 0, c('Fix with AI', '', 'ai claude fix', click('#ai-fix')));
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
  use('format');
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
      meta: `${h.maxPlayers ? `<span class="m" title="Up to ${h.maxPlayers} players">${svgIcon(OI.players, 'mi')}${h.maxPlayers}<span class="sr-only"> players</span></span>` : ''}${h.multiKbm ? `<span class="m" title="Multiple keyboards and mice">${svgIcon(OI.keyboard, 'mi')}<span class="sr-only">multiple keyboards and mice</span></span>` : ''}<span class="m" title="${h.downloads.toLocaleString()} downloads">${svgIcon(OI.downloads, 'mi')}${compact.format(h.downloads)}<span class="sr-only"> downloads</span></span>${h.files ? `<span class="m" title="Its package has ${h.files} other file${h.files === 1 ? '' : 's'}: they open in Files">+ ${h.files} file${h.files === 1 ? '' : 's'}</span>` : ''}`,
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
  // ":" first: go to a line (and column), as in VS Code's Ctrl+G.
  if (raw.trimStart().startsWith(':')) {
    const [ln, col] = raw.trimStart().slice(1).split(/[:,]/).map((x) => Number(x.trim()));
    const lines = editor.lineCount();
    const ok = Number.isFinite(ln) && ln >= 1;
    const line = Math.min(lines, Math.max(1, ln || 1));
    ($('#open-q') as HTMLInputElement).placeholder = '';
    shownEntries = ok
      ? [{ group: 'Go to', title: `Go to line ${line}${col ? `, column ${col}` : ''}`, sub: `The code has ${lines} lines`, icon: OI.command, run: () => { const ch = Math.max(0, (col || 1) - 1); editor.setCursor({ line: line - 1, ch }); editor.scrollIntoView({ line: line - 1, ch }, 120); editor.focus(); } } as OpenEntry]
      : [];
    activeEntry = 0;
    $('#open-body').innerHTML = ok ? '' : `<p class="empty">Type a line number between 1 and ${lines} (or line:column).</p>`;
    if (!ok) return;
  }
  const lineMode = raw.trimStart().startsWith(':');
  const q = lineMode ? '' : (commandMode ? raw.trimStart().slice(1) : raw).trim().toLowerCase();
  const all = lineMode ? shownEntries : commandMode ? commandList() : entries();
  ($('#open-q') as HTMLInputElement).placeholder = commandMode ? 'Type a command: format, fix, try it, theme…' : 'Search examples, Hub handlers, engine probes and actions (> for commands)';
  let shown: OpenEntry[];
  if (lineMode || (commandMode && !q)) shown = all;
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
    'Hub handlers': HUB_EXAMPLES.all ? `Every handler on the Hub as of ${esc(taken)}, most downloaded first. Newer ones may be on the Hub` : `The most downloaded, current version verified, as of ${esc(taken)}`,
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
function showOpen(mode: 'open' | 'commands' | 'line' = 'open') {
  ($('#open-q') as HTMLInputElement).value = mode === 'commands' ? '>' : mode === 'line' ? ':' : '';
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
    await navigator.clipboard.writeText(exportText());
    confirmOn(shareButton(), 'Copied ✓', `Copied ${editor.lineCount()} lines.`);
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
  if (id !== 'api') docs.leaveHash();
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
document.querySelectorAll<HTMLButtonElement>('.pane-head [role=tab]').forEach((t) => t.addEventListener('click', () => {
  selectTab(t.dataset.tab!);
  if (t.dataset.tab === 'api') docs.setHash();
}));

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
    if (narrow()) ($('.switch button[data-view=results]') as HTMLButtonElement)?.click();
    docs.go(`q:${path}`);
  },
  // Hovering a name in Lines while Reference is the open tab (and its search is empty) shows the
  // name's docs there. Suggested by messenils.
  previewReference: (path) => {
    if (narrow() || ($('#panel-api') as HTMLElement).hidden) return false;
    if (($('#api-q') as HTMLInputElement).value.trim()) return false;
    docs.preview(path);
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
      if (narrow()) ($('.switch button[data-view=results]') as HTMLButtonElement)?.click();
      selectTab('simulate');
    },
    share: () => copyLink(),
    tutorial: () => openLearn(),
  },
  targets: {
    lines: () => $('#lines-toggle'),
    new: () => $('#tab-add'),
    examples: () => $('#tab-add'),
    tryit: () => document.querySelector<HTMLElement>('[role=tab][data-tab=simulate]'),
    share: () => shareButton(),
    tutorial: () => document.getElementById('app-menu-open'),
  },
});
$('#tips-reset').addEventListener('click', () => tips.reset());

initA11y();
const settings = initSettings({
  editor,
  hint: () => editor.showHint({ hint: hinter, completeSingle: false, explicit: true }),
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
  const inCode = !!(e.target as HTMLElement | null)?.closest?.('.CodeMirror');
  // Changing a shortcut in Settings: the keys go to the recorder, not here.
  if ((e.target as HTMLElement | null)?.closest?.('.kb-recorder')) return;
  // Kept beside the changeable ones: F1 for the palette; outside the code, Ctrl+K opens and Ctrl+Shift+L shows Lines
  // (in the code those start VS Code's two-key shortcuts and select every match); ? lists the shortcuts.
  if (e.key === 'F1') return void (e.preventDefault(), togglePalette(true));
  if (!inCode && mod && !e.shiftKey && !e.altKey && e.code === 'KeyK') return void (e.preventDefault(), togglePalette(false));
  if (!inCode && mod && e.shiftKey && e.code === 'KeyL') return void (e.preventDefault(), lines.toggle());
  if (e.key === '?' && !(e.target as HTMLElement).closest('.CodeMirror, input, textarea, select')) return void (e.preventDefault(), helpDialog.showModal());
  // The workbench's shortcuts (keybindings.ts), whatever they're set to.
  const id = appActionFor(e);
  if (!id) return;
  e.preventDefault();
  if (id === 'pending') return;
  const run: Record<string, () => void> = {
    palette: () => togglePalette(true),
    open: () => togglePalette(false),
    tryIt: () => selectTab('simulate'),
    testAll: () => (selectTab('simulate'), click('#sim-all')()),
    save: () => void saveAs(),
    saveAs: () => openMenu(shown('#save-more', '.rail [data-rail=save]', '#code-menu-phone') ?? $('#save-more'), 'Save as', saveItems(), document.documentElement.dataset.layout === 'rail' ? 'right' : 'below'),
    saveNucleus: () => void saveToNucleus(),
    lines: () => lines.toggle(),
    settings: () => settings.open(),
    wordWrap: () => settings.toggleWrap(),
    format: () => formatDocument(),
    nextProblem: () => stepProblem(1),
    prevProblem: () => stepProblem(-1),
  };
  run[id]?.();
});
/** The shortcut list (?): from keybindings.ts, so it shows the keys as they're set now. */
function renderHelpKeys() {
  const body = document.querySelector('#help-dialog table.keys tbody');
  if (!body) return;
  const kbd = (k: string) => k.split(' · ').map((alt) => alt.split(' ').map((step) => step.split('+').map((x) => `<kbd>${esc(x)}</kbd>`).join(' ')).join(' then ')).join(' · ');
  const groups: Group[] = ['Workbench', 'Problems', 'Find and navigate', 'Editing', 'Debugger'];
  body.innerHTML = groups
    .map((g) => `<tr class="kh"><th colspan="2">${g}</th></tr>` + ACTIONS.filter((a) => a.group === g).map((a) => {
      const k = a.where === 'fixed' ? a.keys : keyLabel(binding(a.id));
      return `<tr><td>${k ? kbd(k) : '<span class="muted">none</span>'}</td><td>${esc(a.label)}</td></tr>`;
    }).join(''))
    .join('');
}
renderHelpKeys();
initKeySettings($('#sp-keys'));
$('#help-rebind').addEventListener('click', () => (helpDialog.close(), settings.open('keys')));

/** The command palette (">") or Open; pressed again, the same key closes it. */
function togglePalette(commands: boolean) {
  const inCommands = ($('#open-q') as HTMLInputElement).value.trimStart().startsWith('>');
  if (openDialog.open && inCommands === commands) openDialog.close();
  else showOpen(commands ? 'commands' : 'open');
}

// Help test this beta (testplan.ts: BETA). Gone at the full release.
// The previous release at previous/ (beta only; the Pages build adds it from previous.json), to compare: the same
// code opens there through a share link. Its storage is separate, so nothing here is touched.
let previousOk: Promise<boolean> | null = null;
const hasPrevious = () => (previousOk ??= (window as any).claude || !BETA || location.protocol === 'file:'
  ? Promise.resolve(false)
  : fetch('previous/', { method: 'HEAD' }).then((r) => r.ok, () => false));
async function openInPrevious() {
  let id = '';
  try { id = await encodeShare(editor.getValue()); } catch { /* old browser: open it empty */ }
  window.open(`previous/${id ? '#' + id : ''}`, '_blank', 'noopener');
  use('compare-previous');
}
void hasPrevious().then((ok) => { $('#tg-compare').hidden = !ok; });
$('#tg-compare-btn').addEventListener('click', () => void openInPrevious());
const testGuide = initTestGuide($('#test-dialog') as HTMLDialogElement, [$('#test-open')], {
  // The first answers also set up the workbench (instead of Nucli's start-up questions): "I write code" turns on
  // Advanced mode. Both can be changed in Settings.
  answered: (p, first) => {
    if (!first || firstRunDone()) return;
    setMode(p.coding === 'dev' ? 'dev' : 'simple');
    try { localStorage.setItem('nucleus-workbench-firstrun', p.coding === 'dev' ? 'developer' : 'guided'); } catch { /* ignore */ }
    announce(p.coding === 'dev' ? 'Advanced mode is on, since you write code. Settings changes it.' : 'Guided mode, with tips. Advanced mode is in Settings.');
  },
});
// Tasks pinned from the guide float over the workbench while you test (testpins.ts).
initTestPins(() => testGuide.open());
/** A page of the site (start/, learn/, docs/…): next to the workbench on the site, the site's own from the one-file
 *  workbench (the footer's start link says which, build.mjs). */
function siteUrl(sub: string) {
  const start = document.querySelector<HTMLAnchorElement>('a.link.start-link')?.href ?? 'start/';
  // The start link is start/ on the site and start/index.html in the one-file builds.
  return start.replace(/start\/(index\.html)?$/, sub);
}
// Learn (learn/, its own page): the lessons. Next to the start page on the site; the one-file workbench links to
// the site's. A new tab from the menu (the workbench stays as it is); #learn links go there instead.
function learnUrl(lesson?: string) {
  return siteUrl('learn/') + (lesson ? `#${lesson}` : '');
}
function openLearn() {
  window.open(learnUrl(), '_blank', 'noopener');
}

// ---------------------------------------------------------------------------
// Code | Form | Blocks: the options as a form (formview.ts) and the callbacks as if / do steps (blocksview.ts), both
// two-way with the code (the code stays the one source).
type ViewMode = 'code' | 'form' | 'blocks';
const VIEW_KEY = 'nucleus-workbench-view';
let viewMode: ViewMode = (() => { try { const v = localStorage.getItem(VIEW_KEY); return v === 'form' || v === 'blocks' ? v : 'code'; } catch { return 'code'; } })();
let formView: FormView | null = null;
let blocksView: BlocksView | null = null;
const viewHost = (origin: string) => ({
  getText: () => editor.getValue(),
  applyEdits: (edits: TextEdit[]) => editor.operation(() => { for (const e of [...edits].sort((a, z) => z.start - a.start)) editor.replaceRange(e.text, editor.posFromIndex(e.start), editor.posFromIndex(e.end), origin); }),
  jumpTo: (offset: number) => { setViewMode('code'); const pos = editor.posFromIndex(offset); editor.setCursor(pos); editor.scrollIntoView(pos, 80); editor.focus(); },
  diagnostics: () => current,
  diagnosticsText: () => currentText,
  plain: plainFor,
  density: checkDensity,
});
function setViewMode(m: ViewMode) {
  viewMode = m;
  pkgUI?.deselect();
  try { localStorage.setItem(VIEW_KEY, m); } catch { /* ignore */ }
  document.querySelectorAll<HTMLButtonElement>('[data-view-mode]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.viewMode === m)));
  $('#editor').hidden = m !== 'code';
  $('#formview').hidden = m !== 'form';
  $('#blocksview').hidden = m !== 'blocks';
  if (m === 'form') {
    use('form-view');
    formView ??= mountFormView($('#formview'), viewHost('+form'));
    formView.refresh();
  } else if (m === 'blocks') {
    use('blocks-view');
    blocksView ??= mountBlocksView($('#blocksview'), viewHost('+blocks'));
    blocksView.refresh();
  } else {
    editor.refresh();
  }
}
document.querySelectorAll<HTMLButtonElement>('[data-view-mode]').forEach((b) => b.addEventListener('click', () => setViewMode(b.dataset.viewMode as ViewMode)));
editor.on('swapDoc', () => { formView?.refresh(); blocksView?.refresh(); });
setViewMode(viewMode);
pkgUI = initPackageUI({
  editor,
  getFiles: () => packageFiles,
  setFiles: (files) => { packageFiles = files; storeFiles(files); if (!doc.filesEdited) { doc.filesEdited = true; saveDocMeta(); } renderDocHead(); if (tabsReady) saveTabs(); },
  showMain: () => setViewMode(viewMode),
  changed: () => { pkgProblems = pkgUI!.problems(); (editor as any).performLint(); },
  extraSection: gameSection,
  onExtra: (act) => void onGameAction(act),
});

// ---------------------------------------------------------------------------
// Header menus, the side rail and the layout (Settings › General › Layout)

const LAYOUT_KEY = 'nucleus-workbench-layout';
type Layout = 'bar' | 'rail';
const layout = (): Layout => { try { return localStorage.getItem(LAYOUT_KEY) === 'rail' ? 'rail' : 'bar'; } catch { return 'bar'; } };
function setLayout(l: Layout) {
  try { localStorage.setItem(LAYOUT_KEY, l); } catch { /* ignore */ }
  document.documentElement.dataset.layout = l;
  document.querySelectorAll<HTMLInputElement>('input[name="set-layout"]').forEach((r) => (r.checked = r.value === l));
  requestAnimationFrame(() => editor.refresh());
}
setLayout(layout());
document.querySelectorAll<HTMLInputElement>('input[name="set-layout"]').forEach((r) => r.addEventListener('change', () => r.checked && setLayout(r.value as Layout)));
const homeHref = () => (document.querySelector<HTMLAnchorElement>('a.home-link')?.href ?? 'start/');
const addItems = (): MenuItem[] => [
  { label: 'New handler…', run: () => newDialog.showModal() },
  { label: 'Open a file…', hint: '.js .zip .nc', run: () => fileInput.click() },
  { label: 'Examples and Hub handlers', hint: 'Ctrl K', run: () => showOpen() },
  ...(lastClosed ? [{ kind: 'separator' as const, label: '' }, { label: `Reopen ${lastClosed.tab.meta.name}`, run: reopenClosed }] : []),
];
const appItems = (): MenuItem[] => [
  { label: 'Advanced mode', checked: mode === 'dev', run: () => ($('#advanced') as HTMLInputElement).click() },
  { label: 'Tools in a side rail', checked: layout() === 'rail', run: () => setLayout(layout() === 'rail' ? 'bar' : 'rail') },
  { kind: 'separator', label: '' },
  { label: 'Settings…', hint: 'Ctrl ,', run: () => settings.open() },
  { label: 'Keyboard shortcuts', hint: '?', run: () => helpDialog.showModal() },
  { label: "What's new", run: () => ($('#news-open-2') as HTMLButtonElement).click() },
  { label: 'Getting started', run: () => ($('#welcome-open') as HTMLButtonElement).click() },
  { label: 'Send feedback…', run: () => openReport(feedbackUrl()) },
  { kind: 'separator', label: '' },
  { label: '⌂ Home: about these tools', run: () => (location.href = homeHref()) },
  { label: '📘 Learn: making your first handler', run: () => openLearn() },
  ...(document.getElementById('test-open') ? [{ label: '🧪 Help test this beta', run: () => testGuide.open() }] : []),
];
$('#tab-add').addEventListener('click', () => openMenu($('#tab-add'), 'New or open', addItems()));
$('#app-menu-open').addEventListener('click', () => openMenu($('#app-menu-open'), 'Menu', appItems()));
$('#code-menu-phone').addEventListener('click', () => openMenu($('#code-menu-phone'), 'Save or share', [...saveItems(), { label: '', kind: 'separator' }, { label: 'Share…', run: openCodeDialog }]));
$('#doc-switch').addEventListener('click', () => openMenu($('#doc-switch'), 'Open handlers', [
  { kind: 'heading', label: 'Open handlers' },
  ...tabs.map((x) => ({ label: x.id === activeTab ? doc.name : x.meta.name, checked: x.id === activeTab, run: () => switchTab(x.id) })),
  ...(!noneOpen ? [{ label: `Close ${doc.name}`, run: () => closeTab(activeTab) }] : []),
  { kind: 'separator', label: '' },
  ...addItems(),
]));
// The side rail: icons only (the default), or with labels. Remembered in this browser.
{
  const KEY = 'nucleus-workbench-rail-open';
  const btn = $('#rail-toggle');
  const set = (open: boolean, save = true) => {
    document.documentElement.toggleAttribute('data-rail-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Hide the labels in the sidebar' : 'Show labels in the sidebar');
    btn.title = open ? 'Hide labels' : 'Show labels';
    if (save) try { localStorage.setItem(KEY, open ? '1' : '0'); } catch { /* not kept */ }
    requestAnimationFrame(() => editor.refresh());
  };
  let open = false;
  try { open = localStorage.getItem(KEY) === '1'; } catch { /* default */ }
  set(open, false);
  btn.addEventListener('click', () => set(!document.documentElement.hasAttribute('data-rail-open')));
}
document.querySelectorAll<HTMLElement>('.rail [data-rail]').forEach((b) => b.addEventListener('click', (e) => {
  const act = b.dataset.rail;
  if (act === 'add') openMenu(b, 'New or open', addItems(), 'right');
  else if (act === 'menu') openMenu(b, 'Menu', appItems(), 'right');
  else if (act === 'lines') lines.toggle();
  else if (act === 'save') { if ((e as MouseEvent).shiftKey) openMenu(b, 'Save as', saveItems(), 'right'); else void saveAs(undefined, b); }
  else if (act === 'share') openCodeDialog();
  else if (act === 'test') testGuide.open();
  else return; // Home is a link
  e.preventDefault();
}));
{
  const rs = document.querySelector<HTMLElement>('.rail [data-rail=save]');
  if (rs) {
    rs.setAttribute('aria-label', 'Save the handler (Shift+click or right-click: Save as)');
    rs.addEventListener('contextmenu', (e) => { e.preventDefault(); openMenu(rs, 'Save as', saveItems(), 'right'); });
    let press = 0;
    rs.addEventListener('pointerdown', (e) => { if (e.pointerType === 'touch') press = window.setTimeout(() => { press = -1; openMenu(rs, 'Save as', saveItems(), 'right'); }, 550); });
    rs.addEventListener('pointerup', () => clearTimeout(press));
    rs.addEventListener('click', (e) => { if (press === -1) { e.stopImmediatePropagation(); e.preventDefault(); press = 0; } }, true);
  }
}
// Ctrl+Shift+[ and ] go to the previous / next open handler; Alt+W closes the open one.
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.code === 'BracketLeft' || e.code === 'BracketRight')) {
    e.preventDefault();
    const i = tabs.findIndex((x) => x.id === activeTab);
    switchTab(tabs[(i + (e.code === 'BracketRight' ? 1 : -1) + tabs.length) % tabs.length].id);
  } else if (e.altKey && !e.ctrlKey && e.code === 'KeyW' && !noneOpen) {
    e.preventDefault();
    closeTab(activeTab);
  }
});

// The common shortcuts, on hover or keyboard focus of the buttons they belong to (both modes).
initKeyHints([
  { el: document.getElementById('tab-add'), what: 'New, open a file or an example', keys: 'Ctrl K' },
  { el: document.getElementById('app-menu-open'), what: 'Settings, Advanced mode and help', keys: 'Ctrl ,' },
  ...[...document.querySelectorAll<HTMLElement>('.rail [data-rail]')].map((b) => ({ el: b, what: b.getAttribute('aria-label') ?? '', keys: ({ lines: 'Ctrl B', save: 'Ctrl S', add: 'Ctrl K', menu: 'Ctrl ,' } as Record<string, string>)[b.dataset.rail!] ?? '' })),
  { el: document.getElementById('lines-toggle'), what: 'Show or hide Lines', keys: 'Ctrl B' },
  { el: document.getElementById('code-menu-open'), what: 'Save', keys: 'Ctrl S' },
  { el: document.getElementById('save-more'), what: 'Save as…', keys: 'Ctrl Shift S' },
  { el: document.querySelector<HTMLElement>('[role=tab][data-tab=simulate]'), what: 'Try it', keys: 'Ctrl Enter' },
]);

{
  const sel = $('#set-density') as HTMLSelectElement;
  sel.value = checkDensity();
  sel.addEventListener('change', () => {
    try { localStorage.setItem(DENSITY_KEY, sel.value); } catch { /* private mode */ }
    (editor as any).performLint();
    formView?.refresh();
  });
}
// Feedback (feedback.ts): votes on tips and Claude's docs, anonymous counts. A 👎 on a doc points at the issue link.
countVisit(); // one anonymous "visit" count, with the site and ?ref= it came from (when sharing counts is on)
wireVotes((kind, _id, v, el) => {
  if (kind === 'doc' && v === 'down') el.closest('.dc-check')?.querySelector<HTMLElement>('a')?.focus();
  announce(v ? (v === 'up' ? 'Thanks: counted as helpful.' : 'Thanks: counted as not helpful.') : 'Vote taken back.');
});
{
  const box = $('#set-feedback') as HTMLInputElement, note = $('#set-feedback-note');
  const sync = () => {
    box.checked = feedbackOn();
    box.disabled = !feedbackAvailable() || feedbackBlockedByBrowser();
    note.hidden = !box.disabled;
    note.textContent = !feedbackAvailable() ? 'Sending isn\'t switched on in this copy of the workbench yet, so nothing is sent, whatever this is set to. Your votes are kept in this browser.' : 'Off, because your browser asks sites not to track you (Do Not Track or Global Privacy Control): nothing is sent.';
  };
  box.addEventListener('change', () => (setFeedback(box.checked), sync()));
  sync();
  const totals = totalsUrl();
  if (totals) { ($('#set-feedback-totals-link') as HTMLAnchorElement).href = totals; $('#set-feedback-totals').hidden = false; }
}

{
  const box = $('#set-credit') as HTMLInputElement;
  box.checked = creditOn();
  box.addEventListener('change', () => { try { box.checked ? localStorage.removeItem(CREDIT_OFF) : localStorage.setItem(CREDIT_OFF, '1'); } catch { /* not kept */ } });
}

$('#set-build').textContent = `Build ${BUILD.bench ?? '?'}`;
// Settings › Updates and backup: export and import the settings (settingsio.ts).
$('#set-export').addEventListener('click', async () => {
  const msg = $('#set-io-msg');
  try {
    if (!downloads) throw new Error('no downloads');
    await downloads.save({ filename: 'nucleus-workbench-settings.json', data: new TextEncoder().encode(exportSettings()) });
    msg.textContent = 'Saved nucleus-workbench-settings.json.';
  } catch (e: any) {
    if (e?.code === 'declined') return;
    try { await navigator.clipboard.writeText(exportSettings()); msg.textContent = "Couldn't save a file here, so the settings were copied: paste them into a .json file."; }
    catch { msg.textContent = "Couldn't save or copy the settings in this browser."; }
  }
});
$('#set-import').addEventListener('click', () => ($('#set-import-file') as HTMLInputElement).click());
$('#set-import-file').addEventListener('change', async () => {
  const input = $('#set-import-file') as HTMLInputElement;
  const file = input.files?.[0];
  input.value = '';
  if (!file) return;
  const msg = $('#set-io-msg');
  try {
    const n = importSettings(await file.text());
    msg.textContent = n ? `Imported ${n} setting${n === 1 ? '' : 's'}. Reloading to apply them…` : 'Nothing to import: the file has no settings this version knows.';
    if (n) setTimeout(() => location.reload(), 900);
  } catch (e: any) {
    msg.textContent = e?.message ?? "Couldn't read that file.";
  }
});
$('#build-info').textContent = `Linter and API from splitscreenme-vscode @ ${BUILD.core} · Nucleus @ ${BUILD.nucleus ?? '?'} · Jint ${BUILD.jint ?? '2.11.58'}`;

// ---------------------------------------------------------------------------
// Fix with AI and Fix all (aifix-ui.ts)

initFixes({
  editor,
  lintCtx,
  openAiSettings: () => settings.open('ai'),
  used: use,
  aiKept: (kind, d) => {
    doc.ai = doc.ai ?? { direct: 0, reviewed: 0 };
    doc.ai[kind] = Math.max(0, doc.ai[kind] + d);
    saveDocMeta();
  },
});

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

function setView(v: 'code' | 'results') {
  $('#main').dataset.view = v;
  document.querySelectorAll<HTMLButtonElement>('.switch button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.view === v)));
  if (v === 'code') editor.refresh();
}
document.querySelectorAll<HTMLButtonElement>('.switch button').forEach((b) => b.addEventListener('click', () => setView(b.dataset.view as 'code' | 'results')));
onNarrowChange(() => editor.refresh());

// ---------------------------------------------------------------------------
// Open a file from the computer (picker or drag & drop): .js, or a .zip/.nc package (fileopen-ui.ts)

const fileInput = initFileOpen({ loadSource, setPackageFiles });

// ---------------------------------------------------------------------------
// Save for Nucleus: a .zip with handler.js that Nucleus' "Extract handler" installs (the file name: savefile.ts)

let downloads: Downloads | null = null;
void pageDownloads().then((d) => {
  downloads = d;
  if (d) $('#save').hidden = false;
});
const handlerFileName = () => saveFileName(editor.getValue(), doc.name);
// "Save for Nucleus" in the header opens the same Save or copy dialog as the button next to the code.
$('#save').addEventListener('click', () => void saveAs());

// ---------------------------------------------------------------------------
// Start-up: #links, first-visit welcome, last tab

// What a #link opens is links.ts (pure, tested in tools/links.test.mjs); here it's done. A moved link opens the new
// place, puts the new address in the address bar and says so once.
function followMoved(h: string): string {
  const { to, why } = followMovedLink(h);
  if (why === undefined) return h;
  try {
    history.replaceState(history.state, '', `${location.pathname}${location.search}#${to}`);
  } catch {
    /* ignore */
  }
  setTimeout(() => notice(movedNote(why), { kind: 'info' }), 0);
  return to;
}
const linkCatalog = (): LinkCatalog => ({
  hub: HUB_EXAMPLES.handlers.map((x) => x.id),
  probes: PROBES.map((p) => p.name),
  packages: EXAMPLE_PACKAGES.map((e) => e.id),
  templates: BOT_TEMPLATES.templates.map((t) => t.id),
});
const dropHash = () => {
  try {
    history.replaceState(null, '', location.pathname + location.search);
  } catch {
    /* ignore */
  }
};
function openFromHash(): boolean {
  const h = followMoved(decodeURIComponent(location.hash.slice(1)));
  const t = routeLink(h, linkCatalog());
  switch (t.kind) {
    case 'none':
      return false;
    case 'share':
      decodeShare(t.hash)
        .then((src) => {
          loadSource(src, { name: 'Shared handler', kind: 'example', hash: t.hash });
          if (narrow()) setView('code'); // after the async load, which shows the results
        })
        .catch(() => notice('This share link is damaged or incomplete. Ask for it again, or for the file.', { kind: 'error' }));
      return true;
    case 'whats-new':
      // The link in the Discord update post: the workbench, with What's new open.
      news.open();
      dropHash();
      return false;
    case 'docs':
      docs.openHash(t.hash);
      return false; // opens no handler: the draft stays
    case 'learn':
      // #learn: the lessons moved to their own page (learn/); old links lead there.
      location.replace(learnUrl(t.lesson));
      return true;
    case 'dev':
      // #dev shows the dev bar for this page load (like ?env=dev in lonnsinnplassering) and opens nothing.
      devBar.show();
      dropHash();
      return false;
    case 'hub':
      return void openHub(t.index), true;
    case 'probe':
      return openProbe(t.index), true;
    case 'package':
      return openExamplePackage(t.id), true;
    case 'example-mistakes':
      return loadSource(BUGGY, { name: 'Handler with common mistakes', kind: 'example', hash: h }), true;
    case 'template':
      return openTemplate(t.id), true;
  }
  // Not here (any more): say what it was and show the way, never a dead end.
  const n = unknownNote(t)!;
  const run = n.action.to === 'hub' ? () => window.open(n.action.url, '_blank', 'noopener') : n.action.to === 'probes' ? () => selectTab('probes') : () => showOpen();
  notice(n.text, { kind: 'info', action: { label: n.action.label, run } });
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
// What feedback forms say about the open handler: its name and where it came from, a link only to an unedited example
// or Hub handler, never the code itself.
setReportState(() => ({
  handler: { name: doc.name, kind: doc.kind === 'draft' || doc.kind === 'new' ? 'own code, not included' : doc.kind, link: doc.hash && editor.getValue() === loadedText ? `${location.origin}${location.pathname}#${doc.hash}` : undefined },
  view: viewMode,
}));
// The very first visit (not someone who has used the workbench before): Nucli's two questions.
const firstRun = initFirstRun($('#firstrun-dialog') as HTMLDialogElement, {
  mode: () => mode,
  setMode,
  layout,
  setLayout,
  done: (exp) => {
    if (exp === 'developer') {
      // "I write code" starts compact: no tip bar (a click away in Settings), and a home page without the intro.
      tips.set(false);
      try {
        localStorage.setItem(WELCOME_KEY, '1');
      } catch {
        /* ignore */
      }
      editor.refresh();
    }
    if (exp) announce(exp === 'developer' ? 'Advanced mode is on: tips are off (Settings › Tips and help).' : 'Guided: tips and plain words. Getting started, at the bottom, shows the way round.');
    editor.focus();
  },
});
// A new visitor: during the beta, the tester questions first (they also pick guided or Advanced); else Nucli's.
if (!welcomed && !firstRunDone() && !INITIAL_HASH) {
  if (testGuide.needed()) testGuide.open(); else firstRun.open();
}
$('#fr-again').addEventListener('click', () => { ($('#settings-dialog') as HTMLDialogElement).close(); firstRun.open(); });
// Getting started: the home page (what a handler is, the four steps, New / Open / Learn), over the open handlers.
$('#welcome-open').addEventListener('click', () => {
  if (noneOpen) {
    const box = $('#no-handler');
    box.classList.remove('welcome-in'); void box.offsetWidth; box.classList.add('welcome-in');
    box.querySelector<HTMLElement>('[data-nh=new]')?.focus();
  } else showHome(true);
});

let startTab = 'problems';
try {
  startTab = localStorage.getItem(TAB_KEY) || 'problems';
} catch {
  /* ignore */
}
initTabs();
const initialHash = INITIAL_HASH ? followMoved(decodeURIComponent(INITIAL_HASH.slice(1))) : '';
const initialDocs = /^docs(-|$)/.test(initialHash) ? initialHash : '';
if (initialDocs) {
  renderDocHead();
  docs.openHash(initialDocs);
} else if (!openFromHash()) {
  renderDocHead();
  selectTab(['problems', 'simulate', 'api', 'probes'].includes(startTab) ? startTab : 'problems');
} else if (narrow()) setView('code');
// A link that opened a handler (#example-…, #hub-…) leaves the results tabs as they were: mark the one whose
// panel shows, so a tab is always selected (and its ink drawn). Only the marking: the view stays as it is.
if (!document.querySelector('.pane-head [role=tab][aria-selected=true]')) {
  const shown = [...document.querySelectorAll<HTMLElement>('[role=tabpanel][id^=panel-]')].find((p) => !p.hidden);
  const id = shown ? shown.id.slice('panel-'.length) : 'problems';
  document.querySelectorAll<HTMLElement>('.pane-head [role=tab]').forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === id)));
  requestAnimationFrame(placeInk);
}
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

// Save and Share are separate: Save writes a file in the last format used (.zip for Nucleus by default; ▾ picks
// another), Share copies a link, the code, or a Discord post. The dialog shows Share, or the install steps after
// the first saves of a .zip.
const codeDialog = $('#code-dialog') as HTMLDialogElement;
/** The Save or Share button the person can see (slim bar, side rail or phone), so confirmations show where they look. */
// Function declarations (hoisted): initTips, far above, may ask for the Share button while the page starts.
function shown(...sel: string[]): HTMLElement | null {
  return sel.map((s) => document.querySelector<HTMLElement>(s)).find((el) => !!el?.offsetParent) ?? null;
}
const saveButton = () => shown('#code-menu-open', '.rail [data-rail=save]', '#code-menu-phone') ?? $('#code-menu-open');
function shareButton(): HTMLElement {
  return shown('#share-open', '.rail [data-rail=share]', '#code-menu-phone') ?? ($('#share-open') as HTMLElement);
}
type SaveKind = 'zip' | 'js' | 'nc';
const SAVE_KEY = 'nucleus-workbench-save-format';
const STEPS_KEY = 'nucleus-workbench-install-steps-seen';
const saveKind = (): SaveKind => { try { const v = localStorage.getItem(SAVE_KEY); return v === 'js' || v === 'nc' ? v : 'zip'; } catch { return 'zip'; } };
const SAVE_LABEL: Record<SaveKind, string> = { zip: 'For Nucleus Co-op (.zip)', js: 'The code only (.js)', nc: 'Package for the Hub (.nc)' };
function syncSaveButton() {
  const k = saveKind();
  $('#code-menu-open').setAttribute('aria-label', `Save the handler: ${SAVE_LABEL[k]}`);
  $('#code-menu-open').title = `Save: ${SAVE_LABEL[k]} · Ctrl+S`;
}
syncSaveButton();
function openCodeDialog() {
  $('#save-h').textContent = 'Share';
  $('#code-main').hidden = false;
  $('#code-done').hidden = true;
  const len = editor.getValue().length + 10;
  // Which of the two leads: the link when it carries the whole handler and fits a Discord message, else the file.
  const selection = !!editor.getSelection();
  // Unchanged (code and package files): the link is the handler's own; a name link (#hub-…) is short and opens its files too.
  const unchanged = !!doc.hash && editor.getValue() === loadedText && !doc.filesEdited && !selection;
  const named = unchanged && isNamedLink(doc.hash);
  const advise = (linkLength: number | null) => {
    const a = shareAdvice({ selection, files: packageFiles.length, linkLength, named });
    $('#code-link-sub').textContent = a.linkSub;
    $('#code-file-sub').textContent = a.fileSub;
    codeDialog.querySelector('[data-code=link]')!.className = a.fileFirst ? 'code-opt' : 'code-hero';
    codeDialog.querySelector('[data-code=file]')!.className = a.fileFirst ? 'code-hero' : 'code-opt';
  };
  advise(null);
  // The link's real length takes a moment (it's compressed): the dialog opens at once and settles when it's known.
  const base = location.href.replace(/#.*$/, '').length + 1;
  if (unchanged) advise(base + doc.hash!.length);
  else void encodeShare(editor.getSelection() || editor.getValue()).then((id) => { if (codeDialog.open) advise(base + id.length); }, () => {});
  $('#code-discord-sub').textContent = len > DISCORD_LIMIT ? `Too long for one message (${len.toLocaleString()} of ${DISCORD_LIMIT.toLocaleString()} characters): select the lines that matter first` : 'The code in a code block, ready to paste';
  codeDialog.showModal();
}
function showInstallSteps(filename: string) {
  const errorsLeft = current.filter((d) => d.severity === 'error').length;
  $('#save-h').textContent = 'Saved';
  $('#code-saved').textContent = `Saved ${filename}`;
  $('#code-warn').hidden = !errorsLeft;
  $('#code-warn').textContent = errorsLeft ? `It still has ${errorsLeft} error${errorsLeft === 1 ? '' : 's'}, so Nucleus may not load it. Check lists them.` : '';
  $('#code-js-name').textContent = `${handlerFileName()}.js`;
  $('#code-main').hidden = true;
  $('#code-done').hidden = false;
  if (!codeDialog.open) codeDialog.showModal();
  $('#code-close').focus();
}
async function saveAs(kind: SaveKind = saveKind(), trigger: HTMLElement = saveButton()) {
  try { localStorage.setItem(SAVE_KEY, kind); } catch { /* not kept */ }
  syncSaveButton();
  if (!downloads) return notice("Saving files isn't available here. Share › Copy the code, and paste it into a .js file.", { kind: 'error' });
  const filename = `${handlerFileName()}.${kind}`;
  try {
    const text = exportText();
    const data = kind === 'js' ? new TextEncoder().encode(text) : buildPackage(text, packageFiles);
    const remote = packageFiles.filter((f) => f.remote);
    await downloads.save({ filename, data });
    waka.saved();
    use(`save-${kind}`);
    // The install steps after the first two .zip saves; after that, they're under ▾.
    let seen = 0;
    try { seen = Number(localStorage.getItem(STEPS_KEY) || 0); localStorage.setItem(STEPS_KEY, String(seen + 1)); } catch { /* ignore */ }
    if (kind === 'zip' && seen < 2) showInstallSteps(filename);
    else confirmOn(trigger, 'Saved ✓', `Saved ${filename}.`);
    // Files of a Hub package that weren't downloaded here can't go in it: say so, with the original.
    if (kind !== 'js') noteRemoteFiles(remote);
  } catch (e: any) {
    if (e?.code === 'declined') return;
    notice("Couldn't save the file here. Share › Copy the code instead, and paste it into a .js file.", { kind: 'error' });
  }
}
/** After saving a package: the Hub package's big files that aren't downloaded here aren't in it. */
function noteRemoteFiles(remote = packageFiles.filter((f) => f.remote)) {
  if (!remote.length) return;
  const url = remote[0].remote!.url;
  notice(`Saved without ${remote.length} big file${remote.length === 1 ? '' : 's'} from the Hub package (${fileSize(remote.reduce((n, f) => n + f.remote!.size, 0))}: ${remote.slice(0, 3).map((f) => f.name.split('/').pop()).join(', ')}${remote.length > 3 ? ', …' : ''}), which aren't downloaded here. Get them from the original package on the Hub.`, { kind: 'warning', action: { label: 'Open the Hub page', run: () => window.open(url, '_blank', 'noopener') } });
}
/**
 * Share the file: the .zip (the code and every file with it), plus a message to post with it, on the clipboard.
 * For what a link can't carry or Discord won't take; whoever gets the file drops it on the workbench.
 */
async function shareFile(trigger: HTMLElement) {
  if (!downloads) return notice("Saving files isn't available here. Share › Copy the code, and paste it into a .js file.", { kind: 'error' });
  const filename = `${handlerFileName()}.zip`;
  // The public site, not this page's own address, inside a Claude artifact or from a file on disk.
  const site = (window as any).claude || !/^https?:$/.test(location.protocol) ? 'https://snailedlt.github.io/nucleuscoop-handler-testbench/' : location.href.replace(/[?#].*$/, '');
  const game = editor.getValue().match(/^\s*Game\.GameName\s*=\s*"([^"]*)"/m)?.[1] ?? '';
  // What's open now, before anything waits: the person may switch tab or edit while the clipboard answers.
  const data = buildPackage(exportText(), packageFiles);
  const remote = packageFiles.filter((f) => f.remote);
  // The message first: after the save dialog the browser may no longer let the page copy.
  let copied = true;
  try { await navigator.clipboard.writeText(shareFileMessage({ game, filename, site })); } catch { copied = false; }
  try {
    await downloads.save({ filename, data });
  } catch (e: any) {
    if (e?.code === 'declined') return;
    return notice("Couldn't save the file here. Share › Copy the code instead, and paste it into a .js file.", { kind: 'error' });
  }
  waka.saved();
  use('share-file');
  confirmOn(trigger, 'Saved ✓', copied ? `Saved ${filename} and copied a message to post with it. Attach the file where you paste the message.` : `Saved ${filename}. Attach it to your message: whoever gets it drops it on this page to open it.`);
  noteRemoteFiles(remote);
}
// Save into Nucleus: straight into its handlers folder (Chrome, Edge); elsewhere the .zip, to drop onto Nucleus.
let nucleusFolderName: string | undefined;
void rememberedName().then((n) => (nucleusFolderName = n));
async function saveToNucleus(pick = false, trigger: HTMLElement = saveButton()) {
  if (!canSaveIntoFolder()) {
    await saveAs('zip', trigger);
    notice("This browser can't save into a folder: drag the .zip onto Nucleus Co-op's window to install it. (Chrome and Edge can save straight into Nucleus' handlers folder.)", { kind: 'info' });
    return;
  }
  const r = await saveIntoNucleus(exportText(), packageFiles, pick);
  if (r.ok) {
    nucleusFolderName = r.folder;
    waka.saved();
    use('save-nucleus');
    confirmOn(trigger, 'Saved ✓', `Saved into ${r.folder}: ${r.js}${r.files ? ` and ${r.files} file${r.files === 1 ? '' : 's'} in its folder` : ''}.${r.skipped ? ` ${r.skipped} file${r.skipped === 1 ? '' : 's'} left out (at the package's top level, or not downloaded from the Hub).` : ''}`);
  } else if (r.reason === 'not-nucleus') {
    notice("That folder has no handlers folder. Pick Nucleus Co-op's folder (the one with NucleusCoop.exe and handlers), or its handlers folder.", { kind: 'warning', action: { label: 'Pick again', run: () => void saveToNucleus(true, trigger) } });
  } else if (r.reason === 'denied') {
    // The browser refused folder access here (e.g. a page inside a frame): the .zip, as in Firefox and Safari.
    await saveAs('zip', trigger);
    notice("The browser didn't allow saving into a folder here: drag the .zip onto Nucleus Co-op's window to install it.", { kind: 'info' });
  } else if (r.reason !== 'cancelled') {
    notice(`Couldn't save into the folder${r.message ? ` (${r.message})` : ''}. Save the .zip instead and drag it onto Nucleus Co-op.`, { kind: 'error' });
  }
}
const saveItems = (): MenuItem[] => [
  { label: 'Save as', kind: 'heading' },
  ...(['zip', 'js', 'nc'] as SaveKind[]).map((k) => ({ label: SAVE_LABEL[k], checked: saveKind() === k, run: () => void saveAs(k) })),
  { label: '', kind: 'separator' as const },
  { label: nucleusFolderName ? `Into Nucleus Co-op (${nucleusFolderName})` : 'Into Nucleus Co-op…', run: () => void saveToNucleus() },
  ...(nucleusFolderName ? [{ label: 'Into another Nucleus Co-op folder…', run: () => void saveToNucleus(true) }] : []),
  { label: 'How to install it in Nucleus', run: () => showInstallSteps(`${handlerFileName()}.zip`) },
];
async function copyForDiscord(trigger: HTMLElement) {
  const sel = editor.getSelection();
  const text = '```js\n' + (sel || editor.getValue()).replace(/```/g, '`​``') + '\n```';
  try {
    await navigator.clipboard.writeText(text);
    confirmOn(trigger, 'Copied ✓', text.length > DISCORD_LIMIT ? `Copied, but it's ${text.length.toLocaleString()} characters: Discord takes ${DISCORD_LIMIT.toLocaleString()} per message. Select fewer lines, or share a link.` : `Copied ${sel ? 'the selected lines' : 'the handler'} as a Discord code block.`);
  } catch {
    notice("The browser didn't let this page copy. Use Copy the code instead.", { kind: 'warning' });
  }
}
$('#code-menu-open').addEventListener('click', () => void saveAs());
$('#save-more').addEventListener('click', () => openMenu($('#save-more'), 'Save as', saveItems()));
$('#share-open').addEventListener('click', openCodeDialog);
$('#code-close').addEventListener('click', () => codeDialog.close());
codeDialog.querySelectorAll<HTMLButtonElement>('[data-code]').forEach((b) =>
  b.addEventListener('click', async () => {
    const kind = b.dataset.code;
    codeDialog.close();
    if (kind === 'copy') return copyCode();
    if (kind === 'link') return copyLink(shareButton());
    if (kind === 'discord') return copyForDiscord(shareButton());
    if (kind === 'file') return shareFile(shareButton());
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
// The title is the workbench's own link (a fresh load keeps the draft); "⌂ Home" under it goes to the home page.
// "About these tools" opens the start page. The single file (a release download, the Claude artifact)
// links to the live site's; where a start page is served next to it (the artifact, a copy of the
// site), it opens that one, so a preview stays a preview.
{
  const links = [...document.querySelectorAll<HTMLAnchorElement>('a.start-link')];
  if (links.length && /^https?:/.test(location.protocol) && /^https:/.test(links[0].getAttribute('href') ?? '')) {
    // The file itself, not the folder: some hosts (the Claude artifact) serve start/index.html but not start/.
    fetch('start/index.html', { cache: 'no-store' })
      .then((r) => {
        if (r.ok && (r.headers.get('content-type') ?? '').includes('html')) links.forEach((a) => (a.href = 'start/index.html'));
      })
      .catch(() => {});
  }
}
