"use client";

import { Check, Loader2 } from "lucide-react";
import { useActionState, useEffect, useState, type ReactNode } from "react";

import { enviarOrcamento } from "@/app/actions";
import { AMBIENTES_FORM, CONTATO, site } from "@/content/site";
import type { CampoOrcamento, EstadoOrcamento } from "@/lib/validacao";
import { mascararTelefone } from "@/lib/whatsapp";

const INICIAL: EstadoOrcamento = { status: "inicial" };
const ERRO = "mt-2 text-[0.95rem] font-normal text-[#9b2c1a]";
const campo =
  "mt-2 block min-h-12 w-full rounded-2xl border border-line bg-creme px-4 py-3 text-ink transition focus:border-ink focus:bg-branco focus:outline-none aria-[invalid=true]:border-[#9b2c1a]";

function Campo({ id, rotulo, erro, opcional, children }: { id: string; rotulo: string; erro?: string; opcional?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="font-semibold text-ink">
        {rotulo}
        {opcional ? <span className="font-normal text-muted"> (opcional)</span> : null}
      </label>
      {children}
      {erro ? (
        <p id={`${id}-erro`} className={ERRO}>
          {erro}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Nome, WhatsApp, ambiente e mensagem, mais um honeypot. Server Action +
 * Zod no servidor; estados pelo useActionState: botão em loading, erro
 * específico abaixo do campo (aria-invalid + aria-describedby) e sucesso
 * no lugar do formulário. Na prévia estática a action devolve um link de
 * WhatsApp com o pedido escrito, que é aberto aqui.
 */
export function FormOrcamento() {
  const [estado, acao, enviando] = useActionState(enviarOrcamento, INICIAL);
  const [telefone, setTelefone] = useState("");
  const erros = estado.status === "erro" ? estado.erros : {};
  const valor = (k: string) => (estado.status === "erro" ? estado.valores[k] : undefined);

  useEffect(() => {
    if (estado.status === "ok" && estado.whatsapp) window.open(estado.whatsapp, "_blank", "noopener");
  }, [estado]);

  if (estado.status === "ok") {
    return (
      <div role="status" className="py-4">
        <Check aria-hidden className="size-8 text-acao" strokeWidth={2} />
        <p className="mt-4 font-display text-[1.6rem] font-extrabold tracking-[-0.02em] text-ink">{CONTATO.sucessoTitulo}</p>
        <p className="mt-2 text-muted">{CONTATO.sucessoTexto}</p>
      </div>
    );
  }

  const aria = (k: CampoOrcamento) => ({
    id: `orc-${k}`,
    name: k,
    "aria-invalid": erros[k] ? true : undefined,
    "aria-describedby": erros[k] ? `orc-${k}-erro` : undefined,
  });

  return (
    <form action={acao} noValidate className="relative grid gap-5" aria-label="Pedido de orçamento">
      <Campo id="orc-nome" rotulo="Nome" erro={erros.nome}>
        <input {...aria("nome")} type="text" autoComplete="name" defaultValue={valor("nome")} className={campo} />
      </Campo>
      <Campo id="orc-whatsapp" rotulo="WhatsApp com DDD" erro={erros.whatsapp}>
        <input
          {...aria("whatsapp")}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={telefone || valor("whatsapp") || ""}
          onChange={(e) => setTelefone(mascararTelefone(e.target.value))}
          className={campo}
        />
      </Campo>
      <Campo id="orc-ambiente" rotulo="Ambiente" erro={erros.ambiente}>
        <select {...aria("ambiente")} defaultValue={valor("ambiente") ?? ""} className={campo}>
          <option value="" disabled>
            Escolha na lista
          </option>
          {AMBIENTES_FORM.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </Campo>
      <Campo id="orc-mensagem" rotulo="Mensagem" erro={erros.mensagem} opcional>
        <textarea {...aria("mensagem")} rows={3} maxLength={600} defaultValue={valor("mensagem")} className={`${campo} resize-y`} />
      </Campo>
      {/* Honeypot: fora da tela e fora do teclado. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="orc-empresa">Empresa</label>
        <input id="orc-empresa" name="empresa" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" disabled={enviando} className="btn btn-vermelho h-14 w-full text-[0.97rem] disabled:opacity-70">
        {enviando ? <Loader2 aria-hidden className="size-5 animate-spin" /> : null}
        {enviando ? "Enviando" : CONTATO.enviar}
      </button>
      <p className="text-center text-muted">
        Ou chame direto: <a href={`tel:${site.whatsapp}`} className="inline-flex min-h-11 items-center font-semibold text-acao underline decoration-acao/40 underline-offset-4">{site.whatsappDisplay}</a>
      </p>
    </form>
  );
}
