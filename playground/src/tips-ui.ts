// The tip bar under the code. One general tip at a time (Next shows another), and Clippy-style
// tips that pop up once when the code or the cursor makes them relevant. Off with one click.
import { CONTEXT_TIPS, GENERAL_TIPS, Tip, TipContext } from './tips';
import { scanHandler, inCallback, Scan } from './lines';

const ON_KEY = 'nucleus-workbench-tips';
const SEEN_KEY = 'nucleus-workbench-tips-seen';
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

interface Deps {
  editor: any;
  toast?: (s: string) => void;
  actions: Record<NonNullable<Tip['action']>['run'], () => void>;
}

export function initTips({ editor, actions, toast }: Deps) {
  let on = get(ON_KEY) !== '0';
  const seen = new Set<string>(JSON.parse(get(SEEN_KEY) || '[]'));
  let general = Math.floor(Math.random() * GENERAL_TIPS.length);
  let lastContextAt = 0;
  let scan: Scan | undefined;
  const bar = $('#tipbar');
  const body = $('#tip-text');
  const act = $('#tip-action') as HTMLButtonElement;
  const label = $('#tip-label');
  let currentAction: (() => void) | undefined;

  function render(tip: Tip, contextual: boolean) {
    bar.classList.toggle('contextual', contextual);
    label.textContent = contextual ? 'Heads up' : tip.topic ?? 'Tip';
    body.textContent = '';
    // `code` spans
    tip.text.split(/(`[^`]+`)/).forEach((part) => {
      if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
        const c = document.createElement('code');
        c.textContent = part.slice(1, -1);
        body.append(c);
      } else body.append(document.createTextNode(part));
    });
    if (tip.action) {
      act.hidden = false;
      act.textContent = tip.action.label;
      currentAction = actions[tip.action.run];
    } else {
      act.hidden = true;
      currentAction = undefined;
    }
    bar.hidden = !on;
  }
  const showGeneral = (step = 1) => {
    general = (general + step + GENERAL_TIPS.length) % GENERAL_TIPS.length;
    render(GENERAL_TIPS[general], false);
  };

  function check() {
    if (!on) return;
    const text: string = editor.getValue();
    const s = scanHandler(text);
    if (s) scan = s;
    const cur = editor.getCursor();
    const ctx: TipContext = { text, lineText: editor.getLine(cur.line) ?? '', inCallback: scan ? inCallback(scan, editor.indexFromPos(cur)) : false };
    // At most one heads-up every 20 s, each only once.
    if (Date.now() - lastContextAt < 20000) return;
    const tip = CONTEXT_TIPS.find((t) => !seen.has(t.id) && t.when!(ctx));
    if (!tip) return;
    seen.add(tip.id);
    set(SEEN_KEY, JSON.stringify([...seen]));
    lastContextAt = Date.now();
    render(tip, true);
  }
  let timer: number | undefined;
  const later = () => {
    clearTimeout(timer);
    timer = window.setTimeout(check, 900);
  };
  editor.on('cursorActivity', later);
  editor.on('change', later);

  $('#tip-next').addEventListener('click', () => showGeneral(1));
  $('#tip-prev').addEventListener('click', () => showGeneral(-1));
  $('#tip-off').addEventListener('click', () => setOn(false));
  $('#tip-off-2').addEventListener('click', () => setOn(false));
  // Phones: the tip is one line; tapping it shows all of it with back, next and Turn off.
  const phone = () => window.matchMedia('(max-width: 860px)').matches;
  body.parentElement!.addEventListener('click', () => {
    if (phone()) bar.classList.toggle('open');
  });
  act.addEventListener('click', () => currentAction?.());
  const toggles = [...document.querySelectorAll<HTMLButtonElement>('[data-tips-toggle]')];
  toggles.forEach((t) => t.addEventListener('click', () => setOn(!on)));

  function setOn(v: boolean) {
    if (!v && on) toast?.('Tips are off. Turn them back on in Settings.');
    on = v;
    set(ON_KEY, v ? '1' : '0');
    bar.hidden = !v;
    toggles.forEach((t) => {
      t.textContent = v ? 'Tips: on' : 'Tips: off';
      t.setAttribute('aria-pressed', String(v));
    });
    if (v) {
      showGeneral(1);
      later();
    }
  }
  setOn(on);
  return {
    toggle: () => setOn(!on),
    set: (v: boolean) => setOn(v),
    isOn: () => on,
    /** Show the heads-up tips again (they are shown once each). */
    reset: () => {
      seen.clear();
      set(SEEN_KEY, '[]');
      lastContextAt = 0;
      later();
    },
  };
}
