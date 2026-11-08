// VS Code's editing shortcuts in the code editor, so handler authors don't have to relearn them.
// The commands come from CodeMirror's addons and its Sublime keymap file (only its commands are
// used, on VS Code's keys). Cmd replaces Ctrl on a Mac, as in VS Code.
import { referencesAt } from '@core/definition';
import CodeMirror from 'codemirror';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/search';
import 'codemirror/addon/search/jump-to-line';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';

/** Consecutive // comment lines fold as one block (as in VS Code), e.g. a header or the credit lines. */
export function lineCommentFold(cm: any, start: any): any {
  const isComment = (l: number) => /^\s*\/\//.test(cm.getLine(l) ?? '');
  if (!isComment(start.line) || (start.line > cm.firstLine() && isComment(start.line - 1))) return undefined;
  let end = start.line;
  while (end + 1 <= cm.lastLine() && isComment(end + 1)) end++;
  if (end === start.line) return undefined;
  return { from: CodeMirror.Pos(start.line, cm.getLine(start.line).length), to: CodeMirror.Pos(end, cm.getLine(end).length) };
}
/** Fold the innermost block around the cursor (VS Code's Fold), not only one that starts on its line. */
export function foldEnclosing(cm: any) {
  const at = cm.getCursor();
  for (let l = at.line; l >= cm.firstLine(); l--) {
    const r = foldRange(cm, CodeMirror.Pos(l, 0));
    if (r && r.to.line >= at.line && !(l === at.line && r.from.ch > at.ch && l !== r.from.line)) {
      cm.foldCode(CodeMirror.Pos(l, 0), { rangeFinder: foldRange }, 'fold');
      return;
    }
  }
}
/** Tab as in VS Code: a selection is indented (never replaced), otherwise spaces to the next tab stop. */
export const tabKey = (cm: any) => (cm.somethingSelected() ? cm.execCommand('indentMore') : cm.execCommand('insertSoftTab'));

/** Ctrl+Shift+\: to the matching bracket. */
function goToBracket(cm: any) {
  const m = cm.findMatchingBracket?.(cm.getCursor()) ?? cm.findMatchingBracket?.(CodeMirror.Pos(cm.getCursor().line, cm.getCursor().ch - 1));
  if (m?.match && m.to) cm.setCursor(m.to);
}
/** Shift+Alt+A: block comment on or off. */
function toggleBlockComment(cm: any) {
  const from = cm.getCursor('from'), to = cm.getCursor('to');
  if (!cm.uncomment(from, to, { fullLines: false })) cm.blockComment(from, to, { fullLines: false });
}
/** Ctrl+Shift+L: every occurrence of the selection (or the word at the cursor) selected. */
function selectAllOccurrences(cm: any) {
  let q = cm.getSelection();
  if (!q) {
    const w = cm.findWordAt(cm.getCursor());
    q = cm.getRange(w.anchor, w.head);
  }
  if (!q) return;
  const ranges: any[] = [];
  const c = cm.getSearchCursor(q, CodeMirror.Pos(cm.firstLine(), 0));
  while (c.findNext()) ranges.push({ anchor: c.from(), head: c.to() });
  if (ranges.length) cm.setSelections(ranges, Math.max(0, ranges.findIndex((r) => CodeMirror.cmpPos(r.from ?? r.anchor, cm.getCursor('from')) >= 0)));
}
(CodeMirror as any).commands.selectAllOccurrences = selectAllOccurrences;
/** Shift+Alt+I: a cursor at the end of each selected line. */
function cursorsAtLineEnds(cm: any) {
  const ranges: any[] = [];
  for (const r of cm.listSelections()) {
    const a = Math.min(r.anchor.line, r.head.line), b = Math.max(r.anchor.line, r.head.line);
    for (let l = a; l <= b; l++) ranges.push({ anchor: CodeMirror.Pos(l, cm.getLine(l).length), head: CodeMirror.Pos(l, cm.getLine(l).length) });
  }
  cm.setSelections(ranges);
}
const scrollBy = (lines: number) => (cm: any) => cm.scrollTo(null, cm.getScrollInfo().top + lines * cm.defaultTextHeight());
/** F2 (rename) and Shift+F12 (references): every use of the variable or function at the cursor, selected; typing renames them all. */
export function selectReferences(cm: any): number {
  const text = cm.getValue();
  const refs = referencesAt(text, cm.indexFromPos(cm.getCursor()));
  if (!refs.length) return 0;
  const at = cm.indexFromPos(cm.getCursor());
  cm.setSelections(refs.map((r) => ({ anchor: cm.posFromIndex(r.start), head: cm.posFromIndex(r.end) })), Math.max(0, refs.findIndex((r) => r.start <= at && at <= r.end)));
  return refs.length;
}

/** What can fold: { } and [ ] blocks, /* *\/ comments, runs of // comments. */
export const foldRange = (CodeMirror as any).fold.combine((CodeMirror as any).fold.brace, (CodeMirror as any).fold.comment, lineCommentFold);
import 'codemirror/keymap/sublime';

export const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
/** "Ctrl" or "⌘", for labels. */
export const MOD_LABEL = isMac ? '⌘' : 'Ctrl';

export function vscodeKeys(quickFix: (cm: any) => void): Record<string, any> {
  const M = isMac ? 'Cmd' : 'Ctrl';
  // normalizeKeyMap puts the modifiers in CodeMirror's order (Ctrl-Shift-K is matched as Shift-Ctrl-K).
  return (CodeMirror as any).normalizeKeyMap({
    [`${M}-/`]: 'toggleCommentIndented', // toggle line comment
    'Alt-Up': 'swapLineUp', // move line up / down
    'Alt-Down': 'swapLineDown',
    'Shift-Alt-Down': 'duplicateLine', // copy line down (the cursor goes with the copy)
    'Shift-Alt-Up': (cm: any) => (cm.execCommand('duplicateLine'), cm.execCommand('goLineUp')), // copy line up
    [`${M}-Shift-K`]: 'deleteLine',
    [`${M}-D`]: 'selectNextOccurrence', // add the next match to the selection
    [`${M}-L`]: 'selectLine',
    [`${M}-Shift-Enter`]: 'insertLineBefore',
    [`${M}-]`]: 'indentMore',
    [`${M}-[`]: 'indentLess',
    [`${M}-F`]: 'findPersistent',
    F3: 'findPersistentNext',
    'Shift-F3': 'findPersistentPrev',
    [isMac ? 'Cmd-Alt-F' : 'Ctrl-H']: 'replace',
    'Ctrl-G': 'jumpToLine', // Ctrl on a Mac too, as in VS Code
    [`${M}-Alt-Up`]: 'addCursorToPrevLine',
    [`${M}-Alt-Down`]: 'addCursorToNextLine',
    [`${M}-U`]: 'undoSelection', // undo the last cursor move
    [`${M}-.`]: quickFix, // the problems (and fixes) on this line
    // Folding, as in VS Code: fold / unfold the block at the cursor, fold all / unfold all (Ctrl+K then Ctrl+0 / J).
    [isMac ? 'Cmd-Alt-[' : 'Ctrl-Shift-[']: foldEnclosing,
    [isMac ? 'Cmd-Alt-]' : 'Ctrl-Shift-]']: 'unfold',
    [`${M}-K ${M}-0`]: 'foldAll',
    [`${M}-K ${M}-J`]: 'unfoldAll',
    [`${M}-K ${M}-L`]: 'toggleFold',
    [`${M}-K ${M}-C`]: (cm: any) => cm.lineComment(cm.getCursor('from'), cm.getCursor('to')), // add line comment
    [`${M}-K ${M}-U`]: (cm: any) => cm.uncomment(cm.getCursor('from'), cm.getCursor('to')), // remove line comment
    'Shift-Alt-A': toggleBlockComment,
    [`${M}-Shift-\\`]: goToBracket,
    [`${M}-Shift-L`]: selectAllOccurrences,
    'Shift-Alt-I': cursorsAtLineEnds,
    [isMac ? 'Ctrl-PageUp' : 'Ctrl-Up']: scrollBy(-1), // scroll without moving the cursor
    [isMac ? 'Ctrl-PageDown' : 'Ctrl-Down']: scrollBy(1),
    Tab: tabKey,
    'Shift-Tab': 'indentLess', // outdent the line(s), with or without a selection
    Esc: 'singleSelectionTop', // back to one cursor
  });
}

/** Alt+click adds a cursor, as in VS Code (CodeMirror's own default is Ctrl+click). */
export const vscodeMouse = (_cm: any, _repeat: string, ev: MouseEvent) => ({ addNew: ev.altKey });
