import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageView } from "@/components/PageView";
import { getPage, pages } from "@/data/pages";

interface PageProps {
  /** Next.js 15 起动态路由参数是 Promise */
  params: Promise<{ slug: string }>;
}

/** 构建期为 data/pages.ts 里的每个页面生成静态路由 */
export function generateStaticParams() {
  return pages
    .filter((page) => page.slug !== "/")
    .map((page) => ({ slug: page.slug.replace(/^\//, "") }));
}

/** 动态路由：任何在 data/pages.ts 中登记过的页面都会自动可用 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(`/${slug}`);

  if (!page) {
    return { title: "页面不存在" };
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPage(`/${slug}`);

  if (!page) {
    notFound();
  }

  return <PageView page={page} />;
}
