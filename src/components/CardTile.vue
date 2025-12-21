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
        <img
          :src="frontImage"
          :alt="card.name"
          class="card-image"
        />
      </div>

      <!-- 뒷면 -->
      <div class="card__face card__back">
        <img
        :src="backImage"
          alt="Tarot card back"
          class="card-image"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TarotCard } from '@/data/tarotTypes'

const props = defineProps<{
  card: TarotCard
  selected?: boolean
  isFlipped?: boolean
  idx?: number
  stylePos?: Record<string, string>
}>()

const emit = defineEmits<{
  (e: 'toggle', id: string): void
}>()

const isSelected = computed(() => !!props.selected)
const isFlipped = computed(() => !!props.isFlipped)

// 앞면
// import frontFool from `/src/assets/images/tarot/${props.card.image}`
// const frontImage = computed(() => frontFool)
const frontImage = computed(() => props.card.image)

// 뒷면
import backImg from '@/assets/images/tarot/tarot_back.jpg'
const backImage = computed(() => backImg)

function onClick() {
  // isFlipped.value = !isFlipped.value // 클릭하면 뒤집힘
  emit('toggle', props.card.id)
}

const tileStyle = computed(() => ({
  ...(props.stylePos || {})
}))
</script>
