import Vue from "vue";
import App from "./App.vue";
import { initVueRouter } from "./router";
import "./theme/index.less";
import Antd from "ant-design-vue";
import Viser from "viser-vue";
import "@/mock";
import store from "./store";
import "animate.css/source/animate.css";
import Plugins from "@/plugins";
import { initI18n } from "@/utils/i18n";
import bootstrap from "@/bootstrap";
import "moment/locale/zh-cn"; 
import * as echarts from 'echarts';
 
Vue.use(Antd);
Vue.use(Plugins);
Vue.use(Viser);

Vue.config.productionTip = false;
Vue.config.devtools = false;
Vue.prototype.$echarts = echarts

const i18n = initI18n("CN", "US");

const router = initVueRouter(false);

bootstrap({ router, store, i18n, message: Vue.prototype.$message });

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
