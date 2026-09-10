"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { navGroups } from "@/data/nav";
import { pages } from "@/data/pages";
import { site } from "@/data/site";
import styles from "./NavDrawer.module.css";

/**
 * 左上角导航抽屉。
 *
 * 交互（按要求）：
 *   - 鼠标**悬停在图标上**即展开侧边栏（不需要先点击）；
 *   - 鼠标从图标移到侧边栏上仍然保持展开，可以点击里面的条目；
 *   - 鼠标离开"图标 + 面板"这整块区域才收起；
 *   - 展开时面板覆盖在正文左侧，**不遮挡也不拦截正文的点击**；
 *   - 键盘 Tab 聚焦、或点图标，也能展开（触摸屏没有 hover）。
 *
 * 这是全站唯一的客户端组件，只负责这一个开关状态。
 */
export function NavDrawer() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const groups = navGroups
    .map((group) => ({
      group,
      items: pages
        .filter((page) => page.group === group)
        .sort((a, b) => (a.order ?? 99) - (b.order ?? 99)),
    }))
    .filter((entry) => entry.items.length > 0);

  return (
    <div
      className={styles.wrap}
      ref={wrapRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={(event) => {
        if (!wrapRef.current?.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <button
        className={styles.trigger}
        type="button"
        aria-label="打开导航"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={styles.bars} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <nav
        className={open ? `${styles.panel} ${styles.panelOpen}` : styles.panel}
        aria-label="站点导航"
        aria-hidden={!open}
      >
        <p className={styles.siteName}>{site.name}</p>

        {groups.map((entry) => (
          <div className={styles.group} key={entry.group}>
            <p className={styles.groupTitle}>{entry.group}</p>
            <ul className={styles.list}>
              {entry.items.map((item) => (
                <li key={item.slug}>
                  <Link
                    className={styles.link}
                    href={item.slug}
                    tabIndex={open ? 0 : -1}
                  >
                    {item.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}
