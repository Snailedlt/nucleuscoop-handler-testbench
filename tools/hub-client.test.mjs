// The testbench's Hub requests name the devtools, the tool and the job, and nothing else.
import assert from 'node:assert/strict';
import os from 'node:os';
import { hubClientHeaders } from './hub-client.mjs';

const h = hubClientHeaders('hub-sync', 'daily-index');
assert.match(h['user-agent'], /^SplitScreenMe-DevTools\/\S+ \(testbench-hub-sync; daily-index; \+https:\/\/github\.com\//);
assert.equal(h['x-requested-with'], 'SplitScreenMe-DevTools/testbench testbench-hub-sync daily-index');
// Only headers the Hub's CORS allows for a browser, besides User-Agent (which only Node sends).
for (const k of Object.keys(h)) assert.ok(['user-agent', 'x-requested-with'].includes(k), k);
// Nothing about the machine or the person.
const text = JSON.stringify(h);
for (const secret of [os.hostname(), os.userInfo().username, os.homedir(), process.platform === 'win32' ? 'Windows' : 'Linux'])
  if (secret && secret.length > 2) assert.ok(!text.includes(secret), `leaks ${secret}`);
console.log('hub-client: ok');
