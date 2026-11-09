import { PRESETS, presetOf, savedMotion, setMotion, type MascotMotion, type Preset } from './motion';
import { setWrap, wrapEditor } from './wrap';
import { confirmOn } from './toast';
// Workbench settings (the gear in the header): theme, editor, tips, the Lines column, and the
// niche ones (Advanced mode, the dev bar) under Advanced. Also the phone helpers it controls:
// the symbol bar above the on-screen keyboard.
import { applyTheme } from './devbar';
import { initKeyboard, keyboard, onKeyboard } from './keyboard';
import { CODE_THEMES, codeThemeTokens, currentCodeTheme, pickCodeTheme, addLook, BUILT_IN_LOOKS, lookAbout, contrastProblems, currentLook, customLooks, lookName, lookTokens, parseTheme, pickLook, removeLook, themeFile } from './customtheme';

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
    setWrap(ed.wrap); // every code view, not only the handler's editor (wrap.ts)
    d.editor.refresh();
  };
  wrapEditor(d.editor);
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
      syncLooks(); // the swatches show the mode on screen
    }),
  );
  // Looks: the built-in ones and your theme files (customtheme.ts, themekit.ts), one on at a time.
  const ctMsg = $('#ct-msg');
  const say = (text: string, kind: '' | 'warn' | 'error' = '') => ((ctMsg.textContent = text), (ctMsg.className = `ct-msg small ${kind}`));
  const isDark = () => (document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches);
  // Code colours: the look's own, or one of the code themes, each shown as a few lines of handler.
  function syncCode() {
    const box = document.getElementById('set-code');
    if (!box) return;
    const on = currentCodeTheme();
    const mode = isDark() ? 'dark' : 'light';
    const sample = '<span class="c">// Two players, one screen</span>\nGame.<span class="p">MaxPlayers</span> <span class="o">=</span> <span class="n">2</span>;\n<span class="k">var</span> exe <span class="o">=</span> <span class="s">"game.exe"</span>;';
    const card = (id: string, name: string) => {
      const label = document.createElement('label');
      label.className = `code-card${id === on ? ' on' : ''}`;
      const r = document.createElement('input');
      r.type = 'radio';
      r.name = 'set-code';
      r.value = id;
      r.checked = id === on;
      r.className = 'sr-only';
      r.addEventListener('change', () => (pickCodeTheme(id), syncCode(), (box.querySelector(`input[value="${CSS.escape(id)}"]`) as HTMLInputElement | null)?.focus()));
      const pre = document.createElement('pre');
      pre.className = 'ct-sample';
      pre.setAttribute('aria-hidden', 'true');
      for (const [k, v] of Object.entries(codeThemeTokens(id, mode))) if (v) pre.style.setProperty(`--${k}`, v);
      pre.innerHTML = sample;
      const nm = document.createElement('span');
      nm.className = 'lc-name';
      nm.textContent = name;
      const tick = document.createElement('span');
      tick.className = 'lc-tick';
      tick.setAttribute('aria-hidden', 'true');
      tick.innerHTML = '<svg viewBox="0 0 24 24"><path d="m6 12.5 4 4L18 8"/></svg>';
      label.append(r, pre, nm, tick);
      return label;
    };
    box.replaceChildren(card('', "The look's own"), ...Object.entries(CODE_THEMES).map(([id, t]) => {
      const c = card(id, t.name);
      if (t.about) c.title = t.about; // what it is ("VS Code's default colours…") on hover
      return c;
    }));
  }
  function syncLooks() {
    syncCode();
    const box = $('#set-looks');
    const on = currentLook();
    const mode = isDark() ? 'dark' : 'light';
    const el = (tag: string, cls: string, text?: string) => {
      const e = document.createElement(tag);
      e.className = cls;
      if (text) e.textContent = text;
      return e;
    };
    // A card per look: a small picture of the workbench in its colours (the mode on screen), its name
    // in its own font, a line about it; the one that's on has a ring and a tick.
    const card = (id: string, name: string, about: string | undefined, custom: boolean) => {
      const t = lookTokens(id, mode);
      const div = el('div', `look-card${id === on ? ' on' : ''}`);
      const label = el('label', 'lc-label');
      const r = document.createElement('input');
      r.type = 'radio';
      r.name = 'set-look';
      r.value = id;
      r.checked = id === on;
      r.className = 'sr-only';
      r.addEventListener('change', () => (pickLook(id), say(''), syncLooks(), (box.querySelector(`input[value="${CSS.escape(id)}"]`) as HTMLInputElement | null)?.focus()));
      const prev = el('span', 'lc-prev');
      prev.setAttribute('aria-hidden', 'true');
      for (const [k, v] of Object.entries({ b: t.bg, s: t.surface, s2: t['surface-2'], f: t.fg, m: t.muted, a: t.accent, af: t['accent-fg'], l: t.line, r: t['r-pane'], p1: t.p1, p2: t.p2, p3: t.p3 })) if (v) prev.style.setProperty(`--${k}`, v);
      // the header (logo dots, buttons), a pane of text with a coloured word, the primary button
      prev.innerHTML = '<span class="lc-top"><i class="d1"></i><i class="d2"></i><i class="d3"></i><i class="sp"></i><i class="bt"></i></span><span class="lc-pane"><i class="t1"></i><i class="t2"></i><i class="t3"></i><i class="cta"></i></span>';
      const nm = el('span', 'lc-name', name);
      if (t['font-display']) nm.style.fontFamily = t['font-display'];
      label.append(r, prev, nm);
      if (about) {
        const ab = el('span', 'lc-about', about);
        ab.title = about;
        label.append(ab);
      }
      const tick = el('span', 'lc-tick');
      tick.setAttribute('aria-hidden', 'true');
      tick.innerHTML = '<svg viewBox="0 0 24 24"><path d="m6 12.5 4 4L18 8"/></svg>';
      div.append(label, tick);
      if (custom) {
        const rm = el('button', 'lc-remove');
        (rm as HTMLButtonElement).type = 'button';
        rm.setAttribute('aria-label', `Remove ${name}`);
        rm.title = 'Remove';
        rm.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17"/></svg>';
        rm.addEventListener('click', () => (removeLook(id), say(`"${name}" removed.`), syncLooks()));
        div.append(rm);
      }
      return div;
    };
    // The last card adds one: a theme file from the device.
    const add = el('button', 'look-card look-add');
    (add as HTMLButtonElement).type = 'button';
    add.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg><span class="lc-name">Add a theme file</span><span class="lc-about">JSON, from your device</span>';
    add.addEventListener('click', () => ($('#ct-file') as HTMLInputElement).click());
    box.replaceChildren(
      ...BUILT_IN_LOOKS.map((id) => card(id, lookName(id), lookAbout(id), false)),
      ...customLooks().map((t) => card(t.id, t.name, t.about ?? `Your theme, on ${lookName(t.base)}`, true)),
      add,
    );
  }
  syncLooks();
  matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', syncLooks);
  window.addEventListener('workbench-look', () => setTimeout(syncLooks));
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
    addLook(r.look);
    syncLooks();
    const bad = contrastProblems();
    const notes = [
      r.skipped.length ? `Left out: ${r.skipped.slice(0, 5).join(', ')}${r.skipped.length > 5 ? ` and ${r.skipped.length - 5} more` : ''}.` : '',
      bad.length ? `Hard to read in this mode (below 4.5:1): ${bad.slice(0, 4).join(', ')}${bad.length > 4 ? '…' : ''}.` : '',
    ].filter(Boolean);
    say(`"${r.look.name}" is on, built on ${lookName(r.look.base)}.${notes.length ? ' ' + notes.join(' ') : ''}`, notes.length ? 'warn' : '');
  });
  $('#ct-download').addEventListener('click', () => {
    const t = themeFile();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(t, null, 2) + '\n'], { type: 'application/json' }));
    a.download = `${String(t.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'workbench-theme'}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    say(`Downloaded ${a.download}. Edit it (delete what you keep as it is), then load it here.`);
  });
  $('#set-size').addEventListener('change', (e) => ((ed.size = (e.target as HTMLSelectElement).value as any), save(), applyEditor()));
  $('#set-wrap').addEventListener('change', (e) => ((ed.wrap = (e.target as HTMLInputElement).checked), save(), applyEditor()));
  $('#set-keybar').addEventListener('change', (e) => ((ed.keybar = (e.target as HTMLInputElement).checked), save(), placeKeybar()));
  $('#set-tips').addEventListener('change', (e) => d.tips.set((e.target as HTMLInputElement).checked));
  $('#set-heads').addEventListener('click', () => (d.tips.set(true), d.tips.reset(), sync(), confirmOn($('#set-heads'), 'Heads-ups will show again ✓', 'Heads-ups will show again.')));
  // Motion: a preset, and the switches it sets; changing a switch makes it "Custom".
  const mv = { preset: $('#set-motion') as HTMLSelectElement, ui: $('#set-motion-ui') as HTMLInputElement, masc: $('#set-motion-masc') as HTMLSelectElement, edit: $('#set-motion-edit') as HTMLInputElement, news: $('#set-motion-news') as HTMLInputElement };
  const showMotion = () => {
    const m = savedMotion();
    mv.preset.value = presetOf(m);
    mv.ui.checked = m.ui; mv.masc.value = m.mascots; mv.edit.checked = m.editFx; mv.news.checked = m.newsAuto;
    $('#set-motion-note').textContent = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'Your device asks for less motion, so nothing here moves more than Still.' : '';
  };
  mv.preset.addEventListener('change', () => { setMotion({ ...PRESETS[mv.preset.value as Preset] }); showMotion(); });
  const fromSwitches = () => { setMotion({ ui: mv.ui.checked, mascots: mv.masc.value as MascotMotion, editFx: mv.edit.checked, newsAuto: mv.news.checked }); showMotion(); };
  [mv.ui, mv.masc, mv.edit, mv.news].forEach((x) => x.addEventListener('change', fromSwitches));
  showMotion();
  $('#set-lines').addEventListener('change', (e) => d.lines.set((e.target as HTMLInputElement).checked));
  $('#set-advanced').addEventListener('change', (e) => {
    d.advanced.checked = (e.target as HTMLInputElement).checked;
    d.advanced.dispatchEvent(new Event('change'));
  });
  $('#set-devbar').addEventListener('change', () => d.devBar.toggle());
  $('#settings-close').addEventListener('click', () => dlg.close());
  // A vertical list of sections, in groups. The last one used opens next time.
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
      const k = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
      if (e.key === 'Home' || e.key === 'End') {
        e.preventDefault();
        selectTab(tabs[e.key === 'Home' ? 0 : tabs.length - 1].dataset.st!, true);
      } else if (k) {
        e.preventDefault();
        selectTab(tabs[(i + k + tabs.length) % tabs.length].dataset.st!, true);
      }
    });
  });
  // Search: shows every section's matching settings at once, with the section names above them.
  const q = $('#set-q') as HTMLInputElement;
  const none = $('#set-none');
  // Settings for experienced users (.dev-only) aren't searched outside Advanced mode, as they aren't shown (a switched-on WakaTime is).
  const modeHidden = (el: Element) => document.documentElement.dataset.mode !== 'dev' && el.classList.contains('dev-only') && !el.querySelector('#set-waka:checked');
  const shownText = (el: Element): string => (modeHidden(el) ? '' : [...el.childNodes].map((n) => (n.nodeType === 1 ? shownText(n as Element) : n.textContent ?? '')).join(''));
  const filter = () => {
    const words = q.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    dlg.classList.toggle('searching', words.length > 0);
    let any = false;
    for (const panel of dlg.querySelectorAll<HTMLElement>('.set-panel')) {
      let hit = false;
      const label = (panel.dataset.label ?? '').toLowerCase();
      for (const s of panel.querySelectorAll<HTMLElement>('.set-sec')) {
        const text = label + ' ' + shownText(s).toLowerCase();
        const ok = words.every((w) => text.includes(w));
        s.classList.toggle('no-match', !ok);
        hit ||= ok;
      }
      panel.classList.toggle('no-match', !hit);
      any ||= hit;
    }
    none.hidden = !words.length || any;
  };
  q.addEventListener('input', filter);
  d.advanced.addEventListener('change', () => { if (q.value) filter(); });
  q.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && q.value) { e.preventDefault(); e.stopPropagation(); q.value = ''; filter(); }
  });
  for (const t of tabs) t.addEventListener('click', () => { if (q.value) { q.value = ''; filter(); } });
  const open = (tab?: string) => {
    sync();
    const want = tab ?? get(TAB_KEY) ?? 'theme';
    selectTab(tabs.some((x) => x.dataset.st === want) ? want : 'theme');
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
    // The header steps aside while typing: Share from here keeps the selection, so a link to the selected lines
    // is one tap away.
    ['Share…', 'Share: a link (to the selected lines, if any), the code, or a Discord post', () => ($('#share-open') as HTMLButtonElement).click()],
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

  /** Alt+Z (View: Toggle Word Wrap in VS Code): flips the setting, kept like a change in Settings. */
  function toggleWrap() {
    ed.wrap = !ed.wrap;
    save();
    applyEditor();
    ($('#set-wrap') as HTMLInputElement).checked = ed.wrap;
    d.toast(ed.wrap ? 'Word wrap on: long lines wrap (Alt+Z turns it off).' : 'Word wrap off: long lines scroll sideways (Alt+Z turns it on).');
  }
  return { open, toggleWrap };
}
