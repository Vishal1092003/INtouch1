const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const postUser = mongoose.model("postUser");

router.post("/createpost", requireLogin, (req, res) => {
    const { pic, body } = req.body;

    console.log("url here is ", pic);

    if (!pic ) {
        return res.status(422).json({
            message: "Please add all the fields"
        });
    }

    const newpost = new postUser({
        body,
        photo: pic,
        postedBy: req.user
    });

    newpost.save()
        .then((post) => {
            console.log("post is", post);
            return res.status(200).json({
                post
            });
        })
        .catch((error) => {
            console.log("Error saving post:", error);
            return res.status(422).json({
                error: "Error saving post"
            });
        });
});

module.exports = router;
