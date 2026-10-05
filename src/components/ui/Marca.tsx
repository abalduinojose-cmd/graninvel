import Image from "next/image";

import losango from "../../../public/marca/losango.png";

import { cx } from "@/lib/cx";

/**
 * Marca: o losango real da logo (scripts/logo.mjs) + o nome em Cabinet 800 e
 * "Marmoraria" em versalete. O losango vem sempre em vermelho; o texto
 * herda a cor (tinta no claro, branco no escuro).
 */
export function Marca({ className, tamanho = "md" }: { readonly className?: string; readonly tamanho?: "md" | "lg" }) {
  const grande = tamanho === "lg";
  return (
    <span className={cx("inline-flex items-center", grande ? "gap-4" : "gap-3", className)}>
      <Image src={losango} alt="" sizes={grande ? "64px" : "44px"} className={grande ? "size-16" : "size-11"} />
      <span className="flex flex-col leading-none">
        <span className={cx("font-display font-extrabold tracking-[0.06em]", grande ? "text-[1.9rem]" : "text-[1.22rem]")}>GRANINVEL</span>{" "}
        <span className={cx("font-body font-medium uppercase tracking-[0.46em] opacity-75", grande ? "mt-2 text-[0.72rem]" : "mt-1.5 text-[0.56rem]")}>Marmoraria</span>
      </span>
    </span>
  );
}
