import type { Metadata } from "next";
import { Shell } from "@/components/Shell";
import { site } from "@/data/site";
import "./globals.css";

/** 全局 <head> 信息，内容来自 data/site.ts */
export const metadata: Metadata = {
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
