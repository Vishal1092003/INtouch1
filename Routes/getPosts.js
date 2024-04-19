const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const postUser=mongoose.model("postUser")

router.get("/allposts",requireLogin,(req,res)=>{
    postUser.find()
    .populate("postedBy","_id name")
    .then((posts)=>res.json( {posts}))
    .catch((err)=>console.log(err))
})

module.exports=router;