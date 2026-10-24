# -*- coding: utf-8 -*-
"""Generate a small set of MBCC-console UI sound effects (mono 16-bit WAV)."""
import math
import os
import wave

import numpy as np

SR = 44100
OUT = r"E:\MBCCControl\sfx"
os.makedirs(OUT, exist_ok=True)


def env(n, attack=0.005, release=0.02, curve=2.0):
    """Simple attack/release envelope in samples."""
    a = max(1, int(attack * SR))
    r = max(1, int(release * SR))
    e = np.ones(n)
    e[:a] = np.linspace(0, 1, a) ** 0.5
    e[-r:] = np.linspace(1, 0, r) ** curve
    return e


def tone(freq, dur, amp=0.35, attack=0.004, release=0.02, shape="sine", slide_to=None):
    n = int(dur * SR)
    t = np.arange(n) / SR
    if slide_to is None:
        phase = 2 * math.pi * freq * t
    else:
        f = np.linspace(freq, slide_to, n)
        phase = 2 * math.pi * np.cumsum(f) / SR
    if shape == "sine":
        w = np.sin(phase)
    elif shape == "square":
        w = np.sign(np.sin(phase)) * 0.6
    elif shape == "tri":
        w = 2 / math.pi * np.arcsin(np.sin(phase))
    else:
        w = np.sin(phase)
    return (w * amp * env(n, attack, release)).astype(np.float32)


def noise(dur, amp=0.25, attack=0.002, release=0.05, lp=0.15):
    n = int(dur * SR)
    rng = np.random.default_rng(7)
    x = rng.standard_normal(n).astype(np.float32)
    # one-pole low pass
    y = np.zeros_like(x)
    acc = 0.0
    for i in range(n):
        acc += lp * (x[i] - acc)
        y[i] = acc
    return (y * amp * env(n, attack, release)).astype(np.float32)


def mix(*parts):
    n = max(len(p) for p in parts)
    out = np.zeros(n, dtype=np.float32)
    for p in parts:
        out[: len(p)] += p
    peak = np.max(np.abs(out)) or 1.0
    if peak > 0.85:
        out *= 0.85 / peak
    return out


def save(name, data):
    pcm = (np.clip(data, -1, 1) * 32767).astype(np.int16)
    path = os.path.join(OUT, name)
    with wave.open(path, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    print(name, "%.2fs" % (len(data) / SR), os.path.getsize(path), "bytes")


# 1) 开屏自检通过：低频“咔哒 + 上扬”
save(
    "boot-ok.wav",
    mix(
        tone(120, 0.05, amp=0.5, shape="tri", release=0.03),
        tone(220, 0.34, amp=0.22, slide_to=440, attack=0.02, release=0.12),
        noise(0.34, amp=0.10, lp=0.08),
    ),
)

# 2) 发送：短促气声 + 高频滑落
save(
    "send.wav",
    mix(
        noise(0.20, amp=0.22, lp=0.35, release=0.08),
        tone(1800, 0.14, amp=0.10, slide_to=900, release=0.06),
    ),
)

# 3) 错误：两声下行方波
save(
    "error.wav",
    mix(
        tone(300, 0.11, amp=0.22, shape="square", release=0.05),
        np.concatenate([np.zeros(int(0.13 * SR), np.float32), tone(220, 0.16, amp=0.22, shape="square", release=0.06)]),
    ),
)

# 4) 悬停/选中：极短 tick
save(
    "tick.wav",
    mix(
        tone(1600, 0.04, amp=0.18, shape="tri", attack=0.001, release=0.02),
        noise(0.03, amp=0.06, lp=0.6, release=0.02),
    ),
)

# 5) 余额预警：柔和低鸣
save(
    "warn.wav",
    mix(
        tone(110, 0.5, amp=0.20, attack=0.05, release=0.3),
        tone(165, 0.5, amp=0.08, attack=0.05, release=0.3),
    ),
)
