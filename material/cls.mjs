import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const p = await b.newPage();
await p.setViewport({ width: 412, height: 823, isMobile: true, hasTouch: true, deviceScaleFactor: 1.75 });
await p.evaluateOnNewDocument(() => {
  window.__cls = [];
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) window.__cls.push({ v: +e.value.toFixed(4), t: Math.round(e.startTime), src: e.sources.map((s) => ({ n: (s.node?.className || s.node?.nodeName || "").toString().slice(0, 60), de: [Math.round(s.previousRect.y), Math.round(s.previousRect.height)], para: [Math.round(s.currentRect.y), Math.round(s.currentRect.height)] })) });
  }).observe({ type: "layout-shift", buffered: true });
});
const cdp = await p.createCDPSession();
await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: 1.6e6 / 8, uploadThroughput: 750e3 / 8 });
await p.goto("http://localhost:5251/", { waitUntil: "networkidle0", timeout: 120000 });
await new Promise((r) => setTimeout(r, 2000));
console.log(JSON.stringify(await p.evaluate(() => window.__cls), null, 1));
await b.close();
