// Unit tests for the workbench's pure modules (playground/src): share links, packages, theme files, looks, key
// bindings and the saved file's name. Run: node tools/workbench-units.test.mjs (or npm test in playground).
// The extension's core is found as in tools/bundle-ts.mjs (CORE_DIR, ./core, ../splitscreenme-vscode).
import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import { coreDir, load, memoryStorage, root } from './bundle-ts.mjs';

globalThis.localStorage = memoryStorage();
globalThis.window = { addEventListener() {}, matchMedia: () => ({ matches: false, addEventListener() {} }) };
globalThis.matchMedia = window.matchMedia;
// The browser's CSS.supports, roughly: enough to tell a theme file's good values from bad ones.
globalThis.CSS = {
  supports: (prop, v) =>
    prop === 'color' ? /^(#[0-9a-f]{3,8}|(rgb|hsl)a?\([^()]*\)|color-mix\(.*\)|[a-z]+)$/i.test(v)
    : prop === 'border-radius' ? /^\d+(\.\d+)?(px|rem|em|%)?$/.test(v)
    : prop === 'box-shadow' ? /^(none|[\d\s.pxrgba(),#-]+)$/i.test(v)
    : prop === 'font-family' ? /^[\w\s,"'-]+$/.test(v)
    : false,
};

const share = await load('playground/src/share.ts');
const pkg = await load('playground/src/package.ts');
const theme = await load('playground/src/customtheme.ts');
const kit = await load('playground/src/themekit.ts');
const keys = await load('playground/src/keybindings.ts');
const save = await load('playground/src/savefile.ts');
const THEMES = JSON.parse(fs.readFileSync(path.join(root, 'playground/src/themes.json'), 'utf8'));

test('share links: round trip, unicode and long text, only letters and digits', async () => {
  for (const src of ['', 'Game.GameName = "x";', 'Game.GameName = "Ünïcode ✓ 日本 🎮";\n// ½ — “quotes”\n', 'var a = 1;\n'.repeat(5000) + Array.from({ length: 2000 }, (_, i) => `var v${i} = ${(i * 7919) % 1000};`).join('\n')]) {
    const h = await share.encodeShare(src);
    assert.ok(h.startsWith(share.SHARE_PREFIX));
    assert.match(h.slice(share.SHARE_PREFIX.length), /^[0-9A-Za-z]*$/);
    assert.equal(await share.decodeShare(h), src);
  }
  await assert.rejects(share.decodeShare('share-A'), 'a damaged link throws');
  await assert.rejects(share.decodeShare('share-AB_'));
});

test('packages: build then read gives the handler and files back, with folder entries', async () => {
  const enc = new TextEncoder();
  const files = [
    { name: 'My Game/readme.txt', data: enc.encode('hello') },
    { name: 'My Game/utils/x.ini', data: enc.encode('[a]\nb=ü') },
    { name: 'My Game/big.dll', data: new Uint8Array(0), remote: { size: 9e6, url: 'https://hub.splitscreen.me/handler/x' } },
    { name: 'handler.js', data: enc.encode('an old handler.js among the files: replaced') },
  ];
  const zip = pkg.buildPackage('Game.GameName = "Ünï";\n', files);
  // The directory entries Nucleus needs, sorted, after handler.js; placeholders and a second handler.js left out.
  const names = [];
  const v = new DataView(zip.buffer, zip.byteOffset, zip.byteLength);
  for (let p = v.getUint32(zip.length - 22 + 16, true); v.getUint32(p, true) === 0x02014b50; p += 46 + v.getUint16(p + 28, true) + v.getUint16(p + 30, true) + v.getUint16(p + 32, true)) names.push(new TextDecoder().decode(zip.subarray(p + 46, p + 46 + v.getUint16(p + 28, true))));
  assert.deepEqual(names, ['handler.js', 'My Game/', 'My Game/utils/', 'My Game/readme.txt', 'My Game/utils/x.ini']);
  const back = await pkg.readPackage(zip.buffer.slice(zip.byteOffset, zip.byteOffset + zip.byteLength));
  assert.equal(back.handler, 'Game.GameName = "Ünï";\n');
  assert.equal(back.handlerName, 'handler.js');
  assert.deepEqual(back.files.map((f) => [f.name, new TextDecoder().decode(f.data)]), [['My Game/readme.txt', 'hello'], ['My Game/utils/x.ini', '[a]\nb=ü']]);
  assert.deepEqual(back.unreadable, []);
  assert.equal(await pkg.readPackage(new TextEncoder().encode('not a zip').buffer), null);
});

test('packages: a deflated package (as the Hub and VS Code write it) reads too', async () => {
  const zlib = await import('node:zlib');
  const { packageEntries, zipBytes: zb } = await load(path.join(coreDir, 'src/core/zipbytes.ts'));
  const enc = new TextEncoder();
  const z = zb(packageEntries(enc.encode('Game.GUID = "a";\n'.repeat(50)), [{ name: 'G/a.txt', data: enc.encode('x'.repeat(4000)) }]), new Date(), (raw) => new Uint8Array(zlib.deflateRawSync(raw)));
  const back = await pkg.readPackage(z.buffer.slice(z.byteOffset, z.byteOffset + z.byteLength));
  assert.equal(back.handler, 'Game.GUID = "a";\n'.repeat(50));
  assert.equal(new TextDecoder().decode(back.files[0].data), 'x'.repeat(4000));
});

test('theme files: known tokens and safe values only, with what was left out', () => {
  const ok = theme.parseTheme({ name: ' Sunset ', base: 'v3', shared: { '--r-pane': '18px' }, light: { bg: '#fbf1e6', accent: '#b4232c', nope: '#fff' }, dark: { bg: '#1a1210', fg: 'url(x.png)' } });
  assert.ok(!('error' in ok));
  assert.equal(ok.look.name, 'Sunset');
  assert.equal(ok.look.base, 'v3');
  assert.deepEqual(ok.look.shared, { 'r-pane': '18px' }, 'a leading -- is allowed');
  assert.deepEqual(ok.look.light, { bg: '#fbf1e6', accent: '#b4232c' });
  assert.deepEqual(ok.look.dark, { bg: '#1a1210' });
  assert.deepEqual(ok.skipped, ['light.nope (not a theme token)', 'dark.fg (not a valid color)']);
  // Nothing that could leave the rule: semicolons, braces, url(), @import.
  for (const bad of ['red; } body { display: none', 'url(https://x)', '@import "x"', 'expression(alert(1))', '<script>']) {
    const r = theme.parseTheme({ light: { accent: bad, bg: '#fff' } });
    assert.deepEqual(r.look.light, { bg: '#fff' }, bad);
  }
  const unknownBase = theme.parseTheme({ base: 'nope', light: { bg: '#fff' } });
  assert.notEqual(unknownBase.look.base, 'nope');
  assert.match(unknownBase.skipped[0], /^base "nope" \(built-in looks: /);
  assert.equal(theme.parseTheme({ light: { bg: '#fff' } }).look.name, 'Custom theme');
  for (const raw of [null, 'x', 42, [], {}]) assert.ok('error' in theme.parseTheme(raw), JSON.stringify(raw));
  assert.match(theme.parseTheme({ light: { nope: 1 } }).error, /^Nothing in this file can be used: light\.nope/);
  assert.ok('error' in theme.parseTheme({ light: 'red' }));
});

test('themekit: a look builds on its base, derives what it leaves out, never loops', () => {
  const looks = { a: { name: 'A', shared: { r: '4px' }, light: { bg: '#fff', fg: '#000', surface: '#fff', accent: '#0050aa' }, dark: { bg: '#000', fg: '#fff', surface: '#111', accent: '#ffcc00' } }, b: { name: 'B', base: 'a', light: { accent: '#ffee00' } }, loop: { name: 'L', base: 'loop2' }, loop2: { name: 'L2', base: 'loop' } };
  const b = kit.resolve('b', looks, 'light');
  assert.equal(b.bg, '#fff');
  assert.equal(b.r, '4px');
  assert.equal(b.accent, '#ffee00');
  assert.equal(b['accent-fg'], '#0b0d12', 'dark text on a light accent (derived)');
  assert.equal(kit.resolve('a', looks, 'dark')['accent-fg'], '#0b0d12');
  assert.equal(kit.resolve('a', looks, 'light')['accent-fg'], '#ffffff', 'white text on a dark accent');
  assert.equal(kit.resolve('a', looks, 'light')['err-bg'], undefined, 'nothing derived from tokens the look lacks');
  assert.deepEqual(kit.resolve('loop', looks, 'light'), {});
  assert.deepEqual(kit.resolve('missing', looks, 'light'), {});
  assert.equal(kit.readableOn('#000000'), '#ffffff');
  assert.equal(kit.readableOn('#fff'), '#0b0d12');
  assert.equal(kit.readableOn('red'), '#ffffff');
  const css = kit.lookCSS(':root', { bg: '#fff' }, { bg: '#000' });
  assert.match(css, /^:root \{ --bg: #fff; color-scheme: light; \}/);
  assert.match(css, /:root\[data-theme="dark"\] \{ --bg: #000; color-scheme: dark; \}/);
  // Every built-in look resolves, with text tokens for every pair the contrast check reads.
  const file = THEMES;
  for (const id of Object.keys(file.looks)) for (const m of ['light', 'dark']) {
    const t = kit.resolve(id, file.looks, m);
    for (const [fg, bg] of kit.PAIRS) assert.ok(t[fg] && t[bg], `${id} ${m}: ${fg} on ${bg}`);
  }
  assert.match(kit.builtInCSS(file), /:root\[data-site="v3"\]\[data-site\]/);
  assert.deepEqual(kit.codeTokens({ 'code-fg': '#000', 'code-bg': '#fff' })['code-line'], 'color-mix(in srgb, #000 12%, #fff)');
});

test('key bindings: defaults, own bindings, two-step keys, conflicts and keys the browser keeps', () => {
  assert.equal(keys.binding('palette'), 'Ctrl+Shift+P');
  assert.equal(keys.binding('nope'), '');
  assert.equal(keys.keyLabel('Ctrl+Shift+P'), 'Ctrl+Shift+P');
  const ev = (o) => ({ ctrlKey: false, metaKey: false, altKey: false, shiftKey: false, ...o });
  assert.equal(keys.stepOf(ev({ key: 'p', code: 'KeyP', ctrlKey: true, shiftKey: true })), 'Ctrl+Shift+P');
  assert.equal(keys.stepOf(ev({ key: 'ö', code: 'Semicolon', ctrlKey: true })), 'Ctrl+;', 'punctuation by its US position');
  assert.equal(keys.stepOf(ev({ key: 'Shift', code: 'ShiftLeft', shiftKey: true })), undefined);
  assert.equal(keys.appActionFor(ev({ key: 'P', code: 'KeyP', ctrlKey: true, shiftKey: true })), 'palette');
  // Ctrl+; A: the first step waits, the second completes it.
  assert.equal(keys.appActionFor(ev({ key: ';', code: 'Semicolon', ctrlKey: true })), 'pending');
  assert.equal(keys.appActionFor(ev({ key: 'a', code: 'KeyA' })), 'testAll');
  // Conflicts: another action with the same keys, written in any order of modifiers.
  assert.deepEqual(keys.conflicts('lines', 'Shift+Ctrl+P').map((a) => a.id), ['palette']);
  assert.deepEqual(keys.conflicts('palette', 'Ctrl+Shift+P'), []);
  assert.equal(keys.reserved('Ctrl+W'), 'closes the tab');
  assert.equal(keys.reserved('Ctrl+B'), undefined);
  // An own binding is kept, can be empty (none), and resets.
  let changed = 0;
  keys.onBindingsChange(() => changed++);
  keys.setBinding('lines', 'Ctrl+Alt+L');
  assert.equal(keys.binding('lines'), 'Ctrl+Alt+L');
  assert.ok(keys.isCustom('lines'));
  assert.deepEqual(JSON.parse(localStorage.getItem('nucleus-workbench-keys')), { lines: 'Ctrl+Alt+L' });
  assert.deepEqual(keys.conflicts('palette', 'Ctrl+B'), [], 'the old binding is free now');
  keys.setBinding('save', '');
  assert.equal(keys.binding('save'), '');
  keys.resetAll();
  assert.equal(keys.binding('lines'), 'Ctrl+B');
  assert.equal(localStorage.getItem('nucleus-workbench-keys'), null);
  assert.equal(changed, 3);
  // The code editor's keymap: CodeMirror's notation, two steps with a space.
  const map = keys.codeKeyMap({ find: () => {} });
  assert.equal(typeof map['Ctrl-F'], 'function');
  assert.equal(map['Ctrl-K Ctrl-0'], 'foldAll');
  // Every action has a unique id, and no two changeable actions share a default binding where they'd clash.
  const ids = keys.ACTIONS.map((a) => a.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const a of keys.ACTIONS) if (a.where !== 'fixed') assert.deepEqual(keys.conflicts(a.id, keys.binding(a.id)).map((x) => x.id), [], a.id);
});

test("the saved file's name: the folder a Hub install makes (Game.GameName), else the document's name", () => {
  assert.equal(save.saveFileName('Game.GameName = "Half-Life: Source";\n', 'x.js'), 'Half-Life Source');
  assert.equal(save.saveFileName('game.gamename = "lower case";', 'x.js'), 'lower case', 'Nucleus matches the line case-insensitively');
  assert.equal(save.saveFileName('Game.GameName = "A \\"quoted\\" name";', 'x.js'), 'A quoted name', 'between the first and the last quote');
  assert.equal(save.saveFileName('Game.GameName = "Back\\\\slash";', 'x.js'), 'Backslash', 'a backslash cannot be in a file name');
  assert.equal(save.saveFileName('var a = 1;', 'My handler.js'), 'My handler');
  assert.equal(save.saveFileName('', ''), 'handler');
  assert.equal(save.saveFileName('  Game.GameName = "Indented";', 'doc.js'), 'doc', 'Nucleus does not see an indented line');
});

// Learn (playground/src/learn/lessons.ts): each code lesson starts unfinished and its solution passes; solutions
// are what people copy (no errors); the finished handler has no warnings either; what the notes claim Check says,
// it says.
test('learn: every lesson starts unfinished, its solution passes, with no errors', async () => {
  const { CHAPTERS, FINAL, solutionErrors, findLesson } = await load('playground/src/learn/lessons.ts');
  const { lint } = await load(path.join(coreDir, 'src', 'core', 'lint.ts'));
  const first = CHAPTERS.find((c) => c.id === 'first-handler');
  assert.ok(first && first.lessons.length >= 10, 'the first chapter');
  for (const ch of CHAPTERS) {
    const ids = new Set();
    for (const l of ch.lessons) {
      assert.ok(/^[a-z0-9-]+$/.test(l.id) && !ids.has(l.id), `${ch.id}/${l.id}: a unique, readable id`);
      ids.add(l.id);
      assert.ok(l.title && l.text.length, l.id);
      assert.ok((l.notes ?? []).length <= 3, `${l.id}: at most 3 notes`);
      assert.deepEqual(solutionErrors(l), [], `${l.id}: errors in the solution`);
      if (l.kind !== 'code') continue;
      assert.ok(l.task && l.check && l.pane, `${l.id}: a task, a check and a pane`);
      assert.notEqual(l.check(l.start), null, `${l.id}: the starting code is already done`);
      assert.equal(l.check(l.solution), null, `${l.id}: the solution doesn't pass: ${l.check(l.solution)}`);
    }
    assert.equal(findLesson(`#${ch.id}/${ch.lessons[2].id}`).index, 2);
  }
  assert.equal(findLesson('#nonsense').index, 0, 'an unknown link opens the start');
  const d = lint(FINAL).filter((x) => x.severity === 'error' || x.severity === 'warning');
  assert.deepEqual(d.map((x) => `${x.rule}: ${x.message}`), [], 'the finished handler: no errors or warnings');
  // Lesson notes say Check flags these.
  assert.ok(lint('Game.GUID = "a";\nGame.GameName = "a";\nGame.ExecutableName = "a.exe";\nGame.ExecutableContext = "srb2.pk3";\n').some((x) => x.severity !== 'hint'), 'ExecutableContext as plain text');
  assert.ok(lint('Game.GUID = "a";\nGame.GameName = "a";\nGame.ExecutableName = "a.exe";\nGame.MaxPlayers = "4";\n').some((x) => x.severity === 'warning' || x.severity === 'error'), 'MaxPlayers in quotes');
  // The tutorial test lesson hands over the handler without the pause settings (the bug the next lesson fixes).
  // The first full test runs without Game.Play (full-screen windows: the bug the next lesson fixes).
  const test1 = first.lessons.find((l) => l.id === 'test'), fix = first.lessons.find((l) => l.id === 'fullscreen');
  assert.ok(!/Game\.Play/.test(test1.solution) && fix.check(test1.solution) !== null && /Game\.Play/.test(FINAL));
  // Every lesson has a section, and a section's lessons sit together (the lesson list groups them).
  const order = first.lessons.map((l) => l.section).filter((s, i, a) => s !== a[i - 1]);
  assert.equal(new Set(order).size, order.length, `sections out of order: ${order.join(', ')}`);
});

test('snippets: a bare stop repeats its default text', async () => {
  const { expandSnippet } = await load('playground/src/snippet.ts');
  assert.equal(expandSnippet('${1:player} = $1').text, 'player = player');
  assert.equal(expandSnippet('$1 = ${1:p\\}x}').text, 'p}x = p}x');
  assert.equal(expandSnippet('f(${1|a,b|}, $1)$0').text, 'f(a, a)');
  assert.equal(expandSnippet('x$1y').text, 'xy');
  // An escaped placeholder is text, not a default.
  assert.equal(expandSnippet('\\${1:player} = $1').text, '${1:player} = ');
});

test('key bindings: Reset takes the default back from whoever has it', () => {
  const a = keys.ACTIONS.find((x) => x.where !== 'fixed' && keys.binding(x.id) && keys.steps(keys.binding(x.id)).length === 1);
  const b = keys.ACTIONS.find((x) => x.where !== 'fixed' && x.id !== a.id);
  const def = keys.binding(a.id);
  keys.setBinding(a.id, '');
  keys.setBinding(b.id, def);
  assert.deepEqual(keys.resetBinding(a.id).map((x) => x.id), [b.id]);
  assert.equal(keys.binding(a.id), def);
  assert.equal(keys.binding(b.id), '');
  keys.resetAll();
});

test('find: the current match skips one ending at the cursor', async () => {
  const { currentMatch } = await load('playground/src/findwidget.ts');
  const aa = [[0, 1], [1, 2]];
  assert.equal(currentMatch(aa, 0), 0);
  assert.equal(currentMatch(aa, 1), 1, 'the cursor after the first a');
  assert.equal(currentMatch(aa, 2), 0, 'wraps');
  assert.equal(currentMatch([], 0), -1);
});

test('key bindings: a chord and its first step clash', () => {
  const chord = keys.ACTIONS.find((a) => keys.steps(keys.binding(a.id)).length > 1);
  assert.ok(chord, 'a default binding with two steps');
  const first = keys.steps(keys.binding(chord.id))[0];
  const other = keys.ACTIONS.find((a) => a.id !== chord.id && a.where !== 'fixed');
  assert.ok(keys.conflicts(other.id, first).some((a) => a.id === chord.id), `${first} clashes with ${chord.id}`);
});

test('AI fix diff: a huge rewrite is shown without the n×m table', async () => {
  const { diffLines, MAX_DIFF_CELLS } = await load('playground/src/aifix.ts');
  const n = Math.ceil(Math.sqrt(MAX_DIFF_CELLS)) + 10;
  const a = Array.from({ length: n }, (_, i) => `a${i}`).join('\n');
  const b = Array.from({ length: n }, (_, i) => `b${i}`).join('\n');
  const t0 = Date.now();
  const d = diffLines(a, b);
  assert.ok(Date.now() - t0 < 2000);
  assert.equal(d.filter((l) => l.kind === '-').length, n);
  assert.equal(d.filter((l) => l.kind === '+').length, n);
  // A big deletion (one side empty) needs no table either.
  const big = Array.from({ length: 5000 }, (_, i) => `l${i}`).join('\n');
  assert.equal(diffLines(big + '\nend', 'end').filter((l) => l.kind === '-').length, 5000);
  assert.deepEqual(diffLines('x\ny\nz', 'x\nY\nz').map((l) => l.kind).sort(), [' ', ' ', '+', '-']);
});
