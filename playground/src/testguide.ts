// "Help test this beta" (testplan.ts). During the beta it's the first thing a new visitor sees:
//   1. Two questions (how much you code, how well you know Nucleus' handler API), as big choices. The dialog can't be
//      closed until both are answered.
//   2. Then "Recommended for you": the items that fit you, quick and much-needed first (testplan.ts PRIORITY), and
//      "Everything else". Your answers stay shown at the top, and Change brings the questions back.
// Each item has what to try, what to look for, a "Tried it" tick kept in this browser, and a Report link that opens
// the tester feedback form filled in (report.ts).
import { mascot } from './mascots';
import { appNote, feedbackUrl } from './report';
import { testEvent, totalsUrl } from './feedback';
import { AREAS, BETA, EFFORT, fit, KINDS, priority, TEST_PLAN, type Coding, type NucleusKnow, type Profile, type TestItem } from './testplan';
import { isDone, isPinned, onProgress, pinned, setDone, setPinned } from './testprogress';

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const PROFILE_KEY = 'nucleus-workbench-tester-profile';
const get = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } };
const set = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } };
// Filled in when clicked, so the details are current (report.ts).
const report = (t: TestItem) => feedbackUrl({ title: `Beta test: ${t.title}`, test: t.id });

const CODING: { v: Coding; icon: string; label: string; sub: string }[] = [
  { v: 'new', icon: '🌱', label: 'New to coding', sub: "I don't write code, or only a little" },
  { v: 'dev', icon: '⌨️', label: 'I write code', sub: 'JavaScript or another language' },
];
const NUCLEUS: { v: NucleusKnow; icon: string; label: string; sub: string }[] = [
  { v: 'new', icon: '👋', label: 'New to it', sub: "I haven't made a handler" },
  { v: 'some', icon: '🛠️', label: 'Made a few', sub: 'I have written or fixed handlers' },
  { v: 'expert', icon: '🎓', label: 'Know the API well', sub: 'I know what Nucleus does with each option' },
];
export const testerProfile = (): Profile | null => { try { return JSON.parse(get(PROFILE_KEY) || 'null'); } catch { return null; } };

export function initTestGuide(dlg: HTMLDialogElement, openers: HTMLElement[], hooks: { answered?: (p: Profile, first: boolean) => void } = {}) {
  if (!BETA) { openers.forEach((o) => o.remove()); dlg.remove(); return { open: () => {}, needed: () => false }; }
  let profile: Profile | null = testerProfile();
  let asking = !profile; // the questions are showing
  let pending: Partial<Profile> = { ...(profile ?? {}) };
  const body = dlg.querySelector<HTMLElement>('#test-body')!;
  const closeBtn = dlg.querySelector<HTMLButtonElement>('#test-close')!;
  const intro = dlg.querySelector<HTMLElement>('#test-intro')!;
  const score = (t: TestItem, p: Profile) => Math.max(...t.areas.map((a) => fit(a, p)));

  const item = (t: TestItem) => {
    const e = EFFORT[priority(t).effort];
    const pin = isPinned(t.id);
    return `<li class="tg-item${isDone(t.id) ? ' done' : ''}">
    <label class="tg-done"><input type="checkbox" data-id="${t.id}"${isDone(t.id) ? ' checked' : ''}><span class="sr-only">Tried: ${esc(t.title)}</span></label>
    <div><div class="tg-title"><strong>${esc(t.title)}</strong><span class="tg-time" title="${esc(e.how)}">${esc(e.label)}</span>${priority(t).need === 3 ? '<span class="tg-need" title="We need this one most">Much needed</span>' : ''}${t.areas.map((a) => `<span class="tg-area a-${a}" title="${esc(AREAS[a].who)}">${esc(AREAS[a].label)}</span>`).join('')}${t.kinds.map((k) => `<span class="tg-kind" title="${esc(KINDS[k].how)}">${esc(KINDS[k].label)}</span>`).join('')}</div>
    <p><span class="muted">Try:</span> ${esc(t.steps)}</p><p><span class="muted">Look for:</span> ${esc(t.look)}</p>
    <div class="tg-acts"><a class="small tg-report" data-id="${t.id}" href="${esc(report(t))}" target="_blank" rel="noopener">Report what you found</a>
    <button type="button" class="link small tg-pin" data-pin="${t.id}" aria-pressed="${pin}" title="Keep it in a small window over the workbench while you test">${pin ? '📌 Pinned' : '📌 Pin while testing'}</button></div></div></li>`;
  };

  const choice = (q: string, legend: string, opts: { v: string; icon: string; label: string; sub: string }[]) =>
    `<fieldset class="tg-q"><legend>${legend}</legend><div class="tg-cards">${opts.map((o) => `<label class="tg-card"><input type="radio" name="tg-${q}" value="${o.v}" data-q="${q}"${(pending as any)[q] === o.v ? ' checked' : ''}><span class="tg-ic" aria-hidden="true">${o.icon}</span><span class="tg-cl"><b>${esc(o.label)}</b><small>${esc(o.sub)}</small></span></label>`).join('')}</div></fieldset>`;

  const ask = () => {
    intro.hidden = true;
    dlg.classList.add('tg-asking');
    body.innerHTML = `<div class="tg-ask">${mascot('n-idle', { size: 64, zoom: 1.15 })}<div><p class="tg-hello"><b>Thanks for helping test this beta!</b> Two quick questions, so we can show what fits you best.</p></div></div>
      ${choice('coding', '1. How much do you code?', CODING)}
      ${choice('nucleus', '2. How well do you know Nucleus Co-op handlers?', NUCLEUS)}
      <div class="tg-go"><span class="muted small" id="tg-need">${pending.coding && pending.nucleus ? '' : 'Answer both to continue.'}</span><button class="btn primary" type="button" id="tg-show"${pending.coding && pending.nucleus ? '' : ' disabled'}>Show what to test</button></div>`;
    body.querySelectorAll<HTMLInputElement>('input[data-q]').forEach((r) => r.addEventListener('change', () => {
      (pending as any)[r.dataset.q!] = r.value;
      const ok = !!(pending.coding && pending.nucleus);
      (body.querySelector('#tg-show') as HTMLButtonElement).disabled = !ok;
      body.querySelector('#tg-need')!.textContent = ok ? '' : 'Answer both to continue.';
    }));
    body.querySelector('#tg-show')!.addEventListener('click', () => {
      const first = !profile;
      profile = pending as Profile;
      set(PROFILE_KEY, JSON.stringify(profile));
      asking = false;
      testEvent('profile', `${profile.coding}-${profile.nucleus}`); // how much testers code and know Nucleus: two picks, nothing else
      hooks.answered?.(profile, first);
      list();
      body.querySelector<HTMLElement>('.tg-h')?.focus();
    });
    closeBtn.hidden = !profile; // can't leave the first time without answering
  };

  const list = () => {
    const p = profile!;
    intro.hidden = false;
    dlg.classList.remove('tg-asking');
    // Recommended: what fits you; quick and much-needed first. The rest by fit.
    const rank = (t: TestItem) => priority(t).need * 2 - priority(t).effort + score(t, p) * 0.5;
    const mine = TEST_PLAN.filter((t) => score(t, p) >= 3).sort((a, z) => rank(z) - rank(a));
    const rest = TEST_PLAN.filter((t) => score(t, p) < 3).sort((a, z) => score(z, p) - score(a, p) || rank(z) - rank(a));
    const tried = mine.filter((t) => isDone(t.id)).length;
    const c = CODING.find((o) => o.v === p.coding)!, n = NUCLEUS.find((o) => o.v === p.nucleus)!;
    body.innerHTML = `<div class="tg-you"><span>You: <b>${c.icon} ${esc(c.label)}</b> · <b>${n.icon} ${esc(n.label)}</b></span><button class="link" type="button" id="tg-change">Change</button></div>${appNote() ? `<p class="small">${appNote()}</p>` : ''}
      <div id="tg-pinned"></div>
      <h3 class="tg-h" tabindex="-1">Recommended for you <span class="muted">· quickest and most needed first · ${tried} of ${mine.length} tried</span></h3>
      <ol class="tg-list">${mine.map(item).join('')}</ol>
      <details class="tg-more"><summary>Everything else (${rest.length})</summary><ol class="tg-list">${rest.map(item).join('')}</ol></details>
      ${totalsUrl() ? `<p class="muted small tg-totals">Your 👍 and 👎 on tips and docs count (anonymously): <a href="${esc(totalsUrl()!)}" target="_blank" rel="noopener">see the totals</a>.</p>` : ''}
      <details class="tg-legend"><summary>What the labels mean</summary><dl>${Object.values(EFFORT).map((e) => `<dt>${esc(e.label)}</dt><dd>${esc(e.how)}</dd>`).join('')}${Object.values(AREAS).map((a) => `<dt>${esc(a.label)}</dt><dd>${esc(a.who)}</dd>`).join('')}${Object.values(KINDS).map((k) => `<dt>${esc(k.label)}</dt><dd>${esc(k.how)}</dd>`).join('')}</dl></details>`;
    body.querySelector('#tg-change')!.addEventListener('click', () => { asking = true; pending = { ...p }; ask(); body.querySelector<HTMLInputElement>('input:checked')?.focus(); });
    renderPinned();
    closeBtn.hidden = false;
  };

  // What you pinned, on top of the list too: the floating window is behind this dialog while it's open.
  const renderPinned = () => {
    const box = body.querySelector<HTMLElement>('#tg-pinned');
    if (!box) return;
    const items = pinned().map((id) => TEST_PLAN.find((t) => t.id === id)).filter((t): t is TestItem => !!t);
    // One line each (the full card is in the list below; its name goes there).
    box.innerHTML = items.length ? `<h3 class="tg-h">📌 Pinned <span class="muted">· ${items.filter((t) => !isDone(t.id)).length} to try · also in the window over the workbench</span></h3>
      <ol class="tg-pinned">${items.map((t) => `<li class="tg-prow${isDone(t.id) ? ' done' : ''}"><label class="tg-done"><input type="checkbox" data-id="${t.id}"${isDone(t.id) ? ' checked' : ''}><span class="sr-only">Tried: ${esc(t.title)}</span></label>
        <button type="button" class="link tg-goto" data-goto="${t.id}" title="Show it in the list">${esc(t.title)}</button>
        <button type="button" class="btn icon tg-unpin" data-pin="${t.id}" aria-label="Unpin ${esc(t.title)}" title="Unpin">×</button></li>`).join('')}</ol>` : '';
    body.querySelectorAll<HTMLButtonElement>('button.tg-pin').forEach((b) => {
      const on = isPinned(b.dataset.pin!);
      b.setAttribute('aria-pressed', String(on));
      b.textContent = on ? '📌 Pinned' : '📌 Pin while testing';
    });
  };
  body.addEventListener('toggle', (e) => { if ((e.target as HTMLDetailsElement).matches?.('.tg-more[open]')) testEvent('everything-else'); }, true);
  body.addEventListener('change', (e) => {
    const cb = (e.target as HTMLElement).closest<HTMLInputElement>('input[data-id]');
    if (cb) setDone(cb.dataset.id!, cb.checked);
  });
  body.addEventListener('click', (e) => {
    const pinBtn = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-pin]');
    if (pinBtn) {
      const id = pinBtn.dataset.pin!;
      setPinned(id, !isPinned(id)); // onProgress re-draws the Pinned list
      // The focus goes to (or stays on) the task's button in the main list: the Pinned list's copy may be gone.
      body.querySelector<HTMLElement>(`button.tg-pin[data-pin="${id}"]`)?.focus();
      return;
    }
    const go = (e.target as HTMLElement).closest<HTMLElement>('[data-goto]');
    if (go) {
      const cb = [...body.querySelectorAll<HTMLInputElement>(`input[data-id="${go.dataset.goto}"]`)].find((x) => !x.closest('#tg-pinned'));
      const li = cb?.closest<HTMLElement>('.tg-item');
      if (!cb || !li) return;
      const more = li.closest('details');
      if (more) more.open = true;
      li.scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      li.classList.remove('tg-flash'); void li.offsetWidth; li.classList.add('tg-flash');
      cb.focus({ preventScroll: true });
      testEvent('view', go.dataset.goto!);
      return;
    }
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a.tg-report');
    const t = a && TEST_PLAN.find((x) => x.id === a.dataset.id);
    if (a && t) { a.href = report(t); testEvent('report', t.id); }
  });
  // Esc can't skip the questions the first time.
  dlg.addEventListener('cancel', (e) => { if (!profile) e.preventDefault(); });
  const open = () => {
    asking = !profile;
    pending = { ...(profile ?? {}) };
    asking ? ask() : list();
    if (!dlg.open) { dlg.showModal(); testEvent('open-guide'); }
  };
  // A tick in the floating window (testpins.ts) shows here too.
  onProgress(() => {
    renderPinned();
    body.querySelectorAll<HTMLInputElement>('input[data-id]').forEach((cb) => {
      cb.checked = isDone(cb.dataset.id!);
      cb.closest('.tg-item, .tg-prow')?.classList.toggle('done', cb.checked);
    });
  });
  openers.forEach((o) => o.addEventListener('click', open));
  closeBtn.addEventListener('click', () => { if (profile) dlg.close(); });
  return { open, needed: () => !profile };
}
