// Settings → Theme → Motion: how much moves. A preset to pick quickly, and the switches it sets:
// the interface's own motion, the mascots (lively, play once, still, off), Nucli editing the code during fixes,
// and What's new playing animations by itself. Kept in this browser. When the device asks for less motion,
// nothing above "Still" applies, whatever is set.
export type MascotMotion = 'loop' | 'once' | 'still' | 'off';
export interface Motion { ui: boolean; mascots: MascotMotion; editFx: boolean; newsAuto: boolean }
export type Preset = 'all' | 'default' | 'calm' | 'still' | 'off';

export const PRESETS: Record<Preset, Motion> = {
  all: { ui: true, mascots: 'loop', editFx: true, newsAuto: true },
  // Nothing that slows you down or covers the code: Nucli's edit animation is opt-in.
  default: { ui: true, mascots: 'once', editFx: false, newsAuto: true },
  calm: { ui: true, mascots: 'still', editFx: false, newsAuto: false },
  still: { ui: false, mascots: 'still', editFx: false, newsAuto: false },
  off: { ui: false, mascots: 'off', editFx: false, newsAuto: false },
};
const KEY = 'nucleus-workbench-motion';
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** What's set (before the device's reduced-motion preference). */
export function savedMotion(): Motion {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    if (v && typeof v === 'object') return { ...PRESETS.default, ...v };
    // The earlier "Mascots" setting (animated, still, off), carried over.
    const old = localStorage.getItem('nucleus-workbench-mascots');
    if (old === 'still') return { ...PRESETS.default, mascots: 'still' };
    if (old === 'off') return { ...PRESETS.default, mascots: 'off' };
  } catch { /* private mode */ }
  return { ...PRESETS.default };
}
/** What applies: the setting, capped at "Still" when the device asks for less motion. */
export function motion(): Motion {
  const m = savedMotion();
  return reduce() ? { ui: false, mascots: m.mascots === 'off' ? 'off' : 'still', editFx: false, newsAuto: false } : m;
}
export function presetOf(m: Motion): Preset | 'custom' {
  return (Object.keys(PRESETS) as Preset[]).find((k) => JSON.stringify(PRESETS[k]) === JSON.stringify({ ui: m.ui, mascots: m.mascots, editFx: m.editFx, newsAuto: m.newsAuto })) ?? 'custom';
}
const listeners: (() => void)[] = [];
export const onMotion = (f: () => void) => listeners.push(f);
export function setMotion(m: Motion) {
  try { localStorage.setItem(KEY, JSON.stringify(m)); localStorage.removeItem('nucleus-workbench-mascots'); } catch { /* private mode */ }
  applyMotion();
}
export function applyMotion() {
  const m = motion(), r = document.documentElement;
  if (m.ui) delete r.dataset.motionUi; else r.dataset.motionUi = 'off';
  r.dataset.mascots = m.mascots;
  listeners.forEach((f) => f());
}
matchMedia('(prefers-reduced-motion: reduce)').addEventListener?.('change', applyMotion);
applyMotion();
