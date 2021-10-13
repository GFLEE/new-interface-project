import request from "@/utils/request_old";
// import scope from "./scope";
// const apiPrefix = `${process.env.VUE_APP_BASE_API}/${scope}/`

 //const InterfaceServer = "http://172.29.162.148:5000/api/Interface/";
const InterfaceServer = "http://localhost:5000/api/Interface/";

//测试
export const MqService = (params, config = {}) => {
  return request.post(InterfaceServer + "MQWithRedisService", params, config);
};

export const LogQueryService = params => {
  return request.post(InterfaceServer + "QueryInterfaceLog", {
    params: params
  });
};

export const LogDetailervice = params => {
  var p = { ...params };
  console.log(p);
  return request.post(InterfaceServer + "QuerySingleLog", { ...params });
};
