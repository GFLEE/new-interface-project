<template>
  <a-form-model ref="redisForm" :model="redisForm" v-bind="layout">
    <a-form-model-item has-feedback label="Key" prop="mykey">
      <a-input
        style="width: 250px "
        v-model="redisForm.key"
        autocomplete="off"
      />
    </a-form-model-item>

    <a-form-model-item has-feedback label="Content" prop="myvalue">
      <a-input
        style="width: 250px "
        v-model="redisForm.value"
        autocomplete="off"
      />
    </a-form-model-item>

    <a-form-model-item has-feedback label="Server">
      <a-select
        v-model="redisForm.select_value"
        default-value="server1"
        style="width: 250px "
        @change="handleChange"
      >
        <a-select-option value="server1">
          server1
        </a-select-option>

        <a-select-option value="server2">
          server2
        </a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" icon="save" @click="setKeyValue('redisForm')">
        写入
      </a-button>

      <a-button type="primary" style="margin: 30px" icon="safety-certificate">
        Test
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import { redisService } from "@/api/redis";
import Oidc from "oidc-client";
import { MqService } from "@/api/admin";
import { isEmpty } from "@/utils/tool";

export default {
  data() {
    return {
      redisForm: {
        key: "",
        value: "",
        input_key: "",
        result: "",
        select_value: "server1"
      },
      my_result: "",
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    };
  },
  methods: {
    handleChange(value) {
      console.log(`selected :${value}`);
    },

    setKeyValue(formName) {
      var name = this.redisForm.key;
      var cont = this.redisForm.value;

      if (
        isEmpty(name) ||
        isEmpty(cont) ||
        isEmpty(this.redisForm.select_value)
      ) {
        this.$message.error("请正确填写键、值并选择Redis服务器!");
        return;
      }
      MqService({
        key: name,
        value: cont,
        server: this.redisForm.select_value,
        status: 0
      }).then(response => {
        // console.log(response)
        if (response.Code == 1) {
          this.$message.success("设置成功！");
        } else {
          this.$message.error("设置失败!");
        }
      });
    }
  }
};
</script>
