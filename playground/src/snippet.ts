// Inserting a snippet from core (completionsAt's `snippet: true` items) into CodeMirror 5: `$1`, `${1:text}`,
// `${1|a,b|}`, `$0`, the syntax VS Code and LSP share. The first stop is selected; Tab / Shift+Tab move between the
// stops (same number = same text, filled in once), Esc or leaving them ends it. Lines after the first get the
// current line's indent, tabs become the editor's indent unit.

interface Stop { n: number; from: number; to: number }

/** The plain text of a snippet body and where its stops are (offsets into that text). */
export function expandSnippet(body: string, indent = '', unit = '  '): { text: string; stops: Stop[] } {
  let text = '';
  const stops: Stop[] = [];
  let i = 0;
  // Each stop's default text, wherever it's given: a bare `$1` repeats the text of `${1:player}` (VS Code does the same).
  const defaults = new Map<number, string>();
  // Escaped text (`\${1:x}`) is skipped: the `\\.` alternative eats the escape before a `$` can match.
  for (const m of body.matchAll(/\\.|\$\{(\d+)(?::((?:\\.|[^}\\])*)|\|([^|]*)\|)\}/g)) {
    if (m[1] === undefined) continue;
    const n = +m[1];
    if (!defaults.has(n)) defaults.set(n, m[2] !== undefined ? m[2].replace(/\\(.)/g, '$1') : (m[3] ?? '').split(',')[0]);
  }
  const put = (s: string) => {
    text += s.replace(/\t/g, unit).replace(/\n/g, '\n' + indent);
  };
  while (i < body.length) {
    const c = body[i];
    if (c === '\\' && i + 1 < body.length && '\\$}'.includes(body[i + 1])) { put(body[i + 1]); i += 2; continue; }
    if (c === '$') {
      const simple = /^\$(\d+)/.exec(body.slice(i));
      if (simple) {
        const from = text.length;
        put(defaults.get(+simple[1]) ?? '');
        stops.push({ n: +simple[1], from, to: text.length });
        i += simple[0].length;
        continue;
      }
      const choice = /^\$\{(\d+)\|([^|]*)\|\}/.exec(body.slice(i));
      if (choice) {
        const first = choice[2].split(',')[0];
        const from = text.length;
        put(first);
        stops.push({ n: +choice[1], from, to: text.length });
        i += choice[0].length;
        continue;
      }
      const ph = /^\$\{(\d+):/.exec(body.slice(i));
      if (ph) {
        // The default text, up to the matching `}` (escapes allowed).
        let j = i + ph[0].length;
        let inner = '';
        while (j < body.length && body[j] !== '}') {
          if (body[j] === '\\' && j + 1 < body.length) { inner += body[j + 1]; j += 2; } else inner += body[j++];
        }
        const from = text.length;
        put(inner);
        stops.push({ n: +ph[1], from, to: text.length });
        i = j + 1;
        continue;
      }
    }
    put(c);
    i++;
  }
  return { text, stops };
}

/** Replace from–to with the snippet and let Tab walk its stops. */
export function insertSnippet(cm: any, from: any, to: any, body: string) {
  const indent = (cm.getLine(from.line).match(/^\s*/) ?? [''])[0];
  const unit = cm.getOption('indentWithTabs') ? '\t' : ' '.repeat(cm.getOption('indentUnit') ?? 2);
  const { text, stops } = expandSnippet(body, indent, unit);
  const base = cm.indexFromPos(from);
  cm.replaceRange(text, from, to, '+snippet');
  // Stops in order 1, 2, … then 0 (the end); a snippet without $0 ends after its text.
  const nums = [...new Set(stops.map((s) => s.n))].filter((n) => n > 0).sort((a, b) => a - b);
  const marks = (n: number) => stops.filter((s) => s.n === n).map((s) =>
    cm.markText(cm.posFromIndex(base + s.from), cm.posFromIndex(base + s.to), { className: 'cm-snippet-stop', clearWhenEmpty: false, inclusiveLeft: true, inclusiveRight: true }));
  const groups = nums.map(marks);
  const endStop = stops.find((s) => s.n === 0);
  const endMark = cm.setBookmark(cm.posFromIndex(base + (endStop ? endStop.from : text.length)), { insertLeft: true });
  if (!groups.length) { cm.setCursor(endMark.find()); endMark.clear(); return; }
  let at = 0;
  const select = () => {
    const ranges = groups[at].map((m: any) => m.find()).filter(Boolean).map((r: any) => ({ anchor: r.from, head: r.to }));
    if (ranges.length) cm.setSelections(ranges, 0);
  };
  const done = () => {
    cm.removeKeyMap(keys);
    cm.off('cursorActivity', watch);
    groups.flat().forEach((m: any) => m.clear());
    endMark.clear();
  };
  const keys = {
    Tab: () => { if (at + 1 < groups.length) { at++; select(); } else { const p = endMark.find(); done(); if (p) cm.setCursor(p); } },
    'Shift-Tab': () => { if (at > 0) { at--; select(); } },
    Esc: () => done(),
  };
  // Leaving the stops (clicking elsewhere) ends the snippet.
  const watch = () => {
    const c = cm.getCursor();
    const inside = groups[at].some((m: any) => { const r = m.find(); return r && cm.indexFromPos(r.from) <= cm.indexFromPos(c) && cm.indexFromPos(c) <= cm.indexFromPos(r.to); });
    if (!inside) done();
  };
  cm.addKeyMap(keys);
  select();
  cm.on('cursorActivity', watch);
}
