// The first visit: Nucli asks two things (issue #5) — how much guidance you want and which layout — and sets the
// matching settings (Advanced mode, Layout). Both can be changed later in Settings; Getting started shows it again.
import { mascot } from './mascots';

const KEY = 'nucleus-workbench-firstrun';
export type Experience = 'guided' | 'developer';
export interface FirstRunDeps {
  mode: () => 'simple' | 'dev';
  setMode: (m: 'simple' | 'dev') => void;
  layout: () => 'bar' | 'rail';
  setLayout: (l: 'bar' | 'rail') => void;
  /** After the choice (or skip): what to show next. */
  done: (exp: Experience | null) => void;
}
export const firstRunDone = () => { try { return localStorage.getItem(KEY) !== null; } catch { return true; } };

export function initFirstRun(dlg: HTMLDialogElement, d: FirstRunDeps) {
  const mark = (v: string) => { try { localStorage.setItem(KEY, v); } catch { /* not kept */ } };
  const render = () => {
    const dev = d.mode() === 'dev', rail = d.layout() === 'rail';
    dlg.innerHTML = `<form method="dialog" class="fr">
  <div class="fr-head">${mascot('n-idle', { size: 76, zoom: 1.15 })}<div><h2 id="fr-h">Hi, I'm Nucli.</h2><p>Two quick choices so the workbench fits you. You can change both later in Settings.</p></div></div>
  <fieldset class="fr-q"><legend>How much help do you want?</legend>
    <div class="fr-opts">
      <label class="fr-opt"><input type="radio" name="fr-exp" value="guided" ${dev ? '' : 'checked'}><span><strong>Guide me</strong><small>New to handlers or to code. Plain words, one step at a time, and tips as you go.</small></span></label>
      <label class="fr-opt"><input type="radio" name="fr-exp" value="developer" ${dev ? 'checked' : ''}><span><strong>I write code</strong><small>Rule ids, exact positions, severity filters, recorded calls and engine probes (Advanced mode).</small></span></label>
    </div></fieldset>
  <fieldset class="fr-q"><legend>Where do you want the tools?</legend>
    <div class="fr-opts">
      <label class="fr-opt"><input type="radio" name="fr-lay" value="bar" ${rail ? '' : 'checked'}><span class="fr-pic fr-bar" aria-hidden="true"><i></i><b></b><b></b></span><span><strong>A slim bar on top</strong><small>Open handlers, Save and the menu in one row</small></span></label>
      <label class="fr-opt"><input type="radio" name="fr-lay" value="rail" ${rail ? 'checked' : ''}><span class="fr-pic fr-rail" aria-hidden="true"><i></i><b></b><b></b></span><span><strong>A rail on the side</strong><small>Like VS Code, with more room for code</small></span></label>
    </div></fieldset>
  <div class="actions"><button class="btn" type="button" data-fr="skip">Skip</button><button class="btn primary" type="submit" value="go">Let's go</button></div>
</form>`;
    // Picking a layout shows it straight away, behind the dialog.
    dlg.querySelectorAll<HTMLInputElement>('input[name=fr-lay]').forEach((r) => r.addEventListener('change', () => r.checked && d.setLayout(r.value as 'bar' | 'rail')));
    dlg.querySelector('[data-fr=skip]')!.addEventListener('click', () => { mark('skipped'); dlg.close('skip'); });
  };
  dlg.setAttribute('aria-labelledby', 'fr-h');
  dlg.addEventListener('close', () => {
    if (dlg.returnValue !== 'go') { if (!firstRunDone()) mark('skipped'); return void d.done(null); }
    const exp = (dlg.querySelector<HTMLInputElement>('input[name=fr-exp]:checked')?.value ?? 'guided') as Experience;
    const lay = (dlg.querySelector<HTMLInputElement>('input[name=fr-lay]:checked')?.value ?? 'bar') as 'bar' | 'rail';
    d.setMode(exp === 'developer' ? 'dev' : 'simple');
    d.setLayout(lay);
    mark(exp);
    d.done(exp);
  });
  const open = () => { render(); dlg.returnValue = ''; if (!dlg.open) dlg.showModal(); dlg.querySelector<HTMLInputElement>('input:checked')?.focus(); };
  document.addEventListener('open-firstrun', open);
  return { open };
}
