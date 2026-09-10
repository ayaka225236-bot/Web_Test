# 静态内容 Wiki 站点

一个基于 **Next.js（App Router）+ TypeScript** 的纯静态 wiki 站点。
没有后端服务，所有页面在构建期生成。

- **版式**：单栏通栏内容区 + 左上角滑出导航 + 顶部搜索框。
- **配色**：蓝白基调，另含深色主题，可一键切换。
- **内容与实现分离**：文字、图片清单、站点信息、版式参数全部在 `data/`，组件只负责渲染。
- **几乎不需要客户端 JS**：导航滑出与主题切换都是纯 CSS 实现的。

> 关于版式来源：设计参考的是维基类站点的通用版式结构，
> **没有复制任何外部站点的文字、图片或代码**，示例文案均为本项目自写的占位内容。

---

## 快速开始

```bash
npm install          # 1. 首次安装依赖
npm run dev          # 2. 本地预览 http://localhost:3000
npm run build        # 3. 构建生产版本（含类型检查）
npm run start        #    以生产模式启动（需先 build）
```

> **`npm run dev` 与 `npm run build` 不要交叉使用**：dev 会覆盖 `.next/` 里的生产产物，
> 之后直接 `npm run start` 会报 *Could not find a production build*，需要重新 build。
>
> 端口被占用时：`npm run dev -- --port 3100`（`--` 不能省）。
>
> 如果 `npm install` 报 `EALLOWSCRIPTS`：npm 12 起的安装脚本安全策略，
> 必要的包已在 `package.json` 的 `allowScripts` 字段放行。
>
> 如果报缓存目录 `EPERM`：`npm install --cache .npm-cache`（该目录已被 git 忽略）。

---

## 版式结构

| 区域 | 组件 | 说明 |
| --- | --- | --- |
| 左上角导航 | `NavDrawer.tsx` | 图标固定在左上角，**鼠标移上去即滑出**；面板里是站点列表 |
| 顶部搜索框 | `Header.tsx` | 吸顶，**只有搜索框**（功能尚未实现，见下文） |
| 主题开关 | `ThemeToggle.tsx` | 右上角，深色 / 浅色切换，纯 CSS |
| 正文卡片 | `PageView.tsx` | 独立的块：自己的边框、圆角、底色与阴影 |
| 右侧导航栏 | `PageView.tsx` + `WikiRail.tsx` | **另一个独立的块**，与正文卡片之间留 `innerGap` 间隙；桌面端吸附跟随 |
| 页脚 | `Footer.tsx` | 站点简介、联系方式、链接组 |

> 正文卡片与右侧导航栏是**两个分开的块**，不共用一张卡片背景：
> 外层 `.layout` 只负责两列网格，`.article` 与 `.railBlock` 各自带自己的块状外观。

**宽度参数都在 `data/layout.ts`**（注入成 CSS 变量）：

| 参数 | 值 | 说明 |
| --- | --- | --- |
| `cardWidth` | 1152 | 正文卡片 + 右栏的**合计**最大宽度 |
| `railWidth` | 224 | 右侧导航栏宽度 |
| `innerGap` | 32 | 两个块之间的间隙 |
| `lineHeight` | 1.9 | 中文正文行高 |

**正文行宽自动适配卡片**：正文列用 `minmax(0, 1fr)`，
`--prose-width` 因此被设为 `100%`，正文铺满卡片内的可用宽度，不再有单独的宽度上限。

### 站点切换

站点登记在 `data/sites.ts`：一个站点 = 一个条目。左上角抽屉**只做这一件事** ——
罗列全部站点，点一下跳转，当前站点用左侧色条标出。

```ts
{
  id: "wiki",
  name: "示例站点",
  description: "一句话说明",
  href: "/",          // 点击后跳转的目标
}
```

- `defaultSiteId` 指定当前站点（决定哪一条显示为"当前"）；
- 新增站点只要往 `sites` 数组里加一条；
- 想恢复"站点下面挂页面"的二级导航，在 `SiteEntry` 上加回 `pages` 字段即可，
  类型 `SiteNavItem` 还保留着。

现在 `data/sites.ts` 里的第二、三个站点是**占位条目**（指向本站已有页面），
等你真的做出第二个站点，把 `href` 改成真实地址即可。

### 导航抽屉的交互

- 鼠标**移到图标上**就展开；
- 展开后可以在面板里正常移动、点击站点链接；
- 鼠标离开"图标 + 面板"整块区域后**延迟 160ms** 才收起。

> 那个延迟是必需的：鼠标从图标移向面板、经过两者之间的空隙时会短暂离开包裹层，
> 如果立刻收起，指针还没到面板上面板就消失了 —— 这就是"移向侧边栏却自动收起、
> 点不到条目"的原因。修法是把关闭动作放进定时器，重新进入时取消它。

这是全站唯一的客户端组件（一个 `useState` 开关）。早先那版用纯 CSS 的透明悬停带实现，
问题正是那条带子会一直占着页面左侧一条并拦截正文点击，所以改成了 JS 控制。

## 主题切换的实现方式（纯 CSS，无 JS）

`ThemeToggle.tsx` 里是一个视觉隐藏的 checkbox，`app/theme-dark.css` 用
`body:has(#theme-toggle:checked)` 覆盖 CSS 变量，因此：

- 深浅切换**不需要任何客户端脚本**，也就没有"水合前一闪"的问题；
- 未手动切换时**跟随系统**（`prefers-color-scheme`）。

两个已知边界：

- **选择不会被记住**，刷新后回到"跟随系统"（要持久化需要加 `localStorage`）；
- `:has()` 需要较新的浏览器（Chrome/Edge 105+、Safari 15.4+、Firefox 121+）。
  另外选择器里刻意写的是 **id** 而不是类名 —— `:has()` 内部的 CSS Modules 局部类名
  编译后不会被改写，会导致选择器匹配不上（这是实测踩到的坑）。

## 排版要点

排版规则集中在 `app/typography.css`：

- **行高 1.9**：中文正文行距，由 `data/layout.ts` 的 `lineHeight` 注入；
- **字间距**：只对拉丁文字与数字使用（`--ls-tight` / `--ls-wide`），中文不加，否则显得松散；
- **字号阶梯**：`--fs-h1`（2rem）/ `--fs-h2`（1.375rem）/ `--fs-h3`（1.0625rem）/ 正文 1rem；
- **正文行宽上限** `--prose-width`（880px），卡片本身通栏（最大 1440px），
  这样"中间长条"够宽，但长段落仍然好读。

## 图片位置（四类）

| 位置 | 数据字段 | 尺寸建议 |
| --- | --- | --- |
| 条目主图（页头下方） | 页面的 `leadImageId` | 16:9 |
| 资料卡图（信息框内） | `infobox` 块的 `imageId` | 4:3 |
| 正文配图 | `figure` 块 | 16:9，可 `center`/`left`/`right` |
| 多图图库 | `gallery` 块的 `imageIds` | 8:5，桌面三列 |

**没有真实图片时不会破图**：`data/images.ts` 中 `src` 为空字符串的记录会自动渲染
一张带文件路径提示的占位图，方便直接替换。

替换步骤：把图片放进 `public/images/` → 在 `data/images.ts` 对应记录填
`src: "/images/文件名.png"` → 完成。组件无需改动。

---

## 目录结构

```
.
├── app/
│   ├── theme.css             # ★ 浅色主题变量：颜色、字号、间距、圆角
│   ├── theme-dark.css        # ★ 深色主题变量（覆盖层）
│   ├── typography.css        # ★ 排版：标题层级、行高、字间距
│   ├── globals.css           # 基础重置
│   ├── wiki.css              # 页面基础
│   ├── layout.tsx            # 全站布局 + 注入版式变量
│   ├── page.tsx              # 首页
│   ├── not-found.tsx         # 404
│   └── [slug]/page.tsx       # 条目路由（data 里登记过的自动生成）
│
├── components/
│   ├── Shell.tsx             # 外壳 + 跳到正文链接
│   ├── NavDrawer.tsx         # 左上角悬停滑出导航（唯一的客户端组件）
│   ├── ThemeToggle.tsx       # 深浅主题开关（纯 CSS）
│   ├── Header.tsx            # 顶栏：只有搜索框
│   ├── PageView.tsx          # 卡片装配：左正文 + 右导航栏
│   ├── WikiRail.tsx          # 卡片右侧导航栏（目录/条目信息/相关条目）
│   ├── ArticleHeader.tsx     # 条目页头
│   ├── LeadImage.tsx         # 条目主图位
│   ├── MediaFrame.tsx        # 图片统一容器（占位图回退）
│   ├── Footer.tsx            # 页脚
│   └── blocks/               # 内容块组件
│       ├── renderBlock.tsx   # 块 → 组件分发表
│       ├── BlockRenderer.tsx # 遍历渲染
│       ├── Section.tsx       # 小节外壳（标题 + 锚点）
│       ├── Hero.tsx / Features.tsx / Stats.tsx / Prose.tsx
│       ├── Gallery.tsx / Note.tsx / Quote.tsx / Cta.tsx
│       ├── SectionBlockView.tsx  # 正文小节
│       ├── Figure.tsx        # 正文配图
│       ├── Infobox.tsx       # 信息框（资料卡）
│       └── ActionLinks.tsx   # 按钮链接
│
├── data/                     # ★ 内容都在这里
│   ├── site.ts               # 站点信息、页脚链接、搜索框占位文字
│   ├── sites.ts              # ★ 站点登记表（导航里的站点切换）
│   ├── pages.ts              # 各条目文字与内容块
│   ├── images.ts             # 图片登记表（id / src / alt / caption）
│   ├── nav.ts                # 导航分组顺序
│   ├── layout.ts             # ★ 卡片宽度、右栏宽度、间距、行高
│   └── types.ts              # 类型定义
│
├── lib/
│   ├── images.ts             # 图片查找 + 占位图生成
│   └── toc.ts                # 小节锚点生成
│
├── scripts/
│   └── verify-ui.mjs         # 本地自检脚本（无头浏览器 + CDP），不参与构建
│
└── public/images/            # 图片资源
```

---

## 内容维护指南

### 改站点信息

`data/site.ts`：站点名、logo 短名（`wordmark`）、标语、简介、邮箱、
页脚链接组、搜索框占位文字。

### 改条目内容

`data/pages.ts` 里一条记录 = 一个条目：

```ts
{
  slug: "/services",          // 访问路径
  title: "示例条目",           // 浏览器标题 + 页头大标题
  navLabel: "示例条目",        // 导航里的文字
  description: "…",           // SEO / 分享卡片描述
  showInNav: true,            // 是否进导航
  order: 2,                   // 组内排序
  group: "内容",               // 导航分组（见 data/nav.ts）
  categories: ["示例"],        // 页头分类标签
  updatedAt: "2026-02-11",    // 页头显示
  maintainers: ["ayaka"],     // 维护者
  intro: "…",                 // 标题下方导语
  leadImageId: "lead-overview", // 条目主图（可选）
  seeAlso: [{ label: "相关条目", href: "/gallery" }],
  blocks: [ /* 内容块 */ ],
}
```

**新增条目**：追加一条记录即可，导航与路由自动生效，不需要建文件。

### 内容块类型

| `type` | 用途 | 关键字段 |
| --- | --- | --- |
| `hero` | 首页横幅 | `title`、`highlight`、`actions`、`imageId` |
| `section` | **正文小节**（wiki 主力） | `title`、`paragraphs[]`、`links[]`、`blocks[]` |
| `infobox` | 信息框/资料卡（右浮动） | `title`、`imageId`、`fields[]`、`footnote` |
| `figure` | 正文配图 | `imageId`、`align`、`size` |
| `gallery` | 多图图库 | `imageIds[]` |
| `features` | 卡片网格/列表 | `items[]`、`columns`、`variant` |
| `stats` | 关键数字 | `items[]` |
| `prose` | 纯段落 | `paragraphs[]`、`tone` |
| `note` | 提示条 | `text`、`tone` |
| `quote` | 引用语 | `text`、`attribution` |
| `cta` | 行动号召 | `title`、`actions` |

`infobox` 建议放在 `blocks` 第一位，否则右浮动绕排效果不对。

### 改版式与配色

- **浅色配色**：`app/theme.css` 的 `--brand` / `--bg` / `--border` 等；
- **深色配色**：`app/theme-dark.css`（覆盖层，两处都要改才会同步）；
- **内容宽度 / 行高**：`data/layout.ts`（注入成 CSS 变量）；
- **导航抽屉宽度与两档行为**：`components/NavDrawer.module.css`；
- **字号字距**：`app/theme.css` 的 `--fs-*` / `--ls-*`。

---

## 本地自检脚本（可选）

`scripts/verify-ui.ps1` 用无头 Edge 给主要页面截图，方便改完样式后快速核对版式。
它**不参与构建**，也不影响站点。

```powershell
# 1. 先让站点跑起来（生产模式）
npm run build
npm run start

# 2. 截图，产物在 tmp-verify/（已被 git 忽略）
& scripts\verify-ui.ps1
```

两个环境上的注意点（都踩过）：

- **无头 Edge 需要进程隔离能力**，`workspace-write` 沙箱下会被拒绝
  （`mojo platform_channel: access denied 0x5`），浏览器会在渲染前就退出。
  要么在 `danger-full-access` 的会话里跑，要么手动跑一次并把截图给我看；
- 脚本里特意用**纯 ASCII** 写注释：Windows PowerShell 5.1 按系统 ANSI 码页读取 `.ps1`，
  文件里出现中文会导致解析报错。

**自动截图测不了的东西**：悬停、点击这类交互（那需要 DevTools 协议驱动鼠标事件），
所以抽屉的悬停展开、主题开关这些最好你自己在浏览器里点一遍确认。

---

## 前端还差什么

按"投入产出比"排序。

### 值得优先补的

1. **搜索（最关键）**
   顶部搜索框**输入后没有任何反应**。纯静态可行方案：构建期生成索引
   （如 Pagefind 这类工具），前端只做本地检索，不需要后端。
   改动点：`Header.tsx` 的 form、新增搜索页、build 流程加一步索引生成。

2. **主题选择持久化**
   现在刷新后回到"跟随系统"。要记住选择需要一小段客户端脚本
   （`localStorage` + 在 `<head>` 里同步设置 `data-theme`，避免水合前闪烁）。

3. **条目级元数据页**
   最近更新、按分类/维护者索引、全部条目一览。数据都已在 `data/pages.ts`
   （`updatedAt` / `maintainers` / `categories`），**不需要新数据，只要新建页面**。

4. **交叉链接与反向链接**
   现在页面之间靠手写 `href`，没有 backlinks，也没有断链检查。
   做法：加构建前的扫描脚本生成链接关系表。

### 体验与一致性

5. **移动端的导航抽屉**：现在靠悬停/聚焦展开，没有遮罩、没有滑动手势，
   点击条目后不会自动收起（桌面端鼠标移开就会收）。
6. **右栏在窄屏会落到正文下方**，而不是变成折叠面板；条目很长时目录随卡片一起滚动，
   没有做吸附跟随。
7. **条目历史/版本对比**：需要后端或 git 集成，纯前端做不了。
8. **表格内容块** · 9. **图片点击放大** · 10. **打印分页优化**（`typography.css` 里已有基础规则）。
11. **图片优化**：目前是原生 `<img>` + 懒加载；改用 `next/image` 可获得自动尺寸与格式优化，
   但要放弃静态导出（`output: "export"`）。

### 工程质量

12. **内容校验脚本**：`npm run check`（`tsc --noEmit`）+ 断链检查。
13. **CI**：PR 上自动 `npm run build`。
14. **无障碍细节**：跳到正文、`aria-label`、`aria-expanded` 已有；
    还缺 —— 主题开关的状态播报、抽屉打开时的焦点管理（目前不锁焦点）、对比度复核。
15. **深浅两套配色需要手动同步**：`theme.css` 与 `theme-dark.css` 的变量名重复，
    建议改用 `light-dark()` 或构建期生成。
16. **交互无法自动截图验证**：悬停、点击需要 DevTools 协议驱动鼠标事件，
    当前自检脚本只做静态截图（见上文）。

---

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 开发服务器（热更新） |
| `npm run build` | 构建生产版本（含类型检查） |
| `npm run start` | 生产模式启动（需先 build） |
| `npm run typecheck` | 只做类型检查 |
| `npm run lint` | 代码检查（首次使用会引导初始化） |

## 关于部署

当前定位是**本地浏览**，没有服务端能力。若要导出纯静态文件，
把 `next.config.ts` 里的 `output: "export"` 打开，`npm run build` 后产物在 `out/`。

## 代码管理

git 管理，构建产物与依赖目录已忽略。协作方式：分支 + PR，
`main` 保持可构建，改动前先 `git switch main && git pull`。
