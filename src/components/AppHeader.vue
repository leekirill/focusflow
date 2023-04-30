<script setup>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { ref } from "vue";
const props = defineProps(["handleValue"]);
// props.searchValue

const handle = (e) => {
  props.handleValue(e.target.value);
};
</script>

<template>
  <header class="header">
    <div class="header__left">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText @input="handle" placeholder="Search" />
      </span>
      <a href="#/zabl">Zabl</a>
      <a href="#/header">Header</a>
    </div>
    <div class="header__middle">
      <div class="logo">
        <a href="/">
          <span>FocusFlow</span>
        </a>
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
    a {
      text-decoration: none;
      color: #1a1a1a;
    }
  }
}
</style>
