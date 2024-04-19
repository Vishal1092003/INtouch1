const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.uri;

function dbconnect() {
    mongoose.connect(uri, {})
    .then(() => {
        console.log("db connected successfully");
    })
    .catch((error) => { // Added 'error' parameter here
        console.log("db connection issue");
        console.log(error); // Now error is defined
        process.exit(1);
    });
}

module.exports = dbconnect;
