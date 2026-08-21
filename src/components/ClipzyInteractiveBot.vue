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
import { COLOR_BY_ID, SHAPES, type ShapeId, mixHex, SHAPE_BY_ID } from '@/bot/skins'
import { clamp, easings } from '@/bot/math'
import { DEMI_VIEWBOX, RAYON } from '@/bot/repere'
import { NOTIF_BLUE } from '@/bot/decor'
import { HUMEURS, lookTarget, TURN_TIME } from '@/ui/gaze'
import type { StateId } from '@/bot/states'
import type { Block } from '@/bot/cycles'
import { sfx } from '@/audio/sfx'
import type { HatId, GlassesId, PropId, AuraId } from '@/bot/accessories'

import {
  calculate3DAnimation,
  type AnimationConfig,
  type PersonalityAnimationType,
  type EffectAnimationType,
  type IdleAnimationType,
  type InteractiveAnimationType,
  type PhysicsAnimationType,
  type TransitionAnimationType
} from '@/ui/animation-system'

export interface ClipzyBotProps {
  size?: number
  color?: string
  shape?: string
  expression?: string
  state?: StateId | string
  cycle?: Block[]
  playing?: boolean
  featureSize?: FeatureSize
  eyebrows?: EyebrowsStyle
  nose?: NoseStyle
  cheeks?: CheeksStyle
  mouth?: MouthStyle
  hat?: HatId
  glasses?: GlassesId
  prop?: PropId
  aura?: AuraId
  follow?: boolean
  globalPointer?: boolean
  autoMood?: boolean
  moodInterval?: number
  paper?: string
  giant?: boolean
  personalityAnimation?: PersonalityAnimationType
  idleAnimation?: IdleAnimationType
  interactiveAnimation?: InteractiveAnimationType
  effectAnimation?: EffectAnimationType
  physicsAnimation?: PhysicsAnimationType
  transitionAnimation?: TransitionAnimationType
  animationConfig?: Partial<AnimationConfig>
  playSounds?: boolean
}

const props = withDefaults(defineProps<ClipzyBotProps>(), {
  size: 400,
  color: 'encre',
  shape: 'cercle',
  expression: 'neutre',
  state: 'idle',
  cycle: () => [],
  playing: false,
  featureSize: DEFAULT_FEATURE_SIZE,
  eyebrows: DEFAULT_EYEBROWS,
  nose: DEFAULT_NOSE,
  cheeks: DEFAULT_CHEEKS,
  mouth: DEFAULT_MOUTH,
  hat: 'none',
  glasses: 'none',
  prop: 'none',
  aura: 'none',
  follow: true,
  globalPointer: true,
  autoMood: true,
  moodInterval: 4200,
  paper: '#ffffff',
  giant: false,
  personalityAnimation: 'none',
  idleAnimation: 'none',
  interactiveAnimation: 'none',
  effectAnimation: 'none',
  physicsAnimation: 'none',
  transitionAnimation: 'none',
  playSounds: false
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
  (e: 'stateChange', state: StateId): void
  (e: 'moodChange', mood: string): void
}>()

const uid = Math.random().toString(36).slice(2, 8)
const maskId = `clipzy-mask-${uid}`
const VB = DEMI_VIEWBOX
const R = RAYON

const ink = computed(() => {
  if (!props.color) return '#18181b'
  if (props.color.startsWith('#') || props.color.startsWith('rgb') || props.color.startsWith('hsl')) {
    return props.color
  }
  return COLOR_BY_ID.get(props.color as Parameters<typeof COLOR_BY_ID.get>[0])?.hex ?? '#18181b'
})

const resolvedShape = computed(() => {
  const s = SHAPE_BY_ID.get(props.shape as ShapeId)
  return s?.radii ?? SHAPES[0]!.radii
})

const resolvedExpression = computed(() => {
  return EXPRESSION_BY_ID.get(props.expression) ?? EXPRESSION_BY_ID.get('neutre')!
})

const engine = new BotEngine(R)
const frame = shallowRef<BotFrame>(engine.sample(0))
const container = ref<HTMLElement | null>(null)
const svg = ref<SVGSVGElement | null>(null)

let clock = 0
let rafId = 0
let lastRaf = 0
let isHovered = false
let moodIndex = 0
let lastMoodTime = 0
let pointer: { x: number; y: number } | null = null
let aiming = false
let turnSince = 0
let cycleElapsed = 0

const anim3DStyles = ref<{
  transform: string
  filter: string
  boxShadow: string
  opacity: number
}>({
  transform: 'none',
  filter: 'none',
  boxShadow: 'none',
  opacity: 1
})

function dotAttrs(dot: BotFrame['dots'][number]) {
  const fill = dot.color ?? (dot.depth === undefined ? ink.value : mixHex(props.paper, ink.value, dot.depth))
  const common = { fill, opacity: dot.opacity }
  return dot.d
    ? {
        ...common,
        d: dot.d,
        transform: `translate(${dot.x} ${dot.y}) rotate(${dot.rot ?? 0}) scale(${R})`
      }
    : { ...common, cx: dot.x, cy: dot.y, r: dot.r }
}

function handlePointerMove(e: PointerEvent) {
  if (e.pointerType === 'touch') return
  if (!props.globalPointer && container.value) {
    const rect = container.value.getBoundingClientRect()
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
      pointer = null
      return
    }
  }
  pointer = { x: e.clientX, y: e.clientY }
}

function handlePointerLeave() {
  if (!props.globalPointer) pointer = null
}

function handleClick(e: MouseEvent) {
  if (props.playSounds) {
    sfx.playPop()
  }
  emit('click', e)
}

function onPointerEnter() {
  isHovered = true
}

function onPointerLeave() {
  isHovered = false
}

function aimAtCursor() {
  if (!props.follow) {
    if (aiming) {
      engine.setLook(null, clock, TURN_TIME)
      aiming = false
    }
    return
  }

  const box = svg.value?.getBoundingClientRect()
  if (!box || box.width === 0 || box.height === 0) return
  if (!aiming) turnSince = clock

  const demiW = Math.max(1, window.innerWidth / 2)
  const demiH = Math.max(1, window.innerHeight / 2)
  const centerX = box.left + box.width / 2
  const centerY = box.top + box.height / 2

  engine.setLook(
    lookTarget({
      nx: pointer ? clamp((pointer.x - centerX) / demiW, -1, 1) : 0,
      ny: pointer ? clamp((pointer.y - centerY) / demiH, -1, 1) : 0,
      tour: easings.easeOutQuint(clamp((clock - turnSince) / TURN_TIME)),
      pointer: pointer !== null
    }),
    clock
  )
  aiming = true
}

function updateAutoMood(now: number) {
  if (!props.autoMood || !props.follow || pointer !== null) return
  if (now - lastMoodTime > props.moodInterval) {
    lastMoodTime = now
    moodIndex = (moodIndex + 1) % HUMEURS.length
    const nextMood = HUMEURS[moodIndex]
    if (nextMood) {
      const expr = EXPRESSION_BY_ID.get(nextMood) ?? null
      engine.setExpression(expr, clock)
      emit('moodChange', nextMood)
    }
  }
}

function loop(t: number) {
  rafId = requestAnimationFrame(loop)
  if (!lastRaf) lastRaf = t
  const dt = (t - lastRaf) / 1000
  lastRaf = t
  clock += dt

  if (props.playing && props.cycle && props.cycle.length > 0) {
    cycleElapsed += dt
    let running = 0
    let curBlock = props.cycle[0]
    for (const b of props.cycle) {
      if (cycleElapsed >= running && cycleElapsed < running + b.duration) {
        curBlock = b
        break
      }
      running += b.duration
    }
    if (running > 0 && cycleElapsed >= running) {
      cycleElapsed %= running
      curBlock = props.cycle[0]
    }
    if (curBlock && curBlock.state !== engine.state) {
      engine.setState(curBlock.state, clock)
      if (props.playSounds) sfx.playStateSound(curBlock.state)
      emit('stateChange', curBlock.state)
    }
  }

  aimAtCursor()
  updateAutoMood(t)

  frame.value = engine.sample(clock)
  triggerRef(frame)

  const raw3D = calculate3DAnimation({
    time: clock,
    delta: dt,
    activePersonality: props.personalityAnimation,
    activeIdle: props.idleAnimation,
    activeInteractive: props.interactiveAnimation,
    activeEffect: props.effectAnimation,
    activePhysics: props.physicsAnimation,
    activeTransition: props.transitionAnimation,
    config: props.animationConfig,
    cursorX: pointer ? (pointer.x / window.innerWidth) * 2 - 1 : 0,
    cursorY: pointer ? (pointer.y / window.innerHeight) * 2 - 1 : 0,
    isHovered,
    isInteracting: pointer !== null
  })

  anim3DStyles.value = {
    transform: raw3D.transformString,
    filter: raw3D.glowPulse > 0 ? `drop-shadow(0 0 ${15 * raw3D.glowPulse}px ${ink.value}80)` : '',
    boxShadow: '',
    opacity: 1
  }
}

watch(
  () => props.state,
  (newState) => {
    if (newState && typeof newState === 'string') {
      engine.setState(newState as StateId, clock)
      if (props.playSounds) sfx.playStateSound(newState)
      emit('stateChange', newState as StateId)
    }
  }
)

watch(resolvedShape, (s) => engine.setShape(s, clock))
watch(resolvedExpression, (e) => engine.setExpression(e, clock))
watch(() => props.featureSize, (f) => engine.setFeatureSize(f))
watch(() => props.eyebrows, (e) => engine.setEyebrows(e))
watch(() => props.nose, (n) => engine.setNose(n))
watch(() => props.cheeks, (c) => engine.setCheeks(c))
watch(() => props.mouth, (m) => engine.setMouth(m))

onMounted(() => {
  if (props.state) engine.setState(props.state as StateId, 0)
  engine.setShape(resolvedShape.value, 0)
  engine.setExpression(resolvedExpression.value, 0)
  engine.setFeatureSize(props.featureSize)
  engine.setEyebrows(props.eyebrows)
  engine.setNose(props.nose)
  engine.setCheeks(props.cheeks)
  engine.setMouth(props.mouth)

  if (props.follow) {
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true })
  }

  rafId = requestAnimationFrame(loop)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('pointerleave', handlePointerLeave)
})

defineExpose({
  setState: (state: StateId) => {
    engine.setState(state, clock)
    if (props.playSounds) sfx.playStateSound(state)
  },
  setExpression: (expr: string) => {
    const e = EXPRESSION_BY_ID.get(expr)
    if (e) engine.setExpression(e, clock)
  },
  reset: (state: StateId) => engine.reset(state, clock)
})
</script>

<template>
  <div
    ref="container"
    class="clipzy-interactive-bot relative inline-flex items-center justify-center select-none"
    :style="{
      width: `${props.size}px`,
      height: `${props.size}px`
    }"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    @click="handleClick"
  >
    <!-- Aura layer -->
    <div
      v-if="props.aura !== 'none'"
      class="pointer-events-none absolute inset-0 rounded-full blur-2xl transition-all duration-700"
      :class="{
        'bg-cyan-400/30 animate-pulse': props.aura === 'neon',
        'bg-amber-500/40 animate-ping': props.aura === 'fire',
        'bg-emerald-400/25 animate-pulse': props.aura === 'matrix',
        'bg-purple-500/35 animate-spin': props.aura === 'sparks',
        'bg-blue-400/30 scale-125 animate-pulse': props.aura === 'speed'
      }"
    />

    <div
      class="relative flex h-full w-full items-center justify-center transition-transform duration-200 ease-out"
      :style="{
        transform: anim3DStyles.transform,
        filter: anim3DStyles.filter,
        boxShadow: anim3DStyles.boxShadow,
        opacity: anim3DStyles.opacity
      }"
    >
      <svg
        ref="svg"
        :width="props.size"
        :height="props.size"
        :viewBox="`${-VB} ${-VB} ${VB * 2} ${VB * 2}`"
        role="img"
        aria-label="Clipzy Animated Avatar"
        class="overflow-visible"
      >
        <defs>
          <mask
            :id="maskId"
            maskUnits="userSpaceOnUse"
            :x="-VB"
            :y="-VB"
            :width="VB * 2"
            :height="VB * 2"
          >
            <path :d="frame.bodyPath" fill="#fff" />
            <path
              v-for="(eye, i) in frame.eyes"
              :key="`eye-${i}`"
              :d="eye.d"
              :transform="eye.matrix"
              :opacity="eye.alpha"
              fill="#000"
            />
            <path
              v-for="(brow, i) in frame.eyebrows"
              :key="`brow-${i}`"
              :d="brow.d"
              :transform="brow.matrix"
              :opacity="brow.alpha"
              fill="#000"
            />
            <path
              v-for="(n, i) in frame.nose"
              :key="`nose-${i}`"
              :d="n.d"
              :transform="n.matrix"
              :opacity="n.alpha"
              fill="#000"
            />
            <path
              v-for="(m, i) in frame.mouth"
              :key="`mouth-${i}`"
              :d="m.d"
              :transform="m.matrix"
              :opacity="m.alpha"
              fill="#000"
            />
            <circle
              v-if="frame.notch"
              :cx="frame.notch.x"
              :cy="frame.notch.y"
              :r="frame.notch.r"
              fill="#000"
            />
          </mask>

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

        <!-- Back Arcs -->
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

        <!-- Back Dots / Particles -->
        <g v-if="frame.dotsBehind">
          <component
            :is="dot.d ? 'path' : 'circle'"
            v-for="(dot, i) in frame.dots"
            :key="`pb${i}`"
            v-bind="dotAttrs(dot)"
          />
        </g>

        <!-- Body with Face Features Mask -->
        <g :opacity="frame.bodyAlpha">
          <path :d="frame.bodyPath" :fill="props.paper" />
          <g :mask="`url(#${maskId})`">
            <rect :x="-VB" :y="-VB" :width="VB * 2" :height="VB * 2" :fill="ink" />
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

        <!-- Front Dots / Particles -->
        <g v-if="!frame.dotsBehind">
          <component
            :is="dot.d ? 'path' : 'circle'"
            v-for="(dot, i) in frame.dots"
            :key="`pf${i}`"
            v-bind="dotAttrs(dot)"
          />
        </g>

        <!-- Notification Badge -->
        <circle
          v-if="frame.notif"
          :cx="frame.notif.x"
          :cy="frame.notif.y"
          :r="frame.notif.r"
          :fill="NOTIF_BLUE"
        />

        <!-- Front Arcs -->
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

        <!-- Accessories Overlay -->
        <!-- Hats -->
        <g v-if="props.hat === 'crown'" transform="translate(0, -195) scale(0.75)">
          <path d="M-60,40 L-60,-30 L-20,0 L0,-50 L20,0 L60,-30 L60,40 Z" fill="#eab308" stroke="#ca8a04" stroke-width="4" />
          <circle cx="0" cy="-50" r="8" fill="#ef4444" />
          <circle cx="-60" cy="-30" r="6" fill="#3b82f6" />
          <circle cx="60" cy="-30" r="6" fill="#3b82f6" />
        </g>
        <g v-else-if="props.hat === 'party'" transform="translate(0, -210) scale(0.7)">
          <polygon points="0,-70 -35,35 35,35" fill="#f43f5e" stroke="#fff" stroke-width="3" />
          <circle cx="0" cy="-70" r="10" fill="#facc15" />
          <path d="M-25,10 Q0,20 25,10" stroke="#facc15" stroke-width="6" fill="none" />
        </g>
        <g v-else-if="props.hat === 'tophat'" transform="translate(0, -205) scale(0.75)">
          <ellipse cx="0" cy="30" rx="55" ry="12" fill="#18181b" />
          <rect x="-35" y="-45" width="70" height="75" rx="6" fill="#27272a" />
          <rect x="-35" y="15" width="70" height="12" fill="#e11d48" />
        </g>
        <g v-else-if="props.hat === 'catears'" transform="translate(0, -180) scale(0.8)">
          <polygon points="-80,-20 -50,-80 -20,-20" fill="#ec4899" />
          <polygon points="-70,-20 -50,-65 -30,-20" fill="#fbcfe8" />
          <polygon points="20,-20 50,-80 80,-20" fill="#ec4899" />
          <polygon points="30,-20 50,-65 70,-20" fill="#fbcfe8" />
        </g>
        <g v-else-if="props.hat === 'halo'" transform="translate(0, -215) scale(0.8)">
          <ellipse cx="0" cy="0" rx="70" ry="18" fill="none" stroke="#facc15" stroke-width="10" />
        </g>
        <g v-else-if="props.hat === 'devil'" transform="translate(0, -180) scale(0.8)">
          <path d="M-60,-10 Q-75,-65 -45,-75 Q-45,-40 -35,-10 Z" fill="#dc2626" />
          <path d="M60,-10 Q75,-65 45,-75 Q45,-40 35,-10 Z" fill="#dc2626" />
        </g>

        <!-- Glasses -->
        <g v-if="props.glasses === 'thug'" transform="translate(0, -30) scale(0.85)">
          <rect x="-80" y="-15" width="65" height="30" fill="#09090b" rx="2" />
          <rect x="15" y="-15" width="65" height="30" fill="#09090b" rx="2" />
          <rect x="-15" y="-8" width="30" height="8" fill="#09090b" />
          <rect x="-70" y="-10" width="10" height="10" fill="#ffffff" />
          <rect x="25" y="-10" width="10" height="10" fill="#ffffff" />
        </g>
        <g v-else-if="props.glasses === 'cyber'" transform="translate(0, -35) scale(0.9)">
          <polygon points="-85,-18 85,-18 75,18 -75,18" fill="#06b6d4" opacity="0.85" />
          <polygon points="-85,-18 85,-18 75,18 -75,18" fill="none" stroke="#22d3ee" stroke-width="4" />
          <line x1="-60" y1="0" x2="60" y2="0" stroke="#ffffff" stroke-width="3" stroke-dasharray="10 6" />
        </g>
        <g v-else-if="props.glasses === 'round'" transform="translate(0, -30) scale(0.85)">
          <circle cx="-45" cy="0" r="30" fill="none" stroke="#e2e8f0" stroke-width="6" />
          <circle cx="45" cy="0" r="30" fill="none" stroke="#e2e8f0" stroke-width="6" />
          <line x1="-15" y1="0" x2="15" y2="0" stroke="#e2e8f0" stroke-width="6" />
        </g>

        <!-- Hand Props -->
        <g v-if="props.prop === 'mic'" transform="translate(140, 60) scale(0.8)">
          <rect x="-10" y="-15" width="20" height="70" rx="6" fill="#334155" />
          <circle cx="0" cy="-25" r="22" fill="#94a3b8" stroke="#475569" stroke-width="4" />
        </g>
        <g v-else-if="props.prop === 'gamepad'" transform="translate(130, 80) scale(0.75)">
          <rect x="-35" y="-20" width="70" height="45" rx="14" fill="#6366f1" />
          <circle cx="-16" cy="2" r="6" fill="#ffffff" />
          <circle cx="16" cy="-4" r="4" fill="#ef4444" />
          <circle cx="22" cy="4" r="4" fill="#22c55e" />
        </g>
        <g v-else-if="props.prop === 'coffee'" transform="translate(130, 70) scale(0.75)">
          <rect x="-20" y="-25" width="40" height="50" rx="6" fill="#d97706" />
          <path d="M20,-10 Q35,-5 20,10" fill="none" stroke="#d97706" stroke-width="6" />
          <path d="M-8,-35 Q0,-45 -8,-55" fill="none" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round" />
          <path d="M8,-35 Q16,-45 8,-55" fill="none" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round" />
        </g>
        <g v-else-if="props.prop === 'wand'" transform="translate(140, 50) rotate(-25) scale(0.8)">
          <rect x="-4" y="-10" width="8" height="85" rx="3" fill="#475569" />
          <rect x="-4" y="-30" width="8" height="20" rx="3" fill="#ffffff" />
          <polygon points="0,-45 5,-33 18,-33 7,-25 11,-12 0,-20 -11,-12 -7,-25 -18,-33 -5,-33" fill="#fbbf24" />
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.clipzy-interactive-bot {
  transform-style: preserve-3d;
}
</style>
