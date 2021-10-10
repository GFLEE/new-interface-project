import bus from "../../utils/bus";
const signalR = require("@aspnet/signalr");
// Vue.prototype.sendMsg = signalR.sendMsg; 

let connection = null;

export let connectServer = (url, conn_data) => {
  console.log("开始连接.....");
  connection = new signalR.HubConnectionBuilder()
    .withUrl(url)
    .configureLogging(signalR.LogLevel.Information)
    .build();
  //初始化
  initSocket(conn_data);
};
//初始化包括 连接，获取消息
let initSocket = () => {
  //连接
  connection
    .start()
    .then(function() {
      console.log("已连接，connection.start()执行");
    })
    .catch(function(err) {
      return console.error(err.toString());
    });
  //获取消息 对应后端的方法
  // connection.on("01", function(data1, data) {
  //   //所有用户需要改变的 写在下面
  //   if (data != null && data != undefined) {
  //     bus.$emit("handleRefreshData", data); //根据业务需要调用方法更新数据
  //   } else {
  //     console.log("error,please restart Hub");
  //   }
  // });
  connection.on("BW_XiaoMiTV_001", function(data1, data) {
    bus.$emit("handleRefreshData", data);  
  });
  // connection.on("02", function(data1, data) {
  //   bus.$emit("handleRefreshData", data);  
  // });
  // connection.on("03", function(data1, data) {
  //   bus.$emit("handleRefreshData", data);  
  // });
  // connection.on("04", function(data1, data) {
  //   bus.$emit("handleRefreshData", data);  
  // });
  // connection.on("05", function(data1, data) {
  //   bus.$emit("handleRefreshData", data);  
  // });
  // connection.on("06", function(data1, data) {
  //   bus.$emit("handleRefreshData", data);  
  // });

};

let endConnect = () => {
  connection.stop(() => {});
};
export default { connectServer, endConnect, connection };
