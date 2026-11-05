// The "Lines" column beside the code: every name a handler can use, click to insert.
// Beyond a plain list (Pawno's), it knows the handler being edited:
// - names the handler already sets show their value; clicking one jumps to it (no duplicate lines);
// - names that only work inside Game.Play and other callbacks are dimmed outside them;
// - on an empty line an option inserts `Game.X = ;` and offers its values (enums, true/false);
//   a function inserts its parameter names, the first one selected;
// - grouped by object or by topic, A–Z or by how many Hub handlers use it, keyboard friendly.
import { allLines, KINDS, Kind, Line, matches, scanHandler, inCallback, Scan, USAGE_TOTAL } from './lines';

interface Deps {
  editor: any; // CodeMirror 5
  openReference: (path: string) => void;
}

const LINES_KEY = 'nucleus-workbench-lines';
const PREFS_KEY = 'nucleus-workbench-lines-prefs';
const $ = <T extends HTMLElement = HTMLElement>(sel: string) => document.querySelector(sel) as T;
const store = {
  get(k: string) {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set(k: string, v: string) {
    try {
      localStorage.setItem(k, v);
    } catch {}
  },
};

export function initLines({ editor, openReference }: Deps) {
  const LINES = allLines();
  const kinds = new Set<Kind>();
  const prefs = { group: 'object' as 'object' | 'topic', sort: 'az' as 'az' | 'used', deprecated: false };
  try {
    Object.assign(prefs, JSON.parse(store.get(PREFS_KEY) || '{}'));
  } catch {}
  const saved = store.get(LINES_KEY);
  let open = saved ? saved === '1' : window.matchMedia('(min-width: 1400px)').matches;
  let scan: Scan | undefined;
  let callback = false;
  let current: Line | undefined;

  // --- footer: what the focused / hovered name is
  const info = $('#lines-info');
  function showInfo(l: Line | undefined) {
    current = l;
    info.textContent = '';
    if (!l) {
      info.append(text('div', 'muted', 'Click a name to insert it at the cursor. Names already in the handler show their value; clicking one jumps to it.'));
      return;
    }
    info.append(text('code', '', l.sig));
    if (l.doc) info.append(text('div', '', l.doc));
    const facts: string[] = [];
    if (l.default !== undefined) facts.push(`Default: ${l.default}`);
    if (l.used) facts.push(`Used by ${l.used} of ${USAGE_TOTAL} Hub handlers`);
    if (l.scope === 'callback') facts.push('Only inside Game.Play and other callbacks');
    const u = scan?.uses.get(l.path);
    if (u?.assigned.length) facts.push(`Set on line ${u.assigned.map((a) => a.line + 1).join(', ')}`);
    if (facts.length) info.append(text('div', 'muted', facts.join(' · ')));
    const docs = document.createElement('button');
    docs.type = 'button';
    docs.className = 'link';
    docs.textContent = 'Full docs';
    docs.addEventListener('click', () => openReference(l.path.replace(/^new /, '')));
    info.append(docs);
  }
  function text(tag: string, cls: string, s: string) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    e.textContent = s;
    return e;
  }

  // --- the list
  const list = $('#lines-list');
  function metaFor(l: Line): { text: string; cls: string } {
    const u = scan?.uses.get(l.path);
    if (u?.assigned.length) {
      const v = u.assigned[u.assigned.length - 1].value ?? '';
      return { text: `${u.assigned.length > 1 ? `×${u.assigned.length} ` : '✓ '}${v.length > 18 ? v.slice(0, 17) + '…' : v}`, cls: u.assigned.length > 1 ? 'set twice' : 'set' };
    }
    if (u?.other.length) return { text: '✓ used', cls: 'set' };
    if (prefs.sort === 'used') return { text: l.used ? String(l.used) : '', cls: '' };
    const t = l.typeLabel + (l.default !== undefined && l.default.length < 12 ? ` · ${l.default}` : '');
    return { text: t, cls: '' };
  }
  function render() {
    const q = ($('#lines-q') as HTMLInputElement).value.trim().toLowerCase();
    const shown = LINES.filter((l) => (prefs.deprecated || !l.deprecated) && (!kinds.size || kinds.has(l.kind)) && matches(l, q));
    const groups = new Map<string, Line[]>();
    for (const l of shown) {
      const g = prefs.group === 'topic' ? l.topic : l.owner;
      if (!groups.has(g)) groups.set(g, []);
      groups.get(g)!.push(l);
    }
    const order = [...groups.keys()];
    if (prefs.group === 'topic') order.sort((a, b) => (a === 'Nucleus values' ? 1 : b === 'Nucleus values' ? -1 : a.localeCompare(b)));
    list.textContent = '';
    const frag = document.createDocumentFragment();
    for (const g of order) {
      const items = groups.get(g)!;
      const enumGroup = g.startsWith('Nucleus.');
      if (prefs.sort === 'used') items.sort((a, b) => b.used - a.used || a.text.localeCompare(b.text));
      else if (!enumGroup) items.sort((a, b) => a.text.localeCompare(b.text, 'en', { sensitivity: 'base' }));
      frag.append(text('div', 'grp', '// ' + g));
      for (const l of items) {
        const b = document.createElement('button');
        b.type = 'button';
        const off = l.scope === 'callback' && !callback;
        b.className = [l.deprecated ? 'dep' : '', off ? 'off' : ''].filter(Boolean).join(' ');
        b.title = off ? `${l.sig}\nOnly works inside Game.Play and other callbacks` : l.sig;
        const name = text('span', 'nm', l.text);
        const m = metaFor(l);
        b.append(name, text('span', 'meta ' + m.cls, m.text));
        b.addEventListener('mouseenter', () => showInfo(l));
        b.addEventListener('focus', () => showInfo(l));
        b.addEventListener('click', (e) => pick(l, e.altKey || e.shiftKey));
        frag.append(b);
      }
    }
    if (!shown.length) frag.append(text('div', 'none', 'Nothing matches.'));
    list.append(frag);
    $('#lines-count').textContent = `${shown.length} of ${LINES.length}`;
  }

  // --- inserting
  function pick(l: Line, forceInsert: boolean) {
    const u = scan?.uses.get(l.path);
    if (!forceInsert && u?.assigned.length) {
      // Already set: go there instead of adding a second line (the most common Hub warning).
      const line = u.assigned[u.assigned.length - 1].line;
      editor.focus();
      editor.setSelection({ line, ch: 0 }, { line, ch: editor.getLine(line).length });
      editor.scrollIntoView({ line, ch: 0 }, 80);
      flash(`Already set on line ${line + 1}. Shift+click inserts another.`);
      return;
    }
    editor.focus();
    const from = editor.getCursor('from');
    const lineText: string = editor.getLine(from.line);
    const emptyLine = !lineText.trim() && !editor.somethingSelected();
    const indent = emptyLine ? lineText : '';
    if (emptyLine && l.assignable) {
      editor.replaceRange(`${indent}${l.path} = ;`, { line: from.line, ch: 0 }, { line: from.line, ch: lineText.length });
      editor.setCursor({ line: from.line, ch: indent.length + l.path.length + 3 });
      if (l.values?.length) offerValues(l.values);
    } else if (l.method) {
      const call = `${l.path}(${l.params.join(', ')})${emptyLine ? ';' : ''}`;
      editor.replaceSelection(call);
      const start = { line: from.line, ch: from.ch + l.path.length + 1 };
      if (l.params.length) editor.setSelection(start, { line: from.line, ch: start.ch + l.params[0].length });
      else editor.setCursor({ line: from.line, ch: from.ch + call.length });
    } else {
      editor.replaceSelection(l.path);
    }
    if (window.matchMedia('(max-width: 860px)').matches) setOpen(false);
  }
  function offerValues(values: string[]) {
    editor.showHint({
      completeSingle: false,
      hint: (cm: any) => {
        const cur = cm.getCursor();
        return { list: values, from: cur, to: cur };
      },
    });
  }
  let flashTimer: number | undefined;
  function flash(msg: string) {
    const f = $('#lines-flash');
    f.textContent = msg;
    f.hidden = false;
    clearTimeout(flashTimer);
    flashTimer = window.setTimeout(() => (f.hidden = true), 3500);
  }

  // --- keyboard: arrows move, Enter inserts (Shift+Enter: insert even if set), Esc back to the code
  list.addEventListener('keydown', (e: KeyboardEvent) => {
    const items = [...list.querySelectorAll<HTMLButtonElement>('button')];
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    const go = (j: number) => items[Math.max(0, Math.min(items.length - 1, j))]?.focus();
    if (e.key === 'ArrowDown') go(i + 1);
    else if (e.key === 'ArrowUp') i <= 0 ? ($('#lines-q') as HTMLInputElement).focus() : go(i - 1);
    else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(items.length - 1);
    else if (e.key === 'PageDown') go(i + 15);
    else if (e.key === 'PageUp') go(i - 15);
    else if (e.key === 'Enter' && e.shiftKey && current) pick(current, true);
    else if (e.key === 'Escape') editor.focus();
    else return;
    e.preventDefault();
  });
  $('#lines-q').addEventListener('keydown', (e: KeyboardEvent) => {
    const first = list.querySelector<HTMLButtonElement>('button');
    if (e.key === 'ArrowDown' && first) {
      e.preventDefault();
      first.focus();
    } else if (e.key === 'Enter' && first) {
      e.preventDefault();
      first.click();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      editor.focus();
    }
  });

  // --- controls
  for (const [k, label] of KINDS) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', () => {
      kinds.has(k) ? kinds.delete(k) : kinds.add(k);
      b.setAttribute('aria-pressed', String(kinds.has(k)));
      render();
    });
    $('#lines-kinds').append(b);
  }
  const groupSel = $('#lines-group') as HTMLSelectElement;
  const sortSel = $('#lines-sort') as HTMLSelectElement;
  const depBox = $('#lines-dep') as HTMLInputElement;
  groupSel.value = prefs.group;
  sortSel.value = prefs.sort;
  depBox.checked = prefs.deprecated;
  const savePrefs = () => store.set(PREFS_KEY, JSON.stringify(prefs));
  groupSel.addEventListener('change', () => ((prefs.group = groupSel.value as any), savePrefs(), render()));
  sortSel.addEventListener('change', () => ((prefs.sort = sortSel.value as any), savePrefs(), render()));
  depBox.addEventListener('change', () => ((prefs.deprecated = depBox.checked), savePrefs(), render()));
  $('#lines-q').addEventListener('input', render);
  $('#lines-close').addEventListener('click', () => setOpen(false));
  $('#lines-toggle').addEventListener('click', () => setOpen(!open, !open));

  // --- follow the handler and the cursor
  let rescan: number | undefined;
  const update = () => {
    if (!open) return;
    const s = scanHandler(editor.getValue());
    if (s) scan = s; // keep the last good scan while the code doesn't parse
    const cb = scan ? inCallback(scan, editor.indexFromPos(editor.getCursor())) : false;
    callback = cb;
    render();
    if (current) showInfo(current);
  };
  editor.on('change', () => {
    clearTimeout(rescan);
    rescan = window.setTimeout(update, 300);
  });
  editor.on('cursorActivity', () => {
    if (!open || !scan) return;
    const cb = inCallback(scan, editor.indexFromPos(editor.getCursor()));
    if (cb !== callback) {
      callback = cb;
      render();
    }
  });

  function setOpen(o: boolean, focus = false) {
    open = o;
    $('#lines').hidden = !o;
    $('#lines-toggle').setAttribute('aria-pressed', String(o));
    store.set(LINES_KEY, o ? '1' : '0');
    editor.refresh();
    if (o) update();
    if (o && focus) ($('#lines-q') as HTMLInputElement).focus();
  }

  showInfo(undefined);
  setOpen(open);
  return { toggle: () => setOpen(!open, !open) };
}
