import { Section } from "@/components/ui/Section"
import { Container } from "@/components/ui/Container"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { Button } from "@/components/ui/Button"
import { useCrystalNav } from "@/hooks/useCrystalNav"

interface SectionPlaceholderProps {
  /** id do fragmento em SITE_SECTIONS (sobre, metodo, ...). */
  id: string
  label: string
  temperature?: "dark" | "cream"
}

/**
 * Placeholder de rota da Fase 3. Comprova o roteamento e a temperatura de cada
 * seção. Será substituído pelo conteúdo real (vault) na Fase 4.
 */
export function SectionPlaceholder({ id, label, temperature = "dark" }: SectionPlaceholderProps) {
  const { goHome } = useCrystalNav()
  const tone = temperature === "cream" ? "bronze" : "champagne"
  const headingId = `secao-${id}`

  return (
    <Section temperature={temperature} id={id} labelledBy={headingId}>
      <Container className="flex min-h-[50vh] flex-col items-start justify-center gap-6">
        <Eyebrow id={headingId} tone={tone} line>
          {label}
        </Eyebrow>
        <p className="font-display text-[length:var(--text-h2)] font-light leading-tight">
          Seção em construção.
        </p>
        <p className="max-w-prose text-[length:var(--text-body)] opacity-70">
          O conteúdo desta seção entra na Fase 4. Por ora, esta rota confirma a
          navegação e a temperatura visual.
        </p>
        <Button onClick={goHome}>↳ Voltar ao cristal</Button>
      </Container>
    </Section>
  )
}
