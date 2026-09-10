import type { PageContent } from "@/data/types";
import { buildToc } from "@/lib/toc";
import { ArticleHeader } from "./ArticleHeader";
import { BlockRenderer } from "./blocks/BlockRenderer";
import { LeadImage } from "./LeadImage";
import { WikiRail } from "./WikiRail";
import styles from "./PageView.module.css";

/**
 * 页面视图：单栏通栏卡片，卡片内部左侧正文 + 右侧导航栏。
 * 左上角还有全局的滑出导航（NavDrawer）。
 */
export function PageView({ page }: { page: PageContent }) {
  const toc = buildToc(page.blocks);

  return (
    <main className={styles.main} id="content">
      <div className={styles.card}>
        <article className={styles.article}>
          <ArticleHeader page={page} />

          <LeadImage imageId={page.leadImageId} caption={page.leadImageCaption} />

          <div className={styles.content}>
            <BlockRenderer blocks={page.blocks} />
          </div>
        </article>

        <WikiRail page={page} toc={toc} />
      </div>
    </main>
  );
}
