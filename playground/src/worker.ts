// Runs the linter and the "how many can Fix all fix" count off the main thread,
// so typing stays smooth on slow devices and in long handlers.
import { lint } from '@core/lint';
import { fixAll } from '@core/fix';

self.onmessage = (e: MessageEvent<{ id: number; text: string; plugins?: string[]; published?: { version?: number; guid?: string } }>) => {
  const { id, text, plugins, published } = e.data;
  const diagnostics = lint(text, { plugins, published });
  let fixable = 0;
  try {
    fixable = fixAll(text, { plugins, published }).applied.length;
  } catch {
    fixable = 0;
  }
  (self as any).postMessage({ id, diagnostics, fixable });
};
