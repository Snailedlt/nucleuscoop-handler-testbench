// The workbench's #links, as pure data: what a link opens, where a moved one leads now, and what an unknown one
// says. No DOM: app.ts acts on the result, and tools/links.test.mjs checks every link we have published.
//
// Links live for ever (in Discord, READMEs, bookmarks, the extension's hovers), so an address that moved keeps
// working: it opens the new place and says once that it moved and where. Add a line to MOVED_LINKS whenever a #link
// changes; never just drop one.
import { SHARE_PREFIX } from './share';

export interface MovedLink {
  from: RegExp;
  to: (m: RegExpExecArray) => string;
  why: string;
}

export const MOVED_LINKS: MovedLink[] = [
  // The Reference tab became Docs (2026-11).
  { from: /^(?:reference|api|ref)$/i, to: () => 'docs', why: 'Reference is now called Docs' },
  { from: /^(?:reference|api|ref)-(.+)$/i, to: (m) => `docs-${m[1]}`, why: 'Reference is now called Docs' },
  // The Fallout New Vegas Multiplayer example package: Hub handlers open with their files now (2026-11).
  { from: /^package-nvmp$/i, to: () => 'hub-vnPXYhWMJJ3FNuQuS', why: 'the Fallout New Vegas Multiplayer example is the Hub handler now, which opens with its files' },
];

/** The link's current address (`why`: it moved, and why), else the link as it is. `h` is the hash without "#", decoded. */
export function followMoved(h: string): { to: string; why?: string } {
  for (const m of MOVED_LINKS) {
    const r = m.from.exec(h);
    if (r) return { to: m.to(r), why: m.why };
  }
  return { to: h };
}

/** The note a moved link shows once. */
export const movedNote = (why: string) => `This is an older link: ${why}. It opened the same thing; the new link is in the address bar.`;

/** What the page has that links can name. */
export interface LinkCatalog {
  /** Hub example ids, in the page's order. */
  hub: string[];
  /** Probe file names (`01-let-const-toplevel.js`), in the page's order. */
  probes: string[];
  /** Example package ids. */
  packages: string[];
  /** Discord bot template ids. */
  templates: string[];
}

export type LinkTarget =
  | { kind: 'none' }
  | { kind: 'share'; hash: string }
  | { kind: 'whats-new' }
  | { kind: 'docs'; hash: string }
  | { kind: 'dev' }
  | { kind: 'learn'; lesson?: string }
  | { kind: 'hub'; index: number }
  | { kind: 'probe'; index: number }
  | { kind: 'package'; id: string }
  | { kind: 'example-mistakes' }
  | { kind: 'template'; id: string }
  | { kind: 'unknown-hub'; id: string }
  | { kind: 'unknown-probe'; number: string }
  | { kind: 'unknown'; hash: string };

export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** A probe's number as its link writes it: `probe-07`, `probe-112`. */
export const probeNumber = (name: string) => name.split('-')[0];
export const probeHash = (name: string) => `probe-${probeNumber(name)}`;

/** What `h` (the hash without "#", decoded, after followMoved) opens. */
export function routeLink(h: string, cat: LinkCatalog): LinkTarget {
  if (!h) return { kind: 'none' };
  if (h.startsWith(SHARE_PREFIX)) return { kind: 'share', hash: h };
  if (h === 'whats-new') return { kind: 'whats-new' };
  if (h === 'docs' || h.startsWith('docs-')) return { kind: 'docs', hash: h };
  if (h === 'dev') return { kind: 'dev' };
  // #learn: the lessons (learn/ now); #learn-<chapter>/<lesson> keeps its place.
  if (h === 'learn' || h.startsWith('learn-')) return { kind: 'learn', lesson: h.slice(6) || undefined };
  if (h === 'example-mistakes') return { kind: 'example-mistakes' };
  if (h.startsWith('hub-')) {
    const index = cat.hub.indexOf(h.slice(4));
    return index >= 0 ? { kind: 'hub', index } : { kind: 'unknown-hub', id: h.slice(4) };
  }
  if (h.startsWith('probe-')) {
    const n = h.slice(6);
    const index = cat.probes.findIndex((p) => p.startsWith(n.padStart(2, '0') + '-'));
    return index >= 0 ? { kind: 'probe', index } : { kind: 'unknown-probe', number: n };
  }
  if (h.startsWith('package-') && cat.packages.includes(h.slice(8))) return { kind: 'package', id: h.slice(8) };
  if (h.startsWith('template-')) {
    const id = cat.templates.find((t) => slug(t) === slug(h.slice('template-'.length)));
    if (id) return { kind: 'template', id };
  }
  return { kind: 'unknown', hash: h };
}

/** What an unknown link says, and the way on it offers: never a dead end. */
export function unknownNote(t: LinkTarget): { text: string; action: { label: string; to: 'hub' | 'probes' | 'open'; url?: string } } | undefined {
  if (t.kind === 'unknown-hub') return { text: "That Hub handler isn't in the workbench's copy of the Hub. It may be new: look on the Hub.", action: { label: 'Open it on the Hub', to: 'hub', url: `https://hub.splitscreen.me/handler/${encodeURIComponent(t.id)}` } };
  if (t.kind === 'unknown-probe') return { text: `There's no probe ${t.number} in this version of the workbench; the probes are numbered again when they change.`, action: { label: 'See the probes', to: 'probes' } };
  if (t.kind === 'unknown') return { text: `The link "#${t.hash}" is from another version of the workbench, or mistyped: it doesn't match anything here.`, action: { label: 'Open an example or a Hub handler', to: 'open' } };
  return undefined;
}

// Docs links: #docs (the main page), #docs-Context (a group), #docs-Context.ModifySaveFile (a name) or #docs-mutex
// (a search). The extension, the Language Server and the Notepad++ plugin write them (core workbenchDocsUrl).

/** The Docs view a #docs… link opens: `home`, `group:<key>` or `q:<text>`. */
export function docsView(h: string, groups: string[]): string {
  const v = h === 'docs' ? '' : h.slice(5);
  return !v ? 'home' : groups.includes(v) ? `group:${v}` : `q:${v}`;
}
/** A Docs view's link (without "#"). */
export const docsHashOf = (view: string) => (view === 'home' ? 'docs' : `docs-${encodeURIComponent(view.replace(/^(group|q):/, ''))}`);
