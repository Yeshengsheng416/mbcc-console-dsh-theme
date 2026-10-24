// Build ws-preview.html: two workspace groups + one session, to check the separator and folder icon.
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'client.js'), 'utf8').split('\r\n').join('\n');
const start = src.indexOf('/* ============================================================\n   左栏：档案索引风格');
const end = src.indexOf('/* ============================================================\n   新会话按钮');
let css = src.slice(start, end);

const page = `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="utf-8" /><style>
html, body { margin: 0; height: 100%; }
body {
  background: #050508; color: #e8e0d4; padding: 40px 24px;
  font-family: "Segoe UI", "Microsoft YaHei", sans-serif;
  --dsw-alias-label-primary: #e8e0d4;
  --dsw-alias-label-secondary: #a9bccb;
  --dsw-alias-border-l1: #ffffff12;
  --dsw-alias-border-l2: #ffffff1f;
  --dsw-alias-border-l3: #ffffff29;
  --dsw-alias-brand-primary: #a32a22;
  --dsw-alias-business-primary: #e04b3a;
}
.col { width: 260px; }
.row { display: flex; align-items: center; gap: 8px; height: 34px; padding: 0 8px; font-size: 13px; }
${css}
</style></head>
<body data-mbcc-console="on" data-ds-dark-theme>
  <div class="col">
    <div class="row" data-row-key="workspace:mbcc">
      <span class="Hqq-bq_folder"></span><span class="Hqq-bq_title">MBCCControl</span>
    </div>
    <div class="row" data-row-key="session:a"><span class="Hqq-bq_title">无期迷途美术风格复刻研究</span></div>
    <div class="row" data-row-key="session:b"><span class="Hqq-bq_title">项目解析与说明文档</span></div>
    <div class="row" data-row-key="workspace:default">
      <span class="Hqq-bq_folder"></span><span class="Hqq-bq_title">默认工作区</span>
    </div>
    <div class="row" data-row-key="session:c"><span class="Hqq-bq_title">DSH主题编写研究</span></div>
  </div>
</body></html>`;

fs.writeFileSync(path.join(__dirname, 'ws-preview.html'), page, 'utf8');
console.log('wrote ws-preview.html · css', css.length);
