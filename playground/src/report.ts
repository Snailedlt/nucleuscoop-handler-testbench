// Feedback links (the tester feedback and doc review issue forms) filled in with what the workbench knows: the build,
// browser, screen, settings, the open handler (by name and source, never its code), the tester profile and the test
// item. It goes in the form's "Details from the workbench" field with a checksum. GitHub can't lock a field, so the
// bot in splitscreenme-vscode (.github/workflows/report-details.yml) copies the block into a comment the reporter
// can't edit or remove, and says whether it was changed before sending.
declare const BUILD: { bench?: string; core: string };

export interface ReportState {
  handler?: { name: string; kind: string; link?: string };
  view?: string;
}
let state: () => ReportState = () => ({});
/** The app tells the reports what is open. */
export const setReportState = (fn: () => ReportState) => (state = fn);

/** FNV-1a over the block's lines, so the bot can tell an edited block. The same function is in report-details.yml. */
export function checksum(lines: string[]): string {
  let h = 0x811c9dc5;
  for (const ch of lines.map((l) => l.trim()).filter(Boolean).join('\n')) {
    h ^= ch.codePointAt(0)!;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}

const get = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } };
function browser(): string {
  const ua = navigator.userAgent;
  const m = ua.match(/(Edg|OPR|Firefox|Chrome|Version)\/(\d+)/);
  const name = !m ? 'Unknown browser' : m[1] === 'Edg' ? 'Edge' : m[1] === 'OPR' ? 'Opera' : m[1] === 'Version' ? 'Safari' : m[1];
  const os = /Windows/.test(ua) ? 'Windows' : /Android/.test(ua) ? 'Android' : /iPhone|iPad/.test(ua) ? 'iOS' : /Mac OS/.test(ua) ? 'macOS' : /Linux/.test(ua) ? 'Linux' : 'other OS';
  return `${name}${m ? ' ' + m[2] : ''} on ${os}${matchMedia('(pointer: coarse)').matches ? ', touch' : ''}`;
}

/** The block of lines, ending with its checksum. */
export function reportContext(extra: Record<string, string | undefined> = {}): string {
  const r = document.documentElement.dataset;
  const s = state();
  const prof = (() => { try { return JSON.parse(get('nucleus-workbench-tester-profile') || 'null'); } catch { return null; } })();
  const lines = [
    `Workbench: build ${BUILD.bench ?? '?'}, core ${BUILD.core}`,
    `Page: ${location.origin}${location.pathname}`,
    `Browser: ${browser()}`,
    `Screen: ${innerWidth}x${innerHeight} (pixel ratio ${devicePixelRatio})`,
    `Settings: look ${r.site ?? 'www'}, ${r.theme ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')}, layout ${r.layout ?? 'bar'}, ${r.mode === 'dev' ? 'advanced' : 'guided'}${s.view ? `, ${s.view} view` : ''}, check ${get('nucleus-workbench-check-density') ?? 'compact'}`,
    s.handler ? `Open handler: ${s.handler.name} (${s.handler.kind}${s.handler.link ? `, ${s.handler.link}` : ''})` : '',
    prof ? `Tester: coding ${prof.coding ?? '?'}, Nucleus ${prof.nucleus ?? '?'}` : '',
    ...Object.entries(extra).map(([k, v]) => (v ? `${k}: ${v}` : '')),
  ].filter(Boolean);
  return [...lines, `Check: ${checksum(lines)}`].join('\n');
}

const FORM = 'https://github.com/Snailedlt/splitscreenme-vscode/issues/new';
/** The tester feedback form, filled in. */
export function feedbackUrl(opts: { title?: string; test?: string } = {}): string {
  const s = state();
  const q = new URLSearchParams({ template: 'tester-feedback.yml', area: 'Workbench (browser)', version: `workbench ${BUILD.bench ?? ''}`.trim() });
  if (opts.title) q.set('title', opts.title);
  if (s.handler?.link) q.set('handler', s.handler.link);
  q.set('context', reportContext({ 'Test item': opts.test }));
  return `${FORM}?${q}`;
}
/** Adds the details to another form's link (the doc review form). */
export function withContext(url: string, extra: Record<string, string | undefined> = {}): string {
  const u = new URL(url);
  u.searchParams.set('context', reportContext(extra));
  return u.toString();
}
