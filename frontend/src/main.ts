import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { createI18n } from "vue-i18n";
import de from "./lang/de";
import en from "./lang/en";

const app = createApp(App);

const i18n = createI18n({
  locale: "de",
  fallbackLocale: "de",
  messages: {
    de,
    en,
  },
});

vuetify(app);
app.use(i18n);
app.use(store).mount("#app");
