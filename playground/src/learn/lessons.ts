// Learn (learn/): chapters of short lessons, one new thing at a time. Every lesson is curated: its starting code is
// written here (often the last lesson's solution, but always the author's choice, never the learner's attempt).
// A code lesson shows what to add in a code block, has a task, and a check that reads the real problems (core lint)
// and what Try it says each player gets (core sim): done when check() returns null; otherwise it says what's missing.
// Pure: no DOM (learn.ts draws it); tools/workbench-units.test.mjs checks every lesson both ways.
//
// The first chapter builds the verified Hub handler for Boring Man - Online Tactical Stickman Combat (free on Steam;
// Im_awesome04's) line by line. The finished handler does exactly what that one does; only its name differs, so it
// never replaces the Hub one for someone who has both.
import { lint, type Diagnostic } from '@core/lint';
import { inProblemList } from '../checklist';
import { simulate, type SimResult } from '@core/sim';

export type NoteKind = 'pitfall' | 'why' | 'alt' | 'odd' | 'check' | 'try';
/** `answer`: for a 'try' note, what happens and why, folded away until the learner opens it. */
export interface Note { kind: NoteKind; text: string; answer?: string }

export interface Lesson {
  /** Part of the lesson's link (learn/#<chapter>/<id>): never change it once published. */
  id: string;
  title: string;
  /** The part of the chapter it belongs to (the lesson list's middle level). */
  section: string;
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
  /** The Show me button fills this in; the next lesson usually starts from it. */
  solution: string;
  check?(text: string): string | null;
  /** The one result pane this lesson shows under the code. */
  pane?: 'check' | 'tryit';
  /** test and setup lessons: the steps, and what to download. */
  steps?: string[];
  /** A small print line under the steps. */
  footnote?: string;
  download?: 'js' | 'zip';
  /** Checks (rule ids) Check leaves out in this lesson: about lines a lesson soon adds. */
  allow?: string[];
  /** Once the task is done: "Try it in Nucleus Co-op now" (folded), with the code so far to download, what to do
   *  and what you should see. Working code early, as often as a handler allows. */
  checkpoint?: { download: 'js' | 'zip'; steps: string[]; see: string };
  /** More paragraphs (like `text`) after the steps and the download. */
  after?: string[];
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
const str = (t: string, path: string) => /^"((?:[^"\\]|\\.)*)"$/.exec(valueOf(t, path) ?? '')?.[1];
const num = (t: string, path: string) => { const v = valueOf(t, path); return v && /^\d+$/.test(v) ? Number(v) : undefined; };
/** The strings in a `path = [ … ];` list (it may span lines). */
function listOf(t: string, path: string): string[] | undefined {
  const m = new RegExp(`^\\s*${pathRe(path)}\\s*=\\s*\\[([\\s\\S]*?)\\]`, 'm').exec(noComments(t));
  return m ? [...m[1].matchAll(/"([^"]*)"/g)].map((x) => x[1]) : undefined;
}
/** The problems Check shows in a lesson: errors and warnings, minus the ones about lines a lesson soon adds. */
export const problems = (text: string, l?: Lesson): Diagnostic[] => lint(text).filter((d) => (d.severity === 'error' || d.severity === 'warning') && !(l?.allow ?? []).includes(d.rule));
/** What Check lists: the workbench's list (checklist.ts), so infos too (`"true"` where `true` belongs). Only errors and
 *  warnings (problems) stand in the way of finishing a lesson. */
export const listed = (text: string, l?: Lesson): Diagnostic[] => lint(text).filter((d) => inProblemList(d) && !(l?.allow ?? []).includes(d.rule));
export const errors = (text: string) => lint(text).filter((d) => d.severity === 'error');
const firstProblem = (t: string, l?: Lesson) => { const e = problems(t, l)[0]; return e ? `Check shows a problem on line ${t.slice(0, e.start).split('\n').length}: ${e.message}` : null; };
type Want = [string, string | number | string[]];
/** Several `path = value` checks ('true'/'false' are the booleans): null when all hold, else what's still to do. */
function wants(t: string, list: Want[]): string | null {
  const ok = ([p, v]: Want) => (Array.isArray(v) ? v.every((x) => (listOf(t, p) ?? []).map((f) => f.toLowerCase()).includes(x.toLowerCase())) : v === 'true' ? isTrue(t, p) : v === 'false' ? isFalse(t, p) : typeof v === 'number' ? num(t, p) === v : str(t, p) === v);
  const show = ([p, v]: Want) => `${p} = ${Array.isArray(v) ? JSON.stringify(v).replace(/,/g, ', ') : typeof v === 'string' && v !== 'true' && v !== 'false' ? `"${v}"` : v};`;
  const miss = list.filter((w) => !ok(w));
  if (!miss.length) return firstProblem(t);
  // A line that's there with another value ("20" in quotes, a typo) says what to change, not that it's missing.
  const there = (p: string) => new RegExp(`^\\s*${pathRe(p)}\\s*=`, 'm').test(noComments(t));
  const add = miss.filter(([p]) => !there(p)), change = miss.filter(([p]) => there(p));
  return [add.length ? `Still to add: ${add.map(show).join(' ')}` : '', change.length ? `Not quite yet: make it ${change.map(show).join(' ')}` : ''].filter(Boolean).join(' ');
}
/** Try it: `players` players, the first on the keyboard (or none). */
export const run = (text: string, players = 2, keyboard = true): SimResult => simulate(text, { players, width: 1920, height: 1080, keyboardPlayer: keyboard ? 0 : -1 });
/** The INI keys a player's Game.Play writes with ModifySaveFile, as `file: [Section] Key = value`. */
export function iniWrites(r: SimResult, player: number): string[] {
  const out: string[] = [];
  for (const c of r.players[player]?.calls ?? []) {
    const f = /^Context\.ModifySaveFile\("((?:[^"\\]|\\.)*)"/.exec(c);
    if (!f) continue;
    const file = f[1].split(/\\\\|\//).pop();
    for (const m of c.matchAll(/IniSaveInfo\("([^"]*)", "([^"]*)", "((?:[^"\\]|\\.)*)"\)/g)) out.push(`${file}: [${m[1]}] ${m[2]} = ${m[3].replace(/\\"/g, '"')}`);
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------
// Chapter 1: Making your first handler (Boring Man)

/** A code block for the lesson text: `before` as context, `added` marked as the lines to add, `after` below. */
const block = (added: string, before = '', after = '') => '```js\n' + [before && before.replace(/\n$/, ''), added.replace(/^\n|\n$/g, '').split('\n').map((l) => `+ ${l}`).join('\n'), after && after.replace(/\n$/, '')].filter(Boolean).join('\n') + '\n```';
const lastLine = (s: string) => s.replace(/\n$/, '').split('\n').pop()!;

const TOP = '// Boring Man Tutorial: a handler for Boring Man - Online Tactical Stickman Combat (free on Steam)\n';
const NAME_L = 'Game.GUID = "Boring Man Tutorial";\nGame.GameName = "Boring Man Tutorial";\n';
const DESCRIPTION_L = 'Game.Description = "Host a game in one instance and join in the others via direct connect. Press CTRL+T twice if an instance is behind the windows taskbar.";\n';
const DESCRIPTION = '\n// What players read before they start\n' + DESCRIPTION_L;
const GAME_L = 'Game.ExecutableName = "BoringManGame.exe";\nGame.MaxPlayers = 20;\n';
const GAME = '\n// The game\n' + GAME_L;
const FOLDERS_L = 'Game.SymlinkGame = true;\n';
const COPY_L = 'Game.FileSymlinkCopyInstead = ["options.ini"];\n';
const FOLDERS = '\n// A folder for each player\n' + FOLDERS_L + COPY_L;
const ENV_L = 'Game.UseNucleusEnvironment = true;\nGame.UserProfileConfigPath = "AppData\\\\Local\\\\BoringManRewrite";\n';
const ENV = '\n// Each player\'s own settings folder\n' + ENV_L;
const STEAM_L = 'Game.UseGoldberg = true;\nGame.SteamID = "346120";\n';
const STEAM = '\n// Steam\n' + STEAM_L;
const WINDOWS_L = 'Game.Hook.ForceFocusWindowName = "Boring Man";\nGame.ResetWindows = true;\nGame.SetWindowHook = true;\nGame.RefreshWindowAfterStart = true;\n';
const WINDOWS = '\n// The windows\n' + WINDOWS_L;
const FOCUS_L = 'Game.HookFocus = true;\n';
const FOCUS = '\n// Every window in focus\n' + FOCUS_L;
const TIMING_L = 'Game.PauseBetweenStarts = 25;\nGame.HandlerInterval = 100;\n';
const TIMING = '\n// Timing\n' + TIMING_L;
const INPUT_L = 'Game.SupportsKeyboard = true;\nGame.Hook.XInputEnabled = true;\nGame.Hook.CustomDllEnabled = false;\n';
const INPUT = '\n// Controllers and keyboard\n' + INPUT_L;
const ONE_PAD_L = 'Game.XInputPlusDll = ["xinput1_3.dll"];\nGame.UseDInputBlocker = true;\n';
const EXCLUDE_L = 'Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "dinput8.dll", "xinput1_3.dll"];\n';
const EXCLUDE = '\n// Files Nucleus puts in each copy itself\n' + EXCLUDE_L;
const PLAY_BODY = '  var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\\\bm_settings.ini";\n  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [\n    new Nucleus.IniSaveInfo("Video", "Fullscreen", \'"0"\')\n  ]);\n';
const PLAY = '\n// Each player\'s settings\nGame.Play = function () {\n' + PLAY_BODY + '};\n';

/** The handler after each lesson, in order. */
const S: Record<string, string> = {};
S.name = TOP + NAME_L;
S.game = S.name + GAME;
S.folders = S.game + FOLDERS;
S.environment = S.folders + ENV;
S.steam = S.environment + STEAM;
S.windows = S.steam + WINDOWS;
S.focus = S.windows + FOCUS;
S.timing = S.focus + TIMING;
S.input = S.timing + INPUT;
S.pads = S.input + ONE_PAD_L;
S.exclusions = S.pads + EXCLUDE;
S.description = TOP + NAME_L + DESCRIPTION + S.exclusions.slice((TOP + NAME_L).length);
/** The finished handler: what the verified Hub handler does, without the lines that change nothing. */
export const FINAL = S.description + PLAY;
/** What the first full test runs: everything but Game.Play (the windows are full screen: the next lesson's bug). */
const FIRST_TEST = S.description;

/** The verified Hub handler as it was uploaded (its Hub.* lines left out), for the diff at the end. */
const HUB_HANDLER = "Game.ExecutableContext = [\"maps\"];\nGame.FileSymlinkExclusions = [\"steam_api.dll\", \"steam_appid.txt\", \"dinput8.dll\", \"xinput1_3.dll\"];\nGame.FileSymlinkCopyInstead = [\"options.ini\"];\nGame.UseNucleusEnvironment = true;\nGame.UseGoldberg = true;\nGame.HandlerInterval = 100;\nGame.SymlinkExe = false;\nGame.SymlinkGame = true;\nGame.SupportsKeyboard = true;\nGame.ExecutableName = \"BoringManGame.exe\";\nGame.SteamID = \"346120\";\nGame.GUID = \"Boring Man\";\nGame.GameName = \"Boring Man - Online Tactical Stickman Combat\";\nGame.MaxPlayers = 20;\nGame.MaxPlayersOneMonitor = 20;\nGame.LauncherTitle = \"\";\nGame.HideTaskbar = false;\nGame.StartArguments = \"\";\nGame.Hook.ForceFocusWindowName = \"Boring Man\";\nGame.HookFocus = true;\nGame.SetWindowHook = true;\nGame.RefreshWindowAfterStart = true;\nGame.ResetWindows = true;\nGame.Hook.DInputEnabled = false;\nGame.UseDInputBlocker = true;\nGame.Hook.XInputEnabled = true;\nGame.Hook.XInputReroute = false;\nGame.Hook.CustomDllEnabled = false;\nGame.XInputPlusDll = [\"xinput1_3.dll\"];\nGame.Description = \"Host a game in one instance and join in the others via direct connect. Press CTRL+T twice if an instance is behind the windows taskbar.\";\nGame.UserProfileConfigPath = \"AppData\\\\Local\\\\BoringManRewrite\";\nGame.KeepSymLinkOnExit = false;\nGame.PauseBetweenStarts = 25;\n\nGame.Play = function() {\n  var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + \"\\\\bm_settings.ini\";\n  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [\n    new Nucleus.IniSaveInfo(\"Video\", \"Fullscreen\", '\"0\"')\n    //new Nucleus.IniSaveInfo(\"Resolution\", \"Fullscreen\", '\"11\"'),\n  ]);\n};\n";
/** Why each line the tutorial leaves out can go (from the Nucleus source). */
const DROPPED: [RegExp, string][] = [
  [/ExecutableContext/, 'only tells games with the same .exe name apart, and no other handler uses `BoringManGame.exe`'],
  [/MaxPlayersOneMonitor/, 'Nucleus never reads it'],
  [/LauncherTitle|StartArguments/, 'empty is what Nucleus does anyway'],
  [/SymlinkExe|KeepSymLinkOnExit|HideTaskbar|XInputReroute|DInputEnabled/, 'false is the default'],
  [/^\s*\/\//, 'a comment'],
];
const norm = (l: string) => l.replace(/\s+/g, '').replace(/;$/, '');
/** The Hub handler against the tutorial's: "- " lines it drops, "+ " lines it adds, the rest folded into "…". */
function hubDiff(): string {
  const mine = new Set(FINAL.split('\n').filter((l) => l.trim() && !l.trim().startsWith('//')).map(norm));
  const out: string[] = [];
  let same = 0;
  const flush = () => { if (same) out.push('…'); same = 0; };
  for (const l of HUB_HANDLER.replace(/\n$/, '').split('\n')) {
    if (!l.trim()) continue;
    if (mine.has(norm(l)) || /^(Game\.Play\s*=\s*function|\s*\}\s*;?\s*$|\s*\]\);?$|\s*Context\.ModifySaveFile|\s*new Nucleus\.IniSaveInfo|\s*var VideoConfig)/.test(l)) { same++; continue; }
    flush();
    out.push(`- ${l}`);
    if (/^Game\.(GUID|GameName)\s*=/.test(l)) out.push(`+ ${FINAL.split('\n').find((x) => x.startsWith(l.split('=')[0].trim() + ' ='))}`);
  }
  flush();
  return '```js\n' + out.join('\n') + '\n```';
}
/** The left-out lines, grouped by why: "`SymlinkExe`, `HideTaskbar`…: false is the default". */
function droppedNotes(): string[] {
  const by = new Map<string, string[]>();
  for (const l of HUB_HANDLER.split('\n')) {
    const hit = l.trim() && DROPPED.find(([re]) => re.test(l));
    if (!hit) continue;
    const name = /^\s*\/\//.test(l) ? 'a commented-out line' : `\`${(/Game\.([\w.]+)/.exec(l) ?? ['', l.trim()])[1]}\``;
    by.set(hit[1], [...(by.get(hit[1]) ?? []), name]);
  }
  return [...by].map(([why, names]) => `${names.join(', ')}: ${why}`);
}

const STEAM_STORE = 'https://store.steampowered.com/app/346120/';
const INSTALL = 'https://www.splitscreen.me/docs/installation';
const USAGE = 'https://www.splitscreen.me/docs/usage';

const FIRST: Lesson[] = [
  {
    id: 'why',
    section: 'Getting started',
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
    section: 'Getting started',
    title: 'Get ready',
    kind: 'setup',
    text: [
      'You\'ll test your handler in Nucleus Co-op as you go, so get the app and the game first. You need a Windows PC. (Only reading along? Skip this: everything else runs in your browser.)',
      'The game is **Boring Man - Online Tactical Stickman Combat**: a free 2D shooter on Steam, light enough for any PC, with keyboard or controllers.',
    ],
    steps: [
      'Get Nucleus Co-op if you don\'t have it yet: follow the [installation guide](' + INSTALL + ').',
      'Get Boring Man on [its Steam page](' + STEAM_STORE + ') (free: **Play Game**) and let Steam install it.',
      'Start Boring Man once from Steam, then quit. That makes its settings, which Nucleus copies for each player later.',
      'Find its folder for later: in Steam, right-click Boring Man › **Manage** › **Browse local files**. `BoringManGame.exe` is in there.',
    ],
    footnote: 'New to Nucleus Co-op? Play a game with it first, with a ready-made handler: [how to use it](' + USAGE + '). Making a handler is much easier once you\'ve seen what Nucleus does.',
    start: '',
    solution: '',
  },
  {
    id: 'name',
    section: 'The game',
    title: 'Give it a name',
    kind: 'code',
    text: [
      'A handler is a small JavaScript file. Each line tells Nucleus one thing about the game, mostly by setting something on `Game`. You\'ll write the whole handler on the right, a few lines at a time.',
      'Start with its name. `Game.GUID` is the name of the folder Nucleus keeps this game\'s copies in, and `Game.GameName` is what you see in Nucleus\' list. Add these two lines under the comment:',
      block(NAME_L, TOP.trim()),
    ],
    task: 'Add the two lines. Type them: suggestions pop up as you go, and Tab or Enter takes one.',
    notes: [
      { kind: 'why', text: 'The GUID becomes a folder: `Nucleus Co-op\\content\\Boring Man Tutorial`. Keep it to letters, numbers and spaces, and don\'t change it later: a new GUID is a new folder, and Nucleus starts over.' },
      { kind: 'pitfall', text: 'Give each handler a GUID of its own. When two handlers have the same GUID, Nucleus keeps only the one it reads last, so the other disappears from its list. The Boring Man handler on the Hub uses `"Boring Man"`, so `"Boring Man Tutorial"` lets you install both side by side.' },
    ],
    start: TOP + '\n',
    solution: S.name,
    allow: ['missing-required'],
    check: (t) => (str(t, 'Game.GUID') && str(t, 'Game.GameName') ? null : 'Both need a name in quotes, like Game.GUID = "Boring Man Tutorial";'),
    pane: 'check',
  },
  {
    id: 'game',
    section: 'The game',
    title: 'Point it at the game',
    kind: 'code',
    text: [
      'Nucleus needs the game\'s program. When you add a game, it looks for the file in `Game.ExecutableName`: Boring Man\'s is `BoringManGame.exe`.',
      '`Game.MaxPlayers` is how many players Nucleus lets you add. Boring Man is light enough for lots: the tested handler allows 20.',
      block(GAME_L, lastLine(S.name) + '\n\n// The game'),
    ],
    task: 'Add the two lines under `// The game`.',
    notes: [
      { kind: 'check', text: 'Check, under the code, lists what Nucleus would refuse. A handler needs `GUID`, `GameName` and `ExecutableName` to load at all, so Check waits until this lesson is done before it asks for them.' },
      {
        kind: 'try',
        text: 'Once the lesson is done, put the number in quotes: `Game.MaxPlayers = "20";`. What does Check say? Then take the quotes away again.',
        answer: 'Check warns that `Game.MaxPlayers` expects a number, not the string `"20"`, and offers to fix it. In quotes, `"20"` is text, even though it looks like a number. Nucleus wants a number here, so write it without quotes. Text goes in quotes (`"BoringManGame.exe"`); numbers and `true`/`false` don\'t.',
      },
      { kind: 'why', text: 'Other handlers often have `Game.ExecutableContext`, `LauncherTitle = ""` or `StartArguments = ""` here. Boring Man doesn\'t need them: the last lesson shows what this handler leaves out, and why.' },
    ],
    start: S.name + '\n// The game\n',
    solution: S.game,
    allow: ['missing-required'],
    check: (t) => wants(t, [['Game.ExecutableName', 'BoringManGame.exe'], ['Game.MaxPlayers', 20]]),
    pane: 'check',
    checkpoint: {
      download: 'zip',
      steps: [
        'Download your handler (the button below): `Boring Man Tutorial.zip`, zipped the way Nucleus installs it.',
        'Drag the zip onto Nucleus Co-op\'s window. When it asks to add the game, say yes and pick `BoringManGame.exe` in the folder from "Get ready".',
      ],
      see: '**Boring Man Tutorial** in Nucleus\' list, with the game found. Don\'t start it yet: the copies would get in each other\'s way. The next lessons sort that out.',
    },
  },
  {
    id: 'folders',
    section: 'Each player\'s copy',
    title: 'A folder for each player',
    kind: 'code',
    text: [
      'Two copies of a game in one folder get in each other\'s way. So Nucleus gives each player a folder of their own: `content\\Boring Man Tutorial\\Instance0`, `Instance1`, and so on.',
      'Copying the whole game for every player would be slow and fill your disk. `Game.SymlinkGame = true` fills each folder with **links** to the real files instead: they look like the files but take no space. (The .exe itself is a real copy, and the folders go when you close Nucleus.)',
      'A link is still the same file, though: if two players write to it, they write to the same file. `FileSymlinkCopyInstead` lists files each player gets a **real copy** of. Boring Man keeps settings in `options.ini`, next to its .exe.',
      block(FOLDERS_L + COPY_L, lastLine(S.game) + '\n\n// A folder for each player'),
    ],
    task: 'Add the two lines.',
    notes: [
      { kind: 'why', text: 'How do you know which files need a copy? By testing: start two copies and see what they fight over. A later chapter is about exactly that.' },
      { kind: 'odd', text: 'Nucleus matches these names as **part** of a file name, not the whole name: `"options.ini"` would also catch a `myoptions.ini`. Use names specific enough.' },
    ],
    start: S.game + '\n// A folder for each player\n',
    solution: S.folders,
    check: (t) => wants(t, [['Game.SymlinkGame', 'true'], ['Game.FileSymlinkCopyInstead', ['options.ini']]]),
    pane: 'check',
  },
  {
    id: 'environment',
    section: 'Each player\'s copy',
    title: 'A settings folder for each player',
    kind: 'code',
    text: [
      'Many games keep their settings in your user folder, not their own: Boring Man uses `AppData\\Local\\BoringManRewrite`. Every copy would share it.',
      '`Game.UseNucleusEnvironment = true` gives each player their own user folders: `C:\\Users\\you\\NucleusCoop\\<player>\\AppData\\…`. `Game.UserProfileConfigPath` says where the game\'s settings are, so Nucleus copies yours into each player\'s, to start from.',
      block(ENV_L, lastLine(S.folders) + '\n\n// Each player\'s own settings folder'),
    ],
    task: 'Add the two lines. The backslashes are doubled: that\'s how a `\\` is written inside quotes.',
    notes: [
      { kind: 'odd', text: 'Nucleus copies your settings only the **first** time a player name is used. Changes after that stay in that player\'s folder: to start a player over, delete their folder in `C:\\Users\\you\\NucleusCoop`.' },
    ],
    start: S.folders + '\n// Each player\'s own settings folder\n',
    solution: S.environment,
    check: (t) => wants(t, [['Game.UseNucleusEnvironment', 'true'], ['Game.UserProfileConfigPath', 'AppData\\\\Local\\\\BoringManRewrite']]),
    pane: 'check',
  },
  {
    id: 'steam',
    section: 'Each player\'s copy',
    title: 'Steam',
    kind: 'code',
    text: [
      'Steam runs one copy of a game per account, and Boring Man\'s copies find each other through Steam. `Game.UseGoldberg = true` puts the **Goldberg Steam emulator** in each copy instead: every copy thinks it has Steam to itself, and they find each other on your network.',
      '`Game.SteamID` tells it which game this is: the number in the game\'s Steam page address (store.steampowered.com/app/**346120**).',
      block(STEAM_L, lastLine(S.environment) + '\n\n// Steam'),
    ],
    task: 'Add the two lines.',
    notes: [
      { kind: 'why', text: 'Most handlers for Steam games start here, and so does the official guide. It works when the game plays together through Steam itself, not through its own online servers.' },
      { kind: 'pitfall', text: 'Antivirus programs often flag Goldberg by mistake. That\'s why the installation guide has you add Nucleus\' folder to Microsoft Defender\'s exclusions.' },
    ],
    start: S.environment + '\n// Steam\n',
    solution: S.steam,
    check: (t) => wants(t, [['Game.UseGoldberg', 'true'], ['Game.SteamID', '346120']]),
    pane: 'check',
  },
  {
    id: 'windows',
    section: 'Windows and focus',
    title: 'The windows',
    kind: 'code',
    text: [
      'To move and size each copy\'s window, Nucleus first finds it by its title: `Game.Hook.ForceFocusWindowName`. Boring Man\'s window is called `Boring Man`.',
      '`ResetWindows` puts each window in its place when the next copy starts, and `SetWindowHook` stops the game moving its own window after that. `RefreshWindowAfterStart` minimizes and restores each window once they\'re all open, which wakes some games up.',
      block(WINDOWS_L, lastLine(S.steam) + '\n\n// The windows'),
    ],
    task: 'Add the four lines.',
    notes: [
      { kind: 'odd', text: 'If every window ends up full screen or on top of the others, Nucleus may not have found them: the window name is the first thing to check.' },
    ],
    start: S.steam + '\n// The windows\n',
    solution: S.windows,
    check: (t) => wants(t, [['Game.Hook.ForceFocusWindowName', 'Boring Man'], ['Game.ResetWindows', 'true'], ['Game.SetWindowHook', 'true'], ['Game.RefreshWindowAfterStart', 'true']]),
    pane: 'check',
  },
  {
    id: 'focus',
    section: 'Windows and focus',
    title: 'Every window in focus',
    kind: 'code',
    text: [
      'Windows sends your keys to one window: the one in focus. Many games stop listening, or pause, when theirs isn\'t. With four copies, three never are.',
      '`Game.HookFocus = true` makes Nucleus trick each copy into thinking it\'s the window in focus.',
      block(FOCUS_L, lastLine(S.windows) + '\n\n// Every window in focus'),
    ],
    task: 'Add the line.',
    notes: [
      { kind: 'why', text: 'This is a **hook**: Nucleus slips its own code into each copy and answers some of its questions to Windows. That\'s how a handler changes things the game has no setting for.' },
    ],
    start: S.windows + '\n// Every window in focus\n',
    solution: S.focus,
    check: (t) => wants(t, [['Game.HookFocus', 'true']]),
    pane: 'check',
  },
  {
    id: 'timing',
    section: 'Windows and focus',
    title: 'One copy at a time',
    kind: 'code',
    text: [
      'Nucleus starts the copies one after another. `Game.PauseBetweenStarts` is how long it waits before the next, so each window is up before the next one opens. The tested handler waits 25.',
      '`Game.HandlerInterval` is how often, in milliseconds, Nucleus checks on the windows while you play. Leave it out and it\'s 0: Nucleus never checks, and everything that needs it (like keeping windows in place) stops.',
      block(TIMING_L, lastLine(S.focus) + '\n\n// Timing'),
    ],
    task: 'Add the two lines.',
    notes: [
      { kind: 'odd', text: '`PauseBetweenStarts` is in **seconds**, though its docs say milliseconds: Nucleus waits `TimeSpan.FromSeconds(…)`. On a fast PC a lower number may work: try it.' },
    ],
    start: S.focus + '\n// Timing\n',
    solution: S.timing,
    check: (t) => wants(t, [['Game.PauseBetweenStarts', 25], ['Game.HandlerInterval', 100]]),
    pane: 'check',
  },
  {
    id: 'input',
    section: 'Controllers and keyboard',
    title: 'Which controllers',
    kind: 'code',
    text: [
      '`Game.SupportsKeyboard = true` lets one player use the keyboard and mouse; everyone else gets a controller.',
      'Controllers come in two kinds: **XInput** (Xbox-style, what most games and controllers use today) and the older **DirectInput**. Boring Man uses XInput, so `Hook.XInputEnabled` is on. `Hook.CustomDllEnabled` is another way of handing out controllers, which this handler doesn\'t use: XInputPlus (next lesson) does that job.',
      block(INPUT_L, lastLine(S.timing) + '\n\n// Controllers and keyboard'),
    ],
    task: 'Add the three lines.',
    notes: [
      { kind: 'pitfall', text: 'One keyboard means one keyboard player: Windows sends every key to the window in focus. Several keyboards and mice need Proto Input, which is a chapter of its own.' },
      { kind: 'odd', text: '`CustomDllEnabled = false` looks like it could go, but it can\'t: it\'s **on** unless a handler turns it off, and then Nucleus would add its own XInput DLL as well as XInputPlus.' },
    ],
    start: S.timing + '\n// Controllers and keyboard\n',
    solution: S.input,
    check: (t) => wants(t, [['Game.SupportsKeyboard', 'true'], ['Game.Hook.XInputEnabled', 'true'], ['Game.Hook.CustomDllEnabled', 'false']]),
    pane: 'check',
  },
  {
    id: 'controllers',
    section: 'Controllers and keyboard',
    title: 'One controller each',
    kind: 'code',
    text: [
      'Left alone, every copy would listen to every controller. `Game.XInputPlusDll` puts **XInputPlus** in each copy, set up so the game sees only its own player\'s controller.',
      '`Game.UseDInputBlocker = true` blocks DirectInput in each copy, so no controller sneaks in that way.',
      block(ONE_PAD_L, lastLine(S.input)),
    ],
    task: 'Add the two lines at the end of the controller part.',
    notes: [
      { kind: 'why', text: 'Nucleus writes each copy\'s `XInputPlus.ini` with `Controller1=` set to that player\'s controller. To the game, it\'s the only controller there is.' },
    ],
    start: S.input,
    solution: S.pads,
    check: (t) => wants(t, [['Game.XInputPlusDll', ['xinput1_3.dll']], ['Game.UseDInputBlocker', 'true']]),
    pane: 'check',
  },
  {
    id: 'exclusions',
    section: 'Controllers and keyboard',
    title: 'Files Nucleus brings',
    kind: 'code',
    text: [
      'Goldberg brings its own `steam_api.dll` and `steam_appid.txt`; XInputPlus and the DInput blocker bring their own `xinput1_3.dll` and `dinput8.dll`. Links to the game\'s own files under those names would be in the way.',
      '`Game.FileSymlinkExclusions` lists files Nucleus leaves out of the folders, so its own can go there.',
      block(EXCLUDE_L, lastLine(S.pads) + '\n\n// Files Nucleus puts in each copy itself'),
    ],
    task: 'Add the line.',
    notes: [
      { kind: 'odd', text: 'Leave one out and the game may start with its real Steam DLL, or see every controller, even though everything else is right. Like the copy list, these match **part** of a file name.' },
    ],
    start: S.pads + '\n// Files Nucleus puts in each copy itself\n',
    solution: S.exclusions,
    check: (t) => wants(t, [['Game.FileSymlinkExclusions', ['steam_api.dll', 'steam_appid.txt', 'dinput8.dll', 'xinput1_3.dll']]]),
    pane: 'check',
  },
  {
    id: 'description',
    section: 'Testing',
    title: 'A note for the players',
    kind: 'code',
    text: [
      '`Game.Description` is shown in Nucleus when someone picks the game, before they start. Say what they need to do that the handler can\'t: here, how the copies join each other, and a fix for a window stuck behind the taskbar.',
      block(DESCRIPTION_L, lastLine(S.name) + '\n\n// What players read before they start'),
    ],
    task: 'Add the `Game.Description` line. The Show me button has the tested handler\'s; your own words are fine too.',
    notes: [
      { kind: 'why', text: 'Every copy runs on the same PC, so "direct connect" means joining `localhost`: "this computer".' },
    ],
    start: S.exclusions.replace(NAME_L, NAME_L + '\n// What players read before they start\n'),
    solution: S.description,
    check: (t) => ((str(t, 'Game.Description') ?? '').trim().length > 10 ? firstProblem(t) : 'Add Game.Description = "…"; with a sentence or two, in quotes.'),
    pane: 'check',
  },
  {
    id: 'test',
    section: 'Testing',
    title: 'Test it in Nucleus Co-op',
    kind: 'test',
    text: [
      'Your handler can now run copies of Boring Man, each with its own folder, Steam, window and controller. Time to try it for real.',
    ],
    steps: [
      'Download the zip (the button below) and drag it onto Nucleus Co-op: it replaces your last version.',
      'Pick **Boring Man Tutorial** and read your note under its cover. Drag the keyboard icon onto the screen, and a controller if you have one (hold a button: it lights up).',
      'Press `>`, then **PLAY**, and wait for both windows (25 seconds between them).',
      'Look at the windows.',
    ],
    notes: [
      { kind: 'alt', text: 'You can drag the `.js` straight onto Nucleus too. It **moves** the file into its handlers folder, so it\'s gone from where it was: keep a copy.' },
    ],
    start: FIRST_TEST,
    solution: FIRST_TEST,
    download: 'zip',
    ask: {
      question: 'How do the windows look?',
      answers: [
        { label: 'Full screen, on top of each other', reply: 'That\'s the bug the next lesson is about.' },
        { label: 'Side by side, each in its half', reply: 'Your Boring Man was already set to a window. Other people\'s won\'t be: the next lesson makes sure.' },
        { label: 'Something else', reply: 'Look at the list on the last page: it starts from what you see.' },
      ],
    },
  },
  {
    id: 'fullscreen',
    section: 'Each player\'s settings',
    title: 'Why the windows were full screen',
    kind: 'code',
    text: [
      'Boring Man starts full screen unless its settings say otherwise, and a full-screen window can\'t be put in half the screen. The setting is `Fullscreen`, in the `[Video]` part of `bm_settings.ini`, in each player\'s settings folder.',
      '`Game.Play` is a function Nucleus runs **once for each player**, just before their copy starts. Inside it, `Context` is about that player: `Context.EnvironmentPlayer` is their user folder. `Context.ModifySaveFile` changes keys in an INI file.',
      block('\n// Each player\'s settings\nGame.Play = function () {\n' + PLAY_BODY + '};', lastLine(S.description)),
      '**Try it**, under the code, runs `Game.Play` for each player in your browser and shows what it would change. It catches mistakes like this one in a second; a test in Nucleus Co-op takes minutes. Nothing on your PC is touched.',
    ],
    task: 'Add `Game.Play` at the end, then look at what each player gets in Try it.',
    notes: [
      { kind: 'odd', text: 'The value is `\'"0"\'`: the quotes are part of it. Boring Man writes `Fullscreen="0"` in its file, so the handler does too.' },
      { kind: 'pitfall', text: 'The file is only in a player\'s folder if Nucleus could copy yours: start Boring Man once on its own first (step 3 of "Get ready").' },
    ],
    start: S.description,
    solution: FINAL,
    check: (t) => {
      const e = firstProblem(t);
      if (e) return e;
      const r = run(t);
      if (!r.loaded) return `The handler doesn't load: ${r.loadError ?? 'see Check'}`;
      if (!r.hasPlay) return 'Add the Game.Play function at the end.';
      return r.players.every((_, i) => iniWrites(r, i).some((w) => /^bm_settings\.ini: \[Video\] Fullscreen = "0"$/.test(w))) ? null : 'In Try it, each player should change bm_settings.ini: [Video] Fullscreen = "0".';
    },
    pane: 'tryit',
  },
  {
    id: 'test-again',
    section: 'Each player\'s settings',
    title: 'Test it again',
    kind: 'test',
    text: [
      'Here\'s the finished handler, zipped the way Nucleus installs it. Drag it onto Nucleus Co-op: it replaces the first version.',
    ],
    steps: [
      'Download the zip (the button below) and drag it onto Nucleus Co-op.',
      'Start Boring Man Tutorial with 2 players, as before.',
      'Host a game in one window. In the other, join it with **direct connect** to `localhost`. Click a window to use the keyboard there.',
    ],
    notes: [
      { kind: 'why', text: 'It does what the tested Boring Man handler on the Hub does, in fewer lines. Its own name aside, it leaves out lines that change nothing (in red above): ' + droppedNotes().join('; ') + '.' },
      { kind: 'odd', text: '**Windows still full screen:** start Boring Man once on its own, or delete the players\' folders in `C:\\Users\\you\\NucleusCoop` so Nucleus copies your settings again. **Both windows react to one controller:** the controller lessons. **A window behind the taskbar:** Ctrl+T twice, as your note says. **The game won\'t start a second copy:** the Steam lesson.' },
    ],
    start: FINAL,
    solution: FINAL,
    download: 'zip',
    after: ['**The Hub handler next to yours.** Red lines are in the Hub one and not in yours; green ones are yours instead.', hubDiff()],
  },
];

export const CHAPTERS: Chapter[] = [
  {
    id: 'first-handler',
    title: 'Making your first handler',
    blurb: 'Write a handler for “Boring Man”, a free shooter game on Steam, a few lines at a time, and test it in Nucleus Co-op.',
    lessons: FIRST,
  },
];

/** The file name downloads get: the handler's GameName. */
export const FILE_NAME = 'Boring Man Tutorial';
/** The lesson a lesson id is (1-based), for the intro's list of what a handler does. */
export const lessonNumber = (id: string, chapter = CHAPTERS[0]) => chapter.lessons.findIndex((l) => l.id === id) + 1;
/** The problems in a lesson's solution (tests: the solution is what people copy, so there must be none). */
export const solutionErrors = (l: Lesson) => (l.kind === 'code' || l.kind === 'test' ? problems(l.solution, l).map((d) => `${d.rule}: ${d.message}`) : []);
/** Where a link points: learn/#<chapter>/<lesson>. */
export function findLesson(hash: string): { chapter: Chapter; index: number } {
  const [c, l] = hash.replace(/^#/, '').split('/');
  const chapter = CHAPTERS.find((x) => x.id === c) ?? CHAPTERS[0];
  const index = Math.max(0, chapter.lessons.findIndex((x) => x.id === l));
  return { chapter, index };
}
