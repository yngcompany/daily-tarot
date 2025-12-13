<template>
  <div class="mask">
    <div class="box">
      <h3>{{ title }}</h3>
      <div class="buttons">
        <button @click="$emit('close')">아니오</button>
        <button @click="$emit('confirm')">예</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({ title: { type: String, default: '확인' } })
</script>

<style scoped lang="scss">
.mask{ position:fixed; inset:0; display:flex; justify-content:center; align-items:center; background:rgba(0,0,0,0.4); }
.box{ background:#fff; padding:1rem; border-radius:8px; min-width:280px; text-align:center; }
.buttons{ display:flex; gap:1rem; justify-content:center; margin-top:1rem; }
</style>