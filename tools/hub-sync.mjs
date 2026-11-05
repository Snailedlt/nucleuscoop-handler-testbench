// The one place that reads the Hub's handler list (hub.splitscreen.me/api/v1/allhandlers), once a
// day. It writes a small index that every tool of ours reads instead (the CLI, the MCP server, VS
// Code, the workbench build and the weekly check), so their users never add load to the Hub's API.
// Handler packages still come from the Hub's own storage, once per version.
//   node tools/hub-sync.mjs <out.json>
import fs from 'node:fs';

const HUB = 'https://hub.splitscreen.me';
const UA = 'nucleus-handler-tools hub-sync (+https://github.com/Snailedlt/nucleuscoop-handler-testbench)';
const out = process.argv[2];
if (!out) throw new Error('usage: node tools/hub-sync.mjs <out.json>');

const res = await fetch(`${HUB}/api/v1/allhandlers`, { headers: { 'user-agent': UA, 'accept-encoding': 'gzip' } });
if (!res.ok) throw new Error(`Hub returned ${res.status}`);
const list = (await res.json()).Handlers ?? [];
if (list.length < 100) throw new Error(`Only ${list.length} handlers in the Hub's answer; keeping the old index.`);
// Only what the tools use (the same field names as the Hub's API), sorted so unchanged data stays identical.
const KEEP = ['_id', 'title', 'gameName', 'ownerName', 'description', 'downloadCount', 'stars', 'verified', 'currentVersion', 'currentPackage', 'maxPlayers', 'playableControllers', 'playableMouseKeyboard', 'playableMultiMouseKeyboard', 'updatedAt'];
const handlers = list
  .map((h) => Object.fromEntries(KEEP.filter((k) => h[k] !== undefined && h[k] !== null && h[k] !== '').map((k) => [k, k === 'description' ? String(h[k]).slice(0, 300) : h[k]])))
  .sort((a, b) => (b.downloadCount ?? 0) - (a.downloadCount ?? 0) || String(a._id).localeCompare(String(b._id)));
const index = { syncedAt: new Date().toISOString(), source: `${HUB}/api/v1/allhandlers`, count: handlers.length, handlers };
fs.writeFileSync(out, JSON.stringify(index));
console.log(`${handlers.length} handlers, ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
