# Example packages

Handlers the workbench opens with their other files, to show what a package (.zip / .nc) holds:
`handler.js` at the root, and a folder with what it ships (Nucleus installs it as the handler's
folder, `Game.Folder`). Copied unchanged from verified handlers on hub.splitscreen.me; `build.mjs`
inlines them into the page (listed in `EXAMPLE_PACKAGES` there).

- `nvmp/`: Fallout New Vegas Multiplayer Mod, v21 (hub id vnPXYhWMJJ3FNuQuS), by its Hub
  maintainer. `NVMP/` holds the scripts its `Game.Play` runs with `Context.RunAdditionalFiles`.
