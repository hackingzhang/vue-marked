import type { App } from "vue";

import VueMarked from "./VueMarked.vue";

export default {
  install(app: App) {
    app.component("VueMarked", VueMarked);
  },
};
