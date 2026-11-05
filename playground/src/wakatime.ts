// Optional WakaTime (or a self-hosted Wakapi): the time spent writing handlers shows up in your
// WakaTime dashboard, like it does from VS Code. Off until you add your API key in Settings.
// Sent: the handler's name, the game's name and the time; never the code. The key stays in this browser.
const KEY = 'nucleus-workbench-wakatime';
const DEFAULT_URL = 'https://api.wakatime.com/api/v1';
const EVERY_S = 120; // WakaTime's own plugins send at most one heartbeat per file every 2 minutes

interface Config {
  on: boolean;
  key: string;
  url: string;
}
const load = (): Config => {
  try {
    return { on: false, key: '', url: '', ...JSON.parse(localStorage.getItem(KEY) || '{}') };
  } catch {
    return { on: false, key: '', url: '' };
  }
};

interface Deps {
  editor: any;
  /** The handler's file name, e.g. "Buggy Game.js". */
  fileName: () => string;
  /** The game's name (Game.GameName), the WakaTime "project". */
  project: () => string;
  version: string;
}

export function initWakaTime({ editor, fileName, project, version }: Deps) {
  let cfg = load();
  let last = { entity: '', at: 0 };
  let status = '';
  const save = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(cfg));
    } catch {}
  };
  const base = () => (cfg.url.trim() || DEFAULT_URL).replace(/\/+$/, '');
  const send = async (write: boolean, force = false): Promise<string> => {
    if (!cfg.on || !cfg.key.trim()) return 'Off';
    const at = Date.now() / 1000;
    const entity = fileName();
    if (!force && !write && entity === last.entity && at - last.at < EVERY_S) return status;
    last = { entity, at };
    try {
      const r = await fetch(`${base()}/users/current/heartbeats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Basic ${btoa(cfg.key.trim())}` },
        body: JSON.stringify({ entity, type: 'file', category: 'coding', time: at, project: project(), language: 'JavaScript', is_write: write, plugin: `nucleus-workbench/${version}` }),
      });
      status = r.ok ? `Sent ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : r.status === 401 ? 'The API key was not accepted' : `WakaTime answered ${r.status}`;
    } catch {
      status = "Couldn't reach WakaTime (offline, or the server doesn't allow this page)";
    }
    return status;
  };
  editor.on('changes', () => void send(false));
  return {
    /** A save (download) counts as a write. */
    saved: () => void send(true),
    get: () => ({ ...cfg }),
    set(next: Partial<Config>) {
      cfg = { ...cfg, ...next };
      save();
      last = { entity: '', at: 0 };
    },
    /** Sends one heartbeat now and says how it went. */
    test: () => send(false, true),
    status: () => status,
  };
}
