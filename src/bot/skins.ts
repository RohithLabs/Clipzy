import { PROFILE_SAMPLES } from './profiles'
import {
  hullOfCircles,
  profileFromPolygon,
  regularPolygonProfile,
  superellipseProfile,
  unionOfCirclesProfile
} from './shape'

/**
 * Formes et couleurs proposees par le personnalisateur du bot.
 *
 * A la difference des silhouettes d'animation (`profiles.ts`), celles-ci ne sont
 * PAS relevees sur la video : elles sont construites analytiquement d'apres la
 * grille du personnalisateur d'origine. Deux sources distinctes, donc, et c'est
 * volontaire — les etats animes doivent rester fideles a la video, les formes de
 * base sont un choix d'utilisateur.
 */

/**
 * Les identifiants sont enumeres plutot que deduits du tableau : c'est ce qui
 * permet a la couche i18n de verifier A LA COMPILATION que chaque forme a bien
 * sa traduction dans les trois langues (`t(\`shapes.${id}\`)` ne compile que si
 * la cle existe). Un `as const` sur le tableau aurait le meme effet mais
 * rendrait `radii` en lecture seule, alors que le moteur le passe tel quel.
 */
export type ShapeId =
  | 'cercle'
  | 'blob'
  | 'bean'
  | 'jelly'
  | 'galet'
  | 'bubble'
  | 'nuage'
  | 'goutte'
  | 'squircle'
  | 'rounded_cube'
  | 'capsule'
  | 'triangle'
  | 'hexagone'
  | 'diamond'
  | 'star_blob'
  | 'cylinder'
  | 'mochi'
  | 'gummy'
  | 'puffy'
  | 'wobble'
  | 'planet'
  | 'egg'
  | 'orbital'
  | 'spiky_blob'
  | 'crystal'
  | 'donut'

export interface BotShape {
  id: ShapeId
  radii: number[]
}

/** Ramene le rayon maximal a `max` pour que toutes les formes pesent pareil a l'oeil. */
function normalize(radii: number[], max = 1): number[] {
  const peak = Math.max(...radii)
  if (peak <= 0) return radii
  const k = max / peak
  return radii.map((r) => r * k)
}

const ANGLES = Array.from({ length: PROFILE_SAMPLES }, (_, i) => (i / PROFILE_SAMPLES) * Math.PI * 2)

/** Galet : cercle deforme par deux harmoniques basses, donc irregulier mais lisse. */
const pebble = normalize(
  ANGLES.map((a) => 1 + 0.075 * Math.cos(2 * a + 0.5) + 0.035 * Math.cos(3 * a + 2.1)),
  1.02
)

/** Nuage : union de bosses, large en bas, deux lobes en haut. */
const cloud = normalize(
  unionOfCirclesProfile([
    { x: -0.44, y: 0.2, r: 0.54 },
    { x: 0.46, y: 0.2, r: 0.5 },
    { x: 0.02, y: 0.3, r: 0.6 },
    { x: -0.24, y: -0.3, r: 0.48 },
    { x: 0.3, y: -0.24, r: 0.44 }
  ]),
  1.02
)

/** Goutte : gros disque en bas, pointe effilee en haut. */
const droplet = normalize(
  profileFromPolygon(hullOfCircles(0, 0.28, 0.66, 0, -0.96, 0.05), 0, 0),
  1.04
)

/** Capsule couchee : enveloppe de deux disques cote a cote. */
const capsule = profileFromPolygon(hullOfCircles(-0.42, 0, 0.62, 0.42, 0, 0.62), 0, 0)

export const SHAPES: BotShape[] = [
  // --- Organic / Soft Shapes ---
  { id: 'cercle', radii: new Array(PROFILE_SAMPLES).fill(1) },
  {
    id: 'blob',
    radii: normalize(
      ANGLES.map((a) => 1 + 0.11 * Math.cos(3 * a + 0.4) + 0.06 * Math.sin(2 * a + 1.1) + 0.04 * Math.cos(4 * a)),
      1.05
    )
  },
  {
    id: 'bean',
    radii: normalize(
      ANGLES.map((a) => 1 + 0.12 * Math.cos(a) - 0.10 * Math.cos(2 * a + 0.3) + 0.04 * Math.sin(3 * a)),
      1.04
    )
  },
  {
    id: 'jelly',
    radii: normalize(
      ANGLES.map((a) => 1 - 0.12 * Math.sin(a) + 0.06 * Math.cos(2 * a)),
      1.04
    )
  },
  { id: 'galet', radii: pebble },
  {
    id: 'bubble',
    radii: normalize(
      ANGLES.map((a) => 1 + 0.03 * Math.sin(4 * a) + 0.015 * Math.cos(6 * a)),
      1.02
    )
  },
  { id: 'nuage', radii: cloud },
  { id: 'goutte', radii: droplet },
  { id: 'squircle', radii: normalize(superellipseProfile(4.2), 1.15) },

  // --- Geometric Shapes ---
  { id: 'rounded_cube', radii: normalize(superellipseProfile(5.6), 1.18) },
  { id: 'capsule', radii: capsule },
  { id: 'triangle', radii: regularPolygonProfile(3, 1.12, 0.34, -90) },
  { id: 'hexagone', radii: regularPolygonProfile(6, 1.04, 0.26, 0) },
  { id: 'diamond', radii: regularPolygonProfile(4, 1.14, 0.34, 45) },
  {
    id: 'star_blob',
    radii: normalize(
      ANGLES.map((a) => 1 + 0.14 * Math.cos(5 * a - Math.PI / 2)),
      1.06
    )
  },
  { id: 'cylinder', radii: normalize(superellipseProfile(4.5, 0.84, 1.18), 1.16) },

  // --- Unique / Crazy Shapes ---
  { id: 'mochi', radii: normalize(superellipseProfile(2.8, 1.22, 0.88), 1.06) },
  {
    id: 'gummy',
    radii: normalize(
      unionOfCirclesProfile([
        { x: 0, y: 0.05, r: 0.85 },
        { x: -0.52, y: -0.52, r: 0.36 },
        { x: 0.52, y: -0.52, r: 0.36 }
      ]),
      1.05
    )
  },
  {
    id: 'puffy',
    radii: normalize(
      ANGLES.map((a) => 1 + 0.08 * Math.cos(4 * a) + 0.02 * Math.cos(8 * a)),
      1.05
    )
  },
  {
    id: 'wobble',
    radii: normalize(
      ANGLES.map((a) => 1 + 0.10 * Math.sin(2 * a + 0.8) + 0.07 * Math.cos(3 * a - 0.5)),
      1.05
    )
  },
  {
    id: 'planet',
    radii: normalize(
      unionOfCirclesProfile([
        { x: 0, y: 0, r: 0.86 },
        { x: -0.80, y: 0.02, r: 0.26 },
        { x: 0.80, y: -0.02, r: 0.26 }
      ]),
      1.06
    )
  },
  {
    id: 'egg',
    radii: normalize(
      ANGLES.map((a) => 1 + 0.14 * Math.sin(a) - 0.05 * Math.cos(2 * a)),
      1.05
    )
  },
  {
    id: 'orbital',
    radii: normalize(
      ANGLES.map((a) => 1 + 0.13 * Math.cos(2 * a - 0.55) + 0.03 * Math.sin(4 * a)),
      1.06
    )
  },
  {
    id: 'spiky_blob',
    radii: normalize(
      ANGLES.map((a) => 1 + 0.11 * Math.cos(7 * a)),
      1.06
    )
  },
  {
    id: 'crystal',
    radii: normalize(
      ANGLES.map((a) => 1 + 0.07 * Math.cos(8 * a + Math.PI / 8)),
      1.04
    )
  },
  {
    id: 'donut',
    radii: normalize(
      ANGLES.map((a) => 1 + 0.05 * Math.cos(2 * a) + 0.03 * Math.sin(4 * a)),
      1.03
    )
  }
]

// Map indexee par `string` et non par `ShapeId` : les appelants interrogent avec
// une valeur relue du localStorage ou d'une prop, donc non validee.
export const SHAPE_BY_ID = new Map<string, BotShape>(SHAPES.map((s) => [s.id, s]))
export const DEFAULT_SHAPE = 'cercle'

export type ColorId =
  | 'encre'
  | 'creme'
  | 'brun'
  | 'rouge'
  | 'orange'
  | 'ambre'
  | 'vert'
  | 'turquoise'
  | 'bleu'
  | 'violet'
  | 'rose'
  | 'gris'

export interface BotColor {
  id: ColorId
  hex: string
}

/** Palette du personnalisateur d'origine. */
export const COLORS: BotColor[] = [
  { id: 'encre', hex: '#0a0a0c' },
  { id: 'brun', hex: '#8b5e3c' },
  { id: 'rouge', hex: '#e8483f' },
  { id: 'orange', hex: '#f08a24' },
  { id: 'ambre', hex: '#f0b429' },
  { id: 'vert', hex: '#3ecf8e' },
  { id: 'turquoise', hex: '#2fbfa0' },
  { id: 'bleu', hex: '#3b93f0' },
  { id: 'violet', hex: '#8b5cf6' },
  { id: 'rose', hex: '#e152b0' },
  { id: 'gris', hex: '#a3a3a3' },
  { id: 'creme', hex: '#f1efe9' }
]

export const COLOR_BY_ID = new Map<string, BotColor>(COLORS.map((c) => [c.id, c]))
export const DEFAULT_COLOR = 'encre'

/** Melange deux couleurs hex. Sert a la brume de profondeur des particules. */
export function mixHex(from: string, to: string, t: number): string {
  const parse = (h: string) => {
    let raw = h.startsWith('#') ? h.slice(1) : (COLOR_BY_ID.get(h)?.hex.slice(1) ?? '0a0a0c')
    if (raw.length === 3) raw = raw.split('').map((c) => c + c).join('')
    const v = parseInt(raw.slice(0, 6), 16)
    if (isNaN(v)) return [10, 10, 12]
    return [(v >> 16) & 255, (v >> 8) & 255, v & 255]
  }
  const a = parse(from)
  const b = parse(to)
  const c = a.map((x, i) => Math.round(x + (b[i]! - x) * t))
  return `#${c.map((x) => x.toString(16).padStart(2, '0')).join('')}`
}
