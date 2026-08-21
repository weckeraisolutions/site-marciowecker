import { SITE_SECTIONS } from "@/content/sections"

/**
 * Camada de acessibilidade: skip-to-content (visível só no foco) e navegação HTML
 * tradicional oculta (sr-only) para leitor de tela. Garante degradação sem JS e
 * uma rota de navegação alternativa à do cristal.
 */
export function AccessibilityNav() {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <nav aria-label="Navegação principal" className="sr-only">
        <ul>
          {SITE_SECTIONS.map((section) => (
            <li key={section.id}>
              <a href={section.route}>{section.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
