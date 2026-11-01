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

const cm = (p) => fs.readFileSync(path.join(here, 'node_modules', 'codemirror', p), 'utf8');
const css = [cm('lib/codemirror.css'), cm('addon/lint/lint.css'), cm('addon/hint/show-hint.css')].join('\n');

const data = `var PROBES = ${JSON.stringify(probes)};\nvar BUILD = ${JSON.stringify(build)};`.replace(/<\/script/gi, '<\\/script');
let html = fs.readFileSync(path.join(here, 'src', 'page.html'), 'utf8');
html = html.replace('/*CODEMIRROR_CSS*/', () => css).replace('/*PROBES_AND_BUILD*/', () => data).replace('/*APP_JS*/', () => js);

fs.mkdirSync(path.join(here, 'dist'), { recursive: true });
fs.writeFileSync(path.join(here, 'dist', 'workbench.html'), html);
console.log(`dist/workbench.html (${(html.length / 1024).toFixed(0)} KB), core @ ${build.core}, ${probes.length} probes`);
