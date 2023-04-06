import express from "express";
import {Search, SearchResultMain}  from "../Controller";
import { verifyTokenMiddleware }  from "../Middleware";

const router = express.Router();


router.get("/Search",Search);
router.get("/SearchMain", verifyTokenMiddleware ,SearchResultMain);

export {router as SearchRoutes};