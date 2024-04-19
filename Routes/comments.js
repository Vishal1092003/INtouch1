const express=require("express");
const router=express.Router();

 const mongoose=require("mongoose");
const requireLogin = require("../middleware/requireLogin");
 const postUser=mongoose.model("postUser")


 router.put("/comments",requireLogin,(req,res)=>{
       const{postedBy,comment}=req.body;
       postUser.findByIdAndUpdate(postedBy,{
        $push:{comments:{
            comment:comment,
            postedBy:req.user._id
        }
    },
      
       },{
        new:true
       }).then((data,err)=>{
        if(data){
            return res.json({
                message:data
            })
        }else{
            res.json({err})
        }
    })
   

 })



module.exports=router;
