<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { ThreeScene, type PBRMaterialType, type GeometryType } from '@/3d/ThreeScene'
import { sfx } from '@/audio/sfx'

const canvasContainer = ref<HTMLDivElement | null>(null)
let threeScene: ThreeScene | null = null

const activeMaterial = ref<PBRMaterialType>('iridescent')
const activeGeometry = ref<GeometryType>('squishy_blob')
const baseColor = ref('#a855f7')
const autoRotate = ref(true)
const wireframe = ref(false)

const MATERIALS: Array<{ id: PBRMaterialType; name: string; icon: string; desc: string; previewClass: string }> = [
  { id: 'iridescent', name: 'Iridescent Bubble', icon: '🫧', desc: 'Rainbow thin-film fresnel refraction', previewClass: 'from-fuchsia-500 via-indigo-500 to-cyan-400' },
  { id: 'gold', name: 'Liquid 24K Gold', icon: '👑', desc: 'Mirror metallic with clearcoat shine', previewClass: 'from-amber-300 via-yellow-500 to-amber-600' },
  { id: 'hologram', name: 'Cyber Hologram', icon: '⚡', desc: 'Glowing matrix wireframe mesh', previewClass: 'from-cyan-400 to-blue-600' },
  { id: 'glass', name: 'Frosted Glass', icon: '🧊', desc: 'Physical transmission & refractive IOR', previewClass: 'from-white/80 via-slate-200 to-blue-100' },
  { id: 'chrome', name: 'Liquid Chrome', icon: '🪩', desc: 'Ultra-reflective silver gloss', previewClass: 'from-slate-200 via-slate-400 to-zinc-600' },
  { id: 'clay', name: 'Matte Clay', icon: '🎨', desc: 'Soft pastel diffuse look', previewClass: 'from-pink-400 to-rose-500' },
  { id: 'obsidian', name: 'Dark Obsidian', icon: '🌌', desc: 'Deep cosmic mirror gloss', previewClass: 'from-zinc-950 via-zinc-800 to-slate-900' },
  { id: 'plasma', name: 'Electric Plasma', icon: '🔥', desc: 'Pulsating glowing core radiation', previewClass: 'from-orange-500 via-red-600 to-rose-600' }
]

const GEOMETRIES: Array<{ id: GeometryType; name: string; icon: string }> = [
  { id: 'squishy_blob', name: 'Squishy Blob (Noise)', icon: '🫧' },
  { id: 'crystal', name: 'Diamond Crystal', icon: '💎' },
  { id: 'torus_knot', name: 'Torus Knot', icon: '🪐' },
  { id: 'star_poly', name: 'Geometric Star', icon: '⭐' },
  { id: 'smooth_sphere', name: 'Pure Sphere', icon: '⚪' }
]

const PRESET_COLORS = [
  '#a855f7',
  '#06b6d4',
  '#f43f5e',
  '#10b981',
  '#f59e0b',
  '#3b82f6',
  '#ec4899',
  '#18181b'
]

function handleResize() {
  if (canvasContainer.value && threeScene) {
    const width = canvasContainer.value.clientWidth
    const height = canvasContainer.value.clientHeight
    threeScene.resize(width, height)
  }
}

onMounted(() => {
  if (canvasContainer.value) {
    threeScene = new ThreeScene({
      container: canvasContainer.value,
      width: canvasContainer.value.clientWidth,
      height: canvasContainer.value.clientHeight,
      materialType: activeMaterial.value,
      geometryType: activeGeometry.value,
      baseColor: baseColor.value,
      autoRotate: autoRotate.value,
      wireframe: wireframe.value
    })

    window.addEventListener('resize', handleResize)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  threeScene?.dispose()
})

watch(activeMaterial, (mat) => {
  threeScene?.setMaterialType(mat)
  sfx.playPop()
})

watch(activeGeometry, (geom) => {
  threeScene?.setGeometryType(geom)
  sfx.playWhoosh()
})

watch(baseColor, (col) => {
  threeScene?.setBaseColor(col)
})

watch(autoRotate, (on) => {
  threeScene?.setAutoRotate(on)
})

watch(wireframe, (on) => {
  threeScene?.setWireframe(on)
})
</script>

<template>
  <div class="three-canvas-studio w-full max-w-7xl mx-auto p-4 sm:p-6 space-y-6 text-[var(--ink)]">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
      <div>
        <div class="flex items-center gap-2.5">
          <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-sm">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </span>
          <h1 class="text-2xl font-bold tracking-tight">3D WebGL Studio Engine</h1>
          <span class="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">
            Hardware Accelerated
          </span>
        </div>
        <p class="text-xs text-[var(--muted)] mt-1">
          Real-time physical Three.js WebGL shaders with vertex noise deformation, galaxy particle stars, and interactive drag controls.
        </p>
      </div>

      <!-- Quick Control Toggles -->
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition cursor-pointer"
          :class="autoRotate ? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300' : 'border-[var(--line)] text-[var(--muted)]'"
          @click="autoRotate = !autoRotate"
        >
          <span>🔄</span>
          <span>Auto Rotate</span>
        </button>
        <button
          type="button"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition cursor-pointer"
          :class="wireframe ? 'border-cyan-500 bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300' : 'border-[var(--line)] text-[var(--muted)]'"
          @click="wireframe = !wireframe"
        >
          <span>📐</span>
          <span>Wireframe</span>
        </button>
      </div>
    </div>

    <!-- Main Workspace Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- 3D Interactive Viewport (Span 7) -->
      <div class="lg:col-span-7 flex flex-col items-center justify-center min-h-[480px] sm:min-h-[540px] rounded-3xl border border-[var(--line)] bg-gradient-to-b from-neutral-900 via-slate-950 to-black p-4 relative overflow-hidden shadow-xl">
        <!-- Interactive 3D Canvas Container -->
        <div ref="canvasContainer" class="w-full h-[440px] sm:h-[500px] cursor-grab active:cursor-grabbing" />

        <!-- Hint Overlay -->
        <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none text-white/70 text-[11px] px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur border border-white/10">
          <span class="flex items-center gap-1">
            <span>👆</span> Drag mouse or finger to rotate 3D mesh in 360°
          </span>
          <span class="font-mono text-purple-400 font-bold uppercase">{{ activeMaterial }}</span>
        </div>
      </div>

      <!-- Settings & Shaders Controls (Span 5) -->
      <div class="lg:col-span-5 space-y-5">
        <!-- 1. PBR Shaders & Materials -->
        <div class="p-4 rounded-2xl border border-[var(--line)] bg-white/70 backdrop-blur shadow-2xs space-y-3 dark:bg-zinc-900/60">
          <div class="flex items-center justify-between">
            <h2 class="text-sm font-bold flex items-center gap-1.5">
              <span>✨ PBR Shader Materials</span>
            </h2>
            <span class="text-[11px] font-mono text-[var(--muted)]">8 Shaders</span>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="mat in MATERIALS"
              :key="mat.id"
              type="button"
              class="flex flex-col items-start gap-1 p-2.5 rounded-xl border text-left transition cursor-pointer group"
              :class="
                activeMaterial === mat.id
                  ? 'border-purple-500 bg-purple-50/70 shadow-sm dark:bg-purple-950/40'
                  : 'border-[var(--line)] hover:border-purple-300 bg-white/50 dark:bg-zinc-800/40'
              "
              @click="activeMaterial = mat.id"
            >
              <div class="flex items-center justify-between w-full">
                <span class="text-base">{{ mat.icon }}</span>
                <span class="h-3.5 w-3.5 rounded-full bg-gradient-to-tr shadow-2xs" :class="mat.previewClass" />
              </div>
              <span class="text-xs font-bold text-[var(--ink)]">{{ mat.name }}</span>
              <span class="text-[10px] text-[var(--muted)] line-clamp-1">{{ mat.desc }}</span>
            </button>
          </div>
        </div>

        <!-- 2. Procedural Geometry Deformers -->
        <div class="p-4 rounded-2xl border border-[var(--line)] bg-white/70 backdrop-blur shadow-2xs space-y-3 dark:bg-zinc-900/60">
          <h2 class="text-sm font-bold flex items-center gap-1.5">
            <span>🔷 3D Geometries & Deformers</span>
          </h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            <button
              v-for="geom in GEOMETRIES"
              :key="geom.id"
              type="button"
              class="flex items-center gap-1.5 p-2 rounded-xl border text-xs font-medium transition cursor-pointer"
              :class="
                activeGeometry === geom.id
                  ? 'border-purple-500 bg-purple-50 font-bold text-purple-800 dark:bg-purple-950/50 dark:text-purple-300 shadow-2xs'
                  : 'border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)]'
              "
              @click="activeGeometry = geom.id"
            >
              <span>{{ geom.icon }}</span>
              <span class="truncate text-[11px]">{{ geom.name }}</span>
            </button>
          </div>
        </div>

        <!-- 3. Base Color & Tint -->
        <div class="p-4 rounded-2xl border border-[var(--line)] bg-white/70 backdrop-blur shadow-2xs space-y-3 dark:bg-zinc-900/60">
          <h2 class="text-sm font-bold flex items-center gap-1.5">
            <span>🎨 Color & Tint Multiplier</span>
          </h2>
          <div class="flex items-center gap-2 flex-wrap">
            <button
              v-for="c in PRESET_COLORS"
              :key="c"
              type="button"
              class="h-7 w-7 rounded-full border-2 transition transform hover:scale-110 cursor-pointer shadow-2xs"
              :style="{ backgroundColor: c }"
              :class="baseColor === c ? 'border-[var(--ink)] scale-110' : 'border-transparent'"
              @click="baseColor = c"
            />
            <input
              type="color"
              v-model="baseColor"
              class="h-7 w-7 rounded-lg border border-[var(--line)] cursor-pointer bg-transparent"
              title="Custom Color"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
