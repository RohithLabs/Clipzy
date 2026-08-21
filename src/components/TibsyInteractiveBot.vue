<script setup lang="ts">
import ClipzyInteractiveBot, { type ClipzyBotProps } from './ClipzyInteractiveBot.vue'

const props = defineProps<ClipzyBotProps>()
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
  (e: 'stateChange', state: any): void
  (e: 'moodChange', mood: string): void
}>()
</script>

<template>
  <ClipzyInteractiveBot
    v-bind="props"
    @click="(e) => emit('click', e)"
    @state-change="(s) => emit('stateChange', s)"
    @mood-change="(m) => emit('moodChange', m)"
  />
</template>
