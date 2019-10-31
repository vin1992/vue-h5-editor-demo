import Vue from "vue";
import ElementUI from "element-ui";
import App from "./App.vue";
import router from "./routes";
import registerCom from "@fe/builder-components";
import "element-ui/lib/theme-chalk/index.css";
// debugger;
registerCom(Vue);
Vue.use(ElementUI);
console.log(registerCom);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#root");
