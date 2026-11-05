// VS Code's editing shortcuts in the code editor, so handler authors don't have to relearn them.
// The commands come from CodeMirror's addons and its Sublime keymap file (only its commands are
// used, on VS Code's keys). Cmd replaces Ctrl on a Mac, as in VS Code.
import CodeMirror from 'codemirror';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/search';
import 'codemirror/addon/search/jump-to-line';
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
    Esc: 'singleSelectionTop', // back to one cursor
  });
}

/** Alt+click adds a cursor, as in VS Code (CodeMirror's own default is Ctrl+click). */
export const vscodeMouse = (_cm: any, _repeat: string, ev: MouseEvent) => ({ addNew: ev.altKey });
