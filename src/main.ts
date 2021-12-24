import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import router from "./router";
import store from "./store";
import "./styles/index.scss";

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
