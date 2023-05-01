import { createApp } from "vue";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import router from "./router";
import App from "./App.vue";
// import "firebase/auth";
// import "firebase/firestore";

import "./styles.scss";
import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";

createApp(App).use(router).use(PrimeVue).use(ToastService).mount("#app");
