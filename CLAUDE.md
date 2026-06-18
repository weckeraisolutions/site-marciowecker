# Site Marcio Wecker

Site profissional de Marcio Wecker, estrategista em mapeamento, método e aceleração.
Posicionamento: "Não vendo ferramentas. Estruturo soluções."

## Quick Start

```bash
npm install      # instalar dependências
npm run dev      # dev server
npm run build    # build de produção
npm run preview  # preview do build
npm run lint     # eslint
```

## Stack (fechada, não alterar sem autorização)

- Vite + React 18 + TypeScript
- Tailwind CSS v4 (config CSS-first via `@theme`, plugin `@tailwindcss/vite`. NÃO há `tailwind.config.ts`)
- Three.js + @react-three/fiber (v8) + @react-three/drei (v9) para o cristal-navegação
- GSAP + ScrollTrigger (animações de scroll)
- Lenis (smooth scroll)
- Framer Motion (micro-interações)
- React Router v6 (SPA com URLs reais para SEO)
- Hospedagem: Vercel (free tier). Domínio: marciowecker.com.br (a registrar)

## Code Style

- Linha: 100 caracteres. Aspas duplas. Prettier + ESLint.
- Componentes em PascalCase (.tsx). Hooks começam com `use`. Utilitários camelCase (.ts).
- Import alias: `@/` aponta para `src/`.
- Comentários só onde a intenção não é óbvia, em português.
- Logger/erros tratados, estados de loading, separação lógica/apresentação.

## Git Workflow

Branches: `feature/<descricao>` ou `fix/<descricao>`.
Commits (conventional): `feat(secao): ...`, `fix(estilo): ...`, `docs: ...`, `style: ...`.

## Key Rules

1. **Fonte de verdade do conteúdo: SEMPRE o vault Obsidian.** Nunca inventar copy.
   `G:\Meu Drive\MARCIO PESSOAL\IDENTIDADE E ESTRATÉGIA - MARCIO WECKER\`
   Briefing master: `Sistema/BRIEFING-MASTER.md`. Conteúdo do site: `.../Site_Profissional/Briefing_Conteudo.md`.

2. **Posicionamento (04/05/2026):**
   - Tag oficial: "Mapeamento, método e aceleração"
   - Frase-âncora: "Não vendo ferramentas. Estruturo soluções."
   - "IA" NUNCA é protagonista de chamada principal.
   - Ordem mental: Estratégia → Mapeamento → Método → Aceleração → IA.

3. **Ofertas (nomes pós-reposicionamento):** Diagnóstico estratégico (NUNCA "Diagnóstico de IA"),
   Implementação de automações, Aceleração digital (NUNCA "Aceleração Digital com IA"),
   Treinamentos in-company, Palestras, Mentoria executiva. Mais 4 educacionais (Acessibilidade,
   Audiovisual, Tecnologias e Projetos educacionais). Total: 10 ofertas em 2 blocos.

4. **Credencial acadêmica:** Marcio NÃO é "Mestre" ainda (mestrado em fase final).
   Usar variação C2: "Formação avançada em Inteligência Artificial, com pesquisa aplicada
   em educação e operações corporativas."

5. **Texto público:** PROIBIDO travessão (—). Sem AI-slop. Tom sóbrio, executivo, sem hype.
   Ver regras completas na skill `marcio-workflow` no vault.

6. **Identidade visual (definida, Executivo Dark):**
   - Paleta: #0B0B0D (ink) / #F4EFE6 (cream) / #C9A961 (champagne) / #8A6B2E (bronze) / #1E1E22 (graphite) / #8E8B85 (mute).
   - Tipografia: Fraunces (display) + Cabinet Grotesk (eyebrow/números) + Inter (corpo).
   - Sistema de duas temperaturas (preto → off-white → preto por seção).
   - Dourado: nunca em gradiente em UI, nunca preenchendo botão inteiro, nunca brilhante. Só linhas finas, números, eyebrow, bordas de hover.
   - Tokens em `src/styles/tokens.css` (`@theme`). Ver `Marca_Visual/Briefing_Identidade.md`.

7. **Cristal-Navegação (alma visual e navegação única do site):**
   - Icosahedron facetado dourado fosco. Click fragmenta nas faces; cada fragmento é uma seção.
   - **4 fragmentos** (data-driven em `src/content/sections.ts`): Sobre, Método, Ofertas, Contato.
     Mentoria é o card 06 dentro de Ofertas, não fragmento.
   - Navegação única (cristal) + topo fixo persistente (logo MW + WhatsApp). NÃO é navegação dual.
   - Mobile: versão simplificada. Referência: `Mockups/opcao-1-cristal-ESCOLHIDA.html` no vault.

8. **Seções:** Hero, Sobre, Método (4 passos), Ofertas (10 em 2 blocos), Cases (anônimos),
   Contato, Footer. Mais rotas `/privacidade` e 404. Momentos dedicados: frase-âncora e filosofia.

9. **Contatos oficiais:** email weckeraisolutions@gmail.com · WhatsApp +55 44 99848-4630 ·
   LinkedIn /in/marcio-alexandre-wecker/ · Instagram @marcio.wecker · Localização: Paraná, Brasil (sem cidade).

10. **Performance:** Lighthouse ≥ 95 desktop (≥ 90 mobile Performance). Cristal < 2.5s desktop / < 4s mobile.
    Imagens WebP/AVIF, lazy load, srcset. Fontes preload + display swap. Bundle inicial enxuto.

11. **SEO:** meta tags completas, Open Graph + Twitter Cards, Schema.org (Person, Organization, Service,
    ContactPoint), sitemap.xml + robots.txt, lang="pt-BR".

12. **Acessibilidade:** WCAG 2.1 AA. Contraste ≥ 4.5:1. Foco visível e desenhado. aria-label em ícones.
    Skip-to-content. Menu HTML tradicional para leitor de tela. Degrada sem JavaScript.

## Estrutura

```
src/
  main.tsx · App.tsx
  styles/    globals.css · tokens.css (@theme)
  components/ layout/ · crystal/ · sections/ · ui/
  hooks/     · lib/ (utils.ts: cn)
  content/   sections.ts (fragmentos) · site.ts (marca/contatos)
public/      favicon.svg · fonts/ · images/logo/ · robots.txt
```

## Analytics e privacidade

- Plausible Analytics (sem cookies, LGPD-friendly). Sem banner de cookies.
- Página `/privacidade` linkada só no footer.

## Antes de cada commit

1. `npm run lint` sem erros.
2. `npm run build` compila limpo.
3. Lighthouse ≥ 95 (desktop) na seção alterada.
4. Copy conferida contra o vault. Sem travessão, sem AI-slop.
