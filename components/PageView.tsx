import type { PageContent } from "@/data/types";
import { BlockRenderer } from "./blocks/BlockRenderer";
import styles from "./PageView.module.css";

/**
 * 页面视图：把一条 PageContent 数据渲染成完整版面。
 * 首页与动态页共用这个组件，保证版式一致。
 */
export function PageView({ page }: { page: PageContent }) {
  return (
    <article className={styles.page}>
      {page.intro ? (
        <header className={styles.header}>
          <h1 className={styles.title}>{page.title}</h1>
          <p className={styles.intro}>{page.intro}</p>
        </header>
      ) : null}

      <BlockRenderer blocks={page.blocks} />
    </article>
  );
}
