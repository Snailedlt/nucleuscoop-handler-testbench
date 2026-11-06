// Tips: a loading-screen-style tip bar under the code, plus Clippy-style tips that react to what
// is being edited (each shown once). Every claim here is verified (see splitscreenme-vscode's
// AGENTS.md "Facts the code relies on" and the testbench probes). Can be turned off.
// General tips come in five topics: best practices and pitfalls (writing handlers: Nucleus and Jint
// behaviour), and shortcuts, settings and features (using this workbench). Add one with every new
// workbench feature.

export interface TipContext {
  text: string;
  lineText: string; // the line the cursor is on
  inCallback: boolean;
}
export interface Tip {
  id: string;
  text: string; // plain text; `code` in backticks
  /** General tips: about writing handlers, or about using the workbench. */
  kind?: 'handler' | 'gui';
  /** What kind of tip it is, shown as its label. */
  topic?: 'Best practice' | 'Pitfall' | 'Shortcut' | 'Setting' | 'Feature';
  /** Clippy-style: shown once, when this is true. */
  when?: (c: TipContext) => boolean;
  /** Optional action button. */
  action?: { label: string; run: 'lines' | 'new' | 'examples' | 'tryit' | 'share' };
}

const has = (c: TipContext, s: string) => c.text.includes(s);

export const CONTEXT_TIPS: Tip[] = [
  {
    id: 'start',
    text: 'Starting from scratch? A template or a Hub handler for a similar game gets you most of the way.',
    when: (c) => c.text.trim().length < 120,
    action: { label: 'New handler…', run: 'new' },
  },
  {
    id: 'protocontroller',
    text: 'Each instance takes at most 4 controllers: `ProtoController1` to `ProtoController4`. Lines for 5 and up do nothing.',
    when: (c) => /ProtoController\d/.test(c.lineText),
  },
  {
    id: 'es5',
    text: 'Nucleus only reads ES5 JavaScript: no arrow functions (`=>`) or template literals (`` ` ``). Use `function () {}` and `"a" + b`.',
    when: (c) => /=>|`/.test(c.lineText),
  },
  {
    id: 'hub-scan',
    text: 'When a handler is installed from the Hub, Nucleus finds `Game.GameName` and `Game.ExecutableName` by reading lines that start with them. Keep each on one line, with the value in double quotes.',
    when: (c) => /^\s*Game\.(GameName|ExecutableName)\b/.test(c.lineText),
  },
  {
    id: 'dpi',
    text: '`Game.DPIHandling = true` means Scaled, not True. Write `Nucleus.DPIHandling.True` to get True.',
    when: (c) => /DPIHandling/.test(c.lineText),
  },
  {
    id: 'multi-kbm',
    text: 'For several keyboards and mice, the docs mark the old `Game.Hook*` input options deprecated. New handlers use Proto Input (`Game.ProtoInput.*`).',
    when: (c) => /SupportsMultipleKeyboardsAndMice\s*=\s*true/.test(c.text) && !has(c, 'Game.ProtoInput.'),
  },
  {
    id: 'onstop',
    text: '`Game.OnStop` and `Game.OnFinishedSetup` see the last player’s `Context`, not every player’s. Loop over `PlayerList` to reach the others.',
    when: (c) => /OnStop|OnFinishedSetup/.test(c.lineText),
  },
  {
    id: 'hub-lines',
    text: '`Hub.*` lines are written by the Hub when you upload. You don’t need to add or change them.',
    when: (c) => /^\s*Hub\./.test(c.lineText),
  },
  {
    id: 'mutex',
    text: 'Not sure which mutex to kill? Hub handlers for games on the same engine often use the same one. Search the examples.',
    when: (c) => /KillMutex\b/.test(c.lineText),
    action: { label: 'Examples', run: 'examples' },
  },
  {
    id: 'guid',
    text: 'Choose `Game.GUID` once and keep it: Nucleus files each player’s game, profiles and covers under it, so changing it in an update drops the game from their list.',
    when: (c) => /^\s*Game\.GUID\b/.test(c.lineText),
  },
  {
    id: 'addoption',
    text: 'Option values come back as text once players save a profile: use `["Yes", "No"]` and compare with `"Yes"`.',
    when: (c) => /Game\.AddOption\s*\(/.test(c.lineText),
  },
  {
    id: 'hotkeys',
    text: 'Each `Game.CustomHotkeys` entry needs a `Game.OnCustomHotKey_1`, `_2`, … function: a hotkey without one crashes Nucleus when pressed.',
    when: (c) => /CustomHotkeys/.test(c.lineText),
  },
  // Line-specific heads-ups above win; this one is for when nothing else applies.
  {
    id: 'in-play',
    text: "You're in `Game.Play`. It runs once per player, just before that player's game starts. `Context` is that player's: `Context.Width`, `Context.Height`, `Context.PlayerID`.",
    when: (c) => c.inCallback && /Game\.Play\b/.test(c.text),
  },
];

// General tips, by topic. The bar shows the topic as its label, and Next goes round the topics.
type Topic = NonNullable<Tip['topic']>;
const T = (topic: Topic, list: Omit<Tip, 'topic' | 'kind'>[]): Tip[] => list.map((t) => ({ ...t, topic, kind: topic === 'Pitfall' || topic === 'Best practice' ? 'handler' : 'gui' }));

const BEST = T('Best practice', [
  { id: 'b-start-similar', text: 'Start from a Hub handler for a game on the same engine: it already has the mutexes, symlink rules and input setup that engine needs.', action: { label: 'Examples', run: 'examples' } },
  { id: 'b-context-size', text: 'In `Game.Play`, size things from `Context.Width` and `Context.Height`: they are this player’s window, so the handler works for any player count and monitor.' },
  { id: 'b-path-combine', text: 'Build paths with `System.IO.Path.Combine(Game.Folder, "file.ini")`: it puts the `\\` between the parts for you.' },
  { id: 'b-modify-save', text: 'Change a game’s settings file per player with `Context.ModifySaveFile` and `Nucleus.IniSaveInfo` instead of copying whole files.' },
  { id: 'b-guid-stable', text: 'Never change `Game.GUID` in an update: Nucleus files each player’s game, profiles and covers under it, so a new GUID makes the game vanish from their list.' },
  { id: 'b-option-text', text: 'Give `Game.AddOption` text values (`["Yes", "No"]`), not `true`/`false` or numbers: a saved profile gives every option back as text, so `== true` stops matching.' },
  { id: 'b-max-players', text: 'Set `Game.MaxPlayers` to the most players you have actually tested. Try it’s Test all combinations checks every count up to it in one go.', action: { label: 'Try it', run: 'tryit' } },
  { id: 'b-file-copy', text: '`System.IO.File.Copy(from, to, true)`: the third argument overwrites. Without it, a second run throws and ends the session.' },
  { id: 'b-utf8', text: 'Save handlers as UTF-8: Nucleus reads them that way, so accented letters in an ANSI file arrive broken.' },
  { id: 'b-gamename', text: 'Keep `Game.GameName` unique and free of `\\`: the Hub install names the handler’s file and folder after it, so two handlers with the same name overwrite each other.' },
  { id: 'b-plugins', text: 'A handler can bring .NET plugins: list them in `pluginsInfo.txt` in its folder (`#Name#MyLib.dll#MyLib.MyClass`) and Nucleus adds `Name` as a global.' },
  { id: 'b-test-before-upload', text: 'Before uploading: Check with no errors, Test all combinations in Try it, then one real run in Nucleus with two players. Windows, focus and input only show there.' },
]);

const PITFALLS = T('Pitfall', [
  { id: 'p-case', text: 'Only the first letter of a name ignores case: `Game.killMutex` works, `Game.KillMUTEX` is silently ignored.' },
  { id: 'p-typos', text: 'A misspelled option doesn’t raise an error: Nucleus just ignores the line. Check lists them, and Lines marks the names Nucleus really reads with ✓.' },
  { id: 'p-context-top', text: '`Context`, `Player` and `PlayerList` only exist inside callbacks such as `Game.Play`. At the top of the file they stop Nucleus from loading the handler.' },
  { id: 'p-play-error', text: 'An error inside `Game.Play` ends the whole session, for every player. Try it shows the line that would fail.', action: { label: 'Try it', run: 'tryit' } },
  { id: 'p-es5', text: 'Nucleus understands ES5 only: no `=>`, no template literals, no `includes()` or `find()`. Use `function () {}`, `"a" + b` and `indexOf`.' },
  { id: 'p-letconst', text: '`let` and `const` load, but behave like `var`: they belong to the whole function, not the block, and `const` can be reassigned.' },
  { id: 'p-backslash', text: 'A string can’t continue on the next line with `\\`: Nucleus reads the file line by line. Join the parts with `+`.' },
  { id: 'p-args', text: 'Call functions with every argument, even ones that look optional in the docs: Nucleus’ engine doesn’t fill in C# defaults, and the call fails.' },
  { id: 'p-protocontroller', text: 'Each instance takes at most four controllers: `ProtoController1` to `ProtoController4`. Lines for 5 and up do nothing.' },
  { id: 'p-dpi', text: '`Game.DPIHandling = true` means Scaled, not True. Write `Nucleus.DPIHandling.True` for True.' },
  { id: 'p-hub-lines', text: 'The Hub install looks for lines that start with `Game.GameName` and `Game.ExecutableName`, comments included, and reads the value between the first and last `"`. Keep them simple and unindented.' },
  { id: 'p-exe-name', text: 'Set `Game.ExecutableName` even with `Game.ExecutableNames`: Nucleus’ Search disks reads it without checking, and stops with an error when it’s missing.' },
  { id: 'p-play-flags', text: '`Game.GamePlayBeforeGameSetup` and `Game.GamePlayAfterLaunch` both `true` means `Game.Play` never runs.' },
  { id: 'p-startargs-late', text: 'With `Game.GamePlayAfterLaunch`, setting `Context.StartArguments` in `Game.Play` does nothing: the game has already started.' },
  { id: 'p-hotkeys', text: 'Each `Game.CustomHotkeys` entry needs its `Game.OnCustomHotKey_N` function: pressing a hotkey without one crashes Nucleus.' },
  { id: 'p-last-context', text: '`Game.OnStop` and `Game.OnFinishedSetup` see the last player’s `Context`. Loop over `PlayerList` to reach the others.' },
  { id: 'p-sse', text: 'Nucleus never calls `Game.SetupSse`. Put that code in `Game.Play`.' },
  { id: 'p-forcefinish', text: '`Game.ForceFinishOnPlay` is from the original Nucleus Coop and does nothing now: Nucleus closes leftover copies of the game itself when a session starts.' },
]);

const SHORTCUTS = T('Shortcut', [
  { id: 's-palette', text: 'Ctrl+Shift+P (or F1) opens the command palette, as in VS Code: format, fix, Try it, theme and the rest, each with its shortcut.' },
  { id: 's-open', text: 'Ctrl+P (or Ctrl+K) opens the examples, templates and Hub handlers. Type `>` there to switch to commands.', action: { label: 'Examples', run: 'examples' } },
  { id: 'f-looks-past', text: 'Miss the old Nucleus Co-op? Settings (Ctrl+,) → Theme has vlxst\'s Mac style and the original alpha 8 look, light and dark.' },
  { id: 'f-code-colours', text: 'Prefer your editor\'s colours? Settings (Ctrl+,) → Theme → Code colours: GitHub, VS Code, Xcode, One, Monokai or Dracula, with any look.' },
  { id: 'f-custom-theme', text: 'Make the workbench yours: Settings (Ctrl+,) → Theme → "Download this look as a theme file", keep only the colours you change, then "Load a theme file…". It shows up under Look, next to the built-in ones.' },
  { id: 'f-ref-home', text: 'Not sure what an option is called? Open Reference with nothing typed and browse Game, Context, Player and the rest, or see the names Hub handlers use most.' },
  { id: 'f-lines-ref', text: 'Open the Reference tab, then point at names in Lines (Ctrl+B): each one\'s full docs show in Reference, on a wide screen.', action: { label: 'Lines', run: 'lines' } },
  { id: 's-open-keys', text: 'In Open (Ctrl+K), the arrow keys move between tiles, templates and Hub rows; Home and End jump to the first and last. Hover a Hub handler\'s icons for players, keyboards and mice, and downloads.', action: { label: 'Examples', run: 'examples' } },
  { id: 's-format', text: 'Shift+Alt+F formats the code: indentation and spacing only. Nothing moves to another line, so Nucleus reads it exactly as before.' },
  { id: 's-f8', text: 'F8 jumps to the next problem, Shift+F8 to the one before. Ctrl+. shows the fixes for the line you’re on.' },
  { id: 's-tryit', text: 'Ctrl+Enter runs Try it on the code as it is now.', action: { label: 'Try it', run: 'tryit' } },
  { id: 's-lines', text: 'Ctrl+B (or Ctrl+Shift+L) shows or hides Lines.', action: { label: 'Show Lines', run: 'lines' } },
  { id: 's-edit', text: 'VS Code’s editing keys work: Ctrl+/ comments a line, Alt+↑/↓ moves it, Shift+Alt+↑/↓ copies it, Ctrl+D selects the next match.' },
  { id: 's-goto', text: 'Ctrl+G goes to a line number, handy with a line from a Nucleus error message.' },
  { id: 's-suggest', text: 'Type `.` after `Game`, `Context` or `Nucleus`, or press Ctrl+Space, for the names that exist there, with their docs.' },
  { id: 's-save', text: 'Ctrl+S downloads the handler as a .zip that Nucleus Co-op can install. Ctrl+, opens Settings, and ? lists every shortcut.' },
]);

const SETTINGS = T('Setting', [
  { id: 'c-theme', text: 'Light, dark or your device’s theme: Settings (the gear, or Ctrl+,), or type "theme" in the command palette (Ctrl+Shift+P).' },
  { id: 'c-editor', text: 'Settings has the text size, line wrapping and, on phones, a row of symbol keys (; = " ( ) { } [ ]) above the keyboard.' },
  { id: 'c-advanced', text: 'Advanced mode (top right) adds rule ids, filters, recorded calls in Try it, and the engine probes behind the checks.' },
  { id: 'c-lines', text: 'The ⚙ in Lines sets its grouping (a tree, by object or by topic) and a wider column for long names.', action: { label: 'Show Lines', run: 'lines' } },
  { id: 'c-review', text: 'Fix all shows a before/after to accept first. Tick Apply without review to skip that.' },
  { id: 'c-tips', text: 'Turn tips off with "Tips: on" at the bottom, or in Settings. "Show heads-ups again" there brings back the ones about specific lines.' },
  { id: 'c-wakatime', text: 'Use WakaTime? Add your API key in Settings: writing, testing in Try it and reading docs show up as separate categories. The code is never sent.' },
]);

const FEATURES_ = T('Feature', [
  { id: 'f-lines', text: 'Lines lists every name a handler can use, as a tree. Names already in the handler show their value; click one to insert it.', action: { label: 'Show Lines', run: 'lines' } },
  { id: 'f-hover', text: 'Hover any name in the code for its docs. In Lines, the (i) next to a name also says how many Hub handlers use it.' },
  { id: 'f-tryit', text: 'Try it shows what each player gets: window, launch arguments and every file change, without Nucleus or the game.', action: { label: 'Try it', run: 'tryit' } },
  { id: 'f-testall', text: 'Test all combinations runs every player count, input setup and monitor size, and lists what fails and why.', action: { label: 'Try it', run: 'tryit' } },
  { id: 'f-share', text: 'Copy link shares the handler as a link. Select some lines first to share only those.', action: { label: 'Copy link', run: 'share' } },
  { id: 'f-package', text: 'Open a .zip or .nc and its other files are kept: "+ N files" shows each one, where Nucleus installs it and what’s inside, and saving puts them back.' },
  { id: 'f-reference', text: 'The Reference tab searches every option, Context member and Nucleus enum with its docs: try "window title" or "mutex".' },
  { id: 'f-mascots', text: 'Meet Nucli, the quiet atom who checks your handler: he dozes until there\'s code, cheers when there\'s nothing to fix and runs Test all. Duo, splitscreen.me\'s split-screen ball, turns up when something won\'t load.' },
  { id: 'f-mascot-modes', text: 'Want Duo and Nucli livelier, or nothing moving at all? Settings → Theme → Motion has presets and a switch for each kind of motion, including Nucli editing the code during fixes.' },
  { id: 'f-wm-plus', text: 'Blocking window messages with Proto Input? Each number in Game.ProtoInput.BlockedMessages shows its name, and the + before the ] adds the ones handlers block most.' },
  { id: 'f-eq-values', text: 'Type a space after = (as in Game.SymlinkGame = ) and the editor suggests the values that option takes. For Game.Play it writes the whole function.' },
  { id: 'f-votes', text: 'Was a tip useful? The 👍 and 👎 next to it tell us, anonymously. The docs Claude wrote have them too.' },
  { id: 'f-swipe', text: 'Done with a note at the bottom right? Swipe it away to the right, or hover the stack to read them all.' },
  { id: 'f-gutter', text: 'Click a marker next to a line number for that line’s problems and fixes.' },
  { id: 'f-hub', text: 'The examples include the most-downloaded verified Hub handlers. Check and Try it work on them, so you can see how others solved a problem.', action: { label: 'Examples', run: 'examples' } },
  { id: 'f-vscode', text: 'Prefer your own editor? The VS Code extension has the same checks, docs on hover and Try it, for the files in your handlers folder.' },
]);

const GROUPS = [PITFALLS, SHORTCUTS, BEST, FEATURES_, SETTINGS];
/** Every general tip, the topics taking turns, so Next goes round them. */
export const GENERAL_TIPS: Tip[] = Array.from({ length: Math.max(...GROUPS.map((g) => g.length)) }, (_, i) => GROUPS.map((g) => g[i])).flat().filter(Boolean);
