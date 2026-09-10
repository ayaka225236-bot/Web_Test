import Link from "next/link";
import { navGroups } from "@/data/nav";
import { pages } from "@/data/pages";
import { site } from "@/data/site";
import styles from "./NavDrawer.module.css";

/**
 * 左上角导航。
 *
 * 全部用 CSS 的 :hover 控制，没有任何客户端 JS：
 * 经典技巧是给抽屉一个从视口顶部到底部的透明停靠点（.dock），
 * 鼠标越往下，命中的 :hover 层级越深：
 *   - 悬停在顶部 150px 内 → 滑出完整侧边栏
 *   - 悬停到正文区域     → 收起为小模块（.mini）
 *
 * 局限：触摸屏没有 hover，因此窄屏下改成"点击展开"（:focus-within），
 *       键盘 Tab 到图标时也会展开。
 */
export function NavDrawer() {
  const groups = navGroups
    .map((group) => ({
      group,
      items: pages
        .filter((page) => page.group === group)
        .sort((a, b) => (a.order ?? 99) - (b.order ?? 99)),
    }))
    .filter((entry) => entry.items.length > 0);

  return (
    <div className={styles.dock}>
      {/* 深悬停追踪带：铺在图标下方的正文区域高度上。
          它排在图标之后，鼠标在这一带时会命中更深的 :hover，
          于是面板从"完整侧边栏"切成"小模块"。 */}
      <div className={styles.dockHoverDeep} aria-hidden="true" />

      <div className={styles.drawer}>
        <button
          className={styles.trigger}
          type="button"
          aria-label="打开导航"
        >
          <span className={styles.bars} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav className={styles.panel} aria-label="站点导航">
          <div className={styles.full}>
            <p className={styles.siteName}>{site.name}</p>

            {groups.map((entry) => (
              <div className={styles.group} key={entry.group}>
                <p className={styles.groupTitle}>{entry.group}</p>
                <ul className={styles.list}>
                  {entry.items.map((item) => (
                    <li key={item.slug}>
                      <Link className={styles.link} href={item.slug}>
                        {item.navLabel}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={styles.mini}>
            <ul className={styles.miniList}>
              {groups.flatMap((entry) =>
                entry.items.map((item) => (
                  <li key={item.slug}>
                    <Link className={styles.miniLink} href={item.slug} title={item.title}>
                      <span className={styles.miniDot} aria-hidden="true" />
                      <span className={styles.miniLabel}>{item.navLabel}</span>
                    </Link>
                  </li>
                )),
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
