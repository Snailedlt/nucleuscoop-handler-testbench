// The tasks a tester pinned from "Help test this beta", in a small window that floats over the workbench while they
// test: what to try and what to look for, the Tried tick, and Report. Only there while something is pinned (help on
// request). Drag it by its header (or focus the header's move handle and use the arrow keys); collapse it to its
// header; it remembers where it was. On a narrow screen it docks at the bottom instead.
import { esc, narrow, onNarrowChange } from './dom';
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
  let open = new Set<string>(); // tasks shown in full (the first pinned one, until you choose)

  const place = () => {
    if (narrow()) { box.style.left = box.style.top = ''; return; } // docked at the bottom (CSS)
    const w = box.offsetWidth || 340, h = box.offsetHeight || 120;
    if (pos.x < 0) pos = { ...pos, x: innerWidth - w - 16, y: innerHeight - Math.min(h, innerHeight * 0.5) - 48 };
    pos.x = Math.max(8, Math.min(pos.x, innerWidth - w - 8));
    pos.y = Math.max(8, Math.min(pos.y, innerHeight - 44));
    box.style.left = `${pos.x}px`;
    box.style.top = `${pos.y}px`;
  };

  const render = () => {
    const items = pinned().map((id) => TEST_PLAN.find((t) => t.id === id)).filter((t): t is TestItem => !!t);
    box.hidden = !items.length;
    if (!items.length) return;
    if (!open.size) open = new Set([items[0].id]);
    const left = items.filter((t) => !isDone(t.id)).length;
    box.classList.toggle('collapsed', pos.collapsed);
    box.innerHTML = `<div class="tf-head">
        <button type="button" class="tf-grip" aria-label="Move the pinned tasks (arrow keys)" title="Drag to move (or focus and use the arrow keys)"><svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M4 2h.01M8 2h.01M4 6h.01M8 6h.01M4 10h.01M8 10h.01" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button>
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
    if (tog) { const id = tog.dataset.toggle!; open.has(id) ? open.delete(id) : open.add(id); render(); box.querySelector<HTMLElement>(`[data-toggle="${id}"]`)?.focus(); return; }
    const un = el.closest<HTMLElement>('[data-unpin]');
    if (un) { open.delete(un.dataset.unpin!); setPinned(un.dataset.unpin!, false); box.querySelector<HTMLElement>('.tf-name, .tf-all')?.focus(); return; }
    const rep = el.closest<HTMLAnchorElement>('a[data-report]');
    const t = rep && TEST_PLAN.find((x) => x.id === rep.dataset.report);
    if (rep && t) rep.href = report(t); // the details filled in now, not when it was drawn
    if (el.closest('.tf-fold')) { pos = { ...pos, collapsed: !pos.collapsed }; savePos(pos); render(); box.querySelector<HTMLElement>('.tf-fold')?.focus(); }
    if (el.closest('.tf-all')) openGuide();
  });
  // Moving it: drag the header (not its buttons), or the arrow keys on the handle.
  box.addEventListener('pointerdown', (e) => {
    const head = (e.target as HTMLElement).closest('.tf-head');
    if (!head || narrow() || (e.target as HTMLElement).closest('button:not(.tf-grip)')) return;
    e.preventDefault();
    const sx = e.clientX - pos.x, sy = e.clientY - pos.y;
    const move = (m: PointerEvent) => { pos = { ...pos, x: m.clientX - sx, y: m.clientY - sy }; place(); };
    const up = () => { removeEventListener('pointermove', move); removeEventListener('pointerup', up); savePos(pos); };
    addEventListener('pointermove', move);
    addEventListener('pointerup', up);
  });
  box.addEventListener('keydown', (e) => {
    if (!(e.target as HTMLElement).closest('.tf-grip') || narrow()) return;
    const step = e.shiftKey ? 64 : 16;
    const d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
    if (!d) return;
    e.preventDefault();
    pos = { ...pos, x: pos.x + d[0], y: pos.y + d[1] };
    place();
    savePos(pos);
  });
  addEventListener('resize', place);
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
