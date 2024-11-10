import { User } from "@/types";
import { defineStore } from "pinia";

type MainStore = {
  theme: "light" | "dark";
  user?: User;
};

export const useMainStore = defineStore("mainStore", {
  state: (): MainStore => {
    return { theme: "light" };
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
