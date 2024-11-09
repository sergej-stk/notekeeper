import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";

const app = createApp(App);

vuetify(app);

app.use(store).mount("#app");
