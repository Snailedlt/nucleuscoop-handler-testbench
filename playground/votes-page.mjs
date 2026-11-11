// votes/: the anonymous votes and feature counts for the maintainers (tools/votes-report.mjs makes votes.json on the
// data branch; build.mjs passes it here). Not linked from anywhere and not for search engines: it's for whoever
// improves the docs and the tips, so the docs people mark wrong come first, each linked to its page.
import fs from 'node:fs';
import path from 'node:path';
import { siteHeader, SITE_HEADER_CSS } from './site-chrome.mjs';

const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

export function writeVotesPage({ outDir, startHtml, votes }) {
  const style = startHtml.slice(startHtml.indexOf('<style>'), startHtml.indexOf('</style>') + 8);
  const themeScript = (startHtml.match(/<script>\/\* the workbench's theme choice[\s\S]*?<\/script>/) || [''])[0];
  const table = (rows, link = '') => rows.length
    ? `<table><thead><tr><th>Name</th><th>👍</th><th>👎</th></tr></thead><tbody>${rows.map((x) => `<tr><td>${link ? `<a href="../${link}/${esc(x.id)}/"><code>${esc(x.id)}</code></a>` : `<code>${esc(x.id)}</code>`}</td><td>${x.up}</td><td>${x.down}</td></tr>`).join('')}</tbody></table>`
    : '<p class="small">No votes yet.</p>';
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Votes: Nucleus handler tools (maintainers)</title>
<meta name="color-scheme" content="light dark">
<link rel="icon" type="image/png" href="../icon.png">
${themeScript}
${style}
<style>${SITE_HEADER_CSS}
table { border-collapse: collapse; margin: 0 0 24px; font-size: 14px; width: 100%; }
th, td { border-bottom: 1px solid var(--line); padding: 6px 10px; text-align: left; }
td:nth-child(n+2), th:nth-child(n+2) { width: 4.5em; text-align: right; }
</style>
</head>
<body>
${siteHeader('../', '')}
<main>
<h1>Votes</h1>
<p class="lede">For maintainers: the anonymous 👍/👎 on the docs, tips and checks, and how often features are used, ${esc(votes.from)} to ${esc(votes.to)} (updated daily). The docs people mark wrong or unclear come first.</p>
<h2>Docs</h2>
${table(votes.docs ?? [], 'docs')}
<h2>Tips</h2>
${table(votes.tips ?? [])}
<h2>Checks</h2>
${table(votes.rules ?? [], 'rules')}
<h2>Features used</h2>
${(votes.use ?? []).length ? `<table><thead><tr><th>Feature</th><th>Visits</th><th></th></tr></thead><tbody>${votes.use.map((u) => `<tr><td><code>${esc(u.feature)}</code></td><td>${u.count}</td><td></td></tr>`).join('')}</tbody></table>` : '<p class="small">Nothing counted yet.</p>'}
</main>
</body>
</html>
`;
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
}
