// Small helpers every part of the page uses: the element lookup, HTML escaping, the docs' tiny Markdown, and
// whether the screen is narrow (a phone: the code or the results, with a switch).
import { hlHtml } from './codehl';

export const $ = <T extends HTMLElement = HTMLElement>(sel: string) => document.querySelector(sel) as T;
export const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

/** The narrow layout's breakpoint (page.html's `@media (max-width: 860px)`). */
export const NARROW = '(max-width: 860px)';
let narrowQuery: MediaQueryList | undefined;
/** The page is in its narrow layout: the handler or the results, not both. */
export function narrow(): boolean {
  return (narrowQuery ??= matchMedia(NARROW)).matches;
}
/** Runs `fn` when the page enters or leaves the narrow layout. */
export function onNarrowChange(fn: () => void) {
  (narrowQuery ??= matchMedia(NARROW)).addEventListener('change', fn);
}

/** Tiny Markdown for API docs: fenced code, inline code, bold, links, paragraphs. */
export function md(src: string): string {
  const out: string[] = [];
  const parts = src.split(/```(\w*)\n?([\s\S]*?)```/g);
  for (let i = 0; i < parts.length; i++) {
    if (i % 3 === 0) {
      for (const para of parts[i].split(/\n{2,}/)) {
        if (!para.trim()) continue;
        const inl = (t: string) => {
          let h = esc(t);
          h = h.replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/(^|[\s(])_([^_]+)_(?=$|[\s.,)])/g, '$1<em>$2</em>');
          h = h.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
          return h.replace(/(^|\s)(https?:\/\/[^\s<]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>');
        };
        const lines = para.trim().split('\n');
        // A list: every line starts with "- ".
        if (lines.every((l) => /^\s*[-*] /.test(l))) out.push(`<ul>${lines.map((l) => `<li>${inl(l.replace(/^\s*[-*] /, ''))}</li>`).join('')}</ul>`);
        else out.push(`<p>${inl(para.trim()).replace(/\n/g, '<br>')}</p>`);
      }
    } else if (i % 3 === 2) out.push(`<pre class="doc-code">${esc(parts[i].trim())}</pre>`);
  }
  return hlHtml(out.join(''));
}
