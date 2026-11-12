# AGENTS.md

Guidance for AI coding agents working on this repository: the browser workbench (`playground/`, deployed to GitHub Pages) and the Jint testbench (`src/`, `probes/`). The linter, Try it and the API model come from [splitscreenme-vscode](https://github.com/Snailedlt/splitscreenme-vscode) (`src/core`); its AGENTS.md has the facts about Nucleus they rely on.

## Who it's for: a tool for every level

**Priorities, in order:** 1. a great tool for experienced developers and handler authors (correct checks, speed, keyboard, the core features); 2. easy to understand and use for newcomers, without getting in the way of 1.

The tools serve experienced developers, handler authors, Nucleus Co-op experts and complete newcomers alike. Welcome beginners without making the work slower or more cluttered for anyone else. (The model is Warcraft 3's editor: clickable, choices from lists, one-button testing, and a way into real code.)

- **One code underneath.** Every view (Code, Form, Blocks, pickers) edits the real handler code, so nobody is locked into a beginner mode and people move up a tier by looking at the code.
- **Two ways to work.** Code is for people who write code. Form and Blocks belong together as the visual editor: plain-language names next to (or instead of) the API names, tips and docs right where each option is, values picked from lists. Each can be shown or hidden; most developers never open the visual editor, and most newcomers end up in Code.
- **Help on request, not on screen.** Markers, hints, plain-language labels and pickers show on hover, tap or a key (Ctrl+Space, Alt+Enter), never permanently in the code.
- **Keyboard first for experienced users.** Everything is reachable from the keyboard and the command palette; no wizard is ever required.
- **The first-run choice only sets defaults.** "Guide me" turns on the visual editor, tips and guided help; "I write code" starts compact. Every part can be switched in Settings.
- **The tool teaches.** Our community is small and won't write many guides, so the explanations live in the tool: plain-language docs on every option, "why" in every problem, examples from real Hub handlers, help that starts from the symptom ("my game pauses when it loses focus").
- **Desktop first.** Over 90% of people write handlers on a desktop or laptop: design and test for that (mouse, keyboard, a wide screen). Phones are supported but not tailored: nothing broken, cut off or untappable, checked by the smoke test's phone checks. No phone-only features, no phone layouts driving a design, no manual phone testing or phone screenshots for every change.
- **The check for every new feature:** does it add anything on screen for someone who didn't ask for it? If so, put it behind a hover, tap or key, or a setting.

## Commands

```bash
cd playground && npm ci
node build.mjs --preview          # dist/: the site (dist/pages), the single-file workbench; --preview shows "Unreleased" and makes links relative + noindex
npm test                          # unit tests of the pure modules and every published link (tools/workbench-units.test.mjs, tools/links.test.mjs; CORE_DIR=<extension checkout>)
node smoke.mjs                    # browser smoke test of dist/pages (Playwright + axe-core); pages.yml runs it before every deploy
node sim-parity.mjs               # Try it against the real Jint results in probes/expected.txt
node ../tools/screenshots.cjs     # retake the workbench screenshots, light and dark (serve dist/pages on :8765 first)
```

The Pages build uses splitscreenme-vscode's `main`: merge that first when the workbench needs new core code.

## Where things are (playground/src)

- Looks are data: `themes.json` (`looks`: www, v3, mac, alpha8; `codeThemes`). `themekit.ts` (no DOM; also run by `build.mjs`) resolves a look's `base` and derived tokens and writes the CSS that replaces `/*THEMES*/` in `page.html`. Look-specific rules beyond tokens (Mac windows, alpha 8's flat buttons) are in `page.html` under `[data-site="…"]`.
- `customtheme.ts`: theme files (JSON) people add, validated by `parseTheme` (known tokens only, no `url()`), the list in localStorage, code colours (`pickCodeTheme`). `settings-ui.ts` draws the Theme tab's cards.
- `keyboard.ts`: on-screen keyboard height for every text field (`html.kb-up`, `--kb`, `--vvh`).
- `app.ts` wires the page; its parts with their own module: `links.ts` (what a `#link` opens, pure), `docs-ui.ts` + `docsgroups.ts` (Docs), `tryit-ui.ts` (Try it, Test all), `aifix-ui.ts` (Fix with AI, Fix all), `fileopen-ui.ts`, `savefile.ts`, `dom.ts` (`$`, `esc`, `md`, `narrow()`). New parts get an `initX(deps)` with what they need passed in, not top-level code that depends on declaration order.
- `toast.ts`: the toast stack (swipe to dismiss) and the code-pane notice.
- Hub list: `build.mjs --hub-data <dir>` reads the data branch's mirror (`hub/<id>.js`, `hub/packages.json`, `covers/`), which `tools/hub-mirror.mjs` keeps (scheduled in `hub-sync.yml`, only new versions, one request at a time). Without it the build uses the 40-handler snapshot. The single-file build inlines only the top 40 covers.
- Hub package files: `tools/hub-files.mjs` (test: `node tools/hub-files.test.mjs`) turns a .nc into `{ files: [{ name, size, b64? }] }`, everything but the root handler.js; content for files up to 256 KB, 1 MB per handler, the rest name and size only. The mirror downloads each package once per version (`HUB_MIRROR_PKG_MAX`, default 60 a run, spreads the backfill over days) into `hub/<id>.files.json` and `files: <count>` in `packages.json`; the snapshot build caches them in `playground/.cache/hub-files/`. The site fetches `hub/<id>.files.json` when a handler opens; the single file inlines them for the top 40 (`filesData`, small text files only). In the workbench a file without content is a placeholder (`PackageFile.remote`: size and the Hub page): listed with a Hub badge, left out of Save (which says so), not checked by pkgcheck.

## Releasing

1. Every user-visible change adds a line under `## Unreleased` in `CHANGELOG.md` (format in the comment at its top). Every new workbench feature also gets a tip (`playground/src/tips.ts`).
2. **At the full (non-beta) release:** do the issues labelled `full release` (README, AGENTS.md, SEO and screenshots: #9), delete `playground/previous.json` (testers' compare-with-the-previous-version build at `/previous/`) and set `BETA` to false in `playground/src/testplan.ts` (that removes the "Help test the beta" guide and its links), or rewrite its plan. Until then, add new features that need testing to it.
3. Before a beta release, point `playground/previous.json` at what is live now (`bench`: `main`'s commit, `core`: the `"core"` in the live page's BUILD, `label`: its extension version and date, e.g. `v0.5.0 - 2026-11-08`, shown in the bar on top of it), so `/previous/` is the release before this one. Then to release: rename `## Unreleased` to `## <yyyy-mm-dd>` (add ` HH:MM` UTC for a second release that day), merge into `main`. `pages.yml` builds, smoke-tests and deploys.
4. **Announce it.** A deploy with a new dated section publishes it as a GitHub release (tag `workbench-<date>`, the section as notes, `tools/release-post.mjs --notes`) and posts its notes to Discord (`tools/release-post.mjs`, `tools/announce.mjs`, the `DISCORD_WEBHOOKS` secret: one webhook URL per line), once; the run summary has the text either way. Ship the extension's release notes too when both change: its Release workflow posts its own.

## Conventions

- Show changes in the preview artifact or the test address first; go live only when the maintainer says so.
- When the maintainer has to run a workflow or change a setting, give the direct link and the inputs. Allowlist hosts and environment variables go in a code block, one per line.
- **Links live for ever.** Addresses end up in Discord posts, READMEs, bookmarks and old releases, so every link we've published keeps working after any redesign: keep them readable and generic (`#docs-Context.ModifySaveFile`, `#hub-<id>`, `#what-it-catches`, not internal ids or tab indexes). When one changes, the old one leads to the new place and says so once: add it to `MOVED_LINKS` in `playground/src/links.ts` (workbench `#…` links; `tools/links.test.mjs` checks every one), keep the old `id` as an alias (start page anchors: `<span id="install" class="anchor-alias">`), or leave a small page at the old path that says what moved and links on (site pages). For something removed, link to a note saying it's gone and what replaced it. An unknown link never dead-ends: it says what it was and offers the way on.
- **Every code block is syntax highlighted**: docs, hovers, hints, suggestion docs, Check, Try it, the debugger, What's new, the Files panel, the start page. Use `codehl.ts` (`hlHtml` for rendered docs, `hlCode(src, mode)` for raw code, `modeFor(name)` for a file by type); plain text (a .txt) stays plain. Inline code that is clearly code is coloured too.
- Screenshots come in light and dark (`<name>-light.png`, `<name>-dark.png`); pages show the viewer's theme.
- Keep the Hub's load low: the Hub list comes from our daily index (`data` branch), packages once per version.
