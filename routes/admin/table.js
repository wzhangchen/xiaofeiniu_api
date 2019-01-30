const express=require("express");
var pool=require("../../pool")
var router=express.Router();

/**
 * GET/admin/table
 * 获取所有的桌台信息
 * 返回数据：
 * [
 *  {tid:xxx,tname:"xxx",status:""},
 * ]
 */
router.get("/",(req,res)=>{
  pool.query("SELECT * FROM xfn_table ORDER BY tid",(err,result)=>{
    if(err)throw err;
    res.send(result);
  })
})





module.exports=router;