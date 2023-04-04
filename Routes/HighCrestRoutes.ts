import express from "express";
import { HighCrestAbout, HighCrestAllRooms, HighCrestBlog, HighCrestChefsProfiles, HighCrestContacts, HighCrestEvents, HighCrestHome, HighCrestPurchase, HighCrestRestaurants, HighCrestRoom, RemoveEvent } from "../Controller/HighCrestController";


const router = express.Router();

router.get("/Search/HighCrest/Home", HighCrestHome);
router.get("/Search/HighCrest", HighCrestHome);
router.get("/HighCrest/Home", HighCrestHome);
router.get("/HighCrest", HighCrestHome);

router.post("/HighCrest/Purchase", HighCrestPurchase);
router.get("/HighCrest/Delete/:id", RemoveEvent);

router.get("/Search/HighCrest/AllRooms", HighCrestAllRooms);
router.get("/HighCrest/AllRooms", HighCrestAllRooms);

router.get("/HighCrest/Room", HighCrestRoom);

router.get("/HighCrest/Blog", HighCrestBlog);
router.get("/HighCrest/Restaurant", HighCrestRestaurants);
router.get("/HighCrest/Chefs_Profile", HighCrestChefsProfiles);
router.get("/HighCrest/About", HighCrestAbout);
router.get("/HighCrest/Events", HighCrestEvents);
router.get("/HighCrest/Contact", HighCrestContacts);

export {router as HighCrestRoutes};