// Build hero-preview.html from client.js so the hero title replacement can be checked visually.
const fs = require('fs');
const path = require('path');

const raw = fs.readFileSync(path.join(__dirname, 'client.js'), 'utf8');
const src = raw.split('\r\n').join('\n');

const start = src.indexOf('/* ============================================================\n   空白页标题');
const anchor = src.indexOf('color: var(--dsw-alias-label-primary);', start);
const end = src.indexOf('\n}\n', anchor) + 3;
let css = src.slice(start, end);

const asset = (n) => fs.readFileSync(path.join(__dirname, 'assets', n + '.b64.txt'), 'utf8').trim();
css = css.split('${EMBLEM_BOOT}').join(asset('emblem-boot'));
css = css.split('${EMBLEM_INK}').join(asset('emblem-ink'));

const page = `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="utf-8" /><style>
html, body { margin: 0; height: 100%; }
body {
  background: #07070b; color: #e8e0d4;
  font-family: "Segoe UI", "Microsoft YaHei", sans-serif;
  display: flex; align-items: center; justify-content: center;
}
body[data-ds-dark-theme] { --dsw-alias-label-primary: #e8e0d4; }
body:not([data-ds-dark-theme]) { background: #e9e3d6; color: #201812; --dsw-alias-label-primary: #201812; }
.Hqq-bq_root { width: 100%; max-width: 760px; padding: 0 24px; }
.Hqq-bq_stack { display: flex; flex-direction: column; gap: 12px; }
.Hqq-bq_headline { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 12px 10px; font-size: 26px; font-weight: 500; line-height: 32px; }
.Hqq-bq_titleGroup { display: flex; align-items: center; gap: 4px 7px; }
.Hqq-bq_previewBadge { border: 1px solid #444; border-radius: 999px; padding: 0 7px; font-size: 12px; }
.Hqq-bq_fishHitbox { width: 34px; height: 34px; border: 1px dashed #666; display: inline-block; }
${css}
</style></head>
<body data-mbcc-console="on" data-ds-dark-theme>
  <div data-phase="hero"><div class="Hqq-bq_root"><div class="Hqq-bq_stack"><div class="Hqq-bq_headline">
    <span class="Hqq-bq_fishHitbox"></span>
    <span class="Hqq-bq_titleGroup"><span>探索未至之境</span><span class="Hqq-bq_previewBadge">预览版</span></span>
  </div></div></div></div>
</body></html>`;

fs.writeFileSync(path.join(__dirname, 'hero-preview.html'), page, 'utf8');
console.log('wrote hero-preview.html · css', css.length, 'chars');
