/**
 * Foto do hero em alta (pedido de 04/10/2026). A cozinha da serra (g01) só
 * existe com 1800px no Google e ficava mole em tela cheia; a g05 é a mesma
 * casa (bancada de granito preto, marcenaria ripada) com 6240px. Saem dois
 * cortes para nenhuma tela ampliar a foto:
 *  - hero-larga.jpg: 2880px (1440 @2x) para tablet e computador;
 *  - hero-alta.jpg: retrato 1290px (430 @3x) com a ilha de granito no
 *    centro, para o celular.
 *   npm run hero
 */
import path from "node:path";

import sharp from "sharp";

const RAIZ = path.resolve(import.meta.dirname, "..");
const ORIGEM = path.join(RAIZ, "midia", "google", "g05.jpg");
const DESTINO = path.join(RAIZ, "src", "assets", "hero");

const { mkdir } = await import("node:fs/promises");
await mkdir(DESTINO, { recursive: true });

const meta = await sharp(ORIGEM).metadata();
const saida = (img, nome) =>
  img
    .sharpen({ sigma: 0.5, m1: 0.4, m2: 0.6 })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(path.join(DESTINO, nome))
    .then((i) => console.log(`${nome.padEnd(16)} ${i.width}x${i.height} ${(i.size / 1024).toFixed(0)}KB`));

await saida(sharp(ORIGEM).rotate().resize({ width: 2880 }), "hero-larga.jpg");

/* Retrato 9:17 do celular (refeito em 05/10, pedido: "a bancada não
   aparece"): começa logo acima do tampo da ilha (≈ 40% da altura) e vai
   até o chão, então o tampo, a torneira, o ripado e a quina de granito
   ficam no terço de cima da tela, acima do título. */
const h = Math.round(meta.height * 0.6);
const top = meta.height - h;
const w = Math.round((h * 9) / 17);
const left = Math.min(meta.width - w, Math.round(meta.width * 0.645));
await saida(sharp(ORIGEM).rotate().extract({ left, top, width: w, height: h }).resize({ width: 1290 }), "hero-alta.jpg");

/* O cartão de compartilhamento (src/app/opengraph-image.jpg, 1200x630, 85KB)
   é estático: foi renderizado uma vez com esta foto, o título em Cabinet e o
   bloco vermelho, e salvo em JPEG porque o PNG de 875KB arriscava o WhatsApp
   não mostrar a miniatura. Para mudar, trocar a imagem. */
