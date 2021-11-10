<template>
  <a-space direction="vertical">
    <div>
      <LogInfo style="margin: 0" ref="addModal"> </LogInfo>
      <a-space>
        <a-button icon="file-excel" :size="size" @click="exportExcel">
          导出
        </a-button>
        <a-button icon="reload" :size="size" @click="reloadList">
          刷新
        </a-button>
        <a-input-search
          placeholder="接口名称"
          :size="size"
          @search="onSearch"
          style="width: 145px"
        />
        <a-select
          :size="size"
          default-value="All"
          style="width: 100px"
          @change="handleResultChange"
        >
          <a-select-option value="All">
            ==全部==
          </a-select-option>
          <a-select-option value="Succeed">
            成功
          </a-select-option>
          <a-select-option value="Failed">
            失败
          </a-select-option>
        </a-select>
      </a-space>
    </div>
    <div>
      <a-row>
        <a-col :span="24">
          <a-table
            size="small"
            position="bottomCenter"
            :columns="columns"
            :row-key="record => record.T_ID"
            :rowClassName="rowClassName"
            :data-source="data"
            :scroll="{ y: 600 }"
            :customRow="click"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
          >
            <span slot="API" slot-scope="API">
              <h1>{{ API }}</h1>
            </span>
            <span slot="API_NAME" slot-scope="API_NAME">
              <h1>{{ API_NAME }}</h1>
            </span>
            <span slot="STATUS" slot-scope="STATUS">
              <a-tag
                :key="STATUS"
                :color="STATUS === 'Succeed' ? 'green' : 'red'"
              >
                {{ STATUS }}
              </a-tag>
            </span>
            <span slot="RETRING" slot-scope="RETRING">
              <h1>{{ RETRING }}</h1>
            </span>
            <span slot="CONSUMING" slot-scope="CONSUMING">
              <h1>{{ CONSUMING }}毫秒</h1>
            </span>
          </a-table>
        </a-col>
        <!--<a-col :span="10"> <LogInfo :message="log_id" /> </a-col>-->
      </a-row>
    </div>
  </a-space>
</template>

<script>
import { LogQueryService } from "../../api/admin";
import LogInfo from "./LogInfo";
const queryData = params => {
  return LogQueryService(params);
};

const columns = [
  {
    title: "时间",
    dataIndex: "CREATE_DATE",
    width: "auto",
    ellipsis: true
  },
  {
    title: "API",
    dataIndex: "API",
    width: "auto",
    scopedSlots: { customRender: "API" }
  },
  {
    title: "名称",
    dataIndex: "API_NAME",
    width: "auto",
    scopedSlots: { customRender: "API_NAME" }
  },
  {
    title: "状态",
    dataIndex: "STATUS",
    width: "20%",
    scopedSlots: { customRender: "STATUS" }
  },
  {
    title: "信息",
    dataIndex: "MESSAGE",
    width: "20%"
  },
  {
    title: "次数",
    dataIndex: "RETRING",
    width: "8%",
    scopedSlots: { customRender: "RETRING" }
  },
  {
    title: "时间",
    dataIndex: "CONSUMING",
    width: "8%",
    scopedSlots: { customRender: "CONSUMING" }
  }
];

export default {
  name: "LogList",
  components: { LogInfo },

  props: {
    selectedRows: Array
  },
  data() {
    return {
      log_id: "",
      model_title: "",
      data: [],
      visible: false,
      pagination: {},
      size: "small",
      page_size: 20,
      result: "",
      api: "",
      //rowClassName: "",
      loading: false,
      columns
    };
  },
  mounted() {
    this.fetch({ page: 1, pageSize: this.page_size });
  },
  methods: {
    expand(expanded, record) {
      console.log("-----------", record.T_ID);
      this.log_id = record.T_ID;
    },

    onSearch(value) {
      this.api = value;
      this.reloadList();
    },
    handleResultChange(value) {
      this.result = value;
      this.reloadList();
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
    click(record) {
      return {
        on: {
          click: () => {
            this.updateSelect(record);
          },
          dblclick: () => {
            this.model_title = record.API + "【" + record.CREATE_DATE + "】";
            this.doubleClick(record);
          }
        }
      };
    },
    showModal(record) {
      this.visible = true;
      console.log(record.T_ID);
    },
    doubleClick(record) {
      this.$refs.addModal.openInfo(record);
      this.log_id = record.T_ID;
    },

    //查询明细
    updateSelect(record) {
      this.log_id = record.T_ID;
    },
    rowClassName(record) {
      return record.T_ID === this.log_id ? "changeBjys" : "myTable";
    },
    selectedRowChange(selectedRowKeys, selectedRows) {
      console.log(selectedRowKeys);
      console.log(selectedRows);
    },

    fetch(params = {}) {
      this.loading = true;
      queryData({
        result: this.result,
        api: this.api,
        ...params
      }).then(data => {
        const pagination = { ...this.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = data.count;
        pagination.showTotal = (total, range) =>
          `显示${range[0]}到${range[1]}, 共${total}条记录`;
        this.loading = false;
        this.data = data.Logs;
        this.pagination = pagination;
        this.log_id = this.data[0].T_ID;
      });
    },
    reloadList() {
      this.fetch({ page: 1, pageSize: this.page_size });
    },
    exportExcel() {}
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
