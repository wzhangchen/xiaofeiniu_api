const express=require("express")
var router=express.Router();



router.get("/",(req,res)=>{
  pool.query("SELECT * FROM xfn_settings LIMIT 1",(err,result)=>{
    if(err)throw err;
    res.send(result[0]);
  })
})



router.put("/",(req,res)=>{
  pool.query("UPDATE xfn_settings SET ?",[req.body],(err,result)=>{
    if(err)throw err;
    res.send({code:200,msg:"settings updated succ"});
  })
})




module.exports=router;