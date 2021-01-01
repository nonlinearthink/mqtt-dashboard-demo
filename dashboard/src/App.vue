<template>
  <div id="app">
    <!-- 侧边栏 -->
    <a-layout>
      <a-layout-sider
        collapsible
        breakpoint="lg"
        collapsed-width="0"
        width="180"
        :style="{ height: '100vh' }"
      >
        <!-- 网站 Logo -->
        <div :style="{ color: 'white', textAlign: 'center' }">
          <a-icon
            type="slack-circle"
            theme="filled"
            :style="{ fontSize: '2rem', margin: '1rem 0 0.25rem' }"
          />
          <div :style="{ fontSize: '1.2rem', margin: '0.25rem 0 1rem' }">
            Dashboard
          </div>
        </div>
        <!-- 导航 -->
        <a-menu
          theme="dark"
          mode="inline"
          :default-selected-keys="[layout.routeMenu[0].id]"
        >
          <a-menu-item v-for="item in layout.routeMenu" :key="item.id">
            <router-link :to="item.to">
              <a-icon :type="item.icon" />{{ item.title }}
            </router-link>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
    </a-layout>
    <a-layout>
      <a-layout-header></a-layout-header>
      <a-layout-content></a-layout-content>
      <a-layout-footer> Copyright © nonlinearthink<br /> </a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class App extends Vue {
  layout = {
    routeMenu: [
      { id: 1, title: "温湿度监控", to: "/", icon: "project" },
      { id: 3, title: "调色盘", to: "/palette", icon: "dashboard" },
      { id: 2, title: "屏幕消息", to: "/message", icon: "mobile" }
    ]
  };
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
