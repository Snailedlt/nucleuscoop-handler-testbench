# Promo images

- `devtools-thumbnail.png`: the thumbnail for posts about the tools (Reddit, Discord), 1920×1080. Use it as the first image of a gallery post.
- `devtools-thumbnail.html`: its source. It uses the real screenshots in `docs/images/gallery/` and the editor icons in `playground/src/editor-icons/`, so it stays current: after the screenshots change, run `node design/promo/render.mjs` (needs Playwright and the Inter font) and commit the new PNG.
