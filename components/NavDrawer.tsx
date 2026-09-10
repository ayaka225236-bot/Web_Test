"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { defaultSiteId, sites } from "@/data/sites";
import styles from "./NavDrawer.module.css";

/**
 * 左上角导航抽屉：只做一件事 —— 罗列所有站点，点击即跳转。
 *
 * 交互：
 *   - 鼠标**移到图标上**就展开（不需要先点击）；
 *   - 展开后可以在面板里正常移动、点击站点链接；
 *   - 鼠标离开"图标 + 面板"整块区域后，**延迟一小会儿**才收起。
 *
 * 那个延迟是必须的：鼠标从图标移向面板时会短暂离开包裹层，
 * 如果立刻收起，指针还没到面板上面板就消失了（这正是之前的 bug）。
 */
export function NavDrawer() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 组件卸载时清掉待执行的关闭定时器
  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      closeTimer.current = null;
    }, 160);
  };

  return (
    <div
      className={styles.wrap}
      ref={wrapRef}
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onFocusCapture={() => {
        cancelClose();
        setOpen(true);
      }}
      onBlurCapture={(event) => {
        if (!wrapRef.current?.contains(event.relatedTarget as Node | null)) {
          scheduleClose();
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
        <p className={styles.panelTitle}>站点</p>

        <ul className={styles.siteList}>
          {sites.map((entry) => {
            const isCurrent = entry.id === defaultSiteId;

            return (
              <li key={entry.id}>
                <Link
                  className={
                    isCurrent
                      ? `${styles.siteLink} ${styles.siteLinkCurrent}`
                      : styles.siteLink
                  }
                  href={entry.href}
                  tabIndex={open ? 0 : -1}
                  aria-current={isCurrent ? "true" : undefined}
                >
                  <span className={styles.siteName}>{entry.name}</span>
                  {entry.description ? (
                    <span className={styles.siteDesc}>{entry.description}</span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
