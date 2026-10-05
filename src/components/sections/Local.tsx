import { Clock, MapPin } from "lucide-react";
import Image from "next/image";

import mapa from "@/assets/mapa/itaipava.jpg";
import { LOCAL, MENSAGENS, PERFIL_GOOGLE, ROTA, site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";

/**
 * Localização (padrão Cabana): mapa do OpenStreetMap recolorido na paleta
 * (scripts/mapa.py) com o losango no ponto da loja, e o cartão com
 * endereço, referência e horário.
 */
export function Local() {
  const e = site.endereco;
  return (
    <section id="local" aria-labelledby="local-titulo" className="bg-branco pb-24 md:pb-32">
      <div className="container-page">
        <SectionHeading id="local-titulo" eyebrow={LOCAL.eyebrow} titulo={LOCAL.titulo} texto={LOCAL.texto} />
        <div className="mt-14 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          {/* O crédito do OpenStreetMap fica fora do link: o nome do link é só
              o texto que aparece nele ("Abrir no Google Maps"). */}
          <div className="cortina relative min-h-[22rem] overflow-hidden rounded-[1.75rem] bg-noite">
            <a href={PERFIL_GOOGLE} target="_blank" rel="noopener noreferrer" className="group absolute inset-0 block">
              <Image src={mapa} alt="" fill quality={75} sizes="(min-width: 1024px) 60vw, 92vw" className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-serra)] group-hover:scale-[1.04]" />
              <span aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                <span className="whats-pulso absolute left-1/2 top-[1.15rem] size-8 -translate-x-1/2 rounded-full bg-vermelho/50" />
                <span className="relative grid size-9 rotate-45 place-items-center rounded-lg bg-[linear-gradient(135deg,var(--color-acao-quente),var(--color-acao-fundo))] shadow-[0_10px_24px_-8px_rgb(163_8_12/0.9)] ring-4 ring-white">
                  <span className="size-2.5 rounded-sm bg-branco" />
                </span>
              </span>
              <span className="absolute bottom-4 left-4 rounded-full bg-branco/95 px-4 py-2 text-[0.85rem] font-semibold text-ink shadow">{LOCAL.mapa}</span>
            </a>
            <span className="pointer-events-none absolute bottom-1.5 right-3 text-[0.68rem] text-branco/80">© OpenStreetMap</span>
          </div>

          <div className="revela cartao flex flex-col p-7 md:p-9">
            <div className="flex gap-4">
              <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-acao" />
              <address className="not-italic leading-relaxed">
                <span className="font-semibold text-ink">{e.rua}</span>
                <br />
                <span className="text-muted">
                  {e.referencia} · {e.bairro}, {e.cidade} - {e.uf}
                  <br />
                  CEP {e.cep}
                </span>
              </address>
            </div>
            <div className="mt-7 flex gap-4 border-t border-line pt-7">
              <Clock aria-hidden className="mt-1 size-5 shrink-0 text-acao" />
              <dl className="grid flex-1 grid-cols-[1fr_auto] gap-x-4 gap-y-2">
                {site.horario.map((h) => (
                  <div key={h.dias} className="contents">
                    <dt className="text-muted">{h.dias}</dt>
                    <dd className="text-right font-semibold tabular-nums text-ink">{h.horas}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-auto flex flex-col gap-3 pt-9 sm:flex-row lg:flex-col xl:flex-row">
              <Button href={ROTA} seta cheio>
                {LOCAL.rota}
              </Button>
              <Button href={waLink(MENSAGENS.visita)} variante="contornoEscuro" whatsapp cheio>
                {LOCAL.cta}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
