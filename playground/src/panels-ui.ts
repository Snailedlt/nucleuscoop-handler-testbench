// Resizable panels: the code and results panes, the Lines list's width, and (on phones) the Lines
// sheet's height. Sizes are kept per browser; nothing changes until you drag. Double-click an edge
// to reset it, or Settings > Reset panel sizes for all of them. Arrow keys work on a focused edge.
const KEY = 'nucleus-workbench-panels';
const $ = <T extends HTMLElement = HTMLElement>(sel: string) => document.querySelector(sel) as T;
interface Sizes { main?: number; lines?: number; files?: number; sheet?: number; filesSide?: "left" | "right"; linesSide?: "left" | "right" } // main: share of the code pane (0..1); lines: px; sheet: vh

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
  const files = $('#files-panel');
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
    files.style.width = sizes.files ? `${sizes.files}px` : '';
    const root = document.documentElement;
    if (sizes.filesSide === 'left') root.dataset.filesSide = 'left'; else delete root.dataset.filesSide;
    if (sizes.linesSide === 'left') root.dataset.linesSide = 'left'; else delete root.dataset.linesSide;
    for (const [id, v] of [['set-files-side', sizes.filesSide], ['set-lines-side', sizes.linesSide]] as const) {
      const s = document.getElementById(id) as HTMLSelectElement | null;
      if (s) s.value = v ?? 'right';
    }
    lines.classList.toggle('custom-h', !!sizes.sheet);
    if (sizes.sheet) lines.style.setProperty('--sheet-h', `${sizes.sheet}vh`);
    // Screen readers announce a focusable separator's position (a percentage of the space it divides).
    const value = (id: string, now: number, text: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.setAttribute('aria-valuemin', '0');
      el.setAttribute('aria-valuemax', '100');
      el.setAttribute('aria-valuenow', String(Math.round(now)));
      el.setAttribute('aria-valuetext', text);
    };
    const left = (sizes.main ?? 0.5) * 100;
    value('split-main', left, `code ${Math.round(left)}%, results ${Math.round(100 - left)}%`);
    const lw = sizes.lines ?? (lines.offsetWidth || 320);
    value('split-lines', Math.min(100, (lw / Math.max(1, main.clientWidth)) * 100), `Lines list ${Math.round(lw)} pixels wide`);
    const fw = sizes.files ?? (files.offsetWidth || 260);
    value('split-files', Math.min(100, (fw / Math.max(1, main.clientWidth)) * 100), `Files panel ${Math.round(fw)} pixels wide`);
    const sh = sizes.sheet ?? 60;
    value('split-sheet', sh, `list ${Math.round(sh)}% of the screen high`);
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
  // A side panel's width, from its inner edge (the one next to the code): Lines and Files, left or right of it.
  function sidePanel(handle: HTMLElement, el: HTMLElement, key: 'lines' | 'files', side: () => 'left' | 'right' | undefined, min: number) {
    drag(handle, false, (x) => {
      const r = el.getBoundingClientRect();
      sizes[key] = Math.round(clamp(side() === 'left' ? x - r.left : r.right - x, min, Math.min(640, window.innerWidth * 0.5)));
    }, () => delete sizes[key]);
    handle.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      const grow = (e.key === 'ArrowLeft') === (side() !== 'left');
      sizes[key] = Math.round(clamp((sizes[key] ?? el.getBoundingClientRect().width) + (grow ? 24 : -24), min, 640));
      save();
      apply();
    });
  }
  sidePanel(splitLines, lines, 'lines', () => sizes.linesSide, 220);
  sidePanel($('#split-files'), files, 'files', () => sizes.filesSide, 180);
  for (const [id, key] of [['set-files-side', 'filesSide'], ['set-lines-side', 'linesSide']] as const) {
    document.getElementById(id)?.addEventListener('change', (e) => {
      const v = (e.target as HTMLSelectElement).value;
      if (v === 'left') sizes[key] = 'left'; else delete sizes[key];
      save();
      apply();
    });
  }

  // Phones: the Lines sheet's height (its top edge)
  const grip = $('#split-sheet');
  drag(grip, true, (_x, y) => {
    const bottom = lines.getBoundingClientRect().bottom;
    sizes.sheet = Math.round(clamp(((bottom - y) / window.innerHeight) * 100, 25, 85));
  }, () => delete sizes.sheet);

  apply();
  return {
    /** Moves Files or Lines to the other side of the code. */
    flip(which: 'files' | 'lines') {
      const key = which === 'files' ? 'filesSide' : 'linesSide';
      if (sizes[key] === 'left') delete sizes[key]; else sizes[key] = 'left';
      save();
      apply();
      return sizes[key] ?? 'right';
    },
    reset() {
      sizes = { filesSide: sizes.filesSide, linesSide: sizes.linesSide }; // sizes only; the sides stay
      save();
      apply();
    },
  };
}
