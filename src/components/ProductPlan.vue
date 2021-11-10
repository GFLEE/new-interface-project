<template>
  <div>
    <a-space direction="vertical">
      <div>
        <a-space>
          <a-button icon="reload" :size="size" @click="reloadList">
            刷新
          </a-button>
          <a-divider type="vertical" />
          <span>产线:</span>
          <a-select
            :size="size"
            default-value="All"
            style="width: 120px"
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
          <span>计划状态:</span>
          <a-select
            :size="size"
            default-value="All"
            style="width: 120px"
            @change="handleStatusChange"
          >
            <a-select-option value="All">
              ==全部==
            </a-select-option>
            <a-select-option value="未开始">
              未开始
            </a-select-option>
            <a-select-option value="激活">
              激活
            </a-select-option>
            <a-select-option value="暂停中">
              暂停中
            </a-select-option>
            <a-select-option value="已完成">
              已完成
            </a-select-option>
            <a-select-option value="取消">
              取消
            </a-select-option>
          </a-select>
          <a-input
            placeholder="物料编码"
            :size="size"
            v-model="sku"
            style="width: 145px"
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
        bordered
        size="small"
        position="bottom"
        :scroll="{ y: 500 }"
        :columns="columns"
        :row-key="record => record.PLAN_NO"
        :data-source="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <span slot="STATUS" slot-scope="STATUS">
          <a-tag
            :key="STATUS"
            :color="
              STATUS === '取消'
                ? 'black'
                : STATUS === '激活'
                ? '#73d13d'
                : STATUS === '已完成'
                ? 'green'
                : STATUS === '未开始'
                ? '#bfbfbf'
                : STATUS === '暂停中'
                ? '#69c0ff'
                : 'green'
            "
          >
            {{ STATUS }}
          </a-tag>
        </span>
      </a-table>
    </a-space>
  </div>
</template>

<script>
import { ProductPlanQueryService } from "../api/admin";
const queryData = params => {
  return ProductPlanQueryService(params);
};
const columns = [
  {
    title: "产线",
    dataIndex: "PRODUCT_LINE",
    width: "6%",
    ellipsis: false
  },
  {
    title: "计划单号",
    dataIndex: "PLAN_NO",
    width: "13%"
  },
  {
    title: "物料代码",
    dataIndex: "ITEM_CODE",
    width: "7%"
  },
  {
    title: "计划状态",
    dataIndex: "STATUS",
    width: "8%",
    scopedSlots: { customRender: "STATUS" }
  },
  {
    title: "WMS单号",
    dataIndex: "REF_DOC_NO",
    width: "auto"
  },
  {
    title: "箱托关系",
    dataIndex: "ITEM_BOXSUPPORT",
    width: "7%"
  },
  {
    title: "数量",
    dataIndex: "PLAN_QTY",
    width: "6%"
  },
  {
    title: "ASN单号",
    dataIndex: "ASNNO",
    width: "auto"
  },
  {
    title: "创建时间",
    dataIndex: "CREATE_DATE",
    width: "auto"
  },
  {
    title: "修改时间",
    dataIndex: "MODIFY_DATE",
    width: "auto"
  }
];
export default {
  name: "ProductPlan",
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns,
      plan_status: "",
      line: "",
      sku: "",
      size: "small"
    };
  },

  mounted() {
    this.fetch({ page: 1, pageSize: 10 });
  },

  methods: {
    reloadList() {
      this.fetch({ page: 1, pageSize: 10 });
      this.pagination.current = 1;
    },
    handleStatusChange(value) {
      this.plan_status = value;
    },
    handleLineChange(value) {
      this.line = value;
    },
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
        status: this.plan_status,
        sku: this.sku,
        ...params
      }).then(data => {
        this.loading = false;
        const pagination = { ...this.pagination };
        pagination.total = data.count;
        pagination.showTotal = (total, range) =>
          `显示${range[0]}到${range[1]}, 共${total}条记录`;
        this.data = data.datas;
        this.pagination = pagination;
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
</style>
