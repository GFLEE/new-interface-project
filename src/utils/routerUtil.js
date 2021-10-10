// import routerMap from "@/router/async/router.map";
import { mergeI18nFromRoutes } from "@/utils/i18n";
// import Router from "vue-router";
// import deepMerge from 'deepmerge'
// import basicOptions from "@/router/async/config.async";

//-------------应用配置---------
let appOptions = {
  router: undefined,
  i18n: undefined,
  store: undefined
};

function setAppOptions(options) {
  const { router, i18n, store } = options;
  appOptions.router = router;
  appOptions.i18n = i18n;
  appOptions.store = store;
}
//-----------------------------
///@desc   从路由解析path
///@param  路径
///@return 拼接的字符串
function getI18nKey(path) {
  const keys = path
    .split("/")
    .filter(item => !item.startsWith(":") && item != "");
  keys.push("name");
  return keys.join(".");
}

/**
 * 格式化路由
 * 2021/08/26
 * @param routes 路由配置
 */
function formatRoutes(routes) {
  routes.forEach(route => {
    const { path } = route;
    if (!path.startsWith("/") && path !== "*") {
      route.path = "/" + path;
    }
  });
  //formatAuthority(routes);
}

/**
 * 加载路由，由bootstrap调用
 */
function loadRoutes(routesConfig) {
  const { router, store, i18n } = appOptions;
  // 如果 routesConfig 有值，则更新到本地，否则从本地获取
  if (routesConfig) {
    store.commit("account/setRoutesConfig", routesConfig);
  } else {
    routesConfig = store.getters["account/routesConfig"];
  }
  const asyncRoutes = store.state.setting.asyncRoutes;

  //todo: 加载异步路由配置
  if (asyncRoutes) {
    console("加载异步路由配置");
  }
  // 提取路由国际化数据
  mergeI18nFromRoutes(i18n, router.options.routes);
  // 初始化后台菜单数据
  const rootRoute = router.options.routes.find(item => item.path === "/");
  const menuRoutes = rootRoute && rootRoute.children;
  if (menuRoutes) {
    store.commit("setting/setMenuData", menuRoutes);
  }
}

export { setAppOptions, getI18nKey, formatRoutes, loadRoutes };
 