// How many Hub handlers use each name in the handler API, for the workbench's Lines column.
// Reads already-downloaded handlers (one folder per handler, with handler.js) and writes only the
// counts: no handler code leaves this machine.
//   node tools/usage-counts.mjs <handlers-dir> [--core ../splitscreenme-vscode]
// Writes playground/src/usage.json.
import fs from 'node:fs';
import path from 'node:path';

const here = path.dirname(new URL(import.meta.url).pathname);
const args = process.argv.slice(2);
const dir = args[0];
const coreAt = args.indexOf('--core');
const core = path.resolve(coreAt >= 0 ? args[coreAt + 1] : path.join(here, '..', '..', 'splitscreenme-vscode'));
if (!dir) throw new Error('usage: node tools/usage-counts.mjs <handlers-dir> [--core <splitscreenme-vscode>]');
const api = JSON.parse(fs.readFileSync(path.join(core, 'data', 'nucleus-api.json'), 'utf8'));

// Root object -> how handlers write it (Jint: only the first letter of a member is case-insensitive).
const ROOTS = {
  Game: ['Game\\.'],
  GameHook: ['Game\\.Hook\\.'],
  GameProtoInput: ['Game\\.ProtoInput\\.'],
  Context: ['Context\\.'],
  PlayerInfo: ['\\b[Pp]layer\\.', 'PlayerList\\[[^\\]]*\\]\\.'],
  ProtoInputRuntime: ['(?<!Game\\.)\\bProtoInput\\.'],
  ProtoInputValues: ['ProtoInput\\.Values\\.'],
};
const LABEL = { Game: 'Game', GameHook: 'Game.Hook', GameProtoInput: 'Game.ProtoInput', Context: 'Context', PlayerInfo: 'Player', ProtoInputRuntime: 'ProtoInput', ProtoInputValues: 'ProtoInput.Values' };
const firstCi = (n) => `[${n[0].toUpperCase()}${n[0].toLowerCase()}]${n.slice(1).replace(/[$]/g, '\\$')}`;
const patterns = [];
for (const [owner, prefixes] of Object.entries(ROOTS)) {
  for (const name of Object.keys(api.objects[owner].members)) {
    patterns.push([`${LABEL[owner]}.${name}`, new RegExp(`(?:${prefixes.join('|')})${firstCi(name)}\\b`)]);
  }
}
for (const [e, info] of Object.entries(api.enums)) {
  for (const v of Object.keys(info.values)) patterns.push([`Nucleus.${e}.${v}`, new RegExp(`Nucleus\\.${e}\\.${v}\\b`)]);
}

const files = fs.readdirSync(dir).map((d) => path.join(dir, d, 'handler.js')).filter((f) => fs.existsSync(f));
const counts = {};
for (const f of files) {
  // Comments don't count as use.
  const src = fs.readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:"'\\])\/\/.*$/gm, '$1');
  for (const [p, re] of patterns) if (re.test(src)) counts[p] = (counts[p] || 0) + 1;
}
const out = { handlers: files.length, takenAt: new Date().toISOString().slice(0, 10), counts: Object.fromEntries(Object.entries(counts).sort((a, b) => b[1] - a[1])) };
fs.writeFileSync(path.join(here, '..', 'playground', 'src', 'usage.json'), JSON.stringify(out) + '\n');
console.log(`${files.length} handlers, ${Object.keys(counts).length} names used. Top:`, Object.entries(out.counts).slice(0, 8).map(([k, v]) => `${k} ${v}`).join(', '));
