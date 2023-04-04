const express = require("express");
const router = express.Router();
const HomeController = require("../Controller/HomeController");

router.get("/Home", HomeController.Webpage)
router.get("/About", HomeController.About);
router.get("/Reviews", HomeController.Reviews);
router.get("/Contact", HomeController.Contact);
router.get("/Map", HomeController.Map);

module.exports = router;