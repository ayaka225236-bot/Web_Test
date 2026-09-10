import type { PageContent } from "./types";
import { site } from "./site";

/**
 * 所有页面的内容。
 *
 * 新增页面：往这个数组里加一条记录即可（slug 决定访问路径）。
 * 导航会自动出现这一项（记得填 group / showInNav / order），
 * 路由由 app/[slug]/page.tsx 自动生成，不需要新建文件。
 *
 * 注意：下面全部是占位示例内容，用于演示版式与各内容块的位置。
 */
export const pages: PageContent[] = [
  {
    slug: "/",
    title: "首页",
    navLabel: "首页",
    description: site.description,
    showInNav: true,
    order: 1,
    group: "概览",
    categories: ["首页", "导航"],
    updatedAt: "2026-02-11",
    maintainers: ["ayaka"],
    blocks: [
      {
        type: "hero",
        eyebrow: "静态内容 wiki",
        title: "把内容写进数据，",
        highlight: "把版面交给组件",
        description:
          "所有文字与图片都登记在 data/ 目录里。改文案、换图片、调顺序，只需要编辑数据文件，页面会自动跟着变。",
        actions: [
          { label: "查看示例条目", href: "/services" },
          { label: "浏览图片位置", href: "/gallery" },
        ],
        imageId: "lead-overview",
      },
      {
        type: "section",
        title: "这个站点是什么",
        paragraphs: [
          "这是一个纯静态的 wiki 版式模板：没有后端服务，也没有客户端动画，所有页面在构建阶段就生成好。",
          "版面参考常见维基的桌面端布局：顶部全局导航、左侧条目导航、中间正文、右侧目录与工具栏。",
        ],
        blocks: [
          {
            type: "note",
            tone: "brand",
            title: "配色说明",
            text: "整套配色保持蓝白基调，颜色集中在 app/theme.css 的变量里，改一处即可全站生效。",
          },
        ],
      },
      {
        type: "features",
        title: "站点特点",
        description: "面向「两人通过 git 协作」的场景设计，不需要任何服务端。",
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
              "导航、侧边栏、目录、内容块各自独立，样式使用 CSS Modules 局部作用域，互不干扰。",
            tags: ["App Router", "CSS Modules"],
          },
          {
            icon: "🖼",
            title: "预留图片位置",
            description:
              "主图、信息框、正文配图、图库四类图片位置都已留好，没有真实图片时自动显示占位图。",
            tags: ["占位图", "待替换"],
          },
        ],
      },
      {
        type: "stats",
        title: "当前状态",
        items: [
          { value: "纯静态", label: "无后端接口" },
          { value: "三栏", label: "维基式版面" },
          { value: "4 类", label: "图片位置" },
          { value: "11 类", label: "可复用内容块" },
        ],
      },
      {
        type: "cta",
        title: "从哪开始看？",
        text: "建议先看示例条目，那里演示了信息框、小节标题与正文配图的组合方式。",
        actions: [{ label: "查看示例条目", href: "/services" }],
      },
    ],
  },

  {
    slug: "/services",
    title: "示例条目",
    navLabel: "示例条目",
    description: "演示维基条目的完整结构：信息框、小节、正文配图与参见链接。",
    showInNav: true,
    order: 2,
    group: "内容",
    categories: ["示例", "版式演示"],
    updatedAt: "2026-02-11",
    maintainers: ["ayaka", "bob"],
    intro:
      "本页用于演示一个标准条目的结构。下面是示例内容，替换成你的真实条目即可。",
    leadImageId: "lead-overview",
    leadImageCaption: "条目主图位置 · 建议 16:9",
    seeAlso: [
      { label: "图片位置演示", href: "/gallery" },
      { label: "维护与版式说明", href: "/about" },
    ],
    blocks: [
      {
        type: "infobox",
        title: "示例条目",
        subtitle: "资料卡 · 放在正文右上",
        imageId: "figure-body-2",
        imageCaption: "资料卡图片位置 · 建议方图",
        fields: [
          { label: "类型", value: "演示条目" },
          { label: "状态", value: "示例内容" },
          { label: "维护者", value: "ayaka / bob" },
          { label: "最后更新", value: "2026-02-11" },
          { label: "相关页面", value: "图片位置演示", href: "/gallery" },
        ],
        footnote: "资料卡字段在 data/pages.ts 的 fields 数组里增删。",
      },
      {
        type: "section",
        title: "内容概览",
        paragraphs: [
          "这一段用来演示条目的开篇说明。中文正文的行高与字距都做了调整，长段落读起来不会挤在一起。",
          "每个小节标题都会自动出现在右侧目录里，点击即可跳转到对应位置。",
        ],
      },
      {
        type: "section",
        title: "正文配图",
        paragraphs: [
          "图片位置已经预留好：独立整宽的配图、与文字并排的小图、以及多图并排的图库，三种方式都在这个模板里。",
          "目前这些位置显示的是自动生成的占位图，把真实图片放进 public/images/ 并在 data/images.ts 里登记 src 即可替换。",
        ],
        blocks: [
          {
            type: "figure",
            imageId: "figure-body-1",
            align: "center",
            size: "full",
          },
        ],
      },
      {
        type: "section",
        title: "并排小图",
        paragraphs: [
          "这一节演示图片与文字并排的效果：图片会浮动在段落一侧，文字自动绕排，窄屏时会自动变回整宽显示。",
          "适合放示意图、流程图、实物照片等需要与说明文字对照的内容。",
        ],
        blocks: [
          {
            type: "figure",
            imageId: "figure-body-2",
            align: "right",
            size: "medium",
          },
        ],
      },
      {
        type: "section",
        title: "维护分工",
        paragraphs: [
          "条目通过 git 协作维护：一页对应一次改动，改完开分支、提交、合并。",
          "建议在页头填好 maintainers 字段，明确谁负责这个条目，避免同一处被两人同时改到。",
        ],
        blocks: [
          {
            type: "note",
            tone: "neutral",
            title: "约定",
            text: "一次提交只改一个条目的一个主题，提交信息写清改了什么。",
          },
        ],
      },
    ],
  },

  {
    slug: "/gallery",
    title: "图片位置演示",
    navLabel: "图片位置",
    description: "演示四类图片容器：条目主图、资料卡图、正文配图与多图图库。",
    showInNav: true,
    order: 3,
    group: "内容",
    categories: ["示例", "图片"],
    updatedAt: "2026-02-11",
    maintainers: ["ayaka"],
    intro:
      "这一页集中展示站内预留的所有图片位置。当前显示的是占位图，替换真实图片后版面不会变动。",
    blocks: [
      {
        type: "section",
        title: "条目主图",
        paragraphs: [
          "条目页顶部的主图会显示标题与说明文字，宽度自动适应中间栏。",
        ],
        blocks: [
          {
            type: "figure",
            imageId: "lead-overview",
            align: "center",
            size: "full",
          },
        ],
      },
      {
        type: "gallery",
        title: "多图图库",
        description: "桌面端每行三张，窄屏自动变成两列或一列。",
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
        title: "怎么换图",
        text: "把图片放进 public/images/，在 data/images.ts 里把对应记录的 src 填成 /images/文件名 即可。",
      },
    ],
  },

  {
    slug: "/about",
    title: "维护与版式说明",
    navLabel: "维护说明",
    description: "说明项目结构、版式参数与前端待补的能力。",
    showInNav: true,
    order: 4,
    group: "项目",
    categories: ["说明", "维护"],
    updatedAt: "2026-02-11",
    maintainers: ["ayaka"],
    blocks: [
      {
        type: "section",
        title: "目录结构",
        paragraphs: [
          "内容全部集中在 data/ 目录，组件只负责把数据渲染成版面，因此日常维护只需要改数据文件。",
        ],
        blocks: [
          {
            type: "features",
            variant: "plain",
            columns: 2,
            items: [
              {
                title: "data/",
                description:
                  "站点信息、导航分组、页面内容、图片登记表、版式参数与类型定义，是所有文案的唯一来源。",
              },
              {
                title: "components/",
                description:
                  "页头、左侧导航、右侧目录栏、页脚，以及每一种内容块组件。",
              },
              {
                title: "app/",
                description:
                  "路由与页面骨架：layout.tsx 负责全局框架，page.tsx 与 [slug]/page.tsx 负责渲染页面。",
              },
              {
                title: "public/images/",
                description: "图片资源目录，页面通过 /images/xxx 这样的路径引用。",
              },
            ],
          },
        ],
      },
      {
        type: "section",
        title: "版式参数",
        paragraphs: [
          "三栏宽度、间距、正文行宽与行高都集中在 data/layout.ts，会注入成 CSS 变量。",
          "配色、字号、字间距集中在 app/theme.css，圆角与阴影也在同一处。",
        ],
      },
      {
        type: "quote",
        text: "内容的每一次改动都应该是编辑数据，而不是重写页面。",
        attribution: "本模板的设计原则",
      },
      {
        type: "section",
        title: "前端还缺什么",
        paragraphs: [
          "当前版本只完成了静态版式：没有搜索、没有移动端抽屉导航、没有条目元数据（最近更新、随机条目等）。",
          "这些能力的清单与实现建议写在 README 里，等确认要哪些再动手。",
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
