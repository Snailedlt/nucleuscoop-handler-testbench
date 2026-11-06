// Workbench settings (the gear in the header): theme, editor, tips, the Lines column, and the
// niche ones (Advanced mode, the dev bar) under Advanced. Also the phone helpers it controls:
// the symbol bar above the on-screen keyboard.
import { applyTheme } from './devbar';
import { initKeyboard, keyboard, onKeyboard } from './keyboard';
import { contrastProblems, currentTheme, customTheme, parseTheme, saveCustomTheme } from './customtheme';

const EDITOR_KEY = 'nucleus-workbench-editor';
const THEME_KEY = 'nucleus-workbench-dev-mode'; // shared with the dev bar
const $ = <T extends HTMLElement = HTMLElement>(sel: string) => document.querySelector(sel) as T;
const get = (k: string) => {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
};
const put = (k: string, v: string | null) => {
  try {
    if (v === null) localStorage.removeItem(k);
    else localStorage.setItem(k, v);
  } catch {}
};
const touch = () => window.matchMedia('(pointer: coarse)').matches;
const narrow = () => window.matchMedia('(max-width: 860px)').matches;

interface Deps {
  editor: any;
  hint: () => void;
  lines: { set(o: boolean): void; isOpen(): boolean; openSettings(): void; show(): void };
  tips: { set(v: boolean): void; isOn(): boolean; reset(): void };
  advanced: HTMLInputElement;
  devBar: { toggle(): void; isOn(): boolean };
  toast: (s: string) => void;
}

export function initSettings(d: Deps) {
  const ed = { size: 'm' as 's' | 'm' | 'l', wrap: narrow() || touch(), keybar: true };
  try {
    Object.assign(ed, JSON.parse(get(EDITOR_KEY) || '{}'));
  } catch {}
  const save = () => put(EDITOR_KEY, JSON.stringify(ed));
  const applyEditor = () => {
    document.documentElement.style.setProperty('--code-size', { s: '12px', m: '13px', l: '15px' }[ed.size]);
    d.editor.setOption('lineWrapping', ed.wrap);
    d.editor.refresh();
  };
  applyEditor();

  const dlg = $('#settings-dialog') as HTMLDialogElement;
  const theme = () => (get(THEME_KEY) as 'auto' | 'light' | 'dark') || 'auto';
  function sync() {
    dlg.querySelectorAll<HTMLInputElement>('input[name=set-theme]').forEach((r) => (r.checked = r.value === theme()));
    ($('#set-size') as HTMLSelectElement).value = ed.size;
    ($('#set-wrap') as HTMLInputElement).checked = ed.wrap;
    ($('#set-keybar') as HTMLInputElement).checked = ed.keybar;
    ($('#set-tips') as HTMLInputElement).checked = d.tips.isOn();
    ($('#set-lines') as HTMLInputElement).checked = d.lines.isOpen();
    ($('#set-advanced') as HTMLInputElement).checked = d.advanced.checked;
    ($('#set-devbar') as HTMLInputElement).checked = d.devBar.isOn();
  }
  dlg.querySelectorAll<HTMLInputElement>('input[name=set-theme]').forEach((r) =>
    r.addEventListener('change', () => {
      put(THEME_KEY, r.value === 'auto' ? null : r.value);
      applyTheme();
    }),
  );
  // Custom theme: a JSON file of design tokens (customtheme.ts).
  const ctMsg = $('#ct-msg');
  const say = (text: string, kind: '' | 'warn' | 'error' = '') => ((ctMsg.textContent = text), (ctMsg.className = `ct-msg small ${kind}`));
  function syncCustom() {
    const t = customTheme();
    const status = $('#ct-status');
    status.textContent = '';
    if (t) {
      const b = document.createElement('strong');
      b.textContent = t.name;
      status.append('Custom theme: ', b, ` (${[t.light && 'light', t.dark && 'dark'].filter(Boolean).join(' and ')}).`);
    } else status.textContent = 'Custom theme: none. A theme file (JSON) sets colours, corners, shadows and fonts.';
    ($('#ct-remove') as HTMLButtonElement).hidden = !t;
  }
  syncCustom();
  $('#ct-load').addEventListener('click', () => ($('#ct-file') as HTMLInputElement).click());
  $('#ct-file').addEventListener('change', async (e) => {
    const input = e.target as HTMLInputElement;
    const f = input.files?.[0];
    input.value = '';
    if (!f) return;
    let raw: unknown;
    try {
      if (f.size > 200_000) throw new Error('big');
      raw = JSON.parse(await f.text());
    } catch {
      return say(`"${f.name}" can't be read as a theme: it should be a small JSON file.`, 'error');
    }
    const r = parseTheme(raw);
    if ('error' in r) return say(r.error, 'error');
    saveCustomTheme(r.theme);
    syncCustom();
    const bad = contrastProblems();
    const notes = [
      r.skipped.length ? `Left out: ${r.skipped.slice(0, 5).join(', ')}${r.skipped.length > 5 ? ` and ${r.skipped.length - 5} more` : ''}.` : '',
      bad.length ? `Hard to read in this mode (below 4.5:1): ${bad.slice(0, 4).join(', ')}${bad.length > 4 ? '…' : ''}.` : '',
    ].filter(Boolean);
    say(`"${r.theme.name}" is on.${notes.length ? ' ' + notes.join(' ') : ''}`, notes.length ? 'warn' : '');
  });
  $('#ct-download').addEventListener('click', () => {
    const t = currentTheme(customTheme()?.name ?? 'My theme');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(t, null, 2) + '\n'], { type: 'application/json' }));
    a.download = 'workbench-theme.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    say('Downloaded workbench-theme.json: every value as shown now, light and dark. Edit it, then load it here.');
  });
  $('#ct-remove').addEventListener('click', () => {
    saveCustomTheme(null);
    syncCustom();
    say('Back to the built-in theme.');
  });
  $('#set-size').addEventListener('change', (e) => ((ed.size = (e.target as HTMLSelectElement).value as any), save(), applyEditor()));
  $('#set-wrap').addEventListener('change', (e) => ((ed.wrap = (e.target as HTMLInputElement).checked), save(), applyEditor()));
  $('#set-keybar').addEventListener('change', (e) => ((ed.keybar = (e.target as HTMLInputElement).checked), save(), placeKeybar()));
  $('#set-tips').addEventListener('change', (e) => d.tips.set((e.target as HTMLInputElement).checked));
  $('#set-heads').addEventListener('click', () => (d.tips.set(true), d.tips.reset(), sync(), d.toast('Heads-ups will show again.')));
  $('#set-lines').addEventListener('change', (e) => d.lines.set((e.target as HTMLInputElement).checked));
  $('#set-advanced').addEventListener('change', (e) => {
    d.advanced.checked = (e.target as HTMLInputElement).checked;
    d.advanced.dispatchEvent(new Event('change'));
  });
  $('#set-devbar').addEventListener('change', () => d.devBar.toggle());
  $('#settings-close').addEventListener('click', () => dlg.close());
  // Tabs: General, Editor, Lines, Help, Advanced. The last one used opens next time.
  const TAB_KEY = 'nucleus-workbench-settings-tab';
  const tabs = [...dlg.querySelectorAll<HTMLButtonElement>('[role=tab]')];
  const selectTab = (id: string, focus = false) => {
    const t = tabs.find((x) => x.dataset.st === id) ?? tabs[0];
    for (const x of tabs) {
      const on = x === t;
      x.setAttribute('aria-selected', String(on));
      x.tabIndex = on ? 0 : -1;
      ($('#' + x.getAttribute('aria-controls')) as HTMLElement).hidden = !on;
    }
    put(TAB_KEY, t.dataset.st!);
    if (focus) t.focus();
    t.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => selectTab(t.dataset.st!));
    t.addEventListener('keydown', (e) => {
      const k = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (e.key === 'Home' || e.key === 'End') {
        e.preventDefault();
        selectTab(tabs[e.key === 'Home' ? 0 : tabs.length - 1].dataset.st!, true);
      } else if (k) {
        e.preventDefault();
        selectTab(tabs[(i + k + tabs.length) % tabs.length].dataset.st!, true);
      }
    });
  });
  const open = (tab?: string) => {
    sync();
    selectTab(tab ?? get(TAB_KEY) ?? 'general');
    if (!dlg.open) dlg.showModal();
  };
  $('#settings-open').addEventListener('click', () => open());
  document.addEventListener('open-settings', (e) => open((e as CustomEvent).detail));

  // --- the symbol bar: keys that are hard to reach on a phone keyboard, above it
  const bar = $('#keybar');
  const KEYS: [string, string, string?][] = [
    ['Tab', '  '],
    ['.', '.'],
    [';', ';'],
    ['=', ' = '],
    ['"', '""', 'pair'],
    ['( )', '()', 'pair'],
    ['{ }', '{}', 'pair'],
    ['[ ]', '[]', 'pair'],
    [',', ', '],
    ['+', ' + '],
  ];
  for (const [label, ins, kind] of KEYS) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    b.setAttribute('aria-label', label === 'Tab' ? 'Indent' : `Type ${ins.trim() || label}`);
    b.addEventListener('pointerdown', (e) => e.preventDefault()); // keep the editor's focus and keyboard
    b.addEventListener('click', () => {
      d.editor.focus();
      const cur = d.editor.getCursor();
      d.editor.replaceSelection(ins);
      if (kind === 'pair') d.editor.setCursor({ line: cur.line, ch: cur.ch + 1 });
    });
    bar.append(b);
  }
  const extra: [string, string, () => void][] = [
    ['Suggest', 'Suggest names', () => d.hint()],
    ['Lines', 'Show the list of names', () => d.lines.show()],
    // The header (with the copy/download button) steps aside while typing: reach it from here, with
    // the selection kept, so a link to the selected lines is one tap away.
    ['Copy…', 'Copy or download the handler, or a link to the selected lines', () => ($('#code-menu-open') as HTMLButtonElement).click()],
    ['↶', 'Undo', () => d.editor.undo()],
    ['↷', 'Redo', () => d.editor.redo()],
  ];
  for (const [label, aria, run] of extra) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'kb-act';
    b.textContent = label;
    b.setAttribute('aria-label', aria);
    b.addEventListener('pointerdown', (e) => e.preventDefault());
    b.addEventListener('click', () => (label === 'Lines' || label === 'Copy…' ? run() : (d.editor.focus(), run())));
    bar.append(b);
  }
  let focused = false;
  // The keyboard itself is measured in keyboard.ts, for every text field: the whole workbench is
  // sized to what's visible above it (html.kb-up, --vvh). Here: the symbol keys, which sit right on
  // top of the keyboard while the code has focus, and the code-only layout (body.kb-open).
  let kbOpen = false;
  let lastVisible = 0;
  let wasGuess = false;
  function placeKeybar() {
    const k = keyboard();
    const up = focused && k.height > 0;
    const open = up && !k.estimated;
    // Re-fit only when the keyboard opens, closes or changes height: these events also fire while
    // scrolling, and scrolling the cursor back into view then would undo the scroll.
    const changed = open !== kbOpen || (open && Math.abs(k.visible - lastVisible) > 2);
    lastVisible = k.visible;
    if (changed) {
      kbOpen = open;
      document.body.classList.toggle('kb-open', open);
      d.editor.refresh();
      if (focused) requestAnimationFrame(() => d.editor.scrollIntoView(null, 60));
    }
    const show = up && ed.keybar && touch();
    const guess = show && k.estimated;
    bar.hidden = !show;
    document.body.classList.toggle('keybar-on', show && !guess);
    document.body.classList.toggle('keybar-est', guess);
    if (!show) return void (wasGuess = false);
    bar.style.bottom = `${k.bottom}px`;
    if (guess && !wasGuess) requestAnimationFrame(() => d.editor.scrollIntoView(null, 60));
    wasGuess = guess;
  }
  initKeyboard();
  onKeyboard(placeKeybar);
  d.editor.on('focus', () => ((focused = true), placeKeybar()));
  d.editor.on('blur', () => ((focused = false), setTimeout(placeKeybar, 150)));
  // While the keyboard is open, keep the cursor in the space above it (after CodeMirror's own scroll).
  // Not while selecting: dragging a selection handle scrolls by itself.
  d.editor.on('cursorActivity', () => kbOpen && !d.editor.somethingSelected() && requestAnimationFrame(() => d.editor.scrollIntoView(null, 60)));

  return { open };
}
