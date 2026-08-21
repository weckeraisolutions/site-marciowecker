import { createContext, useContext } from "react"
import type { SiteSection } from "@/content/sections"

/**
 * Estados do cristal (Especificacao_Final, seção 3):
 *  - "hero"     → Estado A: cristal grande no início (rota /)
 *  - "expanded" → Estado B: fragmentado em órbita, aguardando escolha (rota /)
 *  - "section"  → Estado C: um fragmento virou fundo de uma seção (rotas /sobre, ...)
 */
export type CrystalState = "hero" | "expanded" | "section"

export interface CrystalNav {
  state: CrystalState
  /** Seção ativa quando state === "section", senão null. */
  activeSection: SiteSection | null
  /** Fragmenta o cristal (Estado A → B). Só faz efeito no início. */
  expand: () => void
  /** Reagrupa o cristal (Estado B → A). */
  collapse: () => void
  /** Navega para a rota de uma seção (Estado C). */
  goToSection: (id: string) => void
  /** Volta ao início e reagrupa o cristal (Estado D → A). */
  goHome: () => void
}

export const CrystalNavContext = createContext<CrystalNav | null>(null)

export function useCrystalNav(): CrystalNav {
  const ctx = useContext(CrystalNavContext)
  if (!ctx) throw new Error("useCrystalNav precisa estar dentro de <CrystalNavProvider>")
  return ctx
}
