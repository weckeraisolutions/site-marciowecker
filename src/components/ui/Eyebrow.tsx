import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type Tone = "champagne" | "bronze"

interface EyebrowProps {
  children: ReactNode
  /** Cor do dourado: champanhe (dark) ou bronze (cream). */
  tone?: Tone
  /** Linha dourada fina (~80px) abaixo do rótulo. */
  line?: boolean
  /** id para uso como rótulo de seção (aria-labelledby). */
  id?: string
  className?: string
}

const tones: Record<Tone, { text: string; line: string }> = {
  champagne: { text: "text-champagne", line: "bg-champagne" },
  bronze: { text: "text-bronze", line: "bg-bronze" },
}

/**
 * Eyebrow Cabinet Grotesk uppercase com tracking largo. Marca o início de cada
 * seção; a linha dourada fina é o detalhe recorrente do briefing.
 */
export function Eyebrow({ children, tone = "champagne", line = false, id, className }: EyebrowProps) {
  const t = tones[tone]
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <span
        id={id}
        className={cn(
          "font-eyebrow text-[length:var(--text-eyebrow)] font-medium uppercase",
          "tracking-[var(--tracking-eyebrow)]",
          t.text,
        )}
      >
        {children}
      </span>
      {line && <span aria-hidden="true" className={cn("h-px w-20", t.line)} />}
    </div>
  )
}
