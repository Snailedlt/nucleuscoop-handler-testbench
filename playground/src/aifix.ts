// "Fix with AI": asks Claude (the artifact `sample` capability, on the viewer's own
// account) for a corrected handler. Claude gets two page tools, the real linter and
// the API lookup, so it can verify its fix before answering.
import { lint, Diagnostic, lineOf, type LintOptions } from '@core/lint';
import { lookup, search } from '@core/lookup';

export interface AiFixResult {
  code: string;
  changes: string[];
}

const RULES = `Nucleus Co-op runs handlers with Jint 2.11.58. Hard rules:
- ES5 JavaScript only: no arrow functions, template strings, classes, spread/rest, destructuring, default parameters, for...of, ?. or ??, and no trailing comma in a call. let/const parse but act like var; prefer var.
- Only use options that exist in the Nucleus API (check with lookup_api). Unknown members are silently ignored. Member names are case-sensitive except the first letter.
- Context, Player, PlayerList, Handler and ProtoInput exist only inside callbacks such as Game.Play = function () { ... }; never use them at the top level.
- Game.GUID, Game.GameName and Game.ExecutableName are required. GameName and ExecutableName must each be on their own unindented line, double-quoted, with no other double quote on the line.
- List options take arrays (Game.KillMutex = ["name"]). Booleans are true/false, not strings. For enum options use the enum value (Game.DPIHandling = Nucleus.DPIHandling.True), never a boolean.
- Don't add Hub.* metadata lines.`;

function lineList(text: string, diags: Diagnostic[]) {
  return diags
    .filter((d) => d.severity !== 'hint')
    .map((d) => `- line ${lineOf(text, d.start) + 1}, ${d.severity} [${d.rule}]: ${d.message.replace(/`/g, '')}${d.fixes?.length ? ` (suggested fix: ${d.fixes[0].title.replace(/`/g, '')})` : ''}`)
    .join('\n');
}

export function buildPrompt(code: string, instruction: string): string {
  const diags = lint(code);
  return `You are fixing a Nucleus Co-op game handler (a JavaScript file Nucleus loads to run a game split-screen).

${RULES}

Task: fix the problems the linter reports below${instruction.trim() ? `, and also: ${instruction.trim()}` : ''}. Keep everything else as it is: the same options, values, comments, order and formatting. Make the smallest changes that fix the problems. Don't invent options or values the author didn't ask for; if a fix needs information you don't have (for example a missing executable name), use an obvious placeholder and say so in "changes".

Before answering, call lint_handler with your complete fixed code and keep fixing until it reports no errors. Use lookup_api to check any option or method name you are unsure about.

Linter problems in the current handler:
${lineList(code, diags) || '- none reported'}

Current handler:
<handler>
${code}
</handler>

Reply with only a JSON object: {"code": "<the complete fixed handler>", "changes": ["one short sentence per change"]}`;
}

export function pageTools() {
  return [
    {
      name: 'lint_handler',
      description:
        'Runs the Nucleus handler linter (the same one the editor uses) on complete handler code. Returns the errors and warnings, each with line, rule and message. Call it with your full fixed handler before answering.',
      inputSchema: { type: 'object', properties: { code: { type: 'string', description: 'The complete handler source.' } }, required: ['code'] },
      execute(input: { [k: string]: unknown }) {
        const code = String(input.code ?? '');
        const diags = lint(code).filter((d) => d.severity === 'error' || d.severity === 'warning');
        return {
          errors: diags.filter((d) => d.severity === 'error').length,
          warnings: diags.filter((d) => d.severity === 'warning').length,
          problems: diags.slice(0, 40).map((d) => ({ line: lineOf(code, d.start) + 1, severity: d.severity, rule: d.rule, message: d.message.replace(/`/g, '') })),
        };
      },
    },
    {
      name: 'lookup_api',
      description:
        'Looks up the Nucleus handler API. Pass an exact name like "Game.KillMutex", "Context.ModifySaveFile" or "Nucleus.DPIHandling", or search words like "window title". Returns matching members with type, default and a short description.',
      inputSchema: { type: 'object', properties: { query: { type: 'string' } }, required: ['query'] },
      execute(input: { [k: string]: unknown }) {
        const q = String(input.query ?? '');
        const exact = lookup(q);
        if (exact.kind === 'enum') return { enum: `Nucleus.${exact.name}`, values: exact.values };
        if (exact.kind === 'class') return { class: `Nucleus.${exact.name}`, constructorParams: exact.params };
        const entries = exact.kind === 'entries' ? exact.entries : search(q, 6);
        if (!entries.length) return { found: false, didYouMean: exact.kind === 'none' ? exact.didYouMean ?? null : null };
        return entries.slice(0, 6).map((e) => ({
          path: e.path,
          type: e.member.kind === 'method' ? (e.member.overloads ?? []).map((o) => `(${o.params.map((p) => `${p.name}: ${p.type}`).join(', ')}) => ${o.returns}`) : e.member.ts,
          default: e.member.default,
          readonly: e.member.readonly || undefined,
          deprecated: e.member.deprecated || undefined,
          doc: (e.member.doc || '').slice(0, 300),
        }));
      },
    },
  ];
}

// ---------------------------------------------------------------------------
// Line diff (LCS), grouped into hunks with context.

export type DiffLine = { kind: ' ' | '-' | '+'; text: string; a?: number; b?: number };

export function diffLines(before: string, after: string): DiffLine[] {
  const a = before.split('\n');
  const b = after.split('\n');
  // Trim common prefix/suffix to keep the table small.
  let pre = 0;
  while (pre < a.length && pre < b.length && a[pre] === b[pre]) pre++;
  let suf = 0;
  while (suf < a.length - pre && suf < b.length - pre && a[a.length - 1 - suf] === b[b.length - 1 - suf]) suf++;
  const A = a.slice(pre, a.length - suf);
  const B = b.slice(pre, b.length - suf);
  const n = A.length;
  const m = B.length;
  const dp = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[i][j] = A[i] === B[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const out: DiffLine[] = [];
  for (let k = 0; k < pre; k++) out.push({ kind: ' ', text: a[k], a: k + 1, b: k + 1 });
  let i = 0;
  let j = 0;
  while (i < n || j < m) {
    if (i < n && j < m && A[i] === B[j]) {
      out.push({ kind: ' ', text: A[i], a: pre + i + 1, b: pre + j + 1 });
      i++;
      j++;
    } else if (j < m && (i === n || dp[i][j + 1] >= dp[i + 1][j])) {
      out.push({ kind: '+', text: B[j], b: pre + j + 1 });
      j++;
    } else {
      out.push({ kind: '-', text: A[i], a: pre + i + 1 });
      i++;
    }
  }
  for (let k = 0; k < suf; k++) out.push({ kind: ' ', text: a[a.length - suf + k], a: a.length - suf + k + 1, b: b.length - suf + k + 1 });
  return out;
}

/** Keep `context` unchanged lines around each change; `null` marks a gap. */
export function hunks(lines: DiffLine[], context = 3): (DiffLine | null)[] {
  const keep = new Array(lines.length).fill(false);
  lines.forEach((l, i) => {
    if (l.kind !== ' ') for (let k = Math.max(0, i - context); k <= Math.min(lines.length - 1, i + context); k++) keep[k] = true;
  });
  const out: (DiffLine | null)[] = [];
  let gap = false;
  lines.forEach((l, i) => {
    if (keep[i]) {
      if (gap && out.length) out.push(null);
      gap = false;
      out.push(l);
    } else gap = true;
  });
  return out;
}

export const counts = (code: string, ctx: LintOptions = {}) => {
  const d = lint(code, ctx);
  return { errors: d.filter((x) => x.severity === 'error').length, warnings: d.filter((x) => x.severity === 'warning').length };
};

/** Problems (errors/warnings) in `after` that `before` didn't have, by rule + message. */
export function newProblems(before: string, after: string, ctx: LintOptions = {}): string[] {
  const key = (d: Diagnostic) => `${d.rule}|${d.message}`;
  const sig = (code: string) => lint(code, ctx).filter((d) => d.severity === 'error' || d.severity === 'warning');
  const old = new Set(sig(before).map(key));
  return sig(after).filter((d) => !old.has(key(d))).map((d) => `line ${lineOf(after, d.start) + 1}: ${d.message.replace(/`/g, '').replace(/\.\s*$/, '')}`);
}
