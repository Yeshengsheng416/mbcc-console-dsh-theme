// Build preview.html from preview.template.html + the real token table in client.js.
// Run: node build-preview.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const FILE = path.join(__dirname, 'client.js');
const TEMPLATE = path.join(__dirname, 'preview.template.html');
const OUT = path.join(__dirname, 'preview.html');

const source = fs.readFileSync(FILE, 'utf8');
let captured = null;
const noop = () => {};
const head = { children: [], appendChild: noop, querySelectorAll: () => [] };
const bodyEl = { attrs: {}, setAttribute: noop, removeAttribute: noop, querySelectorAll: () => [] };
const sandbox = {
  window: {},
  document: {
    head,
    body: bodyEl,
    createElement: () => ({ setAttribute: noop, remove: noop }),
    querySelectorAll: () => [],
  },
  console,
};
sandbox.window.__ModuleLoader__ = { load: (c) => (captured = c) };
vm.createContext(sandbox);
vm.runInContext(source, sandbox, { filename: FILE });
const mod = captured.factory(() => ({}));

let tokens = {};
mod.apply({
  get: () => ({
    overrideTokens: (_source, t) => {
      tokens = t;
      return () => {};
    },
  }),
  effect: noop,
});

const html = fs
  .readFileSync(TEMPLATE, 'utf8')
  .replace('/*__TOKENS__*/{}', JSON.stringify(tokens, null, 0));

fs.writeFileSync(OUT, html, 'utf8');
console.log('wrote', OUT, '·', Object.keys(tokens).length, 'tokens');
