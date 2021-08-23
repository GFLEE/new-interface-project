<template>
  <a-layout id="components-layout-demo-top-side">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['2']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">
          
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout style="padding: 24px 0; background: #fff">
        <a-layout-sider width="200" style="background: #fff">
          <a-menu
            mode="inline"
            :default-selected-keys="['1']"
            :default-open-keys="['sub1']"
            style="height: 100%"
          >
            <a-sub-menu key="Setting">
              <span slot="title"><a-icon type="setting" />系统管理</span>
              <a-menu-item key="MQView">
               <router-link to="/MQView">
                <a-icon type="aliwangwang"/>
                <span>RabbitMQ</span>
              </router-link>
              </a-menu-item>
              <a-menu-item key="Redis">
                 <router-link to="/Redis">
                <a-icon type="cloud-server"/>
                <span>Redis</span>
              </router-link>
              </a-menu-item>
              <a-menu-item key="HelloWorld">
              <router-link to="/HelloWorld">
                <a-icon type="android" />
                <span>HelloWorld</span>
              </router-link>             
                </a-menu-item>
            
              <a-menu-item key="SignalRTest">
                 <router-link to="/SignalRTest">
                <a-icon type="android" />

                <span>SignalR测试</span>
              </router-link>  
              </a-menu-item>

            </a-sub-menu>
            <a-sub-menu key="sub2">
              <span slot="title"><a-icon type="laptop" />subnav 2</span>
              <a-menu-item key="5">
                option5
              </a-menu-item>
              <a-menu-item key="6">
                option6
              </a-menu-item>
              <a-menu-item key="7">
                option7
              </a-menu-item>
              <a-menu-item key="8">
                option8
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
              <a-menu-item key="10">
                option10
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
        <div >
          <router-view></router-view>
        </div>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
    </a-layout-footer>
 
 

  </a-layout>
</template>

<style>
#components-layout-demo-top-side .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
},
.loading {
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
}
</style>
