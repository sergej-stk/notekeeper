<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { useMainStore } from "./store/mainStore";
import { getUserPicture } from "./middleware/UserManager";
import { storeToRefs } from "pinia";

const mainStore = useMainStore();

const userPicture = ref<string>("");

function toggleTheme() {
  mainStore.theme = mainStore.theme === "dark" ? "light" : "dark";
}

function logout() {
  mainStore.token = null;
  mainStore.user = null;
  mainStore.logout();
}

async function loadUserPicture(username: string) {
  userPicture.value = URL.createObjectURL(await getUserPicture(username));
}

const isLoggedIn = computed(() => {
  return mainStore.token !== null && mainStore.user !== null;
});

const { selectedUser } = storeToRefs(mainStore);

watch(selectedUser, () => {
  if (selectedUser.value === null) {
    return;
  }
  loadUserPicture(selectedUser.value?.username);
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

    <v-navigation-drawer
      v-if="
        (mainStore.token !== null && mainStore.selectingUser === true) ||
        mainStore.selectedUser !== null
      "
      location="right"
      permanent
    >
      <template v-slot:prepend>
        <v-list-item
          lines="two"
          :prepend-avatar="userPicture"
          :subtitle="mainStore.selectedUser?.username"
          :title="mainStore.selectedUser?.fullName"
        ></v-list-item>
      </template>

      <v-divider></v-divider>

      <!--<v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-home-city"
          title="Home"
          value="home"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account"
          title="My Account"
          value="account"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-group-outline"
          title="Users"
          value="users"
        ></v-list-item>
      </v-list>-->
    </v-navigation-drawer>

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
