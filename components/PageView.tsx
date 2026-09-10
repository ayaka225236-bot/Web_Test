import { MobileNav } from "./MobileNav";
import { WikiSidebar } from "./WikiSidebar";
import styles from "./PageView.module.css";
import type { PageContent } from "@/data/types";
import { buildToc } from "@/lib/toc";
import { ArticleHeader } from "./ArticleHeader";
import { BlockRenderer } from "./blocks/BlockRenderer";
import { LeadImage } from "./LeadImage";
import { WikiRail } from "./WikiRail";

/**
 * 页面视图：维基式三栏结构
 * 左栏条目导航 · 中间正文 · 右栏目录与信息
 * 窄屏时左栏收起，改用顶部的横向条目条。
 */
export function PageView({ page }: { page: PageContent }) {
  const toc = buildToc(page.blocks);

  return (
    <div className={styles.body}>
      <MobileNav />

      <div className={styles.sidebar}>
        <WikiSidebar />
      </div>

      <main className={styles.article} id="content">
        <ArticleHeader page={page} />

        <LeadImage imageId={page.leadImageId} caption={page.leadImageCaption} />

        <div className={styles.content}>
          <BlockRenderer blocks={page.blocks} />
        </div>
      </main>

      <WikiRail page={page} toc={toc} />
    </div>
  );
}
