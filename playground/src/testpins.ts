// The tasks a tester pinned from "Help test this beta", in a small window that floats over the workbench while they
// test: what to try and what to look for, the Tried tick, and Report. Only there while something is pinned (help on
// request). Drag it by its header (or focus the header's move handle and use the arrow keys); collapse it to its
// header; it remembers where it was. On a narrow screen it docks at the bottom instead.
import { esc, narrow, onNarrowChange } from './dom';
import { testEvent } from './feedback';
import { feedbackUrl } from './report';
import { BETA, TEST_PLAN, type TestItem } from './testplan';
import { isDone, onProgress, pinned, setDone, setPinned } from './testprogress';

const POS_KEY = 'nucleus-workbench-test-pins-pos';
interface Pos { x: number; y: number; collapsed: boolean }
const loadPos = (): Pos | null => { try { const p = JSON.parse(localStorage.getItem(POS_KEY) || 'null'); return p && typeof p.x === 'number' && typeof p.y === 'number' ? p : null; } catch { return null; } };
const savePos = (p: Pos) => { try { localStorage.setItem(POS_KEY, JSON.stringify(p)); } catch { /* private mode */ } };
const report = (t: TestItem) => feedbackUrl({ title: `Beta test: ${t.title}`, test: t.id });

export function initTestPins(openGuide: () => void) {
  if (!BETA) return;
  const box = document.createElement('aside');
  box.id = 'test-pins';
  box.className = 'tg-float';
  box.setAttribute('aria-label', 'Pinned test tasks');
  box.hidden = true;
  document.body.append(box);
  let pos: Pos = loadPos() ?? { x: -1, y: -1, collapsed: false };
  let open = new Set<string>(); // tasks shown in full (a lone pinned task, or the ones you open)
  let chosen = false; // once you open or close one yourself, nothing opens on its own

  // Until it's moved (x < 0), it sits in the code editor's bottom-right corner: past the end of most lines and below
  // the code, so it covers no problems, buttons or results, and it follows that corner when the layout changes.
  const where = () => {
    const w = box.offsetWidth || 340, h = box.offsetHeight || 120;
    let { x, y } = pos;
    if (x < 0) {
      const ed = document.querySelector('#editor')?.getBoundingClientRect();
      const r = ed && ed.width > w + 40 && ed.height > 120 ? ed : { right: innerWidth, bottom: innerHeight - 36 };
      x = r.right - w - 18; // clear of the scroll bar
      y = r.bottom - h - 12;
    }
    return { x: Math.max(8, Math.min(x, innerWidth - w - 8)), y: Math.max(8, Math.min(y, innerHeight - 44)) };
  };
  const place = () => {
    if (narrow()) { box.style.left = box.style.top = ''; return; } // docked at the bottom (CSS)
    const { x, y } = where();
    box.style.left = `${x}px`;
    box.style.top = `${y}px`;
  };

  const render = () => {
    const items = pinned().map((id) => TEST_PLAN.find((t) => t.id === id)).filter((t): t is TestItem => !!t);
    box.hidden = !items.length;
    if (!items.length) return;
    if (!chosen && !open.size && items.length === 1) open = new Set([items[0].id]); // one task: what to try at once; more: their names (short)
    const left = items.filter((t) => !isDone(t.id)).length;
    box.classList.toggle('collapsed', pos.collapsed);
    box.innerHTML = `<div class="tf-head">
        <button type="button" class="tf-grip" aria-label="Move the pinned tasks (arrow keys)" title="Drag to move (or focus and use the arrow keys). Double-click: back to the corner"><svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M4 2h.01M8 2h.01M4 6h.01M8 6h.01M4 10h.01M8 10h.01" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button>
        <strong class="tf-title">🧪 Testing <span class="muted">${left ? `${left} to try` : 'all tried'}</span></strong>
        <button type="button" class="btn icon tf-all" title="All tasks (Help test the beta)" aria-label="All tasks">☰</button>
        <button type="button" class="btn icon tf-fold" aria-expanded="${!pos.collapsed}" aria-label="${pos.collapsed ? 'Show the tasks' : 'Collapse'}" title="${pos.collapsed ? 'Show' : 'Collapse'}">${pos.collapsed ? '▴' : '▾'}</button>
      </div>
      <ol class="tf-list"${pos.collapsed ? ' hidden' : ''}>${items.map((t) => `<li class="tf-item${isDone(t.id) ? ' done' : ''}">
        <div class="tf-row"><label class="tf-done"><input type="checkbox" data-done="${t.id}"${isDone(t.id) ? ' checked' : ''}><span class="sr-only">Tried: </span></label>
          <button type="button" class="tf-name" data-toggle="${t.id}" aria-expanded="${open.has(t.id)}">${esc(t.title)}</button>
          <button type="button" class="btn icon tf-unpin" data-unpin="${t.id}" aria-label="Unpin ${esc(t.title)}" title="Unpin">×</button></div>
        <div class="tf-body"${open.has(t.id) ? '' : ' hidden'}><p><span class="muted">Try:</span> ${esc(t.steps)}</p><p><span class="muted">Look for:</span> ${esc(t.look)}</p>
          <a class="small" data-report="${t.id}" href="${esc(report(t))}" target="_blank" rel="noopener">Report what you found</a></div></li>`).join('')}</ol>`;
    place();
  };

  box.addEventListener('change', (e) => {
    const cb = (e.target as HTMLElement).closest<HTMLInputElement>('input[data-done]');
    if (cb) setDone(cb.dataset.done!, cb.checked);
  });
  box.addEventListener('click', (e) => {
    const el = e.target as HTMLElement;
    const tog = el.closest<HTMLElement>('[data-toggle]');
    if (tog) { const id = tog.dataset.toggle!; chosen = true; open.has(id) ? open.delete(id) : (open.add(id), testEvent('view', id)); render(); box.querySelector<HTMLElement>(`[data-toggle="${id}"]`)?.focus(); return; }
    const un = el.closest<HTMLElement>('[data-unpin]');
    if (un) { open.delete(un.dataset.unpin!); setPinned(un.dataset.unpin!, false); box.querySelector<HTMLElement>('.tf-name, .tf-all')?.focus(); return; }
    const rep = el.closest<HTMLAnchorElement>('a[data-report]');
    const t = rep && TEST_PLAN.find((x) => x.id === rep.dataset.report);
    if (rep && t) { rep.href = report(t); testEvent('report', t.id); } // the details filled in now, not when it was drawn
    if (el.closest('.tf-fold')) { pos = { ...pos, collapsed: !pos.collapsed }; testEvent(pos.collapsed ? 'pins-collapse' : 'pins-expand'); savePos(pos); render(); box.querySelector<HTMLElement>('.tf-fold')?.focus(); }
    if (el.closest('.tf-all')) { testEvent('pins-all'); openGuide(); }
  });
  // Moving it: drag the header (not its buttons), or the arrow keys on the handle.
  box.addEventListener('pointerdown', (e) => {
    const head = (e.target as HTMLElement).closest('.tf-head');
    if (!head || narrow() || (e.target as HTMLElement).closest('button:not(.tf-grip)')) return;
    e.preventDefault();
    pos = { ...pos, ...where() }; // from here on, where you put it
    const sx = e.clientX - pos.x, sy = e.clientY - pos.y;
    const move = (m: PointerEvent) => { pos = { ...pos, x: m.clientX - sx, y: m.clientY - sy }; place(); };
    const up = () => { removeEventListener('pointermove', move); removeEventListener('pointerup', up); savePos(pos); testEvent('pins-move'); };
    addEventListener('pointermove', move);
    addEventListener('pointerup', up);
  });
  box.addEventListener('keydown', (e) => {
    if (!(e.target as HTMLElement).closest('.tf-grip') || narrow()) return;
    const step = e.shiftKey ? 64 : 16;
    const d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
    if (!d) return;
    e.preventDefault();
    const at = where();
    pos = { ...pos, x: at.x + d[0], y: at.y + d[1] };
    place();
    savePos(pos);
    testEvent('pins-move');
  });
  // Double-click the header: back to the editor's corner.
  box.addEventListener('dblclick', (e) => {
    if (!(e.target as HTMLElement).closest('.tf-head') || (e.target as HTMLElement).closest('button:not(.tf-grip)')) return;
    pos = { ...pos, x: -1, y: -1 };
    savePos(pos);
    testEvent('pins-reset');
    place();
  });
  addEventListener('resize', place);
  // The editor's corner moves when panes are resized or toggled (Files, Lines, Form): follow it while not moved.
  const ed = document.querySelector('#editor');
  if (ed && typeof ResizeObserver !== 'undefined') new ResizeObserver(() => { if (pos.x < 0 && !box.hidden) place(); }).observe(ed);
  onNarrowChange(place);
  // Re-drawn on every change (here or in the guide): keep the keyboard focus on the same control.
  onProgress(() => {
    const a = document.activeElement as HTMLElement | null;
    const key = a && box.contains(a) ? ['done', 'toggle', 'unpin'].map((k) => a.dataset[k] && `[data-${k}="${a.dataset[k]}"]`).find(Boolean) : undefined;
    render();
    if (key) box.querySelector<HTMLElement>(key)?.focus();
  });
  render();
}
