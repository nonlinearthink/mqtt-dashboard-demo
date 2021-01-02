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
      <a-tab-pane key="2" tab="折线图模式">
        <highcharts :options="dynamicLine"></highcharts>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VChart from "vue-echarts";
import "echarts/lib/chart/gauge";
import "echarts/lib/component/tooltip";
// import LineChart from "../components/LineChart.vue";
import moment from "moment";
@Component({
  components: {
    VChart
    // LineChart
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
  created() {
    setInterval(() => {
      const temperature = Number((Math.random() * 100).toFixed(2));
      const humidity = Number((Math.random() * 100).toFixed(2));
      this.gauge.series[0].data[0].value = temperature;
      this.gauge.series[1].data[0].value = humidity;
      // this.dynamicLine.labels.shift();
      // this.dynamicLine.labels.push(moment().format("HH:mm:ss"));
      // const temperatureCache = JSON.parse(
      //   JSON.stringify(this.dynamicLine.datasets[0].data)
      // );
      // const humidityCache = JSON.parse(
      //   JSON.stringify(this.dynamicLine.datasets[1].data)
      // );
      // temperatureCache.shift();
      // temperatureCache.push(temperature);
      // this.dynamicLine.datasets[0].data = temperatureCache;
      // humidityCache.shift();
      // humidityCache.push(humidity);
      if (this.dynamicLine.series[0].data.length >= 7)
        this.dynamicLine.series[0].data.shift();
      this.dynamicLine.series[0].data.push(temperature);
      if (this.dynamicLine.series[1].data.length >= 7)
        this.dynamicLine.series[1].data.shift();
      this.dynamicLine.series[1].data.push(humidity);
      // this.dynamicLine.datasets[0].data.shift();
      // this.dynamicLine.datasets[0].data.push(temperature);
      // this.dynamicLine.datasets[1].data.shift();
      // this.dynamicLine.datasets[1].data.push(humidity);
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
