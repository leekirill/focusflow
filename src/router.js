import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("./views/Home.vue"),
      alias: "/",
    },
    {
      path: "/tasks",
      name: "Tasks",
      component: () => import("./views/Tasks.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/contacts",
      name: "Contacts",
      component: () => import("./views/Contacts.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/signup",
      name: "Signup",
      component: () => import("./views/Signup.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("./views/Login.vue"),
    },
  ],
});

export default router;
