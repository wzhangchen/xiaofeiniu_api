const express=require("express")
var pool=require("../../pool");
var router=express.Router();

/**
 * GET请求可以有请求主体吗？
 * API:GET/admin/login/:aname/:apwd
 * 完成用户登录认证(提示：有的项目中此处选择post)
 * 返回数据：
 * {code:200,msg:'login success'}
 * {code:400,msg:"aname or apwd err"}
 */
router.get("/login/:aname/:apwd",(req,res)=>{
  var aname=req.params.aname;
  var apwd=req.params.apwd;
  //需要对用户输入的密码进行加密对比
  pool.query("SELECT aid FROM xfn_admin WHERE aname=? AND apwd=PASSWORD(?)",[aname,apwd],(err,result)=>{
    if(err)throw err;
    if(result.length>0){//查询到数据登录成功
      res.send({code:200,msg:"login success"})
    }else{//未查询到数据
      res.send({code:400,msg:"aname or apwd err"})
    }
  })
})

 /**
   * GET请求可以有请求主体吗？
   * API:PUT(修改全部),PATCH(修改部分)/admin/login
   * 请求数据：{aname:"xxx",oldapwd:"xxx",newapwd:"xxx"}
   * 根据管理员名和密码修改管理员密码
   * 返回数据：
   * {code:200,msg:'modified success'}
   * {code:400,msg:"aname or apwd err"}
   * {code:401,msg:"apwd not modified"}
   */
router.patch("/",(req,res)=>{
  var data=req.body;
  //首先根据anmame/oldPwd查询该用户是否存在
  pool.query("SELECT aid FROM xfn_admin WHERE aname=? AND apwd=PASSWORD(?)",[data.aname,data.oldPwd],(err,result)=>{
    if(err)throw err;
    if(result.length==0){
      res.send({code:400,msg:"apwd err"})
      return ;
    }
    //如果查询到用户 在修改密码
    pool.query("UPDATE xfn_admin SET apwd=PASSWORD(?) WHERE aname=?",[data.newPwd,data.aname],(err,result)=>{
      if(err)throw err;
      if(result.changedRows>0){//密码修改完成
        res.send({code:200,msg:"modify succ"})
      }else{//新旧密码一致 未修改
        res.send({code:401,msg:"pwd not modified"})
      }
    })
  });
})




module.exports=router;