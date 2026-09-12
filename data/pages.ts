import type { PageContent } from "./types";
import { site } from "./site";

/**
 * 所有页面的登记表。
 *
 * 现在所有页面的内容都是空的（blocks 为空数组），
 * 打开网站只会看到一张空卡片等你填内容。
 *
 * ── 怎么往里加内容 ────────────────────────────────────────────
 * 在对应页面的 blocks 数组里按顺序添加"内容块"，渲染顺序就是数组顺序。
 * 可用的块类型（详细字段见 data/types.ts）：
 *
 *   { type: "section", title: "小节标题", paragraphs: ["段落一", "段落二"] }
 *   { type: "figure",  imageId: "图片id", align: "center", size: "full" }
 *   { type: "gallery", title: "图库", imageIds: ["id1", "id2"] }
 *   { type: "infobox", title: "资料卡", imageId: "图片id", fields: [...] }
 *   { type: "note",    text: "提示文字", tone: "brand" }
 *   { type: "quote",   text: "引用语", attribution: "出处" }
 *   { type: "stats",   title: "数字", items: [{ value: "1", label: "说明" }] }
 *   { type: "features", title: "卡片组", items: [{ title: "标题", description: "说明" }] }
 *   { type: "hero",    title: "大标题", highlight: "高亮部分", description: "简介" }
 *   { type: "cta",     title: "行动号召", actions: [{ label: "按钮", href: "/x" }] }
 *
 * 图片要先在 data/images.ts 登记 id，块里再用 imageId / imageIds 引用。
 *
 * ── 怎么加新页面 ──────────────────────────────────────────────
 * 往下面的 pages 数组里追加一条记录即可（slug 决定访问路径）。
 * 路由由 app/[slug]/page.tsx 自动生成，不需要新建文件。
 * 想让它出现在左上角导航里，填好 group / showInNav / order。
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
    blocks: [
      // 在这里按顺序添加首页的内容块
    ],
  },

  {
    slug: "/services",
    title: "示例条目",
    navLabel: "示例条目",
    description: "第二个页面的占位登记，内容待填。",
    showInNav: true,
    order: 2,
    group: "内容",
    blocks: [],
  },

  {
    slug: "/gallery",
    title: "图片位置演示",
    navLabel: "图片位置",
    description: "第三个页面的占位登记，内容待填。",
    showInNav: true,
    order: 3,
    group: "内容",
    blocks: [],
  },

  {
    slug: "/about",
    title: "维护与版式说明",
    navLabel: "维护说明",
    description: "第四个页面的占位登记，内容待填。",
    showInNav: true,
    order: 4,
    group: "项目",
    blocks: [],
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
