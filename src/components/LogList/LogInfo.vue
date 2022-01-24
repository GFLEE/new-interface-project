<template>
  <a-modal
    :dialog-style="{ top: '20px' }"
    v-model="visible"
    :title="model_title"
    :footer="null"
    :destroyOnClose="true"
    :mask="true"
    width="800px"
  >
    <div>
      <a-spin :spinning="spinning" tip="加载中...">
        <div class="gutter-info">
          <a-row :gutter="16">
            <!--<a-col class="gutter-row" :span="2">
              <div v-show="icon_visible">
                <a-avatar
                  :icon="icon"
                  :style="{ backgroundColor: color, verticalAlign: 'middle' }"
                >
                </a-avatar>
              </div>
            </a-col>-->
            <!-- <a-col class="gutter-row" :span="7">
          <h1>{{ data.API }}</h1>
        </a-col>-->
            <a-col class="gutter-row" :span="5"> </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col class="gutter-row" :span="12">
              <a-card
                v-bind:title="'请求体(' + data.CONSUMING + 'ms)'"
                :bordered="false"
                style="height :auto"
              >
                <!-- <pre><code class="json"  v-html="data.REQUEST_DATA"></code></pre>!-->
                <json-viewer
                  :value="this.request_data"
                  expanded
                  :expand-depth="5"
                  copyable
                >
                </json-viewer>
              </a-card>
            </a-col>

            <a-col class="gutter-row" :span="12">
              <a-card title="响应体" :bordered="false" style="height :auto">
                <!--<pre><code class="json"  v-html="data.RESPONSE_DATA"></code></pre>!-->
                <json-viewer
                  :value="this.response_data"
                  expanded
                  :expand-depth="5"
                  copyable
                ></json-viewer>
              </a-card>
            </a-col>
          </a-row>
        </div>
      </a-spin>
    </div>
  </a-modal>
</template>

<script>
import { LogDetailervice } from "../../api/admin";
const colorList = ["#87d068", "red"]; //绿，红

export default {
  name: "LogInfo",
  data() {
    return {
      data: {},
      model_title: "",
      visible: false,
      request_data: {},
      spinning: false,
      response_data: {},
      icon_visible: false,
      icon: "",
      color: ""
    };
  },
  beforeMount() {},
  beforeUnmount() {
    this.request_data = null;
    this.response_data = null;
  },
  mounted() {},
  watch: {
    message: {
      handler: function(val) {
        console.log("val", val);
        this.spinning = true;
        if (val == null) {
          return;
        }
      }
    },
    deep: true
  },
  methods: {
    openInfo(record) {
      this.visible = true;
      this.model_title = record.API + "【" + record.CREATE_DATE + "】";

      LogDetailervice({ t_id: record.T_ID }).then(data => {
        this.data = data;
        this.request_data = JSON.parse(data.REQUEST_DATA);
        this.response_data = JSON.parse(data.RESPONSE_DATA);
        this.spinning = false;
        this.icon_visible = true;
        if (this.data.STATUS == "Succeed") {
          this.icon = "check-circle";
          this.color = colorList[0];
        }
        if (this.data.STATUS == "Failed") {
          this.icon = "close-circle";
          this.color = colorList[1];
        }
      });
    }
  }
};
</script>

<style scoped>
.gutter-info >>> .ant-row > div {
  background: transparent;
  border: 0;
  padding: 5px 0;
}
.gutter-box {
  background: #00a0e9;
  padding: 5px 0;
}
</style>
