"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavLink.module.css";

interface NavLinkProps {
  href: string;
  label: string;
  /** 行首的小图标（emoji 或单字，可留空） */
  icon?: string;
  /** 该条目下的子条目 */
  children?: { href: string; label: string }[];
}

/**
 * 左侧导航的单个条目，会根据当前地址高亮。
 * 为了读取当前地址，这是全站唯一的客户端组件；它不渲染任何动态内容，
 * 因此仍然可以在构建期静态生成。
 */
export function NavLink({ href, label, icon, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li className={styles.item}>
      <Link
        className={isActive ? `${styles.link} ${styles.active}` : styles.link}
        href={href}
        aria-current={isActive ? "page" : undefined}
      >
        {icon ? (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <span className={styles.label}>{label}</span>
      </Link>

      {children && children.length > 0 && isActive ? (
        <ul className={styles.children}>
          {children.map((child) => (
            <li key={child.href}>
              <Link className={styles.childLink} href={child.href}>
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}
