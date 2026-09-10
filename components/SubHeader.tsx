import Link from "next/link";
import styles from "./SubHeader.module.css";
import { site } from "@/data/site";
import { getPage } from "@/data/pages";

/**
 * 导航栏下方的二级条：显示站点名、条目总数，并把首页作为快速入口。
 */
export function SubHeader() {
  const home = getPage("/");

  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        <div className={styles.title}>
          <Link href="/">{site.name}</Link>
          <em>{site.tagline}</em>
        </div>

        <div className={styles.meta}>
          {home?.categories?.slice(0, 2).map((category) => (
            <span className={styles.tag} key={category}>
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
