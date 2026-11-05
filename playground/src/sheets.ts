// On phones, dialogs are sheets with a handle at the top: drag one down to close it. A drag from
// the handle always moves the sheet; from the content, only once the content is scrolled to the
// top (otherwise it scrolls). Let go past a quarter of the sheet (at least 80 px), or flick, to close;
// anything less snaps back.
export function initSheetDrag() {
  const phone = () => window.matchMedia('(max-width: 600px)').matches;
  document.querySelectorAll<HTMLDialogElement>('dialog').forEach((dl) => {
    if (dl.id === 'open-dialog') return; // full screen, no handle
    let y0 = 0;
    let t0 = 0;
    let dy = 0;
    let fromHandle = false;
    let dragging = false;
    let tracking = false;
    const reset = () => {
      dl.style.transition = '';
      dl.style.transform = '';
    };
    dl.addEventListener('close', reset);
    dl.addEventListener(
      'touchstart',
      (e) => {
        if (!phone() || e.touches.length !== 1) return (tracking = false);
        const t = e.touches[0];
        const top = dl.getBoundingClientRect().top;
        fromHandle = t.clientY - top < 40;
        if (!fromHandle && (e.target as HTMLElement).closest('input, select, textarea')) return (tracking = false);
        tracking = true;
        dragging = false;
        y0 = t.clientY;
        t0 = Date.now();
        dy = 0;
      },
      { passive: true },
    );
    dl.addEventListener(
      'touchmove',
      (e) => {
        if (!tracking) return;
        dy = e.touches[0].clientY - y0;
        if (!dragging) {
          if (dy > 6 && (fromHandle || dl.scrollTop <= 0)) dragging = true;
          else if (Math.abs(dy) > 6) return (tracking = false); // a scroll
          else return;
        }
        e.preventDefault();
        dl.style.transition = 'none';
        dl.style.transform = `translateY(${Math.max(0, dy)}px)`;
      },
      { passive: false },
    );
    const end = () => {
      if (!tracking || !dragging) return (tracking = false);
      tracking = dragging = false;
      const h = dl.getBoundingClientRect().height;
      const fast = dy / Math.max(1, Date.now() - t0) > 0.6;
      dl.style.transition = 'transform .18s ease-out';
      if (dy > Math.max(80, h / 4) || (fast && dy > 30)) {
        dl.style.transform = `translateY(${h + 20}px)`;
        setTimeout(() => dl.close(), 170);
      } else dl.style.transform = '';
    };
    dl.addEventListener('touchend', end);
    dl.addEventListener('touchcancel', end);
    // A drag ends with a click on whatever was under the finger: drop it.
    dl.addEventListener('click', (e) => dl.style.transform && e.target !== dl && (e.preventDefault(), e.stopPropagation()), true);
  });
}
