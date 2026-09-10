/**
 * 版式参数：三栏布局的宽度与间距。
 * 所有值都会注入成 CSS 变量（见 app/wiki.css），改这里不需要动组件。
 */
export interface LayoutConfig {
  /** 内容区最大宽度 */
  contentWidth: number;
  /** 左侧导航栏宽度 */
  sidebarWidth: number;
  /** 右侧栏（目录 / 工具）宽度 */
  railWidth: number;
  /** 左右两栏与正文之间的间距 */
  columnGap: number;
  /** 正文最大行宽（控制一行多少字，影响阅读舒适度） */
  proseWidth: number;
  /** 正文段落的行高，中文建议 1.9 左右 */
  lineHeight: number;
}

export const layout: LayoutConfig = {
  contentWidth: 1480,
  sidebarWidth: 236,
  railWidth: 264,
  columnGap: 36,
  proseWidth: 860,
  lineHeight: 1.9,
};
