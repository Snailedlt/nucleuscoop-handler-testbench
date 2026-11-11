// The Learn page (learn/): the lesson list in a drawer on the left, the lesson in the middle, its code on the right
// with the one result pane it needs (Check or Try it); Back, the Show me button and Next at the bottom. Lessons are
// curated (lessons.ts): each starts from the code its author chose, never from the learner's last attempt. Edits are
// kept while the page is open, so Back shows your own code again. Nothing here sends the learner off the page except
// the downloads a lesson needs.
// Links: learn/#<chapter>/<lesson>, kept for ever (lesson ids never change).
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/hint/show-hint';
import { hoverAt, completionsAt, type CompletionEntry } from '@core/features';
import { lint } from '@core/lint';
import { RULE_DOCS } from '@core/ruledocs';
import { zipBytes } from '@core/zipbytes';
import { md, esc } from '../dom';
import { hlHtml, hlCode } from '../codehl';
import { CHAPTERS, FILE_NAME, findLesson, lessonNumber, problems, run, type Chapter, type Lesson, type NoteKind } from './lessons';

const KEY = 'nucleus-learn';
interface Saved { done: string[]; last?: string; drawer?: boolean; open?: string[] }
const load = (): Saved => {
  try { const v = JSON.parse(localStorage.getItem(KEY) || 'null'); if (v && Array.isArray(v.done)) return v; } catch { /* private mode */ }
  return { done: [] };
};
const saved = load();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch { /* private mode */ } };
const $ = <T extends HTMLElement = HTMLElement>(s: string) => document.querySelector(s) as T;
/** `code`, **bold** and [links](…) in the lesson texts, the code coloured. */
const inline = (t: string) => hlHtml(esc(t)
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  .replace(/(^|[\s(])\*([^*]+)\*(?=$|[\s.,)])/g, '$1<em>$2</em>')
  .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>'));
/** A lesson paragraph: text, or a ```js code block whose "+ " lines are the ones to add (Svelte's diff view). */
function para(p: string): string {
  const m = /^```\w*\n([\s\S]*?)\n?```$/.exec(p.trim());
  if (!m) return `<p>${inline(p)}</p>`;
  const lines = m[1].split('\n').map((l) => {
    const add = l.startsWith('+ '), del = l.startsWith('- ');
    const text = add || del ? l.slice(2) : l;
    return `<span class="ln${add ? ' add' : ''}${del ? ' del' : ''}${text.trim() === '…' ? ' gap' : ''}">${add ? '<span class="sr-only">Added: </span>' : del ? '<span class="sr-only">Left out: </span>' : ''}${hlCode(text) || ' '}</span>`;
  });
  return `<pre class="lesson-code hl cm-s-default" tabindex="0" aria-label="Code to add (highlighted lines)">${lines.join('')}</pre>`;
}
const NOTE: Record<NoteKind, string> = { pitfall: 'Pitfall', why: 'Why this way', alt: 'Another way', odd: 'If you see something odd', check: 'What Check says' };
const testEvent = (name: string, detail: string) => { try { (window as any).goatcounter?.count?.({ path: `learn-${name}-${detail}`, title: `Learn: ${name}`, event: true }); } catch { /* no counter */ } };

let chapter: Chapter = CHAPTERS[0];
let index = 0;
const edits = new Map<string, string>();
const lesson = (): Lesson => chapter.lessons[index];
const keyOf = (l: Lesson) => `${chapter.id}/${l.id}`;

const editor = CodeMirror($('#code'), {
  value: '',
  mode: 'javascript',
  lineNumbers: true,
  indentUnit: 2,
  tabSize: 2,
  matchBrackets: true,
  autoCloseBrackets: true,
  lineWrapping: true,
  screenReaderLabel: 'Handler code',
  extraKeys: { 'Ctrl-Space': () => suggest(true), 'Ctrl-I': () => showDocsAtCursor(), Esc: () => hideTip(), Tab: (cm: any) => (cm.somethingSelected() ? cm.indentSelection('add') : cm.replaceSelection('  ')) },
} as any);

// ------------------------------------------------------------------------------------------------------------
// Suggestions as you type (and Ctrl+Space), from the same core the editors use: Game.…, Context.…, values after =.
/** A snippet (`$1`, `${1:x}`, `${1|a,b|}`) as plain text and where the cursor goes. */
function fromSnippet(s: string): { text: string; cursor: number } {
  let text = '', cursor = -1, last = 0;
  const re = /\$\{(\d+)\|([^|}]*)[^}]*\|\}|\$\{(\d+):([^}]*)\}|\$(\d+)/g;
  for (let m; (m = re.exec(s)); ) {
    text += s.slice(last, m.index).replace(/\t/g, '  ');
    const value = m[2]?.split(',')[0] ?? m[4] ?? '';
    if (cursor < 0 && (m[1] ?? m[3] ?? m[5]) !== '0') cursor = text.length;
    text += value;
    last = m.index + m[0].length;
  }
  text += s.slice(last).replace(/\t/g, '  ');
  return { text, cursor: cursor >= 0 ? cursor : text.length };
}
function suggest(explicit: boolean) {
  (editor as any).showHint({
    completeSingle: false,
    closeCharacters: /[\s()[\]{};:>,]/,
    hint: (cm: any) => {
      const cur = cm.getCursor();
      const items = completionsAt(cm.getValue(), cm.indexFromPos(cur), { explicit });
      if (!items?.length) return null;
      const line = cm.getLine(cur.line);
      let s = cur.ch;
      while (s > 0 && /[\w$]/.test(line[s - 1])) s--;
      const word = line.slice(s, cur.ch).toLowerCase();
      const key = (e: CompletionEntry) => (e.filterText ?? e.label).toLowerCase();
      const list = items
        .filter((e) => !word || key(e).includes(word))
        .sort((a, b) => Number(key(b).startsWith(word)) - Number(key(a).startsWith(word)) || (a.sortText ?? a.label).localeCompare(b.sortText ?? b.label))
        .slice(0, 60)
        .map((e) => {
          const from = e.range ? cm.posFromIndex(e.range.start) : { line: cur.line, ch: s };
          const to = e.range ? cm.posFromIndex(e.range.end) : cur;
          return {
            text: e.label,
            from, to,
            render: (el: HTMLElement) => { el.innerHTML = `<span class="h-label">${esc(e.label)}</span>${e.detail ? `<span class="h-detail">${esc(e.detail)}</span>` : ''}`; },
            hint: (c: any) => {
              const sn = e.snippet ? fromSnippet(e.insertText ?? e.label) : { text: e.insertText ?? e.label, cursor: -1 };
              c.replaceRange(sn.text, from, to, 'complete');
              c.setCursor(c.posFromIndex(c.indexFromPos(from) + (sn.cursor >= 0 ? sn.cursor : sn.text.length)));
            },
          };
        });
      return list.length ? { list, from: { line: cur.line, ch: s }, to: cur } : null;
    },
  });
}
editor.on('inputRead', (cm: any, ch: any) => {
  const typed = ch.text.join('');
  if (cm.state.completionActive) return;
  if (/^[A-Za-z_.]$/.test(typed) || (typed === ' ' && /=\s$/.test(cm.getLine(ch.from.line).slice(0, ch.from.ch + 1)))) suggest(false);
});

// ------------------------------------------------------------------------------------------------------------
// Docs on hover (and Ctrl+I at the cursor), from the same core the editors use.
const tip = $('#tip');
function hideTip() { tip.hidden = true; }
function showDocs(offset: number, x: number, y: number) {
  const h = hoverAt(editor.getValue(), offset);
  if (!h) return hideTip();
  // No way off the page from here: the docs' links become plain text.
  tip.innerHTML = md(h.markdown).replace(/<a [^>]*>([\s\S]*?)<\/a>/g, '$1');
  tip.hidden = false;
  const w = Math.min(420, innerWidth - 16);
  tip.style.maxWidth = `${w}px`;
  tip.style.left = `${Math.max(8, Math.min(x, innerWidth - w - 8))}px`;
  tip.style.top = `${y + 18}px`;
  const r = tip.getBoundingClientRect();
  if (r.bottom > innerHeight - 8) tip.style.top = `${Math.max(8, y - r.height - 8)}px`;
}
function showDocsAtCursor() {
  const c = editor.cursorCoords(true, 'window');
  showDocs(editor.indexFromPos(editor.getCursor()), c.left, c.top);
}
let hoverTimer: ReturnType<typeof setTimeout> | undefined;
editor.getWrapperElement().addEventListener('mousemove', (e: MouseEvent) => {
  clearTimeout(hoverTimer);
  hoverTimer = setTimeout(() => {
    const pos = editor.coordsChar({ left: e.clientX, top: e.clientY }, 'window');
    if ((pos as any).outside) return hideTip();
    showDocs(editor.indexFromPos(pos), e.clientX, e.clientY);
  }, 350);
});
editor.getWrapperElement().addEventListener('mouseleave', () => { clearTimeout(hoverTimer); setTimeout(() => { if (!tip.matches(':hover')) hideTip(); }, 200); });
tip.addEventListener('mouseleave', hideTip);
addEventListener('scroll', hideTip, true);

// ------------------------------------------------------------------------------------------------------------
// The result panes: Check (the problems, each explained in place) and Try it (what each player gets, for the
// players you pick).
let marks: any[] = [];
const openDocs = new Set<string>();
function ruleDoc(id: string): string {
  const d = RULE_DOCS[id];
  if (!d) return '';
  const code = (c?: string) => (c ? `<pre class="doc-code hl cm-s-default">${hlCode(c)}</pre>` : '');
  return `<div class="rule-doc"><p><strong>${inline(d.title)}.</strong> ${inline(d.why)}</p>${d.bad ? `<p class="muted small">Wrong:</p>${code(d.bad)}` : ''}${d.good ? `<p class="muted small">Right:</p>${code(d.good)}` : ''}<p>${inline(d.fix)}</p></div>`;
}
function renderCheck(text: string) {
  const l = lesson();
  const ds = problems(text, l);
  marks.forEach((m) => m.clear());
  marks = ds.map((d) => editor.markText(editor.posFromIndex(d.start), editor.posFromIndex(Math.max(d.end, d.start + 1)), { className: `sq-${d.severity}`, attributes: { title: d.message } }));
  if (l.pane !== 'check') return;
  // The same code gets the same answer in every lesson: when Check leaves something out (lines a lesson soon adds),
  // it says "nothing wrong so far", not that Nucleus can load it.
  // A handler without its name and exe can't load, even before Check starts asking for them (lessons 3 and 4).
  const hidden = lint(text).some((d) => d.severity === 'error') || !['GUID', 'GameName', 'ExecutableName'].every((k) => new RegExp(`^\\s*Game\\.${k}\\s*=\\s*"[^"]+"`, 'm').test(text));
  $('#pane').innerHTML = `<h2 class="pane-title">Check</h2>${ds.length ? `<ul class="probs">${ds.map((d, i) => `<li class="prob ${d.severity}"><button type="button" class="link goto" data-i="${i}">Line ${editor.posFromIndex(d.start).line + 1}</button> <span class="sev">${d.severity === 'error' ? 'Error' : 'Warning'}</span> ${inline(d.message)}${RULE_DOCS[d.rule] ? ` <button type="button" class="link about" data-rule="${esc(d.rule)}" aria-expanded="${openDocs.has(d.rule)}">${openDocs.has(d.rule) ? 'Less' : 'Why?'}</button>${openDocs.has(d.rule) ? ruleDoc(d.rule) : ''}` : ''}</li>`).join('')}</ul>` : hidden ? '<p class="ok-line">✓ Nothing wrong so far.</p>' : '<p class="ok-line">✓ No problems: Nucleus can load this handler.</p>'}`;
  $('#pane').querySelectorAll<HTMLElement>('.goto').forEach((b) => b.addEventListener('click', () => {
    editor.focus();
    editor.setCursor(editor.posFromIndex(ds[Number(b.dataset.i)].start));
  }));
  $('#pane').querySelectorAll<HTMLElement>('.about').forEach((b) => b.addEventListener('click', () => {
    const id = b.dataset.rule!;
    if (openDocs.has(id)) openDocs.delete(id); else openDocs.add(id);
    renderCheck(editor.getValue());
    $('#pane').querySelector<HTMLElement>(`.about[data-rule="${CSS.escape(id)}"]`)?.focus();
  }));
}
let tryPlayers = 2, tryKeyboard = true;
function renderTryIt(text: string) {
  if (lesson().pane !== 'tryit') return;
  const pane = $('#pane');
  if (!pane.querySelector('.try-opts')) {
    pane.innerHTML = `<div class="try-head"><h2 class="pane-title">Try it <span class="muted">· runs Game.Play in your browser</span></h2>
      <div class="try-opts"><label>Players <select id="try-players">${[1, 2, 3, 4].map((n) => `<option${n === tryPlayers ? ' selected' : ''}>${n}</option>`).join('')}</select></label>
      <label><input type="checkbox" id="try-kb"${tryKeyboard ? ' checked' : ''}> Player 1 on the keyboard</label></div></div><div id="try-out" aria-live="polite"></div>`;
    pane.querySelector<HTMLSelectElement>('#try-players')!.addEventListener('change', (e) => { tryPlayers = Number((e.target as HTMLSelectElement).value); renderTryIt(editor.getValue()); });
    pane.querySelector<HTMLInputElement>('#try-kb')!.addEventListener('change', (e) => { tryKeyboard = (e.target as HTMLInputElement).checked; renderTryIt(editor.getValue()); });
  }
  const r = run(text, tryPlayers, tryKeyboard);
  const out = pane.querySelector<HTMLElement>('#try-out')!;
  if (!r.loaded) { out.innerHTML = `<p class="bad-line">The handler doesn't load: ${esc(r.loadError ?? 'see the problem marked in the code')}</p>`; return; }
  out.innerHTML = `<div class="players">${r.players.map((p, i) => `<section class="player"><h3>Player ${i + 1} <span class="muted">· ${i === 0 && tryKeyboard ? 'keyboard &amp; mouse' : 'controller'}</span></h3><p class="muted">Window: ${esc(p.window)}</p>${p.error ? `<p class="bad-line">${esc(p.error)}</p>` : ''}${p.effects.length ? `<ul>${p.effects.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>` : `<p class="muted">${r.hasPlay ? 'Game.Play changes nothing for this player.' : 'No Game.Play yet: nothing changes before the game starts.'}</p>`}</section>`).join('')}</div>${r.sessionEnded ? `<p class="bad-line">${esc(r.sessionEnded.reason)}</p>` : ''}`;
}

// ------------------------------------------------------------------------------------------------------------
// The lesson.
let checkTimer: ReturnType<typeof setTimeout> | undefined;
/** The learner has typed in this lesson (hints only show after that). */
let touched = false;
/** The Show me button: "Show me" until the editor holds the answer, then "Reset". */
function syncShow() {
  const l = lesson();
  const b = $('#show');
  b.hidden = l.kind !== 'code';
  const done = editor.getValue() === l.solution;
  b.textContent = done ? 'Reset' : 'Show me';
  b.dataset.act = done ? 'reset' : 'show';
}
function status() {
  const l = lesson();
  syncShow();
  if (l.kind !== 'code' || !l.check) return;
  const text = editor.getValue();
  renderCheck(text);
  renderTryIt(text);
  const miss = l.check(text);
  const ok = miss === null;
  if (ok && !saved.done.includes(keyOf(l))) { saved.done.push(keyOf(l)); save(); testEvent('done', l.id); renderDrawer(); }
  const task = $('#task');
  task.classList.toggle('ok', ok);
  task.innerHTML = ok
    ? `<strong>✓ Done.</strong> ${l.pane === 'tryit' ? 'Look at what each player gets in Try it, then go on.' : 'Go on when you\'re ready.'}`
    : `<strong>Your turn:</strong> ${inline(l.task!)}${miss && touched ? `<span class="hint">${inline(miss)}</span>` : ''}`;
  $('#next').classList.toggle('primary', ok);
  const cp = document.getElementById('checkpoint');
  if (cp) cp.hidden = !ok;
}
editor.on('change', (_cm: any, ch: any) => {
  const l = lesson();
  if (ch?.origin !== 'setValue') touched = true;
  if (ch?.origin !== 'setValue' && ch?.origin !== 'complete') clearDiff();
  if (l.kind === 'code') edits.set(keyOf(l), editor.getValue());
  clearTimeout(checkTimer);
  checkTimer = setTimeout(status, 300);
});

function download(kind: 'js' | 'zip', code: string) {
  const data = new TextEncoder().encode(code.replace(/\r?\n/g, '\r\n'));
  const blob = kind === 'js' ? new Blob([data], { type: 'text/javascript' }) : new Blob([zipBytes([{ name: 'handler.js', data }]) as BlobPart], { type: 'application/zip' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${FILE_NAME}.${kind}`;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  testEvent('download', kind);
}
const dlLabel = (kind: 'js' | 'zip') => `⬇ Download ${FILE_NAME}.${kind}`;

function renderLesson(focus = false) {
  const l = lesson();
  const n = chapter.lessons.length;
  hideTip();
  touched = false;
  openDocs.clear();
  document.title = `${l.title} · ${chapter.title} · Learn`;
  $('#chapter-title').textContent = chapter.title;
  $('#count').textContent = `${index + 1} of ${n}`;
  $('#bar').style.width = `${Math.round(((index + 1) / n) * 100)}%`;
  const notes = (l.notes ?? []).map((x) => `<div class="note ${x.kind}"><strong>${NOTE[x.kind]}</strong> ${inline(x.text)}</div>`).join('');
  const steps = l.steps ? `<ol class="steps">${l.steps.map((s, i) => `<li><label><input type="checkbox" data-step="${i}"> <span>${inline(s)}</span></label></li>`).join('')}</ol>` : '';
  const dl = l.download ? `<p><button type="button" class="btn primary" id="download">${dlLabel(l.download)}</button></p>` : '';
  const ask = l.ask ? `<fieldset class="ask"><legend>${inline(l.ask.question)}</legend>${l.ask.answers.map((a, i) => `<label><input type="radio" name="ask" value="${i}"> ${inline(a.label)}</label>`).join('')}<p class="ask-reply" role="status"></p></fieldset>` : '';
  const checkpoint = l.checkpoint ? `<details class="checkpoint" id="checkpoint" hidden><summary>Try it in Nucleus Co-op now</summary><ol>${l.checkpoint.steps.map((s) => `<li>${inline(s)}</li>`).join('')}</ol><p><button type="button" class="btn primary" id="cp-download">${dlLabel(l.checkpoint.download)}</button></p><p><strong>You should see:</strong> ${inline(l.checkpoint.see)}</p></details>` : '';
  const end = index === n - 1 ? `<div class="end"><h2>You've made a handler 🎉</h2><p>Each player gets their own folder, settings, Steam, window and controller. More chapters are on the way: finding out what a game needs, the tools, Proto Input, emulators, and more.</p></div>` : '';
  $('#lesson-body').innerHTML = `<p class="kicker">${esc(l.section)}</p><h1 id="lesson-title" tabindex="-1">${inline(l.title)}</h1>${l.text.map(para).join('')}${steps}${l.footnote ? `<p class="footnote">${inline(l.footnote)}</p>` : ''}${dl}${ask}${(l.after ?? []).map(para).join('')}${l.kind === 'code' ? '<div id="task" class="task" role="status"></div>' : ''}${checkpoint}${notes}${end}`;
  $('#back').toggleAttribute('disabled', index === 0);
  $('#next').textContent = index === n - 1 ? 'Done' : 'Next ›';
  $('#next').toggleAttribute('disabled', index === n - 1);
  $('#next').classList.toggle('primary', l.kind !== 'code');
  // The right side: the code (code and test lessons); the scene takes the whole page (intro); a setup lesson is
  // the lesson alone.
  const code = l.kind === 'code' || l.kind === 'test';
  $('.learn').classList.toggle('intro', l.kind === 'intro');
  $('.learn').classList.toggle('solo', l.kind === 'setup');
  $('#work').hidden = !code;
  $('#scene').hidden = l.kind !== 'intro';
  clearDiff();
  if (code) {
    $('#reset').hidden = l.kind !== 'code';
    editor.setOption('readOnly', l.kind === 'test');
    // Read-only code still scrolls from the keyboard.
    const scroller = editor.getScrollerElement();
    if (l.kind === 'test') { scroller.tabIndex = 0; scroller.setAttribute('aria-label', 'The handler (read-only)'); } else { scroller.removeAttribute('tabindex'); scroller.removeAttribute('aria-label'); }
    editor.setValue(l.kind === 'code' ? edits.get(keyOf(l)) ?? l.start : l.start);
    editor.clearHistory();
    $('#pane').hidden = !l.pane;
    $('#pane').innerHTML = '';
    if (l.kind === 'code') {
      status();
      editor.setCursor({ line: Math.max(0, editor.lineCount() - 1), ch: 0 });
    } else {
      marks.forEach((m) => m.clear());
    }
    // The new part in view (the code grows past the screen).
    requestAnimationFrame(() => { editor.refresh(); editor.scrollIntoView(editor.getCursor(), 120); });
  } else if (l.kind === 'intro') scene.reset();
  syncShow();
  $('#lesson-body').querySelector<HTMLButtonElement>('#download')?.addEventListener('click', () => download(l.download!, editor.getValue()));
  $('#lesson-body').querySelector<HTMLButtonElement>('#cp-download')?.addEventListener('click', () => download(l.checkpoint!.download, editor.getValue()));
  $('#lesson-body').querySelectorAll<HTMLInputElement>('input[name=ask]').forEach((r) => r.addEventListener('change', () => {
    const a = l.ask!.answers[Number(r.value)];
    $('#lesson-body').querySelector('.ask-reply')!.innerHTML = inline(a.reply);
    testEvent('answer', `${l.id}-${r.value}`);
  }));
  renderDrawer();
  if (focus) $('#lesson-title').focus();
  $('#lesson').scrollTop = 0;
}

function go(i: number, focus = true) {
  index = Math.max(0, Math.min(chapter.lessons.length - 1, i));
  const hash = `#${chapter.id}/${lesson().id}`;
  if (location.hash !== hash) history.replaceState(null, '', hash);
  saved.last = hash;
  save();
  renderLesson(focus);
  testEvent('lesson', lesson().id);
  if (matchMedia('(max-width: 1100px)').matches) setDrawer(false, false);
}

// ------------------------------------------------------------------------------------------------------------
// The lesson list: a drawer on the left, chapter › section › lesson, indented by level (like Svelte's tutorial and
// most component libraries' docs). Open on wide screens unless closed; over the page on narrow ones.
function renderDrawer() {
  const sections = (c: Chapter) => [...new Set(c.lessons.map((l) => l.section))];
  $('#drawer-list').innerHTML = CHAPTERS.map((c) => `<li class="d-chapter"><span class="d-chapter-title">${esc(c.title)}</span><ul>${sections(c).map((s) => {
    const ls = c.lessons.map((l, i) => ({ l, i })).filter((x) => x.l.section === s);
    const here = c === chapter && lesson().section === s;
    const key = `${c.id}/${s}`;
    const open = here || (saved.open ?? []).includes(key);
    return `<li><details class="d-section" data-key="${esc(key)}"${open ? ' open' : ''}><summary>${esc(s)}</summary><ol>${ls.map(({ l, i }) => `<li><a href="#${c.id}/${l.id}"${c === chapter && i === index ? ' aria-current="page"' : ''}><span class="d-no">${i + 1}</span><span class="d-title">${esc(l.title)}</span>${saved.done.includes(`${c.id}/${l.id}`) ? '<span class="tick" aria-label="done">✓</span>' : ''}</a></li>`).join('')}</ol></details></li>`;
  }).join('')}</ul></li>`).join('');
  $('#drawer-list').querySelectorAll<HTMLDetailsElement>('details').forEach((d) => d.addEventListener('toggle', () => {
    const k = d.dataset.key!;
    saved.open = (saved.open ?? []).filter((x) => x !== k).concat(d.open ? [k] : []);
    save();
  }));
}
function setDrawer(open: boolean, remember = true) {
  $('.learn').classList.toggle('drawer-open', open);
  $('#drawer-toggle').setAttribute('aria-expanded', String(open));
  $('#drawer').toggleAttribute('inert', !open);
  if (remember) { saved.drawer = open; save(); }
  requestAnimationFrame(() => editor.refresh());
}
$('#drawer-toggle').addEventListener('click', () => setDrawer(!$('.learn').classList.contains('drawer-open')));
$('#drawer').addEventListener('keydown', (e) => { if (e.key === 'Escape' && matchMedia('(max-width: 1100px)').matches) { setDrawer(false, false); $('#drawer-toggle').focus(); } });

// ------------------------------------------------------------------------------------------------------------
// The first lesson's scene: what happens when you start a game twice, one step at a time.
const scene = (() => {
  const el = $('#scene');
  const STEPS = [
    { say: 'This is Boring Man on your PC: one copy, one window, one player.', act: 'Start a second copy' },
    { say: 'Steam won\'t run a second copy at all. And if it did, both would want the whole screen, share the same settings, and listen to every controller.', act: 'Click the second window' },
    { say: 'Now the first one is behind, and Windows sends your keys only to the window in front. Player 1 is stuck.', act: 'Let Nucleus Co-op handle it' },
    { say: 'Nucleus gives each copy its own folder, settings and Steam, puts each window on its part of the screen, gives each its own controller, and keeps them all listening. The **handler** is what tells it how, for one game.', act: '' },
  ];
  const DOES: [string, string][] = [['A folder for each player', 'folders'], ['Its own settings', 'environment'], ['Its own Steam', 'steam'], ['Its window in place', 'windows'], ['Every window in focus', 'focus'], ['One controller each', 'controllers']];
  let step = 0;
  function draw() {
    const s = STEPS[step];
    const l = lesson();
    el.dataset.step = String(step);
    el.innerHTML = `<h1 class="scene-title">${inline(l.title)}</h1>${step === 0 ? l.text.map(para).join('') : ''}<div class="stage" aria-hidden="true">
        <div class="win w1${step === 2 ? ' paused' : ''}"><div class="wt">Boring Man</div><div class="wb">${step === 2 ? '<span class="pause">No input</span>' : '<span class="run">▶</span>'}</div><div class="who">${step === 3 ? 'Player 1 · ⌨ · Instance0' : 'Player 1'}</div></div>
        ${step >= 1 ? `<div class="win w2"><div class="wt">Boring Man</div><div class="wb"><span class="run">▶</span></div><div class="who">${step === 3 ? 'Player 2 · 🎮 · Instance1' : 'Player 2?'}</div></div>` : ''}
      </div>
      <p class="say" role="status">${inline(s.say)}</p>
      ${step === 3 ? `<ul class="fixes">${DOES.map(([t, id], i) => `<li style="--i:${i}">${t} <span class="lesson-no">Lesson ${lessonNumber(id, chapter)}</span></li>`).join('')}</ul><p>You'll write one for Boring Man, a free game on Steam, a few lines at a time, and test it in Nucleus Co-op.</p>` : ''}
      <p class="scene-acts">${step > 0 ? '<button type="button" class="btn" data-scene="again">Start over</button>' : ''}${s.act ? `<button type="button" class="btn primary" data-scene="next">${s.act}</button>` : '<button type="button" class="btn primary" data-scene="go">Start ›</button>'}</p>`;
  }
  el.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLElement>('[data-scene]');
    if (!b) return;
    if (b.dataset.scene === 'next') { step = Math.min(STEPS.length - 1, step + 1); draw(); el.querySelector<HTMLElement>('[data-scene=next], [data-scene=go]')?.focus(); testEvent('intro', String(step)); }
    else if (b.dataset.scene === 'again') { step = 0; draw(); el.querySelector<HTMLElement>('[data-scene=next]')?.focus(); }
    else go(index + 1);
  });
  return { reset() { step = 0; draw(); } };
})();

// ------------------------------------------------------------------------------------------------------------
// The Show me button: the answer in the editor, the lines it added marked (Svelte 4's button, Svelte 5's diff);
// then Reset.
let diffLines: number[] = [];
function clearDiff() {
  for (const n of diffLines) editor.removeLineClass(n, 'background', 'diff-add');
  diffLines = [];
}
/** The lines of `b` that aren't in `a` (a longest-common-subsequence diff, by line). */
function addedLines(a: string, b: string): number[] {
  const x = a.split('\n'), y = b.split('\n');
  const t: number[][] = Array.from({ length: x.length + 1 }, () => new Array(y.length + 1).fill(0));
  for (let i = x.length - 1; i >= 0; i--) for (let j = y.length - 1; j >= 0; j--) t[i][j] = x[i] === y[j] ? t[i + 1][j + 1] + 1 : Math.max(t[i + 1][j], t[i][j + 1]);
  const out: number[] = [];
  let i = 0, j = 0;
  while (j < y.length) {
    if (i < x.length && x[i] === y[j]) { i++; j++; } else if (i < x.length && t[i + 1][j] >= t[i][j + 1]) i++; else { if (y[j].trim()) out.push(j); j++; }
  }
  return out;
}
function showMe() {
  const l = lesson();
  const before = editor.getValue();
  editor.setValue(l.solution);
  clearDiff();
  diffLines = addedLines(before === l.solution ? l.start : before, l.solution);
  for (const n of diffLines) editor.addLineClass(n, 'background', 'diff-add');
  if (diffLines.length) editor.scrollIntoView({ line: diffLines[0], ch: 0 }, 120);
  testEvent('solve', l.id);
}
function reset() {
  clearDiff();
  editor.setValue(lesson().start);
  editor.focus();
}
$('#show').addEventListener('click', () => {
  if ($('#show').dataset.act === 'show') showMe(); else reset();
  status();
});
$('#reset').addEventListener('click', () => { reset(); status(); });

// ------------------------------------------------------------------------------------------------------------
$('#back').addEventListener('click', () => go(index - 1));
$('#next').addEventListener('click', () => go(index + 1));
addEventListener('hashchange', () => { const f = findLesson(location.hash); chapter = f.chapter; go(f.index); });
// Alt+← / Alt+→ go back and on (in the editor too).
addEventListener('keydown', (e) => {
  if (!e.altKey || e.ctrlKey || e.metaKey) return;
  if (e.key === 'ArrowRight' && index < chapter.lessons.length - 1) { e.preventDefault(); go(index + 1); }
  else if (e.key === 'ArrowLeft' && index > 0) { e.preventDefault(); go(index - 1); }
});

{
  const f = findLesson(location.hash || saved.last || '');
  chapter = f.chapter;
  setDrawer(saved.drawer ?? matchMedia('(min-width: 1280px)').matches, false);
  go(f.index, false);
}
