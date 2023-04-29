<script setup>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
</script>

<template>
  <header class="header">
    <div class="header__left">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText v-model="value1" placeholder="Search" />
      </span>
    </div>
    <div class="header__middle">
      <div class="logo">
        <span>FocusFlow</span>
      </div>
    </div>
    <div class="header__right">
      <Button label="Sign up" icon="pi pi-user" outlined />
      <Button label="Login" link />
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  max-width: 1440px;
  margin: auto;
  padding: 30px 0px;
  &__left {
    display: inherit;
    gap: 20px;
  }
  &__right {
    display: inherit;
    gap: 8px;
  }
  .logo {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    span {
      font-size: 30px;
      font-weight: 700;
    }
  }
}
</style>
