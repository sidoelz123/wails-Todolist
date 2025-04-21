import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers";
import { createPinia } from "pinia";
import "./style.css";

import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(Vue3Toastify, {
  position: "top-right",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
} as ToastContainerOptions);
app.mount("#app");
