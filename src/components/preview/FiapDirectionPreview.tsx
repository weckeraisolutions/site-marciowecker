import { useEffect, useRef, useState } from "react"
import type { CSSProperties } from "react"
import "./fiap-direction-preview.css"

const paths = [
  { number: "01", title: "Sobre", caption: "Trajetória e visão" },
  { number: "02", title: "Método", caption: "Mapear antes de propor" },
  { number: "03", title: "Ofertas", caption: "Soluções que aceleram" },
  { number: "04", title: "Contato", caption: "Iniciar uma conversa" },
] as const

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

export function FiapDirectionPreview() {
  const revealRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 1350)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const section = revealRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const travel = Math.max(1, section.offsetHeight - window.innerHeight)
      setProgress(clamp(-rect.top / travel))
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const split = clamp((progress - 0.12) / 0.58)
  const labels = clamp((progress - 0.58) / 0.26)

  return (
    <div className="direction-preview">
      <div className={`direction-loader ${loaded ? "is-loaded" : ""}`} aria-hidden={loaded}>
        <img src="/images/logo/monograma-branco.svg" alt="" />
        <div><span /></div>
        <p>ESTRUTURANDO <strong>100%</strong></p>
      </div>

      <header className="direction-header">
        <a href="#inicio" aria-label="Marcio Wecker, início">
          <img src="/images/logo/monograma-branco.svg" alt="" />
        </a>
        <nav aria-label="Navegação principal">
          <a href="#sobre">Sobre</a>
          <a href="#metodo">Método</a>
          <a href="#ofertas">Ofertas</a>
          <a href="#contato">Contato</a>
        </nav>
        <a className="direction-header-cta" href="#contato">INICIAR CONVERSA</a>
      </header>

      <section id="inicio" className="direction-hero" aria-labelledby="direction-title">
        <div className="direction-orbit direction-orbit-a" aria-hidden="true" />
        <div className="direction-orbit direction-orbit-b" aria-hidden="true" />

        <div className="direction-hero-meta">
          <span>ESTRATÉGIA · OPERAÇÕES · TECNOLOGIA</span>
          <span>PARANÁ · BRASIL</span>
        </div>

        <div className="direction-hero-copy">
          <p className="direction-kicker">MAPEAMENTO, MÉTODO E ACELERAÇÃO</p>
          <h1 id="direction-title">
            <span>MARCIO</span>
            <span className="direction-outline">WECKER</span>
          </h1>
          <p className="direction-hero-statement">
            Transformo operações complexas
            <br />
            em <em>sistemas que funcionam.</em>
          </p>
        </div>

        <div className="direction-scroll-cue" aria-hidden="true">
          <span>ROLE PARA REVELAR</span>
          <i>↓</i>
        </div>
      </section>

      <section id="sobre" className="direction-about">
        <div className="direction-about-index">03 <span>SOBRE</span></div>
        <div className="direction-about-heading">
          <p className="direction-kicker">17 ANOS TRANSFORMANDO COMPLEXIDADE</p>
          <h2>ESTRATÉGIA QUE<br /><span>VIRA SISTEMA.</span></h2>
        </div>
        <figure>
          <img src="/images/marcio/marcio-sobre-retocado-v2.png" alt="Marcio Wecker em retrato profissional" />
          <figcaption>MW / 2026 · PARANÁ, BRASIL</figcaption>
        </figure>
        <div className="direction-about-copy">
          <p>
            Marcio Wecker é estrategista de negócios e tecnologia aplicada, com mais de 17 anos
            transformando operações complexas em sistemas que funcionam.
          </p>
          <p>
            Atua na intersecção entre estratégia, gestão e tecnologia, do redesenho de processos
            à arquitetura de plataformas digitais. O método vem antes da ferramenta. O problema,
            antes da tecnologia.
          </p>
          <div className="direction-about-proof">
            <span>FORMAÇÃO AVANÇADA EM INTELIGÊNCIA ARTIFICIAL</span>
            <span>PESQUISA APLICADA EM EDUCAÇÃO E OPERAÇÕES</span>
          </div>
        </div>
      </section>

      <section ref={revealRef} className="direction-reveal" aria-label="Navegação principal">
        <div className="direction-sticky">
          <div className="direction-index">
            <span>02</span>
            <span>A ESTRUTURA</span>
          </div>

          <div className="direction-reveal-copy" style={{ opacity: 1 - labels * 0.82 }}>
            <p>O PROBLEMA VEM PRIMEIRO.</p>
            <h2>
              A ESTRUTURA
              <br />
              <span>REVELA O CAMINHO.</span>
            </h2>
          </div>

          <div className="direction-crystal" style={{ "--split": split } as CSSProperties}>
            <span className="crystal-shard shard-one" />
            <span className="crystal-shard shard-two" />
            <span className="crystal-shard shard-three" />
            <span className="crystal-shard shard-four" />
            <span className="crystal-core" />
          </div>

          <nav className="direction-paths" style={{ "--labels": labels } as CSSProperties}>
            {paths.map((path) => (
              <a key={path.number} href={`/${path.title.toLowerCase()}`}>
                <span className="direction-path-number">{path.number}</span>
                <span className="direction-path-title">{path.title}</span>
                <span className="direction-path-caption">{path.caption}</span>
                <span className="direction-path-arrow">↗</span>
              </a>
            ))}
          </nav>

          <div className="direction-progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>
      </section>

      <section className="direction-manifesto">
        <p className="direction-kicker">UMA PREMISSA SIMPLES</p>
        <h2>
          NÃO VENDO
          <br />
          <span>FERRAMENTAS.</span>
          <br />
          ESTRUTURO
          <br />
          <span>SOLUÇÕES.</span>
        </h2>
        <div className="direction-manifesto-footer">
          <p>
            Estratégia antes da tecnologia. Mapeamento antes da proposta. Método antes da
            aceleração.
          </p>
          <a href="/contato">CONVERSAR SOBRE UM PROJETO ↗</a>
        </div>
      </section>

      <section id="metodo" className="direction-method-preview">
        <div>
          <p className="direction-kicker">COMO TRABALHO</p>
          <h2>QUATRO MOVIMENTOS. UMA DIREÇÃO.</h2>
        </div>
        <ol>
          {[
            ["01", "Mapeio"],
            ["02", "Estruturo"],
            ["03", "Implemento"],
            ["04", "Acelero"],
          ].map(([number, label]) => (
            <li key={number}>
              <span>{number}</span>
              <strong>{label}</strong>
            </li>
          ))}
        </ol>
        <p className="direction-preview-note">DO PROBLEMA AO RESULTADO, SEM ATALHOS ARTIFICIAIS.</p>
      </section>

      <section id="ofertas" className="direction-offers">
        <div className="direction-offers-heading">
          <p className="direction-kicker">O QUE POSSO ESTRUTURAR</p>
          <h2>SOLUÇÕES PARA<br /><span>ACELERAR COM MÉTODO.</span></h2>
        </div>
        <div className="direction-offer-group">
          <p>ESTRATÉGIA E TRANSFORMAÇÃO</p>
          {[
            ["01", "Diagnóstico estratégico", "Mapeamento, gargalos e roadmap priorizado"],
            ["02", "Implementação de automações", "Processos, integrações e handoff"],
            ["03", "Aceleração digital", "Estratégia, operação e implementação"],
            ["04", "Treinamentos in-company", "Capacitação aplicada ao negócio"],
            ["05", "Palestras", "Método, liderança e transformação"],
            ["06", "Mentoria executiva", "Direção aplicada a desafios reais"],
          ].map(([number, title, caption]) => (
            <a key={number} href="#contato">
              <span>{number}</span><strong>{title}</strong><em>{caption}</em><i>↗</i>
            </a>
          ))}
        </div>
        <div className="direction-offer-group is-secondary">
          <p>EDUCAÇÃO E TECNOLOGIA</p>
          {[
            ["07", "Acessibilidade educacional"],
            ["08", "Audiovisual educacional"],
            ["09", "Tecnologias educacionais"],
            ["10", "Projetos educacionais"],
          ].map(([number, title]) => (
            <a key={number} href="#contato"><span>{number}</span><strong>{title}</strong><i>↗</i></a>
          ))}
        </div>
      </section>

      <section className="direction-case">
        <div className="direction-case-media">
          <img src="/images/marcio/marcio-method.jpg" alt="Marcio Wecker" />
          <span>CASE / 01</span>
        </div>
        <div className="direction-case-copy">
          <p className="direction-kicker">MÉTODO EM MOVIMENTO</p>
          <h2>DE CONHECIMENTO INDIVIDUAL A NEGÓCIO DIGITAL ESTRUTURADO.</h2>
          <p>
            Mapeamento de uma operação de ensino consolidada, estruturação da oferta e desenho de
            uma plataforma preparada para escalar sem perder personalização.
          </p>
          <div><span>IDENTIDADE</span><span>PRODUTO DIGITAL</span><span>PLATAFORMA</span></div>
        </div>
      </section>

      <section id="contato" className="direction-contact">
        <p className="direction-kicker">PRÓXIMO MOVIMENTO</p>
        <h2>QUAL OPERAÇÃO<br />PRECISA <span>FUNCIONAR MELHOR?</span></h2>
        <div className="direction-contact-actions">
          <a href="https://wa.me/5544998484630?text=Ol%C3%A1%20Marcio%2C%20vim%20pelo%20site%20e%20quero%20conversar%20sobre%20um%20projeto." target="_blank" rel="noreferrer">
            CONVERSAR SOBRE UM PROJETO <span>↗</span>
          </a>
          <a href="mailto:weckeraisolutions@gmail.com">WECKERAISOLUTIONS@GMAIL.COM <span>↗</span></a>
        </div>
        <footer>
          <span>© 2026 MARCIO WECKER</span>
          <div><a href="https://www.linkedin.com/in/marcio-alexandre-wecker/">LINKEDIN</a><a href="https://instagram.com/marcio.wecker">INSTAGRAM</a></div>
          <span>PARANÁ · BRASIL</span>
        </footer>
      </section>
    </div>
  )
}
