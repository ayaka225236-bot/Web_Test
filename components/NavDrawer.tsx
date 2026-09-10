"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { currentSiteEntry, otherSites, sites } from "@/data/sites";
import styles from "./NavDrawer.module.css";

/**
 * 左上角导航抽屉。
 *
 * 交互：
 *   - 鼠标**悬停在图标上**即展开（不需要先点击）；
 *   - 鼠标在图标与面板之间移动时保持展开，可以点击里面的条目；
 *   - 鼠标离开"图标 + 面板"这整块区域才收起；
 *   - 键盘 Tab 聚焦、或点图标，也能展开（触摸屏没有 hover）。
 *
 * 内容分两层：
 *   - 顶部是**站点切换**：列出 data/sites.ts 里登记的其它站点；
 *   - 下面是**当前站点的条目**，按 group 分组。
 */
export function NavDrawer() {
  const [open, setOpen] = useState(false);
  const [sitesOpen, setSitesOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const navItems = currentSiteEntry.pages ?? [];

  // 收集当前站点里出现过的分组，保持登记顺序
  const groups = navItems.reduce<string[]>((acc, item) => {
    const group = item.group ?? "条目";
    if (!acc.includes(group)) {
      acc.push(group);
    }
    return acc;
  }, []);

  const itemsOf = (group: string) =>
    navItems
      .filter((item) => (item.group ?? "条目") === group)
      .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

  return (
    <div
      className={styles.wrap}
      ref={wrapRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false);
        setSitesOpen(false);
      }}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={(event) => {
        if (!wrapRef.current?.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
          setSitesOpen(false);
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
        <div className={styles.switcher}>
          <p className={styles.currentSite}>{currentSiteEntry.name}</p>

          <button
            className={styles.switchButton}
            type="button"
            aria-expanded={sitesOpen}
            onClick={() => setSitesOpen((value) => !value)}
            tabIndex={open ? 0 : -1}
          >
            <span>切换站点</span>
            <span className={styles.switchCount}>{sites.length}</span>
            <span
              className={
                sitesOpen ? `${styles.caret} ${styles.caretOpen}` : styles.caret
              }
              aria-hidden="true"
            >
              ▾
            </span>
          </button>

          {sitesOpen ? (
            <ul className={styles.siteList}>
              {otherSites.map((entry) => (
                <li key={entry.id}>
                  <Link
                    className={styles.siteLink}
                    href={entry.href}
                    tabIndex={open ? 0 : -1}
                  >
                    <span className={styles.siteName}>{entry.name}</span>
                    {entry.description ? (
                      <span className={styles.siteDesc}>{entry.description}</span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {groups.map((group) => (
          <div className={styles.group} key={group}>
            <p className={styles.groupTitle}>{group}</p>
            <ul className={styles.list}>
              {itemsOf(group).map((item) => (
                <li key={item.href}>
                  <Link
                    className={styles.link}
                    href={item.href}
                    tabIndex={open ? 0 : -1}
                  >
                    {item.label}
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
