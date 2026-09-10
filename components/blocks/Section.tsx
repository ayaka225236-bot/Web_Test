import type { ReactNode } from "react";
import styles from "./Section.module.css";

interface SectionProps {
  /** 锚点 id（由 lib/toc.ts 生成，右侧目录会指向它） */
  id?: string;
  /** 小节标题，留空则不渲染标题行 */
  title?: string;
  /** 小节说明文字 */
  description?: string;
  children: ReactNode;
}

/**
 * 内容块的统一外壳：负责小节标题的层级、分隔线与区块间距。
 * 首页等"落地页"式页面通过 globals 传入的样式类可以调整间距。
 */
export function Section({ id, title, description, children }: SectionProps) {
  return (
    <section className={styles.section} id={id}>
      {title ? (
        <h2 className={styles.title}>
          <span className={styles.anchor} aria-hidden="true" />
          {title}
        </h2>
      ) : null}
      {description ? <p className={styles.description}>{description}</p> : null}
      {children}
    </section>
  );
}
