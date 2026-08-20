import { describe, expect, it } from 'vitest'
import {
  calcGlare,
  calcRotation,
  calcShadow,
  clamp,
  depthTransform,
  springStep
} from './interactive-3d'

describe('Interactive 3D Engine', () => {
  const rect = { left: 100, top: 100, width: 200, height: 200 }

  describe('calcRotation', () => {
    it('returns zero rotation at center of element', () => {
      const res = calcRotation(200, 200, rect, 15, 1)
      expect(res.rotateX).toBeCloseTo(0, 2)
      expect(res.rotateY).toBeCloseTo(0, 2)
      expect(res.xRatio).toBeCloseTo(0, 2)
      expect(res.yRatio).toBeCloseTo(0, 2)
    })

    it('tilts correctly when cursor is at bottom-right', () => {
      const res = calcRotation(300, 300, rect, 15, 1)
      expect(res.xRatio).toBeCloseTo(1, 2)
      expect(res.yRatio).toBeCloseTo(1, 2)
      expect(res.rotateY).toBeCloseTo(15, 2)
      expect(res.rotateX).toBeCloseTo(-15, 2)
    })

    it('tilts correctly when cursor is at top-left', () => {
      const res = calcRotation(100, 100, rect, 15, 1)
      expect(res.xRatio).toBeCloseTo(-1, 2)
      expect(res.yRatio).toBeCloseTo(-1, 2)
      expect(res.rotateY).toBeCloseTo(-15, 2)
      expect(res.rotateX).toBeCloseTo(15, 2)
    })

    it('clamps values outside bounds', () => {
      const res = calcRotation(500, -200, rect, 15, 1)
      expect(res.xRatio).toBe(1)
      expect(res.yRatio).toBe(-1)
      expect(res.rotateY).toBe(15)
      expect(res.rotateX).toBe(15)
    })

    it('scales with intensity multiplier', () => {
      const res = calcRotation(300, 200, rect, 15, 2)
      expect(res.rotateY).toBeCloseTo(30, 2)
    })
  })

  describe('calcGlare', () => {
    it('returns center glare with zero alpha at center', () => {
      const res = calcGlare(200, 200, rect, 0.4)
      expect(res.glareX).toBeCloseTo(50, 1)
      expect(res.glareY).toBeCloseTo(50, 1)
      expect(res.glareAlpha).toBeCloseTo(0, 2)
    })

    it('increases glare intensity as pointer approaches edges', () => {
      const res = calcGlare(300, 300, rect, 0.4)
      expect(res.glareX).toBeCloseTo(100, 1)
      expect(res.glareY).toBeCloseTo(100, 1)
      expect(res.glareAlpha).toBeGreaterThan(0.2)
    })
  })

  describe('calcShadow', () => {
    it('produces centered resting shadow with no tilt', () => {
      const res = calcShadow(0, 0, 15)
      expect(res.shadowOffsetX).toBe(0)
      expect(res.shadowOffsetY).toBe(14)
      expect(res.shadowBlur).toBe(24)
      expect(res.shadowAlpha).toBeCloseTo(0.12, 2)
    })

    it('shifts shadow inversely to rotation', () => {
      const res = calcShadow(0, 15, 15)
      expect(res.shadowOffsetX).toBeLessThan(0)
      expect(res.shadowBlur).toBeGreaterThan(24)
      expect(res.shadowAlpha).toBeGreaterThan(0.12)
    })
  })

  describe('springStep', () => {
    it('moves current toward target with damping', () => {
      let current = 0
      let velocity = 0
      const target = 10

      for (let i = 0; i < 60; i++) {
        const step = springStep(current, target, velocity, 0.1, 0.78)
        current = step.value
        velocity = step.velocity
      }

      expect(current).toBeCloseTo(10, 1)
      expect(Math.abs(velocity)).toBeLessThan(0.05)
    })
  })

  describe('depthTransform', () => {
    it('generates translate3d with depth and parallax', () => {
      const t = depthTransform(40, 1, 0.5, -0.5)
      expect(t).toContain('translate3d(')
      expect(t).toContain('40.00px)')
    })
  })

  describe('clamp', () => {
    it('clamps numbers within given range', () => {
      expect(clamp(5, 0, 10)).toBe(5)
      expect(clamp(-5, 0, 10)).toBe(0)
      expect(clamp(15, 0, 10)).toBe(10)
    })
  })
})
