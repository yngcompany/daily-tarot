<template>
  <div class="main">
    <TopBar @toggleBgm="toggleBgm" />

    <div class="bg__parallax">
      <div class="bg__gradient"></div>

      <div class="bg__img">
          <div class="bg__star bg__star--01"></div>
        <div class="bg__star bg__star--02"></div>
        <div class="bg__star bg__star--03"></div>
        <div class="bg__star bg__star--04"></div>
        <div class="bg__star bg__star--05"></div>
      </div>
    </div>

    <main class="content scroll-content">
      <section class="hero">
        <button class="daily-btn" @click="goDaily">데일리 타로</button>
      </section>

      <section class="categories">
        <div class="cat-row">
          <div class="cat" v-for="(c, idx) in categories" :key="idx">
            <h3>{{ c.title }}</h3>
            <div class="swiper-placeholder">#swiper: {{ c.subtitle }}</div>
            <button @click="openCategory(c.key)">열기</button>
          </div>
        </div>
      </section>

      <footer class="bottom">
        <button @click="goHistory">히스토리</button>
        <button @click="goSettings">설정</button>
      </footer>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/useAppStore'
import TopBar from '@/components/TopBar.vue'

const store = useAppStore()
const router = useRouter()
const categories = [
  { title: '연애운', key: 'love', subtitle: '운명의 만남 / 이루어질 수 있을까 / 결혼 / 재회' },
  { title: '금전운', key: 'money', subtitle: '사업 / 돈' },
  { title: '직업운', key: 'career', subtitle: '면접 / 이직 / 적성 / 방향' },
  { title: '건강운', key: 'health', subtitle: '정신건강 / 장수' }
]
function goDaily(){ router.push({ name: 'Shuffle', query: { mode: 'daily' } }) }
function openCategory(key: string){ router.push({ name: 'Shuffle', query: { mode: key } }) }
function goHistory(){ router.push('/history') }
function goSettings(){ router.push('/settings') }
function toggleBgm(){ store.bgmOn = !store.bgmOn }

// Parallax Effect
// const parallaxY = ref(0)
function handleScroll() {
  const scrollTop = window.scrollY
  const parallaxY = scrollTop * -0.125 // 컨텐츠보다 느리게 움직이도록 비율 설정

  const parallaxEl = document.querySelector('.bg__parallax') as HTMLElement
  if (parallaxEl) {
    parallaxEl.style.setProperty('--parallax-y', `${parallaxY}px`)
  }
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss">
@import '@/styles/views/main.scss';
</style>