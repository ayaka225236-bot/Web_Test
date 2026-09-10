import Link from "next/link";
import { footerLinks, site } from "@/data/site";
import styles from "./Footer.module.css";

/** 页脚：站点信息 + 链接组 */
export function Footer() {
  const year = new Date().getFullYear();
  const range = year > site.since ? `${site.since}–${year}` : `${site.since}`;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.about}>
          <p className={styles.name}>{site.name}</p>
          <p className={styles.desc}>{site.description}</p>
          <p className={styles.contact}>
            <span>{site.contact.email}</span>
            <span aria-hidden="true">·</span>
            <span>{site.contact.location}</span>
          </p>
        </div>

        <div className={styles.columns}>
          {footerLinks.map((column) => (
            <nav className={styles.column} key={column.title} aria-label={column.title}>
              <p className={styles.columnTitle}>{column.title}</p>
              <ul className={styles.columnList}>
                {column.items.map((item) => (
                  <li key={`${column.title}-${item.label}`}>
                    <Link className={styles.columnLink} href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>
          © {range} {site.name} · {site.footerNote}
        </p>
      </div>
    </footer>
  );
}
