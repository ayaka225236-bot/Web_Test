import Link from "next/link";
import type { CtaLink } from "@/data/types";
import styles from "./shared.module.css";

/** 把 data 里的链接渲染成按钮；站内链接用 next/link，外链用 <a> */
export function ActionLinks({ actions }: { actions?: CtaLink[] }) {
  if (!actions || actions.length === 0) {
    return null;
  }

  return (
    <div className={styles.actions}>
      {actions.map((action, index) => {
        const className = index === 0 ? styles.primary : styles.secondary;

        return action.href.startsWith("http") ? (
          <a
            key={action.href}
            className={className}
            href={action.href}
            target="_blank"
            rel="noreferrer"
          >
            {action.label}
          </a>
        ) : (
          <Link key={action.href} className={className} href={action.href}>
            {action.label}
          </Link>
        );
      })}
    </div>
  );
}
