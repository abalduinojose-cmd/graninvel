import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

import { IconeWhatsApp } from "./IconeWhatsApp";

type Variante = "vermelho" | "claro" | "contornoClaro" | "contornoEscuro" | "vidro";
type Tamanho = "sm" | "md" | "lg";

type Props = {
  readonly href: string;
  readonly children: ReactNode;
  readonly variante?: Variante;
  readonly tamanho?: Tamanho;
  readonly whatsapp?: boolean;
  /** Chip de seta no fim da pílula, que gira 45° no hover. */
  readonly seta?: boolean;
  readonly cheio?: boolean;
  readonly className?: string;
};

const VARIANTES: Record<Variante, string> = {
  vermelho: "btn-vermelho",
  claro: "btn-claro",
  contornoClaro: "btn-contorno-claro",
  contornoEscuro: "btn-contorno-escuro",
  vidro: "btn-vidro",
};
const TAMANHOS: Record<Tamanho, string> = {
  sm: "h-11 px-5 text-[0.85rem]",
  md: "h-12 px-6 text-[0.92rem]",
  lg: "h-14 px-8 text-[0.97rem]",
};
const TAMANHOS_SETA: Record<Tamanho, string> = {
  sm: "h-11 pl-5 pr-1.5 text-[0.85rem]",
  md: "h-13 pl-6 pr-2 text-[0.92rem]",
  lg: "h-14 pl-7 pr-2 text-[0.97rem]",
};

/** Pílula de ação (padrão Cabana). Link externo abre em nova aba. Server Component. */
export function Button({ href, children, variante = "vermelho", tamanho = "md", whatsapp = false, seta = false, cheio = false, className }: Props) {
  const externo = href.startsWith("http");
  return (
    <a href={href} {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={cx("btn", VARIANTES[variante], seta ? TAMANHOS_SETA[tamanho] : TAMANHOS[tamanho], cheio && "w-full", className)}>
      {whatsapp ? <IconeWhatsApp className="size-[1.15rem] shrink-0" /> : null}
      {children}
      {seta ? (
        <span aria-hidden className="btn-seta">
          <ArrowUpRight className="size-4" strokeWidth={2.2} />
        </span>
      ) : null}
    </a>
  );
}
