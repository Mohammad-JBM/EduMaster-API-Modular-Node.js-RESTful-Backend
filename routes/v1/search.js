// Express
const express = require("express");
// Controller
const searchController = require("./../../controllers/v1/search");
// Router
const router = express.Router();

// All Route

// Get
router
    .route("/:keyword")
    .get(searchController.get)


// Export
module.exports = router;