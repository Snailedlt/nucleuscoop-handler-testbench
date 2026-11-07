// "Help test this beta" (testplan.ts). During the beta it's the first thing a new visitor sees:
//   1. Two questions (how much you code, how well you know Nucleus' handler API), as big choices. The dialog can't be
//      closed until both are answered.
//   2. Then "Recommended for you": the items that fit you, quick and much-needed first (testplan.ts PRIORITY), and
//      "Everything else". Your answers stay shown at the top, and Change brings the questions back.
// Each item has what to try, what to look for, a "Tried it" tick kept in this browser, and a Report link that opens
// the tester feedback form filled in (report.ts).
import { mascot } from './mascots';
import { feedbackUrl } from './report';
import { AREAS, BETA, EFFORT, fit, KINDS, priority, TEST_PLAN, type Coding, type NucleusKnow, type Profile, type TestItem } from './testplan';

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const DONE_KEY = 'nucleus-workbench-tested';
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
  const done = new Set<string>(JSON.parse(get(DONE_KEY) || '[]'));
  let profile: Profile | null = testerProfile();
  let asking = !profile; // the questions are showing
  let pending: Partial<Profile> = { ...(profile ?? {}) };
  const body = dlg.querySelector<HTMLElement>('#test-body')!;
  const closeBtn = dlg.querySelector<HTMLButtonElement>('#test-close')!;
  const intro = dlg.querySelector<HTMLElement>('#test-intro')!;
  const score = (t: TestItem, p: Profile) => Math.max(...t.areas.map((a) => fit(a, p)));

  const item = (t: TestItem) => {
    const e = EFFORT[priority(t).effort];
    return `<li class="tg-item${done.has(t.id) ? ' done' : ''}">
    <label class="tg-done"><input type="checkbox" data-id="${t.id}"${done.has(t.id) ? ' checked' : ''}><span class="sr-only">Tried: ${esc(t.title)}</span></label>
    <div><div class="tg-title"><strong>${esc(t.title)}</strong><span class="tg-time" title="${esc(e.how)}">${esc(e.label)}</span>${priority(t).need === 3 ? '<span class="tg-need" title="We need this one most">Much needed</span>' : ''}${t.areas.map((a) => `<span class="tg-area a-${a}" title="${esc(AREAS[a].who)}">${esc(AREAS[a].label)}</span>`).join('')}${t.kinds.map((k) => `<span class="tg-kind" title="${esc(KINDS[k].how)}">${esc(KINDS[k].label)}</span>`).join('')}</div>
    <p><span class="muted">Try:</span> ${esc(t.steps)}</p><p><span class="muted">Look for:</span> ${esc(t.look)}</p>
    <a class="small tg-report" data-id="${t.id}" href="${esc(report(t))}" target="_blank" rel="noopener">Report what you found</a></div></li>`;
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
    const tried = mine.filter((t) => done.has(t.id)).length;
    const c = CODING.find((o) => o.v === p.coding)!, n = NUCLEUS.find((o) => o.v === p.nucleus)!;
    body.innerHTML = `<div class="tg-you"><span>You: <b>${c.icon} ${esc(c.label)}</b> · <b>${n.icon} ${esc(n.label)}</b></span><button class="link" type="button" id="tg-change">Change</button></div>
      <h3 class="tg-h" tabindex="-1">Recommended for you <span class="muted">· quickest and most needed first · ${tried} of ${mine.length} tried</span></h3>
      <ol class="tg-list">${mine.map(item).join('')}</ol>
      <details class="tg-more"><summary>Everything else (${rest.length})</summary><ol class="tg-list">${rest.map(item).join('')}</ol></details>
      <details class="tg-legend"><summary>What the labels mean</summary><dl>${Object.values(EFFORT).map((e) => `<dt>${esc(e.label)}</dt><dd>${esc(e.how)}</dd>`).join('')}${Object.values(AREAS).map((a) => `<dt>${esc(a.label)}</dt><dd>${esc(a.who)}</dd>`).join('')}${Object.values(KINDS).map((k) => `<dt>${esc(k.label)}</dt><dd>${esc(k.how)}</dd>`).join('')}</dl></details>`;
    body.querySelector('#tg-change')!.addEventListener('click', () => { asking = true; pending = { ...p }; ask(); body.querySelector<HTMLInputElement>('input:checked')?.focus(); });
    body.querySelectorAll<HTMLInputElement>('input[data-id]').forEach((cb) => cb.addEventListener('change', () => {
      cb.checked ? done.add(cb.dataset.id!) : done.delete(cb.dataset.id!);
      set(DONE_KEY, JSON.stringify([...done]));
      cb.closest('.tg-item')!.classList.toggle('done', cb.checked);
    }));
    closeBtn.hidden = false;
  };

  body.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a.tg-report');
    const t = a && TEST_PLAN.find((x) => x.id === a.dataset.id);
    if (a && t) a.href = report(t);
  });
  // Esc can't skip the questions the first time.
  dlg.addEventListener('cancel', (e) => { if (!profile) e.preventDefault(); });
  const open = () => {
    asking = !profile;
    pending = { ...(profile ?? {}) };
    asking ? ask() : list();
    if (!dlg.open) dlg.showModal();
  };
  openers.forEach((o) => o.addEventListener('click', open));
  closeBtn.addEventListener('click', () => { if (profile) dlg.close(); });
  return { open, needed: () => !profile };
}
