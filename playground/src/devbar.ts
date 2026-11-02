// Dev bar, modelled on lonnsinnplassering's (web/src/legacy/devtools.ts): a small fixed bar with its own colours,
// so it looks the same in every theme. Off by default. Ctrl+Alt+D turns it on or off (remembered in this
// browser); a #dev link turns it on for that page load only (artifact links can't carry ?env=dev).
//
// It switches the site theme (splitscreen.me / v3.splitscreen.me), the colour mode, and checks WCAG contrast
// of the theme tokens. The theme choice applies whether or not the bar is shown.

type Site = 'www' | 'v3';
type Mode = 'auto' | 'light' | 'dark';

const KEY = (k: string) => `nucleus-workbench-dev-${k}`;
const get = (k: string): string | null => {
  try {
    return localStorage.getItem(KEY(k));
  } catch {
    return null;
  }
};
const set = (k: string, v: string | null) => {
  try {
    if (v == null) localStorage.removeItem(KEY(k));
    else localStorage.setItem(KEY(k), v);
  } catch {
    /* storage unavailable */
  }
};
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export const SITES: { id: Site; label: string; title: string }[] = [
  { id: 'www', label: 'splitscreen.me', title: 'The current site (Docusaurus): brand blue, system fonts, light and dark' },
  { id: 'v3', label: 'v3.splitscreen.me', title: 'The new site ("Bezel"): monochrome, Archivo, light and dark; colour means a player' },
];

// Token pairs that carry text, checked against WCAG AA (4.5:1).
const PAIRS: [string, string, string][] = [
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

const root = document.documentElement;
const hostTheme = root.dataset.theme; // the viewer's own choice, restored by "Auto"

export const site = (): Site => (get('site') === 'v3' ? 'v3' : 'www');
const mode = (): Mode => (get('mode') as Mode) || 'auto';

/** Applies the stored site theme and colour mode. Safe to call before the page renders. */
export function applyTheme() {
  if (site() === 'v3') root.dataset.site = 'v3';
  else delete root.dataset.site;
  const m = mode();
  if (m === 'auto') {
    if (hostTheme) root.dataset.theme = hostTheme;
    else delete root.dataset.theme;
  } else root.dataset.theme = m;
}

export function initDevBar(opts: { build: string; toast: (text: string) => void }) {
  let on = get('on') === '1';
  let min = get('min') === '1';
  let panel: 'contrast' | null = null;

  const probe = document.createElement('span');
  probe.hidden = true;
  document.body.appendChild(probe);
  const rgb = (v: string) => {
    probe.style.color = '';
    probe.style.color = `var(--${v})`;
    return (getComputedStyle(probe).color.match(/[\d.]+/g) || ['0', '0', '0']).slice(0, 3).map(Number);
  };
  const lum = (c: number[]) =>
    c.map((x) => ((x /= 255) <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4)).reduce((a, x, i) => a + x * [0.2126, 0.7152, 0.0722][i], 0);
  const ratio = (a: string, b: string) => {
    const [x, y] = [lum(rgb(a)), lum(rgb(b))].sort((p, q) => q - p);
    return (x + 0.05) / (y + 0.05);
  };
  const contrast = () => PAIRS.map(([fg, bg, name]) => ({ fg, bg, name, r: ratio(fg, bg) }));

  const bar = document.createElement('div');
  bar.id = 'devbar';
  bar.className = 'devbar';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', 'Dev bar');
  document.body.appendChild(bar);
  if ('ResizeObserver' in window) {
    new ResizeObserver(() => root.style.setProperty('--devbar-h', `${bar.hidden ? 0 : bar.offsetHeight + 12}px`)).observe(bar);
  }

  function render() {
    bar.hidden = !on;
    bar.classList.toggle('min', min);
    if (!on) return closePanel();
    if (min) {
      bar.innerHTML = '<button class="devtag" data-dev="min" type="button" title="Show the dev bar">DEV</button>';
      return closePanel();
    }
    const res = contrast();
    const fail = res.filter((x) => x.r < 4.5).length;
    bar.innerHTML = `<button class="devtag" data-dev="min" type="button" title="Minimise">DEV</button>
      <span class="devseg" role="group" aria-label="Site theme">${SITES.map((s) => `<button type="button" data-dev-site="${s.id}" aria-pressed="${site() === s.id}" title="${esc(s.title)}">${esc(s.label)}</button>`).join('')}</span>
      <span class="devseg" role="group" aria-label="Colour mode">${(['auto', 'light', 'dark'] as Mode[])
        .map((m) => `<button type="button" data-dev-mode="${m}" aria-pressed="${mode() === m}">${m[0].toUpperCase() + m.slice(1)}</button>`)
        .join('')}</span>
      <button type="button" data-dev="contrast" aria-pressed="${panel === 'contrast'}" class="${fail ? 'bad' : 'good'}" title="WCAG AA contrast of the theme's text colours">Contrast ${res.length - fail}/${res.length}</button>
      <span class="devinfo" title="Linter core · Nucleus · Jint">${esc(opts.build)}</span>
      <button type="button" data-dev="off" aria-label="Hide the dev bar (Ctrl+Alt+D)" title="Hide (Ctrl+Alt+D)">✕</button>`;
    if (panel) renderPanel(res);
  }
  function closePanel() {
    document.getElementById('devpanel')?.remove();
  }
  function renderPanel(res: ReturnType<typeof contrast>) {
    let el = document.getElementById('devpanel');
    if (!el) {
      el = document.createElement('div');
      el.id = 'devpanel';
      el.className = 'devpanel';
      document.body.appendChild(el);
    }
    el.style.bottom = `${innerHeight - bar.getBoundingClientRect().top + 8}px`;
    const label = SITES.find((s) => s.id === site())!.label;
    const scheme = getComputedStyle(root).colorScheme.includes('dark') ? 'dark' : 'light';
    el.innerHTML = `<h4>Contrast (WCAG AA, 4.5:1): ${esc(label)}, ${scheme} <button type="button" data-dev="close">Close</button></h4>
      <table>${res
        .map(
          (x) =>
            `<tr><td><span class="sw" style="color:var(--${x.fg});background:var(--${x.bg})">Aa</span></td><td>${esc(x.name)}<br><span class="devinfo">--${x.fg} on --${x.bg}</span></td><td class="${x.r < 4.5 ? 'bad' : 'good'}">${x.r.toFixed(1)}:1</td></tr>`,
        )
        .join('')}</table>`;
  }

  function toggle(v?: boolean, remember = true) {
    on = v ?? !on;
    if (remember) set('on', on ? '1' : null);
    render();
  }

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.altKey && e.code === 'KeyD') {
      e.preventDefault();
      toggle();
      opts.toast(on ? 'Dev bar on. Ctrl+Alt+D hides it.' : 'Dev bar off. Ctrl+Alt+D shows it again.');
    }
  });
  document.addEventListener('click', (e) => {
    const t = (e.target as HTMLElement).closest<HTMLElement>('[data-dev], [data-dev-site], [data-dev-mode]');
    if (!t || !t.closest('#devbar, #devpanel')) return;
    const a = t.dataset.dev;
    if (t.dataset.devSite) {
      set('site', t.dataset.devSite === 'www' ? null : t.dataset.devSite);
      applyTheme();
      opts.toast(`Theme: ${SITES.find((s) => s.id === site())!.label}`);
    } else if (t.dataset.devMode) {
      set('mode', t.dataset.devMode === 'auto' ? null : t.dataset.devMode);
      applyTheme();
    } else if (a === 'min') {
      min = !min;
      set('min', min ? '1' : null);
    } else if (a === 'off') toggle(false);
    else if (a === 'contrast') {
      panel = panel ? null : 'contrast';
      if (!panel) closePanel();
    } else if (a === 'close') {
      panel = null;
      closePanel();
    } else return;
    render();
  });
  // Contrast is recomputed when the system colour scheme changes.
  matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => on && render());
  render();
  return { show: (remember = false) => toggle(true, remember), toggle: () => toggle(), isOn: () => on };
}
