<script setup lang="ts">
import { ref, computed } from 'vue'
import ClipzyInteractiveBot from '@/components/ClipzyInteractiveBot.vue'
import type { StateId } from '@/bot/states'
import type { HatId, GlassesId, PropId, AuraId } from '@/bot/accessories'
import type { FeatureSize, EyebrowsStyle, NoseStyle, CheeksStyle, MouthStyle } from '@/bot/face'
import { sfx } from '@/audio/sfx'

const props = defineProps<{
  color: string
  shape: string
  state: StateId
  expression: string
  featureSize: FeatureSize
  eyebrows: EyebrowsStyle
  nose: NoseStyle
  cheeks: CheeksStyle
  mouth: MouthStyle
  hat: HatId
  glasses: GlassesId
  prop: PropId
  aura: AuraId
}>()

const emit = defineEmits<{
  (e: 'update:state', state: StateId): void
  (e: 'update:expression', expr: string): void
}>()

const stageZoom = ref(1.0)
const stageTheme = ref<'aurora' | 'cyber' | 'studio' | 'sunset' | 'clean'>('aurora')
const showGrid = ref(true)

const QUICK_ACTIONS: Array<{ id: StateId; label: string; icon: string }> = [
  { id: 'idle', label: 'Idle', icon: '🫧' },
  { id: 'wink', label: 'Wink', icon: '😉' },
  { id: 'excited', label: 'Excited', icon: '🤩' },
  { id: 'power', label: 'Power', icon: '⚡' },
  { id: 'thuglife', label: 'Thug', icon: '🕶️' },
  { id: 'disco', label: 'Disco', icon: '🕺' },
  { id: 'rocket', label: 'Rocket', icon: '🚀' },
  { id: 'heart', label: 'Love', icon: '💖' },
  { id: 'glitch', label: 'Glitch', icon: '👾' },
  { id: 'magic', label: 'Magic', icon: '🪄' }
]

const stageBgClass = computed(() => {
  switch (stageTheme.value) {
    case 'cyber':
      return 'from-slate-950 via-cyan-950/40 to-slate-950'
    case 'studio':
      return 'from-zinc-950 via-zinc-900 to-black'
    case 'sunset':
      return 'from-indigo-950 via-purple-950/50 to-rose-950/40'
    case 'clean':
      return 'from-slate-100 via-white to-slate-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-black'
    case 'aurora':
    default:
      return 'from-purple-950/20 via-indigo-950/30 to-emerald-950/20'
  }
})

function triggerState(s: StateId) {
  emit('update:state', s)
  sfx.playStateSound(s)
}

function zoomIn() {
  stageZoom.value = Math.min(1.5, stageZoom.value + 0.1)
}

function zoomOut() {
  stageZoom.value = Math.max(0.6, stageZoom.value - 0.1)
}

function resetZoom() {
  stageZoom.value = 1.0
}
</script>

<template>
  <div class="modern-stage relative flex-1 flex flex-col items-center justify-between min-h-[520px] lg:min-h-[640px] p-4 sm:p-6 rounded-3xl border border-[var(--line)] bg-gradient-to-b transition-all duration-500 overflow-hidden shadow-sm" :class="stageBgClass">
    <!-- 1. Background Ambient FX & Grid -->
    <div
      v-if="showGrid"
      class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"
    />

    <!-- Ambient Glowing Orb -->
    <div
      class="absolute w-[360px] h-[360px] rounded-full blur-3xl opacity-30 pointer-events-none transition-all duration-700 -z-0"
      :style="{
        backgroundColor: props.color || '#a855f7',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }"
    />

    <!-- 2. Top Stage Floating Controls -->
    <div class="w-full flex items-center justify-between z-10">
      <!-- Stage Theme Switcher -->
      <div class="flex items-center gap-1 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md p-1 rounded-2xl border border-[var(--line)] shadow-2xs">
        <button
          v-for="th in [
            { id: 'aurora', label: 'Aurora', icon: '🌌' },
            { id: 'cyber', label: 'Cyber', icon: '⚡' },
            { id: 'sunset', label: 'Sunset', icon: '🌇' },
            { id: 'studio', label: 'Studio', icon: '🎬' },
            { id: 'clean', label: 'Clean', icon: '⚪' }
          ] as const"
          :key="th.id"
          type="button"
          class="flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold transition cursor-pointer"
          :class="
            stageTheme === th.id
              ? 'bg-[var(--ink)] text-[var(--paper)] shadow-2xs'
              : 'text-[var(--muted)] hover:text-[var(--ink)]'
          "
          @click="stageTheme = th.id"
        >
          <span>{{ th.icon }}</span>
          <span class="hidden sm:inline">{{ th.label }}</span>
        </button>
      </div>

      <!-- Zoom & Grid Tools -->
      <div class="flex items-center gap-1 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md p-1 rounded-2xl border border-[var(--line)] shadow-2xs">
        <button
          type="button"
          class="h-7 w-7 flex items-center justify-center rounded-xl text-xs font-bold text-[var(--ink)] hover:bg-black/5 transition cursor-pointer"
          title="Zoom Out"
          @click="zoomOut"
        >
          -
        </button>
        <button
          type="button"
          class="px-2 py-1 rounded-xl text-[11px] font-mono font-bold text-[var(--muted)] hover:text-[var(--ink)] transition cursor-pointer"
          title="Reset Zoom"
          @click="resetZoom"
        >
          {{ Math.round(stageZoom * 100) }}%
        </button>
        <button
          type="button"
          class="h-7 w-7 flex items-center justify-center rounded-xl text-xs font-bold text-[var(--ink)] hover:bg-black/5 transition cursor-pointer"
          title="Zoom In"
          @click="zoomIn"
        >
          +
        </button>
        <button
          type="button"
          class="h-7 w-7 flex items-center justify-center rounded-xl text-xs transition cursor-pointer"
          :class="showGrid ? 'text-purple-600 bg-purple-50 dark:bg-purple-950/40' : 'text-[var(--muted)]'"
          title="Toggle Grid"
          @click="showGrid = !showGrid"
        >
          ▦
        </button>
      </div>
    </div>

    <!-- 3. Center Avatar Viewport Stage -->
    <div
      class="relative flex items-center justify-center my-auto transition-transform duration-200 z-10"
      :style="{ transform: `scale(${stageZoom})` }"
    >
      <ClipzyInteractiveBot
        :size="340"
        :color="props.color"
        :shape="props.shape"
        :state="props.state"
        :expression="props.expression"
        :feature-size="props.featureSize"
        :eyebrows="props.eyebrows"
        :nose="props.nose"
        :cheeks="props.cheeks"
        :mouth="props.mouth"
        :hat="props.hat"
        :glasses="props.glasses"
        :prop="props.prop"
        :aura="props.aura"
        :follow="true"
        :auto-mood="false"
        :play-sounds="true"
        idle-animation="float"
      />
    </div>

    <!-- 4. Bottom Floating Quick Action / Expression Bar -->
    <div class="w-full flex flex-col items-center gap-2 z-10">
      <div class="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-[var(--line)] shadow-md overflow-x-auto max-w-full scrollbar-none">
        <button
          v-for="act in QUICK_ACTIONS"
          :key="act.id"
          type="button"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0"
          :class="
            props.state === act.id
              ? 'bg-purple-600 text-white shadow-sm scale-105'
              : 'text-[var(--ink)] hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-600'
          "
          @click="triggerState(act.id)"
        >
          <span>{{ act.icon }}</span>
          <span>{{ act.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
