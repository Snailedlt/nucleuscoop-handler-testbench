// Differential check: the "Try it" simulation (src/core/sim.ts in splitscreenme-vscode, also
// used by this workbench) against real Jint 2.11.58.
// Runs every probe through the simulation and compares the outcome (and, for probes that
// run, Context.StartArguments of player 1) with probes/expected.txt, which test-probes.sh
// records from the real engine.
//
//   node sim-parity.mjs [--core ../../splitscreenme-vscode] [--isolated]
//
// --isolated runs each probe through `nucleus simulate --json` (the core's dist/cli.js, so run
// `npm run build` there first): the sandboxed path the CLI and VS Code use.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import * as esbuild from 'esbuild';

const here = path.dirname(fileURLToPath(import.meta.url));
const argCore = process.argv.indexOf('--core');
const coreRepo = path.resolve(argCore > 0 ? process.argv[argCore + 1] : process.env.SPLITSCREENME_VSCODE ?? path.join(here, '..', '..', 'splitscreenme-vscode'));
const out = await esbuild.build({
  stdin: { contents: "export * from '@core/sim';", resolveDir: here, loader: 'ts' },
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
const isolated = process.argv.includes('--isolated');
const cli = path.join(coreRepo, 'dist', 'cli.js');
const opts = { players: 2, width: 1920, height: 1080, keyboardPlayer: 0 }; // as in src/Harness.cs
const simulate = isolated
  ? (_src, _o, file) => {
      try {
        return JSON.parse(execFileSync(process.execPath, [cli, 'simulate', file, '--json', '--players', '2', '--keyboard', '1'], { encoding: 'utf8' }));
      } catch (e) {
        return JSON.parse(e.stdout); // exit code 1 when the handler fails
      }
    }
  : mod.exports.simulate;

const probesDir = path.join(here, '..', 'probes');
const expected = fs.readFileSync(path.join(probesDir, 'expected.txt'), 'utf8').trim().split('\n').map((l) => {
  const m = l.match(/^(\S+) (\S+)\s*(.*)$/);
  return { status: m[1], name: m[2], value: m[1] === 'OK' ? (m[3].match(/args\[P1\]=(.*)$/)?.[1] ?? '').trim() : null };
});
let bad = 0;
for (const e of expected) {
  const file = path.join(probesDir, e.name);
  const r = simulate(fs.readFileSync(file, "utf8"), opts);
  const p = r.players[0];
  const status = !r.loaded ? 'LOAD-FAIL' : !r.hasPlay ? 'LOADED' : r.players.some((x) => x.error) ? 'PLAY-FAIL' : 'OK';
  const value = status === 'OK' ? p.startArguments.trim() : null;
  if (status !== e.status || (e.value !== null && value !== e.value)) {
    bad++;
    console.log(`DIFF ${e.name}: Jint ${e.status}${e.value !== null ? ` "${e.value}"` : ''}, simulation ${status}${value !== null ? ` "${value}"` : ''} ${r.loadError ?? p?.error ?? ''}`);
  }
}
const how = isolated ? ' (isolated, through nucleus simulate)' : '';
console.log(bad ? `${bad} of ${expected.length} probes differ from Jint${how}.` : `The simulation matches Jint on all ${expected.length} probes${how}.`);
process.exit(bad ? 1 : 0);
