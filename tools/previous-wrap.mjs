// The previous release of the workbench, served at /previous/ so beta testers can compare (previous.json; the
// Pages workflow builds it). This wraps that old page:
//   - its browser storage gets a "prev:" prefix, so it never reads or overwrites the new version's settings, drafts
//     and tabs (both live on the same site);
//   - a bar says which version it is, with a link that opens the same handler in the new one;
//   - noindex, so search engines only list the current version.
//   node tools/previous-wrap.mjs <old index.html> <out index.html> <label>
import fs from 'node:fs';
import path from 'node:path';

const [src, out, label = 'previous'] = process.argv.slice(2);
if (!src || !out) {
  console.error('usage: node tools/previous-wrap.mjs <old index.html> <out index.html> <label>');
  process.exit(1);
}
let html = fs.readFileSync(src, 'utf8');
const safe = label.replace(/[^\w .:-]/g, '');
const head = `<meta name="robots" content="noindex">
<script>(function () {
  // Separate storage for the previous version (same site as the new one).
  try {
    var P = 'prev:', S = Storage.prototype, g = S.getItem, s = S.setItem, r = S.removeItem;
    S.getItem = function (k) { return g.call(this, P + k); };
    S.setItem = function (k, v) { return s.call(this, P + k, v); };
    S.removeItem = function (k) { return r.call(this, P + k); };
  } catch (e) { /* storage off */ }
})();</script>
<style>
#prev-bar { position: fixed; z-index: 2147483000; left: 50%; bottom: 12px; transform: translateX(-50%); display: flex; gap: 12px; align-items: center; padding: 8px 10px 8px 16px; border-radius: 999px; background: #1b1f2a; color: #fff; font: 600 13px/1.3 system-ui, sans-serif; box-shadow: 0 6px 24px rgba(0,0,0,.35); max-width: calc(100vw - 24px); }
#prev-bar a { color: #1b1f2a; background: #ffcf3a; padding: 6px 12px; border-radius: 999px; text-decoration: none; white-space: nowrap; }
#prev-bar a:focus-visible { outline: 3px solid #fff; outline-offset: 2px; }
@media print { #prev-bar { display: none; } }
</style>`;
const bar = `<div id="prev-bar" role="region" aria-label="Version"><span>The previous version (${safe}), for comparing</span><a id="prev-new" href="../">Open this in the new version</a></div>
<script>(function () {
  var a = document.getElementById('prev-new');
  function sync() { a.href = '../' + location.hash; }
  sync(); window.addEventListener('hashchange', sync);
})();</script>`;
if (!/<head[^>]*>/i.test(html) || !/<\/body>/i.test(html)) throw new Error('Unexpected page: no <head> or </body>');
html = html.replace(/<head[^>]*>/i, (m) => `${m}\n${head}`).replace(/<\/body>/i, `${bar}\n</body>`);
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
console.log(`${out}: the previous version (${safe}), ${(html.length / 1024).toFixed(0)} KB`);
