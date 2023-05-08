import { createRouter, createWebHashHistory } from "vue-router";

import Home from "./views/Home.vue";
import Tasks from "./views/Tasks.vue";
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", name: "Home", component: Home, alias: "/" },
    {
      path: "/tasks",
      name: "Tasks",
      component: Tasks,
      meta: {
        requiresAuth: true,
      },
    },
    { path: "/signup", name: "Signup", component: Signup },
    { path: "/login", name: "Login", component: Login },
  ],
});

// router.beforeEach((to, from, next) => {
//   if (to.name === "Tasks") {
//     next();
//   } else {
//     alert("No");
//   }
//   // if (to.matched.some((record) => record.meta.requiresAuth)) {
//   //   if (getAuth().currentUser) {
//   //     next();
//   //   } else {
//   //     alert("you dont have access");
//   //     next("/");
//   //   }
//   // }
// });

export default router;
