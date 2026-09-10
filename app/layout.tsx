import type { Metadata } from "next";
import { Shell } from "@/components/Shell";
import { layout } from "@/data/layout";
import { site } from "@/data/site";
import "./theme.css";
import "./theme-dark.css";
import "./typography.css";
import "./globals.css";
import "./wiki.css";

/** 全局 <head> 信息，内容来自 data/site.ts */
export const metadata: Metadata = {
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
};

/**
 * 把 data/layout.ts 的参数注入成 CSS 变量，
 * 这样改一个数字就能调整卡片宽度、右栏宽度与正文行高，不用碰 CSS。
 */
const layoutVars = {
  "--card-width": `${layout.cardWidth}px`,
  "--rail-width": `${layout.railWidth}px`,
  "--inner-gap": `${layout.innerGap}px`,
  "--content-width": `${layout.contentWidth}px`,
  "--lh-body": `${layout.lineHeight}`,
  /* 正文不再单独限制行宽，跟随卡片内正文列的实际宽度 */
  "--prose-width": "100%",
} as React.CSSProperties;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body style={layoutVars}>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
