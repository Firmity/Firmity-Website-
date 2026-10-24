const { chromium } = require("playwright-core"); const os = require("os"), path = require("path"), fs = require("fs");
const base = path.join(os.homedir(), "AppData/Local/ms-playwright"); const d = fs.readdirSync(base).filter(x => x.startsWith("chromium-")).sort().pop();
const tag = process.argv[2]; const OUT = process.env.TEMP + "/dark"; fs.mkdirSync(OUT, { recursive: true });
(async () => {
  // Same mechanism as Android "Dark mode for web pages": Chromium's automatic force-dark.
  const b = await chromium.launch({ executablePath: path.join(base, d, "chrome-win", "chrome.exe"), args: ["--enable-features=WebContentsForceDark"] });
  const ctx = await b.newContext({ viewport: { width: 369, height: 760 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, colorScheme: "dark" });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3000/diwali-reception", { waitUntil: "load" }); await p.waitForTimeout(1800);
  const info = await p.evaluate(() => { const c = document.querySelector("section"); const cs = getComputedStyle(c); return { cardBg: cs.backgroundColor, meta: document.querySelector('meta[name="color-scheme"]')?.content ?? null, notAttendingLines: Math.round(document.querySelector("label:has(input[value=not_attending])").getBoundingClientRect().height) }; });
  await p.screenshot({ path: `${OUT}/${tag}.png` });
  console.log(tag, JSON.stringify(info)); await b.close();
})();
