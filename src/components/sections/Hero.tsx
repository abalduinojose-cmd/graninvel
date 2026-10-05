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
 * O título fica embaixo à esquerda com o trecho pintado de vermelho, as duas
 * pílulas e a faixa de selos em vidro.
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
          <img {...retrato} className="hero-zoom absolute inset-0 size-full object-cover object-[50%_45%] md:object-[70%_50%]" />
        </picture>
      </div>
      <div aria-hidden className="veu-hero absolute inset-0 -z-10" />
      <div aria-hidden className="hero-clarear absolute inset-0 -z-10 bg-noite" />

      <div className="container-page flex flex-1 flex-col justify-end pb-10 pt-32 md:pb-14">
        <p className="rise rotulo-caps flex items-center gap-3 text-branco/85 max-sm:text-[0.66rem] max-sm:tracking-[0.12em]">
          <span aria-hidden className="traco-desenha h-px w-9 bg-vermelho-claro" />
          {HERO.eyebrow}
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
        <p className="rise mt-7 max-w-[46ch] text-[1.08rem] leading-relaxed text-branco/85 [animation-delay:0.16s] md:text-[1.15rem]">{HERO.subtitulo}</p>
        <div className="rise mt-9 flex flex-col gap-3 [animation-delay:0.24s] sm:flex-row">
          <Button href={waLink(MENSAGENS.hero)} tamanho="lg" variante="claro" seta>
            {HERO.ctaPrincipal}
          </Button>
          <Button href={waLink(MENSAGENS.contato)} tamanho="lg" variante="vidro" whatsapp>
            {HERO.ctaSecundario}
          </Button>
        </div>

        <ul aria-label="Diferenciais" className="rise mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md [animation-delay:0.32s] md:grid-cols-4">
          {HERO.selos.map((s, i) => (
            <li key={s} className="flex items-center gap-3 bg-noite/30 px-4 py-4 text-[0.88rem] font-medium leading-snug md:px-5">
              <span aria-hidden className="font-display text-[0.78rem] font-extrabold text-vermelho-claro">{String(i + 1).padStart(2, "0")}</span>
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
