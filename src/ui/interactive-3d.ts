/**
 * Interactive 3D Physics and Transform Engine
 *
 * Provides pure mathematical calculations for 3D rotation, damped spring physics,
 * dynamic shadow casting, glare reflections, and parallax depth layers.
 */

export interface Interactive3DProps {
  /** Maximum rotation angle in degrees (default: 15) */
  maxRotation?: number
  /** CSS 3D perspective in pixels (default: 1000) */
  perspective?: number
  /** Intensity multiplier for tilt sensitivity (default: 1) */
  intensity?: number
  /** Whether to smoothly reset to center when pointer leaves (default: true) */
  resetOnLeave?: boolean
  /** Whether to generate dynamic 3D drop shadow (default: true) */
  enableShadow?: boolean
  /** Whether to generate dynamic ambient glow (default: false) */
  enableGlow?: boolean
  /** Custom glow color (default: 'rgba(99, 102, 241, 0.35)') */
  glowColor?: string
  /** Whether to apply frosted glassmorphism backdrop (default: false) */
  enableGlass?: boolean
  /** Whether to enable idle floating/breathing animation (default: false) */
  enableFloat?: boolean
  /** Whether to enable dynamic cursor-following specular glare (default: true) */
  enableGlare?: boolean
  /** Maximum opacity of the glare highlight (0 to 1, default: 0.35) */
  glareOpacity?: number
  /** Glare gradient color (default: 'rgba(255, 255, 255, 0.75)') */
  glareColor?: string
  /** Spring stiffness coefficient for smoothing (0.01 to 0.5, default: 0.1) */
  stiffness?: number
  /** Spring damping ratio for inertia (0.1 to 0.95, default: 0.78) */
  damping?: number
}

export interface Interactive3DLayerProps {
  /** 3D depth in pixels along the Z axis (default: 0) */
  depth?: number
  /** Additional 2D parallax movement multiplier (default: 1) */
  parallax?: number
  /** HTML tag or component to render (default: 'div') */
  as?: string
}

export interface Interactive3DState {
  /** Target rotation X in degrees (-max to +max) */
  targetRotateX: number
  /** Target rotation Y in degrees (-max to +max) */
  targetRotateY: number
  /** Current smoothed rotation X in degrees */
  rotateX: number
  /** Current smoothed rotation Y in degrees */
  rotateY: number
  /** Current velocity X */
  velocityX: number
  /** Current velocity Y */
  velocityY: number
  /** Cursor X ratio from center (-1 to +1) */
  xRatio: number
  /** Cursor Y ratio from center (-1 to +1) */
  yRatio: number
  /** Glare position X in percentage (0 to 100) */
  glareX: number
  /** Glare position Y in percentage (0 to 100) */
  glareY: number
  /** Glare current opacity */
  glareAlpha: number
  /** Whether pointer is actively interacting */
  isInteracting: boolean
  /** Whether pointer is currently hovering */
  isHovered: boolean
}

export interface Interactive3DContext {
  rotateX: { value: number }
  rotateY: { value: number }
  xRatio: { value: number }
  yRatio: { value: number }
  isInteracting: { value: boolean }
  isHovered: { value: boolean }
}

export const INTERACTIVE_3D_INJECTION_KEY = Symbol('Interactive3DContext')

/** Clamp a value between min and max */
export function clamp(v: number, min = -1, max = 1): number {
  return Math.min(Math.max(v, min), max)
}

/**
 * Calculates rotation angles from pointer coordinates relative to bounding rect.
 */
export function calcRotation(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number },
  maxRotation = 15,
  intensity = 1
): { rotateX: number; rotateY: number; xRatio: number; yRatio: number } {
  if (rect.width <= 0 || rect.height <= 0) {
    return { rotateX: 0, rotateY: 0, xRatio: 0, yRatio: 0 }
  }

  // Ratio from center: -1 (left/top) to +1 (right/bottom)
  const xRatio = clamp(((clientX - rect.left) / rect.width) * 2 - 1, -1, 1)
  const yRatio = clamp(((clientY - rect.top) / rect.height) * 2 - 1, -1, 1)

  // In 3D space: moving pointer up tilts element back (positive rotateX), moving down tilts forward (negative rotateX)
  const rotateX = -yRatio * maxRotation * intensity
  const rotateY = xRatio * maxRotation * intensity

  return { rotateX, rotateY, xRatio, yRatio }
}

/**
 * Calculates specular glare coordinates and opacity.
 */
export function calcGlare(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number },
  maxOpacity = 0.35
): { glareX: number; glareY: number; glareAlpha: number; glareAngle: number } {
  if (rect.width <= 0 || rect.height <= 0) {
    return { glareX: 50, glareY: 50, glareAlpha: 0, glareAngle: 0 }
  }

  const glareX = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100)
  const glareY = Math.min(Math.max(((clientY - rect.top) / rect.height) * 100, 0), 100)

  // Distance from center determines glare intensity
  const dx = (glareX - 50) / 50
  const dy = (glareY - 50) / 50
  const dist = Math.min(Math.hypot(dx, dy), 1.4)
  const glareAlpha = dist * maxOpacity

  // Angle in degrees from center
  const glareAngle = (Math.atan2(dy, dx) * 180) / Math.PI

  return { glareX, glareY, glareAlpha, glareAngle }
}

/**
 * Calculates realistic dynamic drop shadow parameters based on current tilt.
 */
export function calcShadow(
  rotateX: number,
  rotateY: number,
  maxRotation = 15
): {
  shadowOffsetX: number
  shadowOffsetY: number
  shadowBlur: number
  shadowSpread: number
  shadowAlpha: number
} {
  const normX = rotateY / Math.max(maxRotation, 1)
  const normY = -rotateX / Math.max(maxRotation, 1)

  // Shadow shifts in the opposite direction of the tilt
  const shadowOffsetX = normX === 0 ? 0 : -normX * 24
  const shadowOffsetY = normY === 0 ? 14 : normY * 24 + 14
  const tiltMagnitude = Math.hypot(normX, normY)

  const shadowBlur = 24 + tiltMagnitude * 28
  const shadowSpread = -4 + tiltMagnitude * 2
  const shadowAlpha = 0.12 + Math.min(tiltMagnitude * 0.18, 0.28)

  return { shadowOffsetX, shadowOffsetY, shadowBlur, shadowSpread, shadowAlpha }
}

/**
 * Step damped spring physics simulation for a single axis.
 */
export function springStep(
  current: number,
  target: number,
  velocity: number,
  stiffness = 0.1,
  damping = 0.78
): { value: number; velocity: number } {
  const force = (target - current) * stiffness
  const newVelocity = (velocity + force) * damping
  const newValue = current + newVelocity
  return { value: newValue, velocity: newVelocity }
}

/**
 * Computes 3D CSS transform for a depth layer.
 */
export function depthTransform(
  depth = 0,
  parallax = 1,
  xRatio = 0,
  yRatio = 0
): string {
  const px = xRatio * depth * 0.15 * parallax
  const py = yRatio * depth * 0.15 * parallax
  return `translate3d(${px.toFixed(2)}px, ${py.toFixed(2)}px, ${depth.toFixed(2)}px)`
}
