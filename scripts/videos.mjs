/**
 * Reels do @graninvelmarmoraria: videos/ (originais, fora do repositório) ->
 * public/videos. Já vêm em H.264 720x1280 com bitrate de web, então saem
 * por CÓPIA do fluxo (sem reencodar, qualidade original), só com o
 * faststart para começar a tocar antes de baixar inteiro. A capa é um
 * quadro limpo escolhido na folha de contato, em 540px e ~30 KB, porque o
 * poster baixa sempre, mesmo fora da tela.
 *
 *   npm run videos
 */
import { spawnSync } from "node:child_process";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import ffmpeg from "ffmpeg-static";
import sharp from "sharp";

const RAIZ = path.resolve(import.meta.dirname, "..");
const SAIDA = path.join(RAIZ, "public", "videos");
const CAPAS = path.join(RAIZ, "src", "assets", "videos");
const V = (id) => `graninvelmarmoraria_${id}_7995920729.mp4`;

/** origem -> nome, segundo da capa */
const VIDEOS = [
  [V("1772117798_3841124649115961824"), "chapas-no-galpao", 5, true],
  [V("1748287955_3641225171261778583"), "granito-via-lactea", 1],
  [V("1655125184_2859719642317678593"), "ilha-branca", 2],
];

const roda = (args, captura = false) => {
  const r = spawnSync(ffmpeg, ["-v", "error", "-y", ...args], { stdio: ["ignore", captura ? "pipe" : "inherit", "inherit"], maxBuffer: 64 * 1024 * 1024 });
  if (r.status !== 0) throw new Error(`ffmpeg falhou: ${args.join(" ")}`);
  return r.stdout;
};

await mkdir(SAIDA, { recursive: true });
await mkdir(CAPAS, { recursive: true });
for (const [origem, nome, capa, reencodar] of VIDEOS) {
  const entrada = path.join(RAIZ, "videos", origem);
  const saida = path.join(SAIDA, `${nome}.mp4`);
  /* O do galpão vem a 3,5 Mbps (11 MB): esse é reencodado em CRF 27. */
  roda(reencodar ? ["-i", entrada, "-c:v", "libx264", "-preset", "slow", "-crf", "27", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", saida] : ["-i", entrada, "-c", "copy", "-movflags", "+faststart", saida]);
  const quadro = roda(["-ss", String(capa), "-i", entrada, "-frames:v", "1", "-f", "image2pipe", "-c:v", "png", "-"], true);
  await sharp(quadro).resize({ width: 540 }).jpeg({ quality: 70, mozjpeg: true }).toFile(path.join(CAPAS, `${nome}.jpg`));
  console.log(`${nome.padEnd(20)} ${((await stat(saida)).size / 1048576).toFixed(1)} MB`);
}

/* Quadro do close do granito preto Via Láctea (nome dito na legenda do
   próprio vídeo) para o card de granitos: recorte acima da legenda. */
const via = path.join(RAIZ, "videos", V("1748287955_3641225171261778583"));
const quadro = roda(["-ss", "16", "-i", via, "-frames:v", "1", "-f", "image2pipe", "-c:v", "png", "-"], true);
await sharp(quadro)
  .extract({ left: 0, top: 120, width: 720, height: 760 })
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(path.join(RAIZ, "src", "assets", "fotos", "granito-via-lactea-detalhe.jpg"));
console.log("quadro do granito ok");

/* Textura de granito para o fundo da seção escura: a chapa ocupa o quadro
   inteiro no fim do vídeo do galpão; recorte acima do adesivo do vídeo. */
const galpao = path.join(RAIZ, "videos", V("1772117798_3841124649115961824"));
const chapa = roda(["-ss", "24", "-i", galpao, "-frames:v", "1", "-f", "image2pipe", "-c:v", "png", "-"], true);
await sharp(chapa)
  .extract({ left: 0, top: 80, width: 720, height: 820 })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(RAIZ, "src", "assets", "fotos", "textura-granito-chapa.jpg"));
console.log("textura da chapa ok");
