import { Cta } from "./Cta";
import { Features } from "./Features";
import { Figure } from "./Figure";
import { Gallery } from "./Gallery";
import { Hero } from "./Hero";
import { Infobox } from "./Infobox";
import { Note } from "./Note";
import { Prose } from "./Prose";
import { Quote } from "./Quote";
import { SectionBlockView } from "./SectionBlockView";
import { Stats } from "./Stats";
import type { ContentBlock } from "@/data/types";

/**
 * 单个内容块的渲染分发表。
 *
 * BlockRenderer 与 SectionBlockView 都从这里取组件，
 * 避免两者互相 import 造成循环依赖。
 * 新增一种内容块时，只需要在 data/types.ts 补类型，然后在这里加一个分支。
 */
export function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "hero":
      return <Hero block={block} key={index} />;
    case "features":
      return <Features block={block} index={index} key={index} />;
    case "stats":
      return <Stats block={block} index={index} key={index} />;
    case "prose":
      return <Prose block={block} index={index} key={index} />;
    case "gallery":
      return <Gallery block={block} index={index} key={index} />;
    case "note":
      return <Note block={block} index={index} key={index} />;
    case "quote":
      return <Quote block={block} index={index} key={index} />;
    case "cta":
      return <Cta block={block} index={index} key={index} />;
    case "figure":
      return <Figure block={block} key={index} />;
    case "infobox":
      return <Infobox block={block} key={index} />;
    case "section":
      return <SectionBlockView block={block} index={index} key={index} />;
    default:
      return null;
  }
}
