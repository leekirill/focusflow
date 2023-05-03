<script setup>
import Button from "primevue/button";
</script>

<template>
  <header class="header">
    <div class="header__left">
      <nav class="header__left nav">
        <ul class="header__left nav list">
          <li class="flex align-items-center">
            <router-link class="px-4" :to="{ name: 'Home' }">Home</router-link>
          </li>
          <li class="flex align-items-center">
            <router-link class="px-4" :to="{ name: 'Tasks' }"
              >Tasks</router-link
            >
          </li>
        </ul>
      </nav>
    </div>
    <div class="header__middle">
      <div class="logo">
        <router-link to="/"> FocusFlow </router-link>
      </div>
    </div>
    <div class="header__right">
      <router-link to="/signup">
        <Button label="Sign up" />
      </router-link>
      <Button label="Login" link />
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
  &__left {
    display: inherit;
    a.router-link-active {
      color: #fff;
      background: var(--primary-color);
      height: 100%;
      border-radius: 4px;
      display: flex;
      align-items: center;

      .link {
        list-style: none;
        a {
          padding: 0 20px;
          text-decoration: none;
          color: #1a1a1a;
        }
      }
    }
  }
  &__right {
    display: inherit;
    gap: 8px;
  }
  .logo {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    a {
      font-size: 30px;
      font-weight: 700;
    }
  }
}
</style>
