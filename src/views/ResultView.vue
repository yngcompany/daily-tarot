<template>
  <div class="result-view">
    <TopBar />

    <main>
      <h2>결과</h2>

      <!-- 선택 카드 3장 -->
      <div class="cards-row">
        <CardTile
          v-for="c in selectedCards"
          :key="c.id"
          :card="c"
          :isFlipped="c.isFlipped"
          @toggle="flipCard"
        />
      </div>

      <!-- 카드별 의미 -->
      <section class="card-details">
        <div v-for="c in selectedCards" :key="c.id" class="card-detail">
          <h3>{{ c.name }}</h3>
          <!-- 뒤집힌 카드만 의미 표시 -->
          <p v-if="c.isFlipped">{{ c.meaning }}</p>
          <p v-else>카드를 뒤집어 보세요</p>
        </div>
      </section>

      <!-- 종합 해석 -->
      <section class="combined">
        <h3>종합 해석</h3>
        <p>{{ combinedText }}</p>
      </section>

      <!-- 액션 버튼 -->
      <div class="actions">
        <button @click="retry">다시 하기</button>
        <button @click="goMain">메인으로</button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, watch } from 'vue'
import { useAppStore } from '@/store/useAppStore'
import TopBar from '@/components/TopBar.vue'
import CardTile from '@/components/CardTile.vue'

// --- 스토어 & 라우터 ---
const store = useAppStore()
const router = useRouter()
// const route = useRoute()

// --- 선택 카드 3장 ---
// const mode = (route.query.mode as string) || 'general'
const selectedCards = computed(() => store.selectedCards)

// 선택 카드가 정상적으로 들어오는지 확인
console.log('ResultView selectedCards:', selectedCards.value)

// 실시간으로 변화를 감지하고 싶다면 watch 활용 가능
watch(selectedCards, (newVal) => {
  console.log('selectedCards updated:', newVal)
})

// --- 카드 뒤집기 이벤트 ---
function flipCard(id: string) {
  store.toggleCardFlip(id)
}

// --- 종합 해석 ---
const combinedText = computed(() => {
  if (selectedCards.value.length !== 3) return ''
  const parts = selectedCards.value.map(c => c.meaning)
  return `당신은 ${parts[0]}의 상황을 겪은 뒤 ${parts[1]}의 흐름 속에서 행동하고, 결국 ${parts[2]}을 맞이할 가능성이 큽니다.`
})

// --- 네비게이션 ---
function goMain() {
  router.push('/')
}

function retry() {
  if (confirm('연속으로 타로를 할 경우 에너지의 흐름이 흐트러질 수 있어요. 30분 쉬는걸 권장합니다. 진행할까요?')) {
    router.push({ name: 'Shuffle' })
  }
}
</script>

<style>
@import '@/styles/views/result.scss';
</style>