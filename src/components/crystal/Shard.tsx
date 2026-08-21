import { useRef } from "react"
import type { MutableRefObject } from "react"
import { useFrame } from "@react-three/fiber"
import { Edges, Html } from "@react-three/drei"
import { DoubleSide, MathUtils, type BufferGeometry, type Group, type MeshStandardMaterial } from "three"
import { cn } from "@/lib/utils"
import { CRYSTAL, SHARDS } from "@/lib/three-utils"

interface ShardProps {
  label: string
  geometry: BufferGeometry
  /** Direção de explosão e do rótulo (normalizada). */
  direction: [number, number, number]
  /** Progresso compartilhado da fratura (0 = inteiro, 1 = explodido). */
  progressRef: MutableRefObject<number>
  /** Estado B ativo (controla rótulo, hover e ponteiro). */
  expanded: boolean
  hovered: boolean
  dimmed: boolean
  onHover: (value: boolean) => void
  /** Click: fragmenta (se inteiro) ou navega (se já explodido). */
  onActivate: () => void
}

/**
 * Uma casca do cristal: fatia real das faces do icosaedro. Parte da origem (montada,
 * forma o cristal inteiro) e voa pela direção conforme a fratura avança.
 */
export function Shard({
  label,
  geometry,
  direction,
  progressRef,
  expanded,
  hovered,
  dimmed,
  onHover,
  onActivate,
}: ShardProps) {
  const group = useRef<Group>(null)
  const matRef = useRef<MeshStandardMaterial>(null)

  // Rótulo ancorado na direção, logo além da superfície da lasca (local ao grupo,
  // que já é transladado pela explosão).
  const labelReach = SHARDS.radius + SHARDS.labelOffset
  const labelPos: [number, number, number] = [
    direction[0] * labelReach,
    direction[1] * labelReach,
    direction[2] * labelReach,
  ]

  useFrame(() => {
    const p = progressRef.current
    if (group.current) {
      group.current.position.set(
        direction[0] * SHARDS.explode * p,
        direction[1] * SHARDS.explode * p,
        direction[2] * SHARDS.explode * p,
      )
    }
    if (matRef.current) {
      const highlight = expanded && hovered
      const fade = expanded && dimmed ? 0.4 : 1
      matRef.current.opacity = fade
      const targetEmissive = highlight ? 0.7 : 0.04
      matRef.current.emissiveIntensity = MathUtils.lerp(
        matRef.current.emissiveIntensity,
        targetEmissive,
        0.15,
      )
    }
  })

  return (
    <group ref={group}>
      <mesh
        geometry={geometry}
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover(true)
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          onHover(false)
          document.body.style.cursor = "auto"
        }}
        onClick={(e) => {
          e.stopPropagation()
          onActivate()
        }}
      >
        <meshStandardMaterial
          ref={matRef}
          color={CRYSTAL.gold}
          emissive={CRYSTAL.gold}
          emissiveIntensity={0.04}
          metalness={0.7}
          roughness={0.42}
          flatShading
          side={DoubleSide}
          transparent
          opacity={1}
        />
        {/* Arestas finas douradas (regra de marca: dourado em linhas finas). */}
        <Edges threshold={18} renderOrder={1}>
          <lineBasicMaterial color={CRYSTAL.gold} transparent opacity={0.4} />
        </Edges>
      </mesh>

      <Html center position={labelPos} zIndexRange={[20, 0]}>
        <button
          type="button"
          tabIndex={expanded ? 0 : -1}
          onClick={onActivate}
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
          className={cn(
            "whitespace-nowrap font-eyebrow text-[0.7rem] font-medium uppercase",
            "tracking-[var(--tracking-eyebrow)] text-champagne transition-all duration-300",
            expanded ? "opacity-100" : "pointer-events-none opacity-0",
            hovered ? "scale-110 text-cream" : dimmed ? "opacity-40" : "",
          )}
        >
          {label}
        </button>
      </Html>
    </group>
  )
}
