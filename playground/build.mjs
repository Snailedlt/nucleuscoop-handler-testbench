// Builds dist/workbench.html: one self-contained page (no CDN needed) with the
// splitscreenme-vscode linter/API core, CodeMirror 5, the probes and their Jint results.
//
//   node build.mjs [--core ../../splitscreenme-vscode]
//
// The core is imported from a checkout of splitscreenme-vscode (src/core), so the
// page always runs the same linter as the extension.
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';

const here = path.dirname(fileURLToPath(import.meta.url));
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
async function hubExamples() {
  if (!hubCount) return { takenAt: null, handlers: [], rejected: [] };
  if (!process.argv.includes('--refresh-hub') && fs.existsSync(cachePath)) {
    const cached = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
    if (cached.handlers.length >= hubCount) return { ...cached, handlers: cached.handlers.slice(0, hubCount) };
  }
  const get = async (url) => {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`${url}: ${r.status}`);
    return r.json();
  };
  const listing = (await get(`${HUB}/api/v1/allhandlers`)).Handlers.sort((a, b) => (b.downloadCount ?? 0) - (a.downloadCount ?? 0));
  const handlers = [];
  const rejected = [];
  for (const h of listing) {
    if (handlers.length >= hubCount) break;
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
      source: meta.jsContent.replace(/\r\n/g, '\n'),
    });
  }
  const result = { takenAt: new Date().toISOString(), handlers, rejected };
  fs.writeFileSync(cachePath, JSON.stringify(result));
  return result;
}
const hub = await hubExamples();

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
const build = { core: rev(coreRepo), nucleus: apiModel.source?.nucleus ?? null, jint: apiModel.jint ?? null };

const result = await esbuild.build({
  entryPoints: [path.join(here, 'src', 'app.ts')],
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: 'es2020',
  minify: true,
  write: false,
  alias: { '@core': path.join(coreRepo, 'src', 'core') },
  nodePaths: [path.join(coreRepo, 'node_modules'), path.join(here, 'node_modules')],
  logLevel: 'warning',
});
const js = result.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
// The linter also runs in a Web Worker (from a blob: URL), so typing never waits on it.
const workerBuild = await esbuild.build({
  entryPoints: [path.join(here, 'src', 'worker.ts')],
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: 'es2020',
  minify: true,
  write: false,
  alias: { '@core': path.join(coreRepo, 'src', 'core') },
  nodePaths: [path.join(coreRepo, 'node_modules'), path.join(here, 'node_modules')],
  logLevel: 'warning',
});
const workerSrc = workerBuild.outputFiles[0].text;

const cm = (p) => fs.readFileSync(path.join(here, 'node_modules', 'codemirror', p), 'utf8');
const css = [cm('lib/codemirror.css'), cm('addon/lint/lint.css'), cm('addon/hint/show-hint.css')].join('\n');

const data = `var PROBES = ${JSON.stringify(probes)};\nvar BUILD = ${JSON.stringify(build)};\nvar HUB_EXAMPLES = ${JSON.stringify({ takenAt: hub.takenAt, handlers: hub.handlers })};\nvar BOT_TEMPLATES = ${JSON.stringify(bot)};\nvar WORKER_SRC = ${JSON.stringify(workerSrc)};`.replace(/<\/script/gi, '<\\/script');
let html = fs.readFileSync(path.join(here, 'src', 'page.html'), 'utf8');
html = html.replace('/*WWW_LOGO*/', () => fs.readFileSync(path.join(here, 'src', 'www-logo.b64'), 'utf8').trim()).replace('/*CODEMIRROR_CSS*/', () => css).replace('/*PROBES_AND_BUILD*/', () => data).replace('/*APP_JS*/', () => js);

fs.mkdirSync(path.join(here, 'dist'), { recursive: true });
fs.writeFileSync(path.join(here, 'dist', 'workbench.html'), html);
// The same page as a standalone site (GitHub Pages): the document wrapper and base styles that the
// Claude artifact host otherwise adds.
fs.mkdirSync(path.join(here, 'dist', 'pages'), { recursive: true });
fs.writeFileSync(
  path.join(here, 'dist', 'pages', 'index.html'),
  `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="Write a Nucleus Co-op handler and see what Nucleus will make of it: checks, fixes, and what each player gets.">
<style>:root { padding-top: env(safe-area-inset-top, 0px); padding-bottom: env(safe-area-inset-bottom, 0px); box-sizing: border-box; height: 100%; } body { margin: 0; } img { max-width: 100%; } [hidden] { display: none !important; }</style>
</head>
<body>
${html}
</body>
</html>
`,
);
// llms.txt: where AI agents find the tools (https://llmstxt.org).
fs.writeFileSync(path.join(here, 'dist', 'pages', 'llms.txt'), fs.readFileSync(path.join(here, 'src', 'llms.txt'), 'utf8'));
// The intro page to share with testers and contributors: /start/ on the Pages site.
const PAGES_BASE = 'https://snailedlt.github.io/nucleuscoop-handler-testbench/';
const startDir = path.join(here, 'dist', 'pages', 'start');
fs.mkdirSync(startDir, { recursive: true });
// The newest extension release, pre-releases included (GitHub's /releases/latest skips those).
let vsix = { url: 'https://github.com/Snailedlt/splitscreenme-vscode/releases', name: 'the .vsix', tag: 'latest release' };
try {
  const res = await fetch('https://api.github.com/repos/Snailedlt/splitscreenme-vscode/releases?per_page=10', {
    headers: { accept: 'application/vnd.github+json', ...(process.env.GITHUB_TOKEN ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  const rel = (await res.json()).find((r) => !r.draft && r.assets.some((a) => a.name.endsWith('.vsix')));
  const asset = rel?.assets.find((a) => a.name.endsWith('.vsix'));
  if (asset) vsix = { url: asset.browser_download_url, name: asset.name, tag: rel.tag_name };
} catch (e) {
  console.warn(`start page: no release info (${e.message}), linking the releases page`);
}
const escHtml = (t) => t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
fs.writeFileSync(
  path.join(startDir, 'index.html'),
  fs.readFileSync(path.join(here, 'src', 'start.html'), 'utf8')
    .replaceAll('__BASE__', PAGES_BASE)
    .replaceAll('__VSIX_URL__', escHtml(vsix.url))
    .replaceAll('__VSIX_NAME__', escHtml(vsix.name))
    .replaceAll('__VSIX_TAG__', escHtml(vsix.tag)),
);
for (const [dir, files] of [
  [path.join(here, '..', 'docs', 'images'), ['check.png']],
  [path.join(coreRepo, 'docs', 'images'), ['vscode-problems.png', 'vscode-try-it.png', 'vscode-hover.png']],
]) for (const f of files) fs.copyFileSync(path.join(dir, f), path.join(startDir, f));
fs.copyFileSync(path.join(startDir, 'check.png'), path.join(startDir, 'og.png'));
console.log(`dist/workbench.html (${(html.length / 1024).toFixed(0)} KB), core @ ${build.core}, ${probes.length} probes, ${hub.handlers.length} verified Hub handlers, ${bot.templates.length} Discord bot templates (@ ${bot.commit})`);
