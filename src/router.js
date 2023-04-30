import { createRouter, createWebHashHistory } from "vue-router";

import AppRoute from "./components/AppRoute.vue";
import AppHeader from "./components/AppHeader.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/zabl", component: AppRoute },
    { path: "/header", component: AppHeader },
  ],
});
