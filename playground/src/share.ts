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
