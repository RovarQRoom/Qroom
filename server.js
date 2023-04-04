const express = require("express");
const cookieParser = require("cookie-parser");
const { checkUser } = require("./Middleware/authMiddleware");
const { requireAuth } = require("./Middleware/authMiddleware");
const { graphqlHTTP } = require('express-graphql');
const { mongo_connection } = require("./Mongo_Connection");

let user = {};
require('dotenv').config()



const server = express();

//Middleware
server.use(express.static('public'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use((req, res, next) => {
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
const HomeRoutes = require("./Routes/HomeRoutes");
const UserRoutes = require("./Routes/UserRoutes");
const SearchRoutes = require("./Routes/SearchRoutes");
const ProfileRoutes = require("./Routes/ProfileRoutes");
const HighCrestRoutes = require("./Routes/HighCrestRoutes");




//All Routes
server.get("*", checkUser);
//First Route
server.get("/", async(req, res) => {
    console.log(process.env)
    res.redirect("/Home");
});

server.get("/Profile", requireAuth, (req, res) => {
    user = Object.assign({}, res.locals.user);
    res.redirect(`/Profile/${user._doc._id}`);
});

server.get("/Profile/Picture", requireAuth, (req, res) => {
    user = Object.assign({}, res.locals.user);
    res.redirect(`/Profile/${user._doc._id}/Picture`);
});

server.use(HomeRoutes, UserRoutes, SearchRoutes, ProfileRoutes, HighCrestRoutes);