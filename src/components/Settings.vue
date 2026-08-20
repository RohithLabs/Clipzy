<script setup lang="ts">
import { langue, LANGUES, t } from '@/i18n'

/** Author links requested by user */
const SAROO_URL = 'https://saroo.online'
const THARANI_URL = 'https://tharaniresume.vercel.app'
const GITHUB = 'https://github.com/Saravanaofficialpmv/Tipsy-Animated-avatar'

/**
 * Keyboard navigation for language radiogroup
 */
function auClavier(event: KeyboardEvent, index: number) {
  const pas = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key]
  if (!pas) return
  event.preventDefault()
  const cible = LANGUES[(index + pas + LANGUES.length) % LANGUES.length]!
  langue.value = cible.id
  const boutons = (event.currentTarget as HTMLElement).parentElement?.children
  const suivant = boutons?.[LANGUES.indexOf(cible)]
  if (suivant instanceof HTMLElement) suivant.focus()
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <h2 class="text-sm font-semibold text-[var(--ink)]">{{ t('settings.language') }}</h2>
      <span class="text-[11px] text-[var(--muted)] font-medium">
        {{ LANGUES.length }} languages
      </span>
    </div>

    <!-- Language Selector Radiogroup -->
    <div class="mt-2 flex flex-col gap-1 max-h-[300px] overflow-y-auto pr-0.5 scrollbar-thin" role="radiogroup" :aria-label="t('settings.language')">
      <button
        v-for="(l, i) in LANGUES"
        :key="l.id"
        type="button"
        role="radio"
        :aria-checked="l.id === langue"
        :aria-label="l.nom"
        :lang="l.tag"
        :tabindex="l.id === langue ? 0 : -1"
        @keydown="auClavier($event, i)"
        class="flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2 text-left text-sm transition"
        :class="
          l.id === langue
            ? 'border-[var(--ink)] bg-white font-medium shadow-2xs'
            : 'border-[var(--line)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--ink)] hover:bg-black/[0.02]'
        "
        @click="langue = l.id"
      >
        <span class="text-base leading-none" aria-hidden="true">{{ l.emoji }}</span>
        <span class="flex-1">{{ l.nom }}</span>
        <svg
          v-if="l.id === langue"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          aria-hidden="true"
          class="shrink-0 text-[var(--ink)]"
        >
          <path
            d="M2.5 6.4 4.8 8.7 9.5 3.6"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <h2 class="mt-6 text-sm font-semibold text-[var(--ink)]">{{ t('settings.about') }}</h2>

    <a
      class="mt-2 flex items-center gap-2 rounded-xl border border-[var(--line)] px-3 py-2 text-sm transition hover:border-[var(--muted)] hover:bg-black/[0.02]"
      :href="GITHUB"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="t('settings.githubAria')"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" class="shrink-0">
        <path
          d="M8 .5a7.5 7.5 0 0 0-2.37 14.62c.37.07.5-.16.5-.36v-1.3c-2.09.46-2.53-.99-2.53-.99-.34-.87-.83-1.1-.83-1.1-.68-.47.05-.46.05-.46.75.06 1.15.78 1.15.78.67 1.15 1.76.82 2.19.63.07-.49.26-.83.48-1.02-1.67-.19-3.42-.83-3.42-3.72 0-.82.29-1.5.78-2.02-.08-.19-.34-.96.07-1.99 0 0 .63-.2 2.06.77a7.1 7.1 0 0 1 3.75 0c1.43-.97 2.06-.77 2.06-.77.41 1.03.15 1.8.07 1.99.49.52.78 1.2.78 2.02 0 2.9-1.76 3.53-3.44 3.71.27.23.51.69.51 1.39v2.06c0 .2.13.44.51.36A7.5 7.5 0 0 0 8 .5z"
          fill="currentColor"
        />
      </svg>
      <span class="flex-1 font-medium">{{ t('settings.github') }}</span>
      <svg
        width="11"
        height="11"
        viewBox="0 0 12 12"
        aria-hidden="true"
        class="shrink-0 text-[var(--muted)]"
      >
        <path
          d="M4 2h6v6M10 2 3 9"
          fill="none"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </a>

    <!-- Authors / Credits Section -->
    <div class="mt-4 pt-4 border-t border-[var(--line)]/60 text-xs text-[var(--muted)] space-y-2">
      <p class="flex items-center flex-wrap gap-1 leading-relaxed">
        <span>Made with ❤️ by</span>
        <a
          class="font-semibold text-[var(--ink)] underline decoration-[var(--line)] underline-offset-2 transition hover:decoration-[var(--ink)] hover:text-purple-600"
          :href="SAROO_URL"
          target="_blank"
          rel="noopener noreferrer"
        >Saroo</a>
        <span>&amp;</span>
        <a
          class="font-semibold text-[var(--ink)] underline decoration-[var(--line)] underline-offset-2 transition hover:decoration-[var(--ink)] hover:text-purple-600"
          :href="THARANI_URL"
          target="_blank"
          rel="noopener noreferrer"
        >Tharani</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}
</style>
