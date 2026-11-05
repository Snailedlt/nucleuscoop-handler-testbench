// Screenshots in light and dark: <picture><source data-dark media="(prefers-color-scheme: dark)">.
// Without JS the browser follows the system theme; this follows the workbench's own choice
// (Settings → Theme, data-theme on <html>) too. start.html has the same few lines inline.
const root = document.documentElement;
const SYSTEM = '(prefers-color-scheme: dark)';

export function syncPictures(scope: ParentNode = document) {
  const t = root.dataset.theme;
  const media = t === 'dark' ? 'all' : t === 'light' ? 'not all' : SYSTEM;
  scope.querySelectorAll<HTMLSourceElement>('source[data-dark]').forEach((s) => {
    if (s.media !== media) s.media = media;
  });
}

export function watchPictures() {
  syncPictures();
  new MutationObserver(() => syncPictures()).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
}

/** A themed screenshot: the light file, plus the dark one when there is one. */
export function picture(src: string, dark: string | undefined, alt: string, attrs = '') {
  const img = `<img src="${src}" alt="${alt}"${attrs}>`;
  return dark ? `<picture><source data-dark media="${SYSTEM}" srcset="${dark}">${img}</picture>` : img;
}
