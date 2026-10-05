import { Check } from "lucide-react";
import Image from "next/image";

import escada from "@/assets/fotos/escada-marmore.jpg";
import granito from "@/assets/fotos/granito-via-lactea-detalhe.jpg";
import { DESTAQUES, SOBRE } from "@/content/site";

import { SectionHeading } from "../ui/SectionHeading";

/**
 * Sobre + "Como trabalhamos" (a dupla Sobre/Destaques da Cabana): a escada
 * em pedra clara (no lugar da fachada da loja, a pedido) abre como cortina,
 * com o granito Via Láctea num recorte sobreposto;
 * embaixo, as três etapas numeradas com o quadrado vermelho.
 */
export function Sobre() {
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="veio bg-creme py-24 md:py-32">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div className="relative">
          <div className="cortina relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-nevoa">
            <Image src={escada} alt="Escada com degraus e rodapé recortado em pedra clara, junto de uma porta branca" fill quality={85} sizes="(min-width: 1024px) 40vw, 92vw" className="deriva-foto object-cover" />
          </div>
          <div className="revela absolute -bottom-8 right-4 w-[44%] overflow-hidden rounded-[1.25rem] border-[6px] border-creme shadow-[0_30px_50px_-30px_rgb(14_14_15/0.6)] md:-right-8" style={{ "--d": 2 } as React.CSSProperties}>
            <div className="relative aspect-square">
              <Image src={granito} alt="Detalhe do granito preto Via Láctea, de veios brancos" fill quality={85} sizes="(min-width: 1024px) 18vw, 40vw" className="object-cover object-[50%_100%]" />
            </div>
          </div>
        </div>

        <div>
          <SectionHeading id="sobre-titulo" eyebrow={SOBRE.eyebrow} titulo={SOBRE.titulo} />
          <p className="revela poetico mt-6 text-[clamp(1.35rem,1.1rem+0.8vw,1.75rem)] leading-snug text-ink">{SOBRE.poetico}</p>
          {SOBRE.paragrafos.map((p) => (
            <p key={p} className="revela mt-5 max-w-[58ch] leading-relaxed text-muted">
              {p}
            </p>
          ))}
          <ul className="revela mt-8 flex flex-wrap gap-2.5">
            {SOBRE.chips.map((c) => (
              <li key={c} className="inline-flex items-center gap-2 rounded-full border border-line bg-branco px-4 py-2 text-[0.88rem] font-medium text-ink">
                <Check aria-hidden className="size-3.5 text-acao" strokeWidth={2.5} />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page mt-28 md:mt-36">
        <p className="revela rotulo-caps flex items-center gap-3 text-acao">
          <span aria-hidden className="h-px w-9 bg-current" />
          {DESTAQUES.eyebrow}
        </p>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {DESTAQUES.itens.map((d, i) => (
            <li key={d.titulo} className="revela cartao cartao-vivo group relative overflow-hidden p-7 md:p-8" style={{ "--d": i } as React.CSSProperties}>
              <span aria-hidden className="pointer-events-none absolute -bottom-7 -right-2 font-display text-[7rem] font-extrabold leading-none tracking-[-0.06em] text-ink/[0.045] transition-colors duration-500 group-hover:text-acao/10">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span aria-hidden className="grid size-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,var(--color-acao-quente),var(--color-acao-fundo))] font-display text-[1.05rem] font-extrabold text-branco shadow-[0_12px_24px_-12px_rgb(163_8_12/0.7)]">
                {i + 1}
              </span>
              <h3 className="mt-6 text-[1.45rem]">{d.titulo}</h3>
              <p className="mt-2.5 leading-relaxed text-muted">{d.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
