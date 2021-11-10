<template>
  <div>
    <a-space direction="vertical">
      <div>
        <a-space>
          <a-button icon="reload" :size="size" @click="reloadList">
            刷新
          </a-button>
          <a-divider type="vertical" />
          <a-range-picker
            :locale="locale"
            :show-time="{ format: 'HH:mm:ss' }"
            format="YYYY/MM/DD HH:mm:ss"
            :placeholder="['开始时间', '结束时间']"
            @change="onChange"
            @ok="onOk"
          />
          <a-button
            type="primary"
            :size="size"
            icon="search"
            @click="reloadList"
          >
            查询
          </a-button>
        </a-space>
      </div>
      <a-table
        class="myTable"
        size="small"
        bordered
        :scroll="{ y: 500 }"
        :columns="columns"
        :row-key="record => record.T_ID"
        :data-source="data"
        :loading="loading"
        @change="handleTableChange"
      >
        <span slot="LINE" slot-scope="LINE">
          <h1>{{ LINE }}</h1>
        </span>
        <span slot="SKU" slot-scope="SKU">
          <h1>{{ SKU }}</h1>
        </span>
        <span slot="SKU_NAME" slot-scope="SKU_NAME">
          <h1>{{ SKU_NAME }}</h1>
        </span>
        <span slot="PALLET_COUNT" slot-scope="PALLET_COUNT">
          <h1>{{ PALLET_COUNT }}</h1>
        </span>
        <span slot="INBOUND_COUNT" slot-scope="INBOUND_COUNT">
          <h1>{{ INBOUND_COUNT }}</h1>
        </span>
        <span slot="G" slot-scope="G">
          <h1>{{ G }}</h1>
        </span>
        <span slot="H" slot-scope="H">
          <h1>{{ H }}</h1>
        </span>
        <span slot="M" slot-scope="M">
          <h1>{{ M }}</h1>
        </span>
        <span slot="C" slot-scope="C">
          <h1>{{ C }}</h1>
        </span>
      </a-table>
    </a-space>
  </div>
</template>

<script>
import { QueryProductionService } from "../api/admin";
import moment from "moment";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

const queryData = params => {
  return QueryProductionService(params);
};
const columns = [
  {
    title: "产线",
    dataIndex: "LINE",
    width: "8%",
    ellipsis: false,
    scopedSlots: { customRender: "LINE" }
  },
  {
    title: "物料编码",
    dataIndex: "SKU",
    width: "auto",
    ellipsis: false,
    scopedSlots: { customRender: "SKU" },
    align: "center"
  },
  {
    title: "物料名称",
    dataIndex: "SKU_NAME",
    width: "auto",
    ellipsis: true,
    scopedSlots: { customRender: "SKU_NAME" }
  },
  {
    title: "托数",
    dataIndex: "PALLET_COUNT",
    width: "auto",
    ellipsis: false,
    scopedSlots: { customRender: "PALLET_COUNT" },
    align: "center"
  },
  {
    title: "总入库数",
    dataIndex: "INBOUND_COUNT",
    width: "auto",
    ellipsis: false,
    scopedSlots: { customRender: "INBOUND_COUNT" },
    align: "center"
  },
  {
    title: "高架库",
    dataIndex: "G",
    width: "auto",
    ellipsis: false,
    scopedSlots: { customRender: "G" },
    align: "center"
  },
  {
    title: "密集库",
    dataIndex: "M",
    width: "auto",
    ellipsis: false,
    scopedSlots: { customRender: "M" },
    align: "center"
  },
  {
    title: "横梁",
    dataIndex: "H",
    width: "auto",
    ellipsis: false,
    scopedSlots: { customRender: "H" },
    align: "center"
  },
  {
    title: "潮汐",
    dataIndex: "C",
    width: "auto",
    ellipsis: false,
    scopedSlots: { customRender: "C" },
    align: "center"
  }
];
export default {
  data() {
    return {
      data: [],
      dafault_dates: [],
      pagination: {},
      loading: false,
      columns,
      now: new Date(),
      start_date: "",
      end_date: "",
      size: "small",
      locale,
      moment
    };
  },
  mounted() {
    (this.start_date =
      [
        this.now.getFullYear(),
        this.now.getMonth() + 1,
        this.now.getDate()
      ].join("/") + " 08:00:00"),
      (this.end_date =
        [
          this.now.getFullYear(),
          this.now.getMonth() + 1,
          this.now.getDate()
        ].join("/") + " 23:59:59");

    this.dafault_dates.push(
      moment("2021/11/01 08:00:00", "YYYY/MM/DD HH:mm:ss")
    );
    this.dafault_dates.push(
      moment("2015/11-/01 23:59:59", "YYYY/MM/DD HH:mm:ss")
    );

    this.fetch({
      start_date: this.start_date,
      end_date: this.end_date
    });
  },
  methods: {
    handleTableChange() {
      this.fetch({});
    },
    fetch(params = {}) {
      this.loading = true;
      queryData({
        ...params
      }).then(data => {
        this.loading = false;
        this.data = data;
      });
    },
    onChange(value, dateString) {
      console.log("Selected Time: ", value);
      console.log("Formatted Selected Time: ", dateString);
    },
    onOk(value) {
      console.log("onOk: ", value);
    },
    reloadList() {
      this.fetch({
        start_date: this.start_date,
        end_date: this.end_date
      });
    },

    onSearch() {}
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
</style>
