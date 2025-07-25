import { createApp } from "vue";

import "./style.css";

import App from "./App.vue";
import { install as VueMarkedPlugin } from "../src/index";

const app = createApp(App);
app.use(VueMarkedPlugin);

app.mount("#app");
