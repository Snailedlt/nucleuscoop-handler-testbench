// Code coloured by what the names are, as in VS Code: CodeMirror's JavaScript tokens, then the core's semantic tokens
// (core/features.ts semanticTokens) on top: `Game`, `Context` and `Nucleus` as objects, their properties, methods and
// enum values each their own colour; a name Nucleus doesn't know stays plain. The workbench's and Learn's editors,
// codehl.ts (hovers, Check, docs) and the site's static pages (build.mjs, with CodeMirror's Node runMode) all use it.
import { semanticTokens, type SemanticTokenType } from '@core/features';

/** The class each kind of Nucleus name gets (styled by SEM_CSS and the workbench's code themes). */
export const SEM_CLASS: Record<SemanticTokenType, string> = {
  namespace: 'cm-nucleus-obj',
  class: 'cm-nucleus-obj',
  enum: 'cm-nucleus-obj',
  enumMember: 'cm-nucleus-val',
  property: 'cm-nucleus-prop',
  method: 'cm-nucleus-fn',
};

/** Where the Nucleus names are: [start, end) offsets and their class. Empty if the code doesn't parse at all. */
export function semanticSpans(src: string): { start: number; end: number; cls: string }[] {
  try {
    return semanticTokens(src).map((t) => ({ start: t.start, end: t.end, cls: SEM_CLASS[t.type] }));
  } catch {
    return [];
  }
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

/**
 * `src` as HTML with CodeMirror's token classes, a Nucleus name's token taking its semantic class instead.
 * `runMode` is CodeMirror's (the browser's or Node's), already loaded with the JavaScript mode.
 */
export function semHighlight(src: string, runMode: (src: string, mode: string, cb: (text: string, style?: string | null) => void) => void): string {
  const spans = semanticSpans(src);
  const at = new Map(spans.map((s) => [s.start, s]));
  let out = '';
  let pos = 0;
  runMode(src, 'javascript', (text, style) => {
    const s = at.get(pos);
    const cls = s && s.end === pos + text.length ? s.cls : style ? style.split(' ').map((x) => `cm-${x}`).join(' ') : '';
    out += cls ? `<span class="${cls}">${esc(text)}</span>` : esc(text);
    pos += text.length;
  });
  return out;
}

/** The colours, in the code themes' variables: objects like numbers' blue, members like properties. */
export const SEM_CSS = (scope: string) =>
  `${scope} .cm-nucleus-obj, ${scope} .cm-nucleus-val { color: var(--num); }
${scope} .cm-nucleus-prop, ${scope} .cm-nucleus-fn { color: var(--prop); }`;
export { SEM_STATIC_CSS } from './semcss';
