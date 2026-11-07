// A note in the code, right under the line it's about: "Fixed: …" after a quick fix, "Formatted", "No problems to
// go to". The message sits where the change happened instead of in a corner; screen readers hear it too. It closes
// by itself after a few seconds (not while the pointer or focus is on it), or with ×.
import { mascot, mascotsOn } from './mascots';
import { announce } from './toast';

type CM = any; // CodeMirror 5
let open: { clear: () => void } | null = null;

export function codeNote(editor: CM, line: number, text: string, opts: { action?: { label: string; run: () => void }; mood?: 'ok' | 'info' } = {}) {
  open?.clear();
  const el = document.createElement('div');
  el.className = `code-note ${opts.mood ?? 'ok'}`;
  el.innerHTML = `${mascotsOn() ? mascot(opts.mood === 'info' ? 'n-idle' : 'n-ok', { size: 28, zoom: 1.7 }) : ''}<span class="cn-text"></span>${opts.action ? `<button class="link cn-act" type="button"></button>` : ''}<button class="cn-x" type="button" aria-label="Dismiss" title="Dismiss">×</button>`;
  (el.querySelector('.cn-text') as HTMLElement).textContent = text;
  const act = el.querySelector('.cn-act') as HTMLButtonElement | null;
  const ln = Math.max(0, Math.min(line, editor.lineCount() - 1));
  const w = editor.addLineWidget(ln, el, { coverGutter: false, noHScroll: true });
  let timer = 0;
  const clear = () => { clearTimeout(timer); w.clear(); if (open?.clear === clear) open = null; };
  const arm = () => { clearTimeout(timer); timer = window.setTimeout(clear, 5000 + text.length * 30); };
  if (act && opts.action) { act.textContent = opts.action.label; act.onclick = () => { clear(); opts.action!.run(); }; }
  (el.querySelector('.cn-x') as HTMLButtonElement).onclick = clear;
  el.addEventListener('pointerenter', () => clearTimeout(timer));
  el.addEventListener('pointerleave', arm);
  el.addEventListener('focusin', () => clearTimeout(timer));
  el.addEventListener('focusout', arm);
  arm();
  open = { clear };
  editor.scrollIntoView({ line: ln, ch: 0 }, 60);
  announce(text + (opts.action ? ` ${opts.action.label} is next to it.` : ''));
}
