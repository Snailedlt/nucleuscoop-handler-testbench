// Word wrap, as VS Code's: one setting (Settings › Editor › Wrap long lines, Alt+Z) for every code view. Code editors
// (the handler, package files) wrap at the edge and keep a wrapped line's indent ("wrappingIndent: same"); read-only
// code (hovers, Docs, Check, the debugger, the package's files) wraps the same way, or scrolls sideways when it's off:
// code is never cut off. The page carries it as <html data-wrap="on|off"> for the CSS.
import CodeMirror from 'codemirror';

let on = false;
const editors = new Set<any>();
const listeners: ((on: boolean) => void)[] = [];

/** The left padding CodeMirror gives a line (its theme's), read once. */
let basePad: number | undefined;
function linePad(cm: any): number {
  if (basePad === undefined) {
    const l = cm.getWrapperElement().querySelector('.CodeMirror-line');
    basePad = l ? parseFloat(getComputedStyle(l).paddingLeft) || 4 : 4;
  }
  return basePad;
}

/** A wrapped line continues under its own first character, not at the left edge (VS Code's default). */
function indentWrapped(cm: any, line: { text: string }, el: HTMLElement) {
  if (!on) {
    el.style.textIndent = '';
    el.style.paddingLeft = '';
    return;
  }
  const lead = /^\s*/.exec(line.text)![0];
  const off = CodeMirror.countColumn(lead, null, cm.getOption('tabSize')) * cm.defaultCharWidth();
  el.style.textIndent = `-${off}px`;
  el.style.paddingLeft = `${linePad(cm) + off}px`;
}

/** Puts a code editor under the setting (wrapping and the wrapped-line indent). */
export function wrapEditor(cm: any) {
  if (editors.has(cm)) return;
  editors.add(cm);
  cm.on('renderLine', indentWrapped);
  cm.setOption('lineWrapping', on);
  cm.refresh();
}

export const wrapOn = () => on;
export function setWrap(next: boolean) {
  on = next;
  document.documentElement.dataset.wrap = on ? 'on' : 'off';
  for (const cm of editors) {
    cm.setOption('lineWrapping', on);
    cm.refresh();
  }
  for (const f of listeners) f(on);
}
export const onWrapChange = (f: (on: boolean) => void) => listeners.push(f);
