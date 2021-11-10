import TabsView from "@/layouts/tabs/TabsView";
import BlankView from "@/layouts/BlankView";
// import PageView from '@/layouts/PageView'

// 路由配置
const options = {
  routes: [
    {
      path: "/login",
      name: "登录页",
      component: () => import("@/pages/login")
    },
    {
      path: "*",
      name: "404",
      component: () => import("@/pages/exception/404")
    },
    {
      path: "/403",
      name: "403",
      component: () => import("@/pages/exception/403")
    },
    {
      path: "/",
      name: "首页",
      component: TabsView,
      redirect: "/login",
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          meta: {
            icon: "dashboard"
          },
          component: BlankView,
          children: [
            {
              path: "workplace",
              name: "工作台",
              meta: {
                page: {
                  closable: false
                }
              },
              //component: () => import('@/pages/dashboard/workplace'),
              component: () => import("../components/Dashboard"),
              children: [
                {
                  path: "BerthBoard",
                  name: "BerthBoard",
                  component: () => import("../components/BerthBoard")
                },
                {
                  path: "SignalRTest",
                  name: "SignalRTest",
                  component: () => import("../components/SignalRTest")
                },
                {
                  path: "LogTab",
                  name: "LogTab",
                  component: () => import("../components/LogTab")
                },
                {
                  path: "Stock",
                  name: "Stock",
                  component: () => import("../components/Stock")
                },
                {
                  path: "BoundQuery",
                  name: "BoundQuery",
                  component: () => import("../components/BoundQuery")
                },
                {
                  path: "Production",
                  name: "Production",
                  component: () => import("../components/Production")
                },
                {
                  path: "ProductPlan",
                  name: "ProductPlan",
                  component: () => import("../components/ProductPlan")
                }
                // {
                //   path: "ThreeJs",
                //   name: "ThreeJs",
                //   component: () => import("../components/ThreeJs")
                // }
              ]
            }
          ]
        },
        {
          path: "exception",
          name: "异常页",
          meta: {
            icon: "warning"
          },
          component: BlankView,
          children: [
            {
              path: "404",
              name: "Exp404",
              component: () => import("@/pages/exception/404")
            },
            {
              path: "403",
              name: "Exp403",
              component: () => import("@/pages/exception/403")
            },
            {
              path: "500",
              name: "Exp500",
              component: () => import("@/pages/exception/500")
            }
          ]
        }
      ]
    }
  ]
};

export default options;
