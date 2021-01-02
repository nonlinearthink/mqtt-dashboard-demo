<template>
  <div id="home-page">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="仪表盘模式">
        <a-row :style="{ margin: '1.5rem' }">
          温度精度范围:
          <a-slider
            range
            :marks="temperatureMarks"
            :default-value="[0, 37]"
            @change="onTemperatureChange"
          />
        </a-row>
        <a-row :style="{ margin: '1.5rem' }">
          湿度精度范围:
          <a-slider
            range
            :marks="humidityMarks"
            :default-value="[0, 100]"
            @change="onTemperatureChange"
          />
        </a-row>
        <v-chart :options="gauge" autoresize />
      </a-tab-pane>
      <a-tab-pane key="2" tab="折线图模式"> </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VChart from "vue-echarts";
import "echarts/lib/chart/gauge";
import "echarts/lib/component/tooltip";
@Component({
  components: {
    VChart
  }
})
export default class HomePage extends Vue {
  private gauge = {
    tooltip: {
      formatter: "{a}<br/>{c}°C"
    },
    series: [
      {
        name: "温度",
        type: "gauge",
        center: ["25%", "30%"],
        radius: "50%",
        min: 0,
        max: 37,
        detail: { formatter: "{value}­°C" },
        data: [{ value: 50.3, name: "当前温度" }]
      },
      {
        name: "湿度",
        type: "gauge",
        center: ["75%", "30%"],
        radius: "50%",
        min: 0,
        max: 100,
        detail: { formatter: "{value}­%" },
        data: [{ value: 50.3, name: "当前湿度" }]
      }
    ]
  };
  private temperatureMarks = {
    0: {
      style: { color: "#1989fa", fontWeight: 900 },
      label: "0°C"
    },
    37: "37°C",
    100: {
      style: { color: "#f50", fontWeight: 900 },
      label: "100°C"
    }
  };
  private humidityMarks = {
    0: {
      style: { color: "#1989fa", fontWeight: 900 },
      label: "0%"
    },
    100: {
      style: { color: "#f50", fontWeight: 900 },
      label: "100%"
    }
  };
  created() {
    setInterval(() => {
      this.gauge.series[0].data[0].value = Number(
        (Math.random() * 100).toFixed(2)
      );
      this.gauge.series[1].data[0].value = Number(
        (Math.random() * 100).toFixed(2)
      );
    }, 2000);
  }
  public onTemperatureChange(value: number[]): void {
    this.gauge.series[0].min = value[0];
    this.gauge.series[0].max = value[1];
  }
}
</script>

<style lang="scss" scoped>
#home-page {
  width: 100%;
  height: 100%;
}
.echarts {
  width: 100%;
  height: 100%;
}
.ant-tabs-tabpane {
  height: 70vh;
}
.ant-tabs {
  height: 100%;
}
</style>
