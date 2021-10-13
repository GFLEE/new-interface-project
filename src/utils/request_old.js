import axios from "axios";
// import Vue from "vue";

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers["Cache-Control"] = "no-cache";
axios.defaults.headers["Pragma"] = "no-cache";

const requestAxios = axios.create({
  baseURL: "", // url = base url + request url
  timeout: 20000 // 请求延时
});

// 请求拦截
requestAxios.interceptors.request.use(
  config => {
    console.log('请求信息：');
    console.log(config.url)
    console.log(config.data.params)
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// 响应拦截
requestAxios.interceptors.response.use(
  response => {
    const { data } = response;
    console.log('响应数据：');
    console.log(data);

    return data;
  },
  async error => {
    const res = { success: false, code: 0, msg: "" };
    console.log(error);
    return res;
  }
);

export default requestAxios;
