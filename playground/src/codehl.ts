// Read-only code, coloured like the editor (issue #12): CodeMirror's runMode with the editor's JavaScript mode,
// as spans with the editor's `cm-*` classes inside an element with `hl cm-s-default`, so the current code colours
// (Settings › Theme › Code colours, themekit CODE_SCOPE) apply in both themes. Used by the hover cards, Reference,
// Check, Try it, What's new and the debugger.
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/properties/properties';
import 'codemirror/mode/xml/xml';
import 'codemirror/addon/runmode/runmode';
import { semHighlight } from './semhl';

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const unesc = (s: string) => s.replace(/&(amp|lt|gt|quot|#39);/g, (_, e) => ({ amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'" })[e as 'amp']!);

/** `src` as HTML: the editor's token spans, the text escaped. `mode`: JavaScript unless said (modeFor a file). */
export function hlCode(src: string, mode: string | object = 'javascript'): string {
  // JavaScript: with the Nucleus names coloured by what they are (semhl.ts), as in the editor.
  if (mode === 'javascript') return semHighlight(src, (CodeMirror as any).runMode);
  let out = '';
  (CodeMirror as any).runMode(src, mode, (text: string, style?: string | null) => {
    out += style ? `<span class="${style.split(' ').map((s) => `cm-${s}`).join(' ')}">${esc(text)}</span>` : esc(text);
  });
  return out;
}

export { looksLikeCodeText as looksLikeCode } from './codetext';
import { looksLikeCodeText as looksLikeCode } from './codetext';

/** Colours the code in HTML built by the docs renderers: `<code>` that is clearly code and `<pre class="doc-code">`. */
export function hlHtml(html: string): string {
  return html
    .replace(/<code>([^<]*)<\/code>/g, (m, inner: string) => (looksLikeCode(unesc(inner)) ? `<code class="hl cm-s-default">${hlCode(unesc(inner))}</code>` : m))
    .replace(/<pre class="doc-code">([^<]*)<\/pre>/g, (_m, inner: string) => `<pre class="doc-code hl cm-s-default">${hlCode(unesc(inner))}</pre>`);
}

/** The colouring for a file shown as code, by its name: INI/CFG, JSON, XML, JavaScript; undefined for plain text. */
export function modeFor(name: string): string | object | undefined {
  const ext = name.toLowerCase().split('.').pop() ?? '';
  if (['ini', 'cfg', 'conf', 'properties', 'inf', 'reg'].includes(ext)) return 'properties';
  if (ext === 'json') return { name: 'javascript', json: true };
  if (['xml', 'config'].includes(ext)) return 'xml';
  if (ext === 'js') return 'javascript';
  return undefined;
}
