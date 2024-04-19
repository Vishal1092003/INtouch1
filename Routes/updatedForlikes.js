const express=require("express")
const mongoose=require("mongoose")
const requireLogin = require("../middleware/requireLogin")
const router=express.Router()

const postUser=mongoose.model("postUser")


router.put("/updatelikes",requireLogin,(req,res)=>{
    const{postedBy}=req.body;
    postUser.findByIdAndUpdate(postedBy,{
        $push:{likes:req.user._id}
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

router.put("/updateunlikes",requireLogin,(req,res)=>{
    const{postedBy}=req.body;
    postUser.findByIdAndUpdate(postedBy,{
        $pull:{likes:req.user._id}
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