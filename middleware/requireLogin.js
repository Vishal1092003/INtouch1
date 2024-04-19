const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_secret = process.env.jwt_secret;
const mongoose = require("mongoose");
const user = mongoose.model("user");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(422).json({
            error: "You must have to login 1"
        });
    }
    
    const token = authorization.replace("Bearer ","");
    jwt.verify(token, jwt_secret, (err, payload) => {
        if (err) {
            return res.status(422).json({
                error: "You must have to login 2"
            });
        }
        const { _id } = payload;
        user.findById(_id).then((userData) => {
            req.user = userData; // Attach user data to request object
            next(); 
        })
    });
};
