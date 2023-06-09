import express from "express";
import { PictureWebpage, Profile, ProfileDataUpdate, ProfilePictureUpdate } from "../Controller";
import { verifyTokenMiddleware } from "../Middleware";

const router = express.Router();

router.get("/Profile/:id", verifyTokenMiddleware ,Profile);
router.post("/Profile/:id",ProfileDataUpdate);

router.get("/Profile/:id/Picture",verifyTokenMiddleware, PictureWebpage);
router.post("/Profile/:id/Picture",ProfilePictureUpdate);

export {router as ProfileRoutes};