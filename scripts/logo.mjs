/**
 * Logo da Graninvel: losango vermelho (#FD0002) com borda branca e os dois
 * "G" espelhados. O arquivo do cliente (foto de perfil do WhatsApp, 640px,
 * midia/logo-perfil.jpg) tem fundo preto e a ponta de baixo do losango
 * cortada, então o losango é redesenhado em SVG e só as letras saem da
 * imagem (máscara pela brancura dos pixels dentro do vermelho).
 *
 *   npm run logo
 */
import path from "node:path";
import sharp from "sharp";

const RAIZ = path.resolve(import.meta.dirname, "..");
const ORIGEM = path.join(RAIZ, "midia", "logo-perfil.jpg");
const MARCA = path.join(RAIZ, "public", "marca");

/* No original o losango tem centro em (320, 353) e meia-diagonal de 319px
   (medido pelas bordas). No desenho novo o centro vai para (350, 350). */
const L = 700;
const C = 350;
const R_FORA = 330;
const R_BORDA = 14;

/* Letras: recorte do miolo, alfa = quanto o pixel é branco (o vermelho tem
   G e B quase zero, o branco tem os três altos). */
const REC = { left: 140, top: 200, width: 360, height: 245 };
const { data, info } = await sharp(ORIGEM).extract(REC).raw().toBuffer({ resolveWithObject: true });
const alfa = Buffer.alloc(info.width * info.height);
for (let i = 0; i < info.width * info.height; i++) {
  const x = REC.left + (i % info.width);
  const y = REC.top + Math.floor(i / info.width);
  /* Só o miolo vermelho do original: a borda branca dele fica de fora. */
  if (Math.abs(x - 320) + Math.abs(y - 353) > 250) continue;
  const g = data[i * info.channels + 1];
  const b = data[i * info.channels + 2];
  alfa[i] = Math.max(0, Math.min(255, Math.round(((Math.min(g, b) - 40) / 170) * 255)));
}
const letras = await sharp({ create: { width: info.width, height: info.height, channels: 3, background: "#ffffff" } })
  .joinChannel(alfa, { raw: { width: info.width, height: info.height, channels: 1 } })
  .png()
  .toBuffer();
const dx = C - 320;
const dy = C - 353;

const losango = (corBorda, corMiolo) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${L}" height="${L}">
    <path d="M${C} ${C - R_FORA}L${C + R_FORA} ${C}L${C} ${C + R_FORA}L${C - R_FORA} ${C}Z" fill="${corBorda}"/>
    <path d="M${C} ${C - R_FORA + R_BORDA * 1.42}L${C + R_FORA - R_BORDA * 1.42} ${C}L${C} ${C + R_FORA - R_BORDA * 1.42}L${C - R_FORA + R_BORDA * 1.42} ${C}Z" fill="${corMiolo}"/>
  </svg>`);

const monta = async (borda, miolo) =>
  sharp(losango(borda, miolo))
    .composite([{ input: letras, left: REC.left + dx, top: REC.top + dy }])
    .png()
    .toBuffer();

const salva = (buf, nome, largura) => sharp(buf).resize({ width: largura }).png({ compressionLevel: 9 }).toFile(path.join(MARCA, nome));

const cor = await monta("#ffffff", "#FD0002");
await salva(cor, "losango.png", 240);
await salva(cor, "losango-og.png", 480);

/* Ícones: o losango sobre fundo branco. */
for (const [lado, nome] of [
  [96, "icon.png"],
  [180, "apple-icon.png"],
]) {
  const l = await sharp(cor).resize({ width: Math.round(lado * 0.86) }).toBuffer();
  await sharp({ create: { width: lado, height: lado, channels: 4, background: "#ffffff" } })
    .composite([{ input: l, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(RAIZ, "src", "app", nome));
}
console.log("losango e ícones gerados");
