// Build balance-preview.html: closed, expanded, and low-balance states.
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'client.js'), 'utf8').split('\r\n').join('\n');
const start = src.indexOf('/* ============================================================\n   余额胶囊');
const end = src.indexOf('\n/* ============================================================', start + 10);
let css = src.slice(start, end);

const asset = (n) => fs.readFileSync(path.join(__dirname, 'assets', n + '.b64.txt'), 'utf8').trim();
css = css.split('${EMBLEM_BOOT}').join(asset('emblem-boot'));

const pill = (open, low, amount, rows) => `
  <div id="mbcc-balance" class="${open ? 'is-open' : ''} ${low ? 'is-low' : ''}" style="top:20px">
    <span class="b-dot"></span><span class="b-label">BALANCE</span>
    <span class="b-amt">${amount}</span><span class="b-caret">▾</span>
    <div class="b-panel">
      <div class="b-head">ACCOUNT / BALANCE</div>
      <div class="b-row"><span>可用余额</span><b class="b-main">${amount}</b></div>
      <div class="b-row"><span>赠送余额</span><b class="b-bonus">¥0.00</b></div>
      <div class="b-row"><span>币种</span><b class="b-cur">CNY</b></div>
      <div class="b-row"><span>更新于</span><b class="b-time">23:59:12</b></div>
    </div>
  </div>`;

const page = `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="utf-8" /><style>
html, body { margin: 0; height: 100%; }
body { background: #07070b; font-family: "Segoe UI", sans-serif; }
.bar {
  height: 40px; display: flex; align-items: center; padding: 0 12px; gap: 16px;
  color: #8b949e; font-size: 12px; border-bottom: 1px solid #1a1a22;
  position: relative;
}
.bar .spacer { flex: 1; }
.bar .tag { position: absolute; left: 10px; bottom: 4px; font: 9px/1 Consolas, monospace; color: #555c66; letter-spacing: .1em; }
.wrap { position: relative; height: 90px; }
.wrap.tall { height: 210px; }
${css}
.bar #mbcc-balance { position: absolute; top: 7px; left: 50%; transform: translateX(-50%); }
</style></head>
<body>
  <div class="wrap"><div class="bar"><span>应用</span><span>编辑</span><span class="spacer"></span><span>—</span><span>□</span><span>×</span>
    ${pill(false, false, '¥12.34')}
    <span class="tag">DEFAULT</span>
  </div></div>
  <div class="wrap tall"><div class="bar"><span>应用</span><span>编辑</span><span class="spacer"></span><span>—</span><span>□</span><span>×</span>
    ${pill(true, false, '¥12.34')}
    <span class="tag">EXPANDED</span>
  </div></div>
  <div class="wrap"><div class="bar"><span>应用</span><span>编辑</span><span class="spacer"></span><span>—</span><span>□</span><span>×</span>
    ${pill(false, true, '¥3.20')}
    <span class="tag">LOW &lt; 5</span>
  </div></div>
</body></html>`;

fs.writeFileSync(path.join(__dirname, 'balance-preview.html'), page, 'utf8');
console.log('wrote balance-preview.html');
