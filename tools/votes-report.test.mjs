// tools/votes-report.mjs against a local stand-in for GoatCounter's API: pages are followed, votes are summed per
// item with undos taken off, the worst-rated docs come first, and nothing runs without a token.
import assert from 'node:assert/strict';
import test from 'node:test';
import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, execFile } from 'node:child_process';
import { promisify } from 'node:util';

const script = path.join(import.meta.dirname, 'votes-report.mjs');

test('votes-report: sums the votes from every page of the API', async () => {
  const pages = [
    { hits: [{ path_id: 1, path: '/vote/doc/Game.Play/up', count: 5 }, { path_id: 2, path: '/vote/doc/Game.Play/undo-up', count: 1 }, { path_id: 3, path: '/vote/doc/Context.Width/down', count: 3 }], more: true },
    { hits: [{ path_id: 4, path: '/vote/tip/s-tutorial/up', count: 2 }, { path_id: 5, path: '/use/try-it', count: 9 }, { path_id: 6, path: '/visit', count: 50 }], more: false },
  ];
  let calls = 0, auth = '';
  const srv = http.createServer((req, res) => { auth = req.headers.authorization; if (req.url.startsWith('/me')) return void res.end('{"user":{}}'); assert.match(req.url, /start=\d{4}-\d\d-\d\dT00%3A00%3A00Z/); const p = pages[Math.min(calls++, 1)]; res.setHeader('content-type', 'application/json'); res.end(JSON.stringify(p)); });
  await new Promise((ok) => srv.listen(0, '127.0.0.1', ok));
  const out = fs.mkdtempSync(path.join(os.tmpdir(), 'votes-'));
  try {
    await promisify(execFile)(process.execPath, [script, out], { env: { ...process.env, GOATCOUNTER_TOKEN: 't0k', FEEDBACK_GOATCOUNTER: 'demo', GOATCOUNTER_API: `http://127.0.0.1:${srv.address().port}`, GITHUB_STEP_SUMMARY: '' } });
    const v = JSON.parse(fs.readFileSync(path.join(out, 'votes.json'), 'utf8'));
    assert.equal(auth, 'Bearer t0k');
    assert.equal(calls, 2, 'both pages read');
    assert.deepEqual(v.docs, [{ id: 'Context.Width', up: 0, down: 3 }, { id: 'Game.Play', up: 4, down: 0 }]);
    assert.deepEqual(v.tips, [{ id: 's-tutorial', up: 2, down: 0 }]);
    assert.deepEqual(v.use, [{ feature: 'try-it', count: 9 }]);
  } finally {
    srv.close();
    fs.rmSync(out, { recursive: true, force: true });
  }
});

test('votes-report: without a token it skips, and writes nothing', () => {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), 'votes-'));
  try {
    const msg = execFileSync(process.execPath, [script, out], { env: { ...process.env, GOATCOUNTER_TOKEN: '', FEEDBACK_GOATCOUNTER: '' } }).toString();
    assert.match(msg, /skipped/);
    assert.ok(!fs.existsSync(path.join(out, 'votes.json')));
  } finally {
    fs.rmSync(out, { recursive: true, force: true });
  }
});
