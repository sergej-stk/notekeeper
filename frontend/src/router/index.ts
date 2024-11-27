import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TestView from "../views/TestView.vue";
import { useMainStore } from "@/store/mainStore";
import AuthView from "@/views/AuthView.vue";

type RouteMeta = {
  auth?: boolean;
};

type RouteRecord = RouteRecordRaw & {
  meta?: RouteMeta;
};

const routes: Array<RouteRecord> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      auth: true,
    },
  },
  {
    path: "/test",
    name: "test",
    component: TestView,
    meta: {
      auth: true,
    },
  },
  {
    path: "/auth",
    name: "auth",
    component: AuthView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const mainStore = useMainStore();
  if (to.matched.some((record) => record.meta?.auth ?? false)) {
    if (mainStore.user === null || mainStore.token === null) {
      next("/auth");
      return;
    }
  } else {
    if (mainStore.user !== null && mainStore.token === null) {
      next("/");
      return;
    }
  }
  next();
});

export default router;
