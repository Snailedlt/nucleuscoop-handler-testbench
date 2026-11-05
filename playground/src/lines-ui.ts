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
  const DEFAULTS = {
    group: 'tree' as 'object' | 'topic' | 'tree',
    sort: 'az' as 'az' | 'used',
    // Basic settings
    meta: true, // type and default beside each name
    marks: true, // mark names already in the handler, with their value
    jump: true, // clicking a name that's already set jumps to it
    dim: true, // dim names that don't work where the cursor is
    wholeLine: true, // on an empty line, insert `Game.X = ;`
    values: true, // then suggest its values
    // Advanced settings
    deprecated: false, // show deprecated names
    kinds: true, // type filter buttons
    controls: true, // group and sort controls
    usage: true, // how many Hub handlers use each name
    params: true, // functions insert their parameter names
    shorthand: true, // "kmd" finds KillMutexDelay
    info: true, // details of the hovered name at the bottom
    wide: false, // a wider column
    tree: true, // "as a tree" in Group
  };
  type Prefs = typeof DEFAULTS;
  const prefs: Prefs = { ...DEFAULTS };
  try {
    Object.assign(prefs, JSON.parse(store.get(PREFS_KEY) || '{}'));
  } catch {}
  const saved = store.get(LINES_KEY);
  // Phones always start with the list closed (it's a sheet over the code there).
  let open = window.matchMedia('(max-width: 860px)').matches ? false : saved ? saved === '1' : window.matchMedia('(min-width: 1680px)').matches;
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
    if (l.used && prefs.usage) facts.push(`Used by ${l.used} of ${l.of} Hub handlers`);
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
  /** The docs of one name, shown under its row by the (i) button. */
  function details(l: Line): HTMLElement {
    const d = text('div', 'ln-doc', '');
    d.append(text('code', '', l.sig));
    if (l.doc) d.append(text('div', '', l.doc));
    const facts: string[] = [];
    if (l.default !== undefined) facts.push(`Default: ${l.default}`);
    if (l.used && prefs.usage) facts.push(`Used by ${l.used} of ${l.of} Hub handlers`);
    if (l.scope === 'callback') facts.push('Only inside Game.Play and other callbacks');
    const u = scan?.uses.get(l.path);
    if (u?.assigned.length) facts.push(`Set on line ${u.assigned.map((a) => a.line + 1).join(', ')}`);
    if (facts.length) d.append(text('div', 'muted', facts.join(' · ')));
    const actions = text('div', 'ln-doc-actions', '');
    const ins = document.createElement('button');
    ins.type = 'button';
    ins.className = 'btn';
    ins.textContent = u?.assigned.length && prefs.jump ? 'Go to it' : 'Insert';
    ins.addEventListener('click', () => pick(l, false));
    const docs = document.createElement('button');
    docs.type = 'button';
    docs.className = 'link';
    docs.textContent = 'Full docs';
    docs.addEventListener('click', () => openReference(l.path.replace(/^new /, '')));
    actions.append(ins, docs);
    d.append(actions);
    return d;
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
    const u = prefs.marks ? scan?.uses.get(l.path) : undefined;
    if (u?.assigned.length) {
      const v = u.assigned[u.assigned.length - 1].value ?? '';
      return { text: `${u.assigned.length > 1 ? `×${u.assigned.length} ` : '✓ '}${v.length > 18 ? v.slice(0, 17) + '…' : v}`, cls: u.assigned.length > 1 ? 'set twice' : 'set' };
    }
    if (u?.other.length) return { text: '✓ used', cls: 'set' };
    if (prefs.sort === 'used' && prefs.usage) return { text: l.used ? String(l.used) : '', cls: '' };
    if (!prefs.meta) return { text: '', cls: '' };
    const t = l.typeLabel + (l.default !== undefined && l.default.length < 12 ? ` · ${l.default}` : '');
    return { text: t, cls: '' };
  }
  // Tree (a list setting, off by default): Game, Context, System… one level at a time, like a file browser.
  // Typing a filter searches everything, as a flat list.
  let treePath: string[] = [];
  const treeOn = () => prefs.tree;
  const ROOT_ORDER = ['Game', 'Context', 'Player', 'ProtoInput', 'System', 'Nucleus'];
  const segs = (l: Line) => l.path.replace(/^new /, '').split('.');
  /** The folders and names directly under `path`. */
  function levelAt(shown: Line[], path: string[]) {
    const depth = path.length;
    const here = path.join('.');
    const nodes = new Map<string, number>();
    const leaves: Line[] = [];
    for (const l of shown) {
      const sg = segs(l);
      if (depth && sg.slice(0, depth).join('.') !== here) continue;
      if (sg.length === depth + 1) leaves.push(l);
      else if (sg.length > depth + 1) nodes.set(sg[depth], (nodes.get(sg[depth]) ?? 0) + 1);
    }
    const rank = (n: string) => (depth ? 0 : ROOT_ORDER.includes(n) ? ROOT_ORDER.indexOf(n) : ROOT_ORDER.length);
    const names = [...nodes.keys()].sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
    if (prefs.sort === 'used' && prefs.usage) leaves.sort((a, b) => (b.of ? b.used / b.of : 0) - (a.of ? a.used / a.of : 0) || a.text.localeCompare(b.text));
    else leaves.sort((a, b) => a.text.localeCompare(b.text, 'en', { sensitivity: 'base' }));
    return { names, counts: nodes, leaves };
  }
  function nodeRow(path: string[], n: string, count: number, current = false) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'ln ln-node';
    b.title = `${[...path, n].join('.')}: ${count} names`;
    if (current) b.setAttribute('aria-current', 'true');
    b.append(text('span', 'nm', n), text('span', 'meta', `${count} ›`));
    b.addEventListener('click', () => {
      treePath = [...path, n];
      render();
      (list.querySelector(current ? `.ln-node[aria-current]` : '.ln-col:last-child .ln, .ln') as HTMLElement | null)?.focus();
    });
    const row = document.createElement('div');
    row.className = 'ln-row';
    row.append(b);
    return row;
  }
  // Wide enough (the Wider column setting, or the list dragged wider): two columns, like a file
  // browser: the level above on the left (where you are highlighted), what's in it on the right.
  const TWO_COLUMNS = 460;
  function renderTree(shown: Line[]) {
    const depth = treePath.length;
    const cur = levelAt(shown, treePath);
    list.textContent = '';
    const frag = document.createDocumentFragment();
    const crumbs = document.createElement('nav');
    crumbs.className = 'ln-crumbs';
    crumbs.setAttribute('aria-label', 'Where you are in the tree');
    ['All', ...treePath].forEach((name, i) => {
      if (i) crumbs.append(text('span', 'sep', '›'));
      const c = document.createElement('button');
      c.type = 'button';
      c.className = 'link';
      c.textContent = name;
      if (i === depth) c.setAttribute('aria-current', 'location');
      c.addEventListener('click', () => ((treePath = treePath.slice(0, i)), render()));
      crumbs.append(c);
    });
    frag.append(crumbs);
    const here = document.createDocumentFragment();
    for (const n of cur.names) here.append(nodeRow(treePath, n, cur.counts.get(n)!));
    for (const l of cur.leaves) here.append(rowFor(l, segs(l).pop()! + (l.method ? '()' : '')));
    if (!cur.names.length && !cur.leaves.length) here.append(text('div', 'none', 'Nothing here.'));
    twoColumns = depth > 0 && list.clientWidth >= TWO_COLUMNS;
    if (twoColumns) {
      const parent = treePath.slice(0, -1);
      const up = levelAt(shown, parent);
      const cols = document.createElement('div');
      cols.className = 'ln-cols';
      const left = document.createElement('div');
      left.className = 'ln-col';
      left.setAttribute('aria-label', parent.length ? parent.join('.') : 'All');
      for (const n of up.names) left.append(nodeRow(parent, n, up.counts.get(n)!, n === treePath[depth - 1]));
      const right = document.createElement('div');
      right.className = 'ln-col';
      right.setAttribute('aria-label', treePath.join('.'));
      right.append(here);
      cols.append(left, right);
      frag.append(cols);
    } else frag.append(here);
    list.append(frag);
    $('#lines-count').textContent = `${cur.names.length + cur.leaves.length} here`;
  }
  // Switch between one and two columns when the list is resized.
  let twoColumns = false;
  new ResizeObserver(() => {
    if (prefs.group !== 'tree' || !treeOn() || !treePath.length) return;
    if ((list.clientWidth >= TWO_COLUMNS) !== twoColumns) render();
  }).observe(list);

  function render() {
    const q = ($('#lines-q') as HTMLInputElement).value.trim().toLowerCase();
    const base = LINES.filter((l) => (prefs.deprecated || !l.deprecated) && (!kinds.size || kinds.has(l.kind)));
    if (prefs.group === 'tree' && treeOn() && !q) return renderTree(base);
    const shown = base.filter((l) => matches(l, q, prefs.shorthand));
    const groups = new Map<string, Line[]>();
    for (const l of shown) {
      const g = prefs.group === 'topic' ? l.topic : l.owner; // a tree outside Advanced mode: by object
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
      if (prefs.sort === 'used' && prefs.usage) items.sort((a, b) => (b.of ? b.used / b.of : 0) - (a.of ? a.used / a.of : 0) || a.text.localeCompare(b.text));
      else if (!enumGroup) items.sort((a, b) => a.text.localeCompare(b.text, 'en', { sensitivity: 'base' }));
      frag.append(text('div', 'grp', '// ' + g));
      for (const l of items) frag.append(rowFor(l));
    }
    if (!shown.length) frag.append(text('div', 'none', 'Nothing matches.'));
    list.append(frag);
    $('#lines-count').textContent = `${shown.length} of ${LINES.length}`;
  }

  function rowFor(l: Line, label = l.text): HTMLElement {
        const b = document.createElement('button');
        b.type = 'button';
        const off = prefs.dim && l.scope === 'callback' && !callback;
        b.className = [l.deprecated ? 'dep' : '', off ? 'off' : ''].filter(Boolean).join(' ');
        b.title = off ? `${l.sig}\nOnly works inside Game.Play and other callbacks` : l.sig;
        const name = text('span', 'nm', label);
        const m = metaFor(l);
        b.append(name, text('span', 'meta ' + m.cls, m.text));
        b.classList.add('ln');
        b.addEventListener('mouseenter', () => showInfo(l));
        b.addEventListener('focus', () => showInfo(l));
        b.addEventListener('click', (e) => pick(l, e.altKey || e.shiftKey));
        // (i): the docs right under the row, for touch screens (no hover) and anyone who wants more.
        const i = document.createElement('button');
        i.type = 'button';
        i.className = 'ln-info';
        i.textContent = 'i';
        i.title = `About ${l.text}`;
        i.setAttribute('aria-label', `About ${l.text}`);
        i.setAttribute('aria-expanded', 'false');
        const row = document.createElement('div');
        row.className = 'ln-row';
        row.append(b, i);
        i.addEventListener('click', () => {
          const open = row.nextElementSibling?.classList.contains('ln-doc');
          list.querySelectorAll('.ln-doc').forEach((d) => d.remove());
          list.querySelectorAll('.ln-info[aria-expanded=true]').forEach((x) => x.setAttribute('aria-expanded', 'false'));
          if (open) return;
          i.setAttribute('aria-expanded', 'true');
          row.after(details(l));
          showInfo(l);
        });
        return row;
  }

  // --- inserting
  function pick(l: Line, forceInsert: boolean) {
    const u = scan?.uses.get(l.path);
    if (!forceInsert && prefs.jump && u?.assigned.length) {
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
    if (emptyLine && l.assignable && prefs.wholeLine && l.kind === 'function') {
      // Game.Play, Game.OnStop, Game.ProtoInput.OnInputLocked…: a function, with the cursor inside.
      const body = indent + '  ';
      editor.replaceRange(`${indent}${l.path} = function () {\n${body}\n${indent}};`, { line: from.line, ch: 0 }, { line: from.line, ch: lineText.length });
      editor.setCursor({ line: from.line + 1, ch: body.length });
    } else if (emptyLine && l.assignable && prefs.wholeLine) {
      editor.replaceRange(`${indent}${l.path} = ;`, { line: from.line, ch: 0 }, { line: from.line, ch: lineText.length });
      editor.setCursor({ line: from.line, ch: indent.length + l.path.length + 3 });
      if (l.values?.length && prefs.values) offerValues(l.values);
    } else if (l.method) {
      const params = prefs.params ? l.params : [];
      const call = `${l.path}(${params.join(', ')})${emptyLine ? ';' : ''}`;
      editor.replaceSelection(call);
      const start = { line: from.line, ch: from.ch + l.path.length + 1 };
      if (!prefs.params && l.params.length) editor.setCursor(start);
      else if (params.length) editor.setSelection(start, { line: from.line, ch: start.ch + l.params[0].length });
      else editor.setCursor({ line: from.line, ch: from.ch + call.length });
    } else {
      editor.replaceSelection(l.path);
    }
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
    const items = [...list.querySelectorAll<HTMLButtonElement>('button.ln')];
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
    const first = list.querySelector<HTMLButtonElement>('button.ln');
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
  // "as a tree" is in Group only with the Tree setting on (added and removed, since some phones ignore hidden options).
  const treeOpt = groupSel.querySelector('option[value=tree]') as HTMLOptionElement;
  const syncTreeOption = () => {
    if (treeOn()) {
      if (!treeOpt.parentElement) groupSel.append(treeOpt);
    } else treeOpt.remove();
    groupSel.value = prefs.group === 'tree' && !treeOn() ? 'object' : prefs.group;
  };
  syncTreeOption();
  sortSel.value = prefs.sort;
  const savePrefs = () => store.set(PREFS_KEY, JSON.stringify(prefs));
  groupSel.addEventListener('change', () => ((prefs.group = groupSel.value as any), savePrefs(), render()));
  sortSel.addEventListener('change', () => ((prefs.sort = sortSel.value as any), savePrefs(), render()));

  // --- settings (the gear): what the list shows and does. Niche ones under Advanced.
  const SETTINGS: { key: keyof Prefs; label: string; hint?: string; advanced?: boolean; /** Not on phones, where the list is full width. */ wideOnly?: boolean }[] = [
    { key: 'meta', label: 'Show type and default', hint: 'Beside each name, e.g. bool · false' },
    { key: 'marks', label: 'Mark names the handler already uses', hint: '✓ and the value it is set to' },
    { key: 'jump', label: 'Jump to names that are already set', hint: 'Instead of adding a second line. Shift+click still inserts.' },
    { key: 'dim', label: 'Dim names that don’t work at the cursor', hint: 'Context and Player only work inside Game.Play and other callbacks' },
    { key: 'wholeLine', label: 'Insert whole lines', hint: 'On an empty line an option becomes Game.X = ;' },
    { key: 'values', label: 'Suggest values after inserting', hint: 'Enum values, true / false' },
    { key: 'deprecated', label: 'Show deprecated names', advanced: true },
    { key: 'kinds', label: 'Type filter buttons', hint: 'bool, number, string…', advanced: true },
    { key: 'controls', label: 'Group and sort controls', advanced: true },
    { key: 'usage', label: 'Hub usage counts', hint: `How many of the ${USAGE_TOTAL} Hub handlers use each name`, advanced: true },
    { key: 'params', label: 'Insert parameter names for functions', advanced: true },
    { key: 'shorthand', label: 'Shorthand filter', hint: '"kmd" finds KillMutexDelay', advanced: true },
    { key: 'info', label: 'Details of the hovered name', hint: 'Signature and docs at the bottom of the list', advanced: true },
    { key: 'tree', label: 'Tree grouping', hint: 'Adds "as a tree" to Group: browse Game, Context, System… one level at a time', advanced: true },
    { key: 'wide', label: 'Wider column', hint: '520 px instead of 310: room for long names and values, and two columns in the tree. You can also drag the left edge of the list.', advanced: true, wideOnly: true },
  ];
  const panel = $('#lines-settings');
  const gear = $('#lines-gear');
  function buildSettings() {
    panel.textContent = '';
    panel.append(text('h3', '', 'The list'));
    const row = (s: (typeof SETTINGS)[number]) => {
      const lab = document.createElement('label');
      lab.className = s.wideOnly ? 'set-row wide-only' : 'set-row';
      const box = document.createElement('input');
      box.type = 'checkbox';
      box.id = `lines-set-${s.key}`;
      box.checked = !!prefs[s.key];
      box.addEventListener('change', () => {
        (prefs as any)[s.key] = box.checked;
        savePrefs();
        apply();
      });
      const t = text('span', '', s.label);
      if (s.hint) t.append(text('small', '', s.hint));
      lab.append(box, t);
      return lab;
    };
    SETTINGS.filter((s) => !s.advanced).forEach((s) => panel.append(row(s)));
    const adv = document.createElement('details');
    adv.append(text('summary', '', 'More list settings'));
    SETTINGS.filter((s) => s.advanced).forEach((s) => adv.append(row(s)));
    panel.append(adv);
    const reset = document.createElement('button');
    reset.type = 'button';
    reset.className = 'link';
    reset.textContent = 'Reset to defaults';
    reset.addEventListener('click', () => {
      Object.assign(prefs, DEFAULTS);
      savePrefs();
      syncTreeOption();
      sortSel.value = prefs.sort;
      buildSettings();
      apply();
    });
    panel.append(reset);
  }
  // The ⚙️ opens the one Settings window, on its Lines tab.
  const showSettings = () => document.dispatchEvent(new CustomEvent('open-settings', { detail: 'lines' }));
  gear.addEventListener('click', showSettings);
  /** Show or hide the parts the settings control, then redraw. */
  function apply() {
    $('#lines-kinds').hidden = !prefs.kinds;
    if (!prefs.kinds && kinds.size) {
      kinds.clear();
      $('#lines-kinds').querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', 'false'));
    }
    ($('.lines-opts') as HTMLElement).hidden = !prefs.controls;
    (sortSel.querySelector('option[value=used]') as HTMLOptionElement).hidden = !prefs.usage;
    info.hidden = !prefs.info;
    $('#lines').classList.toggle('wide', prefs.wide);
    syncTreeOption();
    editor.refresh();
    render();
  }
  buildSettings();
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
    document.body.classList.toggle('lines-open', o);
    const pop = document.getElementById('line-pop');
    if (o && pop) pop.hidden = true;
    $('#lines-toggle').setAttribute('aria-pressed', String(o));
    store.set(LINES_KEY, o ? '1' : '0');
    editor.refresh();
    if (o) update();
    if (o && focus) ($('#lines-q') as HTMLInputElement).focus();
  }

  showInfo(undefined);
  apply();
  setOpen(open);
  return {
    toggle: () => setOpen(!open, !open),
    show: () => setOpen(true, true),
    set: (o: boolean) => setOpen(o),
    isOpen: () => open,
    openSettings: showSettings,
  };
}
