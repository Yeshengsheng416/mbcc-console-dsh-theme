import sys, json
from PIL import Image

files = {
    "keyart_site": "refs/official_site.png",
    "cg_magenta_city": "refs/gameui_grid1.png",
    "ui_panels": "refs/gameui_grid2.png",
    "cg_red": "refs/gameui_grid4.png",
    "battle_red": "refs/gameui_grid5.png",
}

def hexc(c):
    return "#%02X%02X%02X" % c[:3]

out = {}
for name, path in files.items():
    im = Image.open(path).convert("RGB")
    w, h = im.size
    # crop away site chrome / sidebars for the gameui screenshots
    if name != "keyart_site":
        im2 = im.crop((int(w*0.20), int(h*0.15), int(w*0.80), int(h*0.95)))
    else:
        im2 = im.crop((0, 0, w, int(h*0.85)))
    small = im2.resize((240, 160))
    q = small.quantize(colors=8, method=Image.MEDIANCUT)
    pal = q.getpalette()
    counts = sorted(q.getcolors(), reverse=True)
    total = sum(c for c, _ in counts)
    cols = []
    for cnt, idx in counts:
        rgb = tuple(pal[idx*3: idx*3+3])
        cols.append({"hex": hexc(rgb), "pct": round(cnt/total*100, 1)})
    out[name] = cols

# average luminance of battle scene
im = Image.open(files["battle_red"]).convert("RGB").crop((300, 380, 1000, 700))
px = list(im.getdata())
lum = sum(0.2126*r+0.7152*g+0.0722*b for r, g, b in px)/len(px)
out["battle_mean_luma"] = round(lum, 1)

print(json.dumps(out, ensure_ascii=False, indent=1))
