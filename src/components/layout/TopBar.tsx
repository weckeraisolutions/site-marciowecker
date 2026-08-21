import { SITE, whatsappUrl } from "@/content/site"
import { WhatsAppIcon } from "@/components/ui/icons"
import { useCrystalNav } from "@/hooks/useCrystalNav"

/**
 * Topo fixo persistente (Briefing_Conteudo, Bloco 2). Logo MW à esquerda volta ao
 * início; ícone WhatsApp à direita abre conversa direta. Fundo translúcido com blur
 * e borda inferior dourada fina.
 */
export function TopBar() {
  const { goHome } = useCrystalNav()

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 h-14 border-b border-champagne/20 bg-ink/70 backdrop-blur-xl sm:h-16"
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <button
          type="button"
          onClick={goHome}
          aria-label={`${SITE.name}, voltar ao início`}
          className="inline-flex items-center"
        >
          <img
            src="/images/logo/monograma-dourado.svg"
            alt=""
            aria-hidden="true"
            className="h-6 w-auto sm:h-7"
          />
        </button>

        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Conversar no WhatsApp"
          className="inline-flex items-center text-champagne transition-opacity hover:opacity-70"
        >
          <WhatsAppIcon className="h-5 w-5" />
        </a>
      </div>
    </header>
  )
}
