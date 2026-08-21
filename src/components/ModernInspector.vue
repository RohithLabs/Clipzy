<script setup lang="ts">
import { ref } from 'vue'
import { SHAPES } from '@/bot/skins'
import { EXPRESSIONS } from '@/bot/expressions'
import {
  EYEBROWS_STYLES,
  NOSE_STYLES,
  MOUTH_STYLES,
  type FeatureSize,
  type EyebrowsStyle,
  type NoseStyle,
  type CheeksStyle,
  type MouthStyle
} from '@/bot/face'
import {
  HATS,
  GLASSES,
  PROPS,
  AURAS,
  type HatId,
  type GlassesId,
  type PropId,
  type AuraId
} from '@/bot/accessories'
import { sfx } from '@/audio/sfx'

const props = defineProps<{
  color: string
  shape: string
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
  (e: 'update:color', val: string): void
  (e: 'update:shape', val: string): void
  (e: 'update:expression', val: string): void
  (e: 'update:featureSize', val: FeatureSize): void
  (e: 'update:eyebrows', val: EyebrowsStyle): void
  (e: 'update:nose', val: NoseStyle): void
  (e: 'update:cheeks', val: CheeksStyle): void
  (e: 'update:mouth', val: MouthStyle): void
  (e: 'update:hat', val: HatId): void
  (e: 'update:glasses', val: GlassesId): void
  (e: 'update:prop', val: PropId): void
  (e: 'update:aura', val: AuraId): void
}>()

const activeTab = ref<'color' | 'shape' | 'accessories' | 'face'>('color')

const PALETTE = [
  '#a855f7',
  '#06b6d4',
  '#f43f5e',
  '#10b981',
  '#f59e0b',
  '#3b82f6',
  '#ec4899',
  '#8b5cf6',
  '#14b8a6',
  '#f97316',
  '#6366f1',
  '#09090b'
]

function setColor(c: string) {
  emit('update:color', c)
  sfx.playPop()
}

function setShape(s: string) {
  emit('update:shape', s)
  sfx.playWhoosh()
}

function setExpression(exp: string) {
  emit('update:expression', exp)
  sfx.playPop()
}
</script>

<template>
  <div class="modern-inspector w-full lg:w-96 flex flex-col rounded-3xl border border-[var(--line)] bg-white/85 dark:bg-zinc-900/85 backdrop-blur-xl shadow-sm overflow-hidden text-[var(--ink)]">
    <!-- 1. Top Section Tabs -->
    <div class="flex items-center border-b border-[var(--line)] bg-black/5 dark:bg-white/5 p-1.5 gap-1">
      <button
        v-for="tab in [
          { id: 'color', label: 'Color', icon: '🎨' },
          { id: 'shape', label: 'Shapes', icon: '🔷' },
          { id: 'accessories', label: 'Gear', icon: '👑' },
          { id: 'face', label: 'Face', icon: '😊' }
        ] as const"
        :key="tab.id"
        type="button"
        class="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
        :class="
          activeTab === tab.id
            ? 'bg-white dark:bg-zinc-800 text-[var(--ink)] shadow-xs'
            : 'text-[var(--muted)] hover:text-[var(--ink)]'
        "
        @click="activeTab = tab.id; sfx.playPop()"
      >
        <span>{{ tab.icon }}</span>
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <!-- 2. Tab Contents Container -->
    <div class="p-4 sm:p-5 overflow-y-auto max-h-[calc(100vh-180px)] space-y-5 scrollbar-thin">
      <!-- TAB 1: Color & Skins -->
      <div v-if="activeTab === 'color'" class="space-y-4">
        <div class="space-y-2">
          <label class="text-xs font-bold text-[var(--ink)] flex items-center justify-between">
            <span>Color Palette</span>
            <span class="font-mono text-[11px] text-[var(--muted)]">{{ props.color }}</span>
          </label>
          <div class="grid grid-cols-6 gap-2">
            <button
              v-for="c in PALETTE"
              :key="c"
              type="button"
              class="h-9 rounded-xl border-2 transition-transform hover:scale-105 cursor-pointer shadow-2xs"
              :style="{ backgroundColor: c }"
              :class="props.color === c ? 'border-[var(--ink)] scale-110 shadow-md' : 'border-transparent'"
              @click="setColor(c)"
            />
          </div>
        </div>

        <div class="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-[var(--line)] flex items-center justify-between">
          <span class="text-xs font-bold">Custom HEX Color</span>
          <div class="flex items-center gap-2">
            <input
              type="color"
              :value="props.color"
              class="h-8 w-8 rounded-lg border border-[var(--line)] cursor-pointer bg-transparent"
              @input="emit('update:color', ($event.target as HTMLInputElement).value)"
            />
            <span class="text-xs font-mono font-semibold">{{ props.color }}</span>
          </div>
        </div>
      </div>

      <!-- TAB 2: 26 Morphing Shapes -->
      <div v-else-if="activeTab === 'shape'" class="space-y-3">
        <div class="flex items-center justify-between">
          <label class="text-xs font-bold">26 Morphing Shapes</label>
          <span class="text-[10px] font-semibold text-purple-600 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded-full capitalize">
            {{ props.shape }}
          </span>
        </div>

        <div class="grid grid-cols-2 gap-2 max-h-[460px] overflow-y-auto pr-1">
          <button
            v-for="sh in SHAPES"
            :key="sh.id"
            type="button"
            class="flex items-center gap-2 p-2.5 rounded-xl border text-left transition cursor-pointer"
            :class="
              props.shape === sh.id
                ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-bold shadow-2xs'
                : 'border-[var(--line)] text-[var(--muted)] hover:border-purple-300 hover:text-[var(--ink)]'
            "
            @click="setShape(sh.id)"
          >
            <span class="h-4 w-4 rounded-full bg-purple-500/20 flex items-center justify-center text-[10px]">
              🔷
            </span>
            <span class="text-xs capitalize truncate">{{ sh.id }}</span>
          </button>
        </div>
      </div>

      <!-- TAB 3: Accessories Suite -->
      <div v-else-if="activeTab === 'accessories'" class="space-y-5">
        <!-- Hats -->
        <div class="space-y-2">
          <label class="text-xs font-bold flex items-center justify-between">
            <span>Hats & Headwear</span>
            <span class="text-[10px] text-[var(--muted)] capitalize">{{ props.hat }}</span>
          </label>
          <div class="grid grid-cols-3 gap-1.5">
            <button
              v-for="h in HATS"
              :key="h.id"
              type="button"
              class="flex items-center gap-1.5 p-2 rounded-xl border text-xs font-semibold transition cursor-pointer"
              :class="
                props.hat === h.id
                  ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-600'
                  : 'border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)]'
              "
              @click="emit('update:hat', h.id); sfx.playPop()"
            >
              <span>{{ h.icon }}</span>
              <span class="truncate text-[11px]">{{ h.label }}</span>
            </button>
          </div>
        </div>

        <!-- Glasses -->
        <div class="space-y-2">
          <label class="text-xs font-bold flex items-center justify-between">
            <span>Glasses & Visors</span>
            <span class="text-[10px] text-[var(--muted)] capitalize">{{ props.glasses }}</span>
          </label>
          <div class="grid grid-cols-3 gap-1.5">
            <button
              v-for="g in GLASSES"
              :key="g.id"
              type="button"
              class="flex items-center gap-1.5 p-2 rounded-xl border text-xs font-semibold transition cursor-pointer"
              :class="
                props.glasses === g.id
                  ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-600'
                  : 'border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)]'
              "
              @click="emit('update:glasses', g.id); sfx.playPop()"
            >
              <span>{{ g.icon }}</span>
              <span class="truncate text-[11px]">{{ g.label }}</span>
            </button>
          </div>
        </div>

        <!-- Props -->
        <div class="space-y-2">
          <label class="text-xs font-bold flex items-center justify-between">
            <span>Props & Items</span>
            <span class="text-[10px] text-[var(--muted)] capitalize">{{ props.prop }}</span>
          </label>
          <div class="grid grid-cols-3 gap-1.5">
            <button
              v-for="p in PROPS"
              :key="p.id"
              type="button"
              class="flex items-center gap-1.5 p-2 rounded-xl border text-xs font-semibold transition cursor-pointer"
              :class="
                props.prop === p.id
                  ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-600'
                  : 'border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)]'
              "
              @click="emit('update:prop', p.id); sfx.playPop()"
            >
              <span>{{ p.icon }}</span>
              <span class="truncate text-[11px]">{{ p.label }}</span>
            </button>
          </div>
        </div>

        <!-- Aura Energy FX -->
        <div class="space-y-2">
          <label class="text-xs font-bold flex items-center justify-between">
            <span>Aura & Energy FX</span>
            <span class="text-[10px] text-[var(--muted)] capitalize">{{ props.aura }}</span>
          </label>
          <div class="grid grid-cols-3 gap-1.5">
            <button
              v-for="a in AURAS"
              :key="a.id"
              type="button"
              class="flex items-center gap-1.5 p-2 rounded-xl border text-xs font-semibold transition cursor-pointer"
              :class="
                props.aura === a.id
                  ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-600'
                  : 'border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)]'
              "
              @click="emit('update:aura', a.id); sfx.playPowerCharge()"
            >
              <span>{{ a.icon }}</span>
              <span class="truncate text-[11px]">{{ a.label }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- TAB 4: Facial Expressions & Traits -->
      <div v-else-if="activeTab === 'face'" class="space-y-5">
        <!-- Expressions -->
        <div class="space-y-2">
          <label class="text-xs font-bold">Expressions</label>
          <div class="grid grid-cols-3 gap-1.5">
            <button
              v-for="exp in EXPRESSIONS"
              :key="exp.id"
              type="button"
              class="p-2 rounded-xl border text-xs font-semibold transition cursor-pointer capitalize truncate"
              :class="
                props.expression === exp.id
                  ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-600'
                  : 'border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)]'
              "
              @click="setExpression(exp.id)"
            >
              {{ exp.id }}
            </button>
          </div>
        </div>

        <!-- Eyebrows -->
        <div class="space-y-2">
          <label class="text-xs font-bold">Eyebrows</label>
          <div class="grid grid-cols-4 gap-1.5">
            <button
              v-for="eb in EYEBROWS_STYLES"
              :key="eb"
              type="button"
              class="p-2 rounded-xl border text-xs font-semibold transition cursor-pointer capitalize"
              :class="
                props.eyebrows === eb
                  ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-600'
                  : 'border-[var(--line)] text-[var(--muted)]'
              "
              @click="emit('update:eyebrows', eb); sfx.playPop()"
            >
              {{ eb }}
            </button>
          </div>
        </div>

        <!-- Nose -->
        <div class="space-y-2">
          <label class="text-xs font-bold">Nose</label>
          <div class="grid grid-cols-4 gap-1.5">
            <button
              v-for="n in NOSE_STYLES"
              :key="n"
              type="button"
              class="p-2 rounded-xl border text-xs font-semibold transition cursor-pointer capitalize"
              :class="
                props.nose === n
                  ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-600'
                  : 'border-[var(--line)] text-[var(--muted)]'
              "
              @click="emit('update:nose', n); sfx.playPop()"
            >
              {{ n }}
            </button>
          </div>
        </div>

        <!-- Mouth -->
        <div class="space-y-2">
          <label class="text-xs font-bold">Mouth</label>
          <div class="grid grid-cols-3 gap-1.5">
            <button
              v-for="m in MOUTH_STYLES"
              :key="m"
              type="button"
              class="p-2 rounded-xl border text-xs font-semibold transition cursor-pointer capitalize"
              :class="
                props.mouth === m
                  ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-600'
                  : 'border-[var(--line)] text-[var(--muted)]'
              "
              @click="emit('update:mouth', m); sfx.playPop()"
            >
              {{ m }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
