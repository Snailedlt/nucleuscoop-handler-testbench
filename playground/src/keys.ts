// VS Code's editing shortcuts in the code editor, so handler authors don't have to relearn them.
// The commands come from CodeMirror's addons and its Sublime keymap file (only its commands are
// used, on VS Code's keys). Cmd replaces Ctrl on a Mac, as in VS Code.
import { findStep, openFind, selectFindMatches } from './findwidget';
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
  if (selectFindMatches(cm)) return; // Find is open: its matches, with its options
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

/** The editor actions that need more than a CodeMirror command (keybindings.ts lists them all, with their keys). */
export const codeHandlers: Record<string, (cm: any) => void> = {
  fold: (cm) => foldEnclosing(cm),
  addComment: (cm) => cm.lineComment(cm.getCursor('from'), cm.getCursor('to')),
  removeComment: (cm) => cm.uncomment(cm.getCursor('from'), cm.getCursor('to')),
  blockComment: (cm) => toggleBlockComment(cm),
  matchBracket: (cm) => goToBracket(cm),
  cursorsEnds: (cm) => cursorsAtLineEnds(cm),
  scrollUp: (cm) => scrollBy(-1)(cm),
  scrollDown: (cm) => scrollBy(1)(cm),
  copyUp: (cm) => (cm.execCommand('duplicateLine'), cm.execCommand('goLineUp')),
  find: (cm) => openFind(cm),
  replace: (cm) => openFind(cm, true),
  findNext: (cm) => findStep(cm, 1),
  findPrev: (cm) => findStep(cm, -1),
};
/** Keys that stay as they are: Tab indents (a selection: its lines), Shift+Tab outdents, Esc back to one cursor. */
export const fixedCodeKeys: Record<string, any> = {
  Tab: (cm: any) => tabKey(cm),
  'Shift-Tab': 'indentLess',
  Esc: 'singleSelectionTop',
};

/** Alt+click adds a cursor, as in VS Code (CodeMirror's own default is Ctrl+click). */
export const vscodeMouse = (_cm: any, _repeat: string, ev: MouseEvent) => ({ addNew: ev.altKey });

// Shortcuts with punctuation on any keyboard layout, as VS Code does it: by the key's position on a US keyboard.
// On German, Spanish, Portuguese, Nordic, French… keyboards [ ] / \ ; ' sit elsewhere or need AltGr, so
// Ctrl+Shift+[ or Ctrl+/ can't be pressed as labelled. Here the key in that spot works (on German, Ctrl+Shift+Ü
// folds, Ctrl+- toggles a comment). Letters and digits keep going by what's printed on them (Ctrl+Z is the key
// marked Z), and AltGr keeps typing [ ] { } @ \ as usual.
const US_KEYCODE: Record<string, number> = {
  Semicolon: 186, Equal: 187, Comma: 188, Minus: 189, Period: 190, Slash: 191, Backquote: 192,
  BracketLeft: 219, Backslash: 220, BracketRight: 221, Quote: 222,
};
export function keysByPosition(cm: any) {
  cm.on('keydown', (_cm: any, e: KeyboardEvent & { __byPosition?: boolean }) => {
    if (e.__byPosition || !(e.ctrlKey || e.metaKey || e.altKey)) return;
    if (e.getModifierState?.('AltGraph')) return; // typing a character with AltGr
    const us = US_KEYCODE[e.code];
    if (!us || us === e.keyCode) return; // not punctuation, or already where a US keyboard has it
    let handled = false;
    const fake = {
      type: 'keydown', keyCode: us, which: us, code: e.code, key: e.key,
      ctrlKey: e.ctrlKey, shiftKey: e.shiftKey, altKey: e.altKey, metaKey: e.metaKey,
      __byPosition: true, defaultPrevented: false,
      preventDefault() { handled = true; this.defaultPrevented = true; e.preventDefault(); },
      stopPropagation() { e.stopPropagation(); },
      getModifierState: (k: string) => e.getModifierState?.(k) ?? false,
    };
    cm.triggerOnKeyDown(fake);
    // Bound in the US position: done. Otherwise the key does what its own label says, as usual.
    if (handled) (e as any).codemirrorIgnore = true;
  });
}
