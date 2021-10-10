import bus from "../utils/bus";
const signalR = require("@aspnet/signalr");
// Vue.prototype.sendMsg = signalR.sendMsg;

let connection = null;

export let connectServer = (url, conn_data) => {
  console.log("开始连接.....");
  connection = new signalR.HubConnectionBuilder()
    .withUrl(url)
    .configureLogging(signalR.LogLevel.Information)
    .build();
  initSocket(conn_data);
};
let initSocket = () => {
  connection
    .start()
    .then(function() {
      console.log("已连接，connection.start()执行");
    })
    .catch(function(err) {
      return console.error(err.toString());
    });
  connection.on("CK01", function(data1, data) {
    console.log(data1);
    if (data != null && data != undefined) {
      bus.$emit("ck01Data", data);
    } else {
      console.log("error,please restart Hub");
    }
  });
  connection.on("CK02", function(data1, data) {
    bus.$emit("ck02Data", data);
  });
  connection.on("CK03", function(data1, data) {
    bus.$emit("ck03Data", data);
  });
  connection.on("CK04", function(data1, data) {
    bus.$emit("ck04Data", data);
  });
  connection.on("DB05", function(data1, data) {
    bus.$emit("db05Data", data);
  });
  connection.on("01RG", function(data1, data) {
    bus.$emit("rg01Data", data);
  });
  connection.on("02RG", function(data1, data) {
    bus.$emit("rg02Data", data);
  });
};

let endConnect = () => {
  connection.stop(() => {});
};
export default { connectServer, endConnect, connection };
