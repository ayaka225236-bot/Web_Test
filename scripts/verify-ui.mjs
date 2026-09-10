/**
 * 用无头 Edge + Chrome DevTools Protocol 验证前端效果。
 * 只用于本地开发自检，不参与站点构建。
 *
 * 用法：
 *   1. 先启动 Edge：
 *      & "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" `
 *        --headless=new --remote-debugging-port=9222 --window-size=1280,1000 `
 *        --no-first-run --user-data-dir=<临时目录> about:blank
 *   2. node scripts/verify-ui.mjs
 *   3. 关闭 Edge（Stop-Process -Name msedge）
 */
import { writeFile, mkdir } from "node:fs/promises";

const PORT = 9222;
const TARGET = "http://127.0.0.1:3000/services";
const OUT = "tmp-verify";

/** 读取调试端点的目标列表 */
async function fetchTargets() {
  const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
  return res.json();
}

/** 极简 CDP 客户端：一条连接，按 id 配对请求与响应 */
class Cdp {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    ws.addEventListener("message", (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
      }
    });
  }

  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
      setTimeout(() => {
        if (this.pending.delete(id)) reject(new Error(`timeout: ${method}`));
      }, 15000);
    });
  }

  static async connect(wsUrl) {
    const ws = new WebSocket(wsUrl);
    await new Promise((resolve, reject) => {
      ws.addEventListener("open", resolve, { once: true });
      ws.addEventListener("error", reject, { once: true });
    });
    return new Cdp(ws);
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function shoot(cdp, name) {
  const { data } = await cdp.send("Page.captureScreenshot", { format: "png" });
  await writeFile(`${OUT}/${name}.png`, Buffer.from(data, "base64"));
  return `${name}.png`;
}

/** 取某个选择器命中元素的位置与尺寸 */
async function boxOf(cdp, selector) {
  const { result } = await cdp.send("Runtime.evaluate", {
    expression: `(() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return JSON.stringify({ x: r.x, y: r.y, w: r.width, h: r.height, cls: el.className });
    })()`,
    returnByValue: true,
  });
  return result.value ? JSON.parse(result.value) : null;
}

/** 取面板当前的宽度与显示的是完整侧栏还是小模块 */
async function panelState(cdp) {
  const { result } = await cdp.send("Runtime.evaluate", {
    expression: `(() => {
      const panel = document.querySelector('[class*="panel"]');
      if (!panel) return "no-panel";
      const full = panel.querySelector('[class*="full"]');
      const mini = panel.querySelector('[class*="mini"]');
      const cs = getComputedStyle(panel);
      return JSON.stringify({
        width: Math.round(panel.getBoundingClientRect().width),
        opacity: cs.opacity,
        visibility: cs.visibility,
        fullVisible: full ? getComputedStyle(full).display !== "none" : null,
        miniVisible: mini ? getComputedStyle(mini).display !== "none" : null,
      });
    })()`,
    returnByValue: true,
  });
  return JSON.parse(result.value);
}

async function main() {
  await mkdir(OUT, { recursive: true });

  const targets = await fetchTargets();
  const page = targets.find((t) => t.type === "page");
  if (!page) throw new Error("找不到可用的页面目标");

  const cdp = await Cdp.connect(page.webSocketDebuggerUrl);
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");

  await cdp.send("Page.navigate", { url: TARGET });
  await sleep(2500);

  const report = {};

  // ---------- 1. 默认（浅色、未悬停） ----------
  report.bodyBg = (
    await cdp.send("Runtime.evaluate", {
      expression: `getComputedStyle(document.body).backgroundColor`,
      returnByValue: true,
    })
  ).result.value;
  report.defaultScreenshot = await shoot(cdp, "1-default");
  report.sidebarExists = !!(await boxOf(cdp, '[aria-label="条目导航"]'));
  report.searchBox = await boxOf(cdp, 'input[type="search"]');
  report.navTrigger = await boxOf(cdp, 'button[aria-label="打开导航"]');
  report.themeToggle = await boxOf(cdp, '[class*="themeToggle"]');
  report.article = await boxOf(cdp, "article");

  // ---------- 2. 悬停左上角图标（顶部区域）→ 应展开完整侧栏 ----------
  await cdp.send("Input.dispatchMouseEvent", {
    type: "mouseMoved",
    x: 34,
    y: 34,
    buttons: 0,
  });
  await sleep(600);
  report.hoverTop = await panelState(cdp);
  report.hoverTopScreenshot = await shoot(cdp, "2-hover-top-full-sidebar");

  // ---------- 3. 悬停到正文区域（y = 400）→ 应缩成小模块 ----------
  await cdp.send("Input.dispatchMouseEvent", {
    type: "mouseMoved",
    x: 12,
    y: 400,
    buttons: 0,
  });
  await sleep(600);
  report.hoverDeep = await panelState(cdp);
  report.hoverDeepScreenshot = await shoot(cdp, "3-hover-deep-mini");

  // ---------- 4. 暗色主题 ----------
  await cdp.send("Runtime.evaluate", {
    expression: `document.querySelector('[class*="themeToggle"] input').click()`,
    returnByValue: true,
  });
  await sleep(500);
  report.darkBodyBg = (
    await cdp.send("Runtime.evaluate", {
      expression: `getComputedStyle(document.body).backgroundColor`,
      returnByValue: true,
    })
  ).result.value;
  report.darkTextColor = (
    await cdp.send("Runtime.evaluate", {
      expression: `getComputedStyle(document.body).color`,
      returnByValue: true,
    })
  ).result.value;
  report.darkScreenshot = await shoot(cdp, "4-dark");

  // 滚到正文段落，确认暗色下正文仍可读
  await cdp.send("Runtime.evaluate", {
    expression: `window.scrollTo(0, 900)`,
    returnByValue: true,
  });
  await sleep(500);
  report.darkScrolledScreenshot = await shoot(cdp, "5-dark-scrolled");

  console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => {
  console.error("验证失败:", error.message);
  process.exitCode = 1;
});
