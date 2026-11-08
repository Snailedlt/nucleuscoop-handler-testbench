// Find and replace as in VS Code: a box at the top right of the code (Ctrl+F; Ctrl+H adds the replace row), the
// match count, Enter / Shift+Enter (and F3 / Shift+F3) through the matches, Alt+C match case, Alt+W whole word,
// Alt+R regular expression, Replace (Enter in the replace field) and Replace all (Ctrl+Alt+Enter), Esc to close.
// Every match is highlighted; the current one is selected. One per editor, made on first use.
import CodeMirror from 'codemirror';

interface State {
  box: HTMLElement;
  find: HTMLInputElement;
  repl: HTMLInputElement;
  count: HTMLElement;
  replaceRow: HTMLElement;
  opts: { case: boolean; word: boolean; regex: boolean };
  marks: any[];
  matches: { from: any; to: any }[];
  current: number;
  timer?: ReturnType<typeof setTimeout>;
}

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function pattern(st: State): RegExp | null {
  const q = st.find.value;
  if (!q) return null;
  try {
    const src = st.opts.regex ? q : esc(q);
    return new RegExp(st.opts.word ? `\\b(?:${src})\\b` : src, st.opts.case ? 'gm' : 'gim');
  } catch {
    return null; // an unfinished regular expression
  }
}

function search(cm: any, st: State, from?: any) {
  st.marks.forEach((m) => m.clear());
  st.marks = [];
  st.matches = [];
  const re = pattern(st);
  st.box.classList.toggle('bad', !!st.find.value && !re);
  if (re) {
    const text = cm.getValue();
    for (let m = re.exec(text); m && st.matches.length < 5000; m = re.exec(text)) {
      if (m[0] === '') {
        re.lastIndex++;
        continue;
      }
      st.matches.push({ from: cm.posFromIndex(m.index), to: cm.posFromIndex(m.index + m[0].length) });
    }
    cm.operation(() => {
      for (const x of st.matches.slice(0, 1000)) st.marks.push(cm.markText(x.from, x.to, { className: 'cm-find-match' }));
    });
  }
  // The first match at or after `from` (where the search started), as VS Code does.
  const at = from ?? cm.getCursor('from');
  // The match under the cursor, else the next one.
  let i = st.matches.findIndex((x) => CodeMirror.cmpPos(x.from, at) <= 0 && CodeMirror.cmpPos(at, x.to) <= 0);
  if (i < 0) i = st.matches.findIndex((x) => CodeMirror.cmpPos(x.from, at) >= 0);
  st.current = st.matches.length ? (i < 0 ? 0 : i) : -1;
  show(cm, st);
}

function show(cm: any, st: State) {
  st.count.textContent = !st.find.value ? '' : st.matches.length ? `${st.current + 1} of ${st.matches.length}${st.matches.length >= 5000 ? '+' : ''}` : 'No results';
  st.box.classList.toggle('none', !!st.find.value && !st.matches.length);
  const m = st.matches[st.current];
  if (m) {
    cm.setSelection(m.from, m.to);
    cm.scrollIntoView({ from: m.from, to: m.to }, 80);
  }
}

function step(cm: any, st: State, d: 1 | -1) {
  if (!st.matches.length) return search(cm, st);
  st.current = (st.current + d + st.matches.length) % st.matches.length;
  show(cm, st);
}

function replacement(st: State, matched: string): string {
  const re = pattern(st);
  if (!re || !st.opts.regex) return st.repl.value;
  return matched.replace(new RegExp(re.source, re.flags.replace('g', '')), st.repl.value); // $1… from the match
}

function replaceOne(cm: any, st: State) {
  const m = st.matches[st.current];
  if (!m) return;
  const from = m.from;
  cm.replaceRange(replacement(st, cm.getRange(m.from, m.to)), m.from, m.to, '+replace');
  search(cm, st, from);
}

function replaceAll(cm: any, st: State) {
  if (!st.matches.length) return;
  const n = st.matches.length;
  cm.operation(() => {
    for (const m of [...st.matches].reverse()) cm.replaceRange(replacement(st, cm.getRange(m.from, m.to)), m.from, m.to, '+replace');
  });
  search(cm, st);
  st.count.textContent = `Replaced ${n}`;
}

function build(cm: any): State {
  const box = document.createElement('div');
  box.className = 'find-widget';
  box.setAttribute('role', 'search');
  box.innerHTML = `
    <button type="button" class="fw-toggle" aria-label="Show replace (Ctrl+H)" aria-expanded="false" title="Toggle replace (Ctrl+H)">›</button>
    <div class="fw-rows">
      <div class="fw-row">
        <input class="fw-find" type="text" aria-label="Find" placeholder="Find" spellcheck="false" autocomplete="off">
        <button type="button" class="fw-opt" data-opt="case" aria-pressed="false" title="Match case (Alt+C)" aria-label="Match case">Aa</button>
        <button type="button" class="fw-opt" data-opt="word" aria-pressed="false" title="Match whole word (Alt+W)" aria-label="Match whole word"><u>ab</u></button>
        <button type="button" class="fw-opt" data-opt="regex" aria-pressed="false" title="Use regular expression (Alt+R)" aria-label="Use regular expression">.*</button>
        <span class="fw-count" aria-live="polite"></span>
        <button type="button" class="fw-btn" data-act="prev" title="Previous match (Shift+Enter)" aria-label="Previous match">↑</button>
        <button type="button" class="fw-btn" data-act="next" title="Next match (Enter)" aria-label="Next match">↓</button>
        <button type="button" class="fw-btn" data-act="close" title="Close (Esc)" aria-label="Close">×</button>
      </div>
      <div class="fw-row fw-replace" hidden>
        <input class="fw-repl" type="text" aria-label="Replace" placeholder="Replace" spellcheck="false" autocomplete="off">
        <button type="button" class="fw-btn" data-act="one" title="Replace (Enter)">Replace</button>
        <button type="button" class="fw-btn" data-act="all" title="Replace all (Ctrl+Alt+Enter)">All</button>
      </div>
    </div>`;
  cm.getWrapperElement().appendChild(box);
  const st: State = {
    box,
    find: box.querySelector('.fw-find')!,
    repl: box.querySelector('.fw-repl')!,
    count: box.querySelector('.fw-count')!,
    replaceRow: box.querySelector('.fw-replace')!,
    opts: { case: false, word: false, regex: false },
    marks: [],
    matches: [],
    current: -1,
  };
  const toggleOpt = (k: 'case' | 'word' | 'regex') => {
    st.opts[k] = !st.opts[k];
    box.querySelector(`[data-opt="${k}"]`)!.setAttribute('aria-pressed', String(st.opts[k]));
    search(cm, st, st.matches[st.current]?.from);
  };
  box.addEventListener('mousedown', (e) => {
    // Buttons keep the focus where it was (typing goes on in the field).
    if ((e.target as HTMLElement).closest('button')) e.preventDefault();
  });
  box.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest('button');
    if (!b) return;
    if (b.dataset.opt) toggleOpt(b.dataset.opt as any);
    else if (b.dataset.act === 'next') step(cm, st, 1);
    else if (b.dataset.act === 'prev') step(cm, st, -1);
    else if (b.dataset.act === 'close') close(cm);
    else if (b.dataset.act === 'one') replaceOne(cm, st);
    else if (b.dataset.act === 'all') replaceAll(cm, st);
    else if (b.classList.contains('fw-toggle')) setReplace(st, !!st.replaceRow.hidden);
  });
  st.find.addEventListener('input', () => search(cm, st, st.matches[st.current]?.from ?? cm.getCursor('from')));
  const keys = (e: KeyboardEvent) => {
    const k = e.key.toLowerCase();
    if (e.key === 'Escape') { e.preventDefault(); close(cm); }
    else if (e.altKey && !e.ctrlKey && (k === 'c' || k === 'w' || k === 'r')) { e.preventDefault(); toggleOpt(k === 'c' ? 'case' : k === 'w' ? 'word' : 'regex'); }
    else if (e.key === 'Enter' && e.ctrlKey && e.altKey) { e.preventDefault(); replaceAll(cm, st); }
    else if (e.key === 'Enter' && e.target === st.repl) { e.preventDefault(); replaceOne(cm, st); }
    else if (e.key === 'Enter' || e.key === 'F3') { e.preventDefault(); step(cm, st, e.shiftKey ? -1 : 1); }
    else if ((e.ctrlKey || e.metaKey) && k === 'h') { e.preventDefault(); setReplace(st, true); st.repl.focus(); }
    else if ((e.ctrlKey || e.metaKey) && k === 'f') { e.preventDefault(); st.find.select(); }
  };
  st.find.addEventListener('keydown', keys);
  st.repl.addEventListener('keydown', keys);
  // The code changed (typing, undo): matches again, without moving the selection.
  cm.on('change', () => {
    if (box.hidden || box.contains(document.activeElement) === false) {
      if (!box.classList.contains('open')) return;
    }
    clearTimeout(st.timer);
    st.timer = setTimeout(() => {
      if (!box.classList.contains('open')) return;
      const keep = cm.listSelections();
      search(cm, st, cm.getCursor('from'));
      cm.setSelections(keep);
    }, 150);
  });
  return st;
}

function setReplace(st: State, on: boolean) {
  st.replaceRow.hidden = !on;
  st.box.classList.toggle('with-replace', on);
  const t = st.box.querySelector('.fw-toggle')!;
  t.setAttribute('aria-expanded', String(on));
  t.textContent = on ? '⌄' : '›';
}

const stateOf = (cm: any): State => (cm.state.findWidget ??= build(cm));

/** Ctrl+F (find) or Ctrl+H (find and replace), seeded with the selection or the word at the cursor. */
export function openFind(cm: any, replace = false) {
  const st = stateOf(cm);
  const sel = cm.getSelection();
  let seed = sel && !sel.includes('\n') ? sel : '';
  if (!sel) {
    const w = cm.findWordAt(cm.getCursor());
    const word = cm.getRange(w.anchor, w.head);
    if (/^[\w$]+$/.test(word)) seed = word;
  }
  if (seed) st.find.value = st.opts.regex ? esc(seed) : seed;
  st.box.classList.add('open');
  if (replace) setReplace(st, true);
  search(cm, st, cm.getCursor('from'));
  if (replace && st.find.value) st.repl.focus();
  else {
    st.find.focus();
    st.find.select();
  }
}
/** F3 / Shift+F3 from the code: the next / previous match (opens Find when it's closed). */
export function findStep(cm: any, d: 1 | -1) {
  const st = cm.state.findWidget as State | undefined;
  if (!st || !st.box.classList.contains('open') || !st.find.value) return openFind(cm);
  step(cm, st, d);
}
export function close(cm: any) {
  const st = cm.state.findWidget as State | undefined;
  if (!st) return;
  st.box.classList.remove('open');
  st.marks.forEach((m) => m.clear());
  st.marks = [];
  cm.focus();
}
