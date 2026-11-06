// Toasts, stacked like a deck: the newest in front, up to two older ones peeking out above it
// (slightly smaller, their text faded). Hovering the stack, or moving the keyboard into it, fans
// them out into a list and pauses every timer; leaving folds them back. Each closes by itself
// after a few seconds, or with ×, and can carry one action (Undo).
// The kind (info, success, warning, error) is guessed from the wording when it isn't given, so
// every existing toast("…") call gets the right look.

import { mascot, mascotsOn, type MascotId } from './mascots';

export type ToastKind = 'info' | 'success' | 'warning' | 'error';
export interface ToastOptions {
  kind?: ToastKind;
  action?: { label: string; run: () => void };
  /** Milliseconds on screen; errors stay longer by default. */
  duration?: number;
  /** A mascot in place of the icon (Nucli for "Fixed", say). */
  mascot?: MascotId;
}

const MAX = 5; // kept; older ones are closed
const PEEK = 2; // older toasts visible behind the newest one, folded
const PEEK_OFFSET = 10; // px each one peeks out above the one in front
const SCALE_STEP = 0.05;
const GAP = 8; // px between toasts, fanned out

const ICONS: Record<ToastKind, string> = {
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  success: '<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.8 2.8L16 10"/>',
  warning: '<path d="M12 4 2.8 19.5h18.4L12 4z"/><path d="M12 10v4M12 17h.01"/>',
  error: '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/>',
};

/** The kind a message reads as. */
export function kindOf(text: string): ToastKind {
  if (/^(couldn'?t|can'?t|this browser can'?t|nothing matches|failed|error)\b|doesn't (contain|match)|can'?t be read|damaged|isn't available|would have (changed|broken|moved)/i.test(text)) return 'error';
  if (/still has \d+ error|may not|too big|no longer safe|not formatted|would have/i.test(text)) return 'warning';
  if (/^(fixed|copied|saved|formatted|created|opened|link copied|undone|applied|selected|already formatted)\b/i.test(text)) return 'success';
  return 'info';
}

interface Entry {
  el: HTMLElement;
  height: number; // its own height, unfolded
  pause(): void;
  resume(): void;
}
const entries: Entry[] = []; // oldest first
let host: HTMLElement | null = null;
let expanded = false;

function container(): HTMLElement {
  if (host && document.body.contains(host)) return host;
  host = document.createElement('div');
  host.id = 'toasts';
  host.setAttribute('role', 'region');
  host.setAttribute('aria-label', 'Notifications');
  host.setAttribute('aria-live', 'polite'); // exists from the start, so the first toast is announced too
  // Fanned out while the pointer or the keyboard is on the stack (the stack's own box covers the
  // gaps between toasts, so moving from one to the next doesn't fold them).
  const setExpanded = (v: boolean) => {
    if (expanded === v) return;
    expanded = v;
    for (const e of entries) v ? e.pause() : e.resume();
    layout();
  };
  host.addEventListener('mouseenter', () => setExpanded(true));
  host.addEventListener('mouseleave', () => setExpanded(host!.contains(document.activeElement)));
  host.addEventListener('focusin', () => setExpanded(true));
  host.addEventListener('focusout', (e) => {
    if (!host!.contains(e.relatedTarget as Node | null) && !host!.matches(':hover')) setExpanded(false);
  });
  document.body.appendChild(host);
  return host;
}

const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Places every toast: folded into a deck, or fanned out into a list (newest at the bottom). */
function layout() {
  if (!host) return;
  host.classList.toggle('expanded', expanded);
  const front = entries[entries.length - 1];
  let offset = 0;
  for (let k = 0; k < entries.length; k++) {
    const { el, height } = entries[entries.length - 1 - k]; // k = 0: the newest
    el.style.zIndex = String(100 - k);
    if (expanded) {
      el.style.height = `${height}px`;
      el.style.transform = `translateY(${-offset}px)`;
      el.style.opacity = '1';
      el.classList.remove('behind');
      offset += height + GAP;
    } else {
      // Behind the front one: as tall as it, a little higher and smaller, contents faded.
      el.style.height = `${k === 0 ? height : front.height}px`;
      el.style.transform = `translateY(${-k * PEEK_OFFSET}px) scale(${1 - k * SCALE_STEP})`;
      el.style.opacity = k <= PEEK ? '1' : '0';
      el.classList.toggle('behind', k > 0);
    }
    el.inert = !expanded && k > 0; // folded away: not reachable by keyboard or screen reader
  }
  const h = entries.length ? (expanded ? offset - GAP : front.height + Math.min(PEEK, entries.length - 1) * PEEK_OFFSET) : 0;
  host.style.height = `${h}px`;
}

function remove(entry: Entry) {
  const i = entries.indexOf(entry);
  if (i < 0) return;
  entries.splice(i, 1);
  const el = entry.el;
  el.inert = true;
  el.classList.add('leaving');
  el.style.opacity = '0';
  el.style.transform += ' translateX(24px)';
  if (!entries.length) {
    expanded = false; // the last one closed: next time the stack starts folded
  }
  layout();
  setTimeout(() => el.remove(), reduced() ? 0 : 250);
}

export function toast(text: string, opts: ToastOptions = {}): void {
  const kind = opts.kind ?? kindOf(text);
  const box = container();
  // The same message again: the one that's there comes to the front afresh instead of a copy.
  const same = entries.find((e) => e.el.dataset.text === text);
  if (same) {
    entries.splice(entries.indexOf(same), 1);
    same.el.remove();
  }
  const el = document.createElement('div');
  el.className = `toast ${kind} entering`;
  el.dataset.text = text;
  if (kind === 'error') el.setAttribute('role', 'alert');
  const icon = opts.mascot && mascotsOn() ? mascot(opts.mascot, { size: 34, className: 'toast-masc' }) : `<svg class="toast-icon" viewBox="0 0 24 24" aria-hidden="true">${ICONS[kind]}</svg>`;
  el.innerHTML = `<div class="toast-inner">${icon}<div class="toast-text"></div></div>`;
  const inner = el.firstElementChild as HTMLElement;
  (el.querySelector('.toast-text') as HTMLElement).textContent = text;
  let entry: Entry;
  if (opts.action) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'toast-action';
    b.textContent = opts.action.label;
    const run = opts.action.run;
    b.addEventListener('click', () => {
      run();
      remove(entry);
    });
    inner.appendChild(b);
  }
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'toast-close';
  close.setAttribute('aria-label', 'Dismiss');
  close.title = 'Dismiss';
  close.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>';
  close.addEventListener('click', () => remove(entry));
  inner.appendChild(close);
  box.appendChild(el);

  // Closes by itself after a while; the clock stops while the stack is fanned out.
  const ms = opts.duration ?? (kind === 'error' ? 8000 : opts.action ? 7000 : Math.min(8000, 3500 + text.length * 25));
  let left = ms;
  let started = Date.now();
  let timer = 0;
  const start = () => {
    started = Date.now();
    clearTimeout(timer);
    timer = window.setTimeout(() => remove(entry), Math.max(1200, left));
  };
  entry = {
    el,
    height: el.offsetHeight,
    pause: () => {
      clearTimeout(timer);
      left -= Date.now() - started;
    },
    resume: start,
  };
  entries.push(entry);
  if (expanded) entry.pause();
  else start();
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      remove(entry);
    }
  });

  // Swipe it away to the right (as in BSManager): it follows the pointer, a little stiffly; let go
  // past 60px, or with a flick, and it's gone; otherwise it springs back.
  let x0 = -1;
  let t0 = 0;
  el.addEventListener('pointerdown', (e) => {
    if ((e.target as HTMLElement).closest('button')) return;
    x0 = e.clientX;
    t0 = performance.now();
    el.setPointerCapture(e.pointerId);
    el.classList.add('dragging');
  });
  el.addEventListener('pointermove', (e) => {
    if (x0 < 0) return;
    const dx = e.clientX - x0;
    el.style.translate = `${dx > 0 ? dx : dx / 4}px 0`;
  });
  const release = (e: PointerEvent) => {
    if (x0 < 0) return;
    const dx = e.clientX - x0;
    const v = dx / Math.max(1, performance.now() - t0); // px per ms
    x0 = -1;
    el.classList.remove('dragging');
    if (dx > 60 || (dx > 20 && v > 0.5)) {
      el.style.translate = '110% 0';
      remove(entry);
    } else el.style.translate = '';
  };
  el.addEventListener('pointerup', release);
  el.addEventListener('pointercancel', release);

  // Older ones make room: at most MAX at a time.
  while (entries.length > MAX) remove(entries[0]);
  // In from below, then into place.
  el.style.transform = 'translateY(100%)';
  el.style.opacity = '0';
  void el.offsetHeight;
  el.classList.remove('entering');
  layout();
}

/**
 * A notice at the top of the code pane, for what needs reading or doing (an error, a link that
 * opens nothing): it stays until dismissed or the next handler opens. One at a time.
 */
export function notice(text: string, opts: { kind?: ToastKind; action?: { label: string; run: () => void }; mascot?: MascotId } = {}) {
  const el = document.getElementById('notice');
  if (!el) return toast(text, opts);
  const kind = opts.kind ?? kindOf(text);
  el.className = kind;
  el.setAttribute('role', kind === 'error' ? 'alert' : 'status');
  (el.querySelector('.notice-icon') as SVGElement).innerHTML = ICONS[kind];
  // Something didn't load: Duo, cracked and worried, says so instead of the icon.
  el.querySelector('.notice-masc')?.remove();
  const m = mascotsOn() ? (opts.mascot ?? (kind === 'error' ? 'oops' : null)) : null;
  (el.querySelector('.notice-icon') as SVGElement).style.display = m ? 'none' : '';
  if (m) el.querySelector('.notice-icon')!.insertAdjacentHTML('afterend', mascot(m, { size: 40, className: 'notice-masc' }));
  (el.querySelector('.notice-text') as HTMLElement).textContent = text;
  const act = el.querySelector('.notice-action') as HTMLButtonElement;
  act.hidden = !opts.action;
  act.textContent = opts.action?.label ?? '';
  act.onclick = opts.action ? () => (clearNotice(), opts.action!.run()) : null;
  (el.querySelector('.notice-close') as HTMLButtonElement).onclick = clearNotice;
  el.hidden = false;
}
export function clearNotice() {
  const el = document.getElementById('notice');
  if (el) el.hidden = true;
}

/**
 * Feedback on the button itself ("Copied ✓" for a moment), where the person is looking. When the
 * button isn't on screen (it was in a menu that closed), a toast says it instead.
 */
export function confirmOn(btn: HTMLElement | null | undefined, label: string, toastText: string) {
  if (!btn || !btn.offsetParent || btn.closest('dialog:not([open])')) return toast(toastText, { kind: 'success' });
  announce(toastText);
  const original = btn.dataset.label ?? btn.innerHTML;
  btn.dataset.label = original;
  btn.textContent = label;
  btn.classList.add('confirmed');
  clearTimeout(Number(btn.dataset.confirmTimer));
  btn.dataset.confirmTimer = String(
    window.setTimeout(() => {
      btn.innerHTML = original;
      btn.classList.remove('confirmed');
      delete btn.dataset.label;
    }, 1600),
  );
}

/** Says something to screen readers only (a label that changes isn't read out by itself). */
let sr: HTMLElement | null = null;
function announce(text: string) {
  if (!sr) {
    sr = document.createElement('div');
    sr.className = 'sr-only';
    sr.setAttribute('role', 'status');
    sr.setAttribute('aria-live', 'polite');
    document.body.appendChild(sr);
  }
  sr.textContent = '';
  setTimeout(() => (sr!.textContent = text), 50);
}

/** Creates the (empty) live region early: screen readers only announce changes to one they know. */
export function initToasts() {
  container();
  announce('');
}

/** Closes every toast at once (e.g. before a screenshot). */
export function clearToasts() {
  for (const e of [...entries]) {
    entries.splice(entries.indexOf(e), 1);
    e.el.remove();
  }
  layout();
}
