import { ActionLinks } from "./ActionLinks";
import { getImageOrFallback, placeholderImage } from "@/lib/images";
import type { HeroBlock } from "@/data/types";
import styles from "./Hero.module.css";
import shared from "./shared.module.css";

/** 顶部横幅：大标题 + 简介 + 按钮 + 一张配图 */
export function Hero({ block }: { block: HeroBlock }) {
  const image = block.imageId ? getImageOrFallback(block.imageId) : undefined;
  const imageSrc = image ? placeholderImage(image) : undefined;

  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        {block.eyebrow ? <p className={styles.eyebrow}>{block.eyebrow}</p> : null}

        <h1 className={styles.title}>
          {block.title}
          {block.highlight ? (
            <span className={styles.highlight}>{block.highlight}</span>
          ) : null}
        </h1>

        {block.description ? (
          <p className={styles.description}>{block.description}</p>
        ) : null}

        <ActionLinks actions={block.actions} />
      </div>

      {image && imageSrc ? (
        <figure className={styles.figure}>
          {/* 静态站点，直接使用 img 标签即可，无需 next/image 的优化管线 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={`${styles.image} ${shared.imagePlaceholder}`}
            src={imageSrc}
            alt={image.alt}
            width={1200}
            height={750}
          />
          {image.caption ? (
            <figcaption className={styles.caption}>{image.caption}</figcaption>
          ) : null}
        </figure>
      ) : null}
    </section>
  );
}
