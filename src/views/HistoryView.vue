<template>
  <div>
    <TopBar />
    <div class="list">
      <div v-for="(h, idx) in list" :key="idx" class="history-item" @click="openHistory(h)">
        <div>{{ formatTime(h.time) }}</div>
        <div>{{ h.sel.join(', ') }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TopBar from '@/components/TopBar.vue'
import { useAppStore } from '@/store/useAppStore'
const store = useAppStore()
const list = store.loadHistory()
function formatTime(t: string){ return new Date(t).toLocaleString() }
function openHistory(item: any){
  // 재현: 바로 결과 페이지로 이동(쿼리 포함)
  window.location.href = `/result?sel=${item.sel.join(',')}&mode=${item.mode}`
}
</script>

<style scoped>
.history-item{ padding:1rem; border-bottom:1px solid #eee; cursor:pointer;}
</style>