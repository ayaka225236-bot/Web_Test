import type { SiteConfig } from "./types";

/**
 * 站点全局信息：名称、标语、联系方式、页脚。
 * 这里通常是后续最常修改的文件。
 */
export const site: SiteConfig = {
  name: "示例站点",
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
