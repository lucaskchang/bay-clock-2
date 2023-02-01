import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("pages/MainPage.vue"),
  },
  {
    path: "/timer",
    component: () => import("pages/TimerPage.vue"),
  },
  {
    path: "/schedule",
    component: () => import("pages/SchedulePage.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/404.vue"),
  },
];

export default routes;
