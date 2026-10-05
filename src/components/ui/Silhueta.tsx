import { cx } from "@/lib/cx";

export type Tom = "noite" | "creme" | "branco";

const FUNDO: Record<Tom, string> = { noite: "bg-noite", creme: "bg-creme", branco: "bg-branco" };
const COR: Record<Tom, string> = { noite: "text-noite", creme: "text-creme", branco: "text-branco" };

/**
 * Divisor de seção, refeito em 05/10 (a serra com as chapas parecia letra
 * solta): o "corte". A seção de baixo entra como uma chapa cortada na
 * diagonal, com o bisotê polido na quina e a linha vermelha do disco de
 * corte, que se desenha com a rolagem e termina no losango da marca.
 * Com "reduzir movimento" a linha já aparece inteira.
 */
export function Silhueta({ de, para, espelhar = false }: { readonly de: Tom; readonly para: Tom; readonly espelhar?: boolean }) {
  const escura = para === "noite";
  return (
    <div aria-hidden className={cx("relative -mb-px", FUNDO[de])}>
      <div className={cx("relative h-16 md:h-28", espelhar && "-scale-x-100")}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" focusable="false" className={cx("absolute inset-0 block size-full", COR[para])}>
          {/* a chapa */}
          <path d="M0 92L1440 28V120H0Z" fill="currentColor" />
          {/* bisotê: a quina polida logo abaixo do corte */}
          <path d="M0 92L1440 28V38L0 102Z" fill={escura ? "rgb(255 255 255 / 0.07)" : "rgb(20 20 20 / 0.05)"} />
          {/* linha do corte */}
          <path d="M0 92L1440 28" pathLength={1} fill="none" stroke="var(--color-vermelho)" strokeWidth={1.5} vectorEffect="non-scaling-stroke" className="corte-linha" />
        </svg>
        {/* o losango no fim do corte (fora do SVG para não esticar) */}
        <span className="absolute right-[4%] top-[25%] size-2.5 -translate-y-1/2 rotate-45 bg-vermelho shadow-[0_0_0_4px_rgb(253_0_2/0.15)] md:size-3" />
      </div>
    </div>
  );
}
