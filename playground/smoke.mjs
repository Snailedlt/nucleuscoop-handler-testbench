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
  // Reference with nothing typed shows what's in it.
  await p.click('[role=tab][data-tab=api]');
  await p.waitForTimeout(200);
  check((await p.$$('#api-results .api-group')).length >= 6 && (await p.$$('#api-results .api-chip')).length >= 10, `${theme}: Reference lists what's in it when nothing is typed`);
  await axe(p, `${theme}, Reference`);
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
  // Dialogs
  // Open: the arrow keys move through tiles, chips and rows.
  await p.keyboard.press('Control+k');
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
  check(!errors.length, `${theme}: no page errors${errors.length ? `: ${errors.join('; ')}` : ''}`);
  await ctx.close();

  // The start page: screenshots in the theme, links, accessibility.
  const s = await page(theme);
  await s.p.goto(BASE + 'start/');
  await s.p.evaluate(() => document.querySelectorAll('img').forEach((i) => (i.loading = 'eager')));
  await s.p.waitForTimeout(1500);
  const shots = await s.p.$$eval('figure img', (l) => l.map((i) => [i.currentSrc.split('/').pop(), i.naturalWidth]));
  check(shots.length > 0 && shots.every(([f, w]) => f.endsWith(`-${theme}.png`) && w > 0), `${theme}: start page screenshots load in the ${theme} theme`);
  check((await s.p.getAttribute('.ctas a.btn.primary', 'href')) === '../', `${theme}: the start page links to its own workbench`);
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
await m.ctx.close();

await browser.close();
server.close();
console.log(failures ? `\n${failures} check(s) failed.` : '\nAll checks passed.');
process.exit(failures ? 1 : 0);
