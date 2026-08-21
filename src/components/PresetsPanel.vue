<script setup lang="ts">
import { ref, computed } from 'vue'
import { COMMUNITY_PRESETS, exportPresetJSON, parsePresetJSON, type CharacterPreset } from '@/bot/presets'
import ClipzyInteractiveBot from './ClipzyInteractiveBot.vue'
import confetti from 'canvas-confetti'
import { sfx } from '@/audio/sfx'

const emit = defineEmits<{
  (e: 'applyPreset', preset: CharacterPreset): void
}>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const customPresets = ref<CharacterPreset[]>([])

const displayedPresets = computed(() => {
  if (customPresets.value.length > 0) {
    return [...customPresets.value, ...COMMUNITY_PRESETS]
  }
  return COMMUNITY_PRESETS
})

function applyPreset(p: CharacterPreset) {
  emit('applyPreset', p)
  sfx.playChime()
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { y: 0.7 }
  })
}

function handleFileImport(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    const text = reader.result as string
    const parsed = parsePresetJSON(text)
    if (parsed) {
      customPresets.value.unshift(parsed)
      applyPreset(parsed)
    }
  }
  reader.readAsText(file)
}
</script>

<template>
  <div class="presets-panel w-full max-w-6xl mx-auto p-4 sm:p-6 space-y-6 text-[var(--ink)]">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
      <div>
        <div class="flex items-center gap-2.5">
          <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-sm">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>
          <h1 class="text-2xl font-bold tracking-tight">Character Presets & Community Hub</h1>
        </div>
        <p class="text-xs text-[var(--muted)] mt-1">
          Explore 12 signature stylized characters with matching accessories, auras, and traits, or import/export `.clipzy` JSON files.
        </p>
      </div>

      <!-- File Import / Export -->
      <div class="flex items-center gap-2">
        <input
          ref="fileInputRef"
          type="file"
          accept=".clipzy,.json"
          class="hidden"
          @change="handleFileImport"
        />
        <button
          type="button"
          class="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-bold transition hover:border-amber-400 cursor-pointer shadow-2xs"
          @click="fileInputRef?.click()"
        >
          <span>📁</span>
          <span>Import .clipzy</span>
        </button>
      </div>
    </div>

    <!-- Presets Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="preset in displayedPresets"
        :key="preset.id"
        class="group relative flex flex-col justify-between rounded-2xl border border-[var(--line)] bg-white/80 p-4 shadow-2xs transition hover:shadow-md hover:border-amber-400/80 backdrop-blur dark:bg-zinc-900/60"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-[var(--ink)] tracking-tight">{{ preset.name }}</span>
          <button
            type="button"
            class="text-[10px] text-[var(--muted)] hover:text-[var(--ink)] transition cursor-pointer"
            title="Download .clipzy"
            @click.stop="exportPresetJSON(preset)"
          >
            💾 Export
          </button>
        </div>

        <div class="my-4 flex items-center justify-center min-h-[140px] rounded-xl bg-black/5 p-2">
          <ClipzyInteractiveBot
            :size="130"
            :color="preset.color"
            :shape="preset.shape"
            :expression="preset.expression"
            :hat="preset.hat"
            :glasses="preset.glasses"
            :prop="preset.prop"
            :aura="preset.aura"
            :play-sounds="false"
            idle-animation="float"
          />
        </div>

        <div class="space-y-3">
          <p class="text-[11px] text-[var(--muted)] line-clamp-1 font-medium">{{ preset.tagline }}</p>

          <div class="flex items-center gap-1 flex-wrap text-[10px] font-mono text-[var(--muted)]">
            <span class="px-2 py-0.5 rounded-md bg-black/5">{{ preset.hat }}</span>
            <span class="px-2 py-0.5 rounded-md bg-black/5">{{ preset.glasses }}</span>
            <span class="px-2 py-0.5 rounded-md bg-black/5">{{ preset.aura }}</span>
          </div>

          <button
            type="button"
            class="w-full py-2 rounded-xl bg-[var(--ink)] text-[var(--paper)] text-xs font-bold shadow-sm transition hover:opacity-90 active:scale-[0.98] cursor-pointer"
            @click="applyPreset(preset)"
          >
            Apply Preset ✨
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
