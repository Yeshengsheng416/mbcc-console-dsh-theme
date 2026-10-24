"""MBCC emblem -> assets: boot (full alpha) + two low-alpha watermarks."""
from PIL import Image
import os, base64

SRC = r"C:\Users\白尘\.dsh\attachments\v1\objects\25\257cb5435b7c376b3b4c7a682e35b0fd09813cffb5a175e945f61f24ad6429a1"
OUT = r"E:\MBCCControl\mbcc-console-theme\assets"
os.makedirs(OUT, exist_ok=True)

src = Image.open(SRC).convert("RGBA")
base = src.getchannel("A").resize((360, 360), Image.LANCZOS)


def save(alpha, rgb, name, quality=90):
    img = Image.new("RGBA", (360, 360), rgb + (0,))
    img.putalpha(alpha)
    webp = os.path.join(OUT, name + ".webp")
    img.save(webp, "WEBP", quality=quality, method=6)
    b = base64.b64encode(open(webp, "rb").read()).decode()
    open(os.path.join(OUT, name + ".b64.txt"), "w").write(f"data:image/webp;base64,{b}")
    print(name, os.path.getsize(webp), "bytes · b64", len(b))


save(base, (232, 224, 212), "emblem-boot")

wm_dark = base.point(lambda v: int(v * 0.22))
save(wm_dark, (232, 224, 212), "emblem-wm-dark")

wm_light = base.point(lambda v: int(v * 0.14))
save(wm_light, (32, 24, 18), "emblem-wm-light")

for name, rgb, a in (
    ("emblem-boot", (232, 224, 212), base),
    ("emblem-wm-dark", (232, 224, 212), wm_dark),
    ("emblem-wm-light", (32, 24, 18), wm_light),
):
    img = Image.new("RGBA", (360, 360), rgb + (0,))
    img.putalpha(a)
    img.save(os.path.join(OUT, name + ".png"), optimize=True)

save(base, (32, 24, 18), "emblem-ink")
