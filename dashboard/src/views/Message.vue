<template>
  <div id="message-page">
    <a-row type="flex">
      <a-col :style="{ flex: 1 }">
        <a-input placeholder="输入想要发送的文本" size="large" v-model="text">
          <a-tooltip slot="suffix" title="使用 ZUCC-ZXJ/oled">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
      </a-col>
      <a-col :style="{ flex: 0 }">
        <a-button type="primary" size="large" block @click="onSend">
          发送到ESP8266
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Mutation } from "vuex-class";
import type from "../store/mutation-type";
@Component
export default class MessagePage extends Vue {
  private text = "";
  @Mutation(type.SET_MESSAGE) setMessage!: Function;
  public onSend(): void {
    if (this.text == "") {
      this["$message"].error({
        content: `未输入文本`,
        duration: 1
      });
    } else if (this.text.match(/[\u4e00-\u9fa5]/) != null) {
      this["$message"].error({
        content: `暂不支持中文`,
        duration: 1
      });
    } else {
      this.setMessage(this.text);
    }
  }
}
</script>

<style lang="scss" scoped></style>
