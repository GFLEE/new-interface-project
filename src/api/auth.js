import request from '@/utils/request'
import account from '@/utils/is4'
import scope from './scope'
// const apiPrefix = `${process.env.VUE_APP_BASE_API}/${scope}/auth/`


//登录测试
export const loginService = (params, config = {}) => {
    // return request.post(urlbase + 'RedisService', params, config)
    return account.login()
}


// export const login = (params, config = {}) => {
//     return request.post(apiPrefix + 'login', params, { ...{ api: { auth: false }}, ...config })
//   }
//   export const refresh = (params, config = {}) => {
//     return request.get(apiPrefix + 'refresh', { params: params, ...config })
//   }
//   export const getPassWordEncryptKey = (params, config = {}) => {
//     return request.get(apiPrefix + 'getPassWordEncryptKey', { params: params, ...{ api: { auth: false }}, ...config })
//   }
//   export const getLoginInfo = (params, config = {}) => {
//     return request.get(apiPrefix + 'getUserInfo', { params: params, ...config })
//   }
  