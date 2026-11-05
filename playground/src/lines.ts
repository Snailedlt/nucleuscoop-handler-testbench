// The "Lines" column's data: every name a handler can use (like Pawno's function list), with
// what the workbench knows about each: type, default, topic, how many Hub handlers use it, where it
// belongs (top level or inside callbacks), and what clicking it inserts.
import { api, memberSignature, ownerLabel, Member } from '@core/api';
import { allEntries } from '@core/lookup';
import { parseLikeJint } from '@core/jsparse';
import USAGE from './usage.json';

export type Kind = 'bool' | 'number' | 'string' | 'list' | 'function' | 'other';
export const KINDS: [Kind, string][] = [
  ['bool', 'bool'],
  ['number', 'number'],
  ['string', 'string'],
  ['list', 'list'],
  ['function', 'function'],
  ['other', 'other'],
];
/** Where a name can be used: anywhere, or only in Game.Play and other callbacks. */
export type Scope = 'any' | 'callback';

export interface Line {
  path: string; // Game.KillMutex, Context.ModifySaveFile, Nucleus.DPIHandling.True
  text: string; // as listed (methods get "()")
  owner: string; // object group
  topic: string;
  kind: Kind;
  typeLabel: string; // bool, string[], enum DPIHandling, fn
  default?: string;
  sig: string;
  doc: string;
  deprecated?: boolean;
  scope: Scope;
  /** Settable with `path = value;` */
  assignable: boolean;
  params: string[];
  method: boolean;
  /** Values offered after `path = ` (enum values, true/false). */
  values?: string[];
  used: number; // Hub handlers using it
  /** Out of how many Hub handlers (System.* comes from a separate, smaller sample). */
  of: number;
}

export const USAGE_TOTAL: number = USAGE.handlers;
const usage = USAGE.counts as Record<string, number>;
const SYSTEM = (USAGE as any).system as { handlers: number; counts: Record<string, number> } | undefined;
/** Uses and sample size for a path. */
const usedOf = (path: string): { used: number; of: number } =>
  path.startsWith('System.') ? { used: SYSTEM?.counts[path] ?? 0, of: SYSTEM?.handlers ?? 0 } : { used: usage[path] ?? 0, of: USAGE_TOTAL };

function kindOf(m: Member): Kind {
  if (m.kind === 'method' || m.type === 'function') return 'function';
  if (m.type?.startsWith('enum:')) return 'number';
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
function typeLabel(m: Member): string {
  if (m.kind === 'method') return 'fn';
  if (m.type?.startsWith('enum:')) return m.type.slice(5);
  if (m.type === 'boolean') return 'bool';
  return m.type ?? m.csType ?? '';
}
const firstSentence = (s: string) => {
  const t = s.replace(/\s+/g, ' ').trim();
  const m = t.match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : t).trim();
};
const CALLBACK_OWNERS = new Set(['Context', 'PlayerInfo', 'ProtoInputRuntime', 'ProtoInputValues']);
const SETTABLE_OWNERS = new Set(['Game', 'GameHook', 'GameProtoInput', 'Context', 'PlayerInfo']);
function topicOf(owner: string, m: Member): string {
  if (m.category) return m.category;
  if (owner === 'GameProtoInput' || owner === 'ProtoInputRuntime' || owner === 'ProtoInputValues') return 'Proto Input';
  if (owner === 'GameHook') return 'Hooks (Game.Hook)';
  if (owner === 'Context') return 'Context';
  if (owner === 'PlayerInfo') return 'Players';
  return 'Other options';
}

let cache: Line[] | undefined;
export function allLines(): Line[] {
  if (cache) return cache;
  const out: Line[] = [];
  for (const e of allEntries()) {
    const m = e.member;
    if (m.kind === 'object') continue;
    const method = m.kind === 'method';
    const enumName = m.type?.startsWith('enum:') ? m.type.slice(5) : undefined;
    out.push({
      path: e.path,
      text: e.path + (method ? '()' : ''),
      owner: ownerLabel(e.owner),
      topic: topicOf(e.owner, m),
      kind: kindOf(m),
      typeLabel: typeLabel(m),
      default: m.default,
      sig: memberSignature(e.owner, e.name, m)[0] ?? e.path,
      doc: firstSentence(m.deprecated ? `Deprecated. ${m.deprecated}` : m.doc || ''),
      deprecated: !!m.deprecated,
      scope: CALLBACK_OWNERS.has(e.owner) ? 'callback' : 'any',
      assignable: !method && !m.readonly && SETTABLE_OWNERS.has(e.owner),
      params: method ? (m.overloads?.[0]?.params ?? []).map((p) => p.name) : [],
      method,
      values: enumName && api.enums[enumName] ? Object.keys(api.enums[enumName].values).map((v) => `Nucleus.${enumName}.${v}`) : m.type === 'boolean' ? ['true', 'false'] : undefined,
      ...usedOf(e.path),
    });
  }
  for (const [name, c] of Object.entries(api.nucleusClasses)) {
    if (c.statics) {
      for (const [mn, m] of Object.entries(api.objects[c.statics]?.members ?? {})) {
        if (m.internal) continue;
        const method = m.kind === 'method';
        const path = `Nucleus.${name}.${mn}`;
        out.push({ path, text: path + (method ? '()' : ''), owner: 'Nucleus', topic: 'Nucleus values', kind: kindOf(m), typeLabel: typeLabel(m), sig: memberSignature(c.statics, mn, m)[0] ?? path, doc: firstSentence(m.doc || ''), scope: 'any', assignable: false, params: method ? (m.overloads?.[0]?.params ?? []).map((p) => p.name) : [], method, used: usage[path] ?? 0, of: USAGE_TOTAL });
      }
      continue;
    }
    const path = `new Nucleus.${name}`;
    out.push({ path, text: `${path}()`, owner: 'Nucleus', topic: 'Nucleus values', kind: 'other', typeLabel: 'class', sig: `${path}(${c.params.join(', ')})`, doc: firstSentence(c.doc || ''), scope: 'any', assignable: false, params: c.params, method: true, used: 0, of: USAGE_TOTAL });
  }
  for (const [name, e] of Object.entries(api.enums)) {
    for (const [v, n] of Object.entries(e.values)) {
      const path = `Nucleus.${name}.${v}`;
      out.push({ path, text: path, owner: `Nucleus.${name}`, topic: 'Nucleus values', kind: 'number', typeLabel: String(n), sig: `${path} = ${n}`, doc: firstSentence(e.doc || ''), scope: 'any', assignable: false, params: [], method: false, used: usage[path] ?? 0, of: USAGE_TOTAL });
    }
  }
  return (cache = out);
}

// ---------------------------------------------------------------------------
// What the handler already has, and where the cursor is

export interface Use {
  line: number; // 0-based
  value?: string; // source of the assigned value
}
export interface Scan {
  /** Function bodies [start, end) (callbacks like Game.Play). */
  functions: [number, number][];
  /** path -> assignments (or, when never assigned, other uses). */
  uses: Map<string, { assigned: Use[]; other: Use[] }>;
}

/** Jint matches members with only the first letter case-insensitive. */
const jintKey = (path: string) => path.split('.').map((s) => (s ? s[0].toLowerCase() + s.slice(1) : s)).join('.');
let index: Map<string, string> | undefined;
function canonical(path: string): string | undefined {
  if (!index) {
    index = new Map();
    for (const l of allLines()) index.set(jintKey(l.path), l.path);
  }
  return index.get(jintKey(path));
}

function pathOf(n: any): string | undefined {
  const parts: string[] = [];
  let x = n;
  while (x && x.type === 'MemberExpression') {
    if (x.computed) {
      // PlayerList[i].X -> Player.X
      if (x.object.type === 'Identifier' && x.object.name === 'PlayerList' && parts.length) return canonical(['Player', ...parts].join('.'));
      return undefined;
    }
    parts.unshift(x.property.name);
    x = x.object;
  }
  if (!x || x.type !== 'Identifier') return undefined;
  const root = x.name === 'player' ? 'Player' : x.name;
  return canonical([root, ...parts].join('.'));
}

export function scanHandler(text: string): Scan | undefined {
  let program: any;
  try {
    program = parseLikeJint(text, { ecmaVersion: 'latest', sourceType: 'script', allowReturnOutsideFunction: true, locations: true }).program;
  } catch {
    return undefined;
  }
  const functions: [number, number][] = [];
  const uses = new Map<string, { assigned: Use[]; other: Use[] }>();
  const entry = (p: string) => {
    if (!uses.has(p)) uses.set(p, { assigned: [], other: [] });
    return uses.get(p)!;
  };
  const visit = (n: any, parent?: any) => {
    if (!n || typeof n.type !== 'string') return;
    if ((n.type === 'FunctionExpression' || n.type === 'FunctionDeclaration') && n.body) functions.push([n.body.start, n.body.end]);
    if (n.type === 'AssignmentExpression' && n.left.type === 'MemberExpression') {
      const p = pathOf(n.left);
      if (p) entry(p).assigned.push({ line: n.loc.start.line - 1, value: text.slice(n.right.start, n.right.end).replace(/\s+/g, ' ') });
    } else if (n.type === 'MemberExpression' && !(parent?.type === 'MemberExpression' && parent.object === n) && !(parent?.type === 'AssignmentExpression' && parent.left === n)) {
      const p = pathOf(n);
      if (p) entry(p).other.push({ line: n.loc.start.line - 1 });
    }
    for (const k of Object.keys(n)) {
      if (k === 'loc') continue;
      const v = n[k];
      if (Array.isArray(v)) v.forEach((c) => visit(c, n));
      else if (v && typeof v.type === 'string') visit(v, n);
    }
  };
  visit(program);
  return { functions, uses };
}

export const inCallback = (scan: Scan, offset: number) => scan.functions.some(([s, e]) => offset > s && offset < e);

/** Filter match: words in the name, docs or topic, or shorthand from the starts of the name's
 *  words ("km" finds KillMutex, "kmd" KillMutexDelay, "pbs" PauseBetweenStarts). */
export function matches(l: Line, q: string, shorthand = true): boolean {
  if (!q) return true;
  const name = l.path.toLowerCase();
  if (name.includes(q) || l.doc.toLowerCase().includes(q) || l.topic.toLowerCase().includes(q)) return true;
  if (!shorthand || q.length < 2 || /[\s.]/.test(q)) return false;
  const last = l.path.slice(l.path.lastIndexOf('.') + 1);
  const words = last.split(/(?=[A-Z][a-z])|(?<=[a-z])(?=[A-Z])|_/).filter(Boolean).map((w) => w.toLowerCase());
  // Each query letter continues the current word or starts the next one, in order.
  const fit = (qi: number, wi: number, ci: number): boolean => {
    if (qi === q.length) return true;
    if (wi >= words.length) return false;
    if (ci > 0 && ci < words[wi].length && words[wi][ci] === q[qi] && fit(qi + 1, wi, ci + 1)) return true;
    for (let w = wi + (ci > 0 ? 1 : 0); w < words.length; w++) if (words[w][0] === q[qi] && fit(qi + 1, w, 1)) return true;
    return false;
  };
  return fit(0, 0, 0);
}
