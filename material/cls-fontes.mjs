/** Compara o hero com as fontes bloqueadas (só fallback) e carregadas: o que muda de tamanho/posição. */
import puppeteer from "puppeteer-core";
const URL = process.env.URL ?? "http://localhost:5251/";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const medir = async (bloquear) => {
  const p = await b.newPage();
  await p.setViewport({ width: 412, height: 823, deviceScaleFactor: 1, isMobile: true });
  await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await p.setRequestInterception(true);
  p.on("request", (r) => (bloquear && r.url().endsWith(".woff2") ? r.abort() : r.continue()));
  await p.goto(URL, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 800));
  const m = await p.evaluate(() =>
    ["#topo .rotulo-caps", "#topo h1", "#topo h1 + p", "#topo .rise.mt-9", "#topo ul"].map((s) => {
      const e = document.querySelector(s); const r = e.getBoundingClientRect();
      return `${s.padEnd(20)} top ${r.top.toFixed(1)} h ${r.height.toFixed(1)} w ${r.width.toFixed(1)} fonte ${getComputedStyle(e).fontFamily.slice(0, 30)}`;
    }),
  );
  const usadas = await p.evaluate(async () => [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family + " " + f.weight));
  await p.close();
  return { m, usadas };
};
const sem = await medir(true), com = await medir(false);
console.log("SÓ FALLBACK\n " + sem.m.join("\n ") + "\n  faces:", sem.usadas.join(", "));
console.log("COM FONTES\n " + com.m.join("\n ") + "\n  faces:", com.usadas.join(", "));
await b.close();
