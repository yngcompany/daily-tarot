<template>
  <div class="shuffle-view">
    <AppHeader
      title="카드를 선택하세요"
      :showBack="true"
      @back="$router.back()"
    />

    <div class="deck__wrap">
       <div class="deck__area" :class="{ ready: isReady }">
        <CardTile
          v-for="card in displayCards"
          :key="card.id"
          :card="card"
          :selected="selectedCards.some(c => c.id === card.id)"
          :style="getCardStyle(card)"
          @toggle="toggleSelect"
        />
      </div>
    </div>

    <AppBottom
      :selected-count="selectedCards.length"
      :max="3"
      @confirm="goNext"
    />
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, reactive  } from 'vue'
import { useRouter } from 'vue-router'
import { createDisplayDeck } from '@/util/decks'
import type { TarotCard } from '@/data/tarotCards'
import CardTile from '@/components/CardTile.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppBottom from '@/components/layout/AppBottom.vue'

const router = useRouter()

const displayCards = ref<TarotCard[]>([])
const selectedCards = ref<TarotCard[]>([])
const isReady = ref(false)

// 카드 위치 + 초기 opacity 관리
const cardPositions = reactive<Record<string, {
  x?: number
  y?: number
  opacity: number
  scale?: number
  translateY?: string
}>>({})

onMounted(async () => {
  displayCards.value = createDisplayDeck(25)

  // 초기 중앙 쌓임 상태
  displayCards.value.forEach(card => {
    cardPositions[card.id] = { opacity: 0, scale: 0.5 }
  })

  // “DOM이 다 그려진 후, 애니메이션 효출. 다음 프레임에서 카드가 Grid로 흩어지는 애니메이션
  requestAnimationFrame(() => {
    shuffleAnimation()
  })
})

// 셔플 애니메이션
function shuffleAnimation() {
  displayCards.value.forEach((card, index) => {
    setTimeout(() => {
      cardPositions[card.id] = { opacity: 1, scale: 1 }
      // 마지막 카드가 이동하면 ready
      if (index === displayCards.value.length - 1) isReady.value = true
    }, index * 50) // stagger 효과
  })
}

function getCardStyle(card: TarotCard) {
  const pos = cardPositions[card.id] || { opacity: 0, scale: 0.5 }
  return {
    opacity: pos.opacity,
    transform: `scale(${pos.scale})`,
    transition: 'all 0.4s ease'
  }
}

function toggleSelect(cardId: string) {
  const card = displayCards.value.find(c => c.id === cardId)
  if (!card) return

  const index = selectedCards.value.findIndex(c => c.id === cardId)

  if (index >= 0) {
    selectedCards.value.splice(index, 1)
  } else {
    if (selectedCards.value.length >= 3) return
    selectedCards.value.push(card)
  }
}

function goNext() {
  router.push({
    name: 'Result',
    state: {
      cards: selectedCards.value
    }
  })
}
</script>

<style>
@import '@/styles/views/shuffle.scss';
</style>