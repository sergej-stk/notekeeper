import { User } from "@/types";
import { defineStore } from "pinia";

type MainStore = {
  theme: "light" | "dark";
  user: User | null;
  token: string | null;
};

export const useMainStore = defineStore("mainStore", {
  state: (): MainStore => {
    return {
      theme: "light",
      user: null,
      token: null,
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
