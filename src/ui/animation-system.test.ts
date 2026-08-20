import { describe, expect, it } from 'vitest'
import {
  ANIMATION_PRESETS,
  PERSONALITY_PRESETS,
  calculate3DAnimation,
  type AnimationCalculationInput
} from './animation-system'

describe('3D Animation System Engine', () => {
  it('contains all required animation presets across 6 categories including Personality', () => {
    const categories = new Set(ANIMATION_PRESETS.map((p) => p.category))
    expect(categories.has('personality')).toBe(true)
    expect(categories.has('idle')).toBe(true)
    expect(categories.has('interactive')).toBe(true)
    expect(categories.has('physics')).toBe(true)
    expect(categories.has('effects')).toBe(true)
    expect(categories.has('transitions')).toBe(true)

    const ids = ANIMATION_PRESETS.map((p) => p.id)
    // 🎭 Main Personality Presets
    expect(ids).toContain('peek')
    expect(ids).toContain('curious')
    expect(ids).toContain('shy')
    expect(ids).toContain('excited')
    expect(ids).toContain('nod')
    expect(ids).toContain('nope')
    expect(ids).toContain('hello')
    expect(ids).toContain('sleepy')

    expect(PERSONALITY_PRESETS.length).toBe(8)

    // Idle
    expect(ids).toContain('none')
    expect(ids).toContain('float')
    expect(ids).toContain('breathe')
    expect(ids).toContain('wobble')
    expect(ids).toContain('autoRotate')
    expect(ids).toContain('lookAround')
    // Interactive
    expect(ids).toContain('tiltFollow')
    expect(ids).toContain('gazeFollow')
    expect(ids).toContain('magneticPull')
    expect(ids).toContain('hoverLift')
    // Physics
    expect(ids).toContain('springBack')
    expect(ids).toContain('jellyBounce')
    expect(ids).toContain('squashStretch')
    expect(ids).toContain('softWobble')
    // Effects
    expect(ids).toContain('lightSweep')
    expect(ids).toContain('glowPulse')
    expect(ids).toContain('shadowFollow')
    expect(ids).toContain('orbit')
    expect(ids).toContain('depthShift')
    // Transitions
    expect(ids).toContain('pop')
    expect(ids).toContain('morph')
    expect(ids).toContain('flip')
    expect(ids).toContain('spinBurst')
  })

  it('calculates Peek 👀: moves forward, looks around, then returns', () => {
    // Step forward at t = 0.4s
    const out1 = calculate3DAnimation({
      time: 0.4,
      delta: 0.016,
      activePersonality: 'peek',
      cursorX: 0,
      cursorY: 0,
      isHovered: false,
      isInteracting: false,
      config: { intensity: 0.8, speed: 1.0 }
    })
    expect(out1.translateZ).toBeGreaterThan(0)
    expect(out1.transformString).toContain('translate3d')

    // Looks around during peek phase at t = 1.2s
    const out2 = calculate3DAnimation({
      time: 1.2,
      delta: 0.016,
      activePersonality: 'peek',
      cursorX: 0,
      cursorY: 0,
      isHovered: false,
      isInteracting: false,
      config: { intensity: 0.8, speed: 1.0 }
    })
    expect(Math.abs(out2.rotateY) + Math.abs(out2.gazeOffsetX)).toBeGreaterThan(0)
  })

  it('calculates Curious 🤨: head tilt left, pause, right, center', () => {
    // Left tilt at t = 0.5s
    const outLeft = calculate3DAnimation({
      time: 0.5,
      delta: 0.016,
      activePersonality: 'curious',
      cursorX: 0,
      cursorY: 0,
      isHovered: false,
      isInteracting: false,
      config: { intensity: 1.0, speed: 1.0 }
    })
    expect(outLeft.rotateZ).toBeLessThan(0)

    // Right tilt at t = 2.4s
    const outRight = calculate3DAnimation({
      time: 2.4,
      delta: 0.016,
      activePersonality: 'curious',
      cursorX: 0,
      cursorY: 0,
      isHovered: false,
      isInteracting: false,
      config: { intensity: 1.0, speed: 1.0 }
    })
    expect(outRight.rotateZ).toBeGreaterThan(0)
  })

  it('calculates Shy 🫣: moves backward/down, pauses, peeks forward', () => {
    // Duck backward and down at t = 0.6s
    const outDuck = calculate3DAnimation({
      time: 0.6,
      delta: 0.016,
      activePersonality: 'shy',
      cursorX: 0,
      cursorY: 0,
      isHovered: false,
      isInteracting: false,
      config: { intensity: 0.9, speed: 1.0 }
    })
    expect(outDuck.translateZ).toBeLessThan(0)
    expect(outDuck.translateY).toBeGreaterThan(0)
    expect(outDuck.eyeScale).toBeLessThan(1.0)

    // Peeks forward at t = 2.4s
    const outPeek = calculate3DAnimation({
      time: 2.4,
      delta: 0.016,
      activePersonality: 'shy',
      cursorX: 0,
      cursorY: 0,
      isHovered: false,
      isInteracting: false,
      config: { intensity: 0.9, speed: 1.0 }
    })
    expect(outPeek.translateZ).toBeGreaterThan(outDuck.translateZ)
  })

  it('calculates Excited 🤩: quick double bounce + eyes widen', () => {
    // Bounce jump at t = 0.15s
    const outHop1 = calculate3DAnimation({
      time: 0.15,
      delta: 0.016,
      activePersonality: 'excited',
      cursorX: 0,
      cursorY: 0,
      isHovered: false,
      isInteracting: false,
      config: { intensity: 1.0, speed: 1.0 }
    })
    expect(outHop1.translateY).toBeLessThan(0)
    expect(outHop1.eyeScale).toBeGreaterThan(1.0)

    // Second bounce jump at t = 0.9s
    const outHop2 = calculate3DAnimation({
      time: 0.9,
      delta: 0.016,
      activePersonality: 'excited',
      cursorX: 0,
      cursorY: 0,
      isHovered: false,
      isInteracting: false,
      config: { intensity: 1.0, speed: 1.0 }
    })
    expect(outHop2.translateY).toBeLessThan(0)
    expect(outHop2.eyeScale).toBeGreaterThan(1.0)
  })

  it('calculates Nod 😊: smooth 3D head nodding movement', () => {
    const outNod = calculate3DAnimation({
      time: 0.3,
      delta: 0.016,
      activePersonality: 'nod',
      cursorX: 0,
      cursorY: 0,
      isHovered: false,
      isInteracting: false,
      config: { intensity: 1.0, speed: 1.0 }
    })
    expect(Math.abs(outNod.rotateX)).toBeGreaterThan(0)
    expect(Math.abs(outNod.translateY)).toBeGreaterThan(0)
  })

  it('calculates Nope 😑: rotational head shake left to right to left', () => {
    const outShake = calculate3DAnimation({
      time: 0.3,
      delta: 0.016,
      activePersonality: 'nope',
      cursorX: 0,
      cursorY: 0,
      isHovered: false,
      isInteracting: false,
      config: { intensity: 1.0, speed: 1.0 }
    })
    expect(Math.abs(outShake.rotateY)).toBeGreaterThan(0)
  })

  it('calculates Hello 👋: friendly forward pop with wave rotation', () => {
    const outHello = calculate3DAnimation({
      time: 0.2,
      delta: 0.016,
      activePersonality: 'hello',
      cursorX: 0,
      cursorY: 0,
      isHovered: false,
      isInteracting: false,
      config: { intensity: 1.0, speed: 1.0 }
    })
    expect(outHello.translateZ).toBeGreaterThan(0)
    expect(Math.abs(outHello.rotateZ)).toBeGreaterThan(0)
  })

  it('calculates Sleepy 😴: slow droop downward, pause, and wake-up snap', () => {
    // Drowsy droop down at t = 1.5s
    const outDroop = calculate3DAnimation({
      time: 1.5,
      delta: 0.016,
      activePersonality: 'sleepy',
      cursorX: 0,
      cursorY: 0,
      isHovered: false,
      isInteracting: false,
      config: { intensity: 1.0, speed: 1.0 }
    })
    expect(outDroop.translateY).toBeGreaterThan(0)
    expect(outDroop.rotateX).toBeGreaterThan(0)
    expect(outDroop.eyeScale).toBeLessThan(1.0)

    // Wake up snap at t = 3.4s
    const outWake = calculate3DAnimation({
      time: 3.4,
      delta: 0.016,
      activePersonality: 'sleepy',
      cursorX: 0,
      cursorY: 0,
      isHovered: false,
      isInteracting: false,
      config: { intensity: 1.0, speed: 1.0 }
    })
    expect(outWake.translateY).toBeLessThan(outDroop.translateY)
    expect(outWake.eyeScale).toBeGreaterThan(1.0)
  })

  it('calculates float animation without exceeding safe amplitude', () => {
    const input: AnimationCalculationInput = {
      time: 1.5,
      delta: 0.016,
      activeIdle: 'float',
      activeInteractive: 'none',
      activePhysics: 'none',
      activeEffect: 'none',
      activeTransition: 'none',
      cursorX: 0,
      cursorY: 0,
      isHovered: false,
      isInteracting: false,
      config: { intensity: 0.5, speed: 1.0 }
    }

    const out = calculate3DAnimation(input)
    expect(Math.abs(out.translateY)).toBeLessThanOrEqual(15)
    expect(Math.abs(out.rotateX)).toBeLessThanOrEqual(5)
    expect(out.transformString).toContain('translate3d')
  })

  it('calculates breathe animation scaling smoothly', () => {
    const input: AnimationCalculationInput = {
      time: 2.0,
      delta: 0.016,
      activeIdle: 'breathe',
      activeInteractive: 'none',
      activePhysics: 'none',
      activeEffect: 'none',
      activeTransition: 'none',
      cursorX: 0,
      cursorY: 0,
      isHovered: false,
      isInteracting: false,
      config: { intensity: 0.5 }
    }

    const out = calculate3DAnimation(input)
    expect(out.scaleX).toBeGreaterThanOrEqual(0.95)
    expect(out.scaleX).toBeLessThanOrEqual(1.05)
    expect(out.scaleY).toBeGreaterThanOrEqual(0.95)
    expect(out.scaleY).toBeLessThanOrEqual(1.05)
  })

  it('calculates tiltFollow responsive to cursor position', () => {
    const input: AnimationCalculationInput = {
      time: 0,
      delta: 0.016,
      activeIdle: 'none',
      activeInteractive: 'tiltFollow',
      activePhysics: 'none',
      activeEffect: 'none',
      activeTransition: 'none',
      cursorX: 0.5,
      cursorY: -0.5,
      isHovered: true,
      isInteracting: false,
      config: { maxTilt: 20, intensity: 1.0, sensitivity: 1.0 }
    }

    const out = calculate3DAnimation(input)
    expect(out.rotateY).toBeCloseTo(10, 1)
    expect(out.rotateX).toBeCloseTo(10, 1)
  })

  it('calculates magneticPull shifting element toward cursor', () => {
    const input: AnimationCalculationInput = {
      time: 0,
      delta: 0.016,
      activeIdle: 'none',
      activeInteractive: 'magneticPull',
      activePhysics: 'none',
      activeEffect: 'none',
      activeTransition: 'none',
      cursorX: 0.8,
      cursorY: 0.4,
      isHovered: true,
      isInteracting: false,
      config: { intensity: 1.0, sensitivity: 1.0 }
    }

    const out = calculate3DAnimation(input)
    expect(out.translateX).toBeGreaterThan(15)
    expect(out.translateY).toBeGreaterThan(7)
  })

  it('returns empty transform string when all animations are none (pure baseline)', () => {
    const input: AnimationCalculationInput = {
      time: 0,
      delta: 0.016,
      activePersonality: 'none',
      activeIdle: 'none',
      activeInteractive: 'none',
      activePhysics: 'none',
      activeEffect: 'none',
      activeTransition: 'none',
      cursorX: 0,
      cursorY: 0,
      isHovered: false,
      isInteracting: false
    }

    const out = calculate3DAnimation(input)
    expect(out.transformString).toBe('')
  })
})
