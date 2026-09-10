import { images } from "@/data/images";
import type { ImageAsset } from "@/data/types";

/** 占位图兜底用的渐变底色 */
const fallbackPlaceholder: NonNullable<ImageAsset["placeholder"]> = {
  label: "暂无图片",
  from: "#1e293b",
  to: "#0f172a",
};

/** 内联 SVG 需要转义的特殊字符 */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * 生成一张 1200x750 的占位图（data URI）。
 * 覆盖真实图片前先用它把版面撑起来，避免出现破图。
 */
export function placeholderImage(asset: ImageAsset): string {
  const { label, from, to } = asset.placeholder ?? {
    ...fallbackPlaceholder,
    label: asset.alt || "暂无图片",
  };

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="750" fill="url(#g)"/>
  <g fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="2">
    <circle cx="1010" cy="150" r="90"/>
    <circle cx="150" cy="640" r="130"/>
    <path d="M0 560 L330 380 L620 560 L900 330 L1200 520"/>
  </g>
  <text x="60" y="120" fill="rgba(255,255,255,0.92)" font-family="'Microsoft YaHei','PingFang SC',sans-serif" font-size="54" font-weight="700">${escapeXml(
    label,
  )}</text>
  <text x="60" y="176" fill="rgba(255,255,255,0.65)" font-family="'Microsoft YaHei','PingFang SC',sans-serif" font-size="26">占位图 · 替换 public${escapeXml(
    asset.src,
  )} 即可</text>
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** 按 id 取图片登记信息 */
export function getImage(id: string): ImageAsset | undefined {
  return images.find((item) => item.id === id);
}

/** 按 id 取图片登记信息，找不到时给出兜底对象，避免组件里到处判空 */
export function getImageOrFallback(id: string): ImageAsset {
  const asset = getImage(id);
  if (asset) {
    return asset;
  }
  return {
    id,
    src: `/#missing-image-${id}`,
    alt: `未在 data/images.ts 中登记的图片：${id}`,
  };
}

/**
 * 取一张图片最终用于 <img src> 的地址。
 *
 * 逻辑：登记的 src 为空（说明还没放真实图片）时返回自动生成的占位图；
 * 否则直接返回登记的真实图片地址。这样替换图片只需要放文件 + 改 data/images.ts，
 * 组件一行都不用动。
 */
export function getImageSource(id: string): string {
  const asset = getImageOrFallback(id);
  return asset.src ? asset.src : placeholderImage(asset);
}

/** 该图片当前是否还在使用占位图 */
export function isPlaceholder(id: string): boolean {
  return !getImageOrFallback(id).src;
}
