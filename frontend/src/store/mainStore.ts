import { getUser } from "@/middleware/UserManager";
import { User } from "@/shared/gen/ts/proto/user_service";
import { User as OldUser } from "@/types";
import { defineStore } from "pinia";
import { Router } from "vue-router";

type MainStore = {
  theme: "light" | "dark";
  user: OldUser | null;
  token: string | null;
  router: Router | null;
  selectingUser: boolean;
  selectedUser: User | null;
};

export const useMainStore = defineStore("mainStore", {
  state: (): MainStore => {
    return {
      theme: "light",
      user: null,
      token: null,
      router: null,
      selectingUser: false,
      selectedUser: null,
    };
  },
  actions: {
    setToken(token: string) {
      this.user = {
        id: 0,
        username: token,
      };
      this.token = token;
    },
    async selectUser(username: string) {
      this.selectingUser = true;
      const response = await getUser(username);
      this.selectedUser = response?.user ?? null;
    },
    logout() {
      this.token = null;
      this.user = null;
      this.router?.push("/auth");
    },
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  getters: {
    getTheme: (state): "light" | "dark" => state.theme,
  },

  persist: {
    storage: localStorage,
  },
});
