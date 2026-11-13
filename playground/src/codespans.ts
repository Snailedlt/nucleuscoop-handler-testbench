// Markdown inline code in already-escaped HTML: `a`, or `` a `b` `` with a longer fence for code that has backticks
// in it (CommonMark: one space just inside each end of the fence is dropped). Explain writes template strings so.
export function codeSpans(html: string): string {
  return html.replace(/(`+)(?!`)([\s\S]*?[^`])\1(?!`)/g, (_m, _fence, c: string) => `<code>${/^ [\s\S]* $/.test(c) && c.trim() ? c.slice(1, -1) : c}</code>`);
}
