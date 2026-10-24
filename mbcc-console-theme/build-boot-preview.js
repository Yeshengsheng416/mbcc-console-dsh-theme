// Build boot-preview.html from client.js so the preview can never drift.
// Run: node build-boot-preview.js
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'client.js'), 'utf8');

const cssStart = src.indexOf('const CSS = `');
const cssEnd = src.indexOf('`;', cssStart);


const htmlStart = src.indexOf('const BOOT_HTML = `');
const htmlEnd = src.indexOf('`;', htmlStart);
let bootHtml = src.slice(htmlStart + 'const BOOT_HTML = `'.length, htmlEnd);

const asset = (name) => fs.readFileSync(path.join(__dirname, 'assets', name + '.b64.txt'), 'utf8').trim();
const subs = {
  '${EMBLEM_BOOT}': asset('emblem-boot'),
  '${EMBLEM_WM_DARK}': asset('emblem-wm-dark'),
  '${EMBLEM_WM_LIGHT}': asset('emblem-wm-light'),
};
for (const [k, v] of Object.entries(subs)) bootHtml = bootHtml.split(k).join(v);
let css = src.slice(cssStart + 'const CSS = `'.length, cssEnd);
for (const [k, v] of Object.entries(subs)) css = css.split(k).join(v);

const page = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<title>MBCC Boot — preview</title>
<style>
html, body { margin: 0; height: 100%; background: #07070B; }
${css}
#boot-stage { position: fixed; inset: 0; }
</style>
</head>
<body>
<div class="boot-stage">
  <div id="mbcc-boot" class="on">${bootHtml}</div>
</div>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'boot-preview.html'), page, 'utf8');
console.log('wrote boot-preview.html');
