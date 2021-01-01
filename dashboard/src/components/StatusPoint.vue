<template>
  <div class="status-point">
    <span class="point" :style="{ background: color }" />
    <slot name="text">
      <span class="text" :style="{ color }">{{ text }}</span>
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
enum StatusColor {
  Default = "#888888",
  Success = "yellowgreen",
  Warning = "orange",
  Danger = "orangered"
}
@Component
export default class StatusPoint extends Vue {
  @Prop({ required: true, default: "" })
  type!: string;
  @Prop()
  text?: string;
  public get color(): string {
    switch (this.type) {
      case "success":
        return StatusColor.Success;
      case "warning":
        return StatusColor.Warning;
      case "danger":
        return StatusColor.Danger;
      default:
        return StatusColor.Default;
    }
  }
}
</script>

<style lang="scss" scoped>
.status-point {
  display: inline-block;
  margin: 0 0.5rem;
  .point {
    display: inline-block;
    height: 0.5rem;
    width: 0.5rem;
    border-radius: 50%;
  }
  .text {
    display: inline-block;
    margin-left: 0.5rem;
  }
}
</style>
