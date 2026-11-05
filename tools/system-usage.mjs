// How many Hub handlers use each .NET `System.*` call, for the workbench's Lines column.
// A separate sample from usage-counts.mjs (the System list came later), with its own total, so
// Lines can say "of N" truthfully. Reads already-downloaded handler .js files; writes only counts.
//   node tools/system-usage.mjs <dir with handler .js files (any depth)>
// Merges `system: { handlers, takenAt, counts }` into playground/src/usage.json.
import fs from 'node:fs';
import path from 'node:path';

const here = path.dirname(new URL(import.meta.url).pathname);
const dir = process.argv[2];
if (!dir) throw new Error('usage: node tools/system-usage.mjs <handlers-dir>');

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.js') ? [path.join(d, e.name)] : []));
// One file per handler: a package's handler.js, or a downloaded <id>-vN.js. Skip other scripts in packages.
const files = walk(dir).filter((f) => path.basename(f) === 'handler.js' || /-v\d+\.js$/.test(f));
const counts = {};
for (const f of files) {
  const text = fs.readFileSync(f, 'utf8');
  const seen = new Set();
  // System.IO.File.Copy, System.Threading.Thread.Sleep, System.Environment.UserName (Jint: first letter case-insensitive)
  for (const m of text.matchAll(/\bSystem(?:\.[A-Za-z]+)+/g)) {
    const parts = m[0].split('.');
    if (parts.length < 3) continue;
    const name = parts.pop();
    seen.add(`${parts.join('.')}.${name[0].toUpperCase()}${name.slice(1)}`);
  }
  for (const k of seen) counts[k] = (counts[k] ?? 0) + 1;
}
const out = path.join(here, '..', 'playground', 'src', 'usage.json');
const usage = JSON.parse(fs.readFileSync(out, 'utf8'));
usage.system = { handlers: files.length, takenAt: new Date().toISOString().slice(0, 10), counts: Object.fromEntries(Object.entries(counts).sort((a, b) => b[1] - a[1])) };
fs.writeFileSync(out, JSON.stringify(usage));
console.log(`${files.length} handlers, ${Object.keys(counts).length} System names`);
