// The docs of an API member as a card: a coloured signature (owner dim, name bold, parameters and types in their own
// colours), the description, small facts (default, read-only, required, category), an example, and, for docs Claude
// wrote, a footer saying so and what they're based on. Used by the hover card and the Reference tab.
import { appNote, withContext } from './report';
import { claudeNote, docReviewUrl, ownerLabel, type Member } from '@core/api';
import { voteButtons } from './feedback';
import { hlHtml } from './codehl';
import { prettyCode } from '@core/pretty';

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const inline = (s: string) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
// Parameters accept numbers and booleans too (Jint converts them to text); the signature shows the declared type.
const ty = (t: string) => `<span class="sg-t">${esc(t.replace(/ \| number \| boolean$/, '').replace(/^string \| number \| boolean$/, 'string'))}</span>`;

/** `compact`: the editor's hover, as VS Code shows it: signature, text, one line of facts; no example or chips. */
export function memberCard(owner: string, name: string, m: Member, opts: { head?: boolean; compact?: boolean } = {}): string {
  const label = ownerLabel(owner);
  const pre = `<span class="sg-o">${esc(label)}.</span><span class="sg-n">${esc(name)}</span>`;
  // A long overload one parameter per line, as prettier prints it (core/pretty.ts prettySignature does the same in
  // VS Code, the Docs panel and the CLI): measured on the plain text.
  const plainType = (t: string) => t.replace(/ \| number \| boolean$/, '').replace(/^string \| number \| boolean$/, 'string');
  const sigs = m.kind === 'method'
    ? (m.overloads ?? []).map((o) => {
      const ps = o.params.map((p) => `<span class="sg-p">${p.rest ? '...' : ''}${esc(p.name)}</span>: ${ty(p.type)}`);
      const plain = `${label}.${name}(${o.params.map((p) => `${p.rest ? '...' : ''}${p.name}: ${plainType(p.type)}`).join(', ')}): ${plainType(o.returns)}`;
      const list = plain.length > 60 && ps.length > 1 ? `\n  ${ps.join(',\n  ')}\n` : ps.join(', ');
      return `${pre}(${list})<span class="sg-c">: </span>${ty(o.returns)}`;
    })
    : [`${pre}<span class="sg-c">: </span>${ty(m.kind === 'object' ? m.ref ?? m.ts ?? '' : m.ts ?? '')}`];
  const facts: string[] = [];
  if (m.required) facts.push('<span class="dc-chip req">Required</span>');
  if (m.readonly) facts.push('<span class="dc-chip">Read-only</span>');
  if (m.default !== undefined) facts.push(`<span class="dc-chip">Default <code>${esc(m.default)}</code></span>`);
  if (m.category) facts.push(`<span class="dc-chip">${esc(m.category)}</span>`);
  const note = claudeNote(m);
  if (opts.compact) {
    const fact = [m.required ? '<span class="req">Required</span>' : '', m.readonly ? 'Read-only' : '', m.default !== undefined ? `Default <code>${esc(m.default)}</code>` : '', m.category ? esc(m.category) : ''].filter(Boolean).join(' · ');
    return hlHtml(`<div class="dc compact">`
      + (opts.head === false ? '' : `<div class="dc-sig">${sigs.map((s) => `<div>${s}</div>`).join('')}</div>`)
      + `<div class="dc-text">`
      + (m.deprecated ? `<p class="dc-dep">${inline(m.deprecated)}</p>` : '')
      + (m.doc ? m.doc.split(/\n{2,}/).map((p) => `<p>${inline(p)}</p>`).join('') : '<p class="muted">No description yet.</p>')
      + (fact ? `<p class="dc-fact">${fact}</p>` : '')
      + (note ? `<p class="dc-ai" title="${esc(note)}"><span class="ai-spark" aria-hidden="true"></span><span>${m.docCheckedBy ? `AI-written, checked by ${esc(m.docCheckedBy)}` : 'AI-written'}</span>${voteButtons('doc', `${label}.${name}`, { up: 'Correct', down: 'Wrong or unclear' })}<a href="${esc(withContext(docReviewUrl(`${label}.${name}`), { Doc: `${label}.${name}` }))}" target="_blank" rel="noopener">Report</a></p>` : '')
      + `</div></div>`);
  }
  return hlHtml(`<div class="dc">`
    + (opts.head === false ? '' : `<div class="dc-sig">${sigs.map((s) => `<div>${s}</div>`).join('')}</div>`)
    + (m.deprecated ? `<p class="dc-dep">${inline(m.deprecated)}</p>` : '')
    + (m.doc ? m.doc.split(/\n{2,}/).map((p) => `<p>${inline(p)}</p>`).join('') : '<p class="muted">No description yet.</p>')
    + (m.example ? `<pre class="doc-code">${esc(prettyCode(m.example))}</pre>` : '')
    + (facts.length ? `<div class="dc-facts">${facts.join('')}</div>` : '')
    + (note ? `<div class="dc-ai" title="${esc(note)}"><span class="ai-spark" aria-hidden="true"></span><span>${m.docCheckedBy ? `AI-written, checked by ${esc(m.docCheckedBy)}${m.docCheckedOn ? ` on ${esc(m.docCheckedOn)}` : ''}.` : 'AI-written, not from the official docs.'} Based on ${esc(m.docBasis ?? '')}.</span></div>`
      + `<div class="dc-check"><span>Is this right?</span>${voteButtons('doc', `${label}.${name}`, { up: 'Correct', down: 'Wrong or unclear' })}<a href="${esc(withContext(docReviewUrl(`${label}.${name}`), { Doc: `${label}.${name}` }))}" target="_blank" rel="noopener">Tell us what's wrong</a>${appNote()}</div>` : '')
    + `</div>`);
}
