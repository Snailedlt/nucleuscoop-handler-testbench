// The on-screen keyboard, for every text field on the page (the code editor, Lines' filter, the
// Reference search, Open, Settings, ...), in one place.
//
// It publishes what it knows as CSS, so any layout can react without its own code:
//   html.kb-up          a text field has focus and the keyboard covers part of the screen
//   --kb                the keyboard's height (0px when it's down)
//   --vvh               the height still visible above it
// and makes sure the focused field isn't left under the keyboard.
//
// Chrome on Android reports the keyboard exactly (the VirtualKeyboard API, with the keyboard laid
// over the page so nothing jumps); elsewhere the visual viewport shrinks instead. Some browsers, and
// pages inside a frame, can't measure it at all: then an estimate (learned on this device, or a
// generous guess) is used once the keyboard has had time to open.

const LEARN_KEY = 'nucleus-workbench-kb';
const get = (k: string) => {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
};
const put = (k: string, v: string) => {
  try {
    localStorage.setItem(k, v);
  } catch {}
};

export interface KeyboardState {
  /** A text field has focus. */
  editing: boolean;
  /** The keyboard's height in px, measured (or estimated when `estimated`). 0 when it's down. */
  height: number;
  /** The height visible above the keyboard. */
  visible: number;
  /** The height comes from an estimate, not a measurement. */
  estimated: boolean;
  /** This page has measured the keyboard at least once (so "no keyboard" means it's closed). */
  measurable: boolean;
  /** The keyboard's bottom offset for things that sit right on top of it. */
  bottom: number;
}

let framed = true;
try {
  framed = window.self !== window.top;
} catch {}
/** An on-screen keyboard is likely: touch is the main way in, and there's no mouse or trackpad. A laptop with a touch
 * screen (navigator.maxTouchPoints > 0, a fine pointer too) has a real keyboard: guessing one there shrank the whole
 * page whenever a text field got focus inside a frame, where it can't be measured. */
export const softKeyboard = () => window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(any-pointer: fine)').matches;
const portrait = () => window.innerHeight >= window.innerWidth;
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
// Phone keyboards (with their suggestion row) take about 35-40% of a portrait screen and about half
// of a landscape one: lean high, so a wrong guess leaves a gap instead of hiding things. Inside a
// frame (the maintainer's preview artifact), measured on their phone: Gboard with the suggestion and
// number rows covers 34.4% of a portrait screen.
export const estimateKeyboard = () => {
  const tall = Math.max(screen.width, screen.height);
  const short = Math.min(screen.width, screen.height);
  return learned() ?? Math.round(Math.min(window.innerHeight * 0.6, portrait() ? (framed ? 0.344 : 0.42) * tall : 0.55 * short));
};

/** Text fields: where the keyboard opens. */
const editable = (el: Element | null): el is HTMLElement =>
  !!el &&
  ((el instanceof HTMLInputElement && !/^(button|checkbox|radio|range|color|file|submit|reset|image)$/.test(el.type)) ||
    el instanceof HTMLTextAreaElement ||
    (el as HTMLElement).isContentEditable);

const listeners: ((s: KeyboardState) => void)[] = [];
let state: KeyboardState = { editing: false, height: 0, visible: window.innerHeight, estimated: false, measurable: false, bottom: 0 };
export const keyboard = () => state;
export function onKeyboard(cb: (s: KeyboardState) => void) {
  listeners.push(cb);
}

let started = false;
export function initKeyboard() {
  if (started) return;
  started = true;
  const root = document.documentElement;
  const vk: any = !framed && 'virtualKeyboard' in navigator ? (navigator as any).virtualKeyboard : null;
  let vkH = -1; // -1: not reported yet
  if (vk) {
    try {
      vk.overlaysContent = true;
      vk.addEventListener('geometrychange', () => {
        vkH = Math.round(vk.boundingRect?.height ?? 0);
        update();
      });
    } catch {}
  }
  let baseH = window.innerHeight; // the page's height without a keyboard
  let waited = false;
  let waitTimer: number | undefined;
  let lastKey = '';

  function update() {
    const editing = softKeyboard() && editable(document.activeElement);
    const vv = window.visualViewport;
    const byApi = vkH >= 0;
    let height = byApi ? vkH : Math.max(0, baseH - (vv ? vv.height : window.innerHeight));
    const seen = height > 120;
    if (seen && editing) learn(height);
    const measurable = state.measurable || seen || byApi;
    // Nothing measured yet, and this page never could: guess, once the keyboard has had time to open.
    const estimated = editing && !seen && waited && !measurable;
    if (estimated) height = estimateKeyboard();
    const up = editing && (seen || estimated);
    if (!up) height = 0;
    const visible = byApi || estimated ? window.innerHeight - height : vv ? vv.height : window.innerHeight;
    const bottom = !up ? 0 : byApi || estimated ? height : vv ? Math.max(0, window.innerHeight - (vv.height + vv.offsetTop)) : 0;
    state = { editing, height, visible: Math.round(visible), estimated, measurable, bottom: Math.round(bottom) };
    // Publish only real changes: these events also fire while scrolling.
    const key = `${up}|${Math.round(visible / 3)}|${Math.round(bottom / 3)}|${estimated}`;
    if (key === lastKey) return;
    const opened = up && !lastKey.startsWith('true');
    lastKey = key;
    root.classList.toggle('kb-up', up);
    root.style.setProperty('--kb', `${up ? Math.round(bottom) : 0}px`);
    root.style.setProperty('--vvh', `${Math.round(visible)}px`);
    if (up && !byApi && !estimated && vv && (vv.offsetTop || window.scrollY)) window.scrollTo(0, 0); // iOS scrolls the page up instead
    for (const cb of listeners) cb(state);
    if (opened) requestAnimationFrame(reveal);
  }

  /** The focused field, scrolled into the space above the keyboard (inside whatever scrolls). */
  function reveal() {
    const el = document.activeElement as HTMLElement | null;
    if (!state.height || !editable(el) || el.closest('.CodeMirror')) return; // the editor keeps its cursor in view itself
    const r = el.getBoundingClientRect();
    if (r.bottom > state.visible - 8 || r.top < 0) el.scrollIntoView({ block: 'nearest' });
  }

  document.addEventListener('focusin', () => {
    waited = false;
    clearTimeout(waitTimer);
    waitTimer = window.setTimeout(() => ((waited = true), update()), 700);
    update();
    requestAnimationFrame(reveal);
  });
  document.addEventListener('focusout', () => {
    clearTimeout(waitTimer);
    setTimeout(update, 150); // focus moving to another field keeps the keyboard up
  });
  window.addEventListener('resize', () => {
    if (!state.editing) baseH = window.innerHeight;
    update();
  });
  window.visualViewport?.addEventListener('resize', update);
  window.visualViewport?.addEventListener('scroll', update);
  // ?kb: what the keyboard code sees, on screen (for testing on a phone).
  if (/[?&]kb\b/.test(location.search)) {
    const debug = document.createElement('pre');
    debug.style.cssText = 'position:fixed;top:0;right:0;z-index:99;margin:0;padding:4px 6px;font:11px monospace;background:#000c;color:#0f0;pointer-events:none;white-space:pre';
    document.body.append(debug);
    onKeyboard((s) => (debug.textContent = `inner ${window.innerHeight} vk ${vkH} base ${baseH}\n${JSON.stringify(s)}`));
  }
  update();
}
