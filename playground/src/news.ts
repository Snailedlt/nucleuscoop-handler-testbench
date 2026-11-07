// What's new: the workbench's CHANGELOG.md, inside the workbench. After an update, a short note says
// what changed (not on a first visit), with a link to the full list. Can be turned off in Settings.
import { picture, syncPictures } from './themed';
import { motion } from './motion';
import { hlHtml } from './codehl';

const REPO = 'https://github.com/Snailedlt/nucleuscoop-handler-testbench';
declare const CHANGES: { id: string; n?: number; intro?: string; items: { group: string; summary: string; details: string; images?: { alt: string; file: string; dark?: string; still?: string; stillDark?: string }[] }[] }[];

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
  hlHtml(esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/&lt;(https:\/\/[^\s&]+)&gt;/g, '<a href="$1" target="_blank" rel="noopener">$1</a>'));
const when = (id: string) => {
  if (id === 'Unreleased') return 'In this preview';
  const [d, t] = id.split(' '); // "2026-11-05" or "2026-11-05 15:30" (UTC) for a second release that day
  const date = new Date(`${d}T${t ?? '12:00'}:00Z`);
  const day = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  return t ? `${day}, ${date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}` : day;
};

// A screenshot, or an animation: a GIF or a video, shown as its still frame until its item is opened (nothing big
// loads before that). It then plays by itself, unless the device asks for less motion: then it waits for Play.
// Either way a button pauses and plays it (WCAG 2.2.2).
const c = (f?: string) => (f ? `changes/${esc(f)}` : '');
function media(im: NonNullable<(typeof CHANGES)[number]['items'][number]['images']>[number]) {
  if (!im.still) return picture(c(im.file), im.dark && c(im.dark), esc(im.alt), ' loading="lazy"');
  const btn = `<button class="anim-btn" type="button" aria-pressed="false" aria-label="Play: ${esc(im.alt)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path class="p-play" d="M8 5v14l11-7z"/><path class="p-pause" d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg></button>`;
  const data = `data-src="${c(im.file)}" data-dark="${c(im.dark)}" data-still="${c(im.still)}" data-still-dark="${c(im.stillDark)}"`;
  return /\.(mp4|webm)$/.test(im.file)
    ? `<span class="anim" data-kind="video" ${data}><video muted loop playsinline preload="none" poster="${c(im.still)}" aria-label="${esc(im.alt)}"></video>${btn}</span>`
    : `<span class="anim" data-kind="gif" ${data}>${picture(c(im.still), im.stillDark && c(im.stillDark), esc(im.alt), ' loading="lazy"')}${btn}</span>`;
}
const darkNow = () => (document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches);
function playAnim(a: HTMLElement, on: boolean) {
  const d = a.dataset, dark = darkNow() && d.dark;
  const btn = a.querySelector('.anim-btn') as HTMLButtonElement;
  btn.setAttribute('aria-pressed', String(on));
  btn.setAttribute('aria-label', `${on ? 'Pause' : 'Play'}: ${btn.getAttribute('aria-label')!.replace(/^(Play|Pause): /, '')}`);
  a.classList.toggle('playing', on);
  if (d.kind === 'video') {
    const v = a.querySelector('video') as HTMLVideoElement;
    v.poster = (darkNow() && d.stillDark) || d.still!;
    if (on) { const src = (dark || d.src)!; if (!v.src.endsWith(src)) v.src = src; void v.play().catch(() => {}); } else v.pause();
    return;
  }
  // A GIF can't pause: swap between it and its still.
  const img = a.querySelector('img') as HTMLImageElement, src = a.querySelector('source') as HTMLSourceElement | null;
  img.src = on ? d.src! : d.still!;
  if (src) src.srcset = on ? (d.dark || d.src)! : (d.stillDark || d.still)!;
}

export function initNews() {
  const dlg = $('#news-dialog') as HTMLDialogElement;
  const latest = CHANGES[0]?.id;
  const open = () => {
    const item = (it: (typeof CHANGES)[number]['items'][number]) => {
      const ims = it.images ?? [];
      const moving = ims.some((im) => im.still);
      const label = moving ? (ims.length > 1 ? 'Animations' : 'Animation') : ims.length > 1 ? 'Screenshots' : 'Screenshot';
      return `<li><strong>${inline(it.summary)}</strong>${it.details ? `<span>${inline(it.details)}</span>` : ''}${ims.length ? `<details class="shot"><summary>${label}</summary>${ims.map(media).join('')}</details>` : ''}</li>`;
    };
    // One card per release so they don't run into each other: the newest open, older ones folded.
    $('#news-body').innerHTML = CHANGES.map((c, i) => {
      const groups = [...new Set(c.items.map((it) => it.group))];
      const changes = c.items.filter((it) => !it.group.includes('🙏')).length;
      const badge = c.id === 'Unreleased' ? '<span class="chip info">preview</span>' : c === CHANGES.find((x) => x.id !== 'Unreleased') ? '<span class="chip ok">latest</span>' : '';
      const intro = c.intro ? `<p class="rel-intro">${inline(c.intro).replace(/^([^.!?]+[.!?])/, '<strong>$1</strong>')}</p>` : '';
      const body = intro + groups.map((g) => `${g ? `<h3>${esc(g)}</h3>` : ''}<ul class="${g.includes('🙏') ? 'thanks' : ''}">${c.items.filter((it) => it.group === g).map(item).join('')}</ul>`).join('');
      // Its number, and its notes on GitHub (the CHANGELOG.md heading's anchor).
      const anchor = c.id.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/ /g, '-');
      const num = c.n ? `<span class="rel-num">Release ${c.n}</span>` : '';
      const link = c.n ? `<p class="rel-link"><a href="${REPO}/blob/main/CHANGELOG.md#${anchor}" target="_blank" rel="noopener">Release ${c.n} on GitHub</a></p>` : '';
      return `<details class="release"${i < 1 || (i === 1 && CHANGES[0].id === 'Unreleased') ? ' open' : ''}><summary>${num}<span class="rel-date">${esc(when(c.id))}</span>${badge}<span class="rel-count">${changes} change${changes === 1 ? '' : 's'}</span></summary><div class="rel-body">${body}${link}</div></details>`;
    }).join('');
    // No screenshots in the single offline file: drop the ones that don't load.
    $('#news-body').querySelectorAll('img').forEach((img) => img.addEventListener('error', () => (img.closest('picture') ?? img).remove()));
    syncPictures($('#news-body'));
    // Animations start when their item opens (and the device allows motion); the button plays and pauses them.
    const calm = !motion().newsAuto; // Settings → Theme → Motion (never with reduced motion)
    $('#news-body').querySelectorAll<HTMLDetailsElement>('details.shot').forEach((dt) =>
      dt.addEventListener('toggle', () => dt.querySelectorAll<HTMLElement>('.anim').forEach((a) => playAnim(a, dt.open && !calm))),
    );
    $('#news-body').querySelectorAll<HTMLElement>('.anim').forEach((a) => {
      a.querySelector('.anim-btn')!.addEventListener('click', () => playAnim(a, !a.classList.contains('playing')));
      a.querySelector('video')?.addEventListener('error', () => a.remove());
    });
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
