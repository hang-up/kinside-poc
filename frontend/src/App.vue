<script setup>
import { RouterView } from "vue-router";
import TheTopBar from "@/components/TheTopBar.vue";
</script>

<template>
  <header>
    <TheTopBar />
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  padding: 1rem 0;
}
</style>
