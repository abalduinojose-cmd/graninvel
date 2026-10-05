import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Ambientes } from "@/components/sections/Ambientes";
import { Avaliacoes } from "@/components/sections/Avaliacoes";
import { ChamadaFinal } from "@/components/sections/ChamadaFinal";
import { Contato } from "@/components/sections/Contato";
import { Frase } from "@/components/sections/Frase";
import { Hero } from "@/components/sections/Hero";
import { Instagram } from "@/components/sections/Instagram";
import { Local } from "@/components/sections/Local";
import { Materiais } from "@/components/sections/Materiais";
import { Numeros } from "@/components/sections/Numeros";
import { Pedras } from "@/components/sections/Pedras";
import { Sobre } from "@/components/sections/Sobre";
import { Silhueta } from "@/components/ui/Silhueta";
import { StickyCta } from "@/components/ui/StickyCta";

/* Ritmo da Cabana Afrodite: hero escuro, faixa de números, silhuetas de
   serra e chapas entre os tons, frase sobre foto inteira, trilhos e o CTA
   final sobre foto. */
export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Numeros />
        <Silhueta de="noite" para="creme" />
        <Sobre />
        <Frase />
        <Ambientes />
        <Silhueta de="branco" para="noite" espelhar />
        <Materiais />
        <Silhueta de="noite" para="creme" />
        <Pedras />
        <Silhueta de="creme" para="noite" espelhar />
        <Instagram />
        <Silhueta de="noite" para="branco" />
        <Avaliacoes />
        <Local />
        <Contato />
        <ChamadaFinal />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
