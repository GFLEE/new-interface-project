import request from "@/utils/request_old";
// import scope from "./scope";
// const apiPrefix = `${process.env.VUE_APP_BASE_API}/${scope}/`

//const InterfaceServer = "http://10.1.11.36:5000/api/Interface/";
const InterfaceServer = "http://172.29.162.145:5000/api/Interface/";
//const InterfaceServer = "http://localhost:5000/api/Interface/";

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
  return request.post(InterfaceServer + "QuerySingleLog", { ...params });
};

export const StockQueryService = params => {
  return request.post(InterfaceServer + "StockQuery", {
    params: params
  });
};

export const ProductPlanQueryService = params => {
  return request.post(InterfaceServer + "ProductPlanQuery", {
    params: params
  });
};

export const XiaoMiTVDataService = params => {
  return request.post(InterfaceServer + "XiaoMiTVDataService", {
    params: params
  });
};

export const QueryProductionService = params => {
  return request.post(InterfaceServer + "QueryProduction", {
    params: params
  });
};

export const QueryBoundService = params => {
  return request.post(InterfaceServer + "QueryBound", {
    params: params
  });
};

export const RePushLogService = params => {
  return request.post(InterfaceServer + "RePushLog", { t_id: params });
};
