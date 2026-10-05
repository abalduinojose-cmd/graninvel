import { cx } from "@/lib/cx";

export type Tom = "noite" | "creme" | "branco";

const FUNDO: Record<Tom, string> = { noite: "bg-noite", creme: "bg-creme", branco: "bg-branco" };
const COR: Record<Tom, string> = { noite: "text-noite", creme: "text-creme", branco: "text-branco" };

/**
 * Divisor de seção (papel da serra com o A-Frame na Cabana): a serra de
 * Itaipava ao fundo e, no pátio da loja, as chapas de pedra encostadas nos
 * cavaletes em A, com a placa do losango da Graninvel num poste. A cor de
 * baixo sobe como o chão do pátio; as chapas sobem com a rolagem.
 */
export function Silhueta({ de, para, espelhar = false }: { readonly de: Tom; readonly para: Tom; readonly espelhar?: boolean }) {
  return (
    <div aria-hidden className={cx("relative -mb-px overflow-hidden", FUNDO[de])}>
      <svg viewBox="0 0 1440 140" preserveAspectRatio="none" focusable="false" className={cx("block h-20 w-full md:h-32", COR[para], espelhar && "-scale-x-100")}>
        {/* serra ao fundo, mais suave */}
        <path d="M0 140V96L120 70L230 88L360 52L470 80L560 60L690 90L820 64L930 86L1060 46L1180 78L1300 58L1440 84V140Z" fill="currentColor" opacity="0.35" />
        {/* chapas nos cavaletes: retângulos inclinados encostados em A */}
        <g className="chapas-sobem" fill="currentColor">
          <path d="M880 140L912 58L922 60L894 140Z" />
          <path d="M898 140L934 50L946 52L914 140Z" />
          <path d="M918 140L958 46L972 48L936 140Z" />
          <path d="M1012 140L976 46L962 48L994 140Z" />
          <path d="M1032 140L1000 54L988 56L1016 140Z" />
          <path d="M1120 140L1146 72L1154 74L1132 140Z" />
          <path d="M1136 140L1166 66L1176 68L1150 140Z" />
          <path d="M1196 140L1172 70L1162 72L1184 140Z" />
        </g>
        {/* placa do losango num poste */}
        <path d="M1262 140V72H1266V140Z" fill="currentColor" />
        <path d="M1264 38L1284 58L1264 78L1244 58Z" fill="currentColor" />
        {/* chão do pátio */}
        <path d="M0 140V124Q360 112 720 120Q1080 128 1440 116V140Z" fill="currentColor" />
      </svg>
    </div>
  );
}
