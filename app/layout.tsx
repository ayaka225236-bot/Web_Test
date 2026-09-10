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
 * 把 data/layout.ts 的版式参数注入成 CSS 变量，
 * 这样改一个数字就能调整内容宽度与正文行高，不用碰 CSS。
 */
const layoutVars = {
  "--content-width": `${layout.contentWidth}px`,
  "--prose-width": `${layout.proseWidth}px`,
  "--lh-body": `${layout.lineHeight}`,
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
