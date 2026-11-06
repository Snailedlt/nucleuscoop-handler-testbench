// Takes the workbench screenshots used by the README, /start and What's new, in light and dark.
//   (cd playground/dist/pages && python3 -m http.server 8765) &
//   node tools/screenshots.cjs [http://127.0.0.1:8765/]
// Needs Python with Pillow for the phone collage. Writes docs/images/<name>-light.png and <name>-dark.png (changelog images under docs/images/changelog/).
const path = require('path');
const { chromium, devices } = require('playwright');
const BASE = process.argv.slice(2).find((a) => !a.startsWith('--')) || 'http://127.0.0.1:8765/';
const IMG = path.join(__dirname, '..', 'docs', 'images');
const CH = path.join(IMG, 'changelog');
const SKYRIM = 'PPct546raDXfjRLGw';
const STARDEW = 'LT3wMdrR7gPrKgfzb';
const DEMO = `Game.GUID = "Demo Game";
Game.GameName = "Demo Game";
Game.ExecutableName = "demo.exe";
Game.MaxPlayers = 4;
Game.SymlinkGame = true;
Game.UseGoldberg = true;

Game.Play = function () {
  var ini = System.IO.Path.Combine(Context.UserProfileConfigPath, "settings.ini");
  if (System.IO.File.Exists(ini)) {
    Context.ModifySaveFile(ini, ini, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("Video", "Width", Context.Width),
      new Nucleus.IniSaveInfo("Video", "Height", Context.Height)
    ]);
  }
  Context.StartArguments = "-windowed -nosplash";
};
`;

async function open(b, theme, opts, hash) {
  const ctx = await b.newContext({ colorScheme: theme, ...opts });
  await ctx.addInitScript((t) => {
    try {
      localStorage.setItem('nucleus-workbench-welcomed', '1');
      localStorage.setItem('nucleus-workbench-tips', '0');
      localStorage.setItem('nucleus-workbench-news', '0');
      localStorage.setItem('nucleus-workbench-dev-mode', t);
    } catch {}
  }, theme);
  const p = await ctx.newPage();
  await p.goto(BASE + (hash ? '#' + hash : ''));
  await p.waitForSelector('.CodeMirror');
  await p.waitForTimeout(1500);
  await p.evaluate(() => {
    for (const s of ['#tipbar', '#updated']) { const e = document.querySelector(s); if (e) e.hidden = true; }
    document.querySelectorAll('.toast').forEach((e) => e.remove());
  });
  await p.addStyleTag({ content: '#toasts { display: none !important; }' });
  return { ctx, p };
}
const cmTop = (p, line) => p.evaluate((l) => { const cm = document.querySelector('.CodeMirror').CodeMirror; cm.scrollTo(null, cm.heightAtLine(l, 'local')); }, line);
const setCode = (p, code, name) => p.evaluate(([c, n]) => { document.querySelector('.CodeMirror').CodeMirror.setValue(c); if (n) { document.querySelector('#doc-name').textContent = n; const e = document.querySelector('#doc-edited'); if (e) e.hidden = true; } }, [code, name]);
const box = (p, sel) => p.$eval(sel, (e) => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });

(async () => {
  const b = await chromium.launch();
  const desk = { viewport: { width: 1280, height: 760 }, deviceScaleFactor: 2 };
  // --release-shots: only the release-note screenshots below (the README and start page ones stay).
  if (!process.argv.includes('--release-shots')) for (const t of ['light', 'dark']) {
    // README + /start: Check on a verified Hub handler.
    let { ctx, p } = await open(b, t, desk, 'hub-' + SKYRIM);
    await cmTop(p, 179);
    await p.waitForTimeout(400);
    await p.screenshot({ path: path.join(IMG, `check-${t}.png`) });
    await ctx.close();

    // Fix all on the example with common mistakes.
    ({ ctx, p } = await open(b, t, desk, 'example-mistakes'));
    await p.click('#fix-all');
    await p.waitForTimeout(800);
    await p.screenshot({ path: path.join(IMG, `fix-all-${t}.png`) });
    await ctx.close();

    // Try it: StardewValley with 4 players.
    ({ ctx, p } = await open(b, t, desk, 'hub-' + STARDEW));
    await p.click('[role=tab][data-tab=simulate]');
    await p.selectOption('#sim-players', '4');
    await p.waitForTimeout(1200);
    await p.screenshot({ path: path.join(IMG, `try-it-${t}.png`) });
    await ctx.close();

    // Lines as a tree, on a wide screen.
    ({ ctx, p } = await open(b, t, { viewport: { width: 1600, height: 800 }, deviceScaleFactor: 1 }));
    await setCode(p, DEMO, 'Demo Game.js');
    if (!(await p.isVisible('#lines'))) await p.click('#lines-toggle');
    await p.evaluate(() => document.querySelector('#lines').classList.add('wide'));
    await p.selectOption('#lines-group', 'tree');
    for (const n of ['System', 'IO', 'File']) await p.click(`#lines-list .ln-col:last-child .ln-node:has(.nm:text-is("${n}")), #lines-list > .ln-row .ln-node:has(.nm:text-is("${n}"))`);
    await p.evaluate(() => { const cm = document.querySelector('.CodeMirror').CodeMirror; cm.focus(); cm.setCursor(9, 22); });
    await p.hover('#lines-list .ln:has(.nm:text-is("Exists()"))');
    await p.waitForTimeout(400);
    await p.screenshot({ path: path.join(IMG, `lines-tree-${t}.png`) });
    await ctx.close();

    // Changelog: Lines filtered to "kill".
    ({ ctx, p } = await open(b, t, { viewport: { width: 1400, height: 800 }, deviceScaleFactor: 1 }, 'example-mistakes'));
    if (!(await p.isVisible('#lines'))) await p.click('#lines-toggle');
    await p.selectOption('#lines-group', 'object').catch(() => {});
    await p.fill('#lines-q', 'kill');
    await p.waitForTimeout(300);
    await p.hover('#lines-list .ln:has(.nm:text-is("Game.KillMutex"))').catch(() => p.hover('#lines-list .ln:has(.nm:text-is("KillMutex"))'));
    await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(CH, `2026-11-05-lines-${t}.png`), clip: await box(p, '.pane:not(.side)') });
    await ctx.close();

    // Changelog: What's new.
    ({ ctx, p } = await open(b, t, { viewport: { width: 900, height: 760 }, deviceScaleFactor: 1 }));
    await p.click('#news-open-2');
    await p.waitForTimeout(500);
    await p.screenshot({ path: path.join(CH, `whats-new-${t}.png`), clip: await box(p, '#news-dialog') });
    await ctx.close();

    // Phone: Check results (README), and four phone views (changelog).
    const phone = { ...devices['Pixel 7'] };
    ({ ctx, p } = await open(b, t, phone, 'example-mistakes'));
    await p.tap('.switch button[data-view=results]').catch(() => {});
    await p.waitForTimeout(400);
    await p.screenshot({ path: path.join(IMG, `phone-${t}.png`) });
    const parts = [];
    parts.push(await p.screenshot());
    await p.tap('.switch button[data-view=code]');
    await p.waitForTimeout(300);
    await p.evaluate(() => { const cm = document.querySelector('.CodeMirror').CodeMirror; cm.focus(); cm.setCursor(10, 0); });
    await p.waitForTimeout(500);
    parts.push(await p.screenshot());
    await p.tap('#lines-toggle');
    await p.waitForTimeout(400);
    parts.push(await p.screenshot());
    await p.evaluate(() => document.activeElement && document.activeElement.blur());
    await p.tap('#lines-close');
    await p.waitForTimeout(300);
    await p.tap('#more-open');
    await p.waitForTimeout(400);
    parts.push(await p.screenshot());
    require('fs').writeFileSync(path.join(CH, `.phones-${t}.json`), JSON.stringify(parts.map((x) => x.toString('base64'))));
    await ctx.close();
  }
  // Release-note screenshots (CHANGELOG.md), light and dark, ≈900 px wide.
  const CHW = { viewport: { width: 1280, height: 760 }, deviceScaleFactor: 1 };
  const shot = async (p, file, sel, pad = 0) => {
    const r = sel ? await box(p, sel) : null;
    await p.screenshot({ path: path.join(CH, file), ...(r ? { clip: { x: Math.max(0, r.x - pad), y: Math.max(0, r.y - pad), width: r.width + pad * 2, height: r.height + pad * 2 } } : {}) });
  };
  for (const t of ['light', 'dark']) {
    // 18:33: Test all combinations.
    let { ctx, p } = await open(b, t, CHW, 'hub-' + STARDEW);
    await p.click('[role=tab][data-tab=simulate]');
    await p.click('#sim-all');
    await p.waitForTimeout(3000);
    await shot(p, `2026-11-05-test-all-${t}.png`, '.pane.side');
    await ctx.close();
    // 18:33: tap a warning next to the code.
    ({ ctx, p } = await open(b, t, { viewport: { width: 900, height: 600 }, deviceScaleFactor: 1 }, 'example-mistakes'));
    // What a click on the marker of line 20 does (CodeMirror's gutterClick).
    await p.evaluate(() => { const cm = document.querySelector('.CodeMirror').CodeMirror; cm.constructor.signal(cm, 'gutterClick', cm, 19, 'CodeMirror-lint-markers', new MouseEvent('mousedown')); });
    await p.waitForTimeout(500);
    await shot(p, `2026-11-05-line-problems-${t}.png`, '.pane:not(.side)');
    await ctx.close();
    // 23:00: the command palette.
    ({ ctx, p } = await open(b, t, CHW, 'example-mistakes'));
    await p.click('.CodeMirror');
    await p.keyboard.press('Control+Shift+P');
    await p.mouse.move(2, 2);
    await p.waitForTimeout(400);
    await shot(p, `2026-11-05-palette-${t}.png`, '#open-dialog');
    await ctx.close();
    // 23:00: a package's files.
    ({ ctx, p } = await open(b, t, CHW, 'package-nvmp'));
    await p.click('#files-open');
    await p.click('#files-body details:nth-of-type(1) summary');
    await p.waitForTimeout(300);
    await shot(p, `2026-11-05-package-files-${t}.png`, '#files-dialog');
    await ctx.close();
    // Unreleased: stacked toasts.
    ({ ctx, p } = await open(b, t, CHW, 'example-mistakes'));
    await p.addStyleTag({ content: '#toasts { display: flex !important; }' });
    for (let i = 0; i < 2; i++) {
      await p.click('.problem button:has-text("Fix this")').catch(() => {});
      await p.waitForTimeout(400);
    }
    await p.evaluate(() => document.querySelector('.CodeMirror').CodeMirror.setValue('Game.GUID="Demo";\nGame.GameName="Demo";\nGame.ExecutableName="demo.exe";\n'));
    await p.click('.CodeMirror');
    await p.keyboard.press('Shift+Alt+F');
    await p.waitForTimeout(900);
    // Fanned out, as when the pointer is on the stack.
    const tb = await box(p, '#toasts');
    await p.mouse.move(tb.x + tb.width / 2, tb.y + tb.height - 20, { steps: 6 });
    await p.waitForTimeout(800);
    await shot(p, `toasts-${t}.png`, '#toasts', 12);
    await ctx.close();
    // The Open dialog (Ctrl+K): tiles, template chips and Hub rows, the first Hub row selected.
    ({ ctx, p } = await open(b, t, CHW, 'example-mistakes'));
    await p.click('.CodeMirror');
    await p.keyboard.press('Control+K');
    await p.waitForTimeout(400);
    for (let i = 0; i < 4; i++) await p.keyboard.press('ArrowDown');
    await p.mouse.move(2, 2);
    await p.waitForTimeout(400);
    await shot(p, `open-${t}.png`, '#open-dialog');
    await ctx.close();
  }
  await b.close();
  if (!process.argv.includes('--release-shots')) require('child_process').execFileSync('python3', ['-I', path.join(__dirname, 'compose-images.py'), CH], { stdio: 'inherit' });
})();
