// The one place that reads the Hub's handler list (hub.splitscreen.me/api/v1/allhandlers), once a
// day. It writes a small index that every tool of ours reads instead (the CLI, the MCP server, VS
// Code, the workbench build and the weekly check), so their users never add load to the Hub's API.
// Handler packages still come from the Hub's own storage, once per version.
// allhandlers stops at the 600 with the most stars (splitscreenme-hub, imports/api/Handlers/server/publications.js:
// `limit: 600`, no paging), so the rest comes from the 'handlers' publication the Hub's own website subscribes to (DDP
// over its websocket; at most 600 per subscription too): sorted by stars both ways, plus downloads and name both
// ways, that covers up to 1200+ handlers in one short connection.
//   node tools/hub-sync.mjs <out.json>
import fs from 'node:fs';
import { hubClientHeaders } from './hub-client.mjs';

const HUB = 'https://hub.splitscreen.me';
const HEADERS = hubClientHeaders('hub-sync', 'daily-index');
const out = process.argv[2];
if (!out) throw new Error('usage: node tools/hub-sync.mjs <out.json>');

const res = await fetch(`${HUB}/api/v1/allhandlers`, { headers: { ...HEADERS, 'accept-encoding': 'gzip' } });
if (!res.ok) throw new Error(`Hub returned ${res.status}`);
const list = (await res.json()).Handlers ?? [];
if (list.length < 100) throw new Error(`Only ${list.length} handlers in the Hub's answer; keeping the old index.`);
let complete = list.length < 600;
if (!complete) {
  try {
    const more = await ddpHandlers();
    const have = new Set(list.map((h) => h._id));
    for (const h of more.handlers) if (!have.has(h._id)) { list.push(h); have.add(h._id); }
    complete = more.complete;
    console.log(`allhandlers: 600, the Hub's own subscription: ${more.handlers.length}${complete ? '' : ' (maybe more: every window was full)'}`);
  } catch (e) {
    console.log(`Only the first 600: the Hub's subscription failed (${e.message})`);
  }
}
// Only what the tools use (the same field names as the Hub's API), sorted so unchanged data stays identical.
const KEEP = ['_id', 'title', 'gameName', 'ownerName', 'description', 'downloadCount', 'stars', 'verified', 'currentVersion', 'currentPackage', 'maxPlayers', 'playableControllers', 'playableMouseKeyboard', 'playableMultiMouseKeyboard', 'updatedAt', 'gameCover'];
const handlers = list
  .map((h) => Object.fromEntries(KEEP.filter((k) => h[k] !== undefined && h[k] !== null && h[k] !== '').map((k) => [k, k === 'description' ? String(h[k]).slice(0, 300) : h[k]])))
  .sort((a, b) => (b.downloadCount ?? 0) - (a.downloadCount ?? 0) || String(a._id).localeCompare(String(b._id)));
const index = { syncedAt: new Date().toISOString(), source: `${HUB}/api/v1/allhandlers + the handlers publication`, count: handlers.length, complete, handlers };
fs.writeFileSync(out, JSON.stringify(index));
console.log(`${handlers.length} handlers, ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);

/** Every public, authorized handler through the Hub's 'handlers' publication (the same filter as allhandlers),
 *  in windows of at most 600: by stars, downloads and name, each way. `complete` when two opposite windows overlap. */
function ddpHandlers() {
  const WINDOWS = [['hot', 'down'], ['hot', 'up'], ['download', 'down'], ['download', 'up'], ['alphabetical', 'up'], ['alphabetical', 'down']];
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`${HUB.replace(/^http/, 'ws')}/websocket`, { headers: HEADERS });
    const docs = new Map();
    const perSub = new Map();
    let ready = 0;
    const timer = setTimeout(() => { ws.close(); reject(new Error('timed out')); }, 120000);
    const send = (m) => ws.send(JSON.stringify(m));
    ws.onopen = () => send({ msg: 'connect', version: '1', support: ['1'] });
    ws.onerror = (e) => { clearTimeout(timer); reject(new Error(e.message ?? 'websocket error')); };
    ws.onmessage = (e) => {
      const m = JSON.parse(e.data);
      if (m.msg === 'connected') WINDOWS.forEach(([by, order], i) => send({ msg: 'sub', id: String(i), name: 'handlers', params: ['', by, order, 600, [], ''] }));
      else if (m.msg === 'ping') send({ msg: 'pong' });
      else if (m.msg === 'added' && m.collection === 'Handlers') docs.set(m.id, { _id: m.id, ...m.fields });
      else if (m.msg === 'ready') {
        ready += m.subs.length;
        if (ready >= WINDOWS.length) {
          clearTimeout(timer);
          ws.close();
          const handlers = [...docs.values()].filter((h) => h.private !== true && h.publicAuthorized !== false);
          // Each window holds at most 600; fewer than 1200 in all means the stars-down and stars-up windows overlapped.
          resolve({ handlers, complete: handlers.length < 1200 });
        }
      } else if (m.msg === 'nosub' || m.msg === 'error') { clearTimeout(timer); ws.close(); reject(new Error(JSON.stringify(m.error ?? m).slice(0, 200))); }
    };
  });
}
