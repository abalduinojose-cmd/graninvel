import Image from "next/image";

import varanda from "@/assets/fotos/varanda-gourmet-serra.jpg";
import { FRASE } from "@/content/site";

/**
 * Frase sobre foto inteira (as "Nuvens" da Cabana): a varanda gourmet de
 * frente para a serra, com pontes de cor nas bordas e as duas menções reais.
 */
export function Frase() {
  return (
    <section aria-label="A pedra que fica" className="on-dark relative isolate overflow-hidden bg-noite text-branco">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image src={varanda} alt="" fill quality={75} sizes="100vw" className="deriva-foto object-cover" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-noite/55" />
      <div aria-hidden className="ponte-topo-creme absolute inset-x-0 top-0 -z-10 h-28" />
      <div aria-hidden className="ponte-base-branco absolute inset-x-0 bottom-0 -z-10 h-28" />

      <div className="container-page flex min-h-[78svh] flex-col items-center justify-center py-36 text-center">
        <p className="revela poetico max-w-[22ch] text-[clamp(2.1rem,1.2rem+3.6vw,4.4rem)] leading-[1.04]">
          {FRASE.poetico} <span className="font-extrabold tracking-[-0.035em]">{FRASE.destaque}</span>
        </p>
        <dl className="revela mt-12 flex flex-wrap justify-center gap-3">
          {FRASE.mencoes.map((m) => (
            <div key={m.rotulo} className="flex items-center gap-3 rounded-full border border-white/20 bg-noite/35 py-2 pl-2 pr-5 backdrop-blur-md">
              <dt className="text-[0.9rem] font-medium">{m.rotulo}</dt>
              <dd className="order-first grid h-10 min-w-10 place-items-center rounded-full bg-branco px-2 font-display text-[1rem] font-extrabold text-ink">{m.valor}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
