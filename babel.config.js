const IS_PRODUCTION = ['production', 'prod'].includes(process.env.NODE_ENV)

const plugins = []
if (IS_PRODUCTION) {
  plugins.push('transform-remove-console')
}
plugins.push('transform-object-rest-spread')

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
    //'es2015'
  ],
  plugins, 

}
