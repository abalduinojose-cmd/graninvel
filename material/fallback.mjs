/** Mede a largura do General Sans contra o Arial no texto real do hero, para o size-adjust do "General Calibrada". */
import puppeteer from "puppeteer-core";
const URL = process.env.URL ?? "http://localhost:5250/";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const p = await b.newPage();
await p.goto(URL, { waitUntil: "networkidle0", timeout: 120000 });
await p.evaluate(() => document.fonts.ready);
const r = await p.evaluate(() => {
  const fam = getComputedStyle(document.body).fontFamily.split(",").map((s) => s.trim());
  const txt = [...document.querySelectorAll("#topo p, #topo a, #sobre p")].map((e) => e.textContent).join(" ");
  const c = document.createElement("canvas").getContext("2d");
  const mede = (peso, f) => { c.font = `${peso} 17px ${f}`; return c.measureText(txt).width; };
  return { fam, r400: mede(400, fam[0]) / mede(400, "Arial"), r600: mede(600, fam[0]) / mede(700, "Arial"), atual: mede(400, fam[0]) / mede(400, fam[1]) };
});
console.log(JSON.stringify(r, null, 1));
await b.close();
