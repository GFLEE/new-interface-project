<template>
  <div>
    <a-row>
      <a-col :span="12">
        <div>
          <div id="myChart" :style="{ height: '140px' }"></div>
          <p class="title">伦敦金</p>
          <!--<p class="percent1">{{ percent1 }}.00%</p>
          <p class="percent2">{{ percent2 }}.00%</p>
          <p class="time">数据更新时间：{{ year }}&nbsp;{{ time }}</p>
          -->
        </div>
      </a-col>
      <a-col :span="12">
        col-12
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "LogChart",
  data() {
    return {
      dataSource: []
    };
  },
  mounted() {
    this.drawPie();
  },

  methods: {
    drawPie() {
      // var i=0;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // var color = ["#19D672", "#FD517D"];
      // 绘制图表
      myChart.setOption({
        color: ["#23D864", "#FF4D51"],

        title: { text: "title" },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        }
      });
    }
  }
};
</script>
