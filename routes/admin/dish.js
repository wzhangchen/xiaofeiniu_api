/**
 * 菜品相关的路由
 */
const express=require("express");
const pool=require("../../pool.js");
var router=express.Router();

/**
 * API：GET/admin/dish
 * 获取所有的菜品（按类别进行分类）
 * 返回数据：
 * [
 *  {cid:1,cname:"肉类",dishList:[{},{}...]}
 * ]
 */

router.get("/",(req,res)=>{
  //查询所有的菜品,先查询该类别下有哪些菜品
  pool.query("SELECT cid,cname FROM xfn_category ORDER BY cid",(err,result)=>{
    if(err)throw err;
    var categoryList=result;//菜品类别数组
    var count=0;//已经查询完菜品类别的数量
    //循环用var声明只会显示最后一个结果
    //let 为每次循环创建独立的c
    for(let c of categoryList){
      //查询每个类别下有哪些菜品
      pool.query("SELECT * FROM xfn_dish WHERE categoryId=? ORDER BY did DESC",c.cid,(err,result)=>{
        if(err)throw err;
        c.dishList=result;
        //必须保证所有类别下的菜品都查询完成才能发送响应消息--这些查询都是异步执行的
        count++;
        if(count==categoryList.length){
          res.send(categoryList)
        }
      })
    }
  })
})

/**
 * POST/admin/dish/image
 * 请求参数：
 * 接受客户端上传的菜品图片，保存在服务器上，返回该图片在服务器上的随机文件名
 */
//引入multer中间件
const multer=require("multer");
const fs=require("fs");
var upload=multer({
  dest:"tmp"//指定客户端上传的文件临时存储路径
})
//定义路由，使用文件上传中间件
router.post("/image",upload.single("dishImg"),(req,res)=>{
  //console.log(req.file);//客户端上传的图片
  //console.log(req.body)//客户端随同图片提交的字符数据
  var tmpFile=req.file.path;//临时文件名
  var suffix=req.file.originalname.substring(req.file.originalname.lastIndexOf("."))//原始文件名的后缀
  var newFile=randFileName(suffix);//目标文件名
  fs.rename(tmpFile,"img/dish/"+newFile,()=>{//临时文件转移
    res.send({code:200,msg:"upload succ",fileName:newFile});
  })
})
//生成一个随机文件名
//参数suffix表示要生成文件名的后缀
function randFileName(suffix){
  var time=new Date().getTime();
  var num=Math.floor(Math.random()*(10000-1000)+1000);//10000到1000的随机数
  return time+"-"+num+suffix;
}



/**
 * POST/admin/dish/
 * 请求参数：{title:"xxx",imgUrl:"..jpg",price:xx,detail:""，categoryId:xx}
 * 添加一个新的菜品
 * 输出消息：
 * {code:200,msg:"dish added succ",dishId:xx}
 */
router.post("/",(req,res)=>{
  pool.query("INSERT INTO xfn_dish SET ?",req.body,(err,result)=>{
    if(err)throw err;
    res.send({code:200,msg:"dish added succ",dishId:result.insertId})//将insert语句产生的自增编号输出给客户端
  })
})



/**
 * DELETE/admin/dish/:did
 * 根据指定菜品编号删除菜品
 * 输出数据：
 * {code:200,msg:"dish deleted succ"}
 * {code:400,msg:"dish not exists"}
 * 
 */



 /**
 * PUT/admin/dish/
 * 请求参数：{did:xx,title:"xxx",imgUrl:"..jpg",price:xx,detail:""，categoryId:xx}
 * 根据指定菜品编号修改菜品
 * 输出数据：
 * {code:200,msg:"dish update succ"}
 * {code:400,msg:"dish not exists"}
 * 
 */


module.exports=router;