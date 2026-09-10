import Link from "next/link";
import type { CtaBlock } from "@/data/types";
import styles from "./Cta.module.css";
import shared from "./shared.module.css";

/** 页面底部的行动号召区块 */
export function Cta({ block }: { block: CtaBlock }) {
  return (
    <section className={styles.cta}>
      <h2 className={styles.title}>{block.title}</h2>
      {block.text ? <p className={styles.text}>{block.text}</p> : null}

      {block.actions && block.actions.length > 0 ? (
        <div className={shared.actions}>
          {block.actions.map((action, index) => {
            const className = index === 0 ? shared.inverted : shared.invertedGhost;

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
      ) : null}
    </section>
  );
}
