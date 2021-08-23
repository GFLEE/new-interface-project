<template>
  <div style="background-color: #ececec; padding:20px; height :600px">
    
    <a-row :gutter="20">
      <a-col :span="12">
         <a-card title="SignalR 测试" :bordered="true" style="height :550px" >
          <a-textarea placeholder="Basic usage" v-model="sigForm.key" :rows="20">
          </a-textarea>
        </a-card>
      </a-col>
      <a-col :span="12">
       <a-card title="SignalR 测试" :bordered="false"  style="height :550px" >
          <pre v-highlightjs>
          <code class="json" spellcheck="false" >{{msg}} </code>
          </pre>
      </a-card> 
      </a-col>
    </a-row>

 
  </div>
</template>

<script>
import { connectServer } from "@/utils/signalR";
import bus from "@/utils/bus";

export default {
  data() {
    return {
       msg: "",
      sigForm: {
        key: ""
      },
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
    console.log("完成挂载");
    connectServer("http://localhost:5000/InterfaceServiceHub", "virtual data");
    bus.$on("handleRefreshData", data => {
      this.sigForm.key = data;
       this.msg = data;
       console.log(data);
    });
  },
 
  //监听变化的值
  watch: {
    map: function() {
      console.log("3333" + this.map);
      //return this.map
      // console.log('444444'+this.map);

      //var vector = new ol.layer.Vector({
      //  source: this.source
      //});
      // this.map.addLayer(vector);
    }
  },

  methods: {}
};
</script>
