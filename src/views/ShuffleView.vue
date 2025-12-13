<template>
  <div class="shuffle-view">
    <AppHeader
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
import { ref, onMounted, reactive } from 'vue'
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

// 카드 위치 + 초기 상태 관리
const cardPositions = reactive<Record<string, { opacity: number; scale: number; translateY: string }>>({})

onMounted(() => {
  displayCards.value = createDisplayDeck(25)

  // 초기 상태: 모든 카드 안보이게 + 살짝 위로
  displayCards.value.forEach(card => {
    cardPositions[card.id] = { opacity: 0, scale: 0.5, translateY: '-70px' }
  })

  // DOM이 다 그려진 후, 순차 애니메이션 시작
  requestAnimationFrame(() => {
    // 1초(1000ms) 기다렸다가 셔플 실행
    setTimeout(() => {
      shuffleAnimation()
    }, 1000)
  })
})

// 재귀형으로 한 장씩 순차 등장
function shuffleAnimation(index = 0) {
  if (index >= displayCards.value.length) {
    isReady.value = true
    return
  }

  const card = displayCards.value[index]
  if (!card) return shuffleAnimation(index + 1) // card 없으면 다음 카드로

  const pos = cardPositions[card.id]
  if (!pos) return shuffleAnimation(index + 1) // pos 없으면 다음 카드로

  pos.opacity = 1
  pos.scale = 1
  pos.translateY = '0px'

  setTimeout(() => shuffleAnimation(index + 1), 80)
}


// 카드 스타일 계산
function getCardStyle(card: TarotCard) {
  const pos = cardPositions[card.id] || { opacity: 0, scale: 0.5, translateY: '-20px' }
  return {
    opacity: pos.opacity,
    transform: `scale(${pos.scale}) translateY(${pos.translateY})`,
    transition: 'all 0.4s ease'
  }
}

// 카드 선택 관련 함수
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
    state: { cards: selectedCards.value }
  })
}
</script>

<style>
@import '@/styles/views/shuffle.scss';
</style>
