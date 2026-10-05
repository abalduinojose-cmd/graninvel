// Junta as capturas ef-<w>-N.jpg em um painel 2 colunas: node material/painel.mjs 1440 saida.jpg N
import sharp from "sharp";
const [w, saida, n] = [process.argv[2], process.argv[3], Number(process.argv[4])];
const lado = w === "375" ? 375 : 720;
const alto = w === "375" ? 812 : 450;
const cols = w === "375" ? n : 2;
const partes = [];
for (let i = 0; i < n; i++) partes.push({ input: await sharp(`material/ef-${w}-${i}.jpg`).resize({ width: lado }).toBuffer(), left: (i % cols) * (lado + 8), top: Math.floor(i / cols) * (alto + 8) });
await sharp({ create: { width: cols * (lado + 8), height: Math.ceil(n / cols) * (alto + 8), channels: 3, background: "#888" } }).composite(partes).jpeg({ quality: 78 }).toFile(saida);
