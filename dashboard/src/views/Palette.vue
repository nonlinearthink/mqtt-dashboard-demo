<template>
  <div id="palette-page">
    <a-row type="flex" justify="end" align="top">
      <a-button type="primary" icon="redo" @click="onSyncColor">
        同步到ESP8266
      </a-button>
    </a-row>
    <color-picker
      :color="color"
      @changeColor="changeColor"
      :style="{ margin: '0', position: 'absolute', left: '50%', top: '25%' }"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Mutation } from "vuex-class";
import type from "../store/mutation-type";
import ColorPicker from "@caohenghu/vue-colorpicker";

@Component({
  components: {
    ColorPicker
  }
})
export default class PalettePage extends Vue {
  private color = "#59c7f9";
  private red = 0;
  private green = 0;
  private blue = 0;
  @Mutation(type.SET_COLOR) setColor!: Function;
  // eslint-disable-next-line
  public changeColor(color: any): void {
    console.log(color);
    this.red = color.rgba.r;
    this.green = color.rgba.g;
    this.blue = color.rgba.b;
  }
  public onSyncColor(): void {
    this.setColor({ red: this.red, green: this.green, blue: this.blue });
  }
}
</script>

<style lang="scss" scoped>
.palette-page {
  height: 100%;
  width: 100%;
}
</style>
