import Link from "next/link";
import { navPages } from "@/data/pages";
import { searchPlaceholder, site } from "@/data/site";
import styles from "./Header.module.css";

/**
 * 顶部全局导航条（维基的 Global Navigation）：
 * 站点标识 + 搜索框 + 主要条目入口。
 */
export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brand} href="/">
          <span className={styles.wordmark} aria-hidden="true">
            {site.wordmark}
          </span>
          <span className={styles.brandText}>
            <strong>{site.name}</strong>
            <small>{site.tagline}</small>
          </span>
        </Link>

        <form className={styles.search} role="search">
          <span className={styles.searchIcon} aria-hidden="true">
            ⌕
          </span>
          <input
            className={styles.searchInput}
            type="search"
            name="query"
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
          />
        </form>

        <nav className={styles.nav} aria-label="主要条目">
          <ul className={styles.navList}>
            {navPages.map((page) => (
              <li key={page.slug}>
                <Link className={styles.navLink} href={page.slug}>
                  {page.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
