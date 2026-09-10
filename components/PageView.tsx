import type { PageContent } from "@/data/types";
import { buildToc } from "@/lib/toc";
import { ArticleHeader } from "./ArticleHeader";
import { BlockRenderer } from "./blocks/BlockRenderer";
import { LeadImage } from "./LeadImage";
import { WikiRail } from "./WikiRail";
import styles from "./PageView.module.css";

/**
 * 页面视图：内容卡片与右侧导航栏是**两个独立的块**，
 * 各自有自己的边框、圆角和底色，不共用一张卡片背景。
 */
export function PageView({ page }: { page: PageContent }) {
  const toc = buildToc(page.blocks);

  return (
    <main className={styles.main} id="content">
      <div className={styles.layout}>
        <article className={styles.article}>
          <ArticleHeader page={page} />

          <LeadImage imageId={page.leadImageId} caption={page.leadImageCaption} />

          <div className={styles.content}>
            <BlockRenderer blocks={page.blocks} />
          </div>
        </article>

        <div className={styles.railBlock}>
          <WikiRail page={page} toc={toc} />
        </div>
      </div>
    </main>
  );
}
