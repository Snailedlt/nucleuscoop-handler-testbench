# Promo images

- `devtools-thumbnail.png`: the thumbnail for posts about the tools (Reddit, Discord), 1920×1080. Use it as the first image of a gallery post.
- `devtools-thumbnail.html`: its source. It uses the real screenshots in `docs/images/gallery/` and the editor icons in `playground/src/editor-icons/`, so it stays current: after the screenshots change, run `node design/promo/render.mjs` (needs Playwright and the Inter font) and commit the new PNG.
- `og.html`: the site's link preview (`og:image`, `twitter:image` on the start page and the workbench), the same look with bigger text and no beta badge. `render.mjs` saves it at 1200×630 as `docs/images/og.png`, which the build copies to `start/og.png`. Keep the `og:image:width`/`height` in `playground/build.mjs` and `playground/src/start.html` at 1200×630.
