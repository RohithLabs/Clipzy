<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { t } from '@/i18n'
import { useModalDialog } from '@/ui/useModalDialog'

/**
 * Confirmation d'une action destructrice. Le focus s'ouvre sur « Annuler » :
 * sur une suppression, la touche Entree ne doit pas detruire. L'animation vient
 * de `styles.css`, le reste du comportement modal de `useModalDialog`.
 */
const props = defineProps<{ title: string; detail: string; confirmLabel: string }>()
const open = defineModel<boolean>('open', { required: true })
const emit = defineEmits<{ confirm: [] }>()

const boite = useTemplateRef<HTMLDialogElement>('boite')
useModalDialog(open, boite)

function confirm() {
  emit('confirm')
  open.value = false
}
</script>

<template>
  <dialog
    ref="boite"
    class="dialogue m-auto w-80 rounded-2xl bg-white p-5 text-[var(--ink)] shadow-xl"
    :aria-label="props.title"
    @close="open = false"
    @cancel.prevent="open = false"
  >
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <h2 class="text-sm font-semibold">{{ props.title }}</h2>
        <p class="text-xs text-[var(--muted)]">{{ props.detail }}</p>
      </div>

      <div class="flex justify-end gap-2">
        <button
          type="button"
          autofocus
          class="h-8 cursor-pointer rounded-lg px-3 text-xs text-[var(--muted)] transition hover:bg-black/5 hover:text-[var(--ink)]"
          @click="open = false"
        >
          {{ t('dialog.cancel') }}
        </button>
        <button
          type="button"
          class="h-8 cursor-pointer rounded-lg bg-[var(--danger)] px-3 text-xs text-white transition hover:opacity-90 active:scale-95"
          @click="confirm"
        >
          {{ props.confirmLabel }}
        </button>
      </div>
    </div>
  </dialog>
</template>
