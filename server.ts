import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import express, {Request, Response, NextFunction} from "express";
import { HighCrestRoutes, HomeRoutes, ProfileRoutes, SearchRoutes, UserRoutes } from "./Routes";
import * as dotenv from 'dotenv'
import { verifyTokenMiddleware } from './Middleware/authMiddleware';


dotenv.config();
const server = express();

//Middleware
server.use(express.static('public'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use('/uploads', express.static('uploads'));

server.use(verifyTokenMiddleware);

//View Engine
server.set("view engine", "ejs");

//Database Connection
mongoose.set("strictQuery", false);
//Listing To The Ports
mongoose.connect(process.env.MONGODB_URI?process.env.MONGODB_URI:"")
    .then(result => server.listen(process.env.PORT))
    .then(() => console.log("Connected to Database QRoom"))
    .catch((err) => {
        console.log(err);
    });

//All Routes
server.get("*", verifyTokenMiddleware);

//First Route
server.get("/", (req:Request, res:Response) => {
    res.redirect("/Home");
});

server.use(HomeRoutes, UserRoutes, SearchRoutes, ProfileRoutes, HighCrestRoutes);