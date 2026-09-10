import { Section } from "./Section";
import type { NoteBlock } from "@/data/types";
import styles from "./Note.module.css";

/** 提示条 */
export function Note({ block }: { block: NoteBlock }) {
  const tone = block.tone ?? "neutral";

  return (
    <Section title={block.title}>
      <p className={`${styles.note} ${styles[tone] ?? ""}`}>{block.text}</p>
    </Section>
  );
}
