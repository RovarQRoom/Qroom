import express from "express";
import {Search, SearchResult, SearchResultMain}  from "../Controller/SearchController";
import {checkUser}  from "../Middleware/authMiddleware";

const router = express.Router();


router.get("/Search",Search);
router.post("/Search", checkUser ,SearchResult);
router.post("/SearchMain", checkUser ,SearchResultMain);

export {router as SearchRoutes};