<script setup lang="ts">
import BloubBot from '@/components/BloubBot.vue'
import { DEFAULT_EXPRESSION } from '@/bot/expressions'
import {
  DEFAULT_FEATURE_SIZE,
  DEFAULT_EYEBROWS,
  DEFAULT_NOSE,
  DEFAULT_CHEEKS,
  DEFAULT_MOUTH,
  type FeatureSize,
  type EyebrowsStyle,
  type NoseStyle,
  type CheeksStyle,
  type MouthStyle
} from '@/bot/face'
import { DEFAULT_COLOR, DEFAULT_SHAPE } from '@/bot/skins'
import type { StateId } from '@/bot/states'

/**
 * Vignette cliquable de la barre de droite : un bot fige, son nom dessous, une
 * bordure quand elle est retenue. Sert aux formes, aux expressions et aux
 * animations — les trois grilles doivent rester identiques a l'oeil, d'ou le
 * composant partage plutot que la meme chaine de classes recopiee.
 *
 * `frozenAt` est obligatoire : une vignette animee ferait tourner autant de
 * boucles rAF qu'il y a de cases.
 */
withDefaults(
  defineProps<{
    label: string
    selected: boolean
    frozenAt: number
    state?: StateId
    shape?: string
    color?: string
    expression?: string
    featureSize?: FeatureSize
    eyebrows?: EyebrowsStyle
    nose?: NoseStyle
    cheeks?: CheeksStyle
    mouth?: MouthStyle
    size?: number
  }>(),
  {
    state: 'idle',
    shape: DEFAULT_SHAPE,
    color: DEFAULT_COLOR,
    expression: DEFAULT_EXPRESSION,
    featureSize: DEFAULT_FEATURE_SIZE,
    eyebrows: DEFAULT_EYEBROWS,
    nose: DEFAULT_NOSE,
    cheeks: DEFAULT_CHEEKS,
    mouth: DEFAULT_MOUTH,
    size: 60
  }
)
</script>

<template>
  <button
    type="button"
    class="flex cursor-pointer flex-col items-center rounded-xl border-2 p-1 transition"
    :class="selected ? 'border-[var(--ink)]' : 'border-transparent hover:border-[var(--line)]'"
    :aria-label="label"
    :aria-pressed="selected"
  >
    <BloubBot
      :state="state"
      :size="size"
      :shape="shape"
      :color="color"
      :expression="expression"
      :feature-size="featureSize"
      :eyebrows="eyebrows"
      :nose="nose"
      :cheeks="cheeks"
      :mouth="mouth"
      :frozen-at="frozenAt"
    />
    <!-- 12 px : en dessous, une legende n'est plus lisible pour tout le monde -->
    <span class="text-center text-xs leading-tight text-[var(--muted)]">{{ label }}</span>
  </button>
</template>
