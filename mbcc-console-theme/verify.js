// Smoke-test mbcc-console-theme/client.js against a stub ModuleLoader + minimal DOM.
// Run: node verify-mbcc-theme.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const FILE = path.join(__dirname, 'client.js');
const source = fs.readFileSync(FILE, 'utf8');

function el(tag) {
  return {
    tag,
    attrs: {},
    children: [],
    textContent: '',
    parentNode: null,
    setAttribute(k, v) { this.attrs[k] = v; },
    removeAttribute(k) { delete this.attrs[k]; },
    appendChild(child) { child.parentNode = this; this.children.push(child); return child; },
    removeChild(child) {
      const i = this.children.indexOf(child);
      if (i >= 0) this.children.splice(i, 1);
      child.parentNode = null;
    },
  };
}

const head = el('head');
const body = el('body');
const query = () => [];
head.querySelectorAll = body.querySelectorAll = query;

const document = {
  head,
  body,
  querySelectorAll: query,
  createElement: el,
};
const window = {};

let captured = null;
const sandbox = { window, document, console };
sandbox.window.__ModuleLoader__ = {
  load({ id, factory }) {
    captured = { id, factory };
  },
};

vm.createContext(sandbox);
vm.runInContext(source, sandbox, { filename: FILE });
if (!captured) throw new Error('ModuleLoader.load was never called');

const mod = captured.factory((name) => {
  throw new Error('unexpected require: ' + name);
});

// --- stub theme service (replicates runtime validation) ---------------------
const layers = new Map();
const effects = [];
const theme = {
  overrideTokens(source, tokens) {
    const validated = {};
    for (const [name, value] of Object.entries(tokens)) {
      if (typeof value === 'string') throw new TypeError(`bare string for ${name}`);
      if (
        typeof value !== 'object' ||
        value === null ||
        typeof value.light !== 'string' ||
        typeof value.dark !== 'string'
      ) {
        throw new TypeError(`invalid pair for ${name}`);
      }
      validated[name] = { light: value.light, dark: value.dark };
    }
    if (layers.has(source)) throw new Error(`layer ${source} re-registered without dispose`);
    layers.set(source, validated);
    return () => layers.delete(source);
  },
};
const ctx = {
  get: (service) => (service === 'theme' ? theme : undefined),
  effect: (execute) => {
    const disposable = execute();
    effects.push({ execute, disposable });
  },
};

const problems = [];
if (mod.name !== 'dsh-theme-mbcc-console') problems.push('exports.name mismatch');
if (!Array.isArray(mod.inject) || !mod.inject.includes('theme')) problems.push('inject must include theme');
if (typeof mod.apply !== 'function') problems.push('apply missing');

// --- service not ready: apply must NOT lock the flag ------------------------
mod.apply({ get: () => undefined, effect() {} });
if (window.__mbccConsoleApplied) problems.push('locked flag while theme service absent');

// --- first mount ------------------------------------------------------------
mod.apply(ctx);
const tokens = [...layers.values()][0] || {};
const count = Object.keys(tokens).length;

// forbidden token families (presenter rewrites them every snapshot)
const FORBIDDEN = /^--dsh-(content-font-size|code-font-size|terminal-font-size|font-family-)/;
for (const name of Object.keys(tokens)) {
  if (FORBIDDEN.test(name)) problems.push('forbidden token overridden: ' + name);
}

// every value must be a non-empty css string
for (const [name, pair] of Object.entries(tokens)) {
  for (const mode of ['light', 'dark']) {
    if (!pair[mode] || !pair[mode].trim()) problems.push(`${name} empty ${mode}`);
  }
}

const styleTags = () => head.children.filter((c) => c.tag === 'style');

// --- idempotency ------------------------------------------------------------
mod.apply(ctx);
if (styleTags().length !== 1) problems.push('duplicate stylesheet on 2nd mount');
if (layers.size !== 1) problems.push('duplicate token layer on 2nd mount');

// --- dispose ----------------------------------------------------------------
for (const e of effects) e.disposable();
if (layers.size !== 0) problems.push('dispose left a token layer');
if (styleTags().length !== 0) problems.push('dispose left a stylesheet');
if (Object.keys(body.attrs).length !== 0) problems.push('dispose left body attributes');
if (window.__mbccConsoleApplied) problems.push('dispose left the applied flag');

console.log('module id       :', captured.id);
console.log('exports.name    :', mod.name);
console.log('exports.inject  :', JSON.stringify(mod.inject));
console.log('token count     :', count);
console.log('style tag       :', styleTags().map((c) => `${c.attrs['data-plugin']} build=${c.attrs['data-build']}`));
console.log('body attribute  :', JSON.stringify(body.attrs));

const cssText = fs.existsSync(FILE) ? '' : '';
console.log(problems.length ? 'FAIL:\n - ' + problems.join('\n - ') : 'OK: contract + idempotency + dispose all pass');
process.exit(problems.length ? 1 : 0);
