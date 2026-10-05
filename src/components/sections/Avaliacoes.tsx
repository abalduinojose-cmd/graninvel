import { AVALIACOES_TEXTO, PERFIL_GOOGLE } from "@/content/site";
import reviews from "@/content/reviews.json";
import { asset } from "@/lib/asset";

import { IconeGoogle } from "../ui/IconesRedes";
import { SectionHeading } from "../ui/SectionHeading";
import { StarRating } from "../ui/StarRating";
import { Trilho } from "../ui/Trilho";

const formatoData = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" });

/**
 * Avaliações (padrão Cabana): cartão-resumo com as 25 avaliações de 5
 * estrelas do Google (o cliente pediu para não mostrar a média nem as de 1
 * estrela) e o trilho com as que têm texto, foto e data.
 */
export function Avaliacoes() {
  return (
    <section id="avaliacoes" aria-labelledby="avaliacoes-titulo" className="bg-branco py-24 md:py-32">
      <div className="container-page">
        <SectionHeading id="avaliacoes-titulo" eyebrow={AVALIACOES_TEXTO.eyebrow} titulo={AVALIACOES_TEXTO.titulo} />
      </div>
      <div className="container-page mt-14 grid gap-10 lg:grid-cols-[21rem_1fr] lg:gap-10">
        <div>
          <div className="revela cartao p-7">
            <div className="flex items-center gap-3">
              <IconeGoogle className="size-6" />
              <span className="text-[0.9rem] font-medium text-muted">Perfil da Graninvel no Google</span>
            </div>
            <p className="mt-6 font-display text-[4.2rem] font-extrabold leading-none tracking-[-0.05em] text-ink">{AVALIACOES_TEXTO.resumoTitulo}</p>
            <StarRating nota={5} decorativa className="mt-3 size-5" />
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{AVALIACOES_TEXTO.resumoTexto}</p>
            <a href={PERFIL_GOOGLE} target="_blank" rel="noopener noreferrer" className="link-traco mt-5">
              {AVALIACOES_TEXTO.link}
            </a>
          </div>
        </div>

        <div className="min-w-0">
          <div className="lg:-mt-16">
            <Trilho rotulo="Avaliações de clientes no Google" setasClassName="mb-5 max-md:hidden">
              {reviews.map((r) => (
                <li key={r.autor} className="w-[84vw] max-w-[23rem] shrink-0 snap-start sm:w-[23rem]">
                  <figure className="flex h-full flex-col rounded-[1.5rem] border border-line bg-creme p-7">
                    <StarRating nota={r.nota} />
                    <blockquote className="mt-5 flex-1 text-[1.02rem] leading-relaxed text-ink">“{r.texto}”</blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                      {/* eslint-disable-next-line @next/next/no-img-element -- avatar de 44px já em webp; o next/image sem otimização não aplica o basePath */}
                      <img src={asset(r.foto as `/${string}`)} alt="" width={44} height={44} loading="lazy" decoding="async" className="size-11 rounded-full object-cover" />
                      <span className="flex flex-col leading-tight">
                        <span className="font-semibold capitalize text-ink">{r.autor.toLowerCase()}</span>
                        <span className="mt-1 text-[0.85rem] text-muted">{formatoData.format(new Date(`${r.data}T12:00:00`))}</span>
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </Trilho>
          </div>
        </div>
      </div>
    </section>
  );
}
