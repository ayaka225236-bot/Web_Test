import type { NextConfig } from "next";

/**
 * 本地浏览用配置。
 * 站点为纯静态内容，没有后端接口，所有页面在构建期生成。
 *
 * 如果以后想把构建产物直接丢到任意静态目录（file:// 或 Nginx）浏览，
 * 把下面的 output 打开即可：`output: "export"`，
 * 产物会出现在 out/ 目录中（届时 `npm run start` 不再适用）。
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  // output: "export",
  images: {
    // 未使用 next/image 的远程抓取能力，保持默认即可
    unoptimized: true,
  },
};

export default nextConfig;
