// Tests for tools/hub-files.mjs. Run: node tools/hub-files.test.mjs
import assert from 'node:assert/strict';
import test from 'node:test';
import zlib from 'node:zlib';
import { packageFiles, slimFiles, packageUrl } from './hub-files.mjs';

// A small zip: stored and deflated entries, a folder entry, as a Hub .nc has them.
function zip(entries) {
  const locals = [];
  const central = [];
  let off = 0;
  for (const e of entries) {
    const name = Buffer.from(e.name);
    const raw = Buffer.from(e.data ?? '');
    const data = e.deflate ? zlib.deflateRawSync(raw) : raw;
    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(e.deflate ? 8 : 0, 8);
    lh.writeUInt32LE(data.length, 18); lh.writeUInt32LE(raw.length, 22); lh.writeUInt16LE(name.length, 26);
    const ch = Buffer.alloc(46);
    ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(20, 4); ch.writeUInt16LE(20, 6); ch.writeUInt16LE(0x800, 8); ch.writeUInt16LE(e.deflate ? 8 : 0, 10);
    ch.writeUInt32LE(data.length, 20); ch.writeUInt32LE(raw.length, 24); ch.writeUInt16LE(name.length, 28); ch.writeUInt32LE(off, 42);
    locals.push(lh, name, data);
    central.push(ch, name);
    off += 30 + name.length + data.length;
  }
  const cd = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(entries.length, 8); end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(cd.length, 12); end.writeUInt32LE(off, 16);
  return Buffer.concat([...locals, cd, end]);
}

const nc = zip([
  { name: 'handler.js', data: 'Game.GameName = "X";', deflate: true },
  { name: 'Game/' },
  { name: 'Game/joystick.cfg', data: 'bind a +jump\n', deflate: true },
  { name: 'Game/big.dll', data: 'MZ' + '\0'.repeat(3000), deflate: true },
  { name: 'Game/plain.txt', data: 'stored' },
  { name: 'readme.txt', data: 'top level' },
]);

test('every file but the root handler.js, folders skipped, small ones with content', () => {
  const { files } = packageFiles(nc, { maxFile: 1000 });
  assert.deepEqual(files.map((f) => f.name), ['Game/big.dll', 'Game/joystick.cfg', 'Game/plain.txt', 'readme.txt']);
  const by = Object.fromEntries(files.map((f) => [f.name, f]));
  assert.equal(Buffer.from(by['Game/joystick.cfg'].b64, 'base64').toString(), 'bind a +jump\n');
  assert.equal(Buffer.from(by['Game/plain.txt'].b64, 'base64').toString(), 'stored');
  assert.equal(by['Game/big.dll'].b64, undefined, 'over maxFile: name and size only');
  assert.equal(by['Game/big.dll'].size, 3002);
});

test('the total cap turns later files into placeholders', () => {
  const { files } = packageFiles(nc, { maxFile: 10000, maxTotal: 3010 });
  const withData = files.filter((f) => f.b64).map((f) => f.name);
  assert.deepEqual(withData, ['Game/big.dll', 'Game/plain.txt']); // 3002 + 6; joystick.cfg (13) would pass 3010
});

test('a package with only handler.js has no files', () => {
  assert.deepEqual(packageFiles(zip([{ name: 'handler.js', data: 'x' }])).files, []);
});

test('not a zip throws', () => {
  assert.throws(() => packageFiles(Buffer.from('<html>not found</html>'.repeat(3))));
});

test('slimFiles keeps only small text files with content', () => {
  const { files } = packageFiles(nc, { maxFile: 10000 });
  const slim = slimFiles(files, { maxFile: 100, maxTotal: 1000 });
  assert.deepEqual(slim.filter((f) => f.b64).map((f) => f.name), ['Game/joystick.cfg', 'Game/plain.txt', 'readme.txt']);
  assert.deepEqual(slim.find((f) => f.name === 'Game/big.dll'), { name: 'Game/big.dll', size: 3002 });
});

test('packageUrl matches the Hub CDN path', () => {
  assert.equal(packageUrl('abc', 'pkg', 3), 'https://hub.splitscreen.me/cdn/storage/packages/pkg/original/handler-abc-v3.nc');
});
