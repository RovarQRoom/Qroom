import express, {Request, Response, NextFunction} from "express";
import cookieParser from "cookie-parser";
import { checkUser } from "./Middleware/authMiddleware";
import { requireAuth } from "./Middleware/authMiddleware";
import { graphqlHTTP } from 'express-graphql';
import { mongo_connection } from "./Mongo_Connection";
import * as dotenv from 'dotenv'

dotenv.config();



const server = express();

//Middleware
server.use(express.static('public'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use((req:Request, res:Response, next:NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
})

//GraphQL Testing
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
server.use(checkUser);

server.use("/graphql", graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}))

//View Engine
server.set("view engine", "ejs");

mongo_connection(process.env.MONGO_URL, process.env.PORT);

//Links Routes
import HomeRoutes from "./Routes/HomeRoutes";
import UserRoutes from "./Routes/UserRoutes";
import SearchRoutes from "./Routes/SearchRoutes";
import ProfileRoutes from "./Routes/ProfileRoutes";
import HighCrestRoutes from "./Routes/HighCrestRoutes";




//All Routes
server.get("*", checkUser);
//First Route
server.get("/", async(req:Request, res:Response) => {
    console.log(process.env)
    res.redirect("/Home");
});

server.get("/Profile", requireAuth, (req:Request, res:Response) => {
    // user = Object.assign({}, res.locals.user);
    // res.redirect(`/Profile/${user._doc._id}`);
});

server.get("/Profile/Picture", requireAuth, (req:Request, res:Response) => {
    // user = Object.assign({}, res.locals.user);
    // res.redirect(`/Profile/${user._doc._id}/Picture`);
});

server.use(HomeRoutes, UserRoutes, SearchRoutes, ProfileRoutes, HighCrestRoutes);