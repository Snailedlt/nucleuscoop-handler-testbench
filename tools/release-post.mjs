// The Discord post for a workbench update, from CHANGELOG.md (the newest dated section, or the one
// named): a heading, up to three highlights (the bold summaries), the link and the thanks. The same
// shape as the extension's (splitscreenme-vscode scripts/release-notes.mjs --discord).
//   node tools/release-post.mjs [<section id, e.g. "2026-11-05 23:00">]
// pages.yml runs it after a deploy whose newest section the live site didn't have yet.
import fs from 'node:fs';

const SITE = 'https://snailedlt.github.io/nucleuscoop-handler-testbench/';
const text = fs.readFileSync(new URL('../CHANGELOG.md', import.meta.url), 'utf8').replace(/<!--[\s\S]*?-->/g, '');
const parts = text.split(/^## /m).slice(1);
const wanted = process.argv[2];
const part = parts.find((p) => {
  const id = p.split('\n')[0].trim();
  return wanted ? id === wanted : /^\d{4}-\d{2}-\d{2}( \d{2}:\d{2})?$/.test(id);
});
if (!part) {
  console.error(`CHANGELOG.md has no ${wanted ? `"## ${wanted}"` : 'dated'} section.`);
  process.exit(1);
}
const body = part.split('\n').slice(1).join('\n');
const [changes, thanksPart = ''] = body.split(/^### 🙏.*$/m);
const items = changes
  .split('\n')
  .filter((l) => /^- /.test(l))
  .map((l) => (l.match(/^- \*\*(.+?)\*\*/)?.[1] ?? l.slice(2).split(/(?<=\.)\s/)[0]).replace(/\.$/, ''));
const thanks = thanksPart
  .split('\n')
  .map((l) => l.match(/^- \*\*(.+?)\*\*/)?.[1]?.replace(/^\[([^\]]+)\]\([^)]+\)$/, '$1'))
  .filter(Boolean);
const more = items.length > 3 ? ` and ${items.length - 3} more` : '';
const lines = ['**The workbench is updated** 🧰', ...items.slice(0, 3).map((s) => `• ${s}`)];
if (more) lines.push(`…${more} (What's new in the workbench lists them all)`);
lines.push('', `<${SITE}>`);
if (thanks.length) lines.push(`Thanks ${thanks.join(', ')} 🙏`);
console.log(lines.join('\n'));
