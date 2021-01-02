<template>
  <div id="palette-page">
    <a-row type="flex" justify="end" align="top">
      <a-button type="primary" icon="redo">同步到ESP8266</a-button>
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
import ColorPicker from "@caohenghu/vue-colorpicker";
@Component({
  components: {
    ColorPicker
  }
})
export default class PalettePage extends Vue {
  private color = "#59c7f9";
  // eslint-disable-next-line
  public changeColor(color: any): void {
    console.log(color);
    const {
      rgba: { r, g, b, a }
    } = color;
    console.log(`rgba(${r}, ${g}, ${b}, ${a})`);
  }
}
</script>

<style lang="scss" scoped>
.palette-page {
  height: 100%;
  width: 100%;
}
</style>
