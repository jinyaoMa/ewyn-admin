import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import constants from "./constants";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.config.productionTip = false;

Vue.prototype.constants = constants;

Vue.use(Element);
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
