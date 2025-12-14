<template>
  <footer class="app__bottom">
    <p class="app__bottom--text" v-if="selectedCount < max">
      카드를 {{ max }}장 선택해 주세요.
    </p>

    <button
      v-else
      class="next"
      @click="$emit('confirm')"
    >
      모두 고르셨나요?
    </button>
  </footer>
</template>

<script setup lang="ts">
defineProps<{
  selectedCount: number
  max: number
}>()

defineEmits<{
  (e: 'confirm'): void
}>()
</script>

<style lang="scss">
.app__bottom {
  position: fixed; z-index: 100; bottom: 7.2vw; left: 50%; transform: translateX(-50%);
  padding: 4vw;
  border-radius: 2vw;
  background: rgba(36, 37, 80, 0.38);
  &--text {margin: 0; padding: 0; line-height: 3.5vw; color: #fff; font-size: 3.8vw;}
}
</style>