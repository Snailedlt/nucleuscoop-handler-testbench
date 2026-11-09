// Try it: runs the handler for each player (core/sim.ts) and shows what each one gets: window, start arguments,
// files changed, recorded calls. Test all: every player count, input setup and monitor size.
import { simulate, sessionSummary, groupIgnored } from '@core/sim';
import { MATRIX_RESOLUTIONS, planMatrix, failureOf, jobOptions } from '@core/matrix';
import { $, esc } from './dom';
import { mascot } from './mascots';
import { hlCode } from './codehl';
import { installMap } from './pkgcheck';
import { fileIcon } from './packageui';
import type { PackageFile } from './package';

export interface TryItDeps {
  editor: any;
  /** Plugin DLLs' globals (Game.PluginsInfo), for the simulation. */
  plugins: () => Record<string, string[]> | undefined;
  packageFiles: () => PackageFile[];
  /** Guided mode: no recorded calls. */
  simple: () => boolean;
  selectTab: (id: string) => void;
  used: (what: string) => void;
  /** Try it ran, shown: the credit lines can say this version was simulated. */
  tried: (t: { players: number; loaded: boolean }) => void;
}

export interface SimOptions { players: number; width: number; height: number; keyboardPlayer: number; plugins: Record<string, string[]> | undefined }

export function initTryIt(deps: TryItDeps): { run: () => void; options: () => SimOptions; testAll: () => void } {
  const { editor } = deps;
  // Players to try: 1 up to the handler's Game.MaxPlayers (at least 4, at most Nucleus' 32).
  function syncPlayerChoices() {
    const sel = $('#sim-players') as HTMLSelectElement;
    const m = editor.getValue().match(/^\s*Game\.MaxPlayers\s*=\s*(\d+)/m);
    const max = Math.min(32, Math.max(4, m ? Number(m[1]) : 4, Number(sel.value) || 0));
    if (sel.options.length === max) return;
    const v = sel.value;
    sel.replaceChildren(...Array.from({ length: max }, (_, i) => new Option(String(i + 1), String(i + 1))));
    sel.value = Number(v) <= max ? v : String(max);
  }
  /** Try it's choices: players, monitor, keyboard (shared with the debugger). */
  function simOptions() {
    syncPlayerChoices();
    const players = Number(($('#sim-players') as HTMLSelectElement).value);
    const [width, height] = ($('#sim-res') as HTMLSelectElement).value.split('x').map(Number);
    const keyboardPlayer = Number(($('#sim-kb') as HTMLSelectElement).value);
    return { players, width, height, keyboardPlayer, plugins: deps.plugins() };
  }
  function runSim() {
    if (!$('#panel-simulate').hidden) deps.used('try-it');
    const o = simOptions();
    const kb = o.keyboardPlayer;
    const r = simulate(editor.getValue(), o);
    // Seen in Try it: the credit lines can say this version was simulated.
    if (!$('#panel-simulate').hidden) {
      deps.tried({ players: o.players, loaded: r.loaded && !r.loadError });
    }
    const out: string[] = [];
    const simple = deps.simple();
    // Test all needs a handler that loads: until then the banner below says what to fix.
    const all = $('#sim-all') as HTMLButtonElement;
    all.disabled = !r.loaded;
    all.title = r.loaded ? 'Every player count, input setup and monitor size' : 'Fix the problems first: the handler has to load before it can be tried';
    if (!r.loaded) {
      out.push(
        `<div class="banner error masc-banner">${mascot('n-bad', { size: 44 })}<div><strong>${esc(sessionSummary(r))}</strong> Fix the problems first.${r.loadError ? `<details class="small"><summary>Technical details</summary><div class="mono">${esc(r.loadError)}</div></details>` : ''}<div class="banner-actions">${($('#fix-all') as HTMLButtonElement).hidden ? '' : `<button class="btn primary" type="button" id="sim-fix">${esc(($('#fix-all') as HTMLButtonElement).textContent ?? 'Fix problems')}</button>`}<button class="btn" type="button" id="sim-check">Show the problems</button></div></div>`,
      );
    } else {
      // Nucli, pleased when every player starts; worried when the session ends.
      out.push(`<div class="banner ${r.sessionEnded ? 'error' : 'ok'} masc-banner">${mascot(r.sessionEnded ? 'n-bad' : 'n-ok', { size: 44 })}<div><strong>${esc(sessionSummary(r))}</strong></div></div>`);
      if (r.inputNote) out.push(`<p class="note">${esc(r.inputNote)}</p>`);
    }
    if (r.ignored.length) {
      const uniq = groupIgnored(r.ignored);
      out.push(`<h3>Settings Nucleus skips <span class="count">${uniq.length}</span></h3><ul class="mono-list warn">${uniq.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>`);
    }
    // A package: what a Hub install puts where (pkgcheck.ts installMap).
    const packageFiles = deps.packageFiles();
    if (packageFiles.length) {
      const map = installMap(editor.getValue(), packageFiles);
      out.push(`<details class="install"${simple ? '' : ' open'}><summary>What Nucleus installs <span class="count">${map.length}</span></summary><div class="install-map">${map.map((m) => `<span>${fileIcon(m.name)}${esc(m.name)}</span><span aria-hidden="true">${m.to ? '→' : '✕'}</span><span class="im-to${m.to ? '' : ' im-drop'}">${m.to ? esc(m.to) : 'dropped (top level)'}</span>`).join('')}</div></details>`);
    }
    for (const p of r.players) {
      const ownKb = p.index === kb || kb === -2; // -2: each player their own keyboard and mouse
      const role = ownKb ? 'keyboard & mouse' : 'controller';
      out.push(`<section class="player p${(p.index % 8) + 1}"><h3>Player ${p.index + 1} <span class="chip ${ownKb ? 'info' : ''}">${role}</span></h3>
        ${p.error ? `<div class="banner error">Setting up this player fails here, and Nucleus ends the session.<div class="mono small">${esc(p.error)}</div></div>` : ''}
        ${p.note ? `<p class="muted">${esc(p.note)}</p>` : ''}
        <dl><dt>Window</dt><dd>${esc(p.window)}</dd>
        <dt>Starts the game with</dt><dd class="mono">${p.startArguments ? esc(p.startArguments) : '<span class="muted">(nothing extra)</span>'}</dd></dl>
        ${p.effects.length ? `<dl><dt>Changes before the game starts</dt><dd><ul class="effects">${p.effects.map((e) => `<li>${esc(e)}</li>`).join('')}</ul></dd></dl>` : '<p class="muted">Changes no files before the game starts.</p>'}
        ${!simple ? (p.calls.length ? `<details ${r.players.length <= 2 ? 'open' : ''}><summary>${p.calls.length} recorded call${p.calls.length > 1 ? 's' : ''}</summary><ul class="mono-list hl cm-s-default">${p.calls.map((c) => `<li>${hlCode(c)}</li>`).join('')}</ul></details>` : '<p class="muted">No Context or System calls.</p>') : ''}
      </section>`);
    }
    for (const c of r.callbacks) {
      out.push(`<section class="player"><h3>${esc(c.name)}</h3>${c.error ? `<div class="banner error">${esc(c.note ?? '')}<div class="mono small">${esc(c.error)}</div></div>` : ''}
        ${simple ? '' : `<details><summary>${c.calls.length} recorded call${c.calls.length === 1 ? '' : 's'}</summary><ul class="mono-list hl cm-s-default">${c.calls.map((x) => `<li>${hlCode(x)}</li>`).join('')}</ul></details>`}</section>`);
    }
    if (r.options.length) {
      out.push(`<details><summary>${r.options.length} option${r.options.length > 1 ? 's' : ''} set (different from Nucleus' defaults)</summary><table class="opts"><tbody>${r.options.map((o) => `<tr><td class="mono">${esc(o.path)}</td><td class="mono"><code class="hl cm-s-default">${hlCode(o.value.length > 120 ? o.value.slice(0, 117) + '…' : o.value)}</code></td></tr>`).join('')}</tbody></table></details>`);
    }
    $('#sim-out').innerHTML = out.join('');
    $('#sim-out').querySelector('#sim-check')?.addEventListener('click', () => deps.selectTab('problems'));
    $('#sim-out').querySelector('#sim-fix')?.addEventListener('click', () => {
      deps.selectTab('problems');
      ($('#fix-all') as HTMLButtonElement).click();
    });
  }
  $('#sim-run').addEventListener('click', runSim);


  // Test all combinations: every player count (up to Game.MaxPlayers, at most 8), input setup and
  // monitor size, a few runs at a time so the page stays responsive; one cell per players × input.

  // The combinations and what counts as failing come from the core, shared with the VS Code panel.
  const MX_RES = MATRIX_RESOLUTIONS;
  let mxRun = 0;
  function testAll() {
    deps.used('test-all');
    document.dispatchEvent(new CustomEvent('wakatime-activity', { detail: 'running tests' }));
    const run = ++mxRun;
    const code = editor.getValue();
    const box = $('#sim-matrix');
    box.hidden = false;
    const first = simulate(code, { players: 1, width: 1920, height: 1080, keyboardPlayer: -1, plugins: deps.plugins() });
    if (!first.loaded) {
      box.innerHTML = `<div class="mx-head"><strong>Can't test combinations yet</strong><span class="muted">Nucleus can't load this handler. Fix the problems first.</span></div>`;
      return;
    }
    const { max, modes, jobs } = planMatrix(first)!;
    type Cell = { ok: number; fail: { res: string; why: string }[] };
    const cells = new Map<string, Cell>();
    let done = 0;
    const t0 = performance.now();
    const draw = (finished: boolean) => {
      const failed = [...cells.values()].reduce((n, c) => n + c.fail.length, 0);
      const rows = Array.from({ length: max }, (_, i) => i + 1)
        .map((p) => `<tr><th>${p} player${p === 1 ? '' : 's'}</th>${modes
          .map((m) => {
            if (!m.offered) return `<td><button class="na" type="button" disabled title="The handler doesn't set Game.SupportsMultipleKeyboardsAndMice = true">not offered</button></td>`;
            const c = cells.get(`${p}|${m.kb}`);
            if (!c) return '<td><button type="button" disabled>…</button></td>';
            return `<td><button class="${c.fail.length ? 'fail' : 'ok'}" type="button" data-p="${p}" data-kb="${m.kb}" data-res="${c.fail[0]?.res ?? '1920x1080'}">${c.fail.length ? `${c.fail.length} of ${MX_RES.length} screens` : 'all screens'}</button></td>`;
          })
          .join('')}</tr>`)
        .join('');
      const fails = [...cells.entries()].flatMap(([k, c]) => c.fail.map((f) => ({ k, ...f })));
      // Nucli runs the relay while it tests, then shows how it went.
      const nuc = mascot(finished ? (failed ? 'n-bad' : 'n-ok') : 'n-ring', { size: 44, className: 'mx-masc', busy: !finished });
      box.innerHTML = `<div class="mx-head">${nuc}<strong>${finished ? (failed ? `${failed} of ${jobs.length} combinations fail` : `All ${jobs.length} combinations work`) : `Testing ${done} of ${jobs.length}…`}</strong><span class="muted">${max} player${max === 1 ? '' : 's'} max · ${MX_RES.map(([w, h]) => `${w}×${h}`).join(', ')}${finished ? ` · ${Math.round(performance.now() - t0)} ms` : ''}</span>${finished ? '' : '<button class="btn" type="button" id="mx-stop">Stop</button>'}<button class="btn icon" type="button" id="mx-close" aria-label="Close" title="Close">×</button></div>
        ${finished ? '' : `<div class="mx-bar" role="progressbar" aria-label="Combinations tested" aria-valuemin="0" aria-valuemax="${jobs.length}" aria-valuenow="${done}"><i style="width:${Math.round((done / Math.max(1, jobs.length)) * 100)}%"></i></div>`}
        <div class="mx-wrap"><table><thead><tr><th></th>${modes.map((m) => `<th>${m.label}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>
        ${fails.length ? `<ul class="mx-fails">${fails.slice(0, 8).map((f) => { const [p, kb] = f.k.split('|'); return `<li>${p} player${p === '1' ? '' : 's'}, ${modes.find((m) => String(m.kb) === kb)!.label.toLowerCase()}, ${f.res.replace('x', '×')}: ${esc(f.why)}</li>`; }).join('')}${fails.length > 8 ? `<li>…and ${fails.length - 8} more</li>` : ''}</ul>` : ''}
        <p class="muted small" style="margin:6px 0 0">Pick a cell to see that run below.</p>`;
      document.documentElement.classList.toggle('busy', !finished); // the logo beats while it runs
      box.querySelector('#mx-stop')?.addEventListener('click', () => (mxRun++, draw(true)));
      box.querySelector('#mx-close')?.addEventListener('click', () => ((mxRun++, (box.hidden = true), document.documentElement.classList.remove('busy'))));
      box.querySelectorAll<HTMLButtonElement>('button[data-p]').forEach((b) =>
        b.addEventListener('click', () => {
          const players = $('#sim-players') as HTMLSelectElement;
          if (![...players.options].some((o) => o.value === b.dataset.p)) players.append(new Option(b.dataset.p!, b.dataset.p!));
          players.value = b.dataset.p!;
          ($('#sim-kb') as HTMLSelectElement).value = b.dataset.kb!;
          const res = $('#sim-res') as HTMLSelectElement;
          if (![...res.options].some((o) => o.value === b.dataset.res)) res.append(new Option(b.dataset.res!.replace('x', '×'), b.dataset.res!));
          res.value = b.dataset.res!;
          runSim();
          $('#sim-out').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }),
      );
    };
    const step = () => {
      if (run !== mxRun) return;
      const until = performance.now() + 12; // a few runs per frame
      while (done < jobs.length && performance.now() < until) {
        const j = jobs[done++];
        const key = `${j.players}|${j.kb}`;
        const c = cells.get(key) ?? { ok: 0, fail: [] };
        const why = failureOf(simulate(code, { ...jobOptions(j), plugins: deps.plugins() }));
        if (why) c.fail.push({ res: `${j.width}x${j.height}`, why });
        else c.ok++;
        cells.set(key, c);
      }
      draw(done >= jobs.length);
      if (done < jobs.length) setTimeout(step, 0);
    };
    draw(false);
    setTimeout(step, 0);
  }
  $('#sim-all').addEventListener('click', testAll);

  return { run: runSim, options: simOptions, testAll };
}
