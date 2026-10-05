import Image from "next/image";

import gourmet from "@/assets/fotos/area-gourmet-vidro.jpg";
import losango from "../../../public/marca/losango.png";
import { CHAMADA_FINAL, MENSAGENS } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

import { Button } from "../ui/Button";

/** CTA final da Cabana: foto inteira, o losango da marca, título e pílula. */
export function ChamadaFinal() {
  return (
    <section aria-labelledby="final-titulo" className="on-dark relative isolate overflow-hidden bg-noite text-branco">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image src={gourmet} alt="" fill quality={75} sizes="100vw" className="deriva-foto object-cover" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(80%_70%_at_50%_55%,rgb(14_14_15/0.5),rgb(14_14_15/0.82))]" />
      <div aria-hidden className="ponte-topo-branco absolute inset-x-0 top-0 -z-10 h-24" />
      <div className="container-page flex min-h-[74svh] flex-col items-center justify-center py-32 text-center">
        <Image src={losango} alt="" sizes="72px" className="revela size-[4.5rem] drop-shadow-[0_12px_24px_rgb(0_0_0/0.5)]" />
        <h2 id="final-titulo" className="revela mt-8 max-w-[16ch] text-[clamp(2.6rem,1.4rem+4.4vw,5.4rem)] leading-[0.98]">
          {CHAMADA_FINAL.titulo}
        </h2>
        <div className="revela mt-10">
          <Button href={waLink(MENSAGENS.hero)} variante="vermelho" tamanho="lg" seta>
            {CHAMADA_FINAL.cta}
          </Button>
        </div>
        <p className="revela mt-5 text-[0.95rem] text-branco/75">{CHAMADA_FINAL.apoio}</p>
      </div>
    </section>
  );
}
