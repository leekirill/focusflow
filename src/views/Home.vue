<script setup>
import Button from "primevue/button";
</script>

<template>
  <div class="hero">
    <h1>Organize your work and personal life once and for all.</h1>
    <p>
      Achieve greater focus, organization, and tranquility with Focus Flow - the
      world's leading task manager and to-do list application.
    </p>
    <Button label="Start now" size="large" />
  </div>
</template>

<style lang="scss" scoped>
.hero {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  text-align: center;
  p {
    line-height: 160%;
    margin-bottom: 40px;
  }
}
</style>
