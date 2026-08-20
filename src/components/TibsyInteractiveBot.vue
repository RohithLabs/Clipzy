<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  triggerRef,
  watch
} from 'vue'
import { BotEngine, type BotFrame } from '@/bot/engine'
import {
  DEFAULT_FEATURE_SIZE,
  DEFAULT_EYEBROWS,
  DEFAULT_NOSE,
  DEFAULT_CHEEKS,
  DEFAULT_MOUTH,
  type FeatureSize,
  type EyebrowsStyle,
  type NoseStyle,
  type CheeksStyle,
  type MouthStyle
} from '@/bot/face'
import { EXPRESSION_BY_ID } from '@/bot/expressions'
import { COLOR_BY_ID, DEFAULT_SHAPE, mixHex, SHAPE_BY_ID } from '@/bot/skins'
import { clamp, easings } from '@/bot/math'
import { DEMI_VIEWBOX, RAYON } from '@/bot/repere'
import { NOTIF_BLUE } from '@/bot/decor'
import { HUMEURS, lookTarget, TURN_TIME } from '@/ui/gaze'
import type { StateId } from '@/bot/states'
import type { Block } from '@/bot/cycles'

import {
  calculate3DAnimation,
  DEFAULT_ANIMATION_CONFIG,
  type AnimationConfig,
  type PersonalityAnimationType,
  type EffectAnimationType,
  type IdleAnimationType,
  type InteractiveAnimationType,
  type PhysicsAnimationType,
  type TransitionAnimationType
} from '@/ui/animation-system'

/**
 * TibsyInteractiveBot
 *
 * A standalone, production-ready interactive bot avatar that supports:
 * - All 14 classic state animations (idle, thinking, wink, wide, alert, notif, exclamation, sleep, egg, hexagon, play, orbit, burst, comet)
 * - Timeline cycle playback (multi-block animation sequences)
 * - Full SVG particle physics & decor (orbit rings, burst particles, notification badges)
 * - 3D spherical eye projection with cutout mask & realistic cursor gaze-following
 * - Natural lifelike breathing, dynamic blinking, customizable face features & shapes
 * - Optional periodic expressive mood cycles
 * - Optional 3D physics motion overlays (float, breathe, wobble, tilt follow, spring inertia, jelly bounce)
 */

const props = withDefaults(
  defineProps<{
    /** Avatar size in pixels (default: 400) */
    size?: number
    /** Avatar body color (hex, rgb, hsl, or skin name like 'encre', 'violet', etc.) */
    color?: string
    /** Shape ID ('cercle', 'goutte', 'carre', etc., default: 'cercle') */
    shape?: string
    /** Base expression ID ('neutre', 'attentif', 'heureux', etc., default: 'neutre') */
    expression?: string
    /** Classic sequence state animation ID ('idle', 'thinking', 'wink', 'alert', 'orbit', 'burst', etc., default: 'idle') */
    state?: StateId | string
    /** Optional animation cycle blocks to play in sequence */
    cycle?: Block[]
    /** Whether the cycle animation is actively playing (default: false) */
    playing?: boolean
    /** Feature size scale ('small' | 'medium' | 'large', default: 'medium') */
    featureSize?: FeatureSize
    /** Eyebrows style ('none' | 'arched' | 'straight' | 'dots', default: 'none') */
    eyebrows?: EyebrowsStyle
    /** Nose style ('none' | 'dot' | 'pill' | 'snout', default: 'none') */
    nose?: NoseStyle
    /** Cheeks / blush style ('none' | 'blush' | 'dots' | 'lines', default: 'none') */
    cheeks?: CheeksStyle
    /** Mouth style ('none' | 'smile' | 'grin' | 'frown' | 'open' | 'cat' | 'straight', default: 'none') */
    mouth?: MouthStyle
    /** Whether eyes follow mouse/pointer movement (default: true) */
    follow?: boolean
    /** Track cursor across the entire window (true) or only inside container (false) (default: true) */
    globalPointer?: boolean
    /** Whether to periodically cycle through expressive moods (default: true) */
    autoMood?: boolean
    /** Mood cycle duration in milliseconds (default: 4200) */
    moodInterval?: number
    /** Background canvas color used for depth clipping and particles (default: '#ffffff') */
    paper?: string
    /** Whether to apply dramatic oversized corner transform (like Settings page) */
    giant?: boolean
    /** 3D Animation: Personality ('none', 'peek', 'curious', 'shy', 'excited', 'nod', 'nope', 'hello', 'sleepy', default: 'none') */
    personalityAnimation?: PersonalityAnimationType
    /** 3D Animation: Idle ('none', 'float', 'breathe', 'wobble', 'autoRotate', 'lookAround', default: 'none') */
    idleAnimation?: IdleAnimationType
    /** 3D Animation: Interactive ('none', 'tiltFollow', 'gazeFollow', 'magneticPull', 'hoverLift', default: 'none') */
    interactiveAnimation?: InteractiveAnimationType
    /** 3D Animation: Physics ('none', 'springBack', 'jellyBounce', 'squashStretch', 'softWobble', default: 'none') */
    physicsAnimation?: PhysicsAnimationType
    /** 3D Animation: Effect ('none', 'lightSweep', 'glowPulse', 'shadowFollow', 'orbit', 'depthShift', default: 'none') */
    effectAnimation?: EffectAnimationType
    /** 3D Animation: Transition ('none', 'pop', 'morph', 'flip', 'spinBurst', default: 'none') */
    transitionAnimation?: TransitionAnimationType
    /** 3D Animation: Config */
    animationConfig?: Partial<AnimationConfig>
  }>(),
  {
    size: 400,
    color: '#a855f7',
    shape: DEFAULT_SHAPE,
    expression: 'neutre',
    state: 'idle',
    cycle: () => [],
    playing: false,
    featureSize: DEFAULT_FEATURE_SIZE,
    eyebrows: DEFAULT_EYEBROWS,
    nose: DEFAULT_NOSE,
    cheeks: DEFAULT_CHEEKS,
    mouth: DEFAULT_MOUTH,
    follow: true,
    globalPointer: true,
    autoMood: true,
    moodInterval: 4200,
    paper: '#ffffff',
    giant: false,
    personalityAnimation: 'none',
    idleAnimation: 'none',
    interactiveAnimation: 'none',
    physicsAnimation: 'none',
    effectAnimation: 'none',
    transitionAnimation: 'none',
    animationConfig: () => ({ ...DEFAULT_ANIMATION_CONFIG })
  }
)

const svg = ref<SVGSVGElement | null>(null)

const R = RAYON
const VB = DEMI_VIEWBOX
const uid = Math.random().toString(36).slice(2, 8)
const maskId = `tibsy-bot-mask-${uid}`

// Color & Shape resolution
const shapeRadii = computed(() => SHAPE_BY_ID.get(props.shape)?.radii ?? null)
const resolvedInk = computed(() => {
  if (props.color.startsWith('#') || props.color.startsWith('rgb') || props.color.startsWith('hsl')) {
    return props.color
  }
  return COLOR_BY_ID.get(props.color)?.hex ?? '#a855f7'
})

// Current mood expression
const currentMood = ref<string | null>(null)
const activeExpression = computed(() => {
  const exprId = currentMood.value ?? props.expression
  return EXPRESSION_BY_ID.get(exprId) ?? null
})

// Bot Engine Instance
const engine = new BotEngine(
  R,
  (props.state as StateId) || 'idle',
  shapeRadii.value,
  activeExpression.value,
  props.featureSize,
  props.eyebrows,
  props.nose,
  props.cheeks,
  props.mouth
)

const frame = shallowRef<BotFrame>(engine.sample(0))

// Animation & Pointer State
let rafId = 0
let clock = 0
let lastTime = 0
let turnSince = 0
let aiming = false
let pointer: { x: number; y: number } | null = null
let moodTimer: ReturnType<typeof setInterval> | undefined

// Cycle Playback State
let currentBlockIndex = 0
let blockStart = 0
let nextAt = Infinity

function applyBlock(i: number, from = 0) {
  if (!props.cycle || !props.cycle[i]) return
  const b = props.cycle[i]!
  blockStart = clock - from
  engine.setState(b.state, clock)
  nextAt = props.playing ? blockStart + b.duration : Infinity
}

// Watchers to update engine dynamically
watch(shapeRadii, (radii) => engine.setShape(radii, clock))
watch(activeExpression, (expr) => engine.setExpression(expr, clock))
watch(() => props.featureSize, (size) => engine.setFeatureSize(size, clock))
watch(() => props.eyebrows, (style) => engine.setEyebrows(style))
watch(() => props.nose, (style) => engine.setNose(style))
watch(() => props.cheeks, (style) => engine.setCheeks(style))
watch(() => props.mouth, (style) => engine.setMouth(style))
watch(
  () => props.state,
  (sId) => {
    if (sId) engine.setState(sId as StateId, clock)
  }
)
watch(
  () => props.playing,
  (on) => {
    if (on && props.cycle && props.cycle.length > 0) {
      applyBlock(currentBlockIndex)
    } else {
      nextAt = Infinity
    }
  }
)

const animTransform = ref('')
const animShadow = ref('')
let lastNx = 0
let lastNy = 0

// Track gaze aiming
function updateAim() {
  if (!svg.value) return
  const box = svg.value.getBoundingClientRect()
  if (box.width <= 0) return

  if (!aiming) turnSince = clock

  const demiLargeur = Math.max(1, window.innerWidth / 2)
  const demiHauteur = Math.max(1, window.innerHeight / 2)

  const nx = pointer ? clamp((pointer.x - (box.left + box.width / 2)) / demiLargeur, -1, 1) : 0
  const ny = pointer ? clamp((pointer.y - (box.top + box.height / 2)) / demiHauteur, -1, 1) : 0
  lastNx = nx
  lastNy = ny

  engine.setLook(
    lookTarget({
      nx,
      ny,
      tour: easings.easeOutQuint(clamp((clock - turnSince) / TURN_TIME)),
      pointer: pointer !== null
    }),
    clock
  )
  aiming = true
}

// Animation loop
function tick(ms: number) {
  rafId = requestAnimationFrame(tick)
  const dt = lastTime ? Math.min((ms - lastTime) / 1000, 0.064) : 0
  lastTime = ms
  clock += dt

  // Sequence cycle progression
  if (props.playing && props.cycle && props.cycle.length > 0) {
    if (clock >= nextAt) {
      currentBlockIndex = (currentBlockIndex + 1) % props.cycle.length
      applyBlock(currentBlockIndex)
    }
  }

  if (props.follow) {
    updateAim()
  }

  // Optional 3D Animation calculations
  const has3D =
    (props.personalityAnimation && props.personalityAnimation !== 'none') ||
    props.idleAnimation !== 'none' ||
    props.interactiveAnimation !== 'none' ||
    props.physicsAnimation !== 'none' ||
    props.effectAnimation !== 'none' ||
    props.transitionAnimation !== 'none'

  if (has3D) {
    const out = calculate3DAnimation({
      time: clock,
      delta: dt,
      activePersonality: props.personalityAnimation,
      activeIdle: props.idleAnimation,
      activeInteractive: props.interactiveAnimation,
      activePhysics: props.physicsAnimation,
      activeEffect: props.effectAnimation,
      activeTransition: props.transitionAnimation,
      cursorX: lastNx,
      cursorY: lastNy,
      isHovered: pointer !== null,
      isInteracting: false,
      config: props.animationConfig
    })

    animTransform.value = out.transformString
    if (props.effectAnimation === 'shadowFollow') {
      animShadow.value = `drop-shadow(${out.shadowOffsetX.toFixed(1)}px ${out.shadowOffsetY.toFixed(1)}px ${out.shadowBlur.toFixed(1)}px rgba(0,0,0,${out.shadowOpacity.toFixed(2)}))`
    } else {
      animShadow.value = ''
    }

    if (props.personalityAnimation && props.personalityAnimation !== 'none' && !pointer) {
      engine.setLook(
        lookTarget({
          nx: out.gazeOffsetX,
          ny: out.gazeOffsetY,
          tour: 1,
          pointer: false
        }),
        clock
      )
    }
  } else {
    animTransform.value = ''
    animShadow.value = ''
  }

  frame.value = engine.sample(clock)
  triggerRef(frame)
}

function dotAttrs(dot: BotFrame['dots'][number]) {
  const fill =
    dot.color ?? (dot.depth === undefined ? resolvedInk.value : mixHex(props.paper, resolvedInk.value, dot.depth))
  const common = { fill, opacity: dot.opacity }
  return dot.d
    ? {
        ...common,
        d: dot.d,
        transform: `translate(${dot.x} ${dot.y}) rotate(${dot.rot ?? 0}) scale(${R})`
      }
    : { ...common, cx: dot.x, cy: dot.y, r: dot.r }
}

// Pointer Event Handlers
function onPointerMove(e: PointerEvent) {
  pointer = { x: e.clientX, y: e.clientY }
}

function onPointerLeave() {
  pointer = null
}

function onTouchMove(e: TouchEvent) {
  if (e.touches[0]) {
    pointer = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
}

function onTouchEnd() {
  pointer = null
}

// Lifecycle
onMounted(() => {
  if (props.state) {
    engine.setState(props.state as StateId, 0)
  }
  if (props.playing && props.cycle && props.cycle.length > 0) {
    applyBlock(0)
  }

  rafId = requestAnimationFrame(tick)

  if (props.globalPointer && typeof window !== 'undefined') {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
  }

  // Periodic mood cycling
  if (props.autoMood) {
    let moodIndex = 0
    moodTimer = setInterval(() => {
      currentMood.value = HUMEURS[moodIndex % HUMEURS.length]!
      moodIndex++
    }, props.moodInterval)
  }
})

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
  if (moodTimer) clearInterval(moodTimer)
  if (props.globalPointer && typeof window !== 'undefined') {
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerleave', onPointerLeave)
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchend', onTouchEnd)
  }
})
</script>

<template>
  <div
    class="tibsy-interactive-container"
    :class="{ 'tibsy-giant': props.giant }"
    @pointermove="!props.globalPointer ? onPointerMove($event) : undefined"
    @pointerleave="!props.globalPointer ? onPointerLeave() : undefined"
  >
    <svg
      ref="svg"
      :width="props.size"
      :height="props.size"
      :viewBox="`${-VB} ${-VB} ${VB * 2} ${VB * 2}`"
      role="img"
      aria-label="Interactive Tibsy 3D Bot"
      class="tibsy-bot-svg transition-transform duration-75"
      :style="{
        transform: animTransform || undefined,
        filter: animShadow || undefined,
        willChange: animTransform ? 'transform' : undefined
      }"
    >
      <defs>
        <!-- Mask cutting through the body to reveal the background -->
        <mask
          :id="maskId"
          maskUnits="userSpaceOnUse"
          :x="-VB"
          :y="-VB"
          :width="VB * 2"
          :height="VB * 2"
        >
          <!-- Body fill (white = opaque) -->
          <path :d="frame.bodyPath" fill="#fff" />

          <!-- Eyes cutout (black = transparent hole) -->
          <path
            v-for="(eye, i) in frame.eyes"
            :key="`eye-${i}`"
            :d="eye.d"
            :transform="eye.matrix"
            :opacity="eye.alpha"
            fill="#000"
          />

          <!-- Eyebrows cutout -->
          <path
            v-for="(brow, i) in frame.eyebrows"
            :key="`brow-${i}`"
            :d="brow.d"
            :transform="brow.matrix"
            :opacity="brow.alpha"
            fill="#000"
          />

          <!-- Nose cutout -->
          <path
            v-for="(n, i) in frame.nose"
            :key="`nose-${i}`"
            :d="n.d"
            :transform="n.matrix"
            :opacity="n.alpha"
            fill="#000"
          />

          <!-- Mouth cutout -->
          <path
            v-for="(m, i) in frame.mouth"
            :key="`mouth-${i}`"
            :d="m.d"
            :transform="m.matrix"
            :opacity="m.alpha"
            fill="#000"
          />

          <!-- Notification notch cutout -->
          <circle
            v-if="frame.notch"
            :cx="frame.notch.x"
            :cy="frame.notch.y"
            :r="frame.notch.r"
            fill="#000"
          />
        </mask>

        <!-- Arc Gradients -->
        <linearGradient
          v-for="arc in frame.arcs"
          :id="`${uid}-${arc.id}`"
          :key="arc.id"
          gradientUnits="userSpaceOnUse"
          :x1="arc.grad.x1"
          :y1="arc.grad.y1"
          :x2="arc.grad.x2"
          :y2="arc.grad.y2"
        >
          <stop
            v-for="(c, i) in arc.grad.stops"
            :key="i"
            :offset="i / (arc.grad.stops.length - 1)"
            :stop-color="c"
          />
        </linearGradient>
      </defs>

      <!-- Back half of orbit arcs (behind body) -->
      <g fill="none" stroke-linecap="round">
        <path
          v-for="arc in frame.arcs"
          :key="`b${arc.id}`"
          :d="arc.back"
          :stroke="`url(#${uid}-${arc.id})`"
          :stroke-width="arc.width"
          :opacity="arc.opacity"
        />
      </g>

      <!-- Burst particles behind body -->
      <g v-if="frame.dotsBehind">
        <component
          :is="dot.d ? 'path' : 'circle'"
          v-for="(dot, i) in frame.dots"
          :key="`pb${i}`"
          v-bind="dotAttrs(dot)"
        />
      </g>

      <!-- Main body shape with eye cutout mask & paper background -->
      <g :opacity="frame.bodyAlpha">
        <path :d="frame.bodyPath" :fill="props.paper" />
        <g :mask="`url(#${maskId})`">
          <rect
            :x="-VB"
            :y="-VB"
            :width="VB * 2"
            :height="VB * 2"
            :fill="resolvedInk"
          />

          <!-- Cheeks / Blush layer (clipped automatically by body mask) -->
          <g v-if="frame.cheeks.length">
            <path
              v-for="(ch, i) in frame.cheeks"
              :key="`chk-${i}`"
              :d="ch.d"
              :transform="ch.matrix"
              :fill="ch.color ?? '#ff6b8b'"
              :stroke="ch.stroke"
              :stroke-width="ch.strokeWidth"
              stroke-linecap="round"
              :opacity="ch.opacity"
            />
          </g>
        </g>
      </g>

      <!-- Burst particles in front of body -->
      <g v-if="!frame.dotsBehind">
        <component
          :is="dot.d ? 'path' : 'circle'"
          v-for="(dot, i) in frame.dots"
          :key="`pf${i}`"
          v-bind="dotAttrs(dot)"
        />
      </g>

      <!-- Blue notification dot -->
      <circle
        v-if="frame.notif"
        :cx="frame.notif.x"
        :cy="frame.notif.y"
        :r="frame.notif.r"
        :fill="NOTIF_BLUE"
      />

      <!-- Front half of orbit arcs (in front of body) -->
      <g fill="none" stroke-linecap="round">
        <path
          v-for="arc in frame.arcs"
          :key="`f${arc.id}`"
          :d="arc.front"
          :stroke="`url(#${uid}-${arc.id})`"
          :stroke-width="arc.width"
          :opacity="arc.opacity"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.tibsy-interactive-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  -webkit-user-select: none;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.tibsy-bot-svg {
  display: block;
  max-width: 100%;
  height: auto;
  overflow: visible;
}

/* Signature Settings-page giant perspective effect */
.tibsy-giant {
  transform: translate(25vw, 12vh) scale(2.4);
}

@media (max-width: 1024px) {
  .tibsy-giant {
    transform: translate(0, 0) scale(1.3);
  }
}
</style>
