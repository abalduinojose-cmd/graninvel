import { getImageProps } from "next/image";

import alta from "@/assets/hero/hero-alta.jpg";
import larga from "@/assets/hero/hero-larga.jpg";
import { HERO, MENSAGENS } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

import { Button } from "../ui/Button";

/**
 * Hero da Cabana: foto real de tela inteira em alta (scripts/hero.mjs: a
 * cozinha com a ilha de granito preto, 6240px no original), em dois cortes
 * por <picture>: retrato no celular e paisagem do tablet em diante, para
 * nenhuma tela ampliar a foto. Véu escuro, zoom de entrada e deriva.
 * O título fica embaixo à esquerda com o trecho em itálico pintado de
 * vermelho e as duas pílulas. (Os selos saíram em 05/10: repetiam a faixa
 * de números logo abaixo.) No celular a foto é o corte com o tampo da ilha
 * no terço de cima, e o véu escurece só a metade de baixo, onde fica o texto.
 */
export function Hero() {
  const comum = { alt: "", sizes: "100vw", quality: 90 } as const;
  const { props: paisagem } = getImageProps({ ...comum, src: larga });
  const { props: retrato } = getImageProps({ ...comum, src: alta, priority: true });
  return (
    <section id="topo" aria-labelledby="hero-titulo" className="on-dark relative isolate flex min-h-svh flex-col overflow-hidden bg-noite text-branco">
      <div aria-hidden className="deriva-hero absolute inset-0 -z-10">
        <picture>
          <source media="(min-width: 768px)" srcSet={paisagem.srcSet ?? paisagem.src} sizes={paisagem.sizes} width={paisagem.width} height={paisagem.height} />
          {/* eslint-disable-next-line jsx-a11y/alt-text -- <img> do getImageProps (art direction); alt vazio vem no spread */}
          <img {...retrato} className="hero-zoom absolute inset-0 size-full object-cover object-[40%_0%] md:object-[70%_50%]" />
        </picture>
      </div>
      <div aria-hidden className="veu-hero absolute inset-0 -z-10" />
      <div aria-hidden className="hero-clarear absolute inset-0 -z-10 bg-noite" />

      <div className="hero-sai container-page flex flex-1 flex-col justify-end pb-12 pt-32 md:pb-20">
        {/* Etiqueta de chapa: como a plaqueta presa nas chapas do pátio. */}
        <p className="rise inline-flex max-w-full items-stretch self-start overflow-hidden rounded-lg border border-white/20 bg-noite/35 text-[0.64rem] font-semibold uppercase leading-none tracking-[0.12em] backdrop-blur-md sm:text-[0.72rem] sm:tracking-[0.16em]">
          <span aria-hidden className="grid w-9 place-items-center bg-[linear-gradient(135deg,var(--color-acao-quente),var(--color-acao-fundo))]">
            <span className="size-2 rotate-45 bg-branco" />
          </span>
          <span className="px-3 py-2.5 text-branco">{HERO.etiqueta.tipo}</span>
          <span className="border-l border-white/15 px-3 py-2.5 text-branco/80">{HERO.etiqueta.local}</span>
          <span className="hidden border-l border-white/15 px-3 py-2.5 tabular-nums tracking-[0.08em] text-branco/50 md:block">{HERO.etiqueta.coordenadas}</span>
        </p>
        {/* Três linhas fixas e corpo pela largura da tela (10,5vw): a linha
            mais longa ocupa ~92% da coluna em qualquer celular, então a troca
            da fonte reserva pela Cabinet nunca muda a quebra (era o CLS). */}
        <h1 id="hero-titulo" className="mt-6 text-[clamp(2rem,10.5vw,6.4rem)] leading-[0.98]">
          <span className="sr-only">{HERO.h1Prefixo}</span>
          <span className="block whitespace-nowrap">{HERO.titulo}</span>{" "}
          <span className="block">
            <span className="marca-texto">{HERO.destaque}</span>
          </span>{" "}
          <span className="block whitespace-nowrap">{HERO.final}</span>
        </h1>
        {/* Sem "rise": é o maior texto da dobra (LCP) e esperava a animação. */}
        <p className="mt-7 max-w-[34ch] text-[1.12rem] leading-snug md:text-[1.3rem]">
          <span className="font-medium text-branco">{HERO.lead}</span> <span className="text-branco/60">{HERO.apoio}</span>
        </p>
        {/* Régua do corte: a linha vermelha do divisor, de "chapa" a "instalação". */}
        <p className="rise mt-5 flex items-center gap-3 whitespace-nowrap text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-branco/75 [animation-delay:0.2s] sm:text-[0.7rem] sm:tracking-[0.18em]">
          {HERO.regua[0]}
          <span aria-hidden className="relative flex w-10 shrink-0 items-center sm:w-16 md:w-28">
            <span className="traco-desenha h-px w-full bg-vermelho-claro [animation-delay:0.5s]" />
            <span className="absolute -right-1 size-2 rotate-45 bg-vermelho" />
          </span>
          {HERO.regua[1]}
        </p>
        <div className="rise mt-9 flex flex-col gap-3 [animation-delay:0.24s] sm:flex-row">
          <Button href={waLink(MENSAGENS.hero)} tamanho="lg" variante="claro" seta>
            {HERO.ctaPrincipal}
          </Button>
          <Button href={waLink(MENSAGENS.contato)} tamanho="lg" variante="vidro" whatsapp>
            {HERO.ctaSecundario}
          </Button>
        </div>

      </div>
    </section>
  );
}
