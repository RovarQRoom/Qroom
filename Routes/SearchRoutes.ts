const express = require("express");
const router = express.Router();
const SearchController = require("../Controller/SearchController");
const {checkUser} = require("../Middleware/authMiddleware");

router.get("/Search",SearchController.Search);
router.post("/Search", checkUser ,SearchController.SearchResult);
router.post("/SearchMain", checkUser ,SearchController.SearchResultMain);

module.exports = router;