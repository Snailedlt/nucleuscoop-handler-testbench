// Small drop-down menus (the "+" next to the open handlers, the ⚙ menu, the side rail's buttons): opened under (or
// beside) their button, arrow keys move, Enter picks, Esc or a click outside closes and gives focus back.
export interface MenuItem {
  label: string;
  /** A short hint on the right: a shortcut, a count. */
  hint?: string;
  run?: () => void;
  /** A switch item (role menuitemcheckbox). */
  checked?: boolean;
  /** A group heading or a separator (no run). */
  kind?: 'heading' | 'separator';
  disabled?: boolean;
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
let open: { el: HTMLElement; anchor: HTMLElement; off: () => void } | null = null;

export function closeMenu(focusBack = false) {
  if (!open) return;
  const { el, anchor, off } = open;
  open = null;
  off();
  (el.parentElement ?? el).remove();
  anchor.setAttribute('aria-expanded', 'false');
  if (focusBack) anchor.focus();
}

/** Opens a menu for `anchor`; `side` puts it to the right of the anchor (the side rail) instead of under it. */
export function openMenu(anchor: HTMLElement, label: string, items: MenuItem[], side: 'below' | 'right' = 'below') {
  const was = open?.anchor;
  closeMenu();
  if (was === anchor) return; // a second click on the same button closes it
  const el = document.createElement('div');
  el.className = 'app-menu';
  el.setAttribute('role', 'menu');
  el.setAttribute('aria-label', label);
  el.innerHTML = items.map((it, i) =>
    it.kind === 'separator' ? '<div class="am-sep" role="separator"></div>'
    : it.kind === 'heading' ? `<div class="am-h" role="presentation">${esc(it.label)}</div>`
    : `<button type="button" role="${it.checked === undefined ? 'menuitem' : 'menuitemcheckbox'}" data-i="${i}"${it.checked !== undefined ? ` aria-checked="${it.checked}"` : ''}${it.disabled ? ' disabled' : ''}>${it.checked !== undefined ? `<span class="am-check" aria-hidden="true">${it.checked ? '✓' : ''}</span>` : ''}<span class="am-l">${esc(it.label)}</span>${it.hint ? `<kbd class="am-k">${esc(it.hint)}</kbd>` : ''}</button>`).join('');
  // In its own labelled region (a landmark), so screen readers find it in the page structure; on <body>, so a
  // header with a backdrop filter doesn't become its containing block.
  const region = document.createElement('div');
  region.setAttribute('role', 'region');
  region.setAttribute('aria-label', label);
  region.append(el);
  document.body.append(region);
  const r = anchor.getBoundingClientRect();
  const w = el.offsetWidth, h = el.offsetHeight;
  const left = side === 'right' ? r.right + 6 : Math.min(Math.max(8, r.left), innerWidth - w - 8);
  const top = side === 'right' ? Math.min(Math.max(8, r.top), innerHeight - h - 8) : (r.bottom + 6 + h < innerHeight ? r.bottom + 6 : Math.max(8, r.top - h - 6));
  el.style.left = `${left}px`;
  el.style.top = `${top}px`;
  anchor.setAttribute('aria-expanded', 'true');
  const buttons = [...el.querySelectorAll<HTMLButtonElement>('button:not([disabled])')];
  buttons[0]?.focus();
  el.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-i]');
    if (!b) return;
    const it = items[Number(b.dataset.i)];
    closeMenu(it.checked !== undefined);
    it.run?.();
  });
  el.addEventListener('keydown', (e) => {
    const i = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); buttons[(i + 1) % buttons.length]?.focus(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); buttons[(i - 1 + buttons.length) % buttons.length]?.focus(); }
    else if (e.key === 'Home') { e.preventDefault(); buttons[0]?.focus(); }
    else if (e.key === 'End') { e.preventDefault(); buttons[buttons.length - 1]?.focus(); }
    else if (e.key === 'Escape' || e.key === 'Tab') { e.preventDefault(); closeMenu(true); }
  });
  const outside = (e: PointerEvent) => { if (!el.contains(e.target as Node) && !anchor.contains(e.target as Node)) closeMenu(); };
  const away = () => closeMenu();
  document.addEventListener('pointerdown', outside, true);
  addEventListener('resize', away);
  open = { el, anchor, off: () => { document.removeEventListener('pointerdown', outside, true); removeEventListener('resize', away); } };
}
