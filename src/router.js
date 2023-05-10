import { createRouter, createWebHashHistory } from "vue-router";
import { auth } from "./firebase/init";
import { onAuthStateChanged } from "firebase/auth";

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

const getCurrentUser = () => {
  return new Promise((res, rej) => {
    const removeListener = onAuthStateChanged(
      auth,
      (user) => {
        removeListener();
        res(user);
      },
      rej
    );
  });
};

router.beforeEach(async (to, from, next) => {
  const currentUser = await getCurrentUser();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
