# Changelog

What changed in the browser workbench (<https://snailedlt.github.io/nucleuscoop-handler-testbench/>). It updates whenever `main` changes, so releases are dated. Newest first. The workbench shows this list itself under **What's new**.

<!--
How to write it (people and AI agents read this, and the workbench shows it):
- Add each user-visible change under "## Unreleased", in one of these groups, biggest change first:
  ### ✨ New · ### 🛠️ Improved · ### 🐛 Fixed · ### ⚡ Faster · ### ⚠️ Changed (what users must do differently) · ### 🙏 Thanks
- 🙏 Thanks: one line per person who tested, reported a bug or contributed to this release, e.g. "- **Horah** for reporting …". When it came through GitHub (an issue, a pull request, a review), link their profile: "- **[name](https://github.com/name)** for …". Credit them inline too ("Reported by Horah.").
- One line per change: a **short summary** in bold (the update note shows only that), then one or two plain sentences.
- A screenshot (or other media) for big, visible changes, folded away in a `<details><summary>Screenshot</summary>` block indented under its line, with a blank line before and after the image and the closing `  </details>`; the image line: `  ![What it shows](docs/images/changelog/<date>-<name>-light.png)` (≈700–1000 px wide), with `<date>-<name>-dark.png` beside it: What's new shows the one for the viewer's theme (`tools/screenshots.cjs` takes both).
- When it goes live: rename "## Unreleased" to "## <yyyy-mm-dd>" (add " HH:MM", UTC, for a second release on the same day). A `---` line separates releases.
-->

## Unreleased

### 🛠️ Improved

- **Numbered releases in What's new.** Each release shows its number, with a link to its notes on GitHub, and screenshots open only when you click Screenshot.
- **Toasts that stack and close.** Notes such as "Fixed" or "Link copied" stack at the bottom right (above the bottom bar on phones), show whether they're good news or a problem, close with ×, and stay while you hover them. "Fixed" and "Formatted" ones have an Undo button.
  <details><summary>Screenshot</summary>

  ![Three toasts stacked: a link that matches nothing, a fix with Undo, and Formatted with Undo](docs/images/changelog/toasts-light.png)

  </details>

---

## 2026-11-05 23:00

### ✨ New

- **Command palette, as in VS Code.** Ctrl+Shift+P (or F1) lists every command with its shortcut: format, fix, Try it, Test all, go to line, download, theme, settings and more. Ctrl+P still opens the examples and Hub handlers, and typing `>` there switches to commands.
  <details><summary>Screenshot</summary>

  ![The command palette: Format document, Fix problems automatically, Try it and more, each with its shortcut](docs/images/changelog/2026-11-05-palette-light.png)

  </details>
- **Format document.** Shift+Alt+F (or the command palette) tidies indentation and spacing. No line moves and no token changes, so Nucleus reads the handler exactly as before.
- **Tips for handler authors.** About 60 tips in five kinds, each labelled: best practices, common pitfalls, shortcuts, settings and features. Plus heads-ups for `Game.GUID`, `Game.AddOption` and `Game.CustomHotkeys` lines.
- **See what's in a package.** The "+ N files" next to the handler's name lists the package's other files, where Nucleus installs each one (`handlers\<GameName>\…`) and what's in the text files. To try it, open **Fallout New Vegas Multiplayer, with its files**, a verified Hub handler whose package adds the scripts its `Game.Play` runs.
  <details><summary>Screenshot</summary>

  ![Files in this package: each file of the Fallout New Vegas Multiplayer package, where Nucleus installs it, and a script's contents](docs/images/changelog/2026-11-05-package-files-light.png)

  </details>
- **More checks from the Nucleus source.** Check warns when `Game.GUID` changed from the Hub version (players would lose the game and their profiles), when option values are `true`/`false` or numbers (a saved profile turns them into text), when the file isn't UTF-8, and when `Game.GameName` has a backslash (the Hub install fails).
- **Names that don't exist.** Check now catches a stray word or a typo of a variable (`"system.cfg", sdfsdf`), which stops Nucleus from loading the handler. Before, only Try it noticed. Plugins listed in a package's `pluginsInfo.txt` count as defined, in Check and in Try it.
- **System.IO and other .NET calls in Lines.** `System.IO.File.Copy`, `Exists`, `Delete`, `Path.Combine`, `Directory.CreateDirectory`, `Thread.Sleep` and more, with docs, completion and how many Hub handlers use them. Suggested by messenils.
- **WakaTime, if you use it.** Add your API key in Settings › Advanced and the time you spend on handlers shows up in your WakaTime dashboard (or a self-hosted Wakapi), as the Nucleus Workbench editor on your system, with a computer name you choose. Writing, testing in Try it and reading the docs count as separate categories, with line numbers and the lines you changed. Never the code; it's off until you turn it on.
- **VS Code's shortcuts in the editor.** Ctrl+/ comments a line, Alt+↑/↓ moves it, Shift+Alt+↑/↓ copies it, Ctrl+Shift+K deletes it, Ctrl+D selects the next match, Alt+click adds a cursor, Ctrl+F / Ctrl+H / Ctrl+G find, replace and go to a line, and Ctrl+. shows the fixes for a line. Ctrl+P and F1 open the examples and actions, Ctrl+S saves for Nucleus, Ctrl+B shows Lines. Press ? for the full list.
- **Lines greys out what doesn't work where you are, both ways.** Inside `Game.Play`, options Nucleus reads before the session (`Game.GUID`, `Game.MaxPlayers`, `Game.AddOption`...) are greyed out, with the reason; outside it, `Context` and `Player` are, as before.
- **Lines as a tree.** Lines now opens as a tree (Group › by object or by topic for the long list), starting at Game, Context, Player, System and Nucleus; tap one to go a level deeper (System › IO › File), and back with the path at the top. With the list wider (Settings › Lines › Wider column, or drag its edge), it shows two columns, like a file browser. Typing a filter still searches everything. Idea: messenils.

### 🛠️ Improved

- **The code editor is one stop for the keyboard.** Tab reaches the code once, and screen readers name it "Handler code".
- **Screenshots in your theme.** The pictures on the start page and in What's new are shown light or dark, following your system or the theme you picked in Settings.
- **Easier with a screen reader and a keyboard.** The code editor, the resize handles and the change list have names and positions screen readers announce, headings are in order, and a few low-contrast labels are darker.
- **Easier to find.** Clearer page titles and descriptions, link previews with a picture, and a sitemap for search engines.
- **One Settings window, with tabs.** General, Editor, Lines, Help and Advanced; the Lines list's ⚙️ opens it on the Lines tab, so every setting is in one place.
- **The logo goes home.** Clicking the logo or title opens the Nucleus Handler Tools start page, with the VS Code extension and how to install it.
- **A misspelled function is an error, not a skipped setting.** Calling a name that doesn't exist stops Nucleus, and Check now says so.
- **Game.ForceFinishOnPlay is flagged as historical.** It comes from the original Nucleus Coop; today's Nucleus doesn't read it and closes leftover copies of the game by itself. Check says so in a warning, with a fix that removes the line.

### 🐛 Fixed

- **No more "Save password?" from the browser.** The WakaTime key field was a password field, so picking a result in the Open dialog looked like a login to Chrome.
- **The fix box closes when you keep editing.** After Fix all, the before/after box stayed open with an old result while you typed; it now closes, and the list below shows what's left.
- **WakaTime shows the editor as Nucleus-Workbench.** It showed "Nucleusworkbench".
- **Lines writes functions as functions.** Clicking Game.Play, Game.OnStop and other callbacks inserts `Game.Play = function () { … };` with the cursor inside, instead of `Game.Play = ;`. Reported by messenils.
- **Packages keep their other files.** Opening a .zip or .nc with more than handler.js (Goldberg files, configs, DLLs) and saving it again used to drop them. Now they're kept, shown as "+ 3 files" next to the name, and saved back unchanged in .zip and .nc.

### ⚠️ Changed

- **Shift+Alt+F formats the code now, as in VS Code.** Fix all is in the command palette (Ctrl+Shift+P) and on its button.

### 🙏 Thanks

- **messenils** for the System.IO lines, the tree idea and reporting how Lines inserted Game.Play.

---

## 2026-11-05 18:33

### ✨ New

- **Tap a warning next to the code.** Its problem opens right there, with Fix this. Works on phones too, where there's no hover.
  <details><summary>Screenshot</summary>

  ![The problem on line 20 opened from its marker next to the code, with Fix this](docs/images/changelog/2026-11-05-line-problems-light.png)

  </details>
- **Problems under the code on phones.** A strip shows how many problems there are and steps through them (‹ ›), so you can fix things without switching to Results.
- **Docs for each name in Lines.** The (i) button opens what a name does, its default and how many Hub handlers use it, with Insert and Full docs.
- **Test all combinations in Try it.** One button runs every player count (up to the handler's maximum), input setup and monitor size, and shows which combinations fail and why. Pick a cell to see that run. It takes about half a second.
  <details><summary>Screenshot</summary>

  ![Try it after Test all combinations: a table of player counts by input setup, every cell green](docs/images/changelog/2026-11-05-test-all-light.png)

  </details>
- **Copy or download right next to the code.** The new button beside Lines copies the code or a link, or downloads the handler as a .zip for Nucleus, a plain .js or an .nc package. Open a file from your device straight from the handler's name. While typing on a phone, Copy… in the symbol keys does the same. On phones, a link opens on the handler, and the phone's own Select all, copy and delete reach every line.
- **Try it with a keyboard and mouse for every player.** Choose "Each player their own" under Keyboard & mouse, as in Nucleus' multiple keyboards and mice mode. Try it says so when the handler doesn't support it.

### 🛠️ Improved

- **Resize the panels.** Drag the edge between the code and the results, the left edge of the Lines list, or (on phones) the top of the Lines sheet. Double-click an edge to reset it, or use Settings › Reset panel sizes. Sizes are kept in your browser.
- **Much more room on phones.** All the buttons share one row at the bottom, in thumb reach (Handler and Results, the menu, Settings), hidden while you type, and Lines opens as a sheet over the lower part so the code stays in view.
- **The line you type stays in view on phones.** When the on-screen keyboard opens, the workbench fits the space above it (it reads the keyboard's height): the header and the tip bar step aside, and the cursor line stays visible above the symbol keys.
- **The symbol keys always sit just above the keyboard.** When the browser can't tell how tall the on-screen keyboard is (some browsers, or the workbench inside another page), they use the height measured last time on that phone, or a careful estimate.
- **Phone-friendly menus.** The menu, Settings and other dialogs rise from the bottom as sheets, as tall as their content; drag one down or tap outside to close. Settings has bigger rows, a one-tap theme switch and Done always in reach. The examples list no longer pops up the keyboard or shows keyboard hints.
- **Tidier tips on phones.** One line with a large ×; tap it for the whole tip, back, next and Turn off.
- **Switch handlers from the handler's name.** Click the name above the code to open an example or a Hub handler. It replaces the Examples button.
- **Docs and problems by tap on touch screens.** Tap an underlined word to see its problem and fix; the docs of the name under the cursor show under the code. Holding still selects text as usual. Hold a button to read what it does without pressing it. The mouse-only pop-ups no longer get stuck on phones.
- **More tips, on both handlers and the workbench.** Next now takes turns between a tip for writing handlers (when `Game.Play` runs, per-player launch arguments, `Game.Folder` and more) and one for the workbench (Test all combinations, resizing panels, the (i) in Lines and more).
- **The developer bar fits on phones.** One scrollable row at the top instead of three rows over the page.
- **The verdict comes first.** Check opens with whether Nucleus can use the handler and the fix button; the welcome note is a short card under it, with a × to dismiss.
- **Try it helps when the handler doesn't load.** Fix the problems from there with one click, or jump to them.
- **More room for the code.** The Lines list opens by default only on very wide screens (1680 px and up), and the code gets more of the width while it's open.
- **A shorter Try it intro.** One sentence instead of a paragraph.

---

## 2026-11-05 15:43

### ✨ New

- **What's new, in the workbench.** After an update, a short note says what changed, with a link to this list (also in the footer, the ⋯ menu, Settings and Ctrl+K). Turn it off in Settings.
  <details><summary>Screenshot</summary>

  ![The What's new window, listing the latest changes by date](docs/images/changelog/whats-new-light.png)

  </details>
- **The workbench as one offline file.** `workbench.html` in the extension's releases (or `nucleus workbench`) is the whole workbench in a single file: open it locally or host it yourself.
- **`llms.txt` for AI agents.** It tells agents where to find the MCP server, the agent skill and the API reference, and asks them to run the tools themselves instead of using this site.

### 🛠️ Improved

- **Go back a tip.** The tip bar has ‹ and › to go back and forth.

### ⚡ Faster

- **Loads about half as much.** A visit downloads about 235 KB instead of 433 KB: Hub examples load when you open one, and the checker is no longer sent twice.
- **Easier on the Hub.** One daily job is the only thing that reads the Hub's list; everything else (the site, the weekly check, people's tools) reads our copy of it. Only new handler versions are downloaded, the full Hub check runs weekly, and the site is only redeployed when something changed.

---

## 2026-11-05

### ✨ New

- **Lines list beside the code.** Every name a handler can use, click to insert. It shows what the handler already sets (and jumps there instead of adding a second line), dims names that don't work where the cursor is, suggests values, and sorts by how many of the 600 Hub handlers use each name. Its ⚙️ has the list settings. Idea: messenils.
  <details><summary>Screenshot</summary>

  ![The Lines list filtered to "kill": Game.KillMutex is marked as already set, with its docs and Hub usage below](docs/images/changelog/2026-11-05-lines-light.png)

  </details>
- **Tips while you write.** Loading-screen-style tips under the code, and a heads-up when the code makes one relevant (each shown once). Turn them off with ×.
- **Settings.** ⚙️ in the header: theme, text size, line wrap, symbol keys, tips and the Lines list; Advanced mode and the developer bar under Advanced.
- **Works on phones.** A slim header with a ⋯ menu, Lines full screen, wrapped lines and symbol keys above the on-screen keyboard.
  <details><summary>Screenshot</summary>

  ![The workbench on a phone: results, the code with symbol keys, the Lines list and the ⋯ menu](docs/images/changelog/2026-11-05-phones-light.png)

  </details>
- **Intro page for testers.** [The intro page](https://snailedlt.github.io/nucleuscoop-handler-testbench/start/) has screenshots, the install guide and a download link that always points to the newest release.

### 🐛 Fixed

- **The Lines scrollbar no longer hides values.** On Windows it covered the values on the right. Reported by Horah.
- **Two false flags gone.** Found by checking all 600 Hub handlers: a syntax error on `let x` followed by `var x`, and a Proto Input warning on 11 handlers.

### 🙏 Thanks

- **messenils** for the idea of a list of every name, like Pawno's.
- **Horah** for reporting the scrollbar that hid values.

---

## 2026-11-02

### ✨ New

- **The workbench on GitHub Pages.** Rebuilt daily with the newest verified Hub handlers.
- **Share links.** Copy link puts the handler (or the selected lines) in the address.
- **The splitscreen.me look.** Light and dark.
- **Weekly check against the real engine.** Every verified Hub handler runs in Nucleus' script engine (Jint 2.11.58) and is compared with Try it.

---

## 2026-11-01

### ✨ New

- **First version.** Check a handler, fix it automatically, and Try it: what Nucleus sets up for each player.
