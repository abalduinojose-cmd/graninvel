/**
 * Galeria de projetos: fotos do Perfil da Empresa no Google, curadas por
 * scripts/fotos.mjs (sem fotos com pessoas). O alt descreve o que se vê,
 * sem afirmar o tipo exato de pedra. `tamanho` define o desenho do mosaico.
 */
import type { StaticImageData } from "next/image";

import areaGourmet from "@/assets/fotos/area-gourmet-vidro.jpg";
import banheiroCubas from "@/assets/fotos/banheiro-duas-cubas.jpg";
import banheiroClaro from "@/assets/fotos/banheiro-bancada-clara.jpg";
import bar from "@/assets/fotos/bar-granito-preto.jpg";
import cozinhaBanquetas from "@/assets/fotos/cozinha-ilha-banquetas.jpg";
import cozinhaBranca from "@/assets/fotos/cozinha-branca-ilha.jpg";
import cozinhaSerra from "@/assets/fotos/cozinha-granito-preto-serra.jpg";
import cozinhaJantar from "@/assets/fotos/cozinha-jantar-integrados.jpg";
import escadaClara from "@/assets/fotos/escada-degraus-claros.jpg";
import escadaVidro from "@/assets/fotos/escada-vidro-degraus-escuros.jpg";
import piscina from "@/assets/fotos/piscina-borda-pedra.jpg";
import terraco from "@/assets/fotos/terraco-parede-pedra.jpg";
import varanda from "@/assets/fotos/varanda-gourmet-serra.jpg";

export const AMBIENTES = ["Todos", "Cozinhas", "Áreas gourmet", "Banheiros", "Escadas", "Áreas externas"] as const;
export type Ambiente = Exclude<(typeof AMBIENTES)[number], "Todos">;

export type FotoGaleria = { src: StaticImageData; alt: string; ambiente: Ambiente; tamanho: "grande" | "alta" | "larga" | "normal" };

export const galeria: FotoGaleria[] = [
  { src: cozinhaSerra, ambiente: "Cozinhas", tamanho: "grande", alt: "Cozinha com bancadas e ilha em pedra escura e janela de vidro com vista para a serra" },
  { src: cozinhaBranca, ambiente: "Cozinhas", tamanho: "normal", alt: "Cozinha branca com ilha de bancada clara, cooktop e banquetas" },
  { src: cozinhaJantar, ambiente: "Cozinhas", tamanho: "grande", alt: "Cozinha integrada à sala de jantar, com ilha de bancada escura, mesa de madeira e porta de vidro para o jardim" },
  { src: escadaVidro, ambiente: "Escadas", tamanho: "alta", alt: "Escada de degraus escuros flutuantes com guarda-corpo de vidro" },
  { src: areaGourmet, ambiente: "Áreas gourmet", tamanho: "larga", alt: "Área gourmet com bancada escura, banquetas, mesa de madeira e fechamento de vidro voltado para a mata" },
  { src: banheiroClaro, ambiente: "Banheiros", tamanho: "normal", alt: "Banheiro com bancada clara suspensa e cuba de apoio branca" },
  { src: bar, ambiente: "Cozinhas", tamanho: "normal", alt: "Bar com bancada escura, frente ripada em madeira e banquetas pretas" },
  { src: piscina, ambiente: "Áreas externas", tamanho: "alta", alt: "Piscina com borda e prainha em pedra clara" },
  { src: varanda, ambiente: "Áreas gourmet", tamanho: "larga", alt: "Varanda gourmet com bancada e churrasqueira de frente para a serra" },
  { src: cozinhaBanquetas, ambiente: "Cozinhas", tamanho: "normal", alt: "Cozinha com ilha de bancada branca, coifa e banquetas de madeira" },
  { src: escadaClara, ambiente: "Escadas", tamanho: "normal", alt: "Escada de degraus claros com corrimão de vidro, ao lado de uma banheira" },
  { src: terraco, ambiente: "Áreas externas", tamanho: "larga", alt: "Terraço com parede revestida em pedra clara, palmeira e sofá de vime" },
  { src: banheiroCubas, ambiente: "Banheiros", tamanho: "normal", alt: "Banheiro com bancada de duas cubas sobre gabinete de madeira" },
];

const DESCRICOES: Record<Ambiente, string> = {
  Cozinhas: "Bancadas, ilhas e frontões que aguentam o dia a dia e valorizam a cozinha.",
  "Áreas gourmet": "Bancadas para churrasqueira e varanda, feitas para receber.",
  Banheiros: "Bancadas, cubas e nichos com acabamento limpo e fácil de cuidar.",
  Escadas: "Degraus e espelhos cortados sob medida, com acabamento nas bordas.",
  "Áreas externas": "Bordas de piscina, prainhas e paredes revestidas em pedra.",
};

/** Ambientes para o trilho (layout da Cabana): capa, descrição e as fotos de cada um. */
export const ambientes = (AMBIENTES.filter((a) => a !== "Todos") as Ambiente[]).map((nome) => ({
  nome,
  descricao: DESCRICOES[nome],
  fotos: galeria.filter((f) => f.ambiente === nome),
}));
