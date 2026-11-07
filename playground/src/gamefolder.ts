// The game's install folder, picked by the author, checked against the handler's paths (issue #6).
// Only names, relative paths and sizes are read; no file content, nothing leaves the browser.
// The checks follow how Nucleus itself resolves each option (file:line in the Nucleus Master sources):
// - Game root: the folder of the exe the user picked, with Game.BinariesFolder removed from its path as text
//   (GenericGameHandler.cs:385-396, StringUtil.ReplaceCaseInsensitive / GetRootFromBinariesFolder).
// - FileSymlinkExclusions / FileSymlinkCopyInstead: lower-cased, then compared with every file NAME in every
//   linked folder by "contains" (GenericGameHandler.cs:839-860, WinDirectoryUtil.cs:41 and :59).
// - DirSymlinkExclusions / DirSymlinkCopyInstead / DirExclusions: paths relative to the game root, compared with
//   Windows paths as text (WinDirectoryUtil.cs:114-127; DirSymlinkCopyInstead also Directory.Exists, :900).
// - SymlinkFiles, CopyFiles: relative to the game root (GenericContext.cs:280, GenericGameHandler.cs:764).
// - ExecutableContext: relative to the exe's folder, each must exist or the handler doesn't match (GameManager.cs:130-140).
// - ExecutableName / ExecutableNames: matched against the picked file's name, any case (GameManager.cs:110, :119).
// - Context.RootFolder / OrigRootFolder: the game root (instance / original); Context.RootInstallFolder: the
//   exe's folder (GenericGameHandler.cs:1274-1276).
// The pure part (scan, checks, list helpers) has no DOM or @core import, so Node tests can bundle it alone.

export interface GameFolder {
  /** The picked folder's own name. */
  name: string;
  /** Files, relative to the picked folder, with "/". */
  files: { path: string; size: number }[];
  /** Folders, relative to the picked folder, with "/". */
  dirs: string[];
  /** The executable the handler names, if found when picking (checks look it up again from the handler). */
  exe?: string;
  /** True when the walk stopped at a limit (entries or depth): some files are missing from the lists. */
  truncated?: boolean;
}

export interface FolderFix { title: string; text: string; start: number; end: number }
export interface FolderProblem {
  start: number;
  end: number;
  severity: 'error' | 'warning' | 'info';
  title: string;
  why: string;
  fix?: FolderFix;
}

const MAX_ENTRIES = 30000;
const MAX_DEPTH = 8;
const SKIP_DIRS = new Set(['.git', '.svn', '.hg', '__pycache__', 'node_modules', '$recycle.bin', 'system volume information']);

// ---------------------------------------------------------------------------------------------------------------
// Text scanning: string literals and a copy of the text with comments and string contents blanked.

interface StrTok { start: number; end: number; value: string; quote: string }
interface Scan { masked: string; strings: StrTok[] }

function scan(text: string): Scan {
  const out = text.split('');
  const strings: StrTok[] = [];
  let i = 0;
  let prev = ''; // last significant character outside comments/strings, for the regex-or-divide guess
  const blank = (a: number, b: number) => { for (let k = a; k < b; k++) if (out[k] !== '\n' && out[k] !== '\r') out[k] = ' '; };
  while (i < text.length) {
    const c = text[i], n = text[i + 1];
    if (c === '/' && n === '/') { const e = text.indexOf('\n', i); const end = e < 0 ? text.length : e; blank(i, end); i = end; continue; }
    if (c === '/' && n === '*') { const e = text.indexOf('*/', i + 2); const end = e < 0 ? text.length : e + 2; blank(i, end); i = end; continue; }
    if (c === '"' || c === "'") {
      let j = i + 1, v = '';
      while (j < text.length && text[j] !== c && text[j] !== '\n') {
        if (text[j] === '\\' && j + 1 < text.length) {
          const e = text[j + 1];
          v += e === 'n' ? '\n' : e === 't' ? '\t' : e === 'r' ? '\r' : e;
          j += 2;
        } else v += text[j++];
      }
      const end = Math.min(j + 1, text.length);
      strings.push({ start: i, end, value: v, quote: c });
      blank(i + 1, end - 1);
      i = end; prev = c; continue;
    }
    if (c === '/' && (prev === '' || '(,=:[!&|?{};+-*%<>~^'.includes(prev))) { // a regex literal
      let j = i + 1, cls = false;
      while (j < text.length && text[j] !== '\n') {
        if (text[j] === '\\') { j += 2; continue; }
        if (text[j] === '[') cls = true; else if (text[j] === ']') cls = false; else if (text[j] === '/' && !cls) break;
        j++;
      }
      blank(i + 1, j);
      i = j + 1; prev = '/'; continue;
    }
    if (!/\s/.test(c)) prev = c;
    i++;
  }
  return { masked: out.join(''), strings };
}

const sameMember = (a: string, b: string) => a.length === b.length && a[0].toLowerCase() === b[0].toLowerCase() && a.slice(1) === b.slice(1); // Jint: first char any case

/** Brace depth at each offset (0: top level, where Nucleus' load-time options are set). */
function topLevel(s: Scan): (at: number) => boolean {
  const marks: number[] = []; // offsets where the depth changes to/from 0
  let d = 0;
  for (let i = 0; i < s.masked.length; i++) {
    const c = s.masked[i];
    if (c === '{') { if (d === 0) marks.push(i); d++; } else if (c === '}' && d > 0) { d--; if (d === 0) marks.push(i); }
  }
  return (at) => { let n = 0; for (const m of marks) { if (m >= at) break; n++; } return n % 2 === 0; };
}

/** `Game.<name> = "…"`: the string assigned when the handler loads (the last top-level one; else the first anywhere). */
function scalar(s: Scan, name: string): StrTok | undefined {
  let top: StrTok | undefined, any: StrTok | undefined;
  const isTop = topLevel(s);
  for (const m of s.masked.matchAll(/\bGame\s*\.\s*([A-Za-z_$][\w$]*)\s*=(?![=>])\s*/g)) {
    if (!sameMember(m[1], name)) continue;
    const at = m.index! + m[0].length;
    const t = s.strings.find((x) => x.start === at);
    if (!t) continue;
    any ??= t;
    if (isTop(m.index!)) top = t;
  }
  return top ?? any;
}

/** An array literal assigned to a Game option, with its string entries. */
export interface FolderList {
  /** The option name as Nucleus spells it, e.g. "FileSymlinkExclusions". */
  option: string;
  kind: ListKind;
  /** Offsets of `[` and `]`. */
  open: number;
  close: number;
  items: { start: number; end: number; value: string }[];
  /** The quote the entries use (for inserting). */
  quote: string;
}
/** names: compared with file names; root-dirs / root-files: paths from the game root; exe-entries: from the exe's folder. */
export type ListKind = 'names' | 'root-dirs' | 'root-files' | 'exe-entries';

const LIST_OPTIONS: Record<string, ListKind> = {
  FileSymlinkExclusions: 'names',
  FileSymlinkCopyInstead: 'names',
  DirSymlinkExclusions: 'root-dirs',
  DirSymlinkCopyInstead: 'root-dirs',
  DirExclusions: 'root-dirs',
  SymlinkFiles: 'root-files',
  CopyFiles: 'root-files',
  ExecutableContext: 'exe-entries',
};

function listsIn(s: Scan): FolderList[] {
  const out: FolderList[] = [];
  for (const m of s.masked.matchAll(/\bGame\s*\.\s*([A-Za-z_$][\w$]*)\s*=(?![=>])\s*\[/g)) {
    const option = Object.keys(LIST_OPTIONS).find((o) => sameMember(m[1], o));
    if (!option) continue;
    const open = m.index! + m[0].length - 1;
    let depth = 0, close = -1;
    const starts = new Map(s.strings.map((t) => [t.start, t]));
    const items: FolderList['items'] = [];
    for (let k = open; k < s.masked.length; k++) {
      const ch = s.masked[k];
      if (ch === '[') depth++;
      else if (ch === ']') { depth--; if (depth === 0) { close = k; break; } }
      else if (depth === 1 && starts.has(k)) { const t = starts.get(k)!; items.push({ start: t.start, end: t.end, value: t.value }); }
    }
    if (close < 0) continue;
    const first = items[0] && s.strings.find((t) => t.start === items[0].start);
    out.push({ option, kind: LIST_OPTIONS[option], open, close, items, quote: first?.quote ?? '"' });
  }
  return out;
}

/** The lists the folder picker can add to, in the handler text. */
export const folderLists = (handlerText: string): FolderList[] => listsIn(scan(handlerText));

// ---------------------------------------------------------------------------------------------------------------
// Folder helpers.

const lower = (s: string) => s.toLowerCase();
const base = (p: string) => p.slice(p.lastIndexOf('/') + 1);
const dirOf = (p: string) => (p.includes('/') ? p.slice(0, p.lastIndexOf('/')) : '');
const norm = (p: string) => p.replace(/\\/g, '/').replace(/\/{2,}/g, '/').replace(/^\.?\//, '').replace(/\/+$/, '');
const join = (a: string, b: string) => (a ? (b ? `${a}/${b}` : a) : b);
const under = (p: string, root: string) => (root ? lower(p).startsWith(lower(root) + '/') : true);
const rel = (p: string, root: string) => (root ? p.slice(root.length + 1) : p);
const winPath = (p: string) => p.replace(/\//g, '\\');

function lev(a: string, b: string): number {
  if (Math.abs(a.length - b.length) > 8) return 99;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[b.length];
}
/** The closest candidate (any case), only when close enough to be a likely typo. */
function closest(want: string, candidates: Iterable<string>): string | undefined {
  const w = lower(want);
  let best: string | undefined, bestD = Infinity;
  for (const c of candidates) {
    const d = lev(w, lower(c));
    if (d < bestD) { bestD = d; best = c; }
  }
  return best !== undefined && bestD > 0 && bestD <= Math.max(2, Math.floor(w.length / 4)) ? best : undefined;
}

interface Located {
  /** The exe the handler names (path in the folder), if found. */
  exe?: string;
  exeDir?: string;
  /** The game root relative to the picked folder; undefined when it can't be told (exe missing, or above the folder). */
  root?: string;
  binaries?: StrTok;
}

function locate(s: Scan, folder: GameFolder): Located {
  const nameTok = scalar(s, 'ExecutableName');
  const names = new Set<string>();
  if (nameTok?.value) names.add(lower(nameTok.value));
  for (const m of s.masked.matchAll(/\bGame\s*\.\s*([A-Za-z_$][\w$]*)\s*=(?![=>])\s*\[([^\]]*)\]/g)) {
    if (!sameMember(m[1], 'ExecutableNames')) continue;
    const a = m.index! + m[0].indexOf('['), b = m.index! + m[0].length;
    for (const t of s.strings) if (t.start > a && t.end <= b && t.value) names.add(lower(t.value));
  }
  const hits = folder.files.filter((f) => names.has(lower(base(f.path)))).sort((a, b) => a.path.split('/').length - b.path.split('/').length || a.path.localeCompare(b.path));
  const binaries = scalar(s, 'BinariesFolder');
  if (!hits.length) return { binaries };
  const exe = hits[0].path, exeDir = dirOf(exe);
  if (!binaries?.value) return { exe, exeDir, root: exeDir, binaries };
  const pathFix = /\bGame\s*\.\s*[Bb]inariesFolderPathFix\s*=\s*true\b/.test(s.masked);
  const dirWin = winPath(exeDir);
  if (pathFix) { // StringUtil.GetRootFromBinariesFolder: the path up to the first part equal to BinariesFolder's first part
    const first = lower(binaries.value.split('\\')[0]);
    const parts = exeDir ? exeDir.split('/') : [];
    const i = parts.findIndex((p) => lower(p) === first);
    return { exe, exeDir, root: i >= 0 ? parts.slice(0, i).join('/') : undefined, binaries };
  }
  // StringUtil.ReplaceCaseInsensitive on the exe's (Windows) folder path: the first occurrence removed, as text.
  const at = lower(dirWin).indexOf(lower(binaries.value));
  if (at < 0) return { exe, exeDir, root: undefined, binaries };
  const left = dirWin.slice(0, at), right = dirWin.slice(at + binaries.value.length);
  if (right.replace(/\\/g, '') !== '') return { exe, exeDir, root: undefined, binaries }; // not a suffix: unclear
  return { exe, exeDir, root: norm(left), binaries };
}

/** The exe the handler names, found in the folder (shallowest first), if any. */
export function findExe(handlerText: string, folder: GameFolder): string | undefined {
  return locate(scan(handlerText), folder).exe;
}

// ---------------------------------------------------------------------------------------------------------------
// Engine facts (from the folder alone).

export interface EngineFact { id: 'unity' | 'unreal' | 'steam' | 'xinput' | 'dinput8'; title: string; text: string }

export function engineFacts(folder: GameFolder): EngineFact[] {
  const out: EngineFact[] = [];
  const files = folder.files.map((f) => f.path);
  const dirSet = new Set(folder.dirs.map(lower));
  const named = (re: RegExp) => files.filter((p) => re.test(base(p)));
  const list = (ps: string[]) => ps.slice(0, 3).map((p) => p).join(', ') + (ps.length > 3 ? ` and ${ps.length - 3} more` : '');

  const unityDll = named(/^unityplayer\.dll$/i);
  const unityData = folder.dirs.filter((d) => /_Data$/i.test(base(d)) && (dirSet.has(lower(d) + '/managed') || dirSet.has(lower(d) + '/il2cpp_data') || files.some((f) => lower(f) === lower(d) + '/globalgamemanagers')));
  if (unityDll.length || unityData.length) {
    const mono = unityData.some((d) => dirSet.has(lower(d) + '/managed'));
    const il2 = named(/^gameassembly\.dll$/i).length > 0;
    out.push({
      id: 'unity', title: 'Unity game',
      text: `Found ${list([...unityDll, ...unityData.map((d) => d + '/')])}${mono ? ' (Mono scripting backend: _Data/Managed)' : il2 ? ' (IL2CPP: GameAssembly.dll)' : ''}. Unity players accept -screen-fullscreen 0, -screen-width and -screen-height on the command line; handlers commonly pass them in Context.StartArguments.`,
    });
  }
  const shipping = named(/-Win64-Shipping\.exe$/i);
  const ueBin = folder.dirs.filter((d) => /(^|\/)Engine\/Binaries$/i.test(d));
  if (shipping.length || ueBin.length) {
    out.push({
      id: 'unreal', title: 'Unreal Engine game',
      text: `Found ${list([...shipping, ...ueBin.map((d) => d + '/')])}. The game itself is usually <Project>/Binaries/Win64/<Project>-Win64-Shipping.exe (a top-level exe is often only a launcher); handlers for Unreal games commonly name that exe in Game.ExecutableName and its folder in Game.BinariesFolder, and pass -windowed -ResX= -ResY=.`,
    });
  }
  const steam = named(/^steam_api(64)?\.dll$/i);
  if (steam.length) {
    out.push({
      id: 'steam', title: 'Steam API DLL',
      text: `Found ${list(steam)}. With Game.UseGoldberg, Nucleus replaces every steam_api*.dll under the game root in each instance with Goldberg's emulator (SteamFunctions.cs, Directory.GetFiles(rootFolder, "steam_api*.dll", AllDirectories)).`,
    });
  }
  const xi = named(/^xinput(1_[34]|9_1_0)\.dll$/i);
  if (xi.length) {
    out.push({
      id: 'xinput', title: 'The game ships an XInput DLL',
      text: `Found ${list(xi)}. Nucleus' own xinput1_3.dll (Game.Hook.CustomDllEnabled) is kept out of linking and placed in the instance instead, so the game's copy is replaced there.`,
    });
  }
  const di = named(/^dinput8\.dll$/i);
  if (di.length) {
    out.push({
      id: 'dinput8', title: 'A dinput8.dll in the game folder',
      text: `Found ${list(di)}. A dinput8.dll next to a game is often a mod or plugin loader (an ASI loader, a widescreen fix) rather than part of the game; it is linked into every instance like the other files.`,
    });
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------
// The checks.

const KNOWN_EXT = /\.(ini|cfg|json|txt|xml|dll|exe|dat|sav)$/i;
// Files Nucleus (or its Goldberg / hook setup) creates itself: never expected in the game folder.
const NUCLEUS_MADE = /(^|\/)(steam_settings|settings)(\/|$)|(^|\/)(steam_appid\.txt|local_save\.txt|account_name\.txt|user_steam_id\.txt|language\.txt|steam_interfaces\.txt|ncoop\.ini|xinput1_[34]\.dll|xinput9_1_0\.dll|dinput8?\.dll|[^/]*nucleus[^/]*)$/i;
// A line that creates, copies, moves, deletes or tests a file: a missing file there is expected.
const MAKES_FILES = /\b(Write\w*|Create\w*|Copy\w*|Move\w*|Delete\w*|Exists|Writer|Replace\w*|ModifySaveFile|IniFile)\b/;

function lineAt(text: string, at: number) {
  const a = text.lastIndexOf('\n', at - 1) + 1, b = text.indexOf('\n', at);
  return text.slice(a, b < 0 ? text.length : b);
}
const inner = (t: { start: number; end: number }) => ({ start: t.start + 1, end: Math.max(t.start + 1, t.end - 1) });
const srcEscape = (v: string) => v.replace(/\\/g, '\\\\');
const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;

export function checkAgainstFolder(handlerText: string, folder: GameFolder): FolderProblem[] {
  const s = scan(handlerText);
  const out: FolderProblem[] = [];
  const loc = locate(s, folder);
  const fname = folder.name;
  const where = (d: string) => (d ? `${fname}/${d}` : fname);

  // Game.ExecutableName
  const exeTok = scalar(s, 'ExecutableName');
  if (exeTok?.value && !loc.exe) {
    const exes = folder.files.filter((f) => /\.exe$/i.test(f.path));
    const near = closest(exeTok.value, new Set(exes.map((f) => base(f.path))));
    const biggest = [...exes].filter((f) => !/^(unins|crash|vc_?redist|dxsetup|ue4prereq|unitycrashhandler|setup|launcher)/i.test(base(f.path))).sort((a, b) => b.size - a.size).slice(0, 3).map((f) => f.path);
    out.push({
      ...inner(exeTok), severity: 'warning',
      title: 'The executable is not in the game folder',
      why: `Nucleus adds the game by matching this file name, in any case, with the exe the player picks. ${fname} has no file named ${exeTok.value}${folder.truncated ? ' (not every file was listed: the folder is very large)' : ''}.`
        + (near ? ` Did you mean ${near}?` : biggest.length ? ` Its largest executables: ${biggest.join(', ')}.` : ' It has no .exe at all: is it the install folder?'),
      fix: near ? { title: `Use ${near}`, text: near, ...inner(exeTok) } : undefined,
    });
  } else if (exeTok?.value && loc.exe && loc.exeDir && !loc.binaries?.value) {
    const stmtEnd = handlerText.indexOf('\n', exeTok.end);
    const at = stmtEnd < 0 ? handlerText.length : stmtEnd;
    out.push({
      ...inner(exeTok), severity: 'info',
      title: `Found in ${loc.exeDir}`,
      why: `Nucleus finds the exe by its name, and without Game.BinariesFolder it treats the exe's own folder (${where(loc.exeDir)}) as the game folder: only that folder is linked into the instances, and the paths in the symlink lists start there. If the game needs the folders above it, Game.BinariesFolder = "${srcEscape(winPath(loc.exeDir))}" makes ${fname} the game folder (when ${fname} is the install folder).`,
      fix: { title: 'Add Game.BinariesFolder', text: `${handlerText[at - 1] === '\r' ? '\r\n' : '\n'}Game.BinariesFolder = "${srcEscape(winPath(loc.exeDir))}";`, start: at, end: at },
    });
  }

  // Game.BinariesFolder
  const bin = loc.binaries;
  if (bin?.value && loc.exe) {
    if (bin.value.includes('/')) {
      out.push({
        ...inner(bin), severity: 'warning',
        title: 'Game.BinariesFolder with "/"',
        why: 'Nucleus removes this text from the exe\'s folder path, which is a Windows path with backslashes, so a "/" never matches and the exe\'s folder stays the game folder. Write the folders with \\\\ (a backslash, escaped).',
        fix: { title: 'Use backslashes', text: srcEscape(bin.value.replace(/\//g, '\\')), ...inner(bin) },
      });
    } else if (loc.root === undefined && loc.exeDir) {
      out.push({
        ...inner(bin), severity: 'warning',
        title: 'Game.BinariesFolder is not in the exe\'s path',
        why: `The exe is in ${where(loc.exeDir)}, whose path doesn't contain "${bin.value}" as its last folders. Nucleus would then use the exe's folder as the game folder. Game.BinariesFolder is the exe's folder, relative to the game's root folder.`,
        fix: { title: `Use ${winPath(loc.exeDir)}`, text: srcEscape(winPath(loc.exeDir)), ...inner(bin) },
      });
    }
  }

  const root = loc.root;
  const rootFiles = root === undefined ? folder.files : folder.files.filter((f) => under(f.path, root));
  const rootNames = new Set(rootFiles.map((f) => base(f.path)));
  const rootDirs = root === undefined ? [] : folder.dirs.filter((d) => under(d, root) && lower(d) !== lower(root)).map((d) => rel(d, root));
  const rootFileRel = root === undefined ? [] : rootFiles.map((f) => rel(f.path, root));

  for (const l of listsIn(s)) {
    const opt = `Game.${l.option}`;
    for (const it of l.items) {
      const v = it.value;
      if (!v || !v.trim()) continue;
      const r = inner(it);
      if (l.kind === 'names') {
        if (/[\\/]/.test(v)) {
          out.push({ ...r, severity: 'warning', title: `A path in ${opt}`,
            why: `Nucleus compares each entry with file names only, never with their folders, so an entry with a folder in it matches nothing. Every file whose name contains "${base(norm(v))}" is matched, in any folder.`,
            fix: { title: `Use ${base(norm(v))}`, text: srcEscape(base(norm(v))), ...r } });
          continue;
        }
        if (NUCLEUS_MADE.test(v)) continue;
        const lv = lower(v);
        const hits = [...rootNames].filter((n) => lower(n).includes(lv));
        if (!hits.length) {
          const near = closest(v, rootNames);
          out.push({ ...r, severity: near ? 'warning' : 'info', title: 'Not in the game folder',
            why: `No file name in ${where(root ?? '')} contains "${v}" (Nucleus matches ${opt} by "the name contains it", in any case).${near ? ` Did you mean ${near}?` : ' Fine if the handler adds this file itself.'}`,
            fix: near ? { title: `Use ${near}`, text: srcEscape(near), ...r } : undefined });
        } else if (/\.[a-z0-9]{1,5}$/i.test(v)) {
          const others = hits.filter((n) => lower(n) !== lv);
          if (others.length && others.length < hits.length) out.push({ ...r, severity: 'info', title: `Also matches ${plural(others.length, 'other file')}`,
            why: `Nucleus applies ${opt} to every file whose name contains "${v}": also ${others.slice(0, 4).join(', ')}${others.length > 4 ? ', …' : ''}.` });
        }
      } else if (root !== undefined && (l.kind === 'root-dirs' || l.kind === 'root-files')) {
        const p = norm(v);
        const pool = l.kind === 'root-dirs' ? rootDirs : rootFileRel;
        const found = pool.some((d) => lower(d) === lower(p));
        if (l.kind === 'root-files' && NUCLEUS_MADE.test(p)) continue;
        if (!found) {
          const sameBase = pool.filter((d) => lower(base(d)) === lower(base(p)));
          const near = sameBase.length === 1 ? sameBase[0] : closest(p, pool);
          const what = l.kind === 'root-dirs' ? 'folder' : 'file';
          // A typo is likely when a close name exists; otherwise the game or the handler may create it later.
          out.push({ ...r, severity: near || l.kind === 'root-files' ? 'warning' : 'info', title: `${what === 'folder' ? 'Folder' : 'File'} not in the game folder`,
            why: `${opt} entries are paths from the game folder (${where(root)}), and it has no ${what} ${p}.${near ? ` Did you mean ${near}?` : l.kind === 'root-dirs' ? ' Fine if the game creates it when it runs.' : ''}${l.option === 'DirSymlinkCopyInstead' ? ' Nucleus skips a missing one.' : l.option === 'CopyFiles' ? ' Copying a missing file fails.' : ''}`,
            fix: near ? { title: `Use ${near}`, text: srcEscape(winPath(near)), ...r } : undefined });
        } else if (l.kind === 'root-dirs' && v.includes('/')) {
          out.push({ ...r, severity: 'warning', title: 'A nested folder written with "/"',
            why: `Nucleus compares ${opt} with each folder's Windows path as text, so with "/" the folders above it match but ${base(p)} itself doesn't. Write it with \\\\ (a backslash, escaped).`,
            fix: { title: 'Use backslashes', text: srcEscape(winPath(p)), ...r } });
        }
      } else if (l.kind === 'exe-entries' && loc.exe) {
        const ed = loc.exeDir ?? '';
        const p = join(ed, norm(v));
        const ok = folder.files.some((f) => lower(f.path) === lower(p)) || folder.dirs.some((d) => lower(d) === lower(p));
        if (!ok) {
          const pool = [...folder.files.map((f) => f.path), ...folder.dirs].filter((x) => dirOf(x) === ed || under(x, ed)).map((x) => rel(x, ed));
          const near = closest(norm(v), pool);
          out.push({ ...r, severity: 'warning', title: 'Not next to the executable',
            why: `Nucleus only matches this handler to the exe when every ${opt} entry exists in the exe's folder (${where(ed)}); ${v} doesn't.${near ? ` Did you mean ${near}?` : ''}`,
            fix: near ? { title: `Use ${near}`, text: srcEscape(winPath(near)), ...r } : undefined });
        }
      }
    }
  }

  // Path.Combine(Context.RootFolder, "a", "b.ini") and Context.RootFolder + "\\a\\b.ini"
  if (root !== undefined) {
    const bases: Record<string, string> = { RootFolder: root, OrigRootFolder: root, RootInstallFolder: loc.exeDir ?? root };
    const tokAt = new Map(s.strings.map((t) => [t.start, t]));
    const report = (toks: StrTok[], baseDir: string) => {
      const parts = toks.map((t) => norm(t.value)).filter(Boolean);
      if (!parts.length) return;
      const p = norm(parts.join('/'));
      const last = toks[toks.length - 1];
      if (!KNOWN_EXT.test(p) || NUCLEUS_MADE.test(p) || p.includes('..') || /[%*?<>|:]/.test(p)) return;
      if (MAKES_FILES.test(lineAt(handlerText, toks[0].start))) return;
      const full = join(baseDir, p);
      if (folder.files.some((f) => lower(f.path) === lower(full))) return;
      if (folder.truncated) return;
      const sameName = folder.files.filter((f) => under(f.path, baseDir) && lower(base(f.path)) === lower(base(p))).map((f) => rel(f.path, baseDir));
      const inDir = folder.files.filter((f) => lower(dirOf(f.path)) === lower(dirOf(full))).map((f) => base(f.path));
      const near = sameName.length === 1 ? sameName[0] : undefined;
      const nearName = near ? undefined : closest(base(p), inDir);
      out.push({ start: toks[0].start + 1, end: last.end - 1, severity: 'info', title: 'Not in the game folder',
        why: `${where(join(baseDir, dirOf(p)))} has no ${base(p)}.${near ? ` It is at ${near}.` : nearName ? ` Did you mean ${nearName}?` : ''} Fine if the handler or the game creates it.` });
    };
    for (const m of s.masked.matchAll(/\bPath\s*\.\s*Combine\s*\(\s*Context\s*\.\s*(RootFolder|OrigRootFolder|RootInstallFolder)\s*,/g)) {
      const toks: StrTok[] = [];
      let k = m.index! + m[0].length, ok = false;
      for (;;) {
        while (/\s/.test(s.masked[k] ?? '')) k++;
        const t = tokAt.get(k);
        if (!t) break;
        toks.push(t);
        k = t.end;
        while (/\s/.test(s.masked[k] ?? '')) k++;
        if (s.masked[k] === ',') { k++; continue; }
        if (s.masked[k] === ')') ok = true;
        break;
      }
      if (ok) report(toks, bases[m[1]]);
    }
    for (const m of s.masked.matchAll(/\bContext\s*\.\s*(RootFolder|OrigRootFolder|RootInstallFolder)\s*\+\s*/g)) {
      const t = tokAt.get(m.index! + m[0].length);
      if (!t) continue;
      const after = s.masked.slice(t.end).match(/^\s*(\S)/)?.[1];
      if (after === '+' || after === '.' || after === '[') continue; // more path follows, or a method call on the string
      if (!/^[\\/]/.test(t.value)) continue; // Nucleus' folders have no trailing backslash: without one it's a sibling name
      report([t], bases[m[1]]);
    }
  }

  // Engine facts: on Game.GameName, else on line 1.
  const gn = scalar(s, 'GameName');
  const anchor = gn ? inner(gn) : { start: 0, end: Math.max(1, handlerText.indexOf('\n') < 0 ? handlerText.length : handlerText.indexOf('\n')) };
  for (const f of engineFacts(folder)) out.push({ ...anchor, severity: 'info', title: `Game folder: ${f.title}`, why: f.text });

  return out;
}

// ---------------------------------------------------------------------------------------------------------------
// Picker options and inserting.

export interface PickOption { value: string; label: string; detail?: string; present: boolean }

/** What the "+" of a list offers, in the form Nucleus expects for that list. */
export function pickerOptions(handlerText: string, list: FolderList, folder: GameFolder): PickOption[] {
  const s = scan(handlerText);
  const loc = locate(s, folder);
  const root = loc.root ?? (loc.exe ? loc.exeDir ?? '' : '');
  const have = new Set(list.items.map((i) => lower(norm(i.value))));
  const sizeOf = (n: number) => (n >= 1 << 20 ? `${(n / (1 << 20)).toFixed(1)} MB` : n >= 1024 ? `${Math.round(n / 1024)} KB` : `${n} B`);
  if (list.kind === 'names') {
    const byName = new Map<string, { name: string; paths: string[]; size: number }>();
    for (const f of folder.files) {
      if (!under(f.path, root)) continue;
      const n = base(f.path), k = lower(n);
      const e = byName.get(k) ?? { name: n, paths: [], size: f.size };
      e.paths.push(rel(f.path, root));
      byName.set(k, e);
    }
    return [...byName.values()].sort((a, b) => a.name.localeCompare(b.name)).map((e) => ({
      value: e.name, label: e.name,
      detail: e.paths.length === 1 ? (dirOf(e.paths[0]) || '(game folder)') + ` · ${sizeOf(e.size)}` : `${e.paths.length} files with this name`,
      present: have.has(lower(e.name)),
    }));
  }
  if (list.kind === 'root-dirs') {
    return folder.dirs.filter((d) => under(d, root) && lower(d) !== lower(root)).map((d) => rel(d, root)).sort((a, b) => a.localeCompare(b))
      .map((d) => ({ value: winPath(d), label: d + '/', present: have.has(lower(d)) }));
  }
  if (list.kind === 'root-files') {
    return folder.files.filter((f) => under(f.path, root)).map((f) => ({ p: rel(f.path, root), size: f.size })).sort((a, b) => a.p.localeCompare(b.p))
      .map((f) => ({ value: winPath(f.p), label: f.p, detail: sizeOf(f.size), present: have.has(lower(f.p)) }));
  }
  const ed = loc.exeDir ?? '';
  const entries = [...folder.files.map((f) => f.path), ...folder.dirs.map((d) => d + '/')].filter((p) => dirOf(p.replace(/\/$/, '')) === ed);
  return entries.map((p) => rel(p.replace(/\/$/, ''), ed) + (p.endsWith('/') ? '/' : '')).sort((a, b) => a.localeCompare(b))
    .map((p) => ({ value: p.replace(/\/$/, ''), label: p, present: have.has(lower(p.replace(/\/$/, ''))) }));
}

/** The edit that adds a value to a list: quoted and escaped like its entries, comma-separated. */
export function insertEntry(handlerText: string, list: FolderList, value: string): { at: number; text: string } {
  const q = list.quote;
  const lit = q + value.replace(/\\/g, '\\\\').split(q).join('\\' + q) + q;
  const masked = scan(handlerText).masked;
  const body = masked.slice(list.open + 1, list.close);
  const trimmed = body.replace(/\s+$/, '');
  if (!trimmed.trim()) return { at: list.open + 1, text: lit };
  return { at: list.open + 1 + trimmed.length, text: trimmed.endsWith(',') ? ` ${lit}` : `, ${lit}` };
}

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
  const loc = locate(scan(handlerText), folder);
  const facts = engineFacts(folder);
  const total = folder.files.reduce((n, f) => n + f.size, 0);
  const gb = total >= 1 << 30 ? `${(total / (1 << 30)).toFixed(1)} GB` : `${Math.max(1, Math.round(total / (1 << 20)))} MB`;
  const exeName = scalar(scan(handlerText), 'ExecutableName')?.value;
  const exeRow = loc.exe
    ? `<code>${esc(loc.exe)}</code>`
    : exeName ? `<span class="gf-bad">${esc(exeName)} not found</span>` : '<span class="muted">Game.ExecutableName not set</span>';
  const rootRow = loc.root === undefined ? '<span class="muted">unknown (the exe is missing, or the root is above this folder)</span>' : `<code>${esc(loc.root ? `${folder.name}/${loc.root}` : folder.name)}</code>`;
  return `<section class="gf-summary" aria-label="Game folder">
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
