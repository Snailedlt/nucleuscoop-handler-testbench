// Differential check: the browser simulation (src/sim.ts) against real Jint 2.11.58.
// Runs every probe through the simulation and compares the outcome (and, for probes that
// run, Context.StartArguments of player 1) with probes/expected.txt, which test-probes.sh
// records from the real engine.
//
//   node sim-parity.mjs [--core ../../splitscreenme-vscode]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';

const here = path.dirname(fileURLToPath(import.meta.url));
const argCore = process.argv.indexOf('--core');
const coreRepo = path.resolve(argCore > 0 ? process.argv[argCore + 1] : process.env.SPLITSCREENME_VSCODE ?? path.join(here, '..', '..', 'splitscreenme-vscode'));
const out = await esbuild.build({
  entryPoints: [path.join(here, 'src', 'sim.ts')],
  bundle: true,
  format: 'cjs',
  platform: 'node',
  write: false,
  alias: { '@core': path.join(coreRepo, 'src', 'core') },
  nodePaths: [path.join(coreRepo, 'node_modules'), path.join(here, 'node_modules')],
  logLevel: 'warning',
});
const mod = { exports: {} };
new Function('module', 'exports', 'require', out.outputFiles[0].text)(mod, mod.exports, (await import('node:module')).createRequire(import.meta.url));
const { simulate } = mod.exports;

const probesDir = path.join(here, '..', 'probes');
const expected = fs.readFileSync(path.join(probesDir, 'expected.txt'), 'utf8').trim().split('\n').map((l) => {
  const m = l.match(/^(\S+) (\S+)\s*(.*)$/);
  return { status: m[1], name: m[2], value: m[1] === 'OK' ? (m[3].match(/args\[P1\]=(.*)$/)?.[1] ?? '').trim() : null };
});
let bad = 0;
for (const e of expected) {
  const r = simulate(fs.readFileSync(path.join(probesDir, e.name), 'utf8'), { players: 2, width: 1920, height: 1080, keyboardPlayer: 0 } /* as in src/Harness.cs */);
  const p = r.players[0];
  const status = !r.loaded ? 'LOAD-FAIL' : !r.hasPlay ? 'LOADED' : r.players.some((x) => x.error) ? 'PLAY-FAIL' : 'OK';
  const value = status === 'OK' ? p.startArguments.trim() : null;
  if (status !== e.status || (e.value !== null && value !== e.value)) {
    bad++;
    console.log(`DIFF ${e.name}: Jint ${e.status}${e.value !== null ? ` "${e.value}"` : ''}, simulation ${status}${value !== null ? ` "${value}"` : ''} ${r.loadError ?? p?.error ?? ''}`);
  }
}
console.log(bad ? `${bad} of ${expected.length} probes differ from Jint.` : `The simulation matches Jint on all ${expected.length} probes.`);
process.exit(bad ? 1 : 0);
