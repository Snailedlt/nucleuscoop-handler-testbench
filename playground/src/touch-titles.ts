// Touch screens never show `title` tooltips. Holding an element that has one shows its text in a
// small bubble instead, and the click that would follow the hold is dropped, so holding a button
// to read what it does doesn't also press it.
export function initTouchTitles() {
  const bubble = document.createElement('div');
  bubble.id = 'touch-title';
  bubble.setAttribute('role', 'tooltip');
  bubble.hidden = true;
  document.body.append(bubble);
  let timer: number | undefined;
  let start: { x: number; y: number } | undefined;
  let shownAt = 0;
  const hide = () => (bubble.hidden = true);
  document.addEventListener('pointerdown', (e) => {
    hide();
    if (e.pointerType !== 'touch') return;
    const el = (e.target as HTMLElement).closest<HTMLElement>('[title]');
    if (!el || !el.title.trim() || el.closest('.CodeMirror')) return;
    start = { x: e.clientX, y: e.clientY };
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      bubble.textContent = el.title;
      bubble.hidden = false;
      const r = el.getBoundingClientRect();
      const w = bubble.offsetWidth;
      const h = bubble.offsetHeight;
      bubble.style.left = `${Math.max(8, Math.min(r.left + r.width / 2 - w / 2, innerWidth - w - 8))}px`;
      bubble.style.top = `${r.top - h - 8 > 8 ? r.top - h - 8 : r.bottom + 8}px`;
      shownAt = Date.now();
      navigator.vibrate?.(10);
    }, 500);
  }, true);
  document.addEventListener('pointermove', (e) => {
    if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > 10) (clearTimeout(timer), (start = undefined));
  }, true);
  const up = () => {
    clearTimeout(timer);
    start = undefined;
    if (!bubble.hidden) setTimeout(hide, 2500);
  };
  document.addEventListener('pointerup', up, true);
  document.addEventListener('pointercancel', up, true);
  document.addEventListener('click', (e) => {
    if (Date.now() - shownAt < 600) (e.preventDefault(), e.stopPropagation(), (shownAt = 0));
  }, true);
  document.addEventListener('contextmenu', (e) => {
    if (!bubble.hidden) e.preventDefault();
  }, true);
  addEventListener('scroll', hide, true);
}
