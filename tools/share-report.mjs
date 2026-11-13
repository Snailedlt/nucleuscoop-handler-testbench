// How well Hub handlers could be shared from the workbench as whole packages (handler.js plus its <Name>/ folder):
// how many fit in a link (tier 1) at 8, 16, 32 and 64 KB of link text, with and without their binaries; how many
// need a Gist (tier 2); which binaries are common enough to list by name as known dependencies.
//
//   node tools/share-report.mjs [--out <dir>] [--limit N] [--cache <dir>] [--keep]
//
// Every package is downloaded once through splitscreenme-vscode's src/hubcache.ts (its own limit of two at a time,
// hubClientHeaders(tool, 'share-report'), the daily index for the list), never by calling the Hub API directly.
// Packages go to a temporary cache and are deleted as soon as they're measured (--keep keeps them, for a rerun);
// nothing downloaded is written to the repository. The results: <out>/share-report.json and <out>/share-report.md.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import zlib from 'node:zlib';
import { coreDir, load } from './bundle-ts.mjs';

const arg = (name, def) => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : def; };
const OUT = path.resolve(arg('--out', path.join(os.tmpdir(), 'share-report')));
const CACHE = path.resolve(arg('--cache', path.join(os.tmpdir(), 'share-report-cache')));
const LIMIT = Number(arg('--limit', 0)) || Infinity;
const KEEP = process.argv.includes('--keep');
const LIMITS_KB = [8, 16, 32, 64];
const PREFIX = '#share-'.length;

const hub = await load(path.join(coreDir, 'src/hubcache.ts'));
const { zipBytes } = await load(path.join(coreDir, 'src/core/zipbytes.ts'));
hub.setHubTool('testbench-tools');

// Text by extension; anything else is a binary (a DLL, an archive, an image, a game data file).
const TEXT_EXT = new Set('js json txt ini cfg conf xml md bat cmd ps1 lua reg csv yml yaml toml html htm css log properties vdf acf sh py nfo cs h c cpp hpp def inf url gitignore'.split(' '));
function isBinary(name, data) {
  const ext = name.toLowerCase().split('.').pop();
  if (!TEXT_EXT.has(ext)) return true;
  // A text extension stays text unless it holds NUL bytes (UTF-16 with its BOM, and Latin-1 INI files, are text).
  if ((data[0] === 0xff && data[1] === 0xfe) || (data[0] === 0xfe && data[1] === 0xff)) return false;
  return data.subarray(0, 8192).includes(0);
}

const deflate = (raw) => new Uint8Array(zlib.deflateRawSync(raw, { level: 9 }));
const b64urlLen = (n) => Math.ceil((n * 4) / 3); // without padding
const b62Len = (n) => Math.floor(n / 5) * 7 + [0, 2, 3, 5, 6][n % 5]; // core/sharelink.ts: 5 bytes → 7 characters
/** The link text for these files: zipped with deflate, then base64url (and today's base62), after "#share-". */
function linkSize(files) {
  const zip = zipBytes(files.map((f) => ({ name: f.name, data: f.data })), new Date(0), deflate);
  return { zip: zip.length, b64url: PREFIX + b64urlLen(zip.length), b62: PREFIX + b62Len(zip.length) };
}

function measure(h, entries) {
  const files = entries.filter((e) => e.data && !e.name.endsWith('/')).map((e) => ({ name: e.name, data: e.data, size: e.data.length, binary: e.name === 'handler.js' ? false : isBinary(e.name, e.data) }));
  const all = linkSize(files);
  const text = linkSize(files.filter((f) => !f.binary));
  const binaries = files.filter((f) => f.binary).map((f) => ({ name: path.posix.basename(f.name), path: f.name, size: f.size }));
  return {
    id: h._id,
    title: h.title,
    version: h.currentVersion,
    files: files.length,
    rawBytes: files.reduce((n, f) => n + f.size, 0),
    largest: [...files].sort((a, b) => b.size - a.size).slice(0, 3).map((f) => ({ name: f.name, size: f.size, binary: f.binary })),
    binaries,
    link: all,
    linkNoBinaries: text,
  };
}

const list = (await hub.hubHandlers({ feature: 'share-report' })).slice(0, LIMIT);
console.error(`${list.length} handlers on the Hub; downloading each package once (two at a time)…`);
fs.mkdirSync(CACHE, { recursive: true });
const results = [];
const failed = [];
let done = 0;
await Promise.all(
  list.map(async (h) => {
    try {
      const entries = await hub.hubPackage(h, { feature: 'share-report', dir: CACHE });
      results.push(measure(h, entries));
    } catch (e) {
      failed.push({ id: h._id, title: h.title, error: String(e?.message ?? e) });
    } finally {
      if (!KEEP) fs.rmSync(path.join(CACHE, 'packages', `${h._id.replace(/[^\w-]/g, '')}-v${Number(h.currentVersion)}.nc`), { force: true });
      if (++done % 50 === 0) console.error(`${done} of ${list.length}`);
    }
  }),
);

// ---------------------------------------------------------------------------
// Summary

const n = results.length;
const pct = (k) => (n ? Math.round((k / n) * 1000) / 10 : 0);
const fits = (key, kb, enc = 'b64url') => results.filter((r) => r[key][enc] <= kb * 1024).length;
const tier1 = LIMITS_KB.map((kb) => ({ kb, withBinaries: fits('link', kb), withoutBinaries: fits('linkNoBinaries', kb), withBinariesBase62: fits('link', kb, 'b62') }));
const median = (xs) => { const s = [...xs].sort((a, b) => a - b); return s.length ? s[Math.floor(s.length / 2)] : 0; };

const byName = new Map();
for (const r of results) for (const b of r.binaries) {
  const k = b.name.toLowerCase();
  const e = byName.get(k) ?? { name: b.name, handlers: new Set(), sizes: [] };
  e.handlers.add(r.id);
  e.sizes.push(b.size);
  byName.set(k, e);
}
const commonBinaries = [...byName.values()]
  .map((e) => ({ name: e.name, handlers: e.handlers.size, typicalSize: median(e.sizes), sizes: new Set(e.sizes).size }))
  .sort((a, b) => b.handlers - a.handlers || b.typicalSize - a.typicalSize)
  .slice(0, 20);

const biggest = [...results].sort((a, b) => b.link.b64url - a.link.b64url).slice(0, 10);
const withBinaries = results.filter((r) => r.binaries.length).length;
const summary = {
  generated: new Date().toISOString(),
  source: 'every Hub package, downloaded once through hubcache.ts',
  handlers: n,
  failed,
  withBinaries,
  tier1,
  // At each limit: fits only when its binaries are listed by name instead of embedded; and needs tier 2 even then.
  byLimit: LIMITS_KB.map((kb) => ({
    kb,
    onlyWithoutBinaries: results.filter((r) => r.link.b64url > kb * 1024 && r.linkNoBinaries.b64url <= kb * 1024).length,
    needsTier2: results.filter((r) => r.link.b64url > kb * 1024).length,
    needsTier2EvenWithoutBinaries: results.filter((r) => r.linkNoBinaries.b64url > kb * 1024).length,
  })),
  median: { files: median(results.map((r) => r.files)), link: median(results.map((r) => r.link.b64url)), linkNoBinaries: median(results.map((r) => r.linkNoBinaries.b64url)) },
  commonBinaries,
  biggest: biggest.map((r) => ({ id: r.id, title: r.title, files: r.files, rawBytes: r.rawBytes, link: r.link.b64url, linkNoBinaries: r.linkNoBinaries.b64url, largest: r.largest })),
};

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'share-report.json'), JSON.stringify({ summary, handlers: results }, null, 1));
const kb = (b) => `${(b / 1024).toFixed(b < 10240 ? 1 : 0)} KB`;
const md = [
  `# Sharing Hub handlers as whole packages`,
  ``,
  `${n} handlers measured${failed.length ? ` (${failed.length} failed to download)` : ''}; ${withBinaries} (${pct(withBinaries)}%) ship binaries.`,
  ``,
  `| Link limit | Fit with binaries | Fit without binaries |`,
  `| --- | --- | --- |`,
  ...tier1.map((t) => `| ${t.kb} KB | ${t.withBinaries} (${pct(t.withBinaries)}%) | ${t.withoutBinaries} (${pct(t.withoutBinaries)}%) |`),
  ``,
  `## Most common binaries`,
  ...commonBinaries.map((b) => `- ${b.name}: ${b.handlers} handlers, typically ${kb(b.typicalSize)}`),
  ``,
  `## Biggest packages`,
  ...summary.biggest.map((r) => `- ${r.title}: ${kb(r.link)} of link (${r.files} files; largest ${r.largest.map((f) => `${f.name} ${kb(f.size)}`).join(', ')})`),
].join('\n');
fs.writeFileSync(path.join(OUT, 'share-report.md'), md + '\n');
console.error(`Wrote ${path.join(OUT, 'share-report.json')} and share-report.md`);
console.log(md);
