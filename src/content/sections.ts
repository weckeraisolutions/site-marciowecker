/**
 * Fragmentos navegáveis do cristal (arquitetura data-driven).
 * Decisão atual (Briefing_Conteudo 3.4): 4 fragmentos. Mentoria virou card 06 de Ofertas.
 * Adicionar um fragmento futuro = adicionar uma entrada aqui; o cristal recalcula geometria,
 * posições orbitais, rótulos e rotas automaticamente.
 */
export interface SiteSection {
  id: string
  label: string
  route: string
}

export const SITE_SECTIONS: readonly SiteSection[] = [
  { id: "sobre", label: "Sobre", route: "/sobre" },
  { id: "metodo", label: "Método", route: "/metodo" },
  { id: "ofertas", label: "Ofertas", route: "/ofertas" },
  { id: "contato", label: "Contato", route: "/contato" },
] as const
