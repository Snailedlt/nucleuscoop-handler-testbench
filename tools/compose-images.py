# Composed images (called by tools/screenshots.cjs): the four-phone collage for the changelog, and og.png.
import json, base64, io, os, sys
from PIL import Image
ch = sys.argv[1]
for t in ['light', 'dark']:
    src = os.path.join(ch, f'.phones-{t}.json')
    parts = [Image.open(io.BytesIO(base64.b64decode(x))) for x in json.load(open(src))]
    w, _ = parts[0].size
    crop_h = int(w * 1.7)
    tw, gap, pad = 240, 13, 7
    th = int(crop_h * tw / w)
    out = Image.new('RGB', (4 * tw + 3 * gap + 2 * pad, th + 2 * pad), (255, 255, 255) if t == 'light' else (30, 30, 34))
    for i, im in enumerate(parts):
        top = im.size[1] - crop_h if i == 3 else 0  # the ⋯ menu is a bottom sheet
        out.paste(im.crop((0, top, w, top + crop_h)).resize((tw, th), Image.LANCZOS), (pad + i * (tw + gap), pad))
    out.save(os.path.join(ch, f'2026-11-05-phones-{t}.png'), optimize=True)
    os.remove(src)

# The social preview (docs/images/og.png) is drawn from design/promo/og.html: node design/promo/render.mjs.
img = os.path.join(ch, '..')

# Desktop shots are taken at 2× and stored at 1.5× (1920 px wide): sharp, and half the bytes.
for n in ['check', 'fix-all', 'try-it']:
    for t in ['light', 'dark']:
        f = os.path.join(img, f'{n}-{t}.png')
        im = Image.open(f).convert('RGB')
        if im.width > 1920:
            im.resize((1920, round(im.height * 1920 / im.width)), Image.LANCZOS).save(f, optimize=True)
