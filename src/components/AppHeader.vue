<script setup>
import Button from "primevue/button";

const emit = defineEmits(["openForm"]);

const handleModal = () => {
  emit("openForm");
};
</script>

<template>
  <header class="header">
    <div class="header__left">
      <Button label="Add task" icon="pi pi-plus" @click="handleModal" />
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
    span {
      font-size: 30px;
      font-weight: 700;
    }
  }
}
</style>
