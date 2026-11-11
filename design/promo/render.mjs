// Renders devtools-thumbnail.html to devtools-thumbnail.png (1920x1080), for posts. Re-run it after the gallery
// screenshots change: node design/promo/render.mjs (needs Playwright and the Inter font).
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch({ args: ['--allow-file-access-from-files'] });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto('file://' + path.join(here, 'devtools-thumbnail.html'));
await page.waitForTimeout(800);
await page.screenshot({ path: path.join(here, 'devtools-thumbnail.png') });
await browser.close();
console.log('design/promo/devtools-thumbnail.png');
