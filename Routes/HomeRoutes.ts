import express from "express";
import { Webpage, About, Reviews, Contact, Map, Contact_Us } from "../Controller";
const router = express.Router();

router.get("/Home", Webpage)
router.get("/About", About);
router.get("/Reviews", Reviews);
router.get("/Contact", Contact);
router.get("/Map", Map);

router.post("/Contact", Contact_Us);

export {router as HomeRoutes};