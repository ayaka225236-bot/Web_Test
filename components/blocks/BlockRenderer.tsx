import { Cta } from "./Cta";
import { Features } from "./Features";
import { Gallery } from "./Gallery";
import { Hero } from "./Hero";
import { Note } from "./Note";
import { Prose } from "./Prose";
import { Quote } from "./Quote";
import { Stats } from "./Stats";
import type { ContentBlock } from "@/data/types";

/**
 * 内容块分发器：根据数据里的 type 选择对应组件。
 * 新增一种内容块时，在 data/types.ts 里补类型，然后在这里加一个分支即可。
 */
export function BlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "hero":
            return <Hero block={block} key={`hero-${index}`} />;
          case "features":
            return <Features block={block} key={`features-${index}`} />;
          case "stats":
            return <Stats block={block} key={`stats-${index}`} />;
          case "prose":
            return <Prose block={block} key={`prose-${index}`} />;
          case "gallery":
            return <Gallery block={block} key={`gallery-${index}`} />;
          case "note":
            return <Note block={block} key={`note-${index}`} />;
          case "quote":
            return <Quote block={block} key={`quote-${index}`} />;
          case "cta":
            return <Cta block={block} key={`cta-${index}`} />;
          default:
            return null;
        }
      })}
    </>
  );
}
