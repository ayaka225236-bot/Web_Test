import type { SiteConfig } from "./types";

/**
 * 站点全局信息：名称、标语、联系方式、页脚。
 * 这里通常是后续最常修改的文件。
 */
export const site: SiteConfig = {
  name: "示例站点",
  wordmark: "示例",
  tagline: "用数据描述内容，用组件负责呈现",
  description:
    "一个纯静态的内容展示站点模板：文案与图片集中在 data/ 目录，页面由 Next.js 组件渲染，无需后端服务。",
  contact: {
    email: "hello@example.com",
    location: "本地预览 · 未部署",
  },
  since: 2026,
  footerNote: "纯静态站点 · 本地浏览",
};

/**
 * 页脚链接组。
 * 这里刻意用相对路径，避免写死人名或外站地址。
 */
export const footerLinks: { title: string; items: { label: string; href: string }[] }[] = [
  {
    title: "站点",
    items: [
      { label: "首页", href: "/" },
      { label: "服务内容", href: "/services" },
      { label: "图片示例", href: "/gallery" },
      { label: "关于本模板", href: "/about" },
    ],
  },
  {
    title: "维护",
    items: [
      { label: "维护说明（README）", href: "/about" },
      { label: "内容数据目录", href: "/about" },
      { label: "反馈与纠错", href: "/about" },
    ],
  },
];

/**
 * 顶部搜索框的占位文字。
 * 注意：搜索功能本身还没做，这里只渲染一个静态输入框（见 README 的"前端待补"一节）。
 */
export const searchPlaceholder = "搜索本站条目…";
