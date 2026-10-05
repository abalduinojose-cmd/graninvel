/**
 * Fotos da Graninvel:
 *  - Perfil da Empresa no Google (midia/google/gNN.jpg, baixadas em
 *    resolução original por scripts/baixar-google.mjs): curadoria das
 *    melhores, sem fotos com pessoas.
 *  - Catálogo do WhatsApp Business (midia/catalogo): cada pedra decorativa
 *    vira uma amostra de textura, recortada só na superfície da pedra (sem a
 *    mão, a placa ou a legenda escrita na foto).
 *  - Avatares das avaliações do Google (midia/avatares).
 *
 *   npm run fotos
 */
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const RAIZ = path.resolve(import.meta.dirname, "..");
const FOTOS = path.join(RAIZ, "src", "assets", "fotos");
const PEDRAS = path.join(RAIZ, "src", "assets", "pedras");
const G = (n) => path.join(RAIZ, "midia", "google", `g${n}.jpg`);

/** origem -> [destino, largura máxima, recorte em fração {x, y, w, h}] */
const CURADORIA = [
  [G("01"), "cozinha-granito-preto-serra", 2000],
  [G("05"), "cozinha-jantar-integrados", 2000],
  [G("12"), "area-gourmet-vidro", 2000],
  [G("17"), "cozinha-branca-ilha", 2000],
  [G("07"), "cozinha-ilha-banquetas", 1800],
  [G("11"), "bar-granito-preto", 1800],
  [G("14"), "varanda-gourmet-serra", 1800],
  [G("43"), "banheiro-bancada-clara", 2000],
  [G("04"), "banheiro-duas-cubas", 1280],
  [G("03"), "escada-vidro-degraus-escuros", 1200],
  [G("42"), "escada-degraus-claros", 1400],
  [G("16"), "piscina-borda-pedra", 1280],
  [G("33"), "terraco-parede-pedra", 2000],
  [G("26"), "pedras-decorativas-montes", 1600, { x: 0, y: 0.1, w: 1, h: 0.7 }],
  [G("35"), "fachada-loja-itaipava", 2000],
  [G("09"), "patio-pedras-loja", 1600, { x: 0, y: 0.15, w: 1, h: 0.65 }],
  [G("37"), "showroom-cubas", 1080],
];

/* Catálogo: arquivo 720x1280 (o 03 é 899x1599); recorte em px no original. */
const C = (n) => path.join(RAIZ, "midia", "catalogo", `graninvel-catalogo-${n}-.jpg`);
const AMOSTRAS = [
  [C("01"), "lajinha-amarela", { left: 200, top: 690, width: 300, height: 190 }],
  [C("02"), "lajota-olho-de-pombo", { left: 180, top: 520, width: 500, height: 500 }],
  [C("03"), "lajota-30x60", { left: 100, top: 560, width: 600, height: 600 }],
  [C("04"), "sao-tome-branca-irregular", { left: 140, top: 610, width: 380, height: 195 }],
  [C("05"), "sao-tome-amarela-irregular", { left: 100, top: 540, width: 440, height: 300 }],
  [C("06"), "granito-cinza-irregular", { left: 230, top: 640, width: 400, height: 260 }],
  [C("07"), "pedra-madeira-amarela", { left: 190, top: 650, width: 320, height: 290 }],
  [C("08"), "sao-tome-amarela", { left: 160, top: 680, width: 420, height: 390 }],
  [C("09"), "sao-tome-branca-grande", { left: 130, top: 690, width: 230, height: 185 }],
  [C("10"), "pedra-moledo", { left: 160, top: 650, width: 260, height: 290 }],
];

await mkdir(FOTOS, { recursive: true });
await mkdir(PEDRAS, { recursive: true });

for (const [origem, nome, largura, rec] of CURADORIA) {
  let img = sharp(origem).rotate();
  if (rec) {
    const buf = await img.toBuffer();
    const { width, height } = await sharp(buf).metadata();
    img = sharp(buf).extract({ left: Math.round(width * rec.x), top: Math.round(height * rec.y), width: Math.round(width * rec.w), height: Math.round(height * rec.h) });
  }
  const { size, width, height } = await img
    .resize({ width: largura, height: largura, fit: "inside", withoutEnlargement: true })
    .sharpen({ sigma: 0.6, m1: 0.3, m2: 0.8 })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(FOTOS, `${nome}.jpg`));
  console.log(`${nome.padEnd(32)} ${width}x${height} ${(size / 1024).toFixed(0)}KB`);
}

for (const [origem, nome, rec] of AMOSTRAS) {
  const { size } = await sharp(origem)
    .extract(rec)
    .resize(560, 560, { fit: "cover" })
    .modulate({ saturation: 1.04 })
    .sharpen({ sigma: 0.7 })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(PEDRAS, `${nome}.jpg`));
  console.log(`amostra ${nome.padEnd(28)} ${(size / 1024).toFixed(0)}KB`);
}

/* Avatares das avaliações escolhidas (Apify, personalData). */
const AV = path.join(RAIZ, "midia", "avatares");
await mkdir(path.join(RAIZ, "public", "avaliacoes"), { recursive: true });
for (const f of (await readdir(AV).catch(() => [])).filter((f) => f.endsWith(".jpg"))) {
  await sharp(path.join(AV, f)).resize(96, 96).webp({ quality: 82 }).toFile(path.join(RAIZ, "public", "avaliacoes", f.replace(".jpg", ".webp")));
}
console.log("avatares ok");
