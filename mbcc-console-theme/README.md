# dsh-theme-mbcc-console

MBCC 控制台风格的 DSH 主题：近黑终端 + 纸质档案两种色板，同一支档案红。
视觉规则来自本仓库的《无期迷途美术风格复刻指南》——**冷形式 × 热内容**。

- 121 个 token，全部 `{ light, dark }` 成对；
- v0.2：窗口/面板直角、MBCC 文件水印、新会话按钮警戒线暗纹、文案改为「MBCC事项」；
- v0.3：左侧工作区用「红色刻度接缝 + 投影」与主区硬分隔；
- v0.46：MBCC事项的图标移进居中内容组（不再把文字挤偏），文字 15px、图标 17px；
- v0.45：MBCC事项按钮的 ⊕ 换成切角括号准星图标（currentColor，跟随强调色/悬停）；
- v0.44：四个动效：发送扫描线、新消息落位、会话红规生长、窗口失焦待机；
- v0.43：彩蛋触发时，局长→shp-13、欢迎→？？；
- v0.42：去掉开屏收尾的切片故障；新增彩蛋（7% 概率某行开屏文字变乱码）；
- v0.40：只保留主题切换的柔光过渡，强调色改为即时切换；
- v0.39：切换主题/强调色加一层柔光过渡（200ms 盖住 → 换 → 200ms 淡出）；「亮色主题」改为「暗色|亮色」分段选择；
- v0.38：左上角红光、标题栏/侧栏发丝线、代码块左规、侧栏虚线接缝全部改为跟随强调色；
- v0.37：设置新增「亮色主题」与「强调色」（红/青/蓝/橙/白，浅色下白自动转黑），强调色通过 token 层切换；
- v0.36：内置「字魂创中圆」作为可选界面字体（5MB，内嵌），设置里可切回默认；标题不受影响；
- v0.35：侧栏故障改为黑白灰的随机错层切片（2–3 条、±2–5px、300ms），去掉青/红色散；
- v0.34：回退为静态红光，压到左上角一块 30vh/260px 高的范围；动画版移除；
- v0.33：红色呼吸层收进对话区左上角（42%×38vh 的有限区域），不再压到输入框；
- v0.32：左侧暗红改为独立的呼吸/火焰伪元素（11s 不规则闪烁 + 微缩放），受「故障动效」开关控制；
- v0.31：对话区左侧 1/3 加一层 10%→透明的暗红渐变（空白页同样生效）；
- v0.30：MBCC事项按钮重做（细描边 / 顶光 / 斜纹更密），hover 时斜纹滑动 + 高光扫过 + 红边发光；
- v0.29：低余额预警改为 1–100 的滑块 + 数字输入，改动即时刷新胶囊状态；
- v0.28：故障动效放慢并加一条下扫亮线（180→900ms，金额色散 240→620ms，标题 780→1400ms，开屏 200→480ms）；
- v0.27：设置面板新增「故障动效」总开关（信号层 / 标题入场 / 金额色散 / 开屏收尾一并受控）；
- v0.26：故障信号层只覆盖左侧工作区列（按侧栏矩形定位，每次触发重算）；
- v0.25：加入低频故障动效（信号层 / 余额数字色散 / 空白页标题切片 / 开屏收尾错位）；改前备份在 `backup/`；
- v0.24：点击左上角徽标呼出主题设置面板（开屏/底纹/余额胶囊/阈值/重播）；
- v0.23：余额胶囊支持点击展开（可用/赠送/币种/更新时间），余额 < 5 时整颗红色慢闪；
- v0.22：标题栏中央加余额胶囊（灵动岛式），数据走 remote.account.getBalance，60s 轮询；
- v0.21：分组分隔改为单条 2px 粗线（会话线改到上沿，杜绝叠线）；工作区图标换成切角档案夹 + 红方角标；
- v0.20：锁版加 3px 光学补偿（padding-right: 6px），抵消右侧文字偏重的观感；
- v0.19：去掉 logoRow 的 4px 左内边距，锁版改用 grid 居中（实测中心偏差 ≤2px）；
- v0.18：侧栏锁版加宽到与下方按钮同宽，徽标 32px、文字 15.5px；
- v0.16：侧栏徽标放大到 28px，文字改为 `MBCC AI TERMINAL`；
- v0.15：空白页标题改全大写；侧栏品牌换成「徽标 + MINOS」（隐藏 deepseek wordmark 与 HARNESS 构建标）；
- v0.14：空白页标题改为「左徽标 + 右机构名」，替换掉原来的 logo + 探索未至之境 + 预览版；
- v0.13：空白页去掉网格（只留纯底色），去掉输入框上沿的红线；
- v0.12：徽标只在有对话的页面显示，空白页（hero）只保留网格；
- v0.11：徽标图层提到网格之上；对话区底部加渐隐遮罩，彻底切断输入框的残留；
- v0.10：composer 改为完全不透明（`--dsw-specific-menu` 去掉 alpha），彻底切断徽标透出；
- v0.9：恢复对话区居中徽标；把 composer 卡片改成不透明，避免徽标从输入框透出来；
- v0.8：撤掉对话区徽标水印（半透明输入框会把它切成半截），只保留开屏徽标；
- v0.7：接入 MBCC 徽标（对话区居中水印 + 开屏徽标 + 副标题）；左栏分组分隔改为单条粗线；
- v0.6：开屏改为垂直居中、字号 13px；左侧工作区栏改成「档案索引」行式（发丝分隔线 / 暗红选中条 / 分组标题 / 侧栏扫描线）；
- v0.5：终端自检式开屏动画（逐行打印 / 状态闪烁 / 红线绘制 / 3s 后淡出，可点击跳过）；
- v0.4：修正底纹挂载点（对话区有自己的不透明底色，必须挂在 `[data-phase]` 这层），改为 24px 网格 + 扫描线；
- 零圆角、1px 描边、纸色主文字；
- 红色只做信号：主操作、焦点环、选中、危险；占比 ≤ 8%；
- 额外质感（颗粒 / 选中色 / 输入区角标 / 代码块红规）走一张小样式表。

![dark](../refs/theme_preview_dark.png)
![light](../refs/theme_preview_light.png)

---

## v0.2 改了什么

| 需求 | 做法 | 位置 |
| --- | --- | --- |
| 窗口四角直角 | `centerCol` 的 16px 圆角来自 `.frame` 自己声明的 `--dsh-windows-content-radius`，body 级 token 覆盖不到 → 在同元素上用 `!important` 归零，并清掉 `centerCol` 的 radius | `client.js` CSS |
| MBCC 文件水印 | `centerCol` 的 `background-image` 贴一张 440×440 的 SVG（MBCC / MINOS BUREAU / FILE NO.019 + 菱形），深色纸 5%、浅色墨 5.5% | `client.js` CSS |
| 新会话警戒线 | `button[class*='_newSession']` 叠 45° 红色斜纹（`!important` 防 hover 的 `background` 简写清掉），左侧 2px 红规；收起成 36px 轨道时关闭 | `client.js` CSS |
| 文案「MBCC事项」 | 隐藏 `_newSessionLabel` 原文，`:not([class*='Mask'])::after` 输出新文案；React 重渲染不会还原 | `client.js` CSS |
| 补充元素 | `centerCol` 四角 L 形 HUD 角标（16px，alpha .16/.18）、标题栏下沿红发丝线 | `client.js` CSS |

> 文案替换是纯 CSS 伪元素：**无障碍树里的 aria-label 仍是「新会话」**，折叠态 tooltip 也仍是原文。
> 要做到彻底，需要改 locale 或加 MutationObserver，属于后续可选项。

> 屏幕最外层那圈圆角是 Windows 11 的 DWM 画的（Electron 窗口），CSS 改不到；
> 主题能保证的是应用内所有面板、对话框、内容区都是直角。

### v0.15 标题大写 + 侧栏品牌

- 空白页标题：`MINOS BUREAU OF CRISIS CONTROL`（22px，字距 .1em）；
- 侧栏品牌来自 `sidebar.brand.mark/name` 两个 slot + 构建标（HARNESS）。整体隐藏，
  换成 20px 徽标 + `MINOS`（Georgia，字距 .16em）。完整机构名在 200px 宽的侧栏放不下，
  按约定用短名；收起成轨道时只留徽标。

### v0.14 空白页标题重做

原结构（`HeroShell`）：

```
.headline
├─ fishHitbox   ← DSH 鱼形 logo
└─ titleGroup
   ├─ span       ← "探索未至之境"
   └─ previewBadge ← "预览版"
```

纯 CSS 替换，不动 React：

- `.headline > *` 全部 `display:none`；
- `::before` 画 46px 徽标（深色用纸色版、浅色用墨色版）；
- `::after` 输出 `Minos Bureau of Crisis Control`（Georgia 26px，字距 .045em）。

### v0.13 空白页：无网格、无红线

- 空白页（hero）不再铺网格，也不画徽标：纯底色，输入框卡片是完整的一块，不会被网格切出"半张格子"；
- 有对话的页面保留网格 + 徽标，底部 22% 渐隐，输入框一带本来就是纯色；
- 删掉 composer 上沿的红发丝线与左上角 HUD 角标。

### v0.12 空白页不再显示徽标

空白页的 composer 在页面中部，底部的渐隐遮罩够不到它，所以徽标还是透进了输入框。
最终方案：**按 phase 区分**。

| 页面 | 背景 |
| --- | --- |
| `[data-phase='hero']`（空白/新建会话） | 只有 24px 网格 + 扫描线，无徽标 |
| `[data-phase='active']`（有对话） | 徽标 + 副标题 + 网格 + 底部 22% 渐隐遮罩 |

这样空白页干净，有对话时才有徽标，且输入框一带被遮罩压成纯色。

### v0.11 图层顺序 + 底部渐隐

两处调整：

1. **徽标压在网格之上**：background-image 顺序改为
   `底部遮罩 → 徽标 → 副标题 → 横网格 → 竖网格 → 扫描线`（CSS 里越靠前越在上层）。
2. **底部渐隐遮罩**：`linear-gradient(to top, bg-base 0 22%, transparent 36%)` 作为最上层，
   把对话区底部 22% 的背景（徽标、网格）压成纯底色。输入框即使半透明，
   后面也是这层纯色，不会再透出半个徽标。
   这层不依赖选中 composer 内部节点，overlay 渲染也管用。

### v0.10 输入框彻底不透明（token 方案，保留）

v0.9 用 `[data-conversation-region='composer'] [class*='_root']` 没生效：
composer 是 `renderSlotChain(..., { overlay: true })` 渲染的，卡片不在那个子树里。

卡片自己的 CSS 是 `background: var(--dsw-specific-menu)`，而该 token 原本带 90% alpha。
直接把 token 改成完全不透明：

| token | 旧 | 新 |
| --- | --- | --- |
| `--dsw-specific-menu`（深） | `#0C0C12E6` | `#0C0C12` |
| `--dsw-specific-menu`（浅） | `#F5F0E6F0` | `#F5F0E6` |

副作用：同一个 token 还用于两个 composer 弹层（slash / @ 面板），它们也一并不透明了——与主题一致。

### v0.9 徽标保留在对话区，输入框不透明（已回滚）

v0.8 直接撤掉徽标是过度修正。真正的问题是 **composer 卡片半透明 + backdrop-filter**，
把背后的徽标透出来、再被卡片边缘切掉。现在：

- 徽标与副标题恢复为对话区背景（`center 46%`，`min(38vh,320px)`）；
- `[data-conversation-region='composer'] [class*='_root']` 的底色改为不透明
  `--dsw-alias-bg-base` 并关闭 backdrop-filter，输入框内不再透出任何背景图案；
- 对话区的网格与扫描线不受影响。

### v0.8 为什么撤掉对话区徽标（已回滚）

输入框（composer）是半透明 + `backdrop-filter`，徽标作为对话区背景会从输入框后面透出来，
被卡片边缘切掉一半，看起来像"残缺的标志"。处理方式：

- 对话区背景只保留扫描线 + 24px 网格；
- 徽标只出现在开屏（不透明背景，不会被切）；
- `assets/emblem-wm-*.webp` 仍然留在包里，想恢复时把两层 `url()` 加回 `[data-phase]` 规则即可。

### v0.7 徽标与水印

| 项 | 做法 |
| --- | --- |
| 素材处理 | 原图是黑线稿 + 透明通道；缩到 360px，按通道生成三种着色：开屏纸色（全不透明）、对话区深色水印（α 22%）、浅色水印（α 14%） |
| 存放 | `assets/emblem-boot.webp` / `emblem-wm-dark.webp` / `emblem-wm-light.webp`（+ PNG 源） |
| 引用方式 | **不读外部路径**：构建时把 WebP 转成 base64 内联进 `client.js` 的 `EMBLEM_*` 常量，插件在任何环境都能独立加载 |
| 对话区 | 取代旧的 MBCC 文字水印，作为 `background-image` 居中（`center 46%`，`min(38vh,320px)`），副标题用 SVG 文本层放在徽标下方 |
| 开屏 | 日志左上方 112px 徽标 + `Minos Bureau of Crisis Control` 小字幕，随日志一起淡入 |
| 左栏分隔 | 分组行只保留一条 2px 粗线（红混边色）；紧邻分组前的会话行用 `:has(+ ...)` 去掉发丝线，避免"细线 + 粗线"双线 |

> 徽标版权属于游戏方，仅用于个人主题；`assets/` 里保留了处理后的源文件，换图时重新跑 `tools/process-emblem.py` 即可。

### v0.6 左侧栏：档案索引风格

参考的是「FILE-102 / 损坏 / 可读」那种档案列表，取它的**版式语言**而不是伪造数据：

| 元素 | 做法 |
| --- | --- |
| 行分隔 | 每条会话一行，底部 1px 发丝线（border-l2 72%） |
| 当前条目 | 暗红横向渐变 + 左侧 2px 红规 + 1px 内描边，接近参考图的选中行 |
| 悬停 | brand 红 9% 的淡底 |
| 分组标题 | 工作区行上下各一道线，字号 12、字距 .08em，当作分区标题 |
| 侧栏底纹 | 1px / 3px 的极淡扫描线，和右侧对话区的网格呼应 |

没有伪造 `FILE-XXX` 编号与「损坏/可读」状态——那是数据层，硬编进 CSS 会变成假信息。
要让每行真的带档案号，需要在浏览器半部加 MutationObserver 读 `data-row-key` 再插入节点，属于下一步。

### v0.5 开屏动画

启动时覆盖全屏，按终端日志逐行打印，3 秒后淡出移除：

```
[MBCC] 建立安全连接 .............. OK
[MBCC] 校验局长权限 .............. CLEARANCE A
[SYS ] 挂载监控矩阵 .............. 16 FEEDS
[SYS ] 同步禁闭者名册 ............ 128 UNITS
[WARN] 检测到狂厄残留，已隔离
[MBCC] 值班控制台已就绪。

局长，欢迎回来。
──────────────────────────────
```

| 项 | 说明 |
| --- | --- |
| 节奏 | 行间隔 130ms，首行 160ms；欢迎语 1.15s；红线 1.5s；3.0s 关闭 |
| 跳过 | 点击任意处 / 按任意键 |
| 重播 | 控制台执行 `__mbccReplayBoot()` |
| 防重 | `sessionStorage['mbcc-boot']`，同一窗口只播一次；重启应用会重播 |
| 无障碍 | `prefers-reduced-motion: reduce` 时完全不播 |
| 失败兜底 | 整段包在 try/catch 里，动画出错不影响应用启动 |

改文案：`client.js` 里的 `BOOT_HTML`；改节奏：CSS 里 `mbcc-boot-in` 的 `animation-delay`。

### v0.4 修正：底纹为什么之前看不见

对话区不是 `centerCol` 自己画的底：`ConversationRoot` 在 `centerCol` 之上又铺了一层
`background: var(--dsw-alias-bg-base)`（元素带 `data-phase="hero|active|settling"`）。
底纹挂在 `centerCol` 上会被这层不透明底整个盖住，所以怎么看都没有。

修法是把底纹挂到 `[class*='_centerCol'] [data-phase]` —— 也就是真正那层画布；
同时把网点换成看得见的组合：

| 层 | 参数 |
| --- | --- |
| 扫描线 | 1px / 4px，深 1.6% · 浅 1.4% |
| 网格 | 24×24px 1px 线，深 5% · 浅 5% |
| 水印 | 440px 的 MBCC 文件水印，4% |

### v0.3 追加

| 需求 | 做法 |
| --- | --- |
| 右侧对话区底纹 | `centerCol` 的 `background-image` 叠两层：12px 网点（深 3.5% / 浅 3.8%）+ 440px 的 MBCC 文件水印；网点是"印刷套准点"的密度，不抢正文 |
| 左侧工作区与主区分隔 | `sidebarCol` 加 1px 红色接缝边框 + 右侧投影；`::after` 用 8/26 节奏的红色刻度线（像警戒带/标尺），让侧栏成为一块独立面板，而不是和主区同色 |

> 两处都只动背景与边框，不改布局；侧栏宽度、栅格列宽都不受影响。

---

## 设计映射

| 风格指南 | DSH token | 取值（dark） |
| --- | --- | --- |
| 黑域底 | `--dsw-alias-bg-base` | `#07070B` |
| 抬升面 | `--dsw-alias-bg-layer-1/2/3` | `#0F0F15 / #15151E / #1D1D28` |
| 纸色主文字 | `--dsw-alias-label-primary` | `#E8E0D4`（不用纯白） |
| 冷蓝灰次级 | `--dsw-alias-label-secondary` | `#A9BCCB` |
| 主按钮填充 | `--dsw-alias-brand-primary` | `#A32A22`（压得住的红） |
| 信号红 | `--dsw-alias-state-business-primary` | `#E04B3A`（焦点 / 选中） |
| 发丝线 | `--dsw-alias-border-l1..l4` | `#FFFFFF12 → #FFFFFF3D` |
| 侧栏 | `--dsw-specific-sidebar-fill` | `#050508`（比底色更深） |
| 用户气泡 | `--dsw-specific-bubble` | `#1B1420`（暗紫黑，非红） |
| 直角 | `--dsw-radius-*` | 全部 `0px` |
| 发丝焦点环 | `--dsw-focus-ring-width` | `1px` |

浅色不是"凑数的一套"：暖纸底 `#E9E3D6`、墨色字 `#201812`、同一支红，
整体是"纸质档案 / 审讯记录"，而不是常见的冷白后台。

---

## 文件

| 文件 | 作用 |
| --- | --- |
| `package.json` | 声明 `exports["./client"]`、`dsh.bundle.patch`、`dsh.client.inject` |
| `cordis.patch.yml` | 往插件树插一行 `{ id: mbcc-console, name: 'dsh-theme-mbcc-console' }` |
| `index.js` | 宿主半边（空 `apply`，只为让 row 挂载） |
| `client.js` | 全部视觉：121 个 token + 一张小样式表 |
| `preview.html` | 用真实 token 渲染的组件预览（深/浅 + 菜单/Toast + 色板） |
| `preview.template.html` | 预览模板，`build-preview.js` 会把 token 注进去 |
| `build-preview.js` | 从 `client.js` 抽 token → 生成 `preview.html` |
| `verify.js` | 契约冒烟测试：token 形状 / 幂等 / dispose / 禁用 token |
| `audit-contrast.js` | 34 组 WCAG 对比度审计 |
| `install.ps1` / `uninstall.ps1` | 本地开发通道的安装 / 卸载（可重复执行） |

---

## 安装（桌面版本地通道）

> 桌面版的 `desktop` profile 由 Electron 独占，`dsh plugin --profile desktop add` 会被拒绝。
> 本地开发走「复制到 node_modules + 加一行 patch + 重启」。

```powershell
# 在仓库根目录执行
powershell -ExecutionPolicy Bypass -File .\mbcc-console-theme\install.ps1
```

脚本做两件事（都可重复执行）：

1. 复制本目录到 `%USERPROFILE%\.dsh\profiles\desktop\node_modules\dsh-theme-mbcc-console`；
2. 如果 `cordis.patch.yml` 里还没有这一行，追加：

```yaml
- insert:
    - id: mbcc-console
      name: 'dsh-theme-mbcc-console'
```

然后**重启 DSH Desktop**。想看浅色版，去「设置 → 通用 → 外观」切浅色即可。

> ⚠️ **如果 profile 里已经装了别的主题（例如 `theme-endfield`）**：两套主题会抢同一批 token，
> 后注册的按 token 覆盖前者，但另一套注入的 CSS 仍在。用本主题前先把那一行改成 `disabled: true`，
> 两套不要同时启用。`install.ps1` 检测到这种情况会打印提示。
>
> ⚠️ 这是开发通道：`node_modules` 里散放的包，下次通过插件管理装/卸任何插件时会被
> pnpm 当作 extraneous package 清掉。稳定后建议发 npm 走插件市场。

### 卸载

```powershell
powershell -ExecutionPolicy Bypass -File .\mbcc-console-theme\uninstall.ps1
```

删掉 patch 行与包目录，重启生效。

---

## 验证

```powershell
node mbcc-console-theme\verify.js          # 契约 + 幂等 + dispose
node mbcc-console-theme\audit-contrast.js  # 34 组对比度，全部 ≥ AA
node mbcc-console-theme\build-preview.js   # 重新生成 preview.html
```

当前结果：

```
token count : 121
OK: contract + idempotency + dispose all pass
ALL 34 PAIRS PASS
```

### 装上之后怎么确认生效

浏览器 DevTools（Web GUI）或 Electron 的开发者工具里：

```js
document.querySelector('style[data-plugin="dsh-theme-mbcc-console"]')   // 存在 = 客户端半部跑了
document.body.getAttribute('data-mbcc-console')                        // "on"
getComputedStyle(document.body).getPropertyValue('--dsw-alias-bg-base') // #07070B / #E9E3D6
```

CSS 类名是构建哈希（`BynINW_frame` 这种），不要用它写选择器；
主题自己的样式只挂在 `body[data-mbcc-console="on"]` 和
`[data-conversation-region="composer"]` 这两个稳定钩子上。

---

## 三个不要

- 不要覆盖 `--dsh-font-family-*` / `--dsh-content-font-size`：ThemePresenter 每次发布
  快照都会重写它们，改了也会被冲掉。
- 不要猜哈希类名。
- 不要用同一个 `source` 重复 `overrideTokens`：同 source 再调是整层替换，
  dispose 配对错乱会把层删掉。

## 已知边界

- 原生欢迎页 / 托盘不在主题范围内（系统字体与配色）。
- 菜单的半透明依赖 `backdrop-filter`；关掉模糊会退化成不透明面板，不会坏。
- 字体仍是用户设置里的字体；主题只调颜色、圆角、描边与少量质感。
- 主题不改任何布局结构，升级 DSH 后一般不需要跟着改。
