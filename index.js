/**
 * 小肥牛扫码点餐项目API子系统
 */
console.log("准备启动API服务器...")
console.log(new Date().toLocaleString())
const PORT=8090;
const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const categoryRouter=require("./routes/admin/category");
const adminRouter=require("./routes/admin/admin");
const dishRouter=require("./routes/admin/dish");
const settingsRouter=require("./routes/admin/settings");
const tableRouter=require("./routes/admin/table");


//创建HTTP应用服务器
var app=express();
app.listen(PORT,()=>{
  console.log("Server Listening:"+PORT+"...")
});
//使用cors中间件解决跨域 ;位置：服务器后挂载路由前
app.use(cors());

app.use(bodyParser.json());
//挂载路由
app.use("/admin/category",categoryRouter);
app.use("/admin",adminRouter);
app.use("/admin/dish",dishRouter);
app.use("/admin/settings",settingsRouter);
app.use("/admin/table",tableRouter);















