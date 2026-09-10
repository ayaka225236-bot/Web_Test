/**
 * 站点与页面登记表。
 *
 * 左上角导航里的"站点切换"就是按这个结构生成的：
 * 一个站点 = 一个卡片条目，下面的页面 = 该站点自己的条目列表。
 *
 * 用法：
 * - 当前站点用 defaultSite 指定（app/pages.ts 里的页面都属于它）；
 * - 其它站点先填你打算用的地址即可，内容做好后把页面挂上去就行；
 * - 后续把内容搬成"一页一文件"时，这里只需要改 import，结构不用动。
 */
import type { SiteEntry } from "./types";
import { site as currentSite } from "./site";
import { pages } from "./pages";

export const sites: SiteEntry[] = [
  {
    id: "wiki",
    name: currentSite.name,
    description: currentSite.tagline,
    href: "/",
    pages: pages.map((page) => ({
      href: page.slug,
      label: page.navLabel,
      group: page.group,
      order: page.order,
    })),
  },
  {
    id: "notes",
    name: "备用站点",
    description: "第二个站点的占位条目",
    href: "/about",
    pages: [
      { href: "/about", label: "说明", group: "概览", order: 1 },
      { href: "/gallery", label: "图片位置", group: "内容", order: 2 },
    ],
  },
  {
    id: "archive",
    name: "归档站点",
    description: "旧内容归档用的占位站点",
    href: "/gallery",
    pages: [{ href: "/gallery", label: "图库", group: "内容", order: 1 }],
  },
];

/** 当前站点（页面内容属于它） */
export const defaultSiteId = "wiki";

/** 当前站点条目 */
export const currentSiteEntry: SiteEntry =
  sites.find((entry) => entry.id === defaultSiteId) ?? sites[0];

/** 切换菜单里展示的其它站点 */
export const otherSites: SiteEntry[] = sites.filter(
  (entry) => entry.id !== defaultSiteId,
);
