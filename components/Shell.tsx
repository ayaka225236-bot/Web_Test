import styles from "./Shell.module.css";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { SubHeader } from "./SubHeader";

/** 页面外壳：固定的全局导航 + 二级条 + 内容 + 页脚 */
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className={styles.skipLink} href="#content">
        跳到正文
      </a>
      <Header />
      <SubHeader />
      {children}
      <Footer />
    </>
  );
}
