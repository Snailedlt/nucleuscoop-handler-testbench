# Duo and Nucli

**Duo** is splitscreen.me's mascot: a bouncy ball, the logo's split window, with one white stripe round the middle
(a cross for four players). **Nucli** is the mascot of the handler tools: a quiet atom who checks your code.

Concept art, made for the SplitScreen.Me / Nucleus Co-op community. Source and history:
https://github.com/Snailedlt/nucleuscoop-handler-testbench/tree/main/design/mascots

## What's in a pack

| File | Use it for |
|---|---|
| `name.svg` | The animated drawing. Scales to any size, small (a few KB). Animates as an `<img>` too. |
| `name-still.svg` | The same drawing standing still: its first pose. |
| `name-512.png`, `name-128.png` | Transparent PNGs, for anything that can't show SVG. |
| `name-192.gif`, Discord `.gif` | The animation as a GIF (transparent, loops without a jump). |
| `colours.json` | The colours: Duo's blues and stripe, Nucli's violets, the four player colours. |

Packs: **Duo** (every scene), **Nucli** (every scene), **Discord emoji** (128 × 128, under 256 KB), **Loaders and
spinners**, **Avatars** (512 px profile pictures, light and dark), **Web kit** (an example page), or **Everything**.

## On a website

**As an image** (simplest; the SVG animates and stands still by itself when the visitor asks for less motion):

```html
<img src="duo-joy.svg" alt="Duo cheering" width="120" height="120">
```

**With a still frame for reduced motion** (needed for GIFs, which can't stand still on their own):

```html
<picture>
  <source srcset="duo-joy-still.svg" media="(prefers-reduced-motion: reduce)">
  <img src="duo-joy.svg" alt="Duo cheering" width="120" height="120">
</picture>
```

**Decoration** (next to text that already says it): `alt=""`, or `aria-hidden="true"` on inline SVG.

**Inline** (to recolour with CSS or animate with your own code): paste the file's `<svg>…</svg>` into the page. Each
file carries its own `<style>`; if you inline several of the same file, give each copy unique `id`s.

**Loading spinners**: put the loader next to the text that says what's happening, and give it `role="status"` on
the text, not the image: `<p role="status"><img src="loader-twirl.svg" alt="" width="24"> Loading handlers…</p>`.
Under ~32 px use the twirl or the spinner; the bigger loaders need room.

See `example.html` in the web kit for all of these on one page.

## In an app

- **Discord**: Server Settings → Emoji → Upload Emoji: the `.png` files are static emoji, the `.gif` files
  animated ones (Nitro to use them outside the server). Name them as the files (`duo_happy`, `nucli_ok`…).
- **Profile pictures** (Discord, GitHub, forums): the avatar PNGs, light or dark to suit the site.
- **WinForms** (Nucleus Co-op itself): a `PictureBox` with the `.png`, or the `.gif` (PictureBox animates GIFs).
- **WPF / Avalonia**: the `.svg` through an SVG library (SharpVectors, Svg.Skia), or the PNGs.
- **Electron, Tauri, web views**: as on a website.
- **Android**: import the still `.svg` as a Vector Asset, or use the PNGs; animated: the GIF in an image library
  (Glide, Coil). **iOS / macOS**: the PNGs or the still SVG in an asset catalog (Preserve Vector Data).
- **Games** (Unity, Godot): the 512 PNGs as sprites; Godot also imports SVG.

Respect "reduce motion" (the OS setting) wherever you can: show the still file instead of the animation.

## Doing it right

- Keep Duo's stripe white and vertical, and Nucli's electrons in the four player colours.
- Don't stretch, recolour the body, or add outlines; scale evenly, on any background.
- Duo is the fun one (splitscreen.me, players, loading); Nucli is quiet and helpful (checks, tools, progress).
