/**
 * Constantes de marca e contato. Fonte: vault Obsidian (BRIEFING-MASTER.md).
 * Não inventar copy aqui; todo texto vem do briefing.
 */
export const SITE = {
  name: "Marcio Wecker",
  tagline: "Mapeamento, método e aceleração",
  anchor: "Não vendo ferramentas. Estruturo soluções.",
  legalName: "Wecker AI Solutions",
  contact: {
    email: "weckeraisolutions@gmail.com",
    whatsapp: "5544998484630",
    whatsappLabel: "+55 44 99848-4630",
    whatsappMessage: "Olá Marcio, vim pelo site e quero conversar sobre um projeto.",
    linkedin: "https://www.linkedin.com/in/marcio-alexandre-wecker/",
    instagram: "https://instagram.com/marcio.wecker",
    location: "Paraná, Brasil",
  },
} as const

/** Monta a URL do WhatsApp com a mensagem padrão (ou uma específica). */
export function whatsappUrl(message: string = SITE.contact.whatsappMessage): string {
  return `https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(message)}`
}
