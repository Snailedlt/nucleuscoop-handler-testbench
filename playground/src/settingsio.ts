// Settings › Backup: export the workbench's settings to a JSON file and import them on another browser or computer.
// Only settings (an allowlist): never handlers, drafts, tabs or files, and never the WakaTime API key.
const SETTINGS = [
  'a11y', 'advanced', 'check-density', 'code-theme', 'custom-theme', 'themes', 'theme-on', 'dev-site', 'dev-mode',
  'editor', 'feedback-off', 'kb', 'keys', 'credit-off', 'layout', 'lines', 'lines-prefs', 'mascots', 'motion', 'panels', 'rail-open',
  'save-format', 'tips', 'view', 'sim', 'tab', 'tester-profile',
].map((k) => `nucleus-workbench-${k}`);
const FORMAT = 'nucleus-workbench-settings';

export function exportSettings(): string {
  const values: Record<string, string> = {};
  for (const k of SETTINGS) {
    try { const v = localStorage.getItem(k); if (v !== null) values[k.slice('nucleus-workbench-'.length)] = v; } catch { /* storage off */ }
  }
  return JSON.stringify({ format: FORMAT, version: 1, exported: new Date().toISOString().slice(0, 10), settings: values }, null, 2);
}

/** Applies a settings file. Returns how many settings it set, or throws with a message for the person. */
export function importSettings(text: string): number {
  let data: any;
  try { data = JSON.parse(text); } catch { throw new Error("This isn't a settings file (it isn't JSON)."); }
  if (data?.format !== FORMAT || typeof data.settings !== 'object' || !data.settings) throw new Error("This isn't a workbench settings file.");
  let n = 0;
  for (const [k, v] of Object.entries(data.settings)) {
    const key = `nucleus-workbench-${k}`;
    // Only known settings, as text, and not huge (a custom theme is the biggest, a few KB).
    if (!SETTINGS.includes(key) || typeof v !== 'string' || v.length > 200_000) continue;
    try { localStorage.setItem(key, v); n++; } catch { throw new Error("This browser didn't let the page store settings."); }
  }
  return n;
}
