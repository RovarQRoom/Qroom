const mongoose = require('mongoose');
const express = require("express");

const server = express();

export const mongo_connection = (url,port)=>{
    mongoose.set("strictQuery", false);
//Listing To The Ports
mongoose.connect(url)
    .then((result) => server.listen(port), console.log("Connected to Database QRoom"))
    .catch((err) => {
        console.log(err);
    });
}