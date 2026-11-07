// Read-only code, coloured like the editor (issue #12): CodeMirror's runMode with the editor's JavaScript mode,
// as spans with the editor's `cm-*` classes inside an element with `hl cm-s-default`, so the current code colours
// (Settings › Theme › Code colours, themekit CODE_SCOPE) apply in both themes. Used by the hover cards, Reference,
// Check, Try it, What's new and the debugger.
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/runmode/runmode';

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const unesc = (s: string) => s.replace(/&(amp|lt|gt|quot|#39);/g, (_, e) => ({ amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'" })[e as 'amp']!);

/** `src` as HTML: the editor's token spans, the text escaped. */
export function hlCode(src: string): string {
  let out = '';
  (CodeMirror as any).runMode(src, 'javascript', (text: string, style?: string | null) => {
    out += style ? `<span class="${style.split(' ').map((s) => `cm-${s}`).join(' ')}">${esc(text)}</span>` : esc(text);
  });
  return out;
}

/** Whether inline code is clearly code (a member path, a call, a literal, an operator), not a plain word in running
 *  text: `Game.Play`, `includes()`, `"-windowed"`, `true` are coloured; `handlers` or `ExecutableName` stay plain. */
export function looksLikeCode(s: string): boolean {
  const t = s.trim();
  if (!t || t.length > 400) return false;
  if (/^[\w$]+$/.test(t)) return /^(true|false|null|undefined|var|function|new|\d[\d.]*)$/.test(t);
  if (/[\\/]/.test(t) && !/[("=]/.test(t)) return false; // a path or a file name
  return /[.()=;"'[\]{}+<>!-]/.test(t);
}

/** Colours the code in HTML built by the docs renderers: `<code>` that is clearly code and `<pre class="doc-code">`. */
export function hlHtml(html: string): string {
  return html
    .replace(/<code>([^<]*)<\/code>/g, (m, inner: string) => (looksLikeCode(unesc(inner)) ? `<code class="hl cm-s-default">${hlCode(unesc(inner))}</code>` : m))
    .replace(/<pre class="doc-code">([^<]*)<\/pre>/g, (_m, inner: string) => `<pre class="doc-code hl cm-s-default">${hlCode(unesc(inner))}</pre>`);
}
