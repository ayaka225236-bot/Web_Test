/**
 * 版式与主题参数。
 * 所有值都会注入成 CSS 变量（见 app/layout.ts），改这里不需要动组件。
 */
export interface LayoutConfig {
  /** 内容卡片（"中间长条"）的最大宽度 */
  cardWidth: number;
  /** 卡片内部右侧导航栏的宽度 */
  railWidth: number;
  /** 卡片内正文与右栏之间的间距 */
  innerGap: number;
  /** 页头页脚等内容的最大宽度 */
  contentWidth: number;
  /** 正文段落的行高，中文建议 1.9 左右 */
  lineHeight: number;
}

//卡片高度由data/pages.ts 的 blocks决定
export const layout: LayoutConfig = {
  // 通栏卡片按需求缩小约 20%（原先 1440px），正文宽度自动适配卡片内剩余空间
  cardWidth: 1248,
  railWidth: 224,
  innerGap: 32,
  contentWidth: 1480,
  lineHeight: 1.9,
};
