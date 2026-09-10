import { renderBlock } from "./renderBlock";
import type { ContentBlock } from "@/data/types";

/**
 * 内容块分发器：按数据里的 type 依次渲染。
 * 具体映射关系见 components/blocks/renderBlock.tsx。
 */
export function BlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return <>{blocks.map((block, index) => renderBlock(block, index))}</>;
}
