<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import {
  DEFAULT_SAVED_COLORS,
  hexToRgb,
  hslToRgb,
  hsvToRgb,
  parseColor,
  rgbToHex,
  rgbToHsl,
  rgbToHsv
} from '@/ui/color-utils'
import { t } from '@/i18n'

const color = defineModel<string>({ required: true })

type ColorFormat = 'hex' | 'rgb' | 'hsl'
const format = ref<ColorFormat>('hex')

// États internes HSV (h: 0-360, s: 0-1, v: 0-1, a: 0-1)
const h = ref(243)
const s = ref(0.75)
const v = ref(0.9)
const a = ref(1)

const hexText = ref('4F46E5')
const alphaText = ref('100%')
const rgbR = ref(79)
const rgbG = ref(70)
const rgbB = ref(229)
const hslH = ref(243)
const hslS = ref(75)
const hslL = ref(59)

const svBox = ref<HTMLElement | null>(null)
const hueTrack = ref<HTMLElement | null>(null)
const alphaTrack = ref<HTMLElement | null>(null)

const isDraggingSv = ref(false)
const isDraggingHue = ref(false)
const isDraggingAlpha = ref(false)

// Couleurs enregistrées persistées
const SAVED_KEY = 'bloub:couleurs_sauvegardees'
const savedColors = ref<string[]>([...DEFAULT_SAVED_COLORS])

onMounted(() => {
  try {
    const raw = localStorage.getItem(SAVED_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        savedColors.value = parsed
      }
    }
  } catch {
    // Ignorer si localStorage n'est pas accessible
  }
})

function persistSavedColors() {
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(savedColors.value))
  } catch {
    // Ignorer si localStorage est plein ou bloqué
  }
}

// Couleurs dérivées
const currentRgb = computed(() => hsvToRgb(h.value, s.value, v.value, a.value))
const currentSolidHex = computed(() =>
  rgbToHex(currentRgb.value.r, currentRgb.value.g, currentRgb.value.b)
)
const currentHex = computed(() =>
  rgbToHex(currentRgb.value.r, currentRgb.value.g, currentRgb.value.b, a.value, a.value < 1)
)

function syncInputsFromHsv() {
  const rgb = currentRgb.value
  const hex = currentHex.value
  hexText.value = hex.replace('#', '')
  alphaText.value = `${Math.round(a.value * 100)}%`

  rgbR.value = rgb.r
  rgbG.value = rgb.g
  rgbB.value = rgb.b

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b, a.value)
  hslH.value = hsl.h
  hslS.value = hsl.s
  hslL.value = hsl.l
}

// Watcher externe pour synchroniser si la prop change (ex: preset sélectionné ailleurs)
watch(
  () => color.value,
  (newVal) => {
    if (!newVal) return
    const parsed = parseColor(newVal)
    const cur = currentRgb.value

    if (
      Math.abs(cur.r - parsed.rgb.r) > 1 ||
      Math.abs(cur.g - parsed.rgb.g) > 1 ||
      Math.abs(cur.b - parsed.rgb.b) > 1 ||
      Math.abs(a.value - parsed.rgb.a) > 0.01
    ) {
      h.value = parsed.hsv.h
      s.value = parsed.hsv.s
      v.value = parsed.hsv.v
      a.value = parsed.rgb.a
      syncInputsFromHsv()
    }
  },
  { immediate: true }
)

function emitChange() {
  syncInputsFromHsv()
  color.value = currentHex.value
}

// ------------------------------------------------------------- 2D SV Box Drag
function updateSv(e: PointerEvent) {
  const el = svBox.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
  const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height))
  s.value = rect.width > 0 ? x / rect.width : 0
  v.value = rect.height > 0 ? 1 - y / rect.height : 0
  emitChange()
}

function onSvPointerDown(e: PointerEvent) {
  const el = svBox.value
  if (!el) return
  el.setPointerCapture(e.pointerId)
  isDraggingSv.value = true
  updateSv(e)
}

function onSvPointerMove(e: PointerEvent) {
  if (!isDraggingSv.value) return
  updateSv(e)
}

function onSvPointerUp(e: PointerEvent) {
  if (!isDraggingSv.value) return
  isDraggingSv.value = false
  svBox.value?.releasePointerCapture(e.pointerId)
}

// ------------------------------------------------------------- Hue Slider Drag
function updateHue(e: PointerEvent) {
  const el = hueTrack.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
  h.value = rect.width > 0 ? (x / rect.width) * 360 : 0
  emitChange()
}

function onHuePointerDown(e: PointerEvent) {
  const el = hueTrack.value
  if (!el) return
  el.setPointerCapture(e.pointerId)
  isDraggingHue.value = true
  updateHue(e)
}

function onHuePointerMove(e: PointerEvent) {
  if (!isDraggingHue.value) return
  updateHue(e)
}

function onHuePointerUp(e: PointerEvent) {
  if (!isDraggingHue.value) return
  isDraggingHue.value = false
  hueTrack.value?.releasePointerCapture(e.pointerId)
}

// ----------------------------------------------------------- Alpha Slider Drag
function updateAlpha(e: PointerEvent) {
  const el = alphaTrack.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
  a.value = rect.width > 0 ? x / rect.width : 1
  emitChange()
}

function onAlphaPointerDown(e: PointerEvent) {
  const el = alphaTrack.value
  if (!el) return
  el.setPointerCapture(e.pointerId)
  isDraggingAlpha.value = true
  updateAlpha(e)
}

function onAlphaPointerMove(e: PointerEvent) {
  if (!isDraggingAlpha.value) return
  updateAlpha(e)
}

function onAlphaPointerUp(e: PointerEvent) {
  if (!isDraggingAlpha.value) return
  isDraggingAlpha.value = false
  alphaTrack.value?.releasePointerCapture(e.pointerId)
}

// ------------------------------------------------------------- Format & Inputs
function toggleFormat() {
  if (format.value === 'hex') format.value = 'rgb'
  else if (format.value === 'rgb') format.value = 'hsl'
  else format.value = 'hex'
}

function onHexInput() {
  const clean = hexText.value.trim().replace(/^#/, '')
  const rgb = hexToRgb(clean)
  if (rgb) {
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b, rgb.a)
    h.value = hsv.h
    s.value = hsv.s
    v.value = hsv.v
    a.value = rgb.a
    alphaText.value = `${Math.round(a.value * 100)}%`
    color.value = rgbToHex(rgb.r, rgb.g, rgb.b, rgb.a, rgb.a < 1)
  }
}

function onHexBlur() {
  hexText.value = currentHex.value.replace('#', '')
}

function onRgbInput() {
  const r = Math.min(255, Math.max(0, rgbR.value || 0))
  const g = Math.min(255, Math.max(0, rgbG.value || 0))
  const b = Math.min(255, Math.max(0, rgbB.value || 0))
  const hsv = rgbToHsv(r, g, b, a.value)
  h.value = hsv.h
  s.value = hsv.s
  v.value = hsv.v
  emitChange()
}

function onHslInput() {
  const hVal = Math.min(360, Math.max(0, hslH.value || 0))
  const sVal = Math.min(100, Math.max(0, hslS.value || 0))
  const lVal = Math.min(100, Math.max(0, hslL.value || 0))
  const rgb = hslToRgb(hVal, sVal, lVal, a.value)
  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b, a.value)
  h.value = hsv.h
  s.value = hsv.s
  v.value = hsv.v
  emitChange()
}

function onAlphaInput() {
  const clean = alphaText.value.replace('%', '').trim()
  const num = parseFloat(clean)
  if (!isNaN(num)) {
    a.value = Math.min(1, Math.max(0, num / 100))
    emitChange()
  }
}

function onAlphaBlur() {
  alphaText.value = `${Math.round(a.value * 100)}%`
}

// ---------------------------------------------------------------- Saved Colors
function isCurrent(swatchHex: string): boolean {
  const parsed = parseColor(swatchHex)
  const cur = currentRgb.value
  return (
    Math.abs(cur.r - parsed.rgb.r) <= 3 &&
    Math.abs(cur.g - parsed.rgb.g) <= 3 &&
    Math.abs(cur.b - parsed.rgb.b) <= 3
  )
}

function selectSavedColor(swatchHex: string) {
  const parsed = parseColor(swatchHex)
  h.value = parsed.hsv.h
  s.value = parsed.hsv.s
  v.value = parsed.hsv.v
  a.value = parsed.rgb.a
  emitChange()
}

function addSavedColor() {
  const hex = currentHex.value
  if (!savedColors.value.includes(hex)) {
    savedColors.value.push(hex)
    persistSavedColors()
  }
}

function removeSavedColor(index: number) {
  if (savedColors.value.length > 1) {
    savedColors.value.splice(index, 1)
    persistSavedColors()
  }
}
</script>

<template>
  <div
    class="w-full rounded-2xl border border-[var(--line)] bg-white p-3.5 shadow-md select-none"
    role="region"
    aria-label="Color Chooser"
  >
    <!-- Surface 2D de saturation et valeur -->
    <div
      ref="svBox"
      class="relative h-36 w-full cursor-crosshair overflow-hidden rounded-xl shadow-inner touch-none"
      :style="{ backgroundColor: `hsl(${h}, 100%, 50%)` }"
      @pointerdown="onSvPointerDown"
      @pointermove="onSvPointerMove"
      @pointerup="onSvPointerUp"
      @pointercancel="onSvPointerUp"
    >
      <!-- Dégradé horizontal blanc vers transparent -->
      <div
        class="pointer-events-none absolute inset-0"
        style="background: linear-gradient(to right, #ffffff, rgba(255, 255, 255, 0))"
      />
      <!-- Dégradé vertical noir vers transparent -->
      <div
        class="pointer-events-none absolute inset-0"
        style="background: linear-gradient(to top, #000000, rgba(0, 0, 0, 0))"
      />
      <!-- Pointeur circulaire -->
      <div
        class="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md transition-[transform] duration-75"
        :style="{
          left: `${s * 100}%`,
          top: `${(1 - v) * 100}%`,
          backgroundColor: currentSolidHex
        }"
      />
    </div>

    <!-- Curseur de teinte (Hue) -->
    <div
      ref="hueTrack"
      class="relative mt-3.5 h-3 w-full cursor-pointer rounded-full touch-none"
      style="
        background: linear-gradient(
          to right,
          #ff0000 0%,
          #ffff00 17%,
          #00ff00 33%,
          #00ffff 50%,
          #0000ff 67%,
          #ff00ff 83%,
          #ff0000 100%
        );
      "
      @pointerdown="onHuePointerDown"
      @pointermove="onHuePointerMove"
      @pointerup="onHuePointerUp"
      @pointercancel="onHuePointerUp"
    >
      <div
        class="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-white shadow-md"
        :style="{ left: `${(h / 360) * 100}%` }"
      />
    </div>

    <!-- Curseur d'opacité (Alpha) -->
    <div
      ref="alphaTrack"
      class="relative mt-2.5 h-3 w-full cursor-pointer rounded-full overflow-hidden touch-none"
      style="
        background-image: conic-gradient(
          #d1d5db 25%,
          #ffffff 25% 50%,
          #d1d5db 50% 75%,
          #ffffff 75% 100%
        );
        background-size: 8px 8px;
      "
      @pointerdown="onAlphaPointerDown"
      @pointermove="onAlphaPointerMove"
      @pointerup="onAlphaPointerUp"
      @pointercancel="onAlphaPointerUp"
    >
      <div
        class="pointer-events-none absolute inset-0 rounded-full"
        :style="{ background: `linear-gradient(to right, transparent, ${currentSolidHex})` }"
      />
      <div
        class="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md"
        :style="{ left: `${a * 100}%`, backgroundColor: currentHex }"
      />
    </div>

    <!-- Ligne de saisie de format et valeur -->
    <div class="mt-3.5 flex items-center gap-1.5">
      <!-- Sélecteur de format -->
      <button
        type="button"
        class="flex h-8 shrink-0 cursor-pointer items-center justify-between gap-1 rounded-lg border border-[var(--line)] bg-white px-2 text-xs font-medium text-[var(--ink)] shadow-2xs transition hover:border-[var(--muted)]"
        :aria-label="t(`colorChooser.${format}`)"
        @click="toggleFormat"
      >
        <span class="capitalize">{{ format }}</span>
        <svg
          class="h-3 w-3 text-slate-400"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M4 6l4-4 4 4M4 10l4 4 4-4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <!-- Champ Hex -->
      <div
        v-if="format === 'hex'"
        class="flex h-8 flex-1 items-center rounded-lg border border-[var(--line)] bg-white px-2 text-xs font-mono text-[var(--ink)] shadow-2xs focus-within:border-[var(--ink)] focus-within:ring-1 focus-within:ring-[var(--ink)]"
      >
        <span class="mr-1 text-slate-400 select-none">#</span>
        <input
          v-model="hexText"
          type="text"
          class="w-full bg-transparent font-mono text-xs uppercase outline-none"
          maxlength="8"
          spellcheck="false"
          @input="onHexInput"
          @blur="onHexBlur"
        />
      </div>

      <!-- Champs RGB -->
      <div v-else-if="format === 'rgb'" class="flex flex-1 gap-1">
        <input
          v-model.number="rgbR"
          type="number"
          min="0"
          max="255"
          placeholder="R"
          class="h-8 w-full rounded-lg border border-[var(--line)] bg-white px-1 text-center font-mono text-xs text-[var(--ink)] shadow-2xs outline-none focus:border-[var(--ink)]"
          @input="onRgbInput"
        />
        <input
          v-model.number="rgbG"
          type="number"
          min="0"
          max="255"
          placeholder="G"
          class="h-8 w-full rounded-lg border border-[var(--line)] bg-white px-1 text-center font-mono text-xs text-[var(--ink)] shadow-2xs outline-none focus:border-[var(--ink)]"
          @input="onRgbInput"
        />
        <input
          v-model.number="rgbB"
          type="number"
          min="0"
          max="255"
          placeholder="B"
          class="h-8 w-full rounded-lg border border-[var(--line)] bg-white px-1 text-center font-mono text-xs text-[var(--ink)] shadow-2xs outline-none focus:border-[var(--ink)]"
          @input="onRgbInput"
        />
      </div>

      <!-- Champs HSL -->
      <div v-else class="flex flex-1 gap-1">
        <input
          v-model.number="hslH"
          type="number"
          min="0"
          max="360"
          placeholder="H"
          class="h-8 w-full rounded-lg border border-[var(--line)] bg-white px-1 text-center font-mono text-xs text-[var(--ink)] shadow-2xs outline-none focus:border-[var(--ink)]"
          @input="onHslInput"
        />
        <input
          v-model.number="hslS"
          type="number"
          min="0"
          max="100"
          placeholder="S"
          class="h-8 w-full rounded-lg border border-[var(--line)] bg-white px-1 text-center font-mono text-xs text-[var(--ink)] shadow-2xs outline-none focus:border-[var(--ink)]"
          @input="onHslInput"
        />
        <input
          v-model.number="hslL"
          type="number"
          min="0"
          max="100"
          placeholder="L"
          class="h-8 w-full rounded-lg border border-[var(--line)] bg-white px-1 text-center font-mono text-xs text-[var(--ink)] shadow-2xs outline-none focus:border-[var(--ink)]"
          @input="onHslInput"
        />
      </div>

      <!-- Champ Pourcentage d'Opacité -->
      <input
        v-model="alphaText"
        type="text"
        class="h-8 w-14 shrink-0 rounded-lg border border-[var(--line)] bg-white px-1 text-center font-mono text-xs text-[var(--ink)] shadow-2xs outline-none focus:border-[var(--ink)] focus:ring-1 focus:ring-[var(--ink)]"
        :aria-label="t('colorChooser.opacity')"
        @input="onAlphaInput"
        @blur="onAlphaBlur"
      />
    </div>

    <!-- Section Couleurs enregistrées -->
    <div class="mt-4 flex items-center justify-between text-xs font-medium text-[var(--ink)]">
      <span>{{ t('colorChooser.savedColors') }}</span>
      <button
        type="button"
        class="cursor-pointer text-xs font-medium text-[var(--muted)] transition hover:text-[var(--ink)]"
        @click="addSavedColor"
      >
        + {{ t('colorChooser.add') }}
      </button>
    </div>

    <!-- Grille de pastilles de couleurs -->
    <div class="mt-2.5 grid grid-cols-7 gap-2">
      <button
        v-for="(c, idx) in savedColors"
        :key="`${c}-${idx}`"
        type="button"
        class="group relative flex aspect-square cursor-pointer items-center justify-center rounded-full transition transform hover:scale-110 active:scale-95"
        :class="isCurrent(c) ? 'ring-2 ring-slate-400 ring-offset-2' : ''"
        :title="c"
        @click="selectSavedColor(c)"
        @contextmenu.prevent="removeSavedColor(idx)"
      >
        <span
          class="block h-full w-full rounded-full ring-1 ring-black/10 ring-inset"
          :style="{ background: c }"
        />
      </button>
    </div>
  </div>
</template>
