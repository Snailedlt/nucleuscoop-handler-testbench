// Keyboard shortcuts drawn as keys: `Ctrl+Shift+P` (in code, bold or plain text) becomes
// <kbd class="keys"><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd></kbd>. A screen reader reads it as the text it was
// ("Ctrl+Shift+P"); the nested kbd is HTML's own markup for a key combination. Used at build time for the site's
// pages (build.mjs) and at runtime by Learn, so every page shows keys the same way. No DOM, no Node.

const MOD = '(?:Ctrl|Shift|Alt|AltGr|Cmd|Option|Win)';
const NAMED = '(?:F(?:1[0-2]|[1-9])|Esc|Enter|Tab|Space|Backspace|Delete|Del|Home|End|PageUp|PageDown|Up|Down|Left|Right|[↑↓←→])';
const KEY = `(?:${NAMED}|[A-Z0-9]|[.,;/\\\\\\[\\]\`'=+-])`;
/** One stroke: modifiers, then a key (`Ctrl+Shift+P`, `F8`, `Esc`). */
const STROKE = `(?:${MOD}\\+)*${KEY}`;
const WHOLE = new RegExp(`^${STROKE}(?: ${STROKE})*$`);
const HAS_MOD = new RegExp(`${MOD}\\+`);
const ALONE = new RegExp(`^${NAMED}$`);

/** A key combination (with a modifier, or a named key such as F8 or Esc on its own), as written in the docs. */
export function isKeyCombo(t: string): boolean {
  const s = t.trim();
  return WHOLE.test(s) && (HAS_MOD.test(s) || ALONE.test(s) || s.split(' ').every((x) => ALONE.test(x)));
}

const esc = (t: string) => t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const unesc = (t: string) => t.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');

/** The keys' markup for a combination ("Ctrl+K Ctrl+0" is two strokes, one after the other). */
export function keysHtml(combo: string): string {
  const strokes = combo.trim().split(' ').map((st) => {
    // "Ctrl++" or "Ctrl+-": the last + is the key itself.
    const parts = st.endsWith('++') ? [...st.slice(0, -2).split('+'), '+'] : st.split('+');
    return parts.map((k) => `<kbd>${esc(k)}</kbd>`).join('<span class="kplus">+</span>');
  });
  return `<kbd class="keys">${strokes.join(' ')}</kbd>`;
}

// A combination written as plain text in a sentence ("press Ctrl+T twice"): only with a modifier, so a word like
// "Enter" in a sentence stays a word.
const BARE = new RegExp(`(^|[\\s(“"'/])(${MOD}(?:\\+${MOD})*\\+${KEY}(?: (?:${MOD}\\+)+${KEY}| [A-Z](?![A-Za-z]))?)(?![A-Za-z0-9])`, 'g');
const SKIP = /^<(pre|code|kbd|script|style|textarea|title|button|select|option)\b/i;

/**
 * Every key combination in an HTML fragment drawn as keys: inside <code>, <kbd>, <strong>, <b> or <em> when that
 * element holds nothing else, and in plain text when it has a modifier. Code blocks, scripts and existing keys
 * are left alone, and so are attributes (only text between tags changes).
 */
export function kbdify(html: string): string {
  // Whole elements that are only a combination: `Ctrl+Space`, **Ctrl+Alt+E**, <kbd>Ctrl+P</kbd>.
  html = html.replace(/<(code|kbd|strong|b|em)(\s[^>]*)?>([^<]{1,40})<\/\1>/g, (m, tag: string, attrs: string | undefined, inner: string) =>
    (attrs && /class="[^"]*\b(?:keys|hl|cm-)/.test(attrs)) || !isKeyCombo(unesc(inner)) ? m : keysHtml(unesc(inner)));
  // Plain text, outside code and the like.
  const parts = html.split(/(<[^>]+>)/);
  let skip: string[] = [];
  return parts.map((p) => {
    if (p.startsWith('<')) {
      const close = /^<\/([a-z0-9]+)/i.exec(p);
      if (close) { if (skip.length && skip[skip.length - 1] === close[1].toLowerCase()) skip.pop(); return p; }
      const open = SKIP.exec(p);
      if (open && !p.endsWith('/>')) skip.push(open[1].toLowerCase());
      return p;
    }
    if (skip.length || !p) return p;
    return p.replace(BARE, (_m, pre: string, combo: string) => pre + keysHtml(unesc(combo)));
  }).join('');
}

/** The keys' look, for pages with the site's tokens (--line, --surface, --fg, --muted). */
export const KEYS_CSS = `kbd.keys { background: none; padding: 0; font: inherit; white-space: nowrap; }
kbd.keys > kbd { display: inline-block; min-width: 1.6em; text-align: center; font: 600 .8em/1.55 var(--mono, ui-monospace, monospace); padding: 0 .45em; border: 1px solid var(--line); border-bottom-width: 2px; border-radius: 5px; background: var(--surface); color: var(--fg); vertical-align: .1em; }
kbd.keys .kplus { color: var(--muted); font-size: .8em; padding: 0 1px; }`;
