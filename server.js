const express=require("express");
const app=express();
const data=require("./data.js");
const cors=require("cors");
const dbconnect=require("./Database/database.js");

const path=require("path")

const user=require("./models/model.js");
const  auth=require("./Routes/auth.js");

const postUser=require("./models/post.js");
const createPost=require("./Routes/createPost.js");

const getpost=require("./Routes/getPosts.js")

const getmypost=require("./Routes/getmyPost.js")

const updatedForlikes=require("./Routes/updatedForlikes.js")

const comments=require("./Routes/comments.js");

const deletepost=require('./Routes/deleteMypost.js')
const ForcurrentUser=require("./Routes/ForCurrentUser.js")

require("dotenv").config();
const PORT=process.env.PORT || 5000;



app.use(express.json());
app.use(cors());
app.use(auth);
app.use(createPost);
app.use(getpost)
app.use(getmypost)
app.use(updatedForlikes)
app.use(comments)
app.use(ForcurrentUser)

app.use(deletepost)

app.listen(PORT,()=>{
    console.log(`server connected to port ${PORT}`);
})

dbconnect();

// app.get("/",(req,res)=>{
//     res.send(data);
// })


app.use(express.static(path.join(__dirname,"./frontend/build")))

app.get("*",(req,res)=>{
    res.sendFile(
        path.join(__dirname,"./frontend/build/index.html",
    function(err){
        res.status(500).send(err)
    })
    )
})
