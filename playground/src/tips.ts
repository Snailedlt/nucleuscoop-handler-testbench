// Tips: a loading-screen-style tip bar under the code, plus Clippy-style tips that react to what
// is being edited (each shown once). Every claim here is verified (see splitscreenme-vscode's
// AGENTS.md "Facts the code relies on" and the testbench probes). Can be turned off.

export interface TipContext {
  text: string;
  lineText: string; // the line the cursor is on
  inCallback: boolean;
}
export interface Tip {
  id: string;
  text: string; // plain text; `code` in backticks
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
  // Line-specific heads-ups above win; this one is for when nothing else applies.
  {
    id: 'in-play',
    text: "You're in `Game.Play`. It runs once per player, just before that player's game starts. `Context` is that player's: `Context.Width`, `Context.Height`, `Context.PlayerID`.",
    when: (c) => c.inCallback && /Game\.Play\b/.test(c.text),
  },
];

export const GENERAL_TIPS: Tip[] = [
  { id: 'g-case', text: 'Only the first letter of a name ignores case: `Game.killMutex` works, `Game.KillMUTEX` is silently ignored.' },
  { id: 'g-typos', text: 'Nucleus ignores misspelled options without an error. The Check tab and the ✓ marks in Lines show what Nucleus will really use.' },
  { id: 'g-context', text: '`Context` only exists inside `Game.Play` and other callbacks. At the top of the handler it stops Nucleus from loading it.' },
  { id: 'g-play-error', text: 'An error inside `Game.Play` ends the whole session, for every player. Try it shows where it would fail.', action: { label: 'Try it', run: 'tryit' } },
  { id: 'g-backslash', text: 'Nucleus reads a handler line by line, so a string can’t continue on the next line with a backslash. Join it with `+` instead.' },
  { id: 'g-letconst', text: '`let` and `const` work, but Nucleus treats them like `var`: they belong to the whole function, not the block.' },
  { id: 'g-args', text: 'Functions need every argument, even ones that look optional in the docs: Nucleus doesn’t fill in defaults.' },
  { id: 'g-exe', text: 'Set `Game.ExecutableName` even when you use `Game.ExecutableNames`: Nucleus’ "Search disks" needs it.' },
  { id: 'g-lines', text: 'The Lines list has every name a handler can use. Click one to insert it; names already in the handler show their value.', action: { label: 'Show Lines', run: 'lines' } },
  { id: 'g-ctrlk', text: 'Press Ctrl+K (⌘K on a Mac) to open examples, Hub handlers and every action.' },
  { id: 'g-hover', text: 'Hover any name in the code for its docs. Type `.` or press Ctrl+Space for suggestions.' },
  { id: 'g-f8', text: 'F8 jumps to the next problem. Alt+Shift+F fixes everything that can be fixed automatically.' },
  { id: 'g-share', text: 'Copy link shares the handler as a link. Select some lines first to share only those.', action: { label: 'Copy link', run: 'share' } },
  { id: 'g-tryit', text: 'Try it shows what each player gets: window position, launch arguments and file changes.', action: { label: 'Try it', run: 'tryit' } },
  { id: 'g-hub', text: 'Stuck? A Hub handler for a game on the same engine is often the fastest way to see what works.', action: { label: 'Examples', run: 'examples' } },
  { id: 'g-save', text: 'Save for Nucleus makes a .zip that Nucleus Co-op can install.' },
];
