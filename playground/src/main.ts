// Entry point of the one bundle: the page, or (inside the Web Worker it starts) the linter.
// Sharing a bundle means the linter and the API model are downloaded once.
declare const require: (id: string) => unknown;
if (typeof document === 'undefined') {
  require('./worker');
} else {
  const s = document.currentScript as HTMLScriptElement | null;
  (globalThis as any).__WORKER_URL = s?.src || URL.createObjectURL(new Blob([s?.textContent ?? ''], { type: 'text/javascript' }));
  require('./app');
}
