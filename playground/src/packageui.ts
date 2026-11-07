// A handler package in the workbench: the Files panel (the package as Nucleus installs it), file tabs above the
// code, a second editor for its text files (ini, cfg, json, xml…, with highlighting and checks) and a card for
// binaries. handler.js stays in the main editor, so everything that reads "the handler" keeps reading it.
import CodeMirror from 'codemirror';
import 'codemirror/mode/properties/properties';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/toml/toml';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/powershell/powershell';
import 'codemirror/mode/lua/lua';
// Steam's KeyValues files (.vdf, .acf): "key" "value" pairs in { } blocks, // comments.
CodeMirror.defineMode('nucleus-vdf', () => ({
  startState: () => ({ key: true }),
  token: (stream: any, state: any) => {
    if (stream.sol()) state.key = true;
    if (stream.eatSpace()) return null;
    if (stream.match('//')) { stream.skipToEnd(); return 'comment'; }
    if (stream.match(/^"(?:[^"\\]|\\.)*"?/)) { const k = state.key; state.key = !k; return k ? 'property' : 'string'; }
    if (stream.match(/^[{}]/)) { state.key = true; return 'bracket'; }
    if (stream.match(/^\[[^\]]*\]/)) return 'meta';
    stream.next();
    return null;
  },
  lineComment: '//',
}));
// Batch files (.bat, .cmd): rem / :: comments, :labels, %VARS% and %~dp0, "strings", @echo and the common commands.
CodeMirror.defineMode('nucleus-batch', () => ({
  startState: () => ({}),
  token: (stream: any) => {
    if (stream.sol()) {
      stream.eatSpace();
      if (stream.match(/^(rem\b|::)/i)) { stream.skipToEnd(); return 'comment'; }
      if (stream.match(/^:[\w.-]+/)) return 'def';
      if (stream.match('@')) return 'meta';
    }
    if (stream.eatSpace()) return null;
    if (stream.match(/^%~?[\w]*%?|^![\w]+!/)) return 'variable-2';
    if (stream.match(/^"(?:[^"]|"")*"?/)) return 'string';
    if (stream.match(/^(echo|off|on|set|setlocal|endlocal|if|else|not|exist|errorlevel|defined|for|in|do|goto|call|exit|start|cd|pushd|popd|copy|xcopy|move|del|mkdir|md|rmdir|rd|timeout|pause|shift|choice|powershell|cmd|taskkill|reg)\b/i)) return 'keyword';
    if (stream.match(/^-\w+|^\/\w+/)) return 'attribute';
    if (stream.match(/^\d+\b/)) return 'number';
    if (stream.match(/^[&|<>()=]+/)) return 'operator';
    stream.next();
    return null;
  },
  lineComment: 'rem',
}));
import type { PackageFile } from './package';
import { fileSize, sizeOf } from './package';
import { BADGE, bytesOf, checkFileText, checkPackage, gameFolderName, installPath, kindOf, MODE, textOf, type PkgProblem } from './pkgcheck';

type CM = any;
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const $ = (s: string) => document.querySelector(s) as HTMLElement;
export const fileIcon = (name: string) => { const k = kindOf(name); return `<span class="fi-badge fi-${k}" aria-hidden="true">${BADGE[k]}</span>`; };

export interface PkgHost {
  editor: CM;
  getFiles(): PackageFile[];
  /** Replaces the package's files (store them, update the header). */
  setFiles(files: PackageFile[]): void;
  /** Called when the main editor should show again (the host re-applies Code / Form). */
  showMain(): void;
  /** Called when the package's problems may have changed. */
  changed(): void;
  /** Optional: HTML for a section under the package (the game on this PC), and its clicks ([data-gf]). */
  extraSection?(): string;
  onExtra?(act: string): void;
}

export function initPackageUI(host: PkgHost) {
  let active: string | null = null; // null: handler.js
  let open: string[] = [];
  let fileEd: CM = null;
  const docs = new Map<string, { doc: CM; enc: ReturnType<typeof textOf> extends infer T ? (T extends { enc: infer E } ? E : never) : never }>();
  let saveTimer = 0;
  let blobUrl = '';

  const files = () => host.getFiles();
  const handler = () => host.editor.getValue() as string;

  function ensureEditor() {
    if (fileEd) return fileEd;
    fileEd = CodeMirror($('#file-editor'), {
      lineNumbers: true, indentUnit: 2, tabSize: 2, lineWrapping: false,
      gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers'],
      lint: { getAnnotations: (text: string) => (active ? checkFileText(active, text) : []).map((p) => ({ from: CodeMirror.Pos((p.line ?? 1) - 1, 0), to: CodeMirror.Pos((p.line ?? 1) - 1, 999), message: `${p.title}. ${p.why}`, severity: p.severity })), delay: 300 },
    } as any);
    fileEd.on('change', () => {
      clearTimeout(saveTimer);
      saveTimer = window.setTimeout(() => {
        if (!active) return;
        const d = docs.get(active);
        if (!d) return;
        host.setFiles(files().map((f) => (f.name === active && !f.remote ? { name: f.name, data: bytesOf(fileEd.getValue(), d.enc) } : f)));
        host.changed();
      }, 350);
    });
    return fileEd;
  }

  function show(which: 'main' | 'text' | 'card') {
    $('#file-editor').hidden = which !== 'text';
    $('#file-card').hidden = which !== 'card';
    if (which === 'main') host.showMain();
    else { $('#editor').hidden = true; $('#formview').hidden = true; }
  }

  function openFile(name: string, line?: number) {
    const f = files().find((x) => x.name === name);
    if (!f) return showHandler();
    if (!open.includes(name)) open.push(name);
    active = name;
    if (f.remote) {
      renderRemoteCard(f);
      show('card');
      return render();
    }
    const t = textOf(f.data);
    if (t) {
      const ed = ensureEditor();
      let d = docs.get(name);
      if (!d) { d = { doc: CodeMirror.Doc(t.text, MODE[kindOf(name)] ?? null), enc: t.enc }; docs.set(name, d); }
      show('text');
      ed.swapDoc(d.doc);
      ed.refresh();
      (ed as any).performLint?.();
      if (line) { ed.setCursor(line - 1, 0); ed.scrollIntoView({ line: line - 1, ch: 0 }, 80); }
      ed.focus();
    } else {
      renderCard(f);
      show('card');
    }
    render();
  }
  function showHandler() {
    active = null;
    show('main');
    render();
  }

  function renderCard(f: PackageFile) {
    const k = kindOf(f.name);
    const to = installPath(f.name, gameFolderName(handler()));
    const base = f.name.split('/').pop()!;
    const uses = handler().split('\n').map((l, i) => (l.toLowerCase().includes(base.toLowerCase()) ? i + 1 : 0)).filter(Boolean);
    if (blobUrl) URL.revokeObjectURL(blobUrl);
    blobUrl = k === 'img' ? URL.createObjectURL(new Blob([f.data as BlobPart])) : '';
    $('#file-card').innerHTML = `<h2>${fileIcon(f.name)}${esc(base)}</h2>
      <dl><dt>In the package</dt><dd>${esc(f.name)}</dd><dt>Size</dt><dd>${fileSize(f.data.length)}</dd>
      <dt>Installs to</dt><dd>${to ? `<code>${esc(to)}</code>` : '<span style="color:var(--warn)">nowhere: files at the top level are dropped by a Hub install</span>'}</dd>
      <dt>Used by handler.js</dt><dd>${uses.length ? uses.slice(0, 6).map((n) => `<button class="link" type="button" data-line="${n}">line ${n}</button>`).join(', ') : '<span class="muted">not by name</span>'}</dd></dl>
      ${blobUrl ? `<img src="${blobUrl}" alt="${esc(base)}">` : `<p class="muted">A ${k === 'dll' ? 'library (DLL)' : k === 'exe' ? 'program' : 'binary file'}: it can't be edited here, only kept, replaced or removed.</p>`}
      <div class="fp-actions"><button class="btn" type="button" data-card="download">Download</button><button class="btn" type="button" data-card="remove">Remove from the package</button></div>`;
    $('#file-card').querySelectorAll<HTMLButtonElement>('[data-line]').forEach((b) => b.addEventListener('click', () => {
      showHandler();
      const pos = { line: Number(b.dataset.line) - 1, ch: 0 };
      host.editor.setCursor(pos); host.editor.scrollIntoView(pos, 80); host.editor.focus();
    }));
    $('#file-card').querySelector('[data-card=download]')!.addEventListener('click', () => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([f.data as BlobPart]));
      a.download = base;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    });
    $('#file-card').querySelector('[data-card=remove]')!.addEventListener('click', () => removeFile(f.name));
  }

  // A file of a Hub package that's too big to bring along: what it is, and where the original is.
  function renderRemoteCard(f: PackageFile) {
    const to = installPath(f.name, gameFolderName(handler()));
    const base = f.name.split('/').pop()!;
    $('#file-card').innerHTML = `<h2>${fileIcon(f.name)}${esc(base)} <span class="chip info fp-hub">Hub</span></h2>
      <p>In the Hub package, not downloaded here (${fileSize(f.remote!.size)}). <a href="${esc(f.remote!.url)}" target="_blank" rel="noopener">Get the original package from the Hub</a>.</p>
      <dl><dt>In the package</dt><dd>${esc(f.name)}</dd><dt>Size</dt><dd>${fileSize(f.remote!.size)}</dd>
      <dt>Installs to</dt><dd>${to ? `<code>${esc(to)}</code>` : '<span style="color:var(--warn)">nowhere: files at the top level are dropped by a Hub install</span>'}</dd></dl>
      <p class="muted">Saving this package leaves it out: add your own copy (Add files…) to save it with the handler.</p>
      <div class="fp-actions"><button class="btn" type="button" data-card="remove">Remove from the package</button></div>`;
    $('#file-card').querySelector('[data-card=remove]')!.addEventListener('click', () => removeFile(f.name));
  }

  function removeFile(name: string) {
    host.setFiles(files().filter((f) => f.name !== name));
    docs.delete(name);
    open = open.filter((n) => n !== name);
    if (active === name) showHandler();
    else render();
    host.changed();
  }
  function moveFile(from: string, to: string) {
    host.setFiles(files().map((f) => (f.name === from ? { ...f, name: to } : f)));
    const d = docs.get(from);
    if (d) { docs.delete(from); docs.set(to, d); }
    open = open.map((n) => (n === from ? to : n));
    if (active === from) active = to;
    render();
    host.changed();
  }
  async function addFiles(list: FileList | File[]) {
    const tops = [...new Set(files().filter((f) => f.name.includes('/')).map((f) => f.name.split('/')[0]))];
    const folder = tops[0] ?? gameFolderName(handler());
    const added: PackageFile[] = [];
    for (const file of [...list]) {
      const rel = ((file as File & { webkitRelativePath?: string }).webkitRelativePath || file.name).replace(/\\/g, '/');
      added.push({ name: `${folder}/${rel}`, data: new Uint8Array(await file.arrayBuffer()) });
    }
    const names = new Set(added.map((a) => a.name.toLowerCase()));
    host.setFiles([...files().filter((f) => !names.has(f.name.toLowerCase())), ...added]);
    render();
    host.changed();
    if (added[0]) openFile(added[0].name);
  }

  function render() {
    const fs = files();
    // The Files button: how many files besides handler.js.
    $('#files-n').textContent = fs.length ? String(fs.length) : '';
    // File tabs: handler.js and the files you opened.
    open = open.filter((n) => fs.some((f) => f.name === n));
    const strip = $('#file-strip');
    strip.hidden = !open.length;
    strip.innerHTML = [`<button type="button" class="fs-tab" role="tab" data-fs="" aria-selected="${active === null}">${fileIcon('handler.js')}handler.js</button>`,
      ...open.map((n) => `<button type="button" class="fs-tab" role="tab" data-fs="${esc(n)}" aria-selected="${active === n}" title="${esc(n)}">${fileIcon(n)}${esc(n.split('/').pop()!)}<span class="fs-x" data-fs-close="${esc(n)}" aria-hidden="true">×</span></button>`)].join('');
    // The Files panel: the package as installed.
    const panel = $('#files-panel');
    if (panel.hidden) return;
    const game = gameFolderName(handler());
    const sorted = [...fs].sort((a, b) => (a.name.includes('/') === b.name.includes('/') ? a.name.localeCompare(b.name) : a.name.includes('/') ? 1 : -1));
    const seenDirs = new Set<string>();
    const rows: string[] = [`<li class="fp-item"><button type="button" class="fp-open" data-fp="" aria-current="${active === null}">${fileIcon('handler.js')}<span class="fp-name">handler.js</span></button></li>`];
    for (const f of sorted) {
      const parts = f.name.split('/');
      for (let i = 1; i < parts.length; i++) {
        const dir = parts.slice(0, i).join('/');
        if (!seenDirs.has(dir)) { seenDirs.add(dir); rows.push(`<li class="fp-dir" style="padding-left:${6 + (i - 1) * 14}px"><span class="fi-badge fi-dir" aria-hidden="true">▾</span>${esc(parts[i - 1])}/</li>`); }
      }
      const depth = parts.length - 1;
      rows.push(`<li class="fp-item${depth ? '' : ' dropped'}"><button type="button" class="fp-open" data-fp="${esc(f.name)}" aria-current="${active === f.name}" style="padding-left:${6 + depth * 14}px" title="${esc(depth ? `Installs to ${installPath(f.name, game)}` : 'At the top level: a Hub install drops it')}">${fileIcon(f.name)}<span class="fp-name">${esc(parts[parts.length - 1])}</span>${f.remote ? '<span class="fp-hub" title="In the Hub package, not downloaded here">Hub</span>' : ''}<span class="fp-size">${fileSize(sizeOf(f))}</span></button><button type="button" class="fp-del" data-fp-del="${esc(f.name)}" aria-label="Remove ${esc(f.name)}">×</button></li>`);
    }
    $('#files-list').innerHTML = `<div class="fp-head">Package</div><p class="fp-where">Installs to <code>handlers\\${esc(game)}\\</code></p><ul class="fp-list">${rows.join('')}</ul>
      <div class="fp-actions"><button class="btn" type="button" data-fp-add>Add files…</button></div>
      <div class="fp-drop">Drop files here to add them to the package${fs.length ? '' : ', next to handler.js'}.</div>${host.extraSection?.() ?? ''}`;
  }

  // Events
  $('#files-toggle').addEventListener('click', () => {
    const panel = $('#files-panel');
    panel.hidden = !panel.hidden;
    $('#files-toggle').setAttribute('aria-pressed', String(!panel.hidden));
    render();
    requestAnimationFrame(() => (host.editor.refresh(), fileEd?.refresh()));
  });
  $('#file-strip').addEventListener('click', (e) => {
    const close = (e.target as HTMLElement).closest<HTMLElement>('[data-fs-close]');
    if (close) { open = open.filter((n) => n !== close.dataset.fsClose); if (active === close.dataset.fsClose) showHandler(); else render(); return; }
    const tab = (e.target as HTMLElement).closest<HTMLElement>('[data-fs]');
    if (tab) tab.dataset.fs ? openFile(tab.dataset.fs) : showHandler();
  });
  const picker = document.createElement('input');
  picker.type = 'file'; picker.multiple = true; picker.hidden = true;
  document.body.append(picker);
  picker.addEventListener('change', () => { if (picker.files?.length) void addFiles(picker.files); picker.value = ''; });
  const panel = $('#files-panel');
  panel.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    const del = t.closest<HTMLElement>('[data-fp-del]');
    if (del) return removeFile(del.dataset.fpDel!);
    if (t.closest('[data-fp-add]')) return picker.click();
    const gf = t.closest<HTMLElement>('[data-gf]');
    if (gf) return host.onExtra?.(gf.dataset.gf!);
    const o = t.closest<HTMLElement>('[data-fp]');
    if (o) o.dataset.fp ? openFile(o.dataset.fp) : showHandler();
  });
  panel.addEventListener('dragover', (e) => { e.preventDefault(); e.stopPropagation(); });
  panel.addEventListener('drop', (e) => { e.preventDefault(); e.stopPropagation(); if (e.dataTransfer?.files.length) void addFiles(e.dataTransfer.files); });

  render();
  return {
    render,
    openFile,
    showHandler,
    moveFile,
    active: () => active,
    /** Back to handler.js without touching the main editor (the host shows it). */
    deselect() { active = null; $('#file-editor').hidden = true; $('#file-card').hidden = true; render(); },
    /** A different handler (tab): back to its handler.js, files closed. */
    reset() { active = null; open = []; docs.clear(); show('main'); render(); },
    problems: (): PkgProblem[] => checkPackage(handler(), files()),
  };
}
