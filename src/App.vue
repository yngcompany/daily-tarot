<script setup lang="ts">
import { useAppStore } from '@/store/useAppStore'

const appStore = useAppStore()
</script>

<template>
  <div :class="['app-root', appStore.theme]">
    <!-- 모든 화면은 여기로 들어온다 -->
    <RouterView />
  </div>
</template>

<style lang="scss">
</style>