// C# member parser, extracted from splitscreenme-vscode/scripts/generate-api.mjs.
import fs from "node:fs";
import path from "node:path";
const read = (...p) => fs.readFileSync(path.join(...p), "utf8").replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
// C# parsing
// ---------------------------------------------------------------------------

/** Find `class Name` / `enum Name` and return the text between its braces. */
function findTypeBody(text, kind, name) {
  const re = new RegExp(`\\b${kind}\\s+${name}\\b[^{;]*\\{`, 'g');
  const m = re.exec(text);
  if (!m) throw new Error(`${kind} ${name} not found`);
  const start = m.index + m[0].length;
  const end = matchBrace(text, start - 1);
  return text.slice(start, end);
}

/** Given index of `{`, return index of matching `}` (skips strings, chars and comments). */
function matchBrace(text, open) {
  let depth = 0;
  for (let i = open; i < text.length; i++) {
    const skip = skipNonCode(text, i);
    if (skip !== i) {
      i = skip - 1;
      continue;
    }
    const c = text[i];
    if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return i;
  }
  throw new Error('unbalanced braces');
}

/** If a string/char/comment starts at i, return the index right after it; else i. */
function skipNonCode(text, i) {
  const c = text[i];
  const n = text[i + 1];
  if (c === '/' && n === '/') {
    const e = text.indexOf('\n', i);
    return e < 0 ? text.length : e;
  }
  if (c === '/' && n === '*') {
    const e = text.indexOf('*/', i + 2);
    return e < 0 ? text.length : e + 2;
  }
  let j = i;
  let verbatim = false;
  while (text[j] === '$' || text[j] === '@') {
    if (text[j] === '@') verbatim = true;
    j++;
  }
  if (text[j] === '"') {
    j++;
    while (j < text.length) {
      if (verbatim && text[j] === '"' && text[j + 1] === '"') j += 2;
      else if (!verbatim && text[j] === '\\') j += 2;
      else if (text[j] === '"') return j + 1;
      else j++;
    }
    return j;
  }
  if (j === i && c === "'") {
    j++;
    while (j < text.length && text[j] !== "'") j += text[j] === '\\' ? 2 : 1;
    return j + 1;
  }
  return i;
}

const xmlDoc = (lines) =>
  lines
    .join(' ')
    .replace(/<\/?summary>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Split a class body into depth-0 member declarations, keeping /// docs and
 * same-line trailing // comments.
 */
function members(body) {
  const out = [];
  let buf = '';
  let docLines = [];
  for (let i = 0; i < body.length; i++) {
    const c = body[i];
    if (c === '/' && body[i + 1] === '/') {
      const e = body.indexOf('\n', i);
      const end = e < 0 ? body.length : e;
      const comment = body.slice(i, end);
      if (comment.startsWith('///')) docLines.push(comment.slice(3));
      else if (!buf.trim() && out.length && out[out.length - 1].sameLine) {
        out[out.length - 1].trailing = comment.slice(2).trim();
      }
      i = end - 1;
      continue;
    }
    if (c === '\n' && out.length) out[out.length - 1].sameLine = false;
    const skip = skipNonCode(body, i);
    if (skip !== i) {
      buf += body.slice(i, skip);
      i = skip - 1;
      continue;
    }
    if (c === ';') {
      if (buf.trim()) out.push({ decl: norm(buf), doc: xmlDoc(docLines), sameLine: true, block: false });
      buf = '';
      docLines = [];
    } else if (c === '{') {
      const close = matchBrace(body, i);
      // `Type Name { get; set; } = init;` / `Name => ...` handled by decl text
      if (buf.trim()) {
        const isProp = !/\(/.test(buf) && !/\b(class|enum|struct|interface)\b/.test(buf);
        out.push({ decl: norm(buf), doc: xmlDoc(docLines), sameLine: true, block: true, isProp });
      }
      buf = '';
      docLines = [];
      i = close;
      // swallow optional `= init;` after auto-property
      const rest = body.slice(i + 1).match(/^\s*=[^;]*;/);
      if (rest) i += rest[0].length;
    } else {
      buf += c;
    }
  }
  return out.filter((m) => /^\s*public\b/.test(m.decl));
}

const norm = (s) => s.replace(/\[[A-Za-z]+(\([^)]*\))?\]/g, '').replace(/\s+/g, ' ').trim();

const TYPE = String.raw`[\w.]+(?:<[^<>()=;]*(?:<[^<>()=;]*>)?[^<>()=;]*>)?(?:\[\])?\??`;
const MOD = String.raw`(?:(?:static|readonly|extern|virtual|override|new|unsafe|async|const)\s+)*`;

function classify(m, className) {
  const d = m.decl;
  if (/\b(class|enum|struct|interface|delegate|event)\b/.test(d.split('(')[0])) return null;
  const isStatic = /\bstatic\b/.test(d.split('(')[0]);
  let r;
  // methods (incl. extern), but not constructors
  if ((r = d.match(new RegExp(`^public\\s+${MOD}(${TYPE})\\s+(\\w+)\\s*\\(([\\s\\S]*)\\)\\s*(?:=>[\\s\\S]*)?$`)))) {
    if (r[1] === 'override') return null;
    return { kind: 'method', csType: r[1], name: r[2], params: parseParams(r[3]), isStatic };
  }
  if (new RegExp(`^public\\s+${className}\\s*\\(`).test(d)) return null;
  // expression-bodied property
  if ((r = d.match(new RegExp(`^public\\s+${MOD}(${TYPE})\\s+(\\w+)\\s*=>`)))) {
    return { kind: 'property', csType: r[1], name: r[2], readonly: true, isStatic };
  }
  // block property
  if (m.block && m.isProp && (r = d.match(new RegExp(`^public\\s+${MOD}(${TYPE})\\s+(\\w+)$`)))) {
    return { kind: 'property', csType: r[1], name: r[2], readonly: false, isStatic };
  }
  // field
  if ((r = d.match(new RegExp(`^public\\s+${MOD}(${TYPE})\\s+(\\w+)\\s*(?:=\\s*([\\s\\S]+))?$`)))) {
    return {
      kind: 'field',
      csType: r[1],
      name: r[2],
      default: r[3]?.trim(),
      readonly: /\b(readonly|const)\b/.test(d),
      isStatic,
    };
  }
  return null;
}

function parseParams(s) {
  s = s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '').trim();
  if (!s) return [];
  const parts = [];
  let depth = 0;
  let cur = '';
  for (const c of s) {
    if (c === '<' || c === '(') depth++;
    if (c === '>' || c === ')') depth--;
    if (c === ',' && depth === 0) {
      parts.push(cur);
      cur = '';
    } else cur += c;
  }
  parts.push(cur);
  return parts.map((p) => {
    p = p.replace(/\/\*.*?\*\//g, '').trim();
    const r = p.match(new RegExp(`^(params\\s+|out\\s+|ref\\s+)?(${TYPE})\\s+(\\w+)(?:\\s*=\\s*(.+))?$`));
    if (!r) return { name: p, csType: 'object' };
    return {
      name: r[3],
      csType: r[2],
      ...(r[1]?.trim() === 'params' ? { rest: true } : {}),
      ...(r[1]?.trim() === 'out' ? { out: true } : {}),
      ...(r[4] !== undefined ? { optional: true, default: r[4].trim() } : {}),
    };
  });
}

function parseEnum(text, name) {
  const body = findTypeBody(text, 'enum', name);
  const values = {};
  let next = 0;
  for (const raw of body.replace(/\/\/.*$/gm, '').split(',')) {
    const t = raw.trim();
    if (!t) continue;
    const [k, v] = t.split('=').map((x) => x.trim());
    let val = next;
    if (v !== undefined) {
      if (/^-?\d+$/.test(v)) val = Number(v);
      else if (/^0x[0-9a-f]+$/i.test(v)) val = parseInt(v, 16);
      else if (values[v] !== undefined) val = values[v];
    }
    values[k] = val;
    next = val + 1;
  }
  return values;
}

function parseClass(file, className) {
  const text = read(gaming, file);
  return members(findTypeBody(text, 'class', className))
    .map((m) => {
      const c = classify(m, className);
      if (!c) return null;
      const doc = [m.doc, m.trailing && !/^TODO/i.test(m.trailing) ? m.trailing : ''].filter(Boolean).join(' ').trim();
      return { ...c, ...(doc ? { sourceDoc: doc } : {}) };
    })
    .filter(Boolean);
}


export { findTypeBody, members, classify, read };
