import styles from "./ThemeToggle.module.css";

/**
 * 深色 / 浅色主题切换按钮。
 *
 * 纯 CSS 实现：隐藏的 checkbox 通过 :has(#theme-toggle:checked) 控制
 * <body> 上的变量覆盖（见 app/theme-dark.css），不需要客户端 JS。
 *
 * 这里刻意用 id 而不是类名选择器：:has() 内部如果写 CSS Modules 的局部类名，
 * 编译后不会被改写，选择器就匹配不上了（这是实测踩到的坑）。
 */
export function ThemeToggle() {
  return (
    <label className={styles.themeToggle} title="切换深色 / 浅色主题">
      <input
        id="theme-toggle"
        type="checkbox"
        className={styles.input}
        aria-label="切换深色主题"
      />
      <span className={styles.track} aria-hidden="true">
        <span className={styles.iconLight}>☀</span>
        <span className={styles.iconDark}>☾</span>
        <span className={styles.knob} />
      </span>
    </label>
  );
}
