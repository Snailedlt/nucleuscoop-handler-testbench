// Duo (splitscreen.me) and Nucli (these tools), the mascots, from the concept sheet (design/mascots) through
// tools/mascots-export.cjs. Inline SVG and CSS only. They move only when the device allows motion (the sheet's CSS
// sits behind prefers-reduced-motion, and Nucli's SMIL electrons are paused here), and stay out of the alpha 8 look.
import { MASCOT_CSS, MASCOT_SVG } from './mascots.gen';

export type MascotId = 'n-sleep' | 'n-ok' | 'n-bad' | 'n-fix' | 'n-ring' | 'n-spin' | 'n-idle' | 'idle' | 'roll' | 'oops' | 'search' | 'joy';

const LOCAL = `.masc { display: inline-block; flex: none; line-height: 0; vertical-align: middle; }
.masc > svg { display: block; width: 100%; height: 100%; overflow: visible; }
:root[data-site="alpha8"] .masc { display: none !important; }`;

let ready = false;
let n = 0;
const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function setup() {
  if (ready) return;
  ready = true;
  const s = document.createElement('style');
  s.id = 'mascot-css';
  s.textContent = LOCAL + '\n' + MASCOT_CSS;
  document.head.append(s);
  // SMIL (Nucli's electrons) ignores CSS media queries: pause it when the device asks for less motion.
  const settle = (root: ParentNode) => {
    if (!still()) return;
    root.querySelectorAll?.('.masc > svg').forEach((svg) => {
      try { (svg as SVGSVGElement).pauseAnimations(); (svg as SVGSVGElement).setCurrentTime(0); } catch { /* not ready */ }
    });
  };
  new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach((nd) => nd instanceof Element && settle(nd.parentNode ?? nd)))).observe(document.body, { childList: true, subtree: true });
  settle(document);
}

/** A mascot scene as HTML. With a label it's an image for screen readers; without one it's decoration. */
export function mascot(id: MascotId, opts: { size?: number; label?: string; className?: string; zoom?: number } = {}): string {
  setup();
  // Each copy gets its own ids, so a hidden copy can't take another's gradients with it.
  const k = `m${id}-`;
  const svg = MASCOT_SVG[id].split(`"${k}`).join(`"${k}${++n}-`).split(`#${k}`).join(`#${k}${n}-`);
  const size = opts.size ?? 48;
  // Small spots (a toast, a header) zoom in on the character: the scenes leave room for sparkles and jumps.
  const z = opts.zoom ?? (size <= 48 ? 1.5 : 1);
  const view = z === 1 ? svg : svg.replace(/viewBox="0 0 120 120"/, `viewBox="${(60 - 60 / z).toFixed(1)} ${(60 - 60 / z).toFixed(1)} ${(120 / z).toFixed(1)} ${(120 / z).toFixed(1)}"`);
  const a11y = opts.label ? `role="img" aria-label="${opts.label.replace(/"/g, '&quot;')}"` : 'aria-hidden="true"';
  return `<span class="masc masc-${id}${opts.className ? ' ' + opts.className : ''}" ${a11y} style="width:${size}px;height:${size}px">${view}</span>`;
}
