import { TAU, clamp, createRng, r2 } from './math'

/* ------------------------------------------------------------------ couleurs */

/**
 * Les anneaux ne sont pas des couleurs plates : la video montre une roue de
 * teintes complete a luminosite constante, avec un degrade le long de chaque
 * trace. Mesure : S 45-62 %, L 50-67 %.
 */
function wheel(hue: number, s = 0.55, l = 0.62): string {
  const h = ((hue % 360) + 360) % 360
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  const [r, g, b] =
    h < 60
      ? [c, x, 0]
      : h < 120
        ? [x, c, 0]
        : h < 180
          ? [0, c, x]
          : h < 240
            ? [0, x, c]
            : h < 300
              ? [x, 0, c]
              : [c, 0, x]
  const hex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, '0')
  return `#${hex(r)}${hex(g)}${hex(b)}`
}

/* ------------------------------------------------------------- types de rendu */

export interface DotRender {
  x: number
  y: number
  r: number
  opacity: number
  /** couleur explicite ; par defaut le rendu prend celle du corps */
  color?: string
  /**
   * Brume de profondeur : 0 = fondu dans le fond, 1 = couleur du corps pleine.
   * Le melange se fait au rendu, qui seul connait la couleur choisie.
   */
  depth?: number
  /**
   * Forme non circulaire, en unites de rayon de boule et centree sur l'origine
   * (le point du "!" penche est une goutte, pas un disque). Quand elle est
   * fournie, `r` n'est plus utilise pour le trace.
   */
  d?: string
  /** rotation appliquee a `d`, en degres */
  rot?: number
}

/**
 * Ce qu'un etat declare : la geometrie de l'arc reste en unites de rayon de
 * boule, c'est le moteur (seul a connaitre l'echelle du viewBox) qui la
 * rasterise. Sans ca les etats devraient connaitre le viewBox.
 */
export interface ArcSpec {
  id: string
  seed: ArcSeed
  t: number
  opacity: number
}

export interface ArcRender {
  id: string
  /** portion devant le corps */
  front: string
  /** portion derriere le corps (dessinee avant, donc masquee par la silhouette) */
  back: string
  width: number
  opacity: number
  /** degrade de teinte le long du trace */
  grad: { x1: number; y1: number; x2: number; y2: number; stops: string[] }
}

/* --------------------------------------------------------- arc elliptique 3D */

export interface ArcSeed {
  /** demi-grand axe, en unites de rayon de boule */
  a: number
  /** aplatissement b/a : mesure <= 0.45, les plans d'orbite sont vus par la tranche */
  k: number
  /** inclinaison du grand axe a l'ecran, radians */
  tilt: number
  /** tours par seconde */
  speed: number
  phase: number
  /** fraction du tour reellement tracee */
  sweep: number
  hue: number
  hueSpan: number
  width: number
  cx: number
  cy: number
}

/**
 * Projette un cercle 3D incline en orthographique.
 *
 * Le cercle vit dans le plan engendre par u (dans l'ecran) et v (qui plonge
 * dans la profondeur). La composante z sert a couper l'arc en deux : la moitie
 * arriere est dessinee avant le corps, donc occultee par lui. C'est ce vrai tri
 * en profondeur qui fait lire les anneaux comme des orbites et pas comme un
 * dessin plat.
 */
export function arcRender(seed: ArcSeed, t: number, scale: number, id: string, opacity = 1): ArcRender {
  const spin = seed.phase + t * seed.speed * TAU
  const cu = Math.cos(seed.tilt)
  const su = Math.sin(seed.tilt)
  const kz = Math.sqrt(Math.max(0, 1 - seed.k * seed.k))

  const N = 64
  const span = seed.sweep * TAU
  let front = ''
  let back = ''
  let prev: boolean | null = null

  for (let i = 0; i <= N; i++) {
    const th = spin + (i / N) * span
    const ct = Math.cos(th)
    const st = Math.sin(th)
    // u = (cos tilt, sin tilt, 0) ; v = (-sin tilt * k, cos tilt * k, kz)
    const x = seed.a * (ct * cu + st * -su * seed.k) + seed.cx
    const y = seed.a * (ct * su + st * cu * seed.k) + seed.cy
    const z = seed.a * st * kz

    const behind = z < 0
    const sx = r2(x * scale)
    const sy = r2(y * scale)
    const cmd = behind !== prev ? 'M' : 'L'
    if (behind) back += `${cmd}${sx} ${sy}`
    else front += `${cmd}${sx} ${sy}`
    prev = behind
  }

  const gx = Math.cos(seed.tilt) * seed.a * scale
  const gy = Math.sin(seed.tilt) * seed.a * scale
  return {
    id,
    front,
    back,
    width: seed.width * scale,
    opacity,
    grad: {
      x1: r2(seed.cx * scale - gx),
      y1: r2(seed.cy * scale - gy),
      x2: r2(seed.cx * scale + gx),
      y2: r2(seed.cy * scale + gy),
      stops: [wheel(seed.hue), wheel(seed.hue + seed.hueSpan * 0.5), wheel(seed.hue + seed.hueSpan)]
    }
  }
}

/* ---------------------------------------------------------------- anneaux */

const RING_RNG = createRng(0xa11ce)

/**
 * 6 anneaux, demi-grand axe 1.30-1.40 (donc nettement plus grands que la
 * boule), aplatissement toujours <= 0.45, epaisseur 0.055, ~3.3 tours/s.
 */
export const RINGS: ArcSeed[] = Array.from({ length: 6 }, (_, i) => ({
  a: 1.3 + RING_RNG() * 0.1,
  k: 0.05 + RING_RNG() * 0.4,
  tilt: (i / 6) * Math.PI + RING_RNG() * 0.5,
  speed: 3 + RING_RNG() * 0.7,
  phase: RING_RNG() * TAU,
  sweep: 0.6 + RING_RNG() * 0.25,
  hue: (i * 360) / 6 + RING_RNG() * 30,
  hueSpan: 60 + RING_RNG() * 60,
  width: 0.05 + RING_RNG() * 0.012,
  cx: 0,
  cy: 0.1
}))

/**
 * Bouquet d'arcs emboites qui balaie le triangle juste avant les orbites.
 * Vus quasiment par la tranche (d'ou la forme en epingle a cheveux), rmax 1.37.
 */
export const SWOOSH: ArcSeed[] = Array.from({ length: 4 }, (_, i) => ({
  a: 0.78 + i * 0.2,
  k: 0.05 + i * 0.02,
  tilt: -0.62 + i * 0.05,
  speed: 0.3,
  phase: 0.06 * i,
  sweep: 0.4,
  hue: 95 + i * 62,
  hueSpan: 100,
  width: 0.05,
  cx: 0,
  cy: -0.12
}))

/* ------------------------------------------------------------- 3 points */

/** x mesures : -0.557 / -0.013 / +0.532, y = 0. */
export const DOT_X = [-0.557, -0.013, 0.532] as const
export const DOT_R = 0.165
export const DOT_PEAK = 1.25

/* ------------------------------------------------------------ particules */

const P_RNG = createRng(0xbeef)

/** 5 particules, une nouvelle toutes les 0.2 s, duree de vie 0.55 s. */
const PARTICLES = Array.from({ length: 5 }, (_, i) => ({
  birth: i * 0.2,
  angle: P_RNG() * TAU,
  rho: 0.58 + P_RNG() * 0.18
}))

/**
 * Les particules ne partent pas en ligne droite : elles spiralent vers le
 * centre (rayon x0.75 par frame, angle +100 deg/s) en grossissant, et passent
 * derriere le noyau ou elles sont avalees.
 */
export function particles(t: number, scale: number): DotRender[] {
  const out: DotRender[] = []
  for (const p of PARTICLES) {
    const u = t - p.birth
    if (u < 0 || u > 0.62) continue
    const rho = p.rho * Math.pow(0.75, u * 10)
    const a = p.angle + (u * 100 * Math.PI) / 180
    out.push({
      x: Math.cos(a) * rho * scale,
      y: Math.sin(a) * rho * scale,
      r: (0.04 + 0.028 * clamp(u / 0.55)) * scale,
      depth: clamp(1 - rho / 0.8),
      opacity: clamp(u / 0.06) * clamp((0.62 - u) / 0.08)
    })
  }
  return out
}

/* ------------------------------------------------------------------ comete */

/**
 * Contrairement a l'intuition, le point ne traverse pas l'ecran : il reste au
 * centre et c'est la trainee qui l'orbite. Ellipse a = 0.85, b = 0.15,
 * grand axe incline de +34deg, 4 rubans, ~210 deg/s.
 */
const COMET_RNG = createRng(0xc0e7)
export const COMET_RIBBONS: ArcSeed[] = Array.from({ length: 4 }, (_, i) => {
  const d = i - 1.5
  return {
    a: 0.85 * (1 + d * 0.03),
    // meme aplatissement a +-5 % pres : les rubans forment un faisceau serre
    k: (0.15 / 0.85) * (1 + d * 0.16),
    tilt: (34 * Math.PI) / 180 + d * 0.035,
    speed: 210 / 360,
    // dephasage mesure : 10 a 20 degres entre rubans, pas davantage
    phase: -i * 0.045 + COMET_RNG() * 0.012,
    sweep: 0.34,
    hue: i * 85 + COMET_RNG() * 20,
    hueSpan: 80,
    width: 0.095,
    cx: 0,
    cy: 0
  }
})

/** Rayon du point de la comete, mesure a 0.129. */
export const COMET_DOT = 0.129

/* --------------------------------------------------- pastille notification */

/** Bleu releve au pixel. */
export const NOTIF_BLUE = '#2496e8'
/** La pastille est posee exactement sur la circonference, a -42deg. */
export const NOTIF_ANGLE = -42
export const NOTIF_DIST = 1.003
/** Rayon au repos ; le pop culmine 14 % au-dessus. */
export const NOTIF_R = 0.15
export const NOTIF_POP = 1.14
/**
 * L'encoche est un disque concentrique a la pastille, soustrait du corps.
 * La marge est constante (0.054 R) et suit l'echelle du corps.
 */
export const NOTIF_MARGIN = 0.054

/* --------------------------------------------------- Custom Deco SVGs */

export const SVG_HEART = 'M0,-0.3 C-0.3,-0.6 -0.6,-0.3 -0.6,0.05 C-0.6,0.45 0,0.8 0,0.9 C0,0.8 0.6,0.45 0.6,0.05 C0.6,-0.3 0.3,-0.6 0,-0.3 Z'
export const SVG_STAR = 'M0,-0.6 L0.18,-0.18 L0.6,-0.18 L0.26,0.1 L0.4,0.55 L0,0.28 L-0.4,0.55 L-0.26,0.1 L-0.6,-0.18 L-0.18,-0.18 Z'
export const SVG_CROWN = 'M-0.6,0.4 L-0.6,-0.3 L-0.2,0 L0,-0.5 L0.2,0 L0.6,-0.3 L0.6,0.4 Z'
export const SVG_SNOWFLAKE = 'M0,-0.5 L0,0.5 M-0.5,0 L0.5,0 M-0.35,-0.35 L0.35,0.35 M-0.35,0.35 L0.35,-0.35'
export const SVG_NOTE = 'M-0.2,0.3 A0.2,0.15 0 1,0 0,0.45 L0,-0.4 L0.4,-0.25 L0.4,-0.1 L0,-0.25'

/* --------------------------------------------------- Power Electric Arcs */

export const POWER_ARCS: ArcSeed[] = Array.from({ length: 5 }, (_, i) => ({
  a: 1.25 + i * 0.08,
  k: 0.12 + (i % 2) * 0.15,
  tilt: (i * Math.PI) / 2.5,
  speed: 4.5,
  phase: i * 0.8,
  sweep: 0.45,
  hue: 45 + i * 15,
  hueSpan: 50,
  width: 0.06,
  cx: 0,
  cy: 0
}))

/* --------------------------------------------------- Procedural Generators */

export function heartParticles(t: number, scale: number): DotRender[] {
  const count = 6
  const out: DotRender[] = []
  for (let i = 0; i < count; i++) {
    const pPhase = (t * 1.2 + i / count) % 1
    const y = (1 - pPhase * 2.2) * 0.8
    const x = Math.sin(pPhase * TAU * 1.5 + i) * 0.45 * (0.4 + 0.6 * pPhase)
    const opacity = clamp(Math.sin(pPhase * Math.PI) * 1.5)
    out.push({
      x: x * scale,
      y: y * scale,
      r: (0.12 + 0.04 * Math.sin(i * 2)) * scale,
      d: SVG_HEART,
      color: i % 2 === 0 ? '#ff2a6d' : '#ff758c',
      opacity
    })
  }
  return out
}

export function dizzyStars(t: number, scale: number): DotRender[] {
  const count = 4
  const out: DotRender[] = []
  const radius = 0.85
  for (let i = 0; i < count; i++) {
    const angle = t * TAU * 1.2 + (i * TAU) / count
    const x = Math.cos(angle) * radius
    const y = -0.9 + Math.sin(angle) * 0.22
    out.push({
      x: x * scale,
      y: y * scale,
      r: 0.14 * scale,
      d: SVG_STAR,
      rot: t * 180 + i * 90,
      color: '#facc15',
      opacity: 0.9
    })
  }
  return out
}

export function discoSparkles(t: number, scale: number): DotRender[] {
  const count = 8
  const out: DotRender[] = []
  for (let i = 0; i < count; i++) {
    const a = (i * TAU) / count + t * 0.8
    const dist = 1.15 + 0.25 * Math.sin(t * 5 + i * 2)
    const hue = (i * 45 + t * 180) % 360
    out.push({
      x: Math.cos(a) * dist * scale,
      y: Math.sin(a) * dist * scale,
      r: 0.1 * scale,
      d: i % 2 === 0 ? SVG_STAR : SVG_NOTE,
      rot: t * 90 + i * 45,
      color: wheel(hue, 0.85, 0.6),
      opacity: 0.8 + 0.2 * Math.sin(t * 8 + i)
    })
  }
  return out
}

export function glitchPixels(t: number, scale: number): DotRender[] {
  const count = 10
  const out: DotRender[] = []
  const seed = Math.floor(t * 15)
  const rng = createRng(seed)
  for (let i = 0; i < count; i++) {
    const x = (rng() * 2 - 1) * 1.2
    const y = (rng() * 2 - 1) * 1.2
    out.push({
      x: x * scale,
      y: y * scale,
      r: (0.04 + rng() * 0.08) * scale,
      color: rng() > 0.5 ? '#00f0ff' : '#ff0055',
      opacity: 0.6 + rng() * 0.4
    })
  }
  return out
}

export function rocketPlume(t: number, scale: number): DotRender[] {
  const count = 7
  const out: DotRender[] = []
  for (let i = 0; i < count; i++) {
    const phase = (t * 4 + i / count) % 1
    const y = 0.85 + phase * 0.9
    const x = (Math.sin(i * 3 + t * 10) * 0.18) * (1 - phase * 0.4)
    out.push({
      x: x * scale,
      y: y * scale,
      r: (0.16 * (1 - phase * 0.7)) * scale,
      color: phase < 0.3 ? '#ffffff' : phase < 0.6 ? '#fbbf24' : '#ef4444',
      opacity: clamp((1 - phase) * 1.4)
    })
  }
  return out
}

export function frostShards(t: number, scale: number): DotRender[] {
  const count = 6
  const out: DotRender[] = []
  for (let i = 0; i < count; i++) {
    const a = (i * TAU) / count
    const d = 1.05 + 0.1 * Math.sin(t * 2 + i)
    out.push({
      x: Math.cos(a) * d * scale,
      y: Math.sin(a) * d * scale,
      r: 0.12 * scale,
      d: SVG_SNOWFLAKE,
      rot: i * 30,
      color: '#a5f3fc',
      opacity: 0.85
    })
  }
  return out
}

export function djEqualizerBars(t: number, scale: number): DotRender[] {
  const bars = 8
  const out: DotRender[] = []
  for (let i = 0; i < bars; i++) {
    const x = ((i - (bars - 1) / 2) / (bars / 2)) * 0.8
    const h = 0.2 + 0.4 * Math.abs(Math.sin(t * 6 + i * 1.2))
    out.push({
      x: x * scale,
      y: (1.15 - h * 0.3) * scale,
      r: (0.04 + h * 0.04) * scale,
      color: wheel(i * 35 + t * 60, 0.9, 0.55),
      opacity: 0.9
    })
  }
  return out
}

export function smokePoof(t: number, scale: number): DotRender[] {
  const count = 8
  const out: DotRender[] = []
  const p = clamp(t / 0.8)
  for (let i = 0; i < count; i++) {
    const a = (i * TAU) / count
    const dist = 0.3 + p * 0.9
    out.push({
      x: Math.cos(a) * dist * scale,
      y: Math.sin(a) * dist * scale,
      r: (0.15 + p * 0.2) * scale,
      color: '#94a3b8',
      opacity: (1 - p) * 0.7
    })
  }
  return out
}
