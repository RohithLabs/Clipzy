<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  watch,
  type StyleValue
} from 'vue'
import {
  calcGlare,
  calcRotation,
  calcShadow,
  INTERACTIVE_3D_INJECTION_KEY,
  springStep,
  type Interactive3DContext
} from '@/ui/interactive-3d'

const props = withDefaults(
  defineProps<{
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
    /** Glare mix-blend-mode (default: 'overlay') */
    glareBlendMode?: string
    /** Spring stiffness coefficient for smoothing (0.01 to 0.5, default: 0.1) */
    stiffness?: number
    /** Spring damping ratio for inertia (0.1 to 0.95, default: 0.78) */
    damping?: number
    /** HTML tag or component to render (default: 'div') */
    as?: string
    /** Additional CSS classes */
    class?: string
    /** Custom styles */
    style?: StyleValue
    /** Disable 3D interaction */
    disabled?: boolean
  }>(),
  {
    maxRotation: 15,
    perspective: 1000,
    intensity: 1,
    resetOnLeave: true,
    enableShadow: true,
    enableGlow: false,
    glowColor: 'rgba(99, 102, 241, 0.35)',
    enableGlass: false,
    enableFloat: false,
    enableGlare: true,
    glareOpacity: 0.35,
    glareColor: 'rgba(255, 255, 255, 0.75)',
    glareBlendMode: 'overlay',
    stiffness: 0.1,
    damping: 0.78,
    as: 'div',
    class: '',
    style: undefined,
    disabled: false
  }
)

const emit = defineEmits<{
  change: [data: { rotateX: number; rotateY: number; xRatio: number; yRatio: number }]
  hover: [isHovered: boolean]
}>()

const rootRef = ref<HTMLElement | null>(null)

// Physics & Animation State
const rotateX = ref(0)
const rotateY = ref(0)
const xRatio = ref(0)
const yRatio = ref(0)
const glareX = ref(50)
const glareY = ref(50)
const glareAlpha = ref(0)
const isHovered = ref(false)
const isInteracting = ref(false)
const floatOffset = ref(0)

let targetRotateX = 0
let targetRotateY = 0
let targetGlareAlpha = 0
let targetXRatio = 0
let targetYRatio = 0
let velocityX = 0
let velocityY = 0
let animFrameId = 0
let cachedRect: DOMRect | null = null
let prefersReducedMotion = false

// Provide 3D context to child layers
const context: Interactive3DContext = {
  rotateX,
  rotateY,
  xRatio,
  yRatio,
  isInteracting,
  isHovered
}
provide(INTERACTIVE_3D_INJECTION_KEY, context)

// --- Shadow computation ---
const shadowStyle = computed(() => {
  if (!props.enableShadow) return {}
  const { shadowOffsetX, shadowOffsetY, shadowBlur, shadowSpread, shadowAlpha } = calcShadow(
    rotateX.value,
    rotateY.value,
    props.maxRotation
  )
  return {
    boxShadow: `${shadowOffsetX.toFixed(1)}px ${shadowOffsetY.toFixed(1)}px ${shadowBlur.toFixed(1)}px ${shadowSpread.toFixed(1)}px rgba(0, 0, 0, ${shadowAlpha.toFixed(3)})`
  }
})

// --- Glow computation ---
const glowStyle = computed(() => {
  if (!props.enableGlow) return {}
  const norm = Math.hypot(rotateX.value, rotateY.value) / Math.max(props.maxRotation, 1)
  const spread = 12 + norm * 20
  return {
    filter: `drop-shadow(0 0 ${spread.toFixed(1)}px ${props.glowColor})`
  }
})

// --- Glare style ---
const glareStyle = computed(() => {
  if (!props.enableGlare) return { display: 'none' }
  return {
    background: `radial-gradient(circle at ${glareX.value.toFixed(1)}% ${glareY.value.toFixed(1)}%, ${props.glareColor} 0%, transparent 65%)`,
    opacity: glareAlpha.value.toFixed(3),
    mixBlendMode: props.glareBlendMode as any
  }
})

// --- Master Card Transform Style ---
const cardTransformStyle = computed(() => {
  const rx = rotateX.value.toFixed(2)
  const ry = rotateY.value.toFixed(2)
  const fy = floatOffset.value.toFixed(2)

  let transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
  if (props.enableFloat && fy !== '0.00') {
    transform += ` translateY(${fy}px)`
  }

  return {
    transform,
    transformStyle: 'preserve-3d' as const,
    willChange: 'transform'
  }
})

// --- Animation / Physics Loop ---
function startAnimationLoop() {
  if (animFrameId) return

  const loop = (now: number) => {
    if (prefersReducedMotion || props.disabled) {
      rotateX.value = 0
      rotateY.value = 0
      glareAlpha.value = 0
      floatOffset.value = 0
      animFrameId = 0
      return
    }

    // Spring physics step for rotateX and rotateY
    const stepX = springStep(rotateX.value, targetRotateX, velocityX, props.stiffness, props.damping)
    const stepY = springStep(rotateY.value, targetRotateY, velocityY, props.stiffness, props.damping)

    rotateX.value = stepX.value
    velocityX = stepX.velocity

    rotateY.value = stepY.value
    velocityY = stepY.velocity

    // Lerp ratios and glare
    xRatio.value += (targetXRatio - xRatio.value) * 0.15
    yRatio.value += (targetYRatio - yRatio.value) * 0.15
    glareAlpha.value += (targetGlareAlpha - glareAlpha.value) * 0.15

    // Idle floating animation when not interacting
    if (props.enableFloat) {
      if (!isHovered.value) {
        floatOffset.value = Math.sin(now * 0.002) * 5
      } else {
        floatOffset.value += (0 - floatOffset.value) * 0.1
      }
    } else {
      floatOffset.value = 0
    }

    emit('change', {
      rotateX: rotateX.value,
      rotateY: rotateY.value,
      xRatio: xRatio.value,
      yRatio: yRatio.value
    })

    // Settle threshold to sleep rAF loop and preserve battery
    const isSettled =
      Math.abs(rotateX.value - targetRotateX) < 0.005 &&
      Math.abs(velocityX) < 0.005 &&
      Math.abs(rotateY.value - targetRotateY) < 0.005 &&
      Math.abs(velocityY) < 0.005 &&
      Math.abs(glareAlpha.value - targetGlareAlpha) < 0.005 &&
      (!props.enableFloat || isHovered.value)

    if (isSettled && !isHovered.value && !isInteracting.value) {
      rotateX.value = targetRotateX
      rotateY.value = targetRotateY
      glareAlpha.value = targetGlareAlpha
      floatOffset.value = 0
      animFrameId = 0
    } else {
      animFrameId = requestAnimationFrame(loop)
    }
  }

  animFrameId = requestAnimationFrame(loop)
}

function updateRect() {
  if (rootRef.value) {
    cachedRect = rootRef.value.getBoundingClientRect()
  }
}

// --- Pointer Events ---
function onPointerEnter(e: PointerEvent) {
  if (props.disabled || prefersReducedMotion) return
  isHovered.value = true
  emit('hover', true)
  updateRect()
  handlePointerMove(e)
}

function onPointerMove(e: PointerEvent) {
  if (props.disabled || prefersReducedMotion) return
  handlePointerMove(e)
}

function handlePointerMove(e: { clientX: number; clientY: number }) {
  if (!cachedRect) updateRect()
  if (!cachedRect) return

  const { rotateX: rx, rotateY: ry, xRatio: xr, yRatio: yr } = calcRotation(
    e.clientX,
    e.clientY,
    cachedRect,
    props.maxRotation,
    props.intensity
  )

  targetRotateX = rx
  targetRotateY = ry
  targetXRatio = xr
  targetYRatio = yr

  if (props.enableGlare) {
    const glare = calcGlare(e.clientX, e.clientY, cachedRect, props.glareOpacity)
    glareX.value = glare.glareX
    glareY.value = glare.glareY
    targetGlareAlpha = glare.glareAlpha
  }

  startAnimationLoop()
}

function onPointerLeave() {
  isHovered.value = false
  isInteracting.value = false
  emit('hover', false)

  if (props.resetOnLeave) {
    targetRotateX = 0
    targetRotateY = 0
    targetXRatio = 0
    targetYRatio = 0
    targetGlareAlpha = 0
    startAnimationLoop()
  }
}

// --- Touch Events for Mobile ---
function onTouchStart(e: TouchEvent) {
  if (props.disabled || prefersReducedMotion || !e.touches[0]) return
  isInteracting.value = true
  isHovered.value = true
  updateRect()
  handlePointerMove(e.touches[0])
}

function onTouchMove(e: TouchEvent) {
  if (props.disabled || prefersReducedMotion || !e.touches[0]) return
  handlePointerMove(e.touches[0])
}

function onTouchEnd() {
  isInteracting.value = false
  onPointerLeave()
}

// --- Keyboard Accessibility ---
function onKeyDown(e: KeyboardEvent) {
  if (props.disabled || prefersReducedMotion) return
  const step = props.maxRotation * 0.4

  if (e.key === 'ArrowUp') {
    targetRotateX = Math.min(targetRotateX + step, props.maxRotation)
    e.preventDefault()
    startAnimationLoop()
  } else if (e.key === 'ArrowDown') {
    targetRotateX = Math.max(targetRotateX - step, -props.maxRotation)
    e.preventDefault()
    startAnimationLoop()
  } else if (e.key === 'ArrowLeft') {
    targetRotateY = Math.max(targetRotateY - step, -props.maxRotation)
    e.preventDefault()
    startAnimationLoop()
  } else if (e.key === 'ArrowRight') {
    targetRotateY = Math.min(targetRotateY + step, props.maxRotation)
    e.preventDefault()
    startAnimationLoop()
  }
}

function onBlur() {
  if (props.resetOnLeave) {
    targetRotateX = 0
    targetRotateY = 0
    targetGlareAlpha = 0
    startAnimationLoop()
  }
}

// Check prefers-reduced-motion
onMounted(() => {
  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion = mediaQuery.matches

    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches
    }
    mediaQuery.addEventListener('change', handler)

    window.addEventListener('resize', updateRect, { passive: true })
    window.addEventListener('scroll', updateRect, { passive: true })

    if (props.enableFloat) {
      startAnimationLoop()
    }

    onBeforeUnmount(() => {
      mediaQuery.removeEventListener('change', handler)
      window.removeEventListener('resize', updateRect)
      window.removeEventListener('scroll', updateRect)
      if (animFrameId) cancelAnimationFrame(animFrameId)
    })
  }
})

watch(
  () => props.enableFloat,
  (enabled) => {
    if (enabled) startAnimationLoop()
  }
)
</script>

<template>
  <component
    :is="as"
    ref="rootRef"
    class="interactive-3d-root"
    :class="props.class"
    :style="[
      { perspective: `${props.perspective}px` },
      props.style
    ]"
    tabindex="0"
    role="region"
    @pointerenter="onPointerEnter"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
    @touchstart.passive="onTouchStart"
    @touchmove.passive="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
    @keydown="onKeyDown"
    @blur="onBlur"
  >
    <div
      ref="cardRef"
      class="interactive-3d-card"
      :class="{
        'interactive-3d-glass': props.enableGlass
      }"
      :style="[cardTransformStyle, shadowStyle, glowStyle]"
    >
      <!-- Slot content -->
      <slot
        :rotate-x="rotateX"
        :rotate-y="rotateY"
        :x-ratio="xRatio"
        :y-ratio="yRatio"
        :is-hovered="isHovered"
        :is-interacting="isInteracting"
        :glare-style="glareStyle"
        :shadow-style="shadowStyle"
      />

      <!-- Specular glare overlay -->
      <div
        v-if="props.enableGlare"
        class="interactive-3d-glare pointer-events-none"
        :style="glareStyle"
        aria-hidden="true"
      />
    </div>
  </component>
</template>

<style scoped>
.interactive-3d-root {
  display: inline-block;
  outline: none;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
}

.interactive-3d-root:focus-visible .interactive-3d-card {
  outline: 2px solid var(--ink, #0a0a0c);
  outline-offset: 4px;
}

.interactive-3d-card {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: box-shadow 0.2s ease-out;
  border-radius: inherit;
}

.interactive-3d-glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.interactive-3d-glare {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  overflow: hidden;
  transition: opacity 0.15s ease-out;
  z-index: 999;
}
</style>
