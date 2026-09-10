import { site } from "@/data/site";
import styles from "./Footer.module.css";

/** 页脚：版权与联系方式，内容来自 data/site.ts */
export function Footer() {
  const year = new Date().getFullYear();
  const range = year > site.since ? `${site.since}–${year}` : `${site.since}`;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>
          © {range} {site.name}
        </p>
        <p className={styles.meta}>
          <span>{site.contact.email}</span>
          <span aria-hidden="true">·</span>
          <span>{site.contact.location}</span>
          <span aria-hidden="true">·</span>
          <span>{site.footerNote}</span>
        </p>
      </div>
    </footer>
  );
}
