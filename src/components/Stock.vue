<template>
  <div>
    <a-space direction="vertical">
      <div>
        <a-space>
          <a-button icon="reload" :size="size" @click="reloadList">
            刷新
          </a-button>
          <a-select
            :size="size"
            default-value="All"
            style="width: 90px"
            @change="handleZoneChange"
          >
            <a-select-option value="All">
              全区域
            </a-select-option>
            <a-select-option value="高架库区">
              高架库区
            </a-select-option>
            <a-select-option value="潮汐库区">
              潮汐库区
            </a-select-option>
            <a-select-option value="横梁区">
              横梁区
            </a-select-option>
            <a-select-option value="密集库区">
              密集库区
            </a-select-option>
            <a-select-option value="备货区">
              备货区
            </a-select-option>
          </a-select>
          <!--<a-select
            :size="size"
            default-value="All"
            style="width: 75px"
            @change="handleLineChange"
          >
            <a-select-option value="All">
              全产线
            </a-select-option>
            <a-select-option value="瓶1线">
              瓶1线
            </a-select-option>
            <a-select-option value="瓶2线">
              瓶2线
            </a-select-option>
            <a-select-option value="听1线">
              听1线
            </a-select-option>
          </a-select> -->
          <a-select
            :size="size"
            default-value="All"
            style="width: 90px"
            @change="handleStatusChange"
          >
            <a-select-option value="All">
              全状态
            </a-select-option>
            <a-select-option value="已存储">
              已存储
            </a-select-option>
            <a-select-option value="待入库">
              待入库
            </a-select-option>
            <a-select-option value="待出库">
              待出库
            </a-select-option>
            <a-select-option value="预分配">
              预分配
            </a-select-option>
            <a-select-option value="部分存储">
              部分存储
            </a-select-option>
            <a-select-option value="已放满">
              已放满
            </a-select-option>
          </a-select>
          <a-input
            placeholder="货位"
            :size="size"
            v-model="location_no"
            @pressEnter="pressEnter"
            style="width: 90px"
          />
          <a-input
            placeholder="托盘码"
            :size="size"
            v-model="palletId"
            @pressEnter="pressEnter"
            style="width: 135px"
          />
          <a-input
            placeholder="物料"
            :size="size"
            v-model="sku"
            @pressEnter="pressEnter"
            style="width: 80px"
          />
          <a-input
            placeholder="批次"
            :size="size"
            v-model="lot_no"
            @pressEnter="pressEnter"
            style="width: 80px"
          />
          <a-input
            placeholder="巷道"
            :size="size"
            v-model="laneway"
            @pressEnter="pressEnter"
            style="width: 75px"
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
        position="bottom"
        :scroll="{ y: 500 }"
        :columns="columns"
        :row-key="record => record.CONTAINER_BARCODE"
        :data-source="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
      </a-table>
    </a-space>
  </div>
</template>

<script>
import { StockQueryService } from "../api/admin";
const queryData = params => {
  return StockQueryService(params);
};
const columns = [
  {
    title: "位置",
    dataIndex: "LOCATION_STR",
    width: "8%"
  },
  {
    title: "物料编码",
    dataIndex: "ITEM_CODE",
    width: "8%"
  },
  {
    title: "批次",
    dataIndex: "LOT_NO",
    width: "10%"
  },
  {
    title: "托盘码",
    dataIndex: "CONTAINER_BARCODE",
    width: "13%"
  },
  {
    title: "货位",
    dataIndex: "LOCATION_NO",
    width: "10%"
  },
  {
    title: "货位状态",
    dataIndex: "LOCATION_STATUS",
    width: "10%"
  },

  {
    title: "数量",
    dataIndex: "QTY",
    width: "auto"
  },
  {
    title: "质检",
    dataIndex: "QC_STATUS",
    width: "auto"
  },
  {
    title: "巷道",
    dataIndex: "LANEWAY",
    width: "13%"
  }
  // {
  //   title: "产线",
  //   dataIndex: "PRODUCTLINE",
  //   width: "13%"
  // }
];
export default {
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns,
      size: "small",
      palletId: "",
      line: "",
      zone: "",
      location_status: "",
      sku: "",
      laneway: "",
      lot_no: "",
      location_no: ""
    };
  },
  mounted() {
    this.fetch({ page: 1, pageSize: 10 });
  },

  methods: {
    handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        page: pagination.current,
        pageSize: pagination.pageSize
        //sortField: sorter.field,
        //sortOrder: sorter.order,
        //...filters
        //, filters, sorter
      });
    },
    fetch(params = {}) {
      this.loading = true;
      queryData({
        line: this.line,
        zone: this.zone,
        palletId: this.palletId,
        lot_no: this.lot_no,
        sku: this.sku,
        location_status: this.location_status,
        laneway: this.laneway,
        location_no: this.location_no,
        ...params
      }).then(data => {
        this.loading = false;
        const pagination = { ...this.pagination };
        pagination.total = data.count;
        pagination.showTotal = (total, range) =>
          `显示${range[0]}到${range[1]}, 共${total}条记录`;
        this.data = data.list;
        this.pagination = pagination;
      });
    },

    reloadList() {
      this.fetch({ page: 1, pageSize: 10 });
      this.pagination.current = 1;
    },
    exportExcel() {},

    //区域选择
    handleZoneChange(value) {
      this.zone = value;
      this.reloadList();
    },
    //产线选择
    handleLineChange(value) {
      this.line = value;
      this.reloadList();
    },
    handleStatusChange(value) {
      this.location_status = value;
      this.reloadList();
    },
    pressEnter(e) {
      console.log(e);
      this.reloadList();
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
