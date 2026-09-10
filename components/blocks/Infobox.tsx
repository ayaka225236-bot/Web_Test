import Link from "next/link";
import { MediaFrame } from "../MediaFrame";
import type { InfoboxBlock } from "@/data/types";
import styles from "./Infobox.module.css";

/**
 * 信息框（资料卡）：放在正文开头，右侧浮动，后续段落自动绕排。
 * 提醒：请把 infobox 放在该页 blocks 数组的第一项，绕排效果才正确。
 */
export function Infobox({ block }: { block: InfoboxBlock }) {
  return (
    <aside className={styles.box} aria-label={`${block.title} 资料`}>
      <p className={styles.title}>{block.title}</p>
      {block.subtitle ? <p className={styles.subtitle}>{block.subtitle}</p> : null}

      {block.imageId ? (
        <MediaFrame
          imageId={block.imageId}
          caption={block.imageCaption}
          ratio="4/3"
          className={styles.image}
        />
      ) : null}

      {block.fields && block.fields.length > 0 ? (
        <dl className={styles.fields}>
          {block.fields.map((field) => (
            <div className={styles.row} key={field.label}>
              <dt className={styles.label}>{field.label}</dt>
              <dd className={styles.value}>
                {field.href ? (
                  <Link href={field.href}>{field.value}</Link>
                ) : (
                  field.value ?? "—"
                )}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      {block.footnote ? <p className={styles.footnote}>{block.footnote}</p> : null}
    </aside>
  );
}
