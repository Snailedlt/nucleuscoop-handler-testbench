// The Blocks view: the handler's callbacks (Game.Play first, then Game.OnFinishedSetup, Game.OnStop, the Proto Input
// lock callbacks and the custom hotkeys) as rows of blocks, like a trigger editor (issue #7, step 2). Each statement
// is a row: an Action (a call, setting a value, a variable), a Condition (`if … then … otherwise …` with an operator
// picker), or a Code row for anything else, which stays editable as code.
//
// The code is the only source of truth, as in the Form view (formview.ts): the blocks read the handler text on every
// refresh and write back through minimal text edits (a value's own range, an operator, one inserted statement, one
// removed statement, two swapped statements). They never regenerate the file, and every edit is checked to still
// parse before it is handed to the host.
//
//   const blocks = mountBlocksView(el, { getText, applyEdits, jumpTo, diagnostics, diagnosticsText });
//   blocks.refresh();   // after the code changed (the host debounces)
//   blocks.destroy();
import * as acorn from 'acorn';
import { api, ownerLabel, resolveGlobal, resolveMember, type Member, type Resolved } from '@core/api';
import { parseLikeJint } from '@core/jsparse';
import type { Diagnostic, Fix, TextEdit } from '@core/lint';
import { memberCard } from './doccard';
import { CodeField, codeFieldOf, type Mark } from './codefield';
import { fit, growField, setGrowDoc } from './growfield';
import type { FormHost } from './formview';
import USAGE from './usage.json';

export type BlocksHost = FormHost;
export interface BlocksView {
  refresh(): void;
  destroy(): void;
}

// ---------------------------------------------------------------------------
// The model

interface Range { start: number; end: number }

/** A value slot: a literal, an API property, a handler option, an enum value, or code. */
type VKind = 'str' | 'num' | 'bool' | 'prop' | 'opt' | 'enum' | 'var' | 'join' | 'code';
interface Val extends Range {
  key: string;
  label: string; // what the slot is, for screen readers ("DestinationPath", "the value")
  kind: VKind;
  src: string;
  str?: string;
  quote?: string;
  path?: string; // prop: canonical path (Context.PlayerID); enum: Nucleus.Folder.X
  enumName?: string;
  optKey?: string; // opt: the option's name
  optKeyRange?: Range;
  optQuote?: string;
  type?: string; // the member's or parameter's type, when known
  parts?: Val[]; // join: the parts of `a + b + c`
}

type Op = 'eq' | 'ne' | 'gt' | 'lt' | 'ge' | 'le' | 'has' | 'nothas' | 'true' | 'false' | 'code';
interface Cond extends Range {
  op: Op;
  written?: string; // the operator as written (== or ===, != or !==)
  opRange?: Range;
  left?: Val; // cmp: left; has: the text searched; true/false: the value
  right?: Val; // cmp: right; has: what is searched for
  code?: Val; // op 'code': the whole test
}

interface Branch {
  key: string;
  block?: Range; // a BlockStatement, braces included
  single?: Range; // a branch that is one statement without braces (`if (x) foo();`)
  stmts: Stmt[];
}
interface Clause {
  node: Range; // the IfStatement of this clause
  test: Cond;
  testParen: Range; // from `if` to the start of the consequent: where this clause's own problems are
  body: Branch;
}
type SKind = 'call' | 'set' | 'var' | 'if' | 'code';
interface Stmt extends Range {
  key: string;
  kind: SKind;
  // call / set
  path?: string; // Context.CopyScriptFolder, Context.StartArguments
  owner?: string;
  name?: string;
  member?: Member;
  calleeText?: string;
  args?: Val[];
  argNames?: string[];
  op?: string; // set: = or +=
  value?: Val;
  // var
  varName?: string;
  // if
  clauses?: Clause[];
  otherwise?: Branch;
  // code
  src?: string;
  /** The comments right above the statement, shown with it (read-only). */
  note?: string;
}
interface Callback {
  key: string;
  path: string;
  owner: string;
  name: string;
  member?: Member;
  stmt: Range;
  fn?: Range; // the FunctionExpression, when it is one
  body?: Branch;
}
interface Model { callbacks: Callback[]; optionNames: string[]; varNames: string[]; error?: { message: string; pos: number } }

const CALLBACKS: { path: string; owner: string; name: string; plain: string }[] = [
  { path: 'Game.Play', owner: 'Game', name: 'Play', plain: 'For each player, before their game starts' },
  { path: 'Game.OnFinishedSetup', owner: 'Game', name: 'OnFinishedSetup', plain: 'Once every game is set up and started' },
  { path: 'Game.OnStop', owner: 'Game', name: 'OnStop', plain: 'When the session ends' },
  { path: 'Game.ProtoInput.OnInputLocked', owner: 'GameProtoInput', name: 'OnInputLocked', plain: 'Each time input is locked' },
  { path: 'Game.ProtoInput.OnInputUnlocked', owner: 'GameProtoInput', name: 'OnInputUnlocked', plain: 'Each time input is unlocked' },
  { path: 'Game.OnCustomHotKey_1', owner: 'Game', name: 'OnCustomHotKey_1', plain: 'When custom hotkey 1 is pressed' },
  { path: 'Game.OnCustomHotKey_2', owner: 'Game', name: 'OnCustomHotKey_2', plain: 'When custom hotkey 2 is pressed' },
  { path: 'Game.OnCustomHotKey_3', owner: 'Game', name: 'OnCustomHotKey_3', plain: 'When custom hotkey 3 is pressed' },
];
const PARSE_OPTS: acorn.Options = { ecmaVersion: 'latest', sourceType: 'script', allowReturnOutsideFunction: true };

/** `a.b.c` as parts, when every step is a plain name. */
function pathParts(n: any): string[] | undefined {
  const parts: string[] = [];
  let x = n;
  while (x && x.type === 'MemberExpression') {
    if (x.computed || x.property.type !== 'Identifier') return undefined;
    parts.unshift(x.property.name);
    x = x.object;
  }
  if (!x || x.type !== 'Identifier') return undefined;
  parts.unshift(x.name);
  return parts;
}

/** What a member path refers to in the API model (Jint: the first letter of each name may differ in case). */
function resolvePath(parts: string[]): Resolved | undefined {
  let r = resolveGlobal(parts[0]);
  for (const p of parts.slice(1)) {
    if (!r) return undefined;
    r = resolveMember(r, p).resolved;
  }
  return r;
}
const labelOf = (owner: string, name: string) => `${ownerLabel(owner)}.${name}`;

const isNumLit = (n: any) => (n.type === 'Literal' && typeof n.value === 'number') || (n.type === 'UnaryExpression' && n.operator === '-' && n.argument.type === 'Literal' && typeof n.argument.value === 'number');
const NUM = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;

/** Variable names declared anywhere in the handler (set while reading it). */
let varNames = new Set<string>();
function collectVars(program: any): Set<string> {
  const out = new Set<string>();
  const walk = (x: any) => {
    if (!x || typeof x.type !== 'string') return;
    if (x.type === 'VariableDeclarator' && x.id.type === 'Identifier') out.add(x.id.name);
    if ((x.type === 'FunctionExpression' || x.type === 'FunctionDeclaration') && x.params) for (const p of x.params) if (p.type === 'Identifier') out.add(p.name);
    for (const k of Object.keys(x)) {
      const v = x[k];
      if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === 'object' && typeof v.type === 'string') walk(v);
    }
  };
  walk(program);
  return out;
}

/** `a + b + c` (left to right, as written) when one of the parts is text. */
function joinParts(n: any): any[] | undefined {
  if (n.type !== 'BinaryExpression' || n.operator !== '+') return undefined;
  const out: any[] = [];
  let x = n;
  while (x.type === 'BinaryExpression' && x.operator === '+') {
    out.unshift(x.right);
    x = x.left;
  }
  out.unshift(x);
  return out.some((p) => p.type === 'Literal' && typeof p.value === 'string') ? out : undefined;
}

function readVal(n: any, text: string, key: string, label: string, type?: string): Val {
  const src = text.slice(n.start, n.end);
  const v: Val = { key, label, start: n.start, end: n.end, kind: 'code', src, type };
  const parts = joinParts(n);
  if (parts) {
    v.kind = 'join';
    v.parts = parts.map((p, i) => readVal(p, text, `${key}.${i}`, `${label}, part ${i + 1}`));
  } else if (n.type === 'Identifier' && varNames.has(n.name)) v.kind = 'var';
  else if (n.type === 'Literal' && typeof n.value === 'string') [v.kind, v.str, v.quote] = ['str', n.value, src[0]];
  else if (isNumLit(n) && NUM.test(src)) v.kind = 'num';
  else if (n.type === 'Literal' && typeof n.value === 'boolean') v.kind = 'bool';
  else if (n.type === 'MemberExpression' && n.computed && n.property.type === 'Literal' && typeof n.property.value === 'string') {
    const parts = pathParts(n.object);
    const r = parts && resolvePath(parts);
    if (r?.kind === 'member' && r.owner === 'Context' && r.name === 'Options') {
      v.kind = 'opt';
      v.optKey = n.property.value;
      v.optKeyRange = { start: n.property.start, end: n.property.end };
      v.optQuote = text[n.property.start];
    }
  } else if (n.type === 'MemberExpression') {
    const parts = pathParts(n);
    const r = parts && resolvePath(parts);
    if (r?.kind === 'member' && r.member.kind !== 'method' && r.member.kind !== 'object') {
      v.kind = 'prop';
      v.path = labelOf(r.owner, r.name);
      v.type = r.member.type;
    } else if (r?.kind === 'enumValue') {
      v.kind = 'enum';
      v.enumName = r.enumName;
      v.path = `Nucleus.${r.enumName}.${r.value}`;
    }
  }
  return v;
}

const CMP: Record<string, Op> = { '==': 'eq', '===': 'eq', '!=': 'ne', '!==': 'ne', '>': 'gt', '<': 'lt', '>=': 'ge', '<=': 'le' };
function readCond(t: any, text: string, key: string): Cond {
  const c: Cond = { start: t.start, end: t.end, op: 'code' };
  const val = (n: any, slot: string, label: string) => readVal(n, text, `${key}:${slot}`, label);
  if (t.type === 'BinaryExpression' && CMP[t.operator]) {
    // `s.indexOf(x) >= 0` and friends: contains / does not contain.
    const l = t.left;
    const num = t.right.type === 'UnaryExpression' && t.right.operator === '-' && t.right.argument.type === 'Literal' ? -t.right.argument.value : t.right.type === 'Literal' ? t.right.value : undefined;
    if (l.type === 'CallExpression' && l.callee.type === 'MemberExpression' && !l.callee.computed && l.callee.property.name === 'indexOf' && l.arguments.length === 1 && l.arguments[0].type !== 'SpreadElement') {
      const op = t.operator;
      const has = (num === 0 && op === '>=') || (num === -1 && (op === '>' || op === '!=' || op === '!=='));
      const not = (num === 0 && op === '<') || (num === -1 && (op === '==' || op === '===' || op === '<='));
      if (has || not) {
        c.op = has ? 'has' : 'nothas';
        c.left = val(l.callee.object, 'left', 'the text to search');
        c.right = val(l.arguments[0], 'right', 'the text to look for');
        return c;
      }
    }
    c.op = CMP[t.operator];
    c.written = t.operator;
    c.left = val(t.left, 'left', 'the first value');
    c.right = val(t.right, 'right', 'the second value');
    try {
      for (const tok of acorn.tokenizer(text.slice(t.left.end, t.right.start), { ecmaVersion: 'latest' })) {
        if ((tok as any).value === t.operator) {
          c.opRange = { start: t.left.end + tok.start, end: t.left.end + tok.end };
          break;
        }
      }
    } catch { /* leave it without a range */ }
    if (!c.opRange) [c.op, c.left, c.right] = ['code', undefined, undefined];
    else return c;
  }
  if (t.type === 'UnaryExpression' && t.operator === '!' && t.argument.type !== 'UnaryExpression') {
    c.op = 'false';
    c.left = val(t.argument, 'left', 'the value');
    return c;
  }
  if (t.type === 'MemberExpression' || t.type === 'Identifier' || t.type === 'CallExpression') {
    c.op = 'true';
    c.left = val(t, 'left', 'the value');
    return c;
  }
  c.op = 'code';
  c.code = { ...val(t, 'code', 'the condition'), kind: 'code' };
  return c;
}

/** The comments in `text` between `from` and `to`, as plain lines. */
function commentsIn(text: string, from: number, to: number): string | undefined {
  const out: string[] = [];
  for (const m of text.slice(from, to).matchAll(/\/\/(.*)|\/\*([\s\S]*?)\*\//g)) {
    const c = (m[1] ?? m[2] ?? '').split('\n').map((l) => l.replace(/^\s*\*?\s?/, '').trimEnd()).join('\n').trim();
    if (c) out.push(c);
  }
  return out.length ? out.join('\n') : undefined;
}

function readBranch(node: any, text: string, key: string): Branch {
  if (node.type === 'BlockStatement') {
    return {
      key,
      block: { start: node.start, end: node.end },
      stmts: node.body.map((s: any, i: number) => {
        const st = readStmt(s, text, `${key}/${i}`);
        st.note = commentsIn(text, i ? node.body[i - 1].end : node.start + 1, s.start);
        // A comment after the previous statement on its own line belongs to that one.
        if (i && st.note) {
          const between = text.slice(node.body[i - 1].end, s.start);
          const nl = between.indexOf('\n');
          if (nl >= 0) st.note = commentsIn(text, node.body[i - 1].end + nl, s.start);
        }
        return st;
      }),
    };
  }
  return { key, single: { start: node.start, end: node.end }, stmts: [readStmt(node, text, `${key}/0`)] };
}

function hasFunction(n: any): boolean {
  let found = false;
  const walk = (x: any) => {
    if (found || !x || typeof x.type !== 'string') return;
    if (x.type === 'FunctionExpression' || x.type === 'ArrowFunctionExpression') {
      found = true;
      return;
    }
    for (const k of Object.keys(x)) {
      const v = x[k];
      if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === 'object' && typeof v.type === 'string') walk(v);
    }
  };
  walk(n);
  return found;
}

function readStmt(s: any, text: string, key: string): Stmt {
  const st: Stmt = { key, start: s.start, end: s.end, kind: 'code', src: text.slice(s.start, s.end) };
  if (s.type === 'IfStatement') {
    st.kind = 'if';
    st.clauses = [];
    let x = s;
    let i = 0;
    for (;;) {
      const ck = i ? `${key}~${i}` : key;
      st.clauses.push({ node: { start: x.start, end: x.end }, test: readCond(x.test, text, ck), testParen: { start: x.start, end: x.consequent.start }, body: readBranch(x.consequent, text, `${ck}>then`) });
      if (x.alternate && x.alternate.type === 'IfStatement') {
        x = x.alternate;
        i++;
        continue;
      }
      if (x.alternate) st.otherwise = readBranch(x.alternate, text, `${key}>else`);
      break;
    }
    return st;
  }
  if (s.type === 'VariableDeclaration' && s.declarations.length === 1 && s.declarations[0].id.type === 'Identifier' && !hasFunction(s)) {
    const d = s.declarations[0];
    st.kind = 'var';
    st.varName = d.id.name;
    if (d.init) st.value = readVal(d.init, text, `${key}:value`, `the value of ${d.id.name}`);
    return st;
  }
  if (s.type !== 'ExpressionStatement' || hasFunction(s)) return st;
  const e = s.expression;
  if (e.type === 'AssignmentExpression' && (e.operator === '=' || e.operator === '+=') && (e.left.type === 'MemberExpression' || e.left.type === 'Identifier')) {
    st.kind = 'set';
    st.op = e.operator;
    st.calleeText = text.slice(e.left.start, e.left.end);
    const parts = pathParts(e.left);
    const r = parts && resolvePath(parts);
    if (r?.kind === 'member') Object.assign(st, { owner: r.owner, name: r.name, member: r.member, path: labelOf(r.owner, r.name) });
    st.value = readVal(e.right, text, `${key}:value`, `the new value of ${st.path ?? st.calleeText}`, r?.kind === 'member' ? r.member.type : undefined);
    return st;
  }
  if (e.type === 'CallExpression' && e.arguments.every((a: any) => a.type !== 'SpreadElement')) {
    const parts = pathParts(e.callee);
    if (!parts) return st;
    st.kind = 'call';
    st.calleeText = text.slice(e.callee.start, e.callee.end);
    const r = resolvePath(parts);
    if (r?.kind === 'member') Object.assign(st, { owner: r.owner, name: r.name, member: r.member, path: labelOf(r.owner, r.name) });
    const n = e.arguments.length;
    const ovs = st.member?.overloads ?? [];
    // Jint matches by the number of arguments; a `params` array takes the rest.
    const ov = ovs.find((o) => o.params.length === n && !o.params.some((p) => p.rest)) ?? ovs.find((o) => o.params.some((p) => p.rest) && n >= o.params.length - 1);
    const param = (i: number) => ov && (ov.params[i] && !ov.params[i].rest ? ov.params[i] : ov.params.find((p) => p.rest));
    st.argNames = e.arguments.map((_: any, i: number) => param(i)?.name ?? `value ${i + 1}`);
    st.args = e.arguments.map((a: any, i: number) => readVal(a, text, `${key}:arg${i}`, st.argNames![i], param(i)?.type));
  }
  return st;
}

function read(text: string): Model {
  let program: any;
  try {
    program = parseLikeJint(text, PARSE_OPTS).program;
  } catch (err: any) {
    return { callbacks: [], optionNames: [], varNames: [], error: { message: String(err?.message ?? err).replace(/\s*\(\d+:\d+\)$/, ''), pos: typeof err?.pos === 'number' ? err.pos : 0 } };
  }
  varNames = collectVars(program);
  const callbacks: Callback[] = [];
  const optionNames: string[] = [];
  const seen = new Map<string, number>();
  for (const st of program.body) {
    if (st.type !== 'ExpressionStatement') continue;
    const e = st.expression;
    if (e.type === 'CallExpression' && e.arguments[0]?.type === 'Literal' && typeof e.arguments[0].value === 'string') {
      const p = pathParts(e.callee);
      const r = p && resolvePath(p);
      if (r?.kind === 'member' && r.owner === 'Game' && r.name === 'AddOption' && !optionNames.includes(e.arguments[0].value)) optionNames.push(e.arguments[0].value);
    }
    if (e.type !== 'AssignmentExpression' || e.operator !== '=') continue;
    const parts = pathParts(e.left);
    const r = parts && resolvePath(parts);
    if (r?.kind !== 'member') continue;
    const def = CALLBACKS.find((c) => c.owner === r.owner && c.name === r.name);
    if (!def) continue;
    const n = seen.get(def.path) ?? 0;
    seen.set(def.path, n + 1);
    const key = `${def.name}${n ? `#${n}` : ''}`;
    const cb: Callback = { key, path: def.path, owner: r.owner, name: r.name, member: r.member, stmt: { start: st.start, end: st.end } };
    if (e.right.type === 'FunctionExpression') {
      cb.fn = { start: e.right.start, end: e.right.end };
      cb.body = readBranch(e.right.body, text, key);
    }
    callbacks.push(cb);
  }
  return { callbacks, optionNames, varNames: [...varNames].sort() };
}

// ---------------------------------------------------------------------------
// Writing

const lineStartAt = (t: string, o: number) => t.lastIndexOf('\n', o - 1) + 1;
const lineEndAt = (t: string, o: number) => {
  const i = t.indexOf('\n', o);
  return i < 0 ? t.length : i;
};
const indentAt = (t: string, o: number) => /^[ \t]*/.exec(t.slice(lineStartAt(t, o)))![0];
function applyTo(text: string, edits: TextEdit[]): string {
  let out = text;
  for (const e of [...edits].sort((a, b) => b.start - a.start)) out = out.slice(0, e.start) + e.text + out.slice(e.end);
  return out;
}
const strLit = (s: string, q = '"') => q + s.replace(/\\/g, '\\\\').replace(new RegExp(q, 'g'), '\\' + q).replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029') + q;

/** One level of indentation, as the file uses it. */
function indentUnit(t: string): string {
  if (/^\t/m.test(t)) return '\t';
  let min = 0;
  for (const m of t.matchAll(/^( +)\S/gm)) if (!min || m[1].length < min) min = m[1].length;
  return ' '.repeat(min === 2 || min === 4 ? min : 4);
}
/** A snippet written with `\t` for one level, indented for `ind` and the file's unit. */
const shape = (snippet: string, ind: string, unit: string) => snippet.replace(/\t/g, unit).replace(/\n/g, '\n' + ind);

/** Whether `s` is one expression on its own (no comma list, nothing left over). */
function isExpression(s: string): boolean {
  if (!s.trim()) return false;
  try {
    const n: any = acorn.parseExpressionAt(s, 0, { ecmaVersion: 'latest' });
    return n.type !== 'SequenceExpression' && !s.slice(n.end).trim();
  } catch {
    return false;
  }
}

/** A first value for a slot of this type. */
function defaultFor(type: string | undefined, name = ''): string {
  const t = (type ?? '').replace(/ \| number \| boolean$/, '');
  if (/instanceHandle/i.test(name)) return 'Player.ProtoInputInstanceHandle';
  if (/hookID/i.test(name)) return 'ProtoInput.Values.MessageFilterHookID';
  if (/filterID/i.test(name)) return 'ProtoInput.Values.MouseMoveFilterID';
  const en = /^Nucleus\.(\w+)$/.exec(t)?.[1] ?? (t.startsWith('enum:') ? t.slice(5) : undefined);
  if (en && api.enums[en]) return `Nucleus.${en}.${Object.keys(api.enums[en].values)[0]}`;
  if (t === 'number') return '0';
  if (t === 'boolean') return 'true';
  if (t.endsWith('[]') || t === 'array') return '[]';
  return '""';
}
function isMemberLike(src: string): boolean {
  try {
    const n: any = acorn.parseExpressionAt(src, 0, { ecmaVersion: 'latest' });
    return ['Identifier', 'MemberExpression', 'CallExpression', 'Literal'].includes(n.type) && !src.slice(n.end).trim();
  } catch {
    return false;
  }
}
const wrap = (src: string) => (isMemberLike(src) ? src : `(${src})`);

// ---------------------------------------------------------------------------
// Diagnostics after the view's own edits (as in formview.ts)

interface Logged { before: string; edits: TextEdit[] }
function mapThrough(r: Range, edits: TextEdit[]): Range | undefined {
  let ds = 0;
  let de = 0;
  for (const e of edits) {
    const delta = e.text.length - (e.end - e.start);
    if (e.start < r.end && e.end > r.start) return undefined;
    if (e.start === e.end && e.start > r.start && e.start < r.end) return undefined;
    if (e.end <= r.start) ds += delta;
    if (e.end <= r.end) de += delta;
  }
  return { start: r.start + ds, end: r.end + de };
}
function mapDiag(d: Diagnostic, edits: TextEdit[]): Diagnostic | undefined {
  const r = mapThrough(d, edits);
  if (!r) return undefined;
  const fixes = d.fixes?.map((f): Fix | undefined => {
    const es = f.edits.map((x) => {
      const m = mapThrough(x, edits);
      return m && { ...m, text: x.text };
    });
    return es.every(Boolean) ? { ...f, edits: es as TextEdit[] } : undefined;
  }).filter((f): f is Fix => !!f);
  return { ...d, ...r, fixes };
}

// ---------------------------------------------------------------------------
// DOM helpers

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const inline = (s: string) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>');
const firstSentence = (s: string) => {
  const t = s.split(/\n\s*\n/)[0].replace(/\s+/g, ' ').trim();
  const m = t.match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : t).trim();
};
function h<K extends keyof HTMLElementTagNameMap>(tag: K, cls = '', attrs: Record<string, string> = {}, text?: string): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  if (text !== undefined) el.textContent = text;
  return el;
}
const SEV_LABEL: Record<string, string> = { error: 'Error', warning: 'Warning', info: 'Note', hint: 'Hint' };
const SEV_ORDER: Record<string, number> = { error: 0, warning: 1, info: 2, hint: 3 };
const USES: Record<string, number> = (USAGE as any).counts ?? {};

const OP_LABEL: [Op, string][] = [
  ['eq', 'equals'], ['ne', 'does not equal'], ['gt', 'is greater than'], ['lt', 'is less than'], ['ge', 'is at least'], ['le', 'is at most'],
  ['has', 'contains'], ['nothas', 'does not contain'], ['true', 'is true'], ['false', 'is not true'],
];
const OP_TEXT: Partial<Record<Op, string>> = { eq: '==', ne: '!=', gt: '>', lt: '<', ge: '>=', le: '<=' };
const KIND_LABEL: [VKind, string][] = [['str', 'Text'], ['num', 'Number'], ['bool', 'Yes/No'], ['prop', 'Property'], ['opt', 'Option'], ['var', 'Variable'], ['join', 'Joined'], ['enum', 'Choice'], ['code', 'Code']];

/** Properties a value can read: Context, Player, ProtoInput.Values, most used first. */
let propGroups: { label: string; items: { path: string; m: Member }[] }[] | undefined;
function properties() {
  if (!propGroups) {
    const group = (label: string, owner: string) => ({
      label,
      items: Object.entries(api.objects[owner]?.members ?? {})
        .filter(([, m]) => m.kind !== 'method' && m.kind !== 'object' && !m.internal && !m.deprecated && m.type !== 'function')
        .map(([n, m]) => ({ path: labelOf(owner, n), m }))
        .sort((a, b) => (USES[b.path] ?? 0) - (USES[a.path] ?? 0) || a.path.localeCompare(b.path)),
    });
    propGroups = [group('Context (this player’s instance)', 'Context'), group('Player', 'PlayerInfo'), group('ProtoInput.Values', 'ProtoInputValues')];
  }
  return propGroups;
}
function memberOfPath(path: string): { owner: string; name: string; m: Member } | undefined {
  const r = resolvePath(path.split('.'));
  return r?.kind === 'member' ? { owner: r.owner, name: r.name, m: r.member } : undefined;
}

// The action palette

interface Action { id: string; group: string; title: string; path?: string; doc: string; snippet: (t: string) => string; uses: number; member?: { owner: string; name: string; m: Member } }
let actionList: Action[] | undefined;
function actions(): Action[] {
  if (actionList) return actionList;
  const list: Action[] = [];
  list.push({ id: 'if', group: 'Conditions', title: 'If … then', doc: 'Do the steps inside only when a condition holds, e.g. only for the first player.', snippet: () => 'if (Context.PlayerID == 0) {\n}', uses: 1e6 });
  list.push({ id: 'ifelse', group: 'Conditions', title: 'If … then … otherwise', doc: 'Do one set of steps when a condition holds and another when it does not.', snippet: () => 'if (Context.PlayerID == 0) {\n} else {\n}', uses: 1e6 - 1 });
  list.push({ id: 'var', group: 'Set a value', title: 'New variable', doc: 'Keep a value under a name, to use it in the steps after it.', uses: 5e5, snippet: (t) => {
    let n = 'value';
    for (let i = 2; new RegExp(`\\b${n}\\b`).test(t); i++) n = `value${i}`;
    return `var ${n} = "";`;
  } });
  const callSnippet = (label: string, m: Member) => () => {
    const ov = [...(m.overloads ?? [])].sort((a, b) => a.params.length - b.params.length)[0];
    return `${label}(${(ov?.params ?? []).map((p) => defaultFor(p.type, p.name)).join(', ')});`;
  };
  const add = (owner: string, group: string, filter: (m: Member) => boolean, make: (label: string, m: Member) => (t: string) => string) => {
    for (const [name, m] of Object.entries(api.objects[owner]?.members ?? {})) {
      if (m.internal || m.deprecated || !filter(m)) continue;
      const path = labelOf(owner, name);
      list.push({ id: path, group, title: path, path, doc: firstSentence(m.doc || ''), snippet: make(path, m), uses: USES[path] ?? 0, member: { owner, name, m } });
    }
  };
  add('Context', 'Set a value', (m) => m.kind !== 'method' && m.kind !== 'object' && !m.readonly && m.type !== 'function', (label, m) => () => `${label} = ${defaultFor(m.type)};`);
  add('Context', 'Context actions', (m) => m.kind === 'method', callSnippet);
  add('ProtoInputRuntime', 'Proto Input', (m) => m.kind === 'method', callSnippet);
  add('PlayerInfo', 'Player', (m) => m.kind === 'method', callSnippet);
  for (const owner of ['System.IO.File', 'System.IO.Directory', 'System.Threading.Thread']) {
    add(owner, 'Files and folders (.NET)', (m) => m.kind === 'method' && !!m.overloads?.some((o) => o.returns === 'void' || o.returns === 'any' || o.returns === 'boolean'), callSnippet);
  }
  actionList = list;
  return list;
}

let mounts = 0;

// ---------------------------------------------------------------------------

export function mountBlocksView(container: HTMLElement, host: BlocksHost): BlocksView {
  const uid = `bv${++mounts}-`;
  const idOf = (fid: string) => uid + fid.replace(/[^\w-]/g, '_');

  const root = h('div', 'bv');
  const bar = h('div', 'bv-bar');
  const addCbs = h('div', 'bv-add-cbs', { role: 'group', 'aria-label': 'Add a callback' });
  const status = h('div', 'bv-status', { role: 'status', 'aria-live': 'polite' });
  bar.append(addCbs, status);
  const banner = h('div', 'bv-banner', { role: 'alert' });
  banner.hidden = true;
  const sectionsEl = h('div', 'bv-sections');
  const elsewhere = h('div', 'bv-elsewhere');
  const palette = h('div', 'bv-palette', { id: idOf('palette'), role: 'group', 'aria-label': 'Add a step' });
  palette.hidden = true;
  // A heading for the view, so the callbacks' headings (h3) follow one (screen readers' heading list).
  root.append(h('h2', 'sr-only', {}, 'Blocks'), bar, banner, sectionsEl, elsewhere);
  container.append(root);

  let model: Model = { callbacks: [], optionNames: [], varNames: [] };
  let text = '';
  let diagBase = '';
  let diags: Diagnostic[] = [];
  let log: Logged[] = [];
  let focusWant: string | undefined;
  const codeEditing = new Set<string>(); // code rows being typed in: they stay code rows until left
  const forcedCode = new Set<string>(); // slots shown as code although they read as something else
  const vals = new Map<string, Val>();
  const conds = new Map<string, Cond>();
  const stmts = new Map<string, Stmt>();
  const branches = new Map<string, Branch>();
  const parts = new Map<string, { el: HTMLElement; sig: string }>();
  let used = new Set<string>();

  const say = (msg: string) => {
    status.textContent = '';
    requestAnimationFrame(() => (status.textContent = msg));
  };

  function currentDiags(): Diagnostic[] | undefined {
    if (diagBase === text) return diags;
    const i = log.findIndex((l) => l.before === diagBase);
    if (i < 0) return undefined;
    let out = diags;
    for (const l of log.slice(i)) out = out.map((d) => mapDiag(d, l.edits)).filter((d): d is Diagnostic => !!d);
    return out;
  }

  function edit(edits: TextEdit[], focus?: string, quiet = false): boolean {
    const before = host.getText();
    if (before !== text) {
      update();
      say('The code changed; try again.');
      return false;
    }
    const after = applyTo(before, edits);
    try {
      parseLikeJint(after, PARSE_OPTS);
    } catch {
      if (!quiet) say("That change would break the code, so it wasn't made.");
      return false;
    }
    host.applyEdits([...edits].sort((a, b) => a.start - b.start));
    log.push({ before, edits });
    if (log.length > 200) log = log.slice(-200);
    if (focus) focusWant = focus;
    update();
    return true;
  }

  /** A cached element for `key`, rebuilt when `sig` changes. */
  function part(key: string, sig: string, build: () => HTMLElement): HTMLElement {
    used.add(key);
    const p = parts.get(key);
    if (p && p.sig === sig) return p.el;
    const el = build();
    parts.set(key, { el, sig });
    return el;
  }
  /** Puts `children` into `parent` in this order, keeping the ones already there. */
  function place(parent: HTMLElement, children: HTMLElement[]) {
    children.forEach((c, i) => {
      if (parent.children[i] !== c) parent.insertBefore(c, parent.children[i] ?? null);
    });
    while (parent.children.length > children.length) parent.lastElementChild!.remove();
  }
  const icon = (fid: string, label: string, glyph: string, cls = '') => {
    const b = h('button', `bv-icon ${cls}`, { type: 'button', 'aria-label': label, title: label, 'data-bv': fid }, glyph);
    b.id = idOf(fid);
    return b;
  };

  // Like the Form view and Check: each step is one line (and its main problem, with a fix); the description, every
  // problem in full, docs and the move / edit / remove buttons open with the arrow. Settings › Check › Detailed opens
  // them all.
  const toggled = new Set<string>();
  const isOpen = (key: string) => ((host.density?.() ?? 'compact') === 'detailed') !== toggled.has(key);
  function setOpen(row: HTMLElement, open: boolean) {
    const more = row.querySelector<HTMLElement>(':scope > .bv-more');
    const t = row.querySelector<HTMLElement>(':scope > .bv-line > .bv-toggle');
    if (!more || !t) return;
    more.hidden = !open;
    row.classList.toggle('bv-open', open);
    t.setAttribute('aria-expanded', String(open));
  }
  function collapsible(row: HTMLElement, line: HTMLElement, key: string, label: string, inner: (HTMLElement | undefined)[]) {
    const moreId = idOf(`${key}:more`);
    const t = h('button', 'bv-toggle', { type: 'button', 'aria-expanded': 'false', 'aria-controls': moreId, 'aria-label': `More about ${label}`, title: 'More', 'data-bv': `${key}:more` });
    t.id = idOf(`${key}:more-btn`);
    line.append(t);
    const more = h('div', 'bv-more', { id: moreId });
    for (const el of inner) if (el) more.append(el);
    row.append(line, h('div', 'bv-sum'), more);
    t.addEventListener('click', () => {
      const open = !!more.hidden;
      if (open === ((host.density?.() ?? 'compact') === 'detailed')) toggled.delete(key); else toggled.add(key);
      setOpen(row, open);
    });
    setOpen(row, isOpen(key));
  }

  // --- value slots ---------------------------------------------------------------

  const valSig = (v: Val): string => forcedCode.has(v.key) || v.kind === 'code' ? `C${v.src.includes('\n') ? 'M' : ''}` : `${v.kind}${v.kind === 'prop' || v.kind === 'enum' ? v.path : ''}${v.kind === 'enum' ? v.enumName : ''}${v.parts ? `(${v.parts.map(valSig).join(',')})` : ''}`;
  const shownKind = (v: Val): VKind => (forcedCode.has(v.key) ? 'code' : v.kind);

  function valueEditor(v0: Val, allowKinds = true, inPart = false): HTMLElement {
    const k = v0.key;
    const kind = shownKind(v0);
    const wrapEl = h('span', `bv-val bv-v-${kind}`);
    if (allowKinds) {
      const sel = h('select', 'bv-kind', { 'data-bv': `${k}:kind`, 'aria-label': `Kind of value for ${v0.label}`, title: 'Kind of value' });
      sel.id = idOf(`${k}:kind`);
      for (const [vk, lab] of KIND_LABEL) {
        if (vk === 'enum' && kind !== 'enum') continue;
        if (vk === 'var' && kind !== 'var' && !model.varNames.length) continue;
        if (vk === 'join' && inPart) continue;
        sel.append(h('option', '', { value: vk }, lab));
      }
      sel.value = kind;
      sel.addEventListener('change', () => changeKind(k, sel.value as VKind));
      wrapEl.append(sel);
    }
    const fid = `${k}:v`;
    const common = { 'data-bv': fid, 'aria-label': v0.label, id: idOf(fid) };
    switch (kind) {
      case 'str': {
        const inp = h('textarea', 'bv-input', { ...common, spellcheck: 'false', autocomplete: 'off', rows: '1' });
        inp.addEventListener('input', () => {
          const v = vals.get(k);
          if (v?.kind === 'str' && inp.value !== v.str) edit([{ start: v.start, end: v.end, text: strLit(inp.value, v.quote) }], undefined, true);
        });
        wrapEl.append(growField(inp, { label: v0.label, multiline: true }));
        break;
      }
      case 'num': {
        const inp = h('input', 'bv-input bv-num', { ...common, type: 'text', inputmode: 'decimal', spellcheck: 'false', autocomplete: 'off' });
        inp.addEventListener('input', () => {
          const v = vals.get(k);
          const s = inp.value.trim();
          const ok = NUM.test(s);
          inp.setAttribute('aria-invalid', String(!ok));
          if (ok && v?.kind === 'num' && s !== v.src) edit([{ start: v.start, end: v.end, text: s }]);
        });
        wrapEl.append(inp);
        break;
      }
      case 'bool': {
        const sel = h('select', 'bv-select', common);
        sel.append(h('option', '', { value: 'true' }, 'yes (true)'), h('option', '', { value: 'false' }, 'no (false)'));
        sel.addEventListener('change', () => {
          const v = vals.get(k);
          if (v?.kind === 'bool') edit([{ start: v.start, end: v.end, text: sel.value }], fid);
        });
        wrapEl.append(sel);
        break;
      }
      case 'prop': {
        const sel = h('select', 'bv-select bv-prop', common);
        let found = false;
        for (const g of properties()) {
          const og = h('optgroup', '', { label: g.label });
          for (const it of g.items) {
            og.append(h('option', '', { value: it.path }, it.path));
            if (it.path === v0.path) found = true;
          }
          sel.append(og);
        }
        if (!found && v0.path) sel.prepend(h('option', '', { value: v0.path }, v0.path));
        sel.value = v0.path ?? '';
        const m = v0.path ? memberOfPath(v0.path) : undefined;
        if (m) sel.title = firstSentence(m.m.doc || '');
        sel.addEventListener('change', () => {
          const v = vals.get(k);
          if (v?.kind === 'prop' && sel.value !== v.path) edit([{ start: v.start, end: v.end, text: sel.value }], fid);
        });
        wrapEl.append(sel);
        break;
      }
      case 'enum': {
        const sel = h('select', 'bv-select', common);
        for (const n of Object.keys(api.enums[v0.enumName!]?.values ?? {})) sel.append(h('option', '', { value: `Nucleus.${v0.enumName}.${n}` }, n));
        sel.value = v0.path ?? '';
        sel.addEventListener('change', () => {
          const v = vals.get(k);
          if (v?.kind === 'enum' && sel.value !== v.path) edit([{ start: v.start, end: v.end, text: sel.value }], fid);
        });
        wrapEl.append(h('span', 'bv-word', {}, `Nucleus.${v0.enumName}.`), sel);
        break;
      }
      case 'opt': {
        const listId = idOf(`${k}:opts`);
        const inp = h('input', 'bv-input', { ...common, type: 'text', list: listId, spellcheck: 'false', autocomplete: 'off', 'aria-label': `${v0.label}: name of the option (Game.AddOption)` });
        const dl = h('datalist', '', { id: listId });
        for (const n of model.optionNames) dl.append(h('option', '', { value: n }));
        inp.addEventListener('input', () => {
          const v = vals.get(k);
          if (v?.kind === 'opt' && v.optKeyRange && inp.value !== v.optKey) edit([{ ...v.optKeyRange, text: strLit(inp.value, v.optQuote) }], undefined, true);
        });
        wrapEl.append(h('span', 'bv-word', {}, 'the player’s choice for'), inp, dl);
        break;
      }
      case 'var': {
        const sel = h('select', 'bv-select', common);
        const names = model.varNames.includes(v0.src) ? model.varNames : [v0.src, ...model.varNames];
        for (const n of names) sel.append(h('option', '', { value: n }, n));
        sel.value = v0.src;
        sel.addEventListener('change', () => {
          const v = vals.get(k);
          if (v?.kind === 'var' && sel.value !== v.src) edit([{ start: v.start, end: v.end, text: sel.value }], fid);
        });
        wrapEl.append(sel);
        break;
      }
      case 'join': {
        const box = h('span', 'bv-join', { role: 'group', 'aria-label': `${v0.label}: text joined from ${v0.parts!.length} parts` });
        v0.parts!.forEach((pv, i) => {
          if (i) box.append(h('span', 'bv-plus', { 'aria-hidden': 'true' }, '+'));
          box.append(valueEditor(pv, true, true));
        });
        const more = h('button', 'bv-icon bv-more', { type: 'button', 'data-bv': `${k}:more`, id: idOf(`${k}:more`), 'aria-label': `Add a part to ${v0.label}`, title: 'Add a part' }, '+');
        more.addEventListener('click', () => {
          const v = vals.get(k);
          if (v?.kind === 'join') edit([{ start: v.end, end: v.end, text: ' + ""' }], `${k}.${v.parts!.length}:v`);
        });
        box.append(more);
        wrapEl.append(box);
        break;
      }
      case 'code': {
        // A small code editor (codefield.ts); over several lines, so the line breaks (and any // comments) stay.
        const multi = v0.src.includes('\n');
        const f = new CodeField({ attrs: { 'data-bv': fid, id: idOf(fid) }, label: v0.label, value: v0.src, multiline: multi, baseIndent: () => indentAt(text, vals.get(k)?.start ?? 0), unit: () => indentUnit(text) });
        f.el.classList.add('bv-code');
        f.oninput = () => {
          const v = vals.get(k);
          if (!v) return;
          const val = f.value;
          const ok = isExpression(val);
          f.setInvalid(!ok);
          forcedCode.add(k); // stays code while typed in, even when it reads as something else
          if (ok && val !== v.src) edit([{ start: v.start, end: v.end, text: val }], undefined, true);
        };
        if (!allowKinds) f.onblur = () => {
          if (forcedCode.delete(k)) setTimeout(update);
        };
        wrapEl.append(f.el);
        break;
      }
    }
    return wrapEl;
  }

  function fillValue(scope: HTMLElement, v: Val) {
    vals.set(v.key, v);
    if (shownKind(v) === 'join') {
      for (const p of v.parts!) fillValue(scope, p);
      return;
    }
    const el = scope.querySelector<HTMLInputElement & HTMLSelectElement>(`[data-bv="${CSS.escape(`${v.key}:v`)}"]`);
    const kind = shownKind(v);
    const cf = codeFieldOf(el);
    if (cf) {
      const ms = marksIn(v);
      if (ms) cf.setMarks(ms);
      if (cf.hasFocus()) return;
      if (cf.value !== v.src) cf.value = v.src;
      cf.setInvalid(false);
      return;
    }
    if (!el || el === document.activeElement) return;
    const want = kind === 'str' ? v.str! : kind === 'opt' ? v.optKey! : kind === 'prop' || kind === 'enum' ? v.path! : v.src;
    if (el.value !== want) el.value = want;
    if (el instanceof HTMLTextAreaElement) fit(el);
    el.removeAttribute('aria-invalid');
  }

  /** The problems inside `r`, in its own offsets (for a code editor's squiggles); undefined while out of date. */
  function marksIn(r: Range): Mark[] | undefined {
    const ds = currentDiags();
    return ds?.filter((d) => d.start >= r.start && d.start < Math.max(r.end, r.start + 1))
      .map((d) => ({ start: d.start - r.start, end: Math.min(d.end, r.end) - r.start, severity: d.severity, message: d.message }));
  }

  function changeKind(k: string, to: VKind) {
    const v = vals.get(k);
    if (!v) return;
    const from = shownKind(v);
    if (to === from) return;
    if (to === 'code') {
      forcedCode.add(k);
      focusWant = `${k}:v`;
      update();
      return;
    }
    forcedCode.delete(k);
    if (to === v.kind) {
      focusWant = `${k}:v`;
      update();
      return;
    }
    let t = '';
    const first = properties()[0].items[0].path;
    switch (to) {
      case 'str': t = strLit(v.kind === 'num' || v.kind === 'bool' ? v.src : ''); break;
      case 'num': t = v.kind === 'str' && NUM.test(v.str!.trim()) ? v.str!.trim() : '0'; break;
      case 'bool': t = 'true'; break;
      case 'prop': t = v.type === 'boolean' ? 'Context.IsKeyboardPlayer' : v.type === 'number' ? 'Context.PlayerID' : first; break;
      case 'opt': t = `Context.Options[${strLit(model.optionNames[0] ?? '')}]`; break;
      case 'var': t = model.varNames[0] ?? ''; break;
      case 'join': t = `${v.kind === 'code' && !isMemberLike(v.src) ? `(${v.src})` : v.src} + ""`; break;
      default: return;
    }
    edit([{ start: v.start, end: v.end, text: t }], `${k}:v`);
  }

  // --- rows -------------------------------------------------------------------------

  function stmtSig(s: Stmt): string {
    const vs = (v?: Val) => (v ? valSig(v) : '-');
    switch (s.kind) {
      case 'call': return `call|${s.path ?? s.calleeText}|${(s.args ?? []).map(vs).join(',')}|${s.argNames?.join(',')}`;
      case 'set': return `set|${s.path ?? s.calleeText}|${s.op}|${vs(s.value)}`;
      case 'var': return `var|${s.varName}|${vs(s.value)}`;
      case 'code': return `code`;
      default: return s.kind;
    }
  }
  const condSig = (c: Cond, k: string) => `${c.op}|${c.written ?? ''}|${c.left ? valSig(c.left) : '-'}|${c.right ? valSig(c.right) : '-'}|${k}|${model.varNames.join()}|${model.optionNames.join()}`;

  /** The tools at the end of a row: docs, move, edit in code, remove. */
  function rowTools(s: Stmt, siblings: number, index: number, member?: { owner: string; name: string; m: Member }, card?: HTMLElement): HTMLElement {
    const tools = h('span', 'bv-tools');
    const k = s.key;
    if (member && card) {
      const info = icon(`${k}:info`, `About ${labelOf(member.owner, member.name)}`, 'i', 'bv-info');
      info.setAttribute('aria-expanded', 'false');
      info.setAttribute('aria-controls', card.id);
      info.addEventListener('click', () => {
        const open = card.hidden;
        if (open && !card.innerHTML) card.innerHTML = memberCard(member.owner, member.name, member.m);
        card.hidden = !open;
        info.setAttribute('aria-expanded', String(open));
      });
      tools.append(info);
    }
    const up = icon(`${k}:up`, 'Move up (Alt+↑)', '↑');
    up.setAttribute('aria-keyshortcuts', 'Alt+ArrowUp');
    up.disabled = index === 0;
    up.addEventListener('click', () => move(k, -1));
    const down = icon(`${k}:down`, 'Move down (Alt+↓)', '↓');
    down.setAttribute('aria-keyshortcuts', 'Alt+ArrowDown');
    down.disabled = index === siblings - 1;
    down.addEventListener('click', () => move(k, 1));
    const code = h('button', 'bv-link', { type: 'button', 'data-bv': `${k}:code`, id: idOf(`${k}:code`) }, 'Edit in code');
    code.addEventListener('click', () => {
      const cur = stmts.get(k);
      if (cur) host.jumpTo(cur.start);
    });
    const del = icon(`${k}:del`, 'Remove this step', '×', 'bv-del');
    del.addEventListener('click', () => removeStmt(k));
    tools.append(up, down, code, del);
    return tools;
  }

  function memberInfo(s: Stmt) {
    return s.member && s.owner && s.name ? { owner: s.owner, name: s.name, m: s.member } : undefined;
  }
  function docLine(m?: Member, fallback = ''): HTMLElement {
    const d = h('div', 'bv-doc');
    const s = m ? firstSentence(m.deprecated ? `Deprecated. ${m.deprecated}` : m.doc || '') : fallback;
    d.innerHTML = (m?.docBy === 'claude' ? '<span class="ai-spark bv-ai" title="AI-written docs" aria-label="AI-written docs" role="img"></span> ' : '') + inline(s);
    if (!s) d.hidden = true;
    return d;
  }
  const noteEl = (note: string) => {
    const n = h('div', 'bv-note');
    n.append(h('span', 'bv-sr', {}, 'Comment: '), document.createTextNode(note));
    return n;
  };
  const pathLabel = (p: string) => {
    const i = p.lastIndexOf('.');
    return `<span class="bv-owner">${esc(p.slice(0, i + 1))}</span><span class="bv-name">${esc(p.slice(i + 1))}</span>`;
  };

  /** One row of a branch: an action, a condition (with its branches) or code. */
  function renderStmt(s: Stmt, siblings: number, index: number, depth: number): HTMLElement {
    if (codeEditing.has(s.key) && s.kind !== 'code') s = { key: s.key, start: s.start, end: s.end, kind: 'code', src: text.slice(s.start, s.end) };
    stmts.set(s.key, s);
    const sig = `${stmtSig(s)}|${s.note ?? ''}|${siblings}|${index}|${model.varNames.join()}|${model.optionNames.join()}`;
    const el = part(`row:${s.key}`, sig, () => {
      const li = h('li', `bv-row bv-k-${s.kind === 'if' ? 'if' : s.kind === 'code' ? 'code' : 'action'}`, { 'data-key': s.key });
      if (s.kind === 'if') {
        if (s.note) li.append(noteEl(s.note));
        li.append(h('div', 'bv-clauses'));
        return li;
      }
      if (s.note) li.append(noteEl(s.note));
      const head = h('div', 'bv-line');
      const tag = h('span', 'bv-tag', {}, s.kind === 'code' ? 'Code' : 'Action');
      const sentence = h('div', 'bv-sentence');
      const mi = memberInfo(s);
      const card = mi ? h('div', 'bv-card', { id: idOf(`${s.key}:card`) }) : undefined;
      if (card) card.hidden = true;
      if (s.kind === 'call') {
        const name = h('span', 'bv-target', s.member ? { title: firstSentence(s.member.doc || '') } : {});
        name.innerHTML = pathLabel(s.path ?? s.calleeText!);
        sentence.append(h('span', 'bv-word', {}, 'Do'), name);
        (s.args ?? []).forEach((a, i) => {
          const arg = h('span', 'bv-arg');
          arg.append(h('span', 'bv-param', {}, s.argNames![i]), valueEditor(a));
          sentence.append(arg);
        });
      } else if (s.kind === 'set') {
        const name = h('span', 'bv-target', s.member ? { title: firstSentence(s.member.doc || '') } : {});
        name.innerHTML = s.path ? pathLabel(s.path) : `<span class="bv-name">${esc(s.calleeText!)}</span>`;
        sentence.append(h('span', 'bv-word', {}, s.op === '+=' ? 'Add to' : 'Set'), name, h('span', 'bv-word', {}, s.op === '+=' ? 'the value' : 'to'), valueEditor(s.value!));
      } else if (s.kind === 'var') {
        sentence.append(h('span', 'bv-word', {}, 'New variable'), h('span', 'bv-target bv-name', {}, s.varName!));
        if (s.value) sentence.append(h('span', 'bv-word', {}, '='), valueEditor(s.value));
      } else {
        const ta = new CodeField({ attrs: { 'data-bv': `${s.key}:src`, id: idOf(`${s.key}:src`) }, label: 'Code of this step', value: s.src ?? '', multiline: true, baseIndent: () => indentAt(text, stmts.get(s.key)?.start ?? 0), unit: () => indentUnit(text) });
        ta.el.classList.add('bv-codeblock');
        ta.onblur = () => {
          if (codeEditing.delete(s.key)) setTimeout(update);
        };
        ta.oninput = () => {
          const cur = stmts.get(s.key);
          if (!cur) return;
          codeEditing.add(s.key);
          const val = ta.value;
          const ok = val === cur.src || edit([{ start: cur.start, end: cur.end, text: val }], undefined, true);
          ta.setInvalid(!ok);
          hint.hidden = ok;
        };
        const hint = h('div', 'bv-hint', {}, 'Not valid code yet: the change is kept here and goes into the code once it reads.');
        hint.hidden = true;
        sentence.append(ta.el, hint);
      }
      head.append(tag, sentence);
      const label = s.kind === 'code' ? 'this code step' : s.path ?? s.calleeText ?? s.varName ?? 'this step';
      const acts = rowTools(s, siblings, index, mi, card);
      acts.classList.add('bv-acts');
      collapsible(li, head, s.key, label, [
        s.kind !== 'code' ? docLine(s.member, s.path ? `Not something Nucleus knows on ${s.path.slice(0, s.path.lastIndexOf('.'))}.` : '') : undefined,
        h('div', 'bv-probs'), acts, card]);
      li.addEventListener('keydown', (ev) => rowKeys(ev, s.key));
      return li;
    });
    el.style.setProperty('--depth', String(depth));
    if (s.kind !== 'if' && !el.querySelector(':scope > .bv-more')?.hasAttribute('hidden') !== isOpen(s.key)) setOpen(el, isOpen(s.key));
    if (s.kind === 'if') renderIf(el, s, siblings, index, depth);
    else {
      for (const v of [...(s.args ?? []), ...(s.value ? [s.value] : [])]) fillValue(el, v);
      if (s.kind === 'code') {
        const cf = codeFieldOf(el.querySelector('.bv-codeblock'));
        if (cf) {
          const ms = marksIn(s);
          if (ms) cf.setMarks(ms);
          if (!cf.hasFocus() && cf.value !== s.src) cf.value = s.src!;
        }
      }
      // The expand button's docs: the step's member.
      if (s.member && s.path) {
        const mi = memberInfo(s);
        if (mi) el.querySelectorAll(':scope > .bv-line .xf').forEach((w) => setGrowDoc(w, () => memberCard(mi.owner, mi.name, mi.m, { head: false })));
      }
      fillProbs(el.querySelector('.bv-probs')!, [s], s.key);
    }
    return el;
  }

  function rowKeys(ev: KeyboardEvent, key: string) {
    if (!ev.altKey || (ev.key !== 'ArrowUp' && ev.key !== 'ArrowDown')) return;
    const t = ev.target as HTMLElement;
    if (t.closest('[data-key]')?.getAttribute('data-key') !== key) return;
    ev.preventDefault();
    ev.stopPropagation();
    move(key, ev.key === 'ArrowUp' ? -1 : 1);
  }

  function renderIf(el: HTMLElement, s: Stmt, siblings: number, index: number, depth: number) {
    const list = el.querySelector<HTMLElement>(':scope > .bv-clauses')!;
    const kids: HTMLElement[] = [];
    s.clauses!.forEach((c, ci) => {
      const ck = ci ? `${s.key}~${ci}` : s.key;
      if (forcedCode.has(`${ck}:code`) && c.test.op !== 'code') {
        const t = c.test;
        c.test = { start: t.start, end: t.end, op: 'code', code: { key: `${ck}:code`, label: 'the condition', start: t.start, end: t.end, kind: 'code', src: text.slice(t.start, t.end) } };
      }
      conds.set(ck, c.test);
      const head = part(`if:${ck}`, `${condSig(c.test, ck)}|${ci}|${siblings}|${index}|${s.clauses!.length}`, () => buildCond(s, ci, ck, siblings, index));
      kids.push(head);
      for (const v of [c.test.left, c.test.right, c.test.code]) if (v) fillValue(head, v);
      fillProbs(head.querySelector('.bv-probs')!, [c.testParen], ck);
      kids.push(renderBranch(c.body, depth + 1, ci ? 'Then (otherwise if)' : 'Then'));
    });
    const elseKey = `${s.key}>else`;
    const elseHead = part(`else:${s.key}`, `${s.otherwise ? 1 : 0}|${s.clauses!.length}`, () => {
      const d = h('div', 'bv-clause bv-else');
      if (s.otherwise) {
        const lab = h('span', 'bv-kw', {}, 'Otherwise');
        const del = icon(`${elseKey}:del`, 'Remove the otherwise part', '×', 'bv-del');
        del.addEventListener('click', () => removeElse(s.key));
        d.append(lab, h('span', 'bv-tools', {}, ''));
        d.lastElementChild!.append(del);
      } else {
        const b1 = h('button', 'bv-link', { type: 'button', 'data-bv': `${s.key}:addelse`, id: idOf(`${s.key}:addelse`) }, '+ Otherwise');
        b1.addEventListener('click', () => addElse(s.key));
        const b2 = h('button', 'bv-link', { type: 'button', 'data-bv': `${s.key}:addelif`, id: idOf(`${s.key}:addelif`) }, '+ Otherwise if');
        b2.addEventListener('click', () => addElseIf(s.key));
        d.append(b1, b2);
      }
      return d;
    });
    kids.push(elseHead);
    if (s.otherwise) {
      kids.push(renderBranch(s.otherwise, depth + 1, 'Otherwise'));
      const more = part(`elif:${s.key}`, 'x', () => {
        const d = h('div', 'bv-clause bv-endif');
        const b2 = h('button', 'bv-link', { type: 'button', 'data-bv': `${s.key}:addelif`, id: idOf(`${s.key}:addelif`) }, '+ Otherwise if');
        b2.addEventListener('click', () => addElseIf(s.key));
        d.append(b2);
        return d;
      });
      kids.push(more);
    }
    place(list, kids);
  }

  function buildCond(s: Stmt, ci: number, ck: string, siblings: number, index: number): HTMLElement {
    const c = s.clauses![ci].test;
    const d = h('div', 'bv-clause bv-cond', { 'data-key': ck });
    const line = h('div', 'bv-line');
    line.append(h('span', 'bv-tag bv-tag-if', {}, ci ? 'Else if' : 'Condition'));
    const sentence = h('div', 'bv-sentence');
    sentence.append(h('span', 'bv-kw', {}, ci ? 'Otherwise, if' : 'If'));
    if (c.op === 'code') {
      sentence.append(valueEditor(c.code!, false));
    } else {
      sentence.append(valueEditor(c.left!));
      const sel = h('select', 'bv-select bv-op', { 'data-bv': `${ck}:op`, id: idOf(`${ck}:op`), 'aria-label': 'How to compare' });
      for (const [o, lab] of OP_LABEL) sel.append(h('option', '', { value: o }, lab));
      sel.value = c.op;
      sel.addEventListener('change', () => changeOp(ck, sel.value as Op));
      sentence.append(sel);
      if (c.right) sentence.append(valueEditor(c.right));
    }
    sentence.append(h('span', 'bv-kw', {}, 'then'));
    let tools: HTMLElement;
    if (ci === 0) tools = rowTools(s, siblings, index);
    else {
      tools = h('span', 'bv-tools');
      const code = h('button', 'bv-link', { type: 'button', 'data-bv': `${ck}:code`, id: idOf(`${ck}:code`) }, 'Edit in code');
      code.addEventListener('click', () => {
        const cur = conds.get(ck);
        if (cur) host.jumpTo(cur.start);
      });
      const del = icon(`${ck}:del`, 'Remove this otherwise-if part', '×', 'bv-del');
      del.addEventListener('click', () => removeClause(s.key, ci));
      tools.append(code, del);
    }
    line.append(sentence);
    tools.classList.add('bv-acts');
    collapsible(d, line, ck, ci ? 'this otherwise-if' : 'this condition', [h('div', 'bv-probs'), tools]);
    if (ci === 0) d.addEventListener('keydown', (ev) => rowKeys(ev, s.key));
    return d;
  }

  function renderBranch(b: Branch, depth: number, label: string): HTMLElement {
    branches.set(b.key, b);
    const wrapEl = part(`br:${b.key}`, label, () => {
      const w = h('div', 'bv-branch');
      const ol = h('ol', 'bv-list', { 'aria-label': `${label}: steps` });
      const add = h('button', 'bv-add', { type: 'button', 'data-bv': `${b.key}:add`, id: idOf(`${b.key}:add`), 'aria-expanded': 'false', 'aria-controls': idOf('palette') }, '+ Add a step');
      add.addEventListener('click', () => openPalette(b.key, add));
      w.append(ol, add);
      return w;
    });
    wrapEl.style.setProperty('--depth', String(depth));
    const ol = wrapEl.querySelector<HTMLElement>(':scope > ol')!;
    place(ol, b.stmts.map((s, i) => renderStmt(s, b.stmts.length, i, depth)));
    wrapEl.classList.toggle('bv-empty', !b.stmts.length);
    return wrapEl;
  }

  function renderCallback(cb: Callback): HTMLElement {
    const def = CALLBACKS.find((c) => c.path === cb.path)!;
    const sec = part(`cb:${cb.key}`, `${cb.body ? 1 : 0}`, () => {
      const s = h('section', 'bv-cb', { 'aria-labelledby': idOf(`${cb.key}:title`) });
      const head = h('div', 'bv-cb-head');
      const title = h('h3', 'bv-cb-title', { id: idOf(`${cb.key}:title`) });
      title.innerHTML = `<span class="bv-cb-plain">${esc(def.plain)}</span> <code class="bv-cb-path">${esc(cb.path)}</code>`;
      const tools = h('span', 'bv-tools');
      const card = h('div', 'bv-card', { id: idOf(`${cb.key}:card`) });
      card.hidden = true;
      if (cb.member) {
        const info = icon(`${cb.key}:info`, `About ${cb.path}`, 'i', 'bv-info');
        info.setAttribute('aria-expanded', 'false');
        info.setAttribute('aria-controls', card.id);
        info.addEventListener('click', () => {
          const open = card.hidden;
          if (open && !card.innerHTML) card.innerHTML = memberCard(cb.owner, cb.name, cb.member!);
          card.hidden = !open;
          info.setAttribute('aria-expanded', String(open));
        });
        tools.append(info);
      }
      const code = h('button', 'bv-link', { type: 'button', 'data-bv': `${cb.key}:code`, id: idOf(`${cb.key}:code`) }, 'Edit in code');
      code.addEventListener('click', () => {
        const cur = model.callbacks.find((x) => x.key === cb.key);
        if (cur) host.jumpTo(cur.stmt.start);
      });
      tools.append(code);
      head.append(title, tools);
      s.append(head, docLine(cb.member), card);
      if (!cb.body) s.append(h('p', 'bv-muted', {}, 'This callback is not written as a function here, so it can only be edited in the code.'));
      s.append(h('div', 'bv-cb-body'));
      return s;
    });
    const body = sec.querySelector<HTMLElement>(':scope > .bv-cb-body')!;
    place(body, cb.body ? [renderBranch(cb.body, 0, cb.path)] : []);
    return sec;
  }

  function fillProbs(box: HTMLElement, ranges: Range[], key: string) {
    const ds = currentDiags();
    if (!ds) return;
    const s = stmts.get(key);
    // A row's own problems: inside its range, but not inside a nested row's.
    const nested: Range[] = [];
    if (s?.kind === 'if') for (const c of s.clauses!) nested.push(...c.body.stmts);
    const mine = ds.filter((d) => ranges.some((r) => d.start >= r.start && d.start < Math.max(r.end, r.start + 1)) && !nested.some((r) => d.start >= r.start && d.start < r.end))
      .sort((a, b) => SEV_ORDER[a.severity] - SEV_ORDER[b.severity]);
    const row = box.closest('.bv-row, .bv-clause');
    row?.classList.toggle('bv-has-err', mine.some((d) => d.severity === 'error'));
    row?.classList.toggle('bv-has-warn', !mine.some((d) => d.severity === 'error') && mine.some((d) => d.severity === 'warning'));
    row?.classList.toggle('bv-has-prob', mine.some((d) => d.severity === 'error' || d.severity === 'warning'));
    const sig = mine.map((d) => `${d.severity}${d.message}${(d.fixes ?? []).map((f) => f.title).join()}`).join('\n');
    (box as any)._diags = mine;
    if ((box as any)._sig === sig) return;
    (box as any)._sig = sig;
    box.textContent = '';
    const sum = row?.querySelector<HTMLElement>(':scope > .bv-sum');
    if (sum) sum.textContent = '';
    const plainOf = (d: Diagnostic) => host.plain?.(d) ?? { title: firstSentence(d.message.replace(/`/g, '')), why: '' };
    const ordered = (d: Diagnostic) => [...(d.fixes ?? [])].sort((a, z) => Number(!!z.preferred) - Number(!!a.preferred));
    const fixBtn = (d: Diagnostic, di: number, f: Fix, main: boolean) => {
      const fi = (d.fixes ?? []).indexOf(f);
      const fid = `${key}:fix:${di}:${fi}${main ? ':main' : ''}`;
      const b = h('button', `btn bv-fix${main ? ' primary' : ''}`, { type: 'button', 'data-bv': fid, id: idOf(fid), title: f.title.replace(/`/g, '') });
      b.innerHTML = main && f.preferred ? 'Fix this' : inline(f.title);
      b.addEventListener('click', () => {
        const fix: Fix | undefined = (box as any)._diags?.[di]?.fixes?.[fi];
        if (!fix) return say('That fix is out of date; check again in a moment.');
        if (edit(fix.edits, `${key}:more`)) say(`Fixed: ${f.title.replace(/`/g, '')}`);
      });
      return b;
    };
    if (sum && mine.length) {
      const w = mine[0];
      const p = h('div', `bv-prob bv-sev-${w.severity}`);
      p.innerHTML = `<span class="bv-sev" aria-hidden="true"></span><span class="bv-msg"><span class="bv-sr">${SEV_LABEL[w.severity]}: </span>${esc(plainOf(w).title)}${mine.length > 1 ? ` <span class="bv-more-n">+${mine.length - 1} more</span>` : ''}</span>`;
      const main = ordered(w)[0];
      if (main) p.append(fixBtn(w, 0, main, true));
      sum.append(p);
    }
    mine.forEach((d, di) => {
      const p = h('div', `bv-prob bv-sev-${d.severity}`);
      const pl = plainOf(d);
      p.innerHTML = `<span class="bv-sev" aria-hidden="true"></span><span class="bv-msg"><span class="bv-sr">${SEV_LABEL[d.severity]}: </span><strong>${esc(pl.title)}</strong>${pl.why ? ` ${esc(pl.why)}` : ''}<span class="bv-tech">${inline(d.message)}</span></span>`;
      ordered(d).slice(0, 3).forEach((f, k) => { const b = fixBtn(d, di, f, false); if (k === 0 && f.preferred) b.classList.add('primary'); p.append(b); });
      box.append(p);
    });
  }

  // --- edits ---------------------------------------------------------------------------

  function changeOp(ck: string, to: Op) {
    const c = conds.get(ck);
    if (!c || c.op === to || c.op === 'code') return;
    const L = c.left!.src;
    const R = c.right?.src;
    const fid = `${ck}:op`;
    const isCmp = (o: Op) => !!OP_TEXT[o];
    if (isCmp(c.op) && isCmp(to) && c.opRange) {
      let op = OP_TEXT[to]!;
      if (c.written === '===' || c.written === '!==') op = to === 'eq' ? '===' : to === 'ne' ? '!==' : op;
      edit([{ ...c.opRange, text: op }], fid);
      return;
    }
    const other = R ?? defaultFor(c.left!.type);
    let t: string;
    if (isCmp(to)) t = `${c.op === 'true' || c.op === 'false' ? wrap(L) : L} ${OP_TEXT[to]} ${other}`;
    else if (to === 'has' || to === 'nothas') t = `${wrap(L)}.indexOf(${R ?? '""'}) ${to === 'has' ? '>= 0' : '< 0'}`;
    else if (to === 'true') t = L;
    else t = `!${wrap(L)}`;
    edit([{ start: c.start, end: c.end, text: t }], fid);
  }

  function siblingsOf(key: string): { b: Branch; i: number } | undefined {
    for (const b of branches.values()) {
      const i = b.stmts.findIndex((s) => s.key === key);
      if (i >= 0) return { b, i };
    }
    return undefined;
  }

  function move(key: string, dir: number) {
    const at = siblingsOf(key);
    if (!at) return;
    const j = at.i + dir;
    const a = at.b.stmts[at.i];
    const b = at.b.stmts[j];
    if (!b) return;
    const t = host.getText();
    // Statements alone on their lines move with their whole lines: the comment at the end and the comment lines
    // right above them go along. Otherwise just the statements swap.
    const lo = Math.min(a.start, b.start) === a.start ? a : b;
    const hi = lo === a ? b : a;
    const prevEnd = at.b.stmts[Math.min(at.i, j) - 1]?.end ?? (at.b.block ? at.b.block.start + 1 : 0);
    let ra: Range = lo;
    let rb: Range = hi;
    const ca = lineChunk(t, lo, prevEnd);
    const cb = lineChunk(t, hi, lo.end);
    if (ca && cb && ca.end < cb.start) [ra, rb] = [ca, cb];
    const ok = edit([{ ...ra, text: t.slice(rb.start, rb.end) }, { ...rb, text: t.slice(ra.start, ra.end) }]);
    if (ok) {
      const n = at.b.stmts.length;
      const btn = j === 0 || j === n - 1 ? (dir < 0 ? 'down' : 'up') : dir < 0 ? 'up' : 'down';
      focusTo(`${at.b.key}/${j}:${btn}`);
      say(`Moved to position ${j + 1} of ${n}.`);
    }
  }

  /** A statement's lines when it is alone on them, with the comment lines right above it (not before `floor`). */
  function lineChunk(t: string, s: Range, floor: number): Range | undefined {
    const ls = lineStartAt(t, s.start);
    const le = lineEndAt(t, s.end);
    if (!/^\s*$/.test(t.slice(ls, s.start)) || !/^\s*(\/\/.*|\/\*.*\*\/\s*)?$/.test(t.slice(s.end, le)) || ls < floor) return undefined;
    let start = ls;
    while (start > 0) {
      const prev = lineStartAt(t, start - 1);
      if (prev < floor || !/^\s*(\/\/.*|\/\*.*\*\/)\s*$/.test(t.slice(prev, start - 1))) break;
      start = prev;
    }
    return { start, end: le };
  }

  /** The range that removes statement `s` cleanly: its whole lines when it is alone on them. */
  function stmtCut(t: string, s: Range): Range {
    const ls = lineStartAt(t, s.start);
    const le = lineEndAt(t, s.end);
    const alone = /^\s*$/.test(t.slice(ls, s.start)) && /^\s*(\/\/.*)?$/.test(t.slice(s.end, le));
    if (!alone) {
      // `{ a(); b(); }`: take the space before it too.
      const sp = /[ \t]*$/.exec(t.slice(ls, s.start))![0].length;
      return { start: s.start - sp, end: s.end };
    }
    const r = { start: ls, end: le < t.length ? le + 1 : le };
    if (le >= t.length && ls > 0) r.start = ls - 1;
    return r;
  }

  function removeStmt(key: string) {
    const at = siblingsOf(key);
    if (!at) return;
    const s = at.b.stmts[at.i];
    const t = host.getText();
    const ed: TextEdit = at.b.single ? { ...at.b.single, text: '{}' } : { ...stmtCut(t, s), text: '' };
    if (edit([ed])) {
      say('Removed the step.');
      const n = at.b.stmts.length - 1;
      focusTo(n ? `${at.b.key}/${Math.min(at.i, n - 1)}:code` : `${at.b.key}:add`);
    }
  }

  function ifNodeOf(key: string): Stmt | undefined {
    const s = stmts.get(key);
    return s?.kind === 'if' ? s : undefined;
  }
  function addElse(key: string) {
    const s = ifNodeOf(key);
    if (!s || s.otherwise) return;
    const t = host.getText();
    const last = s.clauses![s.clauses!.length - 1].body;
    const end = (last.block ?? last.single)!.end;
    const ind = indentAt(t, s.start);
    if (edit([{ start: end, end, text: ` else {\n${ind}}` }], `${key}>else:add`)) say('Added an otherwise part.');
  }
  function addElseIf(key: string) {
    const s = ifNodeOf(key);
    if (!s) return;
    const t = host.getText();
    const last = s.clauses![s.clauses!.length - 1].body;
    const end = (last.block ?? last.single)!.end;
    const ind = indentAt(t, s.start);
    const ci = s.clauses!.length;
    if (edit([{ start: end, end, text: ` else if (Context.PlayerID == 1) {\n${ind}}` }], `${key}~${ci}:left:kind`)) say('Added an otherwise-if part.');
  }
  function removeElse(key: string) {
    const s = ifNodeOf(key);
    if (!s?.otherwise) return;
    const last = s.clauses![s.clauses!.length - 1].body;
    const from = (last.block ?? last.single)!.end;
    const to = (s.otherwise.block ?? s.otherwise.single)!.end;
    if (edit([{ start: from, end: to, text: '' }], `${key}:addelse`)) say('Removed the otherwise part.');
  }
  function removeClause(key: string, ci: number) {
    const s = ifNodeOf(key);
    if (!s || ci < 1) return;
    const prev = s.clauses![ci - 1].body;
    const from = (prev.block ?? prev.single)!.end;
    const cur = s.clauses![ci].body;
    const to = (cur.block ?? cur.single)!.end;
    if (edit([{ start: from, end: to, text: '' }], `${key}:code`)) say('Removed the otherwise-if part.');
  }

  /** Inserts a statement at the end of a branch. */
  function insertInto(b: Branch, snippet: string): TextEdit {
    const t = host.getText();
    const unit = indentUnit(t);
    if (b.single) {
      const s = b.single;
      let from = s.start;
      while (from > 0 && /\s/.test(t[from - 1])) from--;
      const ind = indentAt(t, from);
      const inner = ind + unit;
      return { start: from, end: s.end, text: ` {\n${inner}${t.slice(s.start, s.end)}\n${inner}${shape(snippet, inner, unit)}\n${ind}}` };
    }
    const blk = b.block!;
    const close = blk.end - 1;
    const outer = indentAt(t, blk.start);
    const last = b.stmts[b.stmts.length - 1];
    const ind = last && lineStartAt(t, last.start) > blk.start ? indentAt(t, last.start) : outer + unit;
    const cls = lineStartAt(t, close);
    if (cls > blk.start && /^\s*$/.test(t.slice(cls, close))) return { start: cls, end: cls, text: `${ind}${shape(snippet, ind, unit)}\n` };
    const inside = t.slice(blk.start + 1, close);
    if (/^\s*$/.test(inside)) return { start: blk.start + 1, end: close, text: `\n${ind}${shape(snippet, ind, unit)}\n${outer}` };
    // `{ a(); }` on one line: add after the last statement.
    const at = last ? last.end : blk.start + 1;
    return { start: at, end: at, text: ` ${snippet.replace(/\n\s*/g, ' ')}` };
  }

  function addAction(bkey: string, a: Action) {
    const b = branches.get(bkey);
    if (!b) return;
    const t = host.getText();
    const n = b.stmts.length;
    const newKey = b.single ? `${bkey}/1` : `${bkey}/${n}`;
    if (edit([insertInto(b, a.snippet(t))], undefined)) {
      closePalette(false);
      say(`Added ${a.title}.`);
      const s = stmts.get(newKey);
      const first = s?.kind === 'if' ? `${newKey}:left:kind` : s?.args?.length ? `${s.args[0].key}:v` : s?.value ? `${s.value.key}:v` : `${newKey}:code`;
      focusTo(first);
      root.querySelector(`[data-key="${CSS.escape(newKey)}"]`)?.scrollIntoView?.({ block: 'nearest' });
    }
  }

  function addCallback(path: string) {
    const t = host.getText();
    const sep = !t ? '' : t.endsWith('\n\n') ? '' : t.endsWith('\n') ? '\n' : '\n\n';
    const def = CALLBACKS.find((c) => c.path === path)!;
    if (edit([{ start: t.length, end: t.length, text: `${sep}${path} = function () {\n};\n` }])) {
      say(`Added ${path}.`);
      focusTo(`${def.name}:add`);
    }
  }

  // --- the action palette -------------------------------------------------------------------

  let paletteFor: string | undefined;
  /** Where a step picked in Lines goes: the branch whose "+ Add a step" was used last, else Game.Play. */
  let lastBranch: string | undefined;
  let paletteBtn: HTMLButtonElement | undefined;
  const search = h('input', 'bv-input bv-search', { type: 'search', id: idOf('search'), placeholder: 'What should happen? e.g. copy, start arguments, if', 'aria-controls': idOf('results'), autocomplete: 'off', spellcheck: 'false' });
  const results = h('div', 'bv-results', { id: idOf('results') });
  const pickCount = h('p', 'bv-muted bv-pick-count', { 'aria-live': 'polite' });
  {
    const top = h('div', 'bv-pick-top');
    const lab = h('label', 'bv-pick-label', { for: idOf('search') }, 'Add a step');
    const close = h('button', 'bv-icon', { type: 'button', 'aria-label': 'Close', title: 'Close' }, '×');
    close.addEventListener('click', () => closePalette(true));
    top.append(lab, close);
    palette.append(top, search, pickCount, results);
  }
  function renderPalette() {
    const q = search.value.trim().toLowerCase();
    const words = q.split(/\s+/).filter(Boolean);
    const hit = (a: Action) => {
      const hay = `${a.title} ${a.doc} ${a.group}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    };
    const groups = new Map<string, Action[]>();
    let count = 0;
    for (const a of actions()) {
      if (words.length && !hit(a)) continue;
      if (!groups.has(a.group)) groups.set(a.group, []);
      groups.get(a.group)!.push(a);
      count++;
    }
    results.textContent = '';
    const limit = q ? 40 : 8;
    for (const [g, as] of groups) {
      as.sort((a, b) => b.uses - a.uses || a.title.localeCompare(b.title));
      const sec = h('section', 'bv-pick-group');
      const hid = idOf(`pick:${g}`);
      sec.append(h('h4', '', { id: hid }, g));
      const ul = h('ul', '', { 'aria-labelledby': hid });
      for (const a of as.slice(0, limit)) {
        const li = h('li');
        const b = h('button', 'bv-pick', { type: 'button', 'data-action': a.id });
        b.innerHTML = `<span class="bv-pick-name">${a.path ? pathLabel(a.path) : esc(a.title)}</span>`
          + (a.uses && a.uses < 1e5 ? `<span class="bv-pick-meta">used by ${a.uses} of ${(USAGE as any).handlers} Hub handlers</span>` : '')
          + `<span class="bv-pick-doc">${inline(a.doc)}</span>`;
        b.addEventListener('click', () => paletteFor && addAction(paletteFor, a));
        li.append(b);
        ul.append(li);
      }
      if (as.length > limit) ul.append(h('li', 'bv-muted', {}, `${as.length - limit} more: type to narrow down.`));
      sec.append(ul);
      results.append(sec);
    }
    pickCount.textContent = count ? `${count} step${count > 1 ? 's' : ''}${q ? ' match' : ''}.` : 'Nothing matches.';
  }
  function openPalette(bkey: string, btn: HTMLButtonElement) {
    if (paletteFor === bkey && !palette.hidden) return closePalette(true);
    paletteBtn?.setAttribute('aria-expanded', 'false');
    paletteFor = bkey;
    lastBranch = bkey;
    paletteBtn = btn;
    btn.after(palette);
    palette.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    renderPalette();
    search.focus();
    search.select();
  }
  function closePalette(focusBack: boolean) {
    palette.hidden = true;
    paletteBtn?.setAttribute('aria-expanded', 'false');
    if (focusBack) paletteBtn?.focus();
    paletteFor = undefined;
  }
  search.addEventListener('input', renderPalette);
  const pickButtons = () => [...results.querySelectorAll<HTMLButtonElement>('button.bv-pick')];
  search.addEventListener('keydown', (ev) => {
    if (ev.key === 'ArrowDown') {
      ev.preventDefault();
      pickButtons()[0]?.focus();
    } else if (ev.key === 'Enter') {
      ev.preventDefault();
      pickButtons()[0]?.click();
    }
  });
  palette.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') {
      ev.preventDefault();
      ev.stopPropagation();
      closePalette(true);
      return;
    }
    if (ev.target instanceof HTMLButtonElement && ev.target.classList.contains('bv-pick') && (ev.key === 'ArrowDown' || ev.key === 'ArrowUp')) {
      ev.preventDefault();
      const bs = pickButtons();
      const i = bs.indexOf(ev.target) + (ev.key === 'ArrowDown' ? 1 : -1);
      if (i < 0) search.focus();
      else bs[Math.min(i, bs.length - 1)].focus();
    }
  });

  // --- refresh -----------------------------------------------------------------------------

  let focusTarget: string | undefined;
  function focusTo(fid: string) {
    focusTarget = fid;
    const el = root.querySelector<HTMLElement>(`[data-bv="${CSS.escape(fid)}"]`);
    if (el) {
      el.focus();
      focusTarget = undefined;
    }
  }

  function update() {
    text = host.getText();
    root.dataset.density = host.density?.() ?? 'compact';
    const active = document.activeElement as HTMLElement | null;
    const activeFid = active && root.contains(active) ? active.getAttribute('data-bv') : null;
    const sel = (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) && activeFid ? (() => { try { return [active.selectionStart, active.selectionEnd]; } catch { return null; } })() : null;
    const paletteOpen = !palette.hidden && palette.contains(active);

    model = read(text);
    if (model.error) {
      banner.hidden = false;
      banner.innerHTML = `<span class="bv-sev" aria-hidden="true"></span><span>The code can't be read right now (${esc(model.error.message)}), so the blocks are paused. Fix it in the Code view.</span>`;
      const b = h('button', 'btn', { type: 'button' }, 'Show in code');
      const pos = model.error.pos;
      b.addEventListener('click', () => host.jumpTo(pos));
      banner.append(b);
      sectionsEl.hidden = true;
      addCbs.hidden = true;
      elsewhere.hidden = true;
      return;
    }
    banner.hidden = true;
    sectionsEl.hidden = false;
    addCbs.hidden = false;

    vals.clear();
    conds.clear();
    stmts.clear();
    branches.clear();
    used = new Set();
    const order = (c: Callback) => CALLBACKS.findIndex((d) => d.path === c.path);
    const cbs = [...model.callbacks].sort((a, b) => order(a) - order(b) || a.stmt.start - b.stmt.start);
    place(sectionsEl, cbs.map(renderCallback));
    if (!cbs.length) {
      sectionsEl.append(h('p', 'bv-muted bv-none', {}, 'No callbacks yet. Game.Play runs for each player before their game starts: add it to change start arguments, copy files and more.'));
    }

    // Callbacks that aren't in the code.
    const missing = CALLBACKS.filter((d) => !model.callbacks.some((c) => c.path === d.path));
    const sig = missing.map((m) => m.path).join();
    if ((addCbs as any)._sig !== sig) {
      (addCbs as any)._sig = sig;
      const hadFocus = addCbs.contains(document.activeElement);
      const wasOpen = !!addCbs.querySelector('details')?.open;
      addCbs.textContent = '';
      const button = (d: (typeof CALLBACKS)[number], cls: string) => {
        const b = h('button', cls, { type: 'button', 'data-bv': `addcb:${d.path}`, id: idOf(`addcb:${d.path}`) });
        b.innerHTML = `<span class="bv-add-cb-path">+ ${esc(d.path)}</span><span class="bv-add-cb-plain">${esc(d.plain)}</span>`;
        b.addEventListener('click', () => addCallback(d.path));
        return b;
      };
      const play = missing.find((d) => d.path === 'Game.Play');
      if (play) addCbs.append(button(play, 'btn bv-add-cb bv-add-play'));
      const others = missing.filter((d) => d !== play);
      if (others.length) {
        const det = h('details', 'bv-more-cbs');
        det.open = wasOpen;
        det.append(h('summary', 'btn', {}, play ? 'Other callbacks' : '+ Add a callback'));
        const ul = h('ul', 'bv-cb-menu');
        for (const d of others) {
          const li = h('li');
          li.append(button(d, 'bv-pick bv-add-cb'));
          ul.append(li);
        }
        det.append(ul);
        addCbs.append(det);
      }
      if (hadFocus && !focusWant && !focusTarget) addCbs.querySelector<HTMLElement>('button, summary')?.focus();
    }

    // Problems outside the callbacks.
    const ds = currentDiags();
    if (ds) {
      const inCb = (d: Diagnostic) => model.callbacks.some((c) => d.start >= c.stmt.start && d.start < c.stmt.end);
      const rest = ds.filter((d) => !inCb(d) && (d.severity === 'error' || d.severity === 'warning'));
      elsewhere.hidden = !rest.length;
      elsewhere.textContent = '';
      if (rest.length) {
        const p = h('p', 'bv-muted');
        p.textContent = `${rest.length} problem${rest.length > 1 ? 's' : ''} outside the callbacks (the Form and Code views show ${rest.length > 1 ? 'them' : 'it'}).`;
        const b = h('button', 'bv-link', { type: 'button' }, 'Show in code');
        b.addEventListener('click', () => host.jumpTo(rest[0].start));
        p.append(' ', b);
        elsewhere.append(p);
      }
    }

    for (const k of [...parts.keys()]) if (!used.has(k)) parts.delete(k);
    for (const k of [...forcedCode]) if (!vals.has(k)) forcedCode.delete(k);
    if (!palette.hidden && paletteFor && !branches.has(paletteFor)) closePalette(false);
    else if (!palette.hidden && paletteFor) {
      const btn = root.querySelector<HTMLButtonElement>(`[data-bv="${CSS.escape(`${paletteFor}:add`)}"]`);
      if (btn && btn.nextElementSibling !== palette) btn.after(palette);
      if (btn) paletteBtn = btn;
    }

    // Focus: where an action asked for it, else back where it was if the refresh replaced the element.
    const want = focusTarget ?? focusWant ?? activeFid;
    if (want && !paletteOpen && document.activeElement?.getAttribute('data-bv') !== want) {
      const el = root.querySelector<HTMLElement>(`[data-bv="${CSS.escape(want)}"]`);
      if (el) {
        el.focus();
        if ((el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) && !codeFieldOf(el) && sel && want === activeFid) try { el.setSelectionRange(sel[0], sel[1]); } catch { /* not a text field */ }
      }
    }
    focusTarget = undefined;
    focusWant = undefined;
  }

  function refresh() {
    const t = host.getText();
    diagBase = host.diagnosticsText ? host.diagnosticsText() : t;
    diags = host.diagnostics();
    const i = log.findIndex((l) => l.before === diagBase);
    log = i >= 0 ? log.slice(i) : [];
    update();
  }

  refresh();
  // Lines (Ctrl+B) while Blocks shows: a callback is added (or shown), an action becomes a step in the branch used last
  // (else Game.Play); options belong in Form.
  const onPick = (e: Event) => {
    if (container.hidden || !container.contains(root)) return;
    const d = (e as CustomEvent<{ path: string; msg: string }>).detail;
    e.preventDefault();
    if (CALLBACKS.some((c) => c.path === d.path)) {
      if (model.callbacks.some((c) => c.path === d.path)) {
        const cb = model.callbacks.find((c) => c.path === d.path)!;
        root.querySelector(`[aria-labelledby="${CSS.escape(idOf(`${cb.key}:title`))}"]`)?.scrollIntoView?.({ block: 'start' });
        d.msg = `${d.path} is already here.`;
      } else {
        addCallback(d.path);
        d.msg = `Added ${d.path}.`;
      }
      return;
    }
    const a = actions().find((x) => x.path === d.path);
    if (a) {
      const play = model.callbacks.find((c) => c.path === 'Game.Play' && c.body) ?? model.callbacks.find((c) => c.body);
      const bkey = (lastBranch && branches.has(lastBranch) ? lastBranch : undefined) ?? play?.body?.key;
      if (!bkey) { d.msg = `Add Game.Play first (+ Add a callback), then pick ${d.path} again.`; return; }
      addAction(bkey, a);
      d.msg = `Added ${d.path} as a step.`;
      return;
    }
    d.msg = d.path.startsWith('Game.') ? `${d.path} is an option: add it in Form or Code.` : `${d.path} isn't a step on its own: pick it as a value (Property) in a step, or use Code.`;
  };
  document.addEventListener('lines-pick', onPick);

  return {
    refresh,
    destroy() {
      document.removeEventListener('lines-pick', onPick);
      root.remove();
      parts.clear();
    },
  };
}
