import type { ContentBlock } from "@/data/types";

export interface TocEntry {
  /** 锚点 id，同时也写在对应标题的 id 属性上 */
  id: string;
  label: string;
}

/**
 * 为页面构建锚点 id。
 * 用「序号 + 类型」而不是标题文字，好处是标题改写后已有链接不会失效，
 * 也不需要处理中文转拼音、重名等问题。
 */
export function blockAnchor(block: ContentBlock, index: number): string {
  return `section-${index}-${block.type}`;
}

/** 从内容块里挑出带标题的块，生成右侧目录 */
export function buildToc(blocks: ContentBlock[]): TocEntry[] {
  return blocks.flatMap((block, index) => {
    // hero 是页面主标题，信息框与配图不进入目录
    if (block.type === "hero" || block.type === "infobox" || block.type === "figure") {
      return [];
    }

    if (block.type === "cta" || block.type === "quote") {
      const label = block.type === "cta" ? "相关入口" : "引述";
      return [{ id: blockAnchor(block, index), label }];
    }

    if (!("title" in block) || !block.title) {
      return [];
    }

    return [{ id: blockAnchor(block, index), label: block.title }];
  });
}
