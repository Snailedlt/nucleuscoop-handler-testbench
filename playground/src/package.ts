// Handler packages (.zip / .nc): handler.js at the root, plus whatever else the author ships
// (config files, DLLs, scripts in folders). Opening one keeps those other files, and saving puts
// them back unchanged, with the explicit folder entries Nucleus' installer needs.
import { zipStore } from './zipstore';

export interface PackageFile {
  name: string; // path inside the package, with /
  data: Uint8Array;
  /** A file of a Hub package that isn't downloaded here (too big): data is empty; size and the handler's Hub page. */
  remote?: { size: number; url: string };
}
/** The file's size, for a placeholder its size in the Hub package. */
export const sizeOf = (f: PackageFile) => (f.remote ? f.remote.size : f.data.length);
export interface Package {
  handler: string;
  handlerName: string;
  /** Every other file, unchanged. */
  files: PackageFile[];
  /** Files this browser couldn't unpack (a compression method it doesn't support). */
  unreadable: string[];
}

async function inflate(data: Uint8Array): Promise<Uint8Array | null> {
  if (!('DecompressionStream' in window)) return null;
  const stream = new Blob([data as BlobPart]).stream().pipeThrough(new DecompressionStream('deflate-raw' as CompressionFormat));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

/** Reads a package; null when it has no root .js the page can read. */
export async function readPackage(buf: ArrayBuffer): Promise<Package | null> {
  const v = new DataView(buf);
  let eocd = -1;
  for (let i = buf.byteLength - 22; i >= Math.max(0, buf.byteLength - 66000); i--) {
    if (v.getUint32(i, true) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) return null;
  const count = v.getUint16(eocd + 10, true);
  let p = v.getUint32(eocd + 16, true);
  const utf8 = new TextDecoder();
  const entries: { name: string; method: number; start: number; size: number }[] = [];
  for (let i = 0; i < count; i++) {
    const method = v.getUint16(p + 10, true);
    const csize = v.getUint32(p + 20, true);
    const nlen = v.getUint16(p + 28, true);
    const xlen = v.getUint16(p + 30, true);
    const clen = v.getUint16(p + 32, true);
    const local = v.getUint32(p + 42, true);
    const name = utf8.decode(new Uint8Array(buf, p + 46, nlen)).replace(/\\/g, '/');
    p += 46 + nlen + xlen + clen;
    if (name.endsWith('/')) continue; // folder entries are rebuilt on save
    const start = local + 30 + v.getUint16(local + 26, true) + v.getUint16(local + 28, true);
    entries.push({ name, method, start, size: csize });
  }
  const roots = entries.filter((e) => !e.name.includes('/') && /\.js$/i.test(e.name));
  const pick = roots.find((e) => e.name.toLowerCase() === 'handler.js') ?? roots[0];
  if (!pick) return null;
  const read = async (e: (typeof entries)[number]) => {
    const raw = new Uint8Array(buf, e.start, e.size);
    if (e.method === 0) return raw.slice();
    if (e.method === 8) return inflate(raw);
    return null;
  };
  const handlerBytes = await read(pick);
  if (!handlerBytes) return null;
  const files: PackageFile[] = [];
  const unreadable: string[] = [];
  for (const e of entries) {
    if (e === pick) continue;
    const data = await read(e);
    if (data) files.push({ name: e.name, data });
    else unreadable.push(e.name);
  }
  return { handler: utf8.decode(handlerBytes), handlerName: pick.name, files, unreadable };
}

/** A package with the handler as handler.js and the other files, plus an entry for each folder. */
export function buildPackage(handler: string, files: PackageFile[]): Uint8Array {
  const dirs = new Set<string>();
  for (const f of files) {
    const parts = f.name.split('/');
    for (let i = 1; i < parts.length; i++) dirs.add(parts.slice(0, i).join('/') + '/');
  }
  return zipStore([
    { name: 'handler.js', data: new TextEncoder().encode(handler) },
    ...[...dirs].sort().map((name) => ({ name, data: new Uint8Array(0) })),
    ...files.filter((f) => f.name.toLowerCase() !== 'handler.js' && !f.remote), // placeholders have no content to save
  ]);
}

// --- kept with the draft in this browser, so a reload doesn't lose them
const KEY = 'nucleus-workbench-package-files';
const b64 = (d: Uint8Array) => {
  let s = '';
  for (let i = 0; i < d.length; i += 0x8000) s += String.fromCharCode(...d.subarray(i, i + 0x8000));
  return btoa(s);
};
const unb64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
/** Saves the files for the current draft; false when they're too big for the browser to keep. */
export function storeFiles(files: PackageFile[], key = KEY): boolean {
  try {
    if (!files.length) return localStorage.removeItem(key), true;
    localStorage.setItem(key, JSON.stringify(files.map((f) => (f.remote ? [f.name, '', f.remote] : [f.name, b64(f.data)]))));
    return true;
  } catch {
    try {
      localStorage.removeItem(key);
    } catch {}
    return false;
  }
}
export function storedFiles(key = KEY): PackageFile[] {
  try {
    return (JSON.parse(localStorage.getItem(key) || '[]') as [string, string, PackageFile['remote']?][]).map(([name, d, remote]) => (remote ? { name, data: new Uint8Array(0), remote } : { name, data: unb64(d) }));
  } catch {
    return [];
  }
}

export const fileSize = (n: number) => (n < 1024 ? `${n} B` : n < 1048576 ? `${Math.round(n / 1024)} KB` : `${(n / 1048576).toFixed(1)} MB`);
