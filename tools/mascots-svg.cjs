// A standalone animated SVG of mascot scenes, for What's new (and anywhere an image goes), plus its still frame:
//   node tools/mascots-svg.cjs docs/images/changelog/<date>-<name>.svg joy n-ok
// writes <name>.svg (the scenes side by side, with their CSS inside, so it animates as an <img> and stands still
// when the device asks for less motion) and <name>.png (the first frame). Transparent: one file for light and dark.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const [out, ...ids] = process.argv.slice(2);
if (!out || !ids.length) throw new Error('usage: node tools/mascots-svg.cjs <out.svg> <scene id>...');
const gen = fs.readFileSync(path.join(__dirname, '..', 'playground', 'src', 'mascots.gen.ts'), 'utf8');
const S = JSON.parse(gen.match(/MASCOT_SVG: Record<string, string> = ([\s\S]*?);\nexport/)[1]);
const CSS = JSON.parse(gen.match(/MASCOT_CSS = (.*);/)[1]);

const W = 120;
const inner = ids.map((id, i) => {
  if (!S[id]) throw new Error('no scene ' + id);
  // The scene's own <svg> placed in a row; its SMIL keeps running inside an <img>, its CSS follows the media query.
  return S[id].replace(/^<svg /, `<svg x="${i * W}" y="0" width="${W}" height="${W}" `);
}).join('');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" class="masc" viewBox="0 0 ${ids.length * W} ${W}" width="${ids.length * W * 1.5}" height="${W * 1.5}"><style>${CSS} @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }</style>${inner}</svg>`;
fs.writeFileSync(out, svg);

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: ids.length * W * 1.5, height: W * 1.5 } });
  await p.setContent(`<style>html,body{margin:0;background:transparent}</style>${svg}`);
  await p.evaluate(() => { document.querySelectorAll('svg').forEach((s) => { try { s.pauseAnimations(); s.setCurrentTime(0); } catch {} }); document.getAnimations().forEach((a) => { a.pause(); a.currentTime = 0; }); });
  await p.screenshot({ path: out.replace(/\.svg$/, '.png'), omitBackground: true });
  await b.close();
  console.log(`${out} (${(svg.length / 1024).toFixed(0)} KB) and its still`);
})();
