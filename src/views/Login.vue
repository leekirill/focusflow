<script setup>
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import image from "../assets/auth-image.svg";

import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

const toast = useToast();

import {
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
} from "firebase/auth";
import { auth } from "../firebase/init";
import { useRouter } from "vue-router";
import { ref } from "vue";

const name = ref();
const email = ref();
const password = ref();
const accept = ref();
const errMsg = ref();

const router = useRouter();

const signUp = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      updateProfile(auth.currentUser, {
        displayName: name.value,
      });
      router.push("/tasks");
    })
    .then(() => {
      console.log(auth.currentUser);
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
    });
};
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider).then(() => {
    router.push("/tasks");
  });
};
</script>

<template>
  <div class="container">
    <form class="p-fluid">
      <h1>Login</h1>
      <div v-focustrap class="card">
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
        <p v-if="errMsg">{{ errMsg }}</p>
        <div class="grid gap-2">
          <Button
            type="submit"
            label="Submit"
            class="mt-5"
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
