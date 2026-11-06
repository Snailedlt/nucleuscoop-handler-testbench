// Custom themes: a JSON file that sets the workbench's design tokens (the CSS custom properties at
// the top of page.html), for light, dark, or both. Missing tokens keep the built-in theme's value.
//
//   {
//     "name": "My theme",
//     "light": { "bg": "#f7f5f2", "accent": "#b4232c", "r-pane": "16px" },
//     "dark":  { "bg": "#121212", "accent": "#ff8a80" }
//   }
//
// "Download the current theme" writes this file with every token filled in, as a starting point.
// Only known tokens are taken, and only values the browser accepts for that kind of token, with no
// url(), so a theme file can change colours, corners, shadows and fonts, nothing else.

import { PAIRS } from './devbar';

const STORE = 'nucleus-workbench-custom-theme';
const STYLE_ID = 'custom-theme';

type Kind = 'color' | 'length' | 'shadow' | 'font';
/** Every token a theme can set, with the kind of value it takes. */
export const THEME_TOKENS: Record<string, Kind> = {
  bg: 'color', surface: 'color', 'surface-2': 'color', line: 'color', fg: 'color', muted: 'color',
  accent: 'color', 'accent-fg': 'color', brand: 'color',
  err: 'color', 'err-bg': 'color', warn: 'color', 'warn-bg': 'color', info: 'color', 'info-bg': 'color', ok: 'color', 'ok-bg': 'color',
  'code-bg': 'color', kw: 'color', str: 'color', num: 'color', cmt: 'color', prop: 'color',
  p1: 'color', p2: 'color', p3: 'color', p4: 'color', p5: 'color', p6: 'color', p7: 'color', p8: 'color',
  'r-sm': 'length', 'r-ctl': 'length', 'r-pane': 'length', 'r-lg': 'length',
  'sh-1': 'shadow', 'sh-2': 'shadow',
  'font-body': 'font', 'font-display': 'font', 'font-mono': 'font',
};
const SUPPORTS: Record<Kind, string> = { color: 'color', length: 'border-radius', shadow: 'box-shadow', font: 'font-family' };

export interface CustomTheme {
  name: string;
  light?: Record<string, string>;
  dark?: Record<string, string>;
}

const read = (): CustomTheme | null => {
  try {
    const s = localStorage.getItem(STORE);
    return s ? (JSON.parse(s) as CustomTheme) : null;
  } catch {
    return null;
  }
};

/** Checks a parsed file; returns the theme to keep and what was left out. */
export function parseTheme(raw: unknown): { theme: CustomTheme; skipped: string[] } | { error: string } {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return { error: 'This file isn\'t a theme: it should be a JSON object with "light" and/or "dark".' };
  const o = raw as Record<string, unknown>;
  const skipped: string[] = [];
  const mode = (m: 'light' | 'dark'): Record<string, string> | undefined => {
    const v = o[m];
    if (v == null) return undefined;
    if (typeof v !== 'object' || Array.isArray(v)) return void skipped.push(`"${m}" (not an object)`);
    const out: Record<string, string> = {};
    for (const [k0, val] of Object.entries(v as Record<string, unknown>)) {
      const k = k0.replace(/^--/, '');
      const kind = THEME_TOKENS[k];
      const value = typeof val === 'string' ? val.trim() : '';
      // No url(), imports or anything that could close the rule: colours, sizes, shadows and fonts only.
      const safe = value && value.length <= 300 && !/[;{}<>\\]|url\s*\(|@import|expression\s*\(/i.test(value);
      if (!kind) skipped.push(`${m}.${k0} (not a theme token)`);
      else if (!safe || !CSS.supports(SUPPORTS[kind], value)) skipped.push(`${m}.${k0} (not a valid ${kind})`);
      else out[k] = value;
    }
    return Object.keys(out).length ? out : undefined;
  };
  const light = mode('light');
  const dark = mode('dark');
  if (!light && !dark) return { error: `Nothing in this file can be used${skipped.length ? `: ${skipped.slice(0, 4).join(', ')}` : ''}.` };
  const name = typeof o.name === 'string' && o.name.trim() ? o.name.trim().slice(0, 60) : 'Custom theme';
  return { theme: { name, light, dark }, skipped };
}

const decl = (t?: Record<string, string>) => (t ? Object.entries(t).map(([k, v]) => `--${k}: ${v};`).join(' ') : '');

/** Applies the stored custom theme (or none). Safe to call before the page renders. */
export function applyCustomTheme() {
  const t = read();
  const root = document.documentElement;
  let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!t || (!t.light && !t.dark)) {
    style?.remove();
    delete root.dataset.customTheme;
    return;
  }
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  // The attribute three times: these rules win over the built-in themes (www and v3, light and dark).
  const r = ':root[data-custom-theme][data-custom-theme][data-custom-theme]';
  const L = decl(t.light);
  const D = decl(t.dark);
  style.textContent = [
    L && `@media (prefers-color-scheme: light) { ${r}:not([data-theme="dark"]) { ${L} } } ${r}[data-theme="light"] { ${L} }`,
    D && `@media (prefers-color-scheme: dark) { ${r}:not([data-theme="light"]) { ${D} } } ${r}[data-theme="dark"] { ${D} }`,
  ]
    .filter(Boolean)
    .join('\n');
  root.dataset.customTheme = '';
}

export const customTheme = read;
export function saveCustomTheme(t: CustomTheme | null) {
  try {
    if (t) localStorage.setItem(STORE, JSON.stringify(t));
    else localStorage.removeItem(STORE);
  } catch {}
  applyCustomTheme();
}

/** Every token's value as the page shows it now, for light and dark: the template to start from. */
export function currentTheme(name = 'My theme'): CustomTheme & { $about: string } {
  const root = document.documentElement;
  const before = root.dataset.theme;
  const take = (m: 'light' | 'dark') => {
    root.dataset.theme = m;
    const cs = getComputedStyle(root);
    const out: Record<string, string> = {};
    for (const k of Object.keys(THEME_TOKENS)) out[k] = cs.getPropertyValue(`--${k}`).trim();
    return out;
  };
  const light = take('light');
  const dark = take('dark');
  if (before === undefined) delete root.dataset.theme;
  else root.dataset.theme = before;
  return {
    $about: 'A Nucleus Handler Workbench theme. Change any value, delete the ones you keep as they are, then load it in Settings → Appearance → Custom theme. Token names: the design note, or the :root blocks in page.html.',
    name,
    light,
    dark,
  };
}

/** The text pairs below WCAG AA (4.5:1) in the theme the page shows now. */
export function contrastProblems(): string[] {
  const probe = document.createElement('span');
  probe.hidden = true;
  document.body.appendChild(probe);
  const rgb = (v: string) => {
    probe.style.color = '';
    probe.style.color = `var(--${v})`;
    return (getComputedStyle(probe).color.match(/[\d.]+/g) || ['0', '0', '0']).slice(0, 3).map(Number);
  };
  const lum = (c: number[]) => c.map((x) => ((x /= 255) <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4)).reduce((a, x, i) => a + x * [0.2126, 0.7152, 0.0722][i], 0);
  const out: string[] = [];
  for (const [fg, bg, name] of PAIRS) {
    const [x, y] = [lum(rgb(fg)), lum(rgb(bg))].sort((p, q) => q - p);
    const r = (x + 0.05) / (y + 0.05);
    if (r < 4.5) out.push(`${name} ${r.toFixed(1)}:1`);
  }
  probe.remove();
  return out;
}
