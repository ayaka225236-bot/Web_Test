import { Section } from "./Section";
import { blockAnchor } from "@/lib/toc";
import type { FeaturesBlock } from "@/data/types";
import styles from "./Features.module.css";

/** 卡片网格 / 朴素列表：展示一组条目 */
export function Features({
  block,
  index,
}: {
  block: FeaturesBlock;
  index?: number;
}) {
  const columns = block.columns ?? 3;
  const variant = block.variant ?? "card";

  return (
    <Section
      id={typeof index === "number" ? blockAnchor(block, index) : undefined}
      title={block.title}
      description={block.description}
    >
      <ul
        className={`${styles.grid} ${variant === "plain" ? styles.plain : ""}`}
        style={{ "--columns": columns } as React.CSSProperties}
      >
        {block.items.map((item) => (
          <li className={styles.card} key={item.title}>
            {item.icon && variant === "card" ? (
              <span className={styles.icon} aria-hidden="true">
                {item.icon}
              </span>
            ) : null}

            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardText}>{item.description}</p>

            {item.tags && item.tags.length > 0 ? (
              <ul className={styles.tags}>
                {item.tags.map((tag) => (
                  <li className={styles.tag} key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </Section>
  );
}
