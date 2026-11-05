// The "Lines" column: every name a handler can use, grouped by object, like the function list
// in Pawno. Click (or Enter) inserts it at the cursor; hover or focus shows its signature below.
import { api, memberSignature, ownerLabel, Member } from '@core/api';
import { allEntries } from '@core/lookup';

export interface Line {
  text: string; // what is listed
  insert: string; // what goes into the editor
  caret?: number; // caret offset in `insert` (inside the parentheses of a call)
  type: Kind;
  sig: string;
  doc: string;
  deprecated?: boolean;
}
export type Kind = 'bool' | 'number' | 'string' | 'list' | 'function' | 'other';
export const KINDS: [Kind, string][] = [
  ['bool', 'bool'],
  ['number', 'number'],
  ['string', 'string'],
  ['list', 'list'],
  ['function', 'function'],
  ['other', 'other'],
];

function kindOf(m: Member): Kind {
  if (m.kind === 'method' || m.type === 'function') return 'function';
  switch (m.type) {
    case 'boolean':
      return 'bool';
    case 'number':
      return 'number';
    case 'string':
      return 'string';
    case 'string[]':
    case 'number[]':
    case 'boolean[]':
    case 'array':
      return 'list';
    default:
      return 'other';
  }
}

const firstSentence = (s: string) => {
  const t = s.replace(/\s+/g, ' ').trim();
  const m = t.match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : t).trim();
};

/** Groups in the order a handler is usually written. */
export function buildLines(): { title: string; lines: Line[] }[] {
  const groups = new Map<string, Line[]>();
  const add = (title: string, l: Line) => {
    if (!groups.has(title)) groups.set(title, []);
    groups.get(title)!.push(l);
  };
  for (const e of allEntries()) {
    const m = e.member;
    if (m.kind === 'object') continue;
    const params = m.kind === 'method' ? (m.overloads?.[0]?.params ?? []) : [];
    const call = m.kind === 'method';
    add(ownerLabel(e.owner), {
      text: e.path + (call ? '()' : ''),
      insert: e.path + (call ? '()' : ''),
      caret: call && params.length ? e.path.length + 1 : undefined,
      type: kindOf(m),
      sig: memberSignature(e.owner, e.name, m)[0] ?? e.path,
      doc: firstSentence(m.deprecated ? `Deprecated. ${m.deprecated}` : m.doc || '') + (m.default !== undefined ? ` Default: ${m.default}.` : ''),
      deprecated: !!m.deprecated,
    });
  }
  for (const [name, c] of Object.entries(api.nucleusClasses)) {
    if (c.statics) {
      for (const [mn, m] of Object.entries(api.objects[c.statics]?.members ?? {})) {
        if (m.internal) continue;
        const call = m.kind === 'method';
        const path = `Nucleus.${name}.${mn}`;
        add('Nucleus', { text: path + (call ? '()' : ''), insert: path + (call ? '()' : ''), caret: call ? path.length + 1 : undefined, type: kindOf(m), sig: memberSignature(c.statics, mn, m)[0] ?? path, doc: firstSentence(m.doc || '') });
      }
      continue;
    }
    const text = `new Nucleus.${name}(${c.params.join(', ')})`;
    add('Nucleus', { text, insert: `new Nucleus.${name}()`, caret: `new Nucleus.${name}(`.length, type: 'other', sig: text, doc: firstSentence(c.doc || '') });
  }
  for (const [name, e] of Object.entries(api.enums)) {
    for (const [v, n] of Object.entries(e.values)) {
      const path = `Nucleus.${name}.${v}`;
      add(`Nucleus.${name}`, { text: path, insert: path, type: 'number', sig: `${path} = ${n}`, doc: firstSentence(e.doc || '') });
    }
  }
  // A–Z within each group, like Pawno's list (enum values keep their declared order).
  return [...groups].map(([title, lines]) => ({ title, lines: title.startsWith('Nucleus.') ? lines : lines.sort((a, b) => a.text.localeCompare(b.text, 'en', { sensitivity: 'base' })) }));
}
