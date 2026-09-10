import { MediaFrame } from "../MediaFrame";
import { ActionLinks } from "./ActionLinks";
import type { HeroBlock } from "@/data/types";
import styles from "./Hero.module.css";

/** 首页顶部横幅：大标题 + 简介 + 按钮 + 一张主图 */
export function Hero({ block }: { block: HeroBlock }) {
  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        {block.eyebrow ? <p className={styles.eyebrow}>{block.eyebrow}</p> : null}

        <h2 className={styles.title}>
          {block.title}
          {block.highlight ? (
            <span className={styles.highlight}>{block.highlight}</span>
          ) : null}
        </h2>

        {block.description ? (
          <p className={styles.description}>{block.description}</p>
        ) : null}

        <ActionLinks actions={block.actions} />
      </div>

      {block.imageId ? (
        <MediaFrame
          imageId={block.imageId}
          caption={block.caption}
          ratio="16/9"
          className={styles.figure}
        />
      ) : null}
    </section>
  );
}
