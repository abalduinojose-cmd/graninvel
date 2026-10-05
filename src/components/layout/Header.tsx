import { NAV, MENSAGENS } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

import { Marca } from "../ui/Marca";
import { MobileNav } from "./MobileNav";

/**
 * Cabeçalho da Cabana: transparente e branco sobre o hero, ganha fundo
 * branco em vidro depois de 80px (flag data-rolou no <html>).
 */
export function Header() {
  return (
    <header className="cabecalho fixed inset-x-0 top-0 z-50">
      <div className="container-page flex h-[4.75rem] items-center justify-between gap-6">
        <a href="#topo" aria-label="Graninvel Marmoraria, voltar ao início" className="shrink-0">
          <Marca />
        </a>
        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {NAV.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="relative inline-flex min-h-11 items-center px-3.5 text-[0.92rem] font-medium opacity-85 transition hover:opacity-100 after:absolute after:inset-x-3.5 after:bottom-2.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100">
                  {l.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <a href={waLink(MENSAGENS.hero)} target="_blank" rel="noopener noreferrer" className="btn btn-vermelho hidden h-11 px-5 text-[0.86rem] sm:inline-flex">
            Pedir orçamento
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
