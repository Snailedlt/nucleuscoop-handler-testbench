// Share links: the handler, compressed (deflate-raw) and written with only letters and digits, so the
// link survives places that only pass a plain #name (Claude artifacts: letters, digits and hyphens).
// Every 5 bytes become 7 base-62 characters (62^7 > 2^40); a shorter tail uses fewer. The letters are the
// extension's (core/sharelink.ts), which writes the same links for VS Code, the Language Server and Notepad++.
import { fromBase62, toBase62 } from '@core/sharelink';

export const SHARE_PREFIX = 'share-';

async function pipe(data: Uint8Array, stream: CompressionStream | DecompressionStream): Promise<Uint8Array> {
  const res = new Response(new Blob([data as BlobPart]).stream().pipeThrough(stream));
  return new Uint8Array(await res.arrayBuffer());
}

export const canShare = () => typeof CompressionStream === 'function' && typeof DecompressionStream === 'function';

/** "share-…" for a handler's source. */
export async function encodeShare(source: string): Promise<string> {
  const packed = await pipe(new TextEncoder().encode(source), new CompressionStream('deflate-raw'));
  return SHARE_PREFIX + toBase62(packed);
}

/** The handler's source from "share-…". Throws on a damaged link. */
export async function decodeShare(hash: string): Promise<string> {
  const packed = fromBase62(hash.slice(SHARE_PREFIX.length));
  return new TextDecoder().decode(await pipe(packed, new DecompressionStream('deflate-raw')));
}

/** Discord's limit for one message: a link longer than this can't be posted there. */
export const DISCORD_LIMIT = 2000;

export interface ShareAdvice {
  /** Lead with the file: the link can't carry it all, or can't be posted where most handlers are discussed. */
  fileFirst: boolean;
  /** Under "Copy a link". */
  linkSub: string;
  /** Under "Share the file". */
  fileSub: string;
}

/**
 * What the Share dialog leads with. A link holds the code only (not the package's other files), and Discord
 * takes 2,000 characters a message; past either, the file is the way: it has everything, and Discord, Reddit
 * or e-mail carry it. With lines selected, the link is for those lines and stays first; an unchanged example or
 * Hub handler is linked by name, which opens all of it.
 */
export function shareAdvice(o: { selection: boolean; files: number; linkLength: number | null; /** an unchanged example or Hub handler: its link is its name, and opens it whole */ named?: boolean }): ShareAdvice {
  const n = o.files;
  const fileSub = n ? `The .zip with the code and its ${n} file${n === 1 ? '' : 's'}, and a message to post with it` : 'The .zip, and a message to post with it';
  if (o.selection) return { fileFirst: false, linkSub: 'Opens just the selected lines for anyone', fileSub };
  if (o.named) return { fileFirst: false, linkSub: n ? `A short link: opens it for anyone, with its ${n} file${n === 1 ? '' : 's'}` : 'A short link: opens it for anyone', fileSub };
  const tooLong = o.linkLength !== null && o.linkLength > DISCORD_LIMIT;
  const linkSub = n
    ? `The code only: the ${n} other file${n === 1 ? " doesn't" : "s don't"} fit in a link`
    : tooLong
      ? `${o.linkLength!.toLocaleString('en')} characters: too long for a Discord message (${DISCORD_LIMIT.toLocaleString('en')})`
      : 'Opens this handler for anyone, or just the selected lines';
  return { fileFirst: n > 0 || tooLong, linkSub, fileSub };
}

/** A link by name (#hub-…, #package-…, #example-…): short, and opens the original. A #share-… link carries the code itself. */
export const isNamedLink = (hash: string | undefined): boolean => !!hash && !hash.startsWith(SHARE_PREFIX);

/** The message to post with a shared file: what it is, and the two things to do with it. */
export function shareFileMessage(o: { game: string; filename: string; site: string }): string {
  return [
    `Nucleus Co-op handler${o.game ? ` for ${o.game}` : ''}: ${o.filename} (attached)`,
    `- To look at it or change it: drop the file on ${o.site}`,
    "- To play: drag the file onto Nucleus Co-op's Extract handler button",
  ].join('\n');
}
