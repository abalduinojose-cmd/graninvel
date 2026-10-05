import { cx } from "@/lib/cx";

/**
 * Estrelas no vermelho da marca; o valor vai no aria-label. `decorativa`
 * esconde do leitor de tela quando o texto ao lado já diz o que é (no
 * cartão-resumo, para não soar como uma média de 5,0).
 */
export function StarRating({ nota, className = "size-4", decorativa = false }: { readonly nota: number; readonly className?: string; readonly decorativa?: boolean }) {
  return (
    <span {...(decorativa ? { "aria-hidden": true } : { role: "img", "aria-label": `${nota.toLocaleString("pt-BR", { minimumFractionDigits: 1 })} de 5 estrelas` })} className="inline-flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" aria-hidden className={cx(className, i < Math.round(nota) ? "text-vermelho" : "text-line")} fill="currentColor">
          <path d="M10 1.5l2.6 5.5 6 .8-4.4 4.1 1.1 5.9L10 15l-5.3 2.8 1.1-5.9L1.4 7.8l6-.8z" />
        </svg>
      ))}
    </span>
  );
}
