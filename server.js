const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkUser } = require("./Middleware/authMiddleware");
const { requireAuth } = require("./Middleware/authMiddleware");
const { graphqlHTTP } = require('express-graphql');
let user = {};


const server = express();
const port = 3000;
const dbURL = "mongodb+srv://QRoom:900mylife@qroom.zlbunot.mongodb.net/QRoom";

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

//Listing To The Ports
mongoose.connect(dbURL)
    .then((result) => server.listen(port), console.log("Connected to Database QRoom"))
    .catch((err) => {
        console.log(err);
    });

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