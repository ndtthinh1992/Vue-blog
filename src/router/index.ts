import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

const HomePage = () => import("@/views/Home.vue");
const Table = () => import("@/views/Table.vue");

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/Table",
    name: "Table",
    component: Table,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
