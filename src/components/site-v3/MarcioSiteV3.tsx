import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./marcio-site-v3.css"

gsap.registerPlugin(ScrollTrigger)

const method = [
  ["N", "Navigate", "Mapeamento", "Contexto, gargalos e oportunidades antes de qualquer ferramenta."],
  ["E", "Engineer", "Estruturação", "Processos, prioridades e arquitetura para a solução funcionar."],
  ["S", "Solve", "Implementação", "Tecnologia aplicada ao fluxo real, com adoção e governança."],
  ["W", "Win", "Aceleração", "Métricas, aprendizado e evolução contínua sem perder o método."],
]

const corporateOffers = [
  ["01", "Diagnóstico estratégico", "Mapeamento e roadmap"],
  ["02", "Mentoria executiva", "Direção para desafios reais"],
  ["03", "Automações", "Processos e integrações"],
  ["04", "Treinamentos in-company", "Capacitação aplicada"],
  ["05", "Palestras", "Método e transformação"],
  ["06", "Aceleração digital", "Estratégia e execução"],
]

const educationalOffers = [
  ["01", "Acessibilidade educacional", "Audiobooks · videobooks · audiodescrição · materiais acessíveis"],
  ["02", "Produção audiovisual educacional", "Videoaulas · tutoriais · podcasts · roteiro, gravação e edição"],
]

function VoiceOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return

    const count = 420
    const goldenAngle = Math.PI * (3 - Math.sqrt(5))
    const particles = Array.from({ length: count }, (_, index) => {
      const z = 1 - (2 * (index + 0.5)) / count
      const radius = Math.sqrt(1 - z * z)
      const theta = index * goldenAngle
      const shell = 0.78 + ((index * 47) % 100) / 455
      return { x: Math.cos(theta) * radius * shell, y: Math.sin(theta) * radius * shell, z: z * shell, phase: index * 0.37 }
    })
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let frame = 0

    const render = (milliseconds = 0) => {
      const time = milliseconds / 1000
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      const bounds = canvas.getBoundingClientRect()
      if (canvas.width !== Math.round(bounds.width * ratio) || canvas.height !== Math.round(bounds.height * ratio)) {
        canvas.width = Math.round(bounds.width * ratio)
        canvas.height = Math.round(bounds.height * ratio)
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      context.clearRect(0, 0, bounds.width, bounds.height)
      context.globalCompositeOperation = "lighter"

      const centerX = bounds.width / 2
      const centerY = bounds.height / 2
      const scale = Math.min(bounds.width, bounds.height) * 0.39
      const rotationY = time * 0.19
      const rotationX = Math.sin(time * 0.28) * 0.2
      const cosY = Math.cos(rotationY)
      const sinY = Math.sin(rotationY)
      const cosX = Math.cos(rotationX)
      const sinX = Math.sin(rotationX)
      const breathing = 1 + Math.sin(time * 1.25) * 0.025

      particles.forEach((particle) => {
        const voiceWave = 1 + Math.sin(time * 2.15 + particle.phase + particle.y * 4.2) * 0.055
        const x1 = particle.x * voiceWave * breathing
        const y1 = particle.y * voiceWave * breathing
        const z1 = particle.z * voiceWave
        const rotatedX = x1 * cosY - z1 * sinY
        const rotatedZ = x1 * sinY + z1 * cosY
        const rotatedY = y1 * cosX - rotatedZ * sinX
        const depthZ = y1 * sinX + rotatedZ * cosX
        const perspective = 1 / (1.12 - depthZ * 0.16)
        const x = centerX + rotatedX * scale * perspective
        const y = centerY + rotatedY * scale * perspective
        const depth = Math.max(0, Math.min(1, (depthZ + 1) / 2))
        const size = 0.65 + depth * 1.35 + Math.sin(time * 2 + particle.phase) * 0.16
        const alpha = 0.18 + depth * 0.58

        context.fillStyle = `rgba(${Math.round(40 + depth * 46)}, ${Math.round(135 + depth * 53)}, 255, ${alpha})`
        context.beginPath()
        context.arc(x, y, Math.max(0.35, size), 0, Math.PI * 2)
        context.fill()
      })

      context.globalCompositeOperation = "source-over"
      if (!reduceMotion) frame = window.requestAnimationFrame(render)
    }

    render()
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return <canvas ref={canvasRef} className="mw-ai-orb" aria-hidden="true" />
}

function ClarityMap() {
  return (
    <div className="mw-clarity-map" role="img" aria-label="Sobrecarga, fragmentação e desalinhamento são transformados por clareza em prioridade, integração e direção.">
      <div className="mw-clarity-flow">
        <div className="mw-noise-cluster">
          {['SOBRECARGA', 'FRAGMENTAÇÃO', 'DESALINHAMENTO'].map((item) => <span className="mw-noise-node" key={item}>{item}<i aria-hidden="true" /></span>)}
        </div>
        <div className="mw-clarity-core">
          <VoiceOrb />
          <strong>CLAREZA</strong>
        </div>
        <div className="mw-direction-output">
          {['PRIORIDADE', 'INTEGRAÇÃO', 'DIREÇÃO'].map((item) => <span className="mw-output-node" key={item}>{item}<i aria-hidden="true" /></span>)}
        </div>
      </div>
    </div>
  )
}

function OfferCarousel({ items, label }: { items: string[][]; label: string }) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const interaction = useRef({ dragging: false, moved: false, startX: 0, startScroll: 0 })

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let previous = performance.now()
    const move = () => {
      const now = performance.now()
      const delta = Math.min(now - previous, 1000)
      previous = now
      if (!viewport.matches(":hover") && !interaction.current.dragging) {
        viewport.scrollLeft += delta * 0.095
        const midpoint = viewport.scrollWidth / 2
        if (viewport.scrollLeft >= midpoint) viewport.scrollLeft -= midpoint
      }
      const cards = Array.from(viewport.querySelectorAll<HTMLElement>(".mw-offer-track a"))
      const visualCenter = viewport.scrollLeft + viewport.clientWidth / 2
      let nearest = 0
      let distance = Number.POSITIVE_INFINITY
      cards.forEach((card, index) => {
        const current = Math.abs(card.offsetLeft + card.offsetWidth / 2 - visualCenter)
        if (current < distance) { nearest = index; distance = current }
      })
      cards.forEach((card, index) => card.classList.toggle("is-active", index === nearest))
    }
    const timer = window.setInterval(move, 32)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div
      className="mw-offer-viewport"
      ref={viewportRef}
      tabIndex={0}
      aria-label={`${label}. Arraste horizontalmente para explorar.`}
      onPointerDown={(event) => {
        if (event.pointerType === "mouse" && event.button !== 0) return
        const state = interaction.current
        state.dragging = true; state.moved = false; state.startX = event.clientX
        state.startScroll = event.currentTarget.scrollLeft
        event.currentTarget.setPointerCapture(event.pointerId)
      }}
      onPointerMove={(event) => {
        const state = interaction.current
        if (!state.dragging) return
        const distance = event.clientX - state.startX
        if (Math.abs(distance) > 5) state.moved = true
        event.currentTarget.scrollLeft = state.startScroll - distance
        if (state.moved) event.preventDefault()
      }}
      onPointerUp={(event) => {
        interaction.current.dragging = false
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
      }}
      onPointerCancel={() => { interaction.current.dragging = false }}
      onDragStart={(event) => event.preventDefault()}
      onClickCapture={(event) => {
        if (interaction.current.moved) { event.preventDefault(); interaction.current.moved = false }
      }}
    >
      <div className="mw-offer-track">
        {[0, 1].map((copy) => (
          <div className="mw-offer-set" key={copy} aria-hidden={copy === 1}>
            {items.map(([number, title, caption]) => (
              <a draggable="false" href="#contato" key={`${number}-${copy}`} tabIndex={copy ? -1 : 0}>
                <span>{number}</span><h3>{title}</h3><p>{caption}</p><i>↗</i>
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function EducationOffers() {
  return (
    <div className="mw-offer-track mw-offer-static" aria-label="Soluções para instituições de educação">
      {educationalOffers.map(([number, title, caption]) => (
        <a href="#contato" key={number}>
          <span>{number}</span><h3>{title}</h3><p>{caption}</p><i>↗</i>
        </a>
      ))}
    </div>
  )
}

function ProductOffer() {
  return (
    <a className="mw-product-offer" href="/arquiteto-viber">
      <div className="mw-product-offer-copy">
        <span>PRODUTO DIGITAL · 01</span>
        <h3>Arquiteto Viber</h3>
        <p>Framework profissional para criar produtos digitais com IA, arquitetura e segurança.</p>
        <strong>Conhecer o produto <i>↗</i></strong>
      </div>
      <img src="/marketing/arquiteto-viber/afiliados/bases/base-728x90.png" alt="Arquitetura digital em camadas protegidas" />
    </a>
  )
}

export function MarcioSiteV3() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return
    const context = gsap.context(() => {
      gsap.from(".mw-hero .mw-reveal", { yPercent: 110, duration: 1.25, stagger: 0.1, ease: "power4.out", delay: 0.2 })
      gsap.from(".mw-hero-art", { clipPath: "inset(0 0 100% 0)", duration: 1.6, ease: "power4.inOut", delay: 0.35 })
      const mobileHero = window.innerWidth <= 800
      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".mw-hero",
          start: "top top",
          end: mobileHero ? "+=68%" : "+=90%",
          scrub: mobileHero ? 0.75 : 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      heroTimeline
        .to(".mw-hero h1 .mw-line", { y: mobileHero ? -86 : -150, opacity: 0, stagger: 0.06, ease: "none" }, 0)
        .to(".mw-hero .mw-eyebrow", { y: mobileHero ? -48 : -80, opacity: 0, ease: "none" }, 0)
        .to(mobileHero ? ".mw-hero-bottom, .mw-hero-mobile-cta" : ".mw-hero-bottom", { y: mobileHero ? -46 : -70, opacity: 0, ease: "none" }, 0.04)
        .to(".mw-hero-art", { xPercent: mobileHero ? 18 : 24, scale: mobileHero ? 0.97 : 0.94, opacity: 0, ease: "power1.in" }, 0)
      gsap.utils.toArray<HTMLElement>(".mw-section-title, .mw-copy-reveal").forEach((element) => {
        gsap.from(element, { y: 80, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 86%" } })
      })
      const clarityTimeline = gsap.timeline({ scrollTrigger: { trigger: ".mw-signal", start: "top 8%", once: true } })
      clarityTimeline
        .from(".mw-noise-node", { y: 24, scale: 0.94, opacity: 0, duration: 0.58, stagger: 0.18, ease: "power3.out" })
        .from(".mw-clarity-core", { scale: 0.7, opacity: 0, duration: 0.8, ease: "back.out(1.45)" }, "-=0.08")
        .from(".mw-output-node", { y: 24, scale: 0.94, opacity: 0, duration: 0.58, stagger: 0.18, ease: "power3.out" }, "-=0.12")
      const compassTimeline = gsap.timeline({
        scrollTrigger: { trigger: ".mw-prism-section", start: "top top", end: "+=120%", scrub: 0.7, pin: ".mw-prism-stage", invalidateOnRefresh: true },
      })
      compassTimeline
        .to(".mw-compass-shell", { rotation: 360, scale: 1.04, duration: 1.1 }, 0)
        .to(".mw-compass-shell", { scale: 1, opacity: 0.82, duration: 0.65 }, 0.72)
        .to(".mw-compass", { left: "50%", scale: 1.2, opacity: 0.5, filter: "blur(1.5px) drop-shadow(0 0 48px #147BFF38)", duration: 1.15, ease: "power2.inOut" }, 0.72)
        .to(".mw-direction-marker", {
          x: (index, element) => {
            const card = rootRef.current?.querySelectorAll<HTMLElement>(".mw-method-card")[index]
            const cardGroup = card?.parentElement
            const cardDirection = card?.querySelector<HTMLElement>(".mw-card-direction")
            if (!card || !cardGroup || !cardDirection) return 0
            const marker = element as HTMLElement
            const sourceX = marker.offsetLeft + marker.offsetWidth / 2
            const targetX = cardGroup.offsetLeft + card.offsetLeft + cardDirection.offsetLeft + cardDirection.offsetWidth / 2
            return targetX - sourceX
          },
          y: (index, element) => {
            const card = rootRef.current?.querySelectorAll<HTMLElement>(".mw-method-card")[index]
            const cardGroup = card?.parentElement
            const cardDirection = card?.querySelector<HTMLElement>(".mw-card-direction")
            if (!card || !cardGroup || !cardDirection) return 0
            const marker = element as HTMLElement
            const sourceY = marker.offsetTop + marker.offsetHeight / 2
            const cardGroupVisualTop = cardGroup.offsetTop - cardGroup.offsetHeight / 2
            const targetY = cardGroupVisualTop + card.offsetTop + cardDirection.offsetTop + cardDirection.offsetHeight / 2
            return targetY - sourceY
          },
          scale: 1.15,
          duration: 1,
        }, 0.8)
        .to(".mw-prism-intro", { opacity: 0, y: -70, duration: 0.45 }, 0.7)
        .to(".mw-method-cards", { opacity: 1, y: 0, duration: 0.7 }, 1.25)
        .from(".mw-method-card", { y: 65, opacity: 0, stagger: 0.09, duration: 0.45 }, 1.3)
        .to(".mw-card-direction", { opacity: 0.28, scale: 1, duration: 0.5, stagger: 0.07 }, 1.5)
        .to(".mw-direction-marker", { opacity: 0, scale: 2.2, filter: "blur(12px)", duration: 0.48, stagger: 0.07 }, 1.5)
    }, rootRef)
    return () => context.revert()
  }, [])

  return (
    <div className="mw-site" ref={rootRef}>
      <header className="mw-header">
        <a className="mw-mark" href="#inicio" aria-label="Marcio Wecker — início">
          <img src="/images/logo/wordmark-branco.svg" alt="Marcio Wecker" />
        </a>
        <nav aria-label="Navegação principal"><a href="#sobre">Sobre</a><a href="#metodo">Método</a><a href="#solucoes">Soluções</a><a href="#contato">Contato</a></nav>
      </header>

      <main>
        <div className="mw-depth-zone">
          <div className="mw-shared-depth" aria-hidden="true">
            <i /><i />
            <img className="mw-depth-logo" src="/images/logo/wordmark-branco.svg" alt="" />
          </div>
        <section className="mw-hero" id="inicio">
          <div className="mw-hero-copy">
            <p className="mw-eyebrow"><span /> Estratégia · Operações · Tecnologia</p>
            <h1><span className="mw-line"><span className="mw-reveal">MARCIO</span></span><span className="mw-line outline"><span className="mw-reveal">WECKER</span></span></h1>
            <div className="mw-hero-bottom">
              <p>Transformo operações complexas<br />em <strong>sistemas que funcionam.</strong></p>
              <a className="mw-hero-primary-cta" href="#metodo">Veja como funciona <span>→</span></a>
            </div>
          </div>
          <figure className="mw-hero-art"><img src="/images/marcio/hero_png.png" alt="Retrato profissional de Marcio Wecker" /></figure>
          <a className="mw-hero-mobile-cta" href="#metodo">Veja como funciona <span>→</span></a>
        </section>

        <section className="mw-signal" id="sobre">
          <div className="mw-signal-visual"><ClarityMap /></div>
          <div className="mw-signal-copy">
            <p className="mw-eyebrow"><span /> Clareza para avançar</p>
            <h2 className="mw-section-title">COMPLEXIDADE<br />NÃO SE COMBATE<br /><em>COM MAIS RUÍDO.</em></h2>
            <p className="mw-copy-reveal">Atuo na intersecção entre estratégia, gestão e tecnologia. Do redesenho de processos à arquitetura de plataformas digitais, transformo problemas difusos em decisões, sistemas e avanço mensurável.</p>
            <div className="mw-signal-proof"><span>FORMAÇÃO AVANÇADA EM IA</span><span>PESQUISA APLICADA</span><span>OPERAÇÕES CORPORATIVAS</span></div>
          </div>
        </section>

        <section className="mw-manifesto">
          <p className="mw-eyebrow"><span /> Uma premissa simples</p>
          <h2 className="mw-section-title">NÃO VENDO<br /><span>FERRAMENTAS.</span><br />ESTRUTURO<br /><em>SOLUÇÕES.</em></h2>
          <p className="mw-copy-reveal">Tecnologia só cria valor quando encontra um problema bem definido, uma operação compreendida e pessoas preparadas para fazê-la funcionar.</p>
        </section>

        <section className="mw-prism-section" id="metodo">
          <div className="mw-prism-stage">
            <div className="mw-prism-intro"><p className="mw-eyebrow"><span /> Método NESW</p><h2>A ESTRUTURA<br /><em>REVELA O CAMINHO.</em></h2><p>Role para abrir o sistema</p></div>
            <div className="mw-compass" aria-hidden="true">
              <div className="mw-compass-shell">
                <i className="mw-compass-bezel" />
                <i className="mw-compass-ticks" />
                <i className="mw-compass-circle circle-one" />
                <i className="mw-compass-circle circle-two" />
                <small className="degree d0">0</small><small className="degree d90">90</small>
                <small className="degree d180">180</small><small className="degree d270">270</small>
              </div>
              <i className="mw-compass-needle"><span /><b /></i>
              <b className="mw-compass-pin" />
            </div>
            {["N", "E", "S", "W"].map((direction) => (
              <i className={`mw-direction-marker marker-${direction.toLowerCase()}`} key={direction}>
                <span>{direction}</span>
              </i>
            ))}
            <div className="mw-method-cards">
              {method.map(([direction, english, title, text]) => (
                <article className="mw-method-card" key={direction}>
                  <b className="mw-card-direction" aria-hidden="true">{direction}</b>
                  <span className="mw-method-name">{english}</span>
                  <h3>{title}</h3><p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mw-offers" id="solucoes">
          <header>
            <div><p className="mw-eyebrow"><span /> Onde posso atuar</p><h2 className="mw-section-title">SOLUÇÕES PARA<br /><em>ACELERAR COM MÉTODO.</em></h2></div>
          </header>
          <div className="mw-offer-group">
            <div className="mw-offer-group-heading"><span>01</span><h3>PARA EMPRESAS E LIDERANÇAS</h3><p>Estratégia, processos e tecnologia para transformar complexidade em operação.</p></div>
            <OfferCarousel items={corporateOffers} label="Soluções para empresas e lideranças" />
          </div>
          <div className="mw-offer-group is-education">
            <div className="mw-offer-group-heading"><span>02</span><h3>PRODUTOS DIGITAIS</h3><p>Frameworks prontos para transformar conhecimento em execução com método.</p></div>
            <ProductOffer />
          </div>
          <div className="mw-offer-group is-education">
            <div className="mw-offer-group-heading"><span>03</span><h3>PARA INSTITUIÇÕES DE EDUCAÇÃO</h3><p>Conteúdo e acessibilidade desenvolvidos por quem conhece esse mercado por dentro.</p></div>
            <EducationOffers />
          </div>
        </section>
        </div>

        <section className="mw-contact" id="contato">
          <div className="mw-contact-media">
            <figure className="mw-contact-portrait" aria-label="Retrato de Marcio Wecker">
              <span className="mw-portrait-sharp" />
              <span className="mw-portrait-soft" />
            </figure>
          </div>
          <div className="mw-contact-copy">
            <p className="mw-eyebrow"><span /> Próximo movimento</p>
            <h2 className="mw-section-title">O PRÓXIMO MOVIMENTO<br /><em>COMEÇA COM CLAREZA.</em></h2>
            <p>Se existe algo que precisa funcionar melhor, vamos começar pela conversa certa — antes da ferramenta.</p>
            <a className="mw-contact-cta" href="https://wa.me/5544998484630?text=Ol%C3%A1%20Marcio%2C%20vim%20pelo%20site%20e%20gostaria%20de%20conversar." target="_blank" rel="noreferrer">Vamos conversar? <span>↗</span></a>
          </div>
          <footer className="mw-footer">
            <div className="mw-footer-main">
              <a className="mw-footer-logo" href="#inicio" aria-label="Marcio Wecker — voltar ao início">
                <img src="/images/logo/monograma-branco.svg" alt="" />
              </a>
              <nav aria-label="Navegação do rodapé"><a href="#inicio">Início</a><a href="#sobre">Sobre</a><a href="#metodo">Método</a><a href="#solucoes">Serviços</a><a href="#contato">Contato</a></nav>
              <div className="mw-footer-social" aria-label="Redes sociais">
                <a className="mw-social-icon is-linkedin" href="https://www.linkedin.com/in/marcio-alexandre-wecker/" target="_blank" rel="noreferrer" aria-label="LinkedIn de Marcio Wecker"><span aria-hidden="true">in</span></a>
                <a className="mw-social-icon is-instagram" href="https://www.instagram.com/marcio.wecker/" target="_blank" rel="noreferrer" aria-label="Instagram de Marcio Wecker"><span aria-hidden="true" /></a>
                <a className="mw-social-icon is-youtube" href="https://www.youtube.com/@marcio.wecker" target="_blank" rel="noreferrer" aria-label="YouTube de Marcio Wecker"><span aria-hidden="true" /></a>
              </div>
            </div>
            <div className="mw-footer-legal"><span>© 2026 WECKER AI SOLUTIONS. TODOS OS DIREITOS RESERVADOS.</span><span>PARANÁ · BRASIL</span></div>
          </footer>
        </section>
      </main>
    </div>
  )
}
