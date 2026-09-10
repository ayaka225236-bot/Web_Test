import Link from "next/link";
import { Section } from "./Section";
import { blockAnchor } from "@/lib/toc";
import { renderBlock } from "./renderBlock";
import type { SectionBlock } from "@/data/types";
import styles from "./SectionBlock.module.css";

/** 正文小节：标题 + 段落 + 可选链接 + 子内容块 */
export function SectionBlockView({
  block,
  index,
}: {
  block: SectionBlock;
  index: number;
}) {
  return (
    <Section id={blockAnchor(block, index)} title={block.title}>
      {block.paragraphs && block.paragraphs.length > 0 ? (
        <div className={styles.paragraphs}>
          {block.paragraphs.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex}>{paragraph}</p>
          ))}
        </div>
      ) : null}

      {block.links && block.links.length > 0 ? (
        <ul className={styles.links}>
          {block.links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      ) : null}

      {block.blocks && block.blocks.length > 0 ? (
        <div className={styles.nested}>
          {block.blocks.map((child, childIndex) => renderBlock(child, childIndex))}
        </div>
      ) : null}
    </Section>
  );
}
