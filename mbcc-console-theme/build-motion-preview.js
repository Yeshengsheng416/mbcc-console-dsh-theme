// Build motion-preview.html: the four new motion effects, paused mid-animation.
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'client.js'), 'utf8').split('\r\n').join('\n');
const start = src.indexOf('/* ============================================================\n   发送/入场动效');
const end = src.indexOf('\n/* ============================================================', start + 10);
let css = src.slice(start, end);

const page = `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="utf-8" /><style>
html, body { margin: 0; height: 100%; }
body {
  background: #07070b; color: #e8e0d4; font-family: "Segoe UI", "Microsoft YaHei", sans-serif;
  --dsw-alias-brand-primary: #A32A22;
  --dsw-alias-label-primary: #e8e0d4;
  display: flex; flex-direction: column;
}
.layout { display: flex; flex: 1; }
.side { width: 260px; padding: 18px 14px; box-sizing: border-box; border-right: 1px solid #1a1a22; }
.brand { opacity: .55; font-family: Georgia, serif; font-size: 15px; letter-spacing: .05em; margin-bottom: 26px; }
.session { position: relative; height: 34px; display: flex; align-items: center; padding-left: 12px; font-size: 13px; border-top: 1px solid #24242e; }
.session.on { background: linear-gradient(90deg, color-mix(in srgb, var(--dsw-alias-brand-primary) 34%, transparent), color-mix(in srgb, var(--dsw-alias-brand-primary) 10%, transparent)); }
.main { flex: 1; padding: 20px 24px; display: flex; flex-direction: column; }
.row { position: relative; padding: 10px 0 10px 12px; font-size: 13px; color: #c9d3dc; border-bottom: 1px dotted #222; }
.composer { margin-top: auto; height: 64px; border: 1px solid #24242e; display: flex; align-items: center; padding: 0 14px; color: #6b747e; font-size: 13px; }
${css}
/* 预览：冻结在中间帧 */
.session.on::before { animation-play-state: paused !important; animation-delay: -90ms !important; }
.row.mbcc-enter { animation-play-state: paused !important; animation-delay: -100ms !important; }
.row.mbcc-enter::before { animation-play-state: paused !important; animation-delay: -100ms !important; }
#mbcc-sweep { animation-play-state: paused !important; animation-delay: -90ms !important; opacity: 1 !important; transform: scaleX(0.62) !important; }
</style></head>
<body data-mbcc-console="on" data-ds-dark-theme data-mbcc-idle="on">
  <div class="layout">
    <aside class="side">
      <div class="brand">MBCC AI TERMINAL</div>
      <div class="session on" data-row-key="session:a" aria-selected="true">无期迷途美术风格复刻研究</div>
      <div class="session">DSH 主题编写研究</div>
    </aside>
    <main class="main">
      <div class="row">上一条消息</div>
      <div class="row mbcc-enter" data-chat-flow-key="turn:1">新消息：已合并 S-019 的三份记录。</div>
      <div class="composer">发消息或创建任务…</div>
    </main>
  </div>
  <div id="mbcc-sweep" class="is-on" style="left:300px;top:404px;width:520px"></div>
  <div id="mbcc-idle">PAUSED</div>
</body></html>`;

fs.writeFileSync(path.join(__dirname, 'motion-preview.html'), page, 'utf8');
console.log('wrote motion-preview.html');
