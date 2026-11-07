// Keeps a copy of every Hub handler's current version on the data branch, so the workbench can list
// and open all of them without anyone's browser (or our builds) asking the Hub. Runs in the daily Hub
// sync, after the index: only versions it doesn't have yet are fetched, one request at a time, so after
// the first run the Hub sees a handful of requests a day, however many people use the workbench.
//   node tools/hub-mirror.mjs <data dir>
// <data dir>: the data branch, with hub-index.json. Writes:
//   hub/<id>.js        the current version's handler.js, as the Hub serves it
//   hub/packages.json  per handler: version, package id, verified, release date, size, and how many
//                      other files its package has (files; missing until the package was looked at)
//   hub/<id>.files.json  those other files (tools/hub-files.mjs): small ones with content, big ones by
//                      name and size; only for packages that have any
//   covers/<id>.jpg    each game's small cover (IGDB, as the Hub shows it), once per cover
import fs from 'node:fs';
import path from 'node:path';
import { fetchPackageFiles } from './hub-files.mjs';

const HUB = 'https://hub.splitscreen.me';
const UA = 'nucleus-handler-tools hub-mirror (+https://github.com/Snailedlt/nucleuscoop-handler-testbench)';
const dir = process.argv[2];
if (!dir) throw new Error('usage: node tools/hub-mirror.mjs <data dir>');
const MAX_NEW = Number(process.env.HUB_MIRROR_MAX ?? 800); // a cap per run, in case the Hub changes a lot at once
const PAUSE = Number(process.env.HUB_MIRROR_PAUSE_MS ?? 250); // between Hub requests
// Package downloads (.nc) per run: the first runs fill in every handler's files a few dozen a day.
const PKG_MAX = Number(process.env.HUB_MIRROR_PKG_MAX ?? 60);

const index = JSON.parse(fs.readFileSync(path.join(dir, 'hub-index.json'), 'utf8'));
const hubDir = path.join(dir, 'hub');
const coverDir = path.join(dir, 'covers');
fs.mkdirSync(hubDir, { recursive: true });
fs.mkdirSync(coverDir, { recursive: true });
const manifestPath = path.join(hubDir, 'packages.json');
let manifest = {};
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
} catch {}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const get = async (url) => {
  const r = await fetch(url, { headers: { 'user-agent': UA, 'accept-encoding': 'gzip' } });
  if (!r.ok) throw new Error(`${r.status}`);
  return r;
};

let fetched = 0;
let failed = 0;
let covers = 0;
for (const h of index.handlers) {
  const known = manifest[h._id];
  if (known && known.version === h.currentVersion && fs.existsSync(path.join(hubDir, `${h._id}.js`))) continue;
  if (!h.currentPackage) continue;
  if (fetched >= MAX_NEW) break;
  fetched++;
  try {
    const meta = (await (await get(`${HUB}/api/v1/package/${h.currentPackage}`)).json()).packages?.[0]?.meta;
    // The package id comes from the handler's current version; packages from before 2020 don't name their version.
    if (!meta || meta.handlerId !== h._id || (meta.handlerVersion != null && meta.handlerVersion !== h.currentVersion)) throw new Error("package doesn't match the current version");
    if (typeof meta.jsContent !== 'string' || !meta.jsContent.trim()) throw new Error('no handler source');
    const source = meta.jsContent.replace(/\r\n/g, '\n');
    fs.writeFileSync(path.join(hubDir, `${h._id}.js`), source);
    manifest[h._id] = { version: h.currentVersion, package: h.currentPackage, verified: meta.verified === true, released: meta.releaseDate ?? null, bytes: Buffer.byteLength(source) }; // files: below
  } catch (e) {
    failed++;
    console.warn(`${h._id} (${h.title}) v${h.currentVersion}: ${e.message}`);
  }
  await sleep(PAUSE);
}

// The packages' other files: once per version (a new version above dropped its count), and for handlers
// mirrored before files were (backfill), up to PKG_MAX downloads a run. A failed download keeps the
// handler and tries again the next day.
let pkgFetched = 0;
let pkgFailed = 0;
for (const h of index.handlers) {
  const m = manifest[h._id];
  if (!m || m.version !== h.currentVersion || m.files !== undefined) continue;
  if (pkgFetched >= PKG_MAX) break;
  pkgFetched++;
  const out = path.join(hubDir, `${h._id}.files.json`);
  try {
    const { files } = await fetchPackageFiles(h._id, m.package, m.version);
    if (files.length) fs.writeFileSync(out, JSON.stringify({ files }));
    else fs.rmSync(out, { force: true });
    m.files = files.length;
  } catch (e) {
    pkgFailed++;
    console.warn(`${h._id} (${h.title}) v${h.currentVersion} package: ${e.message}`);
  }
  await sleep(PAUSE);
}

// Covers come from IGDB's image CDN (not the Hub), once per cover.
for (const h of index.handlers) {
  if (!h.gameCover || !/^\w{2,20}$/.test(h.gameCover) || fs.existsSync(path.join(coverDir, `${h.gameCover}.jpg`))) continue;
  try {
    const r = await get(`https://images.igdb.com/igdb/image/upload/t_cover_small/${h.gameCover}.jpg`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (/^image\//.test(r.headers.get('content-type') ?? '') && buf.length < 200_000) fs.writeFileSync(path.join(coverDir, `${h.gameCover}.jpg`), buf), covers++;
  } catch {}
  await sleep(50);
}

// Handlers no longer on the Hub, and covers no handler uses, go.
const ids = new Set(index.handlers.map((h) => h._id));
for (const id of Object.keys(manifest)) if (!ids.has(id)) delete manifest[id];
for (const f of fs.readdirSync(hubDir)) if (f.endsWith('.js') && !manifest[f.slice(0, -3)]) fs.rmSync(path.join(hubDir, f));
// Files lists of handlers that are gone, or whose current version has none (or isn't looked at yet).
for (const f of fs.readdirSync(hubDir)) if (f.endsWith('.files.json') && !(manifest[f.slice(0, -11)]?.files > 0)) fs.rmSync(path.join(hubDir, f));
const usedCovers = new Set(index.handlers.map((h) => `${h.gameCover}.jpg`));
for (const f of fs.readdirSync(coverDir)) if (!usedCovers.has(f)) fs.rmSync(path.join(coverDir, f));

const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]));
fs.writeFileSync(manifestPath, JSON.stringify(sorted, null, 0));
const total = Object.keys(sorted).length;
console.log(`Hub mirror: ${total} of ${index.handlers.length} handlers (${fetched} version(s) fetched, ${failed} failed), package files: ${pkgFetched} package(s) downloaded (${pkgFailed} failed), ${Object.values(sorted).filter((m) => m.files !== undefined).length} known, ${covers} new cover(s), ${fs.readdirSync(coverDir).length} covers in all.`);
if (failed > 50 && failed > fetched / 2) throw new Error('Most package lookups failed; is the Hub down?');
