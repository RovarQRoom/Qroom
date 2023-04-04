import express from "express";
import { PictureWebpage, Profile, ProfileDataUpdate, ProfilePictureUpdate } from "../Controller/ProfileController";
import {requireAuth} from "../Middleware/authMiddleware";

const router = express.Router();

//Middleware
const store = require("../Middleware/multer");

router.get("/Profile/:id",requireAuth,Profile);
router.post("/Profile/:id",ProfileDataUpdate);

router.get("/Profile/:id/Picture",requireAuth, PictureWebpage);
router.post("/Profile/:id/Picture",ProfilePictureUpdate);

export {router as ProfileRoutes};