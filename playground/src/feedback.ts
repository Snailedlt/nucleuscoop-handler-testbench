// Anonymous feedback: 👍/👎 on tips and on the docs Claude wrote, and how often a few features are used, so we
// can tell what helps and what doesn't. Private by design:
// - only counts are sent, each a short path such as "vote/tip/f-swipe/up" or "use/try-it": no code, no handler
//   names, no cookies, no IDs, nothing that tells one person from another;
// - they go to a GoatCounter site (cookie-less, no personal data stored) only when the build names one
//   (BUILD.feedback); otherwise nothing leaves the browser;
// - off when the browser asks not to be tracked (Do Not Track, Global Privacy Control), and switchable in
//   Settings › General;
// - each feature is counted at most once per visit.
// Your own votes are kept in this browser, so the buttons show what you picked.
declare const BUILD: { feedback?: string | null };

const KEY = 'nucleus-workbench-votes';
const OFF_KEY = 'nucleus-workbench-feedback-off';
const get = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } };
const set = (k: string, v: string | null) => { try { v === null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch { /* private mode */ } };

const browserSaysNo = () => navigator.doNotTrack === '1' || (navigator as any).globalPrivacyControl === true;
/** Whether counts are sent: a site is set, the browser doesn't object, and it isn't switched off. */
export const feedbackOn = () => !!BUILD.feedback && !browserSaysNo() && get(OFF_KEY) !== '1';
export const feedbackAvailable = () => !!BUILD.feedback;
/** The public dashboard with the totals (GoatCounter's, made public by the maintainer). */
export const totalsUrl = () => (BUILD.feedback ? `https://${BUILD.feedback}.goatcounter.com/` : null);
export const feedbackBlockedByBrowser = browserSaysNo;
export function setFeedback(on: boolean) { set(OFF_KEY, on ? null : '1'); }

function send(path: string) {
  if (!feedbackOn()) return;
  // GoatCounter's count endpoint; an event (e=true), so it isn't counted as a page view. No referrer, no title.
  const url = `https://${BUILD.feedback}.goatcounter.com/count?p=${encodeURIComponent('/' + path)}&e=true&rnd=${Math.random().toString(36).slice(2)}`;
  try { navigator.sendBeacon ? navigator.sendBeacon(url) : fetch(url, { mode: 'no-cors', keepalive: true }); } catch { /* ignore */ }
}

type Vote = 'up' | 'down';
const votes = (): Record<string, Vote> => { try { return JSON.parse(get(KEY) || '{}'); } catch { return {}; } };
export const myVote = (kind: string, id: string): Vote | undefined => votes()[`${kind}/${id}`];
/** Records a vote (or takes it back with the same button). Returns the vote now in place. */
export function vote(kind: 'tip' | 'doc', id: string, v: Vote): Vote | undefined {
  const all = votes();
  const k = `${kind}/${id}`;
  const now = all[k] === v ? undefined : v;
  if (now) all[k] = now; else delete all[k];
  set(KEY, JSON.stringify(all));
  send(`vote/${k}/${now ?? 'undo-' + v}`);
  return now;
}

const used = new Set<string>();
/** Counts a feature as used, once per visit. */
export function use(feature: string) {
  if (used.has(feature)) return;
  used.add(feature);
  send(`use/${feature}`);
}

/** 👍/👎 buttons (HTML) for an item; wire them with wireVotes. */
export function voteButtons(kind: 'tip' | 'doc', id: string, labels: { up: string; down: string }): string {
  const mine = myVote(kind, id);
  const b = (v: Vote, icon: string, label: string) => `<button type="button" class="vote-btn" data-vote="${v}" data-vkind="${kind}" data-vid="${id}" aria-pressed="${mine === v}" title="${label}" aria-label="${label}">${icon}</button>`;
  return `<span class="votes">${b('up', '👍', labels.up)}${b('down', '👎', labels.down)}</span>`;
}
/** One listener for every vote button on the page. */
export function wireVotes(onVote?: (kind: string, id: string, v: Vote | undefined, el: HTMLElement) => void) {
  document.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-vote]');
    if (!b) return;
    const kind = b.dataset.vkind as 'tip' | 'doc', id = b.dataset.vid!;
    const now = vote(kind, id, b.dataset.vote as Vote);
    b.parentElement!.querySelectorAll<HTMLButtonElement>('button[data-vote]').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.vote === now)));
    onVote?.(kind, id, now, b);
  });
}
