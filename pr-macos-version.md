# feat(macos): macOS 适配整合（darwin 品牌 / 安装脚本 / 余额胶囊修复）

> 这是把 macOS 实测中发现的改动**整合成一个版本**的 PR：`macos-version.patch` 一键应用；
> 若维护者更希望拆分评审，也可拆成 2 个 PR（余额胶囊 / macOS 适配），对应的原子补丁也一并附上。

## 背景

主题按 Windows 开发。在 macOS + DSH 0.2.1-rc.3 上实测，发现 2 个 macOS 结构断点和 2 个余额胶囊 bug：

| # | 问题 | 根因 |
| --- | --- | --- |
| 1 | 侧栏仍是 `deepseek` + `HARNESS`，点徽标打不开设置面板 | darwin 下品牌是 `<span>`，主题选择器全是 `button[class*='_brand']` |
| 2 | 品牌虽可点击，但窗口拖拽区会吞掉点击 | `logoRow` 带 `data-window-drag`，品牌未排除 `-webkit-app-region` |
| 3 | 人民币账户余额胶囊显示 `$0.00` 并常闪 | 多币种钱包只取 `wallets[0]`，阈值不分币种、没有关闭项 |
| 4 | 面板里「余额胶囊」开关拨动后胶囊不动 | 胶囊挂在 `<html>` 下，隐藏规则写成 `body[...] #mbcc-balance`（后代选择器） |

## 改动（建议 3 个 commit）

### 1. `feat(macos): 适配 darwin 品牌结构，新增 macOS 安装脚本`

- 选择器 `button[class*='_brand']` → `[class*='_logoRow'] > [class*='_brand']`（CSS 9 处、JS 2 处）：
  同时匹配 button/span，直接子代避免误伤 `_brandIdentity` / `_brandMark` / `_brandName`；
  `querySelector` 与 `closest` 同步；
- 品牌加 `-webkit-app-region: no-drag`，点击不再被拖拽区吞掉；
- 新增 `install.sh` / `uninstall.sh`（POSIX sh）：
  - 处理新建 profile 的 `[]` 占位符（直接 append 会生成非法 YAML）；
  - 卸载后无其它条目时回填 `[]`，避免只剩注释解析成 `null`；
- 文档：`使用说明.md` 增加 macOS 安装/卸载与差异说明，`README.md` 补 macOS 命令。

### 2. `fix(balance): 多币种钱包选择，阈值 0=关闭`

- 取余额最大的钱包（有余额的 CNY 会胜出；全为 0 保持原顺序）；
- 赠送余额只统计同币种；
- 阈值 `0` = 关闭预警，`threshold > 0 && …`；
- 面板范围 1–100 → 0–100，标签「低余额预警（0 = 关）」；
- 修掉 `|| 5` 吞掉 0 的问题。

### 3. `fix(balance): 胶囊开关改用兄弟选择器`

```css
body[data-mbcc-pill='off'] ~ #mbcc-balance { display: none !important; }
body[data-mbcc-fx='off'] ~ #mbcc-balance .b-amt.is-tick { … }
body[data-mbcc-fx='off'] ~ #mbcc-signal { … }
```

## 验证

- **macOS 品牌**：headless Chrome 双 DOM（darwin span / win32 button）——旧选择器 darwin=false、win32=true；新选择器两边都命中，`::after` 为 `MBCC AI TERMINAL`，子元素 `display:none`，`closest()` 可用；
- **胶囊开关**：按真实挂载点 `documentElement.appendChild` 复现——旧选择器 `display:block`（不隐藏），兄弟选择器 `display:none`；
- **多币种**：`[{USD,0.00},{CNY,42.50}]` → 选中 CNY 42.50；阈值 5 不闪、阈值 0 永不闪；
- **安装脚本**：新建 `[]` 模板、真实 patch、重复安装、卸载回滚逐字节一致；
- `node --check`、主题自带 `verify.js`（契约 / 幂等 / dispose）通过；
- macOS + DSH 0.2.1-rc.3 实机重启验证：品牌、面板、余额、开关。

## 说明

- 版本号未改（仍为 0.50.0），发版命名交给维护者；
- macOS 窗口最外圈圆角由系统绘制，无法改；Windows 标题栏下沿红丝线在 macOS 无对应图层，已写入「已知限制」，属预期差异；
- `install.ps1` 在新建 profile 上也有同样的 `[]` 追加问题，建议另开小 PR 修（本 PR 未盲改 PowerShell）；
- 如需拆分：`mbcc-balance-multicurrency.patch` + `pill-toggle.patch` 为一个 PR，`macos-support.patch` 为另一个。

Closes #（issue 编号，如有）
