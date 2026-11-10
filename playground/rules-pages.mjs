// One page per check (rules/<id>/) and a list of them all (rules/), from the shared core's core/ruledocs.ts:
// what it means, why, a wrong and a right example, how to fix it, and how to turn it off. The editors link
// each problem to its page; Discord helpers can link one too. Called by build.mjs.
import fs from 'node:fs';
import path from 'node:path';

const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
/** `code` and **bold** in the plain-words texts. */
const inline = (t) => esc(t).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
/** Handler code, coloured: comments, strings, keywords and numbers (the start page's .hk/.hs/.hc colours). */
function hl(code) {
  const re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`[^`]*`)|\b(var|let|const|function|return|if|else|for|while|switch|case|break|new|true|false|null|undefined|typeof|try|catch|finally|in|this|throw|continue)\b|\b(0x[0-9a-fA-F]+|\d+(?:\.\d+)?)\b/g;
  let out = '', last = 0;
  for (let m; (m = re.exec(code)); ) {
    out += esc(code.slice(last, m.index));
    const cls = m[1] ? 'hc' : m[2] ? 'hs' : 'hk';
    out += `<span class="${cls}">${esc(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  return out + esc(code.slice(last));
}
const SEV = { error: 'Error', warning: 'Warning', info: 'Info', hint: 'Hint' };
const SEV_WHAT = {
  error: 'Nucleus fails: the handler doesn\'t load, or the session ends.',
  warning: 'Probably wrong: Nucleus runs it, but not the way you meant.',
  info: 'Worth knowing: it works, with a catch.',
  hint: 'A tidy-up; nothing breaks.',
};

/**
 * @param {{ outDir: string, startHtml: string, RULES: Record<string, {severity: string, description: string}>, RULE_DOCS: Record<string, any>, JS_RULES: Record<string, unknown>, base: string, preview: boolean, noindex: string }} o
 */
export function writeRulePages(o) {
  const { outDir, startHtml, RULES, RULE_DOCS, JS_RULES } = o;
  // The start page's look (its tokens, light/dark, type), so the pages feel like the same site.
  const style = startHtml.slice(startHtml.indexOf('<style>'), startHtml.indexOf('</style>') + 8);
  const themeScript = (startHtml.match(/<script>\/\* the workbench's theme choice[\s\S]*?<\/script>/) || [''])[0];
  const ids = Object.keys(RULES).filter((id) => RULE_DOCS[id]);
  const kind = (id) => (id in JS_RULES ? 'js' : 'nucleus');
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
.rmeta { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin: 0 0 18px; font-size: 14px; color: var(--muted); }
.sev { font-weight: 700; font-size: 12px; letter-spacing: .03em; text-transform: uppercase; padding: 2px 8px; border-radius: 999px; border: 1px solid currentColor; }
.sev.error { color: #c2262c; } .sev.warning { color: #8a5a00; } .sev.info { color: #0c76a5; } .sev.hint { color: var(--muted); }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .sev.error { color: #ff7b7f; } :root:not([data-theme="light"]) .sev.warning { color: #ffc94d; } :root:not([data-theme="light"]) .sev.info { color: #6cc0f0; } }
:root[data-theme="dark"] .sev.error { color: #ff7b7f; } :root[data-theme="dark"] .sev.warning { color: #ffc94d; } :root[data-theme="dark"] .sev.info { color: #6cc0f0; }
.ex { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.ex pre.cfg { white-space: pre-wrap; overflow-wrap: anywhere; }
.ex h3 { font-size: 14px; margin: 0 0 4px; } .ex .wrong h3 { color: var(--muted); }
@media (max-width: 760px) { .ex { grid-template-columns: 1fr; } }
.ruleset { list-style: none; padding: 0; margin: 8px 0 20px; display: grid; gap: 6px; }
.ruleset li a { display: flex; flex-wrap: wrap; gap: 4px 10px; align-items: baseline; padding: 10px 14px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-pane); color: var(--fg); text-decoration: none; }
.ruleset li a:hover { border-color: var(--accent); }
.ruleset strong { font-size: 15px; } .ruleset code { font-size: 12px; } .ruleset small { flex-basis: 100%; color: var(--muted); font-size: 13.5px; }
.rsearch { width: 100%; max-width: 420px; padding: 8px 12px; font: inherit; border: 1px solid var(--line); border-radius: var(--r-ctl); background: var(--surface); color: var(--fg); }
.pn { display: flex; justify-content: space-between; gap: 12px; margin-top: 28px; font-size: 14px; }
</style>
</head>
<body>
<main>
`;
  const foot = (up) => `</main>
<footer class="small"><a href="${up}start/">About these tools</a> · <a href="${up}">Open the workbench</a> · <a href="https://github.com/Snailedlt/splitscreenme-vscode/issues/new?template=tester-feedback.yml">Something wrong on this page?</a></footer>
</body>
</html>
`;
  // The first sentence: up to a full stop followed by a space and a capital (so "Jint 2.11.58" or "e.g." don't end it).
  const firstSentence = (t) => (t.match(/^[\s\S]*?[.!?](?=\s+[A-Z"`(]|$)/) || [t])[0];
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  ids.forEach((id, i) => {
    const r = RULES[id], d = RULE_DOCS[id];
    const prev = ids[i - 1], next = ids[i + 1];
    const js = kind(id) === 'js';
    const off = `"splitscreenme.lint.rules": { "${id}": "off" }`;
    const body = `<p class="crumbs"><a href="../../start/">Nucleus handler tools</a> › <a href="../">Checks</a></p>
<h1>${inline(d.title)}</h1>
<p class="rmeta"><span class="sev ${r.severity}">${SEV[r.severity]}</span><code>${esc(id)}</code><span>${js ? `A general JavaScript mistake (ESLint's <code>${esc(id)}</code>)` : 'A Nucleus check'} · ${esc(SEV_WHAT[r.severity])}</span></p>
<h2>Why it matters</h2>
<p>${inline(d.why)}</p>
${d.bad ? `<h2>Example</h2>
<div class="ex"><div class="wrong"><h3>✗ Wrong</h3><pre class="cfg"><code>${hl(d.bad)}</code></pre></div><div class="right"><h3>✓ Right</h3><pre class="cfg"><code>${hl(d.good)}</code></pre></div></div>` : `<p class="small">${inline(d.noExample || '')}</p>`}
<h2>How to fix it</h2>
<p>${inline(d.fix)}</p>
<h2>Turn it off, or change how it shows</h2>
<p class="small">Each check can be shown as an error, warning, info or hint, or turned off. VS Code: <code>${esc(off)}</code> in your settings. Notepad++: <strong>Plugins › Nucleus Co-op handlers › Settings</strong>. Command line: <code>ncdev lint --rule ${esc(id)}=off</code>. Other editors: the <code>lint.rules</code> setting of <code>ncdev lsp</code>.</p>
<nav class="pn" aria-label="Other checks">${prev ? `<a href="../${encodeURIComponent(prev)}/">‹ ${inline(RULE_DOCS[prev].title)}</a>` : '<span></span>'}${next ? `<a href="../${encodeURIComponent(next)}/">${inline(RULE_DOCS[next].title)} ›</a>` : ''}</nav>
`;
    fs.mkdirSync(path.join(outDir, id), { recursive: true });
    fs.writeFileSync(path.join(outDir, id, 'index.html'), head(`${d.title.replace(/`/g, '')} (${id}): Nucleus handler check`, firstSentence(d.why.replace(/`/g, '')), `${o.base}rules/${id}/`, '../../') + body + foot('../../'));
  });
  // The list: the Nucleus checks, then the general JavaScript ones; a filter box.
  const group = (title, which) => `<h2>${title}</h2>
<ul class="ruleset">${ids.filter((id) => kind(id) === which).map((id) => `<li data-q="${esc((id + ' ' + RULE_DOCS[id].title + ' ' + RULE_DOCS[id].why).toLowerCase())}"><a href="${encodeURIComponent(id)}/"><strong>${inline(RULE_DOCS[id].title)}</strong><span class="sev ${RULES[id].severity}">${SEV[RULES[id].severity]}</span><code>${esc(id)}</code><small>${inline(firstSentence(RULE_DOCS[id].why))}</small></a></li>`).join('')}</ul>`;
  const list = `<p class="crumbs"><a href="../start/">Nucleus handler tools</a> › Checks</p>
<h1>Every check</h1>
<p class="lede">What the tools check in a handler, one page each: what it means, why Nucleus cares, an example and the fix. The same checks run in VS Code, Notepad++, the workbench and <code>ncdev lint</code>.</p>
<p><input class="rsearch" type="search" placeholder="Filter: a word, an option, a rule name" aria-label="Filter the checks"></p>
${group('Nucleus checks', 'nucleus')}
${group('General JavaScript mistakes', 'js')}
<script>
(function () {
  var q = document.querySelector('.rsearch');
  q.addEventListener('input', function () {
    var w = q.value.trim().toLowerCase();
    document.querySelectorAll('.ruleset li').forEach(function (li) { li.hidden = !!w && li.dataset.q.indexOf(w) < 0; });
  });
})();
</script>
`;
  fs.writeFileSync(path.join(outDir, 'index.html'), head('Every check: Nucleus handler tools', 'What the Nucleus handler tools check, one page each: what it means, why, an example and the fix.', `${o.base}rules/`, '../') + list + foot('../'));
  return ids;
}
