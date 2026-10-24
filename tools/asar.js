// Minimal ASAR reader: list / read files inside app.asar without Electron.
// Usage:
//   node asar.js list <pattern>
//   node asar.js read <path-in-asar> [outFile]
const fs = require('fs');

const ASAR = 'D:/Program Files (x86)/DSH/resources/app.asar';
const buf = fs.readFileSync(ASAR);

// Locate the JSON header ("{"files":...) and brace-match to its end.
const start = buf.indexOf('{"files"');
if (start < 0) throw new Error('asar header not found');

let depth = 0;
let inStr = false;
let esc = false;
let end = -1;
for (let i = start; i < buf.length; i++) {
  const c = buf[i];
  if (inStr) {
    if (esc) esc = false;
    else if (c === 92) esc = true; // backslash
    else if (c === 34) inStr = false;
    continue;
  }
  if (c === 34) inStr = true;
  else if (c === 123) depth++;
  else if (c === 125) {
    depth--;
    if (depth === 0) { end = i + 1; break; }
  }
}

const header = JSON.parse(buf.toString('utf8', start, end));
const dataStart = 8 + buf.readUInt32LE(4);

function walk(node, base, out) {
  if (!node.files) {
    out.push({ path: base, size: node.size, offset: node.offset });
    return out;
  }
  for (const [name, child] of Object.entries(node.files)) {
    walk(child, base ? base + '/' + name : name, out);
  }
  return out;
}

const all = walk(header, '', []);
const cmd = process.argv[2] || 'list';

if (cmd === 'list') {
  const re = process.argv[3] ? new RegExp(process.argv[3], 'i') : null;
  const hits = all.filter((f) => !re || re.test(f.path));
  hits.slice(0, 300).forEach((f) => console.log(String(f.size).padStart(9), f.path));
  console.log('---', hits.length, 'match(es)');
} else if (cmd === 'read') {
  const target = process.argv[3];
  const out = process.argv[4];
  const hit = all.find((f) => f.path === target || f.path.endsWith('/' + target));
  if (!hit) { console.error('not found:', target); process.exit(1); }
  const content = buf.subarray(dataStart + Number(hit.offset), dataStart + Number(hit.offset) + hit.size);
  if (out) { fs.writeFileSync(out, content); console.log('wrote', out, content.length, 'bytes'); }
  else process.stdout.write(content);
}
