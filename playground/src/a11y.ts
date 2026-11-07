// Accessibility settings (Settings › Accessibility). Each one is a data-a11y-* attribute on <html> that page.html's CSS
// reads, or a value other modules ask for (noteDuration, hoverDelay, announceLine).
const KEY = 'nucleus-workbench-a11y';
type Prefs = { underline: 'wavy' | 'straight' | 'dotted' | 'thick'; cb: boolean; focus: boolean; targets: boolean; font: boolean; notes: boolean; slowhover: boolean; announce: boolean };
const DEFAULTS: Prefs = { underline: 'wavy', cb: false, focus: false, targets: false, font: false, notes: false, slowhover: false, announce: false };
let prefs: Prefs = { ...DEFAULTS };
try { prefs = { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) ?? '{}') }; } catch { /* storage off: defaults */ }

const FONT_URL = 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Atkinson+Hyperlegible+Mono:wght@400;600&display=swap';
function loadFont() {
  if (document.getElementById('a11y-font-css')) return;
  const l = document.createElement('link');
  l.id = 'a11y-font-css'; l.rel = 'stylesheet'; l.href = FONT_URL;
  document.head.appendChild(l);
}
function apply() {
  const r = document.documentElement;
  const flag = (name: string, on: boolean) => (on ? r.setAttribute(`data-a11y-${name}`, '') : r.removeAttribute(`data-a11y-${name}`));
  if (prefs.underline === 'wavy') r.removeAttribute('data-a11y-underline'); else r.setAttribute('data-a11y-underline', prefs.underline);
  flag('cb', prefs.cb); flag('focus', prefs.focus); flag('targets', prefs.targets); flag('font', prefs.font);
  if (prefs.font) loadFont();
  document.dispatchEvent(new CustomEvent('a11y-change'));
}
apply();

/** How long a note stays: Infinity when the user wants notes to stay until closed. */
export const noteDuration = (ms: number) => (prefs.notes ? Infinity : ms);
/** Delay before a hover card opens. */
export const hoverDelay = (ms: number) => (prefs.slowhover ? Math.max(ms, 900) : ms);
/** Whether to read out the problems on the line the cursor moves to. */
export const announceLine = () => prefs.announce;

/** Wires the controls in Settings › Accessibility. */
export function initA11y() {
  const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T | null;
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch { /* not kept */ } apply(); };
  const sel = $<HTMLSelectElement>('a11y-underline');
  if (sel) {
    sel.value = prefs.underline;
    sel.addEventListener('change', () => { prefs.underline = sel.value as Prefs['underline']; save(); });
  }
  for (const k of ['cb', 'focus', 'targets', 'font', 'notes', 'slowhover', 'announce'] as const) {
    const box = $<HTMLInputElement>(`a11y-${k}`);
    if (!box) continue;
    box.checked = prefs[k];
    box.addEventListener('change', () => { prefs[k] = box.checked; save(); });
  }
}
