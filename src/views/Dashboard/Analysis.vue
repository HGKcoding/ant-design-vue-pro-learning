<template>
  <div>
    <Chart :option="chartOption" style="height: 400px" />
  </div>
</template>

<script>
import Chart from "../../components/Chart";
import request from "../../utils/request";
export default {
  name: "Analysis",
  components: {
    Chart
  },
  data() {
    return {
      chartOption: {}
    };
  },
  mounted() {
    this.getChartData();
    // this.interval = setInterval(() => {
    //   this.getChartData();
    // }, 3000);
  },
  beforeDestroy() {
    // clearInterval(this.interval);
  },
  methods: {
    getChartData() {
      request({
        url: "/api/dashboard/chart",
        method: "get",
        params: { ID: 12345 }
      }).then(response => {
        this.chartOption = {
          title: {
            text: "ECharts 入门示例"
          },
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: response.data
            }
          ]
        };
      });
    }
  }
};
</script>

<style scoped lang=""></style>
