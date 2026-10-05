import { AMBIENTES_TEXTO, MENSAGENS } from "@/content/site";
import { ambientes } from "@/content/galeria";
import { waLink } from "@/lib/whatsapp";

import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";
import { GaleriaAmbientes } from "../ui/Trilho";

/**
 * Projetos entregues (os "Espaços" da Cabana): um cartão por ambiente no
 * trilho; o toque abre as fotos daquele ambiente em tela cheia. Os links e
 * rótulos vão prontos do servidor (função não atravessa para o cliente).
 */
export function Ambientes() {
  const itens = ambientes.map((a) => ({
    ...a,
    link: waLink(MENSAGENS.ambiente(a.nome)),
    verFotos: AMBIENTES_TEXTO.verTodas(a.fotos.length),
    cta: `Orçamento para ${a.nome.toLowerCase()}`,
  }));

  return (
    <section id="projetos" aria-labelledby="projetos-titulo" className="bg-branco py-24 md:py-32">
      <div className="container-page mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading id="projetos-titulo" eyebrow={AMBIENTES_TEXTO.eyebrow} titulo={AMBIENTES_TEXTO.titulo} texto={AMBIENTES_TEXTO.texto} />
        <Button href={waLink(MENSAGENS.galeria)} variante="contornoEscuro" seta className="revela self-start md:self-auto">
          {AMBIENTES_TEXTO.cta}
        </Button>
      </div>
      <GaleriaAmbientes ambientes={itens} rotulo="Ambientes com projetos da Graninvel" />
    </section>
  );
}
