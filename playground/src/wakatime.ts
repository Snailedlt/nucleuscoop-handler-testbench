// Optional WakaTime (or a self-hosted Wakapi): the time spent writing handlers shows up in your
// WakaTime dashboard, like it does from VS Code. Off until you add your API key in Settings.
// Sent: the handler's file name, the game's name, the time, what you're doing (writing, testing,
// reading docs), line numbers and how many lines you changed; never the code. The key stays here.
//
// Field names follow wakatime-cli's heartbeat (github.com/wakatime/wakatime-cli, pkg/heartbeat).
// The editor and operating system come from `user_agent`, in wakatime-cli's format
// "wakatime/<cli> (<os>-<version>-<arch>) <runtime> <editor>/<version> <plugin>/<version>",
// because a web page can't set its own User-Agent header. The computer's name goes in the
// X-Machine-Name header; a page can't read it, so it's a setting (default: browser on OS).
const KEY = 'nucleus-workbench-wakatime';
const DEFAULT_URL = 'https://api.wakatime.com/api/v1';
const EVERY_S = 120; // WakaTime's own plugins send at most one heartbeat per file every 2 minutes

export type WakaCategory = 'coding' | 'running tests' | 'researching';

interface Config {
  on: boolean;
  key: string;
  url: string;
  /** X-Machine-Name; empty: the browser and OS, e.g. "Chrome on Windows". */
  machine: string;
}
const load = (): Config => {
  const d: Config = { on: false, key: '', url: '', machine: '' };
  try {
    return { ...d, ...JSON.parse(localStorage.getItem(KEY) || '{}') };
  } catch {
    return d;
  }
};

/** The operating system and browser, as far as the browser says. */
export function platform(nav: Navigator = navigator): { os: string; osLabel: string; arch: string; browser: string } {
  const ua = nav.userAgent;
  const hint = ((nav as any).userAgentData?.platform as string | undefined) ?? '';
  const pick = (s: string) =>
    /android/i.test(s) ? ['android', 'Android'] : /iphone|ipad|ipod|ios/i.test(s) ? ['ios', 'iOS'] : /win/i.test(s) ? ['windows', 'Windows'] : /mac/i.test(s) ? ['darwin', 'macOS'] : /cros/i.test(s) ? ['linux', 'ChromeOS'] : /linux|x11/i.test(s) ? ['linux', 'Linux'] : ['unknown', 'an unknown system'];
  const [os, osLabel] = pick(hint || ua);
  const arch = /arm|aarch64/i.test(ua) ? 'arm64' : /x86_64|x64|win64|wow64|amd64/i.test(ua) || os === 'darwin' ? 'amd64' : 'unknown';
  const browser = /edg\//i.test(ua) ? 'Edge' : /opr\//i.test(ua) ? 'Opera' : /firefox\//i.test(ua) ? 'Firefox' : /chrome\//i.test(ua) ? 'Chrome' : /safari\//i.test(ua) ? 'Safari' : 'a browser';
  return { os, osLabel, arch, browser };
}

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
  let last = { key: '', at: 0 };
  let status = '';
  const humanLines = new Set<number>(); // lines the person changed since the last heartbeat (each once)
  let machineHeaderBlocked = false; // the server refused X-Machine-Name: keep tracking without it
  const plat = platform();
  const save = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(cfg));
    } catch {}
  };
  const base = () => (cfg.url.trim() || DEFAULT_URL).replace(/\/+$/, '');
  const machine = () => cfg.machine.trim() || `${plat.browser} on ${plat.osLabel}`;
  // wakatime-cli's format; the editor is the workbench, the plugin its WakaTime support.
  const userAgent = `wakatime/unset (${plat.os}-unknown-${plat.arch}) browser nucleusworkbench/${version} nucleusworkbench-wakatime/${version}`;

  // Every edit made in the workbench is the person's (typing, pasting, inserting from Lines,
  // one-click fixes); loading a handler or an example isn't an edit.
  editor.on('change', (_cm: any, c: any) => {
    if (c.origin === 'setValue') return;
    const n = Math.max(c.removed?.length ?? 1, c.text?.length ?? 1);
    for (let l = c.from.line; l < c.from.line + n; l++) humanLines.add(l);
  });

  const send = async (category: WakaCategory, write: boolean, force = false): Promise<string> => {
    if (!cfg.on || !cfg.key.trim()) return 'Off';
    const at = Date.now() / 1000;
    const entity = fileName();
    const k = `${entity}|${category}`;
    if (!force && !write && k === last.key && at - last.at < EVERY_S) return status;
    last = { key: k, at };
    const cur = editor.getCursor();
    const body = {
      entity,
      type: 'file',
      category,
      time: at,
      project: project(),
      language: 'JavaScript',
      is_write: write,
      lines: editor.lineCount(),
      lineno: cur.line + 1,
      cursorpos: cur.ch + 1, // the column, from 1 (wakatime.com/developers)
      human_line_changes: humanLines.size,
      user_agent: userAgent,
    };
    const post = (withMachine: boolean) =>
      // The bulk endpoint, like wakatime-cli: it reads each heartbeat's user_agent (the single one
      // detects the editor and OS from the User-Agent header, which a page can't set).
      fetch(`${base()}/users/current/heartbeats.bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Basic ${btoa(cfg.key.trim())}`, ...(withMachine ? { 'X-Machine-Name': machine() } : {}) },
        body: JSON.stringify([body]),
      });
    try {
      let r: Response;
      try {
        r = await post(!machineHeaderBlocked);
      } catch (e) {
        if (machineHeaderBlocked) throw e;
        // A CORS refusal looks like a network error: try once without the computer's name.
        r = await post(false);
        machineHeaderBlocked = true;
      }
      if (r.ok) humanLines.clear();
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      status = r.ok ? `Sent ${time}${machineHeaderBlocked ? " (this server doesn't accept the computer's name)" : ''}` : r.status === 401 ? 'The API key was not accepted' : `WakaTime answered ${r.status}`;
    } catch {
      status = "Couldn't reach WakaTime (offline, or the server doesn't allow this page)";
    }
    return status;
  };
  editor.on('changes', () => void send('coding', false));
  return {
    /** A save (download) counts as a write. */
    saved: () => void send('coding', true),
    /** Try it / Test all combinations ("running tests"), the Reference or the docs in Lines ("researching"). */
    activity: (category: WakaCategory) => void send(category, false),
    get: () => ({ ...cfg }),
    /** What the computer is called in WakaTime when the setting is empty. */
    defaultMachine: () => `${plat.browser} on ${plat.osLabel}`,
    set(next: Partial<Config>) {
      cfg = { ...cfg, ...next };
      save();
      last = { key: '', at: 0 };
      machineHeaderBlocked = false;
    },
    /** Sends one heartbeat now and says how it went. */
    test: () => send('coding', false, true),
    status: () => status,
  };
}
