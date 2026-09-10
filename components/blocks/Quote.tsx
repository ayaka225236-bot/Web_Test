import { blockAnchor } from "@/lib/toc";
import type { QuoteBlock } from "@/data/types";
import styles from "./Quote.module.css";

/** 引用语 */
export function Quote({ block, index }: { block: QuoteBlock; index?: number }) {
  return (
    <figure
      className={styles.quote}
      id={typeof index === "number" ? blockAnchor(block, index) : undefined}
    >
      <blockquote className={styles.text}>{block.text}</blockquote>
      {block.attribution ? (
        <figcaption className={styles.attribution}>{block.attribution}</figcaption>
      ) : null}
    </figure>
  );
}
