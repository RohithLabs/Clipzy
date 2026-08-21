<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ClipzyInteractiveBot from './ClipzyInteractiveBot.vue'
import gsap from 'gsap'
import { sfx } from '@/audio/sfx'
import type { HatId, GlassesId, PropId, AuraId } from '@/bot/accessories'

const props = defineProps<{
  avatarColor?: string
  avatarShape?: string
  avatarHat?: HatId
  avatarGlasses?: GlassesId
  avatarProp?: PropId
  avatarAura?: AuraId
}>()

const stageRef = ref<HTMLDivElement | null>(null)
const botWrapperRef = ref<HTMLDivElement | null>(null)

const gravityMode = ref<'earth' | 'zero' | 'moon' | 'inverted'>('earth')
const bounciness = ref(0.78)

let posX = 200
let posY = 150
let velX = 0
let velY = 0
let isDragging = false
let dragStartX = 0
let dragStartY = 0
let lastPointerX = 0
let lastPointerY = 0
let lastTime = 0
let rafId = 0

const BOT_SIZE = 160

function getGravityValue(): number {
  switch (gravityMode.value) {
    case 'earth':
      return 0.65
    case 'moon':
      return 0.22
    case 'inverted':
      return -0.5
    case 'zero':
    default:
      return 0
  }
}

function physicsLoop() {
  rafId = requestAnimationFrame(physicsLoop)

  if (!stageRef.value || isDragging) return

  const stage = stageRef.value.getBoundingClientRect()
  const maxX = stage.width - BOT_SIZE
  const maxY = stage.height - BOT_SIZE

  // Apply gravity
  velY += getGravityValue()

  // Apply friction
  velX *= 0.988
  velY *= 0.988

  // Integrate position
  posX += velX
  posY += velY

  // Floor collision
  if (posY > maxY) {
    posY = maxY
    if (Math.abs(velY) > 2) {
      sfx.playSquish()
      squishFloor()
    }
    velY = -velY * bounciness.value
  }

  // Ceiling collision
  if (posY < 0) {
    posY = 0
    if (Math.abs(velY) > 2) {
      sfx.playSquish()
      squishFloor()
    }
    velY = -velY * bounciness.value
  }

  // Right wall collision
  if (posX > maxX) {
    posX = maxX
    if (Math.abs(velX) > 2) {
      sfx.playSquish()
      squishWall()
    }
    velX = -velX * bounciness.value
  }

  // Left wall collision
  if (posX < 0) {
    posX = 0
    if (Math.abs(velX) > 2) {
      sfx.playSquish()
      squishWall()
    }
    velX = -velX * bounciness.value
  }

  // Update transform
  if (botWrapperRef.value) {
    botWrapperRef.value.style.transform = `translate3d(${posX}px, ${posY}px, 0px)`
  }
}

function squishFloor() {
  if (!botWrapperRef.value) return
  gsap.fromTo(
    botWrapperRef.value.querySelector('.clipzy-interactive-bot'),
    { scaleX: 1.25, scaleY: 0.75 },
    { scaleX: 1, scaleY: 1, duration: 0.35, ease: 'elastic.out(1, 0.4)' }
  )
}

function squishWall() {
  if (!botWrapperRef.value) return
  gsap.fromTo(
    botWrapperRef.value.querySelector('.clipzy-interactive-bot'),
    { scaleX: 0.75, scaleY: 1.25 },
    { scaleX: 1, scaleY: 1, duration: 0.35, ease: 'elastic.out(1, 0.4)' }
  )
}

function onPointerDown(e: PointerEvent) {
  isDragging = true
  dragStartX = e.clientX - posX
  dragStartY = e.clientY - posY
  lastPointerX = e.clientX
  lastPointerY = e.clientY
  lastTime = performance.now()
  velX = 0
  velY = 0
  sfx.playPop()
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging || !stageRef.value) return
  const now = performance.now()
  const dt = Math.max(1, now - lastTime)

  const newX = e.clientX - dragStartX
  const newY = e.clientY - dragStartY

  velX = ((e.clientX - lastPointerX) / dt) * 16
  velY = ((e.clientY - lastPointerY) / dt) * 16

  posX = newX
  posY = newY

  lastPointerX = e.clientX
  lastPointerY = e.clientY
  lastTime = now

  if (botWrapperRef.value) {
    botWrapperRef.value.style.transform = `translate3d(${posX}px, ${posY}px, 0px)`
  }
}

function onPointerUp() {
  if (isDragging) {
    isDragging = false
    sfx.playWhoosh()
  }
}

function launchRocket() {
  velY = -28
  velX = (Math.random() - 0.5) * 20
  sfx.playPowerCharge()
}

function shakeSpin() {
  velX = (Math.random() - 0.5) * 35
  velY = -15
  sfx.playLaser()
}

function resetCenter() {
  if (stageRef.value) {
    const stage = stageRef.value.getBoundingClientRect()
    posX = (stage.width - BOT_SIZE) / 2
    posY = (stage.height - BOT_SIZE) / 2
    velX = 0
    velY = 0
    sfx.playPop()
  }
}

onMounted(() => {
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)

  setTimeout(() => {
    resetCenter()
    rafId = requestAnimationFrame(physicsLoop)
  }, 100)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
})
</script>

<template>
  <div class="physics-playground w-full max-w-6xl mx-auto p-4 sm:p-6 space-y-6 text-[var(--ink)]">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
      <div>
        <div class="flex items-center gap-2.5">
          <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-sm">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <path d="m4.93 4.93 4.24 4.24" />
              <path d="m14.83 9.17 4.24-4.24" />
              <path d="m14.83 14.83 4.24 4.24" />
              <path d="m9.17 14.83-4.24 4.24" />
            </svg>
          </span>
          <h1 class="text-2xl font-bold tracking-tight">Interactive Physics & Toss Arena</h1>
        </div>
        <p class="text-xs text-[var(--muted)] mt-1">
          Grab, toss, bounce, and launch Clipzy with real momentum, spring restitution, and elastic wall squish physics!
        </p>
      </div>

      <!-- Action Launch Buttons -->
      <div class="flex items-center gap-2 flex-wrap">
        <button
          type="button"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--ink)] text-[var(--paper)] text-xs font-bold shadow-sm transition hover:opacity-90 cursor-pointer"
          @click="launchRocket"
        >
          <span>🚀</span>
          <span>Super Launch</span>
        </button>
        <button
          type="button"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-bold transition hover:border-emerald-400 cursor-pointer"
          @click="shakeSpin"
        >
          <span>🌪️</span>
          <span>Spin Chaos</span>
        </button>
        <button
          type="button"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--line)] bg-black/5 text-xs font-medium transition hover:bg-black/10 cursor-pointer"
          @click="resetCenter"
        >
          <span>🎯</span>
          <span>Reset</span>
        </button>
      </div>
    </div>

    <!-- Gravity & Bounciness Toggles -->
    <div class="flex items-center gap-4 flex-wrap p-3.5 rounded-2xl border border-[var(--line)] bg-white/70 backdrop-blur text-xs dark:bg-zinc-900/60">
      <span class="font-bold flex items-center gap-1.5">
        <span>🌍</span>
        <span>Gravity Environment:</span>
      </span>
      <div class="flex items-center gap-1.5">
        <button
          v-for="env in [
            { id: 'earth', label: 'Earth (1.0G)' },
            { id: 'moon', label: 'Moon (0.16G)' },
            { id: 'zero', label: 'Zero-G (Float)' },
            { id: 'inverted', label: 'Anti-Gravity' }
          ] as const"
          :key="env.id"
          type="button"
          class="px-3 py-1 rounded-lg font-semibold transition cursor-pointer"
          :class="
            gravityMode === env.id
              ? 'bg-emerald-600 text-white shadow-2xs'
              : 'bg-black/5 text-[var(--muted)] hover:text-[var(--ink)]'
          "
          @click="gravityMode = env.id; sfx.playPop()"
        >
          {{ env.label }}
        </button>
      </div>
    </div>

    <!-- Physics Sandbox Stage -->
    <div
      ref="stageRef"
      class="w-full h-[520px] rounded-3xl border-2 border-dashed border-[var(--line)] bg-gradient-to-b from-neutral-50 via-slate-100/50 to-emerald-50/20 relative overflow-hidden select-none shadow-inner dark:bg-zinc-950"
    >
      <!-- Stage Guides -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div class="h-48 w-48 rounded-full border-2 border-dashed border-emerald-500 animate-spin" />
      </div>

      <div class="absolute top-4 left-4 pointer-events-none text-xs text-[var(--muted)] font-mono">
        Drag & fling with mouse or finger 👆
      </div>

      <!-- Physics Bot Actor -->
      <div
        ref="botWrapperRef"
        class="absolute top-0 left-0 cursor-grab active:cursor-grabbing will-change-transform touch-none"
        :style="{ width: `${BOT_SIZE}px`, height: `${BOT_SIZE}px` }"
        @pointerdown="onPointerDown"
      >
        <ClipzyInteractiveBot
          :size="BOT_SIZE"
          :color="props.avatarColor || '#10b981'"
          :shape="props.avatarShape || 'cercle'"
          :hat="props.avatarHat || 'none'"
          :glasses="props.avatarGlasses || 'none'"
          :prop="props.avatarProp || 'none'"
          :aura="props.avatarAura || 'none'"
          :play-sounds="false"
        />
      </div>
    </div>
  </div>
</template>
