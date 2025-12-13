<template>
  <div class="result">
    <TopBar />
    <main>
      <h2>결과</h2>
      <div class="cards-row">
        <div class="card-block" v-for="c in selectedCards" :key="c.id">
          <div class="card-name">{{ c.kname || c.name }}</div>
          <div class="card-short">{{ c.short }}</div>
          <div class="hint">{{ c.categoryHints[mode] || '힌트 없음' }}</div>
        </div>
      </div>

      <section class="combined">
        <h3>종합 해석</h3>
        <p>{{ combinedText }}</p>
      </section>

      <div class="actions">
        <button @click="retry">다시 하기</button>
        <button @click="goMain">메인으로</button>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import TopBar from '@/components/TopBar.vue'
import { useRouter, useRoute } from 'vue-router'
import cardsData from '@/assets/cards.json'
import { useAppStore } from '@/store/useAppStore'
import { computed } from 'vue'

// --- 타입 정의 ---
type CategoryKey = 'love' | 'money' | 'career' | 'health' | 'general'

interface Card {
  id: string
  name: string
  kname?: string
  short: string
  core: string
  categoryHints: Partial<Record<CategoryKey, string>>  // general 포함 가능
}


// --- 스토어 & 라우터 ---
const store = useAppStore()
const router = useRouter()
const route = useRoute()

// --- 쿼리에서 mode & 선택 카드 가져오기 ---
const mode = (route.query.mode as CategoryKey) || 'general'
const sel = (route.query.sel as string || '').split(',').filter(Boolean)
const selectedCards = cardsData.filter((c: Card) => sel.includes(c.id)) as Card[]

// --- 종합 해석: 카드 속성(core)들을 이어붙여 템플릿으로 만듬 ---
function makeCombined(cards:any[], modeKey:string){
  if(cards.length === 0) return ''
  const parts = cards.map(c => c.core)
  // 템플릿: 원인 -> 진행 -> 결과 순서 가정
  return `당신은 ${parts[0]}의 상황을 겪은 뒤 ${parts[1]}의 흐름 속에서 행동하고, 결국 ${parts[2]}을(를) 맞이할 가능성이 큽니다. (카테고리: ${modeKey})`
}

const combinedText = computed(() => makeCombined(selectedCards, mode))

// --- 네비게이션 ---
function goMain() { router.push('/') }

function retry(){
  // 쿨다운: 팝업으로 권장 30분 안내
  if(confirm('연속으로 타로를 할 경우 에너지의 흐름이 흐트러질 수 있어요. 30분 쉬는걸 권장합니다. 그래도 진행할까요?')) {
    // 다시 Shuffle로 (선택사항: setCooldown)
    router.push({ name: 'Shuffle', query: { mode } })
  } else {
    // stay
  }
}

// --- 기록 저장: 결과 본 시간 저장
store.saveHistory({
  time: (new Date()).toISOString(),
  mode,
  sel
})
</script>

<style lang="scss" scoped>
.cards-row{ display:flex; gap:1rem; margin:1rem 0; }
.card-block{ background:#fff; padding:0.75rem; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.06); width:30%; }
.actions{ display:flex; gap:1rem; margin-top:1rem; }
</style>