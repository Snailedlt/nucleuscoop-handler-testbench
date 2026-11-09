// Loads a workbench module (playground/src/*.ts) in Node for a test: bundled with esbuild the way build.mjs does it,
// with `@core` pointing at splitscreenme-vscode's src/core (CORE_DIR, ./core as in pages.yml, or
// ../splitscreenme-vscode) and CodeMirror stubbed out. Browser globals a module reads (localStorage, CSS) are the
// test's to set before loading.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

export const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const esbuild = createRequire(path.join(root, 'playground/package.json'))('esbuild');

export const coreDir = [process.env.CORE_DIR, process.env.SPLITSCREENME_VSCODE, path.join(root, 'core'), path.join(root, '../splitscreenme-vscode')]
  .filter(Boolean)
  .map((d) => path.resolve(d))
  .find((d) => fs.existsSync(path.join(d, 'src/core/lint.ts')));

const stub = {
  name: 'stubs',
  setup(b) {
    b.onResolve({ filter: /^codemirror(\/.*)?$/ }, () => ({ path: 'codemirror', namespace: 'stub' }));
    b.onLoad({ filter: /.*/, namespace: 'stub' }, () => ({ contents: 'export default { normalizeKeyMap: (m) => m, fold: { combine: () => () => {}, brace: {}, comment: {} }, commands: {}, keyMap: {}, Pos: (l, c) => ({ line: l, ch: c }) };', loader: 'js' }));
  },
};

/** The module's exports. `file`: relative to the repository root, or absolute. */
export async function load(file) {
  if (!coreDir) throw new Error('splitscreenme-vscode not found: set CORE_DIR');
  const r = await esbuild.build({
    entryPoints: [path.isAbsolute(file) ? file : path.join(root, file)],
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: false,
    logLevel: 'error',
    alias: { '@core': path.join(coreDir, 'src', 'core') },
    nodePaths: [path.join(coreDir, 'node_modules'), path.join(root, 'playground', 'node_modules')],
    plugins: [stub],
    banner: { js: `import { createRequire as __cr } from 'node:module'; const require = __cr(${JSON.stringify(path.join(coreDir, 'package.json'))});` },
  });
  return import('data:text/javascript;base64,' + Buffer.from(r.outputFiles[0].text).toString('base64'));
}

/** A localStorage for modules that keep settings. */
export function memoryStorage() {
  const m = new Map();
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k), clear: () => m.clear(), key: (i) => [...m.keys()][i] ?? null, get length() { return m.size; } };
}
