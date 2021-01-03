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
            @change="onHumidityChange"
          />
        </a-row>
        <v-chart :options="gauge" autoresize />
      </a-tab-pane>
      <a-tab-pane key="2" tab="折线图模式">
        <highcharts :options="dynamicLine"></highcharts>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import VChart from "vue-echarts";
import "echarts/lib/chart/gauge";
import "echarts/lib/component/tooltip";
import moment from "moment";
import { EspData } from "../types";
@Component({
  components: {
    VChart
  }
})
export default class HomePage extends Vue {
  @State("esp") esp!: string[];
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
        data: [{ value: 0, name: "当前温度" }]
      },
      {
        name: "湿度",
        type: "gauge",
        center: ["75%", "30%"],
        radius: "50%",
        min: 0,
        max: 100,
        detail: { formatter: "{value}­%" },
        data: [{ value: 0, name: "当前湿度" }]
      }
    ]
  };
  private dynamicLine = {
    chart: {
      type: "spline"
    },
    title: {
      text: "温度湿度关系时间序列图"
    },
    subtitle: {
      text: "数据采集自ESP8266"
    },
    tooltip: {
      crosshairs: true,
      shared: true
    },
    series: [
      {
        name: "温度",
        data: [0]
      },
      {
        name: "湿度",
        data: [0]
      }
    ]
  };
  private get lastSevenDate() {
    const dateList = [];
    for (let i = 6; i >= 0; i--) {
      dateList.push(
        moment()
          .subtract(i * 2, "seconds")
          .format("HH:mm:ss")
      );
    }
    return dateList;
  }
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
  @Watch("esp")
  public updateDate(value: EspData[]): void {
    console.log("esp update");
    console.log(value);
    const { temperature, humidity } = value[value.length - 1];
    this.gauge.series[0].data[0].value = temperature;
    this.gauge.series[1].data[0].value = humidity;
    if (this.dynamicLine.series[0].data.length >= 10)
      this.dynamicLine.series[0].data.shift();
    this.dynamicLine.series[0].data.push(temperature);
    if (this.dynamicLine.series[1].data.length >= 10)
      this.dynamicLine.series[1].data.shift();
    this.dynamicLine.series[1].data.push(humidity);
  }
  public onTemperatureChange(value: number[]): void {
    this.gauge.series[0].min = value[0];
    this.gauge.series[0].max = value[1];
  }
  public onHumidityChange(value: number[]): void {
    this.gauge.series[1].min = value[0];
    this.gauge.series[1].max = value[1];
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
