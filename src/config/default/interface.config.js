// 主题颜色，动画导入 配置
const MAIN_THEME_CONF = {
    palettes: ['#f5222d', '#fa541c', '#fadb14', '#3eaf7c', '#13c2c2', '#1890ff', '#722ed1', '#eb2f96'],
    animates: require('./animate.config').preset,
    theme: {
      mode: {
        DARK: 'dark',
        LIGHT: 'light',
        NIGHT: 'night'
      }
    },
    layout: {
      SIDE: 'side',
      HEAD: 'head'
    }
  }
  
  module.exports = MAIN_THEME_CONF
  