# Contributing

Thanks for helping. Handler authors know Nucleus Co-op better than any tool, so most of the useful help needs no code at all.

This repository has the browser workbench, Learn, the docs and check pages, the start and tools pages, and the Jint testbench that pins down how Nucleus' script engine behaves. The checks themselves, the VS Code extension, `ncdev` and the Notepad++ plugin live in [splitscreenme-vscode](https://github.com/Snailedlt/splitscreenme-vscode) ([its guide](https://github.com/Snailedlt/splitscreenme-vscode/blob/main/CONTRIBUTING.md)).

## Without code

- **Tell us what's wrong.** Something broken, confusing or missing in the workbench, Learn or the pages: [open an issue](https://github.com/Snailedlt/nucleuscoop-handler-testbench/issues/new). A wrong or missing check goes to the [extension's feedback form](https://github.com/Snailedlt/splitscreenme-vscode/issues/new?template=tester-feedback.yml) (the checks are shared).
- **Vote on the docs.** Every docs page has 👍/👎: it tells us which docs need work. The workbench's *Help check AI-written docs* lists the ones no person has checked yet.
- **Improve Learn.** If a lesson confused you, say which one and where: that's the most useful feedback the lessons get.

## With code

You need Git and Node.js 22 or newer, and a clone of [splitscreenme-vscode](https://github.com/Snailedlt/splitscreenme-vscode) next to this one (the workbench uses its checks).

```bash
cd playground && npm ci
node build.mjs --preview   # the site in dist/pages
npm test                   # unit tests and every published link
node smoke.mjs             # the site in a real browser, light and dark, with accessibility checks
```

- [AGENTS.md](AGENTS.md) describes where things are and the conventions. It's written for AI agents, and it's the best map for people too.
- **Jint probes** (`probes/*.js`) each pin down one behaviour of Nucleus' engine (Jint 2.11.58), and `probes/expected.txt` holds the reviewed results. Running them needs Mono: `./setup.sh`, then `./test-probes.sh`. A new probe is welcome whenever a check or Try it relies on how Jint behaves.
- **Links live for ever:** an address we've published keeps working after a redesign (see AGENTS.md).
- Every change people will notice gets a line in `CHANGELOG.md` under `## Unreleased`.

Open a pull request against `main`. Small and focused is easiest to review.
