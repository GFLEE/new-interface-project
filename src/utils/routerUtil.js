// import deepMerge from 'deepmerge'
// import {mergeI18nFromRoutes} from '@/utils/i18n'

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
function loadRoutes() {




}

export { setAppOptions, getI18nKey, formatRoutes, loadRoutes };
