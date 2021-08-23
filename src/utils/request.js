import axios from 'axios'
// import Vue from 'vue'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers['Cache-Control'] = 'no-cache'
axios.defaults.headers['Pragma'] = 'no-cache'

const requestAxios = axios.create({
    baseURL: '', // url = base url + request url
    timeout: 20000 // 请求延时
})

// 请求拦截
requestAxios.interceptors.request.use(
    config => {
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

// 响应拦截
requestAxios.interceptors.response.use(
    response => {

         const { config, data } = response
         data.success = data.code === 200
        var no_errmsg 
        var msgDuration 
        if(config.api!=null)
        {
            no_errmsg  = config.api.noErrorMsg 
            msgDuration  = config.api.msgDuration 
        }
        if (!data.success 
            && !no_errmsg 
            && data.msg) {
          const duration = msgDuration >= 0 ? msgDuration : 3000
          Vue.prototype.$message.error({
            message: data.msg,
            duration: duration
          })
        }
                
        return data
    },
    async error => {
        const res = { success: false, code: 0, msg: '' }

        if (error!=null&&err.response) {
          if (error.config._request) {
            return res
          }
    
          const { config, data, status } = error.response
          if (_.isNumber(status)) {
            res.code = status
          }
          if (_.isPlainObject(data)) {
            _.merge(res, data)
          } else if (_.isString(data)) {
            res.msg = data || error.response.statusText
          } 
          var no_errmsg 
          var msgDuration 
          if(config.api!=null)
          {
              no_errmsg  = config.api.noErrorMsg 
              msgDuration  = config.api.msgDuration 
          }
          // 错误消息
          if (!no_errmsg && res.msg) {
            const duration = msgDuration >= 0 ? msgDuration : 3000
            Vue.prototype.$message.error({
              message: res.msg,
              duration: duration
            })
          }
        }
        return res
    }
)

export default requestAxios


