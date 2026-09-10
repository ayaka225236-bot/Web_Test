import type { Metadata } from "next";
import { PageView } from "@/components/PageView";
import { homePage } from "@/data/pages";

export const metadata: Metadata = {
  title: homePage.title,
  description: homePage.description,
};

/** 首页（内容来自 data/pages.ts 中 slug 为 "/" 的那条记录） */
export default function HomePage() {
  return <PageView page={homePage} />;
}
