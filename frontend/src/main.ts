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
  datetimeFormats: {
    en: {
      short: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      },
      long: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      },
    },
    de: {
      short: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      },
      long: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      },
    },
  },
});

vuetify(app);
app.use(i18n);
app.use(store).mount("#app");
