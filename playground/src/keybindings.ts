// Every keyboard shortcut in one list, VS Code's by default, and changeable in Settings › Keyboard shortcuts.
// The code editor's keys (CodeMirror), the workbench's own (anywhere on the page), the command palette and the
// shortcut list (?) all read from here. Changes are kept in this browser (nucleus-workbench-keys) and go with
// Export / Import settings.
//
// Notation: "Ctrl+Shift+[", "Ctrl+K Ctrl+0" (two steps). "Ctrl" is ⌘ on a Mac unless an action says otherwise.
// Punctuation means the key's position on a US keyboard (as VS Code does), so the same binding works on every layout.
import CodeMirror from 'codemirror';

export const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
const STORE = 'nucleus-workbench-keys';

export type Group = 'Workbench' | 'Problems' | 'Find and navigate' | 'Editing' | 'Debugger';
export interface Action {
  id: string;
  label: string;
  group: Group;
  /** The default binding (Windows / Linux), and a Mac one when it differs beyond Ctrl → ⌘. */
  keys: string;
  mac?: string;
  /** Where it works: in the code editor, anywhere on the page, or listed only (not changeable here). */
  where: 'code' | 'app' | 'fixed';
  /** A CodeMirror command, for code actions that need nothing else. */
  cm?: string;
}

export const ACTIONS: Action[] = [
  // Workbench (anywhere)
  { id: 'palette', label: 'Command palette', group: 'Workbench', keys: 'Ctrl+Shift+P', where: 'app' },
  { id: 'open', label: 'Open: examples, Hub handlers, probes', group: 'Workbench', keys: 'Ctrl+P', where: 'app' },
  { id: 'tryIt', label: 'Try it (simulate the handler)', group: 'Workbench', keys: 'Ctrl+F5', where: 'app' },
  { id: 'testAll', label: 'Test all combinations', group: 'Workbench', keys: 'Ctrl+; A', where: 'app' },
  { id: 'save', label: 'Save', group: 'Workbench', keys: 'Ctrl+S', where: 'app' },
  { id: 'saveAs', label: 'Save as: .zip, .js or .nc', group: 'Workbench', keys: 'Ctrl+Shift+S', where: 'app' },
  { id: 'saveNucleus', label: "Save into Nucleus Co-op's handlers folder", group: 'Workbench', keys: 'Ctrl+Alt+S', where: 'app' },
  { id: 'lines', label: 'Show or hide the Lines list', group: 'Workbench', keys: 'Ctrl+B', where: 'app' },
  { id: 'settings', label: 'Settings', group: 'Workbench', keys: 'Ctrl+,', where: 'app' },
  { id: 'wordWrap', label: 'Word wrap: wrap long lines or scroll sideways', group: 'Workbench', keys: 'Alt+Z', where: 'app' },
  { id: 'format', label: 'Format the code', group: 'Problems', keys: 'Shift+Alt+F', where: 'app' },
  { id: 'nextProblem', label: 'Next problem', group: 'Problems', keys: 'F8', where: 'app' },
  { id: 'prevProblem', label: 'Previous problem', group: 'Problems', keys: 'Shift+F8', where: 'app' },
  // In the code
  { id: 'quickFix', label: 'Problems and fixes on this line', group: 'Problems', keys: 'Ctrl+.', where: 'code' },
  { id: 'find', label: 'Find', group: 'Find and navigate', keys: 'Ctrl+F', where: 'code' },
  { id: 'replace', label: 'Find and replace', group: 'Find and navigate', keys: 'Ctrl+H', mac: 'Cmd+Alt+F', where: 'code' },
  { id: 'findNext', label: 'Next match', group: 'Find and navigate', keys: 'F3', where: 'code' },
  { id: 'findPrev', label: 'Previous match', group: 'Find and navigate', keys: 'Shift+F3', where: 'code' },
  { id: 'goToLine', label: 'Go to line', group: 'Find and navigate', keys: 'Ctrl+G', mac: 'Ctrl+G', where: 'code' },
  { id: 'definition', label: 'Go to definition', group: 'Find and navigate', keys: 'F12', where: 'code' },
  { id: 'references', label: 'Find all references (select every use)', group: 'Find and navigate', keys: 'Shift+F12', where: 'code' },
  { id: 'rename', label: 'Rename a variable or function', group: 'Find and navigate', keys: 'F2', where: 'code' },
  { id: 'matchBracket', label: 'Go to the matching bracket', group: 'Find and navigate', keys: 'Ctrl+Shift+\\', where: 'code' },
  { id: 'fold', label: 'Fold the block', group: 'Find and navigate', keys: 'Ctrl+Shift+[', mac: 'Cmd+Alt+[', where: 'code' },
  { id: 'unfold', label: 'Unfold the block', group: 'Find and navigate', keys: 'Ctrl+Shift+]', mac: 'Cmd+Alt+]', where: 'code', cm: 'unfold' },
  { id: 'foldAll', label: 'Fold all', group: 'Find and navigate', keys: 'Ctrl+K Ctrl+0', where: 'code', cm: 'foldAll' },
  { id: 'unfoldAll', label: 'Unfold all', group: 'Find and navigate', keys: 'Ctrl+K Ctrl+J', where: 'code', cm: 'unfoldAll' },
  { id: 'toggleFold', label: 'Fold or unfold', group: 'Find and navigate', keys: 'Ctrl+K Ctrl+L', where: 'code', cm: 'toggleFold' },
  { id: 'scrollUp', label: 'Scroll up a line', group: 'Find and navigate', keys: 'Ctrl+Up', mac: 'Ctrl+PageUp', where: 'code' },
  { id: 'scrollDown', label: 'Scroll down a line', group: 'Find and navigate', keys: 'Ctrl+Down', mac: 'Ctrl+PageDown', where: 'code' },
  { id: 'suggest', label: 'Suggestions', group: 'Editing', keys: 'Ctrl+Space', mac: 'Ctrl+Space', where: 'code' },
  { id: 'comment', label: 'Comment or uncomment the line', group: 'Editing', keys: 'Ctrl+/', where: 'code', cm: 'toggleCommentIndented' },
  { id: 'addComment', label: 'Add a line comment', group: 'Editing', keys: 'Ctrl+K Ctrl+C', where: 'code' },
  { id: 'removeComment', label: 'Remove a line comment', group: 'Editing', keys: 'Ctrl+K Ctrl+U', where: 'code' },
  { id: 'blockComment', label: 'Block comment on or off', group: 'Editing', keys: 'Shift+Alt+A', where: 'code' },
  { id: 'lineUp', label: 'Move the line up', group: 'Editing', keys: 'Alt+Up', where: 'code', cm: 'swapLineUp' },
  { id: 'lineDown', label: 'Move the line down', group: 'Editing', keys: 'Alt+Down', where: 'code', cm: 'swapLineDown' },
  { id: 'copyUp', label: 'Copy the line up', group: 'Editing', keys: 'Shift+Alt+Up', where: 'code' },
  { id: 'copyDown', label: 'Copy the line down', group: 'Editing', keys: 'Shift+Alt+Down', where: 'code', cm: 'duplicateLine' },
  { id: 'deleteLine', label: 'Delete the line', group: 'Editing', keys: 'Ctrl+Shift+K', where: 'code', cm: 'deleteLine' },
  { id: 'lineBelow', label: 'New line below', group: 'Editing', keys: 'Ctrl+Enter', where: 'code', cm: 'insertLineAfter' },
  { id: 'lineAbove', label: 'New line above', group: 'Editing', keys: 'Ctrl+Shift+Enter', where: 'code', cm: 'insertLineBefore' },
  { id: 'indent', label: 'Indent', group: 'Editing', keys: 'Ctrl+]', where: 'code', cm: 'indentMore' },
  { id: 'outdent', label: 'Outdent', group: 'Editing', keys: 'Ctrl+[', where: 'code', cm: 'indentLess' },
  { id: 'selectLine', label: 'Select the line', group: 'Editing', keys: 'Ctrl+L', where: 'code', cm: 'selectLine' },
  { id: 'selectNext', label: 'Select the next match too', group: 'Editing', keys: 'Ctrl+D', where: 'code', cm: 'selectNextOccurrence' },
  { id: 'selectAll', label: 'Select every match', group: 'Editing', keys: 'Ctrl+Shift+L', where: 'code', cm: 'selectAllOccurrences' },
  { id: 'cursorUp', label: 'Add a cursor above', group: 'Editing', keys: 'Ctrl+Alt+Up', where: 'code', cm: 'addCursorToPrevLine' },
  { id: 'cursorDown', label: 'Add a cursor below', group: 'Editing', keys: 'Ctrl+Alt+Down', where: 'code', cm: 'addCursorToNextLine' },
  { id: 'cursorsEnds', label: "A cursor at each selected line's end", group: 'Editing', keys: 'Shift+Alt+I', where: 'code' },
  { id: 'undoCursor', label: 'Undo the last cursor move', group: 'Editing', keys: 'Ctrl+U', where: 'code', cm: 'undoSelection' },
  // Listed only
  { id: 'tab', label: 'Indent (a selection: its lines) · outdent', group: 'Editing', keys: 'Tab · Shift+Tab', where: 'fixed' },
  { id: 'undo', label: 'Undo · redo', group: 'Editing', keys: 'Ctrl+Z · Ctrl+Y', where: 'fixed' },
  { id: 'addCursor', label: 'Add a cursor', group: 'Editing', keys: 'Alt+click', where: 'fixed' },
  { id: 'leave', label: 'Leave the code editor', group: 'Workbench', keys: 'Esc Tab', where: 'fixed' },
  { id: 'help', label: 'This list (outside the editor)', group: 'Workbench', keys: '?', where: 'fixed' },
  { id: 'debugBreak', label: 'Breakpoint on this line (Shift+F9: with a condition)', group: 'Debugger', keys: 'F9', where: 'fixed' },
  { id: 'debugGo', label: 'Start, or continue to the next breakpoint', group: 'Debugger', keys: 'F5', where: 'fixed' },
  { id: 'debugStep', label: 'Step over · into · out', group: 'Debugger', keys: 'F10 · F11 · Shift+F11', where: 'fixed' },
  { id: 'debugBack', label: 'Step back · back to the previous breakpoint', group: 'Debugger', keys: 'Alt+F10 · Alt+F5', where: 'fixed' },
  { id: 'debugStop', label: 'Restart · stop', group: 'Debugger', keys: 'Ctrl+Shift+F5 · Shift+F5', where: 'fixed' },
];

// ---------------------------------------------------------------------------
// Bindings: the default, or the person's own

function load(): Record<string, string> {
  try {
    const v = JSON.parse(localStorage.getItem(STORE) || '{}');
    return v && typeof v === 'object' ? v : {};
  } catch {
    return {};
  }
}
let custom = load();
const listeners = new Set<() => void>();
export const onBindingsChange = (f: () => void) => listeners.add(f);

export const defaultBinding = (a: Action) => (isMac ? a.mac ?? a.keys.replace(/\bCtrl\+/g, 'Cmd+') : a.keys);
/** The binding in use: the person's own (may be "" for none), else the default. */
export function binding(id: string): string {
  const a = ACTIONS.find((x) => x.id === id);
  if (!a) return '';
  return id in custom ? custom[id] : defaultBinding(a);
}
export const isCustom = (id: string) => id in custom;
export function setBinding(id: string, keys: string | null) {
  if (keys === null) delete custom[id];
  else custom[id] = keys;
  try {
    Object.keys(custom).length ? localStorage.setItem(STORE, JSON.stringify(custom)) : localStorage.removeItem(STORE);
  } catch {
    /* not kept */
  }
  listeners.forEach((f) => f());
}
export function resetAll() {
  custom = {};
  try { localStorage.removeItem(STORE); } catch { /* ignore */ }
  listeners.forEach((f) => f());
}

/** "Ctrl+Shift+[" for display: ⌘ ⌥ ⇧ on a Mac. */
export function keyLabel(keys: string): string {
  if (!keys) return '';
  return isMac ? keys.replace(/Cmd\+/g, '⌘').replace(/Alt\+/g, '⌥').replace(/Shift\+/g, '⇧').replace(/Ctrl\+/g, '⌃') : keys;
}
export const labelOf = (id: string) => keyLabel(binding(id));

// ---------------------------------------------------------------------------
// Keys from events, and matching

const US: Record<string, string> = {
  Semicolon: ';', Equal: '=', Comma: ',', Minus: '-', Period: '.', Slash: '/', Backquote: '`',
  BracketLeft: '[', Backslash: '\\', BracketRight: ']', Quote: "'",
};
const NAMES: Record<string, string> = { ArrowUp: 'Up', ArrowDown: 'Down', ArrowLeft: 'Left', ArrowRight: 'Right', ' ': 'Space', Escape: 'Esc' };

/** The key of an event, as a binding names it: punctuation by its US position, letters by their label. */
export function keyOf(e: KeyboardEvent): string | undefined {
  if (['Control', 'Shift', 'Alt', 'Meta', 'AltGraph', 'CapsLock'].includes(e.key)) return undefined;
  if (US[e.code]) return US[e.code];
  if (/^Digit\d$/.test(e.code)) return e.code.slice(5);
  if (/^Key[A-Z]$/.test(e.code)) return e.key.length === 1 && /[a-z]/i.test(e.key) ? e.key.toUpperCase() : e.code.slice(3);
  if (NAMES[e.key]) return NAMES[e.key];
  if (/^F\d{1,2}$|^(Enter|Tab|Backspace|Delete|Home|End|PageUp|PageDown|Insert)$/.test(e.key)) return e.key;
  return e.key.length === 1 ? e.key.toUpperCase() : undefined;
}
/** One step of a binding from an event: "Ctrl+Shift+K". */
export function stepOf(e: KeyboardEvent): string | undefined {
  const k = keyOf(e);
  if (!k) return undefined;
  const mods = [e.ctrlKey && (isMac ? 'Ctrl' : 'Ctrl'), e.metaKey && 'Cmd', e.altKey && 'Alt', e.shiftKey && 'Shift'].filter(Boolean) as string[];
  // Written in VS Code's order: Ctrl+Shift+Alt+Cmd.
  const order = ['Ctrl', 'Shift', 'Alt', 'Cmd'];
  return [...mods.sort((a, b) => order.indexOf(a) - order.indexOf(b)), k].join('+');
}
const normStep = (s: string) => {
  const parts = s.split('+');
  const key = parts.pop() === '' ? '+' : s.split('+').pop()!; // "Ctrl++" is the + key
  const order = ['Ctrl', 'Shift', 'Alt', 'Cmd'];
  return [...parts.filter((p) => p).sort((a, b) => order.indexOf(a) - order.indexOf(b)), key].join('+');
};
const steps = (keys: string) => keys.split(' ').filter(Boolean).map(normStep);

/** Workbench (app) shortcuts: which action an event completes, following two-step bindings. */
let pending: { step: string; at: number } | null = null;
export function appActionFor(e: KeyboardEvent): string | 'pending' | undefined {
  const s = stepOf(e);
  if (!s) return undefined;
  const now = Date.now();
  const first = pending && now - pending.at < 2000 ? pending.step : null;
  pending = null;
  for (const a of ACTIONS) {
    if (a.where !== 'app') continue;
    const b = steps(binding(a.id));
    if (!b.length) continue;
    if (first && b.length === 2 && b[0] === first && b[1] === s) return a.id;
    if (!first && b.length === 1 && b[0] === s) return a.id;
  }
  if (!first && ACTIONS.some((a) => a.where === 'app' && steps(binding(a.id)).length === 2 && steps(binding(a.id))[0] === s)) {
    pending = { step: s, at: now };
    return 'pending';
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// The code editor's keymap

const CM_KEY: Record<string, string> = { Esc: 'Esc', Space: 'Space', '+': '=', };
function toCm(keys: string): string {
  return steps(keys)
    .map((s) => {
      const parts = s.split('+');
      const key = parts.pop()!;
      return [...parts, CM_KEY[key] ?? key].join('-');
    })
    .join(' ');
}

/** CodeMirror extraKeys for the code actions (their handlers come from the page). */
export function codeKeyMap(handlers: Record<string, (cm: any) => void>, base: Record<string, any> = {}): Record<string, any> {
  const map: Record<string, any> = { ...base };
  for (const a of ACTIONS) {
    if (a.where !== 'code') continue;
    const run = handlers[a.id] ?? a.cm;
    const b = binding(a.id);
    if (!run || !b) continue;
    map[toCm(b)] = run;
  }
  return (CodeMirror as any).normalizeKeyMap(map);
}

// ---------------------------------------------------------------------------
// Conflicts and keys the browser keeps

/** Other actions using this binding where it would clash (the same place, or the page and the code). */
export function conflicts(id: string, keys: string): Action[] {
  const mine = ACTIONS.find((a) => a.id === id);
  const s = steps(keys).join(' ');
  return ACTIONS.filter((a) => a.id !== id && a.where !== 'fixed' && mine && steps(binding(a.id)).join(' ') === s);
}
/** Keys a browser doesn't hand to the page. */
export function reserved(keys: string): string | undefined {
  const s = steps(keys)[0] ?? '';
  const m = isMac ? 'Cmd' : 'Ctrl';
  const map: Record<string, string> = { [`${m}+W`]: 'closes the tab', [`${m}+T`]: 'opens a tab', [`${m}+N`]: 'opens a window', [`${m}+Tab`]: 'switches tabs', [`${m}+Shift+T`]: 'reopens a tab', [`${m}+Shift+N`]: 'opens a private window', [`${m}+Q`]: 'quits the browser' };
  return map[s];
}
