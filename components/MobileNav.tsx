import Link from "next/link";
import { navGroups } from "@/data/nav";
import { pages } from "@/data/pages";
import styles from "./MobileNav.module.css";

/**
 * 窄屏（≤1000px）显示的横向条目条，替代被收起的左侧导航栏。
 *
 * 这里是纯服务端组件：不做当前页高亮，因此不需要客户端 JS。
 * 需要高亮时把 NavLink 的 usePathname 逻辑挪进来即可（会变成客户端组件）。
 */
export function MobileNav() {
  const items = navGroups
    .flatMap((group) =>
      pages
        .filter((page) => page.group === group)
        .sort((a, b) => (a.order ?? 99) - (b.order ?? 99)),
    );

  return (
    <nav className={styles.nav} aria-label="条目导航（窄屏）">
      <ul className={styles.list}>
        {items.map((page) => (
          <li key={page.slug}>
            <Link className={styles.chip} href={page.slug}>
              {page.navLabel}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
