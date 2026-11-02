// Share links: the handler, compressed (deflate-raw) and written with only letters and digits, so the
// link survives places that only pass a plain #name (Claude artifacts: letters, digits and hyphens).
// Every 5 bytes become 7 base-62 characters (62^7 > 2^40); a shorter tail uses fewer.

const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const TAIL_CHARS = [0, 2, 3, 5, 6, 7]; // characters for a tail of n bytes
export const SHARE_PREFIX = 'share-';

function toBase62(bytes: Uint8Array): string {
  let out = '';
  for (let i = 0; i < bytes.length; i += 5) {
    const chunk = bytes.subarray(i, i + 5);
    let n = 0;
    for (const b of chunk) n = n * 256 + b;
    let s = '';
    for (let k = 0; k < TAIL_CHARS[chunk.length]; k++) {
      s = ALPHABET[n % 62] + s;
      n = Math.floor(n / 62);
    }
    out += s;
  }
  return out;
}

function fromBase62(text: string): Uint8Array {
  const out: number[] = [];
  for (let i = 0; i < text.length; i += 7) {
    const part = text.slice(i, i + 7);
    const bytes = TAIL_CHARS.indexOf(part.length);
    if (bytes < 1) throw new Error('bad share link');
    let n = 0;
    for (const c of part) {
      const v = ALPHABET.indexOf(c);
      if (v < 0) throw new Error('bad share link');
      n = n * 62 + v;
    }
    const chunk: number[] = [];
    for (let k = 0; k < bytes; k++) {
      chunk.unshift(n % 256);
      n = Math.floor(n / 256);
    }
    out.push(...chunk);
  }
  return new Uint8Array(out);
}

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
