<template>
  <div
    class="card"
    :class="{ selected: isSelected, flipped: isFlipped }"
    :style="tileStyle"
    @click="onClick"
    role="button"
  >
    <div class="card-inner">
      <!-- 앞면 -->
      <div class="card__face card__front">
        <span class="label"> card image </span>
      </div>

      <!-- 뒷면 -->
      <div class="card__face card__back">
        <span class="label">{{ card.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TarotCard } from '@/data/tarotCards'

const props = defineProps<{
  card: TarotCard
  selected?: boolean
  flipped?: boolean
  idx?: number
  stylePos?: Record<string, string>
}>()

const emit = defineEmits<{
  (e: 'toggle', id: string): void
}>()

const isSelected = computed(() => !!props.selected)
const isFlipped = computed(() => !!props.flipped)

function onClick() {
  emit('toggle', props.card.id)
}

const tileStyle = computed(() => ({
  ...(props.stylePos || {})
}))
</script>
