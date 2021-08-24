import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css' // 引入的样式文件
import store from './store'
import Vuex from 'vuex'
import {initI18n} from '@/utils/i18n' 
import signalR from '@/utils/signalR'
import Highlight from '@/plugins/highlight';  

const i18n = initI18n('CN', 'US')

Vue.prototype.sendMsg = signalR.sendMsg
Vue.use(Antd)
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Highlight);

Vue.config.productionTip = false
Vue.config.devtools = false



new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')