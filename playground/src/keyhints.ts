// Keyboard shortcuts, shown where they're used: hover a button (or reach it with Tab) and a small hint says what it
// does and its keys. Works in both modes, so the common shortcuts are findable without Advanced mode, but stays out
// of sight until you look. Replaces the button's plain title tooltip (kept as aria-keyshortcuts for screen readers).
const MAC = /Mac|iPhone|iPad/.test(navigator.platform);
const show = (keys: string) => keys.split(' ').map((k) => `<kbd>${k === 'Ctrl' && MAC ? '⌘' : k === 'Alt' && MAC ? '⌥' : k}</kbd>`).join('');

export function initKeyHints(list: { el: HTMLElement | null; what?: string; keys: string }[]) {
  const tip = document.createElement('div');
  tip.className = 'keyhint';
  tip.setAttribute('role', 'tooltip');
  tip.hidden = true;
  document.body.append(tip);
  let timer = 0;
  const hide = () => { clearTimeout(timer); tip.hidden = true; };
  for (const { el, what, keys } of list) {
    if (!el) continue;
    const label = what ?? (el.getAttribute('title') || el.getAttribute('aria-label') || el.textContent || '').replace(/\s*\((Ctrl|⌘|F\d|\?)[^)]*\)\s*$/, '').trim();
    el.removeAttribute('title');
    if (keys) el.setAttribute('aria-keyshortcuts', keys.replace(/ /g, '+').replace('Ctrl', MAC ? 'Meta' : 'Control'));
    const open = (delay: number) => {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (!el.isConnected || el.offsetParent === null) return;
        tip.innerHTML = `<span>${label.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]!)}</span>${keys ? `<span class="kh-keys">${show(keys)}</span>` : ''}`;
        tip.hidden = false;
        const r = el.getBoundingClientRect();
        const w = tip.offsetWidth, h = tip.offsetHeight;
        // In the side rail: to the right of the button; elsewhere under it.
        if (el.closest('.rail')) {
          tip.style.left = `${r.right + 8}px`;
          tip.style.top = `${r.top + r.height / 2 - h / 2}px`;
        } else {
          tip.style.left = `${Math.max(8, Math.min(r.left + r.width / 2 - w / 2, innerWidth - w - 8))}px`;
          tip.style.top = `${r.bottom + 6 + h < innerHeight ? r.bottom + 6 : r.top - h - 6}px`;
        }
      }, delay);
    };
    el.addEventListener('mouseenter', () => open(450));
    el.addEventListener('mouseleave', hide);
    el.addEventListener('focus', () => el.matches(':focus-visible') && open(0));
    el.addEventListener('blur', hide);
    el.addEventListener('click', hide);
  }
  document.addEventListener('keydown', (e) => e.key === 'Escape' && hide());
  addEventListener('scroll', hide, true);
}
