// Looks (themes.json, and custom theme files): one format, resolved and turned into CSS by this
// module, both at build time (the built-in looks, written into the page) and in the page (a custom
// theme). No DOM here, so build.mjs can run it in Node.
//
// A look: { name, about?, base?, shared?, light?, dark? }.
//   base    another look this one builds on (it only lists what it changes)
//   shared  tokens for light and dark alike (fonts, corners, shadows, player colours)
//   light / dark  the colours of each mode
// Resolution, per mode: the base's tokens, then shared, then the mode's own. A token the look leaves
// out but that depends on tokens it sets (DERIVED) is worked out from them, so a theme that sets a
// new background and text colour gets matching tiles, borders and status backgrounds too.

export type Tokens = Record<string, string>;
export interface Look {
  name: string;
  about?: string;
  base?: string;
  shared?: Tokens;
  light?: Tokens;
  dark?: Tokens;
}
export type Mode = 'light' | 'dark';

// Token pairs that carry text, checked against WCAG AA (4.5:1).
export const PAIRS: [string, string, string][] = [
  ['fg', 'bg', 'Text on the page'],
  ['fg', 'surface', 'Text on panes'],
  ['muted', 'surface', 'Secondary text'],
  ['accent-fg', 'accent', 'Primary button'],
  ['accent', 'surface', 'Links and highlights'],
  ['err', 'err-bg', 'Error'],
  ['warn', 'warn-bg', 'Warning'],
  ['ok', 'ok-bg', 'OK'],
  ['info', 'info-bg', 'Info'],
  ['fg', 'code-bg', 'Code'],
  ['kw', 'code-bg', 'Code: keyword'],
  ['str', 'code-bg', 'Code: string'],
  ['num', 'code-bg', 'Code: number'],
  ['cmt', 'code-bg', 'Code: comment'],
  ['prop', 'code-bg', 'Code: property'],
];

type Kind = 'color' | 'length' | 'shadow' | 'font' | 'number' | 'percent';
/** Every token a look can set, with the kind of value it takes. */
export const TOKENS: Record<string, Kind> = {
  bg: 'color', surface: 'color', 'surface-2': 'color', line: 'color', fg: 'color', muted: 'color',
  accent: 'color', 'accent-fg': 'color', brand: 'color',
  err: 'color', 'err-bg': 'color', warn: 'color', 'warn-bg': 'color', info: 'color', 'info-bg': 'color', ok: 'color', 'ok-bg': 'color',
  'code-bg': 'color', 'code-fg': 'color', 'code-muted': 'color', 'code-gutter': 'color', 'code-line': 'color', kw: 'color', str: 'color', num: 'color', cmt: 'color', prop: 'color',
  p1: 'color', p2: 'color', p3: 'color', p4: 'color', p5: 'color', p6: 'color', p7: 'color', p8: 'color',
  'r-sm': 'length', 'r-ctl': 'length', 'r-pane': 'length', 'r-lg': 'length',
  'sh-1': 'shadow', 'sh-2': 'shadow',
  'font-body': 'font', 'font-display': 'font', 'font-mono': 'font',
  'display-stretch': 'percent', 'display-weight': 'number',
};

/** How a token left out is worked out from the ones it depends on (only when the look sets one of those). */
const DERIVED: Record<string, { from: string[]; make: (t: Tokens, mode: Mode) => string }> = {
  'surface-2': { from: ['surface', 'fg'], make: (t, m) => `color-mix(in srgb, ${t.fg} ${m === 'dark' ? 7 : 5}%, ${t.surface})` },
  line: { from: ['surface', 'fg'], make: (t, m) => `color-mix(in srgb, ${t.fg} ${m === 'dark' ? 18 : 14}%, ${t.surface})` },
  'accent-fg': { from: ['accent'], make: (t) => readableOn(t.accent) },
  brand: { from: ['accent'], make: (t) => t.accent },
  'err-bg': { from: ['err', 'surface'], make: (t, m) => `color-mix(in srgb, ${t.err} ${m === 'dark' ? 18 : 10}%, ${t.surface})` },
  'warn-bg': { from: ['warn', 'surface'], make: (t, m) => `color-mix(in srgb, ${t.warn} ${m === 'dark' ? 16 : 10}%, ${t.surface})` },
  'info-bg': { from: ['info', 'surface'], make: (t, m) => `color-mix(in srgb, ${t.info} ${m === 'dark' ? 16 : 9}%, ${t.surface})` },
  'ok-bg': { from: ['ok', 'surface'], make: (t, m) => `color-mix(in srgb, ${t.ok} ${m === 'dark' ? 16 : 9}%, ${t.surface})` },
  'code-bg': { from: ['surface', 'fg'], make: (t, m) => `color-mix(in srgb, ${t.fg} ${m === 'dark' ? 4 : 2}%, ${t.surface})` },
};

/** Black or white, whichever reads better on a colour (hex only; anything else gets white). */
export function readableOn(c: string): string {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(c.trim());
  if (!m) return '#ffffff';
  const h = m[1].length === 3 ? [...m[1]].map((x) => x + x).join('') : m[1];
  const lum = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  const L = 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
  return L > 0.18 ? '#0b0d12' : '#ffffff';
}

/** A look's tokens for one mode, with its base's below them and the derived ones filled in. */
export function resolve(name: string, looks: Record<string, Look>, mode: Mode, seen: string[] = []): Tokens {
  const look = looks[name];
  if (!look || seen.includes(name)) return {};
  const below = look.base ? resolve(look.base, looks, mode, [...seen, name]) : {};
  const own: Tokens = { ...look.shared, ...look[mode] };
  const t: Tokens = { ...below, ...own };
  for (const [k, d] of Object.entries(DERIVED)) if (!(k in own) && d.from.some((f) => f in own) && d.from.every((f) => f in t)) t[k] = d.make(t, mode);
  return t;
}

const decl = (t: Tokens) => Object.entries(t).map(([k, v]) => `--${k}: ${v};`).join(' ');

/**
 * The CSS for a look, light and dark, under a selector (e.g. ':root' or ':root[data-site="v3"]'):
 * light by default, dark when the device prefers it, and either when the viewer picked one.
 * only: just these tokens (a custom theme emits only what differs from its base).
 */
export function lookCSS(sel: string, light: Tokens, dark: Tokens): string {
  const L = decl(light) + ' color-scheme: light;';
  const D = decl(dark) + ' color-scheme: dark;';
  return `${sel} { ${L} }\n@media (prefers-color-scheme: dark) { ${sel}:not([data-theme="light"]) { ${D} } }\n${sel}[data-theme="dark"] { ${D} }\n${sel}[data-theme="light"] { ${L} }`;
}

/** The built-in looks' CSS (themes.json): the default on :root, the others under [data-site]. */
export function builtInCSS(file: { default: string; looks: Record<string, Look> }): string {
  return Object.keys(file.looks)
    .map((id) => {
      // The attribute twice: these win over the default look's rules.
      const sel = id === file.default ? ':root' : `:root[data-site="${id}"][data-site]`;
      return `/* ${file.looks[id].name} */\n${lookCSS(sel, resolve(id, file.looks, 'light'), resolve(id, file.looks, 'dark'))}`;
    })
    .join('\n');
}

/** A code colour theme: the editor's own colours, for light and dark (a dark-only theme sets light only). */
export interface CodeTheme {
  name: string;
  about?: string;
  light: Tokens;
  dark?: Tokens;
}
/** Where code colours apply: the editor, the before/after views and file previews. */
export const CODE_SCOPE = ['#editor', '.diff-wrap', '.pkg-text', '.ct-sample', '.hl', '.cf'];
/** A code theme's tokens with the line numbers, gutter and gutter edge worked out from its text and background. */
export function codeTokens(t: Tokens): Tokens {
  const out = { ...t };
  if (t['code-fg'] && t['code-bg']) {
    out["code-muted"] ??= `color-mix(in srgb, ${t["code-fg"]} 72%, ${t["code-bg"]})`;
    out['code-gutter'] ??= `color-mix(in srgb, ${t['code-fg']} 4%, ${t['code-bg']})`;
    out['code-line'] ??= `color-mix(in srgb, ${t['code-fg']} 12%, ${t['code-bg']})`;
  }
  return out;
}
/** The CSS for a code theme, scoped to the code (CODE_SCOPE), light and dark like lookCSS. */
export function codeThemeCSS(t: CodeTheme, scope = CODE_SCOPE): string {
  const at = (root: string) => scope.map((s) => `${root} ${s}`).join(', ');
  const L = decl(codeTokens(t.light));
  const D = decl(codeTokens(t.dark ?? t.light));
  return `${at(':root')} { ${L} }\n@media (prefers-color-scheme: dark) { ${at(':root:not([data-theme="light"])')} { ${D} } }\n${at(':root[data-theme="dark"]')} { ${D} }\n${at(':root[data-theme="light"]')} { ${L} }`;
}
