import colorsys
from PIL import Image

files = ["refs/official_site.png", "refs/gameui_grid4.png", "refs/gameui_grid2.png"]
buckets = {}
for f in files:
    im = Image.open(f).convert("RGB")
    im = im.resize((320, 200))
    for r, g, b in im.getdata():
        h, s, v = colorsys.rgb_to_hsv(r/255, g/255, b/255)
        if s > 0.55 and v > 0.45:
            key = int(h*12)  # 30-degree buckets
            d = buckets.setdefault(key, [0, 0, 0, 0])
            d[0] += r; d[1] += g; d[2] += b; d[3] += 1

rows = []
for k, (r, g, b, n) in buckets.items():
    rows.append((n, "#%02X%02X%02X" % (r//n, g//n, b//n), round(k*30)))
rows.sort(reverse=True)
for n, hx, hue in rows[:10]:
    print(f"{hx}  hue~{hue}deg  pixels={n}")
