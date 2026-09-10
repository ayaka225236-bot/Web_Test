import { Footer } from "./Footer";
import { Header } from "./Header";
import { NavDrawer } from "./NavDrawer";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Shell.module.css";

/**
 * 页面外壳：左上角滑出导航 + 右上角主题开关 + 极简顶栏 + 内容 + 页脚。
 * 原来的二级条（SubHeader）已移除，其信息并入正文页头。
 */
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className={styles.skipLink} href="#content">
        跳到正文
      </a>
      <NavDrawer />
      <ThemeToggle />
      <Header />
      {children}
      <Footer />
    </>
  );
}
