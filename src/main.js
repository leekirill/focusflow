import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";

import "./styles.scss";
import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

console.log(PrimeVue);

createApp(App).use(PrimeVue).mount("#app");
