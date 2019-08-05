import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

console.log(() => import("../view/main"), "router");

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("../view/main")
    },
    {
      path: "/preview",
      name: "preview",
      component: () => import("../view/preview")
    }
  ]
});

export default router;
