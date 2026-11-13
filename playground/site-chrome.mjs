// What every page of the site shares (start/, learn/, docs/, rules/; the workbench has its own bar): the header with
// its sections, and the 👍/👎 votes plus "Tell us what's wrong" for the docs pages. Used by build.mjs,
// docs-pages.mjs and rules-pages.mjs.

const SECTIONS = [
  ['', 'Workbench', 'Write and check a handler in the browser'],
  ['learn/', 'Learn', 'Make your first handler, step by step'],
  ['docs/', 'Docs', 'Every option and call, and every check'],
  ['tools/', 'Get the tools', 'VS Code, Notepad++, the command line and other editors'],
];
/** The sections, for pages with a bar of their own (Learn): the same links in the same order. */
export const SITE_SECTIONS = SECTIONS;

/** The site header. `up`: the path back to the site root ('../', '../../'); `here`: the section's path ('docs/'). */
export function siteHeader(up, here) {
  return `<header class="site-nav" role="banner"><nav aria-label="Site">
  <a class="sn-brand" href="${up}start/" title="Home: what these tools are"><img src="${up}icon.png" alt="" width="22" height="22">Nucleus <span>handler tools</span></a>
  <ul>${SECTIONS.map(([p, label, title]) => `<li><a href="${up}${p}" title="${title}"${p === here ? ' aria-current="page"' : ''}>${label}</a></li>`).join('')}</ul>
</nav></header>`;
}
/** Its CSS: the start page's tokens (--surface, --line, --accent…), a quiet bar that wraps on a phone. */
export const SITE_HEADER_CSS = `
.site-nav { background: var(--surface); border-bottom: 1px solid var(--line); }
.site-nav nav { max-width: 980px; margin: 0 auto; padding: 8px 16px; display: flex; flex-wrap: wrap; align-items: center; gap: 4px 18px; }
.sn-brand { font-weight: 700; text-decoration: none; color: var(--fg); white-space: nowrap; margin-right: auto; }
.sn-brand span { color: var(--accent); }
.sn-brand img { vertical-align: -5px; margin-right: 8px; border-radius: 4px; }
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

/**
 * A Copy button on every code block (`pre`) and every command written inline (`code.cmd`), on the site's own pages.
 * The button says what it copies, and "Copied" is spoken (a live region) as well as shown.
 */
export const COPY_CSS = `
.copy-wrap { position: relative; }
.copy-wrap > pre { padding-right: 64px; }
.copy-btn { position: absolute; top: 6px; right: 6px; font: 600 12px/1 var(--sans, system-ui, sans-serif); padding: 5px 8px; border: 1px solid var(--line); border-radius: var(--r-sm, 4px); background: var(--surface); color: var(--fg); cursor: pointer; opacity: .85; }
.copy-btn:hover, .copy-btn:focus-visible { opacity: 1; border-color: var(--accent); }
.copy-btn.inline { position: static; margin-left: 4px; padding: 2px 6px; font-size: 11px; vertical-align: .1em; }
.copy-live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
`;
export const COPY_SCRIPT = `<script>
(function () {
  var live = document.createElement('span'); live.className = 'copy-live'; live.setAttribute('role', 'status'); document.body.appendChild(live);
  function button(text, label, inline) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'copy-btn' + (inline ? ' inline' : ''); b.textContent = 'Copy'; b.setAttribute('aria-label', label);
    b.addEventListener('click', function () {
      var done = function () { b.textContent = 'Copied'; live.textContent = 'Copied'; setTimeout(function () { b.textContent = 'Copy'; live.textContent = ''; }, 1500); };
      if (navigator.clipboard) navigator.clipboard.writeText(text()).then(done, function () {}); else { var t = document.createElement('textarea'); t.value = text(); document.body.appendChild(t); t.select(); try { document.execCommand('copy'); done(); } catch (e) {} t.remove(); }
    });
    return b;
  }
  document.querySelectorAll('pre').forEach(function (pre) {
    if (pre.closest('.no-copy, .CodeMirror') || (pre.parentNode && pre.parentNode.querySelector(':scope > .copy, :scope > .copy-btn'))) return;
    var wrap = document.createElement('div'); wrap.className = 'copy-wrap'; pre.parentNode.insertBefore(wrap, pre); wrap.appendChild(pre);
    wrap.appendChild(button(function () { return pre.innerText.replace(/\\n$/, ''); }, 'Copy the code'));
  });
  document.querySelectorAll('code.cmd').forEach(function (c) {
    c.after(button(function () { return c.innerText; }, 'Copy the command: ' + c.innerText, true));
  });
})();
</script>`;

// Where people ask about Nucleus Co-op and handlers: the SplitScreen.Me Discord and r/nucleuscoop. Shown as a small
// "Stuck?" box at the end of the docs, check and Learn pages, and as plain links in footers. The editor poll is on
// the tools page. The invite never expires (set so in Discord); keep these links working (AGENTS.md: links live for ever).
export const COMMUNITY = {
  discord: 'https://discord.gg/XxGMkqCf4r',
  reddit: 'https://www.reddit.com/r/nucleuscoop/',
  editorPoll: 'https://discord.com/channels/142649962839277568/1568403337613680650/1568777762221588531',
};
// Simple Icons (CC0): the brands' own marks, so each is recognised at a glance. Decorative: the text says the name.
const COMMUNITY_ICON = {
  discord: '<svg class="comm-ico" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="#5865F2" d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>',
  reddit: '<svg class="comm-ico" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="#FF4500" d="M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0Zm4.388 3.199c1.104 0 1.999.895 1.999 1.999 0 1.105-.895 2-1.999 2-.946 0-1.739-.657-1.947-1.539v.002c-1.147.162-2.032 1.15-2.032 2.341v.007c1.776.067 3.4.567 4.686 1.363.473-.363 1.064-.58 1.707-.58 1.547 0 2.802 1.254 2.802 2.802 0 1.117-.655 2.081-1.601 2.531-.088 3.256-3.637 5.876-7.997 5.876-4.361 0-7.905-2.617-7.998-5.87-.954-.447-1.614-1.415-1.614-2.538 0-1.548 1.255-2.802 2.803-2.802.645 0 1.239.218 1.712.585 1.275-.79 2.881-1.291 4.64-1.365v-.01c0-1.663 1.263-3.034 2.88-3.207.188-.911.993-1.595 1.959-1.595Zm-8.085 8.376c-.784 0-1.459.78-1.506 1.797-.047 1.016.64 1.429 1.426 1.429.786 0 1.371-.369 1.418-1.385.047-1.017-.553-1.841-1.338-1.841Zm7.406 0c-.786 0-1.385.824-1.338 1.841.047 1.017.634 1.385 1.418 1.385.785 0 1.473-.413 1.426-1.429-.046-1.017-.721-1.797-1.506-1.797Zm-3.703 4.013c-.974 0-1.907.048-2.77.135-.147.015-.241.168-.183.305.483 1.154 1.622 1.964 2.953 1.964 1.33 0 2.47-.81 2.953-1.964.057-.137-.037-.29-.184-.305-.863-.087-1.795-.135-2.769-.135Z"/></svg>',
};
/** A link to the Discord server or the subreddit, with its icon; opens in a new tab. */
export const communityLink = (which, text = which === 'discord' ? 'Discord' : 'r/nucleuscoop') =>
  `<a class="comm-link" href="${COMMUNITY[which]}" target="_blank" rel="noopener">${COMMUNITY_ICON[which]}<span>${text}</span></a>`;
/** The "Stuck?" box: one line, two links. */
export const communityHelp = (lead = 'Stuck, or not sure?') =>
  `<div class="comm-help"><span class="comm-lead"><strong>${lead}</strong> Ask other handler authors:</span> ${communityLink('discord')}${communityLink('reddit')}</div>`;
/** Plain footer links: "Questions? Discord · r/nucleuscoop". */
export const communityFooter = () =>
  `<span class="comm-foot">Questions? ${communityLink('discord')} · ${communityLink('reddit')}</span>`;
export const COMMUNITY_CSS = `
.comm-help { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; margin: 16px 0 0; padding: 10px 14px; border: 1px solid var(--line); border-radius: var(--r-pane, 10px); background: var(--surface); font-size: 14px; }
.comm-help .comm-lead { margin-right: auto; }
#drawer .comm-help { margin: 20px 12px 12px; padding: 10px 12px; }
.comm-help .comm-link { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border: 1px solid var(--line); border-radius: 999px; background: var(--bg); color: var(--fg); text-decoration: none; font-weight: 600; }
.comm-help .comm-link:hover { border-color: var(--accent, currentColor); }
.comm-help .comm-link:focus-visible { outline: 2px solid var(--accent, currentColor); outline-offset: 2px; }
.comm-link .comm-ico { flex: none; }
.comm-foot .comm-link { display: inline-flex; align-items: center; gap: 4px; }
.comm-foot .comm-ico { width: 14px; height: 14px; }
`;
/** Puts the box and the footer links where a page asks for them (<!--COMMUNITY-->, <!--COMMUNITY_FOOTER-->). */
export const withCommunity = (html) => html.replace(/<!--COMMUNITY-->/g, () => communityHelp()).replace(/<!--COMMUNITY_FOOTER-->/g, () => communityFooter());
