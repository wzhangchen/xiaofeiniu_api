/**
 * 菜品类别相关路由
 */
const express=require("express");
const pool=require("../../pool")
var router=express.Router();
//RESTFUL风格：
/**读取
 * API: GET/admin/category/                        
 * 含义：客户端获取所有的菜品类别，按编号升序排列
 * 返回值：[{cid:1,...},{...}]
 */
router.get("/",(req,res)=>{
  pool.query("SELECT * FROM xfn_category ORDER BY cid",(err,result)=>{
    if(err){throw err};
    res.send(result);
  })
})
/**删除
  * API: DELETE/admin/category/:cid                        
  * 含义：根据表示菜品编号的路由参数，删除该菜品
  * 返回值：{code : 200,msg : "1 category deleted"}
  * 返回值：{code : 400,msg : "0 category deleted"}
  */
router.delete("/:cid",(req,res)=>{
  //删除菜品类别之前必须先把属于该类别的菜品的类别编号设置为null
  pool.query("UPDATE xfn_dish SET categoryId=NULL WHERE categoryId=?",req.params.cid,(err,result)=>{
    if(err)throw err;
    //至此指定类别的菜品已经修改完毕
    pool.query("DELETE FROM xfn_category WHERE cid=?",req.params.cid,(err,result)=>{
      if(err)throw err;
      console.log(result)
      //获取delete数据在数据库中影响的行数
      if(result.affectedRows>0){
        res.send({code:200,msg:"1 category deleted"})
      }else{
        res.send({code:400,msg:"0 category deleted"})
      }
    })
  })
})
  
/**添加
  * API: POST/admin/category                       
  *请求主体参数:json格式{cname:"xxx"}
  * 含义：添加新的菜品类别
  * 返回值：{code : 200,msg : "1 category add",cid:1}
  */
router.post("/",(req,res)=>{
  var data=req.body;//形如{cname:'xxx'}
  pool.query("INSERT INTO xfn_category SET ?",data,(err,result)=>{
    if(err)throw err;
    res.send({code:200,msg:"1 category added",cid:result.insertId});
  })
})

/**修改
  * API: PATCH,PUT/admin/category 
  *请求主体参数:json格式{cid:xx,cname:"xxx"}                 
  * 含义：根据菜品类别编号修改类别
  * 返回值：{code : 200,msg : "1 category modified"}
  * 返回值：{code : 400,msg : "0 category modified,not exists"}
  * 返回值：{code : 401,msg : "0 category modified,no modification"}
  */
router.put("/",(req,res)=>{
  var data=req.body;//请求数据{cid:xx,cname:"xx"}
  //TODO:此处可以对数据进行验证
  pool.query("UPDATE xfn_category SET ? WHERE cid=?",[data,data.cid],(err,result)=>{
    if(err)throw err;
    if(result.changedRows>0){//实际修改一行
      res.send({code:200,msg:"1 category modified"})
    }else if(result.affectedRows==0){//影响0行
      res.send({code:400,msg:"0 category modified,not exists"})
    }else if(result.affectedRows==1&&result.changedRows==0){//影响1行修改0行-新旧值一样
      res.send({code:401,msg:"0 category modified,no modification"})
    }
  })
})


module.exports=router;