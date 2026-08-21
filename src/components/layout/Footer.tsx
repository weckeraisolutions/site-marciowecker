import { Mail } from "lucide-react"
import { Link } from "react-router-dom"
import { SITE, whatsappUrl } from "@/content/site"
import { SITE_SECTIONS } from "@/content/sections"
import { Container } from "@/components/ui/Container"
import { LinkedInIcon, WhatsAppIcon } from "@/components/ui/icons"

const contactIcons = [
  {
    label: "Conversar no WhatsApp",
    href: whatsappUrl(),
    Icon: WhatsAppIcon,
    external: true,
  },
  {
    label: "Perfil no LinkedIn",
    href: SITE.contact.linkedin,
    Icon: LinkedInIcon,
    external: true,
  },
  {
    label: "Enviar e-mail",
    href: `mailto:${SITE.contact.email}`,
    Icon: Mail,
    external: false,
  },
]

/**
 * Footer geral do site (Briefing_Conteudo 3.5). Quatro colunas, frase-âncora
 * repetida em tamanho pequeno e copyright. Linha dourada fina no topo.
 */
export function Footer() {
  return (
    <footer className="border-t border-champagne/20 bg-ink text-cream">
      <Container className="py-[var(--space-block)]">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="flex flex-col gap-4">
            <img
              src="/images/logo/wordmark-branco.svg"
              alt={SITE.name}
              className="h-16 w-auto"
            />
            <p className="font-eyebrow text-[length:var(--text-eyebrow)] uppercase tracking-[var(--tracking-eyebrow)] text-mute">
              {SITE.tagline}
            </p>
          </div>

          {/* Navegação */}
          <nav aria-label="Navegação do rodapé" className="flex flex-col gap-3">
            <h2 className="font-eyebrow text-[length:var(--text-eyebrow)] uppercase tracking-[var(--tracking-eyebrow)] text-champagne">
              Navegação
            </h2>
            <ul className="flex flex-col gap-2">
              {SITE_SECTIONS.map((section) => (
                <li key={section.id}>
                  <Link
                    to={section.route}
                    className="text-[length:var(--text-body)] text-cream/80 transition-colors hover:text-champagne"
                  >
                    {section.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div className="flex flex-col gap-3">
            <h2 className="font-eyebrow text-[length:var(--text-eyebrow)] uppercase tracking-[var(--tracking-eyebrow)] text-champagne">
              Contato
            </h2>
            <ul className="flex items-center gap-5">
              {contactIcons.map(({ label, href, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex text-champagne transition-opacity hover:opacity-70"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Localização */}
          <div className="flex flex-col gap-3">
            <h2 className="font-eyebrow text-[length:var(--text-eyebrow)] uppercase tracking-[var(--tracking-eyebrow)] text-champagne">
              Localização
            </h2>
            <p className="text-[length:var(--text-body)] text-cream/80">{SITE.contact.location}</p>
          </div>
        </div>

        {/* Frase-âncora + copyright */}
        <div className="mt-[var(--space-block)] flex flex-col gap-4 border-t border-cream/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-eyebrow text-[length:var(--text-eyebrow)] uppercase tracking-[var(--tracking-eyebrow)] text-mute">
            {SITE.anchor}
          </p>
          <div className="flex items-center gap-4 text-[length:var(--text-eyebrow)] text-mute">
            <a href="/privacidade" className="transition-colors hover:text-champagne">
              Privacidade
            </a>
            <span aria-hidden="true">·</span>
            <span>© 2026 {SITE.name}. {SITE.legalName}.</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
