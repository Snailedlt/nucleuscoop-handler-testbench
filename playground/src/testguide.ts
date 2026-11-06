// "Help test this beta" (testplan.ts): two quick questions (how much you code, how well you know Nucleus' handler
// API), then what to try, best fit first: API & docs for those who know Nucleus well, developer experience for
// developers, look & ease of use for those new to either. Each item has the kind of testing it needs, a "Tried it"
// tick kept in this browser, and a Report link that opens the tester feedback form filled in.
import { AREAS, BETA, fit, KINDS, TEST_PLAN, type Coding, type NucleusKnow, type Profile, type TestItem } from './testplan';

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const DONE_KEY = 'nucleus-workbench-tested';
const PROFILE_KEY = 'nucleus-workbench-tester-profile';
const get = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } };
const set = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } };
const report = (title: string) => `https://github.com/Snailedlt/splitscreenme-vscode/issues/new?template=tester-feedback.yml&title=${encodeURIComponent(`Beta test: ${title}`)}&version=workbench`;

const CODING: [Coding, string][] = [['new', 'New to coding'], ['dev', 'Developer']];
const NUCLEUS: [NucleusKnow, string][] = [['new', 'New to it'], ['some', 'Made a few handlers'], ['expert', 'Know the API well']];

export function initTestGuide(dlg: HTMLDialogElement, openers: HTMLElement[]) {
  if (!BETA) { openers.forEach((o) => o.remove()); dlg.remove(); return { open: () => {} }; }
  const done = new Set<string>(JSON.parse(get(DONE_KEY) || '[]'));
  let profile: Profile | null = null;
  try { profile = JSON.parse(get(PROFILE_KEY) || 'null'); } catch { /* ignore */ }
  const body = dlg.querySelector<HTMLElement>('#test-body')!;
  const score = (t: TestItem, p: Profile) => Math.max(...t.areas.map((a) => fit(a, p)));

  const item = (t: TestItem) => `<li class="tg-item${done.has(t.id) ? ' done' : ''}">
    <label class="tg-done"><input type="checkbox" data-id="${t.id}"${done.has(t.id) ? ' checked' : ''}><span class="sr-only">Tried: ${esc(t.title)}</span></label>
    <div><div class="tg-title"><strong>${esc(t.title)}</strong>${t.areas.map((a) => `<span class="tg-area a-${a}" title="${esc(AREAS[a].who)}">${esc(AREAS[a].label)}</span>`).join('')}${t.kinds.map((k) => `<span class="tg-kind" title="${esc(KINDS[k].how)}">${esc(KINDS[k].label)}</span>`).join('')}</div>
    <p><span class="muted">Try:</span> ${esc(t.steps)}</p><p><span class="muted">Look for:</span> ${esc(t.look)}</p>
    <a class="small" href="${report(t.title)}" target="_blank" rel="noopener">Report what you found</a></div></li>`;

  const seg = (name: string, label: string, opts: [string, string][], value: string | undefined) =>
    `<div class="tg-q"><span class="tg-ql" id="tgq-${name}">${label}</span><div class="tg-who" role="radiogroup" aria-labelledby="tgq-${name}">${opts.map(([v, l]) => `<button type="button" role="radio" aria-checked="${v === value}" data-q="${name}" data-v="${v}">${esc(l)}</button>`).join('')}</div></div>`;

  const draw = (focus?: string) => {
    const p = profile;
    const sorted = p ? [...TEST_PLAN].sort((a, z) => score(z, p) - score(a, p)) : TEST_PLAN;
    const mine = p ? sorted.filter((t) => score(t, p) >= 3) : [];
    const rest = p ? sorted.filter((t) => score(t, p) < 3) : TEST_PLAN;
    const focusAreas = p ? (Object.keys(AREAS) as (keyof typeof AREAS)[]).filter((a) => fit(a, p) >= 3).map((a) => AREAS[a].label) : [];
    const tried = (l: TestItem[]) => l.filter((t) => done.has(t.id)).length;
    body.innerHTML = `<div class="tg-qs">${seg('coding', 'Coding', CODING, p?.coding)}${seg('nucleus', 'Nucleus Co-op handlers and API', NUCLEUS, p?.nucleus)}</div>
      ${p ? `<h3 class="tg-h">Recommended for you <span class="muted">· ${focusAreas.join(' and ')} · ${tried(mine)} of ${mine.length} tried</span></h3>
        <ol class="tg-list">${mine.map(item).join('')}</ol>
        <details class="tg-more"><summary>Everything else (${rest.length})</summary><ol class="tg-list">${rest.map(item).join('')}</ol></details>`
      : `<p class="muted tg-pick">Answer the two questions and we'll put what fits you best first. Or <button class="link" type="button" id="tg-all">just show everything</button>.</p><details class="tg-more" id="tg-every"><summary>Everything (${TEST_PLAN.length})</summary><ol class="tg-list">${TEST_PLAN.map(item).join('')}</ol></details>`}
      <details class="tg-legend"><summary>What the labels mean</summary><dl>${Object.values(AREAS).map((a) => `<dt>${esc(a.label)}</dt><dd>${esc(a.who)}</dd>`).join('')}${Object.values(KINDS).map((k) => `<dt>${esc(k.label)}</dt><dd>${esc(k.how)}</dd>`).join('')}</dl></details>`;
    body.querySelectorAll<HTMLButtonElement>('[data-q]').forEach((b) => b.addEventListener('click', () => {
      const next = { ...(pending ?? {}), [b.dataset.q!]: b.dataset.v } as Partial<Profile>;
      // Both answered: the recommendations. One answered: keep it until the other is.
      pending = next;
      if (next.coding && next.nucleus) { profile = next as Profile; set(PROFILE_KEY, JSON.stringify(profile)); }
      draw(`[data-q="${b.dataset.q}"][data-v="${b.dataset.v}"]`);
    }));
    // Show a half-answered pair as picked.
    if (!p && pending) for (const [q, v] of Object.entries(pending)) body.querySelector(`[data-q="${q}"][data-v="${v}"]`)?.setAttribute('aria-checked', 'true');
    body.querySelector('#tg-all')?.addEventListener('click', () => ((body.querySelector('#tg-every') as HTMLDetailsElement).open = true));
    body.querySelectorAll<HTMLInputElement>('input[data-id]').forEach((c) => c.addEventListener('change', () => {
      c.checked ? done.add(c.dataset.id!) : done.delete(c.dataset.id!);
      set(DONE_KEY, JSON.stringify([...done]));
      c.closest('.tg-item')!.classList.toggle('done', c.checked);
    }));
    if (focus) body.querySelector<HTMLElement>(focus)?.focus();
  };
  let pending: Partial<Profile> | null = profile;
  const open = () => { draw(); dlg.showModal(); };
  openers.forEach((o) => o.addEventListener('click', open));
  dlg.querySelector('#test-close')!.addEventListener('click', () => dlg.close());
  return { open };
}
