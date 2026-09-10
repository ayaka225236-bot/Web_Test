# 静态内容展示站点

一个基于 **Next.js（App Router）+ TypeScript** 的纯静态展示站点。
没有后端服务、没有客户端交互动画，所有页面在构建时生成，适合本地浏览。

核心思路：**内容与实现分离**。需要展示的文字、图片清单、站点信息全部集中在
`data/` 目录，组件只负责把数据渲染成版面。日常维护只改数据文件，不用碰组件代码。

---

## 快速开始

```bash
# 1. 安装依赖（首次执行）
npm install

# 2. 启动本地预览，浏览器打开 http://localhost:3000
npm run dev

# 3. 构建生产版本 / 本地以生产模式预览
npm run build
npm run start
```

> 如果 `npm install` 报 `EALLOWSCRIPTS`：这是 npm 12 起的安装脚本安全策略。
> 本项目已在 `package.json` 的 `allowScripts` 字段中放行 `next`、`sharp` 等必要的包。
> 若提示某个新包缺少权限，把包名加进该字段即可。
>
> 如果报缓存目录 `EPERM`（系统缓存目录不可写），改用项目内缓存：
> `npm install --cache .npm-cache`（`.npm-cache/` 已被 `.gitignore` 忽略）。

---

## 目录结构

```
.
├── app/                      # 路由与页面骨架（App Router）
│   ├── globals.css           # 全局样式 + 主题变量（配色、圆角、内容宽度）
│   ├── layout.tsx            # 全站布局：<html> / <body> / 页头页脚外壳
│   ├── page.tsx              # 首页，读取 data/pages.ts 中 slug 为 "/" 的记录
│   ├── not-found.tsx         # 404 页面
│   └── [slug]/page.tsx       # 动态路由：data 里登记过的页面自动生成
│
├── components/               # 展示层组件
│   ├── Shell.tsx             # 页头 + 主内容 + 页脚 三段式外壳
│   ├── Header.tsx            # 顶部导航（页签由 data/pages.ts 自动生成）
│   ├── Footer.tsx            # 页脚（版权、联系方式）
│   ├── PageView.tsx          # 把一条页面数据渲染成完整版面
│   └── blocks/               # 每一种内容块一个组件
│       ├── BlockRenderer.tsx # 按 block.type 分发到具体组件
│       ├── Hero.tsx          # 顶部横幅
│       ├── Features.tsx      # 卡片网格 / 列表
│       ├── Stats.tsx         # 关键数字
│       ├── Prose.tsx         # 段落文本
│       ├── Gallery.tsx       # 图片画廊
│       ├── Note.tsx          # 提示条
│       ├── Quote.tsx         # 引用语
│       ├── Cta.tsx           # 行动号召
│       ├── Section.tsx       # 区块外壳（统一标题与间距）
│       └── ActionLinks.tsx   # 按钮链接
│
├── data/                     # ★ 所有内容都在这里，改内容只改这个目录
│   ├── site.ts               # 站点名称、标语、简介、联系方式、页脚
│   ├── pages.ts              # 每个页面的文字与内容块顺序
│   ├── images.ts             # 图片登记表（id / src / alt / caption）
│   └── types.ts              # 数据类型定义（改结构时才需要动）
│
├── lib/
│   └── images.ts             # 图片查找与占位图生成
│
├── public/images/            # ★ 图片资源放这里，页面用 /images/xxx 引用
│   └── README.md
│
├── next.config.ts            # Next.js 配置（含静态导出开关说明）
├── tsconfig.json             # TypeScript 配置（@/* 指向项目根目录）
└── package.json              # 依赖清单与脚本
```

---

## 内容维护指南

### 1. 改站点信息

编辑 `data/site.ts`：站点名称、标语、简介、邮箱、所在地、页脚备注。

### 2. 改页面文字

编辑 `data/pages.ts`。一个页面就是一条记录：

```ts
{
  slug: "/services",        // 访问路径
  title: "服务内容",         // 浏览器标题
  navLabel: "服务",          // 导航栏文字
  description: "…",         // 页面简介（SEO / 分享卡片）
  showInNav: true,          // 是否出现在顶部导航
  order: 2,                 // 导航排序
  intro: "…",               // 标题下方的引导语（可选）
  blocks: [ /* 内容块，按顺序渲染 */ ],
}
```

### 3. 新增一个页面

在 `data/pages.ts` 的 `pages` 数组里追加一条记录（`slug` 如 `/contact`），
导航与路由会自动生效，**不需要新建任何文件**。

### 4. 替换图片

1. 把图片放到 `public/images/` 目录；
2. 在 `data/images.ts` 里登记或修改对应记录，把 `src` 指向新文件；
3. 在页面数据里用 `imageId` / `imageIds` 引用。

当前仓库没有真实图片，未提供文件的图片会自动回退为**动态生成的占位图**
（灰蓝渐变 + 文字标签），所以不会出现破图，也不会因为缺图而报错。

### 5. 可用的内容块类型

| `type`     | 用途             | 关键字段 |
| ---------- | ---------------- | -------- |
| `hero`     | 顶部横幅         | `title`、`highlight`、`description`、`actions`、`imageId` |
| `features` | 卡片网格 / 列表   | `items[]`、`columns`、`variant`（`card`/`plain`） |
| `stats`    | 关键数字         | `items[]`（`value` + `label`） |
| `prose`    | 段落文字         | `paragraphs[]`、`tone` |
| `gallery`  | 图片画廊         | `imageIds[]` |
| `note`     | 提示条           | `text`、`tone`（`brand`/`neutral`/`warn`） |
| `quote`    | 引用语           | `text`、`attribution` |
| `cta`      | 行动号召         | `title`、`text`、`actions` |

字段类型定义见 `data/types.ts`，写错会有 TypeScript 报错提示。

### 6. 改配色与版式

编辑 `app/globals.css` 顶部的 CSS 变量：主色 `--brand`、背景 `--bg`、
内容宽度 `--content-width`、圆角 `--radius-*` 等，全站自动跟随。

---

## 常用命令

| 命令                | 说明                                     |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | 启动开发服务器（默认 http://localhost:3000） |
| `npm run build`     | 构建生产版本，校验类型与页面生成          |
| `npm run start`     | 以生产模式启动（需先 `build`）            |
| `npm run typecheck` | 只做 TypeScript 类型检查，不产出文件      |
| `npm run lint`      | 代码检查（首次使用会引导初始化）          |

## 关于部署

当前定位是**本地浏览**，未做任何服务端能力。如果以后需要导出纯静态文件，
打开 `next.config.ts` 中的 `output: "export"`，再执行 `npm run build`，
产物会输出到 `out/` 目录，可直接用任意静态服务器托管。

## 代码管理

项目使用 git 管理，构建产物与依赖目录已在 `.gitignore` 中排除。

```bash
git init          # 首次初始化
git add .
git commit -m "chore: 初始化静态展示站点"
```
