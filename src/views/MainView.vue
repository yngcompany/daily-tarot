<template>
  <div class="main">
    <TopBar @toggleBgm="toggleBgm" />

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

// Images
// import bgCloud01 from '@/assets/images/main/bg_cloud_01.svg'
// import bgCloud02 from '@/assets/images/main/bg_cloud_02.svg'
// import bgCloud03 from '@/assets/images/main/bg_cloud_03.svg'

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
function handleScroll() {
  const scrollTop = window.scrollY
  const parallaxY = scrollTop * -0.11 // 컨텐츠보다 느리게 움직이도록 비율 설정

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