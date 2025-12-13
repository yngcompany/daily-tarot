import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const bgmOn = ref(true)
  const notificationsOn = ref(false)
  const theme = ref<'light' | 'dark'>('light')
  const historyKey = 'tarot_app_history_v1'
  const cooldownKey = 'tarot_app_cooldown_v1'

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

  return { bgmOn, notificationsOn, theme, saveHistory, loadHistory, setCooldown, getCooldown }
})