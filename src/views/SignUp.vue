<script setup>
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import image from "../assets/auth-image.svg";
import { ref } from "vue";

const name = ref();
const email = ref();
const password = ref();
const accept = ref();
</script>

<template>
  <div class="container">
    <form class="p-fluid">
      <h1>Sign up</h1>
      <div v-focustrap class="card">
        <div class="field">
          <InputText
            id="input"
            v-model="name"
            type="text"
            placeholder="Name"
            autofocus
          />
        </div>
        <div class="field">
          <div class="p-input-icon-right">
            <i class="pi pi-envelope" />
            <InputText
              id="email"
              v-model="email"
              type="email"
              placeholder="Email"
            />
          </div>
        </div>
        <div class="field">
          <div class="p-float-label">
            <Password v-model="password" />
            <label for="password">Password</label>
          </div>
        </div>
        <div class="field-checkbox">
          <Checkbox
            inputId="accept"
            v-model="accept"
            name="accept"
            value="Accept"
          />
          <label for="accept">I agree to the terms and conditions*</label>
        </div>
        <div class="field gap-2">
          <Button
            type="submit"
            label="Submit"
            class="mt-2 mb-2"
            @click.prevent="signUp"
          />
          <Button
            label="Sign in with Google"
            icon="pi pi-google"
            outlined=""
            @click="signInWithGoogle"
          />
        </div>
      </div>
    </form>
    <img :src="image" width="500" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 40px;

  background: #fff;
  padding: 100px 20px;
  border-radius: 1rem;
}
</style>
