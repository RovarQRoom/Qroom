import express from "express";
import { HighCrestController } from "../Controller/HighCrestController";


const router = express.Router();

router.get("/Search/HighCrest/Home", HighCrestController.HighCrestHome);
router.get("/Search/HighCrest", HighCrestController.HighCrestHome);
router.get("/HighCrest/Home", HighCrestController.HighCrestHome);
router.get("/HighCrest", HighCrestController.HighCrestHome);

router.post("/HighCrest/Purchase", HighCrestController.HighCrestPurchase);
router.get("/HighCrest/Delete/:id", HighCrestController.RemoveEvent);

router.get("/Search/HighCrest/AllRooms", HighCrestController.HighCrestAllRooms);
router.get("/HighCrest/AllRooms", HighCrestController.HighCrestAllRooms);

router.get("/HighCrest/Room", HighCrestController.HighCrestRoom);

router.get("/HighCrest/Blog", HighCrestController.HighCrestBlog);
router.get("/HighCrest/Restaurant", HighCrestController.HighCrestRestaurants);
router.get("/HighCrest/Chefs_Profile", HighCrestController.HighCrestChefsProfiles);
router.get("/HighCrest/About", HighCrestController.HighCrestAbout);
router.get("/HighCrest/Events", HighCrestController.HighCrestEvents);
router.get("/HighCrest/Contact", HighCrestController.HighCrestContacts);

module.exports = router;