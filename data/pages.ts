import type { PageContent } from "./types";
import { site } from "./site";

/**
 * 所有页面的内容。
 *
 * 新增页面：往这个数组里加一条记录即可（slug 决定访问路径）。
 * 新增页签：把 showInNav 设为 true，导航栏会自动出现这一项，
 *          路由由 app/[slug]/page.tsx 自动生成，不需要新建文件。
 */
export const pages: PageContent[] = [
  {
    slug: "/",
    title: "首页",
    navLabel: "首页",
    description: site.description,
    showInNav: true,
    order: 1,
    blocks: [
      {
        type: "hero",
        eyebrow: "静态内容展示",
        title: "把内容写进数据，",
        highlight: "把版面交给组件",
        description:
          "这个站点的所有文字与图片都登记在 data/ 目录里。改文案、换图片、调顺序，只需要编辑数据文件，页面会自动跟着变。",
        actions: [
          { label: "查看服务内容", href: "/services" },
          { label: "浏览图片示例", href: "/gallery" },
        ],
        imageId: "hero-main",
      },
      {
        type: "features",
        title: "站点特点",
        description: "没有后端、没有客户端脚本，纯粹的静态页面。",
        columns: 3,
        items: [
          {
            icon: "🗂",
            title: "内容与实现分离",
            description:
              "文案集中在 data/pages.ts，图片登记在 data/images.ts，站点信息在 data/site.ts，改内容不用碰组件。",
            tags: ["data/", "易维护"],
          },
          {
            icon: "🧩",
            title: "模块化组件",
            description:
              "导航、页脚、内容块各自独立，样式使用 CSS Modules 局部作用域，互不干扰。",
            tags: ["App Router", "CSS Modules"],
          },
          {
            icon: "📦",
            title: "开箱即用的本地预览",
            description:
              "npm install 之后运行 npm run dev 就能在浏览器里查看，构建产物也可以直接静态浏览。",
            tags: ["Next.js", "本地"],
          },
        ],
      },
      {
        type: "stats",
        title: "当前状态",
        items: [
          { value: "纯静态", label: "无后端接口" },
          { value: "0 KB", label: "业务脚本体积" },
          { value: "3 个", label: "内容数据文件" },
          { value: "8 类", label: "可复用内容块" },
        ],
      },
      {
        type: "note",
        tone: "brand",
        title: "下一步",
        text: "把示例文字换成你的真实内容，再把 public/images/ 下的占位图替换成正式图片即可。",
      },
      {
        type: "cta",
        title: "准备开始替换内容？",
        text: "打开 data/pages.ts 就能看到这个页面使用的全部文字。",
        actions: [{ label: "查看关于本模板", href: "/about" }],
      },
    ],
  },
  {
    slug: "/services",
    title: "服务内容",
    navLabel: "服务",
    description: "以卡片形式展示的服务 / 能力清单，内容同样来自 data/pages.ts。",
    showInNav: true,
    order: 2,
    intro: "下面每一张卡片都对应 data/pages.ts 里的一个条目，增删条目即可增删卡片。",
    blocks: [
      {
        type: "features",
        variant: "card",
        title: "我们能提供什么",
        columns: 2,
        items: [
          {
            icon: "🎨",
            title: "视觉与排版设计",
            description:
              "统一的色彩与间距体系，标题层级清晰，适配桌面与移动端阅读。",
            tags: ["设计", "响应式"],
          },
          {
            icon: "📝",
            title: "内容整理与撰写",
            description:
              "把零散资料整理成结构化内容块，条目化、可复用、方便长期维护。",
            tags: ["内容", "结构"],
          },
          {
            icon: "⚙️",
            title: "前端实现",
            description:
              "使用 Next.js 与 TypeScript 构建，类型约束保证数据结构不会写错。",
            tags: ["Next.js", "TypeScript"],
          },
          {
            icon: "🔍",
            title: "SEO 与可访问性",
            description:
              "每个页面都有独立的标题与描述，图片带替代文字，语义化标签组织内容。",
            tags: ["SEO", "a11y"],
          },
        ],
      },
      {
        type: "stats",
        title: "交付节奏",
        items: [
          { value: "第 1 天", label: "确认内容结构" },
          { value: "第 2 天", label: "填充文字与图片" },
          { value: "第 3 天", label: "本地预览与微调" },
        ],
      },
      {
        type: "cta",
        title: "想看看实际效果？",
        text: "图片画廊页面展示了如何用数据驱动一组图片。",
        actions: [{ label: "前往图片画廊", href: "/gallery" }],
      },
    ],
  },
  {
    slug: "/gallery",
    title: "图片示例",
    navLabel: "图片",
    description: "由 data/images.ts 中的图片登记表驱动的图片画廊。",
    showInNav: true,
    order: 3,
    intro:
      "目前展示的是自动生成的占位图；把真实图片放进 public/images/ 后，版面会自动替换。",
    blocks: [
      {
        type: "gallery",
        title: "示例画廊",
        description: "每条记录包含 id、src、alt 与 caption，页面只负责按 id 引用。",
        imageIds: [
          "gallery-1",
          "gallery-2",
          "gallery-3",
          "gallery-4",
          "gallery-5",
          "gallery-6",
        ],
      },
      {
        type: "note",
        tone: "neutral",
        title: "图片怎么换",
        text: "在 public/images/ 下放入同名文件覆盖占位图，或修改 data/images.ts 里的 src 指向新文件。",
        },
    ],
  },
  {
    slug: "/about",
    title: "关于本模板",
    navLabel: "关于",
    description: "说明这个静态站点模板的目录结构与维护方式。",
    showInNav: true,
    order: 4,
    blocks: [
      {
        type: "prose",
        title: "这个项目是什么",
        paragraphs: [
          "这是一个基于 Next.js App Router 的纯静态展示站点。它不包含后端服务，也没有客户端的交互动画，所有页面在构建阶段就已经生成好。",
          "项目把「内容」和「实现」彻底分开：文字、图片清单、站点信息都放在 data/ 目录，组件只负责把数据渲染成版面。因此日常维护只需要改数据文件。",
          "样式使用 CSS Modules，每个组件拥有独立的局部样式，避免相互覆盖；后续想换配色，改 app/globals.css 顶部的变量即可。",
        ],
      },
      {
        type: "features",
        title: "目录约定",
        variant: "plain",
        columns: 2,
        items: [
          {
            title: "data/",
            description:
              "站点信息、导航、页面内容、图片登记表与类型定义，是所有文案的唯一来源。",
          },
          {
            title: "app/",
            description:
              "路由与页面骨架：layout.tsx 负责全局框架，page.tsx 与 [slug]/page.tsx 负责渲染页面。",
          },
          {
            title: "components/",
            description:
              "可复用组件：页头、页脚、内容块渲染器，以及每一个具体内容块。",
          },
          {
            title: "public/images/",
            description: "图片资源目录，页面通过 /images/xxx 这样的路径引用。",
          },
        ],
      },
      {
        type: "quote",
        text: "内容的每一次改动都应该是编辑数据，而不是重写页面。",
        attribution: "本模板的设计原则",
      },
      {
        type: "prose",
        title: "维护流程",
        paragraphs: [
          "第一步：修改 data/site.ts 里的站点名称与联系方式。",
          "第二步：在 data/pages.ts 中替换示例文案，按需要增删内容块。",
          "第三步：把真实图片放进 public/images/，并在 data/images.ts 中登记。",
          "第四步：运行 npm run dev 在本地预览，确认无误后用 git 提交改动。",
        ],
      },
    ],
  },
];

/** 首页数据（约定 pages 中 slug 为 "/" 的那条） */
export const homePage: PageContent = pages.find((page) => page.slug === "/") ?? pages[0];

/** 顶部导航使用的页面列表 */
export const navPages: PageContent[] = pages
  .filter((page) => page.showInNav && page.slug !== "/")
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

/** 按路径查找页面 */
export function getPage(slug: string): PageContent | undefined {
  return pages.find((page) => page.slug === slug);
}
