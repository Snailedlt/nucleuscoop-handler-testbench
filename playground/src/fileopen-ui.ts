// Open a file from the computer, with the picker (Open a file…) or by dropping it on the page: a handler (.js), or
// a .zip/.nc package, whose other files are kept and saved with it.
import { $ } from './dom';
import { notice } from './toast';
import { readPackage, storeFiles, type PackageFile } from './package';

export interface FileOpenDeps {
  loadSource: (src: string, meta: { name: string; kind: 'draft' }) => void;
  setPackageFiles: (files: PackageFile[]) => void;
}

/** Wires the picker and drag & drop; returns the file input (its click opens the picker). */
export function initFileOpen(deps: FileOpenDeps): HTMLInputElement {
  async function openFile(file: File) {
    try {
      if (/\.(zip|nc)$/i.test(file.name)) {
        const pkg = await readPackage(await file.arrayBuffer());
        if (!pkg) {
          notice(`${file.name} doesn't contain a handler.js this page can read.`, { kind: 'error' });
          return;
        }
        deps.loadSource(pkg.handler.replace(/^﻿/, '').replace(/\r\n/g, '\n'), { name: file.name.replace(/\.(zip|nc)$/i, '.js'), kind: 'draft' });
        // The package's other files: kept, and saved with the handler.
        deps.setPackageFiles(pkg.files);
        const kept = storeFiles(pkg.files);
        const n = pkg.files.length;
        const lost = pkg.unreadable.length ? ` This browser couldn't unpack ${pkg.unreadable.join(', ')}, so saving won't include ${pkg.unreadable.length === 1 ? 'it' : 'them'}.` : '';
        // The "+ N files" chip shows the files; only what needs saying goes in a notice.
        if (!kept || lost) notice(`${kept ? '' : `The ${n} other file${n === 1 ? '' : 's'} are too big to keep after a reload: save before closing the page.`}${lost}`.trim(), { kind: 'warning' });
        return;
      }
      const text = await file.text();
      deps.loadSource(text.replace(/^﻿/, '').replace(/\r\n/g, '\n'), { name: file.name, kind: 'draft' });
    } catch {
      notice(`Couldn't read ${file.name}.`, { kind: 'error' });
    }
  }
  const fileInput = $('#file-input') as HTMLInputElement;
  $('#file-open').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => {
    const f = fileInput.files?.[0];
    if (f) openFile(f);
    fileInput.value = '';
  });
  const dropHint = $('#drop-hint');
  let dragDepth = 0;
  const hasFiles = (e: DragEvent) => !!e.dataTransfer && Array.from(e.dataTransfer.types).includes('Files');
  document.addEventListener('dragenter', (e) => {
    if (!hasFiles(e)) return;
    dragDepth++;
    dropHint.hidden = false;
  });
  document.addEventListener('dragleave', (e) => {
    if (!hasFiles(e)) return;
    dragDepth = Math.max(0, dragDepth - 1);
    if (!dragDepth) dropHint.hidden = true;
  });
  document.addEventListener('dragover', (e) => {
    if (hasFiles(e)) e.preventDefault();
  });
  document.addEventListener(
    'drop',
    (e) => {
      if (!hasFiles(e)) return;
      e.preventDefault();
      e.stopPropagation();
      dragDepth = 0;
      dropHint.hidden = true;
      const f = e.dataTransfer!.files[0];
      if (f) openFile(f);
    },
    true,
  );
  return fileInput;
}
