// The Discord post for a workbench update, from CHANGELOG.md (the newest dated section, or the one
// named): a heading, up to three highlights (the bold summaries), the link and the thanks. The same
// shape as the extension's (splitscreenme-vscode scripts/release-notes.mjs --discord).
//   node tools/release-post.mjs [<section id, e.g. "2026-11-05 23:00">] [--json | --notes | --tag]
// --json prints the webhook payload (a rich embed) instead of the text; --notes the whole section as GitHub
// release notes (images as absolute links); --tag the release tag (workbench-2026-11-05, workbench-2026-11-05-2300).
// pages.yml runs it after a deploy whose newest section the live site didn't have yet.
import fs from 'node:fs';

const SITE = 'https://snailedlt.github.io/nucleuscoop-handler-testbench/';
// Links people follow carry where they were posted, for the anonymous counts' Campaigns (feedback.ts).
const via = (where, path = '') => `${SITE}${path.split('#')[0]}?ref=${where}${path.includes('#') ? `#${path.split('#')[1]}` : ''}`;
const text = fs.readFileSync(new URL('../CHANGELOG.md', import.meta.url), 'utf8').replace(/<!--[\s\S]*?-->/g, '');
const parts = text.split(/^## /m).slice(1);
const wanted = process.argv.slice(2).find((a) => !a.startsWith('--'));
const part = parts.find((p) => {
  const id = p.split('\n')[0].trim();
  return wanted ? id === wanted : /^\d{4}-\d{2}-\d{2}( \d{2}:\d{2})?$/.test(id);
});
if (!part) {
  console.error(`CHANGELOG.md has no ${wanted ? `"## ${wanted}"` : 'dated'} section.`);
  process.exit(1);
}
const body = part.split('\n').slice(1).join('\n');
// A release can open with an intro ("**The biggest update yet.** …"): its bold first sentence becomes the post's headline.
const headline = body.split(/^### /m)[0].match(/\*\*([^*]+?)\.?\*\*/)?.[1];
const [changes, thanksPart = ''] = body.split(/^### 🙏.*$/m);
const items = changes
  .split('\n')
  .filter((l) => /^- /.test(l))
  .map((l) => (l.match(/^- \*\*(.+?)\*\*/)?.[1] ?? l.slice(2).split(/(?<=\.)\s/)[0]).replace(/\.$/, ''));
const thanks = thanksPart
  .split('\n')
  .map((l) => l.match(/^- \*\*(.+?)\*\*/)?.[1]?.replace(/^\[([^\]]+)\]\([^)]+\)$/, '$1'))
  .filter(Boolean);
const id = part.split('\n')[0].trim();
if (process.argv.includes('--tag')) {
  console.log(`workbench-${id.replace(/[ :]/g, (c) => (c === ' ' ? '-' : ''))}`);
  process.exit(0);
}
if (process.argv.includes('--notes')) {
  // The section as it is in CHANGELOG.md, with its images pointing at the repository, and links to try it.
  const RAW = 'https://raw.githubusercontent.com/Snailedlt/nucleuscoop-handler-testbench/main/';
  // The section ends with the `---` that separates releases in CHANGELOG.md: drop it, the links add their own.
  const notes = body.trim().replace(/(\n+---)+$/, '').replace(/\]\((docs\/[^)\s]+)\)/g, (_, path) => `](${RAW}${path})`);
  console.log(`${notes}\n\n---\n\n**Try it:** [open the workbench](${via('github-release')}) · [What's new](${via('github-release', '#whats-new')}) · [what it is](${via('github-release', 'start/')})`);
  process.exit(0);
}
if (process.argv.includes('--json')) {
  // A rich embed, so the workbench's posts look different from the extension's
  // (splitscreenme-vscode scripts/release-notes.mjs --discord --json): its own name, icon, colour.
  const shown = items.slice(0, 5);
  const description = [
    ...shown.map((s) => `• ${s}`),
    ...(items.length > shown.length ? [`…and ${items.length - shown.length} more in What's new`] : []),
    '',
    `[Open What's new](${via('discord', '#whats-new')}) · [Open the workbench](${via('discord')}) · [Intro](${via('discord', 'start/')})`,
  ].join('\n');
  console.log(
    JSON.stringify({
      username: 'Nucleus Tools · Browser workbench',
      avatar_url: `${SITE}icon.png`,
      embeds: [
        {
          author: { name: 'Browser workbench', url: SITE, icon_url: `${SITE}icon.png` },
          title: headline ? `🌐 ${headline}` : '🌐 The Nucleus Handler Workbench is updated',
          url: via('discord', '#whats-new'),
          description,
          color: 0x3ba55c, // green: the extension's posts are VS Code blue
          ...(thanks.length ? { fields: [{ name: 'Thanks', value: `${thanks.join(', ')} 🙏` }] } : {}),
          footer: { text: `Nucleus handler tools · Browser workbench · ${part.split('\n')[0].trim()} UTC` },
        },
      ],
    }),
  );
  process.exit(0);
}
const more = items.length > 3 ? ` and ${items.length - 3} more` : '';
const lines = [headline ? `**${headline}** 🧰` : '**The workbench is updated** 🧰', ...items.slice(0, 3).map((s) => `• ${s}`)];
if (more) lines.push(`…${more}: the link opens What's new with all of them`);
lines.push('', `<${via('discord', '#whats-new')}>`);
if (thanks.length) lines.push(`Thanks ${thanks.join(', ')} 🙏`);
console.log(lines.join('\n'));
