<template>
  <a-form-model ref="redisForm" :model="redisForm" v-bind="layout">
    <a-form-model-item has-feedback label="键" prop="mykey">
      <a-input v-model="redisForm.key" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="值" prop="myvalue">
      <a-input v-model="redisForm.value" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" icon="save" @click="setKeyValue('redisForm')">
        保存
      </a-button>
    </a-form-model-item>

    <a-form-model-item has-feedback label="查询键名" prop="input_key">
      <a-input-search placeholder="输入键名" v-model="redisForm.input_key" 
                      enter-button @search="onSearch" />
      <br />
      <!-- <a-button type="primary" icon="search" @click="queryValue('redisForm')">
      查询
    </a-button> -->
    </a-form-model-item>

    <a-form-model-item label="查询结果">
      <a-input v-model="my_result" :disabled="true" />
    </a-form-model-item>
  </a-form-model>
</template>


<script>
import { redisService } from '@/api/redis'
import Oidc from "oidc-client";
import  { loginService } from "@/api/auth";

export default {
  data() {
    return {
      redisForm: {
        key: "",
        value: "",
        input_key: "",
        result: "",
      },
      my_result:"",
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    setKeyValue(formName) {
      // const data = { key: this.redisForm.key, value: this.redisForm.value,status:0} 
      // redisService(data)
      //  alert("设置成功!");

    var name = this.redisForm.key;
    var passwd = this.redisForm.value;
    
   loginService({NAME:name,PASSWORD:passwd})
   this.$message.success('设置成功！');

 },
  onSearch(value) {
    
    

    },
  SearchKey(value)
 {
   const datasend = { key: this.redisForm.input_key,status:1}
   var data_resp=""
   const resp = redisService(datasend).then(response=>
     { 
        console.log(response.data)
        this.my_result=response.data.value
        
     })  
   return resp;
 },
   
  },
};
</script>