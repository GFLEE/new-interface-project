import Vue from "vue";
import App from "./App";
import { initVueRouter } from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css"; // 引入的样式文件
import store from "./store";
import Vuex from "vuex";
import { initI18n } from "@/utils/i18n";
import signalR from "@/utils/signalR";
import Plugins from "@/plugins";
import Viser from "viser-vue";
import bootstrap from "@/bootstrap";


Vue.prototype.sendMsg = signalR.sendMsg;
Vue.use(Antd);
Vue.use(Vuex);
Vue.use(Plugins);
Vue.use(Viser);

Vue.config.productionTip = false;
Vue.config.devtools = false;

const i18n = initI18n("CN", "US"); 

// const is_async =store.state.setting.asyncRoutes;
// console.log(is_async)

const router = initVueRouter(false);

bootstrap({router, store, i18n, message: Vue.prototype.$message})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
