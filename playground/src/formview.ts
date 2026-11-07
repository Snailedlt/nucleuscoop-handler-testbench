// The Form view: a handler's top-level options (`Game.X = value;`, `Game.Hook.X`, `Game.ProtoInput.X`) as
// fields typed by the API model, two-way with the code (issue #7, step 1).
//
// The code is the only source of truth. The form reads the handler text on every refresh and writes back
// through minimal text edits: a value's own range, one inserted line, one removed statement. It never
// regenerates the file, so comments and formatting elsewhere stay as they are, and every edit is checked
// to still parse before it is handed to the host.
//
//   const form = mountFormView(el, { getText, applyEdits, jumpTo, diagnostics });
//   form.refresh();   // after the code changed (the host debounces)
//   form.destroy();
import { api, jintMemberName, type Member } from '@core/api';
import { parseLikeJint } from '@core/jsparse';
import type { Diagnostic, Fix, TextEdit } from '@core/lint';
import { allLines, matches, USAGE_TOTAL, type Line } from './lines';
import { memberCard } from './doccard';

export interface FormHost {
  /** The handler text, as it is now. */
  getText(): string;
  /** Apply edits in the coordinates of the current text. They never overlap and are sorted by start; apply
   *  them as one change (from the last to the first, or with CodeMirror's `operation`). Must be synchronous. */
  applyEdits(edits: TextEdit[]): void;
  /** Show this offset in the Code view. */
  jumpTo(offset: number): void;
  /** The linter's diagnostics. */
  diagnostics(): Diagnostic[];
  /** Optional: the text `diagnostics()` belongs to, when the linter runs asynchronously (a worker). Without it
   *  the diagnostics are taken to match `getText()` whenever the host calls `refresh()`. */
  diagnosticsText?(): string;
}
export interface FormView {
  refresh(): void;
  destroy(): void;
}

// ---------------------------------------------------------------------------
// Reading the handler

type Kind = 'bool' | 'enum' | 'number' | 'string' | 'list' | 'function' | 'code' | 'missing';
interface Range { start: number; end: number }
interface Item extends Range { value: string }
interface Entry {
  key: string;
  path: string; // canonical where the member is known, else as written
  ownerLabel: string; // Game, Game.Hook, Game.ProtoInput
  owner: string; // Game, GameHook, GameProtoInput
  name: string;
  member?: Member;
  kind: Kind;
  stmt: Range;
  value: Range;
  bool?: boolean;
  enumName?: string;
  enumValue?: string;
  num?: string;
  str?: string;
  quote?: string;
  items?: Item[];
  elem?: 'string' | 'number';
  multiline?: boolean;
  source?: string;
  topic: string;
}

const OWNERS: Record<string, string> = { Game: 'Game', 'Game.Hook': 'GameHook', 'Game.ProtoInput': 'GameProtoInput' };
const REQUIRED = ['Game.GUID', 'Game.GameName', 'Game.ExecutableName'];
const G_REQUIRED = 'Required';
const G_UNKNOWN = 'Not recognised';
const G_CODE = 'Code';

let lineIndex: Map<string, Line> | undefined;
function lineFor(path: string): Line | undefined {
  if (!lineIndex) {
    lineIndex = new Map();
    for (const l of allLines()) lineIndex.set(l.path, l);
  }
  return lineIndex.get(path);
}

/** `Game.X`, `Game.Hook.X`, `Game.ProtoInput.X` (Jint: the first letter of each name may differ in case). */
function optionOf(left: any): { ownerLabel: string; owner: string; name: string; member?: Member } | undefined {
  const parts: string[] = [];
  let x = left;
  while (x && x.type === 'MemberExpression') {
    if (x.computed || x.property.type !== 'Identifier') return undefined;
    parts.unshift(x.property.name);
    x = x.object;
  }
  if (!x || x.type !== 'Identifier' || x.name !== 'Game') return undefined;
  let owner = 'Game';
  let label = 'Game';
  if (parts.length === 2) {
    const sub = jintMemberName(api.objects.Game.members, parts[0]);
    if (sub === 'Hook') [owner, label] = ['GameHook', 'Game.Hook'];
    else if (sub === 'ProtoInput') [owner, label] = ['GameProtoInput', 'Game.ProtoInput'];
    else return undefined;
  } else if (parts.length !== 1) return undefined;
  const written = parts[parts.length - 1];
  const members = api.objects[owner]?.members ?? {};
  const name = jintMemberName(members, written);
  const member = name ? members[name] : undefined;
  if (member && member.kind === 'object') return undefined; // `Game.Hook = ...`
  return { ownerLabel: label, owner, name: name ?? written, member };
}

const isNum = (n: any) => (n.type === 'Literal' && typeof n.value === 'number') || (n.type === 'UnaryExpression' && n.operator === '-' && n.argument.type === 'Literal' && typeof n.argument.value === 'number');
const isStr = (n: any) => n.type === 'Literal' && typeof n.value === 'string';

function classify(e: Entry, v: any, text: string): void {
  const t = e.member?.type;
  e.source = text.slice(v.start, v.end);
  if (v.type === 'FunctionExpression' || t === 'function') {
    e.kind = 'function';
    return;
  }
  e.kind = 'code';
  if (!e.member) return;
  if (t === 'boolean' && v.type === 'Literal' && typeof v.value === 'boolean') [e.kind, e.bool] = ['bool', v.value];
  else if (t === 'number' && isNum(v)) [e.kind, e.num] = ['number', e.source];
  else if (t === 'string' && isStr(v)) [e.kind, e.str, e.quote] = ['string', v.value, e.source[0]];
  else if (t?.startsWith('enum:') && v.type === 'MemberExpression') {
    const en = t.slice(5);
    const vals = api.enums[en]?.values ?? {};
    const p: string[] = [];
    let x = v;
    while (x?.type === 'MemberExpression' && !x.computed) {
      p.unshift(x.property.name);
      x = x.object;
    }
    if (x?.type === 'Identifier' && x.name === 'Nucleus' && p.length === 2 && jintMemberName({ [en]: 1 }, p[0]) && jintMemberName(vals, p[1])) {
      [e.kind, e.enumName, e.enumValue] = ['enum', en, jintMemberName(vals, p[1])!];
    }
  } else if ((t === 'string[]' || t === 'number[]' || t === 'array') && v.type === 'ArrayExpression' && v.elements.every((x: any) => x)) {
    const els = v.elements as any[];
    const elem = t === 'number[]' || (t === 'array' && els.length && els.every(isNum)) ? 'number' : 'string';
    if (els.every(elem === 'number' ? isNum : isStr)) {
      e.kind = 'list';
      e.elem = elem;
      e.items = els.map((x) => ({ start: x.start, end: x.end, value: elem === 'number' ? text.slice(x.start, x.end) : x.value }));
      e.multiline = /\n/.test(text.slice(v.start, els.length ? els[0].start : v.end));
    }
  }
}

interface Model { entries: Entry[]; error?: { message: string; pos: number } }
function read(text: string): Model {
  let program: any;
  try {
    program = parseLikeJint(text, { ecmaVersion: 'latest', sourceType: 'script', allowReturnOutsideFunction: true }).program;
  } catch (err: any) {
    return { entries: [], error: { message: String(err?.message ?? err).replace(/\s*\(\d+:\d+\)$/, ''), pos: typeof err?.pos === 'number' ? err.pos : 0 } };
  }
  const entries: Entry[] = [];
  const seen = new Map<string, number>();
  for (const st of program.body) {
    if (st.type !== 'ExpressionStatement' || st.expression.type !== 'AssignmentExpression' || st.expression.operator !== '=') continue;
    const opt = optionOf(st.expression.left);
    if (!opt) continue;
    const path = `${opt.ownerLabel}.${opt.name}`;
    const n = seen.get(path) ?? 0;
    seen.set(path, n + 1);
    const v = st.expression.right;
    const e: Entry = { key: `${path}#${n}`, path, ...opt, kind: 'code', stmt: { start: st.start, end: st.end }, value: { start: v.start, end: v.end }, topic: '' };
    classify(e, v, text);
    e.topic = REQUIRED.includes(path) ? G_REQUIRED : !e.member ? G_UNKNOWN : e.kind === 'function' ? G_CODE : lineFor(path)?.topic ?? 'Other options';
    entries.push(e);
  }
  return { entries };
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
const NUM = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;

/** A sensible first value for a newly added option. */
function newValue(m: Member): string {
  const t = m.type ?? '';
  if (t === 'function') return 'function () {\n}';
  if (t === 'boolean') return m.default === 'true' ? 'false' : 'true';
  if (t.startsWith('enum:')) {
    const en = t.slice(5);
    const vals = Object.keys(api.enums[en]?.values ?? {});
    const d = m.default?.replace(/^(Nucleus\.)?\w+\./, '');
    return `Nucleus.${en}.${d && vals.includes(d) ? d : vals[0]}`;
  }
  if (t === 'number') return m.default && NUM.test(m.default) ? m.default : '0';
  if (t === 'string') return m.default && /^"[^"\\]*"$/.test(m.default) ? m.default : '""';
  return '[]';
}

// ---------------------------------------------------------------------------
// Keeping the diagnostics in step with the form's own edits

interface Logged { before: string; edits: TextEdit[] }
function mapThrough(r: Range, edits: TextEdit[]): Range | undefined {
  let ds = 0;
  let de = 0;
  for (const e of edits) {
    const delta = e.text.length - (e.end - e.start);
    if (e.start < r.end && e.end > r.start) return undefined; // overlaps: stale
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
  const t = s.replace(/\s+/g, ' ').trim();
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

let mounts = 0;

// ---------------------------------------------------------------------------

export function mountFormView(container: HTMLElement, host: FormHost): FormView {
  const uid = `fv${++mounts}-`;
  const idOf = (fid: string) => uid + fid.replace(/[^\w-]/g, '_');

  const root = h('div', 'fv');
  const bar = h('div', 'fv-bar');
  const addBtn = h('button', 'btn fv-add', { type: 'button', 'aria-expanded': 'false', 'aria-controls': idOf('picker') }, '+ Add an option');
  const status = h('div', 'fv-status', { role: 'status', 'aria-live': 'polite' });
  bar.append(addBtn, status);
  const picker = h('div', 'fv-picker', { id: idOf('picker') });
  picker.hidden = true;
  const banner = h('div', 'fv-banner', { role: 'alert' });
  banner.hidden = true;
  const elsewhere = h('div', 'fv-elsewhere');
  const groupsEl = h('div', 'fv-groups');
  root.append(bar, picker, banner, elsewhere, groupsEl);
  container.append(root);

  let model: Model = { entries: [] };
  let text = '';
  let diagBase = '';
  let diags: Diagnostic[] = [];
  let log: Logged[] = [];
  let pendingFocus: string | undefined;
  const rows = new Map<string, Row>();
  const sections = new Map<string, { el: HTMLElement; list: HTMLElement }>();

  const say = (msg: string) => {
    status.textContent = '';
    requestAnimationFrame(() => (status.textContent = msg));
  };

  /** Diagnostics for the current text: the host's, moved past the form's own edits since they were made. */
  function currentDiags(): Diagnostic[] | undefined {
    if (diagBase === text) return diags;
    const i = log.findIndex((l) => l.before === diagBase);
    if (i < 0) return undefined;
    let out = diags;
    for (const l of log.slice(i)) out = out.map((d) => mapDiag(d, l.edits)).filter((d): d is Diagnostic => !!d);
    return out;
  }

  function edit(edits: TextEdit[], focusKey?: string): boolean {
    const before = host.getText();
    if (before !== text) {
      // The code changed under the form (no refresh yet): read it again rather than edit stale offsets.
      update();
      say('The code changed; try again.');
      return false;
    }
    const after = applyTo(before, edits);
    try {
      parseLikeJint(after, { ecmaVersion: 'latest', sourceType: 'script', allowReturnOutsideFunction: true });
    } catch {
      say("That change would break the code, so it wasn't made.");
      return false;
    }
    host.applyEdits([...edits].sort((a, b) => a.start - b.start));
    log.push({ before, edits });
    if (log.length > 200) log = log.slice(-200);
    if (focusKey) pendingFocus = focusKey;
    update();
    return true;
  }

  // --- rows -----------------------------------------------------------------

  interface Row {
    el: HTMLElement;
    entry: Entry;
    sig: string; // control structure; rebuilt when it changes
    probSig: string;
    ctl: HTMLElement;
    probs: HTMLElement;
    doc: HTMLElement;
  }

  const ctlSig = (e: Entry) => `${e.kind}|${e.member ? 1 : 0}|${e.elem ?? ''}|${e.items?.length ?? ''}|${e.kind === 'code' || e.kind === 'function' ? e.source : ''}`;

  function makeRow(e: Entry): Row {
    const el = h('div', 'fv-row', { 'data-key': e.key });
    const head = h('div', 'fv-head');
    const labelId = idOf(`${e.key}:label`);
    const label = h('label', 'fv-label', { id: labelId, for: idOf(`${e.key}:value`) });
    label.innerHTML = `<span class="fv-owner">${esc(e.ownerLabel)}.</span><span class="fv-name">${esc(e.name)}</span>`;
    head.append(label);
    const tools = h('span', 'fv-tools');
    let card: HTMLElement | undefined;
    if (e.member) {
      const info = h('button', 'fv-icon fv-info', { type: 'button', 'aria-expanded': 'false', 'aria-controls': idOf(`${e.key}:card`), 'aria-label': `About ${e.path}`, title: 'Docs', 'data-fv': `${e.key}:info` }, 'i');
      info.id = idOf(`${e.key}:info`);
      card = h('div', 'fv-card', { id: idOf(`${e.key}:card`) });
      card.hidden = true;
      info.addEventListener('click', () => {
        const open = card!.hidden;
        if (open && !card!.innerHTML) card!.innerHTML = memberCard(e.owner, e.name, e.member!);
        card!.hidden = !open;
        info.setAttribute('aria-expanded', String(open));
      });
      tools.append(info);
    }
    if (e.kind !== 'missing') {
      const del = h('button', 'fv-icon fv-del', { type: 'button', 'aria-label': `Remove ${e.path} from the code`, title: 'Remove this line', 'data-fv': `${e.key}:del` }, '\u00d7');
      del.id = idOf(`${e.key}:del`);
      del.addEventListener('click', () => removeStatement(row.entry));
      tools.append(del);
    }
    head.append(tools);
    const doc = h('div', 'fv-doc', { id: idOf(`${e.key}:doc`) });
    const ctl = h('div', 'fv-ctl');
    const probs = h('div', 'fv-probs');
    el.append(head, doc, ctl, probs);
    if (card) el.append(card);
    const row: Row = { el, entry: e, sig: '', probSig: '', ctl, probs, doc };
    fillDoc(row);
    return row;
  }

  function fillDoc(row: Row) {
    const m = row.entry.member;
    if (!m) {
      row.doc.textContent = `Not an option Nucleus knows on ${row.entry.ownerLabel}.`;
      return;
    }
    const s = firstSentence(m.deprecated ? `Deprecated. ${m.deprecated}` : m.doc || '');
    row.doc.innerHTML = (m.docBy === 'claude' ? '<span class="ai-spark fv-ai" title="AI-written docs" aria-label="AI-written docs" role="img"></span> ' : '') + inline(s);
  }

  /** Builds the control for the row's current kind. */
  function buildCtl(row: Row) {
    const e = row.entry;
    const c = row.ctl;
    c.textContent = '';
    c.className = `fv-ctl fv-k-${e.kind}`;
    const label = row.el.querySelector('.fv-label');
    if (e.kind === 'list') label?.removeAttribute('for');
    else label?.setAttribute('for', idOf(`${e.key}:value`));
    const vid = idOf(`${e.key}:value`);
    const describedBy = idOf(`${e.key}:doc`);
    const m = e.member;
    const dflt = m?.default !== undefined && !/^new /.test(m.default) ? m.default : undefined;
    switch (e.kind) {
      case 'bool': {
        const wrap = h('span', 'fv-switch');
        const inp = h('input', '', { type: 'checkbox', role: 'switch', id: vid, 'data-fv': `${e.key}:value`, 'aria-describedby': describedBy });
        const state = h('span', 'fv-state', { 'aria-hidden': 'true' });
        inp.addEventListener('change', () => {
          const cur = row.entry;
          if (cur.kind === 'bool') edit([{ ...cur.value, text: String(inp.checked) }]);
        });
        wrap.append(inp, state);
        c.append(wrap);
        if (dflt) c.append(h('span', 'fv-default', {}, `Default ${dflt}`));
        break;
      }
      case 'enum': {
        const sel = h('select', 'fv-select', { id: vid, 'data-fv': `${e.key}:value`, 'aria-describedby': describedBy });
        const d = dflt?.replace(/^(Nucleus\.)?\w+\./, '');
        for (const [v, n] of Object.entries(api.enums[e.enumName!]?.values ?? {})) {
          const o = h('option', '', { value: v }, `${v} (${n})${v === d ? ', default' : ''}`);
          sel.append(o);
        }
        sel.addEventListener('change', () => {
          const cur = row.entry;
          if (cur.kind === 'enum') edit([{ ...cur.value, text: `Nucleus.${cur.enumName}.${sel.value}` }]);
        });
        c.append(sel);
        break;
      }
      case 'number': {
        const inp = h('input', 'fv-input fv-num', { type: 'number', step: 'any', id: vid, 'data-fv': `${e.key}:value`, 'aria-describedby': describedBy });
        inp.addEventListener('input', () => {
          const cur = row.entry;
          const v = inp.value.trim();
          const ok = NUM.test(v);
          inp.setAttribute('aria-invalid', String(!ok));
          if (ok && cur.kind === 'number' && v !== cur.num) edit([{ ...cur.value, text: v }]);
        });
        c.append(inp);
        if (dflt) c.append(h('span', 'fv-default', {}, `Default ${dflt}`));
        break;
      }
      case 'string': {
        const inp = h('input', 'fv-input', { type: 'text', id: vid, 'data-fv': `${e.key}:value`, 'aria-describedby': describedBy, spellcheck: 'false', autocomplete: 'off' });
        inp.addEventListener('input', () => {
          const cur = row.entry;
          if (cur.kind === 'string' && inp.value !== cur.str) edit([{ ...cur.value, text: strLit(inp.value, cur.quote) }]);
        });
        c.append(inp);
        break;
      }
      case 'list': {
        const group = h('div', 'fv-list', { role: 'group', 'aria-labelledby': idOf(`${e.key}:label`), id: vid, tabindex: '-1', 'data-fv': `${e.key}:value` });
        const ol = h('ol', 'fv-items');
        const n = e.items!.length;
        e.items!.forEach((_, i) => {
          const li = h('li', 'fv-item');
          const inp = h('input', 'fv-input', { type: e.elem === 'number' ? 'number' : 'text', step: 'any', 'aria-label': `${e.name}, entry ${i + 1} of ${n}`, 'data-fv': `${e.key}:item:${i}`, spellcheck: 'false', autocomplete: 'off' });
          inp.id = idOf(`${e.key}:item:${i}`);
          inp.addEventListener('input', () => {
            const cur = row.entry;
            const it = cur.items?.[i];
            if (cur.kind !== 'list' || !it) return;
            if (cur.elem === 'number') {
              const v = inp.value.trim();
              const ok = NUM.test(v);
              inp.setAttribute('aria-invalid', String(!ok));
              if (ok && v !== it.value) edit([{ start: it.start, end: it.end, text: v }]);
            } else if (inp.value !== it.value) edit([{ start: it.start, end: it.end, text: strLit(inp.value) }]);
          });
          const btn = (act: string, label: string, glyph: string, disabled: boolean, fn: () => void) => {
            const b = h('button', 'fv-icon', { type: 'button', 'aria-label': `${label} (entry ${i + 1})`, title: label, 'data-fv': `${e.key}:${act}:${i}` }, glyph);
            b.id = idOf(`${e.key}:${act}:${i}`);
            b.disabled = disabled;
            b.addEventListener('click', fn);
            return b;
          };
          li.append(
            inp,
            btn('up', 'Move up', '\u2191', i === 0, () => moveItem(row, i, -1)),
            btn('down', 'Move down', '\u2193', i === n - 1, () => moveItem(row, i, 1)),
            btn('rm', 'Remove entry', '\u00d7', false, () => removeItem(row, i)),
          );
          ol.append(li);
        });
        const add = h('button', 'btn fv-item-add', { type: 'button', 'data-fv': `${e.key}:add`, 'aria-label': `Add an entry to ${e.name}` }, '+ Add entry');
        add.id = idOf(`${e.key}:add`);
        add.addEventListener('click', () => addItem(row));
        group.append(ol, add);
        if (!n) group.prepend(h('p', 'fv-empty', {}, 'No entries.'));
        c.append(group);
        break;
      }
      case 'function':
      case 'code':
      case 'missing': {
        if (e.kind === 'missing') c.append(h('span', 'fv-muted', {}, 'Not set.'));
        else {
          const src = e.source ?? '';
          const short = e.kind === 'function' ? 'Code: edit in Code view' : src.length > 160 ? src.slice(0, 157) + '\u2026' : src;
          c.append(h(e.kind === 'function' ? 'span' : 'code', e.kind === 'function' ? 'fv-muted' : 'fv-src', {}, short));
        }
        const b = h('button', 'btn fv-jump', { type: 'button', id: vid, 'data-fv': `${e.key}:value`, 'aria-describedby': idOf(`${e.key}:label`) }, e.kind === 'missing' ? `Add ${e.name}` : e.kind === 'function' ? 'Edit in Code view' : 'Edit in code');
        b.addEventListener('click', () => {
          const cur = row.entry;
          if (cur.kind === 'missing') addOption(cur.path);
          else host.jumpTo(cur.kind === 'function' ? cur.stmt.start : cur.value.start);
        });
        c.append(b);
        break;
      }
    }
  }

  /** Puts the entry's values into the controls, except the one being typed in. */
  function fillCtl(row: Row) {
    const e = row.entry;
    const active = document.activeElement;
    const get = (fid: string) => row.ctl.querySelector<HTMLInputElement & HTMLSelectElement>(`[data-fv="${CSS.escape(fid)}"]`);
    const set = (el: (HTMLInputElement & HTMLSelectElement) | null, v: string) => {
      if (el && el !== active && el.value !== v) el.value = v;
    };
    if (e.kind === 'bool') {
      const inp = get(`${e.key}:value`);
      if (inp) {
        inp.checked = !!e.bool;
        (inp.nextElementSibling as HTMLElement).textContent = e.bool ? 'On' : 'Off';
      }
    } else if (e.kind === 'enum') set(get(`${e.key}:value`), e.enumValue!);
    else if (e.kind === 'number') set(get(`${e.key}:value`), e.num!);
    else if (e.kind === 'string') set(get(`${e.key}:value`), e.str!);
    else if (e.kind === 'list') e.items!.forEach((it, i) => set(get(`${e.key}:item:${i}`), it.value));
  }

  function fillProbs(row: Row, ds: Diagnostic[] | undefined) {
    const e = row.entry;
    if (!ds) return; // unknown for now: keep what is shown
    const mine = ds.filter((d) => d.start >= e.stmt.start && d.start < e.stmt.end).sort((a, b) => SEV_ORDER[a.severity] - SEV_ORDER[b.severity]);
    const sig = mine.map((d) => `${d.severity}${d.message}${(d.fixes ?? []).map((f) => f.title).join()}`).join('\n') + (e.kind === 'function' ? 'f' : '');
    row.el.classList.toggle('fv-has-err', mine.some((d) => d.severity === 'error'));
    row.el.classList.toggle('fv-has-warn', !mine.some((d) => d.severity === 'error') && mine.some((d) => d.severity === 'warning'));
    if (sig === row.probSig) {
      // Same problems, maybe moved: refresh the fixes' offsets.
      (row.probs as any)._diags = mine;
      return;
    }
    row.probSig = sig;
    (row.probs as any)._diags = mine;
    const hadFocus = row.probs.contains(document.activeElement);
    row.probs.textContent = '';
    if (e.kind === 'function') {
      if (mine.length) {
        const worst = mine[0].severity;
        const p = h('div', `fv-prob fv-sev-${worst}`);
        p.innerHTML = `<span class="fv-sev" aria-hidden="true"></span><span class="fv-msg"><span class="fv-sr">${SEV_LABEL[worst]}: </span>${mine.length} problem${mine.length > 1 ? 's' : ''} in this code. Open it in the Code view to fix ${mine.length > 1 ? 'them' : 'it'}.</span>`;
        row.probs.append(p);
      }
      return;
    }
    mine.forEach((d, di) => {
      const p = h('div', `fv-prob fv-sev-${d.severity}`);
      p.innerHTML = `<span class="fv-sev" aria-hidden="true"></span><span class="fv-msg"><span class="fv-sr">${SEV_LABEL[d.severity]}: </span>${inline(d.message)}</span>`;
      const fixes = d.fixes ?? [];
      const offer = fixes.filter((f) => f.preferred).length ? fixes.filter((f) => f.preferred) : fixes.slice(0, 2);
      if (offer.length) {
        const fx = h('span', 'fv-fixes');
        offer.forEach((f) => {
          const fi = fixes.indexOf(f);
          const b = h('button', 'btn fv-fix', { type: 'button', 'data-fv': `${e.key}:fix:${di}:${fi}` });
          b.id = idOf(`${e.key}:fix:${di}:${fi}`);
          b.innerHTML = inline(f.title);
          b.addEventListener('click', () => {
            const cur: Diagnostic | undefined = (row.probs as any)._diags?.[di];
            const fix = cur?.fixes?.[fi];
            if (!fix) return say('That fix is out of date; check again in a moment.');
            if (edit(fix.edits, row.entry.key)) say(`Fixed: ${f.title.replace(/`/g, '')}`);
          });
          fx.append(b);
        });
        p.append(fx);
      }
      row.probs.append(p);
    });
    if (hadFocus) pendingFocus = pendingFocus ?? row.entry.key;
  }

  // --- list edits --------------------------------------------------------------

  const itemLit = (e: Entry) => (e.elem === 'number' ? '0' : '""');
  function addItem(row: Row) {
    const e = row.entry;
    if (e.kind !== 'list') return;
    const items = e.items!;
    const t = host.getText();
    let ed: TextEdit;
    if (!items.length) {
      const inner = { start: e.value.start + 1, end: e.value.end - 1 };
      ed = /^\s*$/.test(t.slice(inner.start, inner.end)) ? { ...inner, text: itemLit(e) } : { start: inner.start, end: inner.start, text: itemLit(e) };
    } else {
      const last = items[items.length - 1];
      ed = { start: last.end, end: last.end, text: e.multiline ? `,\n${indentAt(t, last.start)}${itemLit(e)}` : `, ${itemLit(e)}` };
    }
    if (edit([ed])) {
      focusAfter(`${e.key}:item:${items.length}`);
      say(`Added entry ${items.length + 1} to ${e.name}.`);
    }
  }
  function removeItem(row: Row, i: number) {
    const e = row.entry;
    const items = e.items!;
    if (e.kind !== 'list' || !items[i]) return;
    let r: Range;
    if (items.length === 1) r = items[0];
    else if (i < items.length - 1) r = { start: items[i].start, end: items[i + 1].start };
    else r = { start: items[i - 1].end, end: items[i].end };
    if (edit([{ ...r, text: '' }])) {
      const n = items.length - 1;
      focusAfter(n ? `${e.key}:item:${Math.min(i, n - 1)}` : `${e.key}:add`);
      say(`Removed entry ${i + 1} from ${e.name}.`);
    }
  }
  function moveItem(row: Row, i: number, dir: number) {
    const e = row.entry;
    const items = e.items!;
    const j = i + dir;
    if (e.kind !== 'list' || !items[i] || !items[j]) return;
    const t = host.getText();
    const [a, b] = [items[i], items[j]];
    if (edit([{ start: a.start, end: a.end, text: t.slice(b.start, b.end) }, { start: b.start, end: b.end, text: t.slice(a.start, a.end) }])) {
      // Keep the focus on the same button of the moved entry, unless it is now disabled.
      const k = j === 0 || j === items.length - 1 ? (dir < 0 ? 'down' : 'up') : dir < 0 ? 'up' : 'down';
      focusAfter(`${e.key}:${k}:${j}`);
      say(`Moved entry to position ${j + 1}.`);
    }
  }
  let focusTarget: string | undefined;
  function focusAfter(fid: string) {
    focusTarget = fid;
    const el = root.querySelector<HTMLElement>(`[data-fv="${CSS.escape(fid)}"]`);
    if (el) {
      el.focus();
      focusTarget = undefined;
    }
  }

  // --- statements ---------------------------------------------------------------

  function removeStatement(e: Entry) {
    const t = host.getText();
    const ls = lineStartAt(t, e.stmt.start);
    const le = lineEndAt(t, e.stmt.end);
    const alone = /^\s*$/.test(t.slice(ls, e.stmt.start)) && /^\s*(\/\/.*)?$/.test(t.slice(e.stmt.end, le));
    const r = alone ? { start: ls, end: le < t.length ? le + 1 : le } : e.stmt;
    if (alone && le >= t.length && ls > 0) r.start = ls - 1; // last line: take the newline before it
    const idx = model.entries.indexOf(e);
    const next = model.entries[idx + 1] ?? model.entries[idx - 1];
    if (edit([{ ...r, text: '' }])) {
      say(`Removed ${e.path}.`);
      const key = next && next.path === e.path && next.key > e.key ? e.key : next?.key; // keys of later duplicates shift down
      if (key) focusAfter(`${key}:value`);
      else addBtn.focus();
    }
  }

  /** Where a new `Game.X = ...;` line goes: after the last top-level option of the same topic, else after the
   *  last plain option before the first callback, else before the first callback (and its comments), else at
   *  the end. */
  function insertLine(path: string, line: string): TextEdit {
    const t = host.getText();
    const topic = REQUIRED.includes(path) ? G_REQUIRED : lineFor(path)?.topic;
    const plain = model.entries.filter((e) => e.kind !== 'function');
    const firstFn = model.entries.find((e) => e.kind === 'function');
    const beforeFn = plain.filter((e) => !firstFn || e.stmt.start < firstFn.stmt.start);
    const same = plain.filter((e) => e.topic === topic);
    const after = same[same.length - 1] ?? beforeFn[beforeFn.length - 1];
    if (after) {
      const le = lineEndAt(t, after.stmt.end);
      return { start: le, end: le, text: `\n${indentAt(t, after.stmt.start)}${line}` };
    }
    if (firstFn) {
      let ls = lineStartAt(t, firstFn.stmt.start);
      while (ls > 0) {
        const prev = lineStartAt(t, ls - 1);
        if (!/^\s*\/\//.test(t.slice(prev, ls - 1))) break;
        ls = prev;
      }
      return { start: ls, end: ls, text: `${line}\n` };
    }
    return { start: t.length, end: t.length, text: `${t && !t.endsWith('\n') ? '\n' : ''}${line}\n` };
  }

  function addOption(path: string) {
    const info = optionIndex().get(path);
    if (!info) return;
    const v = newValue(info.member);
    const n = model.entries.filter((e) => e.path === path).length;
    const key = `${path}#${n}`;
    if (edit([insertLine(path, `${path} = ${v};`)], key)) {
      say(`Added ${path}.`);
      search.value = '';
      closePicker(false);
      if (info.member.type === 'function') {
        const e = model.entries.find((x) => x.key === key);
        if (e) host.jumpTo(e.value.start);
      }
    }
  }

  // --- the option picker -----------------------------------------------------------

  let optIdx: Map<string, { owner: string; name: string; member: Member; line?: Line }> | undefined;
  function optionIndex() {
    if (!optIdx) {
      optIdx = new Map();
      for (const [label, owner] of Object.entries(OWNERS)) {
        for (const [name, m] of Object.entries(api.objects[owner]?.members ?? {})) {
          if (m.kind === 'object' || m.kind === 'method' || m.readonly || m.internal) continue;
          const t = m.type ?? '';
          if (!(t === 'boolean' || t === 'number' || t === 'string' || t === 'function' || t === 'string[]' || t === 'number[]' || t.startsWith('enum:'))) continue;
          optIdx.set(`${label}.${name}`, { owner, name, member: m, line: lineFor(`${label}.${name}`) });
        }
      }
    }
    return optIdx;
  }

  const search = h('input', 'fv-input fv-search', { type: 'search', id: idOf('search'), placeholder: 'Name, words from the docs, or initials (km = KillMutex)', 'aria-controls': idOf('results'), autocomplete: 'off', spellcheck: 'false' });
  const results = h('div', 'fv-results', { id: idOf('results') });
  const pickCount = h('p', 'fv-muted fv-pick-count', { 'aria-live': 'polite' });
  {
    const top = h('div', 'fv-pick-top');
    const lab = h('label', 'fv-pick-label', { for: idOf('search') }, 'Find an option');
    const close = h('button', 'fv-icon', { type: 'button', 'aria-label': 'Close', title: 'Close' }, '\u00d7');
    close.addEventListener('click', () => closePicker(true));
    top.append(lab, close);
    picker.append(top, search, pickCount, results);
  }
  function renderPicker() {
    const q = search.value.trim().toLowerCase();
    const set = new Set(model.entries.map((e) => e.path));
    const groups = new Map<string, { path: string; m: Member; line?: Line }[]>();
    let count = 0;
    for (const [path, o] of optionIndex()) {
      if (set.has(path) || o.member.deprecated) continue;
      if (q && !(o.line ? matches(o.line, q) : path.toLowerCase().includes(q))) continue;
      const topic = o.member.type === 'function' ? G_CODE : o.line?.topic ?? 'Other options';
      if (!groups.has(topic)) groups.set(topic, []);
      groups.get(topic)!.push({ path, m: o.member, line: o.line });
      count++;
    }
    const used = (l?: Line) => l?.used ?? 0;
    const ordered = [...groups].map(([t, ls]) => [t, ls.sort((a, b) => used(b.line) - used(a.line) || a.path.localeCompare(b.path))] as const)
      .sort((a, b) => used(b[1][0].line) - used(a[1][0].line));
    results.textContent = '';
    for (const [topic, ls] of ordered) {
      const sec = h('section', 'fv-pick-group');
      const hid = idOf(`pick:${topic}`);
      sec.append(h('h4', '', { id: hid }, topic));
      const ul = h('ul', '', { 'aria-labelledby': hid });
      for (const { path, m, line } of ls.slice(0, q ? 50 : 30)) {
        const li = h('li');
        const b = h('button', 'fv-pick', { type: 'button', 'data-path': path });
        const t = m.type?.startsWith('enum:') ? m.type.slice(5) : m.type === 'boolean' ? 'bool' : m.type ?? '';
        const u = used(line);
        b.innerHTML = `<span class="fv-pick-name"><span class="fv-owner">${esc(path.slice(0, path.lastIndexOf('.') + 1))}</span>${esc(path.slice(path.lastIndexOf('.') + 1))}</span>`
          + `<span class="fv-pick-meta">${esc(t)}${u ? ` \u00b7 in ${u} of ${USAGE_TOTAL} Hub handlers` : ''}</span>`
          + `<span class="fv-pick-doc">${inline(firstSentence(m.doc || ''))}</span>`;
        b.addEventListener('click', () => addOption(path));
        li.append(b);
        ul.append(li);
      }
      if (ls.length > (q ? 50 : 30)) ul.append(h('li', 'fv-muted', {}, `${ls.length - (q ? 50 : 30)} more: type to narrow down.`));
      sec.append(ul);
      results.append(sec);
    }
    pickCount.textContent = count ? `${count} option${count > 1 ? 's' : ''} not set yet${q ? ' match' : ''}.` : 'No option matches.';
  }
  function openPicker() {
    picker.hidden = false;
    addBtn.setAttribute('aria-expanded', 'true');
    renderPicker();
    search.focus();
    search.select();
  }
  function closePicker(focusBack: boolean) {
    picker.hidden = true;
    addBtn.setAttribute('aria-expanded', 'false');
    if (focusBack) addBtn.focus();
  }
  addBtn.addEventListener('click', () => (picker.hidden ? openPicker() : closePicker(true)));
  search.addEventListener('input', renderPicker);
  const pickButtons = () => [...results.querySelectorAll<HTMLButtonElement>('button.fv-pick')];
  search.addEventListener('keydown', (ev) => {
    if (ev.key === 'ArrowDown') {
      ev.preventDefault();
      pickButtons()[0]?.focus();
    } else if (ev.key === 'Enter') {
      ev.preventDefault();
      pickButtons()[0]?.click();
    }
  });
  picker.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') {
      ev.preventDefault();
      closePicker(true);
      return;
    }
    if (ev.target instanceof HTMLButtonElement && ev.target.classList.contains('fv-pick') && (ev.key === 'ArrowDown' || ev.key === 'ArrowUp')) {
      ev.preventDefault();
      const bs = pickButtons();
      const i = bs.indexOf(ev.target) + (ev.key === 'ArrowDown' ? 1 : -1);
      if (i < 0) search.focus();
      else bs[Math.min(i, bs.length - 1)].focus();
    }
  });

  // --- refresh ---------------------------------------------------------------------

  function update() {
    text = host.getText();
    const active = document.activeElement as HTMLElement | null;
    const activeFid = active && root.contains(active) ? active.getAttribute('data-fv') : null;
    const sel = active instanceof HTMLInputElement && activeFid ? (() => { try { return [active.selectionStart, active.selectionEnd]; } catch { return null; } })() : null;

    model = read(text);
    const ds = currentDiags();
    if (model.error) {
      banner.hidden = false;
      banner.innerHTML = `<span class="fv-sev" aria-hidden="true"></span><span>The code can't be read right now (${esc(model.error.message)}), so the form is paused. Fix it in the Code view.</span>`;
      const b = h('button', 'btn', { type: 'button' }, 'Show in code');
      const pos = model.error.pos;
      b.addEventListener('click', () => host.jumpTo(pos));
      banner.append(b);
      groupsEl.hidden = true;
      elsewhere.hidden = true;
      addBtn.disabled = true;
      return;
    }
    banner.hidden = true;
    groupsEl.hidden = false;
    addBtn.disabled = false;

    // Required options that aren't set: placeholders on top.
    const entries = [...model.entries];
    for (const p of REQUIRED) {
      if (entries.some((e) => e.path === p)) continue;
      const name = p.slice(5);
      entries.push({ key: `missing:${p}`, path: p, ownerLabel: 'Game', owner: 'Game', name, member: api.objects.Game.members[name], kind: 'missing', stmt: { start: -1, end: -1 }, value: { start: -1, end: -1 }, topic: G_REQUIRED });
    }

    // Groups: Required, Not recognised, then topics in the order they first appear, callbacks last.
    const order: string[] = [];
    const byTopic = new Map<string, Entry[]>();
    for (const e of entries) {
      if (!byTopic.has(e.topic)) {
        byTopic.set(e.topic, []);
        order.push(e.topic);
      }
      byTopic.get(e.topic)!.push(e);
    }
    const rank = (t: string) => (t === G_REQUIRED ? 0 : t === G_UNKNOWN ? 1 : t === G_CODE ? 3 : 2);
    order.sort((a, b) => rank(a) - rank(b));
    const req = byTopic.get(G_REQUIRED);
    req?.sort((a, b) => REQUIRED.indexOf(a.path) - REQUIRED.indexOf(b.path) || a.key.localeCompare(b.key));

    const liveRows = new Set<string>();
    order.forEach((topic, gi) => {
      let sec = sections.get(topic);
      if (!sec) {
        const el = h('section', 'fv-group', { 'aria-labelledby': idOf(`g:${topic}`) });
        el.append(h('h3', 'fv-group-title', { id: idOf(`g:${topic}`) }, topic));
        const list = h('div', 'fv-rows');
        el.append(list);
        sec = { el, list };
        sections.set(topic, sec);
      }
      if (groupsEl.children[gi] !== sec.el) groupsEl.insertBefore(sec.el, groupsEl.children[gi] ?? null);
      byTopic.get(topic)!.forEach((e, ri) => {
        liveRows.add(e.key);
        let row = rows.get(e.key);
        if (row && (row.entry.member !== e.member || row.entry.name !== e.name)) {
          row.el.remove();
          row = undefined;
        }
        if (!row) {
          row = makeRow(e);
          rows.set(e.key, row);
        }
        row.entry = e;
        const sig = ctlSig(e);
        if (sig !== row.sig) {
          buildCtl(row);
          row.sig = sig;
        }
        fillCtl(row);
        fillProbs(row, ds);
        if (sec!.list.children[ri] !== row.el) sec!.list.insertBefore(row.el, sec!.list.children[ri] ?? null);
      });
      while (sec.list.children.length > byTopic.get(topic)!.length) sec.list.lastElementChild!.remove();
    });
    for (const [k, r] of rows) if (!liveRows.has(k)) {
      r.el.remove();
      rows.delete(k);
    }
    for (const [t, s] of sections) if (!byTopic.has(t)) {
      s.el.remove();
      sections.delete(t);
    }

    // Problems outside the options.
    if (ds) {
      const inRows = (d: Diagnostic) => model.entries.some((e) => d.start >= e.stmt.start && d.start < e.stmt.end);
      const rest = ds.filter((d) => !inRows(d) && d.rule !== 'missing-required' && (d.severity === 'error' || d.severity === 'warning'));
      elsewhere.hidden = !rest.length;
      elsewhere.textContent = '';
      if (rest.length) {
        elsewhere.append(h('h3', 'fv-group-title', {}, 'Elsewhere in the code'));
        for (const d of rest.slice(0, 6)) {
          const p = h('div', `fv-prob fv-sev-${d.severity}`);
          p.innerHTML = `<span class="fv-sev" aria-hidden="true"></span><span class="fv-msg"><span class="fv-sr">${SEV_LABEL[d.severity]}: </span>${inline(d.message)}</span>`;
          const b = h('button', 'btn fv-jump', { type: 'button' }, 'Show in code');
          b.addEventListener('click', () => host.jumpTo(d.start));
          p.append(b);
          elsewhere.append(p);
        }
        if (rest.length > 6) elsewhere.append(h('p', 'fv-muted', {}, `${rest.length - 6} more in the Code view.`));
      }
    }
    if (!picker.hidden) renderPicker();

    // Focus: where an action asked for it, else back where it was if the refresh moved it.
    const want = focusTarget ?? (pendingFocus ? `${pendingFocus}:value` : activeFid);
    if (pendingFocus && !focusTarget) {
      const r = rows.get(pendingFocus);
      const first = r?.ctl.querySelector<HTMLElement>('[data-fv]:not([disabled])');
      if (r && first) {
        first.focus();
        r.el.scrollIntoView?.({ block: 'nearest' });
      } else if (!root.contains(document.activeElement)) addBtn.focus();
    } else if (want && document.activeElement?.getAttribute('data-fv') !== want) {
      const el = root.querySelector<HTMLElement>(`[data-fv="${CSS.escape(want)}"]`);
      if (el) {
        el.focus();
        if (el instanceof HTMLInputElement && sel && want === activeFid) try { el.setSelectionRange(sel[0], sel[1]); } catch { /* number inputs */ }
      }
    }
    pendingFocus = undefined;
    focusTarget = undefined;
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
  return {
    refresh,
    destroy() {
      root.remove();
      rows.clear();
      sections.clear();
    },
  };
}
