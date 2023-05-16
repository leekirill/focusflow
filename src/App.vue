<script setup>
import AppHeader from "./components/AppHeader.vue";
import { ref } from "vue";

const isLoggedIn = ref(false);
</script>

<template>
  <div class="wrapper">
    <AppHeader :handleSignOut="handleSignOut" :isLoggedIn="isLoggedIn" />
    <router-view :isLoggedIn="isLoggedIn" />
  </div>
</template>

<style>
.wrapper {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 30px;
}
</style>
