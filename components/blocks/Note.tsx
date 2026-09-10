import { Section } from "./Section";
import { blockAnchor } from "@/lib/toc";
import type { NoteBlock } from "@/data/types";
import styles from "./Note.module.css";

/** 提示条 */
export function Note({ block, index }: { block: NoteBlock; index?: number }) {
  const tone = block.tone ?? "neutral";

  return (
    <Section
      id={typeof index === "number" ? blockAnchor(block, index) : undefined}
      title={block.title}
    >
      <p className={`${styles.note} ${styles[tone] ?? ""}`}>{block.text}</p>
    </Section>
  );
}
