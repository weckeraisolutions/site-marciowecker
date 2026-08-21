import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Lightformer } from "@react-three/drei"
import { useReducedMotion } from "framer-motion"
import { MathUtils, type Group } from "three"
import { cn } from "@/lib/utils"
import { CRYSTAL, CRYSTAL_MOTION, SHARDS, buildCrystalShards } from "@/lib/three-utils"
import { SITE_SECTIONS } from "@/content/sections"
import { useCrystalNav } from "@/hooks/useCrystalNav"
import { Shard } from "./Shard"
import { Particles } from "./Particles"

interface CrystalRigProps {
  expanded: boolean
  reducedMotion: boolean
  onExpand: () => void
  onSelect: (id: string) => void
}

/**
 * Conteúdo da cena (dentro do Canvas). O grupo-pai gira e respira (Estado A); as
 * cascas explodem para fora conforme o progresso (Estado B). Progresso num ref
 * (lerp por frame, sem re-render); hover em estado React.
 */
function CrystalRig({ expanded, reducedMotion, onExpand, onSelect }: CrystalRigProps) {
  const progress = useRef(0)
  const root = useRef<Group>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const shards = useMemo(() => buildCrystalShards(SHARDS.radius, SITE_SECTIONS.length), [])

  // Libera as geometrias ao desmontar.
  useEffect(() => () => shards.forEach((s) => s.geometry.dispose()), [shards])

  useFrame((state, delta) => {
    progress.current = MathUtils.lerp(progress.current, expanded ? 1 : 0, 0.08)
    const p = progress.current
    const g = root.current
    if (!g || reducedMotion) return

    if (expanded) {
      // Assenta na orientação limpa (leque cardinal: topo/direita/baixo/esquerda).
      g.rotation.x = MathUtils.lerp(g.rotation.x, 0, 0.1)
      g.rotation.y = MathUtils.lerp(g.rotation.y, 0, 0.1)
      g.rotation.z = MathUtils.lerp(g.rotation.z, 0, 0.1)
      g.scale.setScalar(1)
    } else {
      g.rotation.y += delta * CRYSTAL_MOTION.rotationY
      g.rotation.x += delta * CRYSTAL_MOTION.rotationX
      // Pulse respiratório só quando montado (some na explosão).
      const t = state.clock.elapsedTime
      const osc =
        Math.sin((t * Math.PI * 2) / CRYSTAL_MOTION.breathCycle) * CRYSTAL_MOTION.breathAmplitude
      g.scale.setScalar(1 + osc * (1 - p))
    }
  })

  return (
    <group ref={root}>
      {shards.map((shard, i) => {
        const section = SITE_SECTIONS[i]
        if (!section) return null
        return (
          <Shard
            key={section.id}
            label={section.label}
            geometry={shard.geometry}
            direction={shard.direction}
            progressRef={progress}
            expanded={expanded}
            hovered={hoveredId === section.id}
            dimmed={hoveredId !== null && hoveredId !== section.id}
            onHover={(value) => setHoveredId(value ? section.id : null)}
            onActivate={() => (expanded ? onSelect(section.id) : onExpand())}
          />
        )
      })}
    </group>
  )
}

interface CrystalSceneProps {
  className?: string
}

/**
 * Camada de fundo com a cena 3D do cristal. Captura ponteiro para permitir clicar
 * no cristal (fratura) e nas cascas (navega). Clicar no vazio reagrupa.
 */
export function CrystalScene({ className }: CrystalSceneProps) {
  // Em produção respeita prefers-reduced-motion (WCAG). Em dev, anima sempre para
  // permitir avaliar o movimento sem alterar as configurações do sistema.
  const reduced = (useReducedMotion() ?? false) && !import.meta.env.DEV
  const { state, expand, collapse, goToSection } = useCrystalNav()
  const expanded = state === "expanded"

  return (
    <div className={cn("absolute inset-0", className)} aria-hidden="true">
      {/* Profundidade: brilho dourado discreto no centro desvanecendo para o preto-tinta. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(201,169,97,0.10), rgba(201,169,97,0.03) 35%, transparent 68%)",
        }}
      />
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = 1.05
        }}
        onPointerMissed={() => {
          if (expanded) collapse()
        }}
      >
        <fog attach="fog" args={[CRYSTAL.ink, 8, 18]} />

        {/* Luz ambiente baixa + chave dourada + recorte (rim) por trás para desenhar arestas. */}
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 4, 5]} intensity={1.1} color={CRYSTAL.gold} />
        <spotLight
          position={[0, 3, -6]}
          angle={0.6}
          penumbra={1}
          intensity={3}
          color={CRYSTAL.gold}
        />

        {/* Estúdio procedural (sem download): reflexos suaves no dourado fosco. */}
        <Environment resolution={256} frames={1}>
          <Lightformer intensity={2} position={[0, 2, 4]} scale={[7, 7, 1]} color="#ffffff" />
          <Lightformer intensity={1.4} position={[-4, 1, 2]} scale={[3, 8, 1]} color={CRYSTAL.gold} />
          <Lightformer intensity={1} position={[4, -1, 2]} scale={[3, 8, 1]} color="#ffffff" />
        </Environment>

        <Particles reducedMotion={reduced} />
        <CrystalRig
          expanded={expanded}
          reducedMotion={reduced}
          onExpand={expand}
          onSelect={goToSection}
        />
      </Canvas>
    </div>
  )
}
