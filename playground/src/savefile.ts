// Saving files: the name a saved handler gets, and how this page saves one (the artifact's `downloads`
// capability on claude.ai, else an ordinary browser download).
import { hubFolderName } from '@core/sim';

/**
 * The saved file's name, without the extension: the folder a Hub install would make for it (`Game.GameName`, as
 * Nucleus reads it: core/sim.ts hubFolderName), so the .js matches `Game.Folder`. Without a Game.GameName line,
 * the open document's name. A backslash (which Nucleus keeps, and which breaks its install) can't be in a file name.
 */
export function saveFileName(text: string, docName: string): string {
  const hasName = text.split(/\r?\n/).some((l) => l.toLowerCase().startsWith('game.gamename'));
  const fromGame = hasName ? hubFolderName(text) : '';
  return (fromGame || docName.replace(/\.js$/i, '') || 'handler').replace(/[\\/:*?"<>|]/g, '').trim() || 'handler';
}

export interface Downloads {
  save: (file: { filename: string; data: Uint8Array }) => Promise<unknown>;
}

/** How this page saves files; null where it can't (a claude.ai page without the capability). */
export async function pageDownloads(): Promise<Downloads | null> {
  const claude = (window as any).claude;
  let downloads: Downloads | null = null;
  try {
    downloads = (await claude?.use?.('downloads')) ?? null;
  } catch {
    downloads = null;
  }
  if (downloads || claude) return downloads;
  // A normal web page (GitHub Pages): an ordinary browser download.
  return {
    save: async ({ filename, data }) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([data as BlobPart], { type: filename.endsWith('.js') ? 'text/javascript' : 'application/zip' }));
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 10000);
    },
  };
}
