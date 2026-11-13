// The Docs as pages of their own (docs/, docs/<group>/, docs/<name>/): every option, Context member, enum and .NET
// call, from the shared core's core/docspage.ts (the same pages VS Code's Nucleus Docs panel shows), so a name can be
// linked to, found by a search engine, and read without opening the workbench. Each page offers "Open in the
// workbench" (#docs-<name>, which keeps working). Called by build.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { siteHeader, SITE_HEADER_CSS, docFeedback, DOC_FEEDBACK_CSS, docFeedbackScript } from './site-chrome.mjs';

const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
/** Code, coloured: comments, strings, keywords and numbers (the start page's .hk/.hs/.hc colours). */
// The build's highlighter (build.mjs hlSem: the editor's colours, Nucleus names by what they are) when given; else this one.
let HL = null;
function hl(code) {
  if (HL) return HL(code);
  const re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`[^`]*`)|\b(var|let|const|function|return|if|else|for|while|new|true|false|null|undefined|typeof|in|this|string|number|boolean|void|any)\b|\b(0x[0-9a-fA-F]+|\d+(?:\.\d+)?)\b/g;
  let out = '', last = 0;
  for (let m; (m = re.exec(code)); ) {
    out += esc(code.slice(last, m.index));
    out += `<span class="${m[1] ? 'hc' : m[2] ? 'hs' : 'hk'}">${esc(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  return out + esc(code.slice(last));
}
/** `code`, **bold**, _italic_ and [links](…); `href` turns a docs placeholder into this page's relative address. */
function inline(t, href) {
  const parts = [];
  // Inline code first, so nothing inside it is touched.
  let s = String(t).replace(/`([^`]+)`/g, (_, c) => { parts.push(`<code>${esc(c)}</code>`); return `\u0000${parts.length - 1}\u0000`; });
  s = esc(s)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) => {
      const u = href(url);
      const ext = /^https?:/.test(u);
      return `<a href="${esc(u)}"${ext ? ' target="_blank" rel="noopener"' : ''}>${label}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])_([^_]+)_(?=$|[\s.,)])/g, '$1<em>$2</em>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => parts[Number(i)]).replace(/&lt;code&gt;/g, '<code>');
}
/** The core's docs Markdown as HTML: headings, fenced code, lists, tables, paragraphs. */
function mdToHtml(md, href) {
  const out = [];
  const chunks = md.split(/```\w*\n([\s\S]*?)```/g);
  chunks.forEach((c, i) => {
    if (i % 2) { out.push(`<pre class="cfg hl"><code>${hl(c.replace(/\n$/, ''))}</code></pre>`); return; }
    for (const block of c.split(/\n{2,}/)) {
      const b = block.trim();
      if (!b) continue;
      const lines = b.split('\n');
      if (/^#{2,4} /.test(b) && lines.length === 1) { const n = b.match(/^#+/)[0].length; out.push(`<h${n}>${inline(b.slice(n + 1), href)}</h${n}>`); continue; }
      if (lines.every((l) => /^\s*[-*] /.test(l))) { out.push(`<ul class="dlist">${lines.map((l) => `<li>${inline(l.replace(/^\s*[-*] /, ''), href)}</li>`).join('')}</ul>`); continue; }
      if (lines.length > 1 && lines.every((l) => /^\|.*\|$/.test(l.trim()))) {
        const rows = lines.filter((l) => !/^\|[\s:|-]+\|$/.test(l.trim())).map((l) => l.trim().slice(1, -1).split('|').map((x) => x.trim()));
        out.push(`<table><thead><tr>${rows[0].map((x) => `<th>${inline(x, href)}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map((r) => `<tr>${r.map((x) => `<td>${inline(x, href)}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
        continue;
      }
      if (/^#{2,4} /.test(lines[0])) { const n = lines[0].match(/^#+/)[0].length; out.push(`<h${n}>${inline(lines[0].slice(n + 1), href)}</h${n}>`); lines.shift(); }
      if (lines.length) out.push(`<p>${lines.map((l) => inline(l, href)).join('<br>')}</p>`);
    }
  });
  return out.join('\n');
}
/** A docs value (Game.Play, Context, Nucleus.SaveType) as a folder name, or undefined when it can't be one. */
const folderOf = (v) => (/^[A-Za-z_$][\w$.]*$/.test(v) ? v : undefined);

/**
 * @param {{ outDir: string, startHtml: string, docsPage: Function, docsView: Function, allEntries: Function, groups: { key: string }[], base: string, preview: boolean, noindex: string }} o
 * @returns {string[]} the pages written (their docs values, '' for the main page), for the sitemap
 */
/** The left-hand list of docs/ and rules/ (groups › names, a filter on top): its CSS, its markup, and nav.js fills it
 *  from docs/nav.json. `here`: the page's entry (a docs path, a check's id, or a group key) to mark. */
export const DRAWER_CSS = `/* The docs list: a drawer on the left (groups › names, a filter on top), over the page on a narrow screen. */
.docs-wrap { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 270px minmax(0, 1fr); gap: 0 8px; }
.docs-wrap > main { max-width: 900px; margin: 0; min-width: 0; }
#docs-drawer { position: sticky; top: 0; align-self: start; max-height: 100vh; overflow: auto; padding: 18px 8px 24px 16px; border-right: 1px solid var(--line); background: var(--bg); font-size: 14px; }
.dn-toggle { display: none; }
.dn-filter { position: sticky; top: -18px; z-index: 1; box-shadow: 0 -18px 0 var(--bg); width: 100%; padding: 7px 10px; margin: 0 0 10px; font: inherit; border: 1px solid var(--line); border-radius: var(--r-ctl); background: var(--surface); color: var(--fg); }
#dn-list, #dn-list ul { list-style: none; margin: 0; padding: 0; }
#dn-list details > summary { cursor: pointer; padding: 4px 6px; border-radius: var(--r-sm); font-weight: 600; list-style: none; display: flex; gap: 6px; align-items: center; }
#dn-list details > summary::-webkit-details-marker { display: none; }
#dn-list details > summary::before { content: ""; width: 6px; height: 6px; border: solid var(--muted); border-width: 0 1.5px 1.5px 0; transform: rotate(-45deg); flex: none; }
#dn-list details[open] > summary::before { transform: rotate(45deg); }
#dn-list .n { color: var(--muted); font-weight: 400; font-size: 12px; margin-left: auto; }
#dn-list details ul { margin: 2px 0 8px 12px; border-left: 1px solid var(--line); }
#dn-list a { display: block; padding: 3px 8px; margin-left: -1px; border-left: 2px solid transparent; color: var(--muted); text-decoration: none; overflow-wrap: anywhere; }
#dn-list a:hover { color: var(--fg); }
#dn-list a[aria-current] { color: var(--fg); font-weight: 600; border-left-color: var(--accent); }
#dn-list .hit small { display: block; color: var(--muted); font-size: 12px; }
.dn-none { color: var(--muted); padding: 4px 8px; }
@media (max-width: 900px) {
  .docs-wrap { display: block; }
  #docs-drawer { position: static; max-height: none; border-right: 0; border-bottom: 1px solid var(--line); padding: 8px 16px; }
  .dn-toggle { display: inline-flex; align-items: center; gap: 6px; font: inherit; font-weight: 600; padding: 6px 12px; border: 1px solid var(--line); border-radius: var(--r-ctl); background: var(--surface); color: var(--fg); cursor: pointer; }
  #docs-drawer:not(.open) .dn-body { display: none; }
  .dn-body { margin-top: 10px; }
}
/* Three levels, each clearly its own: a section (Handler API, Checks) is a heading in the accent colour with a rule
   above it; its groups (Game, Context…) are bold; the names in a group are indented under a line. */
#dn-list .dn-sec { margin: 0 0 4px; }
#dn-list .dn-sec + .dn-sec { margin-top: 10px; padding-top: 8px; border-top: 1px solid var(--line); }
#dn-list .dn-sec > details > summary { font-size: 12.5px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; color: var(--accent); padding: 6px 6px; }
#dn-list .dn-sec > details > summary::before { border-color: var(--accent); }
#dn-list .dn-sec > details > ul { margin: 2px 0 6px 6px; padding-left: 4px; border: 0; }
#dn-list .dn-sec > details > ul > li > details > summary { font-size: 14px; }
#dn-list .dn-sec > details > ul > li > details > ul { margin-left: 14px; }
#dn-list .dn-sec > details > ul > li > details > ul a { font-size: 13.5px; }
#dn-list .dn-all > a { font-weight: 600; color: var(--fg); }
`;
export function docsDrawer(up, here, fallback = '') {
  return `<nav id="docs-drawer" aria-label="All docs and checks" data-root="${up}" data-base="${up}docs/" data-here="${esc(here)}">
<button type="button" class="dn-toggle" aria-expanded="false" aria-controls="dn-body">☰ All docs and checks</button>
<div class="dn-body" id="dn-body">
<input class="dn-filter" type="search" placeholder="Filter: a name, a check or a word" aria-label="Filter the docs and checks">
<ul id="dn-list">${fallback}</ul>
</div>
</nav>`;
}

export function writeDocPages(o) {
  HL = o.hl ?? null;
  const style = o.startHtml.slice(o.startHtml.indexOf('<style>'), o.startHtml.indexOf('</style>') + 8);
  const themeScript = (o.startHtml.match(/<script>\/\* the workbench's theme choice[\s\S]*?<\/script>/) || [''])[0];
  const head = (title, desc, canonical, up, here0 = '') => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${o.preview ? '' : `<link rel="canonical" href="${esc(canonical)}">\n`}${o.noindex}<link rel="icon" type="image/png" href="${up}icon.png">
<meta name="color-scheme" content="light dark">
${themeScript}
${style}
<style>
.crumbs { font-size: 14px; color: var(--muted); margin: 0 0 14px; }
.crumbs a { color: inherit; }
.open-wb { margin: 0 0 18px; font-size: 14px; }
pre.cfg { white-space: pre-wrap; overflow-wrap: anywhere; }
.dlist { padding-left: 20px; } .dlist li { margin: 0 0 6px; }
${SITE_HEADER_CSS}${DOC_FEEDBACK_CSS}
${DRAWER_CSS}
table { border-collapse: collapse; margin: 0 0 16px; font-size: 14px; } th, td { border: 1px solid var(--line); padding: 6px 10px; text-align: left; vertical-align: top; }
</style>
</head>
<body>
${siteHeader(up, 'docs/')}
<div class="docs-wrap">
${docsDrawer(up, here0, o.groups.map((g) => `<li><a href="${up}docs/${g.key}/">${esc(g.title)}</a></li>`).join(''))}
<main>
`;
  const foot = (up) => `<!--COMMUNITY-->
</main>
</div>
<script src="${up}docs/nav.js" defer></script>
<footer class="small"><a href="${up}start/">About these tools</a> · <a href="${up}">Open the workbench</a> · <a href="${up}rules/">Every check</a> · <!--COMMUNITY_FOOTER--></footer>
</body>
</html>
`;
  fs.rmSync(o.outDir, { recursive: true, force: true });
  fs.mkdirSync(o.outDir, { recursive: true });
  const values = new Set(['']);
  for (const g of o.groups) values.add(g.key);
  for (const e of o.allEntries(true)) if (folderOf(e.path)) values.add(e.path);
  for (const n of o.enums ?? []) values.add(`Nucleus.${n}`);
  const written = [];
  for (const v of values) {
    if (v && !folderOf(v)) continue;
    const up = v ? '../../' : '../';
    const here = v ? '../' : '';
    // Links inside the page: another docs value becomes its page; anything else stays as it is.
    const href = (u) => {
      const m = /^@docs:(.*)$/.exec(u);
      if (!m) return u;
      const t = m[1];
      if (!t) return `${here || './'}`;
      return folderOf(t) && values.has(t) ? `${here}${t}/` : `${up}#docs-${encodeURIComponent(t)}`;
    };
    const page = o.docsPage(o.docsView(v), (x) => `@docs:${x}`);
    const crumbs = [`<a href="${up}start/">Nucleus handler tools</a>`, v ? `<a href="${here}">Docs</a>` : 'Docs', ...page.crumbs.map((c, i) => (i < page.crumbs.length - 1 && c.view ? `<a href="${href(`@docs:${o.docsValue ? o.docsValue(c.view) : c.view.replace(/^(group|q):/, '')}`)}">${esc(c.label)}</a>` : esc(c.label)))];
    const title = v ? (page.path ?? v) : 'Docs';
    const first = (page.markdown.replace(/```[\s\S]*?```/g, '').split(/\n{2,}/).map((x) => x.trim()).find((x) => x && !x.startsWith('#') && !x.startsWith('-')) ?? '').replace(/[`*_\[\]]/g, '').replace(/\(@docs:[^)]*\)/g, '').slice(0, 200);
    const body = `<p class="crumbs">${crumbs.join(' › ')}</p>
<h1>${esc(v ? title : 'Docs')}</h1>
<p class="open-wb"><a href="${up}#docs${v ? `-${encodeURIComponent(v)}` : ''}">Open in the workbench</a> (search, and try it in a handler)</p>
${mdToHtml(page.markdown.replace(/^## [^\n]*\n+/, ''), href)}
${page.path && o.docReviewUrl ? docFeedback(page.path, o.docReviewUrl(page.path), esc) + docFeedbackScript(o.feedbackSite ?? null) : ''}
`;
    const dir = v ? path.join(o.outDir, v) : o.outDir;
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), head(v ? `${title}: Nucleus Co-op handler docs` : 'Docs: every Nucleus Co-op handler option and call', first || 'Nucleus Co-op handler docs.', `${o.base}docs/${v ? `${v}/` : ''}`, up, v || '@api') + body + foot(up));
    written.push(v);
  }
  // The list the drawer shows (nav.js): each group's names with their first line, for the filter.
  const first = (d) => String(d ?? '').split('\n')[0].replace(/[`*\\_]/g, '').slice(0, 110);
  const entries = o.allEntries(true).filter((e) => folderOf(e.path) && values.has(e.path));
  const nav = o.groups.map((g) => ({ sec: 'api', key: g.key, title: g.title, items: entries.filter((e) => g.match(e.path)).sort((a, b) => a.path.localeCompare(b.path)).map((e) => ({ p: e.path, d: first(e.member.doc) })) }))
    .concat([{ sec: 'api', key: '', title: 'Nucleus values (enums)', items: (o.enums ?? []).map((n) => ({ p: `Nucleus.${n}`, d: '' })) }])
    // The checks (rules-pages.mjs): their own section, each item linking to rules/<id>/ by its title.
    .concat((o.checks ?? []).map((g) => ({ sec: 'checks', key: g.key, title: g.title, items: g.items })));
  fs.writeFileSync(path.join(o.outDir, 'nav.json'), JSON.stringify(nav));
  fs.writeFileSync(path.join(o.outDir, 'nav.js'), NAV_JS);
  return written;
}

/** The drawer: groups as folds (the current one open, the page marked), and the filter (names and their first line). */
const NAV_JS = `(function () {
  var nav = document.getElementById('docs-drawer'); if (!nav) return;
  var base = nav.dataset.base, root = nav.dataset.root || base + '../', here = nav.dataset.here, list = document.getElementById('dn-list'), q = nav.querySelector('.dn-filter');
  // The list's sections, each heading linking to its own page.
  var SECS = { api: ['Handler API', 'docs/'], checks: ['Checks', 'rules/'] };
  var toggle = nav.querySelector('.dn-toggle');
  toggle.addEventListener('click', function () { var o = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(o)); if (o) q.focus(); });
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function link(p, extra, label, u) { return '<a href="' + (u ? root + u : base + p + '/') + '"' + (p === here ? ' aria-current="page"' : '') + '>' + esc(label || p) + (extra || '') + '</a>'; }
  var groups = [];
  // The sections (Handler API, Checks) fold too; the ones folded are remembered. The page's own section stays open.
  var CLOSED_KEY = 'nucleus-docs-closed-sections';
  function closed() { try { return JSON.parse(localStorage.getItem(CLOSED_KEY) || '[]'); } catch (e) { return []; } }
  function tree() {
    var shut = closed(), secs = [];
    groups.forEach(function (g) { var s = g.sec || 'api'; if (secs.indexOf(s) < 0) secs.push(s); });
    list.innerHTML = secs.map(function (s) {
      var gs = groups.filter(function (g) { return (g.sec || 'api') === s; });
      var mine = here === '@' + s || gs.some(function (g) { return g.key === here || g.items.some(function (i) { return i.p === here; }); });
      var inner = '<li class="dn-all"><a href="' + root + SECS[s][1] + '"' + (here === '@' + s ? ' aria-current="page"' : '') + '>' + (s === 'checks' ? 'Every check' : 'All the docs') + '</a></li>' + gs.map(function (g) {
        var open = g.key === here || g.items.some(function (i) { return i.p === here; });
        return '<li><details' + (open ? ' open' : '') + '><summary>' + esc(g.title) + '<span class="n">' + g.items.length + '</span></summary><ul>' + g.items.map(function (i) { return '<li>' + link(i.p, '', i.t || (g.key && i.p.indexOf(g.key + '.') === 0 ? i.p.slice(g.key.length + 1) : i.p), i.u) + '</li>'; }).join('') + '</ul></details></li>';
      }).join('');
      return '<li class="dn-sec"><details data-sec="' + s + '"' + (mine || shut.indexOf(s) < 0 ? ' open' : '') + '><summary>' + SECS[s][0] + '</summary><ul>' + inner + '</ul></details></li>';
    }).join('');
    list.querySelectorAll('details[data-sec]').forEach(function (d) {
      d.addEventListener('toggle', function () {
        var c = closed().filter(function (x) { return x !== d.dataset.sec; });
        if (!d.open) c.push(d.dataset.sec);
        try { localStorage.setItem(CLOSED_KEY, JSON.stringify(c)); } catch (e) {}
      });
    });
    // The page's own entry in view, inside the drawer only (the page itself doesn't move).
    var cur = list.querySelector('[aria-current]'); if (cur) nav.scrollTop = Math.max(0, cur.offsetTop - nav.clientHeight / 2);
  }
  function filter() {
    var w = q.value.trim().toLowerCase().split(/\\s+/).filter(Boolean);
    if (!w.length) return tree();
    var hits = [];
    groups.forEach(function (g) { g.items.forEach(function (i) { var t = (i.p + ' ' + (i.t || '') + ' ' + i.d).toLowerCase(); if (w.every(function (x) { return t.indexOf(x) >= 0; })) hits.push(i); }); });
    // Best first: the words run together in the name ("save file" → ModifySaveFile), then every word in the name,
    // then the first word in the name, then the rest (matched in the doc's first line).
    var joined = w.join('');
    function rank(i) { var n = (i.t || i.p).toLowerCase() + ' ' + i.p.toLowerCase(); return n.indexOf(joined) >= 0 ? 0 : w.every(function (x) { return n.indexOf(x) >= 0; }) ? 1 : n.indexOf(w[0]) >= 0 ? 2 : 3; }
    hits.sort(function (a, b) { return rank(a) - rank(b) || a.p.length - b.p.length || a.p.localeCompare(b.p); });
    list.innerHTML = hits.length ? hits.slice(0, 150).map(function (i) { return '<li class="hit">' + link(i.p, i.d ? '<small>' + esc(i.d) + '</small>' : '', i.t, i.u) + '</li>'; }).join('') : '<li class="dn-none">Nothing matches.</li>';
  }
  q.addEventListener('input', filter);
  q.addEventListener('keydown', function (e) { if (e.key === 'Enter') { var a = list.querySelector('a'); if (a) location.href = a.href; } });
  fetch(base + 'nav.json').then(function (r) { return r.json(); }).then(function (g) { groups = g; filter(); }).catch(function () {});
})();
`;
