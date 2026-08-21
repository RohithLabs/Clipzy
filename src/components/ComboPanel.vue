<script setup lang="ts">
import { ref, computed } from 'vue'
import { SIGNATURE_COMBOS, generateSmartCombo, type ComboPreset } from '@/bot/combos'
import type { Block } from '@/bot/cycles'
import { sfx } from '@/audio/sfx'

const emit = defineEmits<{
  (e: 'loadCombo', combo: { name: string; blocks: Block[] }): void
  (e: 'previewState', state: string): void
}>()

const activeCategory = ref<'all' | 'viral' | 'cyber' | 'hype' | 'chill' | 'fun'>('all')
const selectedVibe = ref<'hype' | 'chill' | 'cyber' | 'cute' | 'dramatic'>('hype')
const comboLength = ref(5)

const CATEGORIES = [
  { id: 'all', label: 'All Combos', icon: '✨' },
  { id: 'viral', label: 'Viral Hooks', icon: '🔥' },
  { id: 'cyber', label: 'Cyberpunk', icon: '⚡' },
  { id: 'hype', label: 'Hype Beats', icon: '🚀' },
  { id: 'chill', label: 'Lo-Fi Chill', icon: '🫧' },
  { id: 'fun', label: 'Fun & Playful', icon: '💖' }
]

const filteredCombos = computed(() => {
  if (activeCategory.value === 'all') return SIGNATURE_COMBOS
  return SIGNATURE_COMBOS.filter((c) => c.category === activeCategory.value)
})

function applyCombo(combo: ComboPreset) {
  sfx.playChime()
  emit('loadCombo', {
    name: combo.name,
    blocks: JSON.parse(JSON.stringify(combo.blocks))
  })
}

function runGenerator() {
  sfx.playPowerCharge()
  const generated = generateSmartCombo(selectedVibe.value, comboLength.value)
  emit('loadCombo', {
    name: `Smart ${selectedVibe.value.toUpperCase()} Combo`,
    blocks: generated
  })
}
</script>

<template>
  <div class="flex h-full flex-col gap-6 overflow-y-auto p-4 lg:p-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold tracking-tight text-[var(--ink)] flex items-center gap-2">
          <span class="text-2xl">⚡</span> Signature Combos & Choreography
        </h2>
        <p class="text-xs text-[var(--muted)] mt-1">
          One-click multi-track animation sequences & AI-style smart generator
        </p>
      </div>
    </div>

    <!-- Smart Generator Card -->
    <div class="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-slate-900/60 p-5 backdrop-blur shadow-lg">
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <span class="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">🪄</span>
          <h3 class="font-semibold text-sm text-[var(--ink)]">Smart Combo Choreographer</h3>
        </div>
        <p class="text-xs text-[var(--muted)]">
          Auto-compose a seamless fluid animation montage tuned to your desired vibe and tempo.
        </p>
        
        <div class="flex flex-wrap items-center gap-2 mt-2">
          <button
            v-for="v in ['hype', 'chill', 'cyber', 'cute', 'dramatic'] as const"
            :key="v"
            type="button"
            class="px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition cursor-pointer"
            :class="selectedVibe === v ? 'bg-indigo-600 text-white shadow-md' : 'bg-white/10 text-[var(--muted)] hover:bg-white/20 hover:text-[var(--ink)]'"
            @click="selectedVibe = v"
          >
            {{ v }}
          </button>
        </div>

        <div class="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
          <div class="flex items-center gap-2 text-xs text-[var(--muted)]">
            <span>Blocks:</span>
            <input
              v-model.number="comboLength"
              type="range"
              min="3"
              max="8"
              class="w-24 accent-indigo-500 cursor-pointer"
            />
            <span class="font-mono font-bold text-[var(--ink)]">{{ comboLength }}</span>
          </div>

          <button
            type="button"
            class="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-xs font-bold text-white shadow-lg transition hover:scale-105 active:scale-95 cursor-pointer"
            @click="runGenerator"
          >
            <span>✨ Generate & Load</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Category Pills -->
    <div class="flex flex-wrap gap-1.5">
      <button
        v-for="cat in CATEGORIES"
        :key="cat.id"
        type="button"
        class="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition cursor-pointer"
        :class="
          activeCategory === cat.id
            ? 'bg-[var(--ink)] text-[var(--paper)] shadow-sm'
            : 'bg-black/5 text-[var(--muted)] hover:bg-black/10 hover:text-[var(--ink)] dark:bg-white/5 dark:hover:bg-white/10'
        "
        @click="activeCategory = cat.id as any"
      >
        <span>{{ cat.icon }}</span>
        <span>{{ cat.label }}</span>
      </button>
    </div>

    <!-- Combos Grid -->
    <div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
      <div
        v-for="combo in filteredCombos"
        :key="combo.id"
        class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 transition-all hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-xl"
      >
        <div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-xl">{{ combo.icon }}</span>
              <h4 class="font-bold text-sm text-[var(--ink)]">{{ combo.name }}</h4>
            </div>
            <span class="rounded-full bg-black/5 px-2 py-0.5 font-mono text-[10px] text-[var(--muted)] dark:bg-white/10">
              {{ combo.blocks.length }} steps
            </span>
          </div>
          <p class="mt-2 text-xs text-[var(--muted)] line-clamp-2">
            {{ combo.description }}
          </p>

          <!-- Sequence pills -->
          <div class="mt-3 flex flex-wrap gap-1">
            <span
              v-for="(b, i) in combo.blocks"
              :key="i"
              class="rounded-md bg-black/5 px-1.5 py-0.5 font-mono text-[10px] text-[var(--ink)] dark:bg-white/10"
            >
              {{ b.state }} ({{ b.duration }}s)
            </span>
          </div>
        </div>

        <div class="mt-4 flex items-center justify-end gap-2 pt-2 border-t border-[var(--line)]">
          <button
            type="button"
            class="flex items-center gap-1 rounded-xl bg-[var(--ink)] px-3 py-1.5 text-xs font-semibold text-[var(--paper)] transition hover:opacity-90 active:scale-95 cursor-pointer"
            @click="applyCombo(combo)"
          >
            <span>Load to Timeline</span>
            <span>➔</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
