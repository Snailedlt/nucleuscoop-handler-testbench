// The credit lines (playground/src/credit.ts): only for handlers made or changed in the workbench, explicit about what
// was and wasn't done, refreshed (never doubled), and an edited credit line is left alone.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from '../playground/node_modules/esbuild/lib/main.js';

const { outputFiles } = await build({ entryPoints: [new URL('../playground/src/credit.ts', import.meta.url).pathname], bundle: true, format: 'esm', write: false, platform: 'neutral' });
const { withCredit, withoutCredit, hasCredit, creditLines, CREDIT_LINK } = await import('data:text/javascript;base64,' + Buffer.from(outputFiles[0].text).toString('base64'));

const H = 'Game.GUID = "x";\nGame.GameName = "x";\n';
const facts = { errors: 0, warnings: 0, ai: { direct: 0, reviewed: 0 } };

test('credit: only for handlers made or changed here', () => {
  assert.equal(withCredit(H, facts, { created: false, edited: false, on: true }), H, 'opened and saved: unchanged');
  assert.ok(withCredit(H, facts, { created: true, edited: false, on: true }).startsWith('// Made with the Nucleus Handler Workbench: '));
  assert.ok(withCredit(H, facts, { created: false, edited: true, on: true }).endsWith(H));
  assert.equal(withCredit(H, facts, { created: true, edited: true, on: false }), H, 'switched off');
  assert.match(CREDIT_LINK, /\?ref=handler-comment$/);
});

test('credit: says what was done and what was not', () => {
  const none = creditLines(facts);
  assert.match(none, /Checked in the workbench: no problems found\./);
  assert.match(none, /Try it \(simulated, not the real game\): not run on this version\. Not run in Nucleus Co-op by the workbench\./);
  assert.match(none, /AI: not used in the workbench\./);
  const some = creditLines({ errors: 1, warnings: 2, tried: { players: 4, loaded: true }, ai: { direct: 1, reviewed: 2 } });
  assert.match(some, /1 error and 2 warnings left/);
  assert.match(some, /run on this version \(4 players\), the handler loaded/);
  assert.match(some, /Fix with AI changed it 3 times \(2 reviewed before applying, 1 applied directly\); the rest was written without AI in the workbench/);
  assert.match(creditLines({ ...facts, tried: { players: 1, loaded: false } }), /\(1 player\), the handler did not load/);
});

test('credit: refreshed, never doubled; an edited credit line is left alone', () => {
  const once = withCredit(H, facts, { created: true, edited: true, on: true });
  const again = withCredit(once, { ...facts, warnings: 1 }, { created: false, edited: false, on: true });
  assert.equal((again.match(/Made with the Nucleus Handler Workbench/g) || []).length, 1);
  assert.match(again, /0 errors and 1 warning left/);
  assert.ok(hasCredit(once) && withoutCredit(once) === H);
  const edited = '// Made with the Nucleus Handler Workbench, then polished by hand\n' + H;
  assert.equal(withCredit(edited, facts, { created: false, edited: true, on: true }), edited);
});

test('credit: never on a line the Hub install reads', () => {
  for (const l of creditLines(facts).split('\n')) assert.ok(!/^game\.(executablename|gamename)/i.test(l.trim()));
});
