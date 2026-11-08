// VS Code's editing shortcuts in the code editor, so handler authors don't have to relearn them.
// The commands come from CodeMirror's addons and its Sublime keymap file (only its commands are
// used, on VS Code's keys). Cmd replaces Ctrl on a Mac, as in VS Code.
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
    Esc: 'singleSelectionTop', // back to one cursor
  });
}

/** Alt+click adds a cursor, as in VS Code (CodeMirror's own default is Ctrl+click). */
export const vscodeMouse = (_cm: any, _repeat: string, ev: MouseEvent) => ({ addNew: ev.altKey });
