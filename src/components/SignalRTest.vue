<template>
  <a-spin :spinning="spinning" tip="连接中...">
    <div style="background-color: #ececec; padding:20px; height :auto">
      <a-row :gutter="20">
        <a-col :span="12">
          <a-card title="CK01" :bordered="false" style="height :auto">
            <div id="codeView" v-highlight>
              <pre><code class="json"  v-html="code"></code></pre>
            </div>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card title="CK02" :bordered="false" style="height :auto">
            <div id="codeView" v-highlight>
              <pre><code class="json"  v-html="code2"></code></pre>
            </div>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card title="CK03" :bordered="false" style="height :auto">
            <div id="codeView" v-highlight>
              <pre><code class="json"  v-html="code3"></code></pre>
            </div>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card title="CK04" :bordered="false" style="height :auto">
            <div id="codeView" v-highlight>
              <pre><code class="json"  v-html="code4"></code></pre>
            </div>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card title="DB05" :bordered="false" style="height :auto">
            <div id="codeView" v-highlight>
              <pre><code class="json"  v-html="code5"></code></pre>
            </div>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card title="01RG" :bordered="false" style="height :auto">
            <div id="codeView" v-highlight>
              <pre><code class="json"  v-html="RG01_code"></code></pre>
            </div>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card title="02RG" :bordered="false" style="height :auto">
            <div id="codeView" v-highlight>
              <pre><code class="json"  v-html="RG02_code"></code></pre>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </a-spin>
</template>

<script>
import { connectServer } from "@/utils/signalR";
import bus from "@/utils/bus";

export default {
  data() {
    return {
      code: "",
      spinning: false,
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      RG01_code: "",
      RG02_code: "",
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    };
  },
  props: {
    //接收父组件传递过来的参数
    map: {
      //type:String
    }
  },
  mounted() {
    this.spinning = true;
    //const v_url = "http://10.1.11.36:5000/InterfaceServiceHub";
    const v_url = "http://172.29.162.145:5000/InterfaceServiceHub"; 
    //const v_url = "http://localhost:5000/InterfaceServiceHub";
    console.log("完成挂载,开始连接..." + v_url);
    connectServer(v_url, "virtual data");

    bus.$on("ck01Data", data => {
      this.code = data;
      this.spinning = false;
    });

    bus.$on("ck02Data", data => {
      this.code2 = data;
    });

    bus.$on("ck03Data", data => {
      this.code3 = data;
    });

    bus.$on("ck04Data", data => {
      this.code4 = data;
    });

    bus.$on("db05Data", data => {
      this.code5 = data;
    });
    bus.$on("rg01Data", data => {
      this.RG01_code = data;
    });
    bus.$on("rg02Data", data => {
      this.RG02_code = data;
    });
  },

  //监听变化的值
  watch: {
    map: function() {
      console.log("3333" + this.map);

      //var vector = new ol.layer.Vector({
      //  source: this.source
      //});
      // this.map.addLayer(vector);
    }
  },

  methods: {}
};
</script>

<style scoped>
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
</style>
