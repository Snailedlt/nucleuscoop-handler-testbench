// Renders devtools-thumbnail.html to devtools-thumbnail.png (1920x1080), for posts, and og.html to the site's link
// preview, docs/images/og.png (1200x630). Re-run it after the gallery
// screenshots change: node design/promo/render.mjs (needs Playwright and the Inter font).
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch({ args: ['--allow-file-access-from-files'] });
// The post thumbnail at its size; the link preview drawn at 1920x1008 and saved at 1200x630 (og:image's usual size).
for (const [src, out, w, h, scale] of [
  ['devtools-thumbnail.html', path.join(here, 'devtools-thumbnail.png'), 1920, 1080, 1],
  ['og.html', path.join(here, '..', '..', 'docs', 'images', 'og.png'), 1920, 1008, 0.625],
]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
  await page.goto('file://' + path.join(here, src));
  await page.waitForTimeout(800);
  await page.screenshot({ path: out });
  await page.close();
  console.log(path.relative(process.cwd(), out));
}
await browser.close();
