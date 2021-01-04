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
        <a-menu theme="dark" mode="inline" :selected-keys="selectedKeys">
          <!-- 路由导航 -->
          <a-menu-item v-for="item in layout.routeMenu" :key="item.id">
            <router-link :to="item.to">
              <a-icon :type="item.icon" />{{ item.title }}
            </router-link>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <!-- 网页头部 -->
        <a-layout-header :style="{ padding: 0 }">
          <!-- 显示连接状态 -->
          <status-point
            :type="isConnected ? 'success' : 'danger'"
            :text="isConnected ? '连接成功' : '未连接'"
          />
          <!-- 连接按钮 -->
          <a-button
            class="primary-button"
            type="primary"
            :disabled="isConnected"
            @click="connect"
          >
            连接
          </a-button>
          <!-- 断开连接按钮 -->
          <a-button
            class="primary-button"
            type="primary"
            :disabled="!isConnected"
            @click="disconnect"
          >
            断开连接
          </a-button>
          <!-- 打开设置按钮 -->
          <a-icon
            type="setting"
            class="setting-button"
            :style="{ color: 'white', fontSize: '1.2rem', margin: '1.3rem' }"
            @click="drawerVisible = true"
          />
        </a-layout-header>
        <a-layout-content :style="{ margin: '1.5rem 1rem 0' }">
          <div
            :style="{ padding: '1.5rem', background: '#fff', height: '100%' }"
          >
            <router-view />
          </div>
        </a-layout-content>
        <!-- 网页尾部 -->
        <a-layout-footer :style="{ textAlign: 'center' }">
          Copyright © nonlinearthink<br />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <a-drawer
      title="MQTT连接参数设置"
      placement="right"
      :closable="false"
      :width="400"
      :visible="drawerVisible"
      @close="drawerVisible = false"
    >
      <a-form-model
        :model="form"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
      >
        <a-form-model-item label="地址">
          <a-input v-model="form.host" />
        </a-form-model-item>
        <a-form-model-item label="端口号">
          <a-input v-model="form.port" />
        </a-form-model-item>
        <a-form-model-item label="路径">
          <a-input v-model="form.path" />
        </a-form-model-item>
        <a-form-model-item label="用户名">
          <a-input v-model="form.username" />
        </a-form-model-item>
        <a-form-model-item label="密码">
          <a-input v-model="form.password" type="password" />
        </a-form-model-item>
        <a-form-model-item label="Qos">
          <a-select default-value="0" style="width: 100%" @change="disconnect">
            <a-select-option value="0">
              0 (最多一次)
            </a-select-option>
            <a-select-option value="1">
              1 (最少一次)
            </a-select-option>
            <a-select-option value="2">
              2 (有且只有一次)
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
      <!-- 底部按钮 -->
      <div
        class="bottom-fixed-item"
        :style="{
          borderTop: '1px solid #e8e8e8',
          padding: '0.8rem 1rem',
          textAlign: 'right'
        }"
      >
        <a-button style="marginRight: 1rem" @click="onCloseSetting">
          取消
        </a-button>
        <a-button type="primary" @click="onEditSetting">
          修改
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
// constant
import { MqttConnectStatus, MqttQos } from "./constant/index";
import { FormModel, EspData, Color } from "./types";
// 自定义组件
import StatusPoint from "./components/StatusPoint.vue";
import type from "./store/mutation-type";
import mqtt from "mqtt";
import { Uint8ArrayToString } from "./util/uint2string";

@Component({
  components: {
    StatusPoint
  }
})
export default class App extends Vue {
  @State("status") status!: MqttConnectStatus;
  @State("host") host!: string;
  @State("port") port!: number;
  @State("path") path!: string;
  @State("username") username!: string;
  @State("password") password!: string;
  @State("color") color!: Color;
  @State("message") message!: string;
  private layout = {
    routeMenu: [
      { id: "1", title: "温湿度监控", to: "/", icon: "line-chart" },
      { id: "2", title: "调色盘", to: "/palette", icon: "dashboard" },
      { id: "3", title: "屏幕消息", to: "/message", icon: "mobile" },
      { id: "4", title: "历史记录", to: "/statistic", icon: "profile" }
    ]
  };
  private drawerVisible = false;
  private form!: FormModel;
  private client!: mqtt.Client;
  private qos = MqttQos.AtMostOnce;
  @Mutation(type.UPDATE_SETTING) updateSetting!: Function;
  @Mutation(type.SET_STATUS) setStatus!: Function;
  @Mutation(type.PUSH_ESP_DATA) pushEspData!: Function;
  @Mutation(type.SET_MESSAGE) setMessage!: Function;
  created() {
    this.setStatus(MqttConnectStatus.Hanging);
    this.form = new FormModel(
      this.host,
      this.port,
      this.path,
      this.username,
      this.password
    );
  }
  public get isConnected(): boolean {
    return this.status == MqttConnectStatus.Connected;
  }
  public get selectedKeys(): string[] {
    return this.layout.routeMenu
      .filter(item => item.to == this["$route"].path)
      .map(item => item.id);
  }
  @Watch("color")
  public publishColor(value: Color): void {
    if (this.isConnected) {
      const colorTopic = "ZUCC-ZXJ/rgb";
      try {
        this.client.publish(colorTopic, JSON.stringify(value), {
          qos: this.qos
        });
        this["$message"].success({ content: "同步成功!", duration: 1 });
      } catch (e) {
        this["$message"].error({ content: "同步失败", duration: 1 });
      }
    } else {
      this["$message"].error({ content: "未连接MQTT", duration: 1 });
    }
  }
  @Watch("message")
  public publishMessage(value: string): void {
    if (value == "") {
      return;
    }
    if (this.isConnected) {
      const colorTopic = "ZUCC-ZXJ/oled";
      try {
        this.client.publish(colorTopic, JSON.stringify({ msg: value }), {
          qos: this.qos
        });
        this["$message"].success({ content: "发送成功!", duration: 1 });
      } catch (e) {
        this["$message"].error({ content: "发送失败", duration: 1 });
      }
    } else {
      this["$message"].error({ content: "未连接MQTT", duration: 1 });
    }
    this.setMessage("");
  }
  public onCloseSetting(): void {
    this.form.host = this.host;
    this.form.port = this.port;
    this.form.path = this.path;
    this.form.username = this.username;
    this.form.password = this.password;
    this.drawerVisible = false;
  }
  public onEditSetting(): void {
    this.updateSetting(this.form);
    this.drawerVisible = false;
    this["$message"].success({ content: "修改成功!", duration: 1 });
  }
  public connect(): void {
    const clientId = `mqttjs_${Math.random()
      .toString(16)
      .substr(2, 8)}`;
    const options = {
      clientId,
      username: this.username,
      password: this.password
    };
    const connectUrl = `ws://${this.host}:${this.port}${this.path}`;
    try {
      this.client = mqtt.connect(connectUrl, options);
      let connecting = true;
      setTimeout(() => {
        if (connecting == true) {
          this["$message"].error({ content: "连接超时!", duration: 1 });
          connecting = false;
          this.client.end();
        }
      }, 5000);
      this.client.on("connect", () => {
        connecting = false;
        this.setStatus(MqttConnectStatus.Connected);
        this["$notification"].open({
          message: "连接成功",
          description: `欢迎，${this.username}～。`
        });
        this.onConnected();
      });
    } catch (e) {
      this["$message"].error({ content: e, duration: 1 });
      this.setStatus(MqttConnectStatus.Hanging);
    }
  }
  public disconnect(): void {
    if (this.status == MqttConnectStatus.Connected) {
      this.setStatus(MqttConnectStatus.Hanging);
      this["$notification"].open({
        message: "连接断开",
        description: `检查到你更改了Qos，请重新连接！`
      });
      this.client.end(true);
    }
  }
  public onConnected(): void {
    const espTopic = "ZUCC-ZXJ/esp";

    this.client.subscribe(
      espTopic,
      {
        qos: this.qos
      },
      err => {
        if (err) {
          console.log(err);
          this["$message"].error({
            content: `订阅初始化失败`,
            duration: 1
          });
        } else {
          this["$notification"].open({
            message: "ZUCC-ZXJ/esp",
            description: `欢迎订阅～`
          });
        }
      }
    );
    this.client.on("message", (espTopic, payload, packet) => {
      const convertedData: EspData = JSON.parse(Uint8ArrayToString(payload));
      console.log(convertedData);
      console.log(packet);
      this.pushEspData(convertedData);
    });
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.ant-layout-header {
  text-align: right;
  .primary-button {
    margin: 1rem;
  }
  .setting-button {
    &:hover {
      cursor: pointer;
    }
  }
}
.bottom-fixed-item {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
