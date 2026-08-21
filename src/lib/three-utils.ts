import {
  BufferAttribute,
  BufferGeometry,
  IcosahedronGeometry,
  Vector3,
} from "three"

/**
 * Constantes da cena 3D do cristal. Cores alinhadas à paleta do vault
 * (Briefing_Identidade): champanhe fosco como dourado principal.
 */
export const CRYSTAL = {
  gold: "#C9A961", // champanhe fosco
  bronze: "#8A6B2E", // bronze profundo (variação)
  ink: "#0B0B0D", // preto-tinta (fundo)
} as const

/** Velocidades de rotação suave (rad/s) e parâmetros do pulse respiratório. */
export const CRYSTAL_MOTION = {
  rotationY: 0.15,
  rotationX: 0.04,
  /** Ciclo do pulse em segundos. */
  breathCycle: 4,
  /** Escala base e amplitude: oscila entre 100% e 103%. */
  breathBase: 1.015,
  breathAmplitude: 0.015,
} as const

/** Parâmetros do Estado B (cristal fraturado). */
export const SHARDS = {
  radius: 0.85, // raio do icosaedro original (objeto central, cabe inteiro)
  innerScale: 0.66, // casca interna: dá espessura à lasca (sólida, não cunha longa)
  explode: 0.95, // distância que cada lasca voa para fora (separação clara como menu)
  labelOffset: 0.26, // folga do rótulo além da lasca
} as const

export interface CrystalShard {
  /** Geometria com as faces reais da casca (fatia do icosaedro original). */
  geometry: BufferGeometry
  /** Direção de explosão e do rótulo (no plano da tela, normalizada). */
  direction: [number, number, number]
}

/**
 * Direções âncora no plano XY (de frente para a câmera), começando no topo e
 * seguindo em sentido horário. Garante um leque organizado e legível como menu:
 * topo, direita, baixo, esquerda (para 4 seções).
 */
function anchorDirections(count: number): Vector3[] {
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2
    return new Vector3(Math.sin(a), Math.cos(a), 0)
  })
}

/**
 * Fratura o icosaedro em `count` cascas coerentes. Cada face das 20 do icosaedro é
 * atribuída à direção âncora mais próxima, formando fatias contíguas. Montadas na
 * origem, as cascas reconstroem o cristal inteiro; afastadas pela direção, explodem.
 * Data-driven: `count` acompanha o número de seções (adicionar uma = recalcula).
 */
export function buildCrystalShards(radius: number, count: number): CrystalShard[] {
  const ico = new IcosahedronGeometry(radius, 0)
  const pos = ico.attributes.position
  const faceCount = pos.count / 3
  const anchors = anchorDirections(count)

  const buckets: number[][] = Array.from({ length: count }, () => [])
  const faceCentroids: Vector3[] = []

  for (let f = 0; f < faceCount; f++) {
    const a = new Vector3().fromBufferAttribute(pos, f * 3)
    const b = new Vector3().fromBufferAttribute(pos, f * 3 + 1)
    const c = new Vector3().fromBufferAttribute(pos, f * 3 + 2)
    const centroid = a.add(b).add(c).multiplyScalar(1 / 3)
    faceCentroids.push(centroid)

    const dir = centroid.clone().normalize()
    let best = 0
    let bestDot = -Infinity
    anchors.forEach((anchor, idx) => {
      const d = dir.dot(anchor)
      if (d > bestDot) {
        bestDot = d
        best = idx
      }
    })
    buckets[best].push(f)
  }

  const s = SHARDS.innerScale
  const shards: CrystalShard[] = buckets.map((faces, idx) => {
    // Cada face vira uma lasca sólida fina: triângulo externo + triângulo interno
    // (escalado para dentro) + 3 paredes laterais. 8 triângulos por face = 72 floats.
    // As normais ficam por conta do flatShading.
    const positions = new Float32Array(faces.length * 72)

    faces.forEach((f, i) => {
      const ax = pos.getX(f * 3)
      const ay = pos.getY(f * 3)
      const az = pos.getZ(f * 3)
      const bx = pos.getX(f * 3 + 1)
      const by = pos.getY(f * 3 + 1)
      const bz = pos.getZ(f * 3 + 1)
      const cx = pos.getX(f * 3 + 2)
      const cy = pos.getY(f * 3 + 2)
      const cz = pos.getZ(f * 3 + 2)
      // Vértices internos (casca interna), dando espessura à lasca.
      const aix = ax * s
      const aiy = ay * s
      const aiz = az * s
      const bix = bx * s
      const biy = by * s
      const biz = bz * s
      const cix = cx * s
      const ciy = cy * s
      const ciz = cz * s

      positions.set(
        [
          ax, ay, az, bx, by, bz, cx, cy, cz, // face externa
          aix, aiy, aiz, cix, ciy, ciz, bix, biy, biz, // face interna (invertida)
          ax, ay, az, bx, by, bz, bix, biy, biz, // parede a-b
          ax, ay, az, bix, biy, biz, aix, aiy, aiz,
          bx, by, bz, cx, cy, cz, cix, ciy, ciz, // parede b-c
          bx, by, bz, cix, ciy, ciz, bix, biy, biz,
          cx, cy, cz, ax, ay, az, aix, aiy, aiz, // parede c-a
          cx, cy, cz, aix, aiy, aiz, cix, ciy, ciz,
        ],
        i * 72,
      )
    })

    const geometry = new BufferGeometry()
    geometry.setAttribute("position", new BufferAttribute(positions, 3))

    // Explode no plano da tela (âncora), para um leque organizado.
    const dir = anchors[idx]
    return {
      geometry,
      direction: [dir.x, dir.y, dir.z],
    }
  })

  ico.dispose()
  return shards
}
