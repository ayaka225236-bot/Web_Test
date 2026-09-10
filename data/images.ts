import type { ImageAsset } from "./types";

/**
 * 图片登记表。
 *
 * 用法：
 * 1. 把图片文件放进 public/images/ 目录（png / jpg / webp / svg 均可）；
 * 2. 在下面登记一条记录，把 src 改成 "/images/文件名"；
 * 3. 在 data/pages.ts 里通过 leadImageId / imageId / imageIds 引用这个 id。
 *
 * 注意：src 留空字符串 "" 时，页面会自动渲染一张带文字标签的占位图，
 * 用来占住版面。把真实文件放好、把 src 填上，占位图就自动被替换掉。
 */
export const images: ImageAsset[] = [
  {
    id: "lead-overview",
    src: "", // 放好图片后填 "/images/lead-overview.png"
    alt: "条目主图示意",
    caption: "条目主图位置（建议 16:9 或 4:3）",
    placeholder: { label: "条目主图", from: "#1d4ed8", to: "#0f172a" },
  },
  {
    id: "figure-body-1",
    src: "",
    alt: "正文配图示意（居中）",
    caption: "正文配图位置 · 居中整宽",
    placeholder: { label: "正文配图 A", from: "#2563eb", to: "#1e3a8a" },
  },
  {
    id: "figure-body-2",
    src: "",
    alt: "正文配图示意（右浮动）",
    caption: "正文配图位置 · 右浮动小图",
    placeholder: { label: "正文配图 B", from: "#0ea5e9", to: "#1e40af" },
  },
  {
    id: "gallery-1",
    src: "",
    alt: "图库图片一",
    caption: "图库 01",
    placeholder: { label: "图库 01", from: "#0ea5e9", to: "#1e3a8a" },
  },
  {
    id: "gallery-2",
    src: "",
    alt: "图库图片二",
    caption: "图库 02",
    placeholder: { label: "图库 02", from: "#14b8a6", to: "#0f766e" },
  },
  {
    id: "gallery-3",
    src: "",
    alt: "图库图片三",
    caption: "图库 03",
    placeholder: { label: "图库 03", from: "#f59e0b", to: "#b45309" },
  },
  {
    id: "gallery-4",
    src: "",
    alt: "图库图片四",
    caption: "图库 04",
    placeholder: { label: "图库 04", from: "#8b5cf6", to: "#4c1d95" },
  },
  {
    id: "gallery-5",
    src: "",
    alt: "图库图片五",
    caption: "图库 05",
    placeholder: { label: "图库 05", from: "#ec4899", to: "#831843" },
  },
  {
    id: "gallery-6",
    src: "",
    alt: "图库图片六",
    caption: "图库 06",
    placeholder: { label: "图库 06", from: "#64748b", to: "#1e293b" },
  },
];
