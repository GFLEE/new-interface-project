<template>
  <div id="app">
    <a-row>
      <div id="main" style="width:auto;height:400px"></div>
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
      date_arr: [],
      in_arr: [],
      out_arr: [],
      shel_arr: [],
      select_date: "",
      columns,
      loading: false,
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
          data: eval(this.date_arr),
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
            data: eval(this.in_arr),
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
            data: eval(this.in_arr)
          },
          {
            name: "出库量",
            type: "bar",
            data: eval(this.out_arr),
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
            data: eval(this.out_arr)
          },
          {
            name: "下架量",
            type: "bar",
            data: eval(this.shel_arr),
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
    },
    fetch(params = {}) {
      queryData({
        method: "main",
        offset: 0,
        day: "",
        ...params
      }).then(data => {
        this.data = data;
        for (var i in data.dates) {
          this.date_arr.push(data.dates[i]);
          this.in_arr.push(data.in_qty[i]);
          this.out_arr.push(data.out_qty[i]);
          this.shel_arr.push(data.sheloff_qty[i]);
        }

        this.initDiagram();
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
