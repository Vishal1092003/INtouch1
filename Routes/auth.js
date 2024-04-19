const express=require("express");
const { mongo, default: mongoose } = require("mongoose");
const router=express.Router();
 const user=mongoose.model("user");

 const jwt=require("jsonwebtoken");

 const bcrypt=require("bcrypt");
const requireLogin = require("../middleware/requireLogin");

 require("dotenv").config();
 const jwt_secret=process.env.jwt_secret;



router.post("/signup",(req,res)=>{
    const {name,userName,email,password}=req.body;
     
    if(!name || !userName || !email || !password){
        res.status(422).json({
           error:"please add all the fields"
        })
    }

    user.findOne({$or:[{email:email},{userName:userName}]}).then((saveduser)=>{
    
      if(saveduser){
        return res.status(422).json({
            error:"user already exist with emial or username"
        })
      }else{
           bcrypt.hash(password,12).then((hashedpassword)=>{
           const newuser=new user({
        name,
        userName,
        email,
        password:hashedpassword
    })

    newuser.save()
    .then(user=>{
        res.status(400).json({
            message:"registered successfully"
        })
    console.log("saved successfully");
    })
    .catch((err)=>{
    console.log(Error);
    })
      })
      }
      

      

    
    })
    
})

router.post("/signin",(req,res)=>{
    const {email,password}=req.body;
     console.log("email is ",email)
     console.log("password is ",password)
     
    if(!email || !password){
        res.status(422).json({
            error:"please give all details"
        })
    }

    user.findOne({email:email})
    .then((saveduser)=>{
         
        if(!saveduser){
            res.status(422).json({
                error:"invalid user"
            })
        }
        console.log("saveduser is " ,saveduser);
       
        bcrypt.compare(password,saveduser.password)
        .then((match)=>{
           if(match) {
            // res.status(200).json({
            //     message:"password matched successfully"
            // })
            const token=jwt.sign({_id:saveduser.id},jwt_secret);
             const{_id}=saveduser;
            res.json({token,_id})
            console.log(token);
        
           }else{
             res.status(400).json({
                error:"invalid password"
            })
           } 
        })
        .catch((error)=>{
          console.log(error);
        })
      
    })
})

// router.get("/createpost",requireLogin,(req,res)=>{
//      console.log("hello auth")
// })


router.put("/uploadProfilePic",requireLogin,(req,res)=>{
    user.findByIdAndUpdate(req.user._id,{
        $set:{Photo:req.body.pic}
    },{
        new:true
    }).then((result)=>{
        console.log("result",result)
        res.json({
            message1:"uploaded",
            message2:result

        })
    })
    .catch((error)=>{
        res.status(402).json({
           err:error
        })
    })
})



module.exports=router;