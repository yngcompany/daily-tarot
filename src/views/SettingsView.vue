<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'
import { useAppStore } from '@/store/useAppStore'

const appStore = useAppStore()
</script>

<template>
  <div class="settings-view">
    <TopBar title="설정" />

    <label>
      <span>배경음악</span>
      <input type="checkbox" v-model="appStore.bgmOn" />
    </label>

    <label>
      <span>알림</span>
      <input type="checkbox" v-model="appStore.notificationsOn" />
    </label>

    <label>
      <span>다크 모드</span>
      <input
        type="checkbox"
        :checked="appStore.theme === 'dark'"
        @change="(e) => {
            const target = e.currentTarget as HTMLInputElement
            appStore.theme = target.checked ? 'dark' : 'light'
        }"
      />
    </label>
  </div>
</template>