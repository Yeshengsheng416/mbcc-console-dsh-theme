// Build button-preview.html: the refined new-session button (normal + hover).
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'client.js'), 'utf8').split('\r\n').join('\n');
const start = src.indexOf('/* ============================================================\n   新会话按钮');
const end = src.indexOf('\n/* ============================================================', start + 10);
const css = src.slice(start, end);

const page = `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="utf-8" /><style>
html, body { margin: 0; height: 100%; }
body {
  background: #050508; color: #e8e0d4; padding: 140px 24px 40px;
  font-family: "Segoe UI", "Microsoft YaHei", sans-serif;
  --dsw-alias-label-primary: #e8e0d4;
  --dsw-alias-label-secondary: #a9bccb;
  --dsw-alias-brand-primary: #a32a22;
  --dsw-alias-button-elevated-fill: #101016;
}
.col { width: 260px; }
${css}
button { font: inherit; }
.Hqq-bq_newSession { width: 100%; height: 38px; margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; cursor: pointer; container-type: inline-size; }
.Hqq-bq_newSessionLabelMask { flex: 1; min-width: 0; display: flex; align-items: center; justify-content: center; gap: 6px; }
.Hqq-bq_newSessionContent { display: flex; align-items: center; justify-content: center; gap: 6px; width: 100cqw; }
.Hqq-bq_newSessionLabel { white-space: nowrap; }
</style></head>
<body data-mbcc-console="on" data-ds-dark-theme>
  <div class="col">
    <button class="Hqq-bq_newSession" id="b1">
      <span class="Hqq-bq_newSessionLabelMask">
        <span class="Hqq-bq_newSessionContent">
          <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.4" fill="none" stroke="currentColor" stroke-width="1"/><path d="M8 5v6M5 8h6" stroke="currentColor" stroke-width="1"/></svg>
          <span class="Hqq-bq_newSessionLabel Hqq-bq_wide">新会话</span>
        </span>
      </span>
    </button>
  </div>
</body></html>`;

fs.writeFileSync(path.join(__dirname, 'button-preview.html'), page, 'utf8');
console.log('wrote button-preview.html');
