// Learn (learn/): chapters of short lessons, one new thing at a time. Every lesson is curated: its starting code is
// written here (often the last lesson's solution, but always the author's choice, never the learner's attempt).
// A code lesson shows what to add in a code block, has a task, and a check that reads the real problems (core lint)
// and what Try it says each player gets (core sim): done when check() returns null; otherwise it says what's missing.
// Pure: no DOM (learn.ts draws it); tools/workbench-units.test.mjs checks every lesson both ways.
//
// The first chapter builds the verified Hub handler for Sonic Robo Blast 2 (free, open source, a portable zip:
// srb2.org; Talos91's, tested with SRB2 2.2.15) line by line. The finished handler does exactly what that one does;
// only its name differs, so it doesn't replace the Hub one for someone who has both.
import { lint, type Diagnostic } from '@core/lint';
import { simulate, type SimResult } from '@core/sim';

export type NoteKind = 'pitfall' | 'why' | 'alt' | 'odd' | 'check';
export interface Note { kind: NoteKind; text: string }

export interface Lesson {
  /** Part of the lesson's link (learn/#<chapter>/<id>): never change it once published. */
  id: string;
  title: string;
  /** code: a task in the editor. intro: the interactive scene (the whole page). setup: steps, the whole page.
   *  test: steps in Nucleus Co-op, with the handler beside them. */
  kind: 'code' | 'intro' | 'setup' | 'test';
  /**
   * Short paragraphs; `code`, **bold** and [links](https://…) are shown as such. A paragraph that starts with ```js
   * is a code block: lines that start with "+ " are the ones to add (highlighted), "…" stands for code left out.
   */
  text: string[];
  /** Pitfalls, odd results, other ways, why this way: only where they help. Nucleus-specific, not general JS. */
  notes?: Note[];
  /** What to do, in one sentence (code lessons). */
  task?: string;
  /** The code the lesson starts from (and Reset goes back to). */
  start: string;
  /** Solve fills this in; the next lesson usually starts from it. */
  solution: string;
  check?(text: string): string | null;
  /** The one result pane this lesson shows under the code. */
  pane?: 'check' | 'tryit';
  /** test lessons: the steps, and what to download. */
  steps?: string[];
  download?: 'js' | 'zip';
  /** Checks (rule ids) this lesson leaves out of Check: about lines a later lesson adds. */
  allow?: string[];
  /** Once the task is done: "Try it in Nucleus Co-op now" (folded), with the code so far to download, what to do
   *  and what you should see. Working code early, as often as a handler allows. */
  checkpoint?: { download: 'js' | 'zip'; steps: string[]; see: string };
  /** test lessons: "what did you see?" and where each answer leads. */
  ask?: { question: string; answers: { label: string; reply: string }[] };
}

export interface Chapter { id: string; title: string; blurb: string; lessons: Lesson[] }

// ---------------------------------------------------------------------------------------------------------------
// Checks

const noComments = (t: string) => t.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:"'\\])\/\/[^\n]*/g, '$1');
const pathRe = (path: string) => path.replace(/\./g, '\\s*\\.\\s*');
/** The raw value text of `path = value;` at the top level, or undefined. */
function valueOf(t: string, path: string): string | undefined {
  const m = new RegExp(`^\\s*${pathRe(path)}\\s*=\\s*([\\s\\S]*?);?\\s*$`, 'm').exec(noComments(t));
  return m ? m[1].trim() : undefined;
}
const isTrue = (t: string, path: string) => valueOf(t, path) === 'true';
const isFalse = (t: string, path: string) => valueOf(t, path) === 'false';
const str = (t: string, path: string) => /^"([^"]*)"$/.exec(valueOf(t, path) ?? '')?.[1];
const num = (t: string, path: string) => { const v = valueOf(t, path); return v && /^\d+$/.test(v) ? Number(v) : undefined; };
/** The strings in a `path = [ … ];` list (it may span lines). */
function listOf(t: string, path: string): string[] | undefined {
  const m = new RegExp(`^\\s*${pathRe(path)}\\s*=\\s*\\[([\\s\\S]*?)\\]`, 'm').exec(noComments(t));
  return m ? [...m[1].matchAll(/"([^"]*)"/g)].map((x) => x[1]) : undefined;
}
/** The problems Check shows in a lesson: errors and warnings, minus the ones about lines still to come. */
export const problems = (text: string, l?: Lesson): Diagnostic[] => lint(text).filter((d) => (d.severity === 'error' || d.severity === 'warning') && !(l?.allow ?? []).includes(d.rule));
export const errors = (text: string) => lint(text).filter((d) => d.severity === 'error');
const firstProblem = (t: string) => { const e = problems(t)[0]; return e ? `Check shows a problem on line ${t.slice(0, e.start).split('\n').length}: ${e.message}` : null; };
/** Several `path = value` checks: null when all hold, else what's still to do. */
function wants(t: string, list: [string, 'true' | 'false' | string | number][]): string | null {
  const miss = list.filter(([p, v]) => (v === 'true' ? !isTrue(t, p) : v === 'false' ? !isFalse(t, p) : typeof v === 'number' ? num(t, p) !== v : str(t, p) !== v));
  if (miss.length) return `Still to add: ${miss.map(([p, v]) => `${p} = ${typeof v === 'string' && v !== 'true' && v !== 'false' ? `"${v}"` : v};`).join(' ')}`;
  return firstProblem(t);
}
/** Try it with 2 players: player 1 on the keyboard, player 2 on a controller. */
export const run = (text: string): SimResult => simulate(text, { players: 2, width: 1920, height: 1080, keyboardPlayer: 0 });
/** The lines a player's Game.Play writes into config.cfg, as `name "value"`. */
export function cfgLines(r: SimResult, player: number): string[] {
  const out: string[] = [];
  for (const c of r.players[player]?.calls ?? []) {
    if (!/^Context\.ReplaceLinesInTextFile\(/.test(c)) continue;
    for (const m of c.matchAll(/"-?\d+\|((?:[^"\\]|\\.)*)"/g)) out.push(m[1].replace(/\\"/g, '"').trim());
  }
  return out;
}
const sets = (lines: string[], name: string, value: string) => lines.includes(`${name} "${value}"`);
function playChecks(t: string, want: { player: number; name: string; value: string }[]): string | null {
  const e = firstProblem(t);
  if (e) return e;
  const r = run(t);
  if (!r.loaded) return `The handler doesn't load: ${r.loadError ?? 'see Check'}`;
  for (const w of want) if (!sets(cfgLines(r, w.player), w.name, w.value)) return `In Try it, player ${w.player + 1} should get ${w.name} "${w.value}".`;
  return null;
}

// ---------------------------------------------------------------------------------------------------------------
// Chapter 1: Making your first handler (Sonic Robo Blast 2)

/** A code block for the lesson text: `before` as context, `added` marked as the lines to add, `after` below. */
const block = (added: string, before = '', after = '') => '```js\n' + [before && before.replace(/\n$/, ''), added.replace(/^\n|\n$/g, '').split('\n').map((l) => `+ ${l}`).join('\n'), after && after.replace(/\n$/, '')].filter(Boolean).join('\n') + '\n```';

const TOP = '// SRB2 Tutorial: a handler for Sonic Robo Blast 2 (srb2.org)\n';
const NAME = 'Game.GUID = "SRB2 Tutorial";\nGame.GameName = "SRB2 Tutorial";\n';
const GAME_L = 'Game.ExecutableName = "srb2win.exe";\nGame.ExecutableContext = ["srb2.pk3"];\nGame.LauncherTitle = "";\n';
const GAME = '\n// The game\n' + GAME_L;
const PLAYERS_L = 'Game.MaxPlayers = 32;\nGame.MaxPlayersOneMonitor = 32;\n';
const PLAYERS = '\n// How many players\n' + PLAYERS_L;
const FOLDERS_L = 'Game.SymlinkGame = true;\nGame.SymlinkFolders = true;\nGame.SymlinkExe = false;\nGame.KeepSymLinkOnExit = true;\n';
const FOLDERS = '\n// A folder for each player\n' + FOLDERS_L;
const OTHER_COPIES = ['latest-log.txt', 'models.dat', 'music.dta', 'patch.pk3', 'player.dta', 'srb2.pk3', 'zones.pk3', 'SDL2.dll', 'SDL2_mixer_ext.dll'];
const copyList = (mine: string[]) => `Game.FileSymlinkCopyInstead = [\n${[...mine, ...OTHER_COPIES].map((f) => `  "${f}"`).join(',\n')}\n];\n`;
const EXCLUDE_L = 'Game.FileSymlinkExclusions = ["dinput8.dll", "xinput1_3.dll", "xinput1_4.dll"];\n';
const MINE = ['config.cfg', 'gamedata.dat', 'srb2sav1.ssg'];
const COPIES = '\n// Files each player gets a real copy of\n' + copyList(MINE) + EXCLUDE_L;
const FIND_L = 'Game.Hook.ForceFocusWindowName = "SRB2";\nGame.HasDynamicWindowTitle = true;\n';
const FIND = '\n// Finding the windows\n' + FIND_L;
const PLACE_L = 'Game.ResetWindows = true;\nGame.SetWindowHook = true;\nGame.WindowStyleValues = ["~0xC00000", "~0x40000", "~0x20000000", "~0x20000", "~0x80000", "0x40000000"];\nGame.ExtWindowStyleValues = ["~0x00000001", "~0x00000200", "~0x00020000"];\nGame.HideTaskbar = false;\nGame.NotTopMost = false;\n';
const PLACE = '\n// Placing the windows\n' + PLACE_L;
const FOCUS_L = 'Game.HookFocus = true;\nGame.Hook.ForceFocus = true;\n';
const FOCUS = '\n// Every window in focus\n' + FOCUS_L;
const TIMING_L = 'Game.PauseBetweenStarts = 25;\nGame.HandlerInterval = 100;\n';
const TIMING = '\n// Timing\n' + TIMING_L;
const INPUT_L = 'Game.SupportsKeyboard = true;\nGame.Hook.SDL2Enabled = true;\nGame.Hook.XInputEnabled = false;\nGame.Hook.XInputReroute = false;\nGame.Hook.DInputEnabled = false;\nGame.Hook.CustomDllEnabled = false;\nGame.NeedsSteamEmulation = false;\n';
const INPUT = '\n// Controllers and keyboard\n' + INPUT_L;
const DESCRIPTION_L = 'Game.Description = "IMPORTANT: Host a multiplayer LAN game in one instance and join in the others by writing localhost in the specify ipv4 address field, alt-tab between instances to use the keyboard. The game already has native split-screen for 2 players max but with this handler you can play with 4+.";\n';
const DESCRIPTION = '\n// What players read before they start\n' + DESCRIPTION_L;

// Game.Play, as the Hub handler has it.
const find = (search: string, newLine: string, plus = '') => `Context.FindLineNumberInTextFile(txtPath, ${search.includes('"') ? `'${search}'` : `"${search}"`}, Nucleus.SearchType.StartsWith)${plus} +\n${newLine}`;
/** A list item at `ind`, its second line indented one more step. */
const item = (l: string, ind: string) => ind + l.replace(/\n/g, `\n${ind}  `);
const MUSIC = find('playmusicifunfocused', `'|playmusicifunfocused "Yes" '`);
const SOUNDS = find('playsoundsifunfocused', `'|playsoundsifunfocused "Yes" '`);
const RENDERER = find('renderer', `'|renderer "Software"'`);
const FULLSCREEN = find('fullscreen', `'|fullscreen "No" '`);
const PAD2 = find('use_gamepad2', `'|use_gamepad2 "0"'`);
const PAD = find('use_gamepad2', `'|use_gamepad "' + Context.GamepadId + '"'`, ' + 1');
const MOUSE_OFF = find('use_mouse "On"', `'|use_mouse "Off" '`);
const PAUSE = find('pauseifunfocused', `'|pauseifunfocused "No" '`);
const FOCUSLOST = find('showfocuslost', `'|showfocuslost "No" '`);
const PLAY_OPEN = 'Game.Play = function () {\n  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\\\config.cfg";\n';
const dict = (lines: string[]) => `  var dict = [\n${lines.map((l) => item(l, '    ')).join(',\n')}\n  ];\n  Context.ReplaceLinesInTextFile(txtPath, dict);\n`;
const KB_L = `  if (Player.IsKeyboardPlayer) {\n    var dict = [\n${item(find('use_gamepad2', `'|use_gamepad "0"'`, ' + 1'), '      ')},\n${item(find('use_mouse "Off"', `'|use_mouse "On" '`), '      ')}\n    ];\n    Context.ReplaceLinesInTextFile(txtPath, dict);\n  }\n`;
const SDL_L = '  System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "SDL2.dll"), System.IO.Path.Combine(Context.RootFolder, "SDL2.dll"), true);\n';
const play = (lines: string[], kb = false, sdl = false) => `\n// Each player's settings, in their own config.cfg\n${PLAY_OPEN}${dict(lines)}${kb ? '\n' + KB_L : ''}${sdl ? '\n' + SDL_L : ''}};\n`;

const UP_TO = {
  name: TOP + NAME,
  game: TOP + NAME + GAME,
  players: TOP + NAME + GAME + PLAYERS,
  folders: TOP + NAME + GAME + PLAYERS + FOLDERS,
  copies: TOP + NAME + GAME + PLAYERS + FOLDERS + COPIES,
  find: TOP + NAME + GAME + PLAYERS + FOLDERS + COPIES + FIND,
  place: TOP + NAME + GAME + PLAYERS + FOLDERS + COPIES + FIND + PLACE,
  focus: TOP + NAME + GAME + PLAYERS + FOLDERS + COPIES + FIND + PLACE + FOCUS,
  timing: TOP + NAME + GAME + PLAYERS + FOLDERS + COPIES + FIND + PLACE + FOCUS + TIMING,
  input: TOP + NAME + GAME + PLAYERS + FOLDERS + COPIES + FIND + PLACE + FOCUS + TIMING + INPUT,
};
const WINDOW_SETTINGS = [RENDERER, FULLSCREEN];
const PAD_SETTINGS = [RENDERER, FULLSCREEN, PAD2, PAD, MOUSE_OFF];
const S_SETTINGS = UP_TO.input + play(WINDOW_SETTINGS);
const S_CONTROLLERS = UP_TO.input + play(PAD_SETTINGS);
const S_KEYBOARD = UP_TO.input + play(PAD_SETTINGS, true);
const S_SDL = UP_TO.input + play(PAD_SETTINGS, true, true);
/** What the first test gets: everything but the pause and sound settings (the bug lesson "focus-lost" finds). */
const FIRST_TEST = UP_TO.input + DESCRIPTION + play(PAD_SETTINGS, true, true);
/** The finished handler: what the verified Hub handler does, setting for setting. */
export const FINAL = UP_TO.input + DESCRIPTION + play([MUSIC, SOUNDS, ...PAD_SETTINGS, PAUSE, FOCUSLOST], true, true);

const SRB2 = 'https://www.srb2.org/download/';
const NUCLEUS = 'https://github.com/SplitScreen-Me/splitscreenme-nucleus/releases';
const lastLine = (s: string) => s.replace(/\n$/, '').split('\n').pop()!;

const FIRST: Lesson[] = [
  {
    id: 'why',
    title: 'Why a handler?',
    kind: 'intro',
    text: [
      'Nucleus Co-op lets several people play a game on one PC, each in their own window, even when the game was made for one player. It does that by starting **one copy of the game per player**.',
    ],
    start: '',
    solution: '',
  },
  {
    id: 'get-ready',
    title: 'Get ready: Nucleus Co-op and the game',
    kind: 'setup',
    text: [
      'You\'ll test your handler for real as you go, so set up the two programs first. You need a Windows PC. (Only reading along? Skip this: everything else runs in your browser.)',
      '**Nucleus Co-op** is the app that runs the copies. **Sonic Robo Blast 2** (SRB2) is the game: a free, open-source 3D Sonic game that runs on almost any PC, with keyboard or controllers.',
    ],
    steps: [
      'Download Nucleus Co-op (`NucleusApp.zip`) from its [releases page](' + NUCLEUS + ').',
      'Make a folder for it, like `C:\\NucleusCo-op`: not in Program Files, and not inside a game\'s folder. Add that folder to Microsoft Defender\'s exclusions: Nucleus\' hook DLLs are often flagged by mistake.',
      'Extract the zip into that folder with [7-Zip](https://www.7-zip.org/) (the password is `nucleus`), or run the `Installer.exe` from the release. Then start `NucleusCoop.exe`.',
      'Download SRB2 from [srb2.org](' + SRB2 + '): the **full game**, as a zip. Unzip it into a folder of its own, like `C:\\Games\\SRB2` (on the same drive as Nucleus is safest).',
      'Start `srb2win.exe` once on its own, then quit. That makes its settings file, `config.cfg`, which your handler changes later.',
    ],
    notes: [
      { kind: 'pitfall', text: 'Use 7-Zip or the installer, not Windows\' own "Extract all": the official guide says it can cause problems. More in the [installation guide](https://www.splitscreen.me/docs/installation).' },
    ],
    start: '',
    solution: '',
  },
  {
    id: 'name',
    title: 'Give it a name',
    kind: 'code',
    text: [
      'A handler is a small JavaScript file. Each line tells Nucleus one thing about the game, mostly by setting something on `Game`. You\'ll write the whole handler on the right, a few lines at a time.',
      'Start with its name. `Game.GUID` is the name of the folder Nucleus keeps this game\'s copies in, and `Game.GameName` is what you see in Nucleus\' list. Add these two lines under the comment:',
      block(NAME, TOP.trim()),
    ],
    task: 'Add the two lines (type them: suggestions pop up as you go, Tab or Enter takes one).',
    notes: [
      { kind: 'why', text: 'The GUID becomes a folder: `Nucleus Co-op\\content\\SRB2 Tutorial`. Keep it to letters, numbers and spaces, and don\'t change it later: a new GUID is a new folder, and Nucleus starts over.' },
    ],
    start: TOP + '\n',
    solution: UP_TO.name,
    allow: ['missing-required'],
    check: (t) => (str(t, 'Game.GUID') && str(t, 'Game.GameName') ? null : 'Both need a name in quotes, like Game.GUID = "SRB2 Tutorial";'),
    pane: 'check',
  },
  {
    id: 'game',
    title: 'Point it at the game',
    kind: 'code',
    text: [
      'Nucleus needs the game\'s program. When you add a game, it looks on your drives for the file in `Game.ExecutableName`. SRB2\'s is `srb2win.exe`.',
      'Many games share an .exe name, so `Game.ExecutableContext` lists files that sit next to the right one: SRB2 keeps its game data in `srb2.pk3`. And SRB2 starts straight away, with no launcher window, so `Game.LauncherTitle` stays empty.',
      block(GAME_L, lastLine(UP_TO.name) + '\n\n// The game'),
    ],
    task: 'Add the three lines under `// The game`.',
    notes: [
      { kind: 'check', text: 'Check (under the code) lists what Nucleus would refuse. Once these lines are in, it\'s empty: Nucleus can load your handler. Everything from here on makes it work well.' },
      { kind: 'pitfall', text: '`ExecutableContext` is a list, in square brackets, even with one file in it. A plain `"srb2.pk3"` isn\'t what Nucleus expects, and Check says so.' },
    ],
    start: UP_TO.name + '\n// The game\n',
    solution: UP_TO.game,
    check: (t) => {
      if ((str(t, 'Game.ExecutableName') ?? '').toLowerCase() !== 'srb2win.exe') return 'Add Game.ExecutableName = "srb2win.exe";';
      if (!(listOf(t, 'Game.ExecutableContext') ?? []).map((f) => f.toLowerCase()).includes('srb2.pk3')) return 'Add Game.ExecutableContext = ["srb2.pk3"]; (a list, in square brackets).';
      if (str(t, 'Game.LauncherTitle') !== '') return 'Add Game.LauncherTitle = "";';
      return firstProblem(t);
    },
    pane: 'check',
    checkpoint: {
      download: 'js',
      steps: [
        'Download your handler (the button below): `SRB2 Tutorial.js`.',
        'Rename it to `handler.js` and zip it: right-click › **Compress to ZIP file** (Windows 11), or **Send to › Compressed (zipped) folder**. That zip is what Nucleus installs.',
        'Drag the zip onto Nucleus Co-op\'s window. When it asks to add the game, say yes and pick `srb2win.exe` in your SRB2 folder.',
      ],
      see: '**SRB2 Tutorial** in Nucleus\' list of games, with SRB2 found. It doesn\'t do much yet: if you start it, expect the copies to sit on top of each other, or not to start at all. The next lessons fix that.',
    },
  },
  {
    id: 'players',
    title: 'How many players',
    kind: 'code',
    text: [
      '`Game.MaxPlayers` is how many players Nucleus lets you add. SRB2 is light enough for lots: the tested handler allows 32. `Game.MaxPlayersOneMonitor` is how many fit on one screen.',
      block(PLAYERS_L, lastLine(UP_TO.game) + '\n\n// How many players'),
    ],
    task: 'Add both lines.',
    notes: [
      { kind: 'odd', text: '`MaxPlayersOneMonitor` is only shown as information in Nucleus: it doesn\'t stop anyone adding more players to one screen.' },
      { kind: 'check', text: 'Write the number without quotes. `"32"` is text, and Check warns that Nucleus wants a number there.' },
    ],
    start: UP_TO.game + '\n// How many players\n',
    solution: UP_TO.players,
    check: (t) => wants(t, [['Game.MaxPlayers', 32], ['Game.MaxPlayersOneMonitor', 32]]),
    pane: 'check',
  },
  {
    id: 'folders',
    title: 'A folder for each player',
    kind: 'code',
    text: [
      'Two copies of a game in one folder get in each other\'s way. So Nucleus gives each player a folder of their own: `content\\SRB2 Tutorial\\Instance0`, `Instance1`, and so on.',
      'Copying the whole game for every player would be slow and fill your disk. `SymlinkGame` fills each folder with **links** to the real files instead: they look like the files but take no space. `SymlinkFolders` links whole folders the same way. `SymlinkExe = false` gives each player a real copy of the .exe, and `KeepSymLinkOnExit` keeps the folders when you close Nucleus, so the next start is quicker.',
      block(FOLDERS_L, lastLine(UP_TO.players) + '\n\n// A folder for each player'),
    ],
    task: 'Add the four lines.',
    notes: [
      { kind: 'pitfall', text: 'A link is the same file. Anything a game writes through one lands in the real game folder, shared by every player. The next lesson deals with that.' },
    ],
    start: UP_TO.players + '\n// A folder for each player\n',
    solution: UP_TO.folders,
    check: (t) => wants(t, [['Game.SymlinkGame', 'true'], ['Game.SymlinkFolders', 'true'], ['Game.SymlinkExe', 'false'], ['Game.KeepSymLinkOnExit', 'true']]),
    pane: 'check',
  },
  {
    id: 'copies',
    title: 'Files each player writes',
    kind: 'code',
    text: [
      'When player 2 saves settings through a link, they change player 1\'s too, and the game\'s own. `Game.FileSymlinkCopyInstead` lists files each player gets a **real copy** of. SRB2 writes three that matter: its settings, `config.cfg`, and its saves, `gamedata.dat` and `srb2sav1.ssg`. Add them at the top of the list:',
      '```js\nGame.FileSymlinkCopyInstead = [\n+   "config.cfg",\n+   "gamedata.dat",\n+   "srb2sav1.ssg",\n  "latest-log.txt",\n  …\n];\n```',
      '`Game.FileSymlinkExclusions` is the other way round: files Nucleus leaves out of the folders altogether. These are the input DLLs Nucleus can put there itself.',
      block(EXCLUDE_L, '];'),
    ],
    task: 'Add the three files to the list, and the `FileSymlinkExclusions` line under it.',
    notes: [
      { kind: 'why', text: 'The rest of the copy list is from the tested handler: files SRB2 needs as real copies too. You find files like these by testing: start two copies and see what breaks. A later chapter is about exactly that.' },
    ],
    start: UP_TO.folders + '\n// Files each player gets a real copy of\n' + copyList([]),
    solution: UP_TO.copies,
    check: (t) => {
      const l = (listOf(t, 'Game.FileSymlinkCopyInstead') ?? []).map((f) => f.toLowerCase());
      const missing = MINE.filter((f) => !l.includes(f));
      if (missing.length) return `Still missing from the list: ${missing.join(', ')} (each in quotes, with a comma after it).`;
      if ((listOf(t, 'Game.FileSymlinkExclusions') ?? []).length < 3) return 'Add the Game.FileSymlinkExclusions line.';
      return firstProblem(t);
    },
    pane: 'check',
  },
  {
    id: 'find-windows',
    title: 'Finding the windows',
    kind: 'code',
    text: [
      'To move and size each copy\'s window, Nucleus first has to find it, by its title: `Game.Hook.ForceFocusWindowName`. SRB2\'s window is called `SRB2`.',
      'SRB2 adds more to that title as it runs, so `Game.HasDynamicWindowTitle = true` tells Nucleus the title doesn\'t have to match exactly.',
      block(FIND_L, '];\n' + EXCLUDE_L.trim() + '\n\n// Finding the windows'),
    ],
    task: 'Add the two lines.',
    notes: [
      { kind: 'odd', text: 'If the windows all end up full screen or on top of each other, Nucleus didn\'t find them: the window name is the first thing to check.' },
    ],
    start: UP_TO.copies + '\n// Finding the windows\n',
    solution: UP_TO.find,
    check: (t) => wants(t, [['Game.Hook.ForceFocusWindowName', 'SRB2'], ['Game.HasDynamicWindowTitle', 'true']]),
    pane: 'check',
  },
  {
    id: 'place-windows',
    title: 'Placing the windows',
    kind: 'code',
    text: [
      '`Game.ResetWindows = true` puts each window in its place, at its size, when the next copy starts. `Game.SetWindowHook = true` stops the game moving its own window after that.',
      '`Game.WindowStyleValues` and `Game.ExtWindowStyleValues` change the window\'s look, with Windows\' own style numbers: `~` takes a style away, a number on its own adds one. These take away the title bar and the borders, so each window is just the game.',
      '`HideTaskbar` and `NotTopMost` are `false`: the taskbar stays, and the windows stay on top.',
      block(PLACE_L, lastLine(UP_TO.find) + '\n\n// Placing the windows'),
    ],
    task: 'Add the six lines (Solve fills them in, if you\'d rather not type the numbers).',
    notes: [
      { kind: 'why', text: 'The style numbers come from Microsoft\'s list of [window styles](https://learn.microsoft.com/en-us/windows/win32/winmsg/window-styles): `0xC00000` is the title bar, `0x40000` the sizing border. Most handlers that remove borders use these same values.' },
    ],
    start: UP_TO.find + '\n// Placing the windows\n',
    solution: UP_TO.place,
    check: (t) => {
      const w = wants(t, [['Game.ResetWindows', 'true'], ['Game.SetWindowHook', 'true'], ['Game.HideTaskbar', 'false'], ['Game.NotTopMost', 'false']]);
      if (w) return w;
      if ((listOf(t, 'Game.WindowStyleValues') ?? []).length < 6 || (listOf(t, 'Game.ExtWindowStyleValues') ?? []).length < 3) return 'Add the WindowStyleValues and ExtWindowStyleValues lines (Solve has them).';
      return null;
    },
    pane: 'check',
  },
  {
    id: 'focus',
    title: 'Every window in focus',
    kind: 'code',
    text: [
      'Windows sends your keys to one window: the one in focus. Many games stop or pause when theirs isn\'t, and with four copies, three never are.',
      '`Game.HookFocus = true` makes Nucleus trick each copy into thinking it\'s in focus. `Game.Hook.ForceFocus = true` keeps up the act when Windows tells a window it lost focus.',
      block(FOCUS_L, lastLine(UP_TO.place) + '\n\n// Every window in focus'),
    ],
    task: 'Add the two lines.',
    notes: [
      { kind: 'why', text: 'These are **hooks**: Nucleus slips its own code into each copy of the game and answers some of its questions to Windows. That\'s how a handler changes things the game has no setting for.' },
    ],
    start: UP_TO.place + '\n// Every window in focus\n',
    solution: UP_TO.focus,
    check: (t) => wants(t, [['Game.HookFocus', 'true'], ['Game.Hook.ForceFocus', 'true']]),
    pane: 'check',
  },
  {
    id: 'timing',
    title: 'One copy at a time',
    kind: 'code',
    text: [
      'Nucleus starts the copies one after another. `Game.PauseBetweenStarts` is how long it waits before starting the next, so each window is up before the next one opens. The tested handler waits 25.',
      '`Game.HandlerInterval` is how often, in milliseconds, Nucleus checks on the windows while you play.',
      block(TIMING_L, lastLine(UP_TO.focus) + '\n\n// Timing'),
    ],
    task: 'Add the two lines.',
    notes: [
      { kind: 'odd', text: '`PauseBetweenStarts` is in **seconds**, though its docs say milliseconds: Nucleus waits `TimeSpan.FromSeconds(…)`. 25 means 25 seconds per copy. On a fast PC a lower number may work: try it.' },
    ],
    start: UP_TO.focus + '\n// Timing\n',
    solution: UP_TO.timing,
    check: (t) => wants(t, [['Game.PauseBetweenStarts', 25], ['Game.HandlerInterval', 100]]),
    pane: 'check',
  },
  {
    id: 'input',
    title: 'Controllers and keyboard',
    kind: 'code',
    text: [
      '`Game.SupportsKeyboard = true` lets one player use the keyboard and mouse; everyone else uses a controller.',
      'SRB2 reads controllers through SDL2, a library many games use. `Game.Hook.SDL2Enabled = true` tells Nucleus, so its setup screen counts the controllers the way SDL2 does, and each player\'s number matches the one SRB2 uses. The other input hooks are for other kinds of games: they\'re off, and so is Steam emulation (SRB2 isn\'t a Steam game).',
      block(INPUT_L, lastLine(UP_TO.timing) + '\n\n// Controllers and keyboard'),
    ],
    task: 'Add the seven lines.',
    notes: [
      { kind: 'pitfall', text: 'One keyboard means one keyboard player: Windows sends every key to the window in focus. Several keyboards and mice need Proto Input, which is a chapter of its own.' },
      { kind: 'why', text: 'The `false` lines are already Nucleus\' defaults. Writing them out says "this game doesn\'t need these", which helps the next person who reads the handler.' },
    ],
    start: UP_TO.timing + '\n// Controllers and keyboard\n',
    solution: UP_TO.input,
    check: (t) => wants(t, [['Game.SupportsKeyboard', 'true'], ['Game.Hook.SDL2Enabled', 'true'], ['Game.Hook.XInputEnabled', 'false'], ['Game.Hook.XInputReroute', 'false'], ['Game.Hook.DInputEnabled', 'false'], ['Game.Hook.CustomDllEnabled', 'false'], ['Game.NeedsSteamEmulation', 'false']]),
    pane: 'check',
  },
  {
    id: 'settings',
    title: 'Each player\'s settings',
    kind: 'code',
    text: [
      '`Game.Play` is a function Nucleus runs **once for each player**, after it has made their folder and before it starts their copy. Inside it, `Context` is about that player: `txtPath` is the path of *their* `config.cfg`.',
      'SRB2\'s settings are lines like `fullscreen "Yes"`. `Context.FindLineNumberInTextFile` finds a setting\'s line number; `"5|fullscreen \\"No\\""` means "line 5 becomes `fullscreen "No"`"; `Context.ReplaceLinesInTextFile` writes them all.',
      block(`${item(RENDERER, '    ')},\n${item(FULLSCREEN, '    ')}`, '  var dict = [', '  ];'),
      'Under the code, **Try it** now runs `Game.Play` for two players in your browser and shows what each gets. Nothing on your PC is touched.',
    ],
    task: 'Add the two lines to the `dict` list: the software renderer, and windowed (not full screen).',
    notes: [
      { kind: 'pitfall', text: '`config.cfg` must exist before Nucleus runs this: SRB2 writes it the first time it starts. If it\'s not there, Nucleus stops with an error. Start SRB2 once on its own before testing.' },
      { kind: 'odd', text: 'A misspelled setting doesn\'t fail: `FindLineNumberInTextFile` gives -1 when it finds nothing, and `ReplaceLinesInTextFile` skips that line without a word. If a setting doesn\'t take, check its spelling in `config.cfg`.' },
    ],
    start: UP_TO.input + play([]).replace('[\n\n  ]', '[\n    \n  ]'),
    solution: S_SETTINGS,
    check: (t) => playChecks(t, [{ player: 1, name: 'renderer', value: 'Software' }, { player: 1, name: 'fullscreen', value: 'No' }]),
    pane: 'tryit',
    checkpoint: {
      download: 'zip',
      steps: [
        'Download the zip (`handler.js` is already inside) and drag it onto Nucleus Co-op: it replaces your last version.',
        'Pick **SRB2 Tutorial**. Drag the keyboard icon (and a controller, if you have one) onto the screen: controllers light up when you hold a button.',
        'Press `>`, then **PLAY**, and wait: 25 seconds between the copies.',
      ],
      see: 'Two SRB2 windows side by side, each in its own half, without borders. Which controller drives which window isn\'t sorted yet: that\'s the next lessons.',
    },
  },
  {
    id: 'controllers',
    title: 'One controller each',
    kind: 'code',
    text: [
      'SRB2 picks its controller with `use_gamepad`. `Context.GamepadId` is this player\'s controller number, counted the SDL2 way.',
      'In SRB2\'s `config.cfg`, `use_gamepad` is the line right after `use_gamepad2`, so the handler finds `use_gamepad2` and adds 1. `use_gamepad2` itself is the controller of SRB2\'s own second split-screen player: 0 turns it off. And controller players don\'t need the mouse.',
      block(`${item(PAD2, '    ')},\n${item(PAD, '    ')},\n${item(MOUSE_OFF, '    ')}`, `${item(FULLSCREEN, '    ')},`, '  ];'),
    ],
    task: 'Add the three lines to the list (after the fullscreen one, with a comma after it), then look at what each player gets in Try it.',
    notes: [
      { kind: 'odd', text: 'Why `+ 1`? Searching for `use_gamepad` would also match `use_gamepad2`: `StartsWith` takes the first line that *starts* with the text. Finding a line you\'re sure of and counting from it avoids that.' },
    ],
    start: S_SETTINGS,
    solution: S_CONTROLLERS,
    check: (t) => playChecks(t, [{ player: 1, name: 'use_gamepad2', value: '0' }, { player: 1, name: 'use_gamepad', value: '1' }, { player: 1, name: 'use_mouse', value: 'Off' }]),
    pane: 'tryit',
  },
  {
    id: 'keyboard',
    title: 'The keyboard player',
    kind: 'code',
    text: [
      'The keyboard player has no controller. For them `Player.IsKeyboardPlayer` is true, so this part gives them `use_gamepad "0"` (none) and turns the mouse back on.',
      block(KB_L, '  Context.ReplaceLinesInTextFile(txtPath, dict);\n', '};'),
    ],
    task: 'Add the `if` part after the first `ReplaceLinesInTextFile`, then compare player 1 and 2 in Try it.',
    notes: [
      { kind: 'pitfall', text: 'Don\'t use the keyboard player\'s `Context.GamepadId`: they have no controller, and Nucleus gives them a made-up number (99).' },
      { kind: 'odd', text: 'It searches for `use_mouse "Off"`: the line the first part just wrote. Order matters: this runs after it.' },
    ],
    start: S_CONTROLLERS,
    solution: S_KEYBOARD,
    check: (t) => playChecks(t, [{ player: 0, name: 'use_mouse', value: 'On' }, { player: 0, name: 'use_gamepad', value: '0' }]),
    pane: 'tryit',
  },
  {
    id: 'sdl',
    title: 'SRB2\'s own SDL2.dll',
    kind: 'code',
    text: [
      'With `SDL2Enabled`, Nucleus puts its own `SDL2.dll` in each player\'s folder, before `Game.Play` runs. This handler lets SRB2 pick the controller itself (`use_gamepad`), so it puts SRB2\'s own `SDL2.dll` back, from the game\'s folder (`Context.RootInstallFolder`) into the player\'s (`Context.RootFolder`).',
      block(SDL_L, '  }\n', '};'),
    ],
    task: 'Add the `File.Copy` line at the end of `Game.Play`.',
    notes: [
      { kind: 'why', text: '`System.IO.File.Copy` is .NET, not part of Nucleus: handlers can use .NET\'s file functions directly. `true` at the end means "overwrite".' },
    ],
    start: S_KEYBOARD,
    solution: S_SDL,
    check: (t) => {
      const e = firstProblem(t);
      if (e) return e;
      const r = run(t);
      return r.loaded && r.players.length === 2 && r.players.every((p) => p.calls.some((c) => /^System\.IO\.File\.Copy\(.*SDL2\.dll/.test(c))) ? null : 'In Try it, each player should copy SDL2.dll.';
    },
    pane: 'tryit',
  },
  {
    id: 'description',
    title: 'A note for the players',
    kind: 'code',
    text: [
      '`Game.Description` is shown in Nucleus when someone picks the game, before they start. Say what they need to do that the handler can\'t. SRB2\'s copies don\'t find each other by themselves: one hosts a LAN game, the others join it.',
      block(DESCRIPTION_L, lastLine(UP_TO.input) + '\n\n// What players read before they start'),
    ],
    task: 'Add the `Game.Description` line (Solve has it; your own words are fine too).',
    notes: [
      { kind: 'why', text: 'Every copy runs on the same PC, so the address to join is `localhost`: "this computer".' },
    ],
    start: UP_TO.input + '\n// What players read before they start\n' + play(PAD_SETTINGS, true, true),
    solution: FIRST_TEST,
    check: (t) => ((str(t, 'Game.Description') ?? '').trim().length > 10 ? firstProblem(t) : 'Add Game.Description = "…"; with a sentence or two, in quotes.'),
    pane: 'check',
  },
  {
    id: 'test',
    title: 'Test it in Nucleus Co-op',
    kind: 'test',
    text: [
      'Your handler now has everything a player needs. Time to play it for real: two copies, one hosting and one joining.',
    ],
    steps: [
      'Download the zip (the button below) and drag it onto Nucleus Co-op: it replaces your last version.',
      'Pick **SRB2 Tutorial** and read your note under its cover. Drag the keyboard icon onto the screen, and a controller if you have one (hold a button: it lights up).',
      'Press `>`, then **PLAY**, and wait for both windows (25 seconds between them).',
      'In one window, host a LAN game (**Multiplayer › Host game**). In the other, join with the address `localhost`. Click a window to use the keyboard there.',
      'Now click the first window, and look at the second.',
    ],
    notes: [
      { kind: 'pitfall', text: 'Zipping it yourself, as in "Point it at the game"? `handler.js` must be at the top of the zip, not inside a folder: zip the file, not a folder with it in.' },
      { kind: 'alt', text: 'You can drag the `.js` straight onto Nucleus too. It **moves** the file into its handlers folder, so it\'s gone from where it was: keep a copy.' },
    ],
    start: FIRST_TEST,
    solution: FIRST_TEST,
    download: 'zip',
    ask: {
      question: 'What happened to the second window?',
      answers: [
        { label: 'It paused, or says "Focus lost"', reply: 'That\'s the bug the next lesson is about.' },
        { label: 'It kept running', reply: 'Good: your copy of SRB2 may not pause by itself. The next lesson is still worth it: other people\'s will.' },
        { label: 'Something else went wrong', reply: 'Look at the list on the last page: it starts from what you see.' },
      ],
    },
  },
  {
    id: 'focus-lost',
    title: 'Why the window froze',
    kind: 'code',
    text: [
      'The focus hooks keep each copy from hearing that it lost focus the usual ways. SRB2 still noticed, and paused itself: it has **its own setting** for that, `pauseifunfocused`, and shows "Focus lost" because of `showfocuslost`. It also goes quiet without focus: `playmusicifunfocused` and `playsoundsifunfocused`.',
      'A hook can\'t change a game\'s own settings, but its settings file can, and you already have the code for that:',
      block(`${item(MUSIC, '    ')},\n${item(SOUNDS, '    ')},`, '  var dict = [', '    …'),
      'and at the end of the list (with a comma after the `use_mouse` item):',
      block(`${item(PAUSE, '    ')},\n${item(FOCUSLOST, '    ')}`, '    …\n' + item(MOUSE_OFF, '    ') + ',', '  ];'),
    ],
    task: 'Add the four lines: two at the top of the list, two at the end (mind the commas).',
    notes: [
      { kind: 'why', text: 'When a game pauses without focus, look in its settings file before reaching for more hooks: a setting is simpler, and it\'s what the game expects.' },
    ],
    start: FIRST_TEST,
    solution: FINAL,
    check: (t) => playChecks(t, [{ player: 1, name: 'playmusicifunfocused', value: 'Yes' }, { player: 1, name: 'playsoundsifunfocused', value: 'Yes' }, { player: 1, name: 'pauseifunfocused', value: 'No' }, { player: 1, name: 'showfocuslost', value: 'No' }]),
    pane: 'tryit',
  },
  {
    id: 'test-again',
    title: 'Test it again',
    kind: 'test',
    text: [
      'Here\'s the finished handler, already zipped as `handler.js` in a `.zip`, the way Nucleus installs it. Drag it onto Nucleus Co-op: it replaces the first version.',
      'It does everything a tested SRB2 handler does. Start 2 players again, host and join, and click from window to window: they should all keep running, with sound.',
    ],
    steps: [
      'Download the zip (the button below) and drag it onto Nucleus Co-op.',
      'Start SRB2 Tutorial with 2 players, host a LAN game in one window and join `localhost` from the other.',
      'Click the first window, then the second: both keep running.',
    ],
    notes: [
      { kind: 'odd', text: '**Both windows react to one controller:** `use_gamepad` in Try it (lesson "One controller each"). **The windows overlap, have borders or are full screen:** lessons "Finding the windows" and "Placing the windows". **Nucleus stops with an error before the game starts:** start SRB2 once on its own, so `config.cfg` exists. **Settings are shared between players:** the copy list (lesson "Files each player writes").' },
    ],
    start: FINAL,
    solution: FINAL,
    download: 'zip',
  },
];

export const CHAPTERS: Chapter[] = [
  {
    id: 'first-handler',
    title: 'Making your first handler',
    blurb: 'Write a handler for Sonic Robo Blast 2, a free game, a few lines at a time, and test it in Nucleus Co-op.',
    lessons: FIRST,
  },
];

/** The problems in a lesson's solution (tests: the solution is what people copy, so there must be none). */
export const solutionErrors = (l: Lesson) => (l.kind === 'code' || l.kind === 'test' ? problems(l.solution, l).map((d) => `${d.rule}: ${d.message}`) : []);
/** Where a link points: learn/#<chapter>/<lesson>. */
export function findLesson(hash: string): { chapter: Chapter; index: number } {
  const [c, l] = hash.replace(/^#/, '').split('/');
  const chapter = CHAPTERS.find((x) => x.id === c) ?? CHAPTERS[0];
  const index = Math.max(0, chapter.lessons.findIndex((x) => x.id === l));
  return { chapter, index };
}
