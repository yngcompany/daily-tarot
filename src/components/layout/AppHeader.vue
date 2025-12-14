<template>
  <header class="app__header">
    <button
      v-if="showBack"
      class="back"
      @click="$emit('back')"
      aria-label="뒤로가기"
    >
      ←
    </button>

    <h1 class="title">{{ title }}</h1>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  showBack?: boolean
}>()

defineEmits(['back'])
</script>

<style lang="scss">
.app__header {
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed; z-index: 100;
  top: 0; left: 0;

  .back {
    position: absolute;
    left: 4vw;
    background: none;
    border: none;
    font-size: 4.5vw;
  }

  .title {
    font-size: 4vw;
    font-weight: 600;
  }
}
</style>
