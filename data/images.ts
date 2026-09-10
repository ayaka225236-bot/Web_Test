import type { ImageAsset } from "./types";

/**
 * 图片登记表。
 *
 * 用法：
 * 1. 把图片文件放进 public/images/ 目录（png / jpg / webp / svg 均可）；
 * 2. 在下面登记一条记录，id 自己起一个有意义的短名；
 * 3. 在 data/pages.ts 里通过 imageId / imageIds 引用这个 id。
 *
 * 说明：仓库里暂时没有真实图片，未提供 src 文件的图片会回退到 placeholder
 * 生成的占位图（灰蓝渐变 + 文字标签）。放入真实图片后即可覆盖占位图，
 * 不需要修改任何组件代码。
 */
export const images: ImageAsset[] = [
  {
    id: "hero-main",
    src: "/images/hero-main.svg",
    alt: "站点首页的横幅占位图",
    caption: "首页横幅（替换 public/images/hero-main.svg 即可）",
    placeholder: { label: "首页横幅", from: "#1d4ed8", to: "#0f172a" },
  },
  {
    id: "gallery-1",
    src: "/images/gallery-1.svg",
    alt: "示例展示图之一",
    caption: "示例图 01",
    placeholder: { label: "示例图 01", from: "#0ea5e9", to: "#1e3a8a" },
  },
  {
    id: "gallery-2",
    src: "/images/gallery-2.svg",
    alt: "示例展示图之二",
    caption: "示例图 02",
    placeholder: { label: "示例图 02", from: "#14b8a6", to: "#0f766e" },
  },
  {
    id: "gallery-3",
    src: "/images/gallery-3.svg",
    alt: "示例展示图之三",
    caption: "示例图 03",
    placeholder: { label: "示例图 03", from: "#f59e0b", to: "#b45309" },
  },
  {
    id: "gallery-4",
    src: "/images/gallery-4.svg",
    alt: "示例展示图之四",
    caption: "示例图 04",
    placeholder: { label: "示例图 04", from: "#8b5cf6", to: "#4c1d95" },
  },
  {
    id: "gallery-5",
    src: "/images/gallery-5.svg",
    alt: "示例展示图之五",
    caption: "示例图 05",
    placeholder: { label: "示例图 05", from: "#ec4899", to: "#831843" },
  },
  {
    id: "gallery-6",
    src: "/images/gallery-6.svg",
    alt: "示例展示图之六",
    caption: "示例图 06",
    placeholder: { label: "示例图 06", from: "#64748b", to: "#1e293b" },
  },
];
