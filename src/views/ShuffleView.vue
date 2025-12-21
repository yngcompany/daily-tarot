<template>
  <div class="shuffle-view">
    <AppHeader
      :showBack="true"
      @back="$router.back()"
    />

    <div class="bg__parallax">
      <div class="bg__img">
          <div class="bg__star bg__star--01"></div>
        <div class="bg__star bg__star--02"></div>
        <div class="bg__star bg__star--03"></div>
        <div class="bg__star bg__star--04"></div>
        <div class="bg__star bg__star--05"></div>
        <div class="bg__star bg__star--06"></div>
        <div class="bg__star bg__star--07"></div>
        <div class="bg__star bg__star--08"></div>
        <div class="bg__star bg__star--09"></div>

        <div class="bg__cloud bg__cloud--01">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1201.3 138.97">
            <g id="cloud_01">
              <path class="cls-1" d="M0,138.97h1201.3v-63.96s-72.3-16.66-92.65,28.73c0,0-18-64.96-91.57-61.04,0,0-22.7-47.74-82.17-42.26,0,0-41.48-.78-67.3,39.91,0,0-54-25.48-93.13,11.52,0,0-38.61-34.22-92.35-25.87,0,0-51.65,3.13-84.52,62.09,0,0-32.35-47.48-103.3-44.35,0,0-19.3-40.7-73.57-42.78,0,0-50.61-4.17-76.17,38.61,0,0-21.39-16.17-67.3-15.65,0,0-29.22-2.09-70.96,22.43,0,0-41.74-29.74-110.09-17.74C96.21,28.61,42.31,37.8,0,92.59"/>
            </g>
          </svg>
        </div>
        <div class="bg__cloud bg__cloud--02">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1201.3 356.44">
            <g id="cloud_02">
              <path class="cls-1" d="M1201.3,3.92s-98.26-28.24-138.17,66.85c0,0-32.48-16.04-60.65,23.87,0,0-38.35-25.83-71.22-15.65,0,0-50.87,8.61-70.43,76.7,0,0-27.39-46.96-90.78-34.43,0,0-23.48-40.7-72-33.65,0,0-39.13,4.7-51.65,48.52,0,0-46.96-13.3-75.91,19.57,0,0-32.87-24.26-75.91-5.48,0,0-33.61,13.77-46.91,60.72,0,0-25.83-21.91-75.17-12.99,0,0-38.35,1.57-55.57,35.22,0,0-54.52-10.71-76.83,42.12,0,0-68.48-.78-85.7,44.61,0,0-73.96-25.83-154.39,36.56l1201.3-.42V3.92Z"/>
            </g>
          </svg>
        </div>
        <div class="bg__cloud bg__cloud--03">
          <svg xmlns="http://www.w3.org/2000/svg" id="_레이어_2" data-name="레이어 2" viewBox="0 0 1201.3 297.34">
            <g id="cloud_03">
              <path class="cls-1" d="M0,9.39s33.65-21.13,79.83,0c0,0,39.13,15.65,64.17,58.7,0,0,27.39-8.61,57.91,13.3,0,0,10.96,6.26,25.83,29.74,0,0,22.7-51.65,64.96-62.61,0,0,39.91-14.09,82.17,21.91,0,0,33.65-28.96,80.61-10.17,0,0,11.74-32.87,54-38.35,0,0,46.96-6.26,67.3,39.91,0,0,43.83-7.04,62.61,28.96,0,0,45.6-10.01,74.95,20.52l38.75,59.09,448.21,126.95L0,296.92V9.39Z"/>
            </g>
          </svg>
        </div>
      </div>
    </div>

    <div class="deck__wrap">
       <div class="deck__area" :class="{ ready: isReady }">
        <CardTile
          v-for="card in displayCards"
          :key="card.id"
          :card="card"
          :selected="selectedCards.some(c => c.id === card.id)"
          :style="getCardStyle(card)"
          :isFlipped="false"
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

import CardTile from '@/components/CardTile.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppBottom from '@/components/layout/AppBottom.vue'

import tarotDeck from '@/data/tarotDeck.json'
import type { TarotCard } from '@/data/tarotTypes'
import { createDisplayDeck } from '@/util/decks'


const router = useRouter()

/** 화면에 보여질 카드 */
const displayCards = ref<TarotCard[]>([])

/** 사용자가 선택한 카드 */
const selectedCards = ref<TarotCard[]>([])

const isReady = ref(false)

/** 카드 애니메이션 상태 */
const cardPositions = reactive<
  Record<string, { opacity: number; scale: number; translateY: string }>
>({})

onMounted(() => {
  displayCards.value = createDisplayDeck(78) // 1개 인자만 전달

  displayCards.value.forEach(card => {
    cardPositions[card.id] = {
      opacity: 0,
      scale: 0.5,
      translateY: '-70px'
    }
    card.isFlipped = true;
  })

  requestAnimationFrame(() => {
    setTimeout(() => shuffleAnimation(), 800)
  })
})

/** 셔플 애니메이션 (기존 그대로) */
function shuffleAnimation(index = 0): void {
  if (index >= displayCards.value.length) {
    isReady.value = true
    return
  }

  const card = displayCards.value[index]
  if (!card) {
    shuffleAnimation(index + 1)
    return
  }

  const pos = cardPositions[card.id]
  if (!pos) {
    shuffleAnimation(index + 1)
    return
  }

  pos.opacity = 1
  pos.scale = 1
  pos.translateY = '0px'

  setTimeout(() => shuffleAnimation(index + 1), 60)
}

/** 카드 스타일 */
function getCardStyle(card: TarotCard) {
  const pos = cardPositions[card.id]
  return {
    opacity: pos?.opacity ?? 0,
    transform: `scale(${pos?.scale ?? 0.5}) translateY(${pos?.translateY ?? '-20px'})`,
    transition: 'all 0.3s ease'
  }
}

/** 카드 선택 */
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

/** 결과 화면 이동 */
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
