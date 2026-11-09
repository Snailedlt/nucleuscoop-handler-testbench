// The groups Docs browses (Game, Context, ProtoInput…) and the AI-written docs nobody has checked yet. No DOM:
// links.ts' docsView uses the keys (#docs-Context opens the group), and tools/links.test.mjs checks them.
import { allEntries } from '@core/lookup';

export interface ApiGroup {
  key: string;
  title: string;
  doc: string;
  match: (path: string) => boolean;
}

let uncheckedCache: Set<string> | undefined;
/** The docs AI wrote that no person has checked yet. */
export const unchecked = () => (uncheckedCache ??= new Set(allEntries(true).filter((e) => e.member.docBy === 'claude' && !e.member.docCheckedBy).map((e) => e.path)));

// Docs with nothing typed: what's in it, so it's clear what can be found there.
export const API_GROUPS: ApiGroup[] = [
  // The docs Claude wrote that no person has checked yet: handler authors can confirm or correct them (👍/👎, an issue).
  { key: 'AI', title: 'AI-written: please check', doc: 'Docs written by AI from the Nucleus source, which no person has checked yet. If you know how one really works, tell us with 👍 or 👎 (and "Tell us what\'s wrong").', match: (p) => unchecked().has(p) },
  { key: 'Game', title: 'Game', doc: 'The handler\'s options: the game, its executable, players, mutexes, files and callbacks.', match: (p) => /^Game\.[^.]+$/.test(p) },
  { key: 'Game.Hook', title: 'Game.Hook', doc: 'Focus and input hooks injected into each instance.', match: (p) => p.startsWith('Game.Hook.') },
  { key: 'Game.ProtoInput', title: 'Game.ProtoInput', doc: 'Proto Input settings for the whole session.', match: (p) => p.startsWith('Game.ProtoInput.') },
  { key: 'Context', title: 'Context', doc: 'One player\'s instance, inside Game.Play: launch arguments, folders and files to edit.', match: (p) => p.startsWith('Context.') },
  { key: 'Player', title: 'Player', doc: 'The player Game.Play runs for (also PlayerList[i]): screen, controller, nickname.', match: (p) => p.startsWith('Player.') },
  { key: 'ProtoInput', title: 'ProtoInput', doc: 'Proto Input calls at runtime, inside Game.Play and other callbacks.', match: (p) => p.startsWith('ProtoInput.') },
  { key: 'Hub', title: 'Hub (written by the Hub)', doc: 'Lines hub.splitscreen.me writes into a handler when it is uploaded. You don\'t add or change them.', match: (p) => p.startsWith('Hub.') },
  { key: 'System', title: '.NET (System.*)', doc: 'Files, folders, paths and the environment, through .NET.', match: (p) => p.startsWith('System.') },
];
export const API_GROUP_KEYS = API_GROUPS.map((g) => g.key);
/** The group a name is listed in (not the AI one). */
export const groupOf = (path: string) => API_GROUPS.find((g) => g.key !== 'AI' && g.match(path));
