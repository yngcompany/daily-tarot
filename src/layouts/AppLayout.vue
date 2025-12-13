<template>
  <div class="app-layout">
    <AppHeader />

    <main class="content">
      <router-view />
    </main>

    <AppBottom />
  </div>
</template>

<style>
.app-layout {
  height: 100dvh;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  overflow: hidden;
}
</style>