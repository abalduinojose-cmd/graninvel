import { cx } from "@/lib/cx";

type Props = {
  readonly id: string;
  readonly eyebrow: string;
  readonly titulo: string;
  readonly texto?: string;
  readonly escuro?: boolean;
  readonly centro?: boolean;
  readonly className?: string;
};

/** Traço vermelho que se desenha + rótulo, H2 em Cabinet 800 e o apoio (padrão Cabana). */
export function SectionHeading({ id, eyebrow, titulo, texto, escuro = false, centro = false, className }: Props) {
  return (
    <div className={cx("revela max-w-2xl", centro && "mx-auto flex flex-col items-center text-center", className)}>
      <p className={cx("rotulo-caps flex items-center gap-3", escuro ? "text-vermelho-claro" : "text-acao")}>
        <span aria-hidden className="h-px w-9 bg-current" />
        {eyebrow}
      </p>
      <h2 id={id} className={cx("mt-5 text-[clamp(2.2rem,1.4rem+2.8vw,3.6rem)]", escuro ? "text-branco" : "text-ink")}>
        {titulo}
      </h2>
      {texto ? <p className={cx("mt-5 max-w-[58ch] text-[1.0625rem] leading-relaxed", escuro ? "text-branco/75" : "text-muted")}>{texto}</p> : null}
    </div>
  );
}
