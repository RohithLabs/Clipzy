<script setup lang="ts">
import { ref } from 'vue'
import { sfx } from '@/audio/sfx'
import type { ViewId } from './SideRail.vue'

const props = defineProps<{
  activeView: ViewId
  isAudioMuted?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:activeView', view: ViewId): void
  (e: 'toggleTheme'): void
  (e: 'toggleAudio'): void
  (e: 'randomize'): void
  (e: 'openExport', format: 'png' | 'mp4' | 'gif' | 'svg' | 'json'): void
}>()

const showExportDropdown = ref(false)

const NAV_ITEMS: Array<{ id: ViewId; label: string; icon: string; badge?: string }> = [
  { id: 'personnaliser', label: 'Studio', icon: '🎨' },
  { id: 'combos', label: 'Combos', icon: '⚡', badge: 'New' },
  { id: 'reel', label: 'Reel 9:16', icon: '📱', badge: 'Pro' },
  { id: 'voice', label: 'Voice', icon: '🎙️' },
  { id: 'presets', label: 'Presets', icon: '👥' },
  { id: 'animations', label: 'Timeline', icon: '🎬' },
  { id: 'reglages', label: 'Settings', icon: '⚙️' }
]

function switchTab(id: ViewId) {
  emit('update:activeView', id)
  sfx.playPop()
}

function handleRandomize() {
  emit('randomize')
  sfx.playWhoosh()
}

function triggerExport(format: 'png' | 'mp4' | 'gif' | 'svg' | 'json') {
  showExportDropdown.value = false
  emit('openExport', format)
  sfx.playChime()
}
</script>

<template>
  <header class="w-full z-40 sticky top-0 px-3 py-2.5 sm:px-6 sm:py-3 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-[var(--line)] shadow-xs transition-colors duration-200">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-3">
      <!-- 1. Brand Logo & Name -->
      <div class="flex items-center gap-3 shrink-0">
        <div class="flex items-center gap-2 cursor-pointer group" @click="switchTab('personnaliser')">
          <div class="h-9 w-9 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="text-base font-black tracking-tight font-heading flex items-center gap-1.5 text-[var(--ink)]">
              CLIPZY
              <span class="px-1.5 py-0.2 text-[9px] font-bold rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                PRO 2.0
              </span>
            </span>
            <span class="text-[10px] text-[var(--muted)] -mt-0.5 font-medium hidden sm:inline-block">
              Animated Vector & 3D Video Studio
            </span>
          </div>
        </div>
      </div>

      <!-- 2. Navigation Module Tabs (Scrollable on mobile) -->
      <nav class="hidden md:flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-2xl border border-[var(--line)] overflow-x-auto scrollbar-none">
        <button
          v-for="item in NAV_ITEMS"
          :key="item.id"
          type="button"
          class="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
          :class="
            activeView === item.id
              ? 'bg-[var(--ink)] text-[var(--paper)] shadow-sm'
              : 'text-[var(--muted)] hover:text-[var(--ink)] hover:bg-black/5 dark:hover:bg-white/10'
          "
          @click="switchTab(item.id)"
        >
          <span>{{ item.icon }}</span>
          <span>{{ item.label }}</span>
          <span
            v-if="item.badge"
            class="px-1.5 py-0.2 text-[8px] font-black uppercase rounded-full"
            :class="activeView === item.id ? 'bg-purple-400 text-black' : 'bg-purple-500/20 text-purple-600 dark:text-purple-300'"
          >
            {{ item.badge }}
          </span>
        </button>
      </nav>

      <!-- 3. Quick Action Controls -->
      <div class="flex items-center gap-1.5 sm:gap-2">
        <!-- Randomize Avatar Button -->
        <button
          type="button"
          class="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-bold text-[var(--ink)] hover:border-purple-400 transition cursor-pointer shadow-2xs"
          title="Randomize Character"
          @click="handleRandomize"
        >
          <span>🎲</span>
          <span class="hidden sm:inline">Random</span>
        </button>

        <!-- Audio Toggle -->
        <button
          type="button"
          class="h-8 w-8 sm:h-9 sm:w-9 rounded-xl border border-[var(--line)] bg-[var(--surface)] flex items-center justify-center text-xs transition cursor-pointer hover:border-purple-400 shadow-2xs"
          :title="isAudioMuted ? 'Unmute SFX' : 'Mute SFX'"
          @click="emit('toggleAudio')"
        >
          <span>{{ isAudioMuted ? '🔇' : '🔊' }}</span>
        </button>

        <!-- Export Dropdown -->
        <div class="relative">
          <button
            type="button"
            class="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-sm hover:opacity-95 transition cursor-pointer"
            @click="showExportDropdown = !showExportDropdown"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Export</span>
          </button>

          <!-- Export Menu Modal Dropdown -->
          <div
            v-if="showExportDropdown"
            class="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-[var(--line)] bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl p-1.5 shadow-xl z-50 space-y-1 animate-in fade-in zoom-in-95 duration-100"
          >
            <button
              type="button"
              class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[var(--ink)] hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-600 transition cursor-pointer"
              @click="triggerExport('png')"
            >
              <div class="flex items-center gap-2">
                <span>🖼️</span>
                <span>High-Res PNG</span>
              </div>
              <span class="text-[10px] text-[var(--muted)]">4K</span>
            </button>

            <button
              type="button"
              class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[var(--ink)] hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-600 transition cursor-pointer"
              @click="triggerExport('mp4')"
            >
              <div class="flex items-center gap-2">
                <span>📹</span>
                <span>MP4 Video Reel</span>
              </div>
              <span class="text-[10px] text-[var(--muted)]">HD</span>
            </button>

            <button
              type="button"
              class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[var(--ink)] hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-600 transition cursor-pointer"
              @click="triggerExport('gif')"
            >
              <div class="flex items-center gap-2">
                <span>🎞️</span>
                <span>Animated GIF</span>
              </div>
              <span class="text-[10px] text-[var(--muted)]">Loop</span>
            </button>

            <button
              type="button"
              class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[var(--ink)] hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-600 transition cursor-pointer"
              @click="triggerExport('svg')"
            >
              <div class="flex items-center gap-2">
                <span>📐</span>
                <span>Animated SVG</span>
              </div>
              <span class="text-[10px] text-[var(--muted)]">Vector</span>
            </button>

            <div class="border-t border-[var(--line)] my-1" />

            <button
              type="button"
              class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[var(--ink)] hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-600 transition cursor-pointer"
              @click="triggerExport('json')"
            >
              <div class="flex items-center gap-2">
                <span>💾</span>
                <span>Save .clipzy JSON</span>
              </div>
              <span class="text-[10px] text-[var(--muted)]">Preset</span>
            </button>
          </div>
        </div>

        <!-- GitHub Repository Link -->
        <a
          href="https://github.com/RohithLabs/Clipzy.git"
          target="_blank"
          rel="noopener noreferrer"
          class="h-8 w-8 sm:h-9 sm:w-9 rounded-xl border border-[var(--line)] bg-[var(--surface)] flex items-center justify-center text-[var(--ink)] hover:border-purple-400 transition shadow-2xs"
          title="View on GitHub: RohithLabs/Clipzy"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>
      </div>
    </div>

    <!-- Mobile Navigation Sub-Bar -->
    <div class="md:hidden flex items-center gap-1 overflow-x-auto pt-2 pb-0.5 scrollbar-none border-t border-[var(--line)] mt-2">
      <button
        v-for="item in NAV_ITEMS"
        :key="item.id"
        type="button"
        class="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0"
        :class="
          activeView === item.id
            ? 'bg-[var(--ink)] text-[var(--paper)]'
            : 'text-[var(--muted)] hover:bg-black/5'
        "
        @click="switchTab(item.id)"
      >
        <span>{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </button>
    </div>
  </header>
</template>
