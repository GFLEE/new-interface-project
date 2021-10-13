<template>
  <a-row>
    <a-col :span="8">
      <a-table
        class="myTable"
        size="small"
        bottom="bottomCenter"
        :scroll="{ y: 400 }"
        :columns="columns"
        :row-key="record => record.T_ID"
        :data-source="data"
        :customRow="click"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
      </a-table>
    </a-col>
    <a-col :span="1"> </a-col>

    <a-col :span="15"> <LogInfo :message="log_id" /> </a-col>
  </a-row>
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
    width: "auto"
  },
  {
    title: "状态",
    dataIndex: "STATUS",
    width: "auto"
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
      data: [],
      pagination: {},
      loading: false,
      columns
    };
  },
  mounted() {
    this.fetch({ page: 1, pageSize: 10 });
  },
  methods: {
    callback(key) {
      console.log(key);
    },

    handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        page: pagination.current,
        pageSize: pagination.pageSize,
        api: ""
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
          }
        }
      };
    },
    //查询明细
    updateSelect(record) {
      this.log_id = record.T_ID;
    },
    setRowClassName(record) {
      return record.id === this.state.rowId ? "clickRowStyl" : "";
    },
    selectedRowChange(selectedRowKeys, selectedRows) {
      console.log(selectedRowKeys);
      console.log(selectedRows);
    },

    fetch(params = {}) {
      this.loading = true;
      queryData({
        ...params
      }).then(data => {
        const pagination = { ...this.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = data.count;
        this.loading = false;
        this.data = data.Logs;
        this.pagination = pagination;
        this.log_id = this.data[0].T_ID;
      });
    }
  }
};
</script>

<style>
.myTable {
  font-size: 8;
}
</style>
