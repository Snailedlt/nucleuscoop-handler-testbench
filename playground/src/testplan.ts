// "Help test this beta": what each kind of handler author should try, and how. Shown from the footer and the
// command palette while BETA is true.
// AT THE FULL (NON-BETA) RELEASE: set BETA to false (the guide and its entry points disappear), or rewrite the plan for
// what still needs testing. AGENTS.md › Releasing says so too.
export const BETA = true;

/** Who's testing: how much they code, and how well they know Nucleus Co-op's handlers and API. */
export type Coding = 'new' | 'dev';
export type NucleusKnow = 'new' | 'some' | 'expert';
export interface Profile { coding: Coding; nucleus: NucleusKnow }
/** What an item helps with. */
export type Area = 'api' | 'devx' | 'uiux';
export const AREAS: Record<Area, { label: string; who: string }> = {
  api: { label: 'API & docs', who: 'Best for people who know Nucleus\' handler API well: are the checks, docs and Try it right?' },
  devx: { label: 'Developer experience', who: 'Best for developers, also without Nucleus knowledge: is it fast, precise and pleasant to code in?' },
  uiux: { label: 'Look & ease of use', who: 'Best for people new to coding or to Nucleus: is it clear, friendly and easy to find your way?' },
};
/** How much each area suits a profile (3: made for you, 0: not really). */
export function fit(area: Area, p: Profile): number {
  if (area === 'api') return p.nucleus === 'expert' ? 3 : p.nucleus === 'some' ? 1.5 : 0;
  if (area === 'devx') return p.coding === 'dev' ? (p.nucleus === 'expert' ? 2 : 3) : 0;
  return p.coding === 'new' ? (p.nucleus === 'expert' ? 2 : 3) : 1;
}

export type Kind = 'task' | 'explore' | 'nucleus' | 'phone' | 'keyboard' | 'reader' | 'verify';

/** The kinds of testing, in plain words (shown as chips, explained in the legend). */
export const KINDS: Record<Kind, { label: string; how: string }> = {
  task: { label: 'Task', how: 'Do it from start to finish without help. Note where you got stuck or had to guess.' },
  explore: { label: 'Explore', how: 'Poke around freely and try to break it. Anything odd, ugly or confusing counts.' },
  nucleus: { label: 'Real Nucleus', how: 'Check the result in Nucleus Co-op itself: does it do what the workbench said it would?' },
  phone: { label: 'Phone', how: 'Use it on a phone or tablet (touch, small screen, on-screen keyboard).' },
  keyboard: { label: 'Keyboard only', how: 'Put the mouse away: everything should work with Tab, Enter, Esc and the shortcuts.' },
  reader: { label: 'Screen reader', how: 'With NVDA, VoiceOver or Narrator: is everything announced and in a sensible order?' },
  verify: { label: 'Check facts', how: 'Compare what the tool says with what you know Nucleus does, and tell us where it differs.' },
};


/** How long an item takes (shown as a chip). */
export const EFFORT: Record<1 | 2 | 3, { label: string; how: string }> = {
  1: { label: '~5 min', how: 'Quick: a few minutes in the workbench.' },
  2: { label: '~15 min', how: 'A bit longer, or needs a handler of your own.' },
  3: { label: '30 min+', how: 'Takes a while, usually with Nucleus Co-op and a game.' },
};
/** How much we need each item tested (3: most) and how long it takes (EFFORT). Recommended items are sorted by
 *  both: much needed and quick first. Unlisted items count as need 2, effort 2. */
const PRIORITY: Record<string, { need: 1 | 2 | 3; effort: 1 | 2 | 3 }> = {
  'first-handler': { need: 3, effort: 3 }, messages: { need: 3, effort: 1 }, phone: { need: 2, effort: 1 }, tips: { need: 1, effort: 1 },
  'own-handlers': { need: 3, effort: 2 }, 'claude-docs': { need: 3, effort: 1 }, 'window-messages': { need: 2, effort: 2 },
  keyboard: { need: 1, effort: 1 }, 'try-it': { need: 3, effort: 3 }, vscode: { need: 2, effort: 2 }, autocomplete: { need: 2, effort: 2 },
  reference: { need: 2, effort: 1 }, lines: { need: 1, effort: 1 }, tabs: { need: 2, effort: 1 }, layout: { need: 1, effort: 1 },
  'game-folder': { need: 2, effort: 2 }, form: { need: 3, effort: 1 }, packages: { need: 3, effort: 3 }, a11y: { need: 1, effort: 1 },
  compare: { need: 3, effort: 1 }, debugger: { need: 3, effort: 1 }, 'save-copy': { need: 3, effort: 2 }, 'hover-check': { need: 2, effort: 1 }, reader: { need: 1, effort: 2 },
};
export const priority = (t: { id: string }) => PRIORITY[t.id] ?? { need: 2 as const, effort: 2 as const };

export interface TestItem { id: string; areas: Area[]; kinds: Kind[]; title: string; steps: string; look: string }

export const TEST_PLAN: TestItem[] = [
  // --- New to coding: can you get a working handler without help?
  { id: 'first-handler', areas: ['uiux'], kinds: ['task', 'nucleus'], title: 'Make your first handler', steps: 'New handler… → fill in a game you own → fix what Check finds → Try it → Save for Nucleus → install it in Nucleus Co-op.', look: 'Could you finish without asking anyone? Which step was unclear? Did the game start in Nucleus?' },
  { id: 'messages', areas: ['uiux'], kinds: ['explore'], title: 'Do the messages make sense?', steps: 'Open "Handler with common mistakes" (Ctrl+K). Read each problem in Check and on hover, without opening Technical details.', look: 'Any word or sentence you didn\'t understand, or a fix you were afraid to press.' },
  { id: 'phone', areas: ['uiux'], kinds: ['phone', 'explore'], title: 'Write and fix on a phone', steps: 'Open the workbench on your phone. Type a few lines, tap an underlined word, use Lines, run Try it.', look: 'Anything too small to tap, hidden behind the keyboard, or cut off.' },
  { id: 'tips', areas: ['uiux'], kinds: ['explore'], title: 'Tips under the code', steps: 'Leave tips on while you work. Vote 👍 or 👎 on the ones you see.', look: 'Tips that came at the wrong moment, repeated, or pointed at the wrong thing.' },

  // --- Developers: precision, speed and the edge cases
  { id: 'own-handlers', areas: ['api'], kinds: ['verify', 'nucleus'], title: 'Check your own handlers', steps: 'Paste or open handlers you maintain (Ctrl+K also lists the Hub). Read every warning.', look: 'False alarms on handlers that work in Nucleus, and real problems it missed. Especially the new checks: Proto Input never starting, BlockedMessages without the filter hook, settings that need another one, the focus loop.' },
  { id: 'claude-docs', areas: ['api'], kinds: ['verify'], title: 'Check the AI-written docs', steps: 'Reference → Help check AI-written docs. Pick names you know well.', look: '👍 if it\'s right, 👎 and "Tell us what\'s wrong" if not. Each doc says what source it\'s based on.' },
  { id: 'window-messages', areas: ['api'], kinds: ['verify', 'nucleus'], title: 'Window messages in BlockedMessages', steps: 'In Game.ProtoInput.BlockedMessages, check the names after each number, hover them, and add one with the +.', look: 'Wrong names, and whether blocking them in Nucleus does what the hover says.' },
  { id: 'keyboard', areas: ['devx'], kinds: ['keyboard'], title: 'Keyboard only', steps: 'Ctrl+K, Ctrl+B, Ctrl+S, Ctrl+Enter, F8, Ctrl+. on a problem, Esc then Tab to leave the editor. Hover buttons for their shortcuts.', look: 'Anything you couldn\'t reach, a lost focus, or a shortcut that clashes with your browser.' },
  { id: 'try-it', areas: ['api'], kinds: ['verify', 'nucleus'], title: 'Try it against the real thing', steps: 'Run Try it and Test all combinations on a handler you know, then run it in Nucleus with the same players and screens.', look: 'Start arguments, window sizes, file changes or errors that differ from what Nucleus really does.' },
  { id: 'vscode', areas: ['devx'], kinds: ['explore'], title: 'The VS Code extension', steps: 'Install the .vsix from the start page and open a handler: completions after = (try Game.Play = ), hovers, quick fixes, Try it.', look: 'Anything that works in the workbench but not in VS Code, or the other way round.' },

  { id: 'autocomplete', areas: ['devx'], kinds: ['task', 'keyboard'], title: 'Write from scratch with suggestions', steps: 'Start an empty handler and write it using only suggestions: type Game. or Context., Ctrl+Space, a space after = (Game.SymlinkGame = , Game.Play = ), and the hints while typing a call.', look: 'Missing or wrong suggestions, suggestions in the way, and anything slower than your usual editor.' },
  { id: 'reference', areas: ['api'], kinds: ['verify'], title: 'Look things up in Reference', steps: 'Search Reference for options and Context members you use often, and for things you have wondered about.', look: 'Wrong or missing explanations, wrong types or defaults, and names that should be there but aren\'t.' },
  { id: 'lines', areas: ['uiux', 'devx'], kinds: ['explore'], title: 'Find a setting in Lines', steps: 'Open Lines (Ctrl+B), find an option you need without knowing its name, and insert it.', look: 'Could you find it? Was the grouping and the wording clear?' },

  { id: 'tabs', areas: ['uiux', 'devx'], kinds: ['explore'], title: 'Several handlers in tabs', steps: 'Edit a handler, then open an example (Ctrl+K): it opens in a new tab. Switch, undo in each, close one and undo, reload the page.', look: 'Lost work, the wrong tab after a reload, a wrong state dot, or undo mixing tabs.' },
  { id: 'layout', areas: ['uiux'], kinds: ['explore'], title: 'Slim bar or side rail', steps: 'Use the workbench a while with each: Settings › Layout.', look: 'Which you prefer and why; anything hard to find in either.' },
  { id: 'game-folder', areas: ['api'], kinds: ['verify', 'nucleus'], title: 'Check against your game folder', steps: 'Open a handler for a game you have installed, open Files and press Link the game’s folder (Your game on this PC). Read what it finds, and try the + on a symlink or exclusion list.', look: 'False alarms on a handler that works, missed real problems, wrong path forms for Nucleus, and whether the engine notes are right.' },
  { id: 'form', areas: ['uiux'], kinds: ['task'], title: 'Make a handler with the form', steps: 'New handler, then switch to Form and set it up there: change switches, pick values, add options, apply the fixes it shows.', look: 'Anything you could not do in the form, confusing labels, or a change that broke the code.' },
  { id: 'packages', areas: ['api', 'uiux'], kinds: ['task', 'nucleus'], title: 'A whole package', steps: 'Open your own .nc or .zip (or the Fallout example), open Files, edit an ini, add a file, save the package and install it in Nucleus.', look: 'Files missing after saving, what Try it says Nucleus installs against what it really installs, and checks that are wrong.' },
  { id: 'a11y', areas: ['uiux'], kinds: ['task'], title: 'Accessibility settings', steps: 'Open Settings › Accessibility and try each switch, with a screen reader or only the keyboard if you use one.', look: 'Anything that is hard to see, hard to reach with the keyboard, or read out wrongly; and anything missing that you need.' },
  { id: 'compare', areas: ['uiux', 'devx'], kinds: ['task'], title: 'Compare with the previous version', steps: 'Open a handler you know, then Open this handler in the previous version (top of this guide). Do the same task in both.', look: 'What got better, what got worse or harder to find, and anything from before that you miss.' },
  { id: 'debugger', areas: ['devx', 'uiux'], kinds: ['task', 'keyboard'], title: 'Step through a handler', steps: 'Open "Handler with common mistakes", Fix all, click beside the Context.StartArguments line for a breakpoint, then Try it › Step through. Step, go Back, drag the timeline, open Variables and Done so far. In Advanced mode: a watch, Step into/out, and a condition (right-click the breakpoint).', look: 'Wording that didn\'t tell you where you are, values you expected but couldn\'t find, keys that clash with your browser (F5, F10, F11).' },
  // --- Everyone
  { id: 'save-copy', areas: ['uiux'], kinds: ['task', 'nucleus'], title: 'Save or copy', steps: 'Save for Nucleus (or ⤓ next to the code): save the .zip, follow the steps shown, and also try Copy a link.', look: 'Did the install steps match what Nucleus showed? Did the link open the same handler?' },
  { id: 'hover-check', areas: ['devx', 'uiux'], kinds: ['explore'], title: 'Squiggles, hover and Check', steps: 'Hover underlined code and names, open and close problems in Check, try Settings › Check (Compact, Comfortable, Detailed).', look: 'Too much or too little information, boxes in the way, hard-to-read colours in your theme.' },
  { id: 'reader', areas: ['uiux'], kinds: ['reader'], title: 'With a screen reader', steps: 'Open an example, go through Check, fix one problem, and open Settings.', look: 'Anything not announced, announced twice, or in a confusing order.' },
];
