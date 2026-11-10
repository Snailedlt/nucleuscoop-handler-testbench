// The anonymous votes and feature counts (playground/src/feedback.ts and the docs pages send them to GoatCounter as
// events: "vote/doc/<name>/up", "vote/tip/<id>/down", "use/<feature>"), summed for the maintainers: which docs people
// find wrong, which tips help, which features get used. Read from GoatCounter's API with a token, so the counts stay
// in one place; nothing personal is in them (feedback.ts says what is sent).
//
//   GOATCOUNTER_TOKEN=… FEEDBACK_GOATCOUNTER=<site code> node tools/votes-report.mjs <out dir>
//
// Writes <out dir>/votes.json, and a table of the docs with the most 👎 to the GitHub job summary when there is one.
// Without the token or the site, it says so and writes nothing (the workflow step is then a no-op).
import fs from 'node:fs';
import path from 'node:path';

const out = process.argv[2];
const token = (process.env.GOATCOUNTER_TOKEN ?? '').trim();
const site = (process.env.FEEDBACK_GOATCOUNTER ?? '').trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\.goatcounter\.com\/?.*$/, '');
if (!out) { console.error('usage: node tools/votes-report.mjs <out dir>'); process.exit(2); }
if (!token || !/^[a-z0-9-]{2,50}$/.test(site)) {
  console.log('votes-report: no GOATCOUNTER_TOKEN or FEEDBACK_GOATCOUNTER site; skipped.');
  process.exit(0);
}

// GOATCOUNTER_API: another address for the API (the tests use a local stand-in).
const api = process.env.GOATCOUNTER_API || `https://${site}.goatcounter.com/api/v0`;
const day = (d) => d.toISOString().slice(0, 10);
const end = new Date();
const start = new Date(end.getTime() - 365 * 864e5);

/** Every path's total for the period: /stats/hits, a page at a time (exclude_paths: the ones already read). */
async function allHits() {
  const seen = [];
  const hits = [];
  for (let page = 0; page < 200; page++) {
    const q = new URLSearchParams({ start: day(start), end: day(end), limit: '100' });
    for (const id of seen) q.append('exclude_paths', String(id));
    const r = await fetch(`${api}/stats/hits?${q}`, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
    if (r.status === 429) { await new Promise((ok) => setTimeout(ok, 2000)); page--; continue; }
    if (!r.ok) throw new Error(`GoatCounter ${r.status}: ${(await r.text()).slice(0, 200)}`);
    const j = await r.json();
    for (const h of j.hits ?? []) { seen.push(h.path_id); hits.push({ path: String(h.path ?? '').replace(/^\//, ''), count: Number(h.count ?? 0) }); }
    if (!j.more || !(j.hits ?? []).length) break;
  }
  return hits;
}

const hits = await allHits();
/** vote/<kind>/<id>/<up|down|undo-up|undo-down> → per item: up and down, undos taken off. */
const votes = { doc: new Map(), tip: new Map() };
const use = [];
for (const { path: p, count } of hits) {
  const v = /^vote\/(doc|tip)\/(.+)\/(up|down|undo-up|undo-down)$/.exec(p);
  if (v) {
    const m = votes[v[1]];
    const it = m.get(v[2]) ?? { id: v[2], up: 0, down: 0 };
    if (v[3] === 'up') it.up += count; else if (v[3] === 'down') it.down += count; else if (v[3] === 'undo-up') it.up -= count; else it.down -= count;
    m.set(v[2], it);
    continue;
  }
  const u = /^use\/(.+)$/.exec(p);
  if (u) use.push({ feature: u[1], count });
}
const sorted = (m) => [...m.values()].map((x) => ({ ...x, up: Math.max(0, x.up), down: Math.max(0, x.down) })).sort((a, b) => b.down - a.down || b.up - a.up || a.id.localeCompare(b.id));
const report = { takenAt: new Date().toISOString(), from: day(start), to: day(end), site, docs: sorted(votes.doc), tips: sorted(votes.tip), use: use.sort((a, b) => b.count - a.count) };
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'votes.json'), JSON.stringify(report, null, 1) + '\n');
console.log(`votes-report: ${report.docs.length} docs, ${report.tips.length} tips, ${report.use.length} features (${report.from} to ${report.to}).`);

if (process.env.GITHUB_STEP_SUMMARY) {
  const rows = (list) => list.slice(0, 30).map((x) => `| \`${x.id}\` | ${x.up} | ${x.down} |`).join('\n');
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `## Votes, last 12 months\n\nMost 👎 first. The full list is \`votes.json\` on the \`data\` branch, and on the site's votes/ page.\n\n### Docs\n\n| Name | 👍 | 👎 |\n|---|---|---|\n${rows(report.docs)}\n\n### Tips\n\n| Tip | 👍 | 👎 |\n|---|---|---|\n${rows(report.tips)}\n`);
}
