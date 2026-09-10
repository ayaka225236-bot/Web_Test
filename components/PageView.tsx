import type { PageContent } from "@/data/types";
import { ArticleHeader } from "./ArticleHeader";
import { BlockRenderer } from "./blocks/BlockRenderer";
import { LeadImage } from "./LeadImage";
import styles from "./PageView.module.css";

/**
 * 页面视图：单栏通栏内容区。
 * 左右两栏（条目导航 / 目录与信息）已移除：
 * 导航移到左上角的滑出抽屉（NavDrawer），条目信息并入页头与页脚。
 */
export function PageView({ page }: { page: PageContent }) {
  return (
    <main className={styles.main} id="content">
      <article className={styles.article}>
        <div className={styles.inner}>
          <ArticleHeader page={page} />

          <LeadImage imageId={page.leadImageId} caption={page.leadImageCaption} />

          <div className={styles.content}>
            <BlockRenderer blocks={page.blocks} />
          </div>
        </div>
      </article>
    </main>
  );
}
