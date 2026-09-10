import Link from "next/link";
import styles from "./not-found.module.css";

/** 未登记的路径统一显示这个页面（纯静态，无需请求任何接口） */
export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>这个页面还没有内容</h1>
      <p className={styles.text}>
        当前路径没有在 data/pages.ts 中登记。新增页面只需要在数据文件里加一条记录。
      </p>
      <Link className={styles.link} href="/">
        返回首页
      </Link>
    </div>
  );
}
