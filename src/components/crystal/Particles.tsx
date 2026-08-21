import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { AdditiveBlending, type Points } from "three"
import { CRYSTAL } from "@/lib/three-utils"

interface ParticlesProps {
  count?: number
  reducedMotion?: boolean
}

/** PRNG determinístico (mulberry32): puro e estável entre renders. */
function makeRng(seed: number): () => number {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Poeira dourada atrás do cristal: profundidade sutil (vault: "partículas + névoa").
 * Distribuída num volume amplo, deriva devagar. Aditiva e de baixa opacidade para
 * não competir com o cristal nem soar "brilhante".
 */
export function Particles({ count = 380, reducedMotion = false }: ParticlesProps) {
  const ref = useRef<Points>(null)

  const positions = useMemo(() => {
    const rng = makeRng(1337)
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rng() - 0.5) * 16
      arr[i * 3 + 1] = (rng() - 0.5) * 11
      arr[i * 3 + 2] = -1.5 - rng() * 11 // empurradas para trás
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (ref.current && !reducedMotion) ref.current.rotation.y += delta * 0.015
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color={CRYSTAL.gold}
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  )
}
