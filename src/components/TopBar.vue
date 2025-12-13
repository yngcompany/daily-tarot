<template>
  <header class="topbar">
    <div class="left">
      <button @click="$emit('toggleBgm')" class="icon-btn">{{ store.bgmOn ? 'BGM ON' : 'BGM OFF' }}</button>
    </div>
    <!-- <div class="center">Tarot Test</div> -->
    <div class="right">
      <button @click="goSettings" class="icon-btn">⚙️</button>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/useAppStore'
import { useRouter } from 'vue-router'
const store = useAppStore()
const router = useRouter()
function goSettings(){ router.push('/settings') }
</script>

<style lang="scss" scoped>
.topbar {
  display:flex; align-items:center; justify-content:space-between;
  position: relative;
  padding: 2.25vw 3.75vw;

  .icon-btn { background:transparent; border:none; cursor:pointer; }
  .center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-weight:700;
  }
}
</style>