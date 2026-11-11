// Links live for ever: every link the workbench, the start page and the extension have published still leads
// somewhere. Checks the workbench's #links (playground/src/links.ts), the Docs links the extension, the Language
// Server and the Notepad++ plugin write (core workbenchDocsUrl), the start page's anchors, and the links into the
// extension's README and other docs (GitHub's heading slugs). No network.
// Run: node tools/links.test.mjs (or npm test in playground); the extension from CORE_DIR, ./core or ../splitscreenme-vscode.
import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import { coreDir, load, root } from './bundle-ts.mjs';

const links = await load('playground/src/links.ts');
const { API_GROUP_KEYS } = await load('playground/src/docsgroups.ts');
const { allEntries, lookup } = await load(path.join(coreDir, 'src/core/lookup.ts'));
const { api } = await load(path.join(coreDir, 'src/core/api.ts'));
const { workbenchDocsUrl } = await load(path.join(coreDir, 'src/core/features.ts'));

const PROBES = fs.readdirSync(path.join(root, 'probes')).filter((f) => f.endsWith('.js')).sort();
const CATALOG = { hub: ['abc123', 'def456'], probes: PROBES, packages: ['ue4-example'], templates: ['Unity (basic)', 'unreal-engine'] };

/** What a link (as typed in the address bar, with "#") opens, after a move. */
function open(hash) {
  const { to, why } = links.followMoved(decodeURIComponent(hash.replace(/^#/, '')));
  return { target: links.routeLink(to, CATALOG), to, why };
}
/** What a #docs… link shows: the view, and for a name, what Docs looks up. */
function docs(hash) {
  const { target, to, why } = open(hash);
  assert.equal(target.kind, 'docs', hash);
  return { view: links.docsView(target.hash, API_GROUP_KEYS), to, why };
}

// ---------------------------------------------------------------------------
// The workbench's own links

test('every MOVED_LINKS entry leads to the new place and says why', () => {
  const cases = {
    reference: 'docs', api: 'docs', ref: 'docs', Reference: 'docs', API: 'docs',
    'reference-Context.ModifySaveFile': 'docs-Context.ModifySaveFile', 'api-Game.Play': 'docs-Game.Play', 'ref-mutex': 'docs-mutex', 'REF-Context': 'docs-Context',
  };
  for (const [from, to] of Object.entries(cases)) {
    const r = links.followMoved(from);
    assert.equal(r.to, to, from);
    assert.equal(r.why, 'Reference is now called Docs');
    assert.match(links.movedNote(r.why), /^This is an older link: Reference is now called Docs\./);
  }
  // The removed Fallout example package: its Hub handler, which opens with its files.
  cases['package-nvmp'] = 'hub-vnPXYhWMJJ3FNuQuS';
  assert.equal(links.followMoved('package-nvmp').to, 'hub-vnPXYhWMJJ3FNuQuS');
  // Every entry is exercised by the cases above.
  for (const m of links.MOVED_LINKS) assert.ok(Object.keys(cases).some((c) => m.from.test(c)), String(m.from));
  // Current links are left alone.
  for (const h of ['docs', 'docs-Game.Play', 'hub-abc123', 'share-abc', 'whats-new', 'references', 'apis']) assert.deepEqual(links.followMoved(h), { to: h });
});

test('every kind of #link opens what it names', () => {
  const t = (h) => links.routeLink(h, CATALOG);
  assert.deepEqual(t(''), { kind: 'none' });
  assert.deepEqual(t('share-0aZ'), { kind: 'share', hash: 'share-0aZ' });
  assert.deepEqual(t('whats-new'), { kind: 'whats-new' });
  assert.deepEqual(t('dev'), { kind: 'dev' });
  assert.deepEqual(t('docs'), { kind: 'docs', hash: 'docs' });
  assert.deepEqual(t('example-mistakes'), { kind: 'example-mistakes' });
  assert.deepEqual(t('hub-def456'), { kind: 'hub', index: 1 });
  assert.deepEqual(t('package-ue4-example'), { kind: 'package', id: 'ue4-example' });
  assert.deepEqual(t('template-unity-basic'), { kind: 'template', id: 'Unity (basic)' });
  assert.deepEqual(t('template-Unreal-Engine'), { kind: 'template', id: 'unreal-engine' });
});

test('every probe has a link that opens it (#probe-05, #probe-112), and #probe-5 still works', () => {
  PROBES.forEach((name, i) => {
    const h = links.probeHash(name);
    assert.match(h, /^probe-\d{2,}$/);
    assert.deepEqual(links.routeLink(h, CATALOG), { kind: 'probe', index: i }, h);
  });
  assert.equal(links.routeLink('probe-5', CATALOG).index, PROBES.findIndex((p) => p.startsWith('05-')));
});

test('an unknown link says what it was and offers the way on, never a dead end', () => {
  const note = (h) => links.unknownNote(links.routeLink(h, CATALOG));
  assert.deepEqual(note('hub-gone'), { text: "That Hub handler isn't one of the examples in this version of the workbench. It's still on the Hub.", action: { label: 'Open it on the Hub', to: 'hub', url: 'https://hub.splitscreen.me/handler/gone' } });
  assert.equal(note('probe-999').action.to, 'probes');
  assert.match(note('probe-999').text, /^There's no probe 999 in this version/);
  assert.equal(links.followMoved('package-nvmp').to, 'hub-vnPXYhWMJJ3FNuQuS', 'the removed Fallout example leads to its Hub handler');
  for (const h of ['package-gone', 'template-gone', 'nonsense', 'reference2']) {
    const n = note(h);
    assert.equal(n.text, `The link "#${h}" is from another version of the workbench, or mistyped: it doesn't match anything here.`);
    assert.deepEqual(n.action, { label: 'Open an example or a Hub handler', to: 'open' });
  }
  for (const h of ['hub-abc123', 'docs', 'share-x', 'whats-new']) assert.equal(note(h), undefined, h);
});

// ---------------------------------------------------------------------------
// Docs links, as the extension, the LSP and the Notepad++ plugin write them

test('#docs-<name> opens that name for every API entry the core knows', () => {
  const entries = allEntries(true);
  assert.ok(entries.length > 300, `${entries.length} entries`);
  const failures = [];
  for (const e of entries) {
    const url = workbenchDocsUrl(e.path, 'vscode');
    const { view } = docs(new URL(url).hash);
    if (view === `group:${e.path}`) continue; // a group's name opens the group
    const r = view.startsWith('q:') ? lookup(view.slice(2)) : undefined;
    if (!(r?.kind === 'entries' && r.entries.length === 1 && r.entries[0].path === e.path)) failures.push(`${e.path} -> ${view} -> ${r?.kind} ${r?.entries?.map((x) => x.path).join(', ') ?? ''}`);
  }
  assert.deepEqual(failures, []);
  for (const p of ['Game.Play', 'Context.ModifySaveFile', 'Game.ProtoInput.InjectStartup']) assert.equal(docs(`#docs-${p}`).view, `q:${p}`);
});

test('#docs links to the groups, the enums, the Nucleus classes and the main page', () => {
  assert.equal(docs('#docs').view, 'home');
  for (const g of API_GROUP_KEYS) assert.equal(docs(`#docs-${g}`).view, `group:${g}`);
  for (const g of ['Game', 'Game.Hook', 'Game.ProtoInput', 'Context', 'Player', 'ProtoInput', 'Hub', 'System', 'AI']) assert.ok(API_GROUP_KEYS.includes(g), g);
  for (const name of Object.keys(api.enums)) {
    const { view } = docs(`#docs-Nucleus.${name}`);
    const r = lookup(view.slice(2));
    assert.equal(r.kind, 'enum', name);
    assert.equal(r.name, name);
  }
  for (const name of Object.keys(api.nucleusClasses ?? {})) assert.equal(lookup(docs(`#docs-Nucleus.${name}`).view.slice(2)).kind, 'class', name);
  // A Docs view's own link opens that view again.
  for (const h of ['docs', 'docs-Context', 'docs-Context.ModifySaveFile', 'docs-window%20title']) assert.equal(links.docsHashOf(docs(`#${h}`).view), h);
});

test('old Docs links (#reference-…, #api-…, #ref-…) open the same as the new ones', () => {
  for (const p of ['Game.Play', 'Context.ModifySaveFile', 'Context', 'Nucleus.DPIHandling', 'mutex']) {
    const now = docs(`#docs-${p}`).view;
    for (const old of ['reference', 'api', 'ref']) {
      const r = docs(`#${old}-${encodeURIComponent(p)}`);
      assert.equal(r.view, now, `${old}-${p}`);
      assert.equal(r.why, 'Reference is now called Docs');
    }
  }
  for (const old of ['reference', 'api', 'ref']) assert.equal(docs(`#${old}`).view, 'home');
});

// ---------------------------------------------------------------------------
// The start page

/** GitHub's heading anchors: lower case, punctuation dropped (letters, digits, _ and - stay), spaces to hyphens. */
export function githubSlug(text) {
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\p{M}_\- ]/gu, '')
    .replace(/ /g, '-');
}
/** Every anchor of a Markdown file, GitHub style (headings outside code blocks, with -1, -2 for repeats, and HTML ids). */
function markdownAnchors(file) {
  const text = fs.readFileSync(file, 'utf8');
  const seen = new Map();
  const out = new Set();
  let fence = false;
  for (const line of text.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) fence = !fence;
    if (fence) continue;
    const m = /^#{1,6}\s+(.*?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const base = githubSlug(m[1]);
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    out.add(n ? `${base}-${n}` : base);
  }
  for (const m of text.matchAll(/<a\s+(?:id|name)="([^"]+)"/g)) out.add(m[1]);
  return out;
}

const startSrc = fs.readFileSync(path.join(root, 'playground/src/start.html'), 'utf8');
const builtStart = path.join(root, 'playground/dist/pages/start/index.html');

const toolsSrc = fs.readFileSync(path.join(root, 'playground/src/tools.html'), 'utf8');
for (const [name, src, min] of [['start page', startSrc, 6], ['tools page', toolsSrc, 5]]) {
  test(`${name}: every heading has its GitHub-style anchor, and in-page links point at ids that exist`, () => {
    // Headings with their # link, and the titles of the folded parts (<summary><h3 id=…>: no link inside a
    // summary, but the same GitHub-style id, and a link to it opens the part).
    const headings = [
      ...src.matchAll(/<(h[2-4]) id="([^"]+)" class="[^"]*\bhas-anchor\b[^"]*">([^<]+)<\/\1>/g),
      ...src.matchAll(/<summary><(h[2-4]) id="([^"]+)">([^<]+)<\/\1><\/summary>/g),
    ];
    assert.ok(headings.length >= min, `${headings.length} headings`);
    for (const [, , id, text] of headings) if (!['workbench', 'command-line', 'ai-agents', 'the-workbench', 'works-in-your-editor', 'compare-the-editors', 'try-it-in-5-minutes'].includes(id)) assert.equal(id, githubSlug(text.replace(/&amp;/g, '&')), text);
    // Every section (h2) has the anchor class, so a new one gets its link.
    for (const m of src.matchAll(/<h2\b([^>]*)>/g)) assert.match(m[1], /has-anchor/, m[0]);
    const ids = new Set([...src.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
    for (const m of src.matchAll(/href="#([^"]*)"/g)) if (m[1]) assert.ok(ids.has(m[1]), `#${m[1]}`);
  });
}

test('start page: the old anchors still lead somewhere (on the page, or forwarded to the tools page)', () => {
  // Published before the headings were renamed or moved (README, Discord): aliases on the start page, or in its
  // MOVED list, which sends them to the same id on tools/.
  const aliases = [...startSrc.matchAll(/<span id="([^"]+)" class="anchor-alias"/g)].map((m) => m[1]);
  const startIds = new Set([...startSrc.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  const moved = JSON.parse(startSrc.match(/var MOVED = (\[[^\]]*\])/)[1].replace(/'/g, '"'));
  const toolsIds = new Set([...toolsSrc.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  for (const id of moved) assert.ok(toolsIds.has(id), `moved #${id} exists on tools/`);
  for (const old of ['catches', 'see', 'install', 'help', 'what-it-catches', 'see-it', 'try-it-in-5-minutes', 'get-vscode', 'get-notepadpp', 'any-editor-with-a-language-server-lsp', 'compare-the-editors', 'works-in-your-editor', 'also-in-the-workbench', 'want-to-help-build-it', 'in-motion', 'screenshots'])
    assert.ok(aliases.includes(old) || startIds.has(old) || moved.includes(old), old);
});

test('start page as built: each heading carries its link', { skip: !fs.existsSync(builtStart) && 'not built' }, () => {
  const html = fs.readFileSync(builtStart, 'utf8');
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  for (const m of html.matchAll(/<(h[2-4]) id="([^"]+)" class="[^"]*has-anchor[^"]*">[^<]+<a class="anchor" href="#([^"]+)"/g)) assert.equal(m[3], m[2]);
  assert.equal([...html.matchAll(/class="anchor" href=/g)].length, [...startSrc.matchAll(/<h[2-4] id="[^"]+" class="[^"]*\bhas-anchor\b/g)].length);
  for (const m of html.matchAll(/href="#([^"]*)"/g)) if (m[1]) assert.ok(ids.has(m[1]), `#${m[1]}`);
});

// ---------------------------------------------------------------------------
// Links into the extension's repository, and the forms of the others

const SOURCES = [
  ...fs.readdirSync(path.join(root, 'playground/src')).filter((f) => /\.(ts|html|txt|json)$/.test(f)).map((f) => path.join('playground/src', f)),
  'playground/build.mjs',
  'README.md',
];
const found = (re) => SOURCES.flatMap((f) => [...fs.readFileSync(path.join(root, f), 'utf8').matchAll(re)].map((m) => ({ file: f, m })));

test('links into the extension repository match its files and headings', () => {
  const repo = /https:\/\/github\.com\/Snailedlt\/splitscreenme-vscode((?:\/(?:blob|tree)\/main\/[^\s"'`)<>#?]+)?)(?:#([^\s"'`)<>]+))?/g;
  const anchors = new Map();
  const anchorsOf = (rel) => {
    if (!anchors.has(rel)) anchors.set(rel, markdownAnchors(path.join(coreDir, rel)));
    return anchors.get(rel);
  };
  const seen = found(repo);
  assert.ok(seen.some(({ m }) => m[2] === 'your-own-editor-for-experienced-developers'));
  const bad = [];
  for (const { file, m } of seen) {
    const rel = m[1] ? m[1].replace(/^\/(blob|tree)\/main\//, '') : 'README.md';
    if (!fs.existsSync(path.join(coreDir, rel))) bad.push(`${file}: ${m[0]} (no ${rel})`);
    else if (m[2] && !anchorsOf(rel).has(decodeURIComponent(m[2]))) bad.push(`${file}: ${m[0]} (no heading #${m[2]} in ${rel})`);
  }
  assert.deepEqual(bad, []);
});

test('?ref= links name the tool in plain words', () => {
  const refs = found(/[?&]ref=([^\s"'`&#)<>$*]+)/g).filter(({ m }) => !m[1].startsWith('$') && !/^\{/.test(m[1]));
  assert.ok(refs.length > 0);
  for (const { file, m } of refs) assert.match(decodeURIComponent(m[1]), /^[a-z0-9][a-z0-9-]*$/, `${file}: ${m[0]}`);
});

test('release and Hub links have the expected form', () => {
  for (const { file, m } of found(/https:\/\/github\.com\/Snailedlt\/[\w-]+\/releases[^\s"'`)<>]*/g)) assert.match(m[0], /\/releases(\/latest|\/tag\/[\w.$%{}-]+|\/download\/[^\s]+)?\/?$/, `${file}: ${m[0]}`);
  for (const { file, m } of found(/https:\/\/hub\.splitscreen\.me\/[^\s"'`)<>]*/g)) assert.match(m[0], /^https:\/\/hub\.splitscreen\.me\/?(handler\/|api\/|cdn\/|$|\$\{)/, `${file}: ${m[0]}`);
});

// Every check the editors link to (core/ruledocs.ts ruleUrl → rules/<id>/) has its page in the built site.
test('rules: every check the tools link to has its page', { skip: !fs.existsSync(path.join(root, 'playground/dist/pages/rules/index.html')) && 'not built' }, () => {
  const src = fs.readFileSync(path.join(root, '..', 'splitscreenme-vscode', 'src', 'core', 'lint.ts'), 'utf8');
  const nucleus = [...src.slice(src.indexOf('export const RULES = {')).matchAll(/^  '?([a-z0-9-]+)'?: \{/gm)].map((m) => m[1]);
  const js = [...fs.readFileSync(path.join(root, '..', 'splitscreenme-vscode', 'src', 'core', 'jsrules.ts'), 'utf8').matchAll(/^  '([a-z0-9-]+)': \{ title:/gm)].map((m) => m[1]);
  const ids = [...new Set([...nucleus, ...js])];
  assert.ok(ids.length > 40, `${ids.length} rules`);
  const missing = ids.filter((id) => !fs.existsSync(path.join(root, 'playground/dist/pages/rules', id, 'index.html')));
  assert.deepEqual(missing, []);
});

test('docs: a page per name, linked from the workbench', { skip: !fs.existsSync(path.join(root, 'playground/dist/pages/docs/index.html')) && 'not built' }, () => {
  for (const p of ['', 'Context/', 'Game.Play/', 'Context.ModifySaveFile/', 'Nucleus.SaveType/']) assert.ok(fs.existsSync(path.join(root, 'playground/dist/pages/docs', p, 'index.html')), `docs/${p}`);
  const html = fs.readFileSync(path.join(root, 'playground/dist/pages/docs/Context.ModifySaveFile/index.html'), 'utf8');
  assert.match(html, /href="\.\.\/\.\.\/#docs-Context\.ModifySaveFile"/, 'Open in the workbench');
});

test('learn: the lessons page is built, and the workbench and start page link to it', { skip: !fs.existsSync(path.join(root, 'playground/dist/pages/learn/index.html')) && 'not built' }, () => {
  const html = fs.readFileSync(path.join(root, 'playground/dist/pages/learn/index.html'), 'utf8');
  assert.match(html, /<title>[^<]+<\/title>/);
  assert.ok(html.length < 2_000_000, 'the page stays small (no ESLint in it)');
  assert.match(fs.readFileSync(path.join(root, 'playground/dist/pages/start/index.html'), 'utf8'), /href="\.\.\/learn\/"/);
});

// Feedback forms: every link that fills in "Where" (area=…) names one of that form's options, so a renamed option
// can't silently leave the field empty. This repo's form for the workbench and the site; the extension's for checks
// and the editors.
test('feedback links: the Where they fill in is one of the form\'s options', () => {
  const options = (file) => {
    const y = fs.readFileSync(file, 'utf8');
    const block = y.slice(y.indexOf('id: area'), y.indexOf('validations:', y.indexOf('id: area')));
    return [...block.matchAll(/^\s+- (.+)$/gm)].map((m) => m[1].trim());
  };
  const forms = {
    'nucleuscoop-handler-testbench:feedback.yml': options(path.join(root, '.github/ISSUE_TEMPLATE/feedback.yml')),
    'splitscreenme-vscode:tester-feedback.yml': options(path.join(coreDir, '.github/ISSUE_TEMPLATE/tester-feedback.yml')),
  };
  assert.ok(forms['nucleuscoop-handler-testbench:feedback.yml'].includes('Workbench'));
  const files = ['playground/src/report.ts', 'playground/rules-pages.mjs', 'playground/src/start.html', 'playground/src/tools.html'];
  let seen = 0;
  for (const f of files) {
    const src = fs.readFileSync(path.join(root, f), 'utf8');
    // Literal links: …/<repo>/issues/new?template=<form>…area=<value>
    for (const m of src.matchAll(/github\.com\/Snailedlt\/([\w-]+)\/issues\/new\?template=([\w-]+\.yml)[^"'`\s]*?area=([^&"'`\s]+)/g)) {
      const opts = forms[`${m[1]}:${m[2]}`];
      assert.ok(opts, `${f}: a form we don't know (${m[1]} ${m[2]})`);
      assert.ok(opts.includes(decodeURIComponent(m[3].replace(/\+/g, ' '))), `${f}: area "${m[3]}" isn't an option of ${m[2]}`);
      seen++;
    }
    // Built with URLSearchParams: { template: '<form>', area: '<value>' }
    for (const m of src.matchAll(/template: '([\w-]+\.yml)'[\s\S]{0,200}?area: (?:[^'}]*?\?\? )?'([^']+)'/g)) {
      const repo = /nucleuscoop-handler-testbench/.test(src.slice(Math.max(0, m.index - 600), m.index)) || m[1] === 'feedback.yml' ? 'nucleuscoop-handler-testbench' : 'splitscreenme-vscode';
      const opts = forms[`${repo}:${m[1]}`];
      assert.ok(opts && opts.includes(m[2]), `${f}: area "${m[2]}" isn't an option of ${m[1]}`);
      seen++;
    }
  }
  assert.ok(seen >= 3, `found ${seen} links with a Where`);
});
