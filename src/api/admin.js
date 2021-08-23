import request from "@/utils/request";
import scope from "./scope";
// const apiPrefix = `${process.env.VUE_APP_BASE_API}/${scope}/`
const apiPrefix = "https://localhost:5000/api/test/";

//测试
export const MqService = (params, config = {}) => {
  console.log(apiPrefix);
  console.log(params);
  return request.post(apiPrefix + "MQWithRedisService", params, config);
};
