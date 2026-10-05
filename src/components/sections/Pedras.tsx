import Image from "next/image";

import { MENSAGENS, PEDRAS_TEXTO } from "@/content/site";
import { pedras } from "@/content/pedras";
import { waLink } from "@/lib/whatsapp";

import { SectionHeading } from "../ui/SectionHeading";

/**
 * Pedras decorativas do catálogo do WhatsApp como amostras de mostruário:
 * a superfície da pedra num quadro redondo, nome e detalhe embaixo. Toque
 * leva ao WhatsApp com a pedra no texto.
 */
export function Pedras() {
  return (
    <section id="pedras" aria-labelledby="pedras-titulo" className="veio bg-creme py-24 md:py-32">
      <div className="container-page">
        <SectionHeading id="pedras-titulo" eyebrow={PEDRAS_TEXTO.eyebrow} titulo={PEDRAS_TEXTO.titulo} texto={PEDRAS_TEXTO.texto} />
        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {pedras.map((p, i) => (
            <li key={`${p.nome}-${p.detalhe}`} className="revela" style={{ "--d": i % 5 } as React.CSSProperties}>
              <a href={waLink(MENSAGENS.pedra(`${p.nome} (${p.detalhe.toLowerCase()})`))} target="_blank" rel="noopener noreferrer" className="group block">
                <span className="relative block aspect-square overflow-hidden rounded-[1.25rem] bg-nevoa shadow-[0_18px_36px_-26px_rgb(14_14_15/0.6)]">
                  <Image src={p.src} alt="" fill quality={75} sizes="(min-width: 1024px) 15vw, (min-width: 640px) 30vw, 45vw" className="object-cover transition-transform duration-700 ease-[var(--ease-serra)] group-hover:scale-110" />
                  <span aria-hidden className="absolute inset-x-3 bottom-3 translate-y-2 rounded-full bg-branco/95 py-2 text-center text-[0.8rem] font-semibold text-acao opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {PEDRAS_TEXTO.cta}
                  </span>
                </span>
                <span className="mt-3.5 block font-display text-[1.06rem] font-extrabold leading-tight tracking-[-0.015em] text-ink">{p.nome}</span>
                <span className="mt-1 block text-[0.88rem] text-muted">{p.detalhe}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
