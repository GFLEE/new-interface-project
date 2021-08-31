import hlightjsPlugin from "./plugins/highlight";
import signalRPlugin from "./plugins/signalR";

const Plugins = {
  install: function(Vue) {
    Vue.use(hlightjsPlugin);
    Vue.use(signalRPlugin);
  }
};
export default Plugins;
