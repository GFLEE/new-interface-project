<template>
  <div>
    <a-space direction="vertical">
      <div>
        <a-space>
          <a-button icon="file-excel" :size="size" @click="exportExcel">
            导出
          </a-button>
          <a-button icon="reload" :size="size" @click="reloadList">
            刷新
          </a-button>
          <a-divider type="vertical" />
          <span>托盘码:</span>
          <a-input
            placeholder=""
            :size="size"
            v-model="palletId"
            style="width: 145px"
          />
          <span>区域:</span>
          <a-select
            :size="size"
            default-value="All"
            style="width: 100px"
            @change="handleZoneChange"
          >
            <a-select-option value="All">
              ==全部==
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
          <span>产线:</span>
          <a-select
            :size="size"
            default-value="All"
            style="width: 100px"
            @change="handleLineChange"
          >
            <a-select-option value="All">
              ==全部==
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
          </a-select>

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
    title: "下线时间",
    dataIndex: "CREATE_DATE",
    width: "13%",
    ellipsis: false
  },
  {
    title: "托盘码",
    dataIndex: "CONTAINER_BARCODE",
    width: "13%"
  },
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
  // {
  //   title: "类型",
  //   dataIndex: "CATALOG_DESC",
  //   width: "auto"
  // },
  {
    title: "数量",
    dataIndex: "QTY",
    width: "auto"
  },
  // {
  //   title: "箱托关系",
  //   dataIndex: "ITEM_BOXSUPPORT",
  //   width: "auto"
  // },
  // {
  //   title: "同步",
  //   dataIndex: "SYNCED",
  //   width: "auto"
  // },
  // {
  //   title: "冻结",
  //   dataIndex: "CUR_STATUS",
  //   width: "auto"
  // },
  {
    title: "质检",
    dataIndex: "QC_STATUS",
    width: "auto"
  },
  {
    title: "产线",
    dataIndex: "PRODUCTLINE",
    width: "13%"
  }
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
      zone: ""
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
    },
    //产线选择
    handleLineChange(value) {
      this.line = value;
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
