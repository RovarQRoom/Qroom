const express = require("express");
const router = express.Router();
const UserController = require("../Controller/UsersController");

router.get("/Signup", UserController.Signup_Get);
router.post("/Signup",UserController.Signup_Post);

router.get("/Login", UserController.Login_Get);
router.post("/Login", UserController.Login_Post);

router.get("/Logout", UserController.Logout_Get);

module.exports = router;