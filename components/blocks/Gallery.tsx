import { Section } from "./Section";
import { getImageOrFallback, placeholderImage } from "@/lib/images";
import type { GalleryBlock } from "@/data/types";
import styles from "./Gallery.module.css";
import shared from "./shared.module.css";

/**
 * 图片画廊：按 imageIds 顺序渲染。
 * 若 data/images.ts 中对应的真实图片尚未放入 public/，会回退到占位图。
 */
export function Gallery({ block }: { block: GalleryBlock }) {
  return (
    <Section title={block.title} description={block.description}>
      <ul className={styles.grid}>
        {block.imageIds.map((imageId) => {
          const image = getImageOrFallback(imageId);
          const fallback = placeholderImage(image);

          return (
            <li className={styles.item} key={imageId}>
              <figure className={styles.figure}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={`${styles.image} ${shared.imagePlaceholder}`}
                  src={fallback}
                  alt={image.alt}
                  width={1200}
                  height={750}
                  loading="lazy"
                />
                <figcaption className={styles.caption}>
                  <span className={styles.captionText}>
                    {image.caption ?? image.alt}
                  </span>
                  <code className={styles.captionPath}>{image.src}</code>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
