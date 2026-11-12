// Find and replace as in VS Code: a box at the top right of the code (Ctrl+F; Ctrl+H adds the replace row), the
// match count, Enter / Shift+Enter (and F3 / Shift+F3) through the matches, Alt+C match case, Alt+W whole word,
// Alt+R regular expression, Replace (Enter in the replace field) and Replace all (Ctrl+Alt+Enter), Esc to close.
// Alt+Enter selects every match (one cursor each, as in VS Code: then → / ← put the cursors after / before them, to
// add a suffix or prefix to all at once). Every match is highlighted; the current one is selected. One per editor,
// made on first use.
//
// Fast with many matches: the matches are kept as offsets (positions only when needed), the highlight is an overlay
// that CodeMirror draws only for the lines on screen (not a mark per match, which froze the editor with thousands),
// and typing in the field searches once it pauses.
import CodeMirror from 'codemirror';

interface State {
  box: HTMLElement;
  find: HTMLInputElement;
  repl: HTMLInputElement;
  count: HTMLElement;
  replaceRow: HTMLElement;
  opts: { case: boolean; word: boolean; regex: boolean };
  overlay: any | null;
  /** [start, end) offsets in the code. */
  matches: [number, number][];
  current: number;
  timer?: ReturnType<typeof setTimeout>;
  typing?: ReturnType<typeof setTimeout>;
}
const MAX = 20000; // matches counted; past that the count says "20000+"
const pos = (cm: any, i: number) => cm.posFromIndex(i);

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

/** The highlight: a CodeMirror overlay, drawn line by line for the lines on screen only. */
function highlight(cm: any, st: State, re: RegExp | null) {
  if (st.overlay) cm.removeOverlay(st.overlay);
  st.overlay = null;
  if (!re) return;
  const r = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
  st.overlay = {
    token(stream: any) {
      r.lastIndex = stream.pos;
      const m = r.exec(stream.string);
      if (m && m.index === stream.pos && m[0].length) {
        stream.pos += m[0].length;
        return 'find-match';
      }
      if (m && m.index > stream.pos) stream.pos = m.index;
      else stream.skipToEnd();
      return null;
    },
  };
  cm.addOverlay(st.overlay, { opaque: false });
}

function search(cm: any, st: State, from?: any) {
  st.matches = [];
  const re = pattern(st);
  st.box.classList.toggle('bad', !!st.find.value && !re);
  if (re) {
    const text = cm.getValue();
    for (let m = re.exec(text); m && st.matches.length < MAX; m = re.exec(text)) {
      if (m[0] === '') {
        re.lastIndex++;
        continue;
      }
      st.matches.push([m.index, m.index + m[0].length]);
    }
  }
  highlight(cm, st, re);
  // The match under the cursor (where the search started), else the next one, as VS Code does.
  const at = cm.indexFromPos(from ?? cm.getCursor('from'));
  st.current = currentMatch(st.matches, at);
  show(cm, st);
}

/** The match under the cursor or the next one after it (wrapping to the first); -1 when none. A match that ends
 *  exactly at the cursor is behind it. Binary search: the matches are in order. */
export function currentMatch(matches: [number, number][], at: number): number {
  let lo = 0, hi = matches.length;
  while (lo < hi) { const mid = (lo + hi) >> 1; if (matches[mid][1] <= at) lo = mid + 1; else hi = mid; }
  return matches.length ? (lo < matches.length ? lo : 0) : -1;
}

function show(cm: any, st: State) {
  st.count.textContent = !st.find.value ? '' : st.matches.length ? `${st.current + 1} of ${st.matches.length}${st.matches.length >= MAX ? '+' : ''}` : 'No results';
  st.box.classList.toggle('none', !!st.find.value && !st.matches.length);
  const m = st.matches[st.current];
  if (m) {
    const from = pos(cm, m[0]), to = pos(cm, m[1]);
    cm.setSelection(from, to);
    cm.scrollIntoView({ from, to }, 80);
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

/** Matches from the text and query as they are now: a search waiting for typing to pause, or for an edit to settle,
 *  would leave old offsets, and a replace would then overwrite the wrong text. The current match stays current. */
function fresh(cm: any, st: State) {
  clearTimeout(st.timer);
  clearTimeout(st.typing);
  st.timer = st.typing = undefined;
  search(cm, st, cm.getCursor('from'));
}

function replaceOne(cm: any, st: State) {
  fresh(cm, st);
  const m = st.matches[st.current];
  if (!m) return;
  const from = pos(cm, m[0]), to = pos(cm, m[1]);
  cm.replaceRange(replacement(st, cm.getRange(from, to)), from, to, '+replace');
  search(cm, st, from);
}

function replaceAll(cm: any, st: State) {
  fresh(cm, st);
  if (!st.matches.length) return;
  const n = st.matches.length;
  // One edit for the whole text: thousands of replaceRange calls would each re-measure the document.
  const text = cm.getValue();
  let out = '', last = 0;
  for (const [a, b] of st.matches) { out += text.slice(last, a) + replacement(st, text.slice(a, b)); last = b; }
  out += text.slice(last);
  const scroll = cm.getScrollInfo();
  cm.replaceRange(out, pos(cm, 0), pos(cm, text.length), '+replace');
  cm.scrollTo(scroll.left, scroll.top);
  search(cm, st);
  st.count.textContent = `Replaced ${n}`;
}

/** Alt+Enter: every match selected, one cursor each (VS Code's "Select All Matches"). Returns false with no matches. */
function selectAll(cm: any, st: State): boolean {
  if (!st.matches.length) return false;
  const cur = Math.max(0, st.current);
  cm.setSelections(st.matches.map(([a, b]) => ({ anchor: pos(cm, a), head: pos(cm, b) })), cur);
  close(cm, true);
  return true;
}
/** Ctrl+Shift+L while Find is open: its matches (with its case, word and regex options), as VS Code does. */
export function selectFindMatches(cm: any): boolean {
  const st = cm.state.findWidget as State | undefined;
  return !!st && st.box.classList.contains('open') && !!st.find.value && selectAll(cm, st);
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
    overlay: null,
    matches: [],
    current: -1,
  };
  const toggleOpt = (k: 'case' | 'word' | 'regex') => {
    st.opts[k] = !st.opts[k];
    box.querySelector(`[data-opt="${k}"]`)!.setAttribute('aria-pressed', String(st.opts[k]));
    const m = st.matches[st.current];
    search(cm, st, m ? pos(cm, m[0]) : undefined);
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
  // Searched once typing pauses (at once in a short file), so a long file never makes typing in the field lag.
  st.find.addEventListener('input', () => {
    clearTimeout(st.typing);
    const m = st.matches[st.current];
    const from = m ? pos(cm, m[0]) : cm.getCursor('from');
    st.typing = setTimeout(() => search(cm, st, from), cm.getValue().length > 20000 ? 120 : 0);
  });
  // A search still waiting for typing to pause runs now (Enter right after typing).
  const flush = () => {
    if (st.typing === undefined) return;
    clearTimeout(st.typing);
    st.typing = undefined;
    search(cm, st, cm.getCursor('from'));
  };
  const keys = (e: KeyboardEvent) => {
    const k = e.key.toLowerCase();
    if (e.key === 'Escape') { e.preventDefault(); close(cm); }
    else if (e.altKey && !e.ctrlKey && (k === 'c' || k === 'w' || k === 'r')) { e.preventDefault(); toggleOpt(k === 'c' ? 'case' : k === 'w' ? 'word' : 'regex'); }
    else if (e.key === 'Enter' && e.ctrlKey && e.altKey) { e.preventDefault(); replaceAll(cm, st); }
    else if (e.key === 'Enter' && e.altKey && e.target === st.find) { e.preventDefault(); flush(); selectAll(cm, st); }
    else if (e.key === 'Enter' && e.target === st.repl) { e.preventDefault(); replaceOne(cm, st); }
    else if (e.key === 'Enter' || e.key === 'F3') { e.preventDefault(); flush(); step(cm, st, e.shiftKey ? -1 : 1); }
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
export function close(cm: any, keepSelections = false) {
  const st = cm.state.findWidget as State | undefined;
  if (!st) return;
  st.box.classList.remove('open');
  clearTimeout(st.typing);
  st.typing = undefined;
  highlight(cm, st, null);
  if (keepSelections) {
    const sels = cm.listSelections();
    cm.focus();
    cm.setSelections(sels);
  } else cm.focus();
}
