import { SITE } from "@/content/site"

/**
 * Placeholder da Fase 1 (setup). Confirma tokens, fontes e build.
 * Será substituído pelas seções reais a partir da Fase 4.
 */
function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ink px-6 text-center">
      <p className="font-eyebrow text-xs uppercase tracking-[0.35em] text-champagne">
        {SITE.tagline}
      </p>
      <h1 className="font-display text-5xl font-light text-cream sm:text-6xl">
        {SITE.name}
      </h1>
      <p className="font-eyebrow text-[0.7rem] uppercase tracking-[0.3em] text-mute">
        {SITE.anchor}
      </p>
    </main>
  )
}

export default App
