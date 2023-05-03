import { createRouter, createWebHashHistory } from "vue-router";

import Home from "./views/Home.vue";
import Tasks from "./views/Tasks.vue";
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", name: "Home", component: Home, alias: "/" },
    { path: "/tasks", name: "Tasks", component: Tasks },
    { path: "/signup", name: "SignUp", component: Signup },
    { path: "/login", name: "Login", component: Login },
  ],
});
