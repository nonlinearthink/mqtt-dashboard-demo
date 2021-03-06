import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/palette",
    name: "Palette",
    component: () => import("../views/Palette.vue")
  },
  {
    path: "/message",
    name: "Message",
    component: () => import("../views/Message.vue")
  },
  {
    path: "/message",
    name: "Message",
    component: () => import("../views/Message.vue")
  },
  {
    path: "/statistic",
    name: "Statistic",
    component: () => import("../views/Statistic.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
