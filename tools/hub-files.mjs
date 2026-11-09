// The other files of a Hub package (.nc, a zip), for the workbench's Files panel: everything except
// the root handler.js. Small files come with their content; big ones (DLLs, games' own programs) are
// listed with name and size only, so a handler opens with its whole package listed without the page
// carrying megabytes. Shared by tools/hub-mirror.mjs (the data branch) and playground/build.mjs (the
// snapshot). No dependencies.
import zlib from 'node:zlib';
import { hubClientHeaders } from './hub-client.mjs';

export const MAX_FILE = 256 * 1024; // content for files up to this size…
export const MAX_TOTAL = 1024 * 1024; // …until a handler's files add up to this
const HEADERS = hubClientHeaders('hub-files', 'package-files');

/** The package's URL on the Hub (as splitscreenme-vscode's core/hub.ts packageUrl). */
export const packageUrl = (id, pkg, version) => `https://hub.splitscreen.me/cdn/storage/packages/${pkg}/original/handler-${id}-v${version}.nc`;

/** The zip's entries (central directory), with a reader for each. */
export function zipEntries(buf) {
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 66000); i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('not a zip file');
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  const out = [];
  for (let i = 0; i < count; i++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error('damaged zip directory');
    const flags = buf.readUInt16LE(p + 8);
    const method = buf.readUInt16LE(p + 10);
    const csize = buf.readUInt32LE(p + 20);
    const size = buf.readUInt32LE(p + 24);
    const nlen = buf.readUInt16LE(p + 28);
    const xlen = buf.readUInt16LE(p + 30);
    const clen = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const raw = buf.subarray(p + 46, p + 46 + nlen);
    // Bit 11: UTF-8 names. Older zips use the DOS code page; latin1 keeps every byte readable.
    const name = (flags & 0x800 ? raw.toString('utf8') : /[\x80-\xff]/.test(raw.toString('latin1')) ? raw.toString('latin1') : raw.toString('utf8')).replace(/\\/g, '/');
    p += 46 + nlen + xlen + clen;
    out.push({
      name,
      size,
      dir: name.endsWith('/'),
      read() {
        const start = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
        const data = buf.subarray(start, start + csize);
        if (method === 0) return Buffer.from(data);
        if (method === 8) return zlib.inflateRawSync(data);
        throw new Error(`compression method ${method}`);
      },
    });
  }
  return out;
}

/** { files: [{ name, size, b64? }] } for every file but the root handler (as the workbench's readPackage picks it). */
export function packageFiles(buf, { maxFile = MAX_FILE, maxTotal = MAX_TOTAL } = {}) {
  const entries = zipEntries(buf).filter((e) => !e.dir);
  const roots = entries.filter((e) => !e.name.includes('/') && /\.js$/i.test(e.name));
  const handler = roots.find((e) => e.name.toLowerCase() === 'handler.js') ?? roots[0];
  let total = 0;
  const files = [];
  for (const e of entries.filter((x) => x !== handler).sort((a, b) => a.name.localeCompare(b.name))) {
    const f = { name: e.name, size: e.size };
    if (e.size <= maxFile && total + e.size <= maxTotal) {
      try {
        const data = e.read();
        f.size = data.length;
        f.b64 = data.toString('base64');
        total += data.length;
      } catch {} // unreadable here: listed like a big file
    }
    files.push(f);
  }
  return { files };
}

/** Downloads a package once and returns its files (throws on a failed download or a broken zip). */
export async function fetchPackageFiles(id, pkg, version, opts) {
  const r = await fetch(packageUrl(id, pkg, version), { headers: HEADERS });
  if (!r.ok) throw new Error(`package download: ${r.status}`);
  return packageFiles(Buffer.from(await r.arrayBuffer()), opts);
}

/** Text (UTF-8, or UTF-16 with a BOM), as the workbench's pkgcheck textOf decides. */
export function isText(data) {
  if ((data[0] === 0xff && data[1] === 0xfe) || (data[0] === 0xfe && data[1] === 0xff)) return true;
  if (data.subarray(0, 8000).includes(0)) return false;
  try {
    new TextDecoder('utf-8', { fatal: true }).decode(data);
    return true;
  } catch {
    return false;
  }
}

/** A smaller copy for a page that carries every handler inside it (the single-file workbench): only text
 *  files keep their content, up to maxFile each and maxTotal per handler; the rest become name and size. */
export function slimFiles(files, { maxFile = 64 * 1024, maxTotal = 256 * 1024 } = {}) {
  let total = 0;
  return files.map((f) => {
    if (!f.b64) return f;
    const data = Buffer.from(f.b64, 'base64');
    if (f.size <= maxFile && total + f.size <= maxTotal && isText(data)) return (total += f.size), f;
    return { name: f.name, size: f.size };
  });
}
