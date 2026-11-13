// Whether inline code is clearly code, shared by the workbench (codehl.ts) and the build (the site's pages).
/** Whether inline code is clearly code (a member path, a call, a literal, an operator), not a plain word in running
 *  text: `Game.Play`, `includes()`, `"-windowed"`, `true` are coloured; `handlers` or `ExecutableName` stay plain. */
export function looksLikeCodeText(s: string): boolean {
  const t = s.trim();
  if (!t || t.length > 400) return false;
  if (/^[\w$]+$/.test(t)) return /^(true|false|null|undefined|var|function|new|\d[\d.]*)$/.test(t);
  if (/[\\/]/.test(t) && !/[("=]/.test(t)) return false; // a path or a file name
  return /[.()=;"'[\]{}+<>!-]/.test(t);
}

