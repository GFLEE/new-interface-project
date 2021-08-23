const urlbase="http://localhost:5000/api/Tool/"
 
//获取
export const entityClassService = (params, config = {}) => {
    return request.post(urlbase + 'GetEntityClass', params, config)
}