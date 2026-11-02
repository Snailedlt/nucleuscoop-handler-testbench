// Nightly differential check on real handlers: for every verified Hub handler, compares what the
// real engine (run.sh --verified, Jint 2.11.58) did with what Try it (splitscreenme-vscode's
// `nucleus simulate`) predicts, and lints it. Exit 1 when they disagree or a handler has lint errors.
//
//   node tools/compare-hub.mjs <run.sh --verified output> <path to splitscreenme-vscode>
//
// ENV results (the handler touched real files, which the Linux harness can't provide) are listed
// but not compared.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const [jintOut, core] = process.argv.slice(2);
if (!jintOut || !core) {
  console.error('usage: node tools/compare-hub.mjs <run.sh output> <splitscreenme-vscode>');
  process.exit(2);
}
const cli = path.join(core, 'dist', 'cli.js');
const root = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'downloads', 'verified-manifest.json'), 'utf8'));
const byFile = Object.fromEntries(manifest.map((m) => [m.file, m]));

const jint = new Map();
for (const line of fs.readFileSync(jintOut, 'utf8').split('\n')) {
  const m = /^(OK|LOADED|LOAD-FAIL|PLAY-FAIL|ENV)\s+(\S+\.js)\s*(.*)$/.exec(line);
  if (m) jint.set(m[2], { status: m[1], args: /args\[P1\]=(.*?)(?:\s+\||$)/.exec(m[3])?.[1]?.trim() ?? null, detail: m[3] });
}

const run = (args) => {
  try {
    return JSON.parse(execFileSync(process.execPath, [cli, ...args], { encoding: 'utf8', maxBuffer: 64 << 20 }));
  } catch (e) {
    return JSON.parse(e.stdout); // exit code 1 when there are errors / failures
  }
};

const rows = [];
for (const [file, j] of jint) {
  const p = path.join(root, 'downloads', 'handlers', file);
  const lint = run(['lint', '--json', p]);
  // The same setup as the harness: 2 players, player 1 on keyboard and mouse.
  const s = run(['simulate', p, '--json', '--players', '2', '--keyboard', '1']);
  const sim = !s.loaded ? 'LOAD-FAIL' : !s.hasPlay ? 'LOADED' : s.sessionEnded ? 'PLAY-FAIL' : 'OK';
  const simArgs = s.players?.[0]?.startArguments?.trim() ?? null;
  rows.push({ file, title: byFile[file]?.title ?? file, jint: j.status, sim, argsMatch: j.status === 'OK' && sim === 'OK' ? j.args === simArgs : null, jintArgs: j.args, simArgs, lintErrors: lint.errors, detail: j.detail });
}

const compared = rows.filter((r) => r.jint !== 'ENV');
const disagree = compared.filter((r) => r.jint !== r.sim);
const argDiff = compared.filter((r) => r.argsMatch === false);
const lintBad = rows.filter((r) => r.lintErrors > 0);
const lines = [
  `## Verified Hub handlers: real Jint vs Try it`,
  ``,
  `- ${rows.length} handlers; ${compared.length} compared (${rows.length - compared.length} touch real files, which the harness can't provide)`,
  `- Outcome agrees: **${compared.length - disagree.length}/${compared.length}**`,
  `- Player 1 launch arguments agree: ${compared.filter((r) => r.argsMatch).length}/${compared.filter((r) => r.argsMatch !== null).length}`,
  `- Lint errors: ${lintBad.length ? `**${lintBad.length} handlers**` : 'none'}`,
];
if (disagree.length) lines.push('', '### Outcome differs', '', '| Handler | Jint | Try it | Jint detail |', '| --- | --- | --- | --- |', ...disagree.map((r) => `| ${r.title} (${r.file}) | ${r.jint} | ${r.sim} | ${r.detail.slice(0, 160).replace(/\|/g, '\\|')} |`));
if (argDiff.length) lines.push('', '### Launch arguments differ (player 1)', '', '| Handler | Jint | Try it |', '| --- | --- | --- |', ...argDiff.map((r) => `| ${r.title} | \`${(r.jintArgs ?? '').slice(0, 120)}\` | \`${(r.simArgs ?? '').slice(0, 120)}\` |`));
if (lintBad.length) lines.push('', '### Lint errors', '', ...lintBad.map((r) => `- ${r.title} (${r.file}): ${r.lintErrors}`));
const report = lines.join('\n');
console.log(report);
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, report + '\n');
fs.writeFileSync(path.join(root, 'downloads', 'compare-hub.json'), JSON.stringify(rows, null, 1));
process.exit(disagree.length || lintBad.length ? 1 : 0);
