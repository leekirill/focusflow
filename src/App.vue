<script setup>
import AppHeader from "./components/AppHeader.vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

let auth;
let router = useRouter();
const isLoggedIn = ref(false);

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});
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
