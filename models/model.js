const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    name:{
     type:String,
     required:true
    },
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
         type:String,
        required:true

    },
    Photo:{
        type:String
    }
})

mongoose.model("user",UserSchema);