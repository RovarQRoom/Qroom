import mongoose from 'mongoose';
import express from "express";

const server = express();

export const mongo_connection = (url: any, port:any)=>{
    mongoose.set("strictQuery", false);
//Listing To The Ports
mongoose.connect(url).then(() => server.listen(port))
    .then(() => console.log("Connected to Database QRoom"))
    .catch((err) => {
        console.log(err);
    });
    // .then((result:any) => server.listen(port), console.log("Connected to Database QRoom"))
    // .catch((err) => {
    //     console.log(err);
    // });
}