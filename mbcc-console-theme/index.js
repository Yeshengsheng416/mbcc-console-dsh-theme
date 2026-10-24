'use strict';

/**
 * dsh-theme-mbcc-console — 宿主（Node）半部。
 *
 * 唯一作用是让包成为一棵能被 loader 挂载的 cordis 插件：
 * loader 以 ESM 方式 import 本文件，读取 name 与 apply。
 * 真正的视觉全部在浏览器半部 client.js。
 *
 * 两个死坑：
 *   1. name / apply / Config 必须是 module.exports 字面量里的静态属性；
 *      DSH 用 cjs-module-lexer 静态分析 CJS，事后赋值它看不见，
 *      表现是「apply 在跑、设置表单却是空的」。
 *   2. 需要可持久化设置时才用 Config，且每个字段都要 .volatile()。
 */

const NAME = 'dsh-theme-mbcc-console';

/** 主题是纯浏览器行为：宿主半边没有要挂载的东西。 */
function apply() {}

module.exports = {
  name: NAME,
  apply,
  // 字面量属性，值可以就是 undefined（= 这个插件没有可配置项）。
  Config: undefined,
};
