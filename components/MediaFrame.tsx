import { getImageOrFallback, getImageSource } from "@/lib/images";
import styles from "./MediaFrame.module.css";

interface MediaFrameProps {
  /** data/images.ts 中登记的图片 id */
  imageId: string;
  /** 覆盖登记表里的说明文字 */
  caption?: string;
  /** 显示比例，默认按图片自身比例 */
  ratio?: "16/9" | "4/3" | "1/1" | "8/5";
  /** 额外类名，用于控制宽度与浮动 */
  className?: string;
  /** 占位文字（没有登记图片时显示） */
  placeholderLabel?: string;
}

/**
 * 统一的图片容器。
 *
 * 图片地址来自 data/images.ts：src 为空时自动渲染占位图，
 * 所以任何位置的图片都可以先不准备素材。
 */
export function MediaFrame({
  imageId,
  caption,
  ratio,
  className,
  placeholderLabel,
}: MediaFrameProps) {
  const asset = getImageOrFallback(imageId);
  const src = getImageSource(imageId);
  const text = caption ?? asset.caption ?? asset.alt;

  return (
    <figure className={className ? `${styles.frame} ${className}` : styles.frame}>
      <div
        className={styles.media}
        style={ratio ? { aspectRatio: ratio.replace("/", " / ") } : undefined}
      >
        {/* 静态站点 + 占位图可能是 data URI，直接用 img 标签 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.image}
          src={src}
          alt={asset.alt}
          width={1200}
          height={750}
          loading="lazy"
        />
      </div>

      {text ? (
        <figcaption className={styles.caption}>
          <span>{text}</span>
          <code className={styles.path}>
            {asset.src ? asset.src : placeholderLabel ?? "占位图"}
          </code>
        </figcaption>
      ) : null}
    </figure>
  );
}
