<script setup lang="ts">
import BotTile from '@/components/BotTile.vue'
import ColorChooser from '@/components/ColorChooser.vue'
import { EXPRESSIONS } from '@/bot/expressions'
import {
  DEFAULT_FEATURE_SIZE,
  DEFAULT_EYEBROWS,
  DEFAULT_NOSE,
  DEFAULT_CHEEKS,
  DEFAULT_MOUTH,
  FEATURE_SIZES,
  EYEBROWS_STYLES,
  NOSE_STYLES,
  CHEEKS_STYLES,
  MOUTH_STYLES,
  type FeatureSize,
  type EyebrowsStyle,
  type NoseStyle,
  type CheeksStyle,
  type MouthStyle
} from '@/bot/face'
import { SHAPES } from '@/bot/skins'
import { HATS, GLASSES, PROPS, AURAS, type HatId, type GlassesId, type PropId, type AuraId } from '@/bot/accessories'
import { t } from '@/i18n'

const shape = defineModel<string>('shape', { required: true })
const color = defineModel<string>('color', { required: true })
const expression = defineModel<string>('expression', { required: true })
const featureSize = defineModel<FeatureSize>('featureSize', { default: DEFAULT_FEATURE_SIZE })
const eyebrows = defineModel<EyebrowsStyle>('eyebrows', { default: DEFAULT_EYEBROWS })
const nose = defineModel<NoseStyle>('nose', { default: DEFAULT_NOSE })
const cheeks = defineModel<CheeksStyle>('cheeks', { default: DEFAULT_CHEEKS })
const mouth = defineModel<MouthStyle>('mouth', { default: DEFAULT_MOUTH })
const hat = defineModel<HatId>('hat', { default: 'none' })
const glasses = defineModel<GlassesId>('glasses', { default: 'none' })
const prop = defineModel<PropId>('prop', { default: 'none' })
const aura = defineModel<AuraId>('aura', { default: 'none' })

/**
 * Les vignettes sont figees a la meme date que la pose de repos : elles montrent
 * la forme et le visage tels qu'ils apparaitront, pas un aplat abstrait.
 */
const PREVIEW_AT = 1

/** Proportions pour l'aperçu miniature des yeux dans le sélecteur de taille */
const EYE_PREVIEW = {
  small: { w: 4, h: 9 },
  medium: { w: 5.5, h: 13 },
  large: { w: 7.5, h: 17 }
} as const
</script>

<template>
  <div class="customizer-card p-4 sm:p-5 rounded-3xl border border-[var(--line)] bg-white/85 dark:bg-zinc-900/85 backdrop-blur-xl shadow-xs mb-12">
    <h2 class="text-sm font-semibold">{{ t('panel.shape') }}</h2>
    <div class="mt-2 grid grid-cols-4 gap-1.5">
      <BotTile
        v-for="s in SHAPES"
        :key="s.id"
        :label="t(`shapes.${s.id}`)"
        :selected="s.id === shape"
        :shape="s.id"
        :color="color"
        :expression="expression"
        :feature-size="featureSize"
        :eyebrows="eyebrows"
        :nose="nose"
        :cheeks="cheeks"
        :mouth="mouth"
        :frozen-at="PREVIEW_AT"
        @click="shape = s.id"
      />
    </div>

    <!-- Taille des traits / yeux (small / medium / large) -->
    <h2 class="mt-5 text-sm font-semibold">{{ t('panel.featureSize') }}</h2>
    <div
      class="mt-2 grid grid-cols-3 gap-2"
      role="radiogroup"
      :aria-label="t('panel.featureSize')"
    >
      <button
        v-for="s in FEATURE_SIZES"
        :key="s"
        type="button"
        role="radio"
        :aria-checked="s === featureSize"
        :aria-label="t(`featureSize.${s}`)"
        class="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border px-2 py-2 text-xs transition"
        :class="
          s === featureSize
            ? 'border-[var(--ink)] bg-white font-semibold text-[var(--ink)] shadow-2xs'
            : 'border-[var(--line)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--ink)]'
        "
        @click="featureSize = s"
      >
        <!-- Mini aperçu visuel des yeux -->
        <div class="flex h-5 items-center justify-center gap-1">
          <span
            class="rounded-full bg-current transition-all"
            :style="{ width: `${EYE_PREVIEW[s].w}px`, height: `${EYE_PREVIEW[s].h}px` }"
          />
          <span
            class="rounded-full bg-current transition-all"
            :style="{ width: `${EYE_PREVIEW[s].w}px`, height: `${EYE_PREVIEW[s].h}px` }"
          />
        </div>
        <span>{{ t(`featureSize.${s}`) }}</span>
      </button>
    </div>

    <!-- Sourcils (Eyebrows) -->
    <h2 class="mt-5 text-sm font-semibold">{{ t('panel.eyebrows') }}</h2>
    <div class="mt-2 grid grid-cols-4 gap-1.5" role="radiogroup" :aria-label="t('panel.eyebrows')">
      <button
        v-for="b in EYEBROWS_STYLES"
        :key="b"
        type="button"
        role="radio"
        :aria-checked="b === eyebrows"
        :aria-label="t(`eyebrows.${b}`)"
        class="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border p-1.5 text-xs transition"
        :class="
          b === eyebrows
            ? 'border-[var(--ink)] bg-white font-semibold text-[var(--ink)] shadow-2xs'
            : 'border-[var(--line)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--ink)]'
        "
        @click="eyebrows = b"
      >
        <div class="flex h-5 items-center justify-center">
          <!-- None -->
          <svg v-if="b === 'none'" viewBox="0 0 20 20" class="h-4 w-4 text-[var(--muted)]" aria-hidden="true">
            <circle cx="10" cy="10" r="6" stroke="currentColor" stroke-width="1.5" fill="none" />
            <line x1="6" y1="14" x2="14" y2="6" stroke="currentColor" stroke-width="1.5" />
          </svg>
          <!-- Arched -->
          <svg v-else-if="b === 'arched'" viewBox="0 0 24 14" class="h-3.5 w-6" aria-hidden="true">
            <path d="M2 10 Q6 3 10 9 M14 9 Q18 3 22 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" />
          </svg>
          <!-- Straight -->
          <svg v-else-if="b === 'straight'" viewBox="0 0 24 14" class="h-3.5 w-6" aria-hidden="true">
            <line x1="2" y1="7" x2="10" y2="7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
            <line x1="14" y1="7" x2="22" y2="7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
          </svg>
          <!-- Dots -->
          <svg v-else-if="b === 'dots'" viewBox="0 0 24 14" class="h-3.5 w-6" aria-hidden="true">
            <circle cx="6" cy="7" r="2.5" fill="currentColor" />
            <circle cx="18" cy="7" r="2.5" fill="currentColor" />
          </svg>
        </div>
        <span class="text-[11px] leading-tight">{{ t(`eyebrows.${b}`) }}</span>
      </button>
    </div>

    <!-- Nez (Nose) -->
    <h2 class="mt-5 text-sm font-semibold">{{ t('panel.nose') }}</h2>
    <div class="mt-2 grid grid-cols-4 gap-1.5" role="radiogroup" :aria-label="t('panel.nose')">
      <button
        v-for="n in NOSE_STYLES"
        :key="n"
        type="button"
        role="radio"
        :aria-checked="n === nose"
        :aria-label="t(`nose.${n}`)"
        class="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border p-1.5 text-xs transition"
        :class="
          n === nose
            ? 'border-[var(--ink)] bg-white font-semibold text-[var(--ink)] shadow-2xs'
            : 'border-[var(--line)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--ink)]'
        "
        @click="nose = n"
      >
        <div class="flex h-5 items-center justify-center">
          <!-- None -->
          <svg v-if="n === 'none'" viewBox="0 0 20 20" class="h-4 w-4 text-[var(--muted)]" aria-hidden="true">
            <circle cx="10" cy="10" r="6" stroke="currentColor" stroke-width="1.5" fill="none" />
            <line x1="6" y1="14" x2="14" y2="6" stroke="currentColor" stroke-width="1.5" />
          </svg>
          <!-- Dot -->
          <svg v-else-if="n === 'dot'" viewBox="0 0 20 14" class="h-3.5 w-5" aria-hidden="true">
            <circle cx="10" cy="7" r="2.5" fill="currentColor" />
          </svg>
          <!-- Pill -->
          <svg v-else-if="n === 'pill'" viewBox="0 0 20 14" class="h-3.5 w-5" aria-hidden="true">
            <rect x="8.5" y="3" width="3" height="8" rx="1.5" fill="currentColor" />
          </svg>
          <!-- Snout -->
          <svg v-else-if="n === 'snout'" viewBox="0 0 20 14" class="h-3.5 w-5" aria-hidden="true">
            <path d="M7 5 Q10 4 13 5 Q10 10 7 5 Z" fill="currentColor" />
          </svg>
        </div>
        <span class="text-[11px] leading-tight">{{ t(`nose.${n}`) }}</span>
      </button>
    </div>

    <!-- Joues / Blush (Cheeks) -->
    <h2 class="mt-5 text-sm font-semibold">{{ t('panel.cheeks') }}</h2>
    <div class="mt-2 grid grid-cols-4 gap-1.5" role="radiogroup" :aria-label="t('panel.cheeks')">
      <button
        v-for="c in CHEEKS_STYLES"
        :key="c"
        type="button"
        role="radio"
        :aria-checked="c === cheeks"
        :aria-label="t(`cheeks.${c}`)"
        class="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border p-1.5 text-xs transition"
        :class="
          c === cheeks
            ? 'border-[var(--ink)] bg-white font-semibold text-[var(--ink)] shadow-2xs'
            : 'border-[var(--line)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--ink)]'
        "
        @click="cheeks = c"
      >
        <div class="flex h-5 items-center justify-center">
          <!-- None -->
          <svg v-if="c === 'none'" viewBox="0 0 20 20" class="h-4 w-4 text-[var(--muted)]" aria-hidden="true">
            <circle cx="10" cy="10" r="6" stroke="currentColor" stroke-width="1.5" fill="none" />
            <line x1="6" y1="14" x2="14" y2="6" stroke="currentColor" stroke-width="1.5" />
          </svg>
          <!-- Blush -->
          <svg v-else-if="c === 'blush'" viewBox="0 0 24 14" class="h-3.5 w-6" aria-hidden="true">
            <rect x="2" y="4" width="8" height="5" rx="2.5" fill="#ff6b8b" opacity="0.85" />
            <rect x="14" y="4" width="8" height="5" rx="2.5" fill="#ff6b8b" opacity="0.85" />
          </svg>
          <!-- Dots -->
          <svg v-else-if="c === 'dots'" viewBox="0 0 24 14" class="h-3.5 w-6" aria-hidden="true">
            <circle cx="6" cy="7" r="3" fill="#ff6b8b" opacity="0.85" />
            <circle cx="18" cy="7" r="3" fill="#ff6b8b" opacity="0.85" />
          </svg>
          <!-- Lines -->
          <svg v-else-if="c === 'lines'" viewBox="0 0 24 14" class="h-3.5 w-6" aria-hidden="true">
            <line x1="3" y1="10" x2="6" y2="4" stroke="#ff6b8b" stroke-width="1.5" stroke-linecap="round" />
            <line x1="7" y1="10" x2="10" y2="4" stroke="#ff6b8b" stroke-width="1.5" stroke-linecap="round" />
            <line x1="14" y1="10" x2="17" y2="4" stroke="#ff6b8b" stroke-width="1.5" stroke-linecap="round" />
            <line x1="18" y1="10" x2="21" y2="4" stroke="#ff6b8b" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </div>
        <span class="text-[11px] leading-tight">{{ t(`cheeks.${c}`) }}</span>
      </button>
    </div>

    <!-- Bouche (Mouth) -->
    <h2 class="mt-5 text-sm font-semibold">{{ t('panel.mouth') }}</h2>
    <div class="mt-2 grid grid-cols-4 gap-1.5" role="radiogroup" :aria-label="t('panel.mouth')">
      <button
        v-for="m in MOUTH_STYLES"
        :key="m"
        type="button"
        role="radio"
        :aria-checked="m === mouth"
        :aria-label="t(`mouth.${m}`)"
        class="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border p-1.5 text-xs transition"
        :class="
          m === mouth
            ? 'border-[var(--ink)] bg-white font-semibold text-[var(--ink)] shadow-2xs'
            : 'border-[var(--line)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--ink)]'
        "
        @click="mouth = m"
      >
        <div class="flex h-5 items-center justify-center">
          <!-- None -->
          <svg v-if="m === 'none'" viewBox="0 0 20 20" class="h-4 w-4 text-[var(--muted)]" aria-hidden="true">
            <circle cx="10" cy="10" r="6" stroke="currentColor" stroke-width="1.5" fill="none" />
            <line x1="6" y1="14" x2="14" y2="6" stroke="currentColor" stroke-width="1.5" />
          </svg>
          <!-- Smile -->
          <svg v-else-if="m === 'smile'" viewBox="0 0 24 14" class="h-3.5 w-6" aria-hidden="true">
            <path d="M4 4 Q12 12 20 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" />
          </svg>
          <!-- Grin -->
          <svg v-else-if="m === 'grin'" viewBox="0 0 24 14" class="h-3.5 w-6" aria-hidden="true">
            <path d="M4 3 L20 3 Q12 13 4 3 Z" fill="currentColor" />
          </svg>
          <!-- Frown -->
          <svg v-else-if="m === 'frown'" viewBox="0 0 24 14" class="h-3.5 w-6" aria-hidden="true">
            <path d="M4 10 Q12 2 20 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" />
          </svg>
          <!-- Open -->
          <svg v-else-if="m === 'open'" viewBox="0 0 20 14" class="h-3.5 w-5" aria-hidden="true">
            <ellipse cx="10" cy="7" rx="3.5" ry="4.5" fill="currentColor" />
          </svg>
          <!-- Cat -->
          <svg v-else-if="m === 'cat'" viewBox="0 0 24 14" class="h-3.5 w-6" aria-hidden="true">
            <path d="M4 5 Q8 11 12 7 Q16 11 20 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" />
          </svg>
          <!-- Straight -->
          <svg v-else-if="m === 'straight'" viewBox="0 0 24 14" class="h-3.5 w-6" aria-hidden="true">
            <line x1="5" y1="7" x2="19" y2="7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
          </svg>
        </div>
        <span class="text-[11px] leading-tight">{{ t(`mouth.${m}`) }}</span>
      </button>
    </div>

    <!-- Expression -->
    <h2 class="mt-5 text-sm font-semibold">{{ t('panel.expression') }}</h2>
    <div class="mt-2 grid grid-cols-4 gap-1.5">
      <BotTile
        v-for="e in EXPRESSIONS"
        :key="e.id"
        :label="t(`expressions.${e.id}`)"
        :selected="e.id === expression"
        :shape="shape"
        :color="color"
        :expression="e.id"
        :feature-size="featureSize"
        :eyebrows="eyebrows"
        :nose="nose"
        :cheeks="cheeks"
        :mouth="mouth"
        :frozen-at="PREVIEW_AT"
        @click="expression = e.id"
      />
    </div>

    <!-- Chapeaux (Hats) -->
    <h2 class="mt-5 text-sm font-semibold flex items-center gap-1.5">
      <span>👑</span> {{ t('panel.hats') || 'Hats & Headwear' }}
    </h2>
    <div class="mt-2 grid grid-cols-3 gap-2" role="radiogroup">
      <button
        v-for="h in HATS"
        :key="h.id"
        type="button"
        class="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border p-2 text-xs transition min-h-[58px]"
        :class="
          hat === h.id
            ? 'border-[var(--ink)] bg-white font-semibold text-[var(--ink)] shadow-2xs dark:bg-zinc-800'
            : 'border-[var(--line)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--ink)]'
        "
        @click="hat = h.id"
      >
        <span class="text-lg">{{ h.icon }}</span>
        <span class="text-[10px] text-center leading-tight">{{ h.label }}</span>
      </button>
    </div>

    <!-- Lunettes (Glasses) -->
    <h2 class="mt-5 text-sm font-semibold flex items-center gap-1.5">
      <span>🕶️</span> {{ t('panel.glasses') || 'Glasses & Shades' }}
    </h2>
    <div class="mt-2 grid grid-cols-3 gap-2" role="radiogroup">
      <button
        v-for="g in GLASSES"
        :key="g.id"
        type="button"
        class="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border p-2 text-xs transition min-h-[58px]"
        :class="
          glasses === g.id
            ? 'border-[var(--ink)] bg-white font-semibold text-[var(--ink)] shadow-2xs dark:bg-zinc-800'
            : 'border-[var(--line)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--ink)]'
        "
        @click="glasses = g.id"
      >
        <span class="text-lg">{{ g.icon }}</span>
        <span class="text-[10px] text-center leading-tight">{{ g.label }}</span>
      </button>
    </div>

    <!-- Accessoires / Props -->
    <h2 class="mt-5 text-sm font-semibold flex items-center gap-1.5">
      <span>🎮</span> {{ t('panel.props') || 'Props & Items' }}
    </h2>
    <div class="mt-2 grid grid-cols-3 gap-2" role="radiogroup">
      <button
        v-for="p in PROPS"
        :key="p.id"
        type="button"
        class="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border p-2 text-xs transition min-h-[58px]"
        :class="
          prop === p.id
            ? 'border-[var(--ink)] bg-white font-semibold text-[var(--ink)] shadow-2xs dark:bg-zinc-800'
            : 'border-[var(--line)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--ink)]'
        "
        @click="prop = p.id"
      >
        <span class="text-lg">{{ p.icon }}</span>
        <span class="text-[10px] text-center leading-tight">{{ p.label }}</span>
      </button>
    </div>

    <!-- Aura FX -->
    <h2 class="mt-5 text-sm font-semibold flex items-center gap-1.5">
      <span>✨</span> {{ t('panel.auras') || 'Aura & Energy FX' }}
    </h2>
    <div class="mt-2 grid grid-cols-3 gap-2" role="radiogroup">
      <button
        v-for="a in AURAS"
        :key="a.id"
        type="button"
        class="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border p-2 text-xs transition min-h-[58px]"
        :class="
          aura === a.id
            ? 'border-[var(--ink)] bg-white font-semibold text-[var(--ink)] shadow-2xs dark:bg-zinc-800'
            : 'border-[var(--line)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--ink)]'
        "
        @click="aura = a.id"
      >
        <span class="text-lg">{{ a.icon }}</span>
        <span class="text-[10px] text-center leading-tight">{{ a.label }}</span>
      </button>
    </div>

    <!-- Couleur -->
    <h2 class="mt-5 text-sm font-semibold">{{ t('panel.color') }}</h2>
    <div class="mt-2">
      <ColorChooser v-model="color" />
    </div>
  </div>
</template>
