import { CONTATO, MENSAGENS, site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

import { Button } from "../ui/Button";
import { FormOrcamento } from "./FormOrcamento";

/**
 * Orçamento (a "Disponibilidade" da Cabana): cartão dividido, o lado escuro
 * com os três passos e o WhatsApp, o lado claro com o formulário.
 */
export function Contato() {
  return (
    <section id="contato" aria-labelledby="contato-titulo" className="bg-branco pb-24 md:pb-32">
      <div className="container-page">
        <div className="revela grid overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-50px_rgb(14_14_15/0.7)] lg:grid-cols-[1fr_1.05fr]">
          <div className="on-dark relative isolate overflow-hidden bg-noite p-8 text-branco md:p-12">
            <span aria-hidden className="pointer-events-none absolute -right-20 -top-20 -z-10 size-44 rotate-45 rounded-[2rem] bg-[linear-gradient(135deg,var(--color-acao-quente),var(--color-acao-fundo))] opacity-80 md:-right-24 md:-top-24 md:size-72 md:rounded-[3rem]" />
            <p className="rotulo-caps flex items-center gap-3 text-vermelho-claro">
              <span aria-hidden className="h-px w-9 bg-current" />
              {CONTATO.eyebrow}
            </p>
            <h2 id="contato-titulo" className="mt-5 text-[clamp(2.4rem,1.6rem+2.8vw,3.8rem)]">
              {CONTATO.titulo}
            </h2>
            <p className="mt-5 max-w-[44ch] leading-relaxed text-branco/75">{CONTATO.texto}</p>
            <ol className="mt-10 space-y-6">
              {CONTATO.passos.map((p, i) => (
                <li key={p.titulo} className="flex gap-4">
                  <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full border border-white/20 font-display text-[0.95rem] font-extrabold">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-semibold">{p.titulo}</span>
                    <span className="mt-1 block text-[0.95rem] leading-relaxed text-branco/70">{p.texto}</span>
                  </span>
                </li>
              ))}
            </ol>
            <Button href={waLink(MENSAGENS.contato)} variante="claro" tamanho="lg" whatsapp className="mt-10 max-sm:w-full">
              {CONTATO.ctaWhatsapp}
            </Button>
            <p className="mt-3 text-[0.9rem] text-branco/60">{site.whatsappDisplay}</p>
          </div>

          <div className="bg-branco p-8 md:p-12">
            <p className="font-display text-[1.6rem] font-extrabold leading-tight tracking-[-0.02em] text-ink">{CONTATO.formTitulo}</p>
            <div className="mt-7">
              <FormOrcamento />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
