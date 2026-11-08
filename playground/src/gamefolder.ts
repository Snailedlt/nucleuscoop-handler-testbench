// The game's install folder in the workbench: the checks themselves are in the core (splitscreenme-vscode
// src/core/gamefolder.ts, shared with VS Code); this file reads a folder the author picks and draws the list pickers.
export * from '@core/gamefolder';
import { type FolderList, type GameFolder, MAX_DEPTH, MAX_ENTRIES, type PickOption, SKIP_DIRS, engineFacts, findExe, folderLists, folderSummary, insertEntry, pickerOptions, join, base } from '@core/gamefolder';
const lower = (s: string) => s.toLowerCase();
// ---------------------------------------------------------------------------------------------------------------
// Reading a folder (DOM).

interface FsHandle { kind: 'file' | 'directory'; name: string }
interface FsFileHandle extends FsHandle { kind: 'file'; getFile(): Promise<File> }
interface FsDirHandle extends FsHandle { kind: 'directory'; values(): AsyncIterable<FsFileHandle | FsDirHandle> }
type DirPicker = (o: { mode: 'read'; id?: string }) => Promise<FsDirHandle>;

async function walkHandle(root: FsDirHandle): Promise<GameFolder> {
  const files: GameFolder['files'] = [], dirs: string[] = [];
  let count = 0, truncated = false;
  const queue: { h: FsDirHandle; path: string; depth: number }[] = [{ h: root, path: '', depth: 0 }];
  while (queue.length) { // breadth first: the top folders are complete before a limit cuts deep ones
    const { h, path, depth } = queue.shift()!;
    const pending: Promise<void>[] = [];
    for await (const e of h.values()) {
      if (++count > MAX_ENTRIES) { truncated = true; break; }
      const p = join(path, e.name);
      if (e.kind === 'directory') {
        if (SKIP_DIRS.has(lower(e.name))) continue;
        dirs.push(p);
        if (depth + 1 < MAX_DEPTH) queue.push({ h: e, path: p, depth: depth + 1 }); else truncated = true;
      } else {
        // getFile() gives the File's metadata (size); its content is never read.
        pending.push(e.getFile().then((f) => { files.push({ path: p, size: f.size }); }, () => { files.push({ path: p, size: 0 }); }));
      }
    }
    await Promise.all(pending);
    if (truncated && count > MAX_ENTRIES) break;
  }
  files.sort((a, b) => a.path.localeCompare(b.path));
  dirs.sort((a, b) => a.localeCompare(b));
  return { name: root.name, files, dirs, truncated: truncated || undefined };
}

function fromFileList(list: FileList): GameFolder | null {
  if (!list.length) return null;
  const files: GameFolder['files'] = [], dirs = new Set<string>();
  let name = '', truncated = false;
  for (const f of Array.from(list)) {
    const parts = ((f as File & { webkitRelativePath?: string }).webkitRelativePath || f.name).split('/');
    if (!name) name = parts.length > 1 ? parts[0] : '';
    const inside = parts.length > 1 ? parts.slice(1) : parts;
    if (inside.slice(0, -1).some((d) => SKIP_DIRS.has(lower(d)))) continue;
    if (inside.length > MAX_DEPTH) { truncated = true; continue; }
    if (files.length >= MAX_ENTRIES) { truncated = true; break; }
    for (let i = 1; i < inside.length; i++) dirs.add(inside.slice(0, i).join('/'));
    files.push({ path: inside.join('/'), size: f.size });
  }
  files.sort((a, b) => a.path.localeCompare(b.path));
  return { name: name || 'Game folder', files, dirs: [...dirs].sort((a, b) => a.localeCompare(b)), truncated: truncated || undefined };
}

function pickWithInput(): Promise<GameFolder | null> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.setAttribute('webkitdirectory', '');
    input.multiple = true;
    input.hidden = true;
    input.setAttribute('aria-hidden', 'true');
    document.body.appendChild(input);
    let done = false;
    const finish = (v: GameFolder | null) => { if (done) return; done = true; input.remove(); resolve(v); };
    input.addEventListener('change', () => finish(input.files ? fromFileList(input.files) : null));
    input.addEventListener('cancel', () => finish(null));
    input.click();
  });
}

/**
 * Asks for the game's install folder and lists it (names, relative paths, sizes; no content).
 * Resolves null when the person cancels. Pass the handler text to fill `exe`.
 */
export async function pickGameFolder(handlerText?: string): Promise<GameFolder | null> {
  const picker = (window as unknown as { showDirectoryPicker?: DirPicker }).showDirectoryPicker;
  let folder: GameFolder | null = null;
  if (picker) {
    try {
      folder = await walkHandle(await picker({ mode: 'read', id: 'nucleus-game-folder' }));
    } catch (e) {
      if ((e as DOMException)?.name === 'AbortError') return null;
      folder = await pickWithInput(); // e.g. SecurityError inside a sandboxed frame
    }
  } else folder = await pickWithInput();
  if (folder && handlerText) folder.exe = findExe(handlerText, folder);
  return folder;
}

// ---------------------------------------------------------------------------------------------------------------
// Summary (HTML string).

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export function folderSummaryHtml(folder: GameFolder, handlerText: string): string {
  const sum = folderSummary(folder, handlerText);
  const loc = sum;
  const facts = sum.facts;
  const total = sum.bytes;
  const gb = total >= 1 << 30 ? `${(total / (1 << 30)).toFixed(1)} GB` : `${Math.max(1, Math.round(total / (1 << 20)))} MB`;
  const exeName = sum.exeName;
  const exeRow = loc.exe
    ? `<code>${esc(loc.exe)}</code>`
    : exeName ? `<span class="gf-bad">${esc(exeName)} not found</span>` : '<span class="muted">Game.ExecutableName not set</span>';
  const rootRow = loc.root === undefined ? '<span class="muted">unknown (the exe is missing, or the root is above this folder)</span>' : `<code>${esc(loc.root ? `${folder.name}/${loc.root}` : folder.name)}</code>`;
  return `<section class="gf-summary" aria-label="Your game on this PC">
<div class="gf-head"><span class="gf-ico" aria-hidden="true">📁</span><b class="gf-name">${esc(folder.name)}</b><span class="muted">${folder.files.length.toLocaleString('en')} files, ${folder.dirs.length.toLocaleString('en')} folders, ${gb}</span></div>
${folder.truncated ? '<p class="gf-note">Very large or deep folder: only part of it was listed, so some checks are skipped.</p>' : ''}
<dl class="gf-dl"><dt>Executable</dt><dd>${exeRow}</dd><dt>Game root</dt><dd>${rootRow}</dd></dl>
${facts.length ? `<ul class="gf-facts">${facts.map((f) => `<li><b>${esc(f.title)}</b>: ${esc(f.text)}</li>`).join('')}</ul>` : ''}
<p class="gf-privacy muted">Only the names and sizes are kept, in this tab. Nothing is uploaded and no file is opened.</p>
<div class="gf-actions"><button type="button" class="btn" data-gf="pick">Pick another folder…</button><button type="button" class="btn" data-gf="forget">Forget folder</button></div>
</section>`;
}

// ---------------------------------------------------------------------------------------------------------------
// The "+" pickers in the editor (CodeMirror 5).

type CM = any; // CodeMirror 5 (untyped in this project)
let menuSeq = 0;

export function initFolderPickers(editor: CM, getFolder: () => GameFolder | null, onPick?: () => void): { refresh: () => void; close: () => void } {
  let marks: { clear: () => void }[] = [];
  let timer = 0;
  let menu: HTMLElement | null = null;
  let offDoc: ((e: PointerEvent) => void) | null = null;
  const closeMenu = () => {
    menu?.remove(); menu = null;
    if (offDoc) { document.removeEventListener('pointerdown', offDoc); offDoc = null; }
  };
  const draw = () => {
    marks.forEach((m) => m.clear());
    marks = [];
    const text: string = editor.getValue();
    const folder = getFolder();
    for (const l of folderLists(text)) {
      const what = l.kind === 'names' || l.kind === 'root-files' ? 'file' : l.kind === 'root-dirs' ? 'folder' : 'file or folder';
      const add = document.createElement('button');
      add.type = 'button';
      add.className = `wm-add gf-add${folder ? '' : ' gf-nofolder'}`;
      add.textContent = '+';
      add.title = folder ? `Add a ${what} from ${folder.name}` : 'Pick the game folder to add its files';
      add.setAttribute('aria-label', folder ? `Add a ${what} to Game.${l.option}` : `Pick the game folder to add entries to Game.${l.option}`);
      add.setAttribute('aria-haspopup', 'dialog');
      add.addEventListener('mousedown', (e) => e.preventDefault()); // keep the editor's selection
      add.addEventListener('click', () => openMenu(add, l));
      marks.push(editor.setBookmark(editor.posFromIndex(l.close), { widget: add, insertLeft: true }));
    }
  };
  const place = (anchor: HTMLElement) => {
    if (!menu) return;
    const r = anchor.getBoundingClientRect();
    menu.style.left = `${Math.max(8, Math.min(r.left, window.innerWidth - menu.offsetWidth - 8))}px`;
    menu.style.top = r.bottom + 6 + menu.offsetHeight < window.innerHeight ? `${r.bottom + 6}px` : `${Math.max(8, r.top - menu.offsetHeight - 6)}px`;
  };
  function openMenu(anchor: HTMLElement, list: FolderList) {
    closeMenu();
    const folder = getFolder();
    const id = `gf-menu-${++menuSeq}`;
    menu = document.createElement('div');
    menu.className = 'gf-menu';
    menu.id = id;
    menu.setAttribute('role', 'dialog');
    menu.setAttribute('aria-labelledby', `${id}-h`);
    document.getElementById('tip')?.setAttribute('hidden', '');
    const back = () => { closeMenu(); anchor.focus(); };
    if (!folder) {
      menu.innerHTML = `<div class="gf-menu-h" id="${id}-h">Game.${esc(list.option)}</div>
<p class="gf-menu-p">Pick the game's install folder to choose from its files. Only names and sizes are read; nothing is uploaded.</p>
<button type="button" class="btn primary gf-pick">Pick the game folder…</button>`;
      document.body.appendChild(menu);
      place(anchor);
      const b = menu.querySelector<HTMLButtonElement>('.gf-pick')!;
      b.focus();
      b.addEventListener('click', () => { closeMenu(); onPick?.(); });
      menu.addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.preventDefault(); back(); } });
    } else {
      const opts = pickerOptions(editor.getValue(), list, folder);
      const what = list.kind === 'root-dirs' ? 'folders' : list.kind === 'exe-entries' ? 'entries next to the exe' : 'files';
      const hint = list.kind === 'names' ? 'Nucleus matches every file whose name contains the entry, in any folder.'
        : list.kind === 'exe-entries' ? 'Paths from the executable\'s folder.' : 'Paths from the game folder.';
      menu.innerHTML = `<div class="gf-menu-h" id="${id}-h">Add to Game.${esc(list.option)} <span class="muted">(${esc(folder.name)})</span></div>
<input type="search" class="gf-q" role="combobox" aria-expanded="true" aria-autocomplete="list" aria-controls="${id}-l" aria-label="Search ${esc(what)}" placeholder="Search ${esc(what)}…" autocomplete="off" spellcheck="false">
<ul class="gf-list" id="${id}-l" role="listbox" aria-label="${esc(what[0].toUpperCase() + what.slice(1))} in ${esc(folder.name)}"></ul>
<p class="gf-menu-f muted" id="${id}-f">${esc(hint)}</p>`;
      document.body.appendChild(menu);
      const q = menu.querySelector<HTMLInputElement>('.gf-q')!;
      const ul = menu.querySelector<HTMLUListElement>('.gf-list')!;
      q.setAttribute('aria-describedby', `${id}-f`);
      const LIMIT = 200;
      let shown: PickOption[] = [];
      let active = -1;
      const setActive = (i: number) => {
        const lis = ul.querySelectorAll<HTMLLIElement>('li[role="option"]');
        lis.forEach((li, k) => li.setAttribute('aria-selected', String(k === i)));
        active = i;
        const li = lis[i];
        if (li) { q.setAttribute('aria-activedescendant', li.id); li.scrollIntoView({ block: 'nearest' }); } else q.removeAttribute('aria-activedescendant');
      };
      const render = () => {
        const term = lower(q.value.trim());
        const all = term ? opts.filter((o) => lower(o.label).includes(term)) : opts;
        // Exact and start-of-name matches first.
        if (term) all.sort((a, b) => Number(!lower(base(a.label.replace(/\/$/, ''))).startsWith(term)) - Number(!lower(base(b.label.replace(/\/$/, ''))).startsWith(term)));
        shown = all.slice(0, LIMIT);
        ul.innerHTML = shown.map((o, k) => `<li role="option" id="${id}-o${k}" data-k="${k}" aria-selected="false"${o.present ? ' aria-disabled="true"' : ''}><span class="gf-l">${esc(o.label)}</span>${o.present ? '<span class="gf-tag">in the list</span>' : ''}${o.detail ? `<small>${esc(o.detail)}</small>` : ''}</li>`).join('')
          + (all.length > LIMIT ? `<li class="gf-more" role="presentation">${all.length - LIMIT} more: type to narrow</li>` : '')
          + (!all.length ? `<li class="gf-more" role="presentation">No ${esc(what)} match</li>` : '');
        setActive(shown.findIndex((o) => !o.present));
      };
      const choose = (k: number) => {
        const o = shown[k];
        if (!o || o.present) return;
        const text: string = editor.getValue();
        const fresh = folderLists(text).find((l) => l.option === list.option && Math.abs(l.open - list.open) < 8) ?? list;
        const ins = insertEntry(text, fresh, o.value);
        editor.replaceRange(ins.text, editor.posFromIndex(ins.at));
        closeMenu();
        editor.focus();
      };
      const step = (d: number) => {
        if (!shown.length) return;
        let i = active;
        for (let n = 0; n < shown.length; n++) { i = (i + d + shown.length) % shown.length; if (!shown[i].present) break; }
        setActive(i);
      };
      q.addEventListener('input', render);
      q.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); step(1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); step(-1); }
        else if (e.key === 'Home' && e.ctrlKey) { e.preventDefault(); setActive(0); step(0); }
        else if (e.key === 'Enter') { e.preventDefault(); choose(active); }
        else if (e.key === 'Escape') { e.preventDefault(); if (q.value) { q.value = ''; render(); } else back(); }
        else if (e.key === 'Tab') { closeMenu(); }
      });
      ul.addEventListener('mousedown', (e) => e.preventDefault()); // keep focus in the search box
      ul.addEventListener('click', (e) => {
        const li = (e.target as HTMLElement).closest<HTMLLIElement>('li[data-k]');
        if (li) choose(Number(li.dataset.k));
      });
      render();
      place(anchor);
      q.focus();
    }
    setTimeout(() => {
      offDoc = (e: PointerEvent) => { if (menu && !menu.contains(e.target as Node) && e.target !== anchor) closeMenu(); };
      document.addEventListener('pointerdown', offDoc);
    }, 0);
  }
  editor.on('change', () => { clearTimeout(timer); timer = window.setTimeout(draw, 150); });
  draw();
  return { refresh: () => { closeMenu(); draw(); }, close: closeMenu };
}
