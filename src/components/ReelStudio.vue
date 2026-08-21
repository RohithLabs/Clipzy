<script setup lang="ts">
import { ref, computed } from 'vue'
import ClipzyInteractiveBot from './ClipzyInteractiveBot.vue'
import type { StateId } from '@/bot/states'
import { sfx } from '@/audio/sfx'
import type { HatId, GlassesId, PropId, AuraId } from '@/bot/accessories'

export type AspectRatioId = '9:16' | '1:1' | '16:9' | '4:5'

const props = defineProps<{
  avatarColor?: string
  avatarShape?: string
  avatarHat?: HatId
  avatarGlasses?: GlassesId
  avatarProp?: PropId
  avatarAura?: AuraId
}>()

const activeRatio = ref<AspectRatioId>('9:16')
const activeBg = ref<'cyber' | 'synthwave' | 'cosmic' | 'studio' | 'neon' | 'light'>('synthwave')
const captionText = ref('POV: When Clipzy drops the beat 🔥')
const captionStyle = ref<'neon' | 'yellow' | 'flame' | 'clean'>('yellow')
const activeState = ref<StateId>('disco')

const RATIOS = [
  { id: '9:16', label: '9:16 Reel / TikTok', icon: '📱', width: 280, height: 500 },
  { id: '1:1', label: '1:1 Square', icon: '🖼️', width: 360, height: 360 },
  { id: '16:9', label: '16:9 Video', icon: '📺', width: 500, height: 280 },
  { id: '4:5', label: '4:5 Portrait', icon: '📄', width: 320, height: 400 }
]

const BG_PRESETS = [
  { id: 'synthwave', label: 'Synthwave Sunset', class: 'bg-gradient-to-b from-indigo-950 via-purple-900 to-rose-900' },
  { id: 'cyber', label: 'Cyberpunk Grid', class: 'bg-gradient-to-br from-cyan-950 via-slate-900 to-blue-950' },
  { id: 'cosmic', label: 'Cosmic Nebula', class: 'bg-gradient-to-tr from-slate-950 via-violet-950 to-fuchsia-950' },
  { id: 'neon', label: 'Neon Glow Club', class: 'bg-gradient-to-b from-purple-950 via-black to-slate-950' },
  { id: 'studio', label: 'Dark Studio', class: 'bg-gradient-to-b from-zinc-900 to-zinc-950' },
  { id: 'light', label: 'Clean Light', class: 'bg-gradient-to-b from-slate-100 to-slate-200 text-slate-900' }
]

const QUICK_STATES: { id: StateId; label: string; icon: string }[] = [
  { id: 'disco', label: 'Disco Party', icon: '🕺' },
  { id: 'power', label: 'Power Surge', icon: '⚡' },
  { id: 'thuglife', label: 'Thug Life', icon: '🕶️' },
  { id: 'heart', label: 'Love Strike', icon: '💖' },
  { id: 'djbeat', label: 'DJ Bass Drop', icon: '🎧' },
  { id: 'rocket', label: 'Rocket Launch', icon: '🚀' },
  { id: 'glitch', label: 'Cyber Glitch', icon: '👾' },
  { id: 'royal', label: 'Royal King', icon: '👑' }
]

const currentBgClass = computed(() => {
  return BG_PRESETS.find((b) => b.id === activeBg.value)?.class ?? 'bg-slate-950'
})

const currentDimensions = computed(() => {
  return RATIOS.find((r) => r.id === activeRatio.value) ?? RATIOS[0]!
})

function switchState(st: StateId) {
  activeState.value = st
  sfx.playStateSound(st)
}
</script>

<template>
  <div class="flex h-full flex-col lg:flex-row gap-6 overflow-y-auto p-4 lg:p-6">
    <!-- Controls Sidebar -->
    <div class="flex flex-col gap-5 w-full lg:w-80 shrink-0">
      <div>
        <h2 class="text-xl font-bold tracking-tight text-[var(--ink)] flex items-center gap-2">
          <span>🎬</span> Reel & Story Studio
        </h2>
        <p class="text-xs text-[var(--muted)] mt-1">
          Create viral animated short-form video clips with aspect ratios & animated captions.
        </p>
      </div>

      <!-- Aspect Ratio Picker -->
      <div class="flex flex-col gap-2">
        <label class="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Canvas Format</label>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="r in RATIOS"
            :key="r.id"
            type="button"
            class="flex items-center gap-2 rounded-xl border p-2.5 text-xs font-medium transition cursor-pointer"
            :class="
              activeRatio === r.id
                ? 'border-indigo-500 bg-indigo-500/10 text-indigo-500 font-bold shadow-sm'
                : 'border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--ink)]'
            "
            @click="activeRatio = r.id as AspectRatioId"
          >
            <span>{{ r.icon }}</span>
            <span>{{ r.id }}</span>
          </button>
        </div>
      </div>

      <!-- Background Theme Picker -->
      <div class="flex flex-col gap-2">
        <label class="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Background Theme</label>
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="bg in BG_PRESETS"
            :key="bg.id"
            type="button"
            class="flex h-12 flex-col items-center justify-center rounded-xl border text-[10px] font-medium transition cursor-pointer overflow-hidden relative"
            :class="[
              bg.class,
              activeBg === bg.id ? 'ring-2 ring-indigo-500 font-bold' : 'opacity-80 hover:opacity-100'
            ]"
            @click="activeBg = bg.id as any"
          >
            <span class="text-white drop-shadow text-center px-1 truncate w-full">{{ bg.label }}</span>
          </button>
        </div>
      </div>

      <!-- Animated Caption Input -->
      <div class="flex flex-col gap-2">
        <label class="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Animated Subtitles / Hook</label>
        <input
          v-model="captionText"
          type="text"
          placeholder="Type your caption hook..."
          class="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--ink)] focus:border-indigo-500 focus:outline-none"
        />
        <div class="flex gap-1.5 mt-1">
          <button
            v-for="st in ['yellow', 'neon', 'flame', 'clean'] as const"
            :key="st"
            type="button"
            class="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition cursor-pointer"
            :class="captionStyle === st ? 'bg-indigo-600 text-white' : 'bg-black/5 text-[var(--muted)] dark:bg-white/10'"
            @click="captionStyle = st"
          >
            {{ st }}
          </button>
        </div>
      </div>

      <!-- Quick Action States -->
      <div class="flex flex-col gap-2">
        <label class="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Animation Groove</label>
        <div class="grid grid-cols-2 gap-1.5">
          <button
            v-for="st in QUICK_STATES"
            :key="st.id"
            type="button"
            class="flex items-center gap-1.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-2 text-xs font-medium transition cursor-pointer hover:border-indigo-500"
            :class="activeState === st.id ? 'border-indigo-500 bg-indigo-500/10 text-indigo-500 font-bold' : 'text-[var(--ink)]'"
            @click="switchState(st.id)"
          >
            <span>{{ st.icon }}</span>
            <span class="truncate">{{ st.label }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Live Preview Stage -->
    <div class="flex flex-1 items-center justify-center min-h-[500px] rounded-3xl border border-[var(--line)] bg-black/20 p-6 backdrop-blur">
      <div
        class="relative flex flex-col items-center justify-between rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 border border-white/10"
        :class="currentBgClass"
        :style="{
          width: `${currentDimensions.width}px`,
          height: `${currentDimensions.height}px`
        }"
      >
        <!-- Top branding watermark -->
        <div class="flex w-full items-center justify-between px-4 pt-4 z-10">
          <div class="flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 backdrop-blur border border-white/10">
            <span class="h-2 w-2 rounded-full bg-red-500 animate-ping" />
            <span class="font-mono text-[10px] font-bold text-white tracking-widest">CLIPZY PRO</span>
          </div>
          <span class="text-[10px] font-mono text-white/70">{{ activeRatio }}</span>
        </div>

        <!-- Center Avatar -->
        <div class="relative flex items-center justify-center my-auto">
          <ClipzyInteractiveBot
            :size="Math.min(currentDimensions.width * 0.75, currentDimensions.height * 0.55)"
            :color="props.avatarColor || '#a855f7'"
            :shape="props.avatarShape || 'cercle'"
            :state="activeState"
            :hat="props.avatarHat || 'none'"
            :glasses="props.avatarGlasses || 'none'"
            :prop="props.avatarProp || 'none'"
            :aura="props.avatarAura || 'none'"
            :play-sounds="true"
            idle-animation="float"
          />
        </div>

        <!-- Bottom Animated Caption Overlay -->
        <div class="w-full px-4 pb-5 text-center z-10">
          <div
            v-if="captionText"
            class="inline-block rounded-2xl px-4 py-2 text-sm font-black tracking-wide drop-shadow-xl transition-transform hover:scale-105"
            :class="{
              'bg-yellow-400 text-black border-2 border-black font-extrabold shadow-lg': captionStyle === 'yellow',
              'bg-black/70 text-cyan-400 border border-cyan-400/50 backdrop-blur shadow-[0_0_15px_rgba(6,182,212,0.5)]': captionStyle === 'neon',
              'bg-gradient-to-r from-orange-500 to-red-600 text-white font-extrabold shadow-lg': captionStyle === 'flame',
              'bg-white/90 text-zinc-950 font-bold backdrop-blur': captionStyle === 'clean'
            }"
          >
            {{ captionText }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
