// The Learn page (learn/): a lesson on the left, its code on the right with the one result pane it needs (Check or
// Try it), Solve / Reset, Back / Next. Lessons are curated (lessons.ts): each starts from the code its author chose,
// never from the learner's last attempt. Edits are kept while the page is open, so Back shows your own code again.
// Links: learn/#<chapter>/<lesson>, kept for ever (lesson ids never change).
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import { hoverAt } from '@core/features';
import { lint, type Diagnostic } from '@core/lint';
import { zipBytes } from '@core/zipbytes';
import { md, esc } from '../dom';
import { hlHtml } from '../codehl';
import { CHAPTERS, findLesson, run, type Chapter, type Lesson, type NoteKind } from './lessons';

const KEY = 'nucleus-learn';
interface Saved { done: string[]; last?: string }
const load = (): Saved => {
  try { const v = JSON.parse(localStorage.getItem(KEY) || 'null'); if (v && Array.isArray(v.done)) return v; } catch { /* private mode */ }
  return { done: [] };
};
let saved = load();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch { /* private mode */ } };
const $ = <T extends HTMLElement = HTMLElement>(s: string) => document.querySelector(s) as T;
/** `code`, **bold** and [links](…) in the lesson texts, the code coloured. */
const inline = (t: string) => hlHtml(esc(t)
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  .replace(/(^|[\s(])\*([^*]+)\*(?=$|[\s.,)])/g, '$1<em>$2</em>')
  .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>'));
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
  extraKeys: { 'Ctrl-I': () => showDocsAtCursor(), Esc: () => hideTip(), Tab: (cm: any) => (cm.somethingSelected() ? cm.indentSelection('add') : cm.replaceSelection('  ')) },
} as any);

// ------------------------------------------------------------------------------------------------------------
// Docs on hover (and Ctrl+I at the cursor), from the same core the editors use.
const tip = $('#tip');
function hideTip() { tip.hidden = true; }
function showDocs(offset: number, x: number, y: number) {
  const h = hoverAt(editor.getValue(), offset);
  if (!h) return hideTip();
  tip.innerHTML = md(h.markdown);
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
// The result panes: Check (the problems) and Try it (what each player gets).
let marks: any[] = [];
function problems(text: string): Diagnostic[] {
  return lint(text).filter((d) => d.severity === 'error' || d.severity === 'warning');
}
function renderCheck(text: string) {
  const ds = problems(text);
  marks.forEach((m) => m.clear());
  marks = ds.map((d) => editor.markText(editor.posFromIndex(d.start), editor.posFromIndex(Math.max(d.end, d.start + 1)), { className: `sq-${d.severity}`, attributes: { title: d.message } }));
  if (lesson().pane !== 'check') return;
  $('#pane').innerHTML = `<h2 class="pane-title">Check</h2>${ds.length ? `<ul class="probs">${ds.map((d, i) => `<li class="prob ${d.severity}"><button type="button" class="link goto" data-i="${i}">Line ${editor.posFromIndex(d.start).line + 1}</button> <span class="sev">${d.severity === 'error' ? 'Error' : 'Warning'}</span> ${inline(d.message)} <a class="about" href="../rules/${encodeURIComponent(d.rule)}/" target="_blank" rel="noopener">About this check</a></li>`).join('')}</ul>` : '<p class="ok-line">✓ No problems: Nucleus can load this handler.</p>'}`;
  $('#pane').querySelectorAll<HTMLElement>('.goto').forEach((b) => b.addEventListener('click', () => {
    const d = ds[Number(b.dataset.i)];
    editor.focus();
    editor.setCursor(editor.posFromIndex(d.start));
  }));
}
function renderTryIt(text: string) {
  if (lesson().pane !== 'tryit') return;
  const r = run(text);
  let body: string;
  if (!r.loaded) body = `<p class="bad-line">The handler doesn't load: ${esc(r.loadError ?? 'see the problem marked in the code')}</p>`;
  else body = `<div class="players">${r.players.map((p, i) => `<section class="player"><h3>Player ${i + 1} <span class="muted">· ${i === 0 ? 'keyboard &amp; mouse' : 'controller'}</span></h3><p class="muted">Window: ${esc(p.window)}</p>${p.error ? `<p class="bad-line">${esc(p.error)}</p>` : ''}${p.effects.length ? `<ul>${p.effects.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>` : '<p class="muted">Game.Play changes nothing yet.</p>'}</section>`).join('')}</div>${r.sessionEnded ? `<p class="bad-line">${esc(r.sessionEnded.reason)}</p>` : ''}`;
  $('#pane').innerHTML = `<h2 class="pane-title">Try it <span class="muted">· 2 players, run in your browser</span></h2>${body}`;
}

// ------------------------------------------------------------------------------------------------------------
// The lesson.
let checkTimer: ReturnType<typeof setTimeout> | undefined;
/** The learner has typed in this lesson (hints only show after that). */
let touched = false;
function status() {
  const l = lesson();
  if (l.kind !== 'code' || !l.check) return;
  const text = editor.getValue();
  renderCheck(text);
  renderTryIt(text);
  const miss = l.check(text);
  const ok = miss === null;
  if (ok && !saved.done.includes(keyOf(l))) { saved.done.push(keyOf(l)); save(); testEvent('done', l.id); }
  const task = $('#task');
  task.classList.toggle('ok', ok);
  task.innerHTML = ok
    ? `<strong>✓ Done.</strong> ${l.pane === 'tryit' ? 'Look at what each player gets in Try it, then go on.' : 'Go on when you\'re ready.'}`
    : `<strong>Your turn:</strong> ${inline(l.task!)}${miss && touched ? `<span class="hint">${inline(miss)}</span>` : ''}`;
  $('#next').classList.toggle('primary', ok);
}
editor.on('change', (_cm: any, ch: any) => {
  const l = lesson();
  if (ch?.origin !== 'setValue') touched = true;
  if (l.kind === 'code') edits.set(keyOf(l), editor.getValue());
  clearTimeout(checkTimer);
  checkTimer = setTimeout(status, 300);
});

function download(kind: 'js' | 'zip', code: string) {
  const data = new TextEncoder().encode(code.replace(/\r?\n/g, '\r\n'));
  const blob = kind === 'js' ? new Blob([data], { type: 'text/javascript' }) : new Blob([zipBytes([{ name: 'handler.js', data }]) as BlobPart], { type: 'application/zip' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = kind === 'js' ? 'SRB2 Tutorial.js' : 'SRB2 Tutorial.zip';
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  testEvent('download', kind);
}

function renderLesson(focus = false) {
  const l = lesson();
  const n = chapter.lessons.length;
  hideTip();
  touched = false;
  document.title = `${l.title} · ${chapter.title} · Learn`;
  $('#chapter-title').textContent = chapter.title;
  $('#count').textContent = `${index + 1} of ${n}`;
  $('#bar').style.width = `${Math.round(((index + 1) / n) * 100)}%`;
  const notes = (l.notes ?? []).map((x) => `<div class="note ${x.kind}"><strong>${NOTE[x.kind]}</strong> ${inline(x.text)}</div>`).join('');
  const steps = l.steps ? `<ol class="steps">${l.steps.map((s, i) => `<li><label><input type="checkbox" data-step="${i}"> <span>${inline(s)}</span></label></li>`).join('')}</ol>` : '';
  const dl = l.download ? `<p><button type="button" class="btn primary" id="download">${l.download === 'js' ? '⬇ Download SRB2 Tutorial.js' : '⬇ Download SRB2 Tutorial.zip'}</button></p>` : '';
  const ask = l.ask ? `<fieldset class="ask"><legend>${inline(l.ask.question)}</legend>${l.ask.answers.map((a, i) => `<label><input type="radio" name="ask" value="${i}"> ${inline(a.label)}</label>`).join('')}<p class="ask-reply" role="status"></p></fieldset>` : '';
  $('#lesson-body').innerHTML = `<h1 id="lesson-title" tabindex="-1">${inline(l.title)}</h1>${l.text.map((p) => `<p>${inline(p)}</p>`).join('')}${steps}${dl}${ask}${l.kind === 'code' ? '<div id="task" class="task" role="status"></div>' : ''}${notes}${index === n - 1 ? `<div class="end"><h2>You've made a handler 🎉</h2><p>Each player gets their own folder, window, controller and settings, and nobody pauses. More chapters are on the way: finding out what a game needs, the tools, Proto Input, emulators, and more.</p><p><a class="btn" href="../">Open the workbench</a></p></div>` : ''}`;
  $('#back').toggleAttribute('disabled', index === 0);
  $('#next').textContent = index === n - 1 ? 'All lessons' : l.kind === 'intro' ? 'Start ›' : 'Next ›';
  $('#next').classList.toggle('primary', l.kind !== 'code');
  // The right side: the code (code and test lessons) or the scene (intro).
  const code = l.kind !== 'intro';
  $('#work').hidden = !code;
  $('#scene').hidden = code;
  if (code) {
    $('#solve').hidden = $('#reset').hidden = l.kind !== 'code';
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
      // The cursor where the new lines go: the end, or the empty slot in a list.
      editor.setCursor({ line: Math.max(0, editor.lineCount() - 1), ch: 0 });
      const blank = editor.getValue().indexOf('[\n    \n');
      if (blank >= 0) editor.setCursor(editor.posFromIndex(blank + 6));
    } else {
      marks.forEach((m) => m.clear());
    }
    // The new part in view (the code grows past the screen).
    requestAnimationFrame(() => { editor.refresh(); editor.scrollIntoView(editor.getCursor(), 120); });
  } else scene.reset();
  $('#lesson-body').querySelector<HTMLButtonElement>('#download')?.addEventListener('click', () => download(l.download!, editor.getValue()));
  $('#lesson-body').querySelectorAll<HTMLInputElement>('input[name=ask]').forEach((r) => r.addEventListener('change', () => {
    const a = l.ask!.answers[Number(r.value)];
    $('#lesson-body').querySelector('.ask-reply')!.innerHTML = inline(a.reply);
    testEvent('answer', `${l.id}-${r.value}`);
  }));
  renderMenu();
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
}

// ------------------------------------------------------------------------------------------------------------
// The lesson list (the chapter's lessons, the done ones ticked).
function renderMenu() {
  $('#menu-list').innerHTML = CHAPTERS.map((c) => `<li><strong>${esc(c.title)}</strong><ol>${c.lessons.map((l, i) => `<li><a href="#${c.id}/${l.id}"${c === chapter && i === index ? ' aria-current="page"' : ''}>${saved.done.includes(`${c.id}/${l.id}`) ? '<span class="tick" aria-label="done">✓</span>' : '<span class="tick" aria-hidden="true"></span>'}${esc(l.title)}</a></li>`).join('')}</ol></li>`).join('');
}
const menu = $('#menu') as HTMLDialogElement;
$('#menu-open').addEventListener('click', () => { renderMenu(); menu.showModal(); menu.querySelector<HTMLElement>('[aria-current]')?.focus(); });
menu.addEventListener('click', (e) => { if (e.target === menu || (e.target as HTMLElement).closest('a, .close')) menu.close(); });

// ------------------------------------------------------------------------------------------------------------
// The first lesson's scene: what happens when you start a game twice, one step at a time.
const scene = (() => {
  const el = $('#scene');
  const STEPS = [
    { say: 'This is Sonic Robo Blast 2 on your PC: one copy, one window, one player.', act: 'Start a second copy' },
    { say: 'Both copies want the whole screen, so one hides the other. They read and write the same settings file, and both listen to every controller.', act: 'Click the second window' },
    { say: 'Now the first one is behind. Games often pause when they\'re not the window in front, so player 1 is stuck.', act: 'Let Nucleus Co-op handle it' },
    { say: 'Nucleus gives each copy its own folder, puts each window on its part of the screen, gives each its own controller, and keeps them all running. The **handler** is what tells it how, for one game.', act: '' },
  ];
  let step = 0;
  function draw() {
    const s = STEPS[step];
    el.dataset.step = String(step);
    el.innerHTML = `<div class="stage" aria-hidden="true">
        <div class="win w1${step === 2 ? ' paused' : ''}"><div class="wt">SRB2</div><div class="wb">${step === 2 ? '<span class="pause">Focus lost</span>' : '<span class="run">▶</span>'}</div><div class="who">${step === 3 ? 'Player 1 · 🎮 1 · Instance0' : 'Player 1'}</div></div>
        ${step >= 1 ? `<div class="win w2"><div class="wt">SRB2</div><div class="wb"><span class="run">▶</span></div><div class="who">${step === 3 ? 'Player 2 · 🎮 2 · Instance1' : 'Player 2?'}</div></div>` : ''}
      </div>
      <p class="say" role="status">${inline(s.say)}</p>
      ${step === 3 ? `<ul class="fixes">${[['A folder for each player', 'folders'], ['Files each player writes', 'copies'], ['Finding the windows', 'windows'], ['Every window in focus', 'focus'], ['One controller each', 'controllers']].map(([t, id], i) => `<li style="--i:${i}"><a href="#${chapter.id}/${id}">${t}</a></li>`).join('')}</ul><p>You'll write one for Sonic Robo Blast 2, a free game, a few lines at a time, and test it in Nucleus Co-op. All you need for now is this page.</p>` : ''}
      <p class="scene-acts">${step > 0 ? '<button type="button" class="btn" data-scene="again">Start over</button>' : ''}${s.act ? `<button type="button" class="btn primary" data-scene="next">${s.act}</button>` : '<button type="button" class="btn primary" data-scene="go">Start lesson 1 ›</button>'}</p>`;
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
$('#back').addEventListener('click', () => go(index - 1));
$('#next').addEventListener('click', () => (index === chapter.lessons.length - 1 ? $('#menu-open').click() : go(index + 1)));
$('#solve').addEventListener('click', () => { editor.setValue(lesson().solution); testEvent('solve', lesson().id); $('#next').focus(); });
$('#reset').addEventListener('click', () => { editor.setValue(lesson().start); editor.focus(); });
addEventListener('hashchange', () => { const f = findLesson(location.hash); chapter = f.chapter; go(f.index); });
// Alt+← / Alt+→ go back and on (in the editor too).
addEventListener('keydown', (e) => {
  if (!e.altKey || e.ctrlKey || e.metaKey) return;
  if (e.key === 'ArrowRight') { e.preventDefault(); $('#next').click(); }
  else if (e.key === 'ArrowLeft' && index > 0) { e.preventDefault(); go(index - 1); }
});

{
  const f = findLesson(location.hash || saved.last || '');
  chapter = f.chapter;
  go(f.index, false);
}
