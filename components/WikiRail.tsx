import Link from "next/link";
import type { CtaLink, PageContent } from "@/data/types";
import type { TocEntry } from "@/lib/toc";
import styles from "./WikiRail.module.css";

interface WikiRailProps {
  page: PageContent;
  toc: TocEntry[];
}

/** 右侧栏：目录 + 条目信息 + 相关条目（维基的 Right Rail） */
export function WikiRail({ page, toc }: WikiRailProps) {
  const seeAlso: CtaLink[] = page.seeAlso ?? [];

  return (
    <aside className={styles.rail} aria-label="本页目录与信息">
      {toc.length > 0 ? (
        <nav className={styles.panel} aria-labelledby="toc-title">
          <h2 className={styles.panelTitle} id="toc-title">
            本页目录
          </h2>
          <ol className={styles.toc}>
            {toc.map((entry, index) => (
              <li className={styles.tocItem} key={entry.id}>
                <span className={styles.tocIndex}>{index + 1}.</span>
                <a className={styles.tocLink} href={`#${entry.id}`}>
                  {entry.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      <section className={styles.panel}>
        <h2 className={styles.panelTitle}>条目信息</h2>
        <dl className={styles.meta}>
          <div className={styles.metaRow}>
            <dt>分类</dt>
            <dd>{page.categories?.join(" · ") ?? "未分类"}</dd>
          </div>
          <div className={styles.metaRow}>
            <dt>更新</dt>
            <dd>{page.updatedAt ?? "—"}</dd>
          </div>
          <div className={styles.metaRow}>
            <dt>维护</dt>
            <dd>{page.maintainers?.join(" / ") ?? "—"}</dd>
          </div>
        </dl>
      </section>

      {seeAlso.length > 0 ? (
        <section className={styles.panel}>
          <h2 className={styles.panelTitle}>相关条目</h2>
          <ul className={styles.links}>
            {seeAlso.map((link) => (
              <li key={link.href}>
                <Link className={styles.link} href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </aside>
  );
}
