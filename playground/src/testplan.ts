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
  if (area === 'devx') return p.coding === 'dev' ? 3 : 0; // every developer, experts included: they come first
  return p.coding === 'new' ? (p.nucleus === 'expert' ? 2 : 3) : 1;
}

export type Kind = 'task' | 'explore' | 'nucleus' | 'keyboard' | 'reader' | 'verify';

/** The kinds of testing, in plain words (shown as chips, explained in the legend). */
export const KINDS: Record<Kind, { label: string; how: string }> = {
  task: { label: 'Task', how: 'Do it from start to finish without help. Note where you got stuck or had to guess.' },
  explore: { label: 'Explore', how: 'Poke around freely and try to break it. Anything odd, ugly or confusing counts.' },
  nucleus: { label: 'Real Nucleus', how: 'Check the result in Nucleus Co-op itself: does it do what the workbench said it would?' },
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
// Experienced developers and handler authors first (AGENTS.md › Who it's for), then newcomers. Desktop first: no manual
// phone testing (the smoke test's phone checks cover phones).
const PRIORITY: Record<string, { need: 1 | 2 | 3; effort: 1 | 2 | 3 }> = {
  'own-handlers': { need: 3, effort: 2 }, 'no-freeze': { need: 3, effort: 1 }, notepadpp: { need: 3, effort: 2 }, vscode: { need: 3, effort: 2 },
  'other-editor': { need: 2, effort: 2 }, 'try-it': { need: 3, effort: 3 }, debugger: { need: 3, effort: 1 }, 'docs-links': { need: 3, effort: 1 },
  'claude-docs': { need: 3, effort: 1 }, autocomplete: { need: 3, effort: 2 }, keyboard: { need: 2, effort: 1 }, 'window-messages': { need: 2, effort: 2 },
  'game-folder': { need: 2, effort: 2 }, packages: { need: 3, effort: 3 }, 'hub-files': { need: 2, effort: 1 }, reference: { need: 2, effort: 1 },
  'first-run': { need: 3, effort: 1 }, tutorial: { need: 3, effort: 2 }, 'first-handler': { need: 3, effort: 3 }, messages: { need: 3, effort: 1 }, form: { need: 2, effort: 1 },
  blocks: { need: 2, effort: 2 }, 'value-picker': { need: 2, effort: 1 }, 'hover-check': { need: 2, effort: 1 }, 'save-copy': { need: 2, effort: 2 },
  compare: { need: 2, effort: 1 }, layout: { need: 1, effort: 1 }, lines: { need: 1, effort: 1 }, tabs: { need: 1, effort: 1 }, tips: { need: 1, effort: 1 },
  'settings-backup': { need: 1, effort: 1 }, a11y: { need: 1, effort: 1 }, reader: { need: 1, effort: 2 },
};
export const priority = (t: { id: string }) => PRIORITY[t.id] ?? { need: 2 as const, effort: 2 as const };

export interface TestItem { id: string; areas: Area[]; kinds: Kind[]; title: string; steps: string; look: string }

export const TEST_PLAN: TestItem[] = [
  // --- Developers and handler authors first: precision, speed, the keyboard and their own editor
  { id: 'own-handlers', areas: ['api'], kinds: ['verify', 'nucleus'], title: 'Check your own handlers', steps: 'Open handlers you maintain (Ctrl+P also lists the Hub), in the workbench or your editor. Read every problem and its why.', look: 'False alarms on handlers that work in Nucleus, real problems it missed, and fixes (Ctrl+. / Alt+Enter) that do the wrong thing.' },
  { id: 'no-freeze', areas: ['devx'], kinds: ['explore'], title: 'An endless loop never freezes the editor', steps: 'In VS Code, Notepad++ or here, put while (true) {} inside Game.Play and run Try it, then Test all (and cancel it). Keep typing while it runs.', look: 'Any freeze or lag while it runs, and whether the message says plainly that the handler never finishes.' },
  { id: 'notepadpp', areas: ['devx', 'api'], kinds: ['task'], title: 'The Notepad++ plugin', steps: 'Download ncdev.exe (start page › Try it in 5 minutes), run ncdev setup notepad++, open a handler: hover names and problems, Alt+Enter, Ctrl+Space, ( for parameter hints, then Plugins › Nucleus Co-op handlers: Try it, Problems panel, Browse the Hub, Install, Test in Nucleus Co-op.', look: 'Anything that freezes Notepad++, text that looks odd in its tooltips, and anything VS Code or the workbench does that you miss here.' },
  { id: 'vscode', areas: ['devx'], kinds: ['task'], title: 'The VS Code extension', steps: 'Install the .vsix from the start page and open a handler: suggestions (also after =, try Game.Play = ), hovers and their Open in Docs, parameter hints, Ctrl+., Format Document, Try it, Run and Debug, Test in Nucleus Co-op (▷).', look: 'Anything that works in the workbench or Notepad++ but not in VS Code, or the other way round, and anything in your way while you just type.' },
  { id: 'other-editor', areas: ['devx'], kinds: ['task'], title: 'Your own editor (ncdev lsp)', steps: 'Follow the README’s "Your own editor" section for the editor you use (Neovim, Helix, Zed, Sublime Text, Kate, JetBrains, Emacs…). Then check, hover, suggest and fix in a handler.', look: 'Setup steps that didn’t work as written, and features from the start page’s "Compare the editors" table that are missing in your editor.' },
  { id: 'docs-links', areas: ['api', 'devx'], kinds: ['explore'], title: 'Docs one click away', steps: 'In a hover, click an API name: VS Code opens Nucleus Docs beside the code, other editors and here open the workbench’s Docs. Share a #docs- link (e.g. #docs-Game.Play) and open an old #reference- link.', look: 'A link that led nowhere or to the wrong page, and a page that didn’t tell you where you are or how to get back.' },
  { id: 'try-it', areas: ['api'], kinds: ['verify', 'nucleus'], title: 'Try it against the real thing', steps: 'Run Try it and Test all combinations on a handler you know, then run it in Nucleus with the same players and screens.', look: 'Start arguments, window sizes, file changes or errors that differ from what Nucleus really does.' },
  { id: 'debugger', areas: ['devx'], kinds: ['task', 'keyboard'], title: 'Step through a handler', steps: 'Open "Handler with common mistakes", Fix all, click beside the Context.StartArguments line for a breakpoint, then Try it › Step through (or F5 in VS Code). Step, go Back, drag the timeline, open Variables. In Advanced mode: a watch, Step into/out, and a condition (right-click the breakpoint).', look: 'Wording that didn\'t tell you where you are, values you expected but couldn\'t find, keys that clash with your browser (F5, F10, F11).' },
  { id: 'autocomplete', areas: ['devx'], kinds: ['task', 'keyboard'], title: 'Write from scratch with suggestions', steps: 'Start an empty handler (in VS Code or Notepad++, typing handler in an empty file gives the template) and write it using only suggestions: Game. or Context., Ctrl+Space, a space after =, the hints while typing a call. Comments and strings should stay quiet, except option keys in Context.Options["…"].', look: 'Missing or wrong suggestions, suggestions in the way, and anything slower than your usual editor.' },
  { id: 'keyboard', areas: ['devx'], kinds: ['keyboard'], title: 'Keyboard only', steps: 'Ctrl+P, Ctrl+Shift+P, Ctrl+K Ctrl+0 (fold all), Ctrl+B, Alt+Z (word wrap), Ctrl+S, Ctrl+F5, F8, Ctrl+. on a problem, F12, F2, Esc then Tab to leave the editor. Change a shortcut in Settings › Keyboard shortcuts.', look: 'Anything you couldn\'t reach, a lost focus, or a shortcut that clashes with your browser or keyboard layout.' },
  { id: 'claude-docs', areas: ['api'], kinds: ['verify'], title: 'Check the AI-written docs', steps: 'Docs → Help check AI-written docs. Pick names you know well.', look: '👍 if it\'s right, 👎 and "Tell us what\'s wrong" if not. Each doc says what source it\'s based on.' },
  { id: 'window-messages', areas: ['api'], kinds: ['verify', 'nucleus'], title: 'Window messages in BlockedMessages', steps: 'In Game.ProtoInput.BlockedMessages, check the names after each number, hover them, and add one with the +.', look: 'Wrong names, and whether blocking them in Nucleus does what the hover says.' },
  { id: 'game-folder', areas: ['api'], kinds: ['verify', 'nucleus'], title: 'Check against your game folder', steps: 'Open a handler for a game you have installed and link the game’s folder (Files › Your game on this PC here, Link the Game’s Folder… in VS Code and Notepad++). Read what it finds, and try the + on a symlink or exclusion list.', look: 'False alarms on a handler that works, missed real problems, wrong path forms for Nucleus, and whether the engine notes are right.' },
  { id: 'packages', areas: ['api', 'devx'], kinds: ['task', 'nucleus'], title: 'A whole package', steps: 'Open your own .nc or .zip (or the Fallout example), open Files, edit an ini, add a file, save the package and install it in Nucleus.', look: 'Files missing after saving, what Try it says Nucleus installs against what it really installs, and checks that are wrong.' },
  { id: 'hub-files', areas: ['api'], kinds: ['verify'], title: 'Hub handlers with their files', steps: 'Open a Hub handler that ships files (Ctrl+K: the ones with "+ N files"), look through Files, and save the package. In VS Code or Notepad++, Browse the Hub and download one.', look: 'Missing or wrong files, and whether the files marked as in the Hub package are clear about it.' },
  { id: 'reference', areas: ['api'], kinds: ['verify'], title: 'Look things up in Docs', steps: 'Search Docs for options and Context members you use often, and for things you have wondered about. Check the examples read well.', look: 'Wrong or missing explanations, wrong types or defaults, and names that should be there but aren\'t.' },

  // --- Newcomers: can you get a working handler without help?
  { id: 'first-run', areas: ['uiux', 'devx'], kinds: ['explore'], title: 'The first-visit choice', steps: 'In a private window, open the workbench twice: once answer "I write code", once "Guide me". Work for a few minutes each way.', look: '"I write code" should start compact (no tips, no banner), "Guide me" should help. Anything on screen you didn\'t ask for, or help you couldn\'t find.' },
  { id: 'tutorial', areas: ['uiux'], kinds: ['task'], title: 'The tutorial', steps: 'Menu › Tutorial (or #learn): do the 8 lessons without Show me, as if you had never seen a handler.', look: 'A lesson you couldn\'t finish, a tick that came too early or never came, or a word you didn\'t know.' },
  { id: 'first-handler', areas: ['uiux'], kinds: ['task', 'nucleus'], title: 'Make your first handler', steps: 'New handler… → fill in a game you own → fix what Check finds → Try it → Save (Ctrl+S) → install it in Nucleus Co-op.', look: 'Could you finish without asking anyone? Which step was unclear? Did the game start in Nucleus?' },
  { id: 'messages', areas: ['uiux'], kinds: ['explore'], title: 'Do the messages make sense?', steps: 'Open "Handler with common mistakes" (Ctrl+P). Read each problem in Check and on hover, without opening Technical details.', look: 'Any word or sentence you didn\'t understand, or a fix you were afraid to press.' },
  { id: 'form', areas: ['uiux'], kinds: ['task'], title: 'Make a handler with the form', steps: 'New handler, then switch to Form and set it up there: change switches, pick values, add options, apply the fixes it shows.', look: 'Anything you could not do in the form, confusing labels, or a change that broke the code.' },
  { id: 'blocks', areas: ['uiux'], kinds: ['task'], title: 'Write Game.Play with Blocks', steps: 'Open a handler, switch to Blocks, add a few steps (+ Add a step, or pick names in Lines), an If, and fix what it shows. Then look at the code.', look: 'Steps you could not make, wording that confused you, or code that came out different from what you meant.' },
  { id: 'value-picker', areas: ['uiux'], kinds: ['explore', 'keyboard'], title: 'Pick a value instead of typing it', steps: 'Put the cursor on a value such as the false in Game.SymlinkGame = false; then click the ▾ after it (Alt+↓ from the keyboard). Try a true/false, a number and a value in quotes.', look: 'Did you find the ▾? Did the list make clear what you can write there? Anything in the way while you just type?' },
  { id: 'hover-check', areas: ['devx', 'uiux'], kinds: ['explore'], title: 'Squiggles, hover and Check', steps: 'Hover underlined code and names, open and close problems in Check, try Settings › Check (Compact, Comfortable, Detailed).', look: 'Too much or too little information, boxes in the way, hard-to-read colours in your theme.' },
  { id: 'save-copy', areas: ['uiux'], kinds: ['task', 'nucleus'], title: 'Save and Share', steps: 'Save (Ctrl+S) the .zip and follow the install steps; pick .js or .nc under the arrow next to Save, or Into Nucleus Co-op (Chrome, Edge). Then Share: Copy a link, Copy the code, Copy for Discord.', look: 'Did the install steps match what Nucleus showed? Did the link open the same handler (it carries the code only, and says so)? Did the Discord paste look right?' },
  { id: 'compare', areas: ['uiux', 'devx'], kinds: ['task'], title: 'Compare with the previous version', steps: 'Open a handler you know, then Open this handler in the previous version (top of this guide). Do the same task in both.', look: 'What got better, what got worse or harder to find, and anything from before that you miss.' },

  // --- Everyone, when there's time
  { id: 'layout', areas: ['uiux', 'devx'], kinds: ['explore'], title: 'Make it yours', steps: 'Settings › Theme and colours: light or dark, a look, and code colours (VS Code, Notepad++…). Settings › Layout: the slim bar or the side rail, Files and Lines left or right; drag the panel edges.', look: 'Which setup you prefer and why; anything hard to read, hard to find, cut off or too cramped.' },
  { id: 'lines', areas: ['uiux', 'devx'], kinds: ['explore'], title: 'Find a setting in Lines', steps: 'Open Lines (Ctrl+B), find an option you need without knowing its name, and insert it. Try View (Tree or List) and each Group.', look: 'Could you find it? Which grouping helped most? Was the wording clear?' },
  { id: 'tabs', areas: ['uiux', 'devx'], kinds: ['explore'], title: 'Several handlers in tabs', steps: 'Edit a handler, then open an example (Ctrl+P): it opens in a new tab. Switch, undo in each, close one and undo, reload the page.', look: 'Lost work, the wrong tab after a reload, a wrong state dot, or undo mixing tabs.' },
  { id: 'tips', areas: ['uiux'], kinds: ['explore'], title: 'Tips under the code', steps: 'With Guide me (or tips on in Settings), work a while and vote 👍 or 👎 on the tips you see.', look: 'Tips that came at the wrong moment, repeated, or pointed at the wrong thing.' },
  { id: 'settings-backup', areas: ['uiux'], kinds: ['task'], title: 'Settings: find, export and import', steps: 'Open Settings, search for a setting, then Updates and backup › Export settings, change something, and Import the file.', look: 'A setting you could not find by searching, or one that did not come back after importing.' },
  { id: 'a11y', areas: ['uiux'], kinds: ['task'], title: 'Accessibility settings', steps: 'Open Settings › Accessibility and try each switch, with a screen reader or only the keyboard if you use one.', look: 'Anything that is hard to see, hard to reach with the keyboard, or read out wrongly; and anything missing that you need.' },
  { id: 'reader', areas: ['uiux'], kinds: ['reader'], title: 'With a screen reader', steps: 'Open an example, go through Check, fix one problem, and open Settings.', look: 'Anything not announced, announced twice, or in a confusing order.' },
];
