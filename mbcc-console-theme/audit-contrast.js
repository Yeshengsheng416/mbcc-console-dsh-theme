// WCAG contrast audit for the theme's key text/surface pairs.
// Run: node audit-contrast.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadTokens() {
  const source = fs.readFileSync(path.join(__dirname, 'client.js'), 'utf8');
  let captured = null;
  const noop = () => {};
  const head = { children: [], appendChild: noop, querySelectorAll: () => [] };
  const bodyEl = { attrs: {}, setAttribute: noop, removeAttribute: noop, querySelectorAll: () => [] };
  const sandbox = {
    window: { __ModuleLoader__: { load: (c) => (captured = c) } },
    document: { head, body: bodyEl, createElement: () => ({ setAttribute: noop, remove: noop }), querySelectorAll: () => [] },
    console,
  };
  sandbox.window.__ModuleLoader__.load = (c) => (captured = c);
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox);
  const mod = captured.factory(() => ({}));
  let out = {};
  const ctx = {
    get: () => ({
      overrideTokens: (_s, t) => {
        out = t;
        return () => {};
      },
    }),
    effect: noop,
  };
  mod.apply(ctx);
  return out;
}

const TOKENS = loadTokens();

function parse(hex) {
  const m = /^#([0-9a-f]{6})([0-9a-f]{2})?$/i.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return {
    r: (n >> 16) & 255,
    g: (n >> 8) & 255,
    b: n & 255,
    a: m[2] ? parseInt(m[2], 16) / 255 : 1,
  };
}

function over(fg, bg) {
  const a = fg.a;
  return {
    r: fg.r * a + bg.r * (1 - a),
    g: fg.g * a + bg.g * (1 - a),
    b: fg.b * a + bg.b * (1 - a),
    a: 1,
  };
}

function lum(c) {
  const f = (v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
}

function ratio(a, b) {
  const l1 = lum(a);
  const l2 = lum(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function val(token, mode) {
  const t = TOKENS[token];
  if (!t) return null;
  return parse(t[mode]);
}

function pair(name, fgToken, bgToken, min, mode) {
  const fg = val(fgToken, mode);
  let bg = val(bgToken, mode);
  if (!fg || !bg) {
    console.log(`${mode.padEnd(5)} ${name.padEnd(34)} SKIP (unparseable token)`);
    return null;
  }
  if (bg.a < 1) {
    const base = val('--dsw-alias-bg-base', mode);
    bg = over(bg, base);
  }
  if (fg.a < 1) {
    // translucent text: composite on the surface it sits on
    const base = val('--dsw-alias-bg-base', mode);
    fg = over(fg, base);
  }
  const r = ratio(fg, bg);
  const pass = r >= min ? 'PASS' : 'LOW ';
  console.log(`${mode.padEnd(5)} ${name.padEnd(34)} ${r.toFixed(2).padStart(5)} : 1   ${pass} (min ${min})`);
  return { name, mode, r, min };
}

const rows = [];
for (const mode of ['light', 'dark']) {
  rows.push(pair('primary text / window', '--dsw-alias-label-primary', '--dsw-alias-bg-base', 7, mode));
  rows.push(pair('secondary text / window', '--dsw-alias-label-secondary', '--dsw-alias-bg-base', 4.5, mode));
  rows.push(pair('tertiary text / window', '--dsw-alias-label-tertiary', '--dsw-alias-bg-base', 4.5, mode));
  rows.push(pair('caption / window', '--dsw-alias-label-caption', '--dsw-alias-bg-base', 3, mode));
  rows.push(pair('link / window', '--dsw-alias-link', '--dsw-alias-bg-base', 4.5, mode));
  rows.push(pair('button text / brand', '--dsw-alias-label-primary-inverted', '--dsw-alias-brand-primary', 4.5, mode));
  rows.push(pair('primary text / layer-1', '--dsw-alias-label-primary', '--dsw-alias-bg-layer-1', 7, mode));
  rows.push(pair('primary text / sidebar', '--dsw-alias-label-primary', '--dsw-specific-sidebar-fill', 7, mode));
  rows.push(pair('primary text / bubble', '--dsw-alias-label-primary', '--dsw-specific-bubble', 7, mode));
  rows.push(pair('primary text / input', '--dsw-alias-label-primary', '--dsw-specific-input-major', 7, mode));
  rows.push(pair('primary text / menu', '--dsw-alias-label-primary', '--dsw-menu-surface-fill', 4.5, mode));
  rows.push(pair('error / window', '--dsw-alias-state-error-primary', '--dsw-alias-bg-base', 3, mode));
  rows.push(pair('success / window', '--dsw-alias-state-success-primary', '--dsw-alias-bg-base', 3, mode));
  rows.push(pair('warn / window', '--dsw-alias-state-warn-primary', '--dsw-alias-bg-base', 3, mode));
  rows.push(pair('focus ring / window', '--dsw-focus-ring-color', '--dsw-alias-bg-base', 3, mode));
  rows.push(pair('inline code text / window', '--dsw-alias-label-primary', '--dsw-alias-markdown-inline-code', 7, mode));
  rows.push(pair('code block text / block', '--dsw-alias-label-primary', '--dsw-alias-markdown-code-block', 7, mode));
}

const low = rows.filter((r) => r && r.r < r.min);
console.log('');
console.log(low.length ? `LOW CONTRAST (${low.length}):` : `ALL ${rows.filter(Boolean).length} PAIRS PASS`);
for (const r of low) console.log(` - ${r.mode} ${r.name}: ${r.r.toFixed(2)} < ${r.min}`);
process.exit(low.length ? 1 : 0);
