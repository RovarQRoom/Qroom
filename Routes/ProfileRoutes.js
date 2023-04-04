const express = require("express");
const router = express.Router();
const ProfileController = require("../Controller/ProfileController");
const {requireAuth} = require("../Middleware/authMiddleware");

//Middleware
const store = require("../Middleware/multer");

router.get("/Profile/:id",requireAuth,ProfileController.Profile);
router.post("/Profile/:id",ProfileController.ProfileDataUpdate);

router.get("/Profile/:id/Picture",requireAuth, ProfileController.PictureWebpage);
router.post("/Profile/:id/Picture",store.array("ProfileImage",1),ProfileController.ProfilePictureUpdate);

module.exports = router;