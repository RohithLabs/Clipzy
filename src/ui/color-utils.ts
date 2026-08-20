import { COLOR_BY_ID } from '@/bot/skins'

export interface RgbColor {
  r: number
  g: number
  b: number
  a: number
}

export interface HsvColor {
  h: number
  s: number
  v: number
  a: number
}

export interface HslColor {
  h: number
  s: number
  l: number
  a: number
}

function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max)
}

/** Convertit HSV (h: 0-360, s: 0-1, v: 0-1) en RGB (0-255). */
export function hsvToRgb(h: number, s: number, v: number, a = 1): RgbColor {
  const normH = ((h % 360) + 360) % 360
  const normS = clamp(s, 0, 1)
  const normV = clamp(v, 0, 1)

  const c = normV * normS
  const hp = normH / 60
  const x = c * (1 - Math.abs((hp % 2) - 1))
  const m = normV - c

  let r1 = 0
  let g1 = 0
  let b1 = 0

  if (hp >= 0 && hp < 1) {
    r1 = c
    g1 = x
    b1 = 0
  } else if (hp >= 1 && hp < 2) {
    r1 = x
    g1 = c
    b1 = 0
  } else if (hp >= 2 && hp < 3) {
    r1 = 0
    g1 = c
    b1 = x
  } else if (hp >= 3 && hp < 4) {
    r1 = 0
    g1 = x
    b1 = c
  } else if (hp >= 4 && hp < 5) {
    r1 = x
    g1 = 0
    b1 = c
  } else {
    r1 = c
    g1 = 0
    b1 = x
  }

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
    a: clamp(a, 0, 1)
  }
}

/** Convertit RGB (0-255) en HSV (h: 0-360, s: 0-1, v: 0-1). */
export function rgbToHsv(r: number, g: number, b: number, a = 1): HsvColor {
  const rn = clamp(r, 0, 255) / 255
  const gn = clamp(g, 0, 255) / 255
  const bn = clamp(b, 0, 255) / 255

  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const d = max - min

  let h = 0
  const s = max === 0 ? 0 : d / max
  const v = max

  if (d !== 0) {
    if (max === rn) {
      h = ((gn - bn) / d) % 6
    } else if (max === gn) {
      h = (bn - rn) / d + 2
    } else {
      h = (rn - gn) / d + 4
    }
    h *= 60
    if (h < 0) h += 360
  }

  return {
    h: Math.round(h),
    s,
    v,
    a: clamp(a, 0, 1)
  }
}

/** Convertit RGB en code hexadécimal (#RRGGBB ou #RRGGBBAA si alpha < 1). */
export function rgbToHex(r: number, g: number, b: number, a = 1, includeAlpha = false): string {
  const rh = clamp(Math.round(r), 0, 255).toString(16).padStart(2, '0')
  const gh = clamp(Math.round(g), 0, 255).toString(16).padStart(2, '0')
  const bh = clamp(Math.round(b), 0, 255).toString(16).padStart(2, '0')

  if (includeAlpha || a < 1) {
    const ah = clamp(Math.round(a * 255), 0, 255).toString(16).padStart(2, '0')
    return `#${rh}${gh}${bh}${ah}`.toUpperCase()
  }
  return `#${rh}${gh}${bh}`.toUpperCase()
}

/** Analyse une chaîne hex en RGB. */
export function hexToRgb(hex: string): RgbColor | null {
  const clean = hex.trim().replace(/^#/, '')
  if (!/^[0-9a-fA-F]{3,8}$/.test(clean)) return null

  if (clean.length === 3 || clean.length === 4) {
    const r = parseInt(clean[0]! + clean[0]!, 16)
    const g = parseInt(clean[1]! + clean[1]!, 16)
    const b = parseInt(clean[2]! + clean[2]!, 16)
    const a = clean.length === 4 ? parseInt(clean[3]! + clean[3]!, 16) / 255 : 1
    return { r, g, b, a }
  }

  if (clean.length === 6 || clean.length === 8) {
    const r = parseInt(clean.slice(0, 2), 16)
    const g = parseInt(clean.slice(2, 4), 16)
    const b = parseInt(clean.slice(4, 6), 16)
    const a = clean.length === 8 ? parseInt(clean.slice(6, 8), 16) / 255 : 1
    return { r, g, b, a }
  }

  return null
}

/** Convertit RGB en HSL (h: 0-360, s: 0-100%, l: 0-100%). */
export function rgbToHsl(r: number, g: number, b: number, a = 1): HslColor {
  const rn = clamp(r, 0, 255) / 255
  const gn = clamp(g, 0, 255) / 255
  const bn = clamp(b, 0, 255) / 255

  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const l = (max + min) / 2
  const d = max - min

  let h = 0
  let s = 0

  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === rn) {
      h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60
    } else if (max === gn) {
      h = ((bn - rn) / d + 2) * 60
    } else {
      h = ((rn - gn) / d + 4) * 60
    }
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
    a: clamp(a, 0, 1)
  }
}

/** Convertit HSL (h: 0-360, s: 0-100, l: 0-100) en RGB. */
export function hslToRgb(h: number, s: number, l: number, a = 1): RgbColor {
  const normH = ((h % 360) + 360) % 360
  const normS = clamp(s, 0, 100) / 100
  const normL = clamp(l, 0, 100) / 100

  const c = (1 - Math.abs(2 * normL - 1)) * normS
  const hp = normH / 60
  const x = c * (1 - Math.abs((hp % 2) - 1))
  const m = normL - c / 2

  let r1 = 0
  let g1 = 0
  let b1 = 0

  if (hp >= 0 && hp < 1) {
    r1 = c
    g1 = x
    b1 = 0
  } else if (hp >= 1 && hp < 2) {
    r1 = x
    g1 = c
    b1 = 0
  } else if (hp >= 2 && hp < 3) {
    r1 = 0
    g1 = c
    b1 = x
  } else if (hp >= 3 && hp < 4) {
    r1 = 0
    g1 = x
    b1 = c
  } else if (hp >= 4 && hp < 5) {
    r1 = x
    g1 = 0
    b1 = c
  } else {
    r1 = c
    g1 = 0
    b1 = x
  }

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
    a: clamp(a, 0, 1)
  }
}

/**
 * Analyse n'importe quelle chaîne de couleur (identifiant de palette, hex, rgb, hsl).
 */
export function parseColor(colorStr: string): {
  hsv: HsvColor
  rgb: RgbColor
  hex: string
} {
  const presetHex = COLOR_BY_ID.get(colorStr)?.hex
  const raw = presetHex ?? colorStr

  // 1. Hex
  const rgbFromHex = hexToRgb(raw)
  if (rgbFromHex) {
    const hsv = rgbToHsv(rgbFromHex.r, rgbFromHex.g, rgbFromHex.b, rgbFromHex.a)
    return {
      hsv,
      rgb: rgbFromHex,
      hex: rgbToHex(rgbFromHex.r, rgbFromHex.g, rgbFromHex.b)
    }
  }

  // 2. rgb(a)
  const rgbMatch = raw.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/i)
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1]!, 10)
    const g = parseInt(rgbMatch[2]!, 10)
    const b = parseInt(rgbMatch[3]!, 10)
    const a = rgbMatch[4] !== undefined ? parseFloat(rgbMatch[4]) : 1
    const rgb: RgbColor = { r, g, b, a }
    const hsv = rgbToHsv(r, g, b, a)
    return {
      hsv,
      rgb,
      hex: rgbToHex(r, g, b)
    }
  }

  // 3. hsl(a)
  const hslMatch = raw.match(
    /hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?(?:\s*,\s*([\d.]+))?\s*\)/i
  )
  if (hslMatch) {
    const h = parseInt(hslMatch[1]!, 10)
    const s = parseInt(hslMatch[2]!, 10)
    const l = parseInt(hslMatch[3]!, 10)
    const a = hslMatch[4] !== undefined ? parseFloat(hslMatch[4]) : 1
    const rgb = hslToRgb(h, s, l, a)
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b, a)
    return {
      hsv,
      rgb,
      hex: rgbToHex(rgb.r, rgb.g, rgb.b)
    }
  }

  // Fallback à #0A0A0C
  const fallbackRgb: RgbColor = { r: 10, g: 10, b: 12, a: 1 }
  return {
    hsv: rgbToHsv(10, 10, 12, 1),
    rgb: fallbackRgb,
    hex: '#0A0A0C'
  }
}

/** Liste initiale des couleurs enregistrées correspondant à la maquette. */
export const DEFAULT_SAVED_COLORS = [
  '#EF4444',
  '#F97316',
  '#FBBF24',
  '#4ADE80',
  '#2DD4BF',
  '#3B82F6',
  '#4F46E5',
  '#EC4899',
  '#E11D48',
  '#D946EF',
  '#8B5CF6',
  '#0EA5E9',
  '#10B981',
  '#84CC16'
]
