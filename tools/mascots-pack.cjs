// Builds the downloadable mascot packs from the concept sheet (design/mascots/index.html), the single source:
//   node tools/mascots-pack.cjs            (needs Playwright with Chromium, ffmpeg and python3)
// into design/mascots/packs/*.zip, which the sheet's Downloads section links to. Each drawing becomes a standalone
// animated SVG (its CSS inside, still when the device asks for less motion), a still SVG, PNGs and a GIF.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SHEET = path.join(ROOT, 'design', 'mascots', 'index.html');
const OUT = path.join(ROOT, 'design', 'mascots', 'packs');
const TMP = fs.mkdtempSync(path.join(require('os').tmpdir(), 'mascot-pack-'));
const DUO = ['idle', 'hello', 'joy', 'split', 'four', 'load', 'roll', 'get', 'search', 'think', 'sleep', 'oops', 'fake', 'slice'];
const NUC = ['n-idle', 'n-spin', 'n-ring', 'n-calc', 'n-test', 'n-scan', 'n-fix', 'n-ok', 'n-bad', 'n-hula', 'n-sleep'];
const README = fs.readFileSync(path.join(__dirname, 'mascots-pack-readme.md'), 'utf8');

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1400, height: 1000 } });
  await p.goto('file://' + SHEET);
  await p.waitForTimeout(600);
  // Every drawing to export: [file name, CSS selector of its <svg> on the sheet].
  const items = await p.evaluate(({ DUO, NUC }) => {
    const out = [];
    const mark = (el, name) => { if (el) { el.dataset.pack = name; out.push(name); } };
    for (const id of [...DUO, ...NUC]) mark(document.querySelector(`.scene svg.s-${id}`) || document.querySelector(`svg.s-${id}`), `${id.startsWith('n-') ? 'nucli-' + id.slice(2) : 'duo-' + id}`);
    document.querySelectorAll('#lab .scene').forEach((s) => mark(s.querySelector('.stage svg'), 'loader-' + s.querySelector('b').textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '')));
    document.querySelectorAll('#emoji .emo-grid figure').forEach((f) => {
      const n = f.querySelector('figcaption').firstChild.textContent.replace(/:/g, '');
      const svg = f.querySelector('svg');
      if (!document.querySelector(`[data-pack="emoji-${n}"]`)) mark(svg, `emoji-${n}${f.querySelector('.gif') ? '-anim' : ''}`);
    });
    return out;
  }, { DUO, NUC });
  // A standalone SVG for each: its defs, the CSS it uses (keyframes and custom properties too).
  const files = await p.evaluate(() => {
    const res = {};
    const sheets = [];
    for (const sh of document.styleSheets) { try { sheets.push(sh.cssRules); } catch { /* the web font */ } }
    const rs = getComputedStyle(document.documentElement);
    for (const el of document.querySelectorAll('[data-pack]')) {
      const used = new Set(), scenes = new Set();
      for (const e of [el, ...el.querySelectorAll('[class]')]) for (const c of e.classList) { used.add(c); if (c.startsWith('s-')) scenes.add(c); }
      const want = (sel) => sel.split(',').some((part) => {
        const cl = [...part.matchAll(/\.([a-zA-Z][\w-]*)/g)].map((m) => m[1]);
        if (/(^|\s)(html|body|:root|#)/.test(part.trim()) && !part.trim().startsWith('svg')) return false;
        return cl.length && cl.every((c) => used.has(c));
      });
      const rules = [], kf = {}, names = new Set(), vars = new Set();
      const walk = (list, media) => { for (const r of list) {
        if (r.type === CSSRule.MEDIA_RULE) walk(r.cssRules, r.conditionText);
        else if (r.type === CSSRule.KEYFRAMES_RULE) kf[r.name] = r.cssText;
        else if (r.type === CSSRule.STYLE_RULE && r.selectorText && want(r.selectorText)) {
          rules.push(media ? `@media ${media} { ${r.cssText} }` : r.cssText);
          (r.style.animationName || '').split(',').map((s) => s.trim()).filter((s) => s && s !== 'none').forEach((n) => names.add(n));
          for (const m of r.cssText.matchAll(/var\((--[\w-]+)/g)) vars.add(m[1]);
        } } };
      sheets.forEach((l) => walk(l, null));
      const svg = el.cloneNode(true);
      svg.removeAttribute('data-pack');
      for (const a of ['width', 'height', 'style', 'role', 'aria-label']) svg.removeAttribute(a);
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      const have = new Set([...svg.querySelectorAll('[id]')].map((e) => e.id));
      let grew = true;
      while (grew) { grew = false; for (const m of (svg.outerHTML + defs.innerHTML).matchAll(/(?:url\(#|href="#)([^)"]+)/g)) { if (have.has(m[1])) continue; have.add(m[1]); const e = document.getElementById(m[1]); if (e) { defs.appendChild(e.cloneNode(true)); grew = true; } } }
      if (defs.childNodes.length) svg.insertBefore(defs, svg.firstChild);
      for (const m of svg.outerHTML.matchAll(/var\((--[\w-]+)/g)) vars.add(m[1]);
      let css = rules.join('\n') + '\n' + [...names].filter((n) => kf[n]).map((n) => kf[n]).join('\n');
      for (const n of [...names]) if (kf[n]) for (const m of kf[n].matchAll(/var\((--[\w-]+)/g)) vars.add(m[1]);
      const v = [...vars].map((n) => [n, rs.getPropertyValue(n).trim()]).filter(([, x]) => x).map(([n, x]) => `${n}: ${x};`).join(' ');
      css = `svg { ${v} }\n${css}`.replace(/\s*\n\s*/g, ' ');
      const vb = svg.getAttribute('viewBox') || '0 0 120 120';
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
      style.textContent = css;
      svg.insertBefore(style, svg.firstChild);
      res[el.dataset.pack] = { svg: svg.outerHTML, vb, moving: names.size > 0 || !!svg.querySelector('animate, animateMotion, animateTransform') };
    }
    return res;
  });
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  const dir = (n) => { const d = path.join(TMP, n); fs.mkdirSync(d, { recursive: true }); return d; };
  const still = (svg) => svg.replace(/<animate[\s\S]*?(\/>|<\/animate\w*>)/g, '').replace('</style>', ' * { animation: none !important; }</style>');
  const page = await b.newPage({ viewport: { width: 512, height: 512 } });
  // PNG of a drawing at a size (transparent), optionally on a coloured disc (avatars).
  async function png(svg, size, file, disc) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(`<style>html,body{margin:0;background:transparent}.w{width:${size}px;height:${size}px;${disc ? `background:${disc};border-radius:50%;display:grid;place-items:center` : ''}}svg{width:${disc ? '84%' : '100%'};height:${disc ? '84%' : '100%'};overflow:visible}</style><div class="w">${svg}</div>`);
    await page.evaluate(() => { document.querySelectorAll('svg').forEach((s) => { try { s.pauseAnimations(); s.setCurrentTime(0); } catch {} }); document.getAnimations().forEach((a) => { a.pause(); a.currentTime = 0; }); });
    await page.screenshot({ path: file, omitBackground: true });
  }
  // A seamless GIF: every loop nudged to fit one length T (at most ~5 s), 15 frames a second, transparent.
  async function gif(svg, size, file, opt = {}) {
    const fps = opt.fps ?? 12, colors = opt.colors ?? 96;
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(`<style>html,body{margin:0;background:transparent}svg{width:${size}px;height:${size}px;overflow:visible}</style>${svg}`);
    await page.waitForTimeout(50);
    const T = await page.evaluate(() => {
      const ds = [...document.getAnimations().map((a) => a.effect.getTiming().duration / 1000), ...[...document.querySelectorAll('animate, animateMotion, animateTransform')].map((e) => parseFloat(e.getAttribute('dur')))].filter((d) => d > 0);
      const T = Math.min(5.2, Math.max(1, ...ds.filter((d) => d <= 5.2)));
      for (const e of document.querySelectorAll('animate, animateMotion, animateTransform')) { const d = parseFloat(e.getAttribute('dur')); e.setAttribute('dur', (T / Math.max(1, Math.round(T / d))).toFixed(3) + 's'); }
      document.querySelectorAll('svg').forEach((s) => s.pauseAnimations());
      document.getAnimations().forEach((a) => a.pause());
      return T;
    });
    const fr = dir('frames-' + path.basename(file));
    const N = Math.round(T * fps);
    for (let i = 0; i < N; i++) {
      const t = (i / N) * T;
      await page.evaluate(([t, T]) => {
        document.querySelectorAll('svg').forEach((s) => s.setCurrentTime(t));
        document.getAnimations().forEach((a) => { const d = a.effect.getTiming().duration / 1000; const k = Math.max(1, Math.round(T / d)); a.currentTime = (((t / T) * k * d) % d) * 1000; });
      }, [t, T]);
      await page.screenshot({ path: path.join(fr, String(i).padStart(3, '0') + '.png'), omitBackground: true });
    }
    execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-framerate', String(fps), '-i', path.join(fr, '%03d.png'), '-vf', `split[a][b];[a]palettegen=max_colors=${colors}:reserve_transparent=1:stats_mode=full[p];[b][p]paletteuse=dither=bayer:bayer_scale=3:alpha_threshold=128`, '-gifflags', '-offsetting', '-loop', '0', file]);
  }
  const write = (d, name, data) => fs.writeFileSync(path.join(d, name), data);
  async function full(d, name, f) {
    write(d, `${name}.svg`, f.svg);
    write(d, `${name}-still.svg`, still(f.svg));
    await png(f.svg, 512, path.join(d, `${name}-512.png`));
    await png(f.svg, 128, path.join(d, `${name}-128.png`));
    if (f.moving) await gif(f.svg, 192, path.join(d, `${name}-192.gif`));
  }
  const packs = {};
  // Duo and Nucli: every scene.
  for (const [pack, pre] of [['duo', 'duo-'], ['nucli', 'nucli-']]) {
    const d = dir(pack);
    for (const [n, f] of Object.entries(files).filter(([n]) => n.startsWith(pre))) await full(d, n, f);
    fs.copyFileSync(path.join(ROOT, 'design', 'mascots', 'svg', pack === 'duo' ? 'duo-3-current.svg' : 'nucli-9-current.svg'), path.join(d, `${pack}-character.svg`));
    if (pack === 'duo') for (const x of ['duo-3-four-players', 'duo-3-one-colour', 'duo-3-small-3d']) fs.copyFileSync(path.join(ROOT, 'design', 'mascots', 'svg', `${x}.svg`), path.join(d, `${x.replace('-3', '')}.svg`));
    packs[pack] = d;
  }
  // Discord emoji: 128 × 128, PNG (static) and GIF (animated), under 256 KB each.
  { const d = dir('discord-emoji');
    for (const [n, f] of Object.entries(files).filter(([n]) => n.startsWith('emoji-'))) {
      const name = n.replace('emoji-', '').replace('-anim', '');
      if (!n.endsWith('-anim')) { await png(f.svg, 128, path.join(d, `${name}.png`)); continue; }
      // Discord takes animated emoji up to 256 KB: fewer colours and frames until it fits.
      const out = path.join(d, `${name}.gif`);
      for (const o of [{ fps: 15, colors: 96 }, { fps: 12, colors: 64 }, { fps: 10, colors: 48 }, { fps: 8, colors: 32 }]) {
        await gif(f.svg, 128, out, o);
        if (fs.statSync(out).size <= 250 * 1024) break;
      }
      if (fs.statSync(out).size > 256 * 1024) console.warn(`${out} is still over Discord's 256 KB`);
    }
    packs['discord-emoji'] = d; }
  // Loaders and spinners.
  { const d = dir('loaders');
    for (const [n, f] of Object.entries(files).filter(([n]) => n.startsWith('loader-') || ['nucli-spin', 'nucli-ring', 'duo-roll', 'duo-load'].includes(n))) {
      write(d, `${n}.svg`, f.svg);
      write(d, `${n}-still.svg`, still(f.svg));
      await gif(f.svg, 192, path.join(d, `${n}-192.gif`));
    }
    packs.loaders = d; }
  // Avatars: profile pictures on a light and a dark disc.
  { const d = dir('avatars');
    for (const [n, f] of [['duo', files['duo-idle']], ['nucli', files['nucli-idle']]]) {
      await png(still(f.svg), 512, path.join(d, `${n}-avatar-light.png`), n === 'duo' ? '#e8f4ff' : '#eceeff');
      await png(still(f.svg), 512, path.join(d, `${n}-avatar-dark.png`), n === 'duo' ? '#12233f' : '#1d1f3f');
    }
    packs.avatars = d; }
  // Web kit: an example page and the files it uses.
  { const d = dir('web-kit');
    for (const n of ['duo-idle', 'duo-joy', 'duo-oops', 'nucli-idle', 'nucli-ok', 'nucli-spin']) { write(d, `${n}.svg`, files[n].svg); write(d, `${n}-still.svg`, still(files[n].svg)); }
    fs.copyFileSync(path.join(__dirname, 'mascots-pack-example.html'), path.join(d, 'example.html'));
    packs['web-kit'] = d; }
  // Each pack with the README; then everything in one.
  const colours = JSON.stringify({ duo: { light: '#4ec1fc', blue: '#1c7bff', stripe: '#ffffff', ink: '#1f2c46' }, nucli: { light: '#c9ceff', violet: '#4f55c8', line: '#3c3fa8' }, players: ['#fca53d', '#ff434d', '#3fbbd8', '#55d137'] }, null, 2);
  for (const d of Object.values(packs)) { write(d, 'README.md', README); write(d, 'colours.json', colours); }
  const zip = (name, dirs) => execFileSync('python3', ['-c', `
import sys, zipfile, os
out, dirs = sys.argv[1], sys.argv[2:]
with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as z:
    for d in dirs:
        top = os.path.basename(d) if len(dirs) > 1 else ''
        for f in sorted(os.listdir(d)):
            z.write(os.path.join(d, f), os.path.join(top, f) if top else f)
`, path.join(OUT, name), ...dirs]);
  for (const [n, d] of Object.entries(packs)) zip(`${n}.zip`, [d]);
  zip('duo-and-nucli-everything.zip', Object.values(packs));
  for (const f of fs.readdirSync(OUT)) console.log(f, (fs.statSync(path.join(OUT, f)).size / 1024).toFixed(0) + ' KB');
  await b.close();
  fs.rmSync(TMP, { recursive: true, force: true });
})();
