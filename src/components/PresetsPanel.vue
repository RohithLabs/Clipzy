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
const activeCategory = ref<'all' | 'cyber' | 'cute' | 'royal' | 'chill'>('all')

const CATEGORIES = [
  { id: 'all', label: 'All Characters', icon: '🌟' },
  { id: 'cyber', label: 'Cyber & Sci-Fi', icon: '⚡' },
  { id: 'cute', label: 'Cute & Kawaii', icon: '💖' },
  { id: 'royal', label: 'Royalty & Magic', icon: '👑' },
  { id: 'chill', label: 'Chill & Gaming', icon: '🎮' }
] as const

const allPresetsList = computed(() => {
  return [...customPresets.value, ...COMMUNITY_PRESETS]
})

const filteredPresets = computed(() => {
  if (activeCategory.value === 'all') return allPresetsList.value
  if (activeCategory.value === 'cyber') {
    return allPresetsList.value.filter((p) =>
      ['cyber_ninja', 'neon_dj', 'space_explorer', 'glitch_monster'].includes(p.id)
    )
  }
  if (activeCategory.value === 'cute') {
    return allPresetsList.value.filter((p) =>
      ['kawaii_mochi', 'party_beast', 'chill_companion'].includes(p.id)
    )
  }
  if (activeCategory.value === 'royal') {
    return allPresetsList.value.filter((p) =>
      ['golden_royal', 'ice_wizard', 'fire_champion'].includes(p.id)
    )
  }
  if (activeCategory.value === 'chill') {
    return allPresetsList.value.filter((p) =>
      ['retro_gamer', 'coffee_addict', 'chill_companion'].includes(p.id)
    )
  }
  return allPresetsList.value
})

function applyPreset(p: CharacterPreset) {
  emit('applyPreset', p)
  sfx.playChime()
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { y: 0.6 }
  })
}

function handleFileImport(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    try {
      const text = reader.result as string
      const parsed = parsePresetJSON(text)
      if (parsed) {
        customPresets.value.unshift(parsed)
        applyPreset(parsed)
      }
    } catch (err) {
      console.error('Failed to parse .clipzy file', err)
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
          <span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-sm">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </span>
          <div>
            <h1 class="text-xl sm:text-2xl font-bold tracking-tight">Character Presets & Templates</h1>
            <p class="text-xs text-[var(--muted)]">
              1-click load stylized community characters or import & export custom <code class="font-mono text-[11px] text-amber-600 dark:text-amber-400">.clipzy</code> files.
            </p>
          </div>
        </div>
      </div>

      <!-- File Import -->
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
          <span>Import .clipzy File</span>
        </button>
      </div>
    </div>

    <!-- Category Filter Chips -->
    <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      <button
        v-for="cat in CATEGORIES"
        :key="cat.id"
        type="button"
        class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0"
        :class="
          activeCategory === cat.id
            ? 'bg-[var(--ink)] text-[var(--paper)] shadow-sm'
            : 'border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--ink)]'
        "
        @click="activeCategory = cat.id; sfx.playPop()"
      >
        <span>{{ cat.icon }}</span>
        <span>{{ cat.label }}</span>
      </button>
    </div>

    <!-- Presets Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="preset in filteredPresets"
        :key="preset.id"
        class="group relative flex flex-col justify-between rounded-3xl border border-[var(--line)] bg-white/90 dark:bg-zinc-900/80 p-4 shadow-sm transition-all duration-200 hover:shadow-lg hover:border-amber-400/80 backdrop-blur"
      >
        <!-- Top Bar -->
        <div class="flex items-center justify-between">
          <span class="text-sm font-bold text-[var(--ink)] tracking-tight">{{ preset.name }}</span>
          <button
            type="button"
            class="text-[11px] text-[var(--muted)] hover:text-amber-600 transition cursor-pointer flex items-center gap-1"
            title="Download .clipzy preset"
            @click.stop="exportPresetJSON(preset); sfx.playChime()"
          >
            <span>💾</span>
            <span>Export</span>
          </button>
        </div>

        <!-- Live Mini Bot Preview Stage -->
        <div class="my-3 flex items-center justify-center min-h-[145px] rounded-2xl bg-black/5 dark:bg-white/5 p-2 overflow-hidden">
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
            :idle-animation="'float'"
          />
        </div>

        <!-- Tagline & Accessories Pills -->
        <div class="space-y-3">
          <p class="text-[11px] text-[var(--muted)] line-clamp-1 font-medium">{{ preset.tagline }}</p>

          <div class="flex items-center gap-1 flex-wrap text-[10px] font-mono text-[var(--muted)]">
            <span v-if="preset.hat !== 'none'" class="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5">
              🧢 {{ preset.hat }}
            </span>
            <span v-if="preset.glasses !== 'none'" class="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5">
              🕶️ {{ preset.glasses }}
            </span>
            <span v-if="preset.aura !== 'none'" class="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5">
              ✨ {{ preset.aura }}
            </span>
          </div>

          <button
            type="button"
            class="w-full py-2.5 rounded-xl bg-[var(--ink)] text-[var(--paper)] text-xs font-bold shadow-sm transition hover:opacity-90 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
            @click="applyPreset(preset)"
          >
            <span>✨</span>
            <span>Apply Character</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
