// Text fields in Form and Blocks that grow with their value (issue #15): a one-row text area that looks like a one-line
// field for short values and wraps up to a few lines for long ones (CSS `field-sizing: content`, a small JS fallback
// where that isn't supported). Enter keeps its one-line meaning (no new line); Shift+Enter adds one where the value
// allows it. Long values get an expand button (also Alt+Enter): a larger editor under the field, or a dialog on
// phones, with the option's docs beside it. Esc closes it and focus goes back to the field.
const NATIVE = typeof CSS !== 'undefined' && CSS.supports?.('field-sizing', 'content');
const LONG = 40;
let seq = 0;

export interface GrowOptions {
  /** What the field is, for the expand button and the larger editor ("Game.Description"). */
  label: string;
  /** Shift+Enter adds a line (text values can hold one). */
  multiline?: boolean;
  /** The docs shown beside the larger editor (HTML), fetched when it opens. */
  doc?: () => string;
}

/** Grows a text area to its content where `field-sizing` isn't supported (call after setting `value` from code). */
export function fit(ta: HTMLTextAreaElement) {
  ta.closest('.xf')?.classList.toggle('xf-long', ta.value.length > LONG || ta.value.includes('\n'));
  if (NATIVE || !ta.isConnected) return;
  ta.style.height = 'auto';
  const cs = getComputedStyle(ta);
  const max = parseFloat(cs.lineHeight || '18') * 5 + parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom) + 2;
  ta.style.height = `${Math.min(ta.scrollHeight + 2, max || 9999)}px`;
}

/** Wraps `ta` (a one-row text area the host made and listens to) with its expand button. Returns the wrapper. */
export function growField(ta: HTMLTextAreaElement, o: GrowOptions): HTMLElement {
  const wrap = document.createElement('span');
  wrap.className = 'xf';
  ta.rows = 1;
  ta.classList.add('xf-ta');
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'xf-btn';
  btn.setAttribute('aria-label', `Expand ${o.label}`);
  btn.setAttribute('aria-expanded', 'false');
  btn.title = 'Expand (Alt+Enter)';
  btn.innerHTML = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M9.5 2.5h4v4M13.5 2.5 9 7M6.5 13.5h-4v-4M2.5 13.5 7 9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  wrap.append(ta, btn);
  (wrap as any).xfOpts = o;

  let panel: HTMLElement | undefined;
  const close = (focusBack: boolean) => {
    if (!panel) return;
    const p = panel;
    panel = undefined;
    if (p instanceof HTMLDialogElement) p.close();
    p.remove();
    btn.setAttribute('aria-expanded', 'false');
    btn.removeAttribute('aria-controls');
    if (focusBack) ta.focus();
  };
  const open = () => {
    if (panel) return close(true);
    const id = `xf${++seq}`;
    const phone = matchMedia('(max-width: 600px)').matches;
    const p = document.createElement(phone ? 'dialog' : 'div');
    p.className = `xf-panel${phone ? ' xf-dialog' : ''}`;
    p.id = id;
    p.setAttribute('role', phone ? 'dialog' : 'group');
    p.setAttribute('aria-label', `${(wrap as any).xfOpts.label}, expanded`);
    const opts: GrowOptions = (wrap as any).xfOpts;
    const head = document.createElement('div');
    head.className = 'xf-head';
    const title = document.createElement('label');
    title.className = 'xf-title';
    title.htmlFor = `${id}-ta`;
    title.textContent = opts.label;
    const done = document.createElement('button');
    done.type = 'button';
    done.className = 'btn xf-done';
    done.textContent = 'Done';
    head.append(title, done);
    const big = document.createElement('textarea');
    big.className = 'xf-big';
    big.id = `${id}-ta`;
    big.spellcheck = ta.spellcheck;
    big.rows = 6;
    big.value = ta.value;
    const hint = document.createElement('p');
    hint.className = 'xf-keys';
    hint.textContent = opts.multiline ? 'Shift+Enter adds a line. Enter or Esc closes it.' : 'Enter or Esc closes it.';
    big.setAttribute('aria-describedby', `${id}-keys`);
    hint.id = `${id}-keys`;
    p.append(head, big, hint);
    const doc = opts.doc?.();
    if (doc) {
      const d = document.createElement('div');
      d.className = 'xf-doc';
      d.tabIndex = 0; // it scrolls: reachable by keyboard
      d.setAttribute('role', 'region');
      d.setAttribute('aria-label', `Docs for ${opts.label}`);
      d.innerHTML = doc;
      p.append(d);
    }
    big.addEventListener('input', () => {
      ta.value = opts.multiline ? big.value : big.value.replace(/\r?\n/g, ' ');
      ta.dispatchEvent(new Event('input', { bubbles: true }));
      fit(ta);
    });
    p.addEventListener('keydown', (ev) => {
      const e = ev as KeyboardEvent;
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        close(true);
      } else if (e.key === 'Enter' && e.target === big && !(e.shiftKey && opts.multiline)) {
        e.preventDefault();
        close(true);
      }
    });
    done.addEventListener('click', () => close(true));
    panel = p;
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-controls', id);
    if (p instanceof HTMLDialogElement) {
      document.body.append(p);
      p.addEventListener('cancel', (e) => { e.preventDefault(); close(true); });
      p.addEventListener('click', (e) => { if (e.target === p) close(true); });
      p.showModal();
    } else {
      // Under the field's row, full width.
      const anchor = wrap.closest('.fv-line, .bv-line, .fv-item') ?? wrap;
      anchor.after(p);
    }
    big.focus();
    big.setSelectionRange(ta.selectionStart ?? big.value.length, ta.selectionEnd ?? big.value.length);
  };
  btn.addEventListener('click', open);
  ta.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' || e.isComposing) return;
    if (e.altKey) {
      e.preventDefault();
      open();
    } else if (!(e.shiftKey && o.multiline)) e.preventDefault(); // Enter: done, as in a one-line field
  });
  ta.addEventListener('input', () => {
    if (!o.multiline && ta.value.includes('\n')) ta.value = ta.value.replace(/\r?\n/g, ' ');
    fit(ta);
  });
  if (!NATIVE) requestAnimationFrame(() => fit(ta));
  else fit(ta);
  return wrap;
}

/** Changes what an expandable field's docs say (Blocks fills them in after building the row). */
export function setGrowDoc(wrap: Element | null, doc: () => string) {
  const o = (wrap as any)?.xfOpts as GrowOptions | undefined;
  if (o) o.doc = doc;
}
