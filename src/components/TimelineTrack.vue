<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import BlockPicker from '@/components/BlockPicker.vue'
import BloubBot from '@/components/BloubBot.vue'
import {
  clampDuration,
  moveBlock,
  offsetOf,
  STEP,
  totalDuration,
  type Block
} from '@/bot/cycles'
import { POSES, type StateId } from '@/bot/states'
import {
  DEFAULT_FEATURE_SIZE,
  DEFAULT_EYEBROWS,
  DEFAULT_NOSE,
  DEFAULT_CHEEKS,
  type FeatureSize,
  type EyebrowsStyle,
  type NoseStyle,
  type CheeksStyle,
  type MouthStyle,
  DEFAULT_MOUTH
} from '@/bot/face'
import { BASE_SCALE, clampZoom, ticksFor } from '@/ui/timeline'
import { secondes, secondesCourtes, t } from '@/i18n'

/**
 * La piste : une regle graduee, les cartes du montage, et les gestes qui vont
 * avec (deplacer, etirer, promener la tete de lecture, zoomer). Elle ne connait
 * ni les cycles ni le lecteur — elle recoit une suite de blocs et rend celle
 * qu'on obtient apres le geste.
 */
const props = withDefaults(
  defineProps<{
    blocks: Block[]
    /** temps ecoule dans le bloc courant, pour la tete de lecture */
    elapsed: number
    shape: string
    color: string
    expression: string
    featureSize?: FeatureSize
    eyebrows?: EyebrowsStyle
    nose?: NoseStyle
    cheeks?: CheeksStyle
    mouth?: MouthStyle
  }>(),
  {
    featureSize: DEFAULT_FEATURE_SIZE,
    eyebrows: DEFAULT_EYEBROWS,
    nose: DEFAULT_NOSE,
    cheeks: DEFAULT_CHEEKS,
    mouth: DEFAULT_MOUTH
  }
)

const emit = defineEmits<{
  'update:blocks': [blocks: Block[]]
  /** date visee sur la regle */
  seek: [seconds: number]
  add: [state: StateId]
}>()

/** Curseur de lecture et loupe : la barre les affiche, la piste les manipule. */
const block = defineModel<number>('block', { required: true })
const zoom = defineModel<number>('zoom', { required: true })

const scale = computed(() => BASE_SCALE * zoom.value)
const total = computed(() => totalDuration(props.blocks))
const at = computed(() => offsetOf(props.blocks, block.value) + props.elapsed)
const ticks = computed(() => ticksFor(total.value, scale.value))
const exact = computed(() => secondes(at.value))

const track = ref<HTMLElement | null>(null)
/** Debordement de la piste, pour n'afficher les degrades que s'ils servent. */
const overflow = ref({ left: false, right: false })
/**
 * Defilement de la piste. L'infobulle de temps ne peut pas vivre dedans — le
 * conteneur rogne ce qui depasse en hauteur, et elle flotte au-dessus de la
 * regle — donc elle se positionne dehors, et doit retrancher ce defilement.
 */
const scrolled = ref(0)

function width(index: number) {
  return (props.blocks[index]?.duration ?? 1) * scale.value
}

function label(index: number) {
  const b = props.blocks[index]
  return b ? t(`states.${b.state}`) : ''
}

/* ------------------------------------------------------- defilement, loupe */

function onScroll() {
  const el = track.value
  if (!el) return
  scrolled.value = el.scrollLeft
  overflow.value = {
    left: el.scrollLeft > 4,
    right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4
  }
}

/**
 * Point d'ancrage du prochain changement d'echelle, en coordonnees d'ecran :
 * la seconde qui s'y trouve doit y rester. Sans ca, zoomer sur une carte
 * precise la fait fuir hors de l'ecran. `null` = le centre de ce qu'on voit,
 * c'est le bon compromis quand le zoom vient du curseur de la barre.
 */
let anchorX: number | null = null

function setZoom(next: number, clientX?: number) {
  anchorX = clientX ?? null
  zoom.value = clampZoom(next)
}

watch(scale, (now, before) => {
  const el = track.value
  if (!el) return
  const x = (anchorX ?? el.getBoundingClientRect().left + el.clientWidth / 2) -
    el.getBoundingClientRect().left
  const seconde = (el.scrollLeft + x) / before
  anchorX = null
  nextTick(() => {
    el.scrollLeft = seconde * now - x
    onScroll()
  })
})

/**
 * Molette et trackpad sur la piste :
 * - pincement du trackpad ou ctrl/cmd + molette → loupe ;
 * - deux doigts a l'horizontale → defilement ;
 * - molette de souris → defilement de la piste.
 */
function onWheel(e: WheelEvent) {
  const el = track.value
  if (!el) return
  const unit = e.deltaMode === 1 ? 16 : 1
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault()
    setZoom(zoom.value * Math.exp((-e.deltaY * unit) / 180), e.clientX)
    return
  }
  if (el.scrollWidth <= el.clientWidth) return
  const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
  if (!d) return
  e.preventDefault()
  el.scrollLeft += d * unit
}

// La carte courante reste visible quand la piste deborde de la fenetre.
watch(block, () => {
  const el = track.value
  if (!el) return
  const x = offsetOf(props.blocks, block.value) * scale.value
  if (x < el.scrollLeft || x + width(block.value) > el.scrollLeft + el.clientWidth) {
    el.scrollTo({ left: Math.max(0, x - 24), behavior: 'smooth' })
  }
})

/* --------------------------------------------------------------- montage */

function removeBlock(index: number) {
  // la derniere carte ne part pas : un montage vide n'aurait rien a jouer
  if (props.blocks.length < 2) return
  emit(
    'update:blocks',
    props.blocks.filter((_, i) => i !== index)
  )
  if (index < block.value) block.value -= 1
  else if (block.value >= props.blocks.length - 1) block.value = props.blocks.length - 2
}

function setDuration(index: number, wanted: number) {
  const b = props.blocks[index]
  if (!b) return
  const duration = clampDuration(b.state, wanted)
  if (duration === b.duration) return
  emit(
    'update:blocks',
    props.blocks.map((old, i) => (i === index ? { ...old, duration } : old))
  )
}

/* ------------------------------------------------------ glisser / etirer */

type Drag = { from: number; to: number; startX: number; dx: number; moved: boolean }
type Resize = { index: number; startX: number; startDuration: number }

const drag = ref<Drag | null>(null)
const resize = ref<Resize | null>(null)
const scrubbing = ref(false)

/** Decalage a appliquer a une carte pendant qu'on en deplace une autre. */
function shiftOf(i: number) {
  const d = drag.value
  if (!d?.moved) return 0
  if (i === d.from) return d.dx
  const w = width(d.from)
  if (d.to > d.from && i > d.from && i <= d.to) return -w
  if (d.to < d.from && i >= d.to && i < d.from) return w
  return 0
}

/** Vrai pour la carte qu'on est en train de deplacer : elle se souleve. */
function lifted(i: number) {
  return Boolean(drag.value?.moved) && i === drag.value?.from
}

/** Index de la carte sous une position, en secondes depuis le debut de la piste. */
function indexAt(t: number) {
  let acc = 0
  for (let i = 0; i < props.blocks.length; i++) {
    const dur = props.blocks[i]!.duration
    if (t < acc + dur / 2) return i
    acc += dur
  }
  return props.blocks.length - 1
}

function pointerSeconds(e: PointerEvent) {
  const box = track.value?.getBoundingClientRect()
  if (!box) return 0
  return (e.clientX - box.left + (track.value?.scrollLeft ?? 0)) / scale.value
}

function onBlockDown(index: number, e: PointerEvent) {
  drag.value = { from: index, to: index, startX: e.clientX, dx: 0, moved: false }
}

function onResizeDown(index: number, e: PointerEvent) {
  e.stopPropagation()
  resize.value = { index, startX: e.clientX, startDuration: props.blocks[index]!.duration }
}

/** Le clavier etire aussi : la poignee est un bouton, pas seulement une zone. */
function onResizeKey(index: number, delta: number) {
  setDuration(index, props.blocks[index]!.duration + delta)
}

/* Global window pointer handlers to prevent any stuck drag or resize */
function onGlobalPointerMove(e: PointerEvent) {
  if (drag.value) {
    const d = drag.value
    const dx = e.clientX - d.startX
    if (!d.moved && Math.abs(dx) > 4) {
      d.moved = true
    }
    if (d.moved) {
      d.dx = dx
      d.to = Math.max(0, Math.min(props.blocks.length - 1, indexAt(pointerSeconds(e))))
    }
  }

  if (resize.value) {
    const r = resize.value
    setDuration(r.index, r.startDuration + (e.clientX - r.startX) / scale.value)
  }

  if (scrubbing.value) {
    scrubTo(e)
  }
}

function onGlobalPointerUp() {
  if (drag.value) {
    const d = drag.value
    drag.value = null
    if (!d.moved) {
      block.value = d.from
    } else if (d.to !== d.from) {
      const suivi = block.value === d.from ? d.to : block.value
      emit('update:blocks', moveBlock(props.blocks, d.from, d.to))
      block.value = suivi
    }
  }

  if (resize.value) {
    resize.value = null
  }

  if (scrubbing.value) {
    scrubbing.value = false
  }
}

onMounted(() => {
  onScroll()
  window.addEventListener('pointermove', onGlobalPointerMove)
  window.addEventListener('pointerup', onGlobalPointerUp)
  window.addEventListener('pointercancel', onGlobalPointerUp)
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onGlobalPointerMove)
  window.removeEventListener('pointerup', onGlobalPointerUp)
  window.removeEventListener('pointercancel', onGlobalPointerUp)
})

watch(() => [total.value, props.blocks] as const, () => nextTick(onScroll))

/* -------------------------------------------------------------- au clavier */

async function onCardKey(index: number, e: KeyboardEvent) {
  const sens = e.key === 'ArrowLeft' ? -1 : e.key === 'ArrowRight' ? 1 : 0
  if (!sens) return
  e.preventDefault()

  if (!e.altKey) {
    emit('seek', Math.max(0, Math.min(total.value - 0.001, at.value + sens * STEP)))
    return
  }

  const cible = index + sens
  if (cible < 0 || cible >= props.blocks.length) return
  emit('update:blocks', moveBlock(props.blocks, index, cible))
  block.value = cible
  await nextTick()
  const liste = track.value?.querySelectorAll<HTMLButtonElement>('[data-carte]')
  liste?.[cible]?.focus()
}

/* ----------------------------------------------------------------- scrub */

function scrubTo(e: PointerEvent) {
  emit('seek', Math.max(0, Math.min(total.value - 0.001, pointerSeconds(e))))
}

function onRulerDown(e: PointerEvent) {
  e.preventDefault()
  scrubbing.value = true
  scrubTo(e)
}
</script>

<template>
  <div class="relative flex-1 select-none">
    <div
      ref="track"
      class="h-full overflow-x-auto overflow-y-hidden [scrollbar-width:none]"
      @scroll="onScroll"
      @wheel="onWheel"
    >
      <!-- Track container -->
      <div class="relative flex h-full flex-col min-w-max" :style="{ width: `${total * scale + 88}px` }">
        <!-- Ruler -->
        <div
          class="relative h-7 shrink-0 cursor-ew-resize pt-1 select-none"
          @pointerdown="onRulerDown"
        >
          <span
            v-for="tick in ticks"
            :key="tick.t"
            class="absolute bottom-1.5 flex items-end gap-1 pointer-events-none"
            :style="{ transform: `translateX(${tick.t * scale}px)` }"
          >
            <span class="block w-px bg-[var(--line)]" :class="tick.major ? 'h-3' : 'h-1.5'" />
            <span v-if="tick.major" class="-mb-0.5 text-xs leading-none text-[var(--muted)]">
              {{ secondesCourtes(tick.t, Number.isInteger(tick.t) ? 0 : 1) }}
            </span>
          </span>
        </div>

        <!-- Cards List -->
        <ul class="flex flex-1 items-stretch flex-nowrap min-w-max">
          <li
            v-for="(b, i) in blocks"
            :key="`trk-b-${i}`"
            class="group relative shrink-0 pr-1 select-none"
            :class="[
              lifted(i) ? 'z-30 pointer-events-none' : 'z-10',
              drag?.moved && !lifted(i) ? 'transition-transform duration-150 ease-out' : ''
            ]"
            :style="{
              width: `${b.duration * scale}px`,
              transform: shiftOf(i) ? `translateX(${shiftOf(i)}px)` : undefined
            }"
          >
            <button
              type="button"
              class="flex h-full w-full cursor-grab flex-col justify-between overflow-hidden rounded-lg px-1.5 py-1 text-left select-none active:cursor-grabbing transition"
              :class="[
                i === block
                  ? 'bg-white ring-2 ring-[var(--ink)] ring-inset shadow-xs'
                  : 'bg-black/[0.045] hover:bg-black/[0.08]',
                lifted(i) ? 'scale-[1.03] opacity-85 shadow-2xl ring-2 ring-[var(--ink)] bg-white' : ''
              ]"
              :aria-label="t('timeline.blockAria', { state: label(i), duration: secondes(b.duration) })"
              :aria-current="i === block ? 'true' : undefined"
              @pointerdown="onBlockDown(i, $event)"
              data-carte
              aria-keyshortcuts="Alt+ArrowLeft Alt+ArrowRight ArrowLeft ArrowRight"
              @keydown.enter.prevent="block = i"
              @keydown.space.prevent="block = i"
              @keydown.left="onCardKey(i, $event)"
              @keydown.right="onCardKey(i, $event)"
            >
              <span class="flex min-w-0 flex-1 items-center justify-center pointer-events-none">
                <BloubBot
                  v-if="width(i) > 44"
                  class="shrink-0"
                  :state="b.state"
                  :size="Math.min(56, Math.max(30, width(i) * 0.5))"
                  :shape="shape"
                  :color="color"
                  :expression="expression"
                  :feature-size="featureSize"
                  :eyebrows="eyebrows"
                  :nose="nose"
                  :cheeks="cheeks"
                  :mouth="mouth"
                  :paper="i === block ? '#ffffff' : '#f2f2f2'"
                  :frozen-at="POSES[b.state]"
                />
              </span>
              <span
                v-if="width(i) > 50"
                class="tronque text-center text-xs leading-none font-semibold tabular-nums pointer-events-none"
                :class="i === block ? 'text-[var(--ink)]' : 'text-[var(--muted)]'"
              >
                {{ secondes(b.duration) }}
              </span>
            </button>

            <!-- Resize handle -->
            <button
              type="button"
              class="absolute inset-y-2 right-0.5 w-1 cursor-ew-resize rounded-full bg-[var(--muted)] opacity-0 transition group-hover:opacity-60 hover:opacity-100! focus-visible:opacity-100 z-20"
              :aria-label="
                t('timeline.blockDurationAria', {
                  state: label(i),
                  duration: secondes(b.duration)
                })
              "
              @pointerdown="onResizeDown(i, $event)"
              @keydown.left.prevent="onResizeKey(i, -STEP)"
              @keydown.right.prevent="onResizeKey(i, STEP)"
            />

            <!-- Remove button -->
            <button
              v-if="blocks.length > 1"
              type="button"
              class="absolute top-1 right-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-black/10 text-[var(--ink)] opacity-0 transition group-hover:opacity-100 hover:bg-black/20 focus-visible:opacity-100 z-20"
              :aria-label="t('timeline.blockRemoveAria', { state: label(i) })"
              @click.stop="removeBlock(i)"
            >
              <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true">
                <path
                  d="M2.6 2.6 7.4 7.4M7.4 2.6 2.6 7.4"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </li>

          <!-- Add Block (+) button -->
          <li class="w-[72px] shrink-0 pl-1 z-10">
            <BlockPicker
              :shape="shape"
              :color="color"
              :expression="expression"
              :feature-size="featureSize"
              :eyebrows="eyebrows"
              :nose="nose"
              :cheeks="cheeks"
              :mouth="mouth"
              @pick="emit('add', $event)"
            />
          </li>
        </ul>

        <!-- Playhead Indicator -->
        <div
          class="pointer-events-none absolute inset-y-0 left-0 w-0.5 rounded-full bg-[var(--ink)] z-40"
          :style="{ transform: `translateX(${at * scale}px)` }"
        >
          <span
            class="absolute -top-0.5 -left-[5px] h-3 w-3 rounded-full border-2 border-[var(--paper)] bg-[var(--ink)] shadow-xs"
          />
        </div>
      </div>
    </div>

    <!-- Scrubber Tooltip -->
    <div
      v-if="scrubbing"
      class="pointer-events-none absolute top-0 left-0 z-50"
      :style="{ transform: `translate(${at * scale - scrolled}px, -70%)` }"
    >
      <span
        class="block -translate-x-1/2 rounded-md bg-[var(--ink)] px-2 py-1 text-xs tabular-nums text-[var(--paper)] shadow-sm"
      >
        {{ exact }}
      </span>
    </div>

    <!-- Overflow gradients -->
    <div
      v-if="overflow.left"
      class="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[var(--paper)] to-transparent z-40"
    />
    <div
      v-if="overflow.right"
      class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[var(--paper)] to-transparent z-40"
    />
  </div>
</template>

<style scoped>
.tronque {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
