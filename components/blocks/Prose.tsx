import { Section } from "./Section";
import { blockAnchor } from "@/lib/toc";
import type { ProseBlock } from "@/data/types";
import styles from "./Prose.module.css";

/** 段落文本区块 */
export function Prose({ block, index }: { block: ProseBlock; index?: number }) {
  return (
    <Section
      id={typeof index === "number" ? blockAnchor(block, index) : undefined}
      title={block.title}
    >
      {block.tone ? (
        <p className={`${styles.tone} ${styles[block.tone] ?? ""}`}>
          {block.tone === "brand" ? "说明" : block.tone === "warn" ? "注意" : "备注"}
        </p>
      ) : null}

      <div className={styles.body}>
        {block.paragraphs.map((paragraph, paragraphIndex) => (
          <p key={paragraphIndex}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
