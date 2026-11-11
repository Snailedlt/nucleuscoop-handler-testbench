// What every page of the site shares (start/, learn/, docs/, rules/; the workbench has its own bar): the header with
// its sections, and the 👍/👎 votes plus "Tell us what's wrong" for the docs pages. Used by build.mjs,
// docs-pages.mjs and rules-pages.mjs.

const SECTIONS = [
  ['', 'Workbench', 'Write and check a handler in the browser'],
  ['learn/', 'Learn', 'Make your first handler, step by step'],
  ['docs/', 'Docs', 'Every option and call'],
  ['rules/', 'Checks', 'What the tools check, and why'],
  ['start/', 'Get the tools', 'VS Code, Notepad++, other editors'],
];

/** The site header. `up`: the path back to the site root ('../', '../../'); `here`: the section's path ('docs/'). */
export function siteHeader(up, here) {
  return `<header class="site-nav" role="banner"><nav aria-label="Site">
  <a class="sn-brand" href="${up}start/">Nucleus <span>handler tools</span></a>
  <ul>${SECTIONS.map(([p, label, title]) => `<li><a href="${up}${p}" title="${title}"${p === here ? ' aria-current="page"' : ''}>${label}</a></li>`).join('')}</ul>
</nav></header>`;
}
/** Its CSS: the start page's tokens (--surface, --line, --accent…), a quiet bar that wraps on a phone. */
export const SITE_HEADER_CSS = `
.site-nav { background: var(--surface); border-bottom: 1px solid var(--line); }
.site-nav nav { max-width: 980px; margin: 0 auto; padding: 8px 16px; display: flex; flex-wrap: wrap; align-items: center; gap: 4px 18px; }
.sn-brand { font-weight: 700; text-decoration: none; color: var(--fg); white-space: nowrap; margin-right: auto; }
.sn-brand span { color: var(--accent); }
.site-nav ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 2px 4px; }
.site-nav ul a { display: inline-block; padding: 6px 10px; border-radius: var(--r-ctl); color: var(--muted); text-decoration: none; font-size: 15px; }
.site-nav ul a:hover { color: var(--fg); background: var(--bg); }
.site-nav ul a[aria-current] { color: var(--fg); font-weight: 600; box-shadow: inset 0 -2px var(--accent); border-radius: 0; }
`;

/**
 * 👍/👎 and the report link under a docs page (kind 'doc') or a check's page (kind 'rule'). Votes go where the
 * workbench's go: a GoatCounter event "vote/doc/<name>/up" ("vote/rule/<id>/up") (only when the build names a site, never with Do Not Track or after Settings › Feedback is
 * switched off), and each browser's own vote is kept in the same storage, so the buttons agree with the workbench.
 */
export function docFeedback(name, reportUrl, esc, kind = 'doc') {
  return `<div class="doc-fb" data-kind="${kind}" data-doc="${esc(name)}"><span>Is this right?</span>
<button type="button" class="vote-btn" data-vote="up" aria-pressed="false" aria-label="Correct" title="Correct">👍</button><button type="button" class="vote-btn" data-vote="down" aria-pressed="false" aria-label="Wrong or unclear" title="Wrong or unclear">👎</button>
<a href="${esc(reportUrl)}" target="_blank" rel="noopener">Tell us what's wrong</a><span class="doc-fb-thanks" role="status"></span></div>`;
}
export const DOC_FEEDBACK_CSS = `
.doc-fb { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; margin: 28px 0 0; padding: 10px 14px; border: 1px solid var(--line); border-radius: var(--r-pane); background: var(--surface); font-size: 14px; }
.vote-btn { font: inherit; padding: 4px 10px; border: 1px solid var(--line); border-radius: var(--r-ctl); background: var(--bg); cursor: pointer; }
.vote-btn[aria-pressed="true"] { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 16%, var(--surface)); }
.doc-fb-thanks:empty { display: none; }
`;
/** The script for the votes; `site` is the GoatCounter site code, or null (then votes stay in the browser). */
export function docFeedbackScript(site) {
  return `<script>
(function () {
  var box = document.querySelector('.doc-fb'); if (!box) return;
  var KEY = 'nucleus-workbench-votes', id = (box.dataset.kind || 'doc') + '/' + box.dataset.doc;
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function votes() { try { return JSON.parse(get(KEY) || '{}'); } catch (e) { return {}; } }
  function show() { var v = votes()[id]; box.querySelectorAll('[data-vote]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.vote === v)); }); }
  var site = ${JSON.stringify(site)};
  function off() { return !site || navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true || get('nucleus-workbench-feedback-off') === '1' || get('skipgc') === 't'; }
  function send(path) {
    if (off()) return;
    var url = 'https://' + site + '.goatcounter.com/count?p=' + encodeURIComponent('/' + path) + '&e=true&rnd=' + Math.random().toString(36).slice(2);
    try { navigator.sendBeacon ? navigator.sendBeacon(url) : fetch(url, { mode: 'no-cors', keepalive: true }); } catch (e) {}
  }
  box.addEventListener('click', function (e) {
    var b = e.target.closest('[data-vote]'); if (!b) return;
    var all = votes(), v = b.dataset.vote, now = all[id] === v ? undefined : v;
    if (now) all[id] = now; else delete all[id];
    try { localStorage.setItem(KEY, JSON.stringify(all)); } catch (e) {}
    send('vote/' + id + '/' + (now || 'undo-' + v));
    box.querySelector('.doc-fb-thanks').textContent = now ? 'Thanks!' + (now === 'down' ? ' Tell us what is wrong, if you can.' : '') : '';
    show();
  });
  show();
})();
</script>`;
}

/**
 * One anonymous "visit" count per visit on the site's own pages (start, Learn, docs, rules), with where it came from:
 * the other site (only its address, never the page) and the link's `?ref=` tag (GoatCounter's Campaigns). The same
 * rules and the same per-tab record as the workbench (feedback.ts `countVisit`), so a visit that moves on to the
 * workbench is counted once. Off with Do Not Track, Global Privacy Control or Settings › Privacy in the workbench.
 */
export function siteVisitScript(site) {
  if (!site) return '';
  return `<script>
(function () {
  var site = ${JSON.stringify(site)}, KEY = 'nucleus-workbench-visit', v = null;
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  try { v = JSON.parse(sessionStorage.getItem(KEY) || 'null'); } catch (e) {}
  if (!v) {
    v = {};
    try {
      var q = new URLSearchParams(location.search), ref = q.get('ref') || q.get('utm_source');
      if (ref && /^[\\w.-]{1,40}$/.test(ref)) v.ref = ref;
      if (document.referrer) { var u = new URL(document.referrer); if (u.host && u.host !== location.host) v.from = u.protocol + '//' + u.host; }
      if (ref) { q.delete('ref'); q.delete('utm_source'); var s = q.toString(); history.replaceState(history.state, '', location.pathname + (s ? '?' + s : '') + location.hash); }
    } catch (e) {}
  }
  var off = navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true || get('nucleus-workbench-feedback-off') === '1' || get('skipgc') === 't';
  if (!v.counted && !off) {
    v.counted = true;
    var url = 'https://' + site + '.goatcounter.com/count?p=' + encodeURIComponent('/visit') + '&e=true&s=' + encodeURIComponent(screen.width + ',' + screen.height + ',' + (window.devicePixelRatio || 1))
      + (v.from ? '&r=' + encodeURIComponent(v.from) : '') + (v.ref ? '&q=' + encodeURIComponent('?ref=' + v.ref) : '') + '&rnd=' + Math.random().toString(36).slice(2);
    try { navigator.sendBeacon ? navigator.sendBeacon(url) : fetch(url, { mode: 'no-cors', keepalive: true }); } catch (e) {}
  }
  try { sessionStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {}
})();
</script>`;
}
