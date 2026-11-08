// Save into Nucleus: write the handler straight into Nucleus Co-op's handlers folder, laid out the way a Hub install
// puts it (handlers/<GameName>.js and handlers/<GameName>/…, installMap in core/pkgcheck.ts). Pick Nucleus' folder (or
// its handlers folder) once; the browser remembers it. Chrome and Edge can write into a folder; Firefox and Safari can't,
// so there the caller saves the .zip instead (Nucleus installs a .zip dropped onto its window).
import { gameFolderName, type PackageFile } from './pkgcheck';

type Dir = any; // FileSystemDirectoryHandle (not in every TS lib)
const DB = 'nucleus-workbench';
const STORE = 'handles';
const KEY = 'nucleus-folder';

/** Writing into a folder works here (Chrome, Edge; not Firefox, Safari, or a page inside a frame that blocks it). */
export const canSaveIntoFolder = () => typeof (window as any).showDirectoryPicker === 'function' && window.isSecureContext;

function db(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(STORE);
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}
async function remembered(): Promise<Dir | undefined> {
  try {
    const d = await db();
    return await new Promise((resolve) => {
      const g = d.transaction(STORE).objectStore(STORE).get(KEY);
      g.onsuccess = () => resolve(g.result);
      g.onerror = () => resolve(undefined);
    });
  } catch {
    return undefined;
  }
}
async function remember(h: Dir | undefined) {
  try {
    const d = await db();
    const t = d.transaction(STORE, 'readwrite').objectStore(STORE);
    if (h) t.put(h, KEY);
    else t.delete(KEY);
  } catch {
    /* not kept: asked again next time */
  }
}
/** The remembered folder's name, for the menu ("Into Nucleus Co-op (NucleusCoop)"). */
export async function rememberedName(): Promise<string | undefined> {
  return (await remembered())?.name;
}
export const forgetNucleusFolder = () => remember(undefined);

/** The handlers folder from what was picked: Nucleus' own folder (it has handlers/) or the handlers folder itself. */
async function handlersOf(picked: Dir): Promise<Dir | undefined> {
  if (picked.name.toLowerCase() === 'handlers') return picked;
  try {
    return await picked.getDirectoryHandle('handlers');
  } catch {
    return undefined;
  }
}

async function writeFile(dir: Dir, parts: string[], data: Uint8Array) {
  let d = dir;
  for (const p of parts.slice(0, -1)) d = await d.getDirectoryHandle(p, { create: true });
  const f = await d.getFileHandle(parts[parts.length - 1], { create: true });
  const w = await f.createWritable();
  await w.write(data);
  await w.close();
}

export type SaveResult =
  | { ok: true; folder: string; js: string; files: number; skipped: number }
  | { ok: false; reason: 'cancelled' | 'not-nucleus' | 'denied' | 'error'; message?: string };

/** Saves into Nucleus' handlers folder. `pick` asks for the folder even if one is remembered. */
export async function saveIntoNucleus(handler: string, files: PackageFile[], pick = false): Promise<SaveResult> {
  let root: Dir | undefined = pick ? undefined : await remembered();
  try {
    if (root && (await root.queryPermission?.({ mode: 'readwrite' })) !== 'granted' && (await root.requestPermission?.({ mode: 'readwrite' })) !== 'granted') root = undefined;
    if (!root) {
      root = await (window as any).showDirectoryPicker({ id: 'nucleus', mode: 'readwrite' });
    }
  } catch (e: any) {
    return e?.name === 'AbortError' ? { ok: false, reason: 'cancelled' } : { ok: false, reason: 'denied', message: e?.message };
  }
  const handlers = await handlersOf(root);
  if (!handlers) return { ok: false, reason: 'not-nucleus' };
  await remember(root);
  const game = gameFolderName(handler).replace(/\\/g, '') || 'handler';
  try {
    await writeFile(handlers, [`${game}.js`], new TextEncoder().encode(handler));
    let n = 0;
    let skipped = 0;
    for (const f of files) {
      const parts = f.name.split('/').filter((p) => p && p !== '.' && p !== '..');
      // As a Hub install: a top-level folder's contents go into handlers/<GameName>/; files at the root are dropped.
      if (parts.length < 2 || f.remote) {
        skipped++;
        continue;
      }
      await writeFile(handlers, [game, ...parts.slice(1)], f.data);
      n++;
    }
    return { ok: true, folder: root.name, js: `handlers\\${game}.js`, files: n, skipped };
  } catch (e: any) {
    return { ok: false, reason: 'error', message: e?.message };
  }
}
