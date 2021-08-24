// import deepMerge from 'deepmerge'
// import {mergeI18nFromRoutes} from '@/utils/i18n'




//从路由解析path
function getI18nKey(path) {
    const keys = path.split('/').filter(item => !item.startsWith(':') && item != '')
    keys.push('name')
    return keys.join('.')
  }

export {getI18nKey}