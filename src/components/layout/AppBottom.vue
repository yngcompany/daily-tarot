<template>
  <footer class="bottom">
    <p v-if="selectedCount < max">
      카드를 {{ max }}장 선택해 주세요
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

<style>
.bottom {
  min-height: 12vh;
  background: rgba(255, 0, 0, 0.1);
}
</style>