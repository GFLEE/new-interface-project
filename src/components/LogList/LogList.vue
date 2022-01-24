<template>
  <a-space direction="vertical">
    <div>
      <LogInfo style="margin: 0" ref="addModal"> </LogInfo>
      <a-space>
        <a-button icon="file-excel" :size="size" @click="exportExcel">
          导出
        </a-button>
        <a-button icon="reload" :size="size" @click="refreshList">
          刷新
        </a-button>
        <a-input-search
          placeholder="内容"
          :size="size"
          @search="onSearch"
          style="width: 190px"
        />
        <a-select
          :size="size"
          default-value="All"
          style="width: 128px"
          @change="handleResultChange"
        >
          <a-select-option value="All">
            ==全部状态==
          </a-select-option>
          <a-select-option value="Succeed">
            成功
          </a-select-option>
          <a-select-option value="Failed">
            失败
          </a-select-option>
        </a-select>
        <a-select
          :size="size"
          default-value="All"
          style="width: 128px"
          @change="handleRetryingChange"
        >
          <a-select-option value="All">
            ==全部次数==
          </a-select-option>
          <a-select-option value="1">
            1
          </a-select-option>
          <a-select-option value="2">
            2
          </a-select-option>
          <a-select-option value="3">
            3
          </a-select-option>
          <a-select-option value="4">
            4
          </a-select-option>
          <a-select-option value="bigger">
            > 4
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
              <h3>{{ API }}</h3>
            </span>
            <span slot="API_NAME" slot-scope="API_NAME">
              <h3>{{ API_NAME }}</h3>
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
              <h3>{{ RETRING }}</h3>
            </span>
            <span slot="CONSUMING" slot-scope="CONSUMING">
              <h3>{{ CONSUMING }}毫秒</h3>
            </span>
            <span slot="CREATE_DATE" slot-scope="CREATE_DATE">
              <h3>{{ CREATE_DATE }}</h3>
            </span>
            <span slot="MESSAGE" slot-scope="MESSAGE">
              <h3>{{ MESSAGE }}</h3>
            </span> 
            <p slot="tags" slot-scope="text, i, tags">
              <a-button
                @click="rePush(text, i, tags)"
                type="primary"
                :disabled="i.API_TYPE === 'job' ? false : true"
                size="small"
                >{{ i.API_TYPE === "job" ? "重推" : "重调" }}</a-button
              >
            </p>
          </a-table>
        </a-col>
        <!--<a-col :span="10"> <LogInfo :message="log_id" /> </a-col>-->
      </a-row>
    </div>
  </a-space>
</template>

<script>
import { LogQueryService } from "../../api/admin";
import { RePushLogService } from "../../api/admin";

import LogInfo from "./LogInfo";
const queryData = params => {
  return LogQueryService(params);
};

const columns = [
  {
    title: "时间",
    dataIndex: "CREATE_DATE",
    width: "auto",
    ellipsis: true,
    scopedSlots: { customRender: "CREATE_DATE" }
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
    width: "10%",
    scopedSlots: { customRender: "STATUS" }
  },
  {
    title: "信息",
    dataIndex: "MESSAGE",
    width: "20%",
    scopedSlots: { customRender: "MESSAGE" }
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
  },
  {
    title: "操作",
    dataIndex: "tags",
    key: "tags",
    width: "8%",

    scopedSlots: { customRender: "tags" }
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
      page_size: 10,
      result: "",
      api: "",
      //rowClassName: "",
      loading: false,
      times: "",
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
      this.refresh({
        page: 1,
        pageSize: this.page_size
      });
    },
    handleResultChange(value) {
      this.result = value;
      this.refresh({
        page: 1,
        pageSize: this.page_size
      });
    },
    handleRetryingChange(value) {
      this.times = value;
      this.refresh({
        page: 1,
        pageSize: this.page_size
      });
    },
    handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        page: pagination.current,
        pageSize: pagination.pageSize 
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
        times: this.times,
        ...params
      }).then(data => {
        const pagination = { ...this.pagination };
        pagination.total = data.count;
        pagination.current = params.page;
        pagination.showTotal = (total, range) =>
          `显示${range[0]}到${range[1]}, 共${total}条记录`;
        this.loading = false;
        this.data = data.Logs;
        this.pagination = pagination;
        if (this.data.count > 0) {
          this.log_id = this.data[0].T_ID;
        }
      });
    }, 
    refresh(params = {}) {
      this.fetch(params);
    },
    refreshList() {
      this.refresh({
        page:
          this.pagination.current == undefined ? 1 : this.pagination.current,
        pageSize: this.page_size
      });
    },
    rePush(text, i, tags) {
      console.log("text", text);
      console.log("i", i);
      console.log("tags", tags);
      this.loading = true;
      RePushLogService(i.T_ID).then(data => {
        //console.log(data);
        this.loading = false;
        this.$message.info(data.msg);
        this.refreshList();
      });
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
