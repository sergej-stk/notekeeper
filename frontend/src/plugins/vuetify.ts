import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";
import { App } from "vue";

export default (app: App) => {
  const vuetify = createVuetify({
    directives,
    components,
  });
  app.use(vuetify);
};
