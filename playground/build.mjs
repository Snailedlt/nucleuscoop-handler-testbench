// Builds dist/workbench.html: one self-contained page (no CDN needed) with the
// splitscreenme-vscode linter/API core, CodeMirror 5, the probes and their Jint results.
//
//   node build.mjs [--core ../../splitscreenme-vscode]
//
// The core is imported from a checkout of splitscreenme-vscode (src/core), so the
// page always runs the same linter as the extension.
import { siteHeader, SITE_HEADER_CSS, siteVisitScript, COPY_CSS, COPY_SCRIPT, COMMUNITY, COMMUNITY_CSS, withCommunity } from './site-chrome.mjs';
import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import * as esbuild from 'esbuild';
import { fetchPackageFiles, slimFiles } from '../tools/hub-files.mjs';
import { hubClientHeaders } from '../tools/hub-client.mjs';

const PAGES_BASE = 'https://snailedlt.github.io/nucleuscoop-handler-testbench/';
// A preview build (the Claude artifact, the raw.githack test address) is served somewhere else: its
// links are relative, so they stay in that environment, it names no canonical address, and asks not
// to be indexed. Only the Pages deploy (no --preview) uses absolute links to the live site.
const PREVIEW = process.argv.includes('--preview');
const NOINDEX = PREVIEW ? '<meta name="robots" content="noindex, nofollow">\n' : '';

const here = path.dirname(fileURLToPath(import.meta.url));
// A Windows checkout made before .gitattributes (eol=lf) has CRLF files, which the build's line-based parsing
// can't read. Say how to fix it instead of failing somewhere deep inside.
if (fs.readFileSync(path.join(here, '..', 'probes', 'expected.txt'), 'utf8').includes('\r')) {
  console.error('This checkout has Windows (CRLF) line endings; the build needs LF. Fix it once, in nucleuscoop-handler-testbench\n(this discards uncommitted changes there):\n\n  git rm -r -q --cached . && git reset -q --hard\n');
  process.exit(1);
}
const argCore = process.argv.indexOf('--core');
const coreRepo = path.resolve(argCore > 0 ? process.argv[argCore + 1] : process.env.SPLITSCREENME_VSCODE ?? path.join(here, '..', '..', 'splitscreenme-vscode'));
if (!fs.existsSync(path.join(coreRepo, 'src', 'core', 'lint.ts'))) {
  console.error(`splitscreenme-vscode not found at ${coreRepo}. Pass --core <path>.`);
  process.exit(1);
}
if (!fs.existsSync(path.join(coreRepo, 'node_modules', 'acorn'))) {
  console.error(`Run "npm ci" in ${coreRepo} first (the core needs acorn).`);
  process.exit(1);
}

const rev = (dir) => {
  try {
    return execSync('git rev-parse --short HEAD', { cwd: dir, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return 'unknown';
  }
};

// Probes and the results the testbench recorded for them with Jint 2.11.58.
const probesDir = path.join(here, '..', 'probes');
const expected = Object.fromEntries(
  fs.readFileSync(path.join(probesDir, 'expected.txt'), 'utf8').trim().split('\n').map((l) => {
    const m = l.match(/^(\S+) (\S+)\s*(.*)$/);
    return [m[2], { jint: m[1], detail: m[3].trim() }];
  }),
);
const probes = fs.readdirSync(probesDir).filter((f) => f.endsWith('.js')).sort().map((name) => ({
  name,
  source: fs.readFileSync(path.join(probesDir, name), 'utf8'),
  jint: expected[name]?.jint ?? '?',
  detail: (expected[name]?.detail ?? '').replace(/calls=\d+\s*args\[P1\]=\s*$/, '').replace(/\(no Game\.Play\)/, '').trim(),
}));

// Hub examples: a snapshot of the most-downloaded handlers, taken through the hub API at
// build time (a published artifact can't reach other sites at view time). Only handlers whose
// CURRENT VERSION is verified are included: the source is that verified package's own jsContent.
//   --hub <n>      how many to include (default 40, 0 to skip)
//   --refresh-hub  ignore the local cache (hub-cache.json)
const HUB = 'https://hub.splitscreen.me';
const argHub = process.argv.indexOf('--hub');
const hubCount = argHub > 0 ? Number(process.argv[argHub + 1]) : 40;
const cachePath = path.join(here, 'hub-cache.json');
//   --hub-data <dir>  the data branch, checked out (tools/hub-mirror.mjs): EVERY Hub handler, from our own
//                  copy; no Hub requests at all. The Pages build uses this; the snapshot below is the
//                  fallback for a build without it (a local one).
const argData = process.argv.indexOf('--hub-data');
let hubData = argData > 0 ? path.resolve(process.argv[argData + 1]) : null;
// Until the daily sync has mirrored the handlers once (the data branch has no hub/ yet), the snapshot.
if (hubData && !fs.existsSync(path.join(hubData, 'hub', 'packages.json'))) {
  console.warn(`No mirrored handlers in ${hubData} yet (tools/hub-mirror.mjs runs in the daily Hub sync): using the snapshot of the most downloaded.`);
  hubData = null;
}
// Our daily index (data branch), read at most once per build.
const INDEX_URL = 'https://raw.githubusercontent.com/Snailedlt/nucleuscoop-handler-testbench/data/hub-index.json';
let rawIndexP = null;
const rawIndex = () => (rawIndexP ??= fetch(INDEX_URL).then((r) => { if (!r.ok) throw new Error(`${INDEX_URL}: ${r.status}`); return r.json(); }));
function hubFromData(dir) {
  const idx = JSON.parse(fs.readFileSync(path.join(dir, 'hub-index.json'), 'utf8'));
  const pk = JSON.parse(fs.readFileSync(path.join(dir, 'hub', 'packages.json'), 'utf8'));
  const handlers = [];
  for (const h of idx.handlers) {
    const p = pk[h._id];
    const file = path.join(dir, 'hub', `${h._id}.js`);
    if (!p || p.version !== h.currentVersion || !fs.existsSync(file)) continue;
    handlers.push({
      id: h._id,
      title: h.title,
      game: h.gameName,
      owner: h.ownerName,
      version: h.currentVersion,
      downloads: h.downloadCount ?? 0,
      maxPlayers: h.maxPlayers ?? null,
      multiKbm: !!h.playableMultiMouseKeyboard,
      updated: p.released ?? h.updatedAt ?? null,
      url: `${HUB}/handler/${h._id}`,
      cover: h.gameCover ?? undefined,
      ...(p.verified ? {} : { unverified: true }),
      // The package's other files (tools/hub-mirror.mjs): hub/<id>.files.json, when it has any.
      ...(p.files > 0 && fs.existsSync(path.join(dir, 'hub', `${h._id}.files.json`)) ? { files: p.files } : {}),
      source: fs.readFileSync(file, 'utf8'),
    });
  }
  handlers.sort((a, b) => b.downloads - a.downloads || a.id.localeCompare(b.id));
  return { takenAt: idx.syncedAt, handlers, rejected: [], all: true };
}
async function hubExamples() {
  if (hubData) return hubFromData(hubData);
  if (!hubCount) return { takenAt: null, handlers: [], rejected: [] };
  if (!process.argv.includes('--refresh-hub') && fs.existsSync(cachePath)) {
    const cached = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
    if (cached.handlers.length >= hubCount) return { ...cached, handlers: cached.handlers.slice(0, hubCount) };
  }
  // A refresh fetches the list, then only versions the last snapshot doesn't have (a version never
  // changes), naming the tool in its User-Agent.
  const previous = new Map();
  try {
    for (const h of JSON.parse(fs.readFileSync(cachePath, 'utf8')).handlers) previous.set(`${h.id}-v${h.version}`, h);
  } catch {}
  const get = async (url) => {
    const r = await fetch(url, { headers: hubClientHeaders('workbench-build', 'examples'), signal: AbortSignal.timeout(30000) });
    if (!r.ok) throw new Error(`${url}: ${r.status}`);
    return r.json();
  };
  // The list comes from our daily index (tools/hub-sync.mjs), not the Hub; the Hub only if it's missing.
  let listing;
  try {
    const idx = await rawIndex();
    if (Date.now() - Date.parse(idx.syncedAt) > 3 * 86400_000) throw new Error('index older than 3 days');
    listing = idx.handlers;
  } catch (e) {
    console.warn(`Hub index unavailable (${e.message}); reading the Hub's list instead.`);
    listing = (await get(`${HUB}/api/v1/allhandlers`)).Handlers;
  }
  listing.sort((a, b) => (b.downloadCount ?? 0) - (a.downloadCount ?? 0));
  const handlers = [];
  const rejected = [];
  let reused = 0;
  let lookedUp = 0;
  for (const h of listing) {
    if (handlers.length >= hubCount) break;
    const known = previous.get(`${h._id}-v${h.currentVersion}`);
    if (known) {
      handlers.push({ ...known, cover: h.gameCover ?? known.cover }); // as in the last snapshot (download counts too), so an unchanged Hub gives an identical page
      reused++;
      continue;
    }
    lookedUp++;
    let meta;
    try {
      meta = (await get(`${HUB}/api/v1/package/${h.currentPackage}`)).packages?.[0]?.meta;
    } catch (e) {
      rejected.push({ id: h._id, title: h.title, reason: `package lookup failed: ${e.message}` });
      continue;
    }
    const reason =
      meta?.verified !== true ? 'current version is not verified'
      : meta.handlerId !== h._id || meta.handlerVersion !== h.currentVersion ? 'package does not match the current version'
      : typeof meta.jsContent !== 'string' || !meta.jsContent.trim() ? 'package has no handler source'
      : null;
    if (reason) {
      rejected.push({ id: h._id, title: h.title, reason });
      continue;
    }
    handlers.push({
      id: h._id,
      title: h.title,
      game: h.gameName,
      owner: h.ownerName,
      version: h.currentVersion,
      downloads: h.downloadCount ?? 0,
      maxPlayers: h.maxPlayers ?? null,
      multiKbm: !!h.playableMultiMouseKeyboard,
      updated: meta.releaseDate ?? h.updatedAt ?? null,
      url: `${HUB}/handler/${h._id}`,
      cover: h.gameCover ?? undefined, // the game's IGDB cover id, as the Hub shows it
      source: meta.jsContent.replace(/\r\n/g, '\n'),
    });
  }
  // Ordered by the snapshot's own counts, so day-to-day swaps in live counts don't change the page.
  handlers.sort((a, b) => b.downloads - a.downloads || a.id.localeCompare(b.id));
  console.log(`Hub snapshot: ${reused} handler(s) unchanged since the last one, ${lookedUp} looked up.`);
  // Keep the snapshot's date unless a handler changed, so an unchanged Hub gives an identical page
  // (and the deploy is skipped).
  let takenAt = new Date().toISOString();
  try {
    const prev = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
    const key = (hs) => hs.map((h) => `${h.id}-v${h.version}`).join(',');
    if (prev.takenAt && key(prev.handlers) === key(handlers)) takenAt = prev.takenAt;
  } catch {}
  const result = { takenAt, handlers, rejected };
  fs.writeFileSync(cachePath, JSON.stringify(result));
  return result;
}
const hub = await hubExamples();

// Game covers (the Hub's IGDB cover ids): downloaded once at build time and shipped with the site,
// so visitors' browsers never call IGDB, and the preview (no outside images) shows them too. A
// cover that can't be fetched leaves the game's initials. Snapshots from before covers were kept
// get their ids from our daily index (no Hub request).
if (!hubData && hub.handlers.some((h) => !h.cover)) {
  try {
    const byId = new Map((await rawIndex()).handlers.map((h) => [h._id, h.gameCover]));
    for (const h of hub.handlers) h.cover ??= byId.get(h.id) ?? undefined;
  } catch {}
}
// With --hub-data the covers are already there (tools/hub-mirror.mjs keeps them).
const coverDir = hubData ? path.join(hubData, 'covers') : path.join(here, '.cache', 'covers');
fs.mkdirSync(coverDir, { recursive: true });
let coversFetched = 0;
for (const h of hubData ? [] : hub.handlers) {
  if (!h.cover || !/^\w{2,20}$/.test(h.cover)) continue;
  const file = path.join(coverDir, `${h.cover}.jpg`);
  if (fs.existsSync(file)) continue;
  try {
    const r = await fetch(`https://images.igdb.com/igdb/image/upload/t_cover_small/${h.cover}.jpg`, { headers: hubClientHeaders('workbench-build', 'covers'), signal: AbortSignal.timeout(30000) });
    const buf = Buffer.from(await r.arrayBuffer());
    if (r.ok && /^image\//.test(r.headers.get('content-type') ?? '') && buf.length < 200_000) {
      fs.writeFileSync(file, buf);
      coversFetched++;
    }
  } catch {}
}
const coverFile = (h) => (h.cover && fs.existsSync(path.join(coverDir, `${h.cover}.jpg`)) ? path.join(coverDir, `${h.cover}.jpg`) : null);
const coverCount = hub.handlers.filter(coverFile).length;

// The other files of each Hub handler's package (tools/hub-files.mjs: small ones with content, big ones by
// name and size), for the Files panel. With --hub-data, hub/<id>.files.json from the mirror. The snapshot
// downloads each package once per version (package ids from our daily index) and keeps the result in
// .cache/hub-files/.
const hubFiles = new Map(); // id -> { files: [...] }
if (hubData) {
  for (const h of hub.handlers) if (h.files) hubFiles.set(h.id, JSON.parse(fs.readFileSync(path.join(hubData, 'hub', `${h.id}.files.json`), 'utf8')));
} else if (hub.handlers.length) {
  const cacheDir = path.join(here, '.cache', 'hub-files');
  fs.mkdirSync(cacheDir, { recursive: true });
  let byId = null;
  let downloaded = 0;
  for (const h of hub.handlers) {
    const file = path.join(cacheDir, `${h.id}-v${h.version}.json`);
    if (!fs.existsSync(file)) {
      try {
        byId ??= new Map((await rawIndex()).handlers.map((x) => [x._id, x]));
        const x = byId.get(h.id);
        if (!x?.currentPackage || x.currentVersion !== h.version) continue; // the index has another version: not this one's package
        if (downloaded) await new Promise((r) => setTimeout(r, 300)); // one at a time, gently
        downloaded++;
        fs.writeFileSync(file, JSON.stringify(await fetchPackageFiles(h.id, x.currentPackage, h.version)));
      } catch (e) {
        console.warn(`Hub files of ${h.title}: ${e.message}`);
        continue;
      }
    }
    const json = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (json.files.length) hubFiles.set(h.id, json);
  }
  if (downloaded) console.log(`Hub files: ${downloaded} package(s) downloaded.`);
}
for (const h of hub.handlers) {
  const f = hubFiles.get(h.id);
  if (f) h.files = f.files.length;
  else delete h.files;
}
// Example packages (examples/README.md): handlers with the other files they ship. None for now: Hub handlers open
// with their package files themselves (the Fallout New Vegas Multiplayer example went that way; #package-nvmp leads there).
const EXAMPLE_PACKAGES = [
].map((e) => {
  const dir = path.join(here, 'examples', e.id);
  const files = [];
  const walk = (rel) => {
    for (const d of fs.readdirSync(path.join(dir, rel), { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const r = rel ? `${rel}/${d.name}` : d.name;
      if (d.isDirectory()) walk(r);
      else if (r !== 'handler.js') files.push({ name: r, b64: fs.readFileSync(path.join(dir, r)).toString('base64') });
    }
  };
  walk('');
  return { ...e, handler: fs.readFileSync(path.join(dir, 'handler.js'), 'utf8').replace(/^\uFEFF/, '').replace(/\r\n/g, '\n'), files };
});

// Engine templates: the same files the SplitScreen.Me Discord bot sends with /create
// (SplitScreen-Me/splitscreenme-discordbot, src/handler_templates). Uses --bot <path>,
// or a shallow clone cached in .cache/.
//   --refresh-bot  re-clone the bot repo
const argBot = process.argv.indexOf('--bot');
const BOT_REPO = 'https://github.com/SplitScreen-Me/splitscreenme-discordbot';
function botTemplates() {
  let dir = argBot > 0 ? path.resolve(process.argv[argBot + 1]) : path.join(here, '.cache', 'splitscreenme-discordbot');
  if (argBot < 0) {
    if (process.argv.includes('--refresh-bot')) fs.rmSync(dir, { recursive: true, force: true });
    if (!fs.existsSync(path.join(dir, '.git'))) {
      fs.mkdirSync(path.dirname(dir), { recursive: true });
      execSync(`git clone --quiet --depth 1 ${BOT_REPO} "${dir}"`, { stdio: 'inherit' });
    }
  }
  const tdir = path.join(dir, 'src', 'handler_templates');
  if (!fs.existsSync(tdir)) {
    console.warn(`No handler_templates in ${dir}; skipping the Discord bot templates.`);
    return { commit: null, templates: [] };
  }
  const NAMES = { cry_engine: 'CryEngine', diesel: 'Diesel', generic: 'Generic (any engine)', mt_framework: 'MT Framework', source_engine: 'Source', unity: 'Unity', unreal_engine_3: 'Unreal Engine 3', unreal_engine_4: 'Unreal Engine 4' };
  const templates = fs
    .readdirSync(tdir)
    .filter((f) => f.endsWith('.js'))
    .sort()
    .map((f) => {
      const id = f.slice(0, -3);
      return { id, name: NAMES[id] ?? id.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()), source: fs.readFileSync(path.join(tdir, f), 'utf8').replace(/\r\n/g, '\n') };
    });
  return { commit: rev(dir), templates };
}
const bot = botTemplates();
if (hub.rejected.length) console.log(`Hub: skipped ${hub.rejected.length} handler(s) whose current version isn't verified: ${hub.rejected.map((r) => r.title).join(', ')}`);

const apiModel = JSON.parse(fs.readFileSync(path.join(coreRepo, 'data', 'nucleus-api.json'), 'utf8'));
// Anonymous votes and feature counts (src/feedback.ts) go to this GoatCounter site, if one is set (the FEEDBACK_GOATCOUNTER
// variable or secret: the site code, e.g. "nucleus-workbench", or its address https://nucleus-workbench.goatcounter.com).
// Without it, nothing is sent anywhere.
const feedbackSite = (() => {
  const raw = (process.env.FEEDBACK_GOATCOUNTER ?? '').trim().toLowerCase();
  if (!raw) return null;
  const code = raw.replace(/^https?:\/\//, '').replace(/\.goatcounter\.com\/?.*$/, '');
  if (/^[a-z0-9-]{2,50}$/.test(code)) return code;
  console.warn('FEEDBACK_GOATCOUNTER is set but is not a GoatCounter site code (letters, digits, -) or https://<code>.goatcounter.com: anonymous counts stay off.');
  return null;
})();
const build = { bench: rev(path.join(here, '..')), core: rev(coreRepo), nucleus: apiModel.source?.nucleus ?? null, jint: apiModel.jint ?? null, feedback: feedbackSite };
// What's new, from ../CHANGELOG.md: dated sections ("## 2026-11-05"), newest first, in emoji groups
// ("### ✨ New"); each bullet starts with a **short summary**, and may have a screenshot under it
// ("  ![alt](docs/images/changelog/x-light.png)", plus x-dark.png beside it, copied to changes/ next to the page). "Unreleased" is only
// shown in preview builds (--preview).
function changes() {
  const text = fs.readFileSync(path.join(here, '..', 'CHANGELOG.md'), 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  const out = [];
  for (const part of text.split(/^## /m).slice(1)) {
    const [head, ...rest] = part.split('\n');
    const id = head.trim();
    if (id === 'Unreleased' && !process.argv.includes('--preview')) continue;
    if (id !== 'Unreleased' && !/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2})?$/.test(id)) continue;
    const items = [];
    let group = '';
    const intro = [];
    for (const l of rest) {
      if (!group && !l.startsWith('### ') && l.trim() && l.trim() !== '---') { intro.push(l.trim()); continue; }
      if (l.startsWith('### ')) group = l.slice(4).trim();
      else if (l.startsWith('- ')) {
        const m = l.match(/^- \*\*(.+?)\*\*\s*(.*)$/);
        if (m && !group.includes('🙏') && !/[.!?]$/.test(m[1])) console.warn(`CHANGELOG.md: end the bold summary with a full stop and start the details as a sentence: ${l.slice(0, 70)}`);
        items.push({ group, ...(m ? { summary: m[1].replace(/\.$/, ''), details: m[2] } : { summary: l.slice(2), details: '' }) });
      } else {
        const img = l.match(/^\s+!\[([^\]]*)\]\(docs\/images\/changelog\/([\w.-]+\.(?:png|jpg|webp|svg|gif|mp4|webm))\)/);
        if (img && items.length) {
          // x-light.png with an x-dark.png beside it: What's new shows the one for the viewer's theme.
          // Animations (.gif, .mp4, .webm) also need a still: the same name as .png (x-light.png beside x-light.gif),
          // shown until they play, and instead of playing when the device asks for less motion.
          const dir = path.join(here, '..', 'docs', 'images', 'changelog');
          const has = (f) => fs.existsSync(path.join(dir, f));
          const dark = img[2].replace(/-light\.(\w+)$/, '-dark.$1');
          const im = { alt: img[1], file: img[2], ...(dark !== img[2] && has(dark) ? { dark } : {}) };
          // An .svg with a .png still beside it is animated too (it gets Play and Pause); without one it's a plain image.
          if (/\.(gif|mp4|webm)$/.test(img[2]) || (/\.svg$/.test(img[2]) && has(img[2].replace(/\.svg$/, '.png')))) {
            const still = img[2].replace(/\.\w+$/, '.png'), stillDark = im.dark?.replace(/\.\w+$/, '.png');
            if (!has(still)) throw new Error(`CHANGELOG.md: ${img[2]} needs a still frame beside it, ${still} (shown until it plays, and with reduced motion)`);
            Object.assign(im, { still }, stillDark && has(stillDark) ? { stillDark } : {});
          }
          (items[items.length - 1].images ??= []).push(im);
        }
      }
    }
    if (items.length) out.push({ id, items, ...(intro.length ? { intro: intro.join(' ') } : {}) });
  }
  // Each dated release gets a number (the oldest is 1), shown in What's new with a link to its notes.
  const dated = out.filter((c) => c.id !== 'Unreleased');
  dated.forEach((c, i) => (c.n = dated.length - i));
  return out;
}
const CHANGES = changes();

// One bundle for the page and its lint worker (src/main.ts picks which to run), so the
// linter and the API model ship once.
const result = await esbuild.build({
  entryPoints: [path.join(here, 'src', 'main.ts')],
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: 'es2020',
  minify: true,
  write: false,
  // ESLint (the core linter's general JavaScript rules) asks for Node's path module: the browser build of it.
  alias: { '@core': path.join(coreRepo, 'src', 'core'), 'node:path': 'path-browserify', path: 'path-browserify' },
  // …and reads a few things from `process`.
  banner: { js: "var process = globalThis.process || { env: {}, argv: [], versions: {}, platform: 'browser', cwd: function () { return '/'; }, emitWarning: function () {}, nextTick: function (f) { Promise.resolve().then(f); } };" },
  nodePaths: [path.join(coreRepo, 'node_modules'), path.join(here, 'node_modules')],
  logLevel: 'warning',
});
const js = result.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');

const cm = (p) => fs.readFileSync(path.join(here, 'node_modules', 'codemirror', p), 'utf8');
const css = [cm('lib/codemirror.css'), cm('addon/lint/lint.css'), cm('addon/hint/show-hint.css'), cm('addon/dialog/dialog.css'), cm('addon/fold/foldgutter.css')].join('\n');

// The looks (src/themes.json) as CSS, by the same code that applies a custom theme in the page.
const themeMod = await esbuild.build({ entryPoints: [path.join(here, 'src', 'themekit.ts')], bundle: true, format: 'esm', platform: 'node', write: false, logLevel: 'warning' });
const { builtInCSS } = await import('data:text/javascript;base64,' + Buffer.from(themeMod.outputFiles[0].text).toString('base64'));
const THEMES = JSON.parse(fs.readFileSync(path.join(here, 'src', 'themes.json'), 'utf8'));
const themesCSS = builtInCSS(THEMES);
// Each Hub example's problem counts, worked out here so the Open list needs no handler sources.
// ESM from a data: URL has no `require`; ESLint (inside the linter) requires Node's built-ins.
const lintMod = await esbuild.build({ entryPoints: [path.join(coreRepo, 'src', 'core', 'lint.ts')], bundle: true, format: 'esm', platform: 'node', write: false, nodePaths: [path.join(coreRepo, 'node_modules')], logLevel: 'warning', banner: { js: `import { createRequire as __cr } from 'node:module'; const require = __cr(${JSON.stringify(import.meta.url)});` } });
const { lint: lintHandler } = await import('data:text/javascript;base64,' + Buffer.from(lintMod.outputFiles[0].text).toString('base64'));
for (const h of hub.handlers) {
  const d = lintHandler(h.source);
  h.lint = { errors: d.filter((x) => x.severity === 'error').length, warnings: d.filter((x) => x.severity === 'warning').length };
}
/** The page. inlineHub: Hub example sources in the page (one self-contained file); otherwise the page
 *  fetches hub/<id>.js when one is opened, which keeps every visit small. */
function pageHtml(inlineHub) {
  // Covers: files next to the page, or inside it for the one-file workbench.
  // The one file keeps the 40 most downloaded covers inside it (the rest show their initials), so
  // all the Hub handlers (about 900) don't double its size.
  const withCover = (h, i) => {
    const f = coverFile(h);
    const { cover, ...rest } = h;
    if (!f || (inlineHub && i >= 40)) return rest;
    return { ...rest, cover: inlineHub ? `data:image/jpeg;base64,${fs.readFileSync(f).toString('base64')}` : `covers/${h.cover}.jpg` };
  };
  // The one file carries the 40 most downloaded packages' files lists too (filesData; only small text files
  // with content, so it stays small); the others open there without their files. The site fetches
  // hub/<id>.files.json.
  const inlineFiles = (h, i) => {
    if (!hubFiles.has(h.id)) return h;
    if (i >= 40) { const { files, ...rest } = h; return rest; }
    return { ...h, filesData: slimFiles(hubFiles.get(h.id).files) };
  };
  const handlers = (inlineHub ? hub.handlers.map(inlineFiles) : hub.handlers.map(({ source, ...h }) => h)).map(withCover);
  const data = `var PROBES = ${JSON.stringify(probes)};\nvar BUILD = ${JSON.stringify(build)};\nvar HUB_EXAMPLES = ${JSON.stringify({ takenAt: hub.takenAt, handlers, base: inlineHub ? null : 'hub/', ...(hub.all ? { all: true } : {}) })};\nvar BOT_TEMPLATES = ${JSON.stringify(bot)};\nvar EXAMPLE_PACKAGES = ${JSON.stringify(EXAMPLE_PACKAGES)};\nvar CHANGES = ${JSON.stringify(CHANGES)};`
    .replace(/<\/script/gi, '<\\/script')
    // A few Hub handlers carry U+FFFD (text that was already broken when uploaded): written as the
    // escape inside these JSON strings, the same character, but no raw replacement character in the page.
    .replace(/�/g, '\\ufffd');
  return fs
    .readFileSync(path.join(here, 'src', 'page.html'), 'utf8')
    // The site's own page has the start page next to it; the single file looks for one (src/app.ts).
    .replace(/(<a class="link start-link[^"]*" href=")[^"]*"/g, (_, a) => `${a}${inlineHub ? PAGES_BASE + 'start/' : 'start/'}"`)
    .replaceAll('__DISCORD_INVITE__', COMMUNITY.discord)
    .replaceAll('__REDDIT__', COMMUNITY.reddit)
    .replace('/*WWW_LOGO*/', () => fs.readFileSync(path.join(here, 'src', 'www-logo.b64'), 'utf8').trim())
    .replace('/*THEMES*/', () => themesCSS)
    .replace('/*CODEMIRROR_CSS*/', () => css)
    .replace('/*PROBES_AND_BUILD*/', () => data)
    .replace('/*APP_JS*/', () => js);
}
const html = pageHtml(true);
// The workbench as its own page. page.html starts with what belongs in <head> (title, the theme
// script, fonts), before its first <style>; the Claude artifact host takes it as is.
const WB_DESC = 'Write a Nucleus Co-op handler in the browser and see what Nucleus will make of it: checks the way Nucleus runs it, one-click fixes, and what each player gets.';
const SEO = `${NOINDEX}${PREVIEW ? '' : `<link rel="canonical" href="${PAGES_BASE}">\n`}
<link rel="icon" type="image/png" href="icon.png">
<link rel="apple-touch-icon" href="icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Nucleus Handler Workbench">
<meta property="og:title" content="Nucleus Handler Workbench">
<meta property="og:description" content="${WB_DESC}">
${PREVIEW ? '' : `<meta property="og:url" content="${PAGES_BASE}">\n`}<meta property="og:image" content="${PREVIEW ? '' : PAGES_BASE}start/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Nucleus handler tools: Catch it before Nucleus does. Free tools for writing Nucleus Co-op handlers, shown in Notepad++, VS Code and the browser workbench.">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Nucleus Handler Workbench', applicationCategory: 'DeveloperApplication', operatingSystem: 'Any (web browser)', browserRequirements: 'Requires JavaScript', description: WB_DESC, ...(PREVIEW ? {} : { url: PAGES_BASE }), offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, isAccessibleForFree: true })}</script>`;
const standalone = (page, seo = '') => {
  const at = page.indexOf('<style>');
  let head = page.slice(0, at).replace(/<meta name="claude:[^>]*>\n?/g, '');
  // The public site's title says what it is to someone searching; the app's own stays short.
  if (seo) head = head.replace(/<title>[^<]*<\/title>/, '<title>Nucleus Co-op Handler Workbench: write and check handlers in your browser</title>');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content">
<meta name="description" content="${WB_DESC}">
<meta name="theme-color" content="#10a3e8">
<meta name="color-scheme" content="light dark">
${head.trim()}
${seo}
<style>:root { padding-top: env(safe-area-inset-top, 0px); padding-bottom: env(safe-area-inset-bottom, 0px); box-sizing: border-box; height: 100%; } body { margin: 0; } img { max-width: 100%; } [hidden] { display: none !important; }</style>
</head>
<body>
<noscript><p style="padding:16px">The Nucleus Handler Workbench checks Nucleus Co-op handlers in your browser, and needs JavaScript. See <a href="start/">what it does</a>.</p></noscript>
${page.slice(at)}
</body>
</html>
`;
};

fs.mkdirSync(path.join(here, 'dist'), { recursive: true });
fs.writeFileSync(path.join(here, 'dist', 'workbench.html'), html);
// The same page as a standalone site (GitHub Pages): the document wrapper and base styles that the
// Claude artifact host otherwise adds.
fs.mkdirSync(path.join(here, 'dist', 'pages'), { recursive: true });
fs.writeFileSync(path.join(here, 'dist', 'pages', 'index.html'), standalone(pageHtml(false), SEO));
fs.writeFileSync(path.join(here, 'dist', 'pages', 'icon.png'), Buffer.from(fs.readFileSync(path.join(here, 'src', 'www-logo.b64'), 'utf8').trim(), 'base64'));
// For search engines (submit it in Search Console: a project site can't have its own robots.txt).
if (PREVIEW) fs.rmSync(path.join(here, 'dist', 'pages', 'sitemap.xml'), { force: true });
else fs.writeFileSync(path.join(here, 'dist', 'pages', 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[PAGES_BASE, `${PAGES_BASE}start/`, `${PAGES_BASE}tools/`].map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`);
fs.mkdirSync(path.join(here, 'dist', 'pages', 'hub'), { recursive: true });
fs.rmSync(path.join(here, 'dist', 'pages', 'hub'), { recursive: true, force: true }); // only this build's handlers
fs.mkdirSync(path.join(here, 'dist', 'pages', 'hub'), { recursive: true });
for (const h of hub.handlers) fs.writeFileSync(path.join(here, 'dist', 'pages', 'hub', `${h.id}.js`), h.source);
for (const [id, f] of hubFiles) fs.writeFileSync(path.join(here, 'dist', 'pages', 'hub', `${id}.files.json`), JSON.stringify(f));
fs.rmSync(path.join(here, 'dist', 'pages', 'covers'), { recursive: true, force: true }); // only this build's covers
fs.mkdirSync(path.join(here, 'dist', 'pages', 'covers'), { recursive: true });
for (const h of hub.handlers) if (coverFile(h)) fs.copyFileSync(coverFile(h), path.join(here, 'dist', 'pages', 'covers', `${h.cover}.jpg`));
// Screenshots in What's new, loaded only when it is opened.
fs.mkdirSync(path.join(here, 'dist', 'pages', 'changes'), { recursive: true });
for (const c of CHANGES) for (const it of c.items) for (const f of (it.images ?? []).flatMap((im) => [im.file, im.dark, im.still, im.stillDark].filter(Boolean))) fs.copyFileSync(path.join(here, '..', 'docs', 'images', 'changelog', f), path.join(here, 'dist', 'pages', 'changes', f));
// One file that works offline and anywhere (a release asset, `nucleus workbench`, a Claude artifact).
fs.writeFileSync(path.join(here, 'dist', 'workbench-standalone.html'), standalone(html));
// llms.txt: where AI agents find the tools (https://llmstxt.org).
// Its links are absolute on the live site, relative in a preview (llms.txt sits at the site's root).
const llms = fs.readFileSync(path.join(here, 'src', 'llms.txt'), 'utf8');
fs.writeFileSync(path.join(here, 'dist', 'pages', 'llms.txt'), PREVIEW ? llms.replaceAll(`(${PAGES_BASE})`, '(./)').replaceAll(PAGES_BASE, '') : llms);
// The intro page to share with testers and contributors: /start/ on the Pages site.
const startDir = path.join(here, 'dist', 'pages', 'start');
fs.mkdirSync(startDir, { recursive: true });
// The newest extension release, pre-releases included (GitHub's /releases/latest skips those): the start page links
// its .vsix and ncdev.exe. --test-build links the unreleased test build instead (this repo's `test-build` pre-release,
// made by .github/workflows/test-build.yml from an extension branch), so a local site hands out what will be released.
const TEST_BUILD = process.argv.includes('--test-build');
let vsix = { url: 'https://github.com/Snailedlt/splitscreenme-vscode/releases', name: 'the .vsix', tag: 'latest release' };
let ncdevUrl = 'https://github.com/Snailedlt/splitscreenme-vscode/releases';
try {
  const api = TEST_BUILD ? 'https://api.github.com/repos/Snailedlt/nucleuscoop-handler-testbench/releases/tags/test-build' : 'https://api.github.com/repos/Snailedlt/splitscreenme-vscode/releases?per_page=10';
  const res = await fetch(api, {
    headers: { accept: 'application/vnd.github+json', ...(process.env.GITHUB_TOKEN ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}${TEST_BUILD && res.status === 404 ? ': no test build yet (run the Test build workflow)' : ''}`);
  const body = await res.json();
  const rel = TEST_BUILD ? body : body.find((r) => !r.draft && r.assets.some((a) => a.name.endsWith('.vsix')));
  const asset = rel?.assets.find((a) => a.name.endsWith('.vsix'));
  if (asset) vsix = { url: asset.browser_download_url, name: asset.name, tag: TEST_BUILD ? `test build, ${rel.name.replace(/^Test build:\s*/, '')}` : rel.tag_name };
  const exe = rel?.assets.find((a) => a.name === 'ncdev.exe');
  if (exe) ncdevUrl = exe.browser_download_url;
  if (TEST_BUILD) console.log(`tools page: the test build (${rel.name})`);
} catch (e) {
  if (TEST_BUILD) throw new Error(`--test-build: ${e.message}`);
  console.warn(`start page: no release info (${e.message}), linking the releases page`);
}
// Highlighted code for static pages: the editor's JavaScript mode, the same cm-* classes (codehl.ts does it in the page).
const hlStatic = (() => {
  const req = createRequire(import.meta.url);
  const CM = req('codemirror/addon/runmode/runmode.node.js');
  req('codemirror/mode/javascript/javascript.js');
  return (src) => {
    let out = '';
    CM.runMode(src, 'javascript', (t, style) => {
      const e = t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
      out += style ? `<span class="${style.split(' ').map((x) => `cm-${x}`).join(' ')}">${e}</span>` : e;
    });
    return out;
  };
})();
// The code colours of the site's own pages (the www look's, AA on their code background, light and dark), for the
// highlighted code (.hl) on every page.
const HL_CSS = `.hl .cm-keyword { color: var(--kw); } .hl .cm-string { color: var(--str); } .hl .cm-number, .hl .cm-atom { color: var(--num); } .hl .cm-property { color: var(--prop); } .hl .cm-comment { color: var(--cmt); }
:root { --kw: #6f2db8; --str: #b0175a; --num: #0f6f6d; --prop: #0b5c8a; --cmt: #5c636c; }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --kw: #ff79c6; --str: #f1fa8c; --num: #bd93f9; --prop: #8be9fd; --cmt: #b0b4ba; } }
:root[data-theme="dark"] { --kw: #ff79c6; --str: #f1fa8c; --num: #bd93f9; --prop: #8be9fd; --cmt: #b0b4ba; }
`;
// Code coloured like the editors: CodeMirror's tokens, Nucleus names by what they are (src/semhl.ts, the core's
// semantic tokens). For the start page's inline code, the docs and checks pages' code blocks, and the site pass below.
const hlSem = await (async () => {
  const m = await esbuild.build({
    stdin: { contents: "export { semHighlight } from './semhl'; export { looksLikeCodeText } from './codetext';", resolveDir: path.join(here, 'src'), loader: 'ts' },
    bundle: true, format: 'esm', platform: 'node', write: false, logLevel: 'error',
    alias: { '@core': path.join(coreRepo, 'src', 'core'), 'eslint/universal': path.join(coreRepo, 'src', 'core', 'eslint-stub.ts') },
    nodePaths: [path.join(coreRepo, 'node_modules'), path.join(here, 'node_modules')],
  });
  const { semHighlight, looksLikeCodeText } = await import('data:text/javascript;base64,' + Buffer.from(m.outputFiles[0].text).toString('base64'));
  const req = createRequire(import.meta.url);
  const CM = req('codemirror/addon/runmode/runmode.node.js');
  req('codemirror/mode/javascript/javascript.js');
  const f = (src) => semHighlight(src, CM.runMode);
  f.looksLikeCode = looksLikeCodeText;
  return f;
})();
const ANCHOR_SVG = '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"/></svg>';
const escHtml = (t) => t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
// The start page (start/) and the tools page (tools/): the same look (start.html's head and styles), each its own
// body. tools.html is only the body; it gets start.html's head with its own title, description and address.
const startSrc = fs.readFileSync(path.join(here, 'src', 'start.html'), 'utf8');
const toolsSrc = (() => {
  const head = startSrc.slice(0, startSrc.indexOf('<body>'));
  const title = 'Get the tools: Nucleus Co-op handlers in VS Code, Notepad++, the browser and more';
  const desc = 'Every Nucleus Co-op handler tool in one place: the browser workbench, VS Code, Notepad++, other editors through a language server, the ncdev command line and AI agents.';
  return head
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*"/, `$1${desc}"`)
    .replace(/(<meta (?:property="og|name="twitter):title" content=")[^"]*"/g, `$1Get the tools: Nucleus Co-op handler tools"`)
    .replace(/(<meta (?:property="og|name="twitter):description" content=")[^"]*"/g, `$1${desc}"`)
    .replace(/__BASE__start\/"/g, '__BASE__tools/"')
    .replace(/(content="__BASE__)tools\/og\.png"/g, '$1start/og.png"')
    + '<body>\n' + fs.readFileSync(path.join(here, 'src', 'tools.html'), 'utf8');
})();
const toolsDir = path.join(here, 'dist', 'pages', 'tools');
fs.mkdirSync(toolsDir, { recursive: true });
const renderSitePage = (src, section) =>
  src
    // __BASE__ is the site's root: absolute on the live site; in a preview, relative to the page (and
    // the lines that only make sense with an absolute address are left out).
    .replace(/^.*__BASE__(?:[a-z]+\/)?".*\n/gm, (l) => (PREVIEW && /rel="canonical"|og:url/.test(l) ? '' : l))
    .replace('<meta name="viewport"', `${NOINDEX}<meta name="viewport"`)
    // The site's header (site-chrome.mjs), as on the other pages.
    .replace('<body>\n<main>', () => `<body>\n${siteHeader('../', section)}\n<main>`)
    .replace('</style>', () => `${SITE_HEADER_CSS}</style>`)
    .replaceAll('__BASE__start/', PREVIEW ? '' : `${PAGES_BASE}start/`)
    .replaceAll('__BASE__', PREVIEW ? '../' : PAGES_BASE)
    // A preview links the workbench by its file: some hosts (the Claude artifact) serve ../index.html but not ../.
    .replaceAll("../?ref=", PREVIEW ? '../index.html?ref=' : '../?ref=')
    .replaceAll('__VSIX_URL__', escHtml(vsix.url))
    .replaceAll('__VSIX_NAME__', escHtml(vsix.name))
    .replaceAll('__VSIX_TAG__', escHtml(vsix.tag))
    .replaceAll('__NCDEV_URL__', escHtml(ncdevUrl))
    .replace('<a id="vsix" ', () => (TEST_BUILD ? '<a id="vsix" data-pinned="test-build" ' : '<a id="vsix" '))
    .replaceAll('__PROBES__', String(probes.length))
    // Every heading with class has-anchor gets its link (GitHub's link icon, shown on hover), written here once.
    .replace(/<(h[2-4]) id="([^"]+)" class="([^"]*\bhas-anchor\b[^"]*)">([^<]+)<\/\1>/g, (m, h, id, cls, text) => `<${h} id="${id}" class="${cls}">${text}<a class="anchor" href="#${id}" aria-label="Link to this section: ${text}">${ANCHOR_SVG}</a></${h}>`)
    // Code in the text coloured like the workbench's editor (issue #12): CodeMirror's runMode at build time, the
    // www look's code colours (AA on this page's code background, light and dark).
    .replace(/<code>([^<]*)<\/code>/g, (m, inner) => (/[.()=]/.test(inner) ? `<code class="hl">${hlSem(inner.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'))}</code>` : m))
    .replace('</style>', () => `${HL_CSS}</style>`)
    // Duo and Nucli say hello in the header (the same drawings as the workbench, src/mascots.gen.ts).
    .replace('__MASCOTS__', (() => {
      const gen = fs.readFileSync(path.join(here, 'src', 'mascots.gen.ts'), 'utf8');
      const svg = JSON.parse(gen.match(/MASCOT_SVG: Record<string, string> = ([\s\S]*?);\nexport/)[1]);
      const css = JSON.parse(gen.match(/MASCOT_CSS = (.*);/)[1]);
      return `<style>${css} .hero-masc { float: right; display: flex; align-items: flex-end; gap: 0; margin: 0 0 8px 16px; } .hero-masc .masc { display: block; width: 132px; height: 132px; } .hero-masc .masc svg { width: 100%; height: 100%; overflow: visible; } .hero-masc .masc + .masc { width: 112px; height: 112px; margin-left: -18px; } @media (max-width: 640px) { .hero-masc { float: none; justify-content: center; margin: 0 0 4px; } .hero-masc .masc { width: 104px; height: 104px; } .hero-masc .masc + .masc { width: 88px; height: 88px; } }</style>`
        + `<div class="hero-masc" aria-hidden="true"><span class="masc">${svg.idle}</span><span class="masc">${svg['n-idle']}</span></div>`
        + `<script>if (matchMedia('(prefers-reduced-motion: reduce)').matches) addEventListener('DOMContentLoaded', () => document.querySelectorAll('.hero-masc svg').forEach((s) => s.pauseAnimations()));</script>`;
    })());
fs.writeFileSync(path.join(startDir, 'index.html'), renderSitePage(startSrc, 'start/'));
fs.writeFileSync(path.join(toolsDir, 'index.html'), renderSitePage(toolsSrc, 'tools/'));
// The gallery's screenshots (docs/images/gallery: <tool>-<view>-light/dark.webp, the workbench's looks as
// workbench-look-<look>-…): each view in light and dark, compared with the slider on the page.
fs.rmSync(path.join(startDir, 'gallery'), { recursive: true, force: true });
fs.mkdirSync(path.join(startDir, 'gallery'), { recursive: true });
for (const f of fs.readdirSync(path.join(here, '..', 'docs', 'images', 'gallery'))) if (f.endsWith('.webp')) fs.copyFileSync(path.join(here, '..', 'docs', 'images', 'gallery', f), path.join(startDir, 'gallery', f));
fs.copyFileSync(path.join(here, '..', 'docs', 'images', 'og.png'), path.join(startDir, 'og.png'));
// One page per check (rules/<id>/) and the list of them (rules/), from the core's core/ruledocs.ts (rules-pages.mjs).
// The checks for the docs list's Checks section (rules-pages.mjs), handed to the docs pages below.
let checksNav = [];
{
  const mod = await esbuild.build({ entryPoints: [path.join(coreRepo, 'src', 'core', 'ruledocs.ts')], bundle: true, format: 'esm', platform: 'node', write: false, nodePaths: [path.join(coreRepo, 'node_modules')], logLevel: 'warning', banner: { js: `import { createRequire as __cr } from 'node:module'; const require = __cr(${JSON.stringify(import.meta.url)});` } });
  const { RULE_DOCS } = await import('data:text/javascript;base64,' + Buffer.from(mod.outputFiles[0].text).toString('base64'));
  const lintAll = await esbuild.build({ stdin: { contents: "export { RULES } from './lint'; export { JS_RULES } from './jsrules';", resolveDir: path.join(coreRepo, 'src', 'core'), loader: 'ts' }, bundle: true, format: 'esm', platform: 'node', write: false, nodePaths: [path.join(coreRepo, 'node_modules')], logLevel: 'warning', banner: { js: `import { createRequire as __cr } from 'node:module'; const require = __cr(${JSON.stringify(import.meta.url)});` } });
  const { RULES, JS_RULES } = await import('data:text/javascript;base64,' + Buffer.from(lintAll.outputFiles[0].text).toString('base64'));
  const { writeRulePages } = await import('./rules-pages.mjs');
  let ruleIds;
  ({ ids: ruleIds, nav: checksNav } = writeRulePages({ hl: hlSem, outDir: path.join(here, 'dist', 'pages', 'rules'), startHtml: fs.readFileSync(path.join(here, 'src', 'start.html'), 'utf8'), RULES, RULE_DOCS, JS_RULES, base: PAGES_BASE, preview: PREVIEW, noindex: NOINDEX, feedbackSite }));
  if (!PREVIEW) fs.writeFileSync(path.join(here, 'dist', 'pages', 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[PAGES_BASE, `${PAGES_BASE}start/`, `${PAGES_BASE}tools/`, `${PAGES_BASE}rules/`, `${PAGES_BASE}learn/`, `${PAGES_BASE}docs/`, ...ruleIds.map((id) => `${PAGES_BASE}rules/${id}/`)].map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`);
}
// Learn (learn/): the lessons, one page with its own small bundle (src/learn/): the editor, the checks and Try it,
// without the rest of the workbench. ESLint's general rules stay out (the lessons only need Nucleus' own checks).
{
  const learnJs = await esbuild.build({
    entryPoints: [path.join(here, 'src', 'learn', 'learn.ts')],
    bundle: true, format: 'iife', platform: 'browser', target: 'es2020', minify: true, write: false,
    alias: { '@core': path.join(coreRepo, 'src', 'core'), 'eslint/universal': path.join(coreRepo, 'src', 'core', 'eslint-stub.ts'), 'node:path': 'path-browserify', path: 'path-browserify' },
    banner: { js: "var process = globalThis.process || { env: {}, argv: [], versions: {}, platform: 'browser', cwd: function () { return '/'; }, emitWarning: function () {}, nextTick: function (f) { Promise.resolve().then(f); } };" },
    nodePaths: [path.join(coreRepo, 'node_modules'), path.join(here, 'node_modules')],
    logLevel: 'warning',
  });
  const startHtml = fs.readFileSync(path.join(here, 'src', 'start.html'), 'utf8');
  const style = startHtml.slice(startHtml.indexOf('<style>') + 7);
  const tokens = style.slice(0, style.indexOf('* { box-sizing'));
  const learnDir = path.join(here, 'dist', 'pages', 'learn');
  fs.mkdirSync(learnDir, { recursive: true });
  fs.writeFileSync(path.join(learnDir, 'index.html'), fs.readFileSync(path.join(here, 'src', 'learn', 'learn.html'), 'utf8')
    .replace('__HEAD__', () => NOINDEX + (PREVIEW ? '' : `<link rel="canonical" href="${PAGES_BASE}learn/">`))
    .replace('/*TOKENS*/', () => tokens)
    .replace('/*CODEMIRROR_CSS*/', () => cm('lib/codemirror.css'))
    .replace('/*LEARN_JS*/', () => learnJs.outputFiles[0].text.replace(/<\/script/gi, '<\\/script')));
}
// The Docs as pages (docs/, docs/<group>/, docs/<name>/), from the core's core/docspage.ts (docs-pages.mjs): linkable
// and searchable, each with "Open in the workbench".
let docValues = [];
{
  const mod = await esbuild.build({ stdin: { contents: "export { docsPage, docsView, docsValue, DOCS_GROUPS } from './docspage'; export { allEntries } from './lookup'; export { api, docReviewUrl } from './api';", resolveDir: path.join(coreRepo, 'src', 'core'), loader: 'ts' }, bundle: true, format: 'esm', platform: 'node', write: false, nodePaths: [path.join(coreRepo, 'node_modules')], logLevel: 'warning', banner: { js: `import { createRequire as __cr } from 'node:module'; const require = __cr(${JSON.stringify(import.meta.url)});` } });
  const D = await import('data:text/javascript;base64,' + Buffer.from(mod.outputFiles[0].text).toString('base64'));
  const { writeDocPages } = await import('./docs-pages.mjs');
  docValues = writeDocPages({ hl: hlSem, checks: checksNav, outDir: path.join(here, 'dist', 'pages', 'docs'), startHtml: fs.readFileSync(path.join(here, 'src', 'start.html'), 'utf8'), docsPage: D.docsPage, docsView: D.docsView, docsValue: D.docsValue, allEntries: D.allEntries, groups: D.DOCS_GROUPS, enums: Object.keys(D.api.enums), docReviewUrl: D.docReviewUrl, feedbackSite, base: PAGES_BASE, preview: PREVIEW, noindex: NOINDEX });
  // Each docs page in the sitemap too (written with the rule pages above).
  const sm = path.join(here, 'dist', 'pages', 'sitemap.xml');
  if (!PREVIEW && fs.existsSync(sm)) fs.writeFileSync(sm, fs.readFileSync(sm, 'utf8').replace('</urlset>', docValues.filter(Boolean).map((v) => `  <url><loc>${PAGES_BASE}docs/${v}/</loc></url>\n`).join('') + '</urlset>'));
}
// test-guide/: a release test guide (playground/test-guide.md, when there is one) for the maintainer, only on a local
// --test-build site (never the live one). Add the file for a test round and delete it at the release.
if (TEST_BUILD && fs.existsSync(path.join(here, 'test-guide.md'))) {
  const { writeTestGuidePage } = await import('./test-guide-page.mjs');
  writeTestGuidePage({ outDir: path.join(here, 'dist', 'pages', 'test-guide'), startHtml: fs.readFileSync(path.join(here, 'src', 'start.html'), 'utf8'), guide: fs.readFileSync(path.join(here, 'test-guide.md'), 'utf8'), build: new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC' });
  console.log('test-guide/: the test guide (local test site only)');
}
// votes/: the anonymous votes for the maintainers (votes-page.mjs), from votes.json on the data branch
// (tools/votes-report.mjs, daily in hub-sync.yml), or --votes <file>. Unlisted and not for search engines.
{
  const argVotes = process.argv.indexOf('--votes');
  const file = argVotes > 0 ? path.resolve(process.argv[argVotes + 1]) : argData > 0 ? path.join(path.resolve(process.argv[argData + 1]), 'votes.json') : null;
  if (file && fs.existsSync(file)) {
    const { writeVotesPage } = await import('./votes-page.mjs');
    writeVotesPage({ outDir: path.join(here, 'dist', 'pages', 'votes'), startHtml: fs.readFileSync(path.join(here, 'src', 'start.html'), 'utf8'), votes: JSON.parse(fs.readFileSync(file, 'utf8')) });
  }
}
// The short demo videos (captioned, no sound) and their posters: the workbench's own, the editors' from the extension repo.
fs.mkdirSync(path.join(startDir, 'videos'), { recursive: true });
for (const [dir, names] of [[path.join(here, '..', 'docs', 'videos'), ['workbench']], [path.join(coreRepo, 'docs', 'videos'), ['vscode', 'notepadpp']]])
  for (const n of names) for (const f of [`${n}.mp4`, `${n}-poster.jpg`]) {
    // The start page plays each of these: a missing one would ship as a broken player, so stop here.
    if (!fs.existsSync(path.join(dir, f))) throw new Error(`build: ${path.join(dir, f)} is missing (the start page shows it). The editors' videos come from splitscreenme-vscode's docs/videos.`);
    fs.copyFileSync(path.join(dir, f), path.join(startDir, 'videos', f));
  }
// The editor icons ("Works in your editor"): Devicon's where it has one, a neutral stand-in where it doesn't.
fs.mkdirSync(path.join(startDir, 'editors'), { recursive: true });
for (const f of fs.readdirSync(path.join(here, 'src', 'editor-icons'))) if (f.endsWith('.svg')) fs.copyFileSync(path.join(here, 'src', 'editor-icons', f), path.join(startDir, 'editors', f));
// Duo and Nucli, the mascot concepts (design/mascots), at /mascots/: the sheet, its earlier steps and the archive.
// Concepts for now, not approved by the Nucleus Co-op maintainers, so search engines are asked to leave them out.
{
  const src = path.join(here, '..', 'design', 'mascots'), dst = path.join(here, 'dist', 'pages', 'mascots');
  const copy = (s, d) => {
    fs.mkdirSync(d, { recursive: true });
    for (const e of fs.readdirSync(s, { withFileTypes: true })) {
      if (e.isDirectory()) copy(path.join(s, e.name), path.join(d, e.name));
      else if (e.name.endsWith('.html')) fs.writeFileSync(path.join(d, e.name), fs.readFileSync(path.join(s, e.name), 'utf8').replace(/<head>/i, '<head>\n<meta name="robots" content="noindex">'));
      else if (e.name.endsWith('.svg')) fs.copyFileSync(path.join(s, e.name), path.join(d, e.name)); // the drawings
    }
  };
  copy(src, dst);
  // The rest of the Duo and Nucli site: the UI kit at /ui-kit/ and the overview at /duo-nucli/ (design/index.html,
  // design/ui-kit). The pages link to each other as they sit in design/; served here, the overview moves into its own
  // folder (the site's root is the workbench), so the links to it, and from it, are pointed there.
  copy(path.join(here, '..', 'design', 'ui-kit'), path.join(here, 'dist', 'pages', 'ui-kit'));
  fs.mkdirSync(path.join(here, 'dist', 'pages', 'duo-nucli'), { recursive: true });
  fs.copyFileSync(path.join(here, '..', 'design', 'index.html'), path.join(here, 'dist', 'pages', 'duo-nucli', 'index.html'));
  const overview = path.join(here, 'dist', 'pages', 'duo-nucli', 'index.html');
  fs.writeFileSync(overview, fs.readFileSync(overview, 'utf8').replace(/<head>/i, '<head>\n<meta name="robots" content="noindex">').replace(/(href|src)="(mascots|ui-kit)\//g, '$1="../$2/'));
  for (const f of [path.join(dst, 'index.html'), path.join(here, 'dist', 'pages', 'ui-kit', 'index.html')])
    fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(/href="\.\.\/index\.html"/g, 'href="../duo-nucli/index.html"'));
  // The download packs (the assets branch, checked out; --assets <dir>): kept off main, copied in before the fingerprint.
  const argAssets = process.argv.indexOf('--assets');
  const packs = argAssets > 0 ? path.join(path.resolve(process.argv[argAssets + 1]), 'mascots', 'packs') : path.join(src, 'packs');
  if (fs.existsSync(packs)) { fs.mkdirSync(path.join(dst, 'packs'), { recursive: true }); for (const f of fs.readdirSync(packs)) if (f.endsWith('.zip')) fs.copyFileSync(path.join(packs, f), path.join(dst, 'packs', f)); }
  else console.warn('No mascot packs (the assets branch, --assets <dir>): the Downloads buttons will lead nowhere.');
}
// The site's own pages count one anonymous visit with where it came from (site-chrome.mjs siteVisitScript), as the
// workbench does, so the `?ref=` on links to the start page, Learn, docs and checks shows up under Campaigns.
// Every site page also gets: keyboard shortcuts drawn as keys (src/kbd.ts, the same as Learn's), and a Copy button
// on its code blocks and inline commands (site-chrome.mjs COPY_SCRIPT), and the community links where it asks for
// them (<!--COMMUNITY--> box, <!--COMMUNITY_FOOTER--> links; site-chrome.mjs COMMUNITY).
{
  const script = siteVisitScript(feedbackSite);
  const kb = await esbuild.build({ stdin: { contents: "export { kbdify, KEYS_CSS } from './kbd'; export { SEM_STATIC_CSS } from './semcss';", resolveDir: path.join(here, 'src'), loader: 'ts' }, bundle: true, format: 'esm', platform: 'neutral', write: false, logLevel: 'error' });
  const { kbdify, KEYS_CSS, SEM_STATIC_CSS } = await import('data:text/javascript;base64,' + Buffer.from(kb.outputFiles[0].text).toString('base64'));
  const page = (html) => {
    const b = html.search(/<body[^>]*>/i), e = html.lastIndexOf('</body>');
    if (b < 0 || e < 0) return html;
    // Inline code that is clearly code (Game.Play, a call, a string) coloured like the editor; then the keys.
    const body = kbdify(withCommunity(html.slice(b, e)).replaceAll('__EDITOR_POLL__', COMMUNITY.editorPoll).replaceAll('__DISCORD_INVITE__', COMMUNITY.discord).replace(/<code>([^<]*)<\/code>/g, (m, inner) => {
      const t = inner.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
      return hlSem.looksLikeCode(t) ? `<code class="hl">${hlSem(t)}</code>` : m;
    }));
    return html.slice(0, b).replace('</style>', () => `${KEYS_CSS}\n${COPY_CSS}\n${HL_CSS}\n${SEM_STATIC_CSS}\n${COMMUNITY_CSS}</style>`) + body + `${COPY_SCRIPT}\n${script ?? ''}\n` + html.slice(e);
  };
  const add = (d) => {
    if (!fs.existsSync(d)) return;
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const f = path.join(d, e.name);
      if (e.isDirectory()) add(f);
      else if (e.name === 'index.html') fs.writeFileSync(f, page(fs.readFileSync(f, 'utf8')));
    }
  };
  for (const sub of ['start', 'tools', 'learn', 'docs', 'rules', 'test-guide', 'votes']) add(path.join(here, 'dist', 'pages', sub));
}
// Fingerprint of everything served, so the deploy can be skipped when nothing changed (pages.yml
// compares it with the live build.txt).
{
  const files = [];
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : files.push(path.join(d, e.name))));
  walk(path.join(here, 'dist', 'pages'));
  const h = crypto.createHash('sha256');
  for (const f of files.filter((f) => !f.endsWith('build.txt')).sort()) h.update(path.relative(path.join(here, 'dist', 'pages'), f) + '\0').update(fs.readFileSync(f));
  fs.writeFileSync(path.join(here, 'dist', 'pages', 'build.txt'), h.digest('hex') + '\n');
}
console.log(`dist/workbench.html (${(html.length / 1024).toFixed(0)} KB), core @ ${build.core}, ${probes.length} probes, ${hub.handlers.length} Hub handlers${hub.all ? " (all, from the data branch)" : " (verified)"} (${coverCount} with covers${coversFetched ? `, ${coversFetched} downloaded` : ''}), ${hubFiles.size} with package files, ${bot.templates.length} Discord bot templates (@ ${bot.commit})`);
