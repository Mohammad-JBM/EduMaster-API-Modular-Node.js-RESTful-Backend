// Express
const express = require("express");
// Router
const router = express.Router();
// category Controller
const categoryController = require("./../../controllers/v1/category");
// authMiddleware
const authMiddleware = require("./../../middleware/auth");
// isAdmin Middleware
const isAdmin = require("./../../middleware/isAdmin");

// Create getAll Router
router
    .route("/")
    .post(authMiddleware, isAdmin, categoryController.create)
    .get(categoryController.getAll);



// Delete & Update Router
router
    .route("/:id")
    .delete(authMiddleware, isAdmin, categoryController.remove)
    .put(authMiddleware, isAdmin, categoryController.update);



// Export
module.exports = router;