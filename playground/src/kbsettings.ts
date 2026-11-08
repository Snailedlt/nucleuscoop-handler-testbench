// Settings › Keyboard shortcuts: every shortcut (keybindings.ts), searchable, each changeable by pressing the new keys,
// with clashes and keys the browser keeps pointed out, one-click resets. Saved in this browser; Export / Import
// settings carries them to another one.
import { ACTIONS, binding, conflicts, defaultBinding, isCustom, keyLabel, onBindingsChange, reserved, resetAll, setBinding, stepOf, type Group } from './keybindings';

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const chips = (keys: string) => (keys ? keys.split(' ').map((step) => step.split('+').map((k) => `<kbd>${esc(k)}</kbd>`).join('')).join(' <span class="muted">then</span> ') : '<span class="muted">none</span>');

export function initKeySettings(root: HTMLElement) {
  root.innerHTML = `
    <div class="set-sec">
      <p class="muted small" style="margin:0 0 6px">VS Code's keys by default. Click <b>Change</b> and press the new keys (two in a row for a two-step one, like <kbd>Ctrl</kbd><kbd>K</kbd> then <kbd>Ctrl</kbd><kbd>0</kbd>). Saved in this browser; <b>Updates and backup › Export settings</b> takes them along.</p>
      <div class="kb-tools"><input type="search" class="kb-q" placeholder="Search shortcuts or keys" aria-label="Search shortcuts"><button class="btn" type="button" data-kb-reset-all>Reset all</button></div>
      <p class="kb-msg small" role="status" aria-live="polite"></p>
      <table class="kb-table"><tbody></tbody></table>
    </div>`;
  const body = root.querySelector('tbody')!;
  const q = root.querySelector<HTMLInputElement>('.kb-q')!;
  const msg = root.querySelector<HTMLElement>('.kb-msg')!;
  let editing: string | null = null;

  const render = () => {
    const words = q.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const groups: Group[] = ['Workbench', 'Problems', 'Find and navigate', 'Editing', 'Debugger'];
    body.innerHTML = groups
      .map((g) => {
        const rows = ACTIONS.filter((a) => a.group === g).filter((a) => {
          const hay = `${a.label} ${a.where === 'fixed' ? a.keys : binding(a.id)} ${g}`.toLowerCase();
          return words.every((w) => hay.includes(w));
        });
        if (!rows.length) return '';
        return `<tr class="kh"><th colspan="3">${g}</th></tr>` + rows.map((a) => {
          if (a.where === 'fixed') return `<tr class="kb-fixed"><td>${esc(a.label)}</td><td>${a.keys.split(' · ').map(chips).join(' · ')}</td><td class="muted small">fixed</td></tr>`;
          if (editing === a.id) return `<tr class="kb-editing"><td>${esc(a.label)}</td><td colspan="2"><input class="kb-recorder" data-kb-id="${a.id}" readonly aria-label="Press the new keys for ${esc(a.label)}" placeholder="Press the new keys…"> <span class="muted small">Enter to keep · Esc to cancel</span> <button class="link" type="button" data-kb-none="${a.id}">No shortcut</button></td></tr>`;
          const b = binding(a.id);
          const custom = isCustom(a.id);
          return `<tr${custom ? ' class="kb-custom"' : ''}><td>${esc(a.label)}${a.where === 'code' ? ' <span class="muted small">in the code</span>' : ''}</td><td>${chips(keyLabel(b))}${custom ? ` <span class="muted small" title="Default: ${esc(keyLabel(defaultBinding(a)))}">changed</span>` : ''}</td><td class="kb-act"><button class="btn small" type="button" data-kb-change="${a.id}">Change</button>${custom ? `<button class="link small" type="button" data-kb-reset="${a.id}">Reset</button>` : ''}</td></tr>`;
        }).join('');
      })
      .join('') || '<tr><td class="muted">No shortcut matches.</td></tr>';
    const rec = body.querySelector<HTMLInputElement>('.kb-recorder');
    if (rec) record(rec);
  };

  const record = (input: HTMLInputElement) => {
    const id = input.dataset.kbId!;
    let steps: string[] = [];
    let last = 0;
    input.focus();
    const show = () => {
      const keys = steps.join(' ');
      input.value = keys ? keyLabel(keys) : '';
      const clash = keys ? conflicts(id, keys) : [];
      const browser = keys ? reserved(keys) : undefined;
      msg.textContent = browser ? `The browser keeps ${keyLabel(keys)} (it ${browser}): pick another.` : clash.length ? `${keyLabel(keys)} is used by “${clash.map((c) => c.label).join('”, “')}”: keeping it moves it here.` : '';
    };
    input.addEventListener('keydown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const plain = !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey;
      if (e.key === 'Escape' && plain) return void ((editing = null), (msg.textContent = ''), render(), body.querySelector<HTMLElement>(`[data-kb-change="${id}"]`)?.focus());
      if (e.key === 'Enter' && plain && steps.length) {
        const keys = steps.join(' ');
        if (reserved(keys)) return;
        const moved = conflicts(id, keys);
        moved.forEach((c) => setBinding(c.id, ''));
        setBinding(id, keys);
        editing = null;
        msg.textContent = `${ACTIONS.find((a) => a.id === id)!.label}: ${keyLabel(keys)}.${moved.length ? ` Removed from “${moved.map((c) => c.label).join('”, “')}”.` : ''}`;
        render();
        body.querySelector<HTMLElement>(`[data-kb-change="${id}"]`)?.focus();
        return;
      }
      const s = stepOf(e);
      if (!s) return;
      const now = Date.now();
      // A second key soon after one with Ctrl/⌘/Alt: a two-step shortcut. Otherwise start again.
      steps = steps.length === 1 && now - last < 1500 && /^(Ctrl|Cmd|Alt)\+/.test(steps[0]) ? [steps[0], s] : [s];
      last = now;
      show();
    });
  };

  root.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    const change = t.closest<HTMLElement>('[data-kb-change]')?.dataset.kbChange;
    const reset = t.closest<HTMLElement>('[data-kb-reset]')?.dataset.kbReset;
    const none = t.closest<HTMLElement>('[data-kb-none]')?.dataset.kbNone;
    if (change) {
      editing = change;
      msg.textContent = '';
      render();
    } else if (reset) {
      setBinding(reset, null);
      msg.textContent = `${ACTIONS.find((a) => a.id === reset)!.label}: back to ${keyLabel(binding(reset))}.`;
      render();
    } else if (none) {
      setBinding(none, '');
      editing = null;
      msg.textContent = `${ACTIONS.find((a) => a.id === none)!.label}: no shortcut (still in the command palette).`;
      render();
    } else if (t.closest('[data-kb-reset-all]')) {
      resetAll();
      msg.textContent = 'Every shortcut is back to its default.';
      render();
    }
  });
  q.addEventListener('input', render);
  onBindingsChange(() => { if (!editing) render(); });
  render();
}
