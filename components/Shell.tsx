import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import styles from "./Shell.module.css";

/** 页面外壳：统一的页头 + 主内容区 + 页脚 */
export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
