<template>
  <a-spin :spinning="spinning" tip="加载中...">
    <div class="gutter-info">
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="2">
          <div v-show="icon_visible">
            <a-avatar
              :icon="icon"
              :style="{ backgroundColor: color, verticalAlign: 'middle' }"
            >
            </a-avatar>
          </div>
        </a-col>
        <a-col class="gutter-row" :span="6">
          <h1>{{ data.API }}</h1>
        </a-col>
        <a-col class="gutter-row" :span="6">
          <span>{{ data.CONSUMING }}ms</span>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <div>
            <a-card title="请求体" :bordered="false" style="height :auto">
              <div id="codeView" v-highlight>
                <!-- <pre><code class="json"  v-html="data.REQUEST_DATA"></code></pre>!-->
                <json-viewer
                  :value="this.request_data"
                  expanded
                  :expand-depth="5"
                  copyable
                  sort
                ></json-viewer>
              </div>
            </a-card>
          </div>
        </a-col>
        <a-col :span="12">
          <div>
            <a-card title="响应体" :bordered="false" style="height :auto">
              <div id="codeView" v-highlight>
                <!--<pre><code class="json"  v-html="data.RESPONSE_DATA"></code></pre>!-->
                <json-viewer
                  :value="data.RESPONSE_DATA"
                  expanded
                  :expand-depth="5"
                  copyable
                  sort
                ></json-viewer>
              </div>
            </a-card>
          </div>
        </a-col>
      </a-row>
    </div>
  </a-spin>
</template>

<script>
import { LogDetailervice } from "../../api/admin";

const colorList = ["#87d068", "red"]; //绿，红

export default {
  name: "LogInfo",
  props: ["message"],
  data() {
    return {
      data: {},
      request_data: {},
      spinning: false,
      reques_data: "",
      response_data: "",
      icon_visible: false,
      icon: "",
      color: ""
    };
  },

  mounted() {},
  watch: {
    message: {
      handler: function(val) {
        this.spinning = true;
        if (val == null) {
          return;
        }
        LogDetailervice({ t_id: val }).then(data => {
          this.data = data;
          //this.request_data = data.REQUEST_DATA;
          this.request_data = data.REQUEST_DATA;

          //Json.

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
    },
    deep: true
  },
  methods: {}
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
