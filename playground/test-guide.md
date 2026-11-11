# Testing 0.6.0 before release

About 2¼–3 hours for everything. Short on time? Do section 0 and the parts marked ⭐ (about an hour): nothing automated can reach them.

Tick the boxes as you go. Anything odd: write it down with the step number (a screenshot helps).

---

## 0. Run the site and get the tools from it (15 min)

You run the site on your PC, then download the VS Code extension and `ncdev.exe` from its tools page, like a user would. The tools page's download links point to the **test build**: the real files, built by GitHub from the branch going into this release ([the test-build pre-release](https://github.com/Snailedlt/nucleuscoop-handler-testbench/releases/tag/test-build), in the testbench repo so no installed tool ever offers it to anyone).

You need [Git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/) 22 or newer. In a terminal, in a folder of your choice (both repos must sit side by side):

```bash
git clone -b claude/brave-thompson-maiubs https://github.com/Snailedlt/splitscreenme-vscode
```

```bash
git clone -b preview-ux https://github.com/Snailedlt/nucleuscoop-handler-testbench
```

```bash
cd splitscreenme-vscode && npm ci && cd ..
```

```bash
cd nucleuscoop-handler-testbench/playground && npm ci && node build.mjs --preview --test-build
```

The build takes a minute or two and ends by printing which test build its tools page links to. (If it stops with `GitHub API 403`, GitHub's hourly limit for unsigned-in requests from your address is used up: wait a bit and run it again.) Then serve the site (the pages link to each other, which doesn't work from `file://`):

```bash
npx --yes http-server dist/pages -p 8080 -c-1
```

Open http://localhost:8080/ (the workbench). The other pages are `/start/` (home), `/tools/`, `/learn/`, `/docs/` and `/rules/`. Nothing you do on this site is counted: a preview build has the anonymous counts switched off.

This guide is on the local site too, at http://localhost:8080/test-guide/ (only in a `--test-build` build, linked from nowhere): mark each step ✓ or ✗ there, add a note to a ✗, and **Copy the problems** gives you a list to paste to me. The marks stay in that browser; open the guide in a normal window, not the private one.

**Get the tools, as a user would** (http://localhost:8080/tools/, *Get the tools* in the header):

- [ ] 0.1 The VS Code card's download link gives `splitscreenme-vscode-v0.6.0-test.vsix` and says it's the test build. In VS Code: Ctrl+Shift+P › *Extensions: Install from VSIX…* › that file. Reload when asked.
- [ ] 0.2 The Notepad++ card's `ncdev.exe` link downloads it straight away (no detour through GitHub's release list). Windows may warn that it's unrecognised (it isn't signed): *More info › Run anyway*.
- [ ] 0.3 Close Notepad++. Follow the card's next step: in a terminal **as administrator**, in the folder with `ncdev.exe`, run `.\ncdev.exe setup notepad++`. Start Notepad++: *Plugins › Nucleus Co-op handlers* is there.
- [ ] 0.4 The steps on both cards read right for a newcomer, in that order.

To test a newer build later: run the [Test build workflow](https://github.com/Snailedlt/nucleuscoop-handler-testbench/actions/workflows/test-build.yml) again (after the testbench is merged it has a *Run workflow* button; until then, re-run its last run), then `git pull` in both folders and run the build command again.

---

## 1. Workbench (30–40 min)

Open http://localhost:8080/ in a **private window**, so it starts as a first visit.

**First visit**

- [ ] 1.1 The home page opens (*Welcome to the workbench*): what a handler is, four steps, and *New handler…*, *Open a handler or example…* and *Learn*. No handler is open yet. *New handler…* makes one from the template.
- [ ] 1.2 *Help test this beta* asks two questions (how much you code, how well you know handlers), then shows what to test. Close it with Esc; the footer link *Help test this beta* brings it back.

**Tabs**

- [ ] 1.3 Open an example (Ctrl+P › "mistakes") and type something. Its tab shows a dot instead of the × at once; hovering the tab shows the × again. (A brand-new handler never gets the dot: there's nothing to compare it with.)
- [ ] 1.4 Open a second handler (Ctrl+P › any example). Close both tabs with their ×.
- [ ] 1.5 With nothing open you see the home page again (*No handler open*), now with *Reopen*, which brings the last closed handler back. With a handler open, *Getting started* in the footer shows the home page over it; Esc goes back to the code. There's no *New here?* box above the code any more.

**Explain this line (new)** ⭐

- [ ] 1.6 Put the cursor on `Game.Play = function () {` and press **Ctrl+Alt+E**. A card says what the line does ("once for each player…").
- [ ] 1.7 Do the same on a plain setting (e.g. `Game.MaxPlayers = 4;`), on a comment, and on an empty line. The empty line gives a short "nothing to explain" note.
- [ ] 1.8 Ctrl+Shift+P › type "explain" › *Explain this line* works the same way.
- [ ] 1.9 Hover any API name, also on a line with a problem: the card has *Explain this line* at the bottom. Click it. (Hovering a problem marker in the gutter shows no link.)
- [ ] 1.10 *(Only if you have AI set up in Settings › AI.)* The explanation card shows *Explain with AI*. Click it: a longer answer appears, labelled "AI-written by …".
- [ ] 1.11 The explanation stays while you move the mouse over the code, and closes with Esc, a click elsewhere, typing or scrolling.

**Docs as pages (new)**

- [ ] 1.12 Open the Docs tab, search for an option and open it (with several results, click its name first), then click *Open as a page*. The docs page opens in a new tab.

**Core features (regression check)**

- [ ] 1.13 Ctrl+P › open a few Hub handlers. Any problems are underlined and hovering one explains it (many Hub handlers have none: then Check says so).
- [ ] 1.14 In "Handler with common mistakes", put the cursor anywhere on a line with a problem (also on a name, like `Game`) and press Ctrl+.: the line's problems and their fixes; one applies cleanly.
- [ ] 1.15 *Fix problems automatically* (palette) applies every safe fix at once, says how many, and offers *Undo* and *What changed*.
- [ ] 1.16 Ctrl+F5 (Try it): change players 1–4, keyboard on/off. The wording for 1 player reads "Nucleus would set up the one player".
- [ ] 1.17 Ctrl+; then A (Test all) runs through the combinations without errors.
- [ ] 1.18 Shift+Alt+F formats; Ctrl+Z undoes it.
- [ ] 1.19 Ctrl+Shift+S › save as *For Nucleus Co-op (.zip)* and *Package for the Hub (.nc)*. Both files download.
- [ ] 1.20 Switch light/dark (Settings › Theme). Everything stays readable.

---

## 2. Home, tools and the header (8 min)

Open http://localhost:8080/start/ (the home page).

- [ ] 2.1 The header on every page (home, tools, Docs, a check's page): the logo goes home, then *Workbench*, *Learn*, *Docs*, *Get the tools*. Each goes to the right place, and the current one is marked. Learn's bar has the same links; the workbench has *Home*.
- [ ] 2.2 The home page sells it: what a handler is, what it catches, the screenshots (matching your theme), the editors (with their videos), then the workbench (with its video). *Open the workbench*, *Get the tools* and *Learn* go to the right places.
- [ ] 2.3 http://localhost:8080/tools/ has every tool: workbench, VS Code, Notepad++, other editors (click one: its setup opens), the command line and AI agents, and the table comparing them. Its download links are the test build.
- [ ] 2.4 An old link still works: http://localhost:8080/start/#get-vscode lands on the VS Code part of the tools page.
- [ ] 2.5 Docs' list on the left has two sections, *Handler API* and *Checks*. A check's page (open one from the list) shows the same list with that check marked.

---

## 3. Learn (20–30 min)

Open http://localhost:8080/learn/ in a **private window**.

**Layout**

- [ ] 3.1 The first screen is the full-page intro ("Why a handler?"). Click *Start a second copy*, then the next buttons, to the end: the list of what Nucleus does shows "Lesson N" labels, not links. *Start ›* goes to lesson 2.
- [ ] 3.2 The lessons drawer is on the left (on a wide screen it is open by default). Sections fold open and closed. Close the drawer and reload: it stays closed.

**Go through all 17 lessons**, in order:

1. Why a handler? · 2. Get ready · 3. Give it a name · 4. Point it at the game · 5. A folder for each player · 6. A settings folder for each player · 7. Steam · 8. The windows · 9. Every window in focus · 10. One copy at a time · 11. Which controllers · 12. One controller each · 13. Files Nucleus brings · 14. A note for the players · 15. Test it in Nucleus Co-op · 16. Why the windows were full screen · 17. Test it again

On each lesson:

- [ ] 3.3 The text is clear to a beginner. Note anything confusing, with the lesson number.
- [ ] 3.4 *Show me* (between *Back* and *Next*) fills in the answer, with the new lines marked; it then turns into *Reset*.
- [ ] 3.5 *Check* never shows an error for something the lessons haven't reached yet. When all is fine it says "✓ Nothing wrong so far."
- [ ] 3.6 Code blocks in the text: added lines green, removed lines red.
- [ ] 3.7 In the editor, suggestions appear as you type (and with Ctrl+Space); hovering a name shows its docs.
- [ ] 3.8 "Why?" on a problem opens the explanation in place, without leaving the page.

**Specific lessons**

- [ ] 3.9 Lesson 2 (Get ready): one line with the link to install Nucleus Co-op, plus the footnote.
- [ ] 3.10 Lesson 16: *Try it* appears here for the first time. Change the players (1–4) and the keyboard checkbox; the results change.
- [ ] 3.11 Lesson 17: the comparison with the Hub handler shows what was dropped (−) and added (+), with "…" for unchanged parts, and the reasons.
- [ ] 3.12 Download the finished handler (the zip in lesson 15 or 17). Keep it for step 4. (Lesson 4's "Try it in Nucleus Co-op now" also gives a zip now, ready to drag onto Nucleus.)
- [ ] 3.13 In lesson 4, write `Game.MaxPlayers = "20";` (in quotes): the task box says to change it, not that the line is missing.

---

## 4. Learn's handler in Nucleus Co-op (15–20 min) ⭐

You need Boring Man (Steam) and Nucleus Co-op.

- [ ] 4.1 Put the downloaded handler into Nucleus Co-op (drag the zip onto Nucleus Co-op, or extract it into its `handlers` folder).
- [ ] 4.2 Nucleus Co-op finds Boring Man (Search disks, or add the game's .exe).
- [ ] 4.3 Start with 2 players, both on controllers. Both windows open, side by side, the right size (compare with the Hub's Boring Man handler).
- [ ] 4.4 Each controller moves only its own player.
- [ ] 4.5 Both windows keep reacting when you click between them (focus).
- [ ] 4.6 Try 1 controller + keyboard: the keyboard player works.
- [ ] 4.7 Close the session; start it again. It still works (each player's settings were kept).

If anything differs from the Hub handler, that's a bug in the lessons, not in Nucleus Co-op: note the step.

---

## 5. Docs pages (10 min)

Open http://localhost:8080/docs/Game.Play/.

- [ ] 5.1 The site header is at the top; the drawer on the left lists every group, the current one open and this page marked.
- [ ] 5.2 Click a few entries in the drawer. The drawer keeps its place; the page doesn't jump.
- [ ] 5.3 Type "save file" in the filter: `Context.ModifySaveFile` is the first hit. Enter opens it.
- [ ] 5.4 At the bottom: 👍/👎 work (click again to take it back), and *Tell us what's wrong* opens the doc review form on GitHub.
- [ ] 5.5 *Open in the workbench* opens that entry in the workbench.
- [ ] 5.6 Make the window narrow (phone width): the drawer becomes a "☰ All docs" button.
- [ ] 5.7 Open http://localhost:8080/rules/ and one check's page: the header is there, the examples read right.

---

## 6. VS Code (20–30 min)

Open a folder with a handler, e.g. the one from Learn, or Ctrl+Shift+P › *Nucleus: Browse Handlers on the Hub…*.

**Explain this line (new)** ⭐

- [ ] 6.1 Cursor on a line, **Ctrl+Alt+E**: the explanation shows as a hover at the cursor.
- [ ] 6.2 Right-click a line › *Explain This Line*: the explanation for that line. (VS Code's hovers don't carry the link: VS Code can't swap an open hover for the explanation.)
- [ ] 6.3 Ctrl+Shift+P › *Nucleus: Explain This Line* works too.
- [ ] 6.4 On an empty line: a short "nothing to explain" note in the status bar, no error.
- [ ] 6.4b On a keyboard where AltGr+E types € (Norwegian, German…): type € inside a string. It must type €, not open the explanation (Windows reports AltGr as Ctrl+Alt).

**Links**

- [ ] 6.5 Hover an underlined problem and click its code (e.g. `unknown-member`): the check's page opens, with `?ref=vscode` in the address.
- [ ] 6.6 In a hover, click an API name: the Nucleus Docs panel opens beside the editor. *Open on the web* opens the docs page on the site.

**Core features (regression check)**

- [ ] 6.7 Problems underline as you type; Ctrl+. offers fixes.
- [ ] 6.8 *Nucleus: Fix All Auto-fixable Problems* fixes and reports how many.
- [ ] 6.9 Suggestions after `Game.` and after `=`; parameter hints inside `Context.ModifySaveFile(`.
- [ ] 6.10 Shift+Alt+F formats the handler.
- [ ] 6.11 *Nucleus: Try It (Simulate Each Player)* shows each player's result.
- [ ] 6.12 *Nucleus: Test in Nucleus Co-op* (Windows only; also the ▷ above the code) installs the handler and starts Nucleus Co-op with the game selected.
- [ ] 6.13 *Nucleus: What's New* shows 0.6.0, with Explain this line in it.
- [ ] 6.14 Notice it if VS Code's own JavaScript suggestions mix in with ours (known: issue #30).

---

## 7. Notepad++ (20–30 min)

Open a handler `.js` in Notepad++.

**Dark mode** ⭐

- [ ] 7.1 Settings › Preferences › Dark Mode › on. Open *Plugins › Nucleus Co-op handlers › Settings…*: the list of checks and **its column headers** are dark. (Never seen working: Wine can't draw it.)
- [ ] 7.2 *Browse the Hub…*: the list and its headers are dark too.

**Core features**

- [ ] 7.3 Problems are underlined as you type; hovering one or a name explains it, as plain text (no stray \` or ** marks).
- [ ] 7.4 Suggestions appear after `Game.`, after `=`, inside quotes.
- [ ] 7.5 Alt+Enter on a problem line: fixes for that line; one applies cleanly.
- [ ] 7.6 Try it (from the plugin menu) shows each player's result.
- [ ] 7.7 *Browse the Hub…*: search a game, *Download and open…* opens it.
- [ ] 7.8 Package (`.nc`) and Install work; *Test in Nucleus Co-op* starts Nucleus Co-op with the game.
- [ ] 7.9 Save a CRLF file after a fix: the line endings stay CRLF.
- [ ] 7.10 *Check for updates* in the plugin's menu says it's the newest (or offers 0.6.0 after the release).

- [ ] 7.11 *Plugins › Nucleus Co-op handlers › Explain this line* with the cursor on a few lines: the explanation shows as a tip at the line, in plain text. On an empty line the status bar says there's nothing to explain.

---

## 8. Report back

Send me the step numbers that failed or felt wrong, with a line on what happened. I fix them, then we release.
