<script setup lang="ts">
import { computed } from "vue";

import { useMainStore } from "./store/mainStore";

const mainStore = useMainStore();

function toggleTheme() {
  mainStore.theme = mainStore.theme === "dark" ? "light" : "dark";
}

function logout() {
  mainStore.token = null;
  mainStore.user = null;
}

const isLoggedIn = computed(() => {
  return mainStore.token !== null && mainStore.user !== null;
});
</script>

<template>
  <v-app :theme="mainStore.theme">
    <v-app-bar :elevation="2">
      <v-app-bar-title>Application Bar</v-app-bar-title>
      <template v-slot:append v-if="isLoggedIn">
        <v-btn icon="mdi-theme-light-dark" @click="toggleTheme"></v-btn>
        <v-btn icon="mdi-account">
          <v-icon icon="mdi-account"></v-icon>
          <v-menu activator="parent">
            <v-list>
              <v-list-item @click="logout">{{
                $t("general.logout")
              }}</v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style lang="scss">
#app {
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  //-webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  //color: #2c3e50;
}

.element {
  border: 1px solid black;
  margin-bottom: 5px;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
