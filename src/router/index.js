import Vue from "vue";
import Router from "vue-router";
import {formatRoutes} from "@/utils/routerUtil";

// import Dashboard from "@/components/Dashboard";
// import HelloWorld from "@/components/HelloWorld";
// import Redis from "@/components/Redis";
// import MQView from "@/components/MQView";
// import SignalRTest from "@/components/SignalRTest";
// import EntityTool from "@/components/EntityTool";
// import defaultSettings from "@/settings";

Vue.use(Router);

// 不需要登录拦截的路由配置
const loginIgnore = {
  names: ["404", "403"], //根据路由名称匹配
  paths: ["/login"], //根据路由fullPath匹配
  includes(route) {
    return this.names.includes(route.name) || this.paths.includes(route.path);
  }
};

// const _import = require('./_import_' + process.env.NODE_ENV) // 获取组件的方法

//初始化路由
function initVueRouter(isAsync) {
  const options = isAsync 
    ? require("./async/config.async").default
    : require("./config").default; //读取配置中的路由/异步异步路由
  formatRoutes(options.routes);
  return new Router(options);
}

export { loginIgnore, initVueRouter };
 
// export default new Router({
//   routes: [
//     {
//       path: "/",
//       name: "Dashboard",
//       component: Dashboard,
//       children: [
//         {
//           path: "MQView",
//           name: "MQView",
//           component: MQView
//         },
//         {
//           path: "HelloWorld",
//           name: "HelloWorld",
//           component: HelloWorld
//         },
//         {
//           path: "SignalRTest",
//           name: "SignalRTest",
//           component: SignalRTest
//         },
//         {
//           path: "Redis",
//           name: "Redis",
//           component: Redis
//         },
//         {
//           path: "EntityTool",
//           name: "EntityTool",
//           component: EntityTool
//         }
//       ]
//     }
//   ]
// });
