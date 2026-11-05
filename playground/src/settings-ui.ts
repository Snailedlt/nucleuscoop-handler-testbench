// Workbench settings (the gear in the header): theme, editor, tips, the Lines column, and the
// niche ones (Advanced mode, the dev bar) under Advanced. Also the phone helpers it controls:
// the symbol bar above the on-screen keyboard.
import { applyTheme } from './devbar';

const EDITOR_KEY = 'nucleus-workbench-editor';
const THEME_KEY = 'nucleus-workbench-dev-mode'; // shared with the dev bar
const $ = <T extends HTMLElement = HTMLElement>(sel: string) => document.querySelector(sel) as T;
const get = (k: string) => {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
};
const put = (k: string, v: string | null) => {
  try {
    if (v === null) localStorage.removeItem(k);
    else localStorage.setItem(k, v);
  } catch {}
};
const touch = () => window.matchMedia('(pointer: coarse)').matches;
const narrow = () => window.matchMedia('(max-width: 860px)').matches;

interface Deps {
  editor: any;
  hint: () => void;
  lines: { set(o: boolean): void; isOpen(): boolean; openSettings(): void; show(): void };
  tips: { set(v: boolean): void; isOn(): boolean; reset(): void };
  advanced: HTMLInputElement;
  devBar: { toggle(): void; isOn(): boolean };
  toast: (s: string) => void;
}

export function initSettings(d: Deps) {
  const ed = { size: 'm' as 's' | 'm' | 'l', wrap: narrow() || touch(), keybar: true };
  try {
    Object.assign(ed, JSON.parse(get(EDITOR_KEY) || '{}'));
  } catch {}
  const save = () => put(EDITOR_KEY, JSON.stringify(ed));
  const applyEditor = () => {
    document.documentElement.style.setProperty('--code-size', { s: '12px', m: '13px', l: '15px' }[ed.size]);
    d.editor.setOption('lineWrapping', ed.wrap);
    d.editor.refresh();
  };
  applyEditor();

  const dlg = $('#settings-dialog') as HTMLDialogElement;
  const theme = () => (get(THEME_KEY) as 'auto' | 'light' | 'dark') || 'auto';
  function sync() {
    dlg.querySelectorAll<HTMLInputElement>('input[name=set-theme]').forEach((r) => (r.checked = r.value === theme()));
    ($('#set-size') as HTMLSelectElement).value = ed.size;
    ($('#set-wrap') as HTMLInputElement).checked = ed.wrap;
    ($('#set-keybar') as HTMLInputElement).checked = ed.keybar;
    ($('#set-tips') as HTMLInputElement).checked = d.tips.isOn();
    ($('#set-lines') as HTMLInputElement).checked = d.lines.isOpen();
    ($('#set-advanced') as HTMLInputElement).checked = d.advanced.checked;
    ($('#set-devbar') as HTMLInputElement).checked = d.devBar.isOn();
  }
  dlg.querySelectorAll<HTMLInputElement>('input[name=set-theme]').forEach((r) =>
    r.addEventListener('change', () => {
      put(THEME_KEY, r.value === 'auto' ? null : r.value);
      applyTheme();
    }),
  );
  $('#set-size').addEventListener('change', (e) => ((ed.size = (e.target as HTMLSelectElement).value as any), save(), applyEditor()));
  $('#set-wrap').addEventListener('change', (e) => ((ed.wrap = (e.target as HTMLInputElement).checked), save(), applyEditor()));
  $('#set-keybar').addEventListener('change', (e) => ((ed.keybar = (e.target as HTMLInputElement).checked), save(), placeKeybar()));
  $('#set-tips').addEventListener('change', (e) => d.tips.set((e.target as HTMLInputElement).checked));
  $('#set-heads').addEventListener('click', () => (d.tips.set(true), d.tips.reset(), sync(), d.toast('Heads-ups will show again.')));
  $('#set-lines').addEventListener('change', (e) => d.lines.set((e.target as HTMLInputElement).checked));
  $('#set-lines-more').addEventListener('click', () => {
    dlg.close();
    if (narrow()) ($('.switch button[data-view=code]') as HTMLButtonElement)?.click();
    d.lines.openSettings();
  });
  $('#set-advanced').addEventListener('change', (e) => {
    d.advanced.checked = (e.target as HTMLInputElement).checked;
    d.advanced.dispatchEvent(new Event('change'));
  });
  $('#set-devbar').addEventListener('change', () => d.devBar.toggle());
  $('#settings-close').addEventListener('click', () => dlg.close());
  const open = () => {
    sync();
    dlg.showModal();
  };
  $('#settings-open').addEventListener('click', open);

  // --- the symbol bar: keys that are hard to reach on a phone keyboard, above it
  const bar = $('#keybar');
  const KEYS: [string, string, string?][] = [
    ['Tab', '  '],
    ['.', '.'],
    [';', ';'],
    ['=', ' = '],
    ['"', '""', 'pair'],
    ['( )', '()', 'pair'],
    ['{ }', '{}', 'pair'],
    ['[ ]', '[]', 'pair'],
    [',', ', '],
    ['+', ' + '],
  ];
  for (const [label, ins, kind] of KEYS) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    b.setAttribute('aria-label', label === 'Tab' ? 'Indent' : `Type ${ins.trim() || label}`);
    b.addEventListener('pointerdown', (e) => e.preventDefault()); // keep the editor's focus and keyboard
    b.addEventListener('click', () => {
      d.editor.focus();
      const cur = d.editor.getCursor();
      d.editor.replaceSelection(ins);
      if (kind === 'pair') d.editor.setCursor({ line: cur.line, ch: cur.ch + 1 });
    });
    bar.append(b);
  }
  const extra: [string, string, () => void][] = [
    ['Suggest', 'Suggest names', () => d.hint()],
    ['Lines', 'Show the list of names', () => d.lines.show()],
    ['↶', 'Undo', () => d.editor.undo()],
    ['↷', 'Redo', () => d.editor.redo()],
  ];
  for (const [label, aria, run] of extra) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'kb-act';
    b.textContent = label;
    b.setAttribute('aria-label', aria);
    b.addEventListener('pointerdown', (e) => e.preventDefault());
    b.addEventListener('click', () => (label === 'Lines' ? run() : (d.editor.focus(), run())));
    bar.append(b);
  }
  let focused = false;
  // The on-screen keyboard shrinks the visible area (the visual viewport), not the page: size the
  // workbench to what's visible, so the line being typed stays above the keyboard and the symbol keys.
  // Some browsers, and pages shown inside a frame (where the keyboard can't be measured at all),
  // don't say how tall the keyboard is: then the symbol keys go where the keyboard most likely ends,
  // a height learned on this device or a generous estimate, so they sit on top of it, never under.
  let kbOpen = false;
  let lastVisible = 0;
  let wasGuess = false;
  let baseH = window.innerHeight; // the page's height without a keyboard
  let waited = false; // gave the keyboard time to open
  let measurable = false; // this page has seen the keyboard's height
  let waitTimer: number | undefined;
  window.addEventListener('resize', () => (focused ? placeKeybar() : (baseH = window.innerHeight)));
  const portrait = () => window.innerHeight >= window.innerWidth;
  const LEARN_KEY = 'nucleus-workbench-kb';
  const learned = (): number | undefined => {
    try {
      return JSON.parse(get(LEARN_KEY) || '{}')[portrait() ? 'p' : 'l'];
    } catch {
      return undefined;
    }
  };
  const learn = (h: number) => {
    try {
      const o = JSON.parse(get(LEARN_KEY) || '{}');
      o[portrait() ? 'p' : 'l'] = Math.round(h);
      put(LEARN_KEY, JSON.stringify(o));
    } catch {}
  };
  // Phone keyboards (with their suggestion row) take about 35-40% of a portrait screen and about
  // half of a landscape one: lean high, so a wrong guess leaves a gap instead of hiding the keys.
  // Inside a frame (the maintainer's preview artifact), measured on their phone: Gboard with the
  // suggestion and number rows covers 34.4% of a portrait screen.
  let framed = true;
  try {
    framed = window.self !== window.top;
  } catch {}
  const estimate = () => {
    const tall = Math.max(screen.width, screen.height);
    const short = Math.min(screen.width, screen.height);
    return learned() ?? Math.round(Math.min(window.innerHeight * 0.6, portrait() ? (framed ? 0.344 : 0.42) * tall : 0.55 * short));
  };
  // Chrome on Android tells exactly how tall the keyboard is, and when it closes, through the
  // VirtualKeyboard API: let the keyboard overlay the page and size the workbench ourselves.
  // Elsewhere the page's or the visual viewport's height has to tell.
  const vk: any = !framed && 'virtualKeyboard' in navigator ? (navigator as any).virtualKeyboard : null;
  let vkH = -1; // -1: not reported yet
  if (vk) {
    try {
      vk.overlaysContent = true;
      vk.addEventListener('geometrychange', () => {
        vkH = Math.round(vk.boundingRect?.height ?? 0);
        placeKeybar();
      });
    } catch {}
  }
  const debug = /[?&]kb\b/.test(location.search) ? document.createElement('pre') : null;
  if (debug) {
    debug.style.cssText = 'position:fixed;top:0;right:0;z-index:99;margin:0;padding:4px 6px;font:11px monospace;background:#000c;color:#0f0;pointer-events:none;white-space:pre';
    document.body.append(debug);
  }
  function placeKeybar() {
    const vv = window.visualViewport;
    const byApi = vkH >= 0;
    const visible = byApi ? window.innerHeight - vkH : vv ? vv.height : window.innerHeight;
    const kbH = byApi ? vkH : Math.max(0, baseH - visible);
    const seen = kbH > 120;
    const open = focused && touch() && seen && (byApi || (!!vv && vv.height < window.innerHeight - 120));
    // Re-fit only when the keyboard opens, closes or changes height: these events also fire while
    // scrolling, and scrolling the cursor back into view then would undo the scroll.
    const changed = open !== kbOpen || (open && Math.abs(visible - lastVisible) > 2);
    lastVisible = visible;
    if (changed) {
      kbOpen = open;
      document.body.classList.toggle('kb-open', open);
      if (open) {
        document.documentElement.style.setProperty('--vvh', `${Math.round(visible)}px`);
        if (!byApi && vv && (vv.offsetTop || window.scrollY)) window.scrollTo(0, 0); // iOS scrolls the page up instead
      }
      d.editor.refresh();
      if (focused) requestAnimationFrame(() => d.editor.scrollIntoView(null, 60));
    }
    if (seen && focused) learn(kbH);
    // Once this page has seen the keyboard, it can tell: no keyboard now means it was closed (Android's
    // back gesture closes it but keeps the cursor in the code). Only guess where it never could.
    if (seen || byApi) measurable = true;
    const show = focused && ed.keybar && touch() && (seen || (waited && !measurable));
    const guess = show && !seen;
    bar.hidden = !show;
    document.body.classList.toggle('keybar-on', show && seen);
    document.body.classList.toggle('keybar-est', guess);
    if (debug) debug.textContent = `inner ${window.innerHeight} vv ${vv ? Math.round(vv.height) + '+' + Math.round(vv.offsetTop) : '-'} base ${baseH}\nvk ${vk ? vkH : 'none'} kb ${kbH} seen ${seen} meas ${measurable}\nfocus ${focused} waited ${waited} show ${show} guess ${guess}`;
    if (!show) return void (wasGuess = false);
    const bottom = seen ? (byApi ? vkH : vv ? Math.max(0, window.innerHeight - (vv.height + vv.offsetTop)) : 0) : estimate();
    bar.style.bottom = `${bottom}px`;
    document.documentElement.style.setProperty('--kb-est', guess ? `${bottom}px` : '0px');
    if (guess && !wasGuess) requestAnimationFrame(() => d.editor.scrollIntoView(null, 60));
    wasGuess = guess;
  }
  const onFocus = () => {
    focused = true;
    waited = false;
    clearTimeout(waitTimer);
    waitTimer = window.setTimeout(() => ((waited = true), placeKeybar()), 700);
    placeKeybar();
  };
  d.editor.on('focus', onFocus);
  d.editor.on('blur', () => ((focused = false), clearTimeout(waitTimer), setTimeout(placeKeybar, 150)));
  // While the keyboard is open, keep the cursor in the space above it (after CodeMirror's own scroll).
  d.editor.on('cursorActivity', () => kbOpen && requestAnimationFrame(() => d.editor.scrollIntoView(null, 60)));
  window.visualViewport?.addEventListener('resize', placeKeybar);
  window.visualViewport?.addEventListener('scroll', placeKeybar);

  return { open };
}
