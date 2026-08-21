<script setup lang="ts">
import { computed, ref } from 'vue'
import { t } from '@/i18n'
import { sfx } from '@/audio/sfx'

export type ViewId =
  | 'personnaliser'
  | 'animations'
  | 'combos'
  | 'reel'
  | 'voice'
  | 'presets'
  | 'reglages'

const view = defineModel<ViewId>({ default: 'personnaliser' })

const ITEMS = computed<Array<{ id: ViewId; label: string; icon: string; badge?: string }>>(() => [
  { id: 'personnaliser', label: t('rail.customize') || 'Studio', icon: 'palette' },
  { id: 'animations', label: t('rail.animations') || 'Timeline', icon: 'clapper' },
  { id: 'combos', label: t('rail.combos') || 'Combos', icon: 'lightning', badge: 'New' },
  { id: 'reel', label: t('rail.reel') || 'Reel 9:16', icon: 'video', badge: 'Pro' },
  { id: 'voice', label: 'Voice Lipsync', icon: 'mic' },
  { id: 'presets', label: 'Character Presets', icon: 'users' },
  { id: 'reglages', label: t('rail.settings') || 'Settings', icon: 'gear' }
])

const muted = ref<ViewId | null>(null)

function selectView(id: ViewId) {
  view.value = id
  sfx.playPop()
}
</script>

<template>
  <!-- Top Center Floating Pill Navigation Bar -->
  <nav
    class="fixed top-3 sm:top-4 left-1/2 z-40 -translate-x-1/2 rounded-2xl border border-[var(--line)] bg-white/90 dark:bg-zinc-900/90 p-1.5 shadow-lg backdrop-blur-xl transition-all duration-200"
    :aria-label="t('rail.nav') || 'Navigation'"
  >
    <ul class="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none max-w-[95vw]">
      <li
        v-for="item in ITEMS"
        :key="item.id"
        class="group relative shrink-0"
        @pointerleave="muted = null"
      >
        <button
          type="button"
          class="peer relative flex h-9 sm:h-10 px-2.5 sm:px-3.5 cursor-pointer items-center justify-center gap-1.5 rounded-xl text-xs font-bold transition-all"
          :class="
            view === item.id
              ? 'bg-[var(--ink)] text-[var(--paper)] shadow-sm'
              : 'text-[var(--muted)] hover:bg-black/5 hover:text-[var(--ink)] dark:hover:bg-white/10'
          "
          :aria-label="item.label"
          :aria-current="view === item.id ? 'page' : undefined"
          @pointerdown="muted = item.id"
          @click="selectView(item.id)"
        >
          <!-- Studio / Palette -->
          <svg
            v-if="item.id === 'personnaliser'"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
          </svg>

          <!-- Timeline / Clapper -->
          <svg
            v-else-if="item.id === 'animations'"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 11v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8H4Z" />
            <path d="m4 11 3.5-6.5h13l-3.5 6.5H4Z" />
            <path d="m8 4.5 3.5 6.5" />
            <path d="m14 4.5 3.5 6.5" />
          </svg>

          <!-- Combos / Lightning -->
          <svg
            v-else-if="item.id === 'combos'"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>

          <!-- Reel Studio / Video -->
          <svg
            v-else-if="item.id === 'reel'"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m9 8 6 4-6 4Z" />
          </svg>

          <!-- Voice / Mic -->
          <svg
            v-else-if="item.id === 'voice'"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>

          <!-- Character Presets / Users -->
          <svg
            v-else-if="item.id === 'presets'"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>

          <!-- Settings / Gear -->
          <svg
            v-else-if="item.id === 'reglages'"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>

          <!-- Label text -->
          <span class="hidden sm:inline whitespace-nowrap">{{ item.label }}</span>

          <!-- Badge -->
          <span
            v-if="item.badge"
            class="hidden md:inline-block px-1.5 py-0.2 text-[8px] font-black uppercase rounded-full"
            :class="view === item.id ? 'bg-purple-400 text-black' : 'bg-purple-500/20 text-purple-600 dark:text-purple-300'"
          >
            {{ item.badge }}
          </span>
        </button>
      </li>
    </ul>
  </nav>
</template>
