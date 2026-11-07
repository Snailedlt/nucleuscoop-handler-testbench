// Tests for src/gamefolder.ts (the pure part). Run: node playground/src/gamefolder.test.mjs
import * as esbuild from 'esbuild';
import assert from 'node:assert/strict';
import test from 'node:test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = await esbuild.build({ entryPoints: [path.join(here, 'gamefolder.ts')], bundle: true, format: 'esm', platform: 'neutral', write: false, logLevel: 'error' });
const gf = await import('data:text/javascript;base64,' + Buffer.from(out.outputFiles[0].text).toString('base64'));

const mk = (name, paths) => {
  const files = [], dirs = new Set();
  for (const p of paths) {
    if (p.endsWith('/')) { const d = p.slice(0, -1); d.split('/').forEach((_, i, a) => dirs.add(a.slice(0, i + 1).join('/'))); continue; }
    const parts = p.split('/');
    for (let i = 1; i < parts.length; i++) dirs.add(parts.slice(0, i).join('/'));
    files.push({ path: p, size: 1000 + p.length });
  }
  return { name, files, dirs: [...dirs].sort() };
};

// An Unreal-like install: launcher at the top, the game under ShooterGame/Binaries/Win64.
const unreal = mk('MyShooter', [
  'MyShooter.exe',
  'Engine/Binaries/ThirdParty/Steamworks/Steamv151/Win64/steam_api64.dll',
  'Engine/Config/BaseEngine.ini',
  'ShooterGame/Binaries/Win64/ShooterGame-Win64-Shipping.exe',
  'ShooterGame/Binaries/Win64/steam_api64.dll',
  'ShooterGame/Binaries/Win64/xinput1_3.dll',
  'ShooterGame/Binaries/Win64/mygame.ini',
  'ShooterGame/Binaries/Win64/game.ini',
  'ShooterGame/Content/Paks/ShooterGame-WindowsNoEditor.pak',
  'ShooterGame/Config/DefaultGame.ini',
  'ShooterGame/Saved/',
]);

const at = (text, p) => text.slice(p.start, p.end);

test('wrong ExecutableName: warning with did-you-mean and a fix', () => {
  const h = 'Game.GameName = "My Shooter";\nGame.ExecutableName = "ShooterGame-Win64-Shiping.exe";\nGame.GUID = "x";\n';
  const ps = gf.checkAgainstFolder(h, unreal);
  const p = ps.find((x) => x.title === 'The executable is not in the game folder');
  assert.ok(p, JSON.stringify(ps, null, 1));
  assert.equal(p.severity, 'warning');
  assert.equal(at(h, p), 'ShooterGame-Win64-Shiping.exe');
  assert.match(p.why, /Did you mean ShooterGame-Win64-Shipping\.exe\?/);
  assert.equal(p.fix.text, 'ShooterGame-Win64-Shipping.exe');
  // Engine facts are on Game.GameName.
  const facts = ps.filter((x) => x.title.startsWith('Game folder:'));
  assert.deepEqual(facts.map((f) => f.title).sort(), ['Game folder: Steam API DLL', 'Game folder: The game ships an XInput DLL', 'Game folder: Unreal Engine game']);
  assert.equal(at(h, facts[0]), 'My Shooter');
});

test('exe in a subfolder without BinariesFolder: info + fix; with it: root is the picked folder', () => {
  const h = 'Game.ExecutableName = "shootergame-win64-shipping.exe";\n';
  const ps = gf.checkAgainstFolder(h, unreal);
  const p = ps.find((x) => x.title.startsWith('Found in'));
  assert.equal(p.severity, 'info');
  assert.equal(p.fix.text, '\nGame.BinariesFolder = "ShooterGame\\\\Binaries\\\\Win64";');
  const h2 = h + 'Game.BinariesFolder = "ShooterGame\\\\Binaries\\\\Win64";\nGame.DirSymlinkExclusions = ["ShooterGame\\\\Saved", "Engine\\\\Confg"];\n';
  const ps2 = gf.checkAgainstFolder(h2, unreal);
  assert.ok(!ps2.some((x) => x.title.startsWith('Found in')));
  const miss = ps2.filter((x) => x.title === 'Folder not in the game folder');
  assert.equal(miss.length, 1, JSON.stringify(ps2, null, 1));
  assert.equal(at(h2, miss[0]), 'Engine\\\\Confg');
  assert.equal(miss[0].fix.text, 'Engine\\\\Config');
  assert.match(gf.folderSummaryHtml(unreal, h2), /Game root<\/dt><dd><code>MyShooter<\/code>/);
});

test('BinariesFolder with "/" and one not in the path', () => {
  const ps = gf.checkAgainstFolder('Game.ExecutableName = "ShooterGame-Win64-Shipping.exe";\nGame.BinariesFolder = "ShooterGame/Binaries/Win64";\n', unreal);
  assert.ok(ps.some((x) => x.title === 'Game.BinariesFolder with "/"' && x.fix.text === 'ShooterGame\\\\Binaries\\\\Win64'));
  const ps2 = gf.checkAgainstFolder('Game.ExecutableName = "ShooterGame-Win64-Shipping.exe";\nGame.BinariesFolder = "Bin\\\\x64";\n', unreal);
  assert.ok(ps2.some((x) => x.title === "Game.BinariesFolder is not in the exe's path"));
});

test('FileSymlinkExclusions: missing entry, path entry, contains-matches, Nucleus-made files', () => {
  const h = 'Game.ExecutableName = "ShooterGame-Win64-Shipping.exe";\n'
    + 'Game.FileSymlinkExclusions = ["steam_api64.dl", "Win64/game.ini", "game.ini", "xinput1_3.dll", "handler_extra.cfg", "steam_api"];\n';
  const ps = gf.checkAgainstFolder(h, unreal);
  const typo = ps.find((x) => at(h, x) === 'steam_api64.dl');
  // "steam_api64.dl" is contained in "steam_api64.dll": Nucleus matches it, so no problem.
  assert.equal(typo, undefined);
  assert.ok(ps.some((x) => at(h, x) === 'Win64/game.ini' && x.title === 'A path in Game.FileSymlinkExclusions' && x.fix.text === 'game.ini'));
  const other = ps.find((x) => at(h, x) === 'game.ini');
  assert.equal(other.title, 'Also matches 1 other file');
  assert.match(other.why, /mygame\.ini/);
  assert.ok(!ps.some((x) => at(h, x) === 'xinput1_3.dll'));
  const extra = ps.find((x) => at(h, x) === 'handler_extra.cfg');
  assert.equal(extra.severity, 'info'); // no close name: maybe a file the handler adds
  assert.ok(!ps.some((x) => at(h, x) === 'steam_api'));
});

test('FileSymlinkExclusions typo with a close name: warning + fix', () => {
  const h = 'Game.ExecutableName = "ShooterGame-Win64-Shipping.exe";\nGame.FileSymlinkCopyInstead = [ "mygame.inii" ];\n';
  const ps = gf.checkAgainstFolder(h, unreal);
  // "mygame.inii" is not contained in any name.
  const p = ps.find((x) => at(h, x) === 'mygame.inii');
  assert.equal(p.severity, 'warning');
  assert.equal(p.fix.text, 'mygame.ini');
});

test('ExecutableContext and SymlinkFiles', () => {
  const h = 'Game.ExecutableName = "ShooterGame-Win64-Shipping.exe";\nGame.BinariesFolder = "ShooterGame\\\\Binaries\\\\Win64";\n'
    + 'Game.ExecutableContext = ["steam_api64.dll", "mygame.in"];\nGame.SymlinkFiles = ["ShooterGame\\\\Config\\\\DefaultGame.ini", "Engine\\\\Config\\\\Nope.ini"];\n';
  const ps = gf.checkAgainstFolder(h, unreal);
  assert.ok(!ps.some((x) => at(h, x) === 'steam_api64.dll'));
  const ctx = ps.find((x) => at(h, x) === 'mygame.in');
  assert.equal(ctx.title, 'Not next to the executable');
  assert.equal(ctx.fix.text, 'mygame.ini');
  assert.ok(!ps.some((x) => at(h, x).includes('DefaultGame')));
  assert.ok(ps.some((x) => at(h, x).includes('Nope.ini') && x.severity === 'warning'));
});

test('paths after Context.RootFolder: info, conservative', () => {
  const h = 'Game.ExecutableName = "ShooterGame-Win64-Shipping.exe";\nGame.BinariesFolder = "ShooterGame\\\\Binaries\\\\Win64";\n'
    + 'Game.Play = function() {\n'
    + '  var a = Path.Combine(Context.RootFolder, "ShooterGame\\\\Config", "DefaultGme.ini");\n' // typo: info + did-you-mean
    + '  var b = Path.Combine(Context.RootFolder, "ShooterGame\\\\Config\\\\DefaultGame.ini");\n' // exists
    + '  var c = Context.RootFolder + "\\\\DefaultGame.ini";\n' // in another folder
    + '  var d = Path.Combine(Context.RootFolder, sub, "x.ini");\n' // dynamic: skipped
    + '  System.IO.File.WriteAllText(Path.Combine(Context.RootFolder, "new.ini"), "");\n' // created: skipped
    + '  var e = Context.RootFolder + "\\\\steam_settings\\\\x.txt";\n' // Nucleus-made: skipped
    + '  var f = Path.Combine(Context.RootInstallFolder, "mygame.ini");\n' // exe folder: exists
    + '};\n';
  const ps = gf.checkAgainstFolder(h, unreal).filter((x) => x.title === 'Not in the game folder');
  assert.equal(ps.length, 2, JSON.stringify(ps, null, 1));
  assert.match(ps[0].why, /Did you mean DefaultGame\.ini\?/);
  assert.match(ps[1].why, /It is at ShooterGame\/Config\/DefaultGame\.ini/);
  assert.ok(ps.every((p) => p.severity === 'info'));
});

test('comments and strings do not confuse the scanner', () => {
  const h = '// Game.FileSymlinkExclusions = ["nope.dll"];\nGame.ExecutableName = "ShooterGame-Win64-Shipping.exe"; /* "x" */\nvar r = /"/g;\nGame.DirSymlinkCopyInstead = ["a]b"];\n';
  const ls = gf.folderLists(h);
  assert.equal(ls.length, 1);
  assert.equal(ls[0].option, 'DirSymlinkCopyInstead');
  assert.deepEqual(ls[0].items.map((i) => i.value), ['a]b']);
});

test('pickerOptions and insertEntry', () => {
  const h = 'Game.ExecutableName = "ShooterGame-Win64-Shipping.exe";\nGame.BinariesFolder = "ShooterGame\\\\Binaries\\\\Win64";\nGame.FileSymlinkExclusions = ["game.ini"];\nGame.DirSymlinkExclusions = [];\nGame.FileSymlinkCopyInstead = [\'a.dll\', ];\n';
  const [names, dirs, copy] = gf.folderLists(h);
  const no = gf.pickerOptions(h, names, unreal);
  assert.ok(no.find((o) => o.value === 'game.ini').present);
  assert.equal(no.find((o) => o.value === 'steam_api64.dll').detail, '2 files with this name');
  const dop = gf.pickerOptions(h, dirs, unreal);
  assert.ok(dop.some((o) => o.value === 'ShooterGame\\Saved' && o.label === 'ShooterGame/Saved/'));
  let ins = gf.insertEntry(h, names, 'mygame.ini');
  assert.equal(h.slice(0, ins.at) + ins.text + h.slice(ins.at), h.replace('["game.ini"]', '["game.ini", "mygame.ini"]'));
  ins = gf.insertEntry(h, dirs, 'ShooterGame\\Saved');
  assert.equal(ins.text, '"ShooterGame\\\\Saved"');
  assert.equal(ins.at, dirs.open + 1);
  ins = gf.insertEntry(h, copy, "it's.dll");
  assert.equal(ins.text, " 'it\\'s.dll'");
});

test('no exe found: root-relative checks are skipped, name checks still run', () => {
  const h = 'Game.ExecutableName = "nothere.exe";\nGame.DirSymlinkExclusions = ["Nope"];\nGame.FileSymlinkExclusions = ["mygame.inii"];\n';
  const ps = gf.checkAgainstFolder(h, unreal);
  assert.ok(!ps.some((x) => at(h, x) === 'Nope'));
  assert.ok(ps.some((x) => at(h, x) === 'mygame.inii'));
});

test('Unity facts and the summary escapes HTML', () => {
  const unity = mk('Cube <Game>', ['Cube.exe', 'UnityPlayer.dll', 'Cube_Data/Managed/Assembly-CSharp.dll', 'Cube_Data/globalgamemanagers']);
  const f = gf.engineFacts(unity);
  assert.equal(f[0].id, 'unity');
  assert.match(f[0].text, /Mono/);
  const html = gf.folderSummaryHtml(unity, 'Game.ExecutableName = "<b>.exe";');
  assert.ok(!html.includes('<Game>') && html.includes('Cube &lt;Game&gt;') && html.includes('&lt;b&gt;.exe not found'));
  assert.match(html, /data-gf="forget"/);
  // A non-Unity "_Data" folder is not enough.
  assert.equal(gf.engineFacts(mk('X', ['X.exe', 'Game_Data/readme.txt'])).length, 0);
});
