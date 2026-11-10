// The Docs as pages of their own (docs/, docs/<group>/, docs/<name>/): every option, Context member, enum and .NET
// call, from the shared core's core/docspage.ts (the same pages VS Code's Nucleus Docs panel shows), so a name can be
// linked to, found by a search engine, and read without opening the workbench. Each page offers "Open in the
// workbench" (#docs-<name>, which keeps working). Called by build.mjs.
import fs from 'node:fs';
import path from 'node:path';

const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
/** Code, coloured: comments, strings, keywords and numbers (the start page's .hk/.hs/.hc colours). */
function hl(code) {
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
    if (i % 2) { out.push(`<pre class="cfg"><code>${hl(c.replace(/\n$/, ''))}</code></pre>`); return; }
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
export function writeDocPages(o) {
  const style = o.startHtml.slice(o.startHtml.indexOf('<style>'), o.startHtml.indexOf('</style>') + 8);
  const themeScript = (o.startHtml.match(/<script>\/\* the workbench's theme choice[\s\S]*?<\/script>/) || [''])[0];
  const head = (title, desc, canonical, up) => `<!doctype html>
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
table { border-collapse: collapse; margin: 0 0 16px; font-size: 14px; } th, td { border: 1px solid var(--line); padding: 6px 10px; text-align: left; vertical-align: top; }
</style>
</head>
<body>
<main>
`;
  const foot = (up) => `</main>
<footer class="small"><a href="${up}start/">About these tools</a> · <a href="${up}">Open the workbench</a> · <a href="${up}rules/">Every check</a></footer>
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
${v ? '' : '<h1>Docs</h1>'}
<p class="open-wb"><a href="${up}#docs${v ? `-${encodeURIComponent(v)}` : ''}">Open in the workbench</a> (search, and try it in a handler)</p>
${mdToHtml(page.markdown, href)}
`;
    const dir = v ? path.join(o.outDir, v) : o.outDir;
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), head(v ? `${title}: Nucleus Co-op handler docs` : 'Docs: every Nucleus Co-op handler option and call', first || 'Nucleus Co-op handler docs.', `${o.base}docs/${v ? `${v}/` : ''}`, up) + body + foot(up));
    written.push(v);
  }
  return written;
}
