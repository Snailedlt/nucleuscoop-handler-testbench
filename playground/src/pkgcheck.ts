// The package checks live in the core (splitscreenme-vscode src/core/pkgcheck.ts), shared with VS Code, the CLI and
// `nucleus lsp`; this file adds what only the workbench needs (file badges, editor modes).
export * from '@core/pkgcheck';
import type { FileKind } from '@core/pkgcheck';

/** A short label for the file icon (shown as text, not only colour). */
export const BADGE: Record<FileKind, string> = { js: 'JS', ini: 'INI', cfg: 'CFG', json: '{ }', xml: 'XML', txt: 'TXT', bat: 'BAT', ps1: 'PS', lua: 'LUA', reg: 'REG', vdf: 'VDF', toml: 'TML', yaml: 'YML', dll: 'DLL', exe: 'EXE', img: 'IMG', bin: 'BIN' };
/** CodeMirror mode for editable files. */
export const MODE: Partial<Record<FileKind, unknown>> = { js: 'javascript', ini: 'properties', cfg: 'properties', json: { name: 'javascript', json: true }, xml: 'xml', toml: 'toml', yaml: 'yaml', txt: null, bat: 'nucleus-batch', ps1: 'powershell', lua: 'lua', reg: 'properties', vdf: 'nucleus-vdf' };

