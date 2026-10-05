"use client";

import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";

import type { FotoGaleria } from "@/content/galeria";
import { cx } from "@/lib/cx";

/**
 * Trilho horizontal (padrão Cabana): scroll-snap nativo, setas que andam um
 * cartão por vez e se apagam nas pontas. Os itens são <li> passados pelo pai.
 */
export function Trilho({ rotulo, children, className, setasClassName }: { readonly rotulo: string; readonly children: ReactNode; readonly className?: string; readonly setasClassName?: string }) {
  const lista = useRef<HTMLUListElement>(null);
  const [pontas, setPontas] = useState({ inicio: true, fim: false });

  const mede = useCallback(() => {
    const el = lista.current;
    if (!el) return;
    setPontas({ inicio: el.scrollLeft < 8, fim: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    mede();
    const el = lista.current;
    el?.addEventListener("scroll", mede, { passive: true });
    window.addEventListener("resize", mede);
    return () => {
      el?.removeEventListener("scroll", mede);
      window.removeEventListener("resize", mede);
    };
  }, [mede]);

  const anda = (dir: 1 | -1) => {
    const el = lista.current;
    const item = el?.querySelector("li");
    if (!el || !item) return;
    el.scrollBy({ left: dir * (item.getBoundingClientRect().width + 16), behavior: "smooth" });
  };

  return (
    <div className="trilho-vista">
      <div className={cx("flex justify-end gap-2", setasClassName)}>
        <button type="button" onClick={() => anda(-1)} disabled={pontas.inicio} aria-label="Anterior" className="seta-trilho">
          <ArrowLeft className="size-4" />
        </button>
        <button type="button" onClick={() => anda(1)} disabled={pontas.fim} aria-label="Próximo" className="seta-trilho">
          <ArrowRight className="size-4" />
        </button>
      </div>
      <ul ref={lista} aria-label={rotulo} className={cx("scrollbar-none relative flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4", className)}>
        {children}
      </ul>
    </div>
  );
}

type Ambiente = { readonly nome: string; readonly descricao: string; readonly fotos: readonly FotoGaleria[]; readonly link: string; readonly verFotos: string; readonly cta: string };

/**
 * Ambientes (padrão "Espaços" da Cabana): um cartão por ambiente no trilho,
 * com a capa e "Ver N fotos"; o toque abre a galeria daquele ambiente num
 * <dialog> nativo (foco preso, Esc fecha, setas navegam, o foco volta).
 */
export function GaleriaAmbientes({ ambientes, rotulo }: { readonly ambientes: readonly Ambiente[]; readonly rotulo: string }) {
  const [aberto, setAberto] = useState<number | null>(null);
  const gatilho = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (aberto === null) gatilho.current?.focus();
  }, [aberto]);

  return (
    <>
      <Trilho rotulo={rotulo} className="gallery-inset" setasClassName="container-page mb-5 max-md:hidden">
        {ambientes.map((a, i) => {
          const capa = a.fotos[0];
          if (!capa) return null;
          return (
            <li key={a.nome} className="entra-lado w-[80vw] max-w-[24rem] shrink-0 snap-start sm:w-[24rem]" style={{ "--d": i } as CSSProperties}>
              <article className="cartao cartao-vivo flex h-full flex-col overflow-hidden">
                <button
                  type="button"
                  onClick={(e) => {
                    gatilho.current = e.currentTarget;
                    setAberto(i);
                  }}
                  aria-label={`${a.verFotos} de ${a.nome.toLowerCase()}`}
                  className="group relative block aspect-[3/4] w-full overflow-hidden bg-nevoa"
                >
                  <Image src={capa.src} alt={capa.alt} fill quality={85} loading={i < 2 ? "eager" : "lazy"} sizes="(min-width: 640px) 24rem, 80vw" className="object-cover transition-transform duration-700 ease-[var(--ease-serra)] group-hover:scale-[1.04]" />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-noite/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span aria-hidden className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-noite/50 px-3.5 py-2 text-[0.78rem] font-medium text-branco backdrop-blur-sm">
                    <Expand className="size-3.5" strokeWidth={1.75} />
                    {a.verFotos}
                  </span>
                </button>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-[1.4rem] text-ink">{a.nome}</h3>
                  <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">{a.descricao}</p>
                  <a href={a.link} target="_blank" rel="noopener noreferrer" className="link-traco mt-4 self-start text-[0.92rem]">
                    {a.cta}
                  </a>
                </div>
              </article>
            </li>
          );
        })}
      </Trilho>
      {aberto !== null ? <Dialogo titulo={ambientes[aberto].nome} fotos={ambientes[aberto].fotos} aoFechar={() => setAberto(null)} /> : null}
    </>
  );
}

function Dialogo({ titulo, fotos, aoFechar }: { readonly titulo: string; readonly fotos: readonly FotoGaleria[]; readonly aoFechar: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState(0);
  const total = fotos.length;
  const foto = fotos[i];

  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  const ir = (passo: number) => setI((v) => (v + passo + total) % total);
  const tecla = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "ArrowRight") ir(1);
    if (e.key === "ArrowLeft") ir(-1);
  };
  const botao = "grid size-12 place-items-center rounded-full border border-white/25 bg-black/30 text-white transition hover:bg-white hover:text-ink";

  return (
    <dialog
      ref={ref}
      aria-label={`Fotos: ${titulo}`}
      aria-modal="true"
      onKeyDown={tecla}
      onCancel={(e) => {
        e.preventDefault();
        aoFechar();
      }}
      className="galeria on-dark m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-white"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-5 py-4">
          <p className="text-sm text-white/80" aria-live="polite">{`${titulo} · ${i + 1} de ${total}`}</p>
          <button type="button" autoFocus onClick={aoFechar} aria-label="Fechar" className={botao}>
            <X className="size-5" aria-hidden />
          </button>
        </div>
        <figure className="relative min-h-0 flex-1">
          <Image key={foto.alt} quality={85} src={foto.src} alt={foto.alt} fill sizes="100vw" className="object-contain px-3 md:px-20" />
          {total > 1 ? (
            <>
              <button type="button" onClick={() => ir(-1)} aria-label="Foto anterior" className={cx(botao, "absolute left-3 top-1/2 -translate-y-1/2 md:left-6")}>
                <ChevronLeft className="size-5" aria-hidden />
              </button>
              <button type="button" onClick={() => ir(1)} aria-label="Próxima foto" className={cx(botao, "absolute right-3 top-1/2 -translate-y-1/2 md:right-6")}>
                <ChevronRight className="size-5" aria-hidden />
              </button>
            </>
          ) : null}
        </figure>
        <p className="mx-auto max-w-3xl px-5 py-5 text-center text-sm text-white/80">{foto.alt}</p>
      </div>
    </dialog>
  );
}
