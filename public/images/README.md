# 图片目录

把需要展示的图片放在这里，页面通过 `/images/文件名` 引用。

## 使用步骤

1. 把图片复制到本目录，例如 `hero-main.png`；
2. 打开 `data/images.ts`，在对应记录里把 `src` 改成 `/images/hero-main.png`；
3. 顺手补上 `alt`（无障碍替代文字）和 `caption`（图片下方说明）。

## 关于占位图

仓库里默认没有真实图片。当 `public/images/` 下不存在 `src` 指向的文件时，
`lib/images.ts` 里的 `placeholderImage()` 会动态生成一张灰蓝渐变占位图，
把版面撑起来，避免出现破图。

因此你**不需要**为了让页面好看而先准备图片，替换时也不会有「找不到文件」的报错。

> 注意：`.svg` 名称只是示例占位；放入 `.png` / `.jpg` / `.webp` 同样可用，
> 记得同步修改 `data/images.ts` 中的 `src` 后缀。
