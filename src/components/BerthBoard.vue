<template>
  <a-space direction="vertical">
    <div>
      <a-space>
        <a-button icon="reload" :size="size" @click="reloadList">
          刷新
        </a-button>
      </a-space>
    </div>

    <a-table
      :columns="columns"
      :row-key="record => record.berth_code"
      :loading="loading"
      :data-source="data"
      :rowClassName="rowClassName"
      :pagination="false"
      :customRow="click"
      @expend="expand"
    >
      <span slot="berth_code" slot-scope="berth_code">
        <h1>{{ berth_code }}</h1>
      </span>
      <span slot="sku_type" slot-scope="sku_type">
        <h1>{{ sku_type }}</h1>
      </span>
      <span slot="bill_code" slot-scope="bill_code">
        <h1>{{ bill_code }}</h1>
      </span>
      <span slot="car_number" slot-scope="car_number">
        <h1>{{ car_number }}</h1>
      </span>
      <span slot="Bill_status" slot-scope="Bill_status">
        <h1>{{ Bill_status }}</h1>
      </span>
      <span slot="bill_qty" slot-scope="bill_qty">
        <h1>{{ bill_qty }}</h1>
      </span>
      <span slot="ip" slot-scope="ip">
        <h1>{{ ip }}</h1>
      </span>
      <a-table
        slot="expandedRowRender"
        slot-scope="record"
        :columns="innerColumns"
        :data-source="record.detail"
        :pagination="false"
      >
      </a-table>
    </a-table>
  </a-space>
</template>

<script>
import { XiaoMiTVDataService } from "../api/admin";
const queryData = params => {
  return XiaoMiTVDataService(params);
};
const columns = [
  {
    title: "备货位",
    dataIndex: "berth_code",
    width: "8%",
    scopedSlots: { customRender: "berth_code" }
  },
  {
    title: "1爆品/2按单	",
    dataIndex: "sku_type",
    width: "11%",
    scopedSlots: { customRender: "sku_type" }
  },
  {
    title: "订单号",
    dataIndex: "bill_code",
    width: "auto",
    scopedSlots: { customRender: "bill_code" }
  },
  {
    title: "车牌号",
    dataIndex: "car_number",
    width: "auto",
    scopedSlots: { customRender: "car_number" }
  },
  {
    title: "整单状态",
    dataIndex: "Bill_status",
    width: "auto",
    scopedSlots: { customRender: "Bill_status" }
  },
  {
    title: "数量",
    dataIndex: "bill_qty",
    width: "auto",
    scopedSlots: { customRender: "bill_qty" }
  },
  {
    title: "IP地址",
    dataIndex: "ip",
    width: "13%",
    scopedSlots: { customRender: "ip" }
  }
];
const innerColumns = [
  {
    title: "左/右",
    dataIndex: "small_code",
    width: "auto"
  },
  {
    title: "1可装运2备货中",
    dataIndex: "stock_status",
    width: "auto"
  },
  {
    title: "1上2下层",
    dataIndex: "stock_layer",
    width: "auto"
  },
  {
    title: "排号(1,2)",
    dataIndex: "stock_line",
    width: "auto"
  },
  {
    title: "列号",
    dataIndex: "stock_list",
    width: "auto"
  },
  {
    title: "货格状态",
    dataIndex: "stock_type",
    width: "auto"
  }
];
export default {
  data() {
    return {
      size: "small",
      berth_code: "",
      loading: false,
      data: [],
      innerData: [],
      columns,
      innerColumns
    };
  },

  mounted() {
    this.fetch({});
  },
  methods: {
    open(expended, record) {
      console.log(record.berth_code);

      this.innerData = record.detail;
    },
    expand(expanded, record) {
      this.innerData = record.detail;
    },
    generateMixed(n) {
      var count = n + 1;
      var res = "";
      for (var i = 0; i <= 10000; i++) {
        var id = parseInt(Math.random() * count);
        var index = res.indexOf(id);
        if (index == -1) {
          res += id;
        }
        if (res.length == count) {
          break;
        }
      }
      return res;
    },
    click(record) {
      return {
        on: {
          click: () => {
            console.log(record.berth_code);
            console.log(this.generateMixed(10));
            this.berth_code = record.berth_code;
          }
        }
      };
    },
    rowClassName(record) {
      return record.berth_code === this.berth_code ? "changeBjys" : "myTable";
    },
    reloadList() {
      this.fetch({});
    },
    fetch(params = {}) {
      this.loading = true;
      queryData({
        ...params
      }).then(data => {
        this.loading = false;
        this.data = data;
        this.innerData = data.detail;
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

.ant-table-tbody > tr > td {
  font-size: 11px;
}
.myTable {
}
.changeBjys {
  background-color: #e6fffb;
}
</style>
