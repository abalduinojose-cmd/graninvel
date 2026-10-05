/**
 * Catálogo do WhatsApp Business da Graninvel (conferido em 04/10/2026):
 * os 10 itens de pedras decorativas, com os nomes do catálogo. Sem preço no
 * catálogo, então "consultar tamanhos e valores". As amostras são recortes
 * da superfície de cada pedra nas fotos do próprio catálogo.
 */
import type { StaticImageData } from "next/image";

import granitoCinza from "@/assets/pedras/granito-cinza-irregular.jpg";
import lajinha from "@/assets/pedras/lajinha-amarela.jpg";
import lajota3060 from "@/assets/pedras/lajota-30x60.jpg";
import olhoDePombo from "@/assets/pedras/lajota-olho-de-pombo.jpg";
import madeira from "@/assets/pedras/pedra-madeira-amarela.jpg";
import moledo from "@/assets/pedras/pedra-moledo.jpg";
import saoTomeAmarelaIrr from "@/assets/pedras/sao-tome-amarela-irregular.jpg";
import saoTomeAmarela from "@/assets/pedras/sao-tome-amarela.jpg";
import saoTomeBrancaGrande from "@/assets/pedras/sao-tome-branca-grande.jpg";
import saoTomeBrancaIrr from "@/assets/pedras/sao-tome-branca-irregular.jpg";

export type Pedra = { nome: string; detalhe: string; src: StaticImageData };

export const pedras: Pedra[] = [
  { nome: "Pedra São Tomé branca", detalhe: "Irregular", src: saoTomeBrancaIrr },
  { nome: "Pedra São Tomé amarela", detalhe: "Irregular", src: saoTomeAmarelaIrr },
  { nome: "Pedra São Tomé amarela", detalhe: "Tamanhos diversos", src: saoTomeAmarela },
  { nome: "Pedra São Tomé branca", detalhe: "Irregular grande", src: saoTomeBrancaGrande },
  { nome: "Lajota 30×60", detalhe: "Peças retangulares", src: lajota3060 },
  { nome: "Lajota cinza olho de pombo", detalhe: "Tamanhos diversos", src: olhoDePombo },
  { nome: "Lajinha amarela", detalhe: "11,5×23", src: lajinha },
  { nome: "Pedra madeira amarela", detalhe: "Irregular", src: madeira },
  { nome: "Granito cinza", detalhe: "Irregular", src: granitoCinza },
  { nome: "Pedra moledo", detalhe: "Irregular", src: moledo },
];
