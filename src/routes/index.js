import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

console.log(() => import("../view/main"), "router");

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/main/:pid",
      name: "main",
      component: () => import("../view/main"),
      props: route => {
        config: route.params.id;
      }
    },
    {
      path: "/preview",
      name: "preview",
      component: () => import("../view/preview")
    },
    {
      path: "/",
      name: "list",
      component: () => import("../view/list")
    }
  ]
});

export default router;
