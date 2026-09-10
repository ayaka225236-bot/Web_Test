import type { ReactNode } from "react";
import styles from "./Section.module.css";

interface SectionProps {
  /** 区块标题，留空则不渲染标题行 */
  title?: string;
  /** 区块说明文字 */
  description?: string;
  children: ReactNode;
}

/** 内容块的统一外壳：负责标题层级与区块间距 */
export function Section({ title, description, children }: SectionProps) {
  return (
    <section className={styles.section}>
      {title ? <h2 className={styles.title}>{title}</h2> : null}
      {description ? <p className={styles.description}>{description}</p> : null}
      {children}
    </section>
  );
}
