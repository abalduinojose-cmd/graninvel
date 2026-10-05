/**
 * As quatro famílias de pedra do catálogo do WhatsApp ("Mármores, Granitos,
 * Superfícies Sintéticas e Pedras Decorativas"). Os textos falam de uso,
 * sem especificação técnica de fornecedor. O alt descreve só o que se vê:
 * a foto ilustra a família, não afirma o material exato da peça, exceto o
 * granito Via Láctea, nomeado na legenda do próprio vídeo do cliente.
 */
import type { StaticImageData } from "next/image";

import banheiro from "@/assets/fotos/banheiro-bancada-clara.jpg";
import cozinhaBranca from "@/assets/fotos/cozinha-branca-ilha.jpg";
import granito from "@/assets/fotos/granito-via-lactea-detalhe.jpg";
import pedras from "@/assets/fotos/pedras-decorativas-montes.jpg";

export type Material = { nome: string; numero: string; uso: string; foto: { src: StaticImageData; alt: string; posicao?: string } };

export const materiais: Material[] = [
  {
    nome: "Mármores",
    numero: "01",
    uso: "Elegância clássica para banheiros, lavabos, pisos e peças de destaque.",
    foto: { src: banheiro, alt: "Banheiro claro com bancada suspensa, cuba de apoio branca e box de vidro" },
  },
  {
    nome: "Granitos",
    numero: "02",
    uso: "Resistência para o dia a dia: bancadas de cozinha, áreas gourmet, escadas e soleiras.",
    foto: { src: granito, alt: "Bancada em granito preto Via Láctea, de veios brancos, junto ao cooktop", posicao: "50% 80%" },
  },
  {
    nome: "Superfícies sintéticas",
    numero: "03",
    uso: "Cor uniforme e acabamento contínuo para cozinhas e ilhas contemporâneas.",
    foto: { src: cozinhaBranca, alt: "Cozinha branca com ilha de bancada clara, cooktop e banquetas" },
  },
  {
    nome: "Pedras decorativas",
    numero: "04",
    uso: "São Tomé, moledo, lajotas e pedras irregulares para fachadas, muros e áreas externas.",
    foto: { src: pedras, alt: "Pedras decorativas irregulares em tons de dourado e cinza empilhadas" },
  },
];
