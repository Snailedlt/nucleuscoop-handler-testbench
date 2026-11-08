// Pick a value instead of typing it (testbench#22, an idea from messenils): put the cursor on (or tap) the value of an
// option, e.g. the `false` in `Game.SymlinkGame = false;`, and a small ▾ appears after it; it opens the values the
// option takes (true/false, an enum's values, − / + for numbers). Alt+↓ opens it from the keyboard. Nothing shows until
// the cursor is on such a value, so it stays out of the way of people who type (AGENTS.md, "Who it's for").
// The values come from the core (valuePicks in core/complete.ts), the same data as the suggestions after `=`.
import { valuePickAt, type ValuePick } from '@core/complete';
import { ownerLabel } from '@core/api';
import CodeMirror from 'codemirror';

type CM = any; // CodeMirror 5
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const firstSentence = (s: string) => (s.match(/^[\s\S]*?[.!?](\s|$)/)?.[0] ?? s).replace(/[`*_]/g, '').trim();

export function initValuePicker(editor: CM) {
  let chip: { clear: () => void } | null = null;
  let chipEl: HTMLButtonElement | null = null;
  let menu: HTMLElement | null = null;
  let timer = 0;
  let stepping = false;
  const closeMenu = () => { menu?.remove(); menu = null; };
  const clearChip = () => { chip?.clear(); chip = null; chipEl = null; };
  const current = (): ValuePick | undefined => {
    if (editor.somethingSelected() || editor.getOption('readOnly')) return undefined;
    return valuePickAt(editor.getValue(), editor.indexFromPos(editor.getCursor()));
  };
  const place = () => {
    clearChip();
    const p = current();
    if (!p) return;
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `vp-chip${p.wrong ? ' bad' : ''}`;
    b.textContent = '▾';
    b.title = 'Pick a value (Alt+↓)';
    b.setAttribute('aria-label', `Pick a value for ${ownerLabel(p.owner)}.${p.name}`);
    b.setAttribute('aria-haspopup', 'menu');
    b.addEventListener('mousedown', (e) => e.preventDefault()); // keep the cursor where it is
    b.addEventListener('click', () => open());
    chipEl = b;
    chip = editor.setBookmark(editor.posFromIndex(p.end), { widget: b, insertLeft: true });
  };
  const replace = (p: ValuePick, value: string) => {
    editor.replaceRange(value, editor.posFromIndex(p.start), editor.posFromIndex(p.end), '+valuepick');
    editor.setCursor(editor.posFromIndex(p.start + value.length));
  };

  function open() {
    const p = current();
    if (!p) return;
    closeMenu();
    const label = `${ownerLabel(p.owner)}.${p.name}`;
    menu = document.createElement('div');
    menu.className = 'wm-menu vp-menu';
    menu.setAttribute('role', 'menu');
    menu.setAttribute('aria-label', `Values for ${label}`);
    const what = p.kind === 'boolean' ? 'true or false' : p.kind === 'number' ? 'a number' : 'one of its values';
    let body = `<div class="wm-menu-h"><code>${esc(label)}</code> takes ${what}</div>`;
    if (p.member.doc) body += `<p class="vp-doc muted">${esc(firstSentence(p.member.doc))}</p>`;
    if (p.wrong) body += `<p class="vp-wrong">Now: <code>${esc(p.current)}</code>, ${esc(p.wrong)}.</p>`;
    if (p.kind === 'number') {
      const n = Number(p.current);
      body += Number.isFinite(n)
        ? `<div class="vp-num"><button type="button" role="menuitem" data-step="-1" aria-label="One less">−</button><output>${esc(p.current)}</output><button type="button" role="menuitem" data-step="1" aria-label="One more">+</button></div>`
        : `<button type="button" role="menuitem" data-value="${esc(p.current.slice(1, -1).trim() || '0')}"><b>${esc(p.current.slice(1, -1).trim() || '0')}</b><small>The same number without quotes</small></button>`;
    } else {
      body += p.options.map((o) => `<button type="button" role="menuitemradio" aria-checked="${!!o.current}" data-value="${esc(o.value)}"><b>${o.current ? '✓ ' : ''}${esc(o.label)}</b>${o.detail ? ` <code>${esc(o.detail)}</code>` : ''}${o.isDefault ? '<span class="wm-n">default</span>' : ''}</button>`).join('');
    }
    if (p.member.default !== undefined && p.kind === 'number') body += `<p class="wm-menu-f muted">Nucleus' default: <code>${esc(p.member.default)}</code></p>`;
    menu.innerHTML = body;
    document.body.appendChild(menu);
    const anchor = chipEl ?? editor.getWrapperElement();
    const r = anchor.getBoundingClientRect();
    // Phones and touch screens: a sheet at the bottom with big targets; elsewhere a list next to the value.
    const sheet = window.innerWidth <= 600 || matchMedia('(pointer: coarse)').matches;
    menu.classList.toggle('vp-sheet', sheet);
    if (!sheet) {
      menu.style.left = `${Math.max(8, Math.min(r.left, window.innerWidth - menu.offsetWidth - 8))}px`;
      menu.style.top = r.bottom + 6 + menu.offsetHeight < window.innerHeight ? `${r.bottom + 6}px` : `${Math.max(8, r.top - menu.offsetHeight - 6)}px`;
    }
    const items = () => [...menu!.querySelectorAll<HTMLButtonElement>('button')];
    (menu.querySelector<HTMLButtonElement>('[aria-checked="true"]') ?? items()[0])?.focus();
    document.getElementById('tip')?.setAttribute('hidden', '');
    menu.addEventListener('click', (e) => {
      const b = (e.target as HTMLElement).closest<HTMLButtonElement>('button');
      const now = current();
      if (!b || !now) return;
      if (b.dataset.step) {
        // Numbers: − / + change it in place and keep the list open.
        const v = String(Number(now.current) + Number(b.dataset.step));
        stepping = true;
        replace(now, v);
        stepping = false;
        editor.setCursor(editor.posFromIndex(now.start));
        menu!.querySelector('output')!.textContent = v;
        return;
      }
      replace(now, b.dataset.value!);
      closeMenu();
      editor.focus();
    });
    menu.addEventListener('keydown', (e) => {
      const list = items();
      const i = list.indexOf(document.activeElement as HTMLButtonElement);
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); list[(i + 1) % list.length]?.focus(); }
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); list[(i - 1 + list.length) % list.length]?.focus(); }
      else if (e.key === 'Escape' || e.key === 'Tab') { e.preventDefault(); closeMenu(); editor.focus(); }
    });
    setTimeout(() => document.addEventListener('pointerdown', function off(e) {
      if (menu && !menu.contains(e.target as Node) && e.target !== chipEl) closeMenu();
      if (!menu) document.removeEventListener('pointerdown', off);
    }), 0);
  }

  editor.on('cursorActivity', () => { clearTimeout(timer); timer = window.setTimeout(place, 60); });
  editor.on('change', () => { if (!stepping) closeMenu(); });
  editor.on('blur', () => setTimeout(() => { if (!menu && document.activeElement !== chipEl) clearChip(); }, 0));
  editor.on('focus', () => place());
  editor.addKeyMap({ 'Alt-Down': () => (current() ? open() : CodeMirror.Pass) });
}
