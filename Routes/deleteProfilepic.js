// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");
// const requireLogin = require("../middleware/requireLogin");
// const user = mongoose.model("user");

// router.delete("/deleteprofilepic/:Id", requireLogin, (req, res) => {
//     const idd=req.params.Id;
//     console.log(idd)
    
//     postUser.findOne({_id:idd} )
       
//         .then((post) => {
//             if (!post) {
//                 return res.status(404).json({ error: "Post not found" });
//             }
//             // console.log("post" ,post)
//             console.log(post.postedBy._id.toString())
//             console.log(req.user._id.toString())

            
//             if (post.postedBy._id.toString() === req.user._id.toString()) {
//                 postUser.deleteOne({_id:idd})
//                     .then((result) => {
//                         console.log("result",result)
//                         return res.json({
//                             message: "Successfully deleted",
//                         });
//                     })
//                     .catch((err) => {
//                         return res.status(422).json({
//                             error: "can't be done",
//                         });
//                     });
//             } else {
//                 return res.status(401).json({ error: "Unauthorized" });
//             }
//         })
//         .catch((err) => {
//             console.log("err is ",err)
//             return res.status(422).json({
//                 error: "cnt be done 2",
//             });
//         });
// });

// module.exports = router;
