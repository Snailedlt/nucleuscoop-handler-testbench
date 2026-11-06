// Looks you pick in Settings → Theme: the built-in ones (themes.json) and your own theme files,
// which use the same format (themekit.ts): a name, an optional base look, and the tokens it changes,
// shared for both modes or per mode.
//
//   {
//     "name": "Sunset",
//     "base": "www",
//     "shared": { "r-pane": "18px" },
//     "light": { "bg": "#fbf1e6", "surface": "#fffaf4", "accent": "#b4232c" },
//     "dark":  { "bg": "#1a1210", "accent": "#ff8a65" }
//   }
//
// Tokens left out come from the base, or are derived from what the file sets (a new surface gets
// matching tiles and borders). Only known tokens are taken, and only values the browser accepts
// for that kind of token, with no url(): a file changes colours, corners, shadows and fonts, nothing
// else. Several can be kept; one is on at a time.

import THEMES from './themes.json';
import { CODE_SCOPE, CodeTheme, codeThemeCSS, codeTokens, Look, lookCSS, Mode, PAIRS, resolve, TOKENS } from './themekit';

const BUILT_IN = THEMES.looks as Record<string, Look>;
export const BUILT_IN_LOOKS = Object.keys(BUILT_IN);
const LIST_KEY = 'nucleus-workbench-themes';
const PICK_KEY = 'nucleus-workbench-theme-on'; // the custom look that's on (none: a built-in one)
const SITE_KEY = 'nucleus-workbench-dev-site'; // the built-in look (shared with the dev bar)
const OLD_KEY = 'nucleus-workbench-custom-theme'; // one theme, before there could be several
const STYLE_ID = 'custom-theme';

export interface CustomLook extends Look {
  id: string;
  base: string;
}

const get = (k: string) => {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
};
const put = (k: string, v: string | null) => {
  try {
    if (v == null) localStorage.removeItem(k);
    else localStorage.setItem(k, v);
  } catch {}
};

export function customLooks(): CustomLook[] {
  try {
    const list = JSON.parse(get(LIST_KEY) || '[]') as CustomLook[];
    // The single theme of the first version becomes the first of the list, and stays on.
    const old = get(OLD_KEY);
    if (old) {
      const o = JSON.parse(old) as Look;
      const id = `t${Date.now().toString(36)}`;
      list.push({ ...o, id, base: o.base && BUILT_IN[o.base] ? o.base : builtInLook() });
      put(LIST_KEY, JSON.stringify(list));
      put(PICK_KEY, id);
      put(OLD_KEY, null);
    }
    return Array.isArray(list) ? list.filter((t) => t && t.id && t.name) : [];
  } catch {
    return [];
  }
}
const builtInLook = () => (get(SITE_KEY) && BUILT_IN[get(SITE_KEY)!] ? get(SITE_KEY)! : THEMES.default);
/** The look that's on: a built-in id, or a custom look's id. */
export function currentLook(): string {
  const list = customLooks(); // first: it also brings over a theme from the first version
  const id = get(PICK_KEY);
  return id && list.some((t) => t.id === id) ? id : builtInLook();
}
const lookById = (id: string): Look | undefined => BUILT_IN[id] ?? customLooks().find((t) => t.id === id);
export const lookName = (id: string) => lookById(id)?.name ?? id;
/** A look's description, its first sentence. */
export const lookAbout = (id: string) => lookById(id)?.about?.split(/(?<=\.)\s/)[0];
export const isCustom = (id: string) => !BUILT_IN[id];

/** A look's full tokens for one mode. */
export function lookTokens(id: string, mode: Mode) {
  const all: Record<string, Look> = { ...BUILT_IN };
  for (const t of customLooks()) all[t.id] = t;
  return resolve(id, all, mode);
}

/** Checks a parsed file; returns the look to keep and what was left out. */
export function parseTheme(raw: unknown): { look: Omit<CustomLook, 'id'>; skipped: string[] } | { error: string } {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return { error: 'This file isn\'t a theme: it should be a JSON object with "light", "dark" and/or "shared".' };
  const o = raw as Record<string, unknown>;
  const skipped: string[] = [];
  const part = (m: 'light' | 'dark' | 'shared') => {
    const v = o[m];
    if (v == null) return undefined;
    if (typeof v !== 'object' || Array.isArray(v)) return void skipped.push(`"${m}" (not an object)`);
    const out: Record<string, string> = {};
    for (const [k0, val] of Object.entries(v as Record<string, unknown>)) {
      const k = k0.replace(/^--/, '');
      const kind = TOKENS[k];
      const value = typeof val === 'string' || typeof val === 'number' ? String(val).trim() : '';
      // No url(), imports or anything that could close the rule.
      const safe = value && value.length <= 300 && !/[;{}<>\\]|url\s*\(|@import|expression\s*\(/i.test(value);
      const ok =
        kind === 'number' ? /^\d{3}$/.test(value)
        : kind === 'percent' ? /^\d{2,3}%$/.test(value)
        : !!safe && CSS.supports({ color: 'color', length: 'border-radius', shadow: 'box-shadow', font: 'font-family' }[kind!] ?? 'color', value);
      if (!kind) skipped.push(`${m}.${k0} (not a theme token)`);
      else if (!ok) skipped.push(`${m}.${k0} (not a valid ${kind})`);
      else out[k] = value;
    }
    return Object.keys(out).length ? out : undefined;
  };
  const light = part('light');
  const dark = part('dark');
  const shared = part('shared');
  if (!light && !dark && !shared) return { error: `Nothing in this file can be used${skipped.length ? `: ${skipped.slice(0, 4).join(', ')}` : ''}.` };
  let base = typeof o.base === 'string' ? o.base : '';
  if (base && !BUILT_IN[base]) skipped.push(`base "${base}" (built-in looks: ${BUILT_IN_LOOKS.join(', ')})`), (base = '');
  const name = typeof o.name === 'string' && o.name.trim() ? o.name.trim().slice(0, 60) : 'Custom theme';
  const about = typeof o.about === 'string' ? o.about.trim().slice(0, 200) : undefined;
  return { look: { name, about, base: base || builtInLook(), shared, light, dark }, skipped };
}

/** Adds a look (one with the same name is replaced) and turns it on. */
export function addLook(look: Omit<CustomLook, 'id'>): CustomLook {
  const list = customLooks();
  const same = list.find((t) => t.name === look.name);
  const t: CustomLook = { ...look, id: same?.id ?? `t${Date.now().toString(36)}` };
  put(LIST_KEY, JSON.stringify(same ? list.map((x) => (x.id === t.id ? t : x)) : [...list, t]));
  pickLook(t.id);
  return t;
}
export function removeLook(id: string) {
  put(LIST_KEY, JSON.stringify(customLooks().filter((t) => t.id !== id)));
  if (get(PICK_KEY) === id) put(PICK_KEY, null);
  applyCustomTheme();
}
/** Turns a look on: a built-in one (as the dev bar does), or a custom one over its base. */
export function pickLook(id: string) {
  const custom = customLooks().find((t) => t.id === id);
  const site = custom ? custom.base : id;
  put(SITE_KEY, site === THEMES.default ? null : site);
  put(PICK_KEY, custom ? id : null);
  applyCustomTheme();
}

/** Applies the look that's on. Safe to call before the page renders. */
export function applyCustomTheme() {
  const root = document.documentElement;
  const site = builtInLook();
  if (site === THEMES.default) delete root.dataset.site;
  else root.dataset.site = site;
  const id = currentLook();
  let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!isCustom(id)) {
    style?.remove();
    delete root.dataset.customTheme;
    return;
  }
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  // The attribute three times: these rules win over every built-in look.
  style.textContent = lookCSS(':root[data-custom-theme][data-custom-theme][data-custom-theme]', lookTokens(id, 'light'), lookTokens(id, 'dark'));
  root.dataset.customTheme = '';
}
// The dev bar picked a built-in look: no custom one over it.
window.addEventListener('workbench-look', () => (put(PICK_KEY, null), applyCustomTheme()));

/** The look that's on, as a theme file: a custom one as it was loaded; a built-in one as a full starting point. */
export function themeFile(id = currentLook()): Record<string, unknown> {
  const about = 'A Nucleus Handler Workbench theme. "base" is the look it builds on (www or v3); change or delete any value (what you delete comes from the base), then load it in Settings → Theme → Add a theme file. Token names: the design note, or src/themes.json.';
  const custom = customLooks().find((t) => t.id === id);
  if (custom) {
    const { id: _id, ...rest } = custom;
    return { $about: about, ...rest };
  }
  const L = lookTokens(id, 'light');
  const D = lookTokens(id, 'dark');
  const colours = (t: Record<string, string>) => Object.fromEntries(Object.entries(t).filter(([k]) => TOKENS[k] === 'color' && !/^p\d$/.test(k)));
  const shared = Object.fromEntries(Object.entries(L).filter(([k]) => TOKENS[k] && (TOKENS[k] !== 'color' || /^p\d$/.test(k))));
  return { $about: about, name: `My ${BUILT_IN[id].name} theme`, base: id, shared, light: colours(L), dark: colours(D) };
}

/** The text pairs below WCAG AA (4.5:1) in the look the page shows now. */
export function contrastProblems(): string[] {
  const probe = document.createElement('span');
  probe.hidden = true;
  document.body.appendChild(probe);
  const rgb = (v: string) => {
    probe.style.color = '';
    probe.style.color = `var(--${v})`;
    const c = getComputedStyle(probe).color; // rgb(…), or color(srgb 0–1 …) for a color-mix()
    const n = (c.match(/[\d.]+/g) || ['0', '0', '0']).slice(0, 3).map(Number);
    return c.startsWith('color(') ? n.map((x) => x * 255) : n;
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

// ---- Code colours: chosen apart from the look (Settings → Theme → Code colours) ----
const CODE_KEY = 'nucleus-workbench-code-theme';
const CODE_STYLE_ID = 'code-theme';
export const CODE_THEMES = (THEMES as unknown as { codeThemes: Record<string, CodeTheme> }).codeThemes;
/** The code theme that's on: an id from themes.json, or '' for the look's own colours. */
export const currentCodeTheme = () => {
  const id = get(CODE_KEY) ?? '';
  return CODE_THEMES[id] ? id : '';
};
export function pickCodeTheme(id: string) {
  put(CODE_KEY, id && CODE_THEMES[id] ? id : null);
  applyCodeTheme();
}
/** A code theme's tokens in one mode ('' = the look's own, as the page shows it). */
export function codeThemeTokens(id: string, mode: Mode): Record<string, string> {
  if (!id) {
    const t = lookTokens(currentLook(), mode);
    return { 'code-bg': t['code-bg'], 'code-fg': t['code-fg'] ?? t.fg, kw: t.kw, str: t.str, num: t.num, cmt: t.cmt, prop: t.prop };
  }
  const c = CODE_THEMES[id];
  return codeTokens((mode === 'dark' && c.dark) || c.light);
}
export function applyCodeTheme() {
  const id = currentCodeTheme();
  let style = document.getElementById(CODE_STYLE_ID) as HTMLStyleElement | null;
  if (!id) return void style?.remove();
  if (!style) {
    style = document.createElement('style');
    style.id = CODE_STYLE_ID;
    document.head.appendChild(style);
  }
  style.textContent = codeThemeCSS(CODE_THEMES[id], CODE_SCOPE.filter((s) => s !== '.ct-sample'));
}
