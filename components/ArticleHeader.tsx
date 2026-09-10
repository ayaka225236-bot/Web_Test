import type { PageContent } from "@/data/types";
import styles from "./ArticleHeader.module.css";

/** 条目页头：标题 + 分类 + 更新信息 + 导语（维基条目顶部的标题区） */
export function ArticleHeader({ page }: { page: PageContent }) {
  const hasMeta =
    page.categories?.length || page.updatedAt || page.maintainers?.length;

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{page.title}</h1>

      {hasMeta ? (
        <div className={styles.meta}>
          {page.categories?.length ? (
            <ul className={styles.categories}>
              {page.categories.map((category) => (
                <li className={styles.category} key={category}>
                  {category}
                </li>
              ))}
            </ul>
          ) : null}

          <p className={styles.updated}>
            {page.maintainers?.length ? (
              <span>维护者：{page.maintainers.join(" / ")}</span>
            ) : null}
            {page.updatedAt ? <span>最后更新：{page.updatedAt}</span> : null}
          </p>
        </div>
      ) : null}

      {page.intro ? <p className={styles.intro}>{page.intro}</p> : null}
    </header>
  );
}
