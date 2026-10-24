// Build glitch-preview.html: grayscale slice tearing on the sidebar, paused mid-animation.
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'client.js'), 'utf8').split('\r\n').join('\n');
const start = src.indexOf('/* ============================================================\n   故障信号层');
const end = src.indexOf('\n/* ============================================================', start + 10);
const css = src.slice(start, end);

const slices = [
  { top: 84, h: 12, dx: 3 },
  { top: 168, h: 9, dx: -4 },
  { top: 262, h: 14, dx: 2 },
]
  .map(
    (s) =>
      `<div class="slice" style="top:${s.top}px;height:${s.h}px;--dx:${s.dx}px;animation-play-state:paused;animation-delay:-110ms"></div>`,
  )
  .join('\n    ');

const page = `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="utf-8" /><style>
html, body { margin: 0; height: 100%; }
body {
  background: #07070b; color: #e8e0d4; display: flex;
  font-family: "Segoe UI", "Microsoft YaHei", sans-serif;
}
.side { width: 300px; flex: none; border-right: 1px solid #1a1a22; padding: 20px 16px; box-sizing: border-box; }
.side .brandcopy { font-family: Georgia, serif; font-size: 18px; letter-spacing: .08em; margin-bottom: 24px; }
.side .row { height: 34px; display: flex; align-items: center; font-size: 13px; color: #a9bccb; border-top: 1px dotted #222; }
main { flex: 1; }
${css}
</style></head>
<body data-mbcc-console="on" data-ds-dark-theme>
  <div id="mbcc-signal" style="left:0;top:0;width:300px;height:100%">
    ${slices}
  </div>
  <aside class="side">
    <div class="brandcopy">MBCC AI TERMINAL</div>
    <div class="row">插件</div>
    <div class="row">插件市场</div>
    <div class="row">自动化任务</div>
    <div class="row">任务看板</div>
    <div class="row">MCP 连接器</div>
  </aside>
  <main></main>
</body></html>`;

fs.writeFileSync(path.join(__dirname, 'glitch-preview.html'), page, 'utf8');
console.log('wrote glitch-preview.html');
