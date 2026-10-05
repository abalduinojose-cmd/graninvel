import { MENSAGENS, NAV, PERFIL_GOOGLE, site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

import { IconeWhatsApp } from "../ui/IconeWhatsApp";
import { IconeGoogle, IconeInstagram } from "../ui/IconesRedes";
import { Marca } from "../ui/Marca";
import { Pendente } from "../ui/Pendente";

/**
 * Rodapé centralizado da Cabana: marca, navegação, redes em quadrados,
 * endereço e horário, e o nome GRANINVEL gigante como marca d'água.
 */
export function Footer() {
  const e = site.endereco;
  const redes = [
    { href: waLink(MENSAGENS.contato), rotulo: "WhatsApp", icone: <IconeWhatsApp className="size-5" /> },
    { href: site.instagram, rotulo: "Instagram", icone: <IconeInstagram className="size-5" /> },
    { href: PERFIL_GOOGLE, rotulo: "Google", icone: <IconeGoogle className="size-5" /> },
  ];
  return (
    <footer className="on-dark relative isolate overflow-hidden bg-noite pb-28 pt-20 text-branco md:pb-16">
      <div className="container-page flex flex-col items-center text-center">
        <Marca tamanho="lg" />
        <p className="poetico mt-6 text-[1.3rem] text-branco/80">{site.slogan}</p>

        <nav aria-label="Rodapé" className="mt-10">
          <ul className="flex flex-wrap justify-center gap-x-2 gap-y-1">
            {NAV.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-flex min-h-11 items-center px-3 text-[0.95rem] text-branco/75 transition hover:text-branco">
                  {l.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="mt-8 flex gap-3">
          {redes.map((r) => (
            <li key={r.rotulo}>
              <a href={r.href} target="_blank" rel="noopener noreferrer" aria-label={r.rotulo} className="grid size-12 place-items-center rounded-2xl border border-white/15 bg-white/5 transition hover:border-acao hover:bg-acao">
                {r.icone}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid w-full max-w-3xl gap-8 border-t border-white/10 pt-10 text-[0.95rem] text-branco/70 sm:grid-cols-2">
          <address className="not-italic leading-relaxed">
            {e.rua}
            <br />
            {e.referencia} · {e.bairro}
            <br />
            {e.cidade} - {e.uf} · {e.cep}
          </address>
          <p className="leading-relaxed">
            {site.horario.map((h) => (
              <span key={h.dias} className="block">
                {h.dias}: {h.horas}
              </span>
            ))}
          </p>
        </div>

        <p className="mt-10 flex flex-wrap items-center justify-center gap-2 text-[0.85rem] text-branco/55">
          © {new Date().getFullYear()} {site.nome} · CNPJ <Pendente marcador={site.cnpj} className="text-vermelho-claro" />
        </p>
      </div>
      {/* Marca d'água em SVG: decorativa, fora da checagem de contraste de texto. */}
      <svg aria-hidden focusable="false" viewBox="0 0 1000 170" className="pointer-events-none mx-auto mt-16 block w-[min(96vw,80rem)] select-none">
        <text x="500" y="150" textAnchor="middle" textLength="980" lengthAdjust="spacingAndGlyphs" fill="rgb(255 255 255 / 0.045)" className="font-display" fontSize="196" fontWeight="800" letterSpacing="-8">
          GRANINVEL
        </text>
      </svg>
    </footer>
  );
}
