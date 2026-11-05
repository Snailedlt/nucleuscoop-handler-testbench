// Resizable panels: the code and results panes, the Lines list's width, and (on phones) the Lines
// sheet's height. Sizes are kept per browser; nothing changes until you drag. Double-click an edge
// to reset it, or Settings > Reset panel sizes for all of them. Arrow keys work on a focused edge.
const KEY = 'nucleus-workbench-panels';
const $ = <T extends HTMLElement = HTMLElement>(sel: string) => document.querySelector(sel) as T;
interface Sizes { main?: number; lines?: number; sheet?: number } // main: share of the code pane (0..1); lines: px; sheet: vh

export function initPanels(opts: { refresh: () => void; toast: (s: string) => void }) {
  let sizes: Sizes = {};
  try {
    sizes = JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {}
  const save = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(sizes));
    } catch {}
  };
  const main = $('#main');
  const lines = $('#lines');
  function apply() {
    if (sizes.main) {
      main.classList.add('sized');
      main.style.setProperty('--split-l', `${sizes.main}fr`);
      main.style.setProperty('--split-r', `${1 - sizes.main}fr`);
    } else {
      main.classList.remove('sized');
      main.style.removeProperty('--split-l');
      main.style.removeProperty('--split-r');
    }
    lines.style.width = sizes.lines ? `${sizes.lines}px` : '';
    lines.classList.toggle('custom-h', !!sizes.sheet);
    if (sizes.sheet) lines.style.setProperty('--sheet-h', `${sizes.sheet}vh`);
    opts.refresh();
  }

  /** Drag (mouse, pen or touch) on a handle; `move` gets the pointer position. */
  function drag(handle: HTMLElement, vertical: boolean, move: (x: number, y: number) => void, reset: () => void) {
    handle.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      handle.setPointerCapture(e.pointerId);
      handle.classList.add('dragging');
      document.body.classList.add(vertical ? 'resizing-v' : 'resizing');
      const onMove = (ev: PointerEvent) => {
        move(ev.clientX, ev.clientY);
        apply();
      };
      const onUp = () => {
        handle.removeEventListener('pointermove', onMove);
        handle.classList.remove('dragging');
        document.body.classList.remove('resizing', 'resizing-v');
        save();
      };
      handle.addEventListener('pointermove', onMove);
      handle.addEventListener('pointerup', onUp, { once: true });
      handle.addEventListener('pointercancel', onUp, { once: true });
    });
    handle.addEventListener('dblclick', () => {
      reset();
      save();
      apply();
    });
  }
  const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

  // Code | results
  const splitMain = $('#split-main');
  drag(splitMain, false, (x) => {
    const r = main.getBoundingClientRect();
    sizes.main = clamp((x - r.left) / r.width, 0.25, 0.8);
  }, () => delete sizes.main);
  splitMain.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const cur = sizes.main ?? $('section.pane:not(.side)').getBoundingClientRect().width / main.getBoundingClientRect().width;
    sizes.main = clamp(cur + (e.key === 'ArrowLeft' ? -0.03 : 0.03), 0.25, 0.8);
    save();
    apply();
  });

  // Lines width (its left edge)
  const splitLines = $('#split-lines');
  drag(splitLines, false, (x) => {
    const r = lines.getBoundingClientRect();
    sizes.lines = Math.round(clamp(r.right - x, 220, Math.min(640, window.innerWidth * 0.5)));
  }, () => delete sizes.lines);
  splitLines.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    sizes.lines = Math.round(clamp((sizes.lines ?? lines.getBoundingClientRect().width) + (e.key === 'ArrowLeft' ? 24 : -24), 220, 640));
    save();
    apply();
  });

  // Phones: the Lines sheet's height (its top edge)
  const grip = $('#split-sheet');
  drag(grip, true, (_x, y) => {
    const bottom = lines.getBoundingClientRect().bottom;
    sizes.sheet = Math.round(clamp(((bottom - y) / window.innerHeight) * 100, 25, 85));
  }, () => delete sizes.sheet);

  apply();
  return {
    reset() {
      sizes = {};
      save();
      apply();
      opts.toast('Panel sizes are back to their defaults.');
    },
  };
}
