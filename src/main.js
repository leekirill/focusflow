import { createApp } from "vue";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import router from "./router";
import App from "./App.vue";
import { initializeApp } from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";

import "./styles.scss";
import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";

const firebaseConfig = {
  apiKey: "AIzaSyDQuWkiyxKU7kQeLgUxlNSqVL2byTk9V1I",
  authDomain: "focus-flow-todo-app.firebaseapp.com",
  databaseURL: "https://focus-flow-todo-app-default-rtdb.firebaseio.com",
  projectId: "focus-flow-todo-app",
  storageBucket: "focus-flow-todo-app.appspot.com",
  messagingSenderId: "889728249957",
  appId: "1:889728249957:web:d7c83c49c47e2697c8d68c",
  measurementId: "G-TCV4TDYL6F",
};
const app = initializeApp(firebaseConfig);

createApp(App).use(router).use(PrimeVue).use(ToastService).mount("#app");
