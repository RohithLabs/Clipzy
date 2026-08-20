<script setup lang="ts">
import { computed, inject, type StyleValue } from 'vue'
import {
  depthTransform,
  INTERACTIVE_3D_INJECTION_KEY,
  type Interactive3DContext
} from '@/ui/interactive-3d'

const props = withDefaults(
  defineProps<{
    /** 3D depth in pixels along the Z axis (e.g. 20, 40, 60, or negative) */
    depth?: number
    /** Extra 2D parallax movement multiplier (default: 1) */
    parallax?: number
    /** HTML tag or component to render (default: 'div') */
    as?: string
    /** Additional CSS classes */
    class?: string
    /** Custom styles */
    style?: StyleValue
  }>(),
  {
    depth: 0,
    parallax: 1,
    as: 'div',
    class: '',
    style: undefined
  }
)

const ctx = inject<Interactive3DContext | null>(INTERACTIVE_3D_INJECTION_KEY, null)

const layerStyle = computed(() => {
  const xRatio = ctx?.xRatio.value ?? 0
  const yRatio = ctx?.yRatio.value ?? 0
  const transform = depthTransform(props.depth, props.parallax, xRatio, yRatio)

  return {
    transform,
    transformStyle: 'preserve-3d' as const,
    willChange: 'transform'
  }
})
</script>

<template>
  <component
    :is="as"
    class="interactive-3d-layer"
    :class="props.class"
    :style="[layerStyle, props.style]"
  >
    <slot />
  </component>
</template>

<style scoped>
.interactive-3d-layer {
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
</style>
