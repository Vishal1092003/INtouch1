const express=require("express")
const requireLogin = require("../middleware/requireLogin")
const router=express.Router()
const mongoose=require("mongoose")
const postUser=mongoose.model("postUser")

router.get("/getmypost",requireLogin,(req,res)=>{
    console.log(req.user)
    // note: req.user require login se laye hai
    postUser.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(myposts=>res.json(myposts))
    
})
module.exports=router;