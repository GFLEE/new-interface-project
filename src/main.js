// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css' // 引入的样式文件
import store from './store'
import Vuex from 'vuex'
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/github.css' //样式文件
import {initI18n} from '@/utils/i18n'
import signalR from './utils/signalR'

const i18n = initI18n('CN', 'US')


Vue.prototype.sendMsg = signalR.sendMsg
Vue.use(Antd)
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueHighlightJS)

Vue.config.productionTip = false
Vue.config.devtools = false

  
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  setTimeout(() =>{
      blocks.forEach((block)=>{
      hljs.highlightBlock(block)
      })
  }, 200)
})



new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')