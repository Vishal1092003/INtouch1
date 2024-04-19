const express = require("express");
const router = express.Router();
const mongoose=require("mongoose")
const requireLogin = require("../middleware/requireLogin");

const user=mongoose.model("user")


router.get("/getuser",requireLogin,(req,res)=>{
    console.log("req.user",req.user)
    // note: req.user require login se laye hai
    user.find({_id:req.user._id})
    
    .then(user=>res.json(
        {
            user:user
        }
    ))
    
})
module.exports=router;