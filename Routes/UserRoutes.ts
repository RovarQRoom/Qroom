import express from "express";
import { Login_Get, Login_Post, Logout_Get, Signup_Get, Signup_Post } from "../Controller/UsersController";
const router = express.Router();

router.get("/Signup", Signup_Get);
router.post("/Signup",Signup_Post);

router.get("/Login", Login_Get);
router.post("/Login", Login_Post);

router.get("/Logout", Logout_Get);

export {router as UserRoutes};