// What a tester has tried and pinned in "Help test this beta", kept in this browser and shared by the guide
// (testguide.ts) and the floating window of pinned tasks (testpins.ts): ticking one updates the other.
const DONE_KEY = 'nucleus-workbench-tested';
const PIN_KEY = 'nucleus-workbench-test-pins';
const get = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } };
const set = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } };
const read = (k: string): string[] => { try { const v = JSON.parse(get(k) || '[]'); return Array.isArray(v) ? v.filter((x) => typeof x === 'string') : []; } catch { return []; } };

const done = new Set(read(DONE_KEY));
let pins = read(PIN_KEY);
const listeners = new Set<() => void>();
const changed = () => listeners.forEach((f) => f());

export const isDone = (id: string) => done.has(id);
export function setDone(id: string, on: boolean) {
  on ? done.add(id) : done.delete(id);
  set(DONE_KEY, JSON.stringify([...done]));
  changed();
}
/** Pinned task ids, in the order they were pinned. */
export const pinned = (): readonly string[] => pins;
export const isPinned = (id: string) => pins.includes(id);
export function setPinned(id: string, on: boolean) {
  pins = on ? (pins.includes(id) ? pins : [...pins, id]) : pins.filter((x) => x !== id);
  set(PIN_KEY, JSON.stringify(pins));
  changed();
}
/** Called after any change to what's tried or pinned. */
export function onProgress(fn: () => void) {
  listeners.add(fn);
}
