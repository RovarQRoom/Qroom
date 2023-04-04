import express from "express";
import { Webpage, About, Reviews, Contact, Map } from "../Controller/HomeController";
const router = express.Router();

router.get("/Home", Webpage)
router.get("/About", About);
router.get("/Reviews", Reviews);
router.get("/Contact", Contact);
router.get("/Map", Map);

export {router as HomeRoutes};