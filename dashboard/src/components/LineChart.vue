<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    console.log(this.chartData);
    this.renderChart(this.chartData, this.options);
  },
  watch: {
    chartData(value) {
      console.log(value);
    }
  }
};
</script>
