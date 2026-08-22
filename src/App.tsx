import { Routes, Route, useLocation } from "react-router-dom"
import { SITE_SECTIONS } from "@/content/sections"
import { CrystalNavProvider } from "@/components/crystal/CrystalNavProvider"
import { AccessibilityNav } from "@/components/layout/AccessibilityNav"
import { TopBar } from "@/components/layout/TopBar"
import { Footer } from "@/components/layout/Footer"
import { Section } from "@/components/ui/Section"
import { Container } from "@/components/ui/Container"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { SectionPlaceholder } from "@/components/sections/SectionPlaceholder"
import { MarcioSiteV3 } from "@/components/site-v3/MarcioSiteV3"
import { ArquitetoViberSalesPage } from "@/components/arquiteto-viber/ArquitetoViberSalesPage"

/** Temperatura de cada seção conforme o sistema de duas temperaturas (vault). */
const SECTION_TEMPERATURE: Record<string, "dark" | "cream"> = {
  sobre: "cream",
  metodo: "dark",
  ofertas: "dark",
  contato: "dark",
}

function NotFound() {
  return (
    <Section temperature="dark" labelledBy="nf-eyebrow">
      <Container className="flex min-h-[50vh] flex-col items-start justify-center gap-6">
        <Eyebrow id="nf-eyebrow" tone="champagne" line>
          404
        </Eyebrow>
        <p className="font-display text-[length:var(--text-h2)] font-light">
          Esta rota não existe no método.
        </p>
      </Container>
    </Section>
  )
}

function App() {
  const location = useLocation()
  // Sites publica rotas com e sem barra final. Normalizar o caminho evita que
  // o layout institucional seja montado por cima das páginas imersivas.
  const normalizedPath = location.pathname.replace(/\/+$/, "") || "/"
  const immersive = normalizedPath === "/" || normalizedPath === "/arquiteto-viber"

  return (
    <CrystalNavProvider>
      <AccessibilityNav />
      {!immersive && <TopBar />}

      <main id="conteudo" className={immersive ? "" : "pt-14 sm:pt-16"}>
        <Routes>
          <Route path="/" element={<MarcioSiteV3 />} />
          <Route path="/arquiteto-viber" element={<ArquitetoViberSalesPage />} />
          {SITE_SECTIONS.map((section) => (
            <Route
              key={section.id}
              path={section.route}
              element={
                <SectionPlaceholder
                  id={section.id}
                  label={section.label}
                  temperature={SECTION_TEMPERATURE[section.id]}
                />
              }
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!immersive && <Footer />}
    </CrystalNavProvider>
  )
}

export default App
