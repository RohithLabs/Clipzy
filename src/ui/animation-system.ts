/**
 * Pure Mathematical 3D Animation & Physics Engine
 *
 * Provides modular, reusable animation calculations for 3D elements:
 * - Personality: Peek, Curious, Shy, Excited, Nod, Nope, Hello, Sleepy
 * - Idle: Float, Breathe, Wobble, Auto Rotate, Look Around
 * - Interactive: Tilt Follow, Gaze Follow, Magnetic Pull, Hover Lift
 * - Physics: Spring Back, Jelly Bounce, Squash & Stretch, Soft Wobble
 * - Effects: Light Sweep, Glow Pulse, Shadow Follow, Orbit, Depth Shift
 * - Transitions: Pop, Morph, Flip, Spin Burst
 */

export type PersonalityAnimationType =
  | 'none'
  | 'peek'
  | 'curious'
  | 'shy'
  | 'excited'
  | 'nod'
  | 'nope'
  | 'hello'
  | 'sleepy'

export type IdleAnimationType =
  | 'none'
  | 'float'
  | 'breathe'
  | 'wobble'
  | 'autoRotate'
  | 'lookAround'

export type InteractiveAnimationType =
  | 'none'
  | 'tiltFollow'
  | 'gazeFollow'
  | 'magneticPull'
  | 'hoverLift'

export type PhysicsAnimationType =
  | 'none'
  | 'springBack'
  | 'jellyBounce'
  | 'squashStretch'
  | 'softWobble'

export type EffectAnimationType =
  | 'none'
  | 'lightSweep'
  | 'glowPulse'
  | 'shadowFollow'
  | 'orbit'
  | 'depthShift'

export type TransitionAnimationType =
  | 'none'
  | 'pop'
  | 'morph'
  | 'flip'
  | 'spinBurst'

export type AnimationType =
  | PersonalityAnimationType
  | IdleAnimationType
  | InteractiveAnimationType
  | PhysicsAnimationType
  | EffectAnimationType
  | TransitionAnimationType

export type AnimationCategory =
  | 'personality'
  | 'idle'
  | 'interactive'
  | 'physics'
  | 'effects'
  | 'transitions'

export interface AnimationConfig {
  /** Master intensity multiplier (0 to 1, default: 0.5) */
  intensity: number
  /** Animation speed multiplier (0.1 to 2, default: 1.0) */
  speed: number
  /** Duration for transition animations in ms (default: 800) */
  duration: number
  /** Delay before animation in ms (default: 0) */
  delay: number
  /** Whether animation loops continuously (default: true) */
  loop: boolean
  /** Whether animation plays automatically (default: true) */
  autoPlay: boolean

  // Physics parameters
  /** Spring stiffness / strength (0.01 to 0.5, default: 0.12) */
  springStrength: number
  /** Damping factor (0.1 to 0.95, default: 0.82) */
  damping: number
  /** Elastic bounce factor (0 to 1, default: 0.35) */
  bounce: number

  // Interactive parameters
  /** Cursor sensitivity multiplier (0.1 to 2.5, default: 1.0) */
  sensitivity: number
  /** Maximum tilt angle in degrees (5 to 45, default: 15) */
  maxTilt: number
  /** Return speed when cursor leaves (0.01 to 0.5, default: 0.1) */
  returnSpeed: number
  /** Interaction smoothing factor (0.05 to 0.9, default: 0.75) */
  smoothing: number
  /** Rotation axis for autoRotate ('x' | 'y' | 'z' | 'all', default: 'y') */
  axis: 'x' | 'y' | 'z' | 'all'
}

export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  intensity: 0.5,
  speed: 1.0,
  duration: 800,
  delay: 0,
  loop: true,
  autoPlay: true,
  springStrength: 0.12,
  damping: 0.82,
  bounce: 0.35,
  sensitivity: 1.0,
  maxTilt: 15,
  returnSpeed: 0.1,
  smoothing: 0.75,
  axis: 'y'
}

export interface AnimationPresetItem {
  id: AnimationType
  category: AnimationCategory
  name: string
  emoji?: string
  description: string
  defaultIntensity: number
  defaultSpeed: number
  icon: string
}

export const ANIMATION_PRESETS: AnimationPresetItem[] = [
  // --- 🎭 MAIN PRESETS: PERSONALITY ANIMATIONS ---
  {
    id: 'peek',
    category: 'personality',
    name: 'Peek',
    emoji: '👀',
    description: 'Element slightly moves forward, looks around, then returns.',
    defaultIntensity: 0.7,
    defaultSpeed: 1.0,
    icon: 'eye'
  },
  {
    id: 'curious',
    category: 'personality',
    name: 'Curious',
    emoji: '🤨',
    description: 'Tilts its head left → pauses → right → center.',
    defaultIntensity: 0.75,
    defaultSpeed: 0.95,
    icon: 'help-circle'
  },
  {
    id: 'shy',
    category: 'personality',
    name: 'Shy',
    emoji: '🫣',
    description: 'Moves backward/down slightly, then peeks forward.',
    defaultIntensity: 0.7,
    defaultSpeed: 0.9,
    icon: 'shield-off'
  },
  {
    id: 'excited',
    category: 'personality',
    name: 'Excited',
    emoji: '🤩',
    description: 'Quick double bounce + eyes widen with joyful stretch.',
    defaultIntensity: 0.85,
    defaultSpeed: 1.15,
    icon: 'zap'
  },
  {
    id: 'nod',
    category: 'personality',
    name: 'Nod',
    emoji: '😊',
    description: 'Smooth down → up → center 3D head movement.',
    defaultIntensity: 0.7,
    defaultSpeed: 1.0,
    icon: 'check-circle'
  },
  {
    id: 'nope',
    category: 'personality',
    name: 'Nope',
    emoji: '😑',
    description: 'Rotates left → right → left → center in disagreement.',
    defaultIntensity: 0.75,
    defaultSpeed: 1.1,
    icon: 'x-circle'
  },
  {
    id: 'hello',
    category: 'personality',
    name: 'Hello',
    emoji: '👋',
    description: 'Quick friendly forward pop with a tiny rotation.',
    defaultIntensity: 0.8,
    defaultSpeed: 1.05,
    icon: 'hand'
  },
  {
    id: 'sleepy',
    category: 'personality',
    name: 'Sleepy',
    emoji: '😴',
    description: 'Slowly droops downward, pauses, then wakes up.',
    defaultIntensity: 0.75,
    defaultSpeed: 0.8,
    icon: 'moon'
  },

  // --- IDLE ---
  {
    id: 'none',
    category: 'idle',
    name: 'None',
    description: 'Static state with zero motion',
    defaultIntensity: 0,
    defaultSpeed: 1,
    icon: 'circle-off'
  },
  {
    id: 'float',
    category: 'idle',
    name: 'Float',
    description: 'Smooth vertical floating with subtle 3D pitch and roll',
    defaultIntensity: 0.45,
    defaultSpeed: 0.85,
    icon: 'waves'
  },
  {
    id: 'breathe',
    category: 'idle',
    name: 'Breathe',
    description: 'Gentle organic rhythmic expansion and relaxation',
    defaultIntensity: 0.4,
    defaultSpeed: 0.7,
    icon: 'activity'
  },
  {
    id: 'wobble',
    category: 'idle',
    name: 'Wobble',
    description: 'Subtle harmonic organic deformation for soft shapes',
    defaultIntensity: 0.5,
    defaultSpeed: 1.1,
    icon: 'sparkle'
  },
  {
    id: 'autoRotate',
    category: 'idle',
    name: 'Auto Rotate',
    description: 'Slow, continuous 3D rotation in space',
    defaultIntensity: 0.35,
    defaultSpeed: 0.5,
    icon: 'rotate-3d'
  },
  {
    id: 'lookAround',
    category: 'idle',
    name: 'Look Around',
    description: 'Gentle natural scanning gaze and ambient orientation',
    defaultIntensity: 0.5,
    defaultSpeed: 0.6,
    icon: 'eye'
  },

  // --- INTERACTIVE ---
  {
    id: 'tiltFollow',
    category: 'interactive',
    name: 'Tilt Follow',
    description: 'Element smoothly rotates toward cursor or touch position',
    defaultIntensity: 0.7,
    defaultSpeed: 1.0,
    icon: 'compass'
  },
  {
    id: 'gazeFollow',
    category: 'interactive',
    name: 'Gaze Follow',
    description: 'Eye and facial layers follow cursor within safe boundary limits',
    defaultIntensity: 0.8,
    defaultSpeed: 1.2,
    icon: 'target'
  },
  {
    id: 'magneticPull',
    category: 'interactive',
    name: 'Magnetic Pull',
    description: 'Gravitational 3D translation shifting toward the cursor',
    defaultIntensity: 0.55,
    defaultSpeed: 1.0,
    icon: 'magnet'
  },
  {
    id: 'hoverLift',
    category: 'interactive',
    name: 'Hover Lift',
    description: 'Smoothly elevates, slightly scales, and deepens shadow on hover',
    defaultIntensity: 0.6,
    defaultSpeed: 1.0,
    icon: 'arrow-up-circle'
  },

  // --- PHYSICS ---
  {
    id: 'springBack',
    category: 'physics',
    name: 'Spring Back',
    description: 'Natural damped harmonic oscillator return upon release',
    defaultIntensity: 0.65,
    defaultSpeed: 1.0,
    icon: 'repeat'
  },
  {
    id: 'jellyBounce',
    category: 'physics',
    name: 'Jelly Bounce',
    description: 'Squash-and-stretch elasticity proportional to motion velocity',
    defaultIntensity: 0.7,
    defaultSpeed: 1.2,
    icon: 'zap'
  },
  {
    id: 'squashStretch',
    category: 'physics',
    name: 'Squash & Stretch',
    description: 'Elastic vertical deformation during tilt and contact',
    defaultIntensity: 0.5,
    defaultSpeed: 1.0,
    icon: 'maximize-2'
  },
  {
    id: 'softWobble',
    category: 'physics',
    name: 'Soft Wobble',
    description: 'Residual decelerating harmonic resonance after movement',
    defaultIntensity: 0.6,
    defaultSpeed: 0.9,
    icon: 'radio'
  },

  // --- EFFECTS ---
  {
    id: 'lightSweep',
    category: 'effects',
    name: 'Light Sweep',
    description: 'Moving specular highlight sheen across the 3D surface',
    defaultIntensity: 0.6,
    defaultSpeed: 0.75,
    icon: 'sun'
  },
  {
    id: 'glowPulse',
    category: 'effects',
    name: 'Glow Pulse',
    description: 'Rhythmic ambient atmospheric neon aura pulsation',
    defaultIntensity: 0.5,
    defaultSpeed: 0.8,
    icon: 'disc'
  },
  {
    id: 'shadowFollow',
    category: 'effects',
    name: 'Shadow Follow',
    description: 'Dynamic shadow offset, blur, and opacity matched to 3D tilt',
    defaultIntensity: 0.75,
    defaultSpeed: 1.0,
    icon: 'layers'
  },
  {
    id: 'orbit',
    category: 'effects',
    name: 'Orbit',
    description: 'Satellites and ring particles revolving around the element',
    defaultIntensity: 0.65,
    defaultSpeed: 0.8,
    icon: 'globe'
  },
  {
    id: 'depthShift',
    category: 'effects',
    name: 'Depth Shift',
    description: 'Multi-layer parallax displacement proportional to Z-depth',
    defaultIntensity: 0.7,
    defaultSpeed: 1.0,
    icon: 'box'
  },

  // --- TRANSITIONS ---
  {
    id: 'pop',
    category: 'transitions',
    name: 'Pop',
    description: 'Springy scale pop-in animation (0 to 1.08 to 1.0)',
    defaultIntensity: 0.8,
    defaultSpeed: 1.0,
    icon: 'sparkles'
  },
  {
    id: 'morph',
    category: 'transitions',
    name: 'Morph',
    description: 'Smooth geometry interpolation transition',
    defaultIntensity: 0.6,
    defaultSpeed: 1.0,
    icon: 'refresh-cw'
  },
  {
    id: 'flip',
    category: 'transitions',
    name: 'Flip',
    description: 'Full 360-degree 3D card flip rotation',
    defaultIntensity: 0.75,
    defaultSpeed: 0.9,
    icon: 'shield'
  },
  {
    id: 'spinBurst',
    category: 'transitions',
    name: 'Spin Burst',
    description: 'High-speed 3D vortex entrance decelerating into rest',
    defaultIntensity: 0.85,
    defaultSpeed: 1.2,
    icon: 'wind'
  }
]

export const PERSONALITY_PRESETS = ANIMATION_PRESETS.filter(
  (p) => p.category === 'personality'
)

export interface AnimationCalculationInput {
  time: number // in seconds
  delta: number // in seconds
  activePersonality?: PersonalityAnimationType
  activeIdle?: IdleAnimationType
  activeInteractive?: InteractiveAnimationType
  activePhysics?: PhysicsAnimationType
  activeEffect?: EffectAnimationType
  activeTransition?: TransitionAnimationType
  cursorX: number // -1 to 1
  cursorY: number // -1 to 1
  isHovered: boolean
  isInteracting: boolean
  config?: Partial<AnimationConfig>
  transitionProgress?: number // 0 to 1 if active
}

export interface AnimationCalculationOutput {
  rotateX: number // degrees
  rotateY: number // degrees
  rotateZ: number // degrees
  translateX: number // px
  translateY: number // px
  translateZ: number // px
  scaleX: number
  scaleY: number
  scaleZ: number
  skewX: number // degrees
  skewY: number // degrees
  gazeOffsetX: number // -1 to 1 relative
  gazeOffsetY: number // -1 to 1 relative
  eyeScale: number // multiplier
  shadowOffsetX: number
  shadowOffsetY: number
  shadowBlur: number
  shadowOpacity: number
  glowPulse: number // 0 to 1
  glareX: number // 0 to 100%
  glareY: number // 0 to 100%
  glareAlpha: number // 0 to 1
  orbitAngle: number // radians
  parallaxX: number
  parallaxY: number
  transformString: string
}

/**
 * Pure frame calculator for 3D animation transforms.
 */
export function calculate3DAnimation(
  input: AnimationCalculationInput
): AnimationCalculationOutput {
  const cfg: AnimationConfig = {
    ...DEFAULT_ANIMATION_CONFIG,
    ...(input.config || {})
  }

  const intensity = Math.max(0, Math.min(cfg.intensity, 1))
  const speed = Math.max(0.1, Math.min(cfg.speed, 2.0))
  const t = input.time * speed

  let rotX = 0
  let rotY = 0
  let rotZ = 0
  let transX = 0
  let transY = 0
  let transZ = 0
  let scX = 1
  let scY = 1
  let scZ = 1
  let skX = 0
  let skY = 0
  let gazeOffsetX = 0
  let gazeOffsetY = 0
  let eyeScale = 1

  // 1. 🎭 PERSONALITY ANIMATIONS
  if (cfg.autoPlay && input.activePersonality && input.activePersonality !== 'none') {
    switch (input.activePersonality) {
      case 'peek': {
        // Peek: Moves forward, looks around, then returns (Period: 3.2s)
        const period = 3.2
        const p = (t % period) / period // 0 to 1

        if (p < 0.25) {
          // Phase 1: Step forward and slightly up
          const k = Math.sin((p / 0.25) * (Math.PI / 2))
          transZ += k * 35 * intensity
          transY -= k * 10 * intensity
          scX *= 1 + k * 0.06 * intensity
          scY *= 1 + k * 0.06 * intensity
          rotX -= k * 4 * intensity
        } else if (p < 0.7) {
          // Phase 2: Peeked out - looks left, then looks right
          const glanceP = (p - 0.25) / 0.45 // 0 to 1
          transZ += 35 * intensity
          transY -= 10 * intensity
          scX *= 1 + 0.06 * intensity
          scY *= 1 + 0.06 * intensity

          // Smooth scanning glance (left -> right -> center)
          const glanceAngle = Math.sin(glanceP * Math.PI * 2)
          rotY += glanceAngle * 18 * intensity
          rotZ += glanceAngle * 4 * intensity
          gazeOffsetX += glanceAngle * 0.8 * intensity
          gazeOffsetY += (Math.cos(glanceP * Math.PI * 2) - 1) * 0.15 * intensity
        } else {
          // Phase 3: Smooth return to origin and brief rest pause
          const returnP = (p - 0.7) / 0.3 // 0 to 1
          const k = Math.max(0, 1 - returnP * 1.4)
          transZ += k * 35 * intensity
          transY -= k * 10 * intensity
          scX *= 1 + k * 0.06 * intensity
          scY *= 1 + k * 0.06 * intensity
          rotX -= k * 4 * intensity
        }
        break
      }

      case 'curious': {
        // Curious: Tilts head left → pauses → right → center (Period: 3.6s)
        const period = 3.6
        const p = (t % period) / period

        if (p < 0.25) {
          // Tilt left smoothly
          const k = Math.sin((p / 0.25) * (Math.PI / 2))
          rotZ -= k * 16 * intensity
          rotY -= k * 10 * intensity
          transX -= k * 6 * intensity
          transY -= k * 4 * intensity
          gazeOffsetX -= k * 0.5 * intensity
          gazeOffsetY -= k * 0.3 * intensity
        } else if (p < 0.45) {
          // Curious pause holding left tilt
          rotZ -= 16 * intensity
          rotY -= 10 * intensity
          transX -= 6 * intensity
          transY -= 4 * intensity
          gazeOffsetX -= 0.5 * intensity
          gazeOffsetY -= 0.3 * intensity
        } else if (p < 0.7) {
          // Smooth transition to tilt right
          const shift = (p - 0.45) / 0.25
          const k = Math.sin(shift * Math.PI - Math.PI / 2) * 0.5 + 0.5 // 0 to 1
          const zAngle = -16 + k * 32
          const yAngle = -10 + k * 20
          rotZ += zAngle * intensity
          rotY += yAngle * intensity
          transX += (-6 + k * 12) * intensity
          transY += -4 * intensity
          gazeOffsetX += (-0.5 + k * 1.0) * intensity
          gazeOffsetY += -0.2 * intensity
        } else if (p < 0.85) {
          // Pause holding right tilt
          rotZ += 16 * intensity
          rotY += 10 * intensity
          transX += 6 * intensity
          transY -= 4 * intensity
          gazeOffsetX += 0.5 * intensity
          gazeOffsetY -= 0.2 * intensity
        } else {
          // Return smoothly to center
          const returnP = (p - 0.85) / 0.15
          const k = Math.cos(returnP * (Math.PI / 2))
          rotZ += k * 16 * intensity
          rotY += k * 10 * intensity
          transX += k * 6 * intensity
          transY -= k * 4 * intensity
          gazeOffsetX += k * 0.5 * intensity
          gazeOffsetY -= k * 0.2 * intensity
        }
        break
      }

      case 'shy': {
        // Shy: Moves backward/down slightly, then peeks forward (Period: 3.4s)
        const period = 3.4
        const p = (t % period) / period

        if (p < 0.35) {
          // Duck backward, downward, shrink slightly, look down
          const k = Math.sin((p / 0.35) * (Math.PI / 2))
          transZ -= k * 24 * intensity
          transY += k * 16 * intensity
          rotX -= k * 10 * intensity
          rotZ -= k * 5 * intensity
          scX *= 1 - k * 0.08 * intensity
          scY *= 1 - k * 0.08 * intensity
          gazeOffsetY += k * 0.7 * intensity
          eyeScale *= 1 - k * 0.15 * intensity
        } else if (p < 0.55) {
          // Timid pause while tucked away
          transZ -= 24 * intensity
          transY += 16 * intensity
          rotX -= 10 * intensity
          rotZ -= 5 * intensity
          scX *= 1 - 0.08 * intensity
          scY *= 1 - 0.08 * intensity
          gazeOffsetY += 0.7 * intensity
          eyeScale *= 1 - 0.15 * intensity
        } else if (p < 0.85) {
          // Hesitantly peek back up and slightly forward
          const peekP = (p - 0.55) / 0.3
          const k = Math.sin(peekP * Math.PI)
          transZ += (-24 + k * 36) * intensity
          transY += (16 - k * 20) * intensity
          rotX += (-10 + k * 12) * intensity
          rotZ += (-5 + k * 7) * intensity
          scX *= 1 + (k * 0.12 - 0.08) * intensity
          scY *= 1 + (k * 0.12 - 0.08) * intensity
          gazeOffsetY += (0.7 - k * 1.0) * intensity
          eyeScale *= 1 + (k * 0.25 - 0.15) * intensity
        } else {
          // Settle back to neutral
          const returnP = (p - 0.85) / 0.15
          const k = Math.cos(returnP * (Math.PI / 2))
          transZ -= k * 6 * intensity
          transY += k * 4 * intensity
          rotX -= k * 2 * intensity
        }
        break
      }

      case 'excited': {
        // Excited: Quick double bounce + eyes widen (Period: 2.0s)
        const period = 2.0
        const p = (t % period) / period

        if (p < 0.3) {
          // Bounce 1: quick hop
          const bounceP = p / 0.3
          const hop = Math.sin(bounceP * Math.PI)
          transY -= hop * 20 * intensity
          // Squash upon takeoff & landing, stretch in air
          const squash = Math.sin(bounceP * Math.PI * 2) * 0.12 * intensity
          scY *= 1 + hop * 0.12 * intensity - squash * 0.5
          scX *= 1 - hop * 0.08 * intensity + squash * 0.5
          rotZ += Math.sin(bounceP * Math.PI) * 4 * intensity
          eyeScale *= 1 + hop * 0.2 * intensity
        } else if (p < 0.65) {
          // Bounce 2: higher happy jump + joyful wobble
          const bounceP = (p - 0.3) / 0.35
          const hop = Math.sin(bounceP * Math.PI)
          transY -= hop * 30 * intensity
          transZ += hop * 18 * intensity
          scY *= 1 + hop * 0.16 * intensity
          scX *= 1 - hop * 0.1 * intensity
          rotZ -= Math.sin(bounceP * Math.PI) * 6 * intensity
          eyeScale *= 1 + hop * 0.35 * intensity
          gazeOffsetY -= hop * 0.4 * intensity
        } else if (p < 0.85) {
          // Joyful post-bounce stretch & eye widen
          const settleP = (p - 0.65) / 0.2
          const k = Math.sin(settleP * Math.PI)
          scX *= 1 + k * 0.06 * intensity
          scY *= 1 + k * 0.06 * intensity
          eyeScale *= 1 + k * 0.2 * intensity
          transZ += k * 10 * intensity
        }
        break
      }

      case 'nod': {
        // Nod: Smooth down → up → center 3D head movement (Period: 2.4s)
        const period = 2.4
        const p = (t % period) / period

        if (p < 0.7) {
          // Double affirmative smooth head nod
          const nodP = (p / 0.7) * Math.PI * 4 // two full harmonic waves
          const nodAmount = Math.sin(nodP) * Math.exp(-p * 1.5)
          rotX += nodAmount * 18 * intensity
          transY += nodAmount * 12 * intensity
          transZ += nodAmount * 8 * intensity
          gazeOffsetY += nodAmount * 0.6 * intensity
          scY *= 1 - nodAmount * 0.04 * intensity
        }
        break
      }

      case 'nope': {
        // Nope: Rotates left → right → left → center (Period: 2.6s)
        const period = 2.6
        const p = (t % period) / period

        if (p < 0.75) {
          // Disapproving head shake left -> right -> left -> center
          const shakeP = (p / 0.75) * Math.PI * 5
          const decay = Math.exp(-p * 2.2)
          const shake = Math.sin(shakeP) * decay
          rotY += shake * 26 * intensity
          rotZ += shake * 5 * intensity
          transX += shake * 8 * intensity
          gazeOffsetX += shake * 0.9 * intensity
          // Flat skeptical squash
          scY *= 1 - 0.04 * intensity
          scX *= 1 + 0.04 * intensity
        }
        break
      }

      case 'hello': {
        // Hello: Quick friendly forward pop with a tiny wave rotation (Period: 2.2s)
        const period = 2.2
        const p = (t % period) / period

        if (p < 0.3) {
          // Energetic friendly forward pop
          const popP = p / 0.3
          const hop = Math.sin(popP * Math.PI)
          transZ += hop * 35 * intensity
          transY -= hop * 14 * intensity
          scX *= 1 + hop * 0.09 * intensity
          scY *= 1 + hop * 0.09 * intensity
          eyeScale *= 1 + hop * 0.25 * intensity
        }

        if (p < 0.7) {
          // Friendly wave tilt wobble (rotateZ oscillating like a cheery wave)
          const waveP = (p / 0.7) * Math.PI * 6
          const decay = Math.exp(-p * 1.8)
          const wave = Math.sin(waveP) * decay
          rotZ += wave * 14 * intensity
          rotY += wave * 8 * intensity
          transX += wave * 6 * intensity
        }
        break
      }

      case 'sleepy': {
        // Sleepy: Slowly droops downward, pauses, then wakes up (Period: 4.2s)
        const period = 4.2
        const p = (t % period) / period

        if (p < 0.5) {
          // Slow heavy downward droop
          const droopP = p / 0.5
          const k = Math.sin(droopP * (Math.PI / 2))
          transY += k * 20 * intensity
          rotX += k * 18 * intensity
          rotZ += k * 6 * intensity
          scY *= 1 - k * 0.06 * intensity
          scX *= 1 + k * 0.04 * intensity
          gazeOffsetY += k * 0.8 * intensity
          eyeScale *= 1 - k * 0.35 * intensity
        } else if (p < 0.72) {
          // Snoozing deep nod pause
          transY += 20 * intensity
          rotX += 18 * intensity
          rotZ += 6 * intensity
          scY *= 1 - 0.06 * intensity
          scX *= 1 + 0.04 * intensity
          gazeOffsetY += 0.8 * intensity
          eyeScale *= 1 - 0.35 * intensity
        } else if (p < 0.88) {
          // Startled wake-up snap! (Jolt up, eyes snap open)
          const wakeP = (p - 0.72) / 0.16
          const snap = Math.sin(wakeP * Math.PI)
          transY += (20 - snap * 32) * intensity
          rotX += (18 - snap * 26) * intensity
          rotZ += (6 - snap * 10) * intensity
          scY *= 1 + snap * 0.1 * intensity
          scX *= 1 + snap * 0.1 * intensity
          eyeScale *= 1 + snap * 0.4 * intensity
          transZ += snap * 15 * intensity
          gazeOffsetY -= snap * 0.5 * intensity
        }
        break
      }

      default:
        break
    }
  }

  // 2. IDLE ANIMATIONS
  if (cfg.autoPlay && input.activeIdle && input.activeIdle !== 'none') {
    switch (input.activeIdle) {
      case 'float': {
        const ampY = 12 * intensity
        const ampRot = 3.5 * intensity
        transY += Math.sin(t * 1.8) * ampY
        rotX += Math.cos(t * 1.5) * ampRot
        rotZ += Math.sin(t * 1.2) * (ampRot * 0.6)
        break
      }
      case 'breathe': {
        const expansion = 0.035 * intensity
        const scaleVal = 1 + Math.sin(t * 1.6) * expansion
        scX *= scaleVal
        scY *= scaleVal
        transY += -Math.sin(t * 1.6) * (3 * intensity)
        break
      }
      case 'wobble': {
        const wob = 0.045 * intensity
        scX *= 1 + Math.sin(t * 2.8) * wob
        scY *= 1 - Math.sin(t * 2.8) * (wob * 0.9)
        rotZ += Math.sin(t * 2.2) * (4 * intensity)
        skX += Math.cos(t * 2.0) * (2 * intensity)
        break
      }
      case 'autoRotate': {
        const rotSpeed = t * 30 * intensity
        if (cfg.axis === 'x') rotX += rotSpeed
        else if (cfg.axis === 'z') rotZ += rotSpeed
        else if (cfg.axis === 'all') {
          rotX += rotSpeed * 0.7
          rotY += rotSpeed
          rotZ += rotSpeed * 0.4
        } else {
          rotY += rotSpeed
        }
        break
      }
      case 'lookAround': {
        const gazeT = t * 0.7
        rotY += (Math.sin(gazeT) + 0.4 * Math.sin(gazeT * 2.3)) * (10 * intensity)
        rotX += (Math.cos(gazeT * 1.3) * 0.6) * (6 * intensity)
        gazeOffsetX += Math.sin(gazeT) * 0.5 * intensity
        gazeOffsetY += Math.cos(gazeT * 1.3) * 0.4 * intensity
        break
      }
      default:
        break
    }
  }

  // 3. INTERACTIVE ANIMATIONS
  const maxTilt = cfg.maxTilt * intensity * cfg.sensitivity
  const targetTiltX = -input.cursorY * maxTilt
  const targetTiltY = input.cursorX * maxTilt

  if (input.activeInteractive && input.activeInteractive !== 'none') {
    switch (input.activeInteractive) {
      case 'tiltFollow': {
        rotX += targetTiltX
        rotY += targetTiltY
        break
      }
      case 'gazeFollow': {
        rotX += targetTiltX * 0.6
        rotY += targetTiltY * 0.6
        gazeOffsetX += input.cursorX * 0.85
        gazeOffsetY += input.cursorY * 0.85
        break
      }
      case 'magneticPull': {
        const pullDist = 24 * intensity * cfg.sensitivity
        transX += input.cursorX * pullDist
        transY += input.cursorY * pullDist
        rotX += targetTiltX * 0.4
        rotY += targetTiltY * 0.4
        break
      }
      case 'hoverLift': {
        if (input.isHovered) {
          transY -= 14 * intensity
          transZ += 20 * intensity
          const liftScale = 1 + 0.04 * intensity
          scX *= liftScale
          scY *= liftScale
        }
        rotX += targetTiltX * 0.5
        rotY += targetTiltY * 0.5
        break
      }
      default:
        break
    }
  }

  // 4. PHYSICS ANIMATIONS
  if (input.activePhysics && input.activePhysics !== 'none') {
    switch (input.activePhysics) {
      case 'jellyBounce': {
        const speedMagnitude = Math.hypot(input.cursorX, input.cursorY)
        const jellyAmount = Math.min(speedMagnitude * 0.08 * intensity * cfg.bounce, 0.15)
        scX *= 1 + jellyAmount
        scY *= 1 - jellyAmount * 0.85
        break
      }
      case 'squashStretch': {
        const tiltMag = Math.hypot(rotX, rotY) / 30
        const stretch = Math.min(tiltMag * 0.06 * intensity, 0.1)
        scY *= 1 + stretch
        scX *= 1 - stretch * 0.6
        break
      }
      case 'softWobble': {
        if (input.isInteracting) {
          const decay = Math.sin(t * 6) * (0.03 * intensity)
          scX *= 1 + decay
          scY *= 1 - decay
        }
        break
      }
      case 'springBack':
      default:
        break
    }
  }

  // 5. TRANSITIONS
  if (input.activeTransition && input.activeTransition !== 'none' && input.transitionProgress !== undefined) {
    const p = Math.max(0, Math.min(input.transitionProgress, 1))
    switch (input.activeTransition) {
      case 'pop': {
        // Elastic overshoot pop
        const scalePop = p < 0.7 ? (p / 0.7) * (1 + 0.12 * intensity) : 1 + (1 - p) * 0.12 * intensity
        scX *= scalePop
        scY *= scalePop
        break
      }
      case 'flip': {
        rotY += (1 - p) * 360 * intensity
        break
      }
      case 'spinBurst': {
        rotZ += (1 - p) * 720 * intensity
        const burstScale = Math.min(p * (1 + 0.15 * intensity), 1)
        scX *= burstScale
        scY *= burstScale
        break
      }
      case 'morph': {
        const pulse = Math.sin(p * Math.PI) * 0.08 * intensity
        scX *= 1 + pulse
        scY *= 1 - pulse
        break
      }
      default:
        break
    }
  }

  // 6. EFFECTS CALCULATION
  const tiltNormX = rotY / Math.max(maxTilt, 1)
  const tiltNormY = -rotX / Math.max(maxTilt, 1)

  // Dynamic shadow
  const shadowBaseY = 16 + (input.isHovered ? 12 * intensity : 0)
  const shadowOffsetX = tiltNormX * (22 * intensity)
  const shadowOffsetY = shadowBaseY + tiltNormY * (16 * intensity)
  const shadowBlur = 24 + (input.isHovered ? 18 * intensity : 0)
  const shadowOpacity = 0.15 + (input.isHovered ? 0.12 * intensity : 0)

  // Specular Glare & Light Sweep
  let glareX = 50 + tiltNormX * 35
  let glareY = 50 + tiltNormY * 35
  let glareAlpha = (Math.hypot(tiltNormX, tiltNormY) * 0.4 + 0.1) * intensity

  if (input.activeEffect === 'lightSweep') {
    const sweepProgress = (t * 0.8) % 1
    glareX = sweepProgress * 120 - 10
    glareY = 50 + Math.sin(sweepProgress * Math.PI * 2) * 15
    glareAlpha = Math.sin(sweepProgress * Math.PI) * 0.6 * intensity
  }

  // Glow pulse
  const glowPulse = 0.5 + Math.sin(t * 2.2) * 0.5 * intensity

  // Orbit angle
  const orbitAngle = (t * 1.5 * intensity) % (Math.PI * 2)

  // Parallax displacement
  const parallaxX = tiltNormX * 14 * intensity
  const parallaxY = tiltNormY * 14 * intensity

  // Final CSS 3D Transform String
  const isNeutral =
    Math.abs(transX) < 0.01 &&
    Math.abs(transY) < 0.01 &&
    Math.abs(transZ) < 0.01 &&
    Math.abs(rotX) < 0.01 &&
    Math.abs(rotY) < 0.01 &&
    Math.abs(rotZ) < 0.01 &&
    Math.abs(scX - 1) < 0.001 &&
    Math.abs(scY - 1) < 0.001 &&
    Math.abs(scZ - 1) < 0.001 &&
    Math.abs(skX) < 0.01 &&
    Math.abs(skY) < 0.01

  const transformString = isNeutral
    ? ''
    : `perspective(1000px) translate3d(${transX.toFixed(2)}px, ${transY.toFixed(2)}px, ${transZ.toFixed(2)}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) scale3d(${scX.toFixed(3)}, ${scY.toFixed(3)}, ${scZ.toFixed(3)}) skew(${skX.toFixed(2)}deg, ${skY.toFixed(2)}deg)`

  return {
    rotateX: rotX,
    rotateY: rotY,
    rotateZ: rotZ,
    translateX: transX,
    translateY: transY,
    translateZ: transZ,
    scaleX: scX,
    scaleY: scY,
    scaleZ: scZ,
    skewX: skX,
    skewY: skY,
    gazeOffsetX,
    gazeOffsetY,
    eyeScale,
    shadowOffsetX,
    shadowOffsetY,
    shadowBlur,
    shadowOpacity,
    glowPulse,
    glareX,
    glareY,
    glareAlpha,
    orbitAngle,
    parallaxX,
    parallaxY,
    transformString
  }
}
