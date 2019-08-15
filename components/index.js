const registerCom = Vue => {
  Vue.component("c-button", () => import("./Button"));
  Vue.component("c-image", () => import("./Image"));
  Vue.component("c-article", () => import("./Article"));
  Vue.component("c-container", () => import("./Container"));
};

module.exports = registerCom;
