// Build boot-bg-options.html: 5 background directions for the boot splash (mock only).
const fs = require('fs');
const path = require('path');

const emblem = 'assets/emblem-boot.png';

const boot = (tag) => `
  <div class="boot">
    <img class="emblem" src="${emblem}" alt="" />
    <div class="cap">MINOS BUREAU OF CRISIS CONTROL</div>
    <div class="lines">
      <div><span class="tag">[MBCC]</span><span class="t">建立安全连接</span><i></i><b>OK</b></div>
      <div><span class="tag">[MBCC]</span><span class="t">校验局长权限</span><i></i><b>CLEARANCE A</b></div>
      <div><span class="tag">[SYS&nbsp;]</span><span class="t">挂载监控矩阵</span><i></i><b>16 FEEDS</b></div>
      <div><span class="tag">[SYS&nbsp;]</span><span class="t">同步禁闭者名册</span><i></i><b>128 UNITS</b></div>
      <div class="warn"><span class="tag">[WARN]</span><span class="t">检测到狂厄残留，已隔离</span></div>
      <div><span class="tag">[MBCC]</span><span class="t">值班控制台已就绪。</span></div>
    </div>
    <div class="welcome">局长，欢迎回来。</div>
    <div class="rule"></div>
  </div>
  <div class="panel-tag">${tag}</div>`;

const page = `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="utf-8" /><style>
  html, body { margin: 0; background: #111116; font-family: "Segoe UI", "Microsoft YaHei", sans-serif; }
  .sheet { display: flex; flex-direction: column; gap: 28px; padding: 28px; }
  .panel { position: relative; width: 640px; height: 400px; overflow: hidden; border: 1px solid #26262e; }
  .panel-tag { position: absolute; left: 12px; top: 10px; font: 9px/1 Consolas, monospace; letter-spacing: .22em; color: #6e8296; }

  .boot { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0; color: #e8e0d4; }
  .emblem { width: 84px; height: 84px; opacity: .92; margin-bottom: 10px; }
  .cap { font: 10px/1 Georgia, serif; letter-spacing: .28em; color: #9aa7b4; margin-bottom: 26px; }
  .lines { width: 440px; font: 11px/1 "Consolas", monospace; }
  .lines > div { display: flex; align-items: center; gap: 10px; height: 22px; color: #c9d3dc; }
  .lines .tag { color: #6e8296; flex: none; }
  .lines .t { flex: none; }
  .lines i { flex: 1; height: 1px; background: repeating-linear-gradient(90deg, #3a3a46 0 2px, transparent 2px 6px); }
  .lines b { font-weight: 400; color: #8fa0ae; font-size: 10px; letter-spacing: .06em; }
  .lines .warn { color: #e0766a; }
  .welcome { margin-top: 26px; font-size: 22px; letter-spacing: .12em; color: #f0e8dc; }
  .rule { margin-top: 16px; width: 440px; height: 1px; background: linear-gradient(90deg, #a32a22, #a32a2233 70%, transparent); }

  /* A 档案纸 */
  .a {
    background:
      url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/><feColorMatrix type='saturate' values='0'/></filter><rect width='120' height='120' filter='url(%23n)' opacity='0.05'/></svg>"),
      repeating-linear-gradient(0deg, rgba(232,224,212,0.035) 0 1px, transparent 1px 44px),
      linear-gradient(90deg, transparent 0 47px, rgba(232,224,212,0.07) 47px 48px, transparent 48px),
      #0b0b10;
  }
  .a::before { content: ''; position: absolute; left: 0; top: 0; width: 74px; height: 26px; background: #a32a22; clip-path: polygon(0 0, 100% 0, 100% 66%, 92% 100%, 0 100%); opacity: .85; }
  .a::after { content: 'MBCC / ARCHIVE 001'; position: absolute; right: 16px; top: 14px; font: 9px/1 Consolas, monospace; letter-spacing: .2em; color: #4f5a66; }

  /* B 监控矩阵 */
  .b {
    background:
      radial-gradient(120% 90% at 50% 46%, transparent 30%, rgba(0,0,0,.55) 100%),
      linear-gradient(rgba(232,224,212,0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(232,224,212,0.045) 1px, transparent 1px),
      #07070b;
    background-size: auto, 28px 28px, 28px 28px, auto;
  }
  .b::before { content: ''; position: absolute; inset: 14px; border: 1px solid rgba(232,224,212,.08); clip-path: polygon(0 0, 22px 0, 22px 1px, 1px 1px, 1px 22px, 0 22px, 0 0, 100% 0, 100% 22px, calc(100% - 1px) 22px, calc(100% - 1px) 1px, calc(100% - 22px) 1px, calc(100% - 22px) 0, 100% 0, 100% 100%, calc(100% - 22px) 100%, calc(100% - 22px) calc(100% - 1px), calc(100% - 1px) calc(100% - 1px), calc(100% - 1px) calc(100% - 22px), 100% calc(100% - 22px), 0 100%, 0 calc(100% - 22px), 1px calc(100% - 22px), 1px calc(100% - 1px), 22px calc(100% - 1px), 22px 100%); }
  .b::after { content: ''; position: absolute; left: 0; right: 0; top: 38%; height: 2px; background: linear-gradient(90deg, transparent, rgba(232,224,212,.10), transparent); }

  /* C 终端扫描 */
  .c {
    background:
      repeating-linear-gradient(0deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 3px),
      radial-gradient(120% 100% at 50% 40%, rgba(255,255,255,.035), transparent 55%),
      #050507;
  }
  .c::after { content: ''; position: absolute; left: 0; right: 0; top: 62%; height: 1px; background: rgba(232,224,212,.09); }

  /* D 警示斜纹 */
  .d {
    background:
      repeating-linear-gradient(-45deg, rgba(163,42,34,.055) 0 7px, transparent 7px 22px),
      #0a0a0e;
  }
  .d::before { content: ''; position: absolute; inset: 0; background: radial-gradient(80% 60% at 50% 50%, rgba(10,10,14,.92) 26%, transparent 78%); }
  .d::after { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 1px; background: rgba(163,42,34,.35); }

  /* E 余烬 */
  .e {
    background:
      radial-gradient(58% 62% at 14% 86%, rgba(163,42,34,.16), transparent 72%),
      radial-gradient(70% 70% at 78% 12%, rgba(70,90,110,.06), transparent 70%),
      #08080b;
  }
  .e::before { content: ''; position: absolute; inset: 0; background: radial-gradient(120% 90% at 50% 50%, transparent 38%, rgba(0,0,0,.55) 100%); }
</style></head>
<body>
<div class="sheet">
  <div style="height:120px"></div>
  <div class="panel a" id="p-a">${boot('A · ARCHIVE PAPER 档案纸')}</div>
  <div class="panel b" id="p-b">${boot('B · SURVEILLANCE GRID 监控矩阵')}</div>
  <div class="panel c" id="p-c">${boot('C · CRT SCAN 终端扫描')}</div>
  <div class="panel d" id="p-d">${boot('D · HAZARD STRIPE 警示斜纹')}</div>
  <div class="panel e" id="p-e">${boot('E · EMBER 余烬')}</div>
</div>
</body></html>`;

fs.writeFileSync(path.join(__dirname, 'boot-bg-options.html'), page, 'utf8');
console.log('wrote boot-bg-options.html');
