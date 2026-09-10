import { NavLink } from "./NavLink";
import { navGroups } from "@/data/nav";
import { pages } from "@/data/pages";
import styles from "./WikiSidebar.module.css";

/**
 * 左侧条目导航（维基的 Local Navigation）。
 * 分组与顺序来自 data/nav.ts 和每条页面的 group / order 字段。
 */
export function WikiSidebar() {
  const groups = navGroups
    .map((group) => ({
      group,
      items: pages
        .filter((page) => page.group === group)
        .sort((a, b) => (a.order ?? 99) - (b.order ?? 99)),
    }))
    .filter((entry) => entry.items.length > 0);

  return (
    <aside className={styles.sidebar} aria-label="条目导航">
      {groups.map((entry) => (
        <section className={styles.group} key={entry.group}>
          <h2 className={styles.groupTitle}>{entry.group}</h2>
          <ul className={styles.list}>
            {entry.items.map((page) => (
              <NavLink
                key={page.slug}
                href={page.slug}
                label={page.navLabel}
                icon={page.categories?.[0] === "首页" ? "⌂" : undefined}
              />
            ))}
          </ul>
        </section>
      ))}

      <p className={styles.hint}>
        条目共 {pages.length} 个 · 分 {groups.length} 组
      </p>
    </aside>
  );
}
