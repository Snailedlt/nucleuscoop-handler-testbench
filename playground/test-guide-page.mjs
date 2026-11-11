// test-guide/: the release test guide (test-guide.md) as a page of the local test site, for the maintainer only.
// build.mjs writes it only with --test-build (never for the live site), unlinked and noindex. Each step can be
// marked passed or a problem (kept in this browser); "Copy the problems" puts the problem steps on the clipboard,
// ready to paste into a message. Temporary: remove it (and test-guide.md) once the release is out.
import fs from 'node:fs';
import path from 'node:path';
import { siteHeader, SITE_HEADER_CSS } from './site-chrome.mjs';

const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

/** `code`, **bold**, *italic* and [links](…), in that order (code first, so nothing inside it is touched). */
function inline(t) {
  const parts = t.split(/(`[^`]+`)/);
  return parts.map((p, i) => {
    if (i % 2) return `<code>${esc(p.slice(1, -1))}</code>`;
    return esc(p)
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text, href) => `<a href="${href}"${/^https?:/.test(href) && !/localhost/.test(href) ? ' target="_blank" rel="noopener"' : ''}>${text}</a>`)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[\s(])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>')
      .replace(/(^|[^"=])(https?:\/\/localhost:\d+\/[^\s<)]*)/g, (_m, pre, url) => `${pre}<a href="${url}">${url}</a>`);
  }).join('');
}

/** The guide's Markdown: headings, paragraphs, lists (with `- [ ] 1.2 …` steps), numbered lists, code blocks, rules. */
function render(md) {
  const out = [];
  const lines = md.replace(/\r/g, '').split('\n');
  let list = null; // 'ul' | 'ol' | 'steps'
  const close = () => { if (list) out.push(list === 'ol' ? '</ol>' : '</ul>'); list = null; };
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/^```/.test(l)) {
      close();
      const code = [];
      while (++i < lines.length && !/^```/.test(lines[i])) code.push(lines[i]);
      out.push(`<div class="code"><pre tabindex="0"><code>${esc(code.join('\n'))}</code></pre><button type="button" class="copy" aria-label="Copy the command">Copy</button></div>`);
      continue;
    }
    let m;
    if ((m = /^- \[ \] (\d+\.\d+[a-z]?) (.*)$/.exec(l))) {
      if (list !== 'steps') { close(); out.push('<ul class="steps">'); list = 'steps'; }
      out.push(`<li class="step" data-step="${m[1]}"><span class="marks"><button type="button" class="mark ok" aria-pressed="false" title="Passed">✓</button><button type="button" class="mark bad" aria-pressed="false" title="A problem">✗</button></span><span class="num">${m[1]}</span> <span class="text">${inline(m[2])}</span></li>`);
      continue;
    }
    if ((m = /^- (.*)$/.exec(l))) { if (list !== 'ul') { close(); out.push('<ul>'); list = 'ul'; } out.push(`<li>${inline(m[1])}</li>`); continue; }
    if ((m = /^\d+\. (.*)$/.exec(l))) { if (list !== 'ol') { close(); out.push('<ol>'); list = 'ol'; } out.push(`<li>${inline(m[1])}</li>`); continue; }
    close();
    if (!l.trim()) continue;
    if (l === '---') { out.push('<hr>'); continue; }
    if ((m = /^(#{1,3}) (.*)$/.exec(l))) {
      const n = m[1].length;
      const id = m[2].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      out.push(n === 1 ? `<h1>${inline(m[2])}</h1>` : `<h${n} id="${id}">${inline(m[2])}</h${n}>`);
      continue;
    }
    out.push(`<p>${inline(l)}</p>`);
  }
  close();
  return out.join('\n');
}

export function writeTestGuidePage({ outDir, startHtml, guide, build }) {
  const style = startHtml.slice(startHtml.indexOf('<style>'), startHtml.indexOf('</style>') + 8);
  const themeScript = (startHtml.match(/<script>\/\* the workbench's theme choice[\s\S]*?<\/script>/) || [''])[0];
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Test guide (maintainer only)</title>
<meta name="color-scheme" content="light dark">
<link rel="icon" type="image/png" href="../icon.png">
${themeScript}
${style}
<style>${SITE_HEADER_CSS}
main { max-width: 860px; }
.tg-bar { position: sticky; top: 0; z-index: 2; display: flex; flex-wrap: wrap; gap: 8px 14px; align-items: center; padding: 10px 0; margin: 0 0 8px; background: var(--bg); border-bottom: 1px solid var(--line); font-size: 14px; }
.tg-bar .btn { font: inherit; padding: 5px 12px; border: 1px solid var(--line); border-radius: var(--r-ctl); background: var(--surface); color: var(--fg); cursor: pointer; }
.tg-bar .note { color: var(--muted); }
.steps { list-style: none; padding: 0; }
.step { display: grid; grid-template-columns: auto auto 1fr; gap: 4px 8px; align-items: start; padding: 6px 4px; border-bottom: 1px solid var(--line); }
.step .num { font-variant-numeric: tabular-nums; font-weight: 700; padding-top: 3px; }
.step .text { padding-top: 3px; }
.marks { display: inline-flex; gap: 4px; }
.mark { width: 30px; height: 30px; border: 1px solid var(--line); border-radius: var(--r-ctl); background: var(--surface); color: var(--muted); cursor: pointer; font: 600 15px/1 inherit; }
.mark.ok[aria-pressed="true"] { background: #1a7f37; border-color: #1a7f37; color: #fff; }
.mark.bad[aria-pressed="true"] { background: #b42318; border-color: #b42318; color: #fff; }
.step.passed .text { opacity: .65; }
.step.problem { background: color-mix(in srgb, #b42318 8%, transparent); }
.problem-note { grid-column: 3; width: 100%; font: inherit; font-size: 14px; padding: 6px 8px; border: 1px solid var(--line); border-radius: var(--r-ctl); background: var(--surface); color: var(--fg); }
.code { position: relative; }
.code pre { padding: 10px 12px; padding-right: 70px; overflow-x: auto; background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-ctl); }
.code .copy { position: absolute; top: 8px; right: 8px; font: inherit; font-size: 13px; padding: 3px 9px; border: 1px solid var(--line); border-radius: var(--r-ctl); background: var(--bg); color: var(--fg); cursor: pointer; }
</style>
</head>
<body>
${siteHeader('../', '')}
<main>
<div class="tg-bar" role="region" aria-label="Progress">
  <span id="tg-count" role="status"></span>
  <button type="button" class="btn" id="tg-copy">Copy the problems</button>
  <button type="button" class="btn" id="tg-reset">Clear all marks</button>
  <span class="note">For you only: not on the live site. Marks stay in this browser. Built ${esc(build)}.</span>
</div>
${render(guide)}
</main>
<script>
(function () {
  var KEY = 'nucleus-test-guide';
  var state = {};
  try { state = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  var steps = Array.prototype.slice.call(document.querySelectorAll('.step'));
  function paint(li) {
    var s = state[li.dataset.step] || {};
    li.querySelector('.ok').setAttribute('aria-pressed', String(s.mark === 'ok'));
    li.querySelector('.bad').setAttribute('aria-pressed', String(s.mark === 'bad'));
    li.classList.toggle('passed', s.mark === 'ok');
    li.classList.toggle('problem', s.mark === 'bad');
    var note = li.querySelector('.problem-note');
    if (s.mark === 'bad' && !note) {
      note = document.createElement('input');
      note.className = 'problem-note'; note.type = 'text'; note.placeholder = 'What happened? (optional)';
      note.setAttribute('aria-label', 'What happened in step ' + li.dataset.step);
      note.value = s.note || '';
      note.addEventListener('input', function () { (state[li.dataset.step] = state[li.dataset.step] || {}).note = note.value; save(); });
      li.appendChild(note);
    } else if (s.mark !== 'bad' && note) note.remove();
  }
  function count() {
    var ok = 0, bad = 0;
    steps.forEach(function (li) { var m = (state[li.dataset.step] || {}).mark; if (m === 'ok') ok++; if (m === 'bad') bad++; });
    document.getElementById('tg-count').textContent = ok + ' passed, ' + bad + ' with a problem, ' + (steps.length - ok - bad) + ' to go (of ' + steps.length + ')';
  }
  steps.forEach(function (li) {
    li.querySelectorAll('.mark').forEach(function (b) {
      b.addEventListener('click', function () {
        var s = state[li.dataset.step] = state[li.dataset.step] || {};
        var m = b.classList.contains('ok') ? 'ok' : 'bad';
        s.mark = s.mark === m ? undefined : m;
        save(); paint(li); count();
      });
    });
    paint(li);
  });
  count();
  document.getElementById('tg-copy').addEventListener('click', function () {
    var lines = steps.filter(function (li) { return (state[li.dataset.step] || {}).mark === 'bad'; }).map(function (li) {
      var s = state[li.dataset.step];
      return '- ' + li.dataset.step + ': ' + li.querySelector('.text').textContent.trim().slice(0, 90) + (s.note ? ' → ' + s.note : '');
    });
    var text = lines.length ? 'Problems in the 0.6.0 test:\\n' + lines.join('\\n') : 'No problems marked.';
    var b = this;
    (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(function () { b.textContent = 'Copied ✓'; setTimeout(function () { b.textContent = 'Copy the problems'; }, 1500); }, function () { window.prompt('Copy this:', text); });
  });
  document.getElementById('tg-reset').addEventListener('click', function () {
    if (!confirm('Clear every ✓ and ✗ on this page?')) return;
    state = {}; save(); steps.forEach(paint); count();
  });
  document.querySelectorAll('.code .copy').forEach(function (b) {
    b.addEventListener('click', function () {
      var t = b.parentNode.querySelector('code').textContent;
      if (navigator.clipboard) navigator.clipboard.writeText(t).then(function () { b.textContent = 'Copied'; setTimeout(function () { b.textContent = 'Copy'; }, 1200); });
    });
  });
})();
</script>
</body>
</html>
`;
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
}
