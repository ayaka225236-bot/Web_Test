import type { QuoteBlock } from "@/data/types";
import styles from "./Quote.module.css";

/** 引用语 */
export function Quote({ block }: { block: QuoteBlock }) {
  return (
    <figure className={styles.quote}>
      <blockquote className={styles.text}>{block.text}</blockquote>
      {block.attribution ? (
        <figcaption className={styles.attribution}>{block.attribution}</figcaption>
      ) : null}
    </figure>
  );
}
