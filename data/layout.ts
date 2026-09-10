/**
 * 版式参数：内容区宽度与正文排版。
 * 所有值都会注入成 CSS 变量（见 app/layout.ts），改这里不需要动组件。
 */
export interface LayoutConfig {
  /** 页头页脚等内容的最大宽度 */
  contentWidth: number;
  /** 正文最大行宽（控制一行多少字，影响阅读舒适度） */
  proseWidth: number;
  /** 正文段落的行高，中文建议 1.9 左右 */
  lineHeight: number;
}

export const layout: LayoutConfig = {
  contentWidth: 1480,
  proseWidth: 880,
  lineHeight: 1.9,
};
