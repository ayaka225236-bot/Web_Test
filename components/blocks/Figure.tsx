import { MediaFrame } from "../MediaFrame";
import type { FigureBlock } from "@/data/types";
import styles from "./Figure.module.css";

/**
 * 正文配图：整宽居中，或浮动在文字一侧。
 * 窄屏下浮动会自动取消，变成整宽显示。
 */
export function Figure({ block }: { block: FigureBlock }) {
  const align = block.align ?? "center";
  const size = block.size ?? "full";

  const className = [
    styles.figure,
    styles[align] ?? "",
    styles[size] ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <MediaFrame
      imageId={block.imageId}
      caption={block.caption}
      className={className}
      ratio="16/9"
    />
  );
}
