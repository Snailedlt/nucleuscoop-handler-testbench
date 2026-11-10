// Docs: every option, Context member, enum and .NET call, searchable, with the groups to browse and a path to go
// back along. The address follows it (#docs, #docs-Context, #docs-Context.ModifySaveFile, #docs-mutex: links.ts).
import { api } from '@core/api';
import { allEntries, lookup, search, type Entry } from '@core/lookup';
import { apiPathOf } from '@core/features';
import USAGE from './usage.json';
import { $, esc, md } from './dom';
import { API_GROUPS, API_GROUP_KEYS, groupOf, unchecked } from './docsgroups';
import { docsHashOf, docsView } from './links';
import { memberCard } from './doccard';
import { mascot } from './mascots';

// API names in hovers, parameter hints and suggestion docs are links: a click (or Enter) opens that name in the
// Reference tab, as VS Code's hovers link to the docs.
// Which names are API (`ModifySaveFile` → Context.ModifySaveFile; `path` is a parameter): core decides, as for VS Code.
export function linkApiNames(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('code').forEach((c) => {
    if (c.closest('pre, a, button')) return;
    const path = apiPathOf(c.textContent ?? '');
    if (path) markApiLink(c, path);
  });
  // The signature on top of a doc card: the name is the link.
  root.querySelectorAll<HTMLElement>('.dc-sig .sg-n').forEach((n) => {
    const owner = n.previousElementSibling?.classList.contains('sg-o') ? n.previousElementSibling.textContent ?? '' : '';
    markApiLink(n, owner + (n.textContent ?? ''));
  });
}
export function markApiLink(el: HTMLElement, path: string) {
  el.classList.add('api-link');
  el.dataset.api = path;
  el.tabIndex = 0;
  el.setAttribute('role', 'link');
  el.title = `${path} in Docs`;
}
/** Clicks (or Enter) on API links in `el` open that name in Docs (`open`). */
export function wireApiLinkClicks(el: HTMLElement, open: (path: string) => void, on: 'click' | 'mousedown' = 'click') {
  el.addEventListener(on, (e) => {
    const a = (e.target as HTMLElement).closest<HTMLElement>('[data-api]');
    if (!a) return;
    e.preventDefault();
    open(a.dataset.api!);
  });
  el.addEventListener('keydown', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLElement>('[data-api]');
    if (a && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); open(a.dataset.api!); }
  });
}

export interface DocsDeps {
  selectTab: (id: string) => void;
  /** The open handler's own link (#hub-…, #share-…), which comes back when you leave Docs. */
  handlerHash: () => string | undefined;
  /** Counts a use (feedback.ts). */
  used: (what: string) => void;
  /** The address of a name's own docs page (docs/<name>/ on the site), to link to and share. */
  pageUrl: (path: string) => string;
}

export interface DocsUI {
  /** Shows a view: `home`, `group:<key>` or `q:<text>` (a name or a search). */
  go: (view: string, push?: boolean) => void;
  back: () => void;
  /** Opens a #docs… link. */
  openHash: (h: string) => void;
  /** Puts the current view's link in the address bar. */
  setHash: () => void;
  /** Gives the address bar back to the handler's own link. */
  leaveHash: () => void;
  /** Shows a name's docs without changing the view's history or the address (Lines' preview). */
  preview: (q: string) => void;
}

export function initDocs(deps: DocsDeps): DocsUI {
  const typeOf = (e: Entry) => (e.member.kind === 'method' ? 'fn' : ((e.member as { type?: string }).type ?? ''));
  function renderApiHome(el: HTMLElement) {
    const all = allEntries(true);
    const usage = USAGE.counts as Record<string, number>;
    const top = Object.entries(usage)
      .filter(([p]) => !/^Game\.(GUID|GameName|ExecutableName|Play|Hub)$/.test(p) && all.some((e) => e.path === p && e.member.kind !== 'object'))
      .slice(0, 14);
    const enums = Object.keys(api.enums).sort();
    el.innerHTML = `<div class="api-home">
      <p class="muted">Every option, Context member, enum and .NET call a handler can use, with what Nucleus does with it. Type above, or start here.</p>
      ${unchecked().size ? `<button type="button" class="api-ai" data-group="AI"><span class="ai-spark" aria-hidden="true"></span><span><span class="t">Help check AI-written docs <span class="count">${unchecked().size}</span></span><span class="d">AI wrote these from the Nucleus source; no person has checked them yet. Know how one really works? Tell us with 👍 or 👎.</span></span></button>` : ''}
      <h3 class="api-h">Browse</h3>
      <div class="api-groups">${API_GROUPS.filter((g) => g.key !== 'AI').map((g) => `<button type="button" class="api-group" data-group="${g.key}"><span class="t">${esc(g.title)} <span class="count">${all.filter((e) => g.match(e.path)).length}</span></span><span class="s">${esc(g.doc)}</span></button>`).join('')}</div>
      <h3 class="api-h">Most used in Hub handlers</h3>
      <div class="api-chips">${top.map(([p, n]) => `<button type="button" class="api-chip" data-q="${esc(p)}" title="In ${n} of ${USAGE.handlers} Hub handlers">${esc(p)}</button>`).join('')}</div>
      <h3 class="api-h">Nucleus values (enums)</h3>
      <div class="api-chips">${enums.map((n) => `<button type="button" class="api-chip" data-q="Nucleus.${esc(n)}">Nucleus.${esc(n)}</button>`).join('')}</div>
      <h3 class="api-h">Try a search</h3>
      <p class="muted">${['mutex', 'window title', 'save file', 'keyboard', 'steam'].map((q) => `<button class="link" data-q="${q}">${q}</button>`).join(' · ')}</p>
    </div>`;
    wireApiLinks(el);
  }
  /** One object's members, as a compact list: click one for its docs. */
  function renderApiGroup(el: HTMLElement, key: string) {
    const g = API_GROUPS.find((x) => x.key === key)!;
    const list = allEntries(true).filter((e) => g.match(e.path)).sort((a, b) => a.path.localeCompare(b.path));
    el.innerHTML = refBar([{ label: g.title, count: list.length }]) + `<div class="api-home"><p class="muted">${esc(g.doc)}</p>
      <ul class="api-list">${list.map((e) => `<li><button type="button" data-q="${esc(e.path)}"><span class="n">${esc(e.path)}</span><span class="ty">${esc(typeOf(e))}</span><span class="d">${e.member.docBy === 'claude' ? '<span class="ai-spark" title="AI-written, not from the official docs" role="img" aria-label="AI-written"></span> ' : ''}${esc((e.member.doc || '').split('\n')[0].replace(/[`*\\]/g, ''))}</span></button></li>`).join('')}</ul></div>`;
    wireApiLinks(el);
    el.scrollTop = 0;
  }
  function wireApiLinks(el: HTMLElement) {
    el.querySelectorAll<HTMLButtonElement>('[data-q]').forEach((b) => b.addEventListener('click', () => refGo(`q:${b.dataset.q}`)));
    el.querySelectorAll<HTMLButtonElement>('[data-group]').forEach((b) => b.addEventListener('click', () => refGo(`group:${b.dataset.group}`)));
    el.querySelectorAll<HTMLButtonElement>('[data-home]').forEach((b) => b.addEventListener('click', () => refGo('home')));
    el.querySelectorAll<HTMLButtonElement>('[data-back]').forEach((b) => b.addEventListener('click', () => refBack()));
    // API names inside the docs open their own entry too.
    linkApiNames(el);
  }
  // Where you are in the Reference: "← Back · Reference › Context › ModifySaveFile", every part clickable (as a docs
  // site's breadcrumbs), and Back to the view before. Views: home, a group (Context, Game…), or a search / one name.
  let refView = 'home';
  const refHistory: string[] = [];
  function refGo(view: string, push = true) {
    if (push && view !== refView) refHistory.push(refView);
    if (refHistory.length > 50) refHistory.shift();
    refView = view;
    setDocsHash(view);
    const q = view.startsWith('q:') ? view.slice(2) : '';
    ($('#api-q') as HTMLInputElement).value = q;
    const el = $('#api-results');
    if (view.startsWith('group:')) renderApiGroup(el, view.slice(6));
    else renderApi(q);
    // Each view starts at its top: scroll whichever box holds the Reference.
    for (let n: HTMLElement | null = el; n; n = n.parentElement) if (n.scrollTop) n.scrollTop = 0;
  }
  function refBack() {
    const v = refHistory.pop();
    if (v !== undefined) refGo(v, false);
  }
  // The address follows Docs, so it can be shared: #docs (the main page), #docs-Context (a group),
  // #docs-Context.ModifySaveFile (a name) or #docs-mutex (a search). Replaced, not pushed: the handler's own link
  // (#hub-…, #share-…) comes back when you leave Docs.
  function setDocsHash(view = refView) {
    try {
      history.replaceState(history.state, '', `${location.pathname}${location.search}#${docsHashOf(view)}`);
    } catch {
      /* ignore */
    }
  }
  function leaveDocsHash() {
    if (!/^#docs(-|$)/.test(location.hash)) return;
    try {
      history.replaceState(history.state, '', `${location.pathname}${location.search}${deps.handlerHash() ? '#' + deps.handlerHash() : ''}`);
    } catch {
      /* ignore */
    }
  }
  /** A #docs… link: Docs at that name, group or search. */
  function openDocsHash(h: string) {
    deps.selectTab('api');
    refGo(docsView(h, API_GROUP_KEYS));
  }
  function refBar(crumbs: { label: string; view?: string; count?: number; code?: boolean }[]): string {
    // A quiet path, as docs sites show it: "Reference / Context / ModifySaveFile", the parents as plain links, and a
    // back arrow when there's somewhere to go back to.
    const back = refHistory.length ? `<button type="button" class="ref-back" data-back aria-label="Back" title="Back (Alt+←)">←</button>` : '';
    const parts = [`<button type="button" class="ref-crumb" data-home>Docs</button>`].concat(crumbs.map((c, i) => {
      const last = i === crumbs.length - 1;
      const attr = c.view ? (c.view.startsWith('group:') ? `data-group="${esc(c.view.slice(6))}"` : `data-q="${esc(c.view.slice(2))}"`) : '';
      return (c.view && !last ? `<button type="button" class="ref-crumb" ${attr}>${esc(c.label)}</button>` : `<span class="ref-here"${last ? ' aria-current="page"' : ''}>${esc(c.label)}</span>`) + (c.count !== undefined ? `<span class="ref-count">${c.count}</span>` : '');
    }));
    return `<nav class="api-crumbs" aria-label="Where you are in Docs">${back}${parts.join('<span class="ref-sep" aria-hidden="true">/</span>')}</nav>`;
  }

  function renderApi(q: string) {
    if (q.trim()) deps.used('reference-search');
    const el = $('#api-results');
    if (!q.trim()) return renderApiHome(el);
    const exact = lookup(q);
    const card = (e: Entry) => `<article class="api"><h3>${esc(e.path)}${e.member.deprecated ? ' <span class="chip hint">deprecated</span>' : ''}${e.member.required ? ' <span class="chip error">required</span>' : ''}${e.owner.startsWith('Hub') ? ' <span class="chip info">written by the Hub</span>' : ''}</h3>${memberCard(e.owner, e.name, e.member)}</article>`;
    // One name: its card, and where it sits (Reference / group / name; the group lists the names next to it).
    const one = exact.kind === 'entries' && exact.entries.length === 1 ? exact.entries[0] : undefined;
    if (one) {
      const g = groupOf(one.path);
      el.innerHTML = refBar([...(g ? [{ label: g.title, view: `group:${g.key}` }] : []), { label: one.path.slice(g && one.path.startsWith(g.key + '.') ? g.key.length + 1 : 0), code: true }])
        + card(one) + (/^[A-Za-z_$][\w$.]*$/.test(one.path) ? `<p class="api-page"><a href="${esc(deps.pageUrl(one.path))}" target="_blank" rel="noopener">Open as a page</a> <span class="muted">(to link to or share)</span></p>` : '');
      return wireApiLinks(el);
    }
    let entries: Entry[] = exact.kind === 'entries' ? exact.entries : [];
    for (const e of search(q, 30)) if (!entries.some((x) => x.path === e.path)) entries.push(e);
    let head = '';
    let crumbs: Parameters<typeof refBar>[0] = [{ label: `Results for "${q.trim()}"`, count: Math.min(entries.length, 30) }];
    if (exact.kind === 'enum') {
      crumbs = [{ label: 'Nucleus values' }, { label: `Nucleus.${exact.name}`, code: true }];
      head = `<article class="api"><h3>enum Nucleus.${esc(exact.name)}</h3>${md(exact.doc ?? '')}<p class="mono">${Object.entries(exact.values).map(([k, v]) => `${esc(k)} = ${v}`).join(' · ')}</p></article>`;
      entries = entries.filter((e) => e.member.ts?.includes(exact.name) || e.member.ref === exact.name);
      if (entries.length) head += `<h3 class="api-h">Options that take it</h3>`;
    }
    if (exact.kind === 'class') {
      crumbs = [{ label: `new Nucleus.${exact.name}`, code: true }];
      head = `<article class="api"><h3>new Nucleus.${esc(exact.name)}(${exact.params.join(', ')})</h3>${md(exact.doc)}</article>`;
    }
    if (exact.kind === 'none' && exact.didYouMean) head = `<p class="muted">"${esc(q)}" isn't part of the handler API. Did you mean <button class="link" data-q="${esc(exact.didYouMean)}">${esc(exact.didYouMean)}</button>?</p>`;
    entries = entries.slice(0, 30);
    el.innerHTML = refBar(crumbs) + head
      + (entries.length || head ? entries.map(card).join('') : `<p class="empty masc-empty">${mascot('n-calc', { size: 64, zoom: 1.2 })}<span>Nothing matches "${esc(q)}".</span></p>`);
    wireApiLinks(el);
  }
  $('#api-q').addEventListener('input', (e) => {
    const q = (e.target as HTMLInputElement).value;
    // Typing doesn't add to Back; the view before the search does (once).
    if (!refView.startsWith('q:') || !refView.slice(2)) refHistory.push(refView);
    refView = q.trim() ? `q:${q}` : 'home';
    setDocsHash();
    renderApi(q);
  });
  // Alt+Left in the Reference goes back, as in a browser.
  $('#api-results').addEventListener('keydown', (e) => { if (e.altKey && e.key === 'ArrowLeft') { e.preventDefault(); refBack(); } });
  renderApi('');

  return { go: refGo, back: refBack, openHash: openDocsHash, setHash: () => setDocsHash(), leaveHash: leaveDocsHash, preview: renderApi };
}
