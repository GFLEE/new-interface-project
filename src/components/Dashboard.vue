<template>
  <a-layout id="components-layout-demo-top-side">
    <a-layout-content style="padding: 0 50px">
      <!-- <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
      </a-breadcrumb> !-->
      <a-layout style="padding: 24px 0; background: #fff">
        <a-layout-sider width="200" style="background: #fff">
          <a-menu
            mode="inline"
            :default-selected-keys="['1']"
            :default-open-keys="['Setting']"
            style="height: 100%"
          >
            <a-sub-menu key="Setting">
              <span slot="title"><a-icon type="setting" />系统管理</span>

              <a-menu-item key="BoundQuery">
                <router-link to="/dashboard/workplace/BoundQuery">
                  <a-icon type="schedule" />
                  <span>出/入库查询</span>
                </router-link>
              </a-menu-item>

              <a-menu-item key="Production">
                <router-link to="/dashboard/workplace/Production">
                  <a-icon type="schedule" />
                  <span>产量查询</span>
                </router-link>
              </a-menu-item>

              <a-menu-item key="BerthBoard">
                <router-link to="/dashboard/workplace/BerthBoard">
                  <a-icon type="schedule" />
                  <span>备货位看板</span>
                </router-link>
              </a-menu-item>
              <a-menu-item key="SignalRTest">
                <router-link to="/dashboard/workplace/SignalRTest">
                  <a-icon type="android" />
                  <span>出库口看板</span>
                </router-link>
              </a-menu-item>

              <a-menu-item key="Stock">
                <router-link to="/dashboard/workplace/Stock">
                  <a-icon type="cloud-sync" />
                  <span>库存查看</span>
                </router-link>
              </a-menu-item>
              <a-menu-item key="ProductPlan">
                <router-link to="/dashboard/workplace/ProductPlan">
                  <a-icon type="snippets" />
                  <span>生产计划单</span>
                </router-link>
              </a-menu-item>
              <a-menu-item key="LogTab">
                <router-link to="/dashboard/workplace/LogTab">
                  <a-icon type="schedule" />
                  <span>日志查看</span>
                </router-link>
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3">
              <span slot="title"><a-icon type="tool" />系统工具</span>
              <a-menu-item key="EntityTool">
                <router-link to="/EntityTool">
                  <a-icon type="schedule" />
                  <span>实体工具</span>
                </router-link>
              </a-menu-item>
              <a-menu-item key="ThreeJs">
                <router-link to="/dashboard/workplace/ThreeJs">
                  <a-icon type="snippets" />
                  <span>ThreeJs</span>
                </router-link>
              </a-menu-item>
              <a-menu-item key="11">
                option11
              </a-menu-item>
              <a-menu-item key="12">
                option12
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
          <div>
            <router-view></router-view>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center"> </a-layout-footer>
  </a-layout>
</template>

<style>
#components-layout-demo-top-side .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
,
.loading {
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
}
</style>
