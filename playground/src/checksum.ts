// No imports: tools/report-links.test.mjs loads this file on its own.
/** FNV-1a over the block's lines, so the bot can tell an edited block. The same function is in splitscreenme-vscode's
 *  scripts/issue-bots.mjs (the issue bot); tools/report-links.test.mjs checks both give the same value. */
export function checksum(lines: string[]): string {
  let h = 0x811c9dc5;
  for (const ch of lines.map((l) => l.trim()).filter(Boolean).join('\n')) {
    h ^= ch.codePointAt(0)!;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}
