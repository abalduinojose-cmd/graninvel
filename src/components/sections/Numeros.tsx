import { NUMEROS } from "@/content/site";

/** Faixa escura de números (SocialProof da Cabana), todos reais e conferidos. */
export function Numeros() {
  return (
    <section aria-label="A Graninvel em números" className="on-dark bg-noite text-branco">
      <div className="container-page py-14 md:py-16">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {NUMEROS.itens.map((n, i) => (
            <div key={n.rotulo} className="revela flex flex-col border-l border-white/15 pl-5" style={{ "--d": i } as React.CSSProperties}>
              <dt className="order-2 mt-2 text-[0.92rem] leading-snug text-branco/70">{n.rotulo}</dt>
              <dd className="order-1 font-display text-[clamp(2.6rem,1.8rem+2.6vw,4rem)] font-extrabold leading-none tracking-[-0.04em]">
                {n.valor}
              </dd>
            </div>
          ))}
        </dl>
        <p className="revela mt-12 flex items-center gap-3 text-[0.88rem] text-branco/60">
          <span aria-hidden className="size-1.5 rotate-45 bg-vermelho" />
          {NUMEROS.legenda}
        </p>
      </div>
    </section>
  );
}
