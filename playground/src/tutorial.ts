// The tutorial: short lessons from "what is a handler" to "each player gets their own window and settings".
// Each lesson has a few lines of text, one task, the code it starts from (the last lesson's solution), the
// solution ("Show me"), and a check that reads the real problems (core lint) and what Try it says each player
// gets (core sim): the task is done when the check returns null; otherwise it says what's still missing.
// Pure: no DOM (tutorial-ui.ts draws it); tools/workbench-units.test.mjs checks every lesson both ways.
import { lint } from '@core/lint';
import { simulate, type SimResult } from '@core/sim';

export interface Lesson {
  id: string;
  title: string;
  /** A few short paragraphs; `code` and **bold** are shown as such. */
  text: string[];
  /** What to do, in one sentence. */
  task: string;
  start: string;
  solution: string;
  /** null: done. A string: what's still missing, in plain words. */
  check(text: string): string | null;
  /** Where to look after doing it (a tab of the workbench). */
  look?: 'check' | 'simulate';
}

const run = (text: string, players = 2): SimResult => simulate(text, { players, width: 1920, height: 1080, keyboardPlayer: -1 });
const errors = (text: string) => lint(text).filter((d) => d.severity === 'error');

const HEAD = 'Game.GUID = "Racer";\nGame.GameName = "Racer";\n';
const L1 = HEAD + 'Game.ExecutableName = "racer.exe";\n';
const L2 = L1 + 'Game.MaxPlayers = 4;\n';
const PLAY = (body: string) => `\nGame.Play = function () {\n${body}};\n`;
const L3 = L2 + PLAY('  Context.StartArguments = "-windowed";\n');
const SIZE = '  Context.StartArguments = "-windowed -width " + Context.Width + " -height " + Context.Height;\n';
const L4 = L2 + PLAY(SIZE);
const L5 = L2 + PLAY(SIZE + '  Context.StartArguments += " -player " + Context.PlayerID;\n');
const L6_START = L2 + PLAY('  var size = `-width ${Context.Width} -height ${Context.Height}`;\n  Context.StartArguments = "-windowed " + size;\n  Context.StartArguments += " -player " + Context.PlayerID;\n');
const L6 = L2 + PLAY('  var size = "-width " + Context.Width + " -height " + Context.Height;\n  Context.StartArguments = "-windowed " + size;\n  Context.StartArguments += " -player " + Context.PlayerID;\n');
const OPTION = 'Game.AddOption("Window mode", "How the game runs", "mode", ["Windowed", "Fullscreen"]);\n';
const L7 = L2 + OPTION + PLAY('  var size = "-width " + Context.Width + " -height " + Context.Height;\n  var mode = Context.Options["mode"] == "Windowed" ? "-windowed " : "-fullscreen ";\n  Context.StartArguments = mode + size + " -player " + Context.PlayerID;\n');
const INI = '  var ini = System.IO.Path.Combine(Context.UserProfileConfigPath, "settings.ini");\n  Context.ModifySaveFile(ini, ini, Nucleus.SaveType.INI, [\n    new Nucleus.IniSaveInfo("Video", "Width", Context.Width),\n    new Nucleus.IniSaveInfo("Video", "Height", Context.Height)\n  ]);\n';
const L8 = L2 + OPTION + PLAY('  var size = "-width " + Context.Width + " -height " + Context.Height;\n  var mode = Context.Options["mode"] == "Windowed" ? "-windowed " : "-fullscreen ";\n  Context.StartArguments = mode + size + " -player " + Context.PlayerID;\n' + INI);

export const LESSONS: Lesson[] = [
  {
    id: 'handler',
    title: 'What a handler is',
    text: [
      'A handler is a small JavaScript file that tells Nucleus Co-op how to run several copies of one game side by side.',
      'Every handler starts with three lines: `Game.GUID` (a unique name, which also becomes a folder name), `Game.GameName` (what players see) and `Game.ExecutableName` (the game\'s .exe). Without them, Nucleus can\'t load the handler, and Check says so.',
    ],
    task: 'Add the missing third line: `Game.ExecutableName = "racer.exe";`',
    start: HEAD,
    solution: L1,
    check: (t) => (/^\s*Game\.ExecutableName\s*=\s*"[^"]+\.exe"\s*;?\s*$/m.test(t) && !lint(t).some((d) => d.rule === 'missing-required') ? null : 'Add a line Game.ExecutableName = "racer.exe"; (with the quotes).'),
    look: 'check',
  },
  {
    id: 'players',
    title: 'How many players',
    text: [
      '`Game.MaxPlayers` says how many players the game supports in split screen. Nucleus offers up to that many.',
      'Values are typed: a number has no quotes. `"4"` would be text, and Check would point that out.',
    ],
    task: 'Let up to 4 players join: `Game.MaxPlayers = 4;`',
    start: L1,
    solution: L2,
    check: (t) => (/^\s*Game\.MaxPlayers\s*=\s*([2-9]|1\d)\s*;?\s*$/m.test(t) && !errors(t).length ? null : 'Add Game.MaxPlayers = 4; (a number, no quotes).'),
    look: 'check',
  },
  {
    id: 'play',
    title: 'Game.Play runs once per player',
    text: [
      'Nucleus starts one copy of the game per player. Just before each start, it runs your `Game.Play` function, once per player.',
      'Inside it, `Context` is that player\'s setup. `Context.StartArguments` is what the game is started with: the extra words after the .exe on its command line.',
      'Open **Try it** (top right) to see what each player gets, without starting Nucleus or the game.',
    ],
    task: 'Inside `Game.Play`, start every copy in a window: `Context.StartArguments = "-windowed";`',
    start: L2 + PLAY('  \n'),
    solution: L3,
    check: (t) => {
      const r = run(t);
      if (!r.loaded) return 'The handler doesn\'t load yet: Check says why.';
      if (!r.hasPlay) return 'Add a Game.Play function (it\'s there in the code to start from).';
      return r.players.length && r.players.every((p) => /-windowed/.test(p.startArguments)) ? null : 'Set Context.StartArguments = "-windowed"; inside Game.Play, then look at Try it.';
    },
    look: 'simulate',
  },
  {
    id: 'size',
    title: 'Each player\'s window size',
    text: [
      'With 2 players on a 1920 × 1080 screen, each gets half: 960 × 1080. Nucleus works that out and puts it in `Context.Width` and `Context.Height`.',
      'Text and numbers join with `+`: `"-width " + Context.Width` gives `-width 960`.',
    ],
    task: 'Pass each player\'s size to the game: add `" -width " + Context.Width + " -height " + Context.Height` to the start arguments.',
    start: L3,
    solution: L4,
    check: (t) => {
      const r = run(t);
      return r.loaded && r.players.length === 2 && r.players.every((p) => /-width 960\b/.test(p.startArguments) && /-height 1080\b/.test(p.startArguments)) ? null : 'In Try it with 2 players, each player\'s arguments should end with -width 960 -height 1080.';
    },
    look: 'simulate',
  },
  {
    id: 'player-id',
    title: 'Telling the players apart',
    text: [
      'Many games need each copy to differ: another save slot, another port, another profile. `Context.PlayerID` is 0 for the first player, 1 for the second, and so on.',
      '`+=` adds to what\'s already there.',
    ],
    task: 'Give each copy its player number: `Context.StartArguments += " -player " + Context.PlayerID;`',
    start: L4,
    solution: L5,
    check: (t) => {
      const r = run(t);
      const a = r.players.map((p) => p.startArguments);
      return r.loaded && a.length === 2 && a[0] !== a[1] && /-player 0\b/.test(a[0]) && /-player 1\b/.test(a[1]) ? null : 'In Try it, player 1 should get -player 0 and player 2 -player 1.';
    },
    look: 'simulate',
  },
  {
    id: 'es5',
    title: 'JavaScript the way Nucleus reads it',
    text: [
      'Nucleus runs handlers with an old JavaScript engine (Jint 2.11.58) that only reads ES5. Newer syntax, like the `` `…${x}…` `` template string in this code, stops the handler from loading.',
      'Check finds these. Most have a fix: press **Fix this** next to the problem (or Fix all), or rewrite it with `+`.',
    ],
    task: 'Make the handler load again: fix the problem Check shows.',
    start: L6_START,
    solution: L6,
    check: (t) => (errors(t).length ? 'Check still shows an error: press Fix this next to it.' : run(t).loaded ? null : 'The handler doesn\'t load yet: Check says why.'),
    look: 'check',
  },
  {
    id: 'options',
    title: 'Options the players pick',
    text: [
      '`Game.AddOption` adds a choice to Nucleus\' setup screen: a label, a description, a key, and the values to pick from. In Game.Play, `Context.Options["key"]` is what was picked.',
      'Try it starts with the first value. Change it in Try it\'s options to see the other.',
    ],
    task: 'Add a "mode" option (Windowed or Fullscreen) at the top, and use `Context.Options["mode"]` to pick `-windowed` or `-fullscreen`.',
    start: L6,
    solution: L7,
    check: (t) => {
      if (!/Game\.AddOption\s*\(/.test(t)) return 'Add a Game.AddOption(…) line at the top level (not inside Game.Play).';
      if (!/Context\.Options\s*\[\s*"mode"\s*\]/.test(t)) return 'Use Context.Options["mode"] inside Game.Play.';
      if (errors(t).length) return 'Check still shows an error.';
      const r = run(t);
      return r.loaded && r.players.every((p) => /-windowed|-fullscreen/.test(p.startArguments)) ? null : 'Each player\'s arguments should start with -windowed or -fullscreen.';
    },
    look: 'simulate',
  },
  {
    id: 'files',
    title: 'Changing the game\'s settings file',
    text: [
      'Many games read their window size from a settings file, not the command line. `Context.ModifySaveFile` changes one for each player, in that player\'s own copy.',
      'Try it lists every file change per player, and never touches your computer.',
    ],
    task: 'Write each player\'s Width and Height into settings.ini (the Video section) with `Context.ModifySaveFile`.',
    start: L7,
    solution: L8,
    check: (t) => {
      if (!/Context\.ModifySaveFile\s*\(/.test(t)) return 'Call Context.ModifySaveFile(…) inside Game.Play (Show me has the whole call).';
      if (errors(t).length) return 'Check still shows an error.';
      const r = run(t);
      return r.loaded && r.players.length === 2 && r.players.every((p) => p.calls.some((c) => /ModifySaveFile/.test(c))) ? null : 'In Try it, each player should change settings.ini.';
    },
    look: 'simulate',
  },
];

/** The errors in a lesson's solution (for the tests: the solution is what people copy, so there must be none). */
export const solutionErrors = (l: Lesson) => errors(l.solution).map((d) => `${d.rule}: ${d.message}`);

/** Where to go after the last lesson (shown on the last card). */
export const NEXT_STEPS = [
  'Test all (in Try it) runs every player count and input setup at once.',
  'Save gives the .nc package Nucleus installs; in VS Code or Notepad++, Test in Nucleus Co-op starts it for real.',
  'Open a verified Hub handler (Ctrl+K) to see how real ones do it, and the Docs tab for every option.',
];
