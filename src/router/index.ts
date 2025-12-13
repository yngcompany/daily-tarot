import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import ShuffleView from '@/views/ShuffleView.vue'
import ResultView from '@/views/ResultView.vue'
import HistoryView from '@/views/HistoryView.vue'
import SettingsView from '@/views/SettingsView.vue'

const routes = [
  { path: '/', name: 'Main', component: MainView },
  { path: '/shuffle', name: 'Shuffle', component: ShuffleView, props: true },
  { path: '/result', name: 'Result', component: ResultView, props: true },
  { path: '/history', name: 'History', component: HistoryView },
  { path: '/settings', name: 'Settings', component: SettingsView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router