import hlightjsPlugin from "./highlight";

const Plugins = {
  install: function(Vue) {
    Vue.use(hlightjsPlugin);
  }
};
export default Plugins;
