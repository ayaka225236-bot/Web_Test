import { MediaFrame } from "./MediaFrame";
import styles from "./LeadImage.module.css";

/**
 * 条目主图：放在标题下方、正文之前，是每页最重要的图片位置。
 * 由页面的 leadImageId 字段控制；没有填写时整块不渲染。
 */
export function LeadImage({
  imageId,
  caption,
}: {
  imageId?: string;
  caption?: string;
}) {
  if (!imageId) {
    return null;
  }

  return (
    <MediaFrame
      imageId={imageId}
      caption={caption}
      ratio="16/9"
      className={styles.lead}
      placeholderLabel="占位图 · 待替换"
    />
  );
}
