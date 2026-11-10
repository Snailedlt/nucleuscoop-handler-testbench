// The tutorial card (lessons in tutorial.ts): a small card over the code editor with the lesson, its task, a live
// tick when the task is done, and Show me / Back / Next. The lesson's code opens in its own "Tutorial" tab, so a
// draft is never touched; Check and Try it stay visible beside it. Nothing shows until it's started (the menu,
// the command palette, Getting started, the start page, or a #learn link). Progress is kept in this browser.
import { esc } from './dom';
import { testEvent } from './feedback';
import { LESSONS, NEXT_STEPS, type Lesson } from './tutorial';

const KEY = 'nucleus-workbench-tutorial';
interface Saved { i: number; done: string[] }
const load = (): Saved => {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (v && typeof v.i === 'number') return { i: Math.max(0, Math.min(LESSONS.length, v.i)), done: Array.isArray(v.done) ? v.done : [] };
  } catch { /* private mode */ }
  return { i: 0, done: [] };
};
const save = (s: Saved) => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* private mode */ } };
/** `code` and **bold** in the lesson texts. */
const inline = (t: string) => esc(t).replace(/``\s?(.+?)\s?``|`([^`]+)`/g, (_, a, b) => `<code>${a ?? b}</code>`).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

export interface TutorialDeps {
  editor: any;
  /** Opens the lesson's code in the Tutorial tab (or that tab, replacing its text). */
  open(text: string): void;
  /** True while the Tutorial tab is the one showing. */
  inTutorialTab(): boolean;
  /** Shows a results tab (Check or Try it). */
  showTab(id: 'check' | 'simulate'): void;
  /** Runs Try it again if it's showing (it runs on request, not on every edit). */
  rerun(): void;
}

export function initTutorial(deps: TutorialDeps) {
  const card = document.createElement('aside');
  card.id = 'tutorial';
  card.className = 'tut-card';
  card.setAttribute('aria-label', 'Tutorial');
  card.hidden = true;
  document.body.append(card);
  let state = load();
  let timer: ReturnType<typeof setTimeout> | undefined;
  let lastOk: boolean | undefined;
  // In the code editor's bottom-right corner (lessons are short, so that's below the code); docked at the bottom
  // of a narrow screen (CSS).
  const place = () => {
    if (card.hidden || matchMedia('(max-width: 860px)').matches) { card.style.left = card.style.top = ''; return; }
    const ed = document.querySelector('#editor')?.getBoundingClientRect();
    const w = card.offsetWidth || 380, h = card.offsetHeight || 300;
    const r = ed && ed.width > w + 40 ? ed : { right: innerWidth, bottom: innerHeight - 36 };
    card.style.left = `${Math.max(8, r.right - w - 18)}px`;
    card.style.top = `${Math.max(8, Math.min(r.bottom - h - 12, innerHeight - h - 8))}px`;
  };
  addEventListener('resize', place);

  const lesson = (): Lesson | undefined => LESSONS[state.i];
  const status = (l: Lesson) => (deps.inTutorialTab() ? l.check(deps.editor.getValue()) : 'Switch to the Tutorial tab to work on this lesson.');

  function render() {
    const l = lesson();
    const n = LESSONS.length;
    if (!l) {
      card.innerHTML = `<div class="tut-head"><strong>📘 Tutorial</strong><span class="muted">done</span><button type="button" class="btn icon tut-close" aria-label="Close the tutorial" title="Close">×</button></div>
        <h3 class="tut-title">You've written a handler 🎉</h3>
        <p>Each player gets their own window, size, number, mode and settings file. Where to go from here:</p>
        <ul>${NEXT_STEPS.map((s) => `<li>${inline(s)}</li>`).join('')}</ul>
        <div class="tut-acts"><button type="button" class="btn" data-tut="back">‹ Back</button><button type="button" class="btn" data-tut="restart">Start over</button><button type="button" class="btn primary" data-tut="close">Done</button></div>`;
      requestAnimationFrame(place);
      return;
    }
    const miss = status(l);
    const ok = miss === null;
    if (ok && !state.done.includes(l.id)) { state.done.push(l.id); save(state); testEvent('tutorial-done', l.id); }
    if (ok !== lastOk) { lastOk = ok; deps.rerun(); } // Try it shows what the tick is about
    card.innerHTML = `<div class="tut-head"><strong>📘 Tutorial</strong><span class="muted">${state.i + 1} of ${n}</span><button type="button" class="btn icon tut-close" aria-label="Close the tutorial" title="Close (your place is kept)">×</button></div>
      <div class="tut-bar" aria-hidden="true"><span style="width:${Math.round(((state.i + (ok ? 1 : 0)) / n) * 100)}%"></span></div>
      <h3 class="tut-title">${inline(l.title)}</h3>
      ${l.text.map((p) => `<p>${inline(p)}</p>`).join('')}
      <div class="tut-task${ok ? ' ok' : ''}" role="status"><strong>${ok ? '✓ Done.' : 'Your turn:'}</strong> ${ok ? 'Look at ' + (l.look === 'simulate' ? 'Try it' : 'Check') + ' to see what changed, then go on.' : inline(l.task)}${!ok && miss && miss !== l.task ? `<span class="tut-hint">${inline(miss)}</span>` : ''}</div>
      <div class="tut-acts">
        <button type="button" class="btn" data-tut="back"${state.i === 0 ? ' disabled' : ''}>‹ Back</button>
        ${ok ? '' : '<button type="button" class="btn" data-tut="show">Show me</button>'}
        ${l.look ? `<button type="button" class="link" data-tut="look">Open ${l.look === 'simulate' ? 'Try it' : 'Check'}</button>` : ''}
        <button type="button" class="btn${ok ? ' primary' : ''}" data-tut="next">${state.i === n - 1 ? 'Finish' : 'Next'} ›</button>
      </div>`;
    requestAnimationFrame(place);
  }

  function go(i: number, load = true) {
    state.i = Math.max(0, Math.min(LESSONS.length, i));
    save(state);
    const l = lesson();
    if (l && load) { deps.open(l.start); deps.rerun(); }
    lastOk = undefined;
    card.hidden = false;
    render();
    testEvent('tutorial', l ? l.id : 'finished');
  }

  card.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLElement>('[data-tut], .tut-close');
    if (!b) return;
    const what = b.classList.contains('tut-close') ? 'close' : b.dataset.tut;
    const l = lesson();
    if (what === 'close') { card.hidden = true; return; }
    if (what === 'next') go(state.i + 1);
    else if (what === 'back') go(state.i - 1);
    else if (what === 'restart') { state = { i: 0, done: [] }; go(0); }
    else if (what === 'show' && l) { deps.open(l.solution); deps.rerun(); testEvent('tutorial-show', l.id); }
    else if (what === 'look' && l?.look) deps.showTab(l.look);
    card.querySelector<HTMLElement>(`[data-tut="${what === 'show' ? 'next' : what}"]`)?.focus();
  });
  // The task's tick follows the code as it's typed (a pause first: the check runs Try it).
  deps.editor.on('change', () => {
    if (card.hidden) return;
    clearTimeout(timer);
    timer = setTimeout(render, 350);
  });

  return {
    /** Starts (or resumes) the tutorial; a lesson id or number picks the lesson. */
    start(which?: string) {
      const byId = which ? LESSONS.findIndex((l) => l.id === which || String(LESSONS.indexOf(l) + 1) === which) : -1;
      go(byId >= 0 ? byId : state.i >= LESSONS.length ? 0 : state.i);
    },
    /** The Tutorial tab came to the front or went away: the card follows. */
    refresh() { if (!card.hidden) render(); },
  };
}
