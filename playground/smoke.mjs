// Browser smoke test of the built site (dist/pages), run before every deploy (pages.yml).
// Loads the workbench and the start page in Chromium, light and dark, desktop and phone, and checks
// that the main flows still work: Check, Fix all, editing after a fix, Try it, an example package,
// the theme of the screenshots, keyboard access, and no accessibility violations (axe-core).
//
//   npm run build   (or: node build.mjs --preview)
//   node smoke.mjs  [--headed]
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { chromium, devices } from 'playwright';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, 'dist', 'pages');
const AXE = fs.readFileSync(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8');
if (!fs.existsSync(path.join(root, 'index.html'))) throw new Error('No dist/pages: run the build first.');

// A static server for dist/pages (fetches of hub/<id>.js and the start page need http).
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.png': 'image/png', '.txt': 'text/plain', '.json': 'application/json', '.xml': 'application/xml' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(root, path.normalize(p).replace(/^([/\\])+/, ''));
  if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) return res.writeHead(404).end();
  res.writeHead(200, { 'content-type': TYPES[path.extname(f)] ?? 'application/octet-stream' }).end(fs.readFileSync(f));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const BASE = `http://127.0.0.1:${server.address().port}/`;

let failures = 0;
const check = (ok, what) => {
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${what}`);
  if (!ok) failures++;
};
const browser = await chromium.launch({ headless: !process.argv.includes('--headed') });
async function page(theme, opts = { viewport: { width: 1280, height: 800 } }) {
  const ctx = await browser.newContext({ colorScheme: theme, ...opts });
  await ctx.addInitScript(() => {
    try {
      localStorage.setItem('nucleus-workbench-welcomed', '1');
    } catch {}
  });
  // Only the page's own origin: the release lookup, fonts and the Hub are not needed here.
  await ctx.route((u) => !u.href.startsWith(BASE), (r) => r.abort());
  const p = await ctx.newPage();
  const errors = [];
  p.on('pageerror', (e) => errors.push(e.message));
  return { ctx, p, errors };
}
const axe = async (p, what) => {
  await p.addScriptTag({ content: AXE });
  const v = await p.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] })).violations.map((x) => `${x.id} (${x.nodes.length}): ${x.nodes[0]?.target.join(' ')}`));
  check(!v.length, `accessibility, ${what}${v.length ? `: ${v.join('; ')}` : ''}`);
};
const count = (p) => p.$eval('#count-problems', (e) => Number(e.textContent));
const cmType = (p, find, text) =>
  p.evaluate(([f, t]) => {
    const cm = document.querySelector('.CodeMirror').CodeMirror;
    for (let i = 0; i < cm.lineCount(); i++) if (cm.getLine(i).includes(f)) return cm.replaceRange(t, { line: i, ch: cm.getLine(i).length }), true;
    return false;
  }, [find, text]);

for (const theme of ['light', 'dark']) {
  // Check, Fix all, then editing: the fix box closes and Check counts the new problem.
  const { ctx, p, errors } = await page(theme);
  await p.goto(BASE + '#example-mistakes');
  await p.waitForSelector('.CodeMirror');
  await p.waitForTimeout(1200);
  check((await p.$$('input[type=password]')).length === 0, `${theme}: no password fields (browsers would offer to save a login)`);
  const before = await count(p);
  check(before > 0 && /can't use this handler/.test(await p.innerText('#panel-problems')), `${theme}: Check lists the example's problems (${before})`);
  await axe(p, `${theme}, Check`);
  await p.click('#fix-all');
  await p.waitForTimeout(500);
  if (await p.$('#ai-accept')) await p.click('#ai-accept');
  await p.waitForTimeout(800);
  const after = await count(p);
  check(after < before && (await p.isVisible('#ai-box')), `${theme}: Fix all fixes problems and shows what it did (${before} → ${after})`);
  await axe(p, `${theme}, after Fix all`);
  await cmType(p, 'Game.MaxPlayers', '\nvar x = sdfsdf;');
  await p.waitForTimeout(1200);
  check(!(await p.isVisible('#ai-box')), `${theme}: the fix box closes when the code changes`);
  check(/A name that doesn't exist/.test(await p.innerText('#panel-problems')), `${theme}: Check reports a name that doesn't exist`);
  // Try it
  await p.click('[role=tab][data-tab=simulate]');
  await p.waitForTimeout(800);
  check((await p.innerText('#panel-simulate')).length > 100, `${theme}: Try it renders`);
  // Keyboard: Tab reaches the editor, and typing goes into it.
  await p.focus('#lines-toggle');
  let focused = false;
  for (let i = 0; i < 10 && !focused; i++) {
    await p.keyboard.press('Tab');
    focused = await p.evaluate(() => document.activeElement === document.querySelector('.CodeMirror').CodeMirror.getInputField());
  }
  const typed = focused && (await p.keyboard.type('// typed'), await p.evaluate(() => document.querySelector('.CodeMirror').CodeMirror.getValue().includes('// typed')));
  check(typed, `${theme}: Tab reaches the code editor, and typing goes into it`);
  await axe(p, `${theme}, Try it`);
  // Docs with nothing typed shows what's in it.
  await p.click('[role=tab][data-tab=api]');
  await p.waitForTimeout(200);
  check((await p.$$('#api-results .api-group')).length >= 6 && (await p.$$('#api-results .api-chip')).length >= 10, `${theme}: Docs lists what's in it when nothing is typed`);
  await axe(p, `${theme}, Docs`);
  // A custom theme file: applied, unsafe values left out, removable.
  await p.$eval('#settings-open', (b) => b.click()); // in the menu now
  await p.waitForTimeout(300);
  await p.click('#st-theme');
  await p.setInputFiles('#ct-file', { name: 't.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify({ name: 'T', light: { accent: '#7a1f2b', bg: 'red;}body{display:none' }, dark: { accent: '#ffb4a8' } })) });
  await p.waitForTimeout(200);
  const acc = await p.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim());
  check(acc === (theme === 'dark' ? '#ffb4a8' : '#7a1f2b') && /Left out: light\.bg/.test(await p.innerText('#ct-msg')) && (await p.isVisible('body')), `${theme}: a custom theme file applies, and unsafe values are left out`);
  check((await p.$$('#set-looks .look-card .lc-remove')).length === 1 && (await p.$$('#set-looks .look-card:not(.look-add)')).length >= 5 && !!(await p.$('#set-looks .look-card.on .lc-remove')), `${theme}: the loaded theme is listed with the built-in looks, and is on`);
  await p.click('#set-looks .look-card.on .lc-remove', { force: true });
  await p.keyboard.press('Escape');
  // The first-visit questions (Nucli): picking Developer turns Advanced mode on; then back.
  await p.evaluate(() => document.dispatchEvent(new CustomEvent('open-firstrun')));
  await p.waitForTimeout(200);
  await axe(p, `${theme}, first-visit questions`);
  await p.click('label.fr-opt:has(input[value=developer])');
  await p.click('#firstrun-dialog button[type=submit]');
  await p.waitForTimeout(200);
  check(await p.evaluate(() => document.documentElement.dataset.mode === 'dev'), `${theme}: the first-visit choice "I write code" turns on Advanced mode`);
  await p.evaluate(() => document.dispatchEvent(new CustomEvent('open-firstrun')));
  await p.click('label.fr-opt:has(input[value=guided])');
  await p.click('#firstrun-dialog button[type=submit]');
  await p.$eval('#settings-open', (b) => b.click());
  await p.waitForTimeout(200);
  // Settings: search shows matches from every section; Accessibility switches apply to the page.
  await p.fill('#set-q', 'colour-blind');
  await p.waitForTimeout(100);
  check((await p.isVisible('#a11y-cb')) && !(await p.isVisible('#set-wrap')), `${theme}: Settings search finds a setting in another section and hides the rest`);
  await p.fill('#set-q', '');
  await p.click('#st-a11y');
  await p.check('#a11y-focus');
  check(await p.evaluate(() => document.documentElement.hasAttribute('data-a11y-focus')), `${theme}: an Accessibility setting applies to the page`);
  await p.uncheck('#a11y-focus');
  await axe(p, `${theme}, Settings › Accessibility`);
  await p.keyboard.press('Escape');
  await p.waitForTimeout(200);
  // The command palette (Ctrl+Shift+P, as in VS Code) and Format document (Shift+Alt+F).
  await p.click('.CodeMirror');
  await p.keyboard.press('Control+Shift+P');
  await p.waitForTimeout(300);
  check((await p.inputValue('#open-q')) === '>' && /Format document/.test(await p.innerText('#open-body')), `${theme}: Ctrl+Shift+P opens the command palette`);
  await p.fill('#open-q', '>format');
  await p.waitForTimeout(200);
  await p.keyboard.press('Enter');
  await p.waitForTimeout(400);
  await p.evaluate(() => document.querySelector('.CodeMirror').CodeMirror.setValue('Game.GUID="A";\nGame.GameName="A";\nGame.ExecutableName="a.exe";\nGame.Play=function(){\nContext.StartArguments="-w";\n};\n'));
  await p.waitForTimeout(300);
  await p.click('.CodeMirror');
  await p.keyboard.press('Shift+Alt+F');
  await p.waitForTimeout(400);
  check((await p.evaluate(() => document.querySelector('.CodeMirror').CodeMirror.getValue())) === 'Game.GUID = "A";\nGame.GameName = "A";\nGame.ExecutableName = "a.exe";\nGame.Play = function () {\n    Context.StartArguments = "-w";\n};\n', `${theme}: Shift+Alt+F formats the code`);
  check(/Shortcut|Pitfall|Best practice|Feature|Setting|Heads up/.test(await p.innerText('#tip-label').catch(() => '')), `${theme}: tips show their topic`);
  // Folding, as in VS Code: Ctrl+K Ctrl+0 folds all, Ctrl+K Ctrl+J unfolds all.
  const folds = () => p.evaluate(() => document.querySelector('.CodeMirror').CodeMirror.getAllMarks().filter((m) => m.__isFold).length);
  await p.click('.CodeMirror-code');
  await p.keyboard.press('Control+k');
  await p.keyboard.press('Control+0');
  check((await folds()) > 0, `${theme}: Ctrl+K Ctrl+0 folds the code`);
  await p.keyboard.press('Control+k');
  await p.keyboard.press('Control+j');
  check((await folds()) === 0, `${theme}: Ctrl+K Ctrl+J unfolds it`);
  // Coding keys as in VS Code: Tab indents a selection (doesn't replace it); F2 selects every use to rename.
  const cmSet = (v, a, h) => p.evaluate(([v, a, h]) => { const e = document.querySelector('.CodeMirror').CodeMirror; e.setValue(v); e.setSelection(a, h); e.focus(); }, [v, a, h]);
  const cmVal = () => p.evaluate(() => document.querySelector('.CodeMirror').CodeMirror.getValue());
  await cmSet('var a = 1;\nvar b = 2;\n', { line: 0, ch: 0 }, { line: 1, ch: 3 });
  await p.keyboard.press('Tab');
  check((await cmVal()) === '  var a = 1;\n  var b = 2;\n', `${theme}: Tab indents the selected lines`);
  await cmSet('function go() {}\ngo();\n', { line: 1, ch: 1 }, { line: 1, ch: 1 });
  await p.keyboard.press('F2');
  await p.keyboard.type('run');
  check((await cmVal()) === 'function run() {}\nrun();\n', `${theme}: F2 renames every use`);
  // Find and replace (Ctrl+F, Ctrl+H, Ctrl+Alt+Enter), go to line (Ctrl+G), as in VS Code.
  await cmSet('var foo = 1;\nvar bar = foo;\n', { line: 0, ch: 5 }, { line: 0, ch: 5 });
  await p.keyboard.press('Control+f');
  await p.waitForTimeout(200);
  check((await p.textContent('.find-widget .fw-count')) === '1 of 2', `${theme}: Ctrl+F finds the word at the cursor, with a count`);
  await p.keyboard.press('Control+h');
  await p.keyboard.type('qux');
  await p.keyboard.press('Control+Alt+Enter');
  check((await cmVal()) === 'var qux = 1;\nvar bar = qux;\n', `${theme}: Ctrl+H, Ctrl+Alt+Enter replaces all`);
  await p.keyboard.press('Escape');
  await p.keyboard.press('Control+g');
  await p.waitForTimeout(300);
  await p.keyboard.type('2:5');
  await p.keyboard.press('Enter');
  await p.waitForTimeout(200);
  check((await p.evaluate(() => JSON.stringify(document.querySelector('.CodeMirror').CodeMirror.getCursor()))).startsWith('{"line":1,"ch":4'), `${theme}: Ctrl+G 2:5 goes to line 2, column 5`);
  // A German keyboard: Ctrl + the key where a US keyboard has "/" (it prints "-") toggles a comment.
  await cmSet('var a = 1;\n', { line: 0, ch: 0 }, { line: 0, ch: 0 });
  await p.evaluate(() => {
    const e = document.querySelector('.CodeMirror').CodeMirror;
    const ev = new KeyboardEvent('keydown', { key: '-', code: 'Slash', ctrlKey: true, bubbles: true, cancelable: true });
    Object.defineProperty(ev, 'keyCode', { get: () => 189 });
    e.getInputField().dispatchEvent(ev);
  });
  check((await cmVal()) === '// var a = 1;\n', `${theme}: shortcuts with punctuation work by key position on other keyboard layouts`);
  // Rebinding: Settings › Keyboard shortcuts, press the new keys, Enter; it works in the code at once; Reset puts it back.
  await p.keyboard.press('Control+Comma');
  await p.click('#st-keys');
  await p.fill('#sp-keys .kb-q', 'comment or');
  await p.click('#sp-keys [data-kb-change="comment"]');
  await p.keyboard.press('Control+Shift+Digit7');
  await p.keyboard.press('Enter');
  await p.keyboard.press('Escape');
  await cmSet('var a = 1;\n', { line: 0, ch: 0 }, { line: 0, ch: 0 });
  await p.keyboard.press('Control+Shift+Digit7');
  check((await cmVal()) === '// var a = 1;\n', `${theme}: a changed shortcut works in the code`);
  check((await p.evaluate(() => localStorage.getItem('nucleus-workbench-keys'))) === '{"comment":"Ctrl+Shift+7"}', `${theme}: changed shortcuts are kept (and exported with the settings)`);
  await p.evaluate(() => localStorage.removeItem('nucleus-workbench-keys'));
  // Dialogs
  // Open: the arrow keys move through tiles, chips and rows.
  await p.keyboard.press('Control+p'); // in the code Ctrl+K starts VS Code's two-key shortcuts
  await p.waitForTimeout(300);
  await p.focus('#open-q');
  const kinds = [];
  for (let k = 0; k < 5; k++) {
    await p.keyboard.press('ArrowDown');
    kinds.push(await p.$eval('#open-body .entry.active', (e) => e.closest('.entries').className));
  }
  check(kinds[0].includes('chips') && kinds.some((c) => c.includes('rows')), `${theme}: ↓ moves from the Start tiles past the templates to the Hub rows`);
  await p.keyboard.press('Escape');
  await p.waitForTimeout(200);
  for (const [open, name] of [['ctrl-k', 'Open'], ['#settings-open', 'Settings'], ['#news-open-2', "What's new"], ['#help-open', 'Keyboard shortcuts']]) {
    if (open === 'ctrl-k') await p.keyboard.press('Control+k');
    else await p.$eval(open, (b) => b.click());
    await p.waitForTimeout(400);
    await axe(p, `${theme}, ${name} dialog`);
    await p.keyboard.press('Escape');
    await p.waitForTimeout(200);
  }
  // The header menus (+ and the gear) and the open handlers' tabs.
  check((await p.$$('#htabs [role=tab]')).length >= 1, `${theme}: the open handlers show as tabs`);
  for (const m of ['#tab-add', '#app-menu-open']) {
    await p.click(m);
    await p.waitForTimeout(200);
    check((await p.$$('.app-menu [role^=menuitem]')).length >= 3, `${theme}: ${m} opens its menu`);
    await axe(p, `${theme}, ${m} menu`);
    await p.keyboard.press('Escape');
    await p.waitForTimeout(150);
  }
  // An example package: the handler plus its files.
  await p.keyboard.press('Control+k');
  await p.fill('#open-dialog input', 'with its files');
  await p.waitForTimeout(300);
  await p.keyboard.press('Enter');
  await p.waitForTimeout(1000);
  const chip = await p.$('#files-open');
  check(!!chip && /\+ \d+ files/.test(await chip.innerText()), `${theme}: the example package opens with its files`);
  if (chip) {
    await chip.click();
    await p.waitForTimeout(300);
    check((await p.$$('#files-panel .fp-open')).length > 1, `${theme}: the Files panel lists them`);
    await axe(p, `${theme}, Files panel`);
    await p.keyboard.press('Escape');
  }
  // A Hub handler whose package has other files: they open in Files, big ones as placeholders (Hub badge, a card).
  {
    const pick = await p.evaluate(() => {
      const hs = HUB_EXAMPLES.handlers;
      const h = hs.find((x) => x.id === 'xjBSwFNj3ndRntsZh' && x.files) ?? hs.find((x) => x.files);
      return h ? { id: h.id, title: h.title, files: h.files } : null;
    });
    // Built from the data branch (Pages): package files appear only once the daily Hub sync has mirrored them
    // (tools/hub-mirror.mjs, a few days after it first runs), so none yet is fine there. The snapshot build has them.
    const fromMirror = await p.evaluate(() => !!HUB_EXAMPLES.all);
    if (!pick && fromMirror) console.log(`skip ${theme}: no Hub package files mirrored yet (the daily Hub sync adds them)`);
    else check(!!pick, `${theme}: a Hub handler in this build has package files`);
    if (pick) {
      await p.goto(BASE + '#hub-' + pick.id);
      await p.waitForTimeout(1500);
      if (await p.$eval('#files-panel', (e) => e.hidden)) await p.click('#files-toggle');
      await p.waitForTimeout(300);
      const rows = (await p.$$('#files-panel .fp-open')).length;
      check(rows === pick.files + 1, `${theme}: ${pick.title} opens with its ${pick.files} package file(s) in Files (${rows - 1} listed)`);
      const hubRow = await p.$('#files-panel .fp-open:has(.fp-hub)');
      if (hubRow) {
        await hubRow.click();
        await p.waitForTimeout(300);
        check(/not downloaded here/.test(await p.$eval('#file-card', (e) => e.textContent)), `${theme}: a big file of the Hub package shows where to get it`);
      }
      await axe(p, `${theme}, Files panel with a Hub package`);
    }
  }
  // A first visit (beta): the tester questions come first, can't be skipped, and lead to the recommendations.
  {
    const fresh = await browser.newContext({ colorScheme: theme, viewport: { width: 1280, height: 800 } });
    await fresh.route((u) => !u.href.startsWith(BASE), (r) => r.abort());
    const q = await fresh.newPage();
    await q.goto(BASE);
    await q.waitForTimeout(1200);
    check(await q.isVisible('#test-dialog .tg-card'), `${theme}: a first visit opens the tester questions`);
    await axe(q, `${theme}, tester questions`);
    await q.keyboard.press('Escape');
    await q.waitForTimeout(150);
    check(await q.isVisible('#test-dialog') && await q.isDisabled('#tg-show'), `${theme}: the questions can't be skipped`);
    await q.click('label.tg-card:has(input[data-q=coding][value=new])');
    await q.click('label.tg-card:has(input[data-q=nucleus][value=new])');
    await q.click('#tg-show');
    await q.waitForTimeout(300);
    check((await q.$$('#test-body .tg-list > .tg-item')).length >= 3 && await q.isVisible('#tg-change'), `${theme}: the answers show the recommendations, with Change`);
    await axe(q, `${theme}, tester recommendations`);
    await fresh.close();
  }
  // One handler per tab: another handler opens a new tab; one that's already open switches to its tab.
  await p.goto(BASE + '#example-mistakes');
  await p.waitForTimeout(800);
  const nTabs = async () => (await p.$$('#htabs [role=tab]')).length;
  const tabsBefore = await nTabs();
  const otherHub = await p.evaluate(() => window.HUB_EXAMPLES?.handlers?.[0]?.id ?? null);
  if (otherHub) {
    await p.evaluate((id) => { location.hash = 'hub-' + id; }, otherHub);
    await p.waitForTimeout(1200);
    const tabsAfter = await nTabs();
    await p.evaluate(() => { location.hash = 'example-mistakes'; });
    await p.waitForTimeout(600);
    check(tabsAfter === tabsBefore + 1 && (await nTabs()) === tabsAfter && /mistakes/i.test(await p.innerText('#htabs [aria-selected=true]')), `${theme}: another handler opens a new tab, and an open one switches to its tab (${tabsBefore} -> ${tabsAfter})`);
  }
  // The side rail's Save: right-click offers the formats, like the arrow beside Save in the slim bar.
  await p.evaluate(() => localStorage.setItem('nucleus-workbench-layout', 'rail'));
  await p.reload();
  await p.waitForSelector('.rail [data-rail=save]', { state: 'visible', timeout: 10000 });
  await p.click('.rail [data-rail=save]', { button: 'right' });
  await p.waitForTimeout(200);
  check(/For Nucleus Co-op \(\.zip\)/.test(await p.innerText('body')), `${theme}: right-click on the rail's Save offers Save as`);
  await p.keyboard.press('Escape');
  await p.evaluate(() => localStorage.setItem('nucleus-workbench-layout', 'bar'));
  await p.reload();
  await p.waitForTimeout(800);
  // The value picker: a ▾ only when the cursor is on a pickable value; picking one changes the code.
  await p.evaluate(() => { const cm = document.querySelector('.CodeMirror').CodeMirror; cm.setValue('Game.GameName = "Demo";\nGame.SymlinkGame = false;\n'); cm.focus(); cm.setCursor({ line: 0, ch: 2 }); });
  await p.waitForTimeout(200);
  check((await p.locator('.vp-chip').count()) === 0, `${theme}: no value picker away from a value`);
  await p.evaluate(() => document.querySelector('.CodeMirror').CodeMirror.setCursor({ line: 1, ch: 21 }));
  await p.waitForTimeout(200);
  await p.locator('.vp-chip').click();
  await p.locator('.vp-menu button', { hasText: 'true' }).click();
  check(await p.evaluate(() => document.querySelector('.CodeMirror').CodeMirror.getLine(1)) === 'Game.SymlinkGame = true;', `${theme}: the value picker changes the value`);
  // Form: one line per option, more on request, fixes work, and back to Code.
  await p.goto(BASE + '#example-mistakes');
  await p.waitForTimeout(800);
  // Already open with changes (from the checks above): open a fresh copy.
  const fresh = p.locator('button', { hasText: 'Open a fresh copy' });
  if (await fresh.count()) { await fresh.first().click(); await p.waitForTimeout(800); }
  await p.click('[data-view-mode=form]');
  await p.waitForSelector('#formview .fv-row', { timeout: 10000 }).catch(() => {});
  await p.waitForTimeout(300);
  const fvRows = await p.$$('#formview .fv-row');
  const openRows = await p.$$('#formview .fv-more:not([hidden])');
  check(fvRows.length >= 6 && openRows.length === 0, `${theme}: Form shows one line per option, details closed (${fvRows.length} rows)`);
  await p.click('#formview .fv-row.fv-has-prob .fv-toggle');
  await p.waitForTimeout(150);
  check((await p.$$('#formview .fv-more:not([hidden]) .fv-acts button')).length >= 2, `${theme}: opening an option shows its docs and actions`);
  await axe(p, `${theme}, Form`);
  const fvBefore = await p.$$eval('#formview .fv-row.fv-has-prob', (r) => r.length);
  await p.click('#formview .fv-row.fv-has-prob:not(.fv-open) .fv-sum .fv-fix.primary');
  await p.waitForTimeout(800);
  const fvAfter = await p.$$eval('#formview .fv-row.fv-has-prob', (r) => r.length);
  check(fvAfter < fvBefore, `${theme}: a fix in Form fixes it (${fvBefore} -> ${fvAfter} options with problems)`);
  await p.click('[data-view-mode=code]');
  await p.waitForTimeout(200);
  // The debugger: a breakpoint, Step through, step, step back, the banner and the current line.
  await p.goto(BASE + '#example-mistakes');
  await p.waitForTimeout(1200);
  await p.click('#fix-all');
  await p.waitForTimeout(500);
  if (await p.$('#ai-accept')) await p.click('#ai-accept');
  await p.waitForTimeout(800);
  const bpLine = await p.evaluate(() => {
    const cm = document.querySelector('.CodeMirror').CodeMirror;
    for (let i = 0; i < cm.lineCount(); i++) if (cm.getLine(i).includes('Context.StartArguments')) return i;
    return -1;
  });
  const gutterAt = await p.evaluate((l) => {
    const cm = document.querySelector('.CodeMirror').CodeMirror;
    const g = document.querySelector('.CodeMirror-gutter.nc-bp').getBoundingClientRect();
    const r = cm.charCoords({ line: l, ch: 0 }, 'window');
    return { x: g.left + g.width / 2, y: (r.top + r.bottom) / 2 };
  }, bpLine);
  await p.mouse.click(gutterAt.x, gutterAt.y);
  await p.waitForTimeout(150);
  check(bpLine >= 0 && (await p.$$('.dbg-gm.bp')).length === 1, `${theme}: a click beside a line number sets a breakpoint`);
  await p.click('[role=tab][data-tab=simulate]');
  await p.waitForTimeout(300);
  await p.click('#sim-debug');
  await p.waitForSelector('#dbg-body:not([hidden])', { timeout: 10000 }).catch(() => {});
  const atBp = await p.innerText('#dbg-banner');
  check(atBp.includes(`Breakpoint. Paused before line ${bpLine + 1} for player 1 of`) && atBp.includes('about to set Context.StartArguments'), `${theme}: Step through stops at the breakpoint and says where in plain words (${atBp.trim().slice(0, 90)})`);
  check(await p.evaluate((l) => !!document.querySelector('.CodeMirror').CodeMirror.lineInfo(l).bgClass?.includes('dbg-line'), bpLine), `${theme}: the current line is highlighted in the code`);
  await p.click('#dbg-over');
  await p.waitForTimeout(150);
  check((await p.innerText('#dbg-banner')).includes(`line ${bpLine + 2}`) && /Context/.test(await p.innerText('#dbg-vars')), `${theme}: Step over moves to the next line and shows the variables`);
  await p.click('#dbg-back');
  await p.waitForTimeout(150);
  check((await p.innerText('#dbg-banner')).includes(`line ${bpLine + 1}`), `${theme}: Step back goes back a step`);
  check(Number(await p.inputValue('#dbg-range')) > 0 && (await p.$$('#dbg-done li')).length > 0, `${theme}: the timeline and Done so far follow the run`);
  await axe(p, `${theme}, debugger`);
  await cmType(p, 'Game.MaxPlayers', ' ');
  await p.waitForTimeout(150);
  check(/Code changed/.test(await p.innerText('#dbg-banner')), `${theme}: editing the code ends the debug session`);
  await p.click('#dbg-stop');
  await p.waitForTimeout(200);
  check((await p.isHidden('#dbg')) && (await p.innerText('#sim-out')).length > 50, `${theme}: Stop closes the debugger and shows Try it's results`);
  // Code colours everywhere, small code editors in Blocks and Form (#12), fields that grow and expand (#15).
  {
    const DESC = 'Java version only. If you use multiple keyboards and mice, set the input in the options first, then start the game and wait for every window to open.';
    await p.evaluate((c) => document.querySelector('.CodeMirror').CodeMirror.setValue(c), `Game.GUID = "Demo";\nGame.GameName = "Demo";\nGame.ExecutableName = "demo.exe";\nGame.Description = "${DESC}";\nGame.HandlerInterval = 1000 * 2;\nGame.Play = function () {\n    Context.StartArguments = "-windowed";\n    for (var i = 0; i < 2; i++) { Context.StartArguments += " x"; }\n};\n`);
    await p.waitForTimeout(1000);
    // Hover docs and Reference: code in the editor's colours.
    const at = await p.evaluate(() => { const cm = document.querySelector('.CodeMirror').CodeMirror; const r = cm.charCoords({ line: 5, ch: 6 }, 'window'); return { x: r.left + 2, y: (r.top + r.bottom) / 2 }; });
    await p.mouse.move(at.x, at.y);
    await p.waitForTimeout(900);
    check(await p.isVisible('#tip') && (await p.$$('#tip code.hl .cm-property')).length > 0, `${theme}: the hover card shows code in the editor's colours`);
    await p.mouse.move(5, 5);
    await p.click('[role=tab][data-tab=api]');
    await p.fill('#api-q', 'Game.PlayersPerInstance');
    await p.waitForTimeout(400);
    check((await p.$$('#api-results pre.doc-code.hl .cm-number')).length > 0, `${theme}: Docs shows its example coloured like the code`);
    // Blocks: a code step is a small CodeMirror with the colours, and typing in it edits the handler.
    await p.click('[data-view-mode=blocks]');
    await p.waitForTimeout(800);
    check((await p.$$('#blocksview .bv-codeblock .CodeMirror .cm-keyword')).length > 0, `${theme}: a Blocks code step is a code editor with the code colours`);
    await p.click('#blocksview .bv-codeblock .CodeMirror');
    await p.keyboard.press('End');
    await p.keyboard.type(' // b');
    await p.waitForTimeout(400);
    check((await p.evaluate(() => document.querySelector('.CodeMirror').CodeMirror.getValue())).includes('" x"; } // b'), `${theme}: typing in a Blocks code step edits the handler`);
    await p.mouse.move(5, 5);
    await p.keyboard.press('Escape');
    await p.waitForTimeout(400);
    await axe(p, `${theme}, Blocks with a code editor`);
    // Form: a long Game.Description is readable in full, and expands (Alt+Enter) with its docs; Esc goes back.
    await p.click('[data-view-mode=form]');
    await p.waitForTimeout(600);
    const desc = '#formview .fv-row[data-key^="Game.Description"] textarea';
    const full = await p.$eval(desc, (t) => t.value.length > 100 && t.scrollHeight <= t.clientHeight + 2 && t.getBoundingClientRect().height > 40);
    check(full && (await p.isVisible('#formview .fv-row[data-key^="Game.Description"] .xf-btn')), `${theme}: a long Game.Description wraps in Form and shows in full, with an expand button`);
    check((await p.$$('#formview .fv-row[data-key^="Game.HandlerInterval"] .fv-src.hl .cm-number')).length > 0, `${theme}: a code value in Form is coloured like the code`);
    await p.focus(desc);
    await p.keyboard.press('Alt+Enter');
    await p.waitForTimeout(200);
    check(await p.isVisible('.xf-panel .xf-big') && /\S/.test(await p.innerText('.xf-panel .xf-doc').catch(() => '')), `${theme}: Alt+Enter opens the larger editor with the option's docs`);
    await axe(p, `${theme}, Form with a value expanded`);
    await p.keyboard.press('End');
    await p.keyboard.type(' More.');
    await p.keyboard.press('Escape');
    await p.waitForTimeout(300);
    check(!(await p.$('.xf-panel')) && (await p.evaluate(() => document.activeElement?.closest('[data-key^="Game.Description"]') !== null)) && (await p.evaluate(() => document.querySelector('.CodeMirror').CodeMirror.getValue())).includes('to open. More."'), `${theme}: typing there edits the value; Esc closes it and goes back to the field`);
    await p.click('[data-view-mode=code]');
    await p.waitForTimeout(200);
  }
  check(!errors.length, `${theme}: no page errors${errors.length ? `: ${errors.join('; ')}` : ''}`);
  await ctx.close();

  // The start page: screenshots in the theme, links, accessibility.
  const s = await page(theme);
  await s.p.goto(BASE + 'start/');
  await s.p.evaluate(() => document.querySelectorAll('img').forEach((i) => (i.loading = 'eager')));
  await s.p.waitForTimeout(1500);
  const shots = await s.p.$$eval('figure img', (l) => l.map((i) => [i.currentSrc.split('/').pop(), i.naturalWidth]));
  check(shots.length > 0 && shots.every(([f, w]) => f.endsWith(`-${theme}.png`) && w > 0), `${theme}: start page screenshots load in the ${theme} theme`);
  check((await s.p.getAttribute('.ctas a.btn.primary', 'href')) .replace(/\?ref=[\w.-]+$/, '') === '../', `${theme}: the start page links to its own workbench`);
  await axe(s.p, `${theme}, start page`);
  check(!s.errors.length, `${theme}: start page has no page errors`);
  await s.ctx.close();
}

// A phone
const m = await page('dark', { ...devices['Pixel 7'] });
await m.p.goto(BASE + '#example-mistakes');
await m.p.waitForSelector('.CodeMirror');
await m.p.waitForTimeout(1200);
check((await count(m.p)) > 0, 'phone: Check works');
await axe(m.p, 'phone');
await m.p.tap('.switch button[data-view=code]');
await m.p.waitForTimeout(300);
check(await m.p.isVisible('.CodeMirror'), 'phone: the Handler view shows the code');
await m.p.evaluate(() => document.querySelector('.CodeMirror').CodeMirror.setValue('Game.GUID = "Demo";\nGame.GameName = "Demo";\nGame.ExecutableName = "demo.exe";\nGame.Description = "Java version only. If you use multiple keyboards and mice, set the input in the options first, then start the game.";\n'));
await m.p.waitForTimeout(800);
await m.p.$eval('[data-view-mode=form]', (b) => b.click());
await m.p.waitForTimeout(600);
const mDesc = '#formview .fv-row[data-key^="Game.Description"] textarea';
check(await m.p.$eval(mDesc, (t) => t.scrollHeight <= t.clientHeight + 2 && t.getBoundingClientRect().right <= innerWidth), 'phone: a long Game.Description wraps and shows in full');
await m.p.tap('#formview .fv-row[data-key^="Game.Description"] .xf-btn');
await m.p.waitForTimeout(300);
check(await m.p.isVisible('dialog.xf-dialog .xf-big'), 'phone: the expand button opens the value in a dialog');
await axe(m.p, 'phone, expanded value');
await m.p.keyboard.press('Escape');
await m.p.waitForTimeout(200);
check(!(await m.p.$('dialog.xf-dialog')), 'phone: Esc closes it');
await m.ctx.close();

// Help test the beta: pin a task, and it floats over the workbench while you test (testpins.ts).
{
  const s = await page('light', { viewport: { width: 1440, height: 900 } });
  await s.ctx.addInitScript(() => {
    try {
      localStorage.setItem('nucleus-workbench-tester-profile', JSON.stringify({ coding: 'dev', nucleus: 'expert' }));
    } catch {}
  });
  await s.p.goto(BASE);
  await s.p.waitForTimeout(600);
  await s.p.evaluate(() => document.querySelectorAll('dialog[open]').forEach((d) => d.close()));
  check(await s.p.isHidden('#test-pins'), 'pinned tasks: nothing on screen until something is pinned');
  await s.p.click('#test-open');
  await s.p.waitForTimeout(300);
  const first = await s.p.$eval('#test-body .tg-pin', (b) => b.getAttribute('data-pin'));
  await s.p.click('#test-body .tg-pin');
  check((await s.p.getAttribute('#test-body .tg-pin', 'aria-pressed')) === 'true', 'pinned tasks: Pin says it is pinned');
  check(await s.p.isVisible(`#tg-pinned input[data-id="${first}"]`), 'pinned tasks: also listed on top of the guide');
  await s.p.click(`#tg-pinned [data-goto="${first}"]`);
  check(await s.p.evaluate((id) => { const a = document.activeElement; return a?.dataset.id === id && !a.closest('#tg-pinned'); }, first), 'pinned tasks: its name there goes to its card in the list');
  await s.p.click('#test-close');
  await s.p.waitForTimeout(200);
  check(await s.p.isVisible(`#test-pins [data-toggle="${first}"]`), 'pinned tasks: the task floats over the workbench');
  check(await s.p.isVisible('#test-pins .tf-body'), 'pinned tasks: the first one shows what to try');
  await s.p.click(`#test-pins [data-toggle="${first}"]`);
  check(await s.p.isHidden('#test-pins .tf-body'), 'pinned tasks: closing the only open task keeps it closed');
  await s.p.click(`#test-pins [data-toggle="${first}"]`);
  const inCorner = () => s.p.evaluate(() => {
    const b = document.querySelector('#test-pins').getBoundingClientRect(), e = document.querySelector('#editor').getBoundingClientRect();
    return b.left >= e.left && b.right <= e.right && b.bottom <= e.bottom && e.right - b.right < 40 && e.bottom - b.bottom < 40;
  });
  check(await inCorner(), 'pinned tasks: starts in the code editor\'s bottom-right corner');
  await axe(s.p, 'light, pinned tasks');
  await s.p.check(`#test-pins input[data-done="${first}"]`);
  await s.p.click('#test-open');
  await s.p.waitForTimeout(200);
  check(await s.p.isChecked(`#test-body input[data-id="${first}"]`), 'pinned tasks: a tick there shows in the guide');
  await s.p.click('#test-close');
  const before = await s.p.$eval('#test-pins', (e) => e.getBoundingClientRect().left);
  const h = await s.p.$eval('#test-pins .tf-title', (e) => { const r = e.getBoundingClientRect(); return { x: r.left + 20, y: r.top + r.height / 2 }; });
  await s.p.mouse.move(h.x, h.y);
  await s.p.mouse.down();
  await s.p.mouse.move(h.x - 300, h.y - 200, { steps: 6 });
  await s.p.mouse.up();
  const dragged = await s.p.$eval('#test-pins', (e) => e.getBoundingClientRect().left);
  check(dragged < before - 250, 'pinned tasks: drag the header to move it');
  await s.p.focus('#test-pins .tf-grip');
  await s.p.keyboard.press('ArrowRight');
  check((await s.p.$eval('#test-pins', (e) => e.getBoundingClientRect().left)) > dragged + 10, 'pinned tasks: the arrow keys move it too');
  await s.p.dblclick('#test-pins .tf-title');
  check(await inCorner(), 'pinned tasks: double-click the header puts it back in the corner');
  await s.p.click('#test-pins .tf-fold');
  check(await s.p.isHidden('#test-pins .tf-list'), 'pinned tasks: collapse to the header');
  await s.p.reload();
  await s.p.waitForTimeout(600);
  await s.p.evaluate(() => document.querySelectorAll('dialog[open]').forEach((d) => d.close()));
  check((await s.p.isVisible('#test-pins')) && (await s.p.isHidden('#test-pins .tf-list')), 'pinned tasks: still there, and still collapsed, after a reload');
  await s.p.click('#test-pins .tf-fold');
  await s.p.click(`#test-pins [data-unpin="${first}"]`);
  check(await s.p.isHidden('#test-pins'), 'pinned tasks: unpinning the last one hides the window');
  check(!s.errors.length, `pinned tasks: no page errors ${s.errors.join(' ')}`);
  await s.ctx.close();
}
{
  // A laptop with a touch screen has a real keyboard: a text field getting focus inside a frame (the claude.ai
  // preview) must not shrink the page for an on-screen keyboard that isn't there.
  const s = await page('dark', { viewport: { width: 1600, height: 730 } }); // a mouse (fine pointer) ...
  await s.ctx.addInitScript(() => Object.defineProperty(Navigator.prototype, 'maxTouchPoints', { get: () => 10 })); // ... and a touch screen
  await s.p.setContent(`<style>body{margin:0}</style><iframe src="${BASE}" style="border:0;width:100vw;height:100vh"></iframe>`);
  await s.p.waitForTimeout(1200);
  const f = s.p.frames()[1];
  await f.evaluate(() => document.querySelectorAll('dialog[open]').forEach((d) => d.close()));
  await f.click('#tab-add');
  await f.getByText('Examples and Hub handlers').click();
  await f.focus('#open-dialog input');
  await f.waitForTimeout(1200);
  check(await f.evaluate(() => !document.documentElement.classList.contains('kb-up') && document.querySelector('.app').getBoundingClientRect().height >= innerHeight - 2), 'touch-screen laptop, in a frame: the page keeps its height when a text field gets focus');
  await s.ctx.close();
}
{
  const s = await page('dark', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await s.ctx.addInitScript(() => {
    try {
      localStorage.setItem('nucleus-workbench-tester-profile', JSON.stringify({ coding: 'new', nucleus: 'new' }));
      localStorage.setItem('nucleus-workbench-test-pins', JSON.stringify(['messages']));
    } catch {}
  });
  await s.p.goto(BASE);
  await s.p.waitForTimeout(600);
  const r = await s.p.$eval('#test-pins', (e) => { const b = e.getBoundingClientRect(); return { l: b.left, r: b.right, b: b.bottom }; });
  check(r.l >= 0 && r.r <= 390 && r.b <= 844, 'phone: pinned tasks dock at the bottom, inside the screen');
  await s.ctx.close();
}

// Start-up with each general tip first (the first one is random): none may stop the page (a tip's highlight once
// asked for a control declared later in app.ts, and the whole workbench failed to start).
{
  let crashed = 0;
  for (let i = 0; i < 40; i++) {
    const s = await page('light');
    await s.ctx.addInitScript((v) => {
      const r = Math.random;
      let first = true;
      Math.random = () => (first ? ((first = false), v) : r());
    }, (i + 0.5) / 40);
    await s.p.goto(BASE + '#docs');
    await s.p.waitForTimeout(400);
    if (s.errors.length) crashed++;
    await s.ctx.close();
  }
  check(crashed === 0, `start-up with every possible first tip: no page errors (${crashed} of 40 failed)`);
}
// The main button stays readable in every look (light and dark): the looks restyle .btn.
for (const site of ['v3', 'mac', 'alpha8'])
  for (const theme of ['light', 'dark']) {
    const s = await page(theme);
    await s.ctx.addInitScript((v) => {
      try {
        localStorage.setItem('nucleus-workbench-dev-site', v);
      } catch {}
    }, site);
    await s.p.goto(BASE);
    await s.p.waitForTimeout(500);
    await s.p.evaluate(() => document.querySelectorAll('dialog[open]').forEach((d) => d.close()));
    await s.p.addScriptTag({ content: AXE });
    const bad = await s.p.evaluate(async () => (await axe.run('#code-menu-open, #save-more', { runOnly: ['color-contrast'] })).violations.length);
    check(bad === 0, `${site} look, ${theme}: Save is readable (contrast)`);
    await s.ctx.close();
  }

await browser.close();
server.close();
console.log(failures ? `\n${failures} check(s) failed.` : '\nAll checks passed.');
process.exit(failures ? 1 : 0);
