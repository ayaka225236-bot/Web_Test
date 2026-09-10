import { Section } from "./Section";
import type { StatsBlock } from "@/data/types";
import styles from "./Stats.module.css";

/** 关键数字一行展示 */
export function Stats({ block }: { block: StatsBlock }) {
  return (
    <Section title={block.title}>
      <dl className={styles.stats}>
        {block.items.map((item) => (
          <div className={styles.item} key={item.label}>
            <dt className={styles.label}>{item.label}</dt>
            <dd className={styles.value}>{item.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
