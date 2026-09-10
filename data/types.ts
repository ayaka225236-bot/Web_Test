/**
 * 全站可复用的内容类型定义。
 *
 * 页面 = 一组「内容块(Block)」的有序数组，由 components/blocks/BlockRenderer.tsx 负责渲染。
 * 想调整文案或版式顺序，只需要改 data/ 目录下的数据，不必动组件代码。
 */

/** 页头小标签样式 */
export type Tone = "brand" | "neutral" | "warn";

/** 按钮 / 链接 */
export interface CtaLink {
  /** 链接文字 */
  label: string;
  /** 站内路径（/ 开头）或外部地址（http/https 开头） */
  href: string;
}

/** 单个数据单元格 */
export interface FeatureItem {
  /** 小图标，可用 emoji 或单个字符，也可以留空 */
  icon?: string;
  /** 标题 */
  title: string;
  /** 说明文字 */
  description: string;
  /** 可选的文字标签 */
  tags?: string[];
}

/** 顶部横幅 */
export interface HeroBlock {
  type: "hero";
  eyebrow?: string;
  title: string;
  /** 标题中需要高亮显示的部分（可选） */
  highlight?: string;
  description?: string;
  actions?: CtaLink[];
  /** 引用的图片 id，见 data/images.ts；留空则不显示图片 */
  imageId?: string;
}

/** 特色 / 服务 / 数据卡片区域 */
export interface FeaturesBlock {
  type: "features";
  title?: string;
  description?: string;
  /** "card" 为卡片网格，"plain" 为更朴素的列表样式 */
  variant?: "card" | "plain";
  columns?: 2 | 3 | 4;
  items: FeatureItem[];
}

/** 关键数字一行展示 */
export interface StatsBlock {
  type: "stats";
  title?: string;
  items: { value: string; label: string }[];
}

/** 段落文本，支持多段 */
export interface ProseBlock {
  type: "prose";
  title?: string;
  tone?: Tone;
  paragraphs: string[];
}

/** 图片画廊 */
export interface GalleryBlock {
  type: "gallery";
  title?: string;
  description?: string;
  /** 引用的图片 id 列表，见 data/images.ts */
  imageIds: string[];
}

/** 提示条 */
export interface NoteBlock {
  type: "note";
  title?: string;
  tone?: Tone;
  text: string;
}

/** 引用语 */
export interface QuoteBlock {
  type: "quote";
  text: string;
  attribution?: string;
}

/** 页面底部的行动号召 */
export interface CtaBlock {
  type: "cta";
  title: string;
  text?: string;
  actions?: CtaLink[];
}

/** 所有可选的内容块 */
export type ContentBlock =
  | HeroBlock
  | FeaturesBlock
  | StatsBlock
  | ProseBlock
  | GalleryBlock
  | NoteBlock
  | QuoteBlock
  | CtaBlock;

/** 一个页面 = 路径 + 头部导航信息 + 内容块 */
export interface PageContent {
  /** 站内路径，首页为 "/"，其余以 / 开头 */
  slug: string;
  /** 浏览器标题 */
  title: string;
  /** 导航栏文字 */
  navLabel: string;
  /** 页面简介，用于 SEO 与分享卡片 */
  description: string;
  /** 是否在顶部导航中显示 */
  showInNav?: boolean;
  /** 导航排序，数字小的排前面 */
  order?: number;
  /** 页面标题下方的引导语（可选） */
  intro?: string;
  blocks: ContentBlock[];
}

/** 图片登记信息：页面只引用 id，图片本体放在 public/images/ */
export interface ImageAsset {
  /** 唯一 id，供页面数据引用 */
  id: string;
  /** 图片地址，指向 public/images/ 下的文件 */
  src: string;
  /** 无障碍替代文字 */
  alt: string;
  /** 图片下方的说明文字，留空则不显示 */
  caption?: string;
  /** 占位图参数：仅当 src 指向的文件尚不存在时使用 */
  placeholder?: { label: string; from: string; to: string };
}

/** 站点级信息 */
export interface SiteConfig {
  /** 站点名称 */
  name: string;
  /** 一句话标语 */
  tagline: string;
  /** 站点简介 */
  description: string;
  /** 联系方式（页脚展示） */
  contact: {
    email: string;
    location: string;
  };
  /** 页脚版权行的起始年份 */
  since: number;
  /** 页脚右侧备注 */
  footerNote: string;
}
