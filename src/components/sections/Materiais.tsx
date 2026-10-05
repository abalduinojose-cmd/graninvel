import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { MATERIAIS_TEXTO, MENSAGENS } from "@/content/site";
import { materiais } from "@/content/materiais";
import { waLink } from "@/lib/whatsapp";

import { SectionHeading } from "../ui/SectionHeading";

/**
 * Materiais no escuro (as "Comodidades" da Cabana): as quatro famílias do
 * catálogo em cartões altos de foto, número grande e o uso de cada pedra.
 * No desktop o primeiro e o último ocupam mais largura, num ritmo de chapa.
 */
export function Materiais() {
  return (
    <section id="materiais" aria-labelledby="materiais-titulo" className="on-dark bg-noite py-24 text-branco md:py-32">
      <div className="container-page">
        <SectionHeading id="materiais-titulo" eyebrow={MATERIAIS_TEXTO.eyebrow} titulo={MATERIAIS_TEXTO.titulo} texto={MATERIAIS_TEXTO.texto} escuro />
        <ul className="mt-14 grid gap-4 md:grid-cols-5">
          {materiais.map((m, i) => (
            <li key={m.nome} className={i === 0 || i === 3 ? "md:col-span-3" : "md:col-span-2"}>
              <a
                href={waLink(MENSAGENS.material(m.nome))}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${m.nome}: ${MATERIAIS_TEXTO.cta.toLowerCase()} no WhatsApp`}
                className="revela group relative isolate flex h-[21rem] flex-col justify-end overflow-hidden rounded-[1.5rem] border border-white/10 p-7 sm:h-[26rem] md:h-[30rem] md:p-8"
                style={{ "--d": i % 2 } as React.CSSProperties}
              >
                <Image src={m.foto.src} alt={m.foto.alt} fill quality={75} sizes="(min-width: 768px) 50vw, 92vw" style={{ objectPosition: m.foto.posicao }} className="-z-10 object-cover transition-transform duration-[1.2s] ease-[var(--ease-serra)] group-hover:scale-[1.05]" />
                <span aria-hidden className="veu-foto absolute inset-0 -z-10" />
                <span aria-hidden className="absolute left-7 top-6 font-display text-[0.95rem] font-extrabold tracking-[0.02em] text-branco/90 md:left-8">
                  {m.numero}
                  <span className="text-vermelho-claro"> /04</span>
                </span>
                <span aria-hidden className="absolute right-6 top-5 grid size-11 place-items-center rounded-full border border-white/25 bg-noite/30 backdrop-blur-md transition duration-500 group-hover:rotate-45 group-hover:border-acao group-hover:bg-acao">
                  <ArrowUpRight className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="text-[clamp(1.9rem,1.4rem+1.6vw,2.7rem)]">{m.nome}</h3>
                <p className="mt-3 max-w-[40ch] leading-relaxed text-branco/80">{m.uso}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
