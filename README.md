# 静态内容 Wiki 站点

一个基于 **Next.js（App Router）+ TypeScript** 的纯静态 wiki 站点。
没有后端服务、没有客户端动画，所有页面在构建期生成。

- **版式**：维基式四区结构 —— 顶部全局导航 + 左侧条目导航 + 中间正文 + 右侧目录栏。
- **配色**：蓝白基调，颜色全部集中在 `app/theme.css`。
- **内容与实现分离**：文字、图片清单、站点信息、版式参数全部在 `data/`，组件只负责渲染。

> 关于版式来源：本次改版参考的是维基类站点的通用桌面版式结构
> （全局导航 / 局部导航 / 正文 / 右侧目录栏），**没有复制任何外部站点的文字、
> 图片或代码**，示例文案均为本项目自写的占位内容。原参考站点在本机网络环境下
> 无法访问，因此若还需对齐其自定义细节，请提供截图。

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
| 顶部全局导航 | `Header.tsx` | 站点标识、搜索框（占位，暂无功能）、主要条目入口；滚动时吸顶 |
| 二级条 | `SubHeader.tsx` | 站点名、标语、首页分类标签 |
| 左栏条目导航 | `WikiSidebar.tsx` | 按 `data/nav.ts` 分组，当前条目高亮（唯一客户端组件） |
| 中间正文 | `PageView.tsx` + `ArticleHeader.tsx` | 条目页头（标题/分类/更新信息/导语）→ 主图 → 内容块 |
| 右侧栏 | `WikiRail.tsx` | 本页目录（自动生成）、条目信息、相关条目；吸顶 |
| 窄屏替代导航 | `MobileNav.tsx` | ≤1000px 时左栏收起，改显示横向条目条（纯服务端组件） |
| 页脚 | `Footer.tsx` | 站点简介、联系方式、链接组 |

**断点**：`>1280px` 三栏 → `≤1280px` 收起右栏 → `≤1000px` 收起左栏、正文单栏。

## 排版要点

排版规则集中在 `app/typography.css`：

- **行高 1.9**：中文正文的行距，由 `data/layout.ts` 的 `lineHeight` 注入；
- **字间距**：只对拉丁文字与数字使用（`--ls-tight` / `--ls-wide`），
  **中文不加字间距**，否则会显得松散；
- **字号阶梯**：`--fs-h1`（2rem）/ `--fs-h2`（1.375rem）/ `--fs-h3`（1.0625rem）/ 正文 1rem；
- **小节标题下细分隔线**：维基长条目的视觉分隔；
- **正文行宽上限** `--prose-width`（860px），避免一行过长影响阅读；
- **锚点偏移** `scroll-padding-top: 90px`：点击目录跳转时不会被吸顶导航挡住。

## 图片位置（四类）

| 位置 | 数据字段 | 尺寸建议 |
| --- | --- | --- |
| 条目主图（标题下方） | 页面的 `leadImageId` | 16:9 |
| 资料卡图（信息框内） | `infobox` 块的 `imageId` | 4:3 |
| 正文配图 | `figure` 块 | 16:9，可 `center`/`left`/`right` |
| 多图图库 | `gallery` 块的 `imageIds` | 8:5，桌面三列 |

**没有真实图片时不会破图**：`public/images/` 下缺文件时，`data/images.ts` 中
`src` 为空字符串的记录会自动渲染一张带文件路径提示的占位图，方便直接替换。

替换步骤：把图片放进 `public/images/` → 在 `data/images.ts` 对应记录填
`src: "/images/文件名.png"` → 完成。组件无需改动。

---

## 目录结构

```
.
├── app/
│   ├── theme.css             # ★ 颜色、字号、间距、圆角变量（蓝白配色在这）
│   ├── typography.css        # ★ 排版规则：标题层级、行高、字间距
│   ├── globals.css           # 基础重置
│   ├── wiki.css              # 维基版式与断点
│   ├── layout.tsx            # 全站布局 + 注入版式变量
│   ├── page.tsx              # 首页
│   ├── not-found.tsx         # 404
│   └── [slug]/page.tsx       # 条目路由（data 里登记过的自动生成）
│
├── components/
│   ├── Shell.tsx             # 外壳 + 跳到正文链接
│   ├── Header.tsx            # 顶部全局导航
│   ├── SubHeader.tsx         # 二级条
│   ├── WikiSidebar.tsx       # 左栏条目导航
│   ├── NavLink.tsx           # 导航条目（客户端：当前页高亮）
│   ├── MobileNav.tsx         # 窄屏横向条目条
│   ├── PageView.tsx          # 三栏版式装配
│   ├── ArticleHeader.tsx     # 条目页头
│   ├── LeadImage.tsx         # 条目主图位
│   ├── MediaFrame.tsx        # 图片统一容器（占位图回退）
│   ├── WikiRail.tsx          # 右侧目录栏
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
│   ├── pages.ts              # 各条目文字与内容块
│   ├── images.ts             # 图片登记表（id / src / alt / caption）
│   ├── nav.ts                # 左栏分组顺序
│   ├── layout.ts             # ★ 三栏宽度、间距、行高、正文行宽
│   └── types.ts              # 类型定义
│
├── lib/
│   ├── images.ts             # 图片查找 + 占位图生成
│   └── toc.ts                # 从内容块生成右侧目录锚点
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
  navLabel: "示例条目",        // 左栏导航文字
  description: "…",           // SEO / 分享卡片描述
  showInNav: true,            // 是否进顶部导航
  order: 2,                   // 组内排序
  group: "内容",               // 左栏分组（见 data/nav.ts）
  categories: ["示例"],        // 页头分类标签 + 右栏信息
  updatedAt: "2026-02-11",    // 页头与右栏显示
  maintainers: ["ayaka"],     // 维护者
  intro: "…",                 // 标题下方导语
  leadImageId: "lead-overview", // 条目主图（可选）
  seeAlso: [{ label: "相关条目", href: "/gallery" }], // 右栏相关条目
  blocks: [ /* 内容块 */ ],
}
```

**新增条目**：追加一条记录即可，导航、路由、右栏目录都会自动生效，不需要建文件。

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

带 `title` 的块会自动进入右侧目录；`infobox` 建议放在 `blocks` 第一位，
否则右浮动绕排效果不对。

### 改版式与配色

- **配色**：`app/theme.css` 的 `--brand` / `--bg` / `--border` 等；
- **栏宽与行高**：`data/layout.ts`（会注入成 CSS 变量）；
- **字号字距**：`app/theme.css` 的 `--fs-*` / `--ls-*`；
- **断点**：`app/wiki.css` 与各组件的 `.module.css`。

---

## 前端还差什么

按"投入产出比"排序。前四项建议先做。

### 值得优先补的

1. **搜索（最关键）**
   现在顶部只有一个静态输入框，**输入没有任何反应**。
   纯静态可行方案：构建期生成索引（如 Pagefind 这类工具），前端只做本地检索，
   不需要后端。改动点：`Header.tsx` 的 form、新增搜索页、build 流程加一步索引生成。

2. **移动端左栏交互**
   现在窄屏是把左栏整体收起、换成横向条目条，**没有抽屉/汉堡菜单**，
   也没有"当前条目"高亮（`MobileNav` 是纯服务端组件）。
   要补齐需要一个客户端组件 + 用 `useState` 控制开合（会有少量客户端 JS）。

3. **条目级元数据页**
   维基常见能力：最近更新列表、随机条目、按维护者/分类索引、所有条目一览。
   数据其实都已在 `data/pages.ts`（`updatedAt` / `maintainers` / `categories`），
   **不需要新数据，只要新建对应页面**，实现成本低。

4. **交叉链接与反向链接**
   现在页面之间靠手写 `href`。维基需要"哪些页面引用了本页"（backlinks）与断链检查。
   做法：加一个构建前的扫描脚本生成链接关系表；`[[页面名]]` 语法需要自定义解析。

### 体验与一致性

5. **条目历史/版本对比**：需要后端或 git 集成，纯前端做不了。
6. **表格支持**：wiki 条目常见表格，目前没有对应内容块。
7. **图片放大查看**：点击配图弹出大图（需少量客户端 JS）。
8. **暗色模式**：`theme.css` 已按变量组织，加一套 `[data-theme="dark"]` 覆盖即可。
9. **打印样式**：`typography.css` 里已隐藏导航与侧栏，但正文分页、链接展开还没做。
10. **搜索高亮与结果摘要**：依赖第 1 项。

### 工程质量

11. **内容校验脚本**：`npm run check`（`tsc --noEmit`）+ 断链检查，提交前跑一次。
12. **CI**：PR 上自动 `npm run build`，红了就拦下（需要托管平台配置）。
13. **无障碍细节**：跳到正文链接、`aria-current` 已有；还缺 ——
    右栏目录的当前小节高亮、tab 顺序检查、对比度核查。
14. **语义化标签核查**：左栏分组标题目前用 `h2`，会与正文小节标题重名，
    建议改成带 `aria-label` 的普通元素。
15. **图片优化**：现在用原生 `<img>` + 懒加载；若改用 `next/image` 可获得
    自动尺寸与格式优化，但要放弃静态导出（`output: "export"`）。

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
