// Learn (learn/): chapters of short lessons, one new thing at a time. Every lesson is curated: its starting code is
// written here (often the last lesson's solution, but always the author's choice, never the learner's attempt).
// A code lesson has a task and a check that reads the real problems (core lint) and what Try it says each player
// gets (core sim): done when check() returns null; otherwise it says what's still missing.
// Pure: no DOM (learn.ts draws it); tools/workbench-units.test.mjs checks every lesson both ways.
//
// The first chapter builds a handler for Sonic Robo Blast 2 (free, open source, a portable zip: srb2.org), trimmed
// down from a verified Hub handler for it (Talos91's, tested with SRB2 2.2.15), so the learner can test it for real.
import { lint } from '@core/lint';
import { simulate, type SimResult } from '@core/sim';

export type NoteKind = 'pitfall' | 'why' | 'alt' | 'odd' | 'check';
export interface Note { kind: NoteKind; text: string }

export interface Lesson {
  /** Part of the lesson's link (learn/#<chapter>/<id>): never change it once published. */
  id: string;
  title: string;
  /** code: a task in the editor. intro: the interactive scene. test: steps to do in Nucleus Co-op. */
  kind: 'code' | 'intro' | 'test';
  /** Short paragraphs; `code`, **bold** and [links](https://…) are shown as such. */
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
  /** Problems the solution may still have, by rule (the first lesson's: the lines still to come). */
  allow?: string[];
  /** test lessons: "what did you see?" and where each answer leads. */
  ask?: { question: string; answers: { label: string; reply: string }[] };
}

export interface Chapter { id: string; title: string; blurb: string; lessons: Lesson[] }

// ---------------------------------------------------------------------------------------------------------------
// Checks

const noComments = (t: string) => t.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:"'\\])\/\/[^\n]*/g, '$1');
/** The raw value text of `path = value;` at the top level, or undefined. */
function valueOf(t: string, path: string): string | undefined {
  const re = new RegExp(`^\\s*${path.replace(/\./g, '\\s*\\.\\s*')}\\s*=\\s*([\\s\\S]*?);?\\s*$`, 'm');
  const m = re.exec(noComments(t));
  return m ? m[1].trim() : undefined;
}
const isTrue = (t: string, path: string) => valueOf(t, path) === 'true';
const str = (t: string, path: string) => /^"([^"]*)"$/.exec(valueOf(t, path) ?? '')?.[1];
const num = (t: string, path: string) => { const v = valueOf(t, path); return v && /^\d+$/.test(v) ? Number(v) : undefined; };
/** The strings in a `path = [ … ];` list (it may span lines). */
function listOf(t: string, path: string): string[] | undefined {
  const re = new RegExp(`^\\s*${path.replace(/\./g, '\\s*\\.\\s*')}\\s*=\\s*\\[([\\s\\S]*?)\\]`, 'm');
  const m = re.exec(noComments(t));
  return m ? [...m[1].matchAll(/"([^"]*)"/g)].map((x) => x[1]) : undefined;
}
export const errors = (text: string) => lint(text).filter((d) => d.severity === 'error');
const firstError = (t: string) => { const e = errors(t)[0]; return e ? `Check shows an error on line ${t.slice(0, e.start).split('\n').length}: ${e.message}` : null; };
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

// ---------------------------------------------------------------------------------------------------------------
// Chapter 1: Making your first handler (Sonic Robo Blast 2)

const TOP = '// SRB2 Tutorial: a handler for Sonic Robo Blast 2 (srb2.org)\n';
const NAME = 'Game.GUID = "SRB2 Tutorial";\nGame.GameName = "SRB2 Tutorial";\n';
const DESCRIPTION = '\n// What players read before they start\nGame.Description = "Host a LAN game in one window, then join it from the others: type localhost as the address. Click a window to use the keyboard there.";\n';
const GAME = '\n// The game\nGame.ExecutableName = "srb2win.exe";\nGame.ExecutableContext = ["srb2.pk3"];\n';
const PLAYERS = '\n// How many players\nGame.MaxPlayers = 4;\nGame.MaxPlayersOneMonitor = 4;\n';
const FOLDERS = '\n// A folder for each player\nGame.SymlinkGame = true;\nGame.SymlinkFolders = true;\n';
const MORE_COPIES = ['player.dta', 'latest-log.txt', 'models.dat', 'music.dta', 'patch.pk3', 'srb2.pk3', 'zones.pk3', 'SDL2.dll', 'SDL2_mixer_ext.dll'];
const copies = (mine: string[]) => `\n// Files each player gets a real copy of\nGame.FileSymlinkCopyInstead = [\n${[...mine, ...MORE_COPIES].map((f) => `  "${f}"`).join(',\n')}\n];\n`;
const COPIES = copies(['config.cfg', 'gamedata.dat', 'srb2sav1.ssg']);
const WINDOWS = '\n// The windows\nGame.Hook.ForceFocusWindowName = "SRB2";\nGame.HasDynamicWindowTitle = true;\nGame.ResetWindows = true;\nGame.SetWindowHook = true;\n';
const FOCUS = '\n// Focus\nGame.HookFocus = true;\nGame.Hook.ForceFocus = true;\n';
const TIMING = '\n// Timing\nGame.PauseBetweenStarts = 25;\nGame.HandlerInterval = 100;\n';
const INPUT = '\n// Controllers and keyboard\nGame.SupportsKeyboard = true;\nGame.Hook.SDL2Enabled = true;\n';
const PLAY_HEAD = '\n// Each player\'s settings, in their own config.cfg\nGame.Play = function () {\n  var cfg = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\\\config.cfg";\n  function setting(name, value) {\n    var line = Context.FindLineNumberInTextFile(cfg, name + " ", Nucleus.SearchType.StartsWith);\n    return line + "|" + name + \' "\' + value + \'"\';\n  }\n';
const settings = (lines: string[]) => `  Context.ReplaceLinesInTextFile(cfg, [\n${lines.map((l) => `    ${l}`).join(',\n')}\n  ]);\n`;
const SDL_BACK = '\n  // Put SRB2\'s own SDL2.dll back (Nucleus put its own here first)\n  var sdl = "SDL2.dll";\n  System.IO.File.Copy(\n    System.IO.Path.Combine(Context.RootInstallFolder, sdl),\n    System.IO.Path.Combine(Context.RootFolder, sdl),\n    true\n  );\n';
const S_WINDOW = ['setting("fullscreen", "No")', 'setting("renderer", "Software")'];
const S_INPUT = ['setting("use_gamepad", Player.IsKeyboardPlayer ? 0 : Context.GamepadId)', 'setting("use_gamepad2", 0)', 'setting("use_mouse", Player.IsKeyboardPlayer ? "On" : "Off")'];
const S_FOCUS = ['setting("pauseifunfocused", "No")', 'setting("showfocuslost", "No")', 'setting("playmusicifunfocused", "Yes")', 'setting("playsoundsifunfocused", "Yes")'];
const play = (lines: string[], sdl: boolean) => `${PLAY_HEAD}${settings(lines)}${sdl ? SDL_BACK : ''}};\n`;

const BASE = TOP + NAME + GAME + PLAYERS + FOLDERS + COPIES + WINDOWS + FOCUS + TIMING + INPUT;
const WITH_SETTINGS = BASE + play(S_WINDOW, false);
const WITH_INPUT = BASE + play([...S_WINDOW, ...S_INPUT], true);
/** What lesson 12 hands over to the first test: no pause settings yet (the bug lesson 14 finds). */
const FIRST_TEST = TOP + NAME + DESCRIPTION + GAME + PLAYERS + FOLDERS + COPIES + WINDOWS + FOCUS + TIMING + INPUT + play([...S_WINDOW, ...S_INPUT], true);
/** The finished handler. */
export const FINAL = TOP + NAME + DESCRIPTION + GAME + PLAYERS + FOLDERS + COPIES + WINDOWS + FOCUS + TIMING + INPUT + play([...S_WINDOW, ...S_INPUT, ...S_FOCUS], true);

const SRB2 = 'https://www.srb2.org/download/';
const NUCLEUS = 'https://github.com/SplitScreen-Me/splitscreenme-nucleus/releases';

const FIRST: Lesson[] = [
  {
    id: 'why',
    title: 'Why a handler?',
    kind: 'intro',
    text: [
      'Nucleus Co-op lets several people play a game on one PC, each in their own window, even when the game was made for one player. It does that by starting **one copy of the game per player**.',
      'Try it on the right: start a second copy of the game and see what goes wrong.',
    ],
    start: '',
    solution: '',
  },
  {
    id: 'name',
    title: 'Give it a name',
    kind: 'code',
    text: [
      'A handler is a small JavaScript file. Each line tells Nucleus one thing about the game, mostly by setting something on `Game`.',
      'Two lines name it. `Game.GameName` is what you see in Nucleus\' list. `Game.GUID` is the name of the folder Nucleus keeps this game\'s copies in.',
    ],
    task: 'Set `Game.GUID` and `Game.GameName` to `"SRB2 Tutorial"`.',
    notes: [
      { kind: 'why', text: 'The GUID becomes a folder: `Nucleus Co-op\\content\\SRB2 Tutorial`. Keep it to letters, numbers and spaces, and don\'t change it later: a new GUID is a new folder, and Nucleus starts over.' },
      { kind: 'check', text: 'Check, under the code, lists what Nucleus would refuse. Add the two lines and see what it says is still missing.' },
    ],
    start: TOP + '\n',
    solution: TOP + NAME,
    allow: ['missing-required'],
    check: (t) => (str(t, 'Game.GUID') && str(t, 'Game.GameName') ? null : 'Both need a name in quotes, like Game.GUID = "SRB2 Tutorial";'),
    pane: 'check',
  },
  {
    id: 'game',
    title: 'Point it at the game',
    kind: 'code',
    text: [
      'Nucleus needs the game\'s program. When you add a game, it looks for `Game.ExecutableName` on your drives. SRB2\'s is `srb2win.exe`.',
      'Many games share an .exe name, so `Game.ExecutableContext` lists files that sit next to the right one. SRB2 keeps its game data in `srb2.pk3`.',
    ],
    task: 'Set `Game.ExecutableName` to `"srb2win.exe"` and `Game.ExecutableContext` to `["srb2.pk3"]`.',
    notes: [
      { kind: 'check', text: 'When Check is empty, Nucleus can load the handler. Everything from here on is about making it work well.' },
      { kind: 'pitfall', text: '`ExecutableContext` is a list, in square brackets, even with one file in it. A plain `"srb2.pk3"` isn\'t what Nucleus expects, and Check says so.' },
    ],
    start: TOP + NAME + '\n// The game\n',
    solution: TOP + NAME + GAME,
    check: (t) => {
      if ((str(t, 'Game.ExecutableName') ?? '').toLowerCase() !== 'srb2win.exe') return 'Set Game.ExecutableName = "srb2win.exe";';
      if (!(listOf(t, 'Game.ExecutableContext') ?? []).map((f) => f.toLowerCase()).includes('srb2.pk3')) return 'Set Game.ExecutableContext = ["srb2.pk3"]; (a list, in square brackets).';
      return firstError(t);
    },
    pane: 'check',
  },
  {
    id: 'players',
    title: 'How many players',
    kind: 'code',
    text: [
      '`Game.MaxPlayers` is how many players Nucleus lets you add for this game. SRB2 runs well with 4.',
      '`Game.MaxPlayersOneMonitor` is how many fit on one screen.',
    ],
    task: 'Set both to `4`.',
    notes: [
      { kind: 'odd', text: '`MaxPlayersOneMonitor` is only shown as information in Nucleus: it doesn\'t stop anyone adding a fifth player on one screen.' },
      { kind: 'check', text: 'Write the number without quotes. `"4"` is text, and Check warns that Nucleus wants a number there.' },
    ],
    start: TOP + NAME + GAME + '\n// How many players\n',
    solution: TOP + NAME + GAME + PLAYERS,
    check: (t) => (num(t, 'Game.MaxPlayers') && num(t, 'Game.MaxPlayersOneMonitor') ? firstError(t) : 'Set Game.MaxPlayers = 4; and Game.MaxPlayersOneMonitor = 4; (numbers, no quotes).'),
    pane: 'check',
  },
  {
    id: 'folders',
    title: 'A folder for each player',
    kind: 'code',
    text: [
      'Two copies of a game in one folder get in each other\'s way. So Nucleus gives each player a folder of their own: `content\\SRB2 Tutorial\\Instance0`, `Instance1`, and so on.',
      'Copying the whole game for every player would be slow and fill your disk. `Game.SymlinkGame = true` fills each folder with **links** to the real files instead: they look like the files, but take no space. `Game.SymlinkFolders = true` links whole folders the same way, instead of copying them.',
    ],
    task: 'Set `Game.SymlinkGame` and `Game.SymlinkFolders` to `true`.',
    notes: [
      { kind: 'pitfall', text: 'A link is the same file. Anything a game writes through one lands in the real game folder, shared by every player. The next lesson deals with that.' },
    ],
    start: TOP + NAME + GAME + PLAYERS + '\n// A folder for each player\n',
    solution: TOP + NAME + GAME + PLAYERS + FOLDERS,
    check: (t) => (isTrue(t, 'Game.SymlinkGame') && isTrue(t, 'Game.SymlinkFolders') ? firstError(t) : 'Set Game.SymlinkGame = true; and Game.SymlinkFolders = true;'),
    pane: 'check',
  },
  {
    id: 'copies',
    title: 'Files each player writes',
    kind: 'code',
    text: [
      'When player 2 saves their settings through a link, they change player 1\'s settings too, and those of the game itself.',
      '`Game.FileSymlinkCopyInstead` lists files that each player gets a real copy of. SRB2 writes three that matter: its settings, `config.cfg`, and its saves, `gamedata.dat` and `srb2sav1.ssg`.',
    ],
    task: 'Add `"config.cfg"`, `"gamedata.dat"` and `"srb2sav1.ssg"` to the top of the list.',
    notes: [
      { kind: 'why', text: 'The rest of the list is from the tested SRB2 handler: files SRB2 needs as real copies in each folder. You find files like these by testing: start two copies and see what breaks. A later chapter is about exactly that.' },
    ],
    start: TOP + NAME + GAME + PLAYERS + FOLDERS + copies([]),
    solution: TOP + NAME + GAME + PLAYERS + FOLDERS + COPIES,
    check: (t) => {
      const l = (listOf(t, 'Game.FileSymlinkCopyInstead') ?? []).map((f) => f.toLowerCase());
      const missing = ['config.cfg', 'gamedata.dat', 'srb2sav1.ssg'].filter((f) => !l.includes(f));
      return missing.length ? `Still missing from the list: ${missing.join(', ')} (each in quotes, with a comma between them).` : firstError(t);
    },
    pane: 'check',
  },
  {
    id: 'windows',
    title: 'Finding the windows',
    kind: 'code',
    text: [
      'Nucleus puts each copy\'s window on its part of the screen. To find a window, it looks for its title, `Game.Hook.ForceFocusWindowName`. SRB2\'s window is called `SRB2`.',
      'SRB2 adds its version to that title, so `Game.HasDynamicWindowTitle = true` tells Nucleus the title doesn\'t have to match exactly.',
      '`Game.ResetWindows = true` puts each window back in its place when the next copy starts, and `Game.SetWindowHook = true` stops the game moving its own window after that.',
    ],
    task: 'Add the four lines: the window name `"SRB2"`, and the other three set to `true`.',
    notes: [
      { kind: 'odd', text: 'If every window ends up full screen or on top of the others, Nucleus didn\'t find them: the window name is the first thing to check.' },
    ],
    start: TOP + NAME + GAME + PLAYERS + FOLDERS + COPIES + '\n// The windows\n',
    solution: TOP + NAME + GAME + PLAYERS + FOLDERS + COPIES + WINDOWS,
    check: (t) => {
      if (str(t, 'Game.Hook.ForceFocusWindowName') !== 'SRB2') return 'Set Game.Hook.ForceFocusWindowName = "SRB2"; (with a capital SRB2).';
      const off = ['Game.HasDynamicWindowTitle', 'Game.ResetWindows', 'Game.SetWindowHook'].filter((p) => !isTrue(t, p));
      return off.length ? `Still to set to true: ${off.join(', ')}.` : firstError(t);
    },
    pane: 'check',
  },
  {
    id: 'focus',
    title: 'Every window in focus',
    kind: 'code',
    text: [
      'Windows sends your keys to one window: the one in focus. Many games stop or pause when theirs isn\'t, and with four copies, three never are.',
      '`Game.HookFocus = true` makes Nucleus trick each copy into thinking it\'s in focus. `Game.Hook.ForceFocus = true` keeps up the act with the messages Windows sends a window when it loses focus.',
    ],
    task: 'Set `Game.HookFocus` and `Game.Hook.ForceFocus` to `true`.',
    notes: [
      { kind: 'why', text: 'These are **hooks**: Nucleus slips its own code into each copy of the game and answers some of its questions to Windows. That\'s how a handler changes things the game has no setting for.' },
    ],
    start: BASE.slice(0, BASE.indexOf('\n// Focus')) + '\n// Focus\n',
    solution: BASE.slice(0, BASE.indexOf('\n// Timing')),
    check: (t) => (isTrue(t, 'Game.HookFocus') && isTrue(t, 'Game.Hook.ForceFocus') ? firstError(t) : 'Set Game.HookFocus = true; and Game.Hook.ForceFocus = true;'),
    pane: 'check',
  },
  {
    id: 'timing',
    title: 'One copy at a time',
    kind: 'code',
    text: [
      'Nucleus starts the copies one after another. `Game.PauseBetweenStarts` is how long it waits before starting the next, so each window is up before the next one opens. The tested SRB2 handler waits 25.',
      '`Game.HandlerInterval` is how often, in milliseconds, Nucleus checks on the windows while you play.',
    ],
    task: 'Set `Game.PauseBetweenStarts` to `25` and `Game.HandlerInterval` to `100`.',
    notes: [
      { kind: 'odd', text: '`PauseBetweenStarts` is in **seconds**, though its docs say milliseconds: Nucleus waits `TimeSpan.FromSeconds(…)`. 25 means 25 seconds per copy. On a fast PC a lower number may work: try it.' },
    ],
    start: BASE.slice(0, BASE.indexOf('\n// Timing')) + '\n// Timing\n',
    solution: BASE.slice(0, BASE.indexOf('\n// Controllers')),
    check: (t) => (num(t, 'Game.PauseBetweenStarts') && num(t, 'Game.HandlerInterval') ? firstError(t) : 'Set Game.PauseBetweenStarts = 25; and Game.HandlerInterval = 100; (numbers, no quotes).'),
    pane: 'check',
  },
  {
    id: 'input',
    title: 'Controllers and keyboard',
    kind: 'code',
    text: [
      '`Game.SupportsKeyboard = true` lets one player use the keyboard and mouse; everyone else uses a controller.',
      'SRB2 reads controllers through SDL2, a library many games use. `Game.Hook.SDL2Enabled = true` tells Nucleus, so its setup screen counts the controllers the way SDL2 does. Each player\'s number then matches the one SRB2 uses, which you\'ll need in a moment.',
    ],
    task: 'Set `Game.SupportsKeyboard` and `Game.Hook.SDL2Enabled` to `true`.',
    notes: [
      { kind: 'pitfall', text: 'One keyboard means one keyboard player: Windows sends every key to the window in focus. To play with several keyboards and mice, Nucleus needs Proto Input, which is a chapter of its own.' },
    ],
    start: BASE.slice(0, BASE.indexOf('\n// Controllers')) + '\n// Controllers and keyboard\n',
    solution: BASE,
    check: (t) => (isTrue(t, 'Game.SupportsKeyboard') && isTrue(t, 'Game.Hook.SDL2Enabled') ? firstError(t) : 'Set Game.SupportsKeyboard = true; and Game.Hook.SDL2Enabled = true;'),
    pane: 'check',
  },
  {
    id: 'settings',
    title: 'Each player\'s settings',
    kind: 'code',
    text: [
      '`Game.Play` is a function Nucleus runs **once for each player**, after it has made their folder and before it starts their copy. Inside it, `Context` is about the player being set up: `cfg` is the path of *their* `config.cfg`.',
      'SRB2\'s settings are lines like `fullscreen "Yes"`. `setting(name, value)` finds a setting\'s line and writes the new one; `Context.ReplaceLinesInTextFile` puts them all in the file.',
      'Under the code, **Try it** now runs `Game.Play` for two players in your browser and shows what each would get. Nothing on your PC is touched.',
    ],
    task: 'In the list, add `setting("fullscreen", "No")` and `setting("renderer", "Software")`, with a comma between them.',
    notes: [
      { kind: 'pitfall', text: '`config.cfg` must exist before Nucleus runs this: SRB2 writes it the first time it starts. If it\'s not there, Nucleus stops with an error. Start SRB2 once on its own before testing.' },
      { kind: 'odd', text: 'A misspelled setting doesn\'t fail: `FindLineNumberInTextFile` gives -1 when it finds nothing, and `ReplaceLinesInTextFile` skips that line without a word. If a setting doesn\'t take, check its spelling in `config.cfg`.' },
    ],
    start: BASE + play([], false).replace('[\n\n  ]', '[\n    \n  ]'),
    solution: WITH_SETTINGS,
    check: (t) => {
      const e = firstError(t);
      if (e) return e;
      const r = run(t);
      if (!r.loaded) return `The handler doesn't load: ${r.loadError ?? 'see Check'}`;
      const l = cfgLines(r, 1);
      if (!sets(l, 'fullscreen', 'No')) return 'In Try it, each player should get fullscreen "No".';
      if (!sets(l, 'renderer', 'Software')) return 'In Try it, each player should get renderer "Software".';
      return null;
    },
    pane: 'tryit',
  },
  {
    id: 'controllers',
    title: 'One controller each',
    kind: 'code',
    text: [
      'SRB2 picks its controller with the setting `use_gamepad`. `Context.GamepadId` is this player\'s controller number, counted the SDL2 way.',
      'The keyboard player has none: for them `Player.IsKeyboardPlayer` is true, so they get `use_gamepad` 0 (no controller) and the mouse on. `a ? b : c` picks `b` when `a` is true, `c` when it isn\'t.',
      'The `File.Copy` at the end comes from the tested handler: `SDL2Enabled` made Nucleus put its own SDL2.dll in each folder before `Game.Play` ran. This handler lets SRB2 pick the controller itself, so it puts SRB2\'s own SDL2.dll back.',
    ],
    task: 'Add `use_gamepad`, `use_gamepad2` and `use_mouse` to the list (Solve shows the three lines), then look at what each player gets in Try it.',
    notes: [
      { kind: 'pitfall', text: 'Don\'t use the keyboard player\'s `Context.GamepadId`: they have no controller, and Nucleus gives them a made-up number (99).' },
      { kind: 'odd', text: '`setting` searches for the name **with a space after it**. Without it, looking for `use_gamepad` would also find `use_gamepad2`, and change the wrong line.' },
      { kind: 'why', text: '`use_gamepad2` is the controller of SRB2\'s own second split-screen player. Set to 0, it doesn\'t grab one.' },
    ],
    start: WITH_SETTINGS.replace('  ]);\n};', '  ]);\n' + SDL_BACK + '};'),
    solution: WITH_INPUT,
    check: (t) => {
      const e = firstError(t);
      if (e) return e;
      const r = run(t);
      if (!r.loaded) return `The handler doesn't load: ${r.loadError ?? 'see Check'}`;
      const kb = cfgLines(r, 0), pad = cfgLines(r, 1);
      if (!sets(kb, 'use_mouse', 'On') || !sets(pad, 'use_mouse', 'Off')) return 'In Try it, player 1 (keyboard) should get use_mouse "On", player 2 use_mouse "Off".';
      if (!sets(kb, 'use_gamepad', '0') || !pad.some((l) => /^use_gamepad "[1-9]\d*"$/.test(l))) return 'In Try it, player 1 should get use_gamepad "0", player 2 their controller number.';
      if (!sets(pad, 'use_gamepad2', '0')) return 'Add setting("use_gamepad2", 0) too.';
      return null;
    },
    pane: 'tryit',
  },
  {
    id: 'description',
    title: 'A note for the players',
    kind: 'code',
    text: [
      '`Game.Description` is shown in Nucleus when someone picks the game, before they start. Say what they need to do that the handler can\'t.',
      'SRB2\'s copies don\'t find each other by themselves: one hosts a LAN game, the others join it.',
    ],
    task: 'Add a `Game.Description` that tells players how to join (Solve has one).',
    notes: [
      { kind: 'why', text: 'Every copy runs on the same PC, so the address to join is `localhost`: "this computer".' },
    ],
    start: WITH_INPUT.replace(NAME, NAME + '\n// What players read before they start\n'),
    solution: FIRST_TEST,
    check: (t) => ((str(t, 'Game.Description') ?? '').trim().length > 10 ? firstError(t) : 'Add Game.Description = "…"; with a sentence or two, in quotes.'),
    pane: 'check',
  },
  {
    id: 'test',
    title: 'Test it in Nucleus Co-op',
    kind: 'test',
    text: [
      'Time to try it for real. You need a Windows PC, [Nucleus Co-op](' + NUCLEUS + ') and [Sonic Robo Blast 2](' + SRB2 + ') (free: take the portable zip with the full game).',
      'Nucleus installs a handler from a **zip** with the handler in it, named `handler.js`. You\'ll make that zip yourself.',
    ],
    steps: [
      'Unzip SRB2 anywhere, start `srb2win.exe` once on its own, and quit. Now it has a `config.cfg`.',
      'Download your handler (the button below): `SRB2 Tutorial.js`.',
      'Rename it to `handler.js`, then zip it: right-click › **Compress to ZIP file** (Windows 11), or **Send to › Compressed (zipped) folder**.',
      'Drag the zip onto Nucleus Co-op\'s window. If it asks where the game is, pick `srb2win.exe`.',
      'Pick **SRB2 Tutorial** in the list and read your note. Add 2 players: the keyboard, and a controller if you have one. Start.',
      'Wait for both windows (25 seconds between them). Host a LAN game in one, and join `localhost` from the other.',
      'Now click the first window, and look at the second.',
    ],
    notes: [
      { kind: 'pitfall', text: '`handler.js` must be at the top of the zip, not inside a folder. Zipping the file (not a folder with it in) gets that right.' },
      { kind: 'alt', text: 'You can drag the `.js` straight onto Nucleus too. It **moves** the file into its handlers folder, so it\'s gone from where it was: keep a copy.' },
    ],
    start: FIRST_TEST,
    solution: FIRST_TEST,
    download: 'js',
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
      'The focus hooks keep each copy from hearing that it lost focus the usual ways. SRB2 still noticed, and paused itself: it has **its own setting** for that, `pauseifunfocused`, and shows "Focus lost" because of `showfocuslost`.',
      'A hook can\'t change a game\'s own settings, but the game\'s settings file can. You already have the code for that.',
    ],
    task: 'Add `pauseifunfocused` "No" and `showfocuslost` "No" to the settings, and `playmusicifunfocused` and `playsoundsifunfocused` "Yes" while you\'re there.',
    notes: [
      { kind: 'why', text: 'When a game pauses without focus, look in its settings file before reaching for more hooks: a setting is simpler, and it\'s what the game expects.' },
      { kind: 'odd', text: 'The music and sound settings aren\'t about the freeze: without them, every window but the one in focus goes quiet.' },
    ],
    start: FIRST_TEST,
    solution: FINAL,
    check: (t) => {
      const e = firstError(t);
      if (e) return e;
      const r = run(t);
      if (!r.loaded) return `The handler doesn't load: ${r.loadError ?? 'see Check'}`;
      const l = cfgLines(r, 1);
      const want: [string, string][] = [['pauseifunfocused', 'No'], ['showfocuslost', 'No'], ['playmusicifunfocused', 'Yes'], ['playsoundsifunfocused', 'Yes']];
      const miss = want.filter(([n, v]) => !sets(l, n, v)).map(([n, v]) => `${n} "${v}"`);
      return miss.length ? `In Try it, each player should also get ${miss.join(', ')}.` : null;
    },
    pane: 'tryit',
  },
  {
    id: 'test-again',
    title: 'Test it again',
    kind: 'test',
    text: [
      'Here\'s the finished handler, already zipped as `handler.js` in a `.zip`, the way Nucleus installs it. Drag it onto Nucleus Co-op: it replaces the first version.',
      'Start 2 players again, host and join, and click from window to window: they should all keep running, with sound.',
    ],
    steps: [
      'Download the zip (the button below) and drag it onto Nucleus Co-op.',
      'Start SRB2 Tutorial with 2 players, host a LAN game in one window and join `localhost` from the other.',
      'Click the first window, then the second: both keep running.',
    ],
    notes: [
      { kind: 'odd', text: '**Both windows react to one controller:** check `use_gamepad` in Try it (lesson "One controller each"). **The windows overlap or are full screen:** the window name, `fullscreen "No"` (lessons "Finding the windows" and "Each player\'s settings"). **Nucleus stops with an error before the game starts:** start SRB2 once on its own, so `config.cfg` exists. **Settings are shared between players:** the copy list (lesson "Files each player writes").' },
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

/** The errors in a lesson's solution (tests: the solution is what people copy, so there must be none). */
export const solutionErrors = (l: Lesson) => (l.kind === 'code' || l.kind === 'test' ? errors(l.solution).filter((d) => !(l.allow ?? []).includes(d.rule)).map((d) => `${d.rule}: ${d.message}`) : []);
/** Where a link points: learn/#<chapter>/<lesson>. */
export function findLesson(hash: string): { chapter: Chapter; index: number } {
  const [c, l] = hash.replace(/^#/, '').split('/');
  const chapter = CHAPTERS.find((x) => x.id === c) ?? CHAPTERS[0];
  const index = Math.max(0, chapter.lessons.findIndex((x) => x.id === l));
  return { chapter, index };
}
