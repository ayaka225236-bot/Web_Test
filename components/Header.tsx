import Link from "next/link";
import { navPages } from "@/data/pages";
import { site } from "@/data/site";
import styles from "./Header.module.css";

/** 顶部导航：站点名称 + 由 data/pages.ts 自动生成的页签 */
export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brand} href="/">
          <span className={styles.brandMark} aria-hidden="true" />
          <span className={styles.brandText}>
            <strong>{site.name}</strong>
            <small>{site.tagline}</small>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="站点导航">
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
