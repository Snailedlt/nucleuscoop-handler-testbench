// Exports the mascot scenes the workbench uses from the concept sheet (design/mascots/index.html), the single
// source of the drawings and their motion, into playground/src/mascots.gen.ts: each scene's SVG (ids prefixed)
// plus only the CSS those scenes use (rules, keyframes renamed with an "m-" prefix, the custom properties).
// Run after changing the sheet:  node tools/mascots-export.cjs   (needs Playwright with Chromium)
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SHEET = path.join(__dirname, '..', 'design', 'mascots', 'index.html');
const OUT = path.join(__dirname, '..', 'playground', 'src', 'mascots.gen.ts');
// The scenes the workbench shows, by the sheet's ids.
// Nucli is the workbench's (Duo is for the app; his idle pose is only on the start page, beside Nucli).
const IDS = ['n-sleep', 'n-ok', 'n-bad', 'n-fix', 'n-ring', 'n-spin', 'n-idle', 'n-scan', 'n-calc', 'idle'];

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file://' + SHEET);
  await p.waitForTimeout(300);
  const out = await p.evaluate((IDS) => {
    const scenes = {};
    const used = new Set();
    const svgVars = new Set();
    for (const id of IDS) {
      const src = document.querySelector(`svg.s-${id}`);
      if (!src) throw new Error('no scene ' + id);
      const svg = src.cloneNode(true);
      // Bring in the gradients and clips it refers to, then make every id unique to the scene.
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      const have = new Set([...svg.querySelectorAll('[id]')].map((e) => e.id));
      let grew = true;
      while (grew) {
        grew = false;
        for (const m of (svg.outerHTML + defs.innerHTML).matchAll(/(?:url\(#|href="#)([^)"]+)/g)) {
          if (have.has(m[1])) continue;
          have.add(m[1]);
          const e = document.getElementById(m[1]);
          if (e) { defs.appendChild(e.cloneNode(true)); grew = true; }
        }
      }
      if (defs.childNodes.length) svg.insertBefore(defs, svg.firstChild);
      let html = svg.outerHTML;
      for (const old of have) html = html.split(`"${old}"`).join(`"m${id}-${old}"`).split(`#${old})`).join(`#m${id}-${old})`).split(`"#${old}"`).join(`"#m${id}-${old}"`);
      // Only the outer <svg>'s size goes (the page sizes it); inner rects keep theirs.
      html = html.replace(/^<svg[^>]*>/, (tag) => tag.replace(/\s(width|height)="[^"]*"/g, '').replace(/\saria-label="[^"]*"/, '').replace(/\srole="img"/, ''));
      scenes[id] = html.replace(/<svg /, '<svg aria-hidden="true" ');
      for (const el of [svg, ...svg.querySelectorAll('[class]')]) for (const c of el.classList || []) used.add(c);
      for (const m of html.matchAll(/var\((--[\w-]+)/g)) svgVars.add(m[1]); // colours set in the drawing itself
    }
    // CSS: rules naming one of these scenes, and the general rules for classes inside them (none for other scenes).
    const wantSel = (sel) => {
      const scn = [...sel.matchAll(/\.s-([a-z0-9-]+)/g)].map((m) => m[1]);
      if (scn.length) return scn.some((s) => IDS.includes(s));
      // Every class it names must be in these drawings (so the app concept's rules, say, stay out).
      return sel.split(',').some((part) => { const cl = [...part.matchAll(/\.([a-zA-Z][\w-]*)/g)].map((m) => m[1]); return cl.length && cl.every((c) => used.has(c)); });
    };
    const rules = [], kf = {}, names = new Set(), vars = new Set(svgVars);
    const walk = (list, media) => {
      for (const r of list) {
        if (r.type === CSSRule.MEDIA_RULE) walk(r.cssRules, r.conditionText);
        else if (r.type === CSSRule.KEYFRAMES_RULE) kf[r.name] = r.cssText;
        else if (r.type === CSSRule.STYLE_RULE && r.selectorText && !/^(html|body|:root|\*|main|h\d|p|a|button)\b/.test(r.selectorText) && wantSel(r.selectorText)) {
          rules.push({ media, css: r.cssText });
          const an = r.style.animationName || '';
          an.split(',').map((s) => s.trim()).filter((s) => s && s !== 'none').forEach((n) => names.add(n));
          for (const m of r.cssText.matchAll(/var\((--[\w-]+)/g)) vars.add(m[1]);
        }
      }
    };
    for (const sh of document.styleSheets) { let list; try { list = sh.cssRules; } catch { continue; } walk(list, null); } // skips the web font sheet
    let css = '';
    const byMedia = {};
    for (const r of rules) (byMedia[r.media || ''] ||= []).push(r.css);
    // Nested under .masc, so none of it can reach the rest of the workbench.
    for (const [m, list] of Object.entries(byMedia)) css += m ? `.masc { @media ${m} { ${list.join(' ')} } }\n` : `.masc { ${list.join('\n')} }\n`;
    for (const n of names) if (kf[n]) { css += kf[n] + '\n'; for (const m of kf[n].matchAll(/var\((--[\w-]+)/g)) vars.add(m[1]); }
    const rs = getComputedStyle(document.documentElement);
    const v = [...vars].filter((n) => rs.getPropertyValue(n)).map((n) => `${n}: ${rs.getPropertyValue(n).trim()};`).join(' ');
    return { scenes, css, keyframes: [...names].filter((n) => kf[n]), vars: v };
  }, IDS);
  // Sampled keyframes repeat a lot (a ball waiting in line holds still for 60 samples): keep only the first and
  // last of each run of identical frames, which animates the same.
  out.css = out.css.replace(/@keyframes ([\w-]+) \{([\s\S]*?)\}\s*\}/g, (all, name, body) => {
    const fr = [...(body + '}').matchAll(/([\d.%, ]+)\{([^}]*)\}/g)].map((m) => [m[1].trim(), m[2].trim()]);
    if (fr.length < 6) return all;
    const keep = fr.filter((f, i) => i === 0 || i === fr.length - 1 || f[1] !== fr[i - 1][1] || f[1] !== fr[i + 1][1]);
    return `@keyframes ${name} { ${keep.map(([k, v]) => `${k} { ${v} }`).join(' ')} }`;
  });
  // Keyframe names get an "m-" prefix so they can't clash with the workbench's own.
  let css = out.css;
  for (const n of out.keyframes.sort((a, b) => b.length - a.length)) css = css.replace(new RegExp(`(@keyframes |animation(?:-name)?:[^;}]*?\\b)${n}\\b`, 'g'), (s) => s.replace(new RegExp(`\\b${n}$`), `m-${n}`));
  css = (`.masc { ${out.vars} }\n` + css).replace(/\s*\n\s*/g, ' ').replace(/\s{2,}/g, ' ');
  const ts = `// Generated by tools/mascots-export.cjs from design/mascots/index.html. Don't edit: change the sheet and re-run it.
export const MASCOT_SVG: Record<string, string> = ${JSON.stringify(out.scenes, null, 1)};
export const MASCOT_CSS = ${JSON.stringify(css)};
`;
  fs.writeFileSync(OUT, ts);
  console.log(`${OUT}: ${Object.keys(out.scenes).length} scenes, ${(ts.length / 1024).toFixed(0)} KB, ${out.keyframes.length} keyframes`);
  await b.close();
})();
