// Fix with AI (artifact `sample` capability: Claude, on the viewer's own account, or a provider set up in
// Settings › AI) and Fix all (the deterministic, offline fixes): applied straight away with Undo and the changed
// lines highlighted, or shown for review when an AI fix looks risky.
import { fixAll } from '@core/fix';
import { $, esc } from './dom';
import { AiError, currentRunner } from './aiproviders';
import { initAiSettings } from './aisettings';
import { buildPrompt, pageTools, diffLines, hunks, counts, newProblems, type DiffLine } from './aifix';
import { fixWithNucli } from './fixfx';
import { mascot, mascotsOn } from './mascots';
import { notice } from './toast';

type LintCtx = Parameters<typeof counts>[1];

export interface FixesDeps {
  editor: any;
  lintCtx: () => LintCtx;
  openAiSettings: () => void;
  used: (what: string) => void;
  /** An AI fix kept (+1) or undone (-1), for the credit lines (credit.ts). */
  aiKept: (kind: 'direct' | 'reviewed', d: number) => void;
}

export function initFixes(deps: FixesDeps): void {
  const { editor } = deps;
  const aiBox = $('#ai-box');
  const aiBtn = $('#ai-fix') as HTMLButtonElement;
  // Fixes are applied straight away (no "Apply without review" any more): Undo and the highlighted lines replace the review.

  let sample: any = null;
  let aiCtl: AbortController | null = null;
  (async () => {
    try {
      sample = await (window as any).claude?.use?.('sample');
    } catch {
      sample = null;
    }
    refreshAi();
  })();
  /** Fix with AI shows when a provider is set up (Settings › AI): Claude on claude.ai, an API key, or a local model. */
  function refreshAi() {
    const on = !!currentRunner(sample).runner;
    aiBtn.hidden = !on;
    ($('#ai-note') as HTMLInputElement).hidden = !on;
  }
  document.addEventListener('ai-settings-changed', refreshAi);
  initAiSettings(() => sample);

  const AI_ERRORS: Record<string, string> = {
    rate_limited: 'Too many requests right now. Try again in a minute.',
    session_expired: 'Your Claude session expired. Sign in again, then retry.',
    refused: 'Claude declined to change this handler.',
    empty_completion: 'Claude returned nothing. Try again, or ask for less in the note.',
    invalid_json: "Claude's answer wasn't in the expected format. Try again.",
    prompt_too_large: 'This handler is too large to send in one request.',
  };
  const AI_UNAVAILABLE = new Set(['not_granted', 'sampling_disabled', 'not_declared', 'capability_disabled', 'capability_removed']);

  function aiStatus(text: string) {
    const el = aiBox.querySelector('.ai-status-text');
    if (el) el.textContent = text;
  }

  async function runAiFix() {
    const { runner, reason } = currentRunner(sample);
    if (!runner) {
      if (reason && reason !== 'off') notice(reason, { kind: 'info', action: { label: 'Open Settings › AI', run: () => deps.openAiSettings() } });
      return;
    }
    const who = runner.label;
    const base = editor.getValue();
    const before = counts(base, deps.lintCtx());
    aiCtl = new AbortController();
    aiBtn.disabled = true;
    aiBox.hidden = false;
    // Nucli reads the code while the AI works on it (a spinner when mascots are off).
    aiBox.innerHTML = `<div class="ai-status">${mascotsOn() ? mascot('n-scan', { size: 56, busy: true, className: 'ai-masc' }) : '<span class="spinner" aria-hidden="true"></span>'}<span class="ai-status-text">Asking ${esc(who)}…</span><button class="btn" id="ai-stop" type="button">Stop</button></div>`;
    $('#ai-stop').addEventListener('click', () => aiCtl?.abort());

    // On claude.ai the page's Claude may not take tools; every API provider does.
    const limits = runner.label === 'Claude' && sample ? await sample.limits().catch(() => null) : { tools: true };
    const tools = limits?.tools
      ? pageTools().map((t) => ({
          ...t,
          execute: (input: { [k: string]: unknown }) => {
            aiStatus(t.name === 'lint_handler' ? `${who} is checking its fix with the linter…` : t.name === 'explain_check' ? `${who} is reading about the check ${String(input.rule ?? '').slice(0, 40)}…` : `${who} is looking up ${String(input.query ?? '').slice(0, 40)}…`);
            return t.execute(input);
          },
        }))
      : undefined;
    try {
      const r: any = await runner.json(buildPrompt(base, ($('#ai-note') as HTMLInputElement).value), {
        signal: aiCtl.signal,
        tools,
        onText: () => aiStatus(`${who} is writing the fix…`),
      });
      deps.used('ai-fix');
      const code = typeof r?.code === 'string' ? r.code.replace(/\r\n/g, '\n') : '';
      const changes = Array.isArray(r?.changes) ? r.changes.map(String).slice(0, 20) : [];
      if (!code.trim()) {
        aiBox.innerHTML = `<p>The answer had no handler code. Try again.</p>`;
      } else if (code === base) {
        aiBox.innerHTML = `<p>${esc(who)} found nothing to change.</p>${changes.length ? `<ul class="ai-changes">${changes.map((c: string) => `<li>${esc(c)}</li>`).join('')}</ul>` : ''}`;
      } else {
        showProposal(base, code, changes, before);
      }
    } catch (e: any) {
      if (e?.code === 'cancelled') {
        aiBox.hidden = true;
      } else if (AI_UNAVAILABLE.has(e?.code)) {
        aiBox.innerHTML = `<p>Claude isn't available on this page for your account. Pick another provider in Settings › AI; Fix all problems still works.</p>`;
      } else if (e instanceof AiError) {
        aiBox.innerHTML = `<p>${esc(e.message)}</p>`;
      } else {
        aiBox.innerHTML = `<p>${esc(AI_ERRORS[e?.code] ?? `Something went wrong reaching ${who}. Try again.`)}</p>`;
      }
    } finally {
      aiBtn.disabled = false;
      aiCtl = null;
    }
  }
  aiBtn.addEventListener('click', runAiFix);

  // Fix all: the deterministic, offline fixes (the same as `nucleus lint --fix` and the extension).
  $('#fix-all').addEventListener('click', () => {
    deps.used('fix-all');
    const base = editor.getValue();
    const before = counts(base, deps.lintCtx());
    const r = fixAll(base, deps.lintCtx());
    aiBox.hidden = false;
    boxShows = null;
    if (r.code === base) {
      aiBox.innerHTML = `<p>Nothing can be fixed automatically. ${before.errors + before.warnings ? 'The remaining problems need your decision; see their quick fixes below' + (sample ? ', or try Fix with AI' : '') + '.' : ''}</p>`;
      return;
    }
    const changes = [...new Set(r.applied.map((a) => `${a.title} (line ${a.line})`))];
    showProposal(base, r.code, changes, before, 'Fix all');
  });

  // The fix box shows a before/after of one version of the handler: once the code moves on (you keep
  // typing), it would be stale, so it closes and the list below is what counts.
  let boxShows: string | null = null;
  editor.on('change', (_cm: unknown, ch: { origin?: string }) => {
    if (boxShows === null || ch.origin === '+ai-fix' || ch.origin === 'undo') return;
    if (!aiBox.hidden && editor.getValue() !== boxShows) aiBox.hidden = true;
    boxShows = null;
  });

  function applyCode(code: string) {
    const doc = editor.getDoc();
    fixWithNucli(editor, code, () => doc.replaceRange(code, doc.posFromIndex(0), doc.posFromIndex(doc.getValue().length), '+ai-fix'));
  }

  function showProposal(base: string, code: string, changes: string[], before: { errors: number; warnings: number }, source: 'AI' | 'Fix all' = 'AI') {
    const after = counts(code, deps.lintCtx());
    const edited = editor.getValue() !== base;
    const better = after.errors < before.errors || (after.errors === before.errors && after.warnings < before.warnings);
    const notWorse = after.errors <= before.errors;
    const lines = hunks(diffLines(base, code));
    const rows = lines
      .map((l) =>
        l === null
          ? '<tr class="gap"><td colspan="4">⋯</td></tr>'
          : `<tr class="${l.kind === '+' ? 'add' : l.kind === '-' ? 'del' : ''}"><td class="n">${l.a ?? ''}</td><td class="n">${l.b ?? ''}</td><td class="sign">${l.kind === ' ' ? '' : l.kind}</td><td class="code">${esc(l.text) || ' '}</td></tr>`,
      )
      .join('');
    const added = lines.filter((l) => l?.kind === '+').length;
    const removed = lines.filter((l) => l?.kind === '-').length;
    const chip = (n: number, kind: string) => `<span class="chip ${n ? kind : 'ok'}">${n} ${kind === 'error' ? 'error' : 'warning'}${n === 1 ? '' : 's'}</span>`;
    const delta = `<div class="ai-delta">Before ${chip(before.errors, 'error')} ${chip(before.warnings, 'warning')} → after ${chip(after.errors, 'error')} ${chip(after.warnings, 'warning')} <span class="muted">· +${added} −${removed} lines</span></div>`;

    const introduced = newProblems(base, code, deps.lintCtx());
    const baseLines = base.split('\n').length;
    const bigRewrite = removed > Math.max(20, baseLines * 0.5);
    let reason = '';
    if (edited) reason = 'You edited the handler while the AI was working, so this was not applied automatically. Accepting replaces your latest edits.';
    else if (introduced.length) reason = `This version adds ${introduced.length} new problem${introduced.length > 1 ? 's' : ''} (${introduced.slice(0, 2).join('; ')}${introduced.length > 2 ? '; …' : ''}), so it was not applied automatically.`;
    else if (bigRewrite) reason = `This rewrites a large part of the handler (${removed} of ${baseLines} lines removed), so it was not applied automatically.`;
    else if (!notWorse) reason = 'This version has more errors than yours, so it was not applied automatically.';
    else if (!better) reason = 'This version does not reduce the problem count, so it was not applied automatically.';
    // Applied straight away (Undo is one click, and the changed lines light up in the code). Only an AI fix that looks
    // risky (it adds problems, rewrites most of the file, makes it worse, or you typed meanwhile) waits for a review.
    const risky = source === 'AI' && (edited || introduced.length > 0 || bigRewrite || !notWorse);
    const fixedCount = source === 'Fix all' ? changes.length : 0;
    const remaining = after.errors + after.warnings;
    const diffTable = `<div class="diff-wrap" tabindex="0" role="region" aria-label="The changes, line by line"><table class="diff"><tbody>${rows}</tbody></table></div>`;
    const changeList = changes.length ? `<ul class="ai-changes">${changes.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>` : '';

    const review = () => `
      <h3>${source === 'AI' ? "AI's proposed fix" : 'Automatic fixes'}</h3>
      ${reason ? `<p class="note">${esc(reason.replace(/, so it was not applied automatically/, '').replace(/ so this was not applied automatically\./, '.'))} Check it before applying.</p>` : ''}
      ${changeList}${delta}
      <div class="ai-actions"><button class="btn primary" id="ai-accept" type="button">Apply</button><button class="btn" id="ai-reject" type="button">Discard</button></div>
      ${diffTable}`;
    const applied = () => `<div class="fix-done">
      <span class="fix-ok" aria-hidden="true">✓</span>
      <span class="fix-msg"><strong>${source === 'Fix all' ? `Fixed ${fixedCount} problem${fixedCount === 1 ? '' : 's'}` : 'Applied the AI fix'}</strong>${remaining ? ` · ${remaining} need${remaining === 1 ? 's' : ''} your decision, below` : ' · nothing left to fix'}. Changed lines are highlighted in the code.</span>
      <button class="btn" id="ai-undo" type="button">Undo</button>
      <button class="btn icon" id="ai-close" type="button" aria-label="Close">×</button>
      <details class="fix-more"><summary>What changed (+${added} −${removed} lines)</summary>${changeList}${delta}${diffTable}</details></div>`;

    const showApplied = (how: 'direct' | 'reviewed') => {
      aiBox.innerHTML = applied();
      aiBox.classList.add('compact');
      boxShows = code;
      markChanged(code, lines);
      $('#ai-undo').addEventListener('click', () => {
        if (editor.getValue() === code) {
          editor.undo();
          clearChanged();
          countAi(how, -1);
          aiBox.innerHTML = '<p class="fix-done"><span class="fix-msg">Undone. Your handler is back to how it was.</span></p>';
        } else {
          aiBox.innerHTML = '<p>The handler changed after the fix was applied, so Undo is no longer safe here. Use Ctrl+Z in the editor instead.</p>';
        }
      });
      $('#ai-close').addEventListener('click', () => (aiBox.hidden = true));
    };
    // Fix with AI changes kept, for the credit lines (credit.ts); Undo takes one back.
    const countAi = (kind: 'direct' | 'reviewed', d: number) => {
      if (source !== 'AI') return;
      deps.aiKept(kind, d);
    };
    if (!risky) {
      applyCode(code);
      countAi('direct', 1);
      showApplied('direct');
      return;
    }
    aiBox.classList.remove('compact');
    aiBox.innerHTML = review();
    boxShows = editor.getValue();
    aiBox.scrollIntoView({ block: 'nearest' });
    $('#ai-accept').addEventListener('click', () => {
      applyCode(code);
      countAi('reviewed', 1);
      showApplied('reviewed');
      $('#ai-undo').focus(); // keep the keyboard where the result is
    });
    $('#ai-reject').addEventListener('click', () => (aiBox.hidden = true));
  }

  // The lines a fix added or changed, highlighted in the editor until you edit the code (or 12 s).
  let changedMarks: any[] = [];
  let changedTimer = 0;
  function clearChanged() {
    changedMarks.forEach((h) => editor.removeLineClass(h, 'background', 'line-changed'));
    changedMarks = [];
    clearTimeout(changedTimer);
  }
  function markChanged(code: string, diff: (DiffLine | null)[]) {
    const go = (tries = 0) => {
      if (editor.getValue() !== code) return tries < 40 ? void setTimeout(() => go(tries + 1), 100) : undefined; // after Nucli's edit animation
      clearChanged();
      for (const l of diff) if (l?.kind === '+' && l.b) changedMarks.push(editor.addLineClass(l.b - 1, 'background', 'line-changed'));
      const first = diff.find((l) => l?.kind === '+' && l.b);
      if (first?.b) editor.scrollIntoView({ line: first.b - 1, ch: 0 }, 80);
      changedTimer = window.setTimeout(clearChanged, 12000);
    };
    go();
  }
  editor.on('change', (_cm: unknown, ch: { origin?: string }) => { if (ch.origin !== '+ai-fix' && changedMarks.length) clearChanged(); });
}
