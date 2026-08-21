<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ClipzyInteractiveBot from './ClipzyInteractiveBot.vue'
import { voiceEngine } from '@/audio/voice'
import type { MouthStyle } from '@/bot/face'
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

const isMicActive = ref(false)
const isSpeaking = ref(false)
const currentMouth = ref<MouthStyle>('smile')
const currentVolume = ref(0)
const textInput = ref('Hey everyone! Welcome to the brand new Clipzy Studio!')

const QUICK_PHRASES = [
  'Hey everyone! Welcome to the brand new Clipzy Studio!',
  'Look at my new 3D animations and viral combos!',
  'Don’t forget to like and follow for more awesome clips!',
  'Cyberpunk overdrive mode activated!',
  'Drop the beat and dance with me!'
]

async function toggleMicrophone() {
  if (isMicActive.value) {
    voiceEngine.stopMicrophone()
    isMicActive.value = false
    sfx.playPop()
  } else {
    const ok = await voiceEngine.startMicrophone()
    if (ok) {
      isMicActive.value = true
      sfx.playPowerCharge()
    }
  }
}

function handleSpeak() {
  if (!textInput.value.trim() || isSpeaking.value) return
  isSpeaking.value = true
  sfx.playChime()

  voiceEngine.speakText(textInput.value, () => {
    isSpeaking.value = false
  })
}

function selectPhrase(phrase: string) {
  textInput.value = phrase
  sfx.playPop()
}

onMounted(() => {
  voiceEngine.setMouthCallback((mouth, vol) => {
    currentMouth.value = mouth
    currentVolume.value = vol
  })
})

onBeforeUnmount(() => {
  voiceEngine.stopMicrophone()
})
</script>

<template>
  <div class="voice-bot-studio w-full max-w-6xl mx-auto p-4 sm:p-6 space-y-6 text-[var(--ink)]">
    <!-- Header -->
    <div class="flex items-center justify-between pb-4 border-b border-[var(--line)]">
      <div class="flex items-center gap-3">
        <span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 text-white shadow-sm">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="22" />
          </svg>
        </span>
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Live Voice & Audio Lipsync Studio</h1>
          <p class="text-xs text-[var(--muted)]">
            Microphone audio frequency analyzer & text-to-speech engine with synchronized avatar mouth animation.
          </p>
        </div>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Controls (Span 7) -->
      <div class="lg:col-span-7 space-y-5">
        <!-- 1. Microphone Live Section -->
        <div class="p-5 rounded-2xl border border-[var(--line)] bg-white/80 backdrop-blur shadow-sm space-y-4 dark:bg-zinc-900/60">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-base">🎙️</span>
              <h2 class="text-sm font-bold">Real-Time Microphone Reactive Lip-Sync</h2>
            </div>
            <span
              class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
              :class="isMicActive ? 'bg-red-500/10 text-red-600 border border-red-500/20 animate-pulse' : 'bg-black/5 text-[var(--muted)]'"
            >
              {{ isMicActive ? 'Live Mic Active' : 'Mic Inactive' }}
            </span>
          </div>

          <p class="text-xs text-[var(--muted)]">
            Speak into your microphone to watch Clipzy open its mouth and react in real-time to your voice volume and pitch.
          </p>

          <div class="flex items-center gap-4">
            <button
              type="button"
              class="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm transition cursor-pointer"
              :class="
                isMicActive
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-[var(--ink)] text-[var(--paper)] hover:opacity-90'
              "
              @click="toggleMicrophone"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="22" />
              </svg>
              <span>{{ isMicActive ? 'Stop Microphone' : 'Start Microphone Lip-Sync' }}</span>
            </button>

            <!-- VU Meter -->
            <div class="flex-1 h-3 rounded-full bg-black/10 overflow-hidden relative">
              <div
                class="h-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 transition-all duration-75"
                :style="{ width: `${currentVolume * 100}%` }"
              />
            </div>
          </div>
        </div>

        <!-- 2. Text-to-Speech Voice Synthesizer -->
        <div class="p-5 rounded-2xl border border-[var(--line)] bg-white/80 backdrop-blur shadow-sm space-y-4 dark:bg-zinc-900/60">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-base">🗣️</span>
              <h2 class="text-sm font-bold">Text-to-Speech Avatar Voice</h2>
            </div>
            <span class="text-[10px] font-mono text-[var(--muted)]">Web Speech API</span>
          </div>

          <div class="space-y-2">
            <textarea
              v-model="textInput"
              rows="3"
              class="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3 text-xs text-[var(--ink)] focus:border-rose-500 focus:outline-none resize-none font-medium"
              placeholder="Type anything for Clipzy to say..."
            />

            <!-- Preset Quick Phrases -->
            <div class="flex flex-wrap gap-1.5 pt-1">
              <button
                v-for="(phrase, i) in QUICK_PHRASES"
                :key="i"
                type="button"
                class="px-2.5 py-1 rounded-lg border border-[var(--line)] bg-black/5 text-[11px] text-[var(--muted)] hover:text-[var(--ink)] hover:border-rose-300 transition cursor-pointer truncate max-w-[280px]"
                @click="selectPhrase(phrase)"
              >
                {{ phrase }}
              </button>
            </div>
          </div>

          <button
            type="button"
            class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xs shadow-md transition hover:opacity-95 active:scale-[0.99] cursor-pointer"
            :disabled="isSpeaking"
            @click="handleSpeak"
          >
            <span v-if="isSpeaking" class="h-2 w-2 rounded-full bg-white animate-ping" />
            <span>{{ isSpeaking ? 'Clipzy is Speaking...' : 'Speak with Animated Lipsync 📢' }}</span>
          </button>
        </div>
      </div>

      <!-- Live Reactive Bot Preview (Span 5) -->
      <div class="lg:col-span-5 flex flex-col items-center justify-center min-h-[460px] p-6 rounded-3xl border border-[var(--line)] bg-gradient-to-b from-neutral-50 to-rose-50/20 backdrop-blur shadow-sm space-y-4 dark:bg-zinc-900/50">
        <div class="relative flex items-center justify-center">
          <ClipzyInteractiveBot
            :size="300"
            :color="props.avatarColor || '#a855f7'"
            :shape="props.avatarShape || 'cercle'"
            :mouth="currentMouth"
            :hat="props.avatarHat || 'none'"
            :glasses="props.avatarGlasses || 'none'"
            :prop="props.avatarProp || 'none'"
            :aura="props.avatarAura || 'none'"
            :play-sounds="false"
            idle-animation="float"
          />
        </div>

        <div class="flex items-center gap-2 text-xs">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[var(--line)] text-[11px] font-semibold text-[var(--ink)] shadow-2xs">
            Mouth Shape: <strong class="capitalize font-mono">{{ currentMouth }}</strong>
          </span>
          <span
            v-if="currentVolume > 0"
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold shadow-2xs"
          >
            Volume: {{ Math.round(currentVolume * 100) }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
