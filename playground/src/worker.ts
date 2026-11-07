// Runs the linter and the "how many can Fix all fix" count off the main thread,
// so typing stays smooth on slow devices and in long handlers. The debugger (debugui.ts) starts a
// worker of its own from the same bundle to record a run ({ kind: 'trace' }).
import { lint } from '@core/lint';
import { fixAll } from '@core/fix';
import { traceHandler, packTrace } from '@core/debug';

self.onmessage = (e: MessageEvent<any>) => {
  if (e.data?.kind === 'trace') {
    const { id, src, opts } = e.data;
    try {
      // Packed: steps share their (pooled) views, so the message stays small.
      (self as any).postMessage({ id, packed: packTrace(traceHandler(src, opts)) });
    } catch (err: any) {
      (self as any).postMessage({ id, error: String(err?.message ?? err) });
    }
    return;
  }
  const { id, text, plugins, published } = e.data as { id: number; text: string; plugins?: string[]; published?: { version?: number; guid?: string } };
  const diagnostics = lint(text, { plugins, published });
  let fixable = 0;
  try {
    fixable = fixAll(text, { plugins, published }).applied.length;
  } catch {
    fixable = 0;
  }
  (self as any).postMessage({ id, diagnostics, fixable });
};
