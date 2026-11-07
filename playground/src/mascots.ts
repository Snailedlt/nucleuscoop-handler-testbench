// Duo (splitscreen.me) and Nucli (these tools), the mascots, from the concept sheet (design/mascots) through
// tools/mascots-export.cjs. Inline SVG and CSS only. How they move follows Settings → Theme → Motion (src/motion.ts);
// the sheet's CSS also sits behind prefers-reduced-motion. They stay out of the alpha 8 look.
import { MASCOT_CSS, MASCOT_SVG } from './mascots.gen';
import { motion, onMotion } from './motion';

export type MascotId = 'n-sleep' | 'n-ok' | 'n-bad' | 'n-fix' | 'n-ring' | 'n-spin' | 'n-idle' | 'n-scan' | 'n-calc';

/** On unless they're turned off (a toast then keeps its plain icon). */
export const mascotsOn = () => motion().mascots !== 'off';
// SMIL (Nucli's electrons) ignores CSS: pause it for "still", let it run a few seconds for "once".
function syncSmil(root: ParentNode = document) {
  const m = motion().mascots;
  root.querySelectorAll?.('.masc > svg').forEach((el) => {
    const svg = el as SVGSVGElement & { _once?: number };
    try {
      if (m === 'loop') svg.unpauseAnimations();
      else if (m === 'once' && svg.parentElement?.classList.contains('busy')) svg.unpauseAnimations();
      else if (m === 'once') { svg.unpauseAnimations(); clearTimeout(svg._once); svg._once = window.setTimeout(() => svg.pauseAnimations(), 5000); }
      else { svg.pauseAnimations(); svg.setCurrentTime(0); }
    } catch { /* not ready */ }
  });
}
onMotion(() => syncSmil());

const LOCAL = `.masc { display: inline-block; flex: none; line-height: 0; vertical-align: middle; }
.masc > svg { display: block; width: 100%; height: 100%; overflow: visible; }
:root[data-site="alpha8"] .masc, :root[data-mascots="off"] .masc { display: none !important; }
:root[data-mascots="still"] .masc, :root[data-mascots="still"] .masc * { animation-play-state: paused !important; }
:root[data-mascots="once"] .masc * { animation-iteration-count: 1 !important; }
/* A loading mascot keeps moving while it waits (a frozen spinner reads as stuck); still and off still apply. */
:root[data-mascots="once"] .masc.busy * { animation-iteration-count: infinite !important; }`;

let ready = false;
let n = 0;

function setup() {
  if (ready) return;
  ready = true;
  const s = document.createElement('style');
  s.id = 'mascot-css';
  // The scenes' code windows and tracks take the workbench's own colours, so they suit every look, light or dark.
  s.textContent = LOCAL + '\n' + MASCOT_CSS + '\n.masc { --panel: var(--surface); --panel-line: var(--line); --code: color-mix(in srgb, var(--fg) 28%, transparent); --track: var(--line); }';
  document.head.append(s);
  new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach((nd) => nd instanceof Element && syncSmil(nd.parentNode ?? nd)))).observe(document.body, { childList: true, subtree: true });
  syncSmil();
}

/** A mascot scene as HTML. With a label it's an image for screen readers; without one it's decoration. */
export function mascot(id: MascotId, opts: { size?: number; label?: string; className?: string; zoom?: number; busy?: boolean } = {}): string {
  setup();
  // Each copy gets its own ids, so a hidden copy can't take another's gradients with it.
  const k = `m${id}-`;
  const svg = MASCOT_SVG[id].split(`"${k}`).join(`"${k}${++n}-`).split(`#${k}`).join(`#${k}${n}-`);
  const size = opts.size ?? 48;
  // Small spots (a toast, a header) zoom in on the character: the scenes leave room for sparkles and jumps.
  const z = opts.zoom ?? (size <= 48 ? 1.5 : 1);
  const view = z === 1 ? svg : svg.replace(/viewBox="0 0 120 120"/, `viewBox="${(60 - 60 / z).toFixed(1)} ${(60 - 60 / z).toFixed(1)} ${(120 / z).toFixed(1)} ${(120 / z).toFixed(1)}"`);
  const a11y = opts.label ? `role="img" aria-label="${opts.label.replace(/"/g, '&quot;')}"` : 'aria-hidden="true"';
  return `<span class="masc masc-${id}${opts.busy ? ' busy' : ''}${opts.className ? ' ' + opts.className : ''}" ${a11y} style="width:${size}px;height:${size}px">${view}</span>`;
}
