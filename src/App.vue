<script setup>
import AppHeader from "./components/AppHeader.vue";
</script>

<template>
  <div class="wrapper">
    <AppHeader />
    <router-view />
  </div>
</template>

<style>
.wrapper {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 30px;
}
</style>
