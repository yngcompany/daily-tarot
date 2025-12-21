// src/store/useAppStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TarotCard } from '@/data/tarotTypes'

export const useAppStore = defineStore('app', () => {
  // --- 기존 상태 ---
  const bgmOn = ref(true)
  const notificationsOn = ref(false)
  const theme = ref<'light' | 'dark'>('light')

  const historyKey = 'tarot_app_history_v1'
  const cooldownKey = 'tarot_app_cooldown_v1'

  // --- 선택 카드 상태 ---
  const selectedCards = ref<TarotCard[]>([])  // 선택한 카드 3장

  // --- 기존 함수 ---
  function saveHistory(item: any) {
    const list = loadHistory()
    list.unshift(item)
    localStorage.setItem(historyKey, JSON.stringify(list))
  }

  function loadHistory() {
    const raw = localStorage.getItem(historyKey)
    if (!raw) return []
    try { return JSON.parse(raw) } catch { return [] }
  }

  function setCooldown(minutes = 30) {
    const until = Date.now() + minutes * 60 * 1000
    localStorage.setItem(cooldownKey, JSON.stringify({ until }))
  }

  function getCooldown() {
    const raw = localStorage.getItem(cooldownKey)
    if (!raw) return null
    try { return JSON.parse(raw) } catch { return null }
  }

  // --- 선택 카드 관련 ---
  function setSelectedCards(cards: TarotCard[]) {
    // 항상 최대 3장 제한
    selectedCards.value = cards.slice(0, 3)
    // 카드 뒤집기 초기화
    selectedCards.value.forEach(c => c.isFlipped = false)
  }

  function toggleCardFlip(id: string) {
    const card = selectedCards.value.find(c => c.id === id)
    if (card) card.isFlipped = !card.isFlipped
  }

  // --- Return all state & functions ---
  return {
    bgmOn,
    notificationsOn,
    theme,
    saveHistory,
    loadHistory,
    setCooldown,
    getCooldown,
    selectedCards,
    setSelectedCards,
    toggleCardFlip
  }
})
