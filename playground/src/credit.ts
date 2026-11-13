// The credit lines a handler gets when it leaves the workbench (saved, saved into Nucleus, copied), if it was made or
// changed here: where it was made (a link, which is also how people find the workbench), and plainly what was and
// wasn't done to it here: checked, simulated, AI. Support helpers and experienced authors see at a glance which tools
// touched a handler. Honour system: anyone can edit or delete the lines, so they say what the workbench saw, nothing
// more. Off in Settings › Feedback and privacy. Pure functions; app.ts wires them.

export const CREDIT_LINK = 'https://snailedlt.github.io/nucleuscoop-handler-testbench/?ref=handler-comment';
const FIRST = '// Made with the Nucleus Handler Workbench: ';
/** Our block at the top of a handler (the first line, then the "// - " lines), exactly as we write it. */
const BLOCK = /^\/\/ Made with the Nucleus Handler Workbench: \S+\r?\n(?:\/\/ - [^\n]*\r?\n)*/;

export interface CreditFacts {
  /** Problems the workbench's check finds in the handler as saved. */
  errors: number;
  warnings: number;
  /** Try it on this exact version: how many players, and whether it loaded. */
  tried?: { players: number; loaded: boolean };
  /** Fix with AI changes kept in this handler: applied straight away, and reviewed first (Apply). */
  ai: { direct: number; reviewed: number };
}

const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;

export function creditLines(f: CreditFacts): string {
  const checked =
    f.errors + f.warnings === 0 ? 'no problems found' : `${plural(f.errors, 'error')} and ${plural(f.warnings, 'warning')} left`;
  const tried = f.tried
    ? `run on this version (${plural(f.tried.players, 'player')})${f.tried.loaded ? ', the handler loaded' : ', the handler did not load'}`
    : 'not run on this version';
  const aiTotal = f.ai.direct + f.ai.reviewed;
  const ai = aiTotal
    ? `Fix with AI changed it ${aiTotal === 1 ? 'once' : `${aiTotal} times`} (${[f.ai.reviewed ? `${f.ai.reviewed} reviewed before applying` : '', f.ai.direct ? `${f.ai.direct} applied directly` : ''].filter(Boolean).join(', ')}); the rest was written without AI in the workbench`
    : 'not used in the workbench';
  return [
    `${FIRST}${CREDIT_LINK}`,
    `// - Checked in the workbench: ${checked}.`,
    `// - Try it (simulated, not the real game): ${tried}. Not run in Nucleus Co-op by the workbench.`,
    `// - AI: ${ai}.`,
    '',
  ].join('\n');
}

/** The handler without our block (for comparing versions and for checking). */
export const withoutCredit = (text: string) => text.replace(BLOCK, '');
export const hasCredit = (text: string) => BLOCK.test(text);

/**
 * The handler as it leaves the workbench. Gets the block only when made here (`created`) or changed here (`edited`):
 * a handler that was only opened and saved isn't credited to us. Our block is refreshed; a credit line someone edited
 * (it mentions the workbench but isn't exactly ours) is left alone, and never doubled.
 */
export function withCredit(text: string, facts: CreditFacts, opts: { created: boolean; edited: boolean; on: boolean }): string {
  if (!opts.on) return text;
  if (hasCredit(text)) return creditLines(facts) + withoutCredit(text);
  if (!opts.created && !opts.edited) return text;
  if (/Nucleus Handler Workbench/.test(text.split('\n').slice(0, 8).join('\n'))) return text;
  return creditLines(facts) + text;
}
