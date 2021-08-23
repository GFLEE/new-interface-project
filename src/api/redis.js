import request from '@/utils/request'
import scope from './scope'
// const apiPrefix = `${process.env.VUE_APP_BASE_API}/${scope}/redis/`
const urlbase="http://localhost:5000/api/Test/"
//redis设置接口

//获取
export const redisService = (params, config = {}) => {
    return request.post(urlbase + 'RedisService', params, config)
}

// //设置
// export const setkey = (params, config = {}) => {
//     return request.post(urlbase + 'SetKey', params, config)
//   }
