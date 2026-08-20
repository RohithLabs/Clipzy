import { describe, expect, it } from 'vitest'
import {
  hexToRgb,
  hslToRgb,
  hsvToRgb,
  parseColor,
  rgbToHex,
  rgbToHsl,
  rgbToHsv
} from './color-utils'

describe('color-utils', () => {
  it('convertit HSV en RGB et inversement', () => {
    // Rouge pur
    const redRgb = hsvToRgb(0, 1, 1)
    expect(redRgb).toEqual({ r: 255, g: 0, b: 0, a: 1 })
    expect(rgbToHsv(255, 0, 0)).toEqual({ h: 0, s: 1, v: 1, a: 1 })

    // Vert pur
    const greenRgb = hsvToRgb(120, 1, 1)
    expect(greenRgb).toEqual({ r: 0, g: 255, b: 0, a: 1 })
    expect(rgbToHsv(0, 255, 0)).toEqual({ h: 120, s: 1, v: 1, a: 1 })

    // Bleu pur
    const blueRgb = hsvToRgb(240, 1, 1)
    expect(blueRgb).toEqual({ r: 0, g: 0, b: 255, a: 1 })
    expect(rgbToHsv(0, 0, 255)).toEqual({ h: 240, s: 1, v: 1, a: 1 })

    // Blanc
    const whiteRgb = hsvToRgb(0, 0, 1)
    expect(whiteRgb).toEqual({ r: 255, g: 255, b: 255, a: 1 })
    expect(rgbToHsv(255, 255, 255)).toEqual({ h: 0, s: 0, v: 1, a: 1 })

    // Noir
    const blackRgb = hsvToRgb(0, 0, 0)
    expect(blackRgb).toEqual({ r: 0, g: 0, b: 0, a: 1 })
    expect(rgbToHsv(0, 0, 0)).toEqual({ h: 0, s: 0, v: 0, a: 1 })
  })

  it('gère les conversions Hex', () => {
    expect(rgbToHex(79, 70, 229)).toBe('#4F46E5')
    expect(hexToRgb('#4F46E5')).toEqual({ r: 79, g: 70, b: 229, a: 1 })
    expect(hexToRgb('4F46E5')).toEqual({ r: 79, g: 70, b: 229, a: 1 })
    expect(hexToRgb('#FFF')).toEqual({ r: 255, g: 255, b: 255, a: 1 })
    expect(hexToRgb('invalid')).toBeNull()
  })

  it('convertit HSL en RGB et inversement', () => {
    const hsl = rgbToHsl(79, 70, 229)
    expect(hsl.h).toBe(243)
    expect(hsl.s).toBe(75)
    expect(hsl.l).toBe(59)

    const rgb = hslToRgb(243, 75, 59)
    expect(Math.abs(rgb.r - 79)).toBeLessThanOrEqual(2)
    expect(Math.abs(rgb.g - 70)).toBeLessThanOrEqual(2)
    expect(Math.abs(rgb.b - 229)).toBeLessThanOrEqual(2)
  })

  it('parse les presets de couleur et les chaînes arbitraires', () => {
    const preset = parseColor('bleu')
    expect(preset.hex).toBe('#3B93F0')

    const hex = parseColor('#4F46E5')
    expect(hex.hex).toBe('#4F46E5')
    expect(hex.rgb).toEqual({ r: 79, g: 70, b: 229, a: 1 })

    const rgb = parseColor('rgb(79, 70, 229)')
    expect(rgb.hex).toBe('#4F46E5')

    const fallback = parseColor('non-existant')
    expect(fallback.hex).toBe('#0A0A0C')
  })
})
