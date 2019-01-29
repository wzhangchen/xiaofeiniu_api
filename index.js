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
const adminRouter=require("./routes/admin/admin")
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















