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
  /** 覆盖图片说明文字（可选） */
  caption?: string;
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

/** 单独插入的一张图片（正文配图的主要方式） */
export interface FigureBlock {
  type: "figure";
  /** 引用的图片 id，见 data/images.ts */
  imageId: string;
  /** 覆盖图片登记表里的说明文字（可选） */
  caption?: string;
  /** 图片位置："center" 独立一行（默认），"left"/"right" 与文字并排 */
  align?: "center" | "left" | "right";
  /** 显示宽度：small≈320px、medium≈480px、full≈正文整宽 */
  size?: "small" | "medium" | "full";
}

/** 信息框的单个字段 */
export interface InfoboxField {
  label: string;
  /** 纯文本值 */
  value?: string;
  /** 需要跳转的值 */
  href?: string;
}

/**
 * 信息框：维基条目顶部右侧的资料卡。
 * 用于放主图与关键信息，是"留出图片位置"的主要容器。
 */
export interface InfoboxBlock {
  type: "infobox";
  /** 卡片标题，通常就是条目名 */
  title: string;
  /** 卡片标题下的一行说明 */
  subtitle?: string;
  /** 主图，引用 data/images.ts 中的 id */
  imageId?: string;
  /** 主图说明文字 */
  imageCaption?: string;
  /** 关键信息字段列表 */
  fields?: InfoboxField[];
  /** 卡片底部的补充说明 */
  footnote?: string;
}

/** 正文小节：带标题的一组段落，标题会自动进入右侧目录 */
export interface SectionBlock {
  type: "section";
  title: string;
  /** 段落列表 */
  paragraphs?: string[];
  /** 需要跳转的条目列表 */
  links?: CtaLink[];
  /** 子级内容块（会渲染在小节内部） */
  blocks?: ContentBlock[];
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
  | CtaBlock
  | FigureBlock
  | InfoboxBlock
  | SectionBlock;

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
  /** 左侧导航栏的分组名，见 data/nav.ts */
  group?: string;
  /** 条目头部的分类标签 */
  categories?: string[];
  /** 最后更新日期，显示在标题下方 */
  updatedAt?: string;
  /** 本页维护者，显示在标题下方 */
  maintainers?: string[];
  /** 页面标题下方的引导语（可选） */
  intro?: string;
  /** 条目顶部主图，引用 data/images.ts 中的 id（可选） */
  leadImageId?: string;
  /** 主图说明文字 */
  leadImageCaption?: string;
  /** "参见"小节：相关条目链接 */
  seeAlso?: CtaLink[];
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
  /** logo 文字方块里显示的短名（1–2 个字最合适） */
  wordmark: string;
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

/** 站点切换列表里的一个页面条目 */
export interface SiteNavItem {
  /** 站内路径 */
  href: string;
  /** 导航文字 */
  label: string;
  /** 分组名，决定在抽屉里归到哪一组 */
  group?: string;
  /** 组内排序 */
  order?: number;
}

/**
 * 一个可切换的站点。
 * 见 data/sites.ts —— 左上角导航的站点切换按这个结构生成。
 */
export interface SiteEntry {
  /** 唯一 id */
  id: string;
  /** 站点名称 */
  name: string;
  /** 一句话说明 */
  description?: string;
  /** 站点主页（切换时点击的目标） */
  href: string;
  /** 该站点自己的条目列表 */
  pages?: SiteNavItem[];
}
