// Markdown inline code in already-escaped HTML: `a`, or `` a `b` `` with a longer fence for code that has backticks
// in it (CommonMark: one space just inside each end of the fence is dropped). Explain writes template strings so.
// A fence starts at the beginning of a run of backticks, never in the middle of one.
const SPAN = /(?<!`)(`+)(?!`)([\s\S]*?[^`])\1(?!`)/g;
const code = (c: string) => `<code>${/^ [\s\S]* $/.test(c) && c.trim() ? c.slice(1, -1) : c}</code>`;

export function codeSpans(html: string): string {
  return html.replace(SPAN, (_m, _fence, c: string) => code(c));
}

/**
 * The code spans, with `rest` applied only to the text around them, so bold, italics and links never reach inside
 * code (`a_b_c`, `**x**`, a URL in code). The placeholders start with `<`, which escaped HTML never has, so no other
 * pattern can match across them.
 */
export function withCodeSpans(html: string, rest: (text: string) => string): string {
  const spans: string[] = [];
  const out = rest(html.replace(SPAN, (_m, _fence, c: string) => `<\u0001${spans.push(code(c)) - 1}\u0001>`));
  return out.replace(/<\u0001(\d+)\u0001>/g, (_m, i: string) => spans[Number(i)]);
}
