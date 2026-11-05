// What's new: the workbench's CHANGELOG.md, inside the workbench. After an update, a short note says
// what changed (not on a first visit), with a link to the full list. Can be turned off in Settings.
import { picture, syncPictures } from './themed';
declare const CHANGES: { id: string; items: { group: string; summary: string; details: string; image?: { alt: string; file: string; dark?: string } }[] }[];

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
const inline = (s: string) =>
  esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/&lt;(https:\/\/[^\s&]+)&gt;/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
const when = (id: string) => {
  if (id === 'Unreleased') return 'In this preview';
  const [d, t] = id.split(' '); // "2026-11-05" or "2026-11-05 15:30" (UTC) for a second release that day
  const date = new Date(`${d}T${t ?? '12:00'}:00Z`);
  const day = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  return t ? `${day}, ${date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}` : day;
};

export function initNews() {
  const dlg = $('#news-dialog') as HTMLDialogElement;
  const latest = CHANGES[0]?.id;
  const open = () => {
    const item = (it: (typeof CHANGES)[number]['items'][number]) =>
      `<li><strong>${inline(it.summary)}</strong>${it.details ? `<span>${inline(it.details)}</span>` : ''}${it.image ? picture(`changes/${esc(it.image.file)}`, it.image.dark && `changes/${esc(it.image.dark)}`, esc(it.image.alt), ' loading="lazy"') : ''}</li>`;
    // One card per release so they don't run into each other: the newest open, older ones folded.
    $('#news-body').innerHTML = CHANGES.map((c, i) => {
      const groups = [...new Set(c.items.map((it) => it.group))];
      const changes = c.items.filter((it) => !it.group.includes('🙏')).length;
      const badge = c.id === 'Unreleased' ? '<span class="chip info">preview</span>' : i === 0 ? '<span class="chip ok">latest</span>' : '';
      const body = groups.map((g) => `${g ? `<h3>${esc(g)}</h3>` : ''}<ul class="${g.includes('🙏') ? 'thanks' : ''}">${c.items.filter((it) => it.group === g).map(item).join('')}</ul>`).join('');
      return `<details class="release"${i < 1 || (i === 1 && CHANGES[0].id === 'Unreleased') ? ' open' : ''}><summary><span class="rel-date">${esc(when(c.id))}</span>${badge}<span class="rel-count">${changes} change${changes === 1 ? '' : 's'}</span></summary><div class="rel-body">${body}</div></details>`;
    }).join('');
    // No screenshots in the single offline file: drop the ones that don't load.
    $('#news-body').querySelectorAll('img').forEach((img) => img.addEventListener('error', () => (img.closest('picture') ?? img).remove()));
    syncPictures($('#news-body'));
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
    const newer = CHANGES.slice(0, Math.max(1, CHANGES.findIndex((c) => c.id === last))).flatMap((c) => c.items.filter((i) => !i.group.includes('🙏')).map((i) => i.summary));
    const list = newer.slice(0, 3).join(', ') + (newer.length > 3 ? ` and ${newer.length - 3} more` : '');
    $('#updated-text').innerHTML = `<strong>Updated:</strong> ${inline(list)}.`;
    $('#updated').hidden = false;
  }
  return { open };
}
