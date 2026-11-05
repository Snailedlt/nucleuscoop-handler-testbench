// What's new: the workbench's CHANGELOG.md, inside the workbench. After an update, a short note says
// what changed (not on a first visit), with a link to the full list. Can be turned off in Settings.
declare const CHANGES: { id: string; items: { summary: string; details: string }[] }[];

const SEEN_KEY = 'nucleus-workbench-news-seen';
const ON_KEY = 'nucleus-workbench-news';
const $ = <T extends HTMLElement = HTMLElement>(sel: string) => document.querySelector(sel) as T;
const get = (k: string) => {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
};
const set = (k: string, v: string) => {
  try {
    localStorage.setItem(k, v);
  } catch {}
};
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
/** `code` and plain text only (the changelog is ours, but keep it inert). */
const inline = (s: string) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*(.+?)\*\*/g, '$1');
const when = (id: string) => (id === 'Unreleased' ? 'In this preview' : new Date(id + 'T12:00:00').toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }));

export function initNews() {
  const dlg = $('#news-dialog') as HTMLDialogElement;
  const latest = CHANGES[0]?.id;
  const open = () => {
    $('#news-body').innerHTML = CHANGES.map(
      (c, i) => `<h3>${esc(when(c.id))}${i === 0 && c.id !== 'Unreleased' ? ' <span class="chip ok">latest</span>' : ''}</h3><ul>${c.items.map((it) => `<li><strong>${inline(it.summary)}</strong>${it.details ? `<span>${inline(it.details)}</span>` : ''}</li>`).join('')}</ul>`,
    ).join('');
    dlg.showModal();
    seen();
  };
  const seen = () => {
    if (latest) set(SEEN_KEY, latest);
    $('#updated').hidden = true;
  };
  $('#news-close').addEventListener('click', () => dlg.close());
  ['#news-open-2', '#set-news-open', '#updated-open'].forEach((s) => $(s)?.addEventListener('click', () => ((document.querySelector('#settings-dialog') as HTMLDialogElement)?.close(), open())));
  $('#updated-close').addEventListener('click', seen);
  const box = $('#set-news') as HTMLInputElement;
  box.checked = get(ON_KEY) !== '0';
  box.addEventListener('change', () => set(ON_KEY, box.checked ? '1' : '0'));

  // The note after an update: only for returning visitors who haven't seen the latest changes.
  const last = get(SEEN_KEY);
  if (!latest) return { open };
  if (!last) set(SEEN_KEY, latest);
  else if (last !== latest && get(ON_KEY) !== '0') {
    const newer = CHANGES.slice(0, Math.max(1, CHANGES.findIndex((c) => c.id === last))).flatMap((c) => c.items.map((i) => i.summary));
    const list = newer.slice(0, 3).join(', ') + (newer.length > 3 ? ` and ${newer.length - 3} more` : '');
    $('#updated-text').innerHTML = `<strong>Updated:</strong> ${inline(list)}.`;
    $('#updated').hidden = false;
  }
  return { open };
}
