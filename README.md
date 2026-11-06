# Hub index

The hub.splitscreen.me handler list, synced daily by `.github/workflows/hub-sync.yml` on `main`. Read by the tools instead of the Hub API.

- `hub-index.json`: every handler (`tools/hub-sync.mjs`).
- `hub/<id>.js`, `hub/packages.json`: each handler's current version, fetched once per version (`tools/hub-mirror.mjs`); the workbench lists and opens all of them from here.
- `hub/<id>.files.json`: the other files of that version's package (`tools/hub-files.mjs`; small files with content, big ones by name and size), once per version; `files` in `packages.json` counts them.
- `covers/<cover>.jpg`: the games' covers (IGDB, as the Hub shows them), once per cover.
- `usage.json`: how many verified Hub handlers use each name, counted weekly by `.github/workflows/nightly.yml` (only counts, no handler code).
- `votes.json`: the anonymous 👍/👎 on docs and tips and the feature counts, summed daily from GoatCounter (`tools/votes-report.mjs`); shown on the site's unlisted votes/ page.
