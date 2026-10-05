import { ArrowDownRight } from "lucide-react";
import Image from "next/image";

import gourmet from "@/assets/fotos/area-gourmet-serra-alta.jpg";
import { FRASE } from "@/content/site";

/**
 * Frase sobre foto (as "Nuvens" da Cabana), refeita em 05/10 porque "não
 * dava para ver nada": a área gourmet com a mata, em alta (2400px), num
 * quadro grande de cantos redondos. O véu escurece só a faixa de baixo,
 * onde fica o texto, e a foto aparece inteira em cima.
 */
export function Frase() {
  return (
    <section aria-label="A pedra que fica" className="bg-creme px-3 pb-3 md:px-6 md:pb-6">
      <div className="on-dark relative isolate flex min-h-[88svh] items-end overflow-hidden rounded-[1.75rem] bg-noite text-branco md:rounded-[2.5rem]">
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image src={gourmet} alt="" fill quality={85} sizes="100vw" className="deriva-foto object-cover object-[35%_50%]" />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(14_14_15/0.86)_0%,rgb(14_14_15/0.45)_32%,rgb(14_14_15/0)_58%)]" />

        <div className="container-page flex flex-col items-start justify-between gap-8 pb-10 pt-40 md:flex-row md:items-end md:pb-16">
          <p className="revela poetico max-w-[17ch] text-[clamp(2.3rem,1.3rem+3.8vw,5rem)] leading-[1.02]">
            {FRASE.poetico} <span className="font-extrabold tracking-[-0.035em]">{FRASE.destaque}</span>
          </p>
          <a href="#projetos" className="revela btn btn-vidro h-13 shrink-0 pl-6 pr-2 text-[0.92rem]">
            {FRASE.cta}
            <span aria-hidden className="btn-seta">
              <ArrowDownRight className="size-4" strokeWidth={2.2} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
