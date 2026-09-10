import { searchPlaceholder } from "@/data/site";
import styles from "./Header.module.css";

/** 极简顶栏：只保留搜索框（功能尚未实现，见 README「前端还差什么」） */
export function Header() {
  return (
    <header className={styles.topBar}>
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
        <button className={styles.searchButton} type="submit">
          搜索
        </button>
      </form>
    </header>
  );
}
