import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { SITE_URL, site } from "@/content/site";
import { schemaNegocio } from "@/lib/schema";

import "./globals.css";

/* Cabinet Grotesk nos títulos (800 contra 300, contraste de extremos) e
   General Sans no texto. As duas da Fontshare (licença gratuita ITF),
   self-hosted pelo next/font, com todos os acentos do português conferidos. */
const cabinet = localFont({
  src: [
    { path: "../assets/fontes/CabinetGrotesk-300.woff2", weight: "300" },
    { path: "../assets/fontes/CabinetGrotesk-500.woff2", weight: "500" },
    { path: "../assets/fontes/CabinetGrotesk-800.woff2", weight: "800" },
  ],
  display: "swap",
  variable: "--font-cabinet",
  adjustFontFallback: false,
  fallback: ["Cabinet Calibrada", "Arial", "sans-serif"],
});

/* Fallbacks calibrados à mão ("Cabinet Calibrada" e "General Calibrada" no globals.css): o
   automático do next/font errava a largura e o texto do hero quebrava em
   outra linha na troca de fonte (lição da v1: CLS de 0,15). */
const general = localFont({
  src: [
    { path: "../assets/fontes/GeneralSans-400.woff2", weight: "400" },
    { path: "../assets/fontes/GeneralSans-500.woff2", weight: "500" },
    { path: "../assets/fontes/GeneralSans-600.woff2", weight: "600" },
  ],
  display: "swap",
  variable: "--font-general",
  adjustFontFallback: false,
  fallback: ["General Calibrada", "Arial", "sans-serif"],
});

const descricao =
  "Marmoraria em Itaipava, Petrópolis, há mais de 15 anos: mármores, granitos, superfícies sintéticas e pedras decorativas sob medida, com medição, corte e instalação.";

export const metadata: Metadata = {
  metadataBase: new URL(new URL(SITE_URL).origin),
  title: {
    default: "Marmoraria em Itaipava, Petrópolis | Mármores e Granitos · Graninvel",
    template: "%s · Marmoraria Graninvel",
  },
  description: descricao,
  alternates: { canonical: SITE_URL },
  applicationName: site.nome,
  keywords: [
    "marmoraria Petrópolis",
    "marmoraria Itaipava",
    "granito Petrópolis",
    "mármore Petrópolis",
    "bancada de granito Itaipava",
    "pedra São Tomé Petrópolis",
    "pedras decorativas Itaipava",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: site.nome,
    title: "Marmoraria Graninvel, em Itaipava",
    description: descricao,
  },
  twitter: { card: "summary_large_image", title: "Marmoraria Graninvel, em Itaipava", description: descricao },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0e0e0f",
};

/* Cabeçalho que ganha fundo depois de 80px: um flag no <html> lido pelo
   CSS, num script mínimo que roda antes da hidratação. */
const scriptRolagem = `(()=>{const d=document.documentElement;let p=0;const f=()=>{d.dataset.rolou=scrollY>80?"1":"0";p=0};f();addEventListener("scroll",()=>{p||(p=requestAnimationFrame(f))},{passive:!0})})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${cabinet.variable} ${general.variable}`} suppressHydrationWarning>
      <body>
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-acao focus:px-4 focus:py-2 focus:text-branco">
          Pular para o conteúdo
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaNegocio()) }} />
        <script dangerouslySetInnerHTML={{ __html: scriptRolagem }} />
      </body>
    </html>
  );
}
