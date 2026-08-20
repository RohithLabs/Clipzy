<script setup lang="ts">
import BotTile from '@/components/BotTile.vue'
import { POSES, SEQUENCE, STATE_BY_ID, type StateId } from '@/bot/states'
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
import { t } from '@/i18n'

const props = withDefaults(
  defineProps<{
    shape?: string
    color?: string
    expression?: string
    featureSize?: FeatureSize
    eyebrows?: EyebrowsStyle
    nose?: NoseStyle
    cheeks?: CheeksStyle
    mouth?: MouthStyle
    currentState?: string
  }>(),
  {
    shape: 'cercle',
    color: 'encre',
    expression: 'neutre',
    featureSize: DEFAULT_FEATURE_SIZE,
    eyebrows: DEFAULT_EYEBROWS,
    nose: DEFAULT_NOSE,
    cheeks: DEFAULT_CHEEKS,
    mouth: DEFAULT_MOUTH,
    currentState: 'idle'
  }
)

const emit = defineEmits<{
  pickState: [state: StateId]
}>()

const STORY_STATES = SEQUENCE.map((id) => STATE_BY_ID.get(id)!)

function handleStateClick(sId: StateId) {
  emit('pickState', sId)
}
</script>

<template>
  <div class="animation-panel space-y-3 text-[var(--ink)]">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h2 class="text-sm font-semibold">{{ t('panel.animations') }}</h2>
      <span class="text-[11px] text-[var(--muted)]">Montage clips</span>
    </div>

    <!-- Grid of all montage animation tiles (Classic + Personality) -->
    <div class="grid grid-cols-4 gap-1.5">
      <BotTile
        v-for="s in STORY_STATES"
        :key="s.id"
        :label="t(`states.${s.id}`)"
        :selected="s.id === currentState"
        :state="s.id"
        :shape="shape"
        :color="color"
        :expression="expression"
        :feature-size="featureSize"
        :eyebrows="eyebrows"
        :nose="nose"
        :cheeks="cheeks"
        :mouth="mouth"
        :frozen-at="POSES[s.id]"
        @click="handleStateClick(s.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.animation-panel {
  user-select: none;
}
</style>
