// "Help test this beta": what each kind of handler author should try, and how. Shown from the footer and the
// command palette while BETA is true.
// AT THE FULL (NON-BETA) RELEASE: set BETA to false (the guide and its entry points disappear), or rewrite the plan for
// what still needs testing. AGENTS.md › Releasing says so too.
export const BETA = true;

export type Who = 'newcomer' | 'developer' | 'everyone';
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

export const WHO: Record<Who, string> = {
  everyone: 'Everyone',
  newcomer: 'New to coding',
  developer: 'Developer',
};

export interface TestItem { id: string; who: Who[]; kinds: Kind[]; title: string; steps: string; look: string }

export const TEST_PLAN: TestItem[] = [
  // --- New to coding: can you get a working handler without help?
  { id: 'first-handler', who: ['newcomer'], kinds: ['task', 'nucleus'], title: 'Make your first handler', steps: 'New handler… → fill in a game you own → fix what Check finds → Try it → Save for Nucleus → install it in Nucleus Co-op.', look: 'Could you finish without asking anyone? Which step was unclear? Did the game start in Nucleus?' },
  { id: 'messages', who: ['newcomer'], kinds: ['explore'], title: 'Do the messages make sense?', steps: 'Open "Handler with common mistakes" (Ctrl+K). Read each problem in Check and on hover, without opening Technical details.', look: 'Any word or sentence you didn\'t understand, or a fix you were afraid to press.' },
  { id: 'phone', who: ['newcomer', 'everyone'], kinds: ['phone', 'explore'], title: 'Write and fix on a phone', steps: 'Open the workbench on your phone. Type a few lines, tap an underlined word, use Lines, run Try it.', look: 'Anything too small to tap, hidden behind the keyboard, or cut off.' },
  { id: 'tips', who: ['newcomer'], kinds: ['explore'], title: 'Tips under the code', steps: 'Leave tips on while you work. Vote 👍 or 👎 on the ones you see.', look: 'Tips that came at the wrong moment, repeated, or pointed at the wrong thing.' },

  // --- Developers: precision, speed and the edge cases
  { id: 'own-handlers', who: ['developer'], kinds: ['verify', 'nucleus'], title: 'Check your own handlers', steps: 'Paste or open handlers you maintain (Ctrl+K also lists the Hub). Read every warning.', look: 'False alarms on handlers that work in Nucleus, and real problems it missed. Especially the new checks: Proto Input never starting, BlockedMessages without the filter hook, settings that need another one, the focus loop.' },
  { id: 'claude-docs', who: ['developer'], kinds: ['verify'], title: 'Check the AI-written docs', steps: 'Reference → Help check AI-written docs. Pick names you know well.', look: '👍 if it\'s right, 👎 and "Tell us what\'s wrong" if not. Each doc says what source it\'s based on.' },
  { id: 'window-messages', who: ['developer'], kinds: ['verify', 'nucleus'], title: 'Window messages in BlockedMessages', steps: 'In Game.ProtoInput.BlockedMessages, check the names after each number, hover them, and add one with the +.', look: 'Wrong names, and whether blocking them in Nucleus does what the hover says.' },
  { id: 'keyboard', who: ['developer', 'everyone'], kinds: ['keyboard'], title: 'Keyboard only', steps: 'Ctrl+K, Ctrl+B, Ctrl+S, Ctrl+Enter, F8, Ctrl+. on a problem, Esc then Tab to leave the editor. Hover buttons for their shortcuts.', look: 'Anything you couldn\'t reach, a lost focus, or a shortcut that clashes with your browser.' },
  { id: 'try-it', who: ['developer'], kinds: ['verify', 'nucleus'], title: 'Try it against the real thing', steps: 'Run Try it and Test all combinations on a handler you know, then run it in Nucleus with the same players and screens.', look: 'Start arguments, window sizes, file changes or errors that differ from what Nucleus really does.' },
  { id: 'vscode', who: ['developer'], kinds: ['explore'], title: 'The VS Code extension', steps: 'Install the .vsix from the start page and open a handler: completions after = (try Game.Play = ), hovers, quick fixes, Try it.', look: 'Anything that works in the workbench but not in VS Code, or the other way round.' },

  // --- Everyone
  { id: 'save-copy', who: ['everyone'], kinds: ['task', 'nucleus'], title: 'Save or copy', steps: 'Save for Nucleus (or ⤓ next to the code): save the .zip, follow the steps shown, and also try Copy a link.', look: 'Did the install steps match what Nucleus showed? Did the link open the same handler?' },
  { id: 'hover-check', who: ['everyone'], kinds: ['explore'], title: 'Squiggles, hover and Check', steps: 'Hover underlined code and names, open and close problems in Check, try Settings › General › Check (Compact, Comfortable, Detailed).', look: 'Too much or too little information, boxes in the way, hard-to-read colours in your theme.' },
  { id: 'reader', who: ['everyone'], kinds: ['reader'], title: 'With a screen reader', steps: 'Open an example, go through Check, fix one problem, and open Settings.', look: 'Anything not announced, announced twice, or in a confusing order.' },
];
