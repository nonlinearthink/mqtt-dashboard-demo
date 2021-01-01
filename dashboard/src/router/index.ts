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
    path: "/connect",
    name: "Connect",
    component: () => import("../views/Connect.vue")
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
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
