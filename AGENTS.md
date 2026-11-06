# AGENTS.md

Guidance for AI coding agents working on this repository: the browser workbench (`playground/`, deployed to GitHub Pages) and the Jint testbench (`src/`, `probes/`). The linter, Try it and the API model come from [splitscreenme-vscode](https://github.com/Snailedlt/splitscreenme-vscode) (`src/core`); its AGENTS.md has the facts about Nucleus they rely on.

## Commands

```bash
cd playground && npm ci
node build.mjs --preview          # dist/: the site (dist/pages), the single-file workbench; --preview shows "Unreleased" and makes links relative + noindex
node smoke.mjs                    # browser smoke test of dist/pages (Playwright + axe-core); pages.yml runs it before every deploy
node sim-parity.mjs               # Try it against the real Jint results in probes/expected.txt
node ../tools/screenshots.cjs     # retake the workbench screenshots, light and dark (serve dist/pages on :8765 first)
```

The Pages build uses splitscreenme-vscode's `main`: merge that first when the workbench needs new core code.

## Where things are (playground/src)

- Looks are data: `themes.json` (`looks`: www, v3, mac, alpha8; `codeThemes`). `themekit.ts` (no DOM; also run by `build.mjs`) resolves a look's `base` and derived tokens and writes the CSS that replaces `/*THEMES*/` in `page.html`. Look-specific rules beyond tokens (Mac windows, alpha 8's flat buttons) are in `page.html` under `[data-site="…"]`.
- `customtheme.ts`: theme files (JSON) people add, validated by `parseTheme` (known tokens only, no `url()`), the list in localStorage, code colours (`pickCodeTheme`). `settings-ui.ts` draws the Theme tab's cards.
- `keyboard.ts`: on-screen keyboard height for every text field (`html.kb-up`, `--kb`, `--vvh`).
- `toast.ts`: the toast stack (swipe to dismiss) and the code-pane notice.
- Hub list: `build.mjs --hub-data <dir>` reads the data branch's mirror (`hub/<id>.js`, `hub/packages.json`, `covers/`), which `tools/hub-mirror.mjs` keeps (scheduled in `hub-sync.yml`, only new versions, one request at a time). Without it the build uses the 40-handler snapshot. The single-file build inlines only the top 40 covers.

## Releasing

1. Every user-visible change adds a line under `## Unreleased` in `CHANGELOG.md` (format in the comment at its top). Every new workbench feature also gets a tip (`playground/src/tips.ts`).
2. To release: rename `## Unreleased` to `## <yyyy-mm-dd>` (add ` HH:MM` UTC for a second release that day), merge into `main`. `pages.yml` builds, smoke-tests and deploys.
3. **Announce it.** A deploy with a new dated section posts its notes to Discord (`tools/release-post.mjs`, `tools/announce.mjs`, the `DISCORD_WEBHOOKS` secret: one webhook URL per line), once; the run summary has the text either way. Ship the extension's release notes too when both change: its Release workflow posts its own.

## Conventions

- Show changes in the preview artifact or the test address first; go live only when the maintainer says so.
- When the maintainer has to run a workflow or change a setting, give the direct link and the inputs. Allowlist hosts and environment variables go in a code block, one per line.
- Screenshots come in light and dark (`<name>-light.png`, `<name>-dark.png`); pages show the viewer's theme.
- Keep the Hub's load low: the Hub list comes from our daily index (`data` branch), packages once per version.
