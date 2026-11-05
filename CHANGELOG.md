# Changelog

The browser workbench (<https://snailedlt.github.io/nucleuscoop-handler-testbench/>) updates whenever `main` changes, so its notes are dated instead of versioned. Add a line under **Unreleased** with each user-visible change, starting with a **short summary** in bold; when it goes live, the section gets that day's date.

## Unreleased

- **Loads about half as much.** A visit downloads about 235 KB instead of 433 KB: Hub examples load when you open one, and the checker is no longer sent twice.
- **The workbench as one offline file.** `workbench.html` in the extension's releases (or `nucleus workbench`) is the whole workbench in a single file, to open locally or host yourself.
- **Previous tip.** The tip bar has ‹ and › to go back and forth.
- **`llms.txt` for AI agents.** The site lists where agents find the MCP server, the agent skill and the API reference, and asks them to run the tools themselves instead of using the hosted workbench.

## 2026-11-05

- **Lines list beside the code.** Every name a handler can use, click to insert. It shows what the handler already sets and jumps there instead of adding a second line, dims names that don't work where the cursor is, inserts whole lines and suggests values, filters by type and text (shorthand like `kmd` finds KillMutexDelay), groups by object or topic, and sorts by how many of the 600 Hub handlers use each name. Its gear has the list settings, niche ones under Advanced. (Idea: messenils.)
- **Tips under the code.** Loading-screen-style tips, plus a heads-up when the code makes one relevant (each shown once). Can be turned off.
- **Settings.** The gear in the header: theme, text size, line wrap, symbol keys, tips and the Lines list; Advanced mode and the developer bar under Advanced.
- **Works on phones.** A slim header with a ⋯ menu, Lines full screen, wrapped lines and a row of symbol keys above the on-screen keyboard.
- **Intro page for testers.** <https://snailedlt.github.io/nucleuscoop-handler-testbench/start/>, with screenshots, the install guide and a download link that always points to the newest release.
- **Fixed: the Lines scrollbar hid the values on the right** on Windows. (Reported by Horah.)
- **Fixed two false flags** found by checking all 600 Hub handlers: a syntax error on `let x` followed by `var x`, and a Proto Input warning on 11 handlers.

## 2026-11-02

- **The workbench on GitHub Pages**, rebuilt daily with the newest verified Hub handlers.
- **Share links.** Copy link puts the handler (or the selected lines) in the address.
- **splitscreen.me look**, light and dark.
- **Nightly check.** Every verified Hub handler runs in the real Jint engine and is compared with Try it.

## 2026-11-01

- **First version.** Check a handler, fix it automatically, and Try it: what Nucleus sets up for each player.
