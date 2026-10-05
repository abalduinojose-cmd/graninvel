"use client";

import { useEffect, useState } from "react";

import { MENSAGENS } from "@/content/site";
import { cx } from "@/lib/cx";
import { waLink } from "@/lib/whatsapp";

import { IconeWhatsApp } from "./IconeWhatsApp";

/**
 * Botão redondo do WhatsApp, o único elemento flutuante (o cliente pediu
 * para tirar a pílula "Pedir orçamento"). Entra depois do hero, onde já
 * existem os dois botões, e some com o menu aberto.
 */
export function StickyCta() {
  const [passou, setPassou] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("topo");
    if (!hero) return;
    const obs = new IntersectionObserver(([e]) => setPassou(!e.isIntersecting));
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  return (
    <a
      href={waLink(MENSAGENS.contato)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com a Graninvel no WhatsApp"
      inert={!passou}
      className={cx(
        "whats-fixo fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_14px_30px_-10px_rgb(18_140_70/0.6)] ring-4 ring-white/80 transition duration-500 md:bottom-6 md:right-6 md:size-16",
        passou ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <span aria-hidden className="whats-pulso absolute inset-0 rounded-full bg-[#25d366]" />
      <IconeWhatsApp className="relative size-7 md:size-8" />
    </a>
  );
}
