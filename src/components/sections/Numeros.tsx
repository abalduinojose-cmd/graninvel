import { NUMEROS } from "@/content/site";

/**
 * Faixa escura de números (SocialProof da Cabana), redesenhada em 05/10:
 * uma grade de linhas finas como as juntas de um piso de pedra, número
 * grande em Cabinet 800 com o "+" em vermelho, e embaixo a faixa corrida
 * com o que a loja trabalha. (Os mesmos números saíram do hero e da frase,
 * que os repetiam.) Com "reduzir movimento" a faixa fica parada.
 */
export function Numeros() {
  return (
    <section aria-label="A Graninvel em números" className="on-dark overflow-hidden bg-noite text-branco">
      <div className="container-page pb-14 pt-16 md:pb-20 md:pt-24">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 md:grid-cols-4">
          {NUMEROS.itens.map((n, i) => (
            <div key={n.rotulo} className="revela relative flex min-h-44 flex-col justify-between gap-6 bg-noite p-6 md:min-h-56 md:p-8" style={{ "--d": i } as React.CSSProperties}>
              {/* índice decorativo por ::before, fora da checagem de contraste de texto */}
              <span aria-hidden data-n={String(i + 1).padStart(2, "0")} className="absolute right-5 top-5 text-[0.72rem] font-medium tabular-nums tracking-[0.14em] text-vermelho-claro before:content-[attr(data-n)] md:right-7 md:top-7" />
              <dt className="order-2 max-w-[16ch] text-[0.92rem] leading-snug text-branco/65">{n.rotulo}</dt>
              <dd className="order-1 font-display text-[clamp(3.2rem,2rem+4vw,5.6rem)] font-extrabold leading-[0.9] tracking-[-0.045em]">
                {n.valor.startsWith("+") ? (
                  <>
                    <span className="text-vermelho-claro">+</span>
                    {n.valor.slice(1)}
                  </>
                ) : (
                  n.valor
                )}
              </dd>
            </div>
          ))}
        </dl>
        <p className="revela mt-8 flex items-center gap-3 text-[0.88rem] text-branco/60">
          <span aria-hidden className="size-1.5 rotate-45 bg-vermelho" />
          {NUMEROS.legenda}
        </p>
      </div>

      <div className="border-y border-white/10 py-6 md:py-8">
        <div className="faixa flex w-max">
          {[0, 1].map((copia) => (
            <ul key={copia} aria-label={copia ? undefined : "O que a Graninvel trabalha"} aria-hidden={copia ? true : undefined} className="flex shrink-0 items-center">
              {NUMEROS.faixa.map((item) => (
                <li key={item} className="flex items-center whitespace-nowrap font-display text-[clamp(1.7rem,1.2rem+1.8vw,2.8rem)] font-light leading-none tracking-[-0.02em] text-branco/90">
                  <span className="px-6 md:px-9">{item}</span>
                  <span aria-hidden className="size-2.5 rotate-45 bg-vermelho" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
