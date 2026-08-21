import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type Temperature = "dark" | "cream"

interface SectionProps {
  children: ReactNode
  /** Temperatura visual: preto-tinta (dark) ou off-white quente (cream). */
  temperature?: Temperature
  /** Âncora de rota/scroll. */
  id?: string
  /** id do heading que rotula a seção (acessibilidade). */
  labelledBy?: string
  className?: string
}

const temperatures: Record<Temperature, string> = {
  dark: "bg-ink text-cream",
  cream: "bg-cream text-ink",
}

/**
 * Wrapper de seção do site. Alterna entre as duas temperaturas do sistema visual
 * (Briefing_Identidade, "sistema de duas temperaturas") e aplica o ritmo vertical.
 */
export function Section({
  children,
  temperature = "dark",
  id,
  labelledBy,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative w-full py-[var(--space-section)]",
        temperatures[temperature],
        className,
      )}
    >
      {children}
    </section>
  )
}
