import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import HelloWorld from '@/components/HelloWorld'
import Redis from '@/components/Redis'
import MQView from '@/components/MQView'
import SignalRTest from '@/components/SignalRTest'
import EntityTool from '@/components/EntityTool'
import defaultSettings from '@/settings'
// const _import = require('./_import_' + process.env.NODE_ENV) // 获取组件的方法

Vue.use(Router)

 export default new Router({

  routes:[{

    path:'/',
    name:'Dashboard',
    component:Dashboard,
    children: [
      { 
        path: 'MQView',
        name:'MQView',
        component: MQView
      }, 
      { 
        path: 'HelloWorld',
        name:'HelloWorld',
        component: HelloWorld
      }, 
      { 
        path: 'SignalRTest',
        name:'SignalRTest',
        component: SignalRTest
      } 
      , { 
        path: 'Redis',
        name:'Redis',
        component: Redis
      },
      { 
        path: 'EntityTool',
        name:'EntityTool',
        component: EntityTool
      },  
    ]

  }, 

]

 })

 