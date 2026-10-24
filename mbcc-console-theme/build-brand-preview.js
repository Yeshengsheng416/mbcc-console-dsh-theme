// Build brand-preview.html from client.js (sidebar brand replacement).
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'client.js'), 'utf8').split('\r\n').join('\n');
const start = src.indexOf('/* ============================================================\n   侧栏品牌');
const next = src.indexOf('\n/* ============================================================', start + 10);
let css = src.slice(start, next);

const asset = (n) => fs.readFileSync(path.join(__dirname, 'assets', n + '.b64.txt'), 'utf8').trim();
css = css.split('${EMBLEM_BOOT}').join(asset('emblem-boot'));
css = css.split('${EMBLEM_INK}').join(asset('emblem-ink'));

const page = `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="utf-8" /><style>
html, body { margin: 0; height: 100%; }
body {
  background: #07070b; color: #e8e0d4;
  font-family: "Segoe UI", "Microsoft YaHei", sans-serif;
  display: flex; align-items: flex-start; gap: 40px; padding: 120px 24px 24px;
}
body[data-ds-dark-theme] { --dsw-alias-label-primary: #e8e0d4; }
body:not([data-ds-dark-theme]) { background: #e9e3d6; color: #201812; --dsw-alias-label-primary: #201812; }
.side { width: 220px; padding: 8px; }
.side + .side { border-left: 1px solid #333; }
button { background: none; border: 0; color: inherit; font: inherit; cursor: pointer; padding: 0; }
.Hqq-bq_sidebarCol { width: 220px; }
.Hqq-bq_brand { width: 100%; height: 40px; }
.Hqq-bq_brandIdentity { display: flex; align-items: center; gap: 8px; }
.Hqq-bq_brandMark { width: 20px; height: 20px; border: 1px dashed #666; }
.Hqq-bq_brandName { font-size: 18px; font-weight: 600; }
.Hqq-bq_localBuildBrand { border: 1px solid #555; border-radius: 3px; padding: 0 6px; font-size: 10px; }
.Hqq-bq_logoRow { display: flex; align-items: center; padding: 8px 0 8px 4px; }
.Hqq-bq_newSession { height: 38px; margin: 10px 2px 0; border: 1px solid #2a2a36; background: #15151e; display: flex; align-items: center; justify-content: center; font-size: 14px; }
${css}
</style></head>
<body data-mbcc-console="on" data-ds-dark-theme>
  <div class="side">
    <div class="Hqq-bq_sidebarCol"><div class="Hqq-bq_logoRow"><button class="Hqq-bq_brand"><span class="Hqq-bq_brandIdentity">
      <span class="Hqq-bq_brandMark"></span><span class="Hqq-bq_brandName">deepseek</span><span class="Hqq-bq_localBuildBrand">HARNESS</span>
    </span></button></div>
    <div class="Hqq-bq_newSession">+ MBCC事项</div>
    </div>
  </div>
</body></html>`;

fs.writeFileSync(path.join(__dirname, 'brand-preview.html'), page, 'utf8');
console.log('wrote brand-preview.html · css', css.length);
