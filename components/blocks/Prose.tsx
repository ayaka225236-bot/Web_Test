import { Section } from "./Section";
import type { ProseBlock } from "@/data/types";
import styles from "./Prose.module.css";

/** 段落文本区块 */
export function Prose({ block }: { block: ProseBlock }) {
  return (
    <Section title={block.title}>
      {block.tone ? (
        <p className={`${styles.tone} ${styles[block.tone] ?? ""}`}>
          {block.tone === "brand" ? "说明" : block.tone === "warn" ? "注意" : "备注"}
        </p>
      ) : null}

      <div className={styles.body}>
        {block.paragraphs.map((paragraph, index) => (
          <p className={styles.paragraph} key={index}>
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
