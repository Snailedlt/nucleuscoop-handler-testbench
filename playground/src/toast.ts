// Toasts: short notes that stack (newest at the bottom, at most three), close by themselves after
// a few seconds (paused while hovered or focused) or with ×, and can carry one action (Undo).
// The kind (info, success, warning, error) is guessed from the wording when it isn't given, so
// every existing toast("…") call gets the right look.

export type ToastKind = 'info' | 'success' | 'warning' | 'error';
export interface ToastOptions {
  kind?: ToastKind;
  action?: { label: string; run: () => void };
  /** Milliseconds on screen; errors stay longer by default. */
  duration?: number;
}

const MAX = 3;
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

let host: HTMLElement | null = null;
function container(): HTMLElement {
  if (host && document.body.contains(host)) return host;
  host = document.createElement('div');
  host.id = 'toasts';
  host.setAttribute('role', 'region');
  host.setAttribute('aria-label', 'Notifications');
  host.setAttribute('aria-live', 'polite'); // exists from the start, so the first toast is announced too
  document.body.appendChild(host);
  return host;
}

const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function remove(el: HTMLElement) {
  if (el.dataset.leaving) return;
  el.dataset.leaving = '1';
  if (reduced()) return el.remove();
  el.classList.add('leaving');
  el.addEventListener('animationend', () => el.remove(), { once: true });
  setTimeout(() => el.remove(), 400); // in case the animation doesn't run
}

export function toast(text: string, opts: ToastOptions = {}): void {
  const kind = opts.kind ?? kindOf(text);
  const box = container();
  // The same message again: show the one that's there afresh instead of stacking a copy.
  const same = [...box.querySelectorAll<HTMLElement>('.toast:not(.leaving)')].find((t) => t.dataset.text === text);
  if (same) {
    same.remove();
  }
  const el = document.createElement('div');
  el.className = `toast ${kind}`;
  el.dataset.text = text;
  if (kind === 'error') el.setAttribute('role', 'alert');
  el.innerHTML = `<svg class="toast-icon" viewBox="0 0 24 24" aria-hidden="true">${ICONS[kind]}</svg><div class="toast-text"></div>`;
  (el.querySelector('.toast-text') as HTMLElement).textContent = text;
  if (opts.action) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'toast-action';
    b.textContent = opts.action.label;
    const run = opts.action.run;
    b.addEventListener('click', () => {
      run();
      remove(el);
    });
    el.appendChild(b);
  }
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'toast-close';
  close.setAttribute('aria-label', 'Dismiss');
  close.title = 'Dismiss';
  close.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>';
  close.addEventListener('click', () => remove(el));
  el.appendChild(close);
  box.appendChild(el);

  // Older ones make room: at most MAX at a time.
  const live = [...box.querySelectorAll<HTMLElement>('.toast:not(.leaving)')];
  for (const old of live.slice(0, Math.max(0, live.length - MAX))) remove(old);

  // Closes by itself, unless the pointer or the keyboard is on it.
  const ms = opts.duration ?? (kind === 'error' ? 8000 : opts.action ? 7000 : Math.min(8000, 3500 + text.length * 25));
  let left = ms;
  let started = Date.now();
  let timer = window.setTimeout(() => remove(el), left);
  const pause = () => {
    clearTimeout(timer);
    left -= Date.now() - started;
  };
  const resume = () => {
    started = Date.now();
    clearTimeout(timer);
    timer = window.setTimeout(() => remove(el), Math.max(1200, left));
  };
  el.addEventListener('mouseenter', pause);
  el.addEventListener('mouseleave', resume);
  el.addEventListener('focusin', pause);
  el.addEventListener('focusout', resume);
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      remove(el);
    }
  });
}

/** Creates the (empty) live region early: screen readers only announce changes to one they know. */
export function initToasts() {
  container();
}

/** Closes every toast (e.g. before a screenshot). */
export function clearToasts() {
  host?.querySelectorAll<HTMLElement>('.toast').forEach((t) => t.remove());
}
