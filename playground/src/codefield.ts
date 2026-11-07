// Small code editors for Form and Blocks (issue #12): a CodeMirror 5 instance with the main editor's mode and colours,
// its suggestions after `.` and `=`, hover docs, squiggles for the problems inside it, Format (Shift+Alt+F), undo and
// Tab indenting; Esc then Tab leaves it, as in the main editor.
//
// It starts as a plain text area (works and is reachable at once) and becomes a CodeMirror when it comes on screen or
// gets focus, so pages with many steps stay fast. The host reads `value`, gets `oninput`/`onblur`, and finds the field
// from any of its elements with `codeFieldOf` (the element that has focus carries the host's id and data attribute).
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import { formatHandler } from '@core/format';

export interface CodeFieldSupport {
  /** The main editor's completion source (show-hint), run on this field's own text. */
  hint?: (cm: any) => any;
  /** Hover docs: what is under the pointer in `cm`, and the problems there. */
  hover?: (cm: any, ev: MouseEvent, problems: Mark[]) => void;
  hoverEnd?: () => void;
  /** Say something to screen readers (Format's result). */
  say?: (msg: string) => void;
}
let support: CodeFieldSupport = {};
export const setCodeFieldSupport = (s: CodeFieldSupport) => void (support = s);

/** A problem inside the field, in the field's own offsets. */
export interface Mark { start: number; end: number; severity: string; message: string }

export interface CodeFieldOptions {
  /** Ids and data attributes for the element that takes focus (the host looks it up by them). */
  attrs: Record<string, string>;
  label: string;
  value: string;
  /** Several lines (a code step) or one (a value: Enter adds no line). */
  multiline: boolean;
  /** The indentation of the line the code starts on: lines after the first carry it (Format keeps it). */
  baseIndent?: () => string;
  /** One level of indentation in this handler. */
  unit?: () => string;
}

const fields = new WeakMap<Element, CodeField>();
/** The code field an element belongs to (its wrapper, the text area before it mounts, or the editor's input). */
export function codeFieldOf(el: Element | null | undefined): CodeField | undefined {
  for (let x: Element | null | undefined = el; x; x = x.parentElement) {
    const f = fields.get(x);
    if (f) return f;
    if (x.classList.contains('cf')) return undefined;
  }
  return undefined;
}

let io: IntersectionObserver | undefined;
function whenVisible(f: CodeField) {
  if (typeof IntersectionObserver === 'undefined') return void requestAnimationFrame(() => f.mount());
  io ??= new IntersectionObserver((list) => {
    for (const e of list) if (e.isIntersecting) {
      io!.unobserve(e.target);
      fields.get(e.target)?.mount();
    }
  }, { rootMargin: '300px 0px' });
  io.observe(f.el);
}

const lines = (s: string) => s.split('\n').length;

export class CodeField {
  readonly el: HTMLElement;
  cm: any;
  oninput?: () => void;
  onblur?: () => void;
  private ta: HTMLTextAreaElement;
  private silent = false;
  private marks: Mark[] = [];
  private drawn: any[] = [];
  private escThenTab = false;

  constructor(private o: CodeFieldOptions) {
    this.el = document.createElement('span');
    this.el.className = `cf ${o.multiline ? 'cf-multi' : 'cf-one'} cm-s-default`;
    const ta = (this.ta = document.createElement('textarea'));
    ta.className = 'cf-ta';
    for (const [k, v] of Object.entries(o.attrs)) ta.setAttribute(k, v);
    ta.setAttribute('aria-label', o.label);
    ta.spellcheck = false;
    ta.rows = o.multiline ? Math.min(12, lines(o.value)) : 1;
    ta.value = o.value;
    ta.addEventListener('input', () => {
      if (!this.o.multiline && ta.value.includes('\n')) ta.value = ta.value.replace(/\r?\n/g, ' ');
      this.width();
      this.oninput?.();
    });
    ta.addEventListener('blur', () => this.onblur?.());
    ta.addEventListener('focus', () => this.mount());
    this.el.append(ta);
    fields.set(this.el, this);
    fields.set(ta, this);
    this.width();
    whenVisible(this);
  }

  get value(): string {
    return this.cm ? this.cm.getValue() : this.ta.value;
  }
  /** Sets the text from outside (no `oninput`). */
  set value(s: string) {
    if (this.value === s) return;
    if (this.cm) {
      this.silent = true;
      this.cm.setValue(s);
      this.silent = false;
      this.drawMarks();
    } else {
      this.ta.value = s;
      if (this.o.multiline) this.ta.rows = Math.min(12, lines(s));
    }
    this.width();
  }
  /** The element that takes focus. */
  get input(): HTMLElement {
    return this.cm ? this.cm.getInputField() : this.ta;
  }
  focus() {
    if (this.cm) this.cm.focus();
    else this.ta.focus();
  }
  hasFocus(): boolean {
    return this.el.contains(document.activeElement);
  }
  setInvalid(bad: boolean) {
    this.input.setAttribute('aria-invalid', String(bad));
    this.el.classList.toggle('cf-invalid', bad);
  }
  setMarks(m: Mark[]) {
    const sig = (x: Mark[]) => x.map((d) => `${d.start}:${d.end}:${d.severity}`).join();
    if (sig(m) === sig(this.marks)) return;
    this.marks = m;
    this.drawMarks();
  }

  /** One-line fields are as wide as their text (within the row), so short values keep the one-line look. */
  private width() {
    if (this.o.multiline) return;
    const n = Math.max(...this.value.split('\n').map((l) => l.length));
    this.el.style.setProperty('--cf-ch', String(Math.min(80, Math.max(10, n + 2))));
  }

  private drawMarks() {
    if (!this.cm) return;
    for (const d of this.drawn) d.clear();
    const len = this.cm.getValue().length;
    this.drawn = this.marks
      .filter((d) => d.severity !== 'hint' && d.start <= len)
      .map((d) => this.cm.markText(this.cm.posFromIndex(d.start), this.cm.posFromIndex(Math.min(len, Math.max(d.end, d.start + 1))), {
        className: `CodeMirror-lint-mark CodeMirror-lint-mark-${d.severity === 'error' ? 'error' : d.severity === 'warning' ? 'warning' : 'info'}`,
      }));
  }

  /** Turns the text area into a CodeMirror (once): when it comes on screen, or gets focus first. */
  mount() {
    if (this.cm) return;
    const ta = this.ta;
    const focused = document.activeElement === ta;
    const [a, b] = [ta.selectionStart, ta.selectionEnd];
    io?.unobserve(this.el);
    const multi = this.o.multiline;
    const keys: Record<string, any> = {
      'Ctrl-Space': (cm: any) => support.hint && cm.showHint({ hint: support.hint, completeSingle: false }),
      'Shift-Alt-F': () => this.format(),
    };
    if (multi) {
      keys.Tab = (cm: any) => (cm.somethingSelected() ? cm.execCommand('indentMore') : cm.execCommand('insertSoftTab'));
      keys['Shift-Tab'] = (cm: any) => cm.execCommand('indentLess');
    } else {
      // One line: Enter keeps its meaning (nothing to add), Tab moves on as in any field.
      keys.Enter = () => {};
      keys.Tab = false;
      keys['Shift-Tab'] = false;
    }
    const cm = CodeMirror((node: HTMLElement) => ta.replaceWith(node), {
      value: ta.value,
      mode: 'javascript',
      indentUnit: (this.o.unit?.() ?? '  ').replace(/\t/, '    ').length || 2,
      tabSize: 4,
      lineWrapping: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      viewportMargin: Infinity,
      extraKeys: keys,
      screenReaderLabel: this.o.label,
    } as any);
    this.cm = cm;
    const inp = cm.getInputField() as HTMLElement;
    for (const [k, v] of Object.entries(this.o.attrs)) inp.setAttribute(k, v);
    inp.setAttribute('aria-label', this.o.label);
    if (multi) inp.setAttribute('aria-multiline', 'true');
    if (ta.getAttribute('aria-invalid')) inp.setAttribute('aria-invalid', ta.getAttribute('aria-invalid')!);
    fields.set(inp, this);
    fields.set(cm.getWrapperElement(), this);
    if (!multi) {
      cm.on('beforeChange', (_cm: any, ch: any) => {
        if (ch.text.length > 1 && ch.update) ch.update(ch.from, ch.to, [ch.text.join(' ')]);
      });
    }
    cm.on('change', () => {
      this.width();
      if (!this.silent) this.oninput?.();
    });
    cm.on('blur', () => {
      this.escThenTab = false;
      this.onblur?.();
    });
    cm.on('keydown', (_cm: any, e: KeyboardEvent) => {
      if (e.key === 'Escape') this.escThenTab = true;
      else if (e.key === 'Tab' && this.escThenTab) {
        (e as any).codemirrorIgnore = true; // the browser moves focus on, as from any field
        this.escThenTab = false;
      } else if (e.key !== 'Shift') this.escThenTab = false;
    });
    cm.on('inputRead', (c: any, change: any) => {
      if (!support.hint || c.state.completionActive) return;
      const afterEquals = change.text[0] === ' ' && /[\w\]]\s*=\s$/.test(c.getLine(change.from.line).slice(0, change.from.ch + 1));
      if (change.text[0] === '.' || /^[\w$]$/.test(change.text[0]) || afterEquals) c.showHint({ hint: support.hint, completeSingle: false });
    });
    const w = cm.getWrapperElement() as HTMLElement;
    w.addEventListener('mousemove', (e: MouseEvent) => {
      if (!support.hover) return;
      const at = cm.indexFromPos(cm.coordsChar({ left: e.clientX, top: e.clientY }, 'window'));
      support.hover(cm, e, this.marks.filter((d) => d.severity !== 'hint' && d.start <= at && at <= Math.max(d.end, d.start + 1)));
    });
    w.addEventListener('mouseleave', () => support.hoverEnd?.());
    this.drawMarks();
    if (focused) {
      cm.focus();
      cm.setSelection(cm.posFromIndex(b ?? 0), cm.posFromIndex(a ?? 0));
    }
  }

  /** Shift+Alt+F: the core formatter on this code alone. It only changes indentation and spacing and refuses when
   *  the tokens would differ, so formatting a part is as safe as the whole file; lines after the first get the
   *  indentation of the line the code starts on back. */
  format() {
    const src = this.value;
    const base = this.o.baseIndent?.() ?? '';
    const ls = src.split('\n');
    const rel = ls.map((l, i) => (i && l.startsWith(base) ? l.slice(base.length) : l)).join('\n');
    const r = formatHandler(rel, { indent: this.o.unit?.() ?? '  ' });
    if (!r.ok) return void support.say?.(r.reason);
    let out = r.code.split('\n').map((l, i) => (i && l ? base + l : l)).join('\n');
    if (!src.endsWith('\n')) out = out.replace(/\n+$/, '');
    if (out === src) return void support.say?.('Already formatted.');
    const cm = this.cm;
    if (!cm) return;
    const cur = cm.getCursor();
    cm.replaceRange(out, cm.posFromIndex(0), cm.posFromIndex(src.length), '+format');
    cm.setCursor(cur);
    support.say?.('Formatted.');
  }
}
