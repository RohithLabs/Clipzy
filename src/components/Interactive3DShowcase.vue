<script setup lang="ts">
import { computed, ref } from 'vue'
import ClipzyInteractiveBot from './ClipzyInteractiveBot.vue'
import BotTile from '@/components/BotTile.vue'
import {
  FEATURE_SIZES,
  EYEBROWS_STYLES,
  NOSE_STYLES,
  CHEEKS_STYLES,
  MOUTH_STYLES,
  type FeatureSize,
  type EyebrowsStyle,
  type NoseStyle,
  type CheeksStyle,
  type MouthStyle
} from '@/bot/face'
import { SHAPES, type ShapeId } from '@/bot/skins'
import type { IdleAnimationType, PhysicsAnimationType } from '@/ui/animation-system'
import { t } from '@/i18n'
import { sfx } from '@/audio/sfx'

// Settings Bot Playground Controls
const botColor = ref('#a855f7')
const botShape = ref<ShapeId>('cercle')
const botSize = ref(380)
const botFollow = ref(true)
const botAutoMood = ref(true)
const botGiant = ref(false)
const botIdle3D = ref<IdleAnimationType>('float')
const botPhysics3D = ref<PhysicsAnimationType>('none')

const botFeatureSize = ref<FeatureSize>('medium')
const botEyebrows = ref<EyebrowsStyle>('arched')
const botNose = ref<NoseStyle>('dot')
const botCheeks = ref<CheeksStyle>('blush')
const botMouth = ref<MouthStyle>('smile')

// Shape Categories Filter
type ShapeCategory = 'all' | 'organic' | 'geometric' | 'playful'
const selectedCategory = ref<ShapeCategory>('all')

const SHAPE_CATEGORIES: Array<{ id: ShapeCategory; label: string; icon: string }> = [
  { id: 'all', label: 'All Shapes (26)', icon: '✨' },
  { id: 'organic', label: 'Organic & Soft', icon: '🫧' },
  { id: 'geometric', label: 'Geometric & Sharp', icon: '🔷' },
  { id: 'playful', label: 'Playful & Unique', icon: '🪐' }
]

const ORGANIC_IDS = ['cercle', 'blob', 'bean', 'jelly', 'galet', 'bubble', 'nuage', 'goutte', 'squircle', 'mochi', 'gummy', 'puffy']
const GEOMETRIC_IDS = ['rounded_cube', 'capsule', 'triangle', 'hexagone', 'diamond', 'cylinder', 'crystal']
const PLAYFUL_IDS = ['star_blob', 'planet', 'egg', 'orbital', 'spiky_blob', 'donut', 'wobble']

const filteredShapes = computed(() => {
  if (selectedCategory.value === 'organic') {
    return SHAPES.filter((s) => ORGANIC_IDS.includes(s.id))
  }
  if (selectedCategory.value === 'geometric') {
    return SHAPES.filter((s) => GEOMETRIC_IDS.includes(s.id))
  }
  if (selectedCategory.value === 'playful') {
    return SHAPES.filter((s) => PLAYFUL_IDS.includes(s.id))
  }
  return SHAPES
})

const EYE_PREVIEW = {
  small: { w: 3, h: 10 },
  medium: { w: 4, h: 13 },
  large: { w: 5, h: 17 }
} as const

const PRESET_COLORS = [
  { id: 'violet', hex: '#a855f7', label: 'Violet' },
  { id: 'blue', hex: '#3b82f6', label: 'Blue' },
  { id: 'cyan', hex: '#06b6d4', label: 'Cyan' },
  { id: 'emerald', hex: '#10b981', label: 'Emerald' },
  { id: 'rose', hex: '#f43f5e', label: 'Rose' },
  { id: 'orange', hex: '#f97316', label: 'Orange' },
  { id: 'amber', hex: '#eab308', label: 'Amber' },
  { id: 'encre', hex: '#18181b', label: 'Ink' }
]

const copied = ref(false)
function copyCode() {
  const code = `<template>
  <ClipzyInteractiveBot
    :size="${botSize.value}"
    color="${botColor.value}"
    shape="${botShape.value}"
    feature-size="${botFeatureSize.value}"
    eyebrows="${botEyebrows.value}"
    nose="${botNose.value}"
    cheeks="${botCheeks.value}"
    mouth="${botMouth.value}"
    :follow="${botFollow.value}"
    :auto-mood="${botAutoMood.value}"
    :giant="${botGiant.value}"${botIdle3D.value !== 'none' ? `\n    idle-animation="${botIdle3D.value}"` : ''}${botPhysics3D.value !== 'none' ? `\n    physics-animation="${botPhysics3D.value}"` : ''}
  />
</template>

<script setup>
import ClipzyInteractiveBot from '@/components/ClipzyInteractiveBot.vue'
<\/script>`

  navigator.clipboard.writeText(code)
  sfx.playChime()
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
</script>

<template>
  <div class="interactive-3d-showcase w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-8 space-y-8 text-[var(--ink)]">
    <!-- Header -->
    <div class="border-b border-[var(--line)] pb-6">
      <div class="flex items-center gap-3">
        <span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--ink)] text-[var(--paper)] shadow-sm">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        </span>
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-[var(--ink)]">
            3D Interactive Studio
          </h1>
          <p class="text-xs sm:text-sm text-[var(--muted)]">
            Interactive multi-shape vector avatars with real-time 3D physics, facial expressions, and natural cursor gaze tracking.
          </p>
        </div>
      </div>
    </div>

    <!-- MAIN INTERACTIVE STUDIO CARD -->
    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-base font-bold text-[var(--ink)] flex items-center gap-2">
            <span>✨ Multiple Shapes & 3D Physics Studio</span>
            <span class="px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-[var(--ink)] text-[var(--paper)]">
              26 Morphing Shapes
            </span>
          </h2>
          <p class="text-xs text-[var(--muted)]">
            Explore 26 distinct procedural shapes, customizable facial traits, smooth 3D tilting, and lifelike physics.
          </p>
        </div>
      </div>

      <!-- Main Studio Card -->
      <div class="rounded-3xl border border-[var(--line)] bg-white/80 p-6 md:p-8 shadow-sm backdrop-blur-md">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- Left Column: Controls & Multiple Shapes (Span 7) -->
          <div class="lg:col-span-7 space-y-4">
            <!-- SECTION 1: 🔷 MULTIPLE SHAPES GALLERY -->
            <div class="space-y-3 p-4 rounded-2xl bg-gradient-to-br from-neutral-50 to-purple-50/30 border border-[var(--line)]/70 shadow-2xs">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <h3 class="text-xs font-bold text-[var(--ink)] flex items-center gap-1.5">
                    <span>🔷 Shapes Collection</span>
                  </h3>
                  <span class="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-purple-100 text-purple-900 border border-purple-200">
                    Active: {{ t(`shapes.${botShape}`) }}
                  </span>
                </div>
                <span class="text-[10px] text-[var(--muted)]">Click to morph</span>
              </div>

              <!-- Shape Category Tabs -->
              <div class="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none border-b border-[var(--line)]/50 text-xs">
                <button
                  v-for="cat in SHAPE_CATEGORIES"
                  :key="cat.id"
                  type="button"
                  class="px-2.5 py-1 rounded-lg font-medium transition cursor-pointer shrink-0 text-[11px] flex items-center gap-1"
                  :class="
                    selectedCategory === cat.id
                      ? 'bg-[var(--ink)] text-[var(--paper)] font-semibold shadow-2xs'
                      : 'text-[var(--muted)] hover:text-[var(--ink)] hover:bg-black/5'
                  "
                  @click="selectedCategory = cat.id"
                >
                  <span>{{ cat.icon }}</span>
                  <span>{{ cat.label }}</span>
                </button>
              </div>

              <!-- Shapes Grid with Live BotTiles -->
              <div class="grid grid-cols-4 sm:grid-cols-6 gap-1.5 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin">
                <BotTile
                  v-for="s in filteredShapes"
                  :key="s.id"
                  :label="t(`shapes.${s.id}`)"
                  :selected="s.id === botShape"
                  :shape="s.id"
                  :color="botColor"
                  expression="neutre"
                  :feature-size="botFeatureSize"
                  :eyebrows="botEyebrows"
                  :nose="botNose"
                  :cheeks="botCheeks"
                  :mouth="botMouth"
                  :frozen-at="1"
                  @click="botShape = s.id"
                />
              </div>
            </div>

            <!-- SECTION 2: Customization Controls (Colors, Face Features) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Left Subcolumn: Color, Feature size, Eyebrows -->
              <div class="space-y-3.5">
                <!-- Color -->
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-[var(--ink)] flex items-center justify-between">
                    <span>Color Palette</span>
                    <span class="font-mono text-[11px] text-[var(--muted)]">{{ botColor }}</span>
                  </label>
                  <div class="flex items-center flex-wrap gap-1.5">
                    <button
                      v-for="c in PRESET_COLORS"
                      :key="c.id"
                      type="button"
                      :title="c.label"
                      class="h-6 w-6 rounded-full border-2 transition transform cursor-pointer hover:scale-110"
                      :class="botColor.toLowerCase() === c.hex.toLowerCase() ? 'border-[var(--ink)] ring-2 ring-black/10 scale-105' : 'border-white shadow-xs'"
                      :style="{ backgroundColor: c.hex }"
                      @click="botColor = c.hex"
                    />
                    <label class="relative flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-[var(--line)] bg-white shadow-xs hover:border-[var(--ink)]" title="Custom color">
                      <input type="color" v-model="botColor" class="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                      <svg class="w-3 h-3 text-[var(--muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="16" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                      </svg>
                    </label>
                  </div>
                </div>

                <!-- Feature Size -->
                <div class="space-y-1">
                  <h3 class="text-xs font-semibold text-[var(--ink)]">{{ t('panel.featureSize') }}</h3>
                  <div class="grid grid-cols-3 gap-1.5" role="radiogroup" :aria-label="t('panel.featureSize')">
                    <button
                      v-for="s in FEATURE_SIZES"
                      :key="s"
                      type="button"
                      role="radio"
                      :aria-checked="s === botFeatureSize"
                      :aria-label="t(`featureSize.${s}`)"
                      class="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border px-1.5 py-1.5 text-xs transition"
                      :class="
                        s === botFeatureSize
                          ? 'border-[var(--ink)] bg-white font-semibold text-[var(--ink)] shadow-2xs'
                          : 'border-[var(--line)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--ink)]'
                      "
                      @click="botFeatureSize = s"
                    >
                      <div class="flex h-4 items-center justify-center gap-1">
                        <span
                          class="rounded-full bg-current transition-all"
                          :style="{ width: `${EYE_PREVIEW[s].w}px`, height: `${EYE_PREVIEW[s].h}px` }"
                        />
                        <span
                          class="rounded-full bg-current transition-all"
                          :style="{ width: `${EYE_PREVIEW[s].w}px`, height: `${EYE_PREVIEW[s].h}px` }"
                        />
                      </div>
                      <span class="text-[10px]">{{ t(`featureSize.${s}`) }}</span>
                    </button>
                  </div>
                </div>

                <!-- Eyebrows -->
                <div class="space-y-1">
                  <h3 class="text-xs font-semibold text-[var(--ink)]">{{ t('panel.eyebrows') }}</h3>
                  <div class="grid grid-cols-4 gap-1" role="radiogroup" :aria-label="t('panel.eyebrows')">
                    <button
                      v-for="b in EYEBROWS_STYLES"
                      :key="b"
                      type="button"
                      role="radio"
                      :aria-checked="b === botEyebrows"
                      :aria-label="t(`eyebrows.${b}`)"
                      class="flex cursor-pointer flex-col items-center justify-center gap-0.5 rounded-xl border p-1 text-xs transition"
                      :class="
                        b === botEyebrows
                          ? 'border-[var(--ink)] bg-white font-semibold text-[var(--ink)] shadow-2xs'
                          : 'border-[var(--line)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--ink)]'
                      "
                      @click="botEyebrows = b"
                    >
                      <div class="flex h-4 items-center justify-center">
                        <svg v-if="b === 'none'" viewBox="0 0 20 20" class="h-3.5 w-3.5 text-[var(--muted)]" aria-hidden="true">
                          <circle cx="10" cy="10" r="6" stroke="currentColor" stroke-width="1.5" fill="none" />
                          <line x1="6" y1="14" x2="14" y2="6" stroke="currentColor" stroke-width="1.5" />
                        </svg>
                        <svg v-else-if="b === 'arched'" viewBox="0 0 24 14" class="h-3 w-5" aria-hidden="true">
                          <path d="M2 10 Q6 3 10 9 M14 9 Q18 3 22 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" />
                        </svg>
                        <svg v-else-if="b === 'straight'" viewBox="0 0 24 14" class="h-3 w-5" aria-hidden="true">
                          <line x1="2" y1="7" x2="10" y2="7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
                          <line x1="14" y1="7" x2="22" y2="7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
                        </svg>
                        <svg v-else-if="b === 'dots'" viewBox="0 0 24 14" class="h-3 w-5" aria-hidden="true">
                          <circle cx="6" cy="7" r="2.5" fill="currentColor" />
                          <circle cx="18" cy="7" r="2.5" fill="currentColor" />
                        </svg>
                      </div>
                      <span class="text-[10px] leading-tight">{{ t(`eyebrows.${b}`) }}</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Right Subcolumn: Nose, Cheeks, Mouth, 3D Physics Overlay -->
              <div class="space-y-3.5">
                <!-- Nose -->
                <div class="space-y-1">
                  <h3 class="text-xs font-semibold text-[var(--ink)]">{{ t('panel.nose') }}</h3>
                  <div class="grid grid-cols-4 gap-1" role="radiogroup" :aria-label="t('panel.nose')">
                    <button
                      v-for="n in NOSE_STYLES"
                      :key="n"
                      type="button"
                      role="radio"
                      :aria-checked="n === botNose"
                      :aria-label="t(`nose.${n}`)"
                      class="flex cursor-pointer flex-col items-center justify-center gap-0.5 rounded-xl border p-1 text-xs transition"
                      :class="
                        n === botNose
                          ? 'border-[var(--ink)] bg-white font-semibold text-[var(--ink)] shadow-2xs'
                          : 'border-[var(--line)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--ink)]'
                      "
                      @click="botNose = n"
                    >
                      <div class="flex h-4 items-center justify-center">
                        <svg v-if="n === 'none'" viewBox="0 0 20 20" class="h-3.5 w-3.5 text-[var(--muted)]" aria-hidden="true">
                          <circle cx="10" cy="10" r="6" stroke="currentColor" stroke-width="1.5" fill="none" />
                          <line x1="6" y1="14" x2="14" y2="6" stroke="currentColor" stroke-width="1.5" />
                        </svg>
                        <svg v-else-if="n === 'dot'" viewBox="0 0 20 14" class="h-3 w-4" aria-hidden="true">
                          <circle cx="10" cy="7" r="2.5" fill="currentColor" />
                        </svg>
                        <svg v-else-if="n === 'pill'" viewBox="0 0 20 14" class="h-3 w-4" aria-hidden="true">
                          <rect x="8.5" y="3" width="3" height="8" rx="1.5" fill="currentColor" />
                        </svg>
                        <svg v-else-if="n === 'snout'" viewBox="0 0 20 14" class="h-3 w-4" aria-hidden="true">
                          <path d="M7 5 Q10 4 13 5 Q10 10 7 5 Z" fill="currentColor" />
                        </svg>
                      </div>
                      <span class="text-[10px] leading-tight">{{ t(`nose.${n}`) }}</span>
                    </button>
                  </div>
                </div>

                <!-- Cheeks -->
                <div class="space-y-1">
                  <h3 class="text-xs font-semibold text-[var(--ink)]">{{ t('panel.cheeks') }}</h3>
                  <div class="grid grid-cols-4 gap-1" role="radiogroup" :aria-label="t('panel.cheeks')">
                    <button
                      v-for="c in CHEEKS_STYLES"
                      :key="c"
                      type="button"
                      role="radio"
                      :aria-checked="c === botCheeks"
                      :aria-label="t(`cheeks.${c}`)"
                      class="flex cursor-pointer flex-col items-center justify-center gap-0.5 rounded-xl border p-1 text-xs transition"
                      :class="
                        c === botCheeks
                          ? 'border-[var(--ink)] bg-white font-semibold text-[var(--ink)] shadow-2xs'
                          : 'border-[var(--line)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--ink)]'
                      "
                      @click="botCheeks = c"
                    >
                      <div class="flex h-4 items-center justify-center">
                        <svg v-if="c === 'none'" viewBox="0 0 20 20" class="h-3.5 w-3.5 text-[var(--muted)]" aria-hidden="true">
                          <circle cx="10" cy="10" r="6" stroke="currentColor" stroke-width="1.5" fill="none" />
                          <line x1="6" y1="14" x2="14" y2="6" stroke="currentColor" stroke-width="1.5" />
                        </svg>
                        <svg v-else-if="c === 'blush'" viewBox="0 0 24 14" class="h-3 w-5" aria-hidden="true">
                          <rect x="2" y="4" width="8" height="5" rx="2.5" fill="#ff6b8b" opacity="0.85" />
                          <rect x="14" y="4" width="8" height="5" rx="2.5" fill="#ff6b8b" opacity="0.85" />
                        </svg>
                        <svg v-else-if="c === 'dots'" viewBox="0 0 24 14" class="h-3 w-5" aria-hidden="true">
                          <circle cx="6" cy="7" r="3" fill="#ff6b8b" opacity="0.85" />
                          <circle cx="18" cy="7" r="3" fill="#ff6b8b" opacity="0.85" />
                        </svg>
                        <svg v-else-if="c === 'lines'" viewBox="0 0 24 14" class="h-3 w-5" aria-hidden="true">
                          <line x1="3" y1="10" x2="6" y2="4" stroke="#ff6b8b" stroke-width="1.5" stroke-linecap="round" />
                          <line x1="7" y1="10" x2="10" y2="4" stroke="#ff6b8b" stroke-width="1.5" stroke-linecap="round" />
                          <line x1="14" y1="10" x2="17" y2="4" stroke="#ff6b8b" stroke-width="1.5" stroke-linecap="round" />
                          <line x1="18" y1="10" x2="21" y2="4" stroke="#ff6b8b" stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                      </div>
                      <span class="text-[10px] leading-tight">{{ t(`cheeks.${c}`) }}</span>
                    </button>
                  </div>
                </div>

                <!-- Mouth -->
                <div class="space-y-1">
                  <h3 class="text-xs font-semibold text-[var(--ink)]">{{ t('panel.mouth') }}</h3>
                  <div class="grid grid-cols-4 gap-1" role="radiogroup" :aria-label="t('panel.mouth')">
                    <button
                      v-for="m in MOUTH_STYLES"
                      :key="m"
                      type="button"
                      role="radio"
                      :aria-checked="m === botMouth"
                      :aria-label="t(`mouth.${m}`)"
                      class="flex cursor-pointer flex-col items-center justify-center gap-0.5 rounded-xl border p-1 text-xs transition"
                      :class="
                        m === botMouth
                          ? 'border-[var(--ink)] bg-white font-semibold text-[var(--ink)] shadow-2xs'
                          : 'border-[var(--line)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--ink)]'
                      "
                      @click="botMouth = m"
                    >
                      <div class="flex h-4 items-center justify-center">
                        <svg v-if="m === 'none'" viewBox="0 0 20 20" class="h-3.5 w-3.5 text-[var(--muted)]" aria-hidden="true">
                          <circle cx="10" cy="10" r="6" stroke="currentColor" stroke-width="1.5" fill="none" />
                          <line x1="6" y1="14" x2="14" y2="6" stroke="currentColor" stroke-width="1.5" />
                        </svg>
                        <svg v-else-if="m === 'smile'" viewBox="0 0 24 14" class="h-3 w-5" aria-hidden="true">
                          <path d="M4 4 Q12 12 20 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" />
                        </svg>
                        <svg v-else-if="m === 'grin'" viewBox="0 0 24 14" class="h-3 w-5" aria-hidden="true">
                          <path d="M4 3 L20 3 Q12 13 4 3 Z" fill="currentColor" />
                        </svg>
                        <svg v-else-if="m === 'frown'" viewBox="0 0 24 14" class="h-3 w-5" aria-hidden="true">
                          <path d="M4 10 Q12 2 20 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" />
                        </svg>
                        <svg v-else-if="m === 'open'" viewBox="0 0 20 14" class="h-3 w-4" aria-hidden="true">
                          <ellipse cx="10" cy="7" rx="3.5" ry="4.5" fill="currentColor" />
                        </svg>
                        <svg v-else-if="m === 'cat'" viewBox="0 0 24 14" class="h-3 w-5" aria-hidden="true">
                          <path d="M4 5 Q8 11 12 7 Q16 11 20 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" />
                        </svg>
                        <svg v-else-if="m === 'straight'" viewBox="0 0 24 14" class="h-3 w-5" aria-hidden="true">
                          <line x1="5" y1="7" x2="19" y2="7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
                        </svg>
                      </div>
                      <span class="text-[10px] leading-tight">{{ t(`mouth.${m}`) }}</span>
                    </button>
                  </div>
                </div>

                <!-- 3D Motion System Overlay -->
                <div class="space-y-1">
                  <h3 class="text-xs font-semibold text-[var(--ink)] flex items-center justify-between">
                    <span>3D Motion System</span>
                    <span class="text-[10px] text-[var(--muted)]">Active</span>
                  </h3>
                  <div class="grid grid-cols-3 gap-1">
                    <button
                      type="button"
                      class="px-1.5 py-1 rounded-lg border text-[10px] transition cursor-pointer"
                      :class="botIdle3D === 'none' && botPhysics3D === 'none' ? 'border-[var(--ink)] bg-white font-bold text-[var(--ink)]' : 'border-[var(--line)] text-[var(--muted)]'"
                      @click="botIdle3D = 'none'; botPhysics3D = 'none'"
                    >
                      None
                    </button>
                    <button
                      type="button"
                      class="px-1.5 py-1 rounded-lg border text-[10px] transition cursor-pointer"
                      :class="botIdle3D === 'float' ? 'border-[var(--ink)] bg-white font-bold text-[var(--ink)] shadow-2xs' : 'border-[var(--line)] text-[var(--muted)]'"
                      @click="botIdle3D = 'float'"
                    >
                      3D Float
                    </button>
                    <button
                      type="button"
                      class="px-1.5 py-1 rounded-lg border text-[10px] transition cursor-pointer"
                      :class="botPhysics3D === 'springBack' ? 'border-[var(--ink)] bg-white font-bold text-[var(--ink)] shadow-2xs' : 'border-[var(--line)] text-[var(--muted)]'"
                      @click="botPhysics3D = 'springBack'"
                    >
                      3D Spring
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Toggles as Styled Check Pills -->
            <div class="flex flex-wrap gap-2 pt-1 text-xs border-t border-[var(--line)]/60 pt-3">
              <button
                type="button"
                class="pill-toggle"
                :class="botFollow ? 'pill-toggle--active' : ''"
                @click="botFollow = !botFollow"
              >
                <span class="pill-checkbox" :class="botFollow ? 'pill-checkbox--checked' : ''">
                  <svg v-if="botFollow" class="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="2.5 6 5 8.5 9.5 3.5" />
                  </svg>
                </span>
                <span>Cursor Gaze</span>
              </button>

              <button
                type="button"
                class="pill-toggle"
                :class="botAutoMood ? 'pill-toggle--active' : ''"
                @click="botAutoMood = !botAutoMood"
              >
                <span class="pill-checkbox" :class="botAutoMood ? 'pill-checkbox--checked' : ''">
                  <svg v-if="botAutoMood" class="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="2.5 6 5 8.5 9.5 3.5" />
                  </svg>
                </span>
                <span>Auto Mood</span>
              </button>

              <button
                type="button"
                class="pill-toggle"
                :class="botGiant ? 'pill-toggle--active' : ''"
                @click="botGiant = !botGiant"
              >
                <span class="pill-checkbox" :class="botGiant ? 'pill-checkbox--checked' : ''">
                  <svg v-if="botGiant" class="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="2.5 6 5 8.5 9.5 3.5" />
                  </svg>
                </span>
                <span>Giant Perspective</span>
              </button>
            </div>

            <!-- Copy Code Button -->
            <div class="pt-1">
              <button
                type="button"
                class="w-full flex items-center justify-center gap-2 rounded-xl bg-[var(--ink)] px-4 py-2.5 text-xs font-semibold text-[var(--paper)] shadow-sm transition hover:opacity-90 active:scale-[0.99] cursor-pointer"
                @click="copyCode"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>{{ copied ? 'Copied Code to Clipboard!' : 'Copy Drop-in Component Code' }}</span>
              </button>
            </div>
          </div>

          <!-- Right Column: Live Bot Preview (Span 5) -->
          <div class="lg:col-span-5 flex flex-col items-center justify-center min-h-[440px] p-6 rounded-2xl bg-neutral-50/70 border border-[var(--line)]/60">
            <ClipzyInteractiveBot
              :size="botSize"
              :color="botColor"
              :shape="botShape"
              :feature-size="botFeatureSize"
              :eyebrows="botEyebrows"
              :nose="botNose"
              :cheeks="botCheeks"
              :mouth="botMouth"
              :follow="botFollow"
              :auto-mood="botAutoMood"
              :giant="botGiant"
              :idle-animation="botIdle3D"
              :physics-animation="botPhysics3D"
            />
            <div class="mt-4 text-center space-y-1">
              <div class="flex items-center justify-center flex-wrap gap-1.5">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 border border-purple-300 text-[11px] font-semibold text-purple-900 shadow-2xs">
                  <span class="h-1.5 w-1.5 rounded-full bg-purple-600 animate-pulse" />
                  Shape: <strong>{{ t(`shapes.${botShape}`) }}</strong>
                </span>
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[var(--line)] text-[11px] font-medium text-[var(--ink)] shadow-2xs">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  3D: <strong class="capitalize">{{ botIdle3D !== 'none' ? botIdle3D : 'Interactive' }}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.interactive-3d-showcase {
  font-family: inherit;
}

.pill-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.75rem;
  border: 1px solid var(--line);
  background-color: #ffffff;
  padding: 0.4rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
}

.pill-toggle:hover {
  border-color: var(--muted);
  color: var(--ink);
}

.pill-toggle--active {
  border-color: var(--ink);
  color: var(--ink);
  font-weight: 600;
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.pill-checkbox {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  border: 1px solid var(--line);
  background-color: transparent;
  color: #ffffff;
  transition: all 0.15s ease;
}

.pill-checkbox--checked {
  background-color: var(--ink);
  border-color: var(--ink);
}

.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}
</style>
