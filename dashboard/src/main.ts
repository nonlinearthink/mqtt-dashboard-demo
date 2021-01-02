import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// ant design
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.use(Antd);

// 颜色选择器
// import vcolorpicker from "vcolorpicker";
// Vue.use(vcolorpicker);

import "default-passive-events";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
