// Nucli fixes the code in front of you: when a fix (a quick fix, Fix all, Fix with AI) changes the editor, he flies in
// next to each changed line and zaps it: the old text flashes red and shrinks away, the new text glows green.
// The edit itself happens at once (typing and Undo are never held up); only the look is animated. With reduced
// motion, or mascots set to still or off, the changed lines just light up for a moment.
import { diffLines } from './aifix';
import { mascot, mascotMode } from './mascots';

type CM = any; // CodeMirror 5

const calm = () => matchMedia('(prefers-reduced-motion: reduce)').matches || mascotMode() !== 'anim';

/** Applies `apply` (which turns the editor's text into `after`) and animates what changed. */
export function fixWithNucli(editor: CM, after: string, apply: () => void) {
  const before: string = editor.getValue();
  const diff = diffLines(before, after);
  const firstOld = diff.find((l) => l.kind !== ' ');
  if (!firstOld) return apply();
  // Bring the first change into view before anything moves.
  const at = (firstOld.a ?? firstOld.b ?? 1) - 1;
  editor.scrollIntoView({ line: Math.max(0, Math.min(at, editor.lineCount() - 1)), ch: 0 }, 90);
  const wrap: HTMLElement = editor.getWrapperElement();
  const box = wrap.getBoundingClientRect();
  const lineEl = wrap.querySelector('.CodeMirror-line') as HTMLElement | null;
  const font = lineEl ? getComputedStyle(lineEl) : null;
  // Where the removed lines were (only the ones on screen get a ghost).
  const ghosts: { text: string; x: number; y: number; h: number }[] = [];
  if (!calm()) {
    for (const l of diff) {
      if (l.kind !== '-' || !l.a || !l.text.trim()) continue;
      const c = editor.charCoords({ line: l.a - 1, ch: 0 }, 'window');
      if (c.bottom < box.top || c.top > box.bottom) continue;
      const indent = l.text.match(/^\s*/)![0].length;
      const s = editor.charCoords({ line: l.a - 1, ch: indent }, 'window');
      ghosts.push({ text: l.text.slice(indent), x: s.left, y: c.top, h: c.bottom - c.top });
    }
  }
  apply();
  // The lines that are new or changed now.
  const added = diff.filter((l) => l.kind === '+' && l.b).map((l) => l.b! - 1).filter((n) => n < editor.lineCount());
  const marked = added.length ? added : [Math.min(at, editor.lineCount() - 1)];
  marked.forEach((n) => editor.addLineClass(n, 'background', calm() ? 'fx-new-still' : 'fx-new'));
  setTimeout(() => marked.forEach((n) => { editor.removeLineClass(n, 'background', 'fx-new'); editor.removeLineClass(n, 'background', 'fx-new-still'); }), 1600);
  if (calm()) return;

  const layer = document.createElement('div');
  layer.className = 'fx-layer';
  layer.setAttribute('aria-hidden', 'true'); // decoration: the change itself is in the editor
  document.body.appendChild(layer);
  // Old text: struck through in red, then zapped away.
  for (const g of ghosts) {
    const el = document.createElement('div');
    el.className = 'fx-ghost';
    el.textContent = g.text;
    Object.assign(el.style, { left: `${g.x}px`, top: `${g.y}px`, height: `${g.h}px`, lineHeight: `${g.h}px`, font: font?.font ?? '' });
    layer.appendChild(el);
    el.animate([{ opacity: 1, transform: 'none' }, { opacity: 1, transform: 'none', offset: 0.35 }, { opacity: 0, transform: 'scaleX(0.05)', filter: 'blur(1px)' }], { duration: 650, easing: 'cubic-bezier(.5,0,.75,0)', fill: 'forwards', delay: 120 });
  }
  // Nucli hops along the changes (up to five), zapping each.
  const stops = [...new Set(marked)].slice(0, 5).map((n) => {
    const c = editor.charCoords({ line: n, ch: 0 }, 'window');
    const end = editor.charCoords({ line: n, ch: editor.getLine(n).length }, 'window');
    const x = Math.min(box.right - 52, Math.max(end.right + 18, box.left + 120));
    return { x, y: Math.max(box.top + 2, Math.min(box.bottom - 46, (c.top + c.bottom) / 2 - 22)), lineX: end.right + 4, lineY: (c.top + c.bottom) / 2 };
  }).filter((s) => s.lineY > box.top && s.lineY < box.bottom);
  if (!stops.length) return setTimeout(() => layer.remove(), 900);
  const n = document.createElement('div');
  n.className = 'fx-nucli';
  n.innerHTML = mascot('n-idle', { size: 44, zoom: 1.7 });
  layer.appendChild(n);
  const last = stops[stops.length - 1];
  const step = 420, start = { x: box.right - 60, y: box.top + 8 };
  const frames: Keyframe[] = [{ transform: `translate(${start.x}px, ${start.y}px) scale(.4)`, opacity: 0 }];
  stops.forEach((s, i) => frames.push({ transform: `translate(${s.x}px, ${s.y}px) scale(1)`, opacity: 1, offset: (i * step + 220) / (stops.length * step + 500) }));
  frames.push({ transform: `translate(${last.x}px, ${last.y}px) scale(1)`, opacity: 1, offset: (stops.length * step + 200) / (stops.length * step + 500) });
  frames.push({ transform: `translate(${last.x + 10}px, ${last.y - 24}px) scale(.6)`, opacity: 0 });
  n.animate(frames, { duration: stops.length * step + 500, easing: 'cubic-bezier(.3,.7,.4,1)', fill: 'forwards' });
  // A zap from Nucli to the end of each line when he gets there.
  stops.forEach((s, i) => {
    const beam = document.createElement('div');
    beam.className = 'fx-beam';
    const x0 = Math.min(s.lineX, s.x), w = Math.max(6, s.x + 6 - x0);
    Object.assign(beam.style, { left: `${x0}px`, top: `${s.lineY - 1}px`, width: `${w}px` });
    layer.appendChild(beam);
    beam.animate([{ transform: 'scaleX(0)', opacity: 1 }, { transform: 'scaleX(1)', opacity: 1, offset: 0.4 }, { transform: 'scaleX(1)', opacity: 0 }], { duration: 380, delay: i * step + 200, easing: 'ease-out', fill: 'both' });
  });
  setTimeout(() => layer.remove(), stops.length * step + 900);
}

/** The text after a set of edits, for a quick fix. */
export function applyEditsToText(text: string, edits: { start: number; end: number; text: string }[]) {
  let out = text;
  for (const e of [...edits].sort((a, z) => z.start - a.start)) out = out.slice(0, e.start) + e.text + out.slice(e.end);
  return out;
}
