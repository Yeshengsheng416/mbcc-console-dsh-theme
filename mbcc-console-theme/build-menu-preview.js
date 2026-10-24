// Build menu-preview.html: the theme settings panel, open state.
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'client.js'), 'utf8').split('\r\n').join('\n');
const start = src.indexOf('/* ============================================================\n   主题设置');
const next = src.indexOf('\n/* ============================================================', start + 10);
let css = src.slice(start, next);

const page = `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="utf-8" /><style>
html, body { margin: 0; height: 100%; }
body { background: #07070b; font-family: "Segoe UI", sans-serif; }
${css}
#mbcc-theme-menu { display: block; left: 90px; top: 80px; }
</style></head>
<body data-mbcc-console="on">
  <div id="mbcc-theme-menu" class="is-open">
    <div class="m-head"><span>MBCC THEME</span><span class="m-ver">v0.24</span></div>
    <button class="m-row" data-toggle="boot"><span>开屏动画</span><i class="m-switch" aria-pressed="true"></i></button>
    <button class="m-row" data-toggle="grid"><span>对话区底纹</span><i class="m-switch" aria-pressed="true"></i></button>
    <button class="m-row" data-toggle="pill"><span>余额胶囊</span><i class="m-switch" aria-pressed="false"></i></button>
    <button class="m-row" data-toggle="fx"><span>故障动效</span><i class="m-switch" aria-pressed="true"></i></button>
    <button class="m-row" data-toggle="roundFont"><span>圆体界面</span><i class="m-switch" aria-pressed="false"></i></button>
    <div class="m-row m-col"><span>强调色</span><span class="m-swatches">
      <button class="m-swatch is-on" data-accent="red" style="--c:#A32A22"></button>
      <button class="m-swatch" data-accent="cyan" style="--c:#2FB6C6"></button>
      <button class="m-swatch" data-accent="blue" style="--c:#5B8DEF"></button>
      <button class="m-swatch" data-accent="orange" style="--c:#E08A3A"></button>
      <button class="m-swatch" data-accent="white" style="--c:#E8E0D4"></button>
    </span></div>
    <div class="m-row m-col"><span>外观</span><span class="m-seg">
      <button data-theme-mode="dark" class="is-on">暗色</button><button data-theme-mode="light">亮色</button>
    </span></div>
    <div class="m-row m-col"><span>低余额预警</span>
      <input class="m-num" type="number" value="5" /></div>
    <div class="m-slide"><input class="m-range" type="range" min="1" max="100" value="5" style="--fill:4%" /></div>
    <button class="m-row" data-act="replay"><span>重播开屏</span><span class="m-arrow">→</span></button>
  </div>
</body></html>`;

fs.writeFileSync(path.join(__dirname, 'menu-preview.html'), page, 'utf8');
console.log('wrote menu-preview.html');
