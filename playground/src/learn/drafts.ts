// What the learner typed in each code lesson, kept across reloads. One storage entry per lesson
// (`nucleus-learn-code/<chapter>/<lesson>`), so two open Learn tabs never overwrite each other's other lessons; a save
// writes or removes only the lessons changed since the last one. Each draft remembers a hash of the lesson's start:
// when a later version of the lesson starts differently, the draft is dropped rather than restored onto code it no
// longer fits.
export const CODE_KEY = 'nucleus-learn-code';

/** FNV-1a, enough to notice that a lesson's start changed. */
export const hashOf = (t: string) => {
  let h = 0x811c9dc5;
  for (let i = 0; i < t.length; i++) h = Math.imul(h ^ t.charCodeAt(i), 0x01000193);
  return (h >>> 0).toString(36);
};

type Store = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export function createDrafts(store: () => Store | undefined) {
  /** Changed since the last save: the draft, or null to remove it. */
  const dirty = new Map<string, { s: string; c: string } | null>();
  const keyFor = (k: string) => `${CODE_KEY}/${k}`;
  const read = (k: string): { s: string; c: string } | null | undefined => {
    if (dirty.has(k)) return dirty.get(k);
    try {
      const v = JSON.parse(store()?.getItem(keyFor(k)) || 'null');
      return v && typeof v === 'object' && typeof v.s === 'string' && typeof v.c === 'string' ? v : undefined;
    } catch {
      return undefined; // private mode, or not ours
    }
  };
  const save = () => {
    const s = store();
    for (const [k, v] of dirty) {
      try {
        if (v) s?.setItem(keyFor(k), JSON.stringify(v));
        else s?.removeItem(keyFor(k));
      } catch {
        /* private mode or full */
      }
    }
    dirty.clear();
  };
  return {
    /** The learner's code for lesson `k`, if they changed it and the lesson still starts with `start`. */
    get(k: string, start: string): string | undefined {
      const d = read(k);
      if (!d) return undefined;
      if (d.s === hashOf(start)) return d.c;
      dirty.set(k, null);
      save();
      return undefined;
    },
    /** Remembers `code` for lesson `k` (forgets it when it's the start again); written by the next save. */
    set(k: string, start: string, code: string) {
      if (code === start) {
        if (read(k)) dirty.set(k, null);
      } else dirty.set(k, { s: hashOf(start), c: code });
    },
    pending: () => dirty.size > 0,
    save,
  };
}
