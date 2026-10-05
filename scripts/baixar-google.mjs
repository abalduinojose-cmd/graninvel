/**
 * Baixa as fotos do Perfil da Empresa no Google (ids em midia/google/ids.txt,
 * vindos do Apify crawler-google-places) em resolução original (=s0) e
 * monta uma folha de contato numerada em material/google.jpg.
 *
 *   node scripts/baixar-google.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const RAIZ = path.resolve(import.meta.dirname, "..");
const ids = (await readFile(path.join(RAIZ, "midia/google/ids.txt"), "utf8")).split(/\s+/).filter(Boolean);
const partes = [];
const info = [];
for (const [i, id] of ids.entries()) {
  const n = String(i + 1).padStart(2, "0");
  const arq = path.join(RAIZ, "midia/google", `g${n}.jpg`);
  try {
    const r = await fetch(`https://lh3.googleusercontent.com/gps-cs-s/${id}=s0`, { headers: { "User-Agent": "Mozilla/5.0" } });
    const buf = Buffer.from(await r.arrayBuffer());
    await writeFile(arq, buf);
    const m = await sharp(buf).metadata();
    info.push(`${n}:${m.width}x${m.height}`);
    const rotulo = Buffer.from(`<svg width="200" height="150"><rect width="34" height="20" fill="black"/><text x="5" y="15" font-size="14" fill="white">${n}</text></svg>`);
    partes.push({ input: await sharp(buf).resize(200, 150, { fit: "cover" }).composite([{ input: rotulo, left: 0, top: 0 }]).toBuffer(), left: (i % 10) * 204, top: Math.floor(i / 10) * 154 });
  } catch (e) {
    info.push(`${n}:ERRO ${e.message}`);
  }
}
await sharp({ create: { width: 2040, height: 154 * Math.ceil(ids.length / 10), channels: 3, background: "#888" } })
  .composite(partes)
  .jpeg({ quality: 80 })
  .toFile(path.join(RAIZ, "material/google.jpg"));
console.log(info.join(" "));
