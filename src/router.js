import { createRouter, createWebHashHistory } from "vue-router";

import Home from "./views/Home.vue";
import Tasks from "./views/Tasks.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", name: "Home", component: Home, alias: "/" },
    { path: "/tasks", name: "Tasks", component: Tasks },
  ],
});
