import { MediaFrame } from "../MediaFrame";
import { Section } from "./Section";
import { blockAnchor } from "@/lib/toc";
import type { GalleryBlock } from "@/data/types";
import styles from "./Gallery.module.css";

/**
 * 多图图库：桌面端每行三张，窄屏自动降为两列或一列。
 * 每张图都通过 MediaFrame 取地址，因此没有真实图片时显示占位图。
 */
export function Gallery({ block, index }: { block: GalleryBlock; index?: number }) {
  return (
    <Section
      id={typeof index === "number" ? blockAnchor(block, index) : undefined}
      title={block.title}
      description={block.description}
    >
      <ul className={styles.grid}>
        {block.imageIds.map((imageId) => (
          <li className={styles.item} key={imageId}>
            <MediaFrame imageId={imageId} ratio="8/5" />
          </li>
        ))}
      </ul>
    </Section>
  );
}
