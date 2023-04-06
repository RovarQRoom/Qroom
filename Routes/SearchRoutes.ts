import express from "express";
import {Search, SearchResult, SearchResultMain}  from "../Controller";
import { verifyTokenMiddleware }  from "../Middleware";

const router = express.Router();


router.get("/Search",Search);
router.post("/Search", verifyTokenMiddleware ,SearchResult);
router.post("/SearchMain", verifyTokenMiddleware ,SearchResultMain);

export {router as SearchRoutes};