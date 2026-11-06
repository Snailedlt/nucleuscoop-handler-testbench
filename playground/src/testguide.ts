// "Help test this beta" (testplan.ts): what to try, filtered by who you are, with the kind of testing each needs, a
// "Tried it" tick kept in this browser, and a Report link that opens the tester feedback form filled in.
import { BETA, KINDS, TEST_PLAN, WHO, type Who } from './testplan';

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const DONE_KEY = 'nucleus-workbench-tested';
const WHO_KEY = 'nucleus-workbench-tester';
const get = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } };
const set = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } };
const report = (title: string) => `https://github.com/Snailedlt/splitscreenme-vscode/issues/new?template=tester-feedback.yml&title=${encodeURIComponent(`Beta test: ${title}`)}&version=workbench`;

export function initTestGuide(dlg: HTMLDialogElement, openers: HTMLElement[]) {
  if (!BETA) { openers.forEach((o) => o.remove()); dlg.remove(); return { open: () => {} }; }
  const done = new Set<string>(JSON.parse(get(DONE_KEY) || '[]'));
  let who = (get(WHO_KEY) as Who) || 'everyone';
  const body = dlg.querySelector<HTMLElement>('#test-body')!;
  const draw = () => {
    const items = TEST_PLAN.filter((t) => who === 'everyone' || t.who.includes(who) || t.who.includes('everyone'));
    const n = items.filter((t) => done.has(t.id)).length;
    body.innerHTML = `<div class="tg-who" role="radiogroup" aria-label="I am">${(Object.keys(WHO) as Who[]).map((w) => `<button type="button" role="radio" aria-checked="${w === who}" data-who="${w}">${esc(w === 'everyone' ? 'Show all' : WHO[w])}</button>`).join('')}</div>
      <p class="muted small tg-count">${n} of ${items.length} tried</p>
      <ol class="tg-list">${items.map((t) => `<li class="tg-item${done.has(t.id) ? ' done' : ''}">
        <label class="tg-done"><input type="checkbox" data-id="${t.id}"${done.has(t.id) ? ' checked' : ''}> <span class="sr-only">Tried: </span></label>
        <div><div class="tg-title"><strong>${esc(t.title)}</strong>${t.kinds.map((k) => `<span class="tg-kind k-${k}" title="${esc(KINDS[k].how)}">${esc(KINDS[k].label)}</span>`).join('')}${t.who.filter((w) => w !== 'everyone').map((w) => `<span class="tg-for">${esc(WHO[w])}</span>`).join('')}</div>
        <p><span class="muted">Try:</span> ${esc(t.steps)}</p><p><span class="muted">Look for:</span> ${esc(t.look)}</p>
        <a class="small" href="${report(t.title)}" target="_blank" rel="noopener">Report what you found</a></div></li>`).join('')}</ol>
      <details class="tg-legend"><summary>Kinds of testing</summary><dl>${Object.values(KINDS).map((k) => `<dt>${esc(k.label)}</dt><dd>${esc(k.how)}</dd>`).join('')}</dl></details>`;
    body.querySelectorAll<HTMLButtonElement>('[data-who]').forEach((b) => b.addEventListener('click', () => { who = b.dataset.who as Who; set(WHO_KEY, who); draw(); body.querySelector<HTMLElement>(`[data-who="${who}"]`)?.focus(); }));
    body.querySelectorAll<HTMLInputElement>('input[data-id]').forEach((c) => c.addEventListener('change', () => {
      c.checked ? done.add(c.dataset.id!) : done.delete(c.dataset.id!);
      set(DONE_KEY, JSON.stringify([...done]));
      c.closest('.tg-item')!.classList.toggle('done', c.checked);
      body.querySelector('.tg-count')!.textContent = `${items.filter((t) => done.has(t.id)).length} of ${items.length} tried`;
    }));
  };
  const open = () => { draw(); dlg.showModal(); };
  openers.forEach((o) => o.addEventListener('click', open));
  dlg.querySelector('#test-close')!.addEventListener('click', () => dlg.close());
  return { open };
}
