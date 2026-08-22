import { useEffect, useRef, useState, type MouseEvent } from "react"
import {
  BadgeCheck,
  BriefcaseBusiness,
  ClipboardCheck,
  CodeXml,
  Network,
  PenTool,
  Rocket,
  ShieldCheck,
} from "lucide-react"
import "./arquiteto-viber-sales.css"

const HOTMART_CHECKOUT_URL = "https://pay.hotmart.com/H107259649Y?checkoutMode=2"
const HOTMART_WIDGET_SCRIPT = "https://static.hotmart.com/checkout/widget.min.js"
const HOTMART_WIDGET_STYLES = "https://static.hotmart.com/css/hotmart-fb.min.css"
const HOTMART_BRAND_OVERRIDE_ID = "arquiteto-viber-hotmart-brand-overrides"

const outcomes = [
  ["01", "Uma ideia que faz sentido", "Pesquisa de mercado, público e problema antes de investir tempo construindo."],
  ["02", "Um plano que você consegue seguir", "Escopo, prioridades, telas e decisões organizadas em uma sequência clara."],
  ["03", "Um produto que realmente funciona", "Interface, banco, autenticação e integrações tratados como um sistema único."],
  ["04", "Um lançamento que não depende de sorte", "Testes e segurança aprovados antes de colocar usuários e dados em risco."],
]

const professionals = [
  { role: "Gerente de Produto", responsibility: "Valida a oportunidade", description: "Investiga se a ideia resolve um problema real, para quem ela faz sentido e por que alguém escolheria essa solução. Assim, você evita construir no escuro e começa com uma proposta que pode encontrar espaço no mercado.", icon: BriefcaseBusiness },
  { role: "Gerente de Projeto", responsibility: "Transforma visão em plano", description: "Organiza tudo o que precisa acontecer, define prioridades e transforma uma ideia ampla em passos claros. Você sabe o que fazer agora, o que vem depois e o que pode esperar.", icon: ClipboardCheck },
  { role: "Arquiteto de Soluções", responsibility: "Desenha o sistema", description: "Planeja como as partes do produto irão funcionar juntas antes da construção. Isso reduz improvisos, retrabalho e decisões técnicas que poderiam limitar o crescimento da solução.", icon: Network },
  { role: "Designer de Produto", responsibility: "Projeta a experiência", description: "Transforma o funcionamento do produto em uma experiência simples e intuitiva. Cada tela e cada caminho são pensados para que o usuário entenda o que fazer e queira continuar.", icon: PenTool },
  { role: "Engenheiro de Software", responsibility: "Constrói o produto", description: "Converte o plano e as telas em um produto digital funcional, conectando interface, dados, acessos e integrações. A construção segue a arquitetura definida, sem depender de tentativas aleatórias.", icon: CodeXml },
  { role: "Engenheiro de Qualidade", responsibility: "Comprova o funcionamento", description: "Percorre os caminhos mais importantes do produto e procura falhas antes que elas cheguem ao cliente. O avanço acontece com evidências de funcionamento, não apenas porque a tela parece pronta.", icon: BadgeCheck },
  { role: "Engenheiro de Segurança", responsibility: "Protege usuários e dados", description: "Verifica acessos, informações sensíveis e pontos de exposição em sete camadas de segurança. Se houver uma falha crítica, o lançamento é bloqueado até que ela seja corrigida.", icon: ShieldCheck },
  { role: "Gerente de Lançamento", responsibility: "Autoriza a entrada no ar", description: "Confere se produto, testes, segurança e materiais estão realmente prontos para receber usuários. Só então organiza a publicação e transforma o projeto em uma entrega lançável.", icon: Rocket },
]

const salaryAnchors = [
  ["Gerente de Produto", "R$ 20 mil"],
  ["Gerente de Projeto", "R$ 23 mil"],
  ["Arquiteto de Soluções", "R$ 21 mil"],
  ["Designer de Produto", "R$ 12 mil"],
  ["Engenheiro de Software", "R$ 18 mil"],
  ["Engenheiro de Qualidade", "R$ 13 mil"],
  ["Engenheiro de Segurança", "R$ 18 mil"],
  ["Gerente de Lançamento", "R$ 18 mil"],
]

const securityLayers = [
  ["C1", "Autorização"], ["C2", "Segredos"], ["C3", "Autenticação"],
  ["C4", "Banco protegido"], ["C5", "Ambientes"], ["C6", "Sandbox"], ["C7", "Governança"],
]

const audiences = [
  ["Você tem uma ideia", "Quer criar um SaaS, aplicativo, portal ou ferramenta, mas não tem um time técnico."],
  ["Você já tentou", "Começou com IA, acumulou telas e prompts e travou quando o projeto ficou mais sério."],
  ["Você já constrói", "Usa Claude Code ou Codex e quer um processo repetível, documentado e seguro."],
  ["Você já publicou", "Tem um produto no ar e precisa verificar banco, acesso, autenticação e segredos."],
]

const deliverables = [
  ["Framework completo", "13 fases e 5 portões que organizam todo o trabalho."],
  ["Plugin instalável", "Funciona dentro do Claude Code ou Codex."],
  ["Segundo Cérebro", "Registra decisões, documentos, estado e próximos passos."],
  ["Auditoria em 7 camadas", "Bloqueia o lançamento quando encontra uma falha crítica."],
  ["Manual guiado", "Instalação e primeiro projeto explicados passo a passo."],
  ["Uso contínuo", "Instale uma vez e use nos próximos produtos da máquina ativada."],
]

const faq = [
  ["Preciso saber programar?", "Não. O framework conversa em português e conduz uma pergunta por vez. Quem programa continua tendo acesso ao rigor técnico e às evidências."],
  ["É um curso ou um pacote de prompts?", "Não. É uma ferramenta instalada no Claude Code ou no Codex. Ela conduz o trabalho, organiza os arquivos e verifica o avanço do projeto."],
  ["Preciso usar Claude Code e Codex juntos?", "Não. Apenas um deles é suficiente. Claude Code é o caminho mais simples para quem não quer usar terminal."],
  ["Serve para apenas um produto?", "Não. A licença permite usar o framework nos produtos criados na máquina ativada."],
  ["O que acontece quando a segurança encontra uma falha?", "O lançamento fica bloqueado. O problema é registrado, corrigido e testado novamente. Essa trava não pode ser ignorada."],
  ["Quanto tempo leva para instalar?", "A instalação guiada leva cerca de 15 minutos. Depois disso, você descreve sua ideia e inicia a primeira fase."],
]

function BuyLink({ children, className = "" }: { children: string; className?: string }) {
  const keepWidgetOnPage = (event: MouseEvent<HTMLAnchorElement>) => event.preventDefault()

  return <a className={`av-button hotmart-fb hotmart__button-checkout ${className}`} href={HOTMART_CHECKOUT_URL} onClick={keepWidgetOnPage}>{children}<span aria-hidden="true">→</span></a>
}

function InlineConversion({ text, action }: { text: string; action: string }) {
  return <div className="av-inline-cta av-reveal"><p>{text}</p><BuyLink>{action}</BuyLink></div>
}

type BrainParticle = {
  baseX: number
  baseY: number
  x: number
  y: number
  phase: number
  speed: number
  amplitude: number
  size: number
  accent: boolean
  orbit: boolean
  angle: number
  radiusX: number
  radiusY: number
}

function BrainParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let animationFrame = 0
    let particles: BrainParticle[] = []
    let width = 0
    let height = 0
    let centerX = 0
    let centerY = 0
    let pointerX = 0
    let pointerY = 0
    let pointerActive = false

    const seededRandom = (() => {
      let seed = 481516
      return () => {
        seed = (seed * 16807) % 2147483647
        return (seed - 1) / 2147483646
      }
    })()

    const insideBrain = (x: number, y: number) => {
      const ellipse = (cx: number, cy: number, rx: number, ry: number) =>
        ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1
      const mass =
        ellipse(-0.33, -0.23, 0.68, 0.68) ||
        ellipse(0.33, -0.23, 0.68, 0.68) ||
        ellipse(-0.27, 0.34, 0.58, 0.69) ||
        ellipse(0.27, 0.34, 0.58, 0.69)
      const topNotch = y < -0.68 && Math.abs(x) < 0.105
      const lowerTaper = y > 0.7 && Math.abs(x) > 0.38
      return mass && !topNotch && !lowerTaper
    }

    const rebuild = () => {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.7)
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      centerX = width * 0.5
      centerY = height * 0.49

      const scale = Math.min(width * 0.4, height * 0.41)
      const particleTarget = width < 420 ? 130 : 205
      const nextParticles: BrainParticle[] = []
      let attempts = 0

      while (nextParticles.length < particleTarget && attempts < particleTarget * 20) {
        attempts += 1
        const normalizedX = seededRandom() * 2.05 - 1.025
        const normalizedY = seededRandom() * 1.95 - 0.91
        if (!insideBrain(normalizedX, normalizedY)) continue
        const baseX = centerX + normalizedX * scale
        const baseY = centerY + normalizedY * scale * 0.9
        nextParticles.push({
          baseX,
          baseY,
          x: baseX,
          y: baseY,
          phase: seededRandom() * Math.PI * 2,
          speed: 0.45 + seededRandom() * 0.85,
          amplitude: 1.8 + seededRandom() * 4.8,
          size: seededRandom() > 0.9 ? 3.3 + seededRandom() * 2.5 : 1 + seededRandom() * 2.1,
          accent: seededRandom() > 0.72,
          orbit: false,
          angle: 0,
          radiusX: 0,
          radiusY: 0,
        })
      }

      const orbitCount = width < 420 ? 22 : 34
      for (let index = 0; index < orbitCount; index += 1) {
        const angle = seededRandom() * Math.PI * 2
        const radiusX = scale * (1.06 + seededRandom() * 0.35)
        const radiusY = scale * (0.78 + seededRandom() * 0.28)
        const baseX = centerX + Math.cos(angle) * radiusX
        const baseY = centerY + Math.sin(angle) * radiusY
        nextParticles.push({
          baseX,
          baseY,
          x: baseX,
          y: baseY,
          phase: seededRandom() * Math.PI * 2,
          speed: (seededRandom() > 0.5 ? 1 : -1) * (0.07 + seededRandom() * 0.12),
          amplitude: 2 + seededRandom() * 4,
          size: 0.9 + seededRandom() * 1.7,
          accent: seededRandom() > 0.8,
          orbit: true,
          angle,
          radiusX,
          radiusY,
        })
      }

      particles = nextParticles
    }

    const render = (timeValue: number) => {
      const time = timeValue * 0.001
      context.clearRect(0, 0, width, height)

      particles.forEach((particle) => {
        if (particle.orbit) {
          const angle = particle.angle + time * particle.speed
          particle.x = centerX + Math.cos(angle) * particle.radiusX + Math.sin(time * 0.8 + particle.phase) * particle.amplitude
          particle.y = centerY + Math.sin(angle) * particle.radiusY + Math.cos(time * 0.65 + particle.phase) * particle.amplitude
        } else {
          particle.x = particle.baseX + Math.sin(time * particle.speed + particle.phase) * particle.amplitude
          particle.y = particle.baseY + Math.cos(time * particle.speed * 0.78 + particle.phase * 1.3) * particle.amplitude
        }

        if (pointerActive) {
          const deltaX = pointerX - particle.x
          const deltaY = pointerY - particle.y
          const distance = Math.hypot(deltaX, deltaY)
          if (distance < 130) {
            const attraction = (1 - distance / 130) * 0.05
            particle.x += deltaX * attraction
            particle.y += deltaY * attraction
          }
        }
      })

      const connectionDistance = width < 420 ? 37 : 45
      context.lineWidth = 0.7
      particles.forEach((particle, index) => {
        let connections = 0
        for (let otherIndex = index + 1; otherIndex < particles.length && connections < 4; otherIndex += 1) {
          const other = particles[otherIndex]
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          if (distance > connectionDistance) continue
          const alpha = (1 - distance / connectionDistance) * (particle.accent || other.accent ? 0.31 : 0.14)
          context.strokeStyle = particle.accent || other.accent ? `rgba(20,123,255,${alpha})` : `rgba(190,218,255,${alpha})`
          context.beginPath()
          context.moveTo(particle.x, particle.y)
          context.lineTo(other.x, other.y)
          context.stroke()
          connections += 1
        }
      })

      particles.forEach((particle) => {
        const pulse = 1 + Math.sin(time * (1.2 + Math.abs(particle.speed)) + particle.phase) * 0.18
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size * pulse, 0, Math.PI * 2)
        context.fillStyle = particle.accent ? "rgba(45,145,255,.96)" : particle.orbit ? "rgba(176,207,243,.62)" : "rgba(216,232,250,.78)"
        context.shadowBlur = particle.accent ? 14 : 5
        context.shadowColor = particle.accent ? "#147bff" : "rgba(99,167,255,.45)"
        context.fill()
      })
      context.shadowBlur = 0

      if (!reduceMotion) animationFrame = window.requestAnimationFrame(render)
    }

    const resizeObserver = new ResizeObserver(() => {
      rebuild()
      if (reduceMotion) render(0)
    })
    const updatePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointerX = event.clientX - rect.left
      pointerY = event.clientY - rect.top
      pointerActive = true
    }
    const clearPointer = () => { pointerActive = false }

    resizeObserver.observe(canvas)
    canvas.addEventListener("pointermove", updatePointer)
    canvas.addEventListener("pointerleave", clearPointer)
    rebuild()
    render(0)

    return () => {
      resizeObserver.disconnect()
      canvas.removeEventListener("pointermove", updatePointer)
      canvas.removeEventListener("pointerleave", clearPointer)
      window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas ref={canvasRef} className="av-brain-canvas" role="img" aria-label="Cérebro digital formado por partículas e conexões em movimento" />
}

export function ArquitetoViberSalesPage() {
  const [activeProfessional, setActiveProfessional] = useState<(typeof professionals)[number] | null>(null)
  const professionalDialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (!document.querySelector(`link[href="${HOTMART_WIDGET_STYLES}"]`)) {
      const stylesheet = document.createElement("link")
      stylesheet.rel = "stylesheet"
      stylesheet.type = "text/css"
      stylesheet.href = HOTMART_WIDGET_STYLES
      document.head.appendChild(stylesheet)
    }

    // O widget precisa do CSS da Hotmart para o modal, mas ele também tenta
    // redesenhar o link de compra. Esta camada, inserida depois, preserva o
    // checkout e devolve aos CTAs o design system da página.
    if (!document.getElementById(HOTMART_BRAND_OVERRIDE_ID)) {
      const brandOverrides = document.createElement("style")
      brandOverrides.id = HOTMART_BRAND_OVERRIDE_ID
      brandOverrides.textContent = `
        .av-page a.av-button.hotmart-fb.hotmart__button-checkout {
          min-width: 265px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          gap: 24px !important;
          padding: 17px 22px !important;
          border: 1px solid #147bff !important;
          border-radius: 999px !important;
          background: #147bff !important;
          box-shadow: 0 18px 55px rgba(20,123,255,.21) !important;
          color: #fff !important;
          font: 700 10px/1.2 "AV Manrope", sans-serif !important;
          letter-spacing: .07em !important;
          text-align: left !important;
          text-decoration: none !important;
          text-transform: uppercase !important;
        }
        .av-page a.av-button.hotmart-fb.hotmart__button-checkout:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 24px 70px rgba(20,123,255,.31) !important;
        }
        .av-page a.av-button.hotmart-fb.hotmart__button-checkout:focus-visible,
        .av-page a.av-mobile-buy.hotmart-fb.hotmart__button-checkout:focus-visible {
          outline: 2px solid #fff !important;
          outline-offset: 4px !important;
        }
        .av-page a.av-header-button.hotmart-fb.hotmart__button-checkout {
          min-width: 160px !important;
          padding: 13px 18px !important;
          background: transparent !important;
          box-shadow: none !important;
        }
        .av-page a.av-mobile-buy.hotmart-fb.hotmart__button-checkout {
          display: none !important;
        }
        @media (max-width: 800px) {
          .av-page a.av-header-button.hotmart-fb.hotmart__button-checkout {
            min-width: 142px !important;
            padding: 12px 15px !important;
            font-size: 8px !important;
          }
          .av-page a.av-mobile-buy.hotmart-fb.hotmart__button-checkout {
            position: fixed !important;
            z-index: 40 !important;
            right: 12px !important;
            bottom: 12px !important;
            left: 12px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            padding: 16px 20px !important;
            border: 0 !important;
            border-radius: 999px !important;
            background: #147bff !important;
            box-shadow: 0 15px 50px rgba(0,0,0,.8) !important;
            color: #fff !important;
            font: 700 9px/1.2 "AV Manrope", sans-serif !important;
            letter-spacing: .08em !important;
            text-decoration: none !important;
            text-transform: uppercase !important;
          }
        }
      `
      document.head.appendChild(brandOverrides)
    }

    if (!document.querySelector(`script[src="${HOTMART_WIDGET_SCRIPT}"]`)) {
      const script = document.createElement("script")
      script.src = HOTMART_WIDGET_SCRIPT
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

  useEffect(() => {
    const oldTitle = document.title
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const oldDescription = description?.content
    const metadata = [
      ["property", "og:title", "Arquiteto Viber · Da ideia ao produto digital seguro"],
      ["property", "og:description", "Transforme uma ideia em um produto digital estruturado, testado e seguro com um framework que trabalha ao seu lado."],
      ["property", "og:image", `${window.location.origin}/marketing/arquiteto-viber/og-arquiteto-viber.png`],
      ["property", "og:type", "website"],
      ["name", "twitter:card", "summary_large_image"],
    ] as const
    const inserted: HTMLMetaElement[] = []

    document.title = "Arquiteto Viber · Da ideia ao produto digital seguro"
    if (description) description.content = "Transforme uma ideia em um produto digital estruturado, testado e seguro com um framework que trabalha ao seu lado."
    metadata.forEach(([attribute, key, content]) => {
      const meta = document.createElement("meta")
      meta.setAttribute(attribute, key)
      meta.content = content
      document.head.appendChild(meta)
      inserted.push(meta)
    })

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    )
    document.querySelectorAll(".av-reveal").forEach((item) => observer.observe(item))

    return () => {
      observer.disconnect()
      inserted.forEach((meta) => meta.remove())
      document.title = oldTitle
      if (description && oldDescription) description.content = oldDescription
    }
  }, [])

  useEffect(() => {
    const dialog = professionalDialogRef.current
    if (!activeProfessional || !dialog) return

    const previousOverflow = document.body.style.overflow
    if (!dialog.open) dialog.showModal()
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [activeProfessional])

  const closeProfessionalDialog = () => professionalDialogRef.current?.close()

  return (
    <div className="av-page" id="topo">
      <div className="av-topline">Framework profissional para criar produtos com IA <span>•</span> Instalação em cerca de 15 minutos</div>
      <header className="av-header">
        <a href="/" className="av-brand" aria-label="Marcio Wecker — voltar ao site"><img src="/images/logo/wordmark-branco.svg" alt="Marcio Wecker" /></a>
        <nav className="av-nav" aria-label="Navegação da página"><a href="#transformacao">O que muda</a><a href="#como-funciona">Como funciona</a><a href="#seguranca">Segurança</a><a href="#oferta">Oferta</a></nav>
        <BuyLink className="av-header-button">Começar agora</BuyLink>
      </header>

      <main>
        <section className="av-hero" aria-labelledby="av-title">
          <div className="av-grid" aria-hidden="true" />
          <div className="av-hero-copy av-reveal">
            <p className="av-eyebrow"><span /> Não é curso. É o processo instalado.</p>
            <h1 id="av-title">TRANSFORME SUA IDEIA<br />EM UM PRODUTO<br /><em>PRONTO PARA LANÇAR.</em></h1>
            <p className="av-lead">O Arquiteto Viber transforma uma conversa com IA em um caminho completo: pesquisa, plano, arquitetura, telas, construção, testes e segurança.</p>
            <div className="av-actions"><BuyLink>Começar meu produto</BuyLink><a className="av-text-link" href="#transformacao">Ver o que ele faz</a></div>
            <ul className="av-hero-notes"><li>Conversa em português</li><li>Para iniciantes e profissionais</li><li>Claude Code ou Codex</li></ul>
          </div>

          <div className="av-product-stage av-reveal" aria-label="Visão geral do Arquiteto Viber">
            <img src="/marketing/arquiteto-viber/afiliados/bases/base-336x280.png" alt="Arquitetura digital em camadas representando o Arquiteto Viber" />
            <div className="av-stage-card av-stage-top"><span>VOCÊ TRAZ</span><strong>UMA IDEIA</strong></div>
            <div className="av-stage-card av-stage-bottom"><span>VOCÊ TERMINA COM</span><strong>UM PRODUTO PRONTO PARA LANÇAR</strong></div>
            <div className="av-stage-status"><i /> SEGURANÇA: 7/7 PASS</div>
          </div>

          <div className="av-proof" aria-label="Estrutura do produto"><span><strong>13</strong> fases conectadas</span><span><strong>5</strong> decisões obrigatórias</span><span><strong>7</strong> camadas de segurança</span><span><strong>1</strong> processo para seus próximos produtos</span></div>
        </section>

        <section className="av-outcomes av-section" id="transformacao" aria-labelledby="outcomes-title">
          <header className="av-section-heading av-reveal"><p className="av-eyebrow"><span /> O resultado que importa</p><h2 id="outcomes-title">VOCÊ PARA DE TENTAR ADIVINHAR.<br /><em>E COMEÇA A AVANÇAR.</em></h2><p>O framework absorve a complexidade e mostra apenas a próxima decisão necessária.</p></header>
          <div className="av-outcome-grid">{outcomes.map(([number, title, text]) => <article className="av-outcome-card av-reveal" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section className="av-before-after av-section" aria-labelledby="before-title">
          <header className="av-section-heading av-reveal"><p className="av-eyebrow"><span /> A transformação</p><h2 id="before-title">DO IMPROVISO<br /><em>PARA UM SISTEMA.</em></h2></header>
          <div className="av-contrast av-reveal">
            <div className="av-contrast-before"><span className="av-contrast-mark" aria-hidden="true">×</span><div className="av-contrast-label"><i aria-hidden="true">×</i><small>SEM O ARQUITETO VIBER</small></div><h3>“A IA gerou uma tela.<br />E agora?”</h3><ul><li>Prompts e decisões espalhados</li><li>Escopo mudando o tempo todo</li><li>Banco, login e segurança deixados para depois</li><li>Nenhuma certeza de que pode publicar</li></ul></div>
            <span className="av-contrast-transition" aria-hidden="true">→</span>
            <div className="av-contrast-after"><span className="av-contrast-mark" aria-hidden="true">✓</span><div className="av-contrast-label"><i aria-hidden="true">✓</i><small>COM O ARQUITETO VIBER</small></div><h3>“Eu sei onde estou.<br />E qual é o próximo passo.”</h3><ul><li>Cada fase tem uma entrega clara</li><li>Decisões ficam registradas</li><li>O produto é construído como sistema</li><li>O lançamento exige evidências reais</li></ul></div>
          </div>
          <InlineConversion text="Troque o improviso por um processo que mostra exatamente qual é o próximo passo." action="Iniciar com método" />
        </section>

        <section className="av-process av-section" id="como-funciona" aria-labelledby="process-title">
          <header className="av-section-heading av-reveal"><p className="av-eyebrow"><span /> Uma equipe inteira dentro do framework</p><h2 id="process-title">DA IDEIA AO AR.<br /><em>SEM PULAR O QUE SUSTENTA.</em></h2><p>O Arquiteto Viber assume oito papéis profissionais e traz a especialidade certa para cada decisão do produto.</p></header>
          <div className="av-process-line" aria-label="Equipe profissional do Arquiteto Viber">{professionals.map(({ role, responsibility, icon: Icon }, index) => <article className="av-process-card av-reveal" key={role}><button className="av-process-trigger" type="button" onClick={() => setActiveProfessional(professionals[index])} aria-haspopup="dialog" aria-label={`Conhecer a atuação do agente de IA ${role}`}><div className="av-process-top"><span>0{index + 1}</span><div className="av-process-icon"><Icon size={23} strokeWidth={1.5} aria-hidden="true" /></div></div><span className="av-process-role">{role}</span><span className="av-agent-label">Agente de IA</span><strong>{responsibility}</strong><span className="av-process-open">Conhecer atuação <i aria-hidden="true">↗</i></span></button></article>)}</div>
          <div className="av-memory av-reveal"><div className="av-memory-visual"><BrainParticleField /></div><div className="av-memory-copy"><p className="av-eyebrow"><span /> Segundo Cérebro incluído</p><h3>O trabalho não desaparece quando a conversa termina.</h3><p>Cada decisão, documento, evidência e próximo passo fica salvo na pasta do projeto. Feche a sessão hoje e continue amanhã sem reconstruir o contexto.</p></div></div>
        </section>

        <section className="av-difference av-section" aria-labelledby="difference-title">
          <header className="av-section-heading av-reveal"><p className="av-eyebrow"><span /> A diferença essencial</p><h2 id="difference-title">CONTEÚDO ENSINA.<br /><em>O ARQUITETO VIBER FAZ JUNTO.</em></h2></header>
          <div className="av-comparison av-reveal">
            <div className="av-comparison-before"><span className="av-comparison-mark" aria-hidden="true">×</span><div className="av-comparison-label"><i aria-hidden="true">×</i><small>CURSO / PROMPTS</small></div><p>Você aprende ou copia instruções e depois precisa adaptar tudo sozinho.</p><span>Você carrega o processo.</span></div>
            <span className="av-comparison-transition" aria-hidden="true">→</span>
            <div className="av-comparison-after"><span className="av-comparison-mark" aria-hidden="true">✓</span><div className="av-comparison-label"><i aria-hidden="true">✓</i><small>ARQUITETO VIBER</small></div><p>O framework conduz, documenta, revisa e bloqueia o avanço quando algo importante não está pronto.</p><span>O processo carrega você.</span></div>
          </div>
          <InlineConversion text="Se você não precisa de mais conteúdo, escolha um processo pronto para trabalhar ao seu lado." action="Adquirir o Arquiteto Viber" />
        </section>

        <section className="av-security av-section" id="seguranca" aria-labelledby="security-title">
          <div className="av-security-copy av-reveal"><p className="av-eyebrow"><span /> O diferencial que protege seu futuro</p><h2 id="security-title">SE NÃO ESTÁ SEGURO,<br /><em>NÃO VAI AO AR.</em></h2><p>Produtos feitos com IA podem parecer prontos e ainda deixar dados, chaves ou contas expostos. O Arquiteto Viber trata segurança como uma condição de lançamento.</p><div className="av-gate"><span>GATE DE LANÇAMENTO</span><strong>7 PASS OU 0 PUBLICAÇÃO</strong><small>A trava não pode ser ignorada, nem a pedido do usuário.</small></div></div>
          <div className="av-security-grid">{securityLayers.map(([code, title]) => <article className="av-security-card av-reveal" key={code}><span>{code}</span><h3>{title}</h3><i>PASS</i></article>)}</div>
        </section>

        <section className="av-audience av-section" aria-labelledby="audience-title">
          <header className="av-section-heading av-reveal"><p className="av-eyebrow"><span /> Ele começa do ponto em que você está</p><h2 id="audience-title">PARA QUEM TEM UMA IDEIA.<br /><em>E PARA QUEM JÁ FOI LONGE DEMAIS SEM PROCESSO.</em></h2></header>
          <div className="av-audience-grid">{audiences.map(([title, text]) => <article className="av-audience-card av-reveal" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section className="av-delivery av-section" aria-labelledby="delivery-title">
          <header className="av-section-heading av-reveal"><p className="av-eyebrow"><span /> Tudo o que acompanha o produto</p><h2 id="delivery-title">INSTALE UMA VEZ.<br /><em>CRIE COM MÉTODO DAQUI EM DIANTE.</em></h2></header>
          <div className="av-delivery-grid">{deliverables.map(([title, text], index) => <article className="av-delivery-card av-reveal" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section className="av-install av-section" aria-labelledby="install-title"><div className="av-install-number av-reveal"><strong>15</strong><span>MINUTOS</span><small>aproximadamente</small></div><div className="av-install-copy av-reveal"><p className="av-eyebrow"><span /> Comece sem complicação</p><h2 id="install-title">ADQUIRA. INSTALE.<br /><em>CONTE SUA IDEIA.</em></h2><ol><li><span>1</span>Conclua sua aquisição</li><li><span>2</span>Instale no Claude Code ou Codex</li><li><span>3</span>Ative com o e-mail da compra</li><li><span>4</span>Inicie seu primeiro produto</li></ol></div></section>

        <section className="av-offer av-section" id="oferta" aria-labelledby="offer-title">
          <div className="av-value-anchor av-reveal" aria-labelledby="value-anchor-title"><span className="av-value-x" aria-hidden="true">×</span><div className="av-value-heading"><p className="av-value-eyebrow"><i aria-hidden="true">×</i> O CUSTO DE MONTAR ESSA EQUIPE</p><h2 id="value-anchor-title">OITO ESPECIALIDADES SÊNIORES.<br /><em>MAIS DE R$ 140 MIL TODOS OS MESES.</em></h2><p>Reunir profissionais experientes para cobrir produto, projeto, arquitetura, design, engenharia, qualidade, segurança e lançamento exige uma estrutura que poucas ideias conseguem bancar.</p></div><div className="av-salary-grid">{salaryAnchors.map(([role, value]) => <div key={role}><span>{role}</span><strong>{value}<small>/mês</small></strong></div>)}</div><div className="av-value-total"><small>REFERÊNCIA MENSAL SOMADA</small><strong>R$ 143 MIL</strong><span>mais de R$ 1,7 milhão em 12 meses — antes de encargos, benefícios e recrutamento.</span></div><p className="av-value-note">Estimativa ilustrativa para funções de nível sênior ou especialista, baseada em referências nacionais de remuneração de 2026. O framework organiza perspectivas especializadas, mas não substitui profissionais habilitados nem responsabilidade técnica. Fontes: <a href="https://sindpd.org.br/wp-content/uploads/2026/06/guia-salarial-2026-tecnologia-michael-page-brasil.pdf" target="_blank" rel="noreferrer">Guia Salarial 2026</a> e <a href="https://www.glassdoor.com.br/Sal%C3%A1rios/index.htm" target="_blank" rel="noreferrer">Glassdoor Brasil</a>.</p></div>
          <div className="av-offer-panel av-reveal"><div className="av-offer-copy"><p className="av-eyebrow"><span /> Arquiteto Viber</p><h2 id="offer-title">SEU PRÓXIMO PRODUTO<br /><em>NÃO PRECISA COMEÇAR NO ESCURO.</em></h2><p>Um pagamento. Um processo completo. Todos os produtos que você criar depois na máquina ativada.</p><ul><li>Framework + plugin</li><li>Segundo Cérebro</li><li>Manual de instalação</li><li>Auditoria em 7 camadas</li><li>Uso nos seus próximos projetos</li><li>Suporte por e-mail</li></ul></div><div className="av-price"><span>Pagamento único</span><div className="av-price-value"><span>R$</span><strong>497</strong></div><p>Em até 12x</p><BuyLink>Adquirir agora</BuyLink><small>Você precisa ter Claude Code ou Codex instalado. Apenas um deles é suficiente.</small></div></div>
        </section>

        <section className="av-faq av-section" aria-labelledby="faq-title"><header className="av-faq-heading av-reveal"><p className="av-eyebrow"><span /> Perguntas diretas</p><h2 id="faq-title">ANTES DE<br /><em>COMEÇAR.</em></h2></header><div className="av-faq-list av-reveal">{faq.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>0{index + 1}</span>{question}<i>+</i></summary><p>{answer}</p></details>)}</div></section>

        <section className="av-final" aria-labelledby="final-title"><div className="av-final-ring" aria-hidden="true" /><p className="av-final-kicker">SUA IDEIA JÁ EXISTE.</p><h2 id="final-title">DÊ A ELA UM CAMINHO<br /><em>ATÉ O LANÇAMENTO.</em></h2><p className="av-final-copy">Em vez de começar com mais um prompt, comece com um processo que pesquisa, organiza, constrói, testa e protege o seu produto.</p><BuyLink>Começar agora</BuyLink><span className="av-final-price">R$ 497 · pagamento único · em até 12x</span></section>
      </main>

      <dialog className="av-professional-dialog" ref={professionalDialogRef} onClose={() => setActiveProfessional(null)} onClick={(event) => event.target === event.currentTarget && closeProfessionalDialog()} aria-labelledby="av-dialog-title" aria-describedby="av-dialog-description">
        {activeProfessional && <div className="av-dialog-panel"><button className="av-dialog-close" type="button" onClick={closeProfessionalDialog} aria-label="Fechar detalhes do agente">×</button><div className="av-dialog-icon" aria-hidden="true"><activeProfessional.icon size={29} strokeWidth={1.4} /></div><span className="av-agent-label">Agente de IA</span><h2 id="av-dialog-title">{activeProfessional.role}</h2><strong>{activeProfessional.responsibility}</strong><p id="av-dialog-description">{activeProfessional.description}</p><button className="av-dialog-action" type="button" onClick={closeProfessionalDialog}>Entendi <span aria-hidden="true">→</span></button></div>}
      </dialog>

      <footer className="av-footer"><a href="/" aria-label="Voltar ao site de Marcio Wecker"><img src="/images/logo/monograma-branco.svg" alt="" /></a><p>© {new Date().getFullYear()} WECKER AI SOLUTIONS<br /><span>Todos os direitos reservados.</span></p><nav><a href="#transformacao">O que muda</a><a href="#como-funciona">Como funciona</a><a href="#seguranca">Segurança</a><a href="mailto:weckeraisolutions@gmail.com">Suporte</a></nav></footer>
      <a className="av-mobile-buy hotmart-fb hotmart__button-checkout" href={HOTMART_CHECKOUT_URL} onClick={(event) => event.preventDefault()}>Adquirir agora<span>→</span></a>
    </div>
  )
}
