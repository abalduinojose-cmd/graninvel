import chapas from "@/assets/videos/chapas-no-galpao.jpg";
import viaLactea from "@/assets/videos/granito-via-lactea.jpg";
import ilha from "@/assets/videos/ilha-branca.jpg";
import { INSTAGRAM, site } from "@/content/site";
import { asset } from "@/lib/asset";

import { Button } from "../ui/Button";
import { IconeInstagram } from "../ui/IconesRedes";
import { SectionHeading } from "../ui/SectionHeading";

const POSTERS = { "chapas-no-galpao": chapas, "granito-via-lactea": viaLactea, "ilha-branca": ilha } as const;

/**
 * Reels (Momentos da Cabana) no escuro: os três vídeos do Instagram da
 * Graninvel com controles nativos, preload none e pôster leve, mais o
 * cartão de convite para seguir.
 */
export function Instagram() {
  return (
    <section id="instagram" aria-labelledby="instagram-titulo" className="on-dark bg-noite py-24 text-branco md:py-32">
      <div className="container-page">
        <SectionHeading id="instagram-titulo" eyebrow={INSTAGRAM.eyebrow} titulo={INSTAGRAM.titulo} texto={INSTAGRAM.texto} escuro />
        <ul className="scrollbar-none mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto max-sm:-mx-5 max-sm:scroll-px-5 max-sm:px-5 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {INSTAGRAM.videos.map((v, i) => (
            <li key={v.id} className="revela w-[68vw] shrink-0 snap-start sm:w-auto" style={{ "--d": i } as React.CSSProperties}>
              <figure>
                <div className="relative aspect-[9/16] overflow-hidden rounded-[1.25rem] border border-white/10 bg-noite-2">
                  <video
                    controls
                    playsInline
                    preload="none"
                    poster={POSTERS[v.id].src}
                    aria-label={`${v.titulo}: ${v.legenda}`}
                    className="absolute inset-0 size-full object-cover"
                  >
                    <source src={asset(`/videos/${v.id}.mp4`)} type="video/mp4" />
                  </video>
                </div>
                <figcaption className="mt-4">
                  <span className="block font-display text-[1.15rem] font-extrabold tracking-[-0.015em]">{v.titulo}</span>
                  <span className="mt-1 block text-[0.92rem] leading-snug text-branco/70">{v.legenda}</span>
                </figcaption>
              </figure>
            </li>
          ))}
          <li className="revela w-[68vw] shrink-0 snap-start sm:w-auto" style={{ "--d": 3 } as React.CSSProperties}>
            <div className="relative flex aspect-[9/16] flex-col justify-between overflow-hidden rounded-[1.25rem] bg-[linear-gradient(150deg,var(--color-acao-quente),var(--color-acao)_45%,var(--color-acao-fundo))] p-7 sm:max-lg:aspect-auto sm:max-lg:min-h-80">
              <span aria-hidden className="pointer-events-none absolute -bottom-16 -right-16 size-64 rotate-45 rounded-[2rem] border border-white/20" />
              <span aria-hidden className="pointer-events-none absolute -bottom-6 -right-6 size-40 rotate-45 rounded-[1.5rem] border border-white/15" />
              <IconeInstagram className="size-9" />
              <div className="relative">
                <p className="font-display text-[1.9rem] font-extrabold leading-[1.02] tracking-[-0.03em]">{INSTAGRAM.conviteTitulo}</p>
                <p className="mt-3 leading-relaxed text-branco/85">{INSTAGRAM.conviteTexto}</p>
                <p className="mt-2 text-[0.92rem] font-semibold">{site.instagramArroba}</p>
                <Button href={site.instagram} variante="claro" seta className="mt-6">
                  {INSTAGRAM.conviteCta}
                </Button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
