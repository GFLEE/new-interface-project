<template>
  <div id="app">
    <a-row :gutter="24">
      <a-col class="gutter-row" :span="2">
        <a-select
          :size="size"
          default-value="本周"
          style="width: auto"
          @change="handleIntervalChange"
        >
          <a-select-option value="week">
            本周
          </a-select-option>
          <a-select-option value="10">
            过去10天
          </a-select-option>
          <a-select-option value="month">
            过去一个月
          </a-select-option>
          <a-select-option value="3month">
            过去三个月
          </a-select-option>
        </a-select>
      </a-col>

      <a-col class="gutter-row" :span="22">
        <div id="main" style="width:auto;height:400px"></div>
      </a-col>
    </a-row>
    <a-row>
      <a-table
        size="small"
        :columns="columns"
        :row-key="record => record.T_ID"
        :data-source="table_data"
        :loading="loading"
      >
      </a-table>
    </a-row>
  </div>
</template>

<script>
import { QueryBoundService } from "../api/admin";
import { FormateCustomDate } from "../utils/tool";

const queryData = params => {
  return QueryBoundService(params);
};
const query_table_Data = params => {
  console.log(params);
  return QueryBoundService(params);
};
const columns = [
  {
    title: "时间",
    dataIndex: "HAPPEND_DATE",
    width: "auto",
    ellipsis: true
  },
  {
    title: "SKU",
    dataIndex: "SKU",
    width: "auto",
    ellipsis: true
  },
  {
    title: "SKU名称",
    dataIndex: "SKU_NAME",
    width: "auto",
    ellipsis: true
  },
  {
    title: "入库",
    dataIndex: "IN_QTY",
    width: "auto",
    ellipsis: true
  },
  {
    title: "出库",
    dataIndex: "OUT_QTY",
    width: "auto",
    ellipsis: true
  },
  {
    title: "下架",
    dataIndex: "SHELFOFF_QTY",
    width: "auto",
    ellipsis: true
  }
];
export default {
  name: "App",
  data() {
    return {
      data: Object,
      select_date: "",
      columns,
      loading: false,
      interval: "week",
      size: "small",
      table_data: []
    };
  },
  mounted() {
    this.barClick({ name: FormateCustomDate(new Date(), "yyyy/MM/dd") });
  },
  created() {
    this.fetch({});
  },
  methods: {
    fetch(params = {}) {
      queryData({
        method: "main",
        offset: this.interval,
        day: "",
        ...params
      }).then(data => {
        this.data = data;
        this.initDiagram();
      });
    },
    handleIntervalChange(value) {
      this.interval = value;
      this.fetch({});
    },
    initDiagram() {
      var myChart = this.$echarts.init(document.getElementById("main"));
      const labelOption = {
        show: true,
        rotate: 0,
        position: "top",
        distance: 10,
        align: "center",
        verticalAlign: "center",
        formatter: "{c}",
        textStyle: {
          color: "gray",
          fontSize: 12
        }
      };
      var _this = this;
      myChart.on("click", function(params) {
        //self = this;
        _this.barClick(params);
      });
      myChart.setOption({
        title: { text: "" },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ["入库量", "出库量", "下架量"]
        },
        xAxis: {
          type: "category",
          data: eval(this.data.dates),
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: { interval: 0, rotate: 40 }
        },
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "入库量",
            type: "bar",
            data: eval(this.data.in_qty),
            emphasis: {
              focus: "series"
            },
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)"
            },
            itemStyle: {
              color: "#91CB74"
            },
            barGap: "20%",
            barCategoryGap: "40%",
            label: labelOption
          },
          {
            name: "入库量折线",
            type: "line",
            //yAxisIndex: 1,
            color: "#91CB74",
            //color: "#738EDD",
            smooth: true,
            data: eval(this.data.in_qty)
          },
          {
            name: "出库量",
            type: "bar",
            data: eval(this.data.out_qty),
            emphasis: {
              focus: "series"
            },
            itemStyle: {
              color: "#738EDD"
            },
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)"
            },
            barGap: "20%",
            barCategoryGap: "40%",
            label: labelOption
          },
          {
            name: "出库量折线",
            type: "line",
            //yAxisIndex: 1,
            smooth: true,
            color: "",
            data: eval(this.data.out_qty)
          },
          {
            name: "下架量",
            type: "bar",
            data: eval(this.data.sheloff_qty),
            emphasis: {
              focus: "series"
            },
            itemStyle: {
              color: "#FAC859"
            },
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)"
            },
            barGap: "20%",
            barCategoryGap: "40%",
            label: labelOption
          }
        ]
      });
    },
    barClick(param) {
      console.log(param);
      this.loading = true;
      query_table_Data({
        day: param.name,
        method: "detail"
      }).then(data => {
        this.loading = false;
        this.table_data = data;
      });
    }
  }
};
</script>

<style>
.ant-table-thead > tr > th {
  color: white;
  font-size: 12px;
  background: #13c2c2 !important;
}
.demo-loadmore-list {
  min-height: 350px;
}
.ant-table-tbody > tr > td {
  font-size: 11px;
}
.myTable {
}
.changeBjys {
  background-color: #e6fffb;
}
</style>
