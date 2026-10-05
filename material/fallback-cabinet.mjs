/** Mede Cabinet Grotesk 800 contra Arial Bold no título do hero, para o "Cabinet Calibrada". */
import puppeteer from "puppeteer-core";
const URL = process.env.URL ?? "http://localhost:5251/";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const p = await b.newPage();
await p.goto(URL, { waitUntil: "networkidle0", timeout: 120000 });
await p.evaluate(() => document.fonts.ready);
const r = await p.evaluate(() => {
  const fam = getComputedStyle(document.querySelector("h1")).fontFamily.split(",").map((s) => s.trim());
  const txt = [...document.querySelectorAll("h1, h2, h3")].map((e) => e.textContent).join(" ");
  const c = document.createElement("canvas").getContext("2d");
  const mede = (peso, f) => { c.font = `${peso} 40px ${f}`; return c.measureText(txt).width; };
  return { fam, r800: mede(800, fam[0]) / mede(700, "Arial"), r300: mede(300, fam[0]) / mede(400, "Arial") };
});
console.log(JSON.stringify(r, null, 1));
await b.close();
