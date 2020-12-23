import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import mixin from "./mixin";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en";
import constants from "./constants";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.config.productionTip = false;

Vue.prototype.constants = constants;

Vue.use(Element, { locale });

axios.defaults.withCredentials = process.env.NODE_ENV === "development";
Vue.use(VueAxios, axios);

Vue.mixin(mixin);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
